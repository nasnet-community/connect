import { component$, $ } from "@builder.io/qwik";
import { NetworkInput } from "../NetworkInput";
import type { RangeInputProps } from "../NetworkInput.types";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

/**
 * RangeInput - IP range selection component
 *
 * Allows users to specify IP address ranges with start and end values.
 * Useful for DHCP pools, IP allocation ranges, and network segments.
 *
 * @example
 * <RangeInput
 *   format="classC"
 *   startValue="192.168.1.10"
 *   endValue="192.168.1.100"
 *   onRangeChange$={handleRangeChange}
 *   label="IP Range"
 * />
 */
export const RangeInput = component$<RangeInputProps>(
  ({ startValue, endValue, onRangeChange$, label = "IP Range", ...props }) => {
    const locale = useMessageLocale();
    // Handle start value change
    const handleStartChange$ = $((value: string | number | number[] | null) => {
      if (onRangeChange$ && typeof value === "string") {
        const end = typeof endValue === "string" ? endValue : "";
        onRangeChange$(value, end);
      }
    });

    // Handle end value change
    const handleEndChange$ = $((value: string | number | number[] | null) => {
      if (onRangeChange$ && typeof value === "string") {
        const start = typeof startValue === "string" ? startValue : "";
        onRangeChange$(start, value);
      }
    });

    return (
      <div class="space-y-4">
        {/* Range Label */}
        {label && (
          <div class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </div>
        )}

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Start Address */}
          <NetworkInput
            {...props}
            mode="full"
            value={startValue ?? null}
            onChange$={handleStartChange$}
            label={semanticMessages.shared_start_address({}, { locale })}
            placeholder="192.168.1.10"
          />

          {/* End Address */}
          <NetworkInput
            {...props}
            mode="full"
            value={endValue ?? null}
            onChange$={handleEndChange$}
            label={semanticMessages.shared_end_address({}, { locale })}
            placeholder="192.168.1.100"
          />
        </div>

        {/* Range Summary */}
        {startValue && endValue && (
          <div class="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <span class="font-medium">
                {semanticMessages.shared_range({}, { locale })}:
              </span>{" "}
              {startValue} - {endValue}
            </div>
          </div>
        )}
      </div>
    );
  },
);
