import { $, useId, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { CheckboxSize } from "../Checkbox.types";

export interface UseCheckboxProps {
  id?: string;
  checked: boolean;
  onChange$?: QRL<(checked: boolean) => void>;
  onValueChange$?: QRL<(checked: boolean) => void>;
  indeterminate?: boolean;
  size?: CheckboxSize;
  helperText?: string;
  error?: string;
}

export function useCheckbox(props: UseCheckboxProps) {
  const {
    onChange$,
    onValueChange$,
    indeterminate = false,
    id: propId,
    helperText,
    error,
  } = props;

  // Generate unique ID if not provided
  const autoId = useId();
  const checkboxId = propId || `checkbox-${autoId}`;

  // Reference to the checkbox input element
  const inputRef = useSignal<HTMLInputElement>();

  // Set indeterminate state (requires DOM access)
  useVisibleTask$(({ track }) => {
    track(() => indeterminate);
    track(() => inputRef.value);

    if (inputRef.value) {
      inputRef.value.indeterminate = indeterminate;
    }
  });

  // Handle change event
  const handleChange$ = $((event: Event) => {
    const element = event.target as HTMLInputElement;
    const newChecked = element.checked;

    if (onChange$) {
      onChange$(newChecked);
    }

    if (onValueChange$) {
      onValueChange$(newChecked);
    }
  });

  // Size-specific classes
  const sizeConfig: Record<
    CheckboxSize,
    {
      checkbox: string;
      text: string;
    }
  > = {
    sm: {
      checkbox: "h-3.5 w-3.5",
      text: "text-xs",
    },
    md: {
      checkbox: "h-4 w-4",
      text: "text-sm",
    },
    lg: {
      checkbox: "h-5 w-5",
      text: "text-base",
    },
  };

  // Helper ID for accessibility
  const helperId = helperText ? `${checkboxId}-helper` : undefined;
  const errorId = error ? `${checkboxId}-error` : undefined;

  return {
    checkboxId,
    inputRef,
    handleChange$,
    sizeConfig,
    helperId,
    errorId,
  };
}
