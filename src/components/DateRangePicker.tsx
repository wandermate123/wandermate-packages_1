'use client';

import { useState, useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import { format, isAfter, startOfDay } from 'date-fns';
import type { DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onRangeChange: (startDate: string, endDate: string) => void;
  minDate?: Date;
  minNights?: number;
  placeholder?: string;
  className?: string;
}

const toDate = (s: string): Date | undefined =>
  s ? startOfDay(new Date(s)) : undefined;

const toISO = (d: Date): string => format(d, 'yyyy-MM-dd');

export default function DateRangePicker({
  startDate,
  endDate,
  onRangeChange,
  minDate = startOfDay(new Date()),
  minNights = 0,
  placeholder = 'Select travel dates',
  className = '',
}: DateRangePickerProps) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>(() => {
    const from = toDate(startDate);
    const to = toDate(endDate);
    if (from || to) return { from: from ?? to, to: to ?? from };
    return undefined;
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const from = toDate(startDate);
    const to = toDate(endDate);
    if (from || to) setRange({ from: from ?? to, to: to ?? from });
    else setRange(undefined);
  }, [startDate, endDate]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleSelect = (r: DateRange | undefined) => {
    setRange(r);
    if (r?.from) {
      const to = r.to && isAfter(r.to, r.from) ? r.to : r.from;
      onRangeChange(toISO(r.from), toISO(to));
      if (r.to && isAfter(r.to, r.from)) setOpen(false);
    } else {
      onRangeChange('', '');
    }
  };

  const displayText = range?.from
    ? range.to && isAfter(range.to, range.from)
      ? `${format(range.from, 'MMM d, yyyy')} – ${format(range.to, 'MMM d, yyyy')}`
      : format(range.from, 'MMM d, yyyy')
    : placeholder;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 px-4 py-3 border border-gray-300 rounded-lg bg-white text-left hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-colors"
      >
        <svg
          className="w-5 h-5 text-gray-500 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className={range?.from ? 'text-gray-900 font-medium' : 'text-gray-500'}>
          {displayText}
        </span>
        <svg
          className={`w-5 h-5 text-gray-400 ml-auto shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full mt-2 z-50 bg-white rounded-xl shadow-xl border border-gray-200 py-4">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            disabled={{ before: minDate }}
            min={minNights}
            defaultMonth={range?.from ?? minDate}
            numberOfMonths={1}
            showOutsideDays
            classNames={{
              root: 'rdp-travel',
              months: 'mx-4',
              month: 'space-y-4',
              caption: 'flex items-center justify-between px-1',
              caption_label: 'text-base font-semibold text-gray-900',
              nav: 'flex items-center gap-1',
              nav_button: 'h-9 w-9 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors',
              nav_button_previous: 'absolute left-1',
              nav_button_next: 'absolute right-1',
              table: 'w-full border-collapse',
              head_row: 'flex gap-1',
              head_cell: 'w-10 h-9 flex items-center justify-center text-xs font-medium text-gray-500 uppercase',
              row: 'flex gap-1 mt-1',
              cell: 'relative p-0 text-center',
              day: 'h-10 w-10 rounded-lg text-sm font-medium transition-colors flex items-center justify-center mx-auto hover:bg-gray-100 focus:bg-gray-100 focus:outline-none',
              day_outside: 'text-gray-300 opacity-50',
              day_disabled: 'text-gray-300 cursor-not-allowed line-through',
              day_hidden: 'invisible',
              day_today: 'bg-gray-100 text-gray-900 font-semibold',
              day_range_start: 'bg-gray-900 text-white rounded-l-lg rounded-r-none font-semibold',
              day_range_middle: 'bg-gray-100 text-gray-900 rounded-none',
              day_range_end: 'bg-gray-900 text-white rounded-r-lg rounded-l-none font-semibold',
              day_selected: 'bg-gray-900 text-white',
            }}
          />
        </div>
      )}
    </div>
  );
}
