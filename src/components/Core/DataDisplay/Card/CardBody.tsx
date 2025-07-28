import { component$, Slot } from "@builder.io/qwik";
import type { CardBodyProps } from "./Card.types";

export const CardBody = component$<CardBodyProps>((props) => {
  const { class: className = "", compact = false } = props;

  // Determine classes
  const baseClasses = "px-6 py-4";
  const spacingClasses = compact ? "px-4 py-2" : baseClasses;

  // Combine classes
  const combinedClasses = [spacingClasses, className].filter(Boolean).join(" ");

  return (
    <div class={combinedClasses}>
      <Slot />
    </div>
  );
});
