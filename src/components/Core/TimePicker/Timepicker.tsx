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
  variant?: "default" | "outline" | "filled";
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

  // Enhanced size classes with mobile optimization
  const sizeClasses = {
    sm: {
      container: "gap-2 sm:gap-3",
      select: "h-8 sm:h-9 text-sm px-2 pr-7 sm:px-3 sm:pr-8",
      label: "text-xs sm:text-sm",
      icon: "h-3 w-3 sm:h-4 sm:w-4",
      separator: "text-sm sm:text-base",
      touchTarget: "min-h-[44px] sm:min-h-[32px]", // 44px minimum for touch
    },
    md: {
      container: "gap-3 sm:gap-4",
      select: "h-10 sm:h-11 text-sm sm:text-base px-3 pr-8 sm:px-4 sm:pr-10",
      label: "text-sm sm:text-base",
      icon: "h-4 w-4 sm:h-5 sm:w-5",
      separator: "text-base sm:text-lg",
      touchTarget: "min-h-[48px] sm:min-h-[40px]",
    },
    lg: {
      container: "gap-4 sm:gap-5",
      select: "h-12 sm:h-14 text-base sm:text-lg px-4 pr-10 sm:px-5 sm:pr-12",
      label: "text-base sm:text-lg",
      icon: "h-5 w-5 sm:h-6 sm:w-6",
      separator: "text-lg sm:text-xl",
      touchTarget: "min-h-[52px] sm:min-h-[48px]",
    },
  };

  // Enhanced variant classes with better animations and touch states
  const variantClasses = {
    default: {
      select: `
        border border-border-DEFAULT dark:border-border-dark
        bg-surface-DEFAULT dark:bg-surface-dark
        hover:border-primary-400 dark:hover:border-primary-600
        focus:border-primary-500 dark:focus:border-primary-500
        hover:shadow-sm dark:hover:shadow-dark-sm
        focus:shadow-primary/20 dark:focus:shadow-primary/30
        active:shadow-inner
        transition-all duration-200 ease-out
        touch:active:scale-[0.98] motion-safe:hover:animate-lift
      `,
    },
    outline: {
      select: `
        border-2 border-border-DEFAULT dark:border-border-dark
        bg-transparent
        hover:border-primary-400 dark:hover:border-primary-600
        focus:border-primary-500 dark:focus:border-primary-500
        hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary
        focus:bg-surface-light-tertiary dark:focus:bg-surface-dark-tertiary
        active:bg-surface-light-quaternary dark:active:bg-surface-dark-quaternary
        transition-all duration-200 ease-out
        touch:active:scale-[0.98] motion-safe:hover:animate-lift
      `,
    },
    filled: {
      select: `
        border border-transparent
        bg-gray-100 dark:bg-gray-800
        hover:bg-gray-200 dark:hover:bg-gray-700
        focus:bg-surface-DEFAULT dark:focus:bg-surface-dark
        focus:border-primary-500 dark:focus:border-primary-500
        active:bg-gray-300 dark:active:bg-gray-600
        transition-all duration-200 ease-out
        touch:active:scale-[0.98] motion-safe:hover:animate-lift
      `,
    },
  };

  const selectClasses = `
    appearance-none rounded-lg font-medium
    text-text-DEFAULT dark:text-text-dark-default
    focus:ring-2 focus:ring-primary-500/20 dark:focus:ring-primary-500/30
    focus:outline-none focus:ring-offset-2 focus:ring-offset-surface-DEFAULT dark:focus:ring-offset-surface-dark
    disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none
    ${sizeClasses[size].select}
    ${sizeClasses[size].touchTarget}
    ${variantClasses[variant].select}
    ${error ? "border-error-500 dark:border-error-400 focus:border-error-500 dark:focus:border-error-400 focus:ring-error-500/20" : ""}
    ${loading ? "animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700" : ""}
    cursor-pointer touch:cursor-none
    transform-gpu will-change-transform
    safe-touch-manipulation
  `;

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
    <div class={`${inline ? "inline-block" : "block"} ${className || ""}`}>
      {label && (
        <label
          for={id}
          class={`
            block mb-2 font-medium
            text-text-DEFAULT dark:text-text-dark-default
            ${sizeClasses[size].label}
            ${required ? "after:content-['*'] after:ml-0.5 after:text-error-500" : ""}
          `}
        >
          {label}
        </label>
      )}

      <div class={`flex items-center ${sizeClasses[size].container}`}>
        {/* Hours */}
        <div class="flex-1">
          <label
            class={`
              block mb-1.5 font-medium
              text-gray-600 dark:text-gray-400
              ${sizeClasses[size].label}
            `}
          >
            {$localize`Hours`}
          </label>
          <div class="relative">
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
              class={selectClasses}
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
            <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2">
              <svg
                class={`
                  ${sizeClasses[size].icon}
                  text-gray-400 dark:text-gray-500
                `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div class={`
          flex items-end pb-2
          text-gray-400 dark:text-gray-500
          ${sizeClasses[size].separator}
          font-medium
        `}>
          :
        </div>

        {/* Minutes */}
        <div class="flex-1">
          <label
            class={`
              block mb-1.5 font-medium
              text-gray-600 dark:text-gray-400
              ${sizeClasses[size].label}
            `}
          >
            {$localize`Minutes`}
          </label>
          <div class="relative">
            <select
              name={name ? `${name}-minute` : undefined}
              value={time.minute}
              disabled={disabled || loading}
              aria-label={$localize`Select minute`}
              aria-invalid={error}
              onChange$={(e, currentTarget) => onChange$("minute", currentTarget.value)}
              onKeyDown$={(e) => handleKeyDown$(e, "minute")}
              class={selectClasses}
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
            <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2">
              <svg
                class={`
                  ${sizeClasses[size].icon}
                  text-gray-400 dark:text-gray-500
                `}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Seconds (optional) */}
        {showSeconds && (
          <>
            <div class={`
              flex items-end pb-2
              text-gray-400 dark:text-gray-500
              ${sizeClasses[size].separator}
              font-medium
            `}>
              :
            </div>
            <div class="flex-1">
              <label
                class={`
                  block mb-1.5 font-medium
                  text-gray-600 dark:text-gray-400
                  ${sizeClasses[size].label}
                `}
              >
                {$localize`Seconds`}
              </label>
              <div class="relative">
                <select
                  name={name ? `${name}-second` : undefined}
                  value={time.second || "00"}
                  disabled={disabled || loading}
                  aria-label={$localize`Select second`}
                  aria-invalid={error}
                  onChange$={(e, currentTarget) => onChange$("second", currentTarget.value)}
                  onKeyDown$={(e) => handleKeyDown$(e, "second")}
                  class={selectClasses}
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
                <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2">
                  <svg
                    class={`
                      ${sizeClasses[size].icon}
                      text-gray-400 dark:text-gray-500
                    `}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}

        {/* AM/PM Selector for 12-hour format */}
        {format === "12" && (
          <>
            <div class="ms-2"></div>
            <div class="flex-1">
              <label
                class={`
                  block mb-1.5 font-medium
                  text-gray-600 dark:text-gray-400
                  ${sizeClasses[size].label}
                `}
              >
                {$localize`Period`}
              </label>
              <div class="relative">
                <select
                  name={name ? `${name}-period` : undefined}
                  value={time.period || "AM"}
                  disabled={disabled || loading}
                  aria-label={$localize`Select AM or PM`}
                  aria-invalid={error}
                  onChange$={(e, currentTarget) => onChange$("period", currentTarget.value)}
                  class={selectClasses}
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-2">
                  <svg
                    class={`
                      ${sizeClasses[size].icon}
                      text-gray-400 dark:text-gray-500
                    `}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Clear Button */}
        {showClearButton && onClear$ && (
          <div class="flex items-end pb-2">
            <button
              type="button"
              onClick$={onClear$}
              disabled={disabled || loading}
              aria-label={$localize`Clear time`}
              class={`
                p-2 rounded-lg transition-all duration-200
                text-gray-400 dark:text-gray-500
                hover:text-gray-600 dark:hover:text-gray-300
                hover:bg-gray-100 dark:hover:bg-gray-800
                focus:outline-none focus:ring-2 focus:ring-primary-500/20
                disabled:opacity-50 disabled:cursor-not-allowed
                ${sizeClasses[size].icon}
              `}
            >
              <svg
                class="w-full h-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
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