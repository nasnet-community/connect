import { component$, Slot } from "@builder.io/qwik";
import type { CardFooterProps } from "./Card.types";

export const CardFooter = component$<CardFooterProps>((props) => {
  const { class: className = "", bordered = false, compact = false } = props;

  // Determine classes
  const baseClasses = "px-6 py-4";
  const borderClasses = bordered
    ? "border-t border-gray-200 dark:border-gray-700"
    : "";
  const spacingClasses = compact ? "px-4 py-2" : baseClasses;

  // Combine classes
  const combinedClasses = [spacingClasses, borderClasses, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div class={combinedClasses}>
      <Slot />
    </div>
  );
});
