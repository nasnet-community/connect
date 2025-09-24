// Export main Newsletter component
export { Newsletter } from "./Newsletter";

// Export NewsletterHero variant component
export { NewsletterHero } from "./NewsletterHero";

// Export BackgroundLogo component
export { BackgroundLogo } from "./BackgroundLogo";
export type { BackgroundLogoProps } from "./BackgroundLogo";

// Export NewsletterLogo component
export { NewsletterLogo } from "./NewsletterLogo";

// Export types
export type {
  NewsletterProps,
  NewsletterVariant,
  NewsletterTheme,
  NewsletterSubscription,
  UseNewsletterParams,
  UseNewsletterReturn,
} from "./Newsletter.types";

// Export hook
export { useNewsletter } from "./useNewsletter";