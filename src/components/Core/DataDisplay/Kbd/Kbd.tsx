import { component$, Slot } from "@builder.io/qwik";
import type { KbdProps } from "./Kbd.types";
import { useKbd } from "./hooks/useKbd";

export const Kbd = component$<KbdProps>((props) => {
  const {
    variant = "raised",
    size = "md",
    class: className,
    osSpecific = false,
    forceOs,
    children,
    ...kbdProps
  } = props;

  // Get the text content for formatting
  const keyText = typeof children === "string" ? children : "";
  const { formattedKey } = useKbd(keyText, { osSpecific, forceOs });

  // Size classes
  const sizeClasses = {
    sm: "px-1.5 py-0.5 text-xs min-w-[1.5rem]",
    md: "px-2 py-1 text-sm min-w-[2rem]",
    lg: "px-3 py-1.5 text-base min-w-[2.5rem]",
  };

  // Variant classes
  const variantClasses = {
    raised: `
      bg-white dark:bg-gray-800
      border border-b-2 border-gray-300 dark:border-gray-600
      shadow-sm
      text-gray-700 dark:text-gray-300
    `,
    flat: `
      bg-gray-100 dark:bg-gray-700
      text-gray-700 dark:text-gray-300
    `,
    outlined: `
      bg-transparent
      border border-gray-300 dark:border-gray-600
      text-gray-700 dark:text-gray-300
    `,
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-mono font-medium
    rounded
    select-none
    transition-colors
  `;

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <kbd class={classes} {...kbdProps}>
      {keyText ? formattedKey : <Slot />}
    </kbd>
  );
});
