/**
 * Animation helper utilities for feature sections
 * Provides consistent animation patterns and timing functions
 */

export interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
  reducedMotion: boolean;
}

/**
 * Default animation configuration
 */
export const defaultAnimationConfig: AnimationConfig = {
  duration: 300,
  delay: 0,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  reducedMotion: false,
};

/**
 * Animation timing functions for different types of animations
 */
export const easingFunctions = {
  // Standard Material Design easing
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Accelerate - starts slow, ends fast
  accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
  // Decelerate - starts fast, ends slow
  decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
  // Sharp - very fast transition
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  // Smooth - gentle transition
  smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  // Bounce - playful bounce effect
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Stagger animation delays for sequential animations
 */
export const staggerDelays = {
  none: 0,
  xs: 50,
  sm: 100,
  md: 150,
  lg: 200,
  xl: 300,
} as const;

/**
 * Animation duration presets
 */
export const animationDurations = {
  instant: 0,
  fast: 150,
  normal: 300,
  slow: 500,
  slower: 750,
  slowest: 1000,
} as const;

/**
 * Creates a staggered animation delay based on index
 */
export function createStaggerDelay(
  index: number,
  baseDelay: number = staggerDelays.md
): number {
  return index * baseDelay;
}

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Creates a CSS custom property value for animation timing
 */
export function createAnimationTiming(
  duration: number = animationDurations.normal,
  easing: string = easingFunctions.standard
): string {
  return `${duration}ms ${easing}`;
}

/**
 * Animation CSS classes that can be applied conditionally
 */
export const animationClasses = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeInUp: 'animate-fade-in-up',
  fadeInDown: 'animate-fade-in-down',
  fadeInLeft: 'animate-fade-in-left',
  fadeInRight: 'animate-fade-in-right',

  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleUp: 'animate-scale-up',

  // Slide animations
  slideInUp: 'animate-slide-in-up',
  slideInDown: 'animate-slide-in-down',
  slideInLeft: 'animate-slide-in-left',
  slideInRight: 'animate-slide-in-right',

  // Bounce animations
  bounceIn: 'animate-bounce-in',

  // Pulse animations
  pulse: 'animate-pulse',
  pulseGlow: 'animate-pulse-glow',

  // Hover states
  hoverScale: 'hover:scale-105',
  hoverLift: 'hover:-translate-y-2',
  hoverGlow: 'hover:shadow-2xl',
} as const;

/**
 * Creates animation delay CSS custom property
 */
export function createAnimationDelay(delay: number): Record<string, string> {
  return {
    'animation-delay': `${delay}ms`,
  };
}

/**
 * Motion-safe utility that respects user preferences
 */
export function motionSafe(animationClass: string): string {
  return `motion-safe:${animationClass} motion-reduce:transform-none`;
}

/**
 * Intersection Observer options for animation triggers
 */
export const intersectionObserverOptions: IntersectionObserverInit = {
  threshold: 0.1,
  rootMargin: '50px',
};

/**
 * Animation configuration for different breakpoints
 */
export const responsiveAnimations = {
  mobile: {
    duration: animationDurations.fast,
    easing: easingFunctions.decelerate,
    stagger: staggerDelays.sm,
  },
  tablet: {
    duration: animationDurations.normal,
    easing: easingFunctions.standard,
    stagger: staggerDelays.md,
  },
  desktop: {
    duration: animationDurations.normal,
    easing: easingFunctions.smooth,
    stagger: staggerDelays.lg,
  },
} as const;

/**
 * Creates responsive animation classes based on screen size
 */
export function createResponsiveAnimation(
  baseClass: string,
  breakpoint: keyof typeof responsiveAnimations = 'desktop'
): string {
  const config = responsiveAnimations[breakpoint];
  return `${baseClass} duration-[${config.duration}ms] ${motionSafe(baseClass)}`;
}

/**
 * Performance-optimized CSS properties for hardware acceleration
 */
export const performanceOptimizedStyles = {
  transform: 'translateZ(0)',
  backfaceVisibility: 'hidden' as const,
  willChange: 'transform, opacity' as const,
} as const;