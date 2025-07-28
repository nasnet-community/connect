import { $, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type {
  CalendarViewProps,
  DatePickerView,
  MonthNavigationDirection,
} from "../DatePicker.types";
import { dateUtils } from "../utils/dateUtils";

export interface UseCalendarViewResult {
  // State
  internalViewDate: { value: Date };

  // Event handlers (now QRLs that can be directly passed to components)
  handleNavigate$: QRL<(direction: MonthNavigationDirection) => void>;
  handleViewChange$: QRL<(view: DatePickerView) => void>;
  handleDateSelect$: QRL<(year: number, month: number, day: number) => void>;
  handleMonthSelect$: QRL<(month: number) => void>;
  handleYearSelect$: QRL<(year: number) => void>;

  // Utility functions
  getDayNames: () => string[];
  getMonthNames: () => string[];

  // Render helpers
  formatMonthYear: (date: Date, locale: string) => string;
  formatYear: (date: Date) => number;
}

export function useCalendarView(
  props: CalendarViewProps,
): UseCalendarViewResult {
  const {
    viewDate,
    weekStart = 0,
    locale = "en",
    onDateSelect$,
    onNavigate$,
    onViewChange$,
    currentView,
  } = props;

  // State signal to track internal view date
  const internalViewDate = useSignal<Date>(new Date(viewDate));

  // Navigate to previous/next month/year/decade - serializable QRL
  const handleNavigate$ = $((direction: MonthNavigationDirection) => {
    const current = new Date(internalViewDate.value);

    if (currentView === "days") {
      if (direction === "prev") {
        dateUtils.addMonths(current, -1);
      } else {
        dateUtils.addMonths(current, 1);
      }
    } else if (currentView === "months") {
      if (direction === "prev") {
        current.setFullYear(current.getFullYear() - 1);
      } else {
        current.setFullYear(current.getFullYear() + 1);
      }
    } else if (currentView === "years") {
      const decade = direction === "prev" ? -10 : 10;
      current.setFullYear(current.getFullYear() + decade);
    }

    internalViewDate.value = current;

    if (onNavigate$) {
      onNavigate$(direction);
    }
  });

  // Handle view change (days/months/years) - serializable QRL
  const handleViewChange$ = $((view: DatePickerView) => {
    if (onViewChange$) {
      onViewChange$(view);
    }
  });

  // Handle date selection - serializable QRL
  const handleDateSelect$ = $((year: number, month: number, day: number) => {
    if (onDateSelect$) {
      const selectedDate = new Date(year, month, day);
      onDateSelect$(selectedDate);
    }
  });

  // Handle month selection - serializable QRL
  const handleMonthSelect$ = $((month: number) => {
    const newDate = new Date(internalViewDate.value);
    newDate.setMonth(month);
    internalViewDate.value = newDate;
    if (onViewChange$) {
      onViewChange$("days");
    }
  });

  // Handle year selection - serializable QRL
  const handleYearSelect$ = $((year: number) => {
    const newDate = new Date(internalViewDate.value);
    newDate.setFullYear(year);
    internalViewDate.value = newDate;
    if (onViewChange$) {
      onViewChange$("months");
    }
  });

  // Format day names based on locale and week start
  const getDayNames = () => {
    const weekDays = [];
    const baseDate = new Date(2020, 0, 5 + weekStart); // Jan 5th 2020 is a Sunday

    for (let i = 0; i < 7; i++) {
      weekDays.push(
        new Intl.DateTimeFormat(locale, { weekday: "short" }).format(baseDate),
      );
      baseDate.setDate(baseDate.getDate() + 1);
    }

    return weekDays;
  };

  // Generate month names based on locale
  const getMonthNames = () => {
    const monthNames = [];
    const baseDate = new Date(2020, 0, 1);

    for (let i = 0; i < 12; i++) {
      baseDate.setMonth(i);
      monthNames.push(
        new Intl.DateTimeFormat(locale, { month: "long" }).format(baseDate),
      );
    }

    return monthNames;
  };

  // Format helper for month and year display
  const formatMonthYear = (date: Date, localeOverride?: string) => {
    return new Intl.DateTimeFormat(localeOverride || locale, {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Format helper for year display
  const formatYear = (date: Date) => {
    return date.getFullYear();
  };

  return {
    internalViewDate,
    handleNavigate$,
    handleViewChange$,
    handleDateSelect$,
    handleMonthSelect$,
    handleYearSelect$,
    getDayNames,
    getMonthNames,
    formatMonthYear,
    formatYear,
  };
}
