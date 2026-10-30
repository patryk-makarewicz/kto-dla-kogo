'use client';

import { CalendarIcon, XIcon } from 'lucide-react';
import { useState } from 'react';
import { pl } from 'react-day-picker/locale';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatDate, parseIsoDate, toIsoDate } from '@/lib/format';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  id?: string;
  /** `YYYY-MM-DD` or empty string */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const DatePicker = ({ id, value, onChange, placeholder = 'Wybierz datę' }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = parseIsoDate(value);
  const today = new Date();

  return (
    <div className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            id={id}
            type="button"
            className={cn(
              'bg-card border-input focus-visible:ring-ring flex h-11 w-full items-center gap-2 rounded-lg border-2 px-3.5 text-left text-base outline-none focus-visible:ring-[3px]',
              selected && 'pr-10'
            )}
          >
            <CalendarIcon className="text-muted-foreground size-4 shrink-0" />
            <span className={cn('truncate', !selected && 'text-muted-foreground')}>
              {selected ? formatDate(value) : placeholder}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-1" align="start">
          <Calendar
            mode="single"
            locale={pl}
            selected={selected}
            defaultMonth={selected ?? today}
            startMonth={today}
            disabled={{ before: today }}
            onSelect={(date) => {
              onChange(date ? toIsoDate(date) : '');
              setIsOpen(false);
            }}
            autoFocus
          />
        </PopoverContent>
      </Popover>
      {selected && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Wyczyść datę"
          className="text-muted-foreground hover:bg-secondary hover:text-foreground focus-visible:ring-ring absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-1 outline-none focus-visible:ring-[3px]"
        >
          <XIcon className="size-4" />
        </button>
      )}
    </div>
  );
};
