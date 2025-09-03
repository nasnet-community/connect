import { component$ } from "@builder.io/qwik";
import { PrefixedInput } from "../PrefixedInput";
import type { ServiceInputProps } from "../PrefixedInput.types";

/**
 * ServiceInput - Modern service name input
 * 
 * Professional service naming component with gradient design and service-specific styling.
 * Perfect for system, user, and network service configurations.
 * 
 * @example
 * <ServiceInput
 *   serviceType="system"
 *   value="dns"
 *   onChange$={handleChange}
 *   variant="gradient"
 *   label="Service Name"
 *   placeholder="dns"
 * />
 */
export const ServiceInput = component$<ServiceInputProps>(({
  serviceType = "system",
  helperText,
  placeholder = "service",
  variant = "gradient",
  color = "success",
  ...props
}) => {
  
  // Service type configurations with modern styling
  const serviceConfig = {
    system: {
      prefix: "system-",
      helperText: $localize`System service identifier (e.g., "dns", "dhcp", "ntp")`,
      prefixClass: "text-success-700 dark:text-success-200 font-bold bg-gradient-to-r from-success-100 to-success-200 dark:from-success-900/40 dark:to-success-800/40",
    },
    user: {
      prefix: "user-",
      helperText: $localize`User service identifier (e.g., "web", "mail", "ftp")`,
      prefixClass: "text-primary-700 dark:text-primary-200 font-bold bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/40 dark:to-primary-800/40",
    },
    network: {
      prefix: "net-",
      helperText: $localize`Network service identifier (e.g., "firewall", "routing", "vpn")`,
      prefixClass: "text-info-700 dark:text-info-200 font-bold bg-gradient-to-r from-info-100 to-info-200 dark:from-info-900/40 dark:to-info-800/40",
    }
  } as const;

  const config = serviceConfig[serviceType];

  return (
    <PrefixedInput
      // Core props
      prefix={config.prefix}
      placeholder={placeholder}
      helperText={helperText || config.helperText}
      
      // Modern gradient styling
      variant={variant}
      color={color}
      animate={true}
      animationType="energetic"
      
      // Service-specific enhancements
      prefixClass={config.prefixClass}
      copyable={true}
      
      // Pass through all other props
      {...props}
    />
  );
});