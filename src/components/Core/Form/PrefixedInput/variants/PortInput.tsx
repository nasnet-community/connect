import { component$ } from "@builder.io/qwik";
import { PrefixedInput } from "../PrefixedInput";
import type { PortInputProps } from "../PrefixedInput.types";

/**
 * PortInput - Modern port configuration input
 * 
 * Professional variant for port configuration with protocol-specific styling.
 * Features glass morphism design and interactive feedback.
 * 
 * @example
 * <PortInput
 *   portType="tcp"
 *   value="80"
 *   onChange$={handleChange}
 *   variant="glass"
 *   label="Port Configuration"
 *   placeholder="8080"
 * />
 */
export const PortInput = component$<PortInputProps>(({
  portType = "tcp",
  helperText,
  placeholder = "8080",
  variant = "glass",
  color = "info",
  ...props
}) => {
  
  // Port protocol configurations with modern styling
  const portConfig = {
    tcp: {
      prefix: "tcp-port-",
      helperText: $localize`TCP port identifier (e.g., "80", "443", "8080")`,
      prefixClass: "text-info-700 dark:text-info-300 font-medium bg-info-50/80 dark:bg-info-900/30",
    },
    udp: {
      prefix: "udp-port-",
      helperText: $localize`UDP port identifier (e.g., "53", "123", "500")`,
      prefixClass: "text-warning-700 dark:text-warning-300 font-medium bg-warning-50/80 dark:bg-warning-900/30",
    },
    both: {
      prefix: "port-",
      helperText: $localize`Port identifier for both TCP and UDP (e.g., "80", "443")`,
      prefixClass: "text-secondary-700 dark:text-secondary-300 font-medium bg-secondary-50/80 dark:bg-secondary-900/30",
    }
  } as const;

  const config = portConfig[portType];

  return (
    <PrefixedInput
      // Core props
      prefix={config.prefix}
      placeholder={placeholder}
      helperText={helperText || config.helperText}
      
      // Modern glass styling
      variant={variant}
      color={color}
      animate={true}
      animationType="subtle"
      
      // Protocol-specific enhancements
      prefixClass={config.prefixClass}
      copyable={true}
      
      // Pass through all other props
      {...props}
    />
  );
});