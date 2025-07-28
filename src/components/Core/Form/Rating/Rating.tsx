import { component$, useSignal, $ } from "@builder.io/qwik";
import type { RatingProps } from "./Rating.types";
import { useRating } from "./hooks/useRating";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { FormErrorMessage } from "../FormErrorMessage";

/**
 * Rating component for selecting numeric values using stars or custom icons.
 * Supports half-star precision, keyboard navigation, and various customization options.
 */
export const Rating = component$<RatingProps>((props) => {
  const {
    value,
    defaultValue = 0,
    max = 5,
    precision = 1,
    size = "md",
    readOnly = false,
    disabled = false,
    allowClear = false,
    icon,
    emptyIcon,
    labels,
    label,
    helperText,
    error,
    successMessage,
    warningMessage,
    required = false,
    name,
    id,
    class: className = "",
    labelClass = "",
    messageClass = "",
    showValue = false,
    onValueChange$,
    onChange$,
    onHoverChange$,
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
  } = props;

  const containerRef = useSignal<HTMLDivElement>();

  const {
    ratingId,
    currentValue,
    hoverValue,
    displayValue,
    isFocused,
    handleSelect$,
    handleMouseEnter$,
    handleMouseLeave$,
    handleKeyDown$,
    getLabel,
    getSizeClasses,
    setFocused,
  } = useRating({
    value,
    defaultValue,
    max,
    precision,
    readOnly,
    disabled,
    allowClear,
    labels,
    onValueChange$,
    onChange$,
    onHoverChange$,
  });

  // Generate IDs for accessibility
  const fieldId = id || ratingId;
  const helperId = helperText ? `${fieldId}-helper` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;
  const successId = successMessage ? `${fieldId}-success` : undefined;
  const warningId = warningMessage ? `${fieldId}-warning` : undefined;

  // Combine aria-describedby values
  const describedBy =
    [ariaDescribedBy, helperId, errorId, successId, warningId]
      .filter(Boolean)
      .join(" ") || undefined;

  // Get size classes from hook
  const sizeClasses = getSizeClasses(size);

  // Container classes
  const containerClasses = [
    "rating-container",
    disabled && "opacity-50 cursor-not-allowed",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Rating items container classes
  const ratingClasses = [
    "inline-flex items-center",
    sizeClasses.container,
    readOnly && "cursor-default",
    !readOnly && !disabled && "cursor-pointer",
    "touch-manipulation", // Better touch handling
    "select-none", // Prevent text selection on touch devices
  ]
    .filter(Boolean)
    .join(" ");

  // Render star icon
  const StarIcon = (props: { filled: boolean; half?: boolean }) => {
    const { filled, half } = props;

    if (icon && filled && !half) {
      return typeof icon === "function" ? icon({ filled: true }) : icon;
    }

    if (emptyIcon && !filled) {
      return typeof emptyIcon === "function"
        ? emptyIcon({ filled: false })
        : emptyIcon;
    }

    // Default star icons with consistent sizing using semantic classes
    const iconSizeClass = sizeClasses.star;
    
    if (half) {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          class={`${iconSizeClass} flex-shrink-0 transition-colors duration-200`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`half-${fieldId}`}>
              <stop offset="50%" stop-color="currentColor" />
              <stop offset="50%" stop-color="transparent" />
            </linearGradient>
          </defs>
          <path
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            fill={`url(#half-${fieldId})`}
            stroke="currentColor"
            stroke-width="1"
            stroke-linejoin="round"
          />
        </svg>
      );
    }

    return (
      <svg
        viewBox="0 0 24 24"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        stroke-width={filled ? "0" : "2"}
        class={`${iconSizeClass} flex-shrink-0 transition-colors duration-200`}
        aria-hidden="true"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );
  };

  // Calculate if a star should be filled
  const isStarFilled = (
    index: number,
    value: number,
  ): "full" | "half" | "empty" => {
    const starValue = index + 1;
    if (value >= starValue) return "full";
    if (precision === 0.5 && value >= starValue - 0.5) return "half";
    return "empty";
  };

  // Handle click on star
  const handleStarClick$ = $(
    async (index: number, isFirstHalf: boolean, event: MouseEvent) => {
      if (readOnly || disabled) return;

      let newValue = index + 1;
      if (precision === 0.5 && isFirstHalf) {
        newValue = index + 0.5;
      }

      await handleSelect$(newValue, event);
    },
  );

  // Handle mouse move for half-star precision
  const handleMouseMove$ = $(async (index: number, event: MouseEvent) => {
    if (readOnly || disabled || precision !== 0.5) return;

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const isFirstHalf = x < rect.width / 2;

    const newValue = isFirstHalf ? index + 0.5 : index + 1;
    if (hoverValue !== newValue) {
      await handleMouseEnter$(newValue);
    }
  });

  return (
    <div class={containerClasses} ref={containerRef}>
      {label && (
        <FormLabel
          for={fieldId}
          required={required}
          class={labelClass}
          disabled={disabled}
        >
          {label}
        </FormLabel>
      )}

      <div class="flex items-center gap-2">
        <div
          id={fieldId}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={max}
          aria-valuenow={currentValue}
          aria-valuetext={getLabel(currentValue)}
          aria-label={ariaLabel || label || "Rating"}
          aria-describedby={describedBy}
          aria-disabled={disabled}
          aria-readonly={readOnly}
          tabIndex={readOnly || disabled ? -1 : 0}
          class={[
            ratingClasses,
            "focus:outline-none",
            "rounded-md transition-all duration-200",
            isFocused && "ring-2 ring-primary-500 ring-offset-2 dark:ring-primary-400 dark:ring-offset-surface-dark-DEFAULT",
            isFocused && "shadow-sm dark:shadow-dark-sm",
          ]
            .filter(Boolean)
            .join(" ")}
          onKeyDown$={handleKeyDown$}
          onMouseLeave$={handleMouseLeave$}
          onFocus$={() => setFocused(true)}
          onBlur$={() => setFocused(false)}
        >
          {Array.from({ length: max }, (_, index) => {
            const fillType = isStarFilled(index, displayValue);
            const isHovered = hoverValue !== null && index < hoverValue;

            return (
              <div
                key={index}
                class={[
                  "relative flex items-center justify-center transition-all duration-200",
                  sizeClasses.touchTarget,
                  "touch-manipulation", // Better touch handling
                  "rounded-md", // Rounded for better focus indicators
                  !readOnly && !disabled && "hover:scale-110 cursor-pointer",
                  !readOnly && !disabled && "focus-within:scale-110",
                  // Semantic colors for filled stars using primary theme
                  (fillType === "full" ||
                    (fillType === "half" && precision === 0.5)) &&
                    "text-primary-500 dark:text-primary-400",
                  // Semantic colors for empty stars using surface colors
                  fillType === "empty" && "text-surface-light-quaternary dark:text-surface-dark-quaternary",
                  // Hover state using semantic colors
                  isHovered && "text-primary-400 dark:text-primary-300",
                  // Highlight current star when focused using secondary colors
                  isFocused &&
                    index === Math.floor(currentValue) - 1 &&
                    "ring-2 ring-secondary-300 dark:ring-secondary-600 bg-secondary-50 dark:bg-secondary-900/20",
                  // Active state for better touch feedback
                  !readOnly && !disabled && "active:scale-95 motion-safe:transition-transform",
                  // Better hover states with semantic colors
                  !readOnly && !disabled && "hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onMouseEnter$={() =>
                  !readOnly && !disabled && handleMouseEnter$(index + 1)
                }
                onMouseMove$={
                  precision === 0.5
                    ? (e) => handleMouseMove$(index, e)
                    : undefined
                }
                onClick$={(e) => {
                  if (precision === 0.5) {
                    const rect = (
                      e.currentTarget as HTMLElement
                    ).getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const isFirstHalf = x < rect.width / 2;
                    handleStarClick$(index, isFirstHalf, e);
                  } else {
                    handleStarClick$(index, false, e);
                  }
                }}
                aria-hidden="true"
              >
                <div class="pointer-events-none flex items-center justify-center w-full h-full">
                  <StarIcon
                    filled={fillType !== "empty"}
                    half={fillType === "half"}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {showValue && (
          <span class={[
            "ml-2 select-none transition-colors duration-200",
            sizeClasses.text,
            "text-surface-light-quaternary dark:text-surface-dark-quaternary",
          ].join(" ")}>
            {currentValue.toFixed(precision === 0.5 ? 1 : 0)} / {max}
          </span>
        )}
      </div>

      {/* Hidden input for form submission */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={currentValue}
          disabled={disabled}
        />
      )}

      {/* Messages */}
      {helperText && !error && !successMessage && !warningMessage && (
        <FormHelperText id={helperId} class={messageClass}>
          {helperText}
        </FormHelperText>
      )}
      {error && (
        <FormErrorMessage id={errorId} class={messageClass}>
          {error}
        </FormErrorMessage>
      )}
      {successMessage && !error && (
        <FormHelperText
          id={successId}
          class={`text-success-600 dark:text-success-400 ${messageClass}`}
        >
          {successMessage}
        </FormHelperText>
      )}
      {warningMessage && !error && !successMessage && (
        <FormHelperText
          id={warningId}
          class={`text-warning-600 dark:text-warning-400 ${messageClass}`}
        >
          {warningMessage}
        </FormHelperText>
      )}
    </div>
  );
});
