import { component$ } from "@builder.io/qwik";
import { PrefixedInput } from "../PrefixedInput";
import type { IdInputProps } from "../PrefixedInput.types";

/**
 * IdInput - Modern ID field input
 * 
 * Professional ID naming component with bordered design and type-specific styling.
 * Clean and precise for technical identifiers and configurations.
 * 
 * @example
 * <IdInput
 *   idType="tunnel"
 *   value="1"
 *   onChange$={handleChange}
 *   variant="bordered"
 *   label="Tunnel ID"
 *   placeholder="main"
 * />
 */
export const IdInput = component$<IdInputProps>(({
  idType = "tunnel",
  helperText,
  placeholder = "1",
  variant = "bordered",
  color = "default",
  ...props
}) => {
  
  // ID type configurations with modern styling
  const idConfig = {
    tunnel: {
      prefix: "tunnel-",
      helperText: $localize`Tunnel identifier (e.g., "1", "main", "backup")`,
      prefixClass: "text-gray-800 dark:text-gray-200 font-mono font-semibold border-2 border-gray-400 dark:border-gray-500 bg-gray-100 dark:bg-gray-800",
    },
    interface: {
      prefix: "if-",
      helperText: $localize`Interface identifier (e.g., "1", "wan", "lan")`,
      prefixClass: "text-secondary-800 dark:text-secondary-200 font-mono font-semibold border-2 border-secondary-400 dark:border-secondary-500 bg-secondary-100 dark:bg-secondary-800",
    },
    rule: {
      prefix: "rule-",
      helperText: $localize`Rule identifier (e.g., "1", "allow", "block")`,
      prefixClass: "text-warning-800 dark:text-warning-200 font-mono font-semibold border-2 border-warning-400 dark:border-warning-500 bg-warning-100 dark:bg-warning-800",
    },
    connection: {
      prefix: "conn-",
      helperText: $localize`Connection identifier (e.g., "1", "primary", "secondary")`,
      prefixClass: "text-info-800 dark:text-info-200 font-mono font-semibold border-2 border-info-400 dark:border-info-500 bg-info-100 dark:bg-info-800",
    }
  } as const;

  const config = idConfig[idType];

  return (
    <PrefixedInput
      // Core props
      prefix={config.prefix}
      placeholder={placeholder}
      helperText={helperText || config.helperText}
      
      // Modern bordered styling
      variant={variant}
      color={color}
      animate={true}
      animationType="subtle"
      
      // ID-specific enhancements
      prefixClass={config.prefixClass}
      copyable={true}
      
      // Pass through all other props
      {...props}
    />
  );
});