import { component$ } from "@builder.io/qwik";
import type { NumberInputProps } from "./NumberInput.types";
import { useNumberInput } from "./hooks/useNumberInput";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { FormErrorMessage } from "../FormErrorMessage";

export const NumberInput = component$<NumberInputProps>((props) => {
  const {
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    readOnly = false,
    showSteppers = true,
    placeholder,
    class: className,
    name,
  } = props;

  const {
    inputId,
    displayValue,
    handleInputChange$,
    handleBlur$,
    handleKeyDown$,
    handleStepperMouseDown$,
    handleStepperMouseUp$,
    canIncrement,
    canDecrement,
    sizeClasses,
  } = useNumberInput(props);

  const hasError = Boolean(error);

  return (
    <div class={["relative", className].filter(Boolean).join(" ")}>
      {label && (
        <FormLabel for={inputId} required={required} class="mb-1.5">
          {label}
        </FormLabel>
      )}

      <div class="relative">
        <input
          type="text"
          id={inputId}
          name={name}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          onInput$={handleInputChange$}
          onBlur$={handleBlur$}
          onKeyDown$={handleKeyDown$}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          class={[
            "w-full rounded-md border transition-all duration-200 touch-manipulation",
            sizeClasses.input,
            showSteppers ? sizeClasses.inputWithSteppers : "",
            hasError
              ? "border-error-500 focus:border-error-600 focus:ring-error-500 dark:border-error-400 dark:focus:border-error-300"
              : "border-border focus:border-primary-600 focus:ring-primary-500 dark:border-border-dark dark:focus:border-primary-400",
            disabled
              ? "bg-surface-light-quaternary dark:bg-surface-dark-quaternary cursor-not-allowed opacity-60"
              : "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT",
            "text-text-default dark:text-text-dark-default",
            "placeholder:text-text-tertiary dark:placeholder:text-text-dark-tertiary",
            "focus:outline-none focus:ring-2 focus:ring-opacity-50",
            "mobile:min-h-[44px] tablet:min-h-[40px]", // Minimum touch targets
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {showSteppers && !readOnly && (
          <div
            class={[
              "absolute right-0 top-0 flex h-full flex-col border-l rounded-r-md overflow-hidden",
              sizeClasses.stepper,
              "border-border dark:border-border-dark",
              "bg-surface-light-secondary dark:bg-surface-dark-secondary",
              disabled ? "opacity-60" : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <button
              type="button"
              disabled={!canIncrement}
              onMouseDown$={() => handleStepperMouseDown$("up")}
              onMouseUp$={handleStepperMouseUp$}
              onMouseLeave$={handleStepperMouseUp$}
              class={[
                "flex flex-1 items-center justify-center transition-all duration-200 touch-manipulation",
                sizeClasses.stepperButton,
                canIncrement
                  ? "hover:bg-surface-light-tertiary dark:hover:bg-surface-dark-tertiary active:bg-surface-light-quaternary dark:active:bg-surface-dark-quaternary cursor-pointer"
                  : "cursor-not-allowed opacity-50",
                "text-text-secondary dark:text-text-dark-secondary",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:focus:ring-primary-400",
                "mobile:min-h-[22px] tablet:min-h-[20px]", // Half of input height for touch targets
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label="Increment value"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="pointer-events-none"
              >
                <path
                  d="M3 7.5L6 4.5L9 7.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>

            <div class="h-px bg-border dark:bg-border-dark" />

            <button
              type="button"
              disabled={!canDecrement}
              onMouseDown$={() => handleStepperMouseDown$("down")}
              onMouseUp$={handleStepperMouseUp$}
              onMouseLeave$={handleStepperMouseUp$}
              class={[
                "flex flex-1 items-center justify-center transition-all duration-200 touch-manipulation",
                sizeClasses.stepperButton,
                canDecrement
                  ? "hover:bg-surface-light-tertiary dark:hover:bg-surface-dark-tertiary active:bg-surface-light-quaternary dark:active:bg-surface-dark-quaternary cursor-pointer"
                  : "cursor-not-allowed opacity-50",
                "text-text-secondary dark:text-text-dark-secondary",
                "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 dark:focus:ring-primary-400",
                "mobile:min-h-[22px] tablet:min-h-[20px]", // Half of input height for touch targets
              ]
                .filter(Boolean)
                .join(" ")}
              aria-label="Decrement value"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="pointer-events-none"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {helperText && !hasError && (
        <FormHelperText id={`${inputId}-helper`} class="mt-1.5">
          {helperText}
        </FormHelperText>
      )}

      {hasError && (
        <FormErrorMessage id={`${inputId}-error`} class="mt-1.5">
          {error}
        </FormErrorMessage>
      )}
    </div>
  );
});
