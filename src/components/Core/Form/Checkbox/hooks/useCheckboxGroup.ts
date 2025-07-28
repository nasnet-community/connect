import { $, useId } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

export interface UseCheckboxGroupProps {
  id?: string;
  selected: string[];
  direction?: "horizontal" | "vertical";
  helperText?: string;
  error?: string;
  onToggle$: QRL<(value: string) => void>;
  onSelectionChange$?: QRL<(selectedValues: string[]) => void>;
  class?: string;
}

export function useCheckboxGroup(props: UseCheckboxGroupProps) {
  const {
    id: propId,
    selected,
    direction = "vertical",
    helperText,
    error,
    onToggle$,
    onSelectionChange$,
    class: className,
  } = props;

  // Generate a unique ID if one is not provided
  const autoId = useId();
  const groupId = propId || `checkbox-group-${autoId}`;

  // Create accessibility IDs
  const helperId = helperText ? `${groupId}-helper` : undefined;
  const errorId = error ? `${groupId}-error` : undefined;
  const describedBy =
    [helperId, errorId].filter(Boolean).join(" ") || undefined;

  // Toggle a checkbox in the group
  const handleToggle$ = $((value: string) => {
    // Call the individual toggle handler
    onToggle$(value);

    // If selection change handler is provided, compute the new selection array
    if (onSelectionChange$) {
      const newSelected = selected.includes(value)
        ? selected.filter((val) => val !== value)
        : [...selected, value];

      onSelectionChange$(newSelected);
    }
  });

  // Setup container classes based on the direction
  const containerClass = [
    direction === "horizontal" ? "flex flex-wrap gap-3" : "flex flex-col gap-2",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    groupId,
    helperId,
    errorId,
    describedBy,
    handleToggle$,
    containerClass,
  };
}
