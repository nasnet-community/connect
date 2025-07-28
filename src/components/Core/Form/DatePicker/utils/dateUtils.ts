import type { DateRange } from "../DatePicker.types";

/**
 * Utility functions for date operations
 */
export const dateUtils = {
  isInRange(date: Date, range: DateRange): boolean {
    if (!range.startDate || !range.endDate) return false;
    return date >= range.startDate && date <= range.endDate;
  },

  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  },

  isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  },

  isDateDisabled(
    date: Date,
    minDate?: Date,
    maxDate?: Date,
    disabledDates?: Date[],
  ): boolean {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (disabledDates) {
      return disabledDates.some((disabledDate) =>
        this.isSameDay(disabledDate, date),
      );
    }
    return false;
  },

  getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  },

  getFirstDayOfMonth(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  },

  getWeekNumber(date: Date): number {
    const target = new Date(date.valueOf());
    const dayNr = (date.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  },

  addMonths(date: Date, count: number): Date {
    const result = new Date(date);
    const m = result.getMonth() + count;
    let n = 0;

    if (m < 0) {
      n = Math.floor(m / 12) - 1;
    } else {
      n = Math.floor(m / 12);
    }

    result.setMonth(m - n * 12);
    result.setFullYear(result.getFullYear() + n);

    return result;
  },

  addYears(date: Date, count: number): Date {
    const result = new Date(date);
    result.setFullYear(date.getFullYear() + count);
    return result;
  },

  formatDate(
    date: Date,
    locale: string,
    options?: Intl.DateTimeFormatOptions,
  ): string {
    try {
      if (!options) {
        options = { year: "numeric", month: "2-digit", day: "2-digit" };
      }
      return new Intl.DateTimeFormat(locale, options).format(date);
    } catch (error) {
      console.error("Error formatting date:", error);
      return "";
    }
  },

  parseDate(dateString: string): Date | null {
    try {
      const date = new Date(dateString);
      return isNaN(date.getTime()) ? null : date;
    } catch (error) {
      console.error("Error parsing date:", error);
      return null;
    }
  },
};
