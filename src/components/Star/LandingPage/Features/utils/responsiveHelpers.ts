/**
 * Responsive design helper utilities for feature sections
 * Provides consistent breakpoint handling and responsive behavior
 */

/**
 * Breakpoint definitions matching Tailwind CSS defaults
 */
export const breakpoints = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Grid configuration for different screen sizes
 */
export const gridConfigurations = {
  featureGrid: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-3',
    spacing: {
      mobile: 'gap-6',
      tablet: 'md:gap-8',
      desktop: 'lg:gap-10 xl:gap-12',
    },
  },
  cardGrid: {
    mobile: 'grid-cols-1',
    tablet: 'sm:grid-cols-2',
    desktop: 'lg:grid-cols-2 xl:grid-cols-3',
  },
} as const;

/**
 * Typography scale for responsive text
 */
export const typographyScale = {
  heading: {
    h1: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl',
    h2: 'text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl',
    h3: 'text-lg sm:text-xl md:text-2xl lg:text-3xl',
    h4: 'text-base sm:text-lg md:text-xl lg:text-2xl',
  },
  body: {
    large: 'text-base sm:text-lg md:text-xl',
    normal: 'text-sm sm:text-base md:text-lg',
    small: 'text-xs sm:text-sm md:text-base',
  },
  caption: {
    normal: 'text-xs sm:text-sm',
    small: 'text-xs',
  },
} as const;

/**
 * Spacing scale for consistent spacing across breakpoints
 */
export const spacingScale = {
  section: {
    padding: 'py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28',
    margin: 'my-8 sm:my-12 md:my-16 lg:my-20',
  },
  container: {
    padding: 'px-4 sm:px-6 lg:px-8 xl:px-12',
    maxWidth: 'max-w-7xl',
  },
  card: {
    padding: 'p-4 sm:p-6 lg:p-8',
    margin: 'mb-6 sm:mb-8 lg:mb-10',
  },
  element: {
    small: 'space-y-2 sm:space-y-3',
    medium: 'space-y-3 sm:space-y-4 md:space-y-5',
    large: 'space-y-4 sm:space-y-6 md:space-y-8',
  },
} as const;

/**
 * Component size variants for responsive design
 */
export const componentSizes = {
  button: {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base',
    large: 'px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg',
  },
  icon: {
    small: 'w-4 h-4 sm:w-5 sm:h-5',
    medium: 'w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7',
    large: 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10',
    xlarge: 'w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-16 lg:h-16',
  },
  badge: {
    small: 'px-2 py-1 text-xs',
    medium: 'px-3 py-1 text-xs sm:text-sm',
    large: 'px-4 py-2 text-sm sm:text-base',
  },
} as const;

/**
 * Checks if the current screen size matches a breakpoint
 */
export function matchesBreakpoint(breakpoint: Breakpoint): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth >= breakpoints[breakpoint];
}

/**
 * Gets the current breakpoint based on window width
 */
export function getCurrentBreakpoint(): Breakpoint {
  if (typeof window === 'undefined') return 'lg';

  const width = window.innerWidth;

  if (width >= breakpoints['2xl']) return '2xl';
  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  if (width >= breakpoints.sm) return 'sm';
  return 'xs';
}

/**
 * Responsive configuration for feature cards
 */
export const featureCardConfig = {
  grid: `${gridConfigurations.featureGrid.mobile} ${gridConfigurations.featureGrid.tablet} ${gridConfigurations.featureGrid.desktop}`,
  spacing: `${gridConfigurations.featureGrid.spacing.mobile} ${gridConfigurations.featureGrid.spacing.tablet} ${gridConfigurations.featureGrid.spacing.desktop}`,
  container: `${spacingScale.container.maxWidth} mx-auto ${spacingScale.container.padding}`,
  section: spacingScale.section.padding,
  card: {
    padding: spacingScale.card.padding,
    height: 'min-h-[280px] sm:min-h-[320px] lg:min-h-[360px]',
  },
};

/**
 * Responsive typography classes for feature content
 */
export const featureTypography = {
  title: typographyScale.heading.h3,
  subtitle: typographyScale.body.small,
  description: typographyScale.body.normal,
  badge: componentSizes.badge.medium,
};

/**
 * Mobile-specific optimizations
 */
export const mobileOptimizations = {
  touchTargets: 'min-h-[44px] min-w-[44px]', // WCAG AA compliance
  spacing: 'space-y-4', // Adequate spacing for touch
  fontSize: 'text-base', // Minimum readable size
  containerPadding: 'px-4', // Safe area for mobile
};

/**
 * Utility to create responsive classes with proper fallbacks
 */
export function createResponsiveClasses(config: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
}): string {
  const classes = [];

  if (config.base) classes.push(config.base);
  if (config.sm) classes.push(`sm:${config.sm}`);
  if (config.md) classes.push(`md:${config.md}`);
  if (config.lg) classes.push(`lg:${config.lg}`);
  if (config.xl) classes.push(`xl:${config.xl}`);
  if (config['2xl']) classes.push(`2xl:${config['2xl']}`);

  return classes.join(' ');
}

/**
 * Accessibility helpers for responsive design
 */
export const accessibilityHelpers = {
  focusVisible: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  screenReaderOnly: 'sr-only',
  skipToContent: 'absolute left-0 top-0 -translate-y-full focus:translate-y-0 z-50',
  highContrast: 'contrast-more:border-gray-900 contrast-more:text-gray-900',
};

/**
 * Performance optimizations for responsive images and media
 */
export const mediaOptimizations = {
  lazyLoading: 'loading="lazy"',
  aspectRatio: {
    square: 'aspect-square',
    video: 'aspect-video',
    golden: 'aspect-[1.618/1]',
  },
  objectFit: {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  },
};

/**
 * Container queries for modern responsive design
 */
export const containerQueries = {
  card: '@container (min-width: 200px)',
  section: '@container (min-width: 400px)',
  layout: '@container (min-width: 600px)',
};

/**
 * CSS Grid utilities for complex layouts
 */
export const gridUtilities = {
  autoFit: 'grid-cols-[repeat(auto-fit,minmax(280px,1fr))]',
  autoFill: 'grid-cols-[repeat(auto-fill,minmax(280px,1fr))]',
  responsive: {
    mobile: 'grid-cols-1',
    tablet: 'md:grid-cols-2',
    desktop: 'lg:grid-cols-3',
    wide: 'xl:grid-cols-4',
  },
};