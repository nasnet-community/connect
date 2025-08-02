import {
  component$,
  useSignal,
  $,
  useContext,
  type QRL,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import {
  subscribeToNewsletter,
  generateUserUUID,
  validateEmail,
  checkClientRateLimit,
} from "~/utils/api";

export interface NewsletterModalProps {
  isVisible: boolean;
  onClose$: QRL<() => void>;
}

export const NewsletterModal = component$<NewsletterModalProps>(
  ({ isVisible, onClose$ }) => {
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
        const result = await subscribeToNewsletter(email.value, userUUID);

        if (result.success) {
          // Track successful newsletter subscription
          track("newsletter_submitted", {
            success: true,
            email_domain: email.value.split("@")[1] || "unknown",
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
            error: result.error_detail || result.error || "unknown_error",
          });

          if (
            result.error_detail ===
            "This email or UUID is already subscribed to the campaign"
          ) {
            error.value = $localize`This email is already entered in our giveaway! 🎉`;
          } else {
            error.value =
              result.error || $localize`Failed to subscribe. Please try again.`;
          }
        }
      } catch (err) {
        // Track exception during newsletter subscription
        track("newsletter_submitted", {
          success: false,
          error: "exception_occurred",
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
          had_error: !!error.value,
        });
        onClose$();
      }
    });

    if (!isVisible) return null;

    return (
      <div class="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-lg duration-300">
        <div class="animate-in zoom-in-95 slide-in-from-bottom-4 relative w-full max-w-lg transform overflow-hidden rounded-2xl border border-border bg-white shadow-2xl transition-all duration-500 duration-500 ease-out dark:border-border-dark dark:bg-surface-dark">
          {/* Gradient top border */}
          <div class="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-500"></div>

          {/* Close button */}
          <button
            onClick$={handleCloseClick}
            class="text-text-muted hover:bg-surface-secondary hover:text-text-secondary dark:text-text-dark-muted dark:hover:bg-surface-dark-secondary dark:hover:text-text-dark-secondary absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
            disabled={isLoading.value}
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div class="p-8">
            {!isSuccess.value ? (
              <>
                {/* Header */}
                <div class="mb-8 text-center">
                  <div class="mb-6 flex justify-center">
                    <div class="animate-in zoom-in relative rounded-2xl border border-primary-500/20 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 p-2 transition-all delay-200 duration-1000 duration-300 hover:scale-105 hover:shadow-lg dark:border-primary-500/30 dark:from-primary-500/20 dark:to-secondary-500/20">
                      <img
                        src="/images/logo.jpg"
                        alt="Connect Logo"
                        class="h-16 w-16 rounded-xl object-cover shadow-lg transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div class="space-y-4">
                    <div>
                      <h2 class="mb-2 text-2xl font-bold leading-tight text-text dark:text-text-dark-default">
                        <span class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">{$localize`NasNet Giveaway Campaign`}</span>
                      </h2>
                      <p class="text-text-secondary dark:text-text-dark-secondary">
                        {$localize`Exclusive opportunity for NasNet Connect users`}
                      </p>
                    </div>

                    <div class="rounded-xl border border-primary-500/20 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 p-6 dark:border-primary-500/30 dark:from-primary-500/20 dark:to-secondary-500/20">
                      <div class="space-y-3 text-center">
                        <div class="space-y-1">
                          <p class="text-xl font-bold text-text dark:text-text-dark-default">
                            {$localize`Win 1 of 50 Starlink Subscriptions`}
                          </p>
                          <p class="text-2xl font-black text-primary-600 dark:text-primary-400">
                            {$localize`$100 Each`}
                          </p>
                        </div>
                        <div class="border-t border-primary-500/20 pt-2">
                          <p class="text-text-secondary dark:text-text-dark-secondary font-semibold">
                            {$localize`Total Prize Value:`}
                            <span class="font-bold text-primary-600 dark:text-primary-400">{$localize`$5,000`}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div class="mb-6 space-y-3">
                  <div class="text-text-secondary hover:bg-surface-secondary/50 dark:text-text-dark-secondary dark:hover:bg-surface-dark-secondary/50 flex items-center space-x-3 rounded-lg p-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
                    <div class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success">
                      <svg
                        class="h-3 w-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span class="font-medium">{$localize`50 winners will be selected`}</span>
                  </div>
                  <div class="text-text-secondary hover:bg-surface-secondary/50 dark:text-text-dark-secondary dark:hover:bg-surface-dark-secondary/50 flex items-center space-x-3 rounded-lg p-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
                    <div class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success">
                      <svg
                        class="h-3 w-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span class="font-medium">{$localize`$100 Starlink Subscription each`}</span>
                  </div>
                  <div class="text-text-secondary hover:bg-surface-secondary/50 dark:text-text-dark-secondary dark:hover:bg-surface-dark-secondary/50 flex items-center space-x-3 rounded-lg p-3 transition-all duration-200 hover:scale-[1.02] hover:shadow-sm">
                    <div class="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success">
                      <svg
                        class="h-3 w-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                    <span class="font-medium">{$localize`Free to enter - just your email`}</span>
                  </div>
                </div>

                {/* Form */}
                <div class="space-y-4">
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-text dark:text-text-dark-default">
                      {$localize`Enter your email to participate`}
                    </label>
                    <input
                      type="email"
                      placeholder={$localize`Enter your email address`}
                      class={`placeholder:text-text-muted dark:placeholder:text-text-dark-muted w-full rounded-lg border px-4 py-3 font-medium text-text transition-all duration-300 dark:text-text-dark-default
                      ${
                        error.value && showValidation.value
                          ? "animate-pulse border-error bg-error-surface dark:border-error dark:bg-error-900/20"
                          : "border-border bg-white hover:border-primary-400 focus:scale-[1.01] focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 dark:border-border-dark dark:bg-surface-dark"
                      }
                      disabled:cursor-not-allowed disabled:opacity-60
                    `}
                      value={email.value}
                      onInput$={(e) => {
                        email.value = (e.target as HTMLInputElement).value;
                        if (error.value) error.value = "";
                      }}
                      disabled={isLoading.value}
                    />
                    {error.value && showValidation.value && (
                      <p class="animate-in slide-in-from-top-2 mt-2 text-sm font-medium text-error duration-300">
                        {error.value}
                      </p>
                    )}
                  </div>

                  <button
                    onClick$={handleSubmit}
                    disabled={isLoading.value}
                    class="w-full transform rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 active:scale-[0.98] disabled:transform-none disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-60"
                  >
                    {isLoading.value ? (
                      <div class="flex items-center justify-center space-x-2">
                        <svg
                          class="h-4 w-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          />
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span>{$localize`Entering Giveaway...`}</span>
                      </div>
                    ) : (
                      $localize`Enter Giveaway`
                    )}
                  </button>
                </div>

                {/* Terms */}
                <p class="text-text-muted dark:text-text-dark-muted mt-4 text-center text-xs leading-relaxed">
                  {$localize`By entering this giveaway, you consent to receive limited communications regarding NasNet Connect and the giveaway results. We are committed to safeguarding your privacy and will never share or misuse your information.`}
                  <br />
                  {$localize`Please review the full`}{" "}
                  <a
                    href="https://s4i.co/nncterms"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-primary-600 underline transition-colors duration-200 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                  >{$localize`Terms & Conditions`}</a>{" "}
                  {$localize`for eligibility and official rules.`}
                </p>
              </>
            ) : (
              // Success state
              <div class="animate-in zoom-in text-center duration-700">
                <div class="relative mx-auto mb-6 h-16 w-16">
                  <div class="animate-in zoom-in flex h-full w-full animate-bounce items-center justify-center rounded-full bg-success shadow-lg delay-100 duration-500">
                    <svg
                      class="animate-in zoom-in h-8 w-8 text-white delay-300 duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                <h3 class="animate-in slide-in-from-bottom-3 mb-4 text-2xl font-bold text-text delay-500 duration-500 dark:text-text-dark-default">
                  {$localize`Entry Confirmed`}
                </h3>

                <div class="animate-in slide-in-from-bottom-3 mb-6 space-y-4 delay-700 duration-500">
                  <p class="text-lg text-text dark:text-text-dark-default">
                    {$localize`Thank you for participating in our giveaway.`}
                  </p>
                  <div class="animate-in zoom-in delay-900 rounded-lg border border-primary-500/20 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 p-4 duration-400 dark:border-primary-500/30 dark:from-primary-500/20 dark:to-secondary-500/20">
                    <p class="text-text-secondary dark:text-text-dark-secondary font-medium">
                      {$localize`You are now eligible to win one of 50 Starlink Subscription worth $100 each.`}
                    </p>
                  </div>
                </div>

                <div class="animate-in fade-in text-text-muted dark:text-text-dark-muted mb-6 space-y-2 text-sm delay-1000 duration-500">
                  <p>{$localize`Winner notification will be sent via email.`}</p>
                  <p>{$localize`Thank you for being part of the NasNet Connect community.`}</p>
                </div>

                <button
                  onClick$={handleCloseClick}
                  class="animate-in slide-in-from-bottom-3 delay-1200 w-full transform rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 duration-500 hover:scale-[1.02] hover:from-primary-600 hover:to-secondary-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 active:scale-[0.98]"
                >
                  {$localize`Close`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
