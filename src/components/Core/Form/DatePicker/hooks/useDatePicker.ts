import { $, useTask$ } from "@builder.io/qwik";
import type {
  DatePickerProps,
  SingleDatePickerProps,
  RangeDatePickerProps,
  DateTimePickerProps,
  DateRange,
} from "../DatePicker.types";
import { useDateFormatter } from "./useDateFormatter";
import { useCalendarState } from "./useCalendarState";
import { useInputState } from "./useInputState";
import { useCalendarPopup } from "./useCalendarPopup";
import { useSelectionHandlers } from "./useSelectionHandlers";
import { useStyles } from "./useStyles";

export type UseDatePickerProps = DatePickerProps;

export function useDatePicker(props: UseDatePickerProps) {
  // Parse props with defaults
  const {
    id = `datepicker-${Math.random().toString(36).substring(2, 11)}`,
    size = "md",
    disabled = false,
    inline = false,
    closeOnSelect = true,
    placement = "bottom-start",
    fullWidth = false,
    errorMessage,
  } = props;

  // Use date formatting hook
  const { formatDate$, parseDate$ } = useDateFormatter(props);

  // Use calendar state hook
  const {
    currentView,
    viewDate,
    handleNavigate$,
    handleViewChange$,
    handleToday$,
  } = useCalendarState(props);

  // Use input state hook
  const {
    inputValue,
    inputRef,
    isFocused,
    isOpen,
    handleInputFocus$,
    handleInputBlur$,
    toggleCalendar$,
  } = useInputState(props, props.onOpen$, props.onClose$);

  // Use styles hook
  const { containerClasses, inputClasses } = useStyles(
    size,
    disabled,
    fullWidth,
    errorMessage,
    isFocused,
    props.containerClass,
    props.inputClass,
  );

  // Use calendar popup hook
  const { calendarRef, calendarContainerClasses } = useCalendarPopup(
    size,
    placement,
    isOpen,
    inline,
    inputRef,
    props.onClose$,
    props.calendarClass,
  );

  // Use selection handlers hook
  const {
    handleDateSelect$,
    handleTimeSelect$,
    handleClear$,
    handleInputChange$,
    selectedDateForCalendar,
  } = useSelectionHandlers(
    props,
    formatDate$,
    parseDate$,
    inputValue,
    inputRef,
    isOpen,
    viewDate,
    inline,
    closeOnSelect,
  );

  // Setup initial value
  useTask$(async ({ track }) => {
    const trackedProps = track(() => props);

    if (trackedProps.mode === "single") {
      const singleProps = trackedProps as SingleDatePickerProps;
      const initialDate = singleProps.value ?? singleProps.defaultValue ?? null;

      if (initialDate) {
        const formatted = await formatDate$(initialDate);
        inputValue.value = formatted;
        viewDate.value = new Date(initialDate);
      }
    } else if (trackedProps.mode === "range") {
      const rangeProps = trackedProps as RangeDatePickerProps;
      const initialRange = rangeProps.value ??
        rangeProps.defaultValue ?? { startDate: null, endDate: null };

      if (initialRange.startDate) {
        viewDate.value = new Date(initialRange.startDate);
        // Update range value
        const updateRange = $((range: DateRange) => {
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
        await updateRange(initialRange);
      }
    } else if (trackedProps.mode === "datetime") {
      const dateTimeProps = trackedProps as DateTimePickerProps;
      const initialDate =
        dateTimeProps.value ?? dateTimeProps.defaultValue ?? null;

      if (initialDate) {
        const formatted = await formatDate$(initialDate);
        inputValue.value = formatted;
        viewDate.value = new Date(initialDate);
      }
    }
  });

  return {
    // Refs
    inputRef,
    calendarRef,

    // State signals
    isOpen,
    inputValue,
    currentView,
    viewDate,
    isFocused,
    selectedDateForCalendar,

    // CSS classes
    containerClasses,
    inputClasses,
    calendarContainerClasses,

    // Handlers
    handleDateSelect: handleDateSelect$,
    handleTimeSelect: handleTimeSelect$,
    handleNavigate: handleNavigate$,
    handleViewChange: handleViewChange$,
    handleClear: handleClear$,
    handleToday: handleToday$,
    toggleCalendar: toggleCalendar$,
    handleInputFocus: handleInputFocus$,
    handleInputBlur: handleInputBlur$,
    handleInputChange: handleInputChange$,

    // ID
    id,
  };
}
