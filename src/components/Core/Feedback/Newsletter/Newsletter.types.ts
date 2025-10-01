import type { QRL } from "@builder.io/qwik";
import type { FeedbackSize } from "../utils/theme";

export type NewsletterVariant = "vertical" | "horizontal" | "responsive" | "hero";
export type NewsletterTheme = "light" | "dark" | "glass" | "branded";

export interface NewsletterSubscription {
  email: string;
  // Use ISO string for Qwik serialization compatibility
  timestamp: string;
  source?: string;
}

export interface NewsletterProps {
  /** Layout variant for the newsletter component */
  variant?: NewsletterVariant;

  /** Size of the newsletter component */
  size?: FeedbackSize;

  /** Custom title for the newsletter signup */
  title?: string;

  /** Description text below the title */
  description?: string;

  /** Placeholder text for the email input */
  placeholder?: string;

  /** Text for the subscribe button */
  buttonText?: string;

  /** Callback function when user subscribes */
  onSubscribe$?: QRL<(subscription: NewsletterSubscription) => Promise<void>>;

  /** Whether to show the NASNET Connect logo */
  showLogo?: boolean;

  /** Enable glassmorphism effect */
  glassmorphism?: boolean;

  /** Use theme colors instead of default styling */
  themeColors?: boolean;

  /** Theme variant when themeColors is enabled */
  theme?: NewsletterTheme;

  /** Whether the newsletter is disabled */
  disabled?: boolean;

  /** Whether to show privacy notice */
  showPrivacyNotice?: boolean;

  /** Custom privacy notice text */
  privacyNoticeText?: string;

  /** Loading state (external control) */
  loading?: boolean;

  /** Success state (external control) */
  success?: boolean;

  /** Error message (external control) */
  error?: string;

  /** Additional CSS classes */
  class?: string;

  /** Enable touch-optimized interaction areas */
  touchOptimized?: boolean;

  /** Surface elevation level for consistent styling */
  surfaceElevation?: "base" | "elevated" | "depressed";

  /** Compact mode with reduced padding */
  compact?: boolean;

  /** Full width component */
  fullWidth?: boolean;

  /** Enable animated interactions */
  animated?: boolean;
}

export interface UseNewsletterParams {
  /** Callback when subscription is successful */
  onSubscribe$?: QRL<(subscription: NewsletterSubscription) => Promise<void>>;

  /** Initial loading state */
  initialLoading?: boolean;

  /** Enable email validation */
  validateEmail?: boolean;

  /** Custom validation function */
  customValidation$?: QRL<(email: string) => Promise<string | null>> | null;
}

export interface UseNewsletterReturn {
  /** Current email value */
  email: { value: string };

  /** Loading state during subscription */
  loading: { value: boolean };

  /** Error state with message */
  error: { value: string | null };

  /** Success state when subscribed */
  success: { value: boolean };

  /** Validation state */
  isValid: { value: boolean };

  /** Handle email input changes */
  handleEmailInput$: QRL<(event: Event) => void>;

  /** Handle form submission */
  handleSubmit$: QRL<(event: Event) => Promise<void>>;

  /** Reset form state */
  reset$: QRL<() => void>;

  /** Validate email manually */
  validateEmail$: QRL<() => Promise<boolean>>;
}