import { component$, useSignal, $, type QRL } from "@builder.io/qwik";
import { HiEyeOutline, HiEyeSlashOutline } from "@qwikest/icons/heroicons";
import { FormLabel } from "../FormLabel";
import { FormHelperText } from "../FormHelperText";
import { FormErrorMessage } from "../FormErrorMessage";

export interface PasswordFieldProps {
  value: string;

  label?: string;

  placeholder?: string;

  required?: boolean;

  disabled?: boolean;

  id?: string;

  class?: string;

  error?: string;

  helperText?: string;

  onInput$?: QRL<(event: Event, element: HTMLInputElement) => void>;

  onChange$?: QRL<(event: Event, element: HTMLInputElement) => void>;

  onValueChange$?: QRL<(value: string) => void>;

  size?: "sm" | "md" | "lg";

  initiallyVisible?: boolean;

  toggleLabel?: string;

  showStrength?: boolean;

  name?: string;

  ariaLabel?: string;
}

export const PasswordField = component$<PasswordFieldProps>(
  ({
    value,
    label,
    placeholder,
    required = false,
    disabled = false,
    id,
    class: className = "",
    error,
    helperText,
    onInput$,
    onChange$,
    onValueChange$,
    size = "md",
    initiallyVisible = false,
    toggleLabel,
    showStrength = false,
    name,
    ariaLabel,
  }) => {
    // Control password visibility state
    const showPassword = useSignal(initiallyVisible);

    // Generate a unique ID for the input if not provided
    const inputId =
      id || `password-field-${Math.random().toString(36).substring(2, 9)}`;

    // Handle toggling password visibility
    const togglePasswordVisibility = $(() => {
      showPassword.value = !showPassword.value;
    });

    // Handle input events
    const handleInput$ = $((event: Event) => {
      const element = event.target as HTMLInputElement;
      if (onInput$) {
        onInput$(event, element);
      }
      if (onValueChange$) {
        onValueChange$(element.value);
      }
    });

    // Handle change events
    const handleChange$ = $((event: Event) => {
      const element = event.target as HTMLInputElement;
      if (onChange$) {
        onChange$(event, element);
      }
      if (onValueChange$ && !onInput$) {
        onValueChange$(element.value);
      }
    });

    // Determine size classes using semantic design system with proper mobile touch targets
    const sizeClasses = {
      sm: {
        input: "py-1.5 px-3 pr-12 text-sm mobile:min-h-[44px] tablet:min-h-[36px] desktop:min-h-[32px]",
        toggle: "right-1 w-10 h-10 mobile:w-11 mobile:h-11 tablet:w-9 tablet:h-9 desktop:w-8 desktop:h-8",
        icon: "w-4 h-4 mobile:w-5 mobile:h-5",
      },
      md: {
        input: "py-2 px-3 pr-12 text-sm mobile:min-h-[44px] tablet:min-h-[40px] desktop:min-h-[36px]",
        toggle: "right-1 w-10 h-10 mobile:w-11 mobile:h-11 tablet:w-10 tablet:h-10 desktop:w-9 desktop:h-9",
        icon: "w-5 h-5",
      },
      lg: {
        input: "py-2.5 px-4 pr-14 text-base mobile:min-h-[44px] tablet:min-h-[44px] desktop:min-h-[40px]",
        toggle: "right-1 w-11 h-11 mobile:w-12 mobile:h-12 tablet:w-11 tablet:h-11 desktop:w-10 desktop:h-10",
        icon: "w-5 h-5 mobile:w-6 mobile:h-6",
      },
    }[size];

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
            type={showPassword.value ? "text" : "password"}
            id={inputId}
            name={name}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            onInput$={handleInput$}
            onChange$={handleChange$}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            aria-label={ariaLabel}
            class={[
              "w-full rounded-md border transition-all duration-200",
              sizeClasses.input,
              // Mobile touch optimizations and keyboard support
              "touch-manipulation",
              // Error states using semantic colors with improved contrast
              hasError
                ? [
                    "border-error-500 focus:border-error-600 focus:ring-error-500",
                    "dark:border-error-400 dark:focus:border-error-300 dark:focus:ring-error-400",
                    "bg-error-50 dark:bg-error-950/20",
                  ].join(" ")
                : [
                    "border-gray-300 focus:border-primary-600 focus:ring-primary-500",
                    "dark:border-gray-600 dark:focus:border-primary-400 dark:focus:ring-primary-400",
                  ].join(" "),
              // Background states using surface colors with improved accessibility
              disabled
                ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-60"
                : "bg-white dark:bg-gray-900",
              // Text colors using semantic system with improved readability
              "text-gray-900 dark:text-gray-100",
              "placeholder:text-gray-500 dark:placeholder:text-gray-400",
              // Focus states with enhanced accessibility and mobile support
              "focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-2",
              "dark:focus:ring-offset-gray-900",
              // Hover states with improved visual feedback
              !disabled && [
                "hover:border-gray-400 dark:hover:border-gray-500",
                "hover:bg-gray-50 dark:hover:bg-gray-800",
              ].join(" "),
              // Enhanced mobile and responsive support
              "motion-safe:transition-all motion-reduce:transition-none",
              // Better text selection
              "selection:bg-primary-500 selection:text-white",
            ]
              .filter(Boolean)
              .join(" ")}
          />

          {/* Toggle visibility button */}
          <button
            type="button"
            onClick$={togglePasswordVisibility}
            disabled={disabled}
            aria-label={
              toggleLabel ||
              (showPassword.value ? "Hide password" : "Show password")
            }
            class={[
              "absolute top-1/2 -translate-y-1/2 flex items-center justify-center rounded-md",
              sizeClasses.toggle,
              // Enhanced mobile touch optimizations with proper hit targets
              "touch-manipulation",
              "mobile:min-h-[44px] mobile:min-w-[44px]",
              "tablet:min-h-[40px] tablet:min-w-[40px]",
              "desktop:min-h-[36px] desktop:min-w-[36px]",
              // Interactive states using semantic colors with improved contrast
              disabled
                ? "cursor-not-allowed opacity-50"
                : [
                    "cursor-pointer",
                    // Hover states with better visual feedback
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    "hover:text-gray-700 dark:hover:text-gray-300",
                    // Active states for better touch feedback
                    "active:bg-gray-200 dark:active:bg-gray-700",
                    "active:scale-95",
                    // Enhanced focus states for accessibility
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
                    "dark:focus:ring-primary-400 dark:focus:ring-offset-gray-900",
                    // Press animation for touch feedback
                    "motion-safe:active:animate-press",
                  ].join(" "),
              // Text colors with improved contrast
              "text-gray-500 dark:text-gray-400",
              // Enhanced transitions with touch feedback
              "transition-all duration-150",
              "motion-safe:transition-all motion-reduce:transition-none",
              // Better positioning and centering
              "flex-shrink-0",
            ]
              .filter(Boolean)
              .join(" ")}
            tabIndex={-1}
          >
            {showPassword.value ? (
              <HiEyeSlashOutline class={sizeClasses.icon} />
            ) : (
              <HiEyeOutline class={sizeClasses.icon} />
            )}
          </button>
        </div>

        {/* Password strength indicator (optional) */}
        {showStrength && value && !hasError && (
          <div class="mt-2">
            <PasswordStrengthIndicator password={value} />
          </div>
        )}

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
  },
);

export const PasswordStrengthIndicator = component$<{ password: string }>(
  ({ password }) => {
    // Calculate password strength from 0-100
    const strength = calculatePasswordStrength(password);

    // Determine color based on strength using semantic colors
    const getStrengthColor = () => {
      if (strength < 30) return "bg-error-500 dark:bg-error-400";
      if (strength < 60) return "bg-warning-500 dark:bg-warning-400";
      if (strength < 80) return "bg-success-500 dark:bg-success-400";
      return "bg-success-600 dark:bg-success-500";
    };

    // Get text description with appropriate color
    const getStrengthText = () => {
      if (strength < 30) return "Weak";
      if (strength < 60) return "Medium";
      if (strength < 80) return "Strong";
      return "Very strong";
    };

    // Get text color based on strength
    const getStrengthTextColor = () => {
      if (strength < 30) return "text-error-600 dark:text-error-400";
      if (strength < 60) return "text-warning-600 dark:text-warning-400";
      if (strength < 80) return "text-success-600 dark:text-success-400";
      return "text-success-700 dark:text-success-500";
    };

    return (
      <div class="space-y-1.5">
        <div class="flex items-center gap-3">
          <div class="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
            <div
              class={[
                "h-full rounded-full transition-all duration-300",
                "motion-safe:transition-all motion-reduce:transition-none",
                getStrengthColor(),
              ].join(" ")}
              style={{ width: `${strength}%` }}
            ></div>
          </div>
          <span
            class={[
              "text-xs font-medium whitespace-nowrap mobile:text-sm",
              getStrengthTextColor(),
            ].join(" ")}
          >
            {getStrengthText()}
          </span>
        </div>
      </div>
    );
  },
);

function calculatePasswordStrength(password: string): number {
  if (!password) return 0;

  let score = 0;

  // Basic length check (up to 50 points)
  score += Math.min(password.length * 5, 50);

  // Check for character variety (up to 50 points)
  if (/[A-Z]/.test(password)) score += 10; // Uppercase
  if (/[a-z]/.test(password)) score += 10; // Lowercase
  if (/[0-9]/.test(password)) score += 10; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 20; // Special characters

  return score;
}
