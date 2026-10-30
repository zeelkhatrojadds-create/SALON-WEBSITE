import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Check, 
  AlertCircle, 
  Calendar, 
  Coffee, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Save, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import salonDB, { DEFAULT_BUSINESS_HOURS } from '../../db/salonDatabase';

// Standard 30-minute interval presets for clean luxury UI
const TIME_PRESETS = [
  '07:00 AM', '07:30 AM', '08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM',
  '07:00 PM', '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM'
];

const ORDERED_DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' }
];

export default function AdminBusinessHours() {
  const [config, setConfig] = useState(() => salonDB.getBusinessHours());
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // New holiday form
  const [holidayDate, setHolidayDate] = useState('');
  const [holidayName, setHolidayName] = useState('');

  useEffect(() => {
    const handleSync = () => {
      setConfig(salonDB.getBusinessHours());
    };
    const unsub = salonDB.subscribe(handleSync);
    return () => unsub();
  }, []);

  const handleToggleDay = (dayKey) => {
    setConfig((prev) => {
      const currentDay = prev.days[dayKey];
      return {
        ...prev,
        days: {
          ...prev.days,
          [dayKey]: {
            ...currentDay,
            isOpen: !currentDay.isOpen
          }
        }
      };
    });
    setSaveSuccess(false);
    setErrorMessage('');
  };

  const handleTimeChange = (dayKey, field, value) => {
    setConfig((prev) => {
      const currentDay = prev.days[dayKey];
      const minutes = salonDB.timeStringToMinutes(value);
      return {
        ...prev,
        days: {
          ...prev.days,
          [dayKey]: {
            ...currentDay,
            [field]: value,
            [field === 'openTime' ? 'openMinutes' : 'closeMinutes']: minutes
          }
        }
      };
    });
    setSaveSuccess(false);
    setErrorMessage('');
  };

  const handleToggleBreak = () => {
    setConfig((prev) => ({
      ...prev,
      breakConfig: {
        ...prev.breakConfig,
        enabled: !prev.breakConfig?.enabled
      }
    }));
    setSaveSuccess(false);
    setErrorMessage('');
  };

  const handleBreakTimeChange = (field, value) => {
    setConfig((prev) => {
      const minutes = salonDB.timeStringToMinutes(value);
      return {
        ...prev,
        breakConfig: {
          ...prev.breakConfig,
          [field]: value,
          [field === 'startTime' ? 'startMinutes' : 'endMinutes']: minutes
        }
      };
    });
    setSaveSuccess(false);
    setErrorMessage('');
  };

  const handleAddHoliday = (e) => {
    e.preventDefault();
    if (!holidayDate) {
      setErrorMessage('Please select a closure date.');
      return;
    }
    const cleanDate = salonDB.normalizeDate(holidayDate);
    const exists = config.holidays?.some((h) => salonDB.normalizeDate(h.date) === cleanDate);
    if (exists) {
      setErrorMessage('A holiday closure for this date already exists.');
      return;
    }

    const updatedHolidays = [
      ...(config.holidays || []),
      { date: cleanDate, name: holidayName.trim() || 'Salon Special Closure' }
    ].sort((a, b) => a.date.localeCompare(b.date));

    setConfig((prev) => ({
      ...prev,
      holidays: updatedHolidays
    }));

    setHolidayDate('');
    setHolidayName('');
    setErrorMessage('');
  };

  const handleRemoveHoliday = (dateToRemove) => {
    setConfig((prev) => ({
      ...prev,
      holidays: (prev.holidays || []).filter((h) => h.date !== dateToRemove)
    }));
  };

  const handleSave = () => {
    try {
      setErrorMessage('');
      // 1. Validate every open day: closeTime > openTime
      for (const dayItem of ORDERED_DAYS) {
        const day = config.days[dayItem.key];
        if (day?.isOpen) {
          const openM = day.openMinutes ?? salonDB.timeStringToMinutes(day.openTime);
          const closeM = day.closeMinutes ?? salonDB.timeStringToMinutes(day.closeTime);
          if (closeM <= openM) {
            setErrorMessage(`${dayItem.label}: Closing time (${day.closeTime}) must be later than opening time (${day.openTime}).`);
            return;
          }
        }
      }

      // 2. Validate break if enabled
      if (config.breakConfig?.enabled) {
        const bStart = config.breakConfig.startMinutes ?? salonDB.timeStringToMinutes(config.breakConfig.startTime);
        const bEnd = config.breakConfig.endMinutes ?? salonDB.timeStringToMinutes(config.breakConfig.endTime);
        if (bEnd <= bStart) {
          setErrorMessage(`Break End Time (${config.breakConfig.endTime}) must be later than Break Start Time (${config.breakConfig.startTime}).`);
          return;
        }
      }

      salonDB.saveBusinessHours(config);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to save business hours.');
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset business hours to default studio schedule (Sunday Closed, Monday–Friday 9:30 AM–7:30 PM, Saturday 9:00 AM–7:00 PM)?')) {
      salonDB.saveBusinessHours(DEFAULT_BUSINESS_HOURS);
      setConfig(DEFAULT_BUSINESS_HOURS);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-4xl text-[#10110F]">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#DCE1D8]">
        <div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#10110F] flex items-center gap-2.5">
            <Clock className="w-7 h-7 text-[#263D2B]" />
            <span>Salon Business Hours & Schedule</span>
          </h2>
          <p className="text-[#6B7068] text-xs sm:text-sm mt-1">
            Configure weekly studio opening and closing times. Sunday is closed by default. Changes apply to the booking calendar and server validation immediately.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 rounded-xl border border-[#DCE1D8] hover:bg-[#F7F4ED] text-xs font-semibold text-[#6B7068] hover:text-[#10110F] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Schedule</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="global-button !py-2 !px-5 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Hours</span>
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-xs animate-fade-in">
          <Check className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>Salon business hours saved successfully! The online booking calendar, slot generator, and backend availability have been updated in real-time.</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2.5 shadow-xs animate-fade-in">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Timezone Info Pill */}
      <div className="p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-start gap-3 text-xs">
        <Info className="w-4 h-4 text-[#263D2B] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#10110F] block">Studio Standard Timezone: America/Toronto (Eastern Time)</span>
          <span className="text-[#6B7068]">
            Operating hours and same-day slot expiration are calculated relative to Ottawa, Ontario. For today, time slots that have already passed are automatically hidden from online customers.
          </span>
        </div>
      </div>

      {/* 1. WEEKLY SALON SCHEDULE CARD */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#DCE1D8] shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#10110F]">Weekly Operating Schedule</h3>
            <p className="text-xs text-[#6B7068]">Toggle days open/closed and adjust opening and closing times.</p>
          </div>
          <span className="text-xs font-mono font-bold text-[#263D2B] bg-[#263D2B]/10 px-3 py-1 rounded-full border border-[#263D2B]/20">
            Sunday Strictly Closed
          </span>
        </div>

        <div className="divide-y divide-[#DCE1D8]/70">
          {ORDERED_DAYS.map(({ key, label }) => {
            const day = config.days[key] || DEFAULT_BUSINESS_HOURS.days[key];
            const isOpen = Boolean(day?.isOpen);
            const isSunday = key === 'sunday';

            return (
              <div 
                key={key} 
                className={`py-3.5 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 transition-colors ${
                  !isOpen ? 'bg-[#F7F4ED]/40 px-3 rounded-2xl' : ''
                }`}
              >
                {/* Day Name & Toggle */}
                <div className="flex items-center gap-3 sm:w-44">
                  <button
                    type="button"
                    onClick={() => handleToggleDay(key)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#263D2B]/40 ${
                      isOpen ? 'bg-[#263D2B]' : 'bg-[#DCE1D8]'
                    }`}
                    aria-label={`Toggle ${label}`}
                  >
                    <span 
                      className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                        isOpen ? 'left-6' : 'left-1'
                      }`} 
                    />
                  </button>
                  <div>
                    <span className={`font-semibold text-sm block ${isOpen ? 'text-[#10110F]' : 'text-[#6B7068]'}`}>
                      {label}
                    </span>
                    <span className={`text-[10.5px] font-bold uppercase tracking-wider block ${
                      isOpen ? 'text-[#263D2B]' : 'text-red-500'
                    }`}>
                      {isOpen ? 'Open' : 'Closed'}
                    </span>
                  </div>
                </div>

                {/* Hours Selectors */}
                {isOpen ? (
                  <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#6B7068]">Opens:</span>
                      <select
                        value={day.openTime}
                        onChange={(e) => handleTimeChange(key, 'openTime', e.target.value)}
                        className="py-1.5 px-2.5 rounded-xl border border-[#DCE1D8] bg-white text-xs font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B] focus:ring-1 focus:ring-[#263D2B]"
                      >
                        {TIME_PRESETS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <span className="text-xs text-[#6B7068] font-bold">—</span>

                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-[#6B7068]">Closes:</span>
                      <select
                        value={day.closeTime}
                        onChange={(e) => handleTimeChange(key, 'closeTime', e.target.value)}
                        className="py-1.5 px-2.5 rounded-xl border border-[#DCE1D8] bg-white text-xs font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B] focus:ring-1 focus:ring-[#263D2B]"
                      >
                        {TIME_PRESETS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50/70 border border-red-200/60 px-3 py-1.5 rounded-xl">
                    <span className="font-semibold">Closed — No appointments bookable</span>
                    {isSunday && <span className="text-[10.5px] text-red-500 font-mono">(Weekly rest day)</span>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. STAFF BREAKS & REST PERIODS CARD */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#DCE1D8] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center">
              <Coffee className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#10110F]">Daily Staff Rest & Sanitization Break</h3>
              <p className="text-xs text-[#6B7068]">Optionally block a recurring midday window across all open days.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleToggleBreak}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#263D2B]/40 ${
              config.breakConfig?.enabled ? 'bg-[#263D2B]' : 'bg-[#DCE1D8]'
            }`}
            aria-label="Toggle Staff Break"
          >
            <span 
              className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform absolute top-1 ${
                config.breakConfig?.enabled ? 'left-6' : 'left-1'
              }`} 
            />
          </button>
        </div>

        {config.breakConfig?.enabled ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] text-xs">
            <div>
              <label className="block text-[#10110F] font-bold mb-1">Break Start Time</label>
              <select
                value={config.breakConfig?.startTime || '01:30 PM'}
                onChange={(e) => handleBreakTimeChange('startTime', e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-[#DCE1D8] bg-white font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B]"
              >
                {TIME_PRESETS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[#10110F] font-bold mb-1">Break End Time</label>
              <select
                value={config.breakConfig?.endTime || '02:00 PM'}
                onChange={(e) => handleBreakTimeChange('endTime', e.target.value)}
                className="w-full py-2 px-3 rounded-xl border border-[#DCE1D8] bg-white font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B]"
              >
                {TIME_PRESETS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2 text-[11px] text-[#6B7068]">
              Slots falling during this time are automatically removed from public availability and rejected by server validation.
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#6B7068] italic">
            Continuous operating schedule with no scheduled midday break.
          </p>
        )}
      </div>

      {/* 3. SPECIAL HOLIDAY CLOSURES CARD */}
      <div className="bg-white rounded-3xl p-5 sm:p-7 border border-[#DCE1D8] shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DCE1D8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#263D2B]/10 text-[#263D2B] flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#10110F]">Special Holiday & Studio Closures</h3>
              <p className="text-xs text-[#6B7068]">Specify single-day holiday closures where bookings will be disabled.</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-[#6B7068]">
            {config.holidays?.length || 0} Scheduled
          </span>
        </div>

        {/* Existing Holiday List */}
        <div className="space-y-2">
          {config.holidays && config.holidays.length > 0 ? (
            config.holidays.map((h) => (
              <div 
                key={h.date} 
                className="p-3 rounded-2xl bg-[#F7F4ED] border border-[#DCE1D8] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="font-mono font-bold text-[#263D2B] bg-white px-2.5 py-1 rounded-lg border border-[#DCE1D8]">
                    {h.date}
                  </div>
                  <div>
                    <span className="font-bold text-[#10110F] block">{h.name}</span>
                    <span className="text-[10.5px] text-[#6B7068]">All appointment requests blocked</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveHoliday(h.date)}
                  className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove Holiday"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <p className="text-xs text-[#6B7068] italic p-3 bg-[#F7F4ED]/50 rounded-2xl border border-[#DCE1D8]">
              No special holidays scheduled. The regular weekly schedule applies.
            </p>
          )}
        </div>

        {/* Add Holiday Form */}
        <form onSubmit={handleAddHoliday} className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
          <input
            type="date"
            value={holidayDate}
            onChange={(e) => setHolidayDate(e.target.value)}
            className="w-full sm:w-44 py-2 px-3 rounded-xl border border-[#DCE1D8] bg-white text-xs font-semibold text-[#10110F] focus:outline-none focus:border-[#263D2B]"
          />
          <input
            type="text"
            placeholder="Holiday Name (e.g. Diwali, Thanksgiving)"
            value={holidayName}
            onChange={(e) => setHolidayName(e.target.value)}
            className="w-full sm:flex-1 py-2 px-3 rounded-xl border border-[#DCE1D8] bg-white text-xs text-[#10110F] focus:outline-none focus:border-[#263D2B]"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#263D2B] hover:bg-[#1A291D] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Holiday</span>
          </button>
        </form>
      </div>

      {/* Save Button Bar */}
      <div className="pt-4 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={handleResetDefaults}
          className="px-4 py-2.5 rounded-xl border border-[#DCE1D8] hover:bg-[#F7F4ED] text-xs font-semibold text-[#6B7068] hover:text-[#10110F] transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Defaults</span>
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="global-button !py-2.5 !px-6 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

    </div>
  );
}
