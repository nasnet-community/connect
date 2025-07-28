import { $, useComputed$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type {
  DatePickerProps,
  SingleDatePickerProps,
  RangeDatePickerProps,
  DateTimePickerProps,
  DateRange,
} from "../DatePicker.types";

export interface UseSelectionHandlersResult {
  handleDateSelect$: QRL<(date: Date) => void>;
  handleTimeSelect$: QRL<
    (hours: number, minutes: number, seconds?: number) => void
  >;
  handleClear$: QRL<() => void>;
  handleInputChange$: QRL<(event: Event) => void>;
  selectedDateForCalendar: { value: Date | DateRange | null };
}

export function useSelectionHandlers(
  props: DatePickerProps,
  formatDate$: QRL<(date: Date | null) => Promise<string>>,
  parseDate$: QRL<(dateString: string) => Promise<Date | null>>,
  inputValue: { value: string },
  inputRef: { value: HTMLInputElement | undefined },
  isOpen: { value: boolean },
  viewDate: { value: Date },
  inline: boolean,
  closeOnSelect: boolean,
): UseSelectionHandlersResult {
  // Update range selection input value
  const updateRangeValue = $((range: DateRange) => {
    if (props.mode === "range") {
      const rangeProps = props as RangeDatePickerProps;
      const separator = rangeProps.rangeSeparator || " - ";

      if (range.startDate) {
        if (range.endDate) {
          Promise.all([
            formatDate$(range.startDate),
            formatDate$(range.endDate),
          ]).then(([startFormatted, endFormatted]: [string, string]) => {
            inputValue.value = `${startFormatted}${separator}${endFormatted}`;
          });
        } else {
          formatDate$(range.startDate).then((formatted: string) => {
            inputValue.value = formatted;
          });
        }
      } else {
        inputValue.value = "";
      }
    }
  });

  // Handle date selection
  const handleDateSelect$ = $((date: Date) => {
    const nativeEvent = new Event("change", { bubbles: true });

    if (props.mode === "single") {
      const singleProps = props as SingleDatePickerProps;
      // Format the date
      formatDate$(date).then((formatted: string) => {
        inputValue.value = formatted;

        if (inputRef.value) {
          inputRef.value.dispatchEvent(nativeEvent);
        }

        if (singleProps.onDateSelect$) {
          singleProps.onDateSelect$(date);
        }

        if (closeOnSelect && !inline) {
          isOpen.value = false;
        }
      });
    } else if (props.mode === "range") {
      const rangeProps = props as RangeDatePickerProps;
      const currentRange = rangeProps.value || {
        startDate: null,
        endDate: null,
      };

      if (!currentRange.startDate || currentRange.endDate) {
        // New selection or complete previous selection
        const newRange = { startDate: date, endDate: null };
        updateRangeValue(newRange);

        if (rangeProps.onRangeSelect$) {
          rangeProps.onRangeSelect$(newRange);
        }
      } else {
        // Complete the range
        const startDate = currentRange.startDate;
        let newRange: DateRange;

        if (date < startDate) {
          newRange = { startDate: date, endDate: startDate };
        } else {
          newRange = { startDate, endDate: date };
        }

        updateRangeValue(newRange);

        if (rangeProps.onRangeSelect$) {
          rangeProps.onRangeSelect$(newRange);
        }

        if (rangeProps.autoApply !== false && closeOnSelect && !inline) {
          isOpen.value = false;
        }
      }
    } else if (props.mode === "datetime") {
      const dateTimeProps = props as DateTimePickerProps;

      // For datetime, we select the date but don't close yet - time selection follows
      const currentDateTime = dateTimeProps.value
        ? new Date(dateTimeProps.value)
        : new Date();

      // Set the date components but preserve time
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        currentDateTime.getHours(),
        currentDateTime.getMinutes(),
        currentDateTime.getSeconds(),
      );

      // Format date
      formatDate$(newDate).then((formatted: string) => {
        inputValue.value = formatted;

        if (inputRef.value) {
          inputRef.value.dispatchEvent(nativeEvent);
        }

        if (dateTimeProps.onDateSelect$) {
          dateTimeProps.onDateSelect$(newDate);
        }
      });
    }
  });

  // Handle time selection for datetime mode
  const handleTimeSelect$ = $(
    (hours: number, minutes: number, seconds: number = 0) => {
      if (props.mode !== "datetime") return;

      const dateTimeProps = props as DateTimePickerProps;
      const currentDate = dateTimeProps.value || new Date();

      const newDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        hours,
        minutes,
        seconds,
      );

      formatDate$(newDate).then((formatted: string) => {
        inputValue.value = formatted;

        const nativeEvent = new Event("change", { bubbles: true });
        if (inputRef.value) {
          inputRef.value.dispatchEvent(nativeEvent);
        }

        if (dateTimeProps.onDateSelect$) {
          dateTimeProps.onDateSelect$(newDate);
        }

        if (closeOnSelect && !inline) {
          isOpen.value = false;
        }
      });
    },
  );

  // Clear the selection
  const handleClear$ = $(() => {
    inputValue.value = "";

    if (props.mode === "single") {
      const singleProps = props as SingleDatePickerProps;
      if (singleProps.onDateSelect$) {
        singleProps.onDateSelect$(null);
      }
    } else if (props.mode === "range") {
      const rangeProps = props as RangeDatePickerProps;
      const emptyRange = { startDate: null, endDate: null };

      if (rangeProps.onRangeSelect$) {
        rangeProps.onRangeSelect$(emptyRange);
      }
    } else if (props.mode === "datetime") {
      const dateTimeProps = props as DateTimePickerProps;
      if (dateTimeProps.onDateSelect$) {
        dateTimeProps.onDateSelect$(null);
      }
    }

    const nativeEvent = new Event("change", { bubbles: true });
    if (inputRef.value) {
      inputRef.value.dispatchEvent(nativeEvent);
    }

    if (!inline) {
      isOpen.value = false;
    }
  });

  // Handle input change
  const handleInputChange$ = $((event: Event) => {
    const target = event.target as HTMLInputElement;
    inputValue.value = target.value;

    parseDate$(target.value).then((parsedDate: Date | null) => {
      // Only proceed if we got a valid Date
      if (parsedDate && parsedDate instanceof Date) {
        if (props.mode === "single") {
          const singleProps = props as SingleDatePickerProps;
          if (singleProps.onDateSelect$) {
            singleProps.onDateSelect$(parsedDate);
          }
        } else if (props.mode === "datetime") {
          const dateTimeProps = props as DateTimePickerProps;
          if (dateTimeProps.onDateSelect$) {
            dateTimeProps.onDateSelect$(parsedDate);
          }
        }
      }
    });
  });

  // Calculate currently selected date/range for the calendar
  const selectedDateForCalendar = useComputed$(() => {
    if (props.mode === "single" || props.mode === "datetime") {
      const dateProps = props as SingleDatePickerProps | DateTimePickerProps;
      return dateProps.value || null;
    } else if (props.mode === "range") {
      const rangeProps = props as RangeDatePickerProps;
      return rangeProps.value || { startDate: null, endDate: null };
    }

    return null;
  });

  return {
    handleDateSelect$,
    handleTimeSelect$,
    handleClear$,
    handleInputChange$,
    selectedDateForCalendar,
  };
}
