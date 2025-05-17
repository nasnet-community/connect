import { $, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { AlertStatus } from "./Alert.types";

export interface UseAlertParams {
  autoCloseDuration?: number; 
  onDismiss$?: QRL<() => void>;
}

export interface UseAlertReturn {
  state: {
    isVisible: boolean;
    isMounted: boolean;
  };
  handleDismiss$: QRL<() => void>;
}

export function useAlert({ 
  autoCloseDuration,
  onDismiss$
}: UseAlertParams = {}): UseAlertReturn {
  const state = useStore({
    isVisible: true,
    isMounted: false
  });
  
  // Handle auto-close functionality
  useVisibleTask$(({ cleanup }) => {
    // Set mounted state for animations
    setTimeout(() => {
      state.isMounted = true;
    }, 10);
    
    // Setup auto-close timer if duration is provided
    let timerId: number | undefined;
    if (autoCloseDuration && autoCloseDuration > 0) {
      timerId = setTimeout(() => {
        state.isVisible = false;
        onDismiss$?.();
      }, autoCloseDuration) as unknown as number;
    }
    
    // Clean up timer when component unmounts
    cleanup(() => {
      if (timerId) {
        clearTimeout(timerId);
      }
      state.isMounted = false;
    });
  });
  
  // Handle dismiss action
  const handleDismiss$ = $(() => {
    state.isVisible = false;
    onDismiss$?.();
  });

  return {
    state,
    handleDismiss$
  };
}

// Helper function to get variant classes
export function getVariantClasses(status: AlertStatus, variant: 'solid' | 'outline', subtle: boolean): string {
  if (variant === "outline") {
    return {
      info: "bg-transparent border-blue-500 text-blue-700 dark:border-blue-400 dark:text-blue-300",
      success: "bg-transparent border-green-500 text-green-700 dark:border-green-400 dark:text-green-300",
      warning: "bg-transparent border-yellow-500 text-yellow-700 dark:border-yellow-400 dark:text-yellow-300",
      error: "bg-transparent border-red-500 text-red-700 dark:border-red-400 dark:text-red-300"
    }[status];
  }
  
  // Solid variant with subtle option
  return {
    info: subtle 
      ? "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800" 
      : "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-700",
    success: subtle 
      ? "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800" 
      : "bg-green-100 text-green-800 border-green-200 dark:bg-green-800 dark:text-green-100 dark:border-green-700",
    warning: subtle 
      ? "bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800" 
      : "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-700",
    error: subtle 
      ? "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800" 
      : "bg-red-100 text-red-800 border-red-200 dark:bg-red-800 dark:text-red-100 dark:border-red-700",
  }[status];
}

// Helper function to get size classes
export function getSizeClasses(size: 'sm' | 'md' | 'lg'): string {
  return {
    sm: "text-xs py-2 px-3",
    md: "text-sm py-3 px-4",
    lg: "text-base py-4 px-5"
  }[size];
} 