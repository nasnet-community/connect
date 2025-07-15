import { component$, useSignal, $, useContext, type QRL } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { subscribeToNewsletter, generateUserUUID, validateEmail, checkClientRateLimit } from "~/utils/api";

export interface NewsletterModalProps {
  isVisible: boolean;
  onClose$: QRL<() => void>;
}

export const NewsletterModal = component$<NewsletterModalProps>(({ isVisible, onClose$ }) => {
  const starContext = useContext(StarContext);
  const email = useSignal("");
  const isLoading = useSignal(false);
  const error = useSignal("");
  const isSuccess = useSignal(false);
  const showValidation = useSignal(false);

  const handleSubmit = $(async () => {
    showValidation.value = true;
    error.value = "";

    // Validate email
    if (!email.value.trim()) {
      error.value = $localize`Please enter your email address`;
      return;
    }

    if (!validateEmail(email.value)) {
      error.value = $localize`Please enter a valid email address`;
      return;
    }

    // Check client-side rate limiting
    if (!checkClientRateLimit()) {
      error.value = $localize`Please wait before submitting again. You can only enter once every 30 seconds.`;
      return;
    }

    isLoading.value = true;

    try {
      // Check if user already has a UUID, if not generate one
      let userUUID = starContext.state.Choose.Newsletter?.userUUID;
      if (!userUUID) {
        userUUID = await generateUserUUID();
      }

      // Subscribe to newsletter
      const result = await subscribeToNewsletter(
        email.value,
        userUUID
      );

      if (result.success) {
        // Track successful newsletter subscription
        track("newsletter_submitted", { 
          success: true,
          email_domain: email.value.split("@")[1] || "unknown"
        });

        // Update context with subscription info
        await starContext.updateChoose$({
          Newsletter: {
            isSubscribed: true,
            userUUID: userUUID,
            email: email.value.toLowerCase().trim(),
          },
        });

        isSuccess.value = true;
      } else {
        // Track failed newsletter subscription
        track("newsletter_submitted", { 
          success: false,
          error: result.error_detail || result.error || "unknown_error"
        });

        if (result.error_detail === "This email or UUID is already subscribed to the campaign") {
          error.value = $localize`This email is already entered in our giveaway! 🎉`;
        } else {
          error.value = result.error || $localize`Failed to subscribe. Please try again.`;
        }
      }
    } catch (err) {
      // Track exception during newsletter subscription
      track("newsletter_submitted", { 
        success: false,
        error: "exception_occurred"
      });

      error.value = $localize`Something went wrong. Please try again.`;
      console.error("Newsletter subscription error:", err);
    } finally {
      isLoading.value = false;
    }
  });

  const handleCloseClick = $(() => {
    if (!isLoading.value) {
      // Track newsletter modal close
      track("newsletter_closed", { 
        completed: isSuccess.value,
        had_error: !!error.value
      });
      onClose$();
    }
  });

  if (!isVisible) return null;

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-lg bg-black/75 animate-in fade-in duration-300">
      <div class="w-full max-w-lg transform transition-all duration-500 ease-out bg-white dark:bg-surface-dark border border-border dark:border-border-dark rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-500">

        {/* Gradient top border */}
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>

        {/* Close button */}
        <button
          onClick$={handleCloseClick}
          class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-secondary dark:text-text-dark-muted dark:hover:text-text-dark-secondary z-10 rounded-full hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary transition-all duration-200 hover:scale-110 active:scale-95"
          disabled={isLoading.value}
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-8">
          {!isSuccess.value ? (
            <>
              {/* Header */}
              <div class="text-center mb-8">
                <div class="flex justify-center mb-6">
                  <div class="relative p-2 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20 rounded-2xl border border-primary-500/20 dark:border-primary-500/30 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-in zoom-in duration-1000 delay-200">
                    <img 
                      src="/images/logo.jpg" 
                      alt="Connect Logo" 
                      class="w-16 h-16 rounded-xl object-cover shadow-lg transition-all duration-300"
                    />
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div>
                    <h2 class="text-2xl font-bold text-text dark:text-text-dark-default mb-2 leading-tight">
                      <span class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">{$localize`NasNet Giveaway Campaign`}</span>
                    </h2>
                    <p class="text-text-secondary dark:text-text-dark-secondary">
                      {$localize`Exclusive opportunity for NasNet Connect users`}
                    </p>
                  </div>
                  
                  <div class="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20 p-6 rounded-xl border border-primary-500/20 dark:border-primary-500/30">
                    <div class="text-center space-y-3">
                      <div class="space-y-1">
                        <p class="text-xl font-bold text-text dark:text-text-dark-default">
                          {$localize`Win 1 of 50 Starlink Subscriptions`}
                        </p>
                        <p class="text-2xl font-black text-primary-600 dark:text-primary-400">
                          {$localize`$100 Each`}
                        </p>
                      </div>
                      <div class="pt-2 border-t border-primary-500/20">
                        <p class="text-text-secondary dark:text-text-dark-secondary font-semibold">
                          {$localize`Total Prize Value:`} 
                          <span class="text-primary-600 dark:text-primary-400 font-bold">{$localize`$5,000`}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div class="space-y-3 mb-6">
                <div class="flex items-center space-x-3 text-text-secondary dark:text-text-dark-secondary p-3 rounded-lg hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
                  <div class="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="font-medium">{$localize`50 winners will be selected`}</span>
                </div>
                <div class="flex items-center space-x-3 text-text-secondary dark:text-text-dark-secondary p-3 rounded-lg hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
                  <div class="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="font-medium">{$localize`$100 Starlink Subscription each`}</span>
                </div>
                <div class="flex items-center space-x-3 text-text-secondary dark:text-text-dark-secondary p-3 rounded-lg hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/50 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
                  <div class="w-5 h-5 rounded-full bg-success flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <span class="font-medium">{$localize`Free to enter - just your email`}</span>
                </div>
              </div>

              {/* Form */}
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-semibold text-text dark:text-text-dark-default mb-2">
                    {$localize`Enter your email to participate`}
                  </label>
                  <input
                    type="email"
                    placeholder={$localize`Enter your email address`}
                    class={`w-full px-4 py-3 rounded-lg border transition-all duration-300 text-text dark:text-text-dark-default placeholder:text-text-muted dark:placeholder:text-text-dark-muted font-medium
                      ${error.value && showValidation.value 
                        ? "border-error bg-error-surface dark:border-error dark:bg-error-900/20 animate-pulse" 
                        : "border-border dark:border-border-dark bg-white dark:bg-surface-dark focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:scale-[1.01] hover:border-primary-400"
                      }
                      disabled:opacity-60 disabled:cursor-not-allowed
                    `}
                    value={email.value}
                    onInput$={(e) => {
                      email.value = (e.target as HTMLInputElement).value;
                      if (error.value) error.value = "";
                    }}
                    disabled={isLoading.value}
                  />
                  {error.value && showValidation.value && (
                    <p class="text-error text-sm mt-2 font-medium animate-in slide-in-from-top-2 duration-300">{error.value}</p>
                  )}
                </div>

                <button
                  onClick$={handleSubmit}
                  disabled={isLoading.value}
                  class="w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none disabled:bg-gray-400 shadow-lg"
                >
                  {isLoading.value ? (
                    <div class="flex items-center justify-center space-x-2">
                      <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{$localize`Entering Giveaway...`}</span>
                    </div>
                  ) : (
                    $localize`Enter Giveaway`
                  )}
                </button>
              </div>

              {/* Terms */}
              <p class="text-xs text-text-muted dark:text-text-dark-muted mt-4 leading-relaxed text-center">
                {$localize`By entering this giveaway, you consent to receive limited communications regarding NasNet Connect and the giveaway results. We are committed to safeguarding your privacy and will never share or misuse your information.`}
                <br />
                {$localize`Please review the full`} <a href="https://s4i.co/nncterms" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline transition-colors duration-200">{$localize`Terms & Conditions`}</a> {$localize`for eligibility and official rules.`}
              </p>
            </>
          ) : (
            // Success state
            <div class="text-center animate-in zoom-in duration-700">
              <div class="w-16 h-16 mx-auto mb-6 relative">
                <div class="w-full h-full bg-success rounded-full flex items-center justify-center animate-in zoom-in duration-500 delay-100 shadow-lg animate-bounce">
                  <svg class="w-8 h-8 text-white animate-in zoom-in duration-300 delay-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              <h3 class="text-2xl font-bold mb-4 text-text dark:text-text-dark-default animate-in slide-in-from-bottom-3 duration-500 delay-500">
                {$localize`Entry Confirmed`}
              </h3>
              
              <div class="space-y-4 mb-6 animate-in slide-in-from-bottom-3 duration-500 delay-700">
                <p class="text-lg text-text dark:text-text-dark-default">
                  {$localize`Thank you for participating in our giveaway.`}
                </p>
                <div class="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 dark:from-primary-500/20 dark:to-secondary-500/20 p-4 rounded-lg border border-primary-500/20 dark:border-primary-500/30 animate-in zoom-in duration-400 delay-900">
                  <p class="text-text-secondary dark:text-text-dark-secondary font-medium">
                    {$localize`You are now eligible to win one of 50 Starlink Subscription worth $100 each.`}
                  </p>
                </div>
              </div>
              
              <div class="text-sm text-text-muted dark:text-text-dark-muted space-y-2 mb-6 animate-in fade-in duration-500 delay-1000">
                <p>{$localize`Winner notification will be sent via email.`}</p>
                <p>{$localize`Thank you for being part of the NasNet Connect community.`}</p>
              </div>
              
              <button
                onClick$={handleCloseClick}
                class="w-full py-3 px-6 rounded-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg animate-in slide-in-from-bottom-3 duration-500 delay-1200"
              >
                {$localize`Close`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}); 