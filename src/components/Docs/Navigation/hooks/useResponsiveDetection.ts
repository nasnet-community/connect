import { useSignal, useVisibleTask$ } from "@builder.io/qwik";

/**
 * Hook to detect screen size and provide responsive signals
 * @returns Object with isMobile and isCompact signals
 */
export function useResponsiveDetection() {
  const isMobile = useSignal(false);
  const isCompact = useSignal(false);
  
  useVisibleTask$(() => {
    const checkSize = () => {
      isCompact.value = window.innerWidth < 768;
      isMobile.value = window.innerWidth < 768;
    };
    
    // Initial check
    checkSize();
    
    // Add resize listener
    window.addEventListener('resize', checkSize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkSize);
    };
  });
  
  return { isMobile, isCompact };
} 