import { component$ } from "@builder.io/qwik";
import type { AutocompleteProps } from "./Autocomplete.types";
import { useAutocomplete } from "./hooks/useAutocomplete";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { FormErrorMessage } from "../FormErrorMessage";

export const Autocomplete = component$<AutocompleteProps>((props) => {
  const {
    label,
    placeholder,
    helperText,
    error,
    required = false,
    disabled = false,
    loading = false,
    loadingText = "Loading...",
    noOptionsText = "No options found",
    highlightMatches = true,
    clearable = true,
    maxDropdownHeight = "300px",
    class: className,
    name,
    ariaLabel,
  } = props;

  const {
    inputId,
    dropdownId,
    inputValue,
    isOpen,
    highlightedIndex,
    filteredOptions,
    handleInputChange$,
    handleInputFocus$,
    handleInputBlur$,
    handleKeyDown$,
    handleOptionClick$,
    handleClear$,
    setHighlightedIndex$,
    sizeClasses,
  } = useAutocomplete(props);

  const hasError = Boolean(error);
  const showClearButton = clearable && inputValue && !disabled;

  const highlightText = (text: string, query: string) => {
    if (!highlightMatches || !query) return text;

    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={i}
          class="font-semibold text-primary-600 dark:text-primary-400"
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

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
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          onInput$={handleInputChange$}
          onFocus$={handleInputFocus$}
          onBlur$={handleInputBlur$}
          onKeyDown$={handleKeyDown$}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={isOpen}
          aria-controls={dropdownId}
          aria-activedescendant={
            highlightedIndex >= 0
              ? `${dropdownId}-option-${highlightedIndex}`
              : undefined
          }
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          aria-label={ariaLabel}
          autoComplete="off"
          class={[
            "w-full rounded-md border transition-all duration-200",
            sizeClasses.input,
            // Mobile touch optimizations
            "touch-manipulation",
            "mobile:min-h-[44px] tablet:min-h-[40px]",
            // Error states using semantic colors
            hasError
              ? "border-error-500 focus:border-error-600 focus:ring-error-500 dark:border-error-400 dark:focus:border-error-300 dark:focus:ring-error-400"
              : "border-border focus:border-primary-600 focus:ring-primary-500 dark:border-border-dark dark:focus:border-primary-400 dark:focus:ring-primary-400",
            // Background states using surface colors
            disabled
              ? "bg-surface-light-quaternary dark:bg-surface-dark-quaternary cursor-not-allowed opacity-60"
              : "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT",
            // Text colors using semantic system
            "text-text-default dark:text-text-dark-default",
            "placeholder:text-text-secondary dark:placeholder:text-text-dark-secondary",
            // Focus states with better accessibility
            "focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2",
            "dark:focus:ring-offset-surface-dark-DEFAULT",
            // Mobile-specific enhancements
            "motion-safe:transition-all motion-reduce:transition-none",
          ]
            .filter(Boolean)
            .join(" ")}
        />

        {/* Dropdown icon */}
        <div class={[
          "pointer-events-none absolute top-1/2 -translate-y-1/2",
          showClearButton ? "right-10" : "right-3",
          "transition-all duration-200",
        ].join(" ")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class={[
              "transition-all duration-200",
              isOpen ? "rotate-180 scale-110" : "rotate-0 scale-100",
              disabled 
                ? "text-text-secondary/50 dark:text-text-dark-secondary/50"
                : "text-text-secondary dark:text-text-dark-secondary",
              "motion-safe:transition-all motion-reduce:transition-none",
            ].join(" ")}
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>

        {/* Clear button */}
        {showClearButton && (
          <button
            type="button"
            onClick$={handleClear$}
            class={[
              "absolute right-8 top-1/2 -translate-y-1/2",
              sizeClasses.clearButton,
              "flex items-center justify-center rounded-md",
              // Mobile touch optimizations
              "touch-manipulation",
              "mobile:min-h-[44px] mobile:min-w-[44px]",
              // Interactive states using surface colors
              "hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary",
              "active:bg-surface-light-tertiary dark:active:bg-surface-dark-tertiary",
              "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
              "dark:focus:ring-primary-400 dark:focus:ring-offset-surface-dark-DEFAULT",
              // Text colors
              "text-text-secondary dark:text-text-dark-secondary",
              "hover:text-text-default dark:hover:text-text-dark-default",
              // Transitions
              "transition-all duration-200",
              "motion-safe:transition-all motion-reduce:transition-none",
              // Accessibility
              "cursor-pointer",
            ].join(" ")}
            aria-label="Clear selection"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        )}

        {/* Dropdown */}
        {isOpen && (
          <div
            id={dropdownId}
            role="listbox"
            class={[
              "absolute z-dropdown mt-1 w-full rounded-md border",
              // Surface and border colors
              "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT",
              "border-border dark:border-border-dark",
              // Shadows using theme system
              "shadow-lg dark:shadow-dark-lg",
              // Mobile optimizations
              "mobile:shadow-mobile-card tablet:shadow-md desktop:shadow-lg",
              "mobile:max-h-[50vh] tablet:max-h-[60vh] desktop:max-h-[300px]",
              // Responsive positioning
              "mobile:bottom-auto mobile:top-full",
              // Typography
              sizeClasses.dropdown,
              // Scrolling
              "overflow-auto scroll-smooth",
              // Animations
              "animate-scale-up motion-safe:animate-fade-in",
              "motion-reduce:animate-none",
              // Touch optimization
              "touch-manipulation",
            ].join(" ")}
            style={{ 
              maxHeight: maxDropdownHeight,
              // Mobile-specific positioning
              "--dropdown-mobile-offset": "env(safe-area-inset-bottom, 0px)"
            }}
          >
            {loading ? (
              <div class={[
                "flex items-center gap-2 px-3 py-3",
                "text-text-secondary dark:text-text-dark-secondary",
                "mobile:py-4 mobile:px-4", // Larger touch targets on mobile
              ].join(" ")}>
                <svg class="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                {loadingText}
              </div>
            ) : filteredOptions.length === 0 ? (
              <div class={[
                "px-3 py-3 text-center",
                "text-text-secondary dark:text-text-dark-secondary",
                "mobile:py-4 mobile:px-4", // Larger spacing on mobile
                "bg-surface-light-secondary/50 dark:bg-surface-dark-secondary/50",
                "rounded-md m-1",
              ].join(" ")}>
                {noOptionsText}
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isHighlighted = index === highlightedIndex;
                const optionId = `${dropdownId}-option-${index}`;

                return (
                  <div
                    key={option.value}
                    id={optionId}
                    role="option"
                    aria-selected={props.value === option.value}
                    aria-disabled={option.disabled}
                    onMouseEnter$={() => setHighlightedIndex$(index)}
                    onClick$={() => handleOptionClick$(option)}
                    class={[
                      sizeClasses.option,
                      // Mobile touch optimizations
                      "touch-manipulation",
                      "mobile:min-h-[44px] tablet:min-h-[40px]",
                      "mobile:py-3 tablet:py-2.5",
                      // Base styles
                      "transition-all duration-150",
                      "motion-safe:transition-all motion-reduce:transition-none",
                      // Interactive states with semantic colors
                      option.disabled
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer",
                      // Highlighting using surface colors
                      isHighlighted
                        ? "bg-surface-light-tertiary dark:bg-surface-dark-tertiary"
                        : "hover:bg-surface-light-secondary dark:hover:bg-surface-dark-secondary",
                      // Active state
                      !option.disabled && "active:bg-surface-light-quaternary dark:active:bg-surface-dark-quaternary",
                      // Selection state
                      props.value === option.value
                        ? "font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950"
                        : "text-text-default dark:text-text-dark-default",
                      // Focus state for keyboard navigation
                      "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset",
                      "dark:focus:ring-primary-400",
                      // Border radius for better visual separation
                      "first:rounded-t-md last:rounded-b-md",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {option.group && (
                      <div class={[
                        "text-text-secondary dark:text-text-dark-secondary",
                        "mb-1 text-xs font-medium uppercase tracking-wide",
                        "opacity-75",
                      ].join(" ")}>
                        {option.group}
                      </div>
                    )}
                    <div>{highlightText(option.label, inputValue)}</div>
                  </div>
                );
              })
            )}
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
