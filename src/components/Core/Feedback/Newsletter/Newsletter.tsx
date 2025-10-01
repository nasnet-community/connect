import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import type { NewsletterProps } from "./Newsletter.types";
import { useNewsletter } from "./useNewsletter";
import { NewsletterLogo } from "./NewsletterLogo";
import { BackgroundLogo } from "./BackgroundLogo";
import { Input } from "../../Input/Input";
import { Button } from "../../button/Button";

/**
 * Premium Newsletter component with advanced visual design.
 * Features circuit patterns, network topology, sophisticated animations, and professional styling.
 * Optimized for IT professionals and network administrators.
 *
 * @example
 * ```tsx
 * // Basic usage with premium design
 * <Newsletter
 *   title="Stay Connected"
 *   description="Get the latest router configuration tips and security updates."
 *   onSubscribe$={handleSubscription}
 * />
 *
 * // Professional horizontal layout
 * <Newsletter
 *   variant="horizontal"
 *   glassmorphism={true}
 *   themeColors={true}
 *   theme="branded"
 * />
 * ```
 */
export const Newsletter = component$<NewsletterProps>(
  ({
    variant = "responsive",
    size = "md",
    title = $localize`Stay Connected by subscribing to our newsletter`,
    description = $localize`Subscribe to get the latest router configuration tips, security updates, and exclusive content.`,
    placeholder = $localize`Enter your email address`,
    buttonText = $localize`Subscribe`,
    onSubscribe$,
    showLogo = true,
    glassmorphism = false,
    themeColors = true,
    theme = "branded",
    disabled = false,
    showPrivacyNotice = true,
    privacyNoticeText = $localize`We respect your privacy. Unsubscribe at any time.`,
    loading: externalLoading = false,
    success: externalSuccess = false,
    error: externalError,
    touchOptimized: _touchOptimized = true,
    surfaceElevation = "elevated",
    compact = false,
    fullWidth = false,
    animated = true,
    class: className,
  }) => {
    // Log component initialization
    console.log("[Newsletter] Component initialized", {
      variant,
      size,
      theme,
      glassmorphism,
      hasOnSubscribe: !!onSubscribe$,
    });

    // Internal state management
    const {
      email,
      loading: internalLoading,
      error: internalError,
      success: internalSuccess,
      isValid,
      handleEmailInput$,
      handleSubmit$,
      reset$,
    } = useNewsletter({ onSubscribe$ });

    // Use external state if provided, otherwise use internal state
    const isLoading = externalLoading || internalLoading.value;
    const isSuccess = externalSuccess || internalSuccess.value;
    const errorMessage = externalError || internalError.value;

    // Focus and hover states for enhanced UX
    const isFocused = useSignal(false);

    // Track state changes for debugging
    useVisibleTask$(({ track }) => {
      const loading = track(() => isLoading);
      const success = track(() => isSuccess);
      const error = track(() => errorMessage);
      const emailValue = track(() => email.value);

      console.log("[Newsletter] State changed", {
        loading,
        success,
        error,
        email: emailValue,
        isValid: isValid.value,
      });

      if (error) {
        console.warn("[Newsletter] Error state detected:", error);
      }

      if (success) {
        console.log("[Newsletter] Success state detected - subscription completed");
      }
    });

    // Handle input focus
    const handleFocus$ = $(() => {
      isFocused.value = true;
      console.log("[Newsletter] Email input focused");
    });

    // Handle input blur
    const handleBlur$ = $(() => {
      isFocused.value = false;
      console.log("[Newsletter] Email input blurred", {
        email: email.value,
        isValid: isValid.value,
      });
    });


    // Get layout classes based on variant
    const getLayoutClasses = () => {
      const baseLayout = "flex items-center";

      switch (variant) {
        case "horizontal":
          return `${baseLayout} flex-row gap-6`;
        case "vertical":
          return `${baseLayout} flex-col gap-4`;
        case "hero":
          return `${baseLayout} flex-col gap-4 sm:flex-row sm:gap-4 justify-center`;
        case "responsive":
        default:
          return `${baseLayout} flex-col gap-6 md:flex-row md:gap-8 lg:gap-10`;
      }
    };

    // Get container classes - premium modern styling
    const getContainerClasses = () => {
      const baseClasses = [
        "relative overflow-hidden transition-all duration-700 group",
        fullWidth ? "w-full" : variant === "hero" ? "max-w-2xl mx-auto" : "max-w-5xl mx-auto",
        animated ? "transform-gpu" : "",
      ];

      // Size classes with enhanced padding
      const sizeClasses = variant === "hero" ? {
        sm: "p-4 rounded-2xl",
        md: "p-5 rounded-2xl",
        lg: "p-6 rounded-2xl",
      } : {
        sm: compact ? "p-6 rounded-2xl" : "p-8 rounded-3xl",
        md: compact ? "p-8 rounded-3xl" : "p-10 lg:p-12 rounded-3xl",
        lg: compact ? "p-10 rounded-3xl" : "p-12 lg:p-16 rounded-3xl",
      };

      // Premium glassmorphism and theme classes
      let surfaceClasses = "";

      if (variant === "hero") {
        surfaceClasses = "bg-white/60 dark:bg-gray-900/60 backdrop-blur-2xl backdrop-saturate-150 border border-white/30 dark:border-gray-700/30";
      } else if (glassmorphism) {
        surfaceClasses = "bg-white/80 dark:bg-gray-900/80 backdrop-blur-3xl backdrop-saturate-200 border-2 border-white/40 dark:border-primary-500/20";
      } else if (themeColors) {
        switch (theme) {
          case "branded":
            surfaceClasses = "bg-gradient-to-br from-white/95 via-primary-50/30 to-secondary-50/40 dark:from-gray-900/95 dark:via-primary-950/30 dark:to-secondary-950/40 backdrop-blur-2xl border-2 border-gradient-to-br from-primary-200/50 to-secondary-200/50 dark:from-primary-700/30 dark:to-secondary-700/30";
            break;
          case "light":
            surfaceClasses = "bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-2 border-gray-200/60 dark:border-gray-700/60";
            break;
          case "dark":
            surfaceClasses = "bg-gray-900/95 dark:bg-gray-950/95 backdrop-blur-2xl border-2 border-gray-700/60 dark:border-gray-800/60 text-white";
            break;
          case "glass":
            surfaceClasses = "bg-white/70 dark:bg-gray-900/70 backdrop-blur-3xl backdrop-saturate-200 border-2 border-white/30 dark:border-gray-700/30";
            break;
        }
      } else {
        surfaceClasses = "bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl border-2 border-gray-200/60 dark:border-gray-700/60";
      }

      // Premium elevation shadow with enhanced effects
      const elevationClasses = variant === "hero" ? {
        base: "shadow-md",
        elevated: "shadow-lg hover:shadow-xl",
        depressed: "shadow-inner shadow-gray-200/30 dark:shadow-gray-900/30",
      } : {
        base: "shadow-lg",
        elevated: "shadow-2xl hover:shadow-primary/20 hover:shadow-3xl dark:shadow-dark-2xl dark:hover:shadow-primary-500/10 dark:hover:shadow-dark-3xl",
        depressed: "shadow-inner shadow-gray-200/50 dark:shadow-gray-900/50",
      };

      return [
        ...baseClasses,
        sizeClasses[size],
        surfaceClasses,
        elevationClasses[surfaceElevation],
        "",
        className,
      ].filter(Boolean).join(" ");
    };

    // Get logo container classes
    const getLogoContainerClasses = () => {
      if (variant === "hero") {
        return "hidden"; // Hide logo in hero variant
      }

      const baseClasses = "flex-shrink-0";

      if (variant === "horizontal" || variant === "responsive") {
        return `${baseClasses} flex items-center justify-center w-24 md:w-32 lg:w-40`;
      }

      return `${baseClasses} flex items-center justify-center w-full`;
    };

    // Get content container classes
    const getContentContainerClasses = () => {
      if (variant === "hero") {
        return "flex-1 space-y-3";
      }

      const baseClasses = "flex-1 space-y-5";

      if (variant === "vertical" || (variant === "responsive")) {
        return `${baseClasses} text-center md:text-start`;
      }

      return `${baseClasses} text-start`;
    };

    // Get form classes - enhanced spacing
    const getFormClasses = () => {
      if (variant === "hero") {
        return "flex flex-col sm:flex-row gap-3 w-full max-w-lg mx-auto";
      }
      return "space-y-5 w-full max-w-md mx-auto" +
        (variant === "horizontal" ? " md:mx-0" : "");
    };

    return (
      <div class="relative">
        {/* Premium multi-layer gradient background - only for non-hero variants */}
        {variant !== "hero" && (
          <div class="absolute inset-0 -z-10">
            <div class="absolute inset-0 bg-gradient-to-br from-primary-100/30 via-transparent to-secondary-100/30 dark:from-primary-950/20 dark:to-secondary-950/20" />
            <div class="absolute inset-0 bg-gradient-to-tr from-secondary-100/20 via-transparent to-primary-100/20 dark:from-secondary-950/10 dark:to-primary-950/10" />

            {/* Circuit pattern overlay */}
            <svg class="absolute inset-0 w-full h-full opacity-5 dark:opacity-10" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="currentColor" class="text-primary-500" />
                  <circle cx="95" cy="5" r="1" fill="currentColor" class="text-primary-500" />
                  <circle cx="50" cy="50" r="2" fill="currentColor" class="text-secondary-500" />
                  <circle cx="5" cy="95" r="1" fill="currentColor" class="text-primary-500" />
                  <circle cx="95" cy="95" r="1" fill="currentColor" class="text-primary-500" />
                  <path d="M5,5 L50,50 M50,50 L95,5 M50,50 L5,95 M50,50 L95,95" stroke="currentColor" stroke-width="0.5" fill="none" class="text-secondary-300 dark:text-secondary-700" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
          </div>
        )}

        {/* Main container with background logo */}
        <div class={getContainerClasses()}>
          {/* Large background logo watermark - hide for hero variant */}
          {variant !== "hero" && (
            <BackgroundLogo
              size={size === "sm" ? 600 : size === "lg" ? 1000 : 800}
              opacity={0.06}
              position="bottom-center"
              animated={animated}
              rotation={-5}
              blur={0.5}
            />
          )}

          {/* Premium animated background decorations */}
          {animated && (
            <>
              <div class="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none rounded-3xl" />
              <div class="absolute -inset-1 bg-gradient-to-r from-primary-400/30 via-secondary-400/30 to-primary-400/30 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-1000 pointer-events-none" />

              {/* Static network accent elements */}
              <div class="absolute top-10 -left-4 w-12 h-12 bg-primary-500/10 dark:bg-primary-400/10 rounded-full blur-xl opacity-60" />
              <div class="absolute bottom-10 -right-4 w-16 h-16 bg-secondary-500/10 dark:bg-secondary-400/10 rounded-full blur-xl opacity-40" />
            </>
          )}

          <div class={getLayoutClasses() + " relative z-10"}>
          {/* Small Logo Badge (optional) - hide for hero variant */}
          {showLogo && variant !== "responsive" && variant !== "hero" && (
            <div class={getLogoContainerClasses()}>
              <div class="transform transition-all duration-500">
                <NewsletterLogo />
              </div>
            </div>
          )}

          {/* Content Section */}
          <div class={getContentContainerClasses()}>
            {/* Enhanced Header with gradient text - simplified for hero variant */}
            {variant !== "hero" && (
              <div class="space-y-3">
                <h2 class={`font-black bg-gradient-to-r from-gray-900 via-primary-500 to-secondary-500 dark:from-white dark:via-primary-400 dark:to-secondary-400 bg-clip-text text-transparent leading-tight bg-300% animate-gradient ${
                  size === "sm" ? "text-2xl md:text-3xl" : size === "lg" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
                }`}>
                  {title}
                </h2>

                <p class={`text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-2xl mx-auto ${
                  size === "sm" ? "text-sm md:text-base" : size === "lg" ? "text-lg md:text-xl" : "text-base md:text-lg"
                }`}>
                  {description}
                </p>
              </div>
            )}

            {/* Hero variant title - compact and minimal */}
            {variant === "hero" && title && (
              <div class="text-center mb-4">
                <h3 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-primary-600 dark:from-white dark:to-primary-400 bg-clip-text text-transparent">
                  {title}
                </h3>
              </div>
            )}

            {/* Premium Form with floating label */}
            <form class={getFormClasses()} onSubmit$={handleSubmit$} preventdefault:submit>
              <div class={variant === "hero" ? "flex-1" : "relative group"}>
                <Input
                  type="email"
                  value={email.value}
                  placeholder={placeholder}
                  id="newsletter-email"
                  disabled={disabled || isLoading}
                  required
                  size={variant === "hero" ? "md" : size === "sm" ? "md" : size === "lg" ? "xl" : "lg"}
                  validation={errorMessage ? "invalid" : isSuccess ? "valid" : "default"}
                  onInput$={handleEmailInput$}
                  onFocus$={handleFocus$}
                  onBlur$={handleBlur$}
                  class="w-full"
                  hasSuffixSlot={true}
                  fluid={true}
                  animate={true}
                  aria-label={$localize`Email address for newsletter subscription`}
                  aria-describedby={errorMessage ? "newsletter-error" : showPrivacyNotice ? "newsletter-privacy" : undefined}
                >
                  <div q:slot="suffix">
                    {/* Success checkmark with animation */}
                    {isSuccess ? (
                      <div class="relative">
                        <div class="absolute inset-0 bg-success-500 rounded-full blur-lg animate-ping" />
                        <svg class="h-6 w-6 text-success-500 relative animate-bounce-once" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      /* Email icon when not success */
                      <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                </Input>
              </div>

              {/* Error Message with animation - hide for hero variant */}
              {errorMessage && variant !== "hero" && (
                <div id="newsletter-error" class="text-error-600 dark:text-error-400 text-sm flex items-center gap-2 animate-slide-up bg-error-50/50 dark:bg-error-950/30 px-4 py-2 rounded-lg border border-error-200 dark:border-error-800">
                  <svg class="h-4 w-4 flex-shrink-0 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium">{errorMessage}</span>
                </div>
              )}

              {/* Premium Submit Button */}
              <Button
                type="submit"
                disabled={disabled || isLoading || !isValid.value || isSuccess}
                loading={isLoading}
                variant={variant === "hero" ? "primary" : theme === "glass" ? "glass" : "primary"}
                size={variant === "hero" ? "md" : size === "sm" ? "md" : size === "lg" ? "xl" : "lg"}
                fullWidth={variant !== "hero"}
                ripple={true}
                gradientDirection="to-r"
                radius="lg"
                shadow={true}
                pulse={false}
                aria-label={isSuccess ? $localize`Successfully subscribed` : $localize`Subscribe to newsletter`}
                class={variant === "hero" ? "!bg-gradient-to-r !from-primary-500 !to-primary-600 hover:!from-primary-600 hover:!to-primary-700 min-w-[120px]" : "mt-4 !bg-gradient-to-r !from-primary-500 !to-primary-600 hover:!from-primary-600 hover:!to-primary-700"}
              >
                {isSuccess ? (
                  <div class="flex items-center justify-center gap-3">
                    <svg class="h-5 w-5 animate-bounce-once" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="tracking-widest">{$localize`CONNECTED!`}</span>
                    <svg class="h-5 w-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                    </svg>
                  </div>
                ) : (
                  <div class="flex items-center justify-center gap-3">
                    {!isLoading && (
                      <svg class="h-5 w-5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0" />
                      </svg>
                    )}
                    <span class={variant === "hero" ? "font-semibold" : "tracking-widest"}>{isLoading ? (variant === "hero" ? $localize`...` : $localize`CONNECTING...`) : buttonText}</span>
                    {!isLoading && (
                      <svg class="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    )}
                  </div>
                )}
              </Button>

              {/* Privacy Notice with icons - hide for hero variant */}
              {showPrivacyNotice && !isSuccess && variant !== "hero" && (
                <div id="newsletter-privacy" class={`text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2 ${
                  size === "sm" ? "text-xs" : "text-sm"
                }`}>
                  <svg class="h-4 w-4 opacity-60" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                  <span>{privacyNoticeText}</span>
                </div>
              )}

              {/* Enhanced Success Message - simplified for hero variant */}
              {isSuccess && variant !== "hero" && (
                <div class="text-center space-y-3 p-6 bg-success-50/30 dark:bg-success-950/20 rounded-2xl border border-success-200 dark:border-success-800 animate-slide-up">
                  <div class="flex justify-center">
                    <div class="p-3 bg-success-100 dark:bg-success-900 rounded-full">
                      <svg class="h-8 w-8 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <p class="font-bold text-success-700 dark:text-success-300 text-lg">
                      {$localize`Welcome to the NasNet!`}
                    </p>
                    <p class={`text-gray-600 dark:text-gray-400 ${
                      size === "sm" ? "text-xs" : "text-sm"
                    }`}>
                      {$localize`Check your email to confirm and activate your subscription.`}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick$={reset$}
                    class="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm font-semibold underline underline-offset-2 transition-colors"
                  >
                    {$localize`Subscribe another email`}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Enhanced CSS for premium animations */}
        <style>{`
          @keyframes shine {
            0% { transform: translateX(-100%) skewX(-12deg); }
            100% { transform: translateX(200%) skewX(-12deg); }
          }

          @keyframes bounce-once {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes slide-up {
            0% { opacity: 0; transform: translateY(10px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }

          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }

          @keyframes float-delayed {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }

          .animate-shine {
            animation: shine 1.5s ease-in-out;
          }

          .animate-bounce-once {
            animation: bounce-once 0.5s ease-in-out;
          }

          .animate-slide-up {
            animation: slide-up 0.5s ease-out;
          }

          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }

          .bg-300\\% {
            background-size: 300% 300%;
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-delayed {
            animation: float-delayed 4s ease-in-out infinite;
            animation-delay: 0.5s;
          }

          .animation-delay-200 {
            animation-delay: 200ms;
          }
        `}</style>
      </div>
    </div>
    );
  },
);