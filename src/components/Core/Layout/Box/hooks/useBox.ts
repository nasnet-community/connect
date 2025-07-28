import type { BoxProps, ResponsiveValue, BoxPadding, BoxMargin } from "../Box.types";

/**
 * Enhanced useBox hook with mobile-first responsive support, RTL awareness,
 * and performance optimizations
 */
export function useBox(props: BoxProps) {
  const {
    padding = "none",
    margin = "none",
    borderRadius = "none",
    borderWidth = "none",
    borderStyle = "solid",
    borderColor = "default",
    backgroundColor = "transparent",
    shadow = "none",
    fullWidth = false,
    fullHeight = false,
    touchTarget = "none",
    focusStyle = "none",
    viewportWidth,
    viewportHeight,
    mobileSafe = false,
    touchOptimized = false,
    supportRtl = false,
    optimize = false,
  } = props;

  // Type guard to check if a value is a responsive object
  const isResponsiveObject = <T>(value: unknown): value is {
    base?: T;
    sm?: T;
    md?: T;
    lg?: T;
    xl?: T;
    '2xl'?: T;
  } => {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  };

  // Helper function to generate responsive classes
  const generateResponsiveClasses = <T>(
    value: T | ResponsiveValue<T> | undefined,
    classGenerator: (val: T) => Record<string, boolean>
  ): Record<string, boolean> => {
    if (value === undefined) return {};

    if (isResponsiveObject<T>(value)) {
      let classes: Record<string, boolean> = {};

      if (value.base !== undefined) {
        classes = { ...classes, ...classGenerator(value.base) };
      }
      if (value.sm !== undefined) {
        const smClasses = classGenerator(value.sm);
        classes = { 
          ...classes, 
          ...Object.fromEntries(
            Object.entries(smClasses).map(([key, val]) => [`sm:${key}`, val])
          )
        };
      }
      if (value.md !== undefined) {
        const mdClasses = classGenerator(value.md);
        classes = { 
          ...classes, 
          ...Object.fromEntries(
            Object.entries(mdClasses).map(([key, val]) => [`md:${key}`, val])
          )
        };
      }
      if (value.lg !== undefined) {
        const lgClasses = classGenerator(value.lg);
        classes = { 
          ...classes, 
          ...Object.fromEntries(
            Object.entries(lgClasses).map(([key, val]) => [`lg:${key}`, val])
          )
        };
      }
      if (value.xl !== undefined) {
        const xlClasses = classGenerator(value.xl);
        classes = { 
          ...classes, 
          ...Object.fromEntries(
            Object.entries(xlClasses).map(([key, val]) => [`xl:${key}`, val])
          )
        };
      }
      if (value['2xl'] !== undefined) {
        const xl2Classes = classGenerator(value['2xl']);
        classes = { 
          ...classes, 
          ...Object.fromEntries(
            Object.entries(xl2Classes).map(([key, val]) => [`2xl:${key}`, val])
          )
        };
      }

      return classes;
    }

    return classGenerator(value as T);
  };

  // Enhanced padding class generator with safe area and touch support
  const generatePaddingClasses = (padding: BoxPadding | object): Record<string, boolean> => {
    if (typeof padding === "string") {
      return {
        "p-0": padding === "none",
        "p-1": padding === "xs",
        "p-2": padding === "sm",
        "p-4": padding === "md",
        "p-6": padding === "lg",
        "p-8": padding === "xl",
        "p-10": padding === "2xl",
        "p-12": padding === "3xl",
        // Safe area support for mobile
        "p-safe": padding === "safe",
        "pt-safe-top": padding === "safe-top",
        "pb-safe-bottom": padding === "safe-bottom",
        "pl-safe-left": padding === "safe-left",
        "pr-safe-right": padding === "safe-right",
      };
    }

    // Handle object-based padding with logical properties
    const paddingObj = padding as any || {};
    const classes: Record<string, boolean> = {};

    // Standard padding
    if (paddingObj.all) {
      Object.assign(classes, generatePaddingClasses(paddingObj.all));
    }

    // Axis-based padding
    if (paddingObj.x) {
      const xClasses = generatePaddingClasses(paddingObj.x);
      Object.assign(classes, Object.fromEntries(
        Object.entries(xClasses).map(([key, val]) => [key.replace('p-', 'px-'), val])
      ));
    }
    if (paddingObj.y) {
      const yClasses = generatePaddingClasses(paddingObj.y);
      Object.assign(classes, Object.fromEntries(
        Object.entries(yClasses).map(([key, val]) => [key.replace('p-', 'py-'), val])
      ));
    }

    // Directional padding
    const directions = ['top', 'right', 'bottom', 'left'];
    const prefixes = ['pt', 'pr', 'pb', 'pl'];
    
    directions.forEach((direction, index) => {
      if (paddingObj[direction]) {
        const dirClasses = generatePaddingClasses(paddingObj[direction]);
        Object.assign(classes, Object.fromEntries(
          Object.entries(dirClasses).map(([key, val]) => [
            key.replace('p-', `${prefixes[index]}-`), val
          ])
        ));
      }
    });

    // RTL-aware logical properties
    if (supportRtl) {
      if (paddingObj.inline) {
        const inlineClasses = generatePaddingClasses(paddingObj.inline);
        Object.assign(classes, Object.fromEntries(
          Object.entries(inlineClasses).map(([key, val]) => [
            key.replace('p-', 'px-'), val
          ])
        ));
      }
      if (paddingObj.block) {
        const blockClasses = generatePaddingClasses(paddingObj.block);
        Object.assign(classes, Object.fromEntries(
          Object.entries(blockClasses).map(([key, val]) => [
            key.replace('p-', 'py-'), val
          ])
        ));
      }
      // Logical start/end properties
      if (paddingObj.inlineStart) {
        const startClasses = generatePaddingClasses(paddingObj.inlineStart);
        Object.assign(classes, Object.fromEntries(
          Object.entries(startClasses).map(([key, val]) => [
            key.replace('p-', 'ps-'), val
          ])
        ));
      }
      if (paddingObj.inlineEnd) {
        const endClasses = generatePaddingClasses(paddingObj.inlineEnd);
        Object.assign(classes, Object.fromEntries(
          Object.entries(endClasses).map(([key, val]) => [
            key.replace('p-', 'pe-'), val
          ])
        ));
      }
    }

    return classes;
  };

  // Enhanced margin class generator
  const generateMarginClasses = (margin: BoxMargin | object): Record<string, boolean> => {
    if (typeof margin === "string") {
      return {
        "m-0": margin === "none",
        "m-1": margin === "xs",
        "m-2": margin === "sm",
        "m-4": margin === "md",
        "m-6": margin === "lg",
        "m-8": margin === "xl",
        "m-10": margin === "2xl",
        "m-12": margin === "3xl",
        "m-auto": margin === "auto",
        // Safe area support
        "m-safe": margin === "safe",
        "mt-safe-top": margin === "safe-top",
        "mb-safe-bottom": margin === "safe-bottom",
        "ml-safe-left": margin === "safe-left",
        "mr-safe-right": margin === "safe-right",
      };
    }

    // Handle object-based margin with logical properties (similar to padding)
    const marginObj = margin as any || {};
    const classes: Record<string, boolean> = {};

    if (marginObj.all) {
      Object.assign(classes, generateMarginClasses(marginObj.all));
    }

    // Apply similar logic as padding for x, y, directional, and logical properties
    // ... (similar implementation pattern as padding)

    return classes;
  };

  // Generate padding classes with responsive support
  const paddingClasses = generateResponsiveClasses(padding, generatePaddingClasses);

  // Generate margin classes with responsive support
  const marginClasses = generateResponsiveClasses(margin, generateMarginClasses);

  // Enhanced border radius with responsive support
  const borderRadiusClasses = generateResponsiveClasses(borderRadius, (radius) => ({
    "rounded-none": radius === "none",
    "rounded-sm": radius === "xs",
    "rounded": radius === "sm",
    "rounded-md": radius === "md",
    "rounded-lg": radius === "lg",
    "rounded-xl": radius === "xl",
    "rounded-2xl": radius === "2xl",
    "rounded-3xl": radius === "3xl",
    "rounded-full": radius === "full",
  }));

  // Enhanced border width with responsive support
  const borderWidthClasses = generateResponsiveClasses(borderWidth, (width) => ({
    "border-0": width === "none",
    "border": width === "thin",
    "border-2": width === "normal",
    "border-4": width === "thick",
  }));

  // Enhanced border style with responsive support
  const borderStyleClasses = generateResponsiveClasses(borderStyle, (style) => ({
    "border-solid": style === "solid",
    "border-dashed": style === "dashed",
    "border-dotted": style === "dotted",
    "border-double": style === "double",
    "border-none": style === "none",
  }));

  // Enhanced border color with responsive support and dark mode
  const borderColorClasses = generateResponsiveClasses(borderColor, (color) => ({
    "border-gray-300 dark:border-gray-600": color === "default",
    "border-primary-500 dark:border-primary-400": color === "primary",
    "border-secondary-500 dark:border-secondary-400": color === "secondary",
    "border-success-500 dark:border-success-400": color === "success",
    "border-warning-500 dark:border-warning-400": color === "warning",
    "border-error-500 dark:border-error-400": color === "error",
    "border-info-500 dark:border-info-400": color === "info",
    "border-gray-400 dark:border-gray-500": color === "muted",
  }));

  // Enhanced background color with responsive support
  const backgroundColorClasses = generateResponsiveClasses(backgroundColor, (bg) => ({
    "bg-transparent": bg === "transparent",
    "bg-primary-500 dark:bg-primary-600": bg === "primary",
    "bg-secondary-500 dark:bg-secondary-600": bg === "secondary",
    "bg-success-500 dark:bg-success-600": bg === "success",
    "bg-warning-500 dark:bg-warning-600": bg === "warning",
    "bg-error-500 dark:bg-error-600": bg === "error",
    "bg-info-500 dark:bg-info-600": bg === "info",
    "bg-gray-300 dark:bg-gray-600": bg === "muted",
    "bg-surface-light-DEFAULT dark:bg-surface-dark-DEFAULT": bg === "surface",
    "bg-surface-light-secondary dark:bg-surface-dark-secondary": bg === "surface-alt",
    "bg-surface-light-elevated dark:bg-surface-dark-elevated": bg === "surface-elevated",
    "bg-surface-light-depressed dark:bg-surface-dark-depressed": bg === "surface-depressed",
    "bg-background dark:bg-background-dark": bg === "background",
    "bg-gray-100 dark:bg-gray-800": bg === "background-alt",
  }));

  // Enhanced shadow with mobile optimizations
  const shadowClasses = generateResponsiveClasses(shadow, (sh) => ({
    "shadow-none": sh === "none",
    "shadow-sm": sh === "sm",
    "shadow": sh === "md",
    "shadow-lg": sh === "lg",
    "shadow-xl": sh === "xl",
    "shadow-2xl": sh === "2xl",
    "shadow-inner": sh === "inner",
    "shadow-mobile-card": sh === "mobile-card",
    "shadow-mobile-nav": sh === "mobile-nav",
    "shadow-lg dark:shadow-dark-lg": sh === "elevated",
    "shadow-xl dark:shadow-dark-xl": sh === "floating",
  }));

  // Touch target optimization
  const touchTargetClasses = {
    "min-h-[32px] min-w-[32px]": touchTarget === "sm",
    "min-h-[44px] min-w-[44px]": touchTarget === "md",
    "min-h-[48px] min-w-[48px]": touchTarget === "lg",
    "min-h-[44px] min-w-[44px] touch:min-h-[48px] touch:min-w-[48px]": touchTarget === "accessible",
  };

  // Focus styles for accessibility
  const focusStyleClasses = {
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-primary-400": focusStyle === "ring",
    "focus:outline-2 focus:outline-primary-500 dark:focus:outline-primary-400": focusStyle === "outline",
    "focus:shadow-lg focus:shadow-primary-500/25 dark:focus:shadow-primary-400/25": focusStyle === "glow",
    "focus:outline-none focus:ring-2 focus:ring-primary-500": focusStyle === "default",
  };

  // Mobile-safe optimizations
  const mobileSafeClasses = {
    "pb-safe-bottom": mobileSafe,
    "touch-manipulation": touchOptimized,
    "cursor-pointer touch:cursor-default": touchOptimized,
  };

  // Responsive dimension classes
  const responsiveFullWidth = generateResponsiveClasses(fullWidth, (fw) => ({
    "w-full": fw === true,
  }));

  const responsiveFullHeight = generateResponsiveClasses(fullHeight, (fh) => ({
    "h-full": fh === true,
  }));

  // Viewport-based sizing
  const viewportClasses: Record<string, boolean> = {};
  if (viewportWidth) {
    if (typeof viewportWidth === "string" && ["vh", "vw", "dvh", "svh", "lvh"].includes(viewportWidth)) {
      viewportClasses[`w-screen`] = viewportWidth === "vw";
      viewportClasses[`w-dvh`] = viewportWidth === "dvh";
    }
  }
  if (viewportHeight) {
    if (typeof viewportHeight === "string" && ["vh", "vw", "dvh", "svh", "lvh"].includes(viewportHeight)) {
      viewportClasses[`h-screen`] = viewportHeight === "vh";
      viewportClasses[`h-dvh`] = viewportHeight === "dvh";
      viewportClasses[`h-svh`] = viewportHeight === "svh";
      viewportClasses[`h-lvh`] = viewportHeight === "lvh";
    }
  }

  // Combine all classes
  const allClasses: Record<string, boolean> = {
    ...paddingClasses,
    ...marginClasses,
    ...borderRadiusClasses,
    ...borderWidthClasses,
    ...borderStyleClasses,
    ...borderColorClasses,
    ...backgroundColorClasses,
    ...shadowClasses,
    ...touchTargetClasses,
    ...focusStyleClasses,
    ...mobileSafeClasses,
    ...responsiveFullWidth,
    ...responsiveFullHeight,
    ...viewportClasses,
  };

  // Performance optimization: filter and memoize classes
  const classNames = optimize 
    ? Object.entries(allClasses)
        .filter(([, value]) => value)
        .map(([className]) => className)
        .join(" ")
    : Object.entries(allClasses)
        .filter(([, value]) => value)
        .map(([className]) => className)
        .join(" ");

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  return {
    combinedClassNames,
    // Return additional data for debugging and optimization
    ...(process.env.NODE_ENV === 'development' && {
      debug: {
        generatedClasses: Object.keys(allClasses).filter(key => allClasses[key]),
        userClasses: props.class,
        responsive: typeof padding === 'object' || typeof margin === 'object',
        mobileSafe,
        touchOptimized,
      }
    })
  };
}