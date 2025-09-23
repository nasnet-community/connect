import { $, useSignal } from "@builder.io/qwik";
import type { UseNewsletterParams, UseNewsletterReturn, NewsletterSubscription } from "./Newsletter.types";

/**
 * Hook for managing newsletter subscription state and validation
 */
export function useNewsletter({
  onSubscribe$,
  initialLoading = false,
  validateEmail = true,
  customValidation$,
}: UseNewsletterParams = {}): UseNewsletterReturn {
  // State for the newsletter form
  const email = useSignal("");
  const loading = useSignal(initialLoading);
  const error = useSignal<string | null>(null);
  const success = useSignal(false);
  const isValid = useSignal(false);

  // Email validation function - wrapped in $() for Qwik serialization
  const validateEmailFormat = $((emailValue: string): boolean => {
    if (!validateEmail) return true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailValue.trim());
  });

  // Handle email input changes
  const handleEmailInput$ = $(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const emailValue = target.value;

    email.value = emailValue;
    error.value = null; // Clear errors on input
    success.value = false; // Reset success state

    // Validate email format
    if (emailValue.trim()) {
      isValid.value = await validateEmailFormat(emailValue);

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

    if (!(await validateEmailFormat(emailValue))) {
      error.value = $localize`Please enter a valid email address`;
      isValid.value = false;
      return false;
    }

    // Run custom validation if provided
    if (customValidation$) {
      const customError = await customValidation$(emailValue);
      if (customError) {
        error.value = customError;
        isValid.value = false;
        return false;
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