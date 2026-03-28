import { component$ } from "@builder.io/qwik";
import { PrefixedInput } from "../PrefixedInput";
import type { InterfaceNameInputProps } from "../PrefixedInput.types";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

/**
 * InterfaceNameInput - Modern VPN interface name input
 *
 * Professional variant of PrefixedInput specifically designed for VPN server interface naming.
 * Features protocol-specific styling and modern visual design.
 *
 * @example
 * <InterfaceNameInput
 *   type="wireguard"
 *   value="main"
 *   onChange$={handleChange}
 *   variant="elevated"
 *   label="Interface Name"
 *   placeholder="main"
 * />
 */
export const InterfaceNameInput = component$<InterfaceNameInputProps>(
  ({
    type,
    helperText,
    placeholder = "main",
    variant = "elevated",
    color = "primary",
    prefixIcon,
    ...props
  }) => {
    const locale = useMessageLocale();
    // VPN Protocol configurations with modern styling
    const interfaceConfig = {
      wireguard: {
        prefix: "wg-server-",
        helperText: semanticMessages.prefixed_wireguard_interface_identifier(
          {},
          { locale },
        ),
        prefixClass:
          "text-primary-700 dark:text-primary-300 font-semibold bg-primary-50 dark:bg-primary-900/30",
      },
      openvpn: {
        prefix: "ovpn-server-",
        helperText: semanticMessages.prefixed_openvpn_interface_identifier(
          {},
          { locale },
        ),
        prefixClass:
          "text-primary-700 dark:text-primary-300 font-semibold bg-primary-50 dark:bg-primary-900/30",
      },
    } as const;

    const config = interfaceConfig[type];

    return (
      <PrefixedInput
        // Core props
        prefix={config.prefix}
        placeholder={placeholder}
        helperText={helperText || config.helperText}
        // Modern styling
        variant={variant}
        color={color}
        animate={true}
        animationType="smooth"
        // Protocol-specific enhancements
        prefixIcon={prefixIcon}
        prefixClass={config.prefixClass}
        copyable={true}
        // Pass through all other props
        {...props}
      />
    );
  },
);
