import { component$ } from "@builder.io/qwik";
import { NetworkInput } from "../NetworkInput";
import type { SubnetInputProps } from "../NetworkInput.types";

/**
 * SubnetInput - Optimized subnet input component
 * 
 * Simplified input for subnet configuration with visual format display.
 * Perfect for scenarios where users only need to specify the variable part.
 * Supports Class A, B, and C networks with appropriate input fields.
 * 
 * @example
 * <SubnetInput
 *   format="classC"
 *   value={10}
 *   onChange$={handleSubnetChange}
 *   label="Subnet"
 *   placeholder={10}
 * />
 */
export const SubnetInput = component$<SubnetInputProps>(({
  showMask = true,
  defaultMask = 24,
  mask,
  visualFormat = {},
  ...props
}) => {
  
  const currentMask = mask || defaultMask;
  
  const enhancedVisualFormat = {
    showSubnetMask: showMask,
    showFullAddress: true,
    highlightInput: true,
    ...visualFormat
  };

  return (
    <NetworkInput
      mode="octet"
      mask={currentMask}
      visualFormat={enhancedVisualFormat}
      {...props}
    />
  );
});