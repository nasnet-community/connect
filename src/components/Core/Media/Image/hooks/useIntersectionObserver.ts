import { useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

export interface UseIntersectionObserverOptions {
  enabled?: boolean;
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
}

/**
 * Serializable representation of IntersectionObserverEntry
 * Converts browser API objects to plain objects for Qwik serialization
 */
export interface SerializableIntersectionEntry {
  /** The bounds of the target element */
  boundingClientRect: {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  /** The intersection ratio (0.0 to 1.0) */
  intersectionRatio: number;
  /** The bounds of the intersection */
  intersectionRect: {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  /** Whether the element is intersecting */
  isIntersecting: boolean;
  /** The bounds of the root element */
  rootBounds: {
    x: number;
    y: number;
    width: number;
    height: number;
    top: number;
    right: number;
    bottom: number;
    left: number;
  } | null;
  /** Timestamp when the intersection was observed */
  time: number;
}

export interface UseIntersectionObserverReturn {
  elementRef: (element: Element) => void;
  isIntersecting: Signal<boolean>;
  entry: Signal<SerializableIntersectionEntry | null>;
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
  const entry = useSignal<SerializableIntersectionEntry | null>(null);

  // Helper function to convert DOMRectReadOnly to a serializable object
  const serializeRect = $((rect: DOMRectReadOnly | null) => {
    if (!rect) return null;
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      top: rect.top,
      right: rect.right,
      bottom: rect.bottom,
      left: rect.left,
    };
  });

  // Convert IntersectionObserverEntry to serializable format
  const serializeEntry = $(async (observerEntry: IntersectionObserverEntry): Promise<SerializableIntersectionEntry> => ({
    boundingClientRect: (await serializeRect(observerEntry.boundingClientRect))!,
    intersectionRatio: observerEntry.intersectionRatio,
    intersectionRect: (await serializeRect(observerEntry.intersectionRect))!,
    isIntersecting: observerEntry.isIntersecting,
    rootBounds: await serializeRect(observerEntry.rootBounds),
    time: observerEntry.time,
  }));

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
      entries.forEach(async (observerEntry) => {
        isIntersecting.value = observerEntry.isIntersecting;
        entry.value = await serializeEntry(observerEntry);

        // Once the element is visible, we can disconnect the observer
        // This is especially useful for lazy loading where we only need to know once
        if (observerEntry.isIntersecting) {
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
