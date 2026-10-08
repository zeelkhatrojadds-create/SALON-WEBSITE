import React, { useState, useEffect } from 'react';
import { Clock, Play } from 'lucide-react';
import salonDB from '../../db/salonDatabase';

/**
 * TreatmentLiveTimer
 * 
 * Source of truth is ALWAYS `treatmentStartedAt` timestamp from the database.
 * Real-time elapsed time is computed as (Date.now() - new Date(treatmentStartedAt).getTime()).
 * Survives page reloads, background tabs, and browser sleeps with millisecond accuracy.
 */
export default function TreatmentLiveTimer({ 
  treatmentStartedAt, 
  compact = false,
  className = '' 
}) {
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    if (!treatmentStartedAt) return 0;
    const start = new Date(treatmentStartedAt).getTime();
    return Math.max(0, Math.floor((Date.now() - start) / 1000));
  });

  useEffect(() => {
    if (!treatmentStartedAt) return;

    const updateTimer = () => {
      const start = new Date(treatmentStartedAt).getTime();
      const current = Date.now();
      const diff = Math.max(0, Math.floor((current - start) / 1000));
      setElapsedSeconds(diff);
    };

    // Immediate initial sync
    updateTimer();

    // 1-second interval update
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [treatmentStartedAt]);

  const formattedHMS = salonDB.formatDurationHMS(elapsedSeconds);

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-1.5 font-mono text-amber-300 font-bold ${className}`}>
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
        <span>{formattedHMS}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 shadow-sm ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
      </span>
      <div className="flex flex-col text-left">
        <span className="text-[9px] uppercase tracking-wider font-semibold text-amber-200/70 leading-none">
          Treatment Time
        </span>
        <span className="font-mono text-xs sm:text-sm font-extrabold tracking-wider text-amber-200">
          {formattedHMS}
        </span>
      </div>
    </div>
  );
}
