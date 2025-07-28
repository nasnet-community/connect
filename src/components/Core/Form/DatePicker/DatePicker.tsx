import { component$ } from "@builder.io/qwik";
import type { DatePickerProps, DateTimePickerProps } from "./DatePicker.types";
import { CalendarView } from "./CalendarView";
import { TimeSelector } from "./TimeSelector";
import { useDatePicker } from "./hooks/useDatePicker";

/**
 * DatePicker component for selecting dates with various modes and features.
 */
export const DatePicker = component$<DatePickerProps>((props) => {
  const {
    mode = "single",
    disabled = false,
    placeholder,
    label,
    required = false,
    helperText,
    errorMessage,
    clearable = true,
    showTodayButton = false,
    inline = false,
    weekStart = 0,
    showWeekNumbers = false,
    minDate,
    maxDate,
    disabledDates,
  } = props;

  // Use the hook to get all the functionality and state
  const {
    id,
    inputRef,
    calendarRef,
    isOpen,
    inputValue,
    currentView,
    viewDate,
    selectedDateForCalendar,
    containerClasses,
    inputClasses,
    calendarContainerClasses,
    handleDateSelect,
    handleTimeSelect,
    handleNavigate,
    handleViewChange,
    handleClear,
    handleToday,
    toggleCalendar,
    handleInputFocus,
    handleInputBlur,
    handleInputChange,
  } = useDatePicker(props);

  // Render different parts of the datepicker
  const renderInput = () => {
    if (inline) return null;

    const isReadOnly = mode === "range"; // In range mode, direct input is not allowed

    return (
      <div class="relative w-full">
        {label && (
          <label
            for={id}
            class={`text-text-secondary dark:text-text-dark-secondary mb-1 block text-sm font-medium ${required ? "required" : ""}`}
          >
            {label}
            {required && <span class="ml-1 text-error">*</span>}
          </label>
        )}

        <div class="relative flex w-full">
          <input
            ref={inputRef}
            id={id}
            type="text"
            class={inputClasses}
            value={inputValue.value}
            placeholder={placeholder || "Select date"}
            disabled={disabled}
            readOnly={isReadOnly}
            onInput$={handleInputChange}
            onFocus$={handleInputFocus}
            onBlur$={handleInputBlur}
            aria-haspopup="dialog"
            aria-expanded={isOpen.value}
            aria-label={placeholder || "Date"}
          />

          <button
            type="button"
            class={`
              absolute right-0 top-0 flex h-full items-center justify-center rounded-r-md
              px-2 transition-colors duration-200
              ${
                disabled
                  ? "cursor-not-allowed text-gray-400 opacity-50 dark:text-gray-600"
                  : "cursor-pointer text-gray-400 hover:bg-gray-50 hover:text-primary-600 dark:text-gray-500 dark:hover:bg-gray-700/50 dark:hover:text-primary-400"
              }
              touch-manipulation
              focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-400
            `}
            onClick$={toggleCalendar}
            disabled={disabled}
            aria-label="Toggle calendar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          {clearable && inputValue.value && !disabled && (
            <button
              type="button"
              class="absolute right-8 top-0 h-full cursor-pointer px-2 hover:text-primary-600"
              onClick$={handleClear}
              aria-label="Clear date"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>

        {helperText && !errorMessage && (
          <p class="text-text-muted dark:text-text-dark-muted mt-1 text-sm">
            {helperText}
          </p>
        )}

        {errorMessage && <p class="mt-1 text-sm text-error">{errorMessage}</p>}
      </div>
    );
  };

  const renderCalendar = () => {
    return (
      <div ref={calendarRef} class={calendarContainerClasses}>
        <CalendarView
          viewDate={viewDate.value}
          selectedDate={selectedDateForCalendar.value}
          currentView={currentView.value}
          minDate={minDate}
          maxDate={maxDate}
          disabledDates={disabledDates}
          locale={props.locale || "en"}
          weekStart={weekStart}
          showWeekNumbers={showWeekNumbers}
          showClearButton={clearable}
          showTodayButton={showTodayButton}
          onDateSelect$={handleDateSelect}
          onViewChange$={handleViewChange}
          onNavigate$={handleNavigate}
          onClear$={handleClear}
          onToday$={handleToday}
        />

        {mode === "datetime" && currentView.value === "days" && (
          <TimeSelector
            value={(props as DateTimePickerProps).value || new Date()}
            showSeconds={(props as DateTimePickerProps).showSeconds}
            use12HourTime={(props as DateTimePickerProps).use12HourTime}
            onTimeSelect$={handleTimeSelect}
          />
        )}
      </div>
    );
  };

  return (
    <div class={containerClasses}>
      {renderInput()}
      {(isOpen.value || inline) && renderCalendar()}
    </div>
  );
});
