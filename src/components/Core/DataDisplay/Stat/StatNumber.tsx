import {
  component$,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
import type { StatNumberProps } from "./Stat.types";
import { useStat } from "./hooks/useStat";

export const StatNumber = component$<StatNumberProps>((props) => {
  const {
    value,
    format = "number",
    decimals = 0,
    prefix = "",
    suffix = "",
    locale = "en-US",
    currency = "USD",
    animate = false,
    animationDuration = 1000,
    class: className,
    ...restProps
  } = props;

  const displayValue = useSignal<string>("");
  const animationFrame = useSignal<number | null>(null);

  const { formatValueSync, formatValueAsync } = useStat({
    format,
    decimals,
    prefix,
    suffix,
    locale,
    currency,
  });

  // Remove scoped styles in favor of Tailwind classes

  useTask$(async ({ track, cleanup }) => {
    track(() => value);
    track(() => animate);

    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (animate && !isNaN(numericValue)) {
      const startTime = Date.now();
      const startValue = 0;
      const endValue = numericValue;

      const updateValue = async () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / animationDuration, 1);

        // Easing function (ease-out)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue =
          startValue + (endValue - startValue) * easedProgress;

        displayValue.value = await formatValueAsync(currentValue);

        if (progress < 1) {
          animationFrame.value = requestAnimationFrame(updateValue);
        } else {
          animationFrame.value = null;
        }
      };

      animationFrame.value = requestAnimationFrame(updateValue);

      cleanup(() => {
        if (animationFrame.value !== null) {
          cancelAnimationFrame(animationFrame.value);
        }
      });
    } else {
      displayValue.value = await formatValueAsync(numericValue);
    }
  });

  // Responsive mobile-optimized classes
  const baseClasses = [
    // Typography - responsive sizing
    "text-2xl md:text-3xl lg:text-4xl",
    "mobile:text-xl tablet:text-2xl desktop:text-3xl",
    
    // Font weight
    "font-bold",
    
    // Line height
    "leading-tight",
    
    // Colors with dark mode
    "text-gray-900 dark:text-white",
    
    // Transitions
    "transition-all duration-200",
    
    // Animation optimization
    animate && animationFrame.value !== null && "will-change-transform",
    
    // Tabular nums for better number alignment
    "tabular-nums",
    
    // Mobile optimizations
    "mobile:tracking-tight", // Tighter letter spacing on mobile
    "touch:select-none", // Prevent selection on touch devices
    
    // Accessibility
    "focus:outline-none",
    
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={baseClasses} {...restProps}>
      {displayValue.value || formatValueSync(value)}
    </div>
  );
});
