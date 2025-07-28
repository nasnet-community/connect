import { $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { DatePickerProps, DateTimePickerProps } from "../DatePicker.types";
import { dateUtils } from "../utils/dateUtils";

export interface UseDateFormatterResult {
  formatDate$: QRL<(date: Date | null) => Promise<string>>;
  parseDate$: QRL<(dateString: string) => Promise<Date | null>>;
}

export function useDateFormatter(
  props: DatePickerProps,
): UseDateFormatterResult {
  // Format date function with proper serialization
  const formatDate$ = $((date: Date | null): Promise<string> => {
    if (!date) return Promise.resolve("");

    // Check for custom formatter first
    if (props.formatDate$) {
      try {
        return props.formatDate$(date);
      } catch (error) {
        console.error("Error in custom date formatter:", error);
        return Promise.resolve("");
      }
    }

    // Default formatter based on dateFormat
    try {
      const locale = props.locale || "en";
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      };

      if (props.mode === "datetime") {
        const timeProps = props as DateTimePickerProps;
        options.hour = "2-digit";
        options.minute = "2-digit";

        if (timeProps.showSeconds) {
          options.second = "2-digit";
        }

        options.hour12 = timeProps.use12HourTime ?? false;
      }

      const formatted = dateUtils.formatDate(date, locale, options);
      return Promise.resolve(formatted);
    } catch (error) {
      console.error("Error formatting date:", error);
      return Promise.resolve("");
    }
  });

  // Parse a date string based on the format prop or custom parser
  const parseDate$ = $((dateString: string): Promise<Date | null> => {
    if (!dateString) return Promise.resolve(null);

    if (props.parseDate$) {
      try {
        return props.parseDate$(dateString);
      } catch (error) {
        console.error("Error in custom date parser:", error);
        return Promise.resolve(null);
      }
    }

    // Default parser
    const parsedDate = dateUtils.parseDate(dateString);
    return Promise.resolve(parsedDate);
  });

  return {
    formatDate$,
    parseDate$,
  };
}
