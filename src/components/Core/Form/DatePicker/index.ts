/**
 * DatePicker Component
 *
 * The DatePicker provides flexible date selection with support for
 * single date, date range, and date-time selection.
 */

// Export components
export { DatePicker } from "./DatePicker";
export { CalendarView } from "./CalendarView";
export { CalendarHeader } from "./CalendarHeader";
export { CalendarDay } from "./CalendarDay";
export { TimeSelector } from "./TimeSelector";

// Export hooks
export { useDatePicker } from "./hooks/useDatePicker";
export { useDateFormatter } from "./hooks/useDateFormatter";
export { useCalendarState } from "./hooks/useCalendarState";
export { useCalendarPopup } from "./hooks/useCalendarPopup";
export { useInputState } from "./hooks/useInputState";
export { useSelectionHandlers } from "./hooks/useSelectionHandlers";
export { useStyles } from "./hooks/useStyles";

// Export utilities
export { dateUtils } from "./utils/dateUtils";

// Export types
export type {
  DatePickerProps,
  SingleDatePickerProps,
  RangeDatePickerProps,
  DateTimePickerProps,
  DatePickerSize,
  DatePickerView,
  DateFormat,
  DatePickerPlacement,
  DatePickerTrigger,
  WeekStart,
  DateRange,
  MonthNavigationDirection,
  CalendarViewProps,
  TimeSelectorProps,
} from "./DatePicker.types";
