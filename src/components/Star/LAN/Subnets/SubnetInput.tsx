import {
  component$,
  $,
} from "@builder.io/qwik";
import { SubnetInput as CoreSubnetInput } from "~/components/Core/Form/NetworkInput";
import type { SubnetInputProps } from "./types";

/**
 * Modern subnet input component using the Core NetworkInput component
 * Optimized for subnet configuration with Class C format (192.168.x.0/24)
 */
export const SubnetInput = component$<SubnetInputProps>(({
  config,
  value,
  onChange$,
  error,
  disabled = false,
}) => {
  // Handle change to convert number back to proper format
  const handleChange$ = $((newValue: string | number | number[] | null) => {
    if (typeof newValue === "number") {
      onChange$(newValue);
    } else if (typeof newValue === "string") {
      const numValue = parseInt(newValue, 10);
      if (!isNaN(numValue)) {
        onChange$(numValue);
      } else {
        onChange$(null);
      }
    } else {
      onChange$(null);
    }
  });

  return (
    <div class="space-y-2">
      {/* Use Core SubnetInput for consistent behavior */}
      <CoreSubnetInput
        label={config.label + (config.isRequired ? " *" : "")}
        description={config.description}
        format="classC"
        value={value}
        onChange$={handleChange$}
        placeholder={config.placeholder}
        error={error}
        disabled={disabled}
        mask={config.mask}
        required={config.isRequired}
        showMask={true}
        visualFormat={{
          showSubnetMask: true,
          showFullAddress: true,
          highlightInput: true
        }}
      />

      {/* Additional subnet info for /30 tunnels */}
      {config.mask === 30 && value !== null && (
        <div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {$localize`Point-to-point tunnel`}: 192.168.{value}.0 - 192.168.{value}.3 ({$localize`2 usable hosts`})
        </div>
      )}

      {/* Additional subnet info for /24 networks */}
      {config.mask === 24 && value !== null && (
        <div class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {$localize`Network range`}: 192.168.{value}.1 - 192.168.{value}.254 ({$localize`254 usable hosts`})
        </div>
      )}
    </div>
  );
});