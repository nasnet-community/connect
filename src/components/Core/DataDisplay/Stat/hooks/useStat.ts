import { $, type QRL } from "@builder.io/qwik";
import type { UseStatOptions } from "../Stat.types";

export const useStat = (options: UseStatOptions = {}) => {
  const {
    format = "number",
    decimals = 0,
    prefix = "",
    suffix = "",
    locale = "en-US",
    currency = "USD",
  } = options;

  // Helper function for formatting (synchronous version)
  const formatValueSync = (value: number | string): string => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return String(value);
    }

    let formattedValue: string;

    switch (format) {
      case "currency":
        formattedValue = new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currency,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue);
        break;

      case "percent":
        formattedValue = new Intl.NumberFormat(locale, {
          style: "percent",
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue / 100);
        break;

      case "number":
        formattedValue = new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue);
        break;

      case "custom":
      default:
        formattedValue = numericValue.toFixed(decimals);
        break;
    }

    // Apply prefix and suffix for non-currency formats
    if (format !== "currency" && (prefix || suffix)) {
      return `${prefix}${formattedValue}${suffix}`;
    }

    return formattedValue;
  };

  // QRL version for use in useTask$ and other reactive contexts
  const formatValueAsync = $((value: number | string): string => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return String(value);
    }

    let formattedValue: string;

    switch (format) {
      case "currency":
        formattedValue = new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currency,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue);
        break;

      case "percent":
        formattedValue = new Intl.NumberFormat(locale, {
          style: "percent",
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue / 100);
        break;

      case "number":
        formattedValue = new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue);
        break;

      case "custom":
      default:
        formattedValue = numericValue.toFixed(decimals);
        break;
    }

    // Apply prefix and suffix for non-currency formats
    if (format !== "currency" && (prefix || suffix)) {
      return `${prefix}${formattedValue}${suffix}`;
    }

    return formattedValue;
  });

  const formatValue = formatValueAsync;

  const animateValue = $(
    (
      startValue: number,
      endValue: number,
      duration: number,
      onUpdate: QRL<(value: number) => void>,
      onComplete?: QRL<() => void>,
    ): (() => void) => {
      const startTime = Date.now();
      let animationFrameId: number | null = null;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function (ease-out cubic)
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const currentValue =
          startValue + (endValue - startValue) * easedProgress;

        onUpdate(currentValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(animate);
        } else {
          if (onComplete) {
            onComplete();
          }
        }
      };

      animationFrameId = requestAnimationFrame(animate);

      // Return cleanup function
      return () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
      };
    },
  );

  const abbreviateNumber = $((value: number): string => {
    const abbreviations = [
      { value: 1e9, suffix: "B" },
      { value: 1e6, suffix: "M" },
      { value: 1e3, suffix: "K" },
    ];

    for (const { value: threshold, suffix: abbreviation } of abbreviations) {
      if (Math.abs(value) >= threshold) {
        const abbreviated = value / threshold;
        return `${abbreviated.toFixed(decimals)}${abbreviation}`;
      }
    }

    // Inline formatting logic to avoid serialization issues
    const numericValue = value;

    if (isNaN(numericValue)) {
      return String(value);
    }

    let formattedValue: string;

    switch (format) {
      case "currency":
        formattedValue = new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currency,
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue);
        break;

      case "percent":
        formattedValue = new Intl.NumberFormat(locale, {
          style: "percent",
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue / 100);
        break;

      case "number":
        formattedValue = new Intl.NumberFormat(locale, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }).format(numericValue);
        break;

      case "custom":
      default:
        formattedValue = numericValue.toFixed(decimals);
        break;
    }

    // Apply prefix and suffix for non-currency formats
    if (format !== "currency" && (prefix || suffix)) {
      return `${prefix}${formattedValue}${suffix}`;
    }

    return formattedValue;
  });

  const parseFormattedValue = $((formattedValue: string): number => {
    // Remove common formatting characters
    const cleanValue = formattedValue
      .replace(/[,$%]/g, "")
      .replace(prefix, "")
      .replace(suffix, "")
      .trim();

    // Handle abbreviations
    const multipliers: Record<string, number> = {
      K: 1e3,
      M: 1e6,
      B: 1e9,
    };

    const match = cleanValue.match(/^([-+]?\d*\.?\d+)([KMB])?$/i);
    if (match) {
      const [, number, abbreviation] = match;
      const value = parseFloat(number);
      const multiplier = abbreviation
        ? multipliers[abbreviation.toUpperCase()]
        : 1;
      return value * multiplier;
    }

    return parseFloat(cleanValue) || 0;
  });

  return {
    formatValue,
    formatValueSync,
    formatValueAsync,
    animateValue,
    abbreviateNumber,
    parseFormattedValue,
  };
};
