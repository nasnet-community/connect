import { $, useSignal, useTask$, useStore, type QRL } from "@builder.io/qwik";
import type { PinInputProps } from "../PinInput.types";

export interface UsePinInputReturn {
  inputIds: string[];
  inputValues: string[];
  inputRefs: Array<HTMLInputElement | undefined>;
  setInputRef: (index: number, element: HTMLInputElement | undefined) => void;
  handleInput$: QRL<(index: number, event: Event) => void>;
  handleKeyDown$: QRL<(index: number, event: KeyboardEvent) => void>;
  handlePaste$: QRL<(event: ClipboardEvent) => void>;
  handleFocus$: QRL<(index: number) => void>;
  sizeClasses: {
    container: string;
    input: string;
    spacing: string;
  };
}

export function usePinInput(props: PinInputProps): UsePinInputReturn {
  const {
    value = "",
    onValueChange$,
    onComplete$,
    length = 4,
    type = "numeric",
    disabled = false,
    size = "md",
    selectOnFocus = true,
    id,
  } = props;

  const baseId = id || `pin-input-${Math.random().toString(36).slice(2, 9)}`;
  const inputValues = useSignal<string[]>(Array(length).fill(""));

  // Create a store to hold HTMLInputElement references directly
  const inputRefsStore = useStore<{
    refs: Array<HTMLInputElement | undefined>;
  }>({
    refs: Array(length).fill(undefined),
  });

  // Generate unique IDs for each input
  const inputIds = Array(length)
    .fill(null)
    .map((_, i) => `${baseId}-${i}`);

  // Function to set input refs
  const setInputRef = (
    index: number,
    element: HTMLInputElement | undefined,
  ) => {
    inputRefsStore.refs[index] = element;
  };

  // Size classes mapping with mobile-first responsive design
  const sizeClasses = {
    sm: {
      container: "text-sm mobile:text-sm tablet:text-sm",
      input: "h-8 w-8 mobile:h-10 mobile:w-10 tablet:h-8 tablet:w-8 text-sm mobile:text-base tablet:text-sm",
      spacing: "gap-1.5 mobile:gap-2 tablet:gap-1.5",
    },
    md: {
      container: "text-base mobile:text-base tablet:text-base",
      input: "h-10 w-10 mobile:h-12 mobile:w-12 tablet:h-10 tablet:w-10 text-base mobile:text-lg tablet:text-base",
      spacing: "gap-2 mobile:gap-3 tablet:gap-2.5",
    },
    lg: {
      container: "text-lg mobile:text-lg tablet:text-lg",
      input: "h-12 w-12 mobile:h-14 mobile:w-14 tablet:h-12 tablet:w-12 text-lg mobile:text-xl tablet:text-lg",
      spacing: "gap-3 mobile:gap-4 tablet:gap-3.5",
    },
  }[size];

  // Sync external value to internal state
  useTask$(({ track }) => {
    track(() => value);
    const chars = value.split("").slice(0, length);
    const newValues = Array(length).fill("");
    chars.forEach((char, i) => {
      newValues[i] = char;
    });
    inputValues.value = newValues;
  });

  const isValidInput = $((char: string): boolean => {
    if (type === "numeric") {
      return /^\d$/.test(char);
    }
    return /^[a-zA-Z0-9]$/.test(char);
  });

  const updateValue = $(async (newValues: string[]) => {
    inputValues.value = newValues;
    const fullValue = newValues.join("");
    await onValueChange$?.(fullValue);

    if (fullValue.length === length && onComplete$) {
      await onComplete$(fullValue);
    }
  });

  const focusInput = $(async (index: number) => {
    const ref = inputRefsStore.refs[index];
    if (ref) {
      ref.focus();
      if (selectOnFocus) {
        ref.select();
      }
    }
  });

  const handleInput$ = $(async (index: number, event: Event) => {
    if (disabled) return;

    const input = event.target as HTMLInputElement;
    const newChar = input.value.slice(-1); // Get the last character

    if (!newChar) {
      // Handle deletion
      const newValues = [...inputValues.value];
      newValues[index] = "";
      await updateValue(newValues);
      return;
    }

    if (!(await isValidInput(newChar))) {
      // Reset to previous value if invalid
      input.value = inputValues.value[index];
      return;
    }

    // Update value
    const newValues = [...inputValues.value];
    newValues[index] = newChar;
    await updateValue(newValues);

    // Move to next input if not the last one
    if (index < length - 1) {
      await focusInput(index + 1);
    }
  });

  const handleKeyDown$ = $(async (index: number, event: KeyboardEvent) => {
    if (disabled) return;

    if (event.key === "Backspace") {
      event.preventDefault();

      if (inputValues.value[index]) {
        // Clear current input
        const newValues = [...inputValues.value];
        newValues[index] = "";
        await updateValue(newValues);
      } else if (index > 0) {
        // Move to previous input and clear it
        const newValues = [...inputValues.value];
        newValues[index - 1] = "";
        await updateValue(newValues);
        await focusInput(index - 1);
      }
    } else if (event.key === "Delete") {
      event.preventDefault();
      const newValues = [...inputValues.value];
      newValues[index] = "";
      await updateValue(newValues);
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      await focusInput(index - 1);
    } else if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      await focusInput(index + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      await focusInput(0);
    } else if (event.key === "End") {
      event.preventDefault();
      await focusInput(length - 1);
    }
  });

  const handlePaste$ = $(async (event: ClipboardEvent) => {
    if (disabled) return;

    event.preventDefault();
    const pastedText = event.clipboardData?.getData("text") || "";
    const chars = [];
    for (const char of pastedText.split("")) {
      if (await isValidInput(char)) {
        chars.push(char);
      }
      if (chars.length >= length) break;
    }

    if (chars.length > 0) {
      const newValues = Array(length).fill("");
      chars.forEach((char, i) => {
        newValues[i] = char;
      });
      await updateValue(newValues);

      // Focus the next empty input or the last input
      const nextEmptyIndex = newValues.findIndex((val) => !val);
      if (nextEmptyIndex !== -1) {
        await focusInput(nextEmptyIndex);
      } else {
        await focusInput(length - 1);
      }
    }
  });

  const handleFocus$ = $(async (index: number) => {
    if (selectOnFocus && inputRefsStore.refs[index]) {
      inputRefsStore.refs[index]!.select();
    }
  });

  return {
    inputIds,
    inputValues: inputValues.value,
    inputRefs: inputRefsStore.refs,
    setInputRef,
    handleInput$,
    handleKeyDown$,
    handlePaste$,
    handleFocus$,
    sizeClasses,
  };
}
