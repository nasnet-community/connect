import type { QRL } from "@builder.io/qwik";

export type DatePickerSize = "sm" | "md" | "lg";
export type DatePickerView = "days" | "months" | "years";
export type DateFormat =
  | "yyyy-MM-dd"
  | "MM/dd/yyyy"
  | "dd/MM/yyyy"
  | "dd.MM.yyyy"
  | string;
export type DatePickerPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";
export type DatePickerTrigger = "click" | "hover" | "focus";
export type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type MonthNavigationDirection = "prev" | "next";

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface DatePickerBaseProps {
  mode?: "single" | "range" | "datetime";
  size?: DatePickerSize;
  disabled?: boolean;
  inline?: boolean;
  closeOnSelect?: boolean;
  showCalendarButton?: boolean;
  openOnFocus?: boolean;
  dateFormat?: DateFormat;
  locale?: string;
  placement?: DatePickerPlacement;
  trigger?: DatePickerTrigger;
  label?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  fullWidth?: boolean;
  weekStart?: WeekStart;
  showWeekNumbers?: boolean;
  clearable?: boolean;
  showTodayButton?: boolean;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  containerClass?: string;
  inputClass?: string;
  calendarClass?: string;
  formatDate$?: QRL<(date: Date) => string>;
  parseDate$?: QRL<(dateStr: string) => Date | null>;
  onOpen$?: QRL<() => void>;
  onClose$?: QRL<() => void>;
  initialView?: DatePickerView;
  id?: string;
}

export interface SingleDatePickerProps extends DatePickerBaseProps {
  mode: "single";
  value?: Date;
  defaultValue?: Date;
  onDateSelect$?: QRL<(date: Date | null) => void>;
}

export interface RangeDatePickerProps extends DatePickerBaseProps {
  mode: "range";
  value?: DateRange;
  defaultValue?: DateRange;
  rangeSeparator?: string;
  autoApply?: boolean;
  showApplyButton?: boolean;
  showCancelButton?: boolean;
  applyButtonText?: string;
  cancelButtonText?: string;
  onRangeSelect$?: QRL<(range: DateRange) => void>;
}

export interface DateTimePickerProps extends DatePickerBaseProps {
  mode: "datetime";
  value?: Date;
  defaultValue?: Date;
  timeFormat?: string;
  timeIncrement?: number;
  showSeconds?: boolean;
  use12HourTime?: boolean;
  minTime?: string;
  maxTime?: string;
  onDateSelect$?: QRL<(date: Date | null) => void>;
}

export type DatePickerProps =
  | SingleDatePickerProps
  | RangeDatePickerProps
  | DateTimePickerProps;

export interface CalendarViewProps {
  viewDate: Date;
  selectedDate?: Date | DateRange | null;
  currentView: DatePickerView;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];
  locale?: string;
  weekStart?: WeekStart;
  showWeekNumbers?: boolean;
  showClearButton?: boolean;
  showTodayButton?: boolean;
  onDateSelect$?: QRL<(date: Date) => void>;
  onViewChange$?: QRL<(view: DatePickerView) => void>;
  onNavigate$?: QRL<(direction: MonthNavigationDirection) => void>;
  onClear$?: QRL<() => void>;
  onToday$?: QRL<() => void>;
}

export interface TimeSelectorProps {
  value: Date;
  showSeconds?: boolean;
  use12HourTime?: boolean;
  disabled?: boolean;
  onTimeSelect$: QRL<
    (hours: number, minutes: number, seconds?: number) => void
  >;
}
