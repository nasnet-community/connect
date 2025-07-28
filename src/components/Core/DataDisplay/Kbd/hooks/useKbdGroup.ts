import { useComputed$ } from "@builder.io/qwik";
import type { UseKbdGroupOptions, UseKbdGroupReturn } from "../Kbd.types";

export const useKbdGroup = (
  options: UseKbdGroupOptions = {},
): UseKbdGroupReturn => {
  const formattedSeparator = useComputed$(() => {
    const separator = options.separator || "+";

    // Add spacing around the separator for better readability
    return ` ${separator} `;
  });

  const groupClass = useComputed$(() => {
    return "inline-flex items-center gap-1";
  });

  return {
    formattedSeparator: formattedSeparator.value,
    groupClass: groupClass.value,
  };
};
