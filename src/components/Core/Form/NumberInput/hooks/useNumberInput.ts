import { $, useSignal, useTask$, type QRL } from "@builder.io/qwik";
import type { NumberInputProps } from "../NumberInput.types";

export interface UseNumberInputReturn {
  inputId: string;
  displayValue: string;
  handleInputChange$: QRL<(event: Event) => void>;
  handleBlur$: QRL<() => void>;
  handleKeyDown$: QRL<(event: KeyboardEvent) => void>;
  handleIncrement$: QRL<() => void>;
  handleDecrement$: QRL<() => void>;
  handleStepperMouseDown$: QRL<(direction: "up" | "down") => void>;
  handleStepperMouseUp$: QRL<() => void>;
  canIncrement: boolean;
  canDecrement: boolean;
  sizeClasses: {
    container: string;
    input: string;
    inputWithSteppers: string;
    stepper: string;
    stepperButton: string;
  };
}

export function useNumberInput(props: NumberInputProps): UseNumberInputReturn {
  const {
    value,
    onValueChange$,
    min,
    max,
    step = 1,
    precision = 0,
    id,
    disabled = false,
    readOnly = false,
    size = "md",
    allowNegative = true,
    clampValueOnBlur = true,
    formatValue$,
    parseValue$,
    allowKeyboardStepping = true,
    stepperDelay = 50,
  } = props;

  const inputId =
    id || `number-input-${Math.random().toString(36).slice(2, 9)}`;
  const displayValue = useSignal("");
  const intervalRef = useSignal<number | null>(null);

  // Size classes mapping with responsive design and mobile optimization
  const sizeClasses = {
    sm: {
      container: "text-sm mobile:text-sm tablet:text-sm",
      input: "h-8 mobile:h-9 tablet:h-8 text-sm px-2 mobile:px-3 tablet:px-2",
      inputWithSteppers: "pr-8 mobile:pr-10 tablet:pr-8",
      stepper: "w-6 mobile:w-8 tablet:w-6",
      stepperButton: "h-4 mobile:h-4.5 tablet:h-4",
    },
    md: {
      container: "text-base mobile:text-base tablet:text-base",
      input: "h-10 mobile:h-11 tablet:h-10 px-3 mobile:px-4 tablet:px-3",
      inputWithSteppers: "pr-10 mobile:pr-12 tablet:pr-10",
      stepper: "w-8 mobile:w-10 tablet:w-8",
      stepperButton: "h-5 mobile:h-5.5 tablet:h-5",
    },
    lg: {
      container: "text-lg mobile:text-lg tablet:text-lg",
      input: "h-12 mobile:h-14 tablet:h-12 text-lg px-4 mobile:px-5 tablet:px-4",
      inputWithSteppers: "pr-12 mobile:pr-14 tablet:pr-12",
      stepper: "w-10 mobile:w-12 tablet:w-10",
      stepperButton: "h-6 mobile:h-7 tablet:h-6",
    },
  }[size];

  // Update display value when value prop changes
  useTask$(({ track }) => {
    track(() => value);
    if (value !== undefined) {
      if (formatValue$) {
        formatValue$(value).then((formatted) => {
          displayValue.value = formatted;
        });
      } else {
        displayValue.value = value.toFixed(precision);
      }
    } else {
      displayValue.value = "";
    }
  });

  const clampValue = $((val: number): number => {
    let clamped = val;
    if (min !== undefined && clamped < min) clamped = min;
    if (max !== undefined && clamped > max) clamped = max;
    if (!allowNegative && clamped < 0) clamped = 0;
    return clamped;
  });

  const updateValue = $(async (newValue: number | undefined) => {
    if (newValue === undefined) {
      await onValueChange$?.(undefined);
      return;
    }

    const clamped = await clampValue(newValue);
    const rounded =
      Math.round(clamped * Math.pow(10, precision)) / Math.pow(10, precision);
    await onValueChange$?.(rounded);
  });

  const parseInputValue = $(
    async (inputVal: string): Promise<number | undefined> => {
      if (inputVal === "" || inputVal === "-") return undefined;

      if (parseValue$) {
        return await parseValue$(inputVal);
      }

      const parsed = parseFloat(inputVal);
      return isNaN(parsed) ? undefined : parsed;
    },
  );

  const handleInputChange$ = $(async (event: Event) => {
    const input = event.target as HTMLInputElement;
    displayValue.value = input.value;

    const parsedValue = await parseInputValue(input.value);
    if (parsedValue !== undefined || input.value === "") {
      await updateValue(parsedValue);
    }
  });

  const handleBlur$ = $(async () => {
    if (clampValueOnBlur && value !== undefined) {
      await updateValue(value);
    }
  });

  const handleIncrement$ = $(async () => {
    if (disabled || readOnly) return;
    const currentValue = value ?? 0;
    const newValue = currentValue + step;
    if (max === undefined || newValue <= max) {
      await updateValue(newValue);
    }
  });

  const handleDecrement$ = $(async () => {
    if (disabled || readOnly) return;
    const currentValue = value ?? 0;
    const newValue = currentValue - step;
    if (min === undefined || newValue >= min) {
      await updateValue(newValue);
    }
  });

  const handleKeyDown$ = $(async (event: KeyboardEvent) => {
    if (!allowKeyboardStepping || disabled || readOnly) return;

    if (event.key === "ArrowUp") {
      event.preventDefault();
      await handleIncrement$();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      await handleDecrement$();
    }
  });

  const startStepping = $(async (direction: "up" | "down") => {
    const step = direction === "up" ? handleIncrement$ : handleDecrement$;
    await step();

    intervalRef.value = window.setInterval(async () => {
      await step();
    }, stepperDelay);
  });

  const stopStepping = $(() => {
    if (intervalRef.value !== null) {
      clearInterval(intervalRef.value);
      intervalRef.value = null;
    }
  });

  const handleStepperMouseDown$ = $(async (direction: "up" | "down") => {
    if (disabled || readOnly) return;
    await startStepping(direction);
  });

  const handleStepperMouseUp$ = $(async () => {
    await stopStepping();
  });

  const canIncrement =
    !disabled && !readOnly && (max === undefined || (value ?? 0) < max);
  const canDecrement =
    !disabled && !readOnly && (min === undefined || (value ?? 0) > min);

  return {
    inputId,
    displayValue: displayValue.value,
    handleInputChange$,
    handleBlur$,
    handleKeyDown$,
    handleIncrement$,
    handleDecrement$,
    handleStepperMouseDown$,
    handleStepperMouseUp$,
    canIncrement,
    canDecrement,
    sizeClasses,
  };
}
