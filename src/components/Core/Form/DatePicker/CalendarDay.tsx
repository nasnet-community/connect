import { component$, $ } from "@builder.io/qwik";
import { dateUtils } from "./utils/dateUtils";
import type { DateRange } from "./DatePicker.types";
import type { QRL } from "@builder.io/qwik";

export interface CalendarDayProps {
  date: Date;
  month: number;
  year: number; // Keep in interface for potential future use
  selected: Date | DateRange | null;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  // Use a serializable primitive in the event handler
  onDateSelect$: QRL<(year: number, month: number, day: number) => void>;
}

export const CalendarDay = component$<CalendarDayProps>(
  ({
    date,
    month,
    // year parameter removed from destructuring as it's not used
    selected,
    minDate,
    maxDate,
    disabledDates,
    onDateSelect$,
  }) => {
    const isCurrentMonth = date.getMonth() === month;
    const isDisabled = dateUtils.isDateDisabled(
      date,
      minDate,
      maxDate,
      disabledDates,
    );
    const isToday = dateUtils.isToday(date);

    // Extract date parts
    const day = date.getDate();
    const dateMonth = date.getMonth();
    const dateYear = date.getFullYear();

    // Determine if this date is selected
    let isSelected = false;
    if (selected) {
      if (selected instanceof Date) {
        isSelected = dateUtils.isSameDay(date, selected);
      } else {
        const { startDate, endDate } = selected;
        isSelected =
          dateUtils.isSameDay(date, startDate) ||
          dateUtils.isSameDay(date, endDate);
      }
    }

    // Determine if this date is in a selected range
    let isInRange = false;
    if (selected && !(selected instanceof Date)) {
      const { startDate, endDate } = selected;
      if (startDate && endDate) {
        isInRange = dateUtils.isInRange(date, selected);
      }
    }

    // Build CSS classes
    const dayClasses = [
      "calendar-day",
      "w-8",
      "h-8",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center",
      "text-sm",
      "cursor-pointer",
      "transition-colors",
      "duration-150",
      isCurrentMonth
        ? "text-text-primary dark:text-text-dark-primary"
        : "text-text-muted dark:text-text-dark-muted",
      isToday ? "border border-primary-500" : "",
      isSelected ? "bg-primary-500 text-white" : "",
      isInRange && !isSelected ? "bg-primary-100 dark:bg-primary-800" : "",
      isDisabled
        ? "cursor-not-allowed opacity-50"
        : "hover:bg-primary-100 dark:hover:bg-primary-800",
    ]
      .filter(Boolean)
      .join(" ");

    // Create a proper serializable handler
    const handleDayClick = $(() => {
      if (!isDisabled) {
        onDateSelect$(dateYear, dateMonth, day);
      }
    });

    return (
      <div class={dayClasses} onClick$={handleDayClick}>
        {day}
      </div>
    );
  },
);
