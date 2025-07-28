import { component$ } from "@builder.io/qwik";
import type { PromoBannerProps } from "./PromoBanner.types";
import { usePromoBanner } from "./usePromoBanner";
import {
  cn,
  getStatusColors,
  getTouchTargetClasses,
  getResponsiveSizeClasses,
  getSurfaceElevation,
} from "../utils/theme";

/**
 * PromoBanner component for displaying promotional content with optional action.
 *
 * @example
 * ```tsx
 * <PromoBanner
 *   title="Get 30 days free VPN!"
 *   description="Sign up today to receive a month of premium VPN service at no cost."
 *   provider="ExpressVPN"
 *   imageUrl="/images/vpn-promo.jpg"
 *   onCredentialsReceived$={handleCredentials}
 * />
 * ```
 */
export const PromoBanner = component$<PromoBannerProps>(
  ({
    title,
    description,
    provider,
    imageUrl,
    bgColorClass = "bg-secondary-500/10",
    onCredentialsReceived$,
    class: className,
    layout = "responsive",
    size = "md",
    dismissible = false,
    onDismiss$,
    imageAspectRatio = "auto",
    touchOptimized = true,
    surfaceElevation = "base",
    colorVariant = "info",
    themeColors = false,
  }) => {
    // Use the hook to manage state and credentials
    const { loading, success, getCredentials$ } = usePromoBanner({
      onCredentialsReceived$,
    });

    // Calculate theme classes
    const surfaceClasses = getSurfaceElevation(surfaceElevation);
    const touchClasses = touchOptimized ? getTouchTargetClasses(size) : "";
    const themeColorClasses = themeColors ? getStatusColors(colorVariant, "subtle") : "";
    const sizeClasses = getResponsiveSizeClasses(size, "alert");

    // Determine layout classes
    const getLayoutClasses = () => {
      switch (layout) {
        case "horizontal":
          return "flex-row";
        case "vertical":
          return "flex-col";
        case "responsive":
        default:
          return "mobile:flex-col tablet:flex-row desktop:flex-row";
      }
    };

    // Get image aspect ratio classes
    const getImageClasses = () => {
      const baseClasses = "w-full rounded";
      switch (imageAspectRatio) {
        case "square":
          return `${baseClasses} aspect-square object-cover`;
        case "wide":
          return `${baseClasses} aspect-video object-cover`;
        case "portrait":
          return `${baseClasses} aspect-[3/4] object-cover`;
        case "auto":
        default:
          return `${baseClasses} h-auto`;
      }
    };

    return (
      <div
        class={cn(
          "overflow-hidden rounded-lg",
          themeColors && themeColorClasses,
          !themeColors && bgColorClass,
          surfaceClasses,
          sizeClasses,
          className
        )}
      >
        <div class={cn("flex items-center", getLayoutClasses())}>
          {imageUrl && (
            <div class={cn(
              "p-4",
              layout === "vertical" && "w-full",
              layout === "horizontal" && "w-1/3 flex-shrink-0",
              layout === "responsive" && "mobile:w-full tablet:w-1/3 desktop:w-1/3 tablet:flex-shrink-0"
            )}>
              <div class="relative">
                <img
                  src={imageUrl}
                  alt={`${provider} VPN`}
                  class={getImageClasses()}
                  width="400"
                  height="200"
                  loading="lazy"
                />
                {/* Optional overlay for better text readability */}
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded opacity-0 hover:opacity-100 transition-opacity" />
              </div>
            </div>
          )}

          <div class={cn(
            "flex-1 p-6 relative",
            !imageUrl && "w-full"
          )}>
            {/* Dismiss button */}
            {dismissible && (
              <button
                onClick$={onDismiss$}
                class={cn(
                  "absolute top-2 right-2 rounded-md text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2",
                  touchClasses,
                  "transition-opacity"
                )}
                aria-label="Dismiss banner"
              >
                <svg class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            )}

            <h3 class={cn(
              "font-bold text-current",
              size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg",
              dismissible && "pr-8" // Add padding to avoid dismiss button
            )}>
              {title}
            </h3>

            <p class={cn(
              "text-current opacity-90 mt-2",
              size === "sm" ? "text-sm" : size === "lg" ? "text-base" : "text-sm"
            )}>
              {description}
            </p>

            {onCredentialsReceived$ && !success.value && (
              <button
                onClick$={getCredentials$}
                class={cn(
                  "mt-4 rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                  touchOptimized && getTouchTargetClasses(size),
                  size === "sm" && "text-sm px-3 py-1.5",
                  size === "lg" && "text-base px-6 py-3"
                )}
                disabled={loading.value}
              >
                {loading.value
                  ? $localize`Loading...`
                  : $localize`Get Free Access`}
              </button>
            )}

            {success.value && (
              <div class={cn(
                "mt-4 rounded-lg px-4 py-2",
                getStatusColors("success", "subtle"),
                size === "sm" && "text-sm px-3 py-1.5",
                size === "lg" && "text-base px-5 py-3"
              )}>
                {$localize`Credentials sent! Check your account.`}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
