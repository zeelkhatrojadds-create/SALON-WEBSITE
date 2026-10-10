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
      <span className={`inline-flex items-center gap-1.5 font-mono text-[#263D2B] font-bold ${className}`}>
        <span className="w-2 h-2 rounded-full bg-[#263D2B] animate-ping inline-block" />
        <span>{formattedHMS}</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#263D2B]/10 border border-[#263D2B]/20 text-[#263D2B] shadow-sm ${className}`}>
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#263D2B] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#263D2B]"></span>
      </span>
      <div className="flex flex-col text-left">
        <span className="text-[9px] uppercase tracking-wider font-semibold text-[#465640] leading-none">
          Treatment Time
        </span>
        <span className="font-mono text-xs sm:text-sm font-extrabold tracking-wider text-[#10110F]">
          {formattedHMS}
        </span>
      </div>
    </div>
  );
}
