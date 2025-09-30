import { $, useSignal } from "@builder.io/qwik";
import type { UseNewsletterParams, UseNewsletterReturn, NewsletterSubscription } from "./Newsletter.types";

/**
 * Hook for managing newsletter subscription state and validation
 */
export function useNewsletter({
  onSubscribe$,
  initialLoading = false,
  validateEmail = true,
  customValidation$ = null,
}: UseNewsletterParams = {}): UseNewsletterReturn {
  // State for the newsletter form
  const email = useSignal("");
  const loading = useSignal(initialLoading);
  const error = useSignal<string | null>(null);
  const success = useSignal(false);
  const isValid = useSignal(false);

  // Store validation flag in a signal so it can be accessed in $() functions
  const shouldValidateEmail = useSignal(validateEmail);

  // Handle email input changes
  const handleEmailInput$ = $(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const emailValue = target.value;

    email.value = emailValue;
    error.value = null; // Clear errors on input
    success.value = false; // Reset success state

    // Validate email format
    if (emailValue.trim()) {
      // Inline validation logic
      if (!shouldValidateEmail.value) {
        isValid.value = true;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid.value = emailRegex.test(emailValue.trim());
      }

      if (!isValid.value && emailValue.length > 5) {
        error.value = $localize`Please enter a valid email address`;
      }
    } else {
      isValid.value = false;
      error.value = null;
    }
  });

  // Validate email manually
  const validateEmail$ = $(async (): Promise<boolean> => {
    const emailValue = email.value.trim();

    if (!emailValue) {
      error.value = $localize`Email address is required`;
      isValid.value = false;
      return false;
    }

    // Inline validation logic
    if (shouldValidateEmail.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidFormat = emailRegex.test(emailValue);

      if (!isValidFormat) {
        error.value = $localize`Please enter a valid email address`;
        isValid.value = false;
        return false;
      }
    }

    // Run custom validation if provided
    if (customValidation$) {
      try {
        const customError = await customValidation$(emailValue);
        if (customError) {
          error.value = customError;
          isValid.value = false;
          return false;
        }
      } catch (e) {
        // Silently skip custom validation if it fails
        console.warn("Custom validation error:", e);
      }
    }

    error.value = null;
    isValid.value = true;
    return true;
  });

  // Handle form submission
  const handleSubmit$ = $(async (event: Event): Promise<void> => {
    event.preventDefault();

    // Reset states
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      // Validate email first
      const isEmailValid = await validateEmail$();
      if (!isEmailValid) {
        return;
      }

      // Create subscription object
      const subscription: NewsletterSubscription = {
        email: email.value.trim(),
        timestamp: new Date(),
        source: "newsletter-component",
      };

      // Call the subscription handler
      if (onSubscribe$) {
        await onSubscribe$(subscription);
      }

      // Set success state
      success.value = true;

      // Clear email after successful subscription
      email.value = "";
      isValid.value = false;

    } catch (err) {
      // Handle errors
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = $localize`Failed to subscribe. Please try again.`;
      }
    } finally {
      loading.value = false;
    }
  });

  // Reset form state
  const reset$ = $(() => {
    email.value = "";
    loading.value = false;
    error.value = null;
    success.value = false;
    isValid.value = false;
  });

  return {
    email,
    loading,
    error,
    success,
    isValid,
    handleEmailInput$,
    handleSubmit$,
    reset$,
    validateEmail$,
  };
}