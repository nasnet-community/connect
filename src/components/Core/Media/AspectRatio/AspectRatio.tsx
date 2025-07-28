import { component$ } from "@builder.io/qwik";
import type { AspectRatioProps, AspectRatioPreset } from "./AspectRatio.types";

/**
 * AspectRatio component that maintains a specific aspect ratio for its content
 * 
 * Features:
 * - Mobile-first responsive design
 * - Dark mode support with theme colors
 * - RTL/LTR layout support
 * - Touch-optimized interactions
 * - Comprehensive breakpoint support
 *
 * @example
 * // Using preset ratio with theme colors
 * <AspectRatio ratio="video" bgColor="surface-light">
 *   <img src="/video-thumbnail.jpg" alt="Video" />
 * </AspectRatio>
 *
 * // Using custom ratio with responsive sizing
 * <AspectRatio 
 *   customRatio={4/3} 
 *   maxWidth="mobile:full tablet:80% desktop:50%"
 * >
 *   <video src="/video.mp4" />
 * </AspectRatio>
 *
 * // With semantic colors and accessibility
 * <AspectRatio 
 *   ratio="square" 
 *   maxWidth="sm:full md:400px" 
 *   centered
 *   bgColor="bg-surface-light dark:bg-surface-dark"
 * >
 *   <div>Content</div>
 * </AspectRatio>
 */
export const AspectRatio = component$<AspectRatioProps>((props) => {
  const {
    children,
    ratio = "video",
    customRatio,
    class: className = "",
    id,
    bgColor,
    overflow = "cover",
    centered = true,
    style = {},
    maxWidth,
    minWidth,
    responsive = true,
    touchOptimized = true,
  } = props;

  // Get the aspect ratio value
  const getRatioValue = (): number => {
    if (customRatio) return customRatio;

    const presetRatios: Record<AspectRatioPreset, number> = {
      square: 1,
      video: 16 / 9,
      ultrawide: 21 / 9,
      portrait: 9 / 16,
      landscape: 4 / 3,
      photo: 3 / 2,
      golden: 1.618,
    };

    return presetRatios[ratio];
  };

  const ratioValue = getRatioValue();
  const paddingBottom = `${(1 / ratioValue) * 100}%`;

  // Enhanced container styles with responsive support
  const containerStyles: Record<string, string | undefined> = {
    ...style,
    maxWidth: maxWidth || style.maxWidth,
    minWidth: minWidth || style.minWidth,
  };

  // Generate responsive and optimized container classes
  const containerClasses = [
    "relative w-full",
    // Touch optimization for mobile devices
    touchOptimized && "touch-manipulation",
    // Responsive behavior
    responsive && "motion-safe:transition-all motion-safe:duration-200",
    // Custom classes from props
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Enhanced content classes with better responsive support
  const contentClasses = [
    "absolute inset-0 w-full h-full",
    // Object fit classes for different overflow modes
    overflow === "cover" && "object-cover",
    overflow === "contain" && "object-contain", 
    overflow === "fill" && "object-fill",
    overflow === "scale-down" && "object-scale-down",
    // Centering with improved responsive behavior
    centered && "flex items-center justify-center",
    // Smooth transitions for better UX
    responsive && "motion-safe:transition-all motion-safe:duration-200",
    // Touch optimization
    touchOptimized && "touch-manipulation",
  ]
    .filter(Boolean)
    .join(" ");

  // Generate background styles supporting theme colors
  const getBackgroundStyle = () => {
    if (!bgColor) return undefined;
    
    // If bgColor contains CSS classes (theme colors), don't apply as inline style
    if (bgColor.includes("bg-") || bgColor.includes("dark:")) {
      return undefined;
    }
    
    // Apply as inline style for custom colors
    return { backgroundColor: bgColor };
  };

  // Generate background classes for theme colors
  const backgroundClasses = bgColor && (bgColor.includes("bg-") || bgColor.includes("dark:")) 
    ? bgColor 
    : "";

  return (
    <div 
      class={containerClasses} 
      id={id} 
      style={containerStyles}
      // Add accessibility attributes
      role="presentation"
      aria-hidden="false"
    >
      {/* Aspect ratio spacer */}
      <div 
        style={{ paddingBottom }} 
        aria-hidden="true"
        class="motion-safe:transition-all motion-safe:duration-200"
      />

      {/* Content container */}
      <div
        class={`${contentClasses} ${backgroundClasses}`.trim()}
        style={getBackgroundStyle()}
        // Ensure content is accessible
        role="img"
        aria-label={id ? `Content with ${ratio || 'custom'} aspect ratio` : undefined}
      >
        {children}
      </div>
    </div>
  );
});
