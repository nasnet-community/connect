import { $, useSignal } from "@builder.io/qwik";
import type { UseNewsletterParams, UseNewsletterReturn, NewsletterSubscription } from "./Newsletter.types";

/**
 * Hook for managing newsletter subscription state and validation
 */
export function useNewsletter({
  onSubscribe$,
  initialLoading = false,
  validateEmail = true,
  // _customValidation$ = null,
}: UseNewsletterParams = {}): UseNewsletterReturn {
  // State for the newsletter form
  const email = useSignal("");
  const loading = useSignal(initialLoading);
  const error = useSignal<string | null>(null);
  const success = useSignal(false);
  const isValid = useSignal(false);

  // Store validation flag in a signal so it can be accessed in $() functions
  const shouldValidateEmail = useSignal(validateEmail);

  // Store the subscription handler - it's already a QRL so it's serializable
  const subscriptionHandler = onSubscribe$;

  // Handle email input changes
  const handleEmailInput$ = $(async (event: Event) => {
    const target = event.target as HTMLInputElement;
    const emailValue = target.value;

    console.log("[Newsletter] Email input changed:", { emailValue, length: emailValue.length });

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
        console.log("[Newsletter] Email validation failed:", { email: emailValue });
      } else if (isValid.value) {
        console.log("[Newsletter] Email validation passed:", { email: emailValue });
      }
    } else {
      isValid.value = false;
      error.value = null;
      console.log("[Newsletter] Email cleared");
    }
  });

  // Validate email manually
  const validateEmail$ = $(async (): Promise<boolean> => {
    const emailValue = email.value.trim();

    console.log("[Newsletter] Manual email validation started:", { email: emailValue });

    if (!emailValue) {
      error.value = $localize`Email address is required`;
      isValid.value = false;
      console.warn("[Newsletter] Validation failed: Email is required");
      return false;
    }

    // Inline validation logic
    if (shouldValidateEmail.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidFormat = emailRegex.test(emailValue);

      if (!isValidFormat) {
        error.value = $localize`Please enter a valid email address`;
        isValid.value = false;
        console.warn("[Newsletter] Validation failed: Invalid email format", { email: emailValue });
        return false;
      }
    }

    // Note: Custom validation is handled in handleEmailInput$
    // We don't run it here as customValidation$ is not available in this scope

    error.value = null;
    isValid.value = true;
    console.log("[Newsletter] Email validation successful", { email: emailValue });
    return true;
  });

  // Handle form submission
  const handleSubmit$ = $(async (event: Event): Promise<void> => {
    event.preventDefault();

    console.log("[Newsletter] Newsletter subscription started", { email: email.value });

    // Reset states
    loading.value = true;
    error.value = null;
    success.value = false;

    try {
      // Validate email first
      const isEmailValid = await validateEmail$();
      if (!isEmailValid) {
        console.warn("[Newsletter] Subscription aborted: Email validation failed");
        return;
      }

      // Ensure email has a value
      const emailValue = email.value?.trim();
      if (!emailValue) {
        console.error("[Newsletter] Email value is empty or undefined");
        error.value = "Please enter a valid email address";
        loading.value = false;
        return;
      }

      // Create subscription object (use ISO string for timestamp for resumability)
      const subscription: NewsletterSubscription = {
        email: emailValue,
        timestamp: new Date().toISOString(),
        source: "newsletter-component",
      };

      console.log("[Newsletter] Subscription object created:", subscription);

      // Call the subscription handler
      if (subscriptionHandler) {
        console.log("[Newsletter] Calling onSubscribe$ handler with subscription:", subscription);
        const startTime = Date.now();
        try {
          await subscriptionHandler(subscription);
          const duration = Date.now() - startTime;
          console.log("[Newsletter] onSubscribe$ completed successfully", { duration: `${duration}ms` });
        } catch (error) {
          console.error("[Newsletter] onSubscribe$ handler threw an error:", error);
          throw error; // Re-throw to be handled by the outer catch
        }
      } else {
        console.warn("[Newsletter] No onSubscribe$ handler provided - using default behavior");
        // Default behavior: just show success
        // In production, this might send to a default API endpoint
      }

      // Set success state
      success.value = true;
      console.log("[Newsletter] Newsletter subscription successful", { email: subscription.email });

      // Clear email after successful subscription
      email.value = "";
      isValid.value = false;

    } catch (err) {
      console.error("[Newsletter] Newsletter subscription failed:", err);
      // Handle errors
      if (err instanceof Error) {
        error.value = err.message;
        console.error("[Newsletter] Error details:", {
          message: err.message,
          name: err.name,
          stack: err.stack,
        });
      } else {
        error.value = $localize`Failed to subscribe. Please try again.`;
        console.error("[Newsletter] Unknown error type:", err);
      }
    } finally {
      loading.value = false;
      console.log("[Newsletter] Subscription process completed", {
        success: success.value,
        hasError: !!error.value,
      });
    }
  });

  // Reset form state
  const reset$ = $(() => {
    console.log("[Newsletter] Newsletter form reset");
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