import { useSignal, useTask$, $ } from "@builder.io/qwik";
import type { UseRatingProps } from "../Rating.types";

export const useRating = (props: UseRatingProps) => {
  const {
    value,
    defaultValue = 0,
    max = 5,
    precision = 1,
    readOnly = false,
    disabled = false,
    allowClear = false,
    labels,
    onValueChange$,
    onChange$,
    onHoverChange$,
  } = props;

  // State management
  const internalValue = useSignal(defaultValue);
  const hoverValue = useSignal<number | null>(null);
  const isFocused = useSignal(false);

  // Sync with controlled value
  useTask$(({ track }) => {
    track(() => value);
    if (value !== undefined) {
      internalValue.value = value;
    }
  });

  // Get the current value (controlled or uncontrolled)
  const currentValue = value !== undefined ? value : internalValue.value;

  // Round value based on precision
  const roundValue = $((val: number): number => {
    if (precision === 0.5) {
      return Math.round(val * 2) / 2;
    }
    return Math.round(val);
  });

  // Handle rating selection
  const handleSelect$ = $(async (newValue: number, event?: Event) => {
    if (readOnly || disabled) return;

    const roundedValue = await roundValue(newValue);
    let finalValue: number | null = roundedValue;

    // Allow clearing if clicking on the same value
    if (allowClear && roundedValue === currentValue) {
      finalValue = 0;
    }

    // Update internal value for uncontrolled component
    if (value === undefined) {
      internalValue.value = finalValue;
    }

    // Call callbacks
    if (onValueChange$) {
      await onValueChange$(finalValue);
    }
    if (onChange$ && event) {
      await onChange$(event, finalValue);
    }
  });

  // Handle mouse enter for hover effect
  const handleMouseEnter$ = $(async (val: number) => {
    if (readOnly || disabled) return;

    hoverValue.value = val;
    if (onHoverChange$) {
      await onHoverChange$(val);
    }
  });

  // Handle mouse leave
  const handleMouseLeave$ = $(async () => {
    if (readOnly || disabled) return;

    hoverValue.value = null;
    if (onHoverChange$) {
      await onHoverChange$(null);
    }
  });

  // Handle keyboard navigation
  const handleKeyDown$ = $(async (event: KeyboardEvent) => {
    if (readOnly || disabled) return;

    const step = precision === 0.5 ? 0.5 : 1;
    let newValue = currentValue;

    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        newValue = Math.max(0, currentValue - step);
        break;
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        newValue = Math.min(max, currentValue + step);
        break;
      case "Home":
        event.preventDefault();
        newValue = 0;
        break;
      case "End":
        event.preventDefault();
        newValue = max;
        break;
      case "Delete":
      case "Backspace":
        if (allowClear) {
          event.preventDefault();
          newValue = 0;
        }
        break;
      default:
        // Handle number keys
        const num = parseInt(event.key, 10);
        if (!isNaN(num) && num >= 0 && num <= max) {
          event.preventDefault();
          newValue = num;
        }
        return;
    }

    if (newValue !== currentValue) {
      await handleSelect$(newValue, event);
    }
  });

  // Generate rating ID
  const ratingId = `rating-${Math.random().toString(36).substr(2, 9)}`;

  // Get label for current value - synchronous function to avoid Promise in aria-valuetext
  const getLabel = (val: number): string => {
    if (labels && labels[Math.ceil(val) - 1]) {
      return labels[Math.ceil(val) - 1];
    }
    return `${val} out of ${max} stars`;
  };

  // Calculate display value (considering hover)
  const displayValue =
    hoverValue.value !== null ? hoverValue.value : currentValue;

  // Get responsive size classes following established Form component patterns
  const getSizeClasses = (size: "sm" | "md" | "lg") => {
    const sizeMap = {
      sm: {
        container: "gap-1 mobile:gap-1.5 tablet:gap-1",
        star: "w-4 h-4 mobile:w-5 mobile:h-5 tablet:w-4 tablet:h-4", // Icon size
        touchTarget: "min-w-[44px] min-h-[44px] mobile:min-w-[44px] mobile:min-h-[44px] tablet:min-w-[40px] tablet:min-h-[40px]", // WCAG AAA compliant
        spacing: "gap-0.5 mobile:gap-1 tablet:gap-0.5",
        text: "text-sm mobile:text-sm tablet:text-sm",
      },
      md: {
        container: "gap-1.5 mobile:gap-2 tablet:gap-1.5",
        star: "w-6 h-6 mobile:w-7 mobile:h-7 tablet:w-6 tablet:h-6", // Icon size
        touchTarget: "min-w-[44px] min-h-[44px] mobile:min-w-[44px] mobile:min-h-[44px] tablet:min-w-[40px] tablet:min-h-[40px]", // WCAG AAA compliant
        spacing: "gap-1 mobile:gap-1.5 tablet:gap-1",
        text: "text-base mobile:text-base tablet:text-base",
      },
      lg: {
        container: "gap-2 mobile:gap-2.5 tablet:gap-2",
        star: "w-8 h-8 mobile:w-9 mobile:h-9 tablet:w-8 tablet:w-8", // Icon size
        touchTarget: "min-w-[44px] min-h-[44px] mobile:min-w-[44px] mobile:min-h-[44px] tablet:min-w-[40px] tablet:min-h-[40px]", // WCAG AAA compliant
        spacing: "gap-1.5 mobile:gap-2 tablet:gap-1.5",
        text: "text-lg mobile:text-lg tablet:text-lg",
      },
    };
    return sizeMap[size];
  };

  return {
    ratingId,
    currentValue,
    hoverValue: hoverValue.value,
    displayValue,
    isFocused: isFocused.value,
    handleSelect$,
    handleMouseEnter$,
    handleMouseLeave$,
    handleKeyDown$,
    getLabel,
    getSizeClasses,
    setFocused: $((focused: boolean) => {
      isFocused.value = focused;
    }),
  };
};
