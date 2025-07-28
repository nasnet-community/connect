import { component$, useTask$ } from "@builder.io/qwik";
import type { PinInputProps } from "./PinInput.types";
import { usePinInput } from "./hooks/usePinInput";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { FormErrorMessage } from "../FormErrorMessage";

export const PinInput = component$<PinInputProps>((props) => {
  const {
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    mask = false,
    autoFocus = true,
    placeholder = "○",
    class: className,
    name,
    spaced = true,
    ariaLabel,
  } = props;

  const {
    inputIds,
    inputValues,
    inputRefs,
    setInputRef,
    handleInput$,
    handleKeyDown$,
    handlePaste$,
    handleFocus$,
    sizeClasses,
  } = usePinInput(props);

  const hasError = Boolean(error);

  // Auto-focus first input on mount
  useTask$(() => {
    if (autoFocus && inputRefs[0]) {
      inputRefs[0].focus();
    }
  });

  return (
    <div class={["relative", className].filter(Boolean).join(" ")}>
      {label && (
        <FormLabel for={inputIds[0]} required={required} class="mb-1.5">
          {label}
        </FormLabel>
      )}

      <div
        role="group"
        aria-label={ariaLabel || label || "PIN input"}
        aria-invalid={hasError}
        aria-describedby={
          hasError
            ? `${inputIds[0]}-error`
            : helperText
              ? `${inputIds[0]}-helper`
              : undefined
        }
        class={[
          "flex items-center",
          spaced ? sizeClasses.spacing : "gap-1",
        ].join(" ")}
      >
        {inputIds.map((id, index) => (
          <input
            key={id}
            ref={(el) => setInputRef(index, el)}
            type={mask ? "password" : "text"}
            id={id}
            name={name ? `${name}-${index}` : undefined}
            value={inputValues[index]}
            placeholder={inputValues[index] ? undefined : placeholder}
            disabled={disabled}
            required={required && index === 0}
            maxLength={1}
            autoComplete="off"
            inputMode={props.type === "numeric" ? "numeric" : "text"}
            pattern={props.type === "numeric" ? "[0-9]" : "[a-zA-Z0-9]"}
            enterKeyHint="next"
            spellcheck={false}
            autocapitalize={props.type === "numeric" ? "off" : "characters"}
            onInput$={(e) => handleInput$(index, e)}
            onKeyDown$={(e) => handleKeyDown$(index, e)}
            onPaste$={index === 0 ? handlePaste$ : undefined}
            onFocus$={() => handleFocus$(index)}
            aria-label={`Digit ${index + 1} of ${inputIds.length}`}
            class={[
              "rounded-md border text-center font-mono transition-all duration-200",
              "touch-manipulation", // Better touch handling
              sizeClasses.input,
              "mobile:min-h-[44px] tablet:min-h-[40px]", // Minimum touch targets
              hasError
                ? "border-error-500 focus:border-error-600 focus:ring-error-500 dark:border-error-400 dark:focus:border-error-300"
                : "border-border focus:border-primary-600 focus:ring-primary-500 dark:border-border-dark dark:focus:border-primary-400",
              disabled
                ? "bg-surface-light-quaternary dark:bg-surface-dark-quaternary cursor-not-allowed opacity-60"
                : "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT",
              "text-text-default dark:text-text-dark-default",
              "placeholder:text-text-tertiary dark:placeholder:text-text-dark-tertiary",
              "focus:outline-none focus:ring-2 focus:ring-opacity-50",
              "hover:border-border-hover dark:hover:border-border-dark-hover",
              inputValues[index] ? "font-semibold" : "font-normal",
              "selection:bg-primary-500 selection:text-white", // Better text selection
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </div>

      {helperText && !hasError && (
        <FormHelperText id={`${inputIds[0]}-helper`} class="mt-1.5">
          {helperText}
        </FormHelperText>
      )}

      {hasError && (
        <FormErrorMessage id={`${inputIds[0]}-error`} class="mt-1.5">
          {error}
        </FormErrorMessage>
      )}

      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} value={inputValues.join("")} />}
    </div>
  );
});
