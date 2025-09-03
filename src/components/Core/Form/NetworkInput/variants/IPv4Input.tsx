import { component$ } from "@builder.io/qwik";
import { NetworkInput } from "../NetworkInput";
import type { IPv4InputProps } from "../NetworkInput.types";

/**
 * IPv4Input - Full IPv4 address input component
 * 
 * Allows input of complete IPv4 addresses with CIDR notation
 * Default format is Class C (192.168.x.0/24)
 * 
 * @example
 * <IPv4Input
 *   value="192.168.1.0/24"
 *   onChange$={handleChange}
 *   format="classC"
 *   label="Network Address"
 * />
 */
export const IPv4Input = component$<IPv4InputProps>(({
  format = "classC",
  ...props
}) => {
  return (
    <NetworkInput
      mode="full"
      format={format}
      {...props}
    />
  );
});