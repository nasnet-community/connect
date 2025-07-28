import { useSignal, useTask$, $ } from "@builder.io/qwik";
import type { ImageProps, UseImageReturn, UseImageState } from "../Image.types";
import { useIntersectionObserver } from "./useIntersectionObserver";

export function useImage(props: ImageProps): UseImageReturn {
  const {
    src,
    fallbackSrc,
    loading = "lazy",
    priority = false,
    onLoad$,
    onError$,
    maxRetries = 3,
    objectFit = "cover",
    objectPosition = "center",
    rounded = false,
    roundedSize = "md",
    class: className = "",
  } = props;

  // State management
  const imageState = useSignal<UseImageState>({
    isLoading: true,
    hasError: false,
    isIntersecting: priority || loading === "eager",
    retryCount: 0,
    currentSrc: src,
  });

  // Use intersection observer for lazy loading
  const { elementRef, isIntersecting } = useIntersectionObserver({
    enabled: !priority && loading === "lazy",
    threshold: 0.1,
    rootMargin: "50px",
  });

  // Update intersection state
  useTask$(({ track }) => {
    track(() => isIntersecting.value);
    if (isIntersecting.value) {
      imageState.value = {
        ...imageState.value,
        isIntersecting: true,
      };
    }
  });

  // Update src when it changes
  useTask$(({ track }) => {
    track(() => src);
    imageState.value = {
      ...imageState.value,
      currentSrc: src,
      isLoading: true,
      hasError: false,
      retryCount: 0,
    };
  });

  // Image ref callback - handle intersection observer setup
  // Note: This function doesn't need $() wrapper since it's just a ref callback
  // and elementRef is already a serialized function from useIntersectionObserver
  const imageRef = (element: HTMLImageElement) => {
    if (element && !priority && loading === "lazy") {
      elementRef(element);
    }
  };

  // Handle image load
  const handleLoad$ = $((event: Event) => {
    imageState.value = {
      ...imageState.value,
      isLoading: false,
      hasError: false,
    };
    if (onLoad$) {
      onLoad$(event);
    }
  });

  // Handle image error
  const handleError$ = $((event: Event) => {
    const shouldUseFallback =
      fallbackSrc && imageState.value.currentSrc !== fallbackSrc;

    if (shouldUseFallback) {
      imageState.value = {
        ...imageState.value,
        currentSrc: fallbackSrc,
        hasError: false,
        isLoading: true,
      };
    } else {
      imageState.value = {
        ...imageState.value,
        hasError: true,
        isLoading: false,
      };
    }

    if (onError$) {
      onError$(event);
    }
  });

  // Retry loading
  const retry$ = $(() => {
    if (imageState.value.retryCount < maxRetries) {
      imageState.value = {
        ...imageState.value,
        currentSrc: src,
        isLoading: true,
        hasError: false,
        retryCount: imageState.value.retryCount + 1,
      };
    }
  });

  // Generate enhanced container classes with responsive support
  const containerClasses = [
    "relative overflow-hidden",
    // Rounded corners with responsive support
    rounded && `rounded-${roundedSize === "full" ? "full" : roundedSize}`,
    // Touch optimization for mobile devices
    "touch-manipulation",
    // Performance optimizations
    "will-change-auto",
    // Accessibility improvements
    "focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2",
  ]
    .filter(Boolean)
    .join(" ");

  // Generate enhanced image classes with better responsive behavior
  const imageClasses = [
    "w-full h-full",
    // Object fit with responsive behavior
    `object-${objectFit}`,
    // Object position (if not center)
    objectPosition !== "center" && `object-${objectPosition}`,
    // Enhanced transitions for better UX
    "transition-all duration-300 ease-out",
    // Performance optimizations
    "will-change-auto",
    // Touch optimization
    "touch-manipulation",
    // Accessibility
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2",
    // Motion preferences
    "motion-safe:transition-all motion-safe:duration-300",
    "motion-reduce:transition-none",
    // Custom classes from props
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Determine visibility states
  const shouldShowPlaceholder =
    imageState.value.isLoading && imageState.value.isIntersecting;
  const shouldShowImage =
    !imageState.value.isLoading && imageState.value.isIntersecting;

  return {
    imageState: imageState.value,
    imageRef,
    handleLoad$,
    handleError$,
    retry$,
    containerClasses,
    imageClasses,
    shouldShowPlaceholder,
    shouldShowImage,
  };
}
