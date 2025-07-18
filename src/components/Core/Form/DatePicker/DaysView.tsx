import { component$, $ } from '@builder.io/qwik';
import { CalendarDay } from './CalendarDay';
import { dateUtils } from './utils/dateUtils';
import type { DateRange, DatePickerView, MonthNavigationDirection } from './DatePicker.types';
import type { QRL } from '@builder.io/qwik';

export interface DaysViewProps {
  viewDate: Date;
  selectedDate?: Date | DateRange | null;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale: string;
  weekStart: number;
  onDateSelect$: QRL<(year: number, month: number, day: number) => void>;
  onNavigate$: QRL<(direction: MonthNavigationDirection) => void>;
  onViewChange$: QRL<(view: DatePickerView) => void>;
  dayNames: string[];
}

export const DaysView = component$<DaysViewProps>(({
  viewDate,
  selectedDate,
  minDate,
  maxDate,
  disabledDates,
  locale,
  weekStart,
  onDateSelect$,
  onNavigate$,
  onViewChange$,
  dayNames
}) => {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = dateUtils.getDaysInMonth(year, month);
  const firstDayOfMonth = dateUtils.getFirstDayOfMonth(year, month);
  
  const days = [];
  let dayOffset = firstDayOfMonth - weekStart;
  if (dayOffset < 0) dayOffset += 7;
  
  // Previous month days
  for (let i = 0; i < dayOffset; i++) {
    const day = daysInMonth - dayOffset + i + 1;
    const date = new Date(year, month - 1, day);
    days.push(
      <CalendarDay
        key={`prev-${i}`}
        date={date}
        month={month}
        year={year}
        selected={selectedDate || null}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        onDateSelect$={onDateSelect$}
      />
    );
  }
  
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push(
      <CalendarDay
        key={`curr-${i}`}
        date={date}
        month={month}
        year={year}
        selected={selectedDate || null}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        onDateSelect$={onDateSelect$}
      />
    );
  }
  
  // Next month days
  const nextMonthDays = 42 - days.length; // 6 rows of 7 days = 42
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(year, month + 1, i);
    days.push(
      <CalendarDay
        key={`next-${i}`}
        date={date}
        month={month}
        year={year}
        selected={selectedDate || null}
        minDate={minDate}
        maxDate={maxDate}
        disabledDates={disabledDates}
        onDateSelect$={onDateSelect$}
      />
    );
  }

  // Create handler wrappers to avoid serialization issues
  const handlePrevClick = $(() => {
    onNavigate$('prev');
  });
  
  const handleNextClick = $(() => {
    onNavigate$('next');
  });
  
  const handleMonthYearClick = $(() => {
    onViewChange$('months');
  });
  
  return (
    <div class="calendar-days-view">
      <div class="calendar-header flex justify-between items-center p-2">
        <button
          type="button"
          class="calendar-nav-button"
          onClick$={handlePrevClick}
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        
        <div class="calendar-header-info">
          <button
            type="button"
            class="calendar-month-year"
            onClick$={handleMonthYearClick}
            aria-label="View months"
          >
            {new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(viewDate)}
          </button>
        </div>
        
        <button
          type="button"
          class="calendar-nav-button"
          onClick$={handleNextClick}
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div class="calendar-weekdays grid grid-cols-7 gap-0 mb-1">
        {dayNames.map((name, index) => (
          <div key={index} class="calendar-day-name w-8 h-8 flex items-center justify-center text-xs font-medium">
            {name}
          </div>
        ))}
      </div>
      
      <div class="calendar-days-grid grid grid-cols-7 gap-0">
        {days}
      </div>
    </div>
  );
}); 