import { component$ } from "@builder.io/qwik";
import type { NewsletterProps } from "./Newsletter.types";
import { Newsletter } from "./Newsletter";

/**
 * Hero-optimized Newsletter component for landing page hero sections.
 * Features a minimal, streamlined design that integrates seamlessly with hero content.
 *
 * @example
 * ```tsx
 * // Basic usage in hero section
 * <NewsletterHero
 *   onSubscribe$={handleSubscription}
 * />
 *
 * // With custom text
 * <NewsletterHero
 *   placeholder="Get early access"
 *   buttonText="Join Waitlist"
 *   onSubscribe$={handleSubscription}
 * />
 * ```
 */
export const NewsletterHero = component$<Partial<NewsletterProps>>(
  (props) => {
    // Hero variant defaults that can be overridden
    const heroDefaults: Partial<NewsletterProps> = {
      variant: "hero",
      size: "md",
      title: $localize`Get Product Updates`,
      glassmorphism: true,
      theme: "glass",
      showLogo: false,
      showPrivacyNotice: false,
      compact: true,
      animated: true,
      surfaceElevation: "elevated",
      fullWidth: false,
      placeholder: $localize`Enter your email`,
      buttonText: $localize`Subscribe`,
    };

    // Merge props with hero defaults
    const mergedProps = {
      ...heroDefaults,
      ...props,
    };

    return <Newsletter {...mergedProps} />;
  }
);