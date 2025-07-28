import { $, useSignal } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { DatePickerProps } from "../DatePicker.types";

export interface UseInputStateResult {
  inputValue: { value: string };
  inputRef: { value: HTMLInputElement | undefined };
  isFocused: { value: boolean };
  isOpen: { value: boolean };
  handleInputFocus$: QRL<() => void>;
  handleInputBlur$: QRL<() => void>;
  toggleCalendar$: QRL<() => void>;
}

export function useInputState(
  props: DatePickerProps,
  onOpen?: QRL<() => void>,
  onClose?: QRL<() => void>,
): UseInputStateResult {
  const { disabled = false, openOnFocus = false, inline = false } = props;

  // Input state signals
  const inputValue = useSignal("");
  const inputRef = useSignal<HTMLInputElement>();
  const isFocused = useSignal(false);
  const isOpen = useSignal(inline);

  // Handle input focus
  const handleInputFocus$ = $(() => {
    isFocused.value = true;

    if (openOnFocus && !isOpen.value && !disabled) {
      isOpen.value = true;

      if (onOpen) {
        onOpen();
      }
    }
  });

  // Handle input blur
  const handleInputBlur$ = $(() => {
    isFocused.value = false;
  });

  // Toggle the calendar open/closed
  const toggleCalendar$ = $(() => {
    if (disabled) return;

    isOpen.value = !isOpen.value;

    if (isOpen.value && onOpen) {
      onOpen();
    } else if (!isOpen.value && onClose) {
      onClose();
    }
  });

  return {
    inputValue,
    inputRef,
    isFocused,
    isOpen,
    handleInputFocus$,
    handleInputBlur$,
    toggleCalendar$,
  };
}
