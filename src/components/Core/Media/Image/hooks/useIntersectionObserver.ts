import { useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

export interface UseIntersectionObserverOptions {
  enabled?: boolean;
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

export interface UseIntersectionObserverReturn {
  elementRef: (element: Element) => void;
  isIntersecting: Signal<boolean>;
  entry: Signal<IntersectionObserverEntry | null>;
}

/**
 * Hook for observing element intersection with viewport
 * Used for lazy loading images and other performance optimizations
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const {
    enabled = true,
    threshold = 0,
    rootMargin = "0px",
    root = null,
  } = options;

  const elementRef = useSignal<Element | null>(null);
  const isIntersecting = useSignal(false);
  const entry = useSignal<IntersectionObserverEntry | null>(null);

  // Set up the intersection observer
  useVisibleTask$(({ cleanup }) => {
    if (!enabled || !elementRef.value) return;

    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
      // Fallback for browsers that don't support IntersectionObserver
      isIntersecting.value = true;
      return;
    }

    const observerOptions: IntersectionObserverInit = {
      threshold,
      rootMargin,
      root,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((observerEntry) => {
        isIntersecting.value = observerEntry.isIntersecting;
        entry.value = observerEntry;

        // Once the element is visible, we can disconnect the observer
        // This is especially useful for lazy loading where we only need to know once
        if (observerEntry.isIntersecting && enabled) {
          observer.disconnect();
        }
      });
    }, observerOptions);

    observer.observe(elementRef.value);

    cleanup(() => {
      observer.disconnect();
    });
  });

  // Element ref setter
  const setElementRef = $((element: Element) => {
    elementRef.value = element;
  });

  return {
    elementRef: setElementRef,
    isIntersecting,
    entry,
  };
}
