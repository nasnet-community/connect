import { useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

export interface ResponsiveState {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isCompact: boolean;
  screenWidth: number;
  screenHeight: number;
  orientation: 'portrait' | 'landscape';
  touchSupport: boolean;
  reducedMotion: boolean;
  darkMode: boolean;
  highDensity: boolean;
}

/**
 * Enhanced hook to detect screen size, device capabilities, and user preferences
 * @returns Object with comprehensive responsive and device detection signals
 */
export function useResponsiveDetection() {
  const isMobile = useSignal(false);
  const isTablet = useSignal(false);
  const isDesktop = useSignal(false);
  const isCompact = useSignal(false);
  const screenWidth = useSignal(0);
  const screenHeight = useSignal(0);
  const orientation = useSignal<'portrait' | 'landscape'>('portrait');
  const touchSupport = useSignal(false);
  const reducedMotion = useSignal(false);
  const darkMode = useSignal(false);
  const highDensity = useSignal(false);

  useVisibleTask$(() => {
    const updateResponsiveState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      // Update screen dimensions
      screenWidth.value = width;
      screenHeight.value = height;
      
      // Responsive breakpoints based on Tailwind config
      isMobile.value = width < 768; // mobile-only: max 767px
      isTablet.value = width >= 768 && width < 1024; // tablet-only: 768px - 1023px
      isDesktop.value = width >= 1024; // desktop: 1024px+
      isCompact.value = width < 1024; // compact layout for mobile + tablet
      
      // Orientation detection
      orientation.value = height > width ? 'portrait' : 'landscape';
      
      // Touch support detection
      touchSupport.value = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      // User preference detection
      reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // High density display detection
      highDensity.value = window.devicePixelRatio > 1.5;
    };

    // Initial check
    updateResponsiveState();

    // Debounced resize listener for better performance
    let resizeTimer: number;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(updateResponsiveState, 150);
    };

    // Media query listeners for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion.value = e.matches;
    };
    
    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      darkMode.value = e.matches;
    };

    // Add event listeners
    window.addEventListener("resize", debouncedResize);
    window.addEventListener("orientationchange", updateResponsiveState);
    motionQuery.addEventListener("change", handleMotionChange);
    darkModeQuery.addEventListener("change", handleDarkModeChange);

    // Clean up
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("orientationchange", updateResponsiveState);
      motionQuery.removeEventListener("change", handleMotionChange);
      darkModeQuery.removeEventListener("change", handleDarkModeChange);
    };
  });

  // Helper computed values
  const getResponsiveState = $((): ResponsiveState => ({
    isMobile: isMobile.value,
    isTablet: isTablet.value,
    isDesktop: isDesktop.value,
    isCompact: isCompact.value,
    screenWidth: screenWidth.value,
    screenHeight: screenHeight.value,
    orientation: orientation.value,
    touchSupport: touchSupport.value,
    reducedMotion: reducedMotion.value,
    darkMode: darkMode.value,
    highDensity: highDensity.value,
  }));

  return { 
    // Individual signals for backward compatibility
    isMobile, 
    isTablet,
    isDesktop,
    isCompact,
    screenWidth,
    screenHeight,
    orientation,
    touchSupport,
    reducedMotion,
    darkMode,
    highDensity,
    
    // Complete state object
    getResponsiveState
  };
}
