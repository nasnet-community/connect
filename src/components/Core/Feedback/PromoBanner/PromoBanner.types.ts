import type { QRL } from "@builder.io/qwik";
import type { FeedbackStatus, FeedbackSize } from "../utils/theme";

export interface VPNCredentials {
  server: string;
  username: string;
  password: string;
  [key: string]: string;
}

export type BannerLayout = "horizontal" | "vertical" | "responsive";
export type ImageAspectRatio = "auto" | "square" | "wide" | "portrait";

export interface PromoBannerProps {
  /** Title of the promo banner */
  title: string;

  /** Description text for the promo */
  description: string;

  /** VPN provider name */
  provider: string;

  /** Optional image URL for the promo banner */
  imageUrl?: string;

  /** Optional background color class (TailwindCSS) */
  bgColorClass?: string;

  /** Callback function when credentials are received */
  onCredentialsReceived$?: QRL<(credentials: VPNCredentials) => void>;

  /** Additional CSS classes */
  class?: string;

  /** Layout orientation - responsive adapts to screen size */
  layout?: BannerLayout;

  /** Size of the promo banner */
  size?: FeedbackSize;

  /** Whether the banner can be dismissed */
  dismissible?: boolean;

  /** Callback when banner is dismissed */
  onDismiss$?: QRL<() => void>;

  /** Image aspect ratio behavior */
  imageAspectRatio?: ImageAspectRatio;

  /** Enable touch-optimized interaction areas */
  touchOptimized?: boolean;

  /** Surface elevation level for consistent styling */
  surfaceElevation?: "base" | "elevated" | "depressed";

  /** Theme color variant when themeColors is enabled */
  colorVariant?: FeedbackStatus;

  /** Use theme colors instead of bgColorClass */
  themeColors?: boolean;
}
