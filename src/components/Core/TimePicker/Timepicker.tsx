import { component$, type QRL, useComputed$, $ } from "@builder.io/qwik";

export interface TimeValue {
  hour: string;
  minute: string;
  second?: string;
  period?: "AM" | "PM";
}

export interface TimePickerProps {
  time: TimeValue;
  onChange$: QRL<(type: keyof TimeValue, value: string) => void>;
  format?: "12" | "24";
  showSeconds?: boolean;
  disabled?: boolean;
  disabledTimes?: {
    hours?: number[];
    minutes?: number[];
    seconds?: number[];
  };
  minuteStep?: 1 | 5 | 10 | 15 | 30;
  secondStep?: 1 | 5 | 10 | 15 | 30;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "glassmorphic" | "minimal" | "outline" | "filled";
  showClearButton?: boolean;
  onClear$?: QRL<() => void>;
  placeholder?: {
    hour?: string;
    minute?: string;
    second?: string;
  };
  error?: boolean;
  errorMessage?: string;
  label?: string;
  id?: string;
  name?: string;
  required?: boolean;
  class?: string;
  inline?: boolean;
  readOnly?: boolean;
  loading?: boolean;
  _autoFocus?: boolean;
  _tabIndex?: number;
  dir?: "ltr" | "rtl" | "auto";
  _touchOptimized?: boolean;
}

export const TimePicker = component$<TimePickerProps>(({
  time,
  onChange$,
  format = "24",
  showSeconds = false,
  disabled = false,
  disabledTimes,
  minuteStep = 5,
  secondStep = 5,
  size = "md",
  variant = "default",
  showClearButton = false,
  onClear$,
  placeholder,
  error = false,
  errorMessage,
  label,
  id,
  name,
  required = false,
  class: className,
  inline = false,
  readOnly = false,
  loading = false,
  _autoFocus = false,
  _tabIndex,
  dir = "auto",
  _touchOptimized,
}) => {
  // Note: These variables are kept for future development but prefixed with underscore
  const _isDropdownOpen = false;
  const _selectedField: keyof TimeValue | null = null;
  const _isPressed = false;
  const _ripplePosition = { x: 0, y: 0 };
  const _showRipple = false;
  
  // Enhanced defaults for mobile optimization - kept for future use
  const _effectiveTouchOptimized = _touchOptimized ?? (typeof window !== 'undefined' && 'ontouchstart' in window);
  const _effectiveDir = dir ?? (typeof document !== 'undefined' ? document.dir : 'ltr');

  // Memoized computation for hours based on format
  const hours = useComputed$(() => {
    const hourCount = format === "12" ? 12 : 24;
    const startHour = format === "12" ? 1 : 0;
    return Array.from({ length: hourCount }, (_, i) => {
      const hour = startHour + i;
      return {
        value: hour.toString().padStart(2, "0"),
        label: format === "12" ? hour.toString() : hour.toString().padStart(2, "0"),
        disabled: disabledTimes?.hours?.includes(hour),
      };
    });
  });

  // Memoized computation for minutes based on step
  const minutes = useComputed$(() => {
    const minuteCount = Math.floor(60 / minuteStep);
    return Array.from({ length: minuteCount }, (_, i) => {
      const minute = i * minuteStep;
      return {
        value: minute.toString().padStart(2, "0"),
        label: minute.toString().padStart(2, "0"),
        disabled: disabledTimes?.minutes?.includes(minute),
      };
    });
  });

  // Memoized computation for seconds based on step
  const seconds = useComputed$(() => {
    const secondCount = Math.floor(60 / secondStep);
    return Array.from({ length: secondCount }, (_, i) => {
      const second = i * secondStep;
      return {
        value: second.toString().padStart(2, "0"),
        label: second.toString().padStart(2, "0"),
        disabled: disabledTimes?.seconds?.includes(second),
      };
    });
  });

  // Simple, clean size classes
  const sizeClasses = {
    sm: {
      wrapper: "",
      container: "gap-2",
      select: "h-8 text-sm px-2 pr-7",
      label: "text-sm",
      icon: "h-4 w-4",
      separator: "text-base px-2",
      fieldLabel: "text-xs",
      clockIcon: "h-4 w-4",
      clearButton: "p-1",
    },
    md: {
      wrapper: "",
      container: "gap-3",
      select: "h-10 text-sm px-3 pr-8",
      label: "text-base",
      icon: "h-5 w-5",
      separator: "text-lg px-2",
      fieldLabel: "text-sm",
      clockIcon: "h-5 w-5",
      clearButton: "p-1.5",
    },
    lg: {
      wrapper: "",
      container: "gap-4",
      select: "h-12 text-base px-4 pr-10",
      label: "text-lg",
      icon: "h-6 w-6",
      separator: "text-xl px-3",
      fieldLabel: "text-base",
      clockIcon: "h-6 w-6",
      clearButton: "p-2",
    },
  };

  // Simple, clean variant classes
  const variantClasses: Record<string, { wrapper: string; select: string; separator: string }> = {
    default: {
      wrapper: "",
      select: `
        border border-border-DEFAULT dark:border-border-dark
        bg-surface-DEFAULT dark:bg-surface-dark
        hover:border-primary-400 dark:hover:border-primary-600
        focus:border-primary-500 dark:focus:border-primary-500
        transition-colors duration-200
      `,
      separator: "text-gray-400 dark:text-gray-500",
    },
    outline: {
      wrapper: "",
      select: `
        border-2 border-border-DEFAULT dark:border-border-dark
        bg-transparent
        hover:border-primary-400 dark:hover:border-primary-600
        focus:border-primary-500 dark:focus:border-primary-500
        transition-colors duration-200
      `,
      separator: "text-gray-400 dark:text-gray-500",
    },
    filled: {
      wrapper: "",
      select: `
        border border-transparent
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus:bg-gray-100 dark:focus:bg-gray-800
        focus:border-primary-500 dark:focus:border-primary-500
        transition-colors duration-200
      `,
      separator: "text-gray-500 dark:text-gray-400",
    },
    // Keep these for backward compatibility but simplify them
    glassmorphic: {
      wrapper: "",
      select: `
        border-2 border-border-DEFAULT dark:border-border-dark
        bg-transparent
        hover:border-primary-400 dark:hover:border-primary-600
        focus:border-primary-500 dark:focus:border-primary-500
        transition-colors duration-200
      `,
      separator: "text-gray-400 dark:text-gray-500",
    },
    minimal: {
      wrapper: "",
      select: `
        border border-transparent
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus:bg-gray-100 dark:focus:bg-gray-800
        focus:border-primary-500 dark:focus:border-primary-500
        transition-colors duration-200
      `,
      separator: "text-gray-500 dark:text-gray-400",
    },
  };

  // Simple dropdown arrow
  const dropdownArrowLight = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239ca3af'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`;

  const selectClasses = `
    appearance-none rounded-lg font-medium
    text-text-DEFAULT dark:text-text-dark-default
    focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-500/30
    focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size].select}
    ${variantClasses[variant].select}
    ${error ? "border-error-500 dark:border-error-400" : ""}
    ${loading ? "opacity-50" : ""}
    cursor-pointer
    bg-no-repeat
    [background-position:right_0.5rem_center]
    [background-size:1.25rem]
  `;

  // Apply background image style inline for dynamic theming
  const selectStyle = {
    backgroundImage: dropdownArrowLight,
  };

  const handleKeyDown$ = $((e: KeyboardEvent, field: keyof TimeValue) => {
    if (disabled || readOnly) return;

    const key = e.key;
    const currentValue = parseInt(time[field] || "0");

    if (key === "ArrowUp" || key === "ArrowDown") {
      e.preventDefault();
      let newValue = currentValue;
      
      if (field === "hour") {
        const maxHour = format === "12" ? 12 : 23;
        const minHour = format === "12" ? 1 : 0;
        newValue = key === "ArrowUp" 
          ? (currentValue >= maxHour ? minHour : currentValue + 1)
          : (currentValue <= minHour ? maxHour : currentValue - 1);
      } else if (field === "minute") {
        newValue = key === "ArrowUp"
          ? (currentValue >= 59 ? 0 : currentValue + minuteStep)
          : (currentValue <= 0 ? 59 : currentValue - minuteStep);
      } else if (field === "second") {
        newValue = key === "ArrowUp"
          ? (currentValue >= 59 ? 0 : currentValue + secondStep)
          : (currentValue <= 0 ? 59 : currentValue - secondStep);
      }

      onChange$(field, newValue.toString().padStart(2, "0"));
    }
  });

  return (
    <div class={`${inline ? "inline-block" : "block"} ${sizeClasses[size].wrapper} ${className || ""}`}>
      {label && (
        <label
          for={id}
          class={`
            flex items-center gap-2 mb-2 font-medium
            text-text-DEFAULT dark:text-text-dark-default
            ${sizeClasses[size].label}
            ${required ? "after:content-['*'] after:ml-0.5 after:text-error-500" : ""}
          `}
        >
          <svg
            class={`${sizeClasses[size].clockIcon} text-gray-400 dark:text-gray-500`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {label}
        </label>
      )}

      <div class={`flex items-center ${sizeClasses[size].container}`}>
        {/* Hours */}
        <div class="flex-1 sm:flex-initial">
          <label
            class={`
              block mb-1.5 sm:sr-only font-medium
              text-gray-600 dark:text-gray-400
              ${sizeClasses[size].fieldLabel}
            `}
          >
            {$localize`Hours`}
          </label>
          <select
            id={id}
            name={name ? `${name}-hour` : undefined}
            value={time.hour}
            disabled={disabled || loading}
            aria-label={$localize`Select hour`}
            aria-invalid={error}
            aria-describedby={errorMessage ? `${id}-error` : undefined}
            onChange$={(e, currentTarget) => onChange$("hour", currentTarget.value)}
            onKeyDown$={(e) => handleKeyDown$(e, "hour")}
            class={`${selectClasses} w-24`}
            style={selectStyle}
          >
            {placeholder?.hour && (
              <option value="" disabled>{placeholder.hour}</option>
            )}
            {hours.value.map((hour) => (
              <option 
                key={hour.value} 
                value={hour.value}
                disabled={hour.disabled}
              >
                {hour.label}
              </option>
            ))}
          </select>
        </div>

        {/* Separator */}
        <div class={`
          flex items-center
          ${sizeClasses[size].separator}
          ${variantClasses[variant].separator}
          font-medium
        `}>
          :
        </div>

        {/* Minutes */}
        <div class="flex-1 sm:flex-initial">
          <label
            class={`
              block mb-1.5 sm:sr-only font-medium
              text-gray-600 dark:text-gray-400
              ${sizeClasses[size].fieldLabel}
            `}
          >
            {$localize`Minutes`}
          </label>
          <select
            name={name ? `${name}-minute` : undefined}
            value={time.minute}
            disabled={disabled || loading}
            aria-label={$localize`Select minute`}
            aria-invalid={error}
            onChange$={(e, currentTarget) => onChange$("minute", currentTarget.value)}
            onKeyDown$={(e) => handleKeyDown$(e, "minute")}
            class={`${selectClasses} w-24`}
            style={selectStyle}
          >
            {placeholder?.minute && (
              <option value="" disabled>{placeholder.minute}</option>
            )}
            {minutes.value.map((minute) => (
              <option 
                key={minute.value} 
                value={minute.value}
                disabled={minute.disabled}
              >
                {minute.label}
              </option>
            ))}
          </select>
        </div>

        {/* Seconds (optional) */}
        {showSeconds && (
          <>
            <div class={`
              flex items-center
              ${sizeClasses[size].separator}
              ${variantClasses[variant].separator}
              font-medium
            `}>
              :
            </div>
            <div class="flex-1 sm:flex-initial">
              <label
                class={`
                  block mb-1.5 sm:sr-only font-medium
                  text-gray-600 dark:text-gray-400
                  ${sizeClasses[size].fieldLabel}
                `}
              >
                {$localize`Seconds`}
              </label>
              <select
                name={name ? `${name}-second` : undefined}
                value={time.second || "00"}
                disabled={disabled || loading}
                aria-label={$localize`Select second`}
                aria-invalid={error}
                onChange$={(e, currentTarget) => onChange$("second", currentTarget.value)}
                onKeyDown$={(e) => handleKeyDown$(e, "second")}
                class={`${selectClasses} w-24`}
                style={selectStyle}
              >
                {placeholder?.second && (
                  <option value="" disabled>{placeholder.second}</option>
                )}
                {seconds.value.map((second) => (
                  <option 
                    key={second.value} 
                    value={second.value}
                    disabled={second.disabled}
                  >
                    {second.label}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {/* AM/PM Selector for 12-hour format */}
        {format === "12" && (
          <>
            <div class="hidden sm:block sm:w-2"></div>
            <div class="flex-1 sm:flex-initial">
              <label
                class={`
                  block mb-1.5 sm:sr-only font-medium
                  text-gray-600 dark:text-gray-400
                  ${sizeClasses[size].fieldLabel}
                `}
              >
                {$localize`Period`}
              </label>
              <select
                name={name ? `${name}-period` : undefined}
                value={time.period || "AM"}
                disabled={disabled || loading}
                aria-label={$localize`Select AM or PM`}
                aria-invalid={error}
                onChange$={(e, currentTarget) => onChange$("period", currentTarget.value)}
                class={`${selectClasses} w-24`}
                style={selectStyle}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </>
        )}

        {/* Clear Button */}
        {showClearButton && onClear$ && (
          <div class="flex items-center ml-2">
            <button
              type="button"
              onClick$={onClear$}
              disabled={disabled || loading}
              aria-label={$localize`Clear time`}
              class={`
                ${sizeClasses[size].clearButton}
                rounded-lg transition-colors duration-200
                text-gray-400 dark:text-gray-500
                hover:text-gray-600 dark:hover:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-800
                focus:outline-none focus:ring-2 focus:ring-primary-500/20
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <svg
                class={sizeClasses[size].icon}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && errorMessage && (
        <p
          id={`${id}-error`}
          class={`
            mt-1 text-error-600 dark:text-error-400
            ${sizeClasses[size].label}
          `}
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {/* Loading Indicator */}
      {loading && (
        <div class="absolute inset-0 flex items-center justify-center bg-surface-DEFAULT/50 dark:bg-surface-dark/50 rounded-lg">
          <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-500"></div>
        </div>
      )}
    </div>
  );
});