import type { JSXChildren, QRL } from "@builder.io/qwik";

export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
export type ImageLoading = "lazy" | "eager";
export type ImageDecoding = "async" | "sync" | "auto";
export type PlaceholderType = "skeleton" | "blur" | "spinner" | "custom";

export interface ImageSource {
  src: string;
  type?: string;
  media?: string;
}

export interface ImageProps {
  // Basic image properties
  src: string;
  alt: string;
  class?: string;
  id?: string;

  // Dimensions
  width?: number | string;
  height?: number | string;

  // Responsive images
  srcset?: string;
  sizes?: string;
  sources?: ImageSource[];

  // Loading behavior
  loading?: ImageLoading;
  decoding?: ImageDecoding;
  priority?: boolean;

  // Placeholder options
  placeholder?: PlaceholderType;
  placeholderSrc?: string;
  placeholderContent?: JSXChildren;
  showSpinner?: boolean;
  spinnerSize?: "xs" | "sm" | "md" | "lg" | "xl";

  // Styling
  objectFit?: ImageFit;
  objectPosition?: string;
  rounded?: boolean;
  roundedSize?: "sm" | "md" | "lg" | "xl" | "full";

  // Error handling
  fallbackSrc?: string;
  fallbackAlt?: string;
  onError$?: QRL<(event: Event) => void>;
  retryOnError?: boolean;
  maxRetries?: number;

  // Events
  onLoad$?: QRL<(event: Event) => void>;
  onClick$?: QRL<(event: MouseEvent) => void>;

  // Accessibility
  role?: string;
  ariaLabel?: string;
  ariaDescribedby?: string;

  // Performance
  fetchPriority?: "high" | "low" | "auto";
  referrerPolicy?: ReferrerPolicy;
  crossOrigin?: "anonymous" | "use-credentials";
}

export interface UseImageState {
  isLoading: boolean;
  hasError: boolean;
  isIntersecting: boolean;
  retryCount: number;
  currentSrc: string;
}

export interface UseImageReturn {
  imageState: UseImageState;
  imageRef: (element: HTMLImageElement) => void;
  handleLoad$: QRL<(event: Event) => void>;
  handleError$: QRL<(event: Event) => void>;
  retry$: QRL<() => void>;
  containerClasses: string;
  imageClasses: string;
  shouldShowPlaceholder: boolean;
  shouldShowImage: boolean;
}
