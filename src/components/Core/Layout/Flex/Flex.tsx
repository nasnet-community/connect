import { component$, Slot } from "@builder.io/qwik";
import type {
  FlexProps,
  FlexItemProps,
  ResponsiveValue,
  FlexAlign,
} from "./Flex.types";
import { useFlex } from "./hooks";

/**
 * Enhanced Flex component - an advanced layout component for creating flexible box layouts
 * with mobile-first responsive design, touch optimization, and modern CSS features.
 *
 * The Flex component provides a comprehensive API for creating complex layouts
 * with flexbox, offering full control over flex direction, alignment, wrapping,
 * spacing, and mobile-specific behaviors.
 */
const Flex = component$<FlexProps>((props) => {
  const {
    as: Element = "div",
    ...rest
  } = props;

  // Use the enhanced useFlex hook for all logic
  const { 
    combinedClassNames, 
    styleProperties,
    isMobile,
    isRtl,
    supportsContainerQueries
  } = useFlex(props);

  const ElementAny = Element as any;

  return (
    <ElementAny 
      {...rest} 
      class={combinedClassNames}
      style={{
        ...styleProperties,
        ...(props.style as Record<string, string> || {})
      }}
      data-mobile={isMobile ? 'true' : 'false'}
      data-rtl={isRtl ? 'true' : 'false'}
      data-container-queries={supportsContainerQueries ? 'true' : 'false'}
    >
      <Slot />
    </ElementAny>
  );
});

/**
 * Enhanced FlexItem component - An individual item within a Flex layout
 * with mobile-specific features and touch optimization.
 *
 * The FlexItem component provides control over how an item behaves within
 * a flex container, including growth, shrinking, basis, alignment, and
 * mobile-specific features like touch targets and adaptive sizing.
 */
export const FlexItem = component$<FlexItemProps>((props) => {
  const {
    order,
    grow,
    shrink,
    basis,
    alignSelf,
    touchTarget = "none",
    mobilePriority = "normal",
    adaptiveSize = false,
    scrollSnap = "none",
    as: Element = "div",
    ...rest
  } = props;

  // Helper function to generate responsive classes for FlexItem
  const generateResponsiveClasses = <T,>(
    value: T | ResponsiveValue<T> | undefined,
    classPrefix: string,
    valueTransform?: (val: T) => string | number | boolean,
  ) => {
    if (value === undefined) return {};

    const transform = valueTransform || ((val: T) => val);

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const responsiveValue = value as ResponsiveValue<T>;
      return {
        ...(responsiveValue.base !== undefined
          ? { [`${classPrefix}-${transform(responsiveValue.base)}`]: true }
          : {}),
        ...(responsiveValue.sm !== undefined
          ? { [`sm:${classPrefix}-${transform(responsiveValue.sm)}`]: true }
          : {}),
        ...(responsiveValue.md !== undefined
          ? { [`md:${classPrefix}-${transform(responsiveValue.md)}`]: true }
          : {}),
        ...(responsiveValue.lg !== undefined
          ? { [`lg:${classPrefix}-${transform(responsiveValue.lg)}`]: true }
          : {}),
        ...(responsiveValue.xl !== undefined
          ? { [`xl:${classPrefix}-${transform(responsiveValue.xl)}`]: true }
          : {}),
        ...(responsiveValue["2xl"] !== undefined
          ? {
              [`2xl:${classPrefix}-${transform(responsiveValue["2xl"])}`]: true,
            }
          : {}),
      };
    }

    return { [`${classPrefix}-${transform(value)}`]: true };
  };

  // Generate order classes
  const orderClasses = generateResponsiveClasses(order, "order");

  // Generate grow classes
  const growClasses = generateResponsiveClasses(grow, "flex-grow", (val) =>
    typeof val === "boolean" ? (val ? "1" : "0") : val,
  );

  // Generate shrink classes
  const shrinkClasses = generateResponsiveClasses(
    shrink,
    "flex-shrink",
    (val) => (typeof val === "boolean" ? (val ? "1" : "0") : val),
  );

  // Generate basis classes
  const basisClasses = generateResponsiveClasses(basis, "flex-basis", (val) =>
    val === "auto" ? "auto" : val,
  );

  // Generate align self classes
  const alignSelfClassMap = {
    base: {
      start: { "self-start": true },
      center: { "self-center": true },
      end: { "self-end": true },
      stretch: { "self-stretch": true },
      baseline: { "self-baseline": true },
    },
    sm: {
      start: { "sm:self-start": true },
      center: { "sm:self-center": true },
      end: { "sm:self-end": true },
      stretch: { "sm:self-stretch": true },
      baseline: { "sm:self-baseline": true },
    },
    md: {
      start: { "md:self-start": true },
      center: { "md:self-center": true },
      end: { "md:self-end": true },
      stretch: { "md:self-stretch": true },
      baseline: { "md:self-baseline": true },
    },
    lg: {
      start: { "lg:self-start": true },
      center: { "lg:self-center": true },
      end: { "lg:self-end": true },
      stretch: { "lg:self-stretch": true },
      baseline: { "lg:self-baseline": true },
    },
    xl: {
      start: { "xl:self-start": true },
      center: { "xl:self-center": true },
      end: { "xl:self-end": true },
      stretch: { "xl:self-stretch": true },
      baseline: { "xl:self-baseline": true },
    },
    "2xl": {
      start: { "2xl:self-start": true },
      center: { "2xl:self-center": true },
      end: { "2xl:self-end": true },
      stretch: { "2xl:self-stretch": true },
      baseline: { "2xl:self-baseline": true },
    },
  };

  const alignSelfClasses = (() => {
    if (
      typeof alignSelf === "object" &&
      alignSelf !== null &&
      !Array.isArray(alignSelf)
    ) {
      const responsiveAlignSelf = alignSelf as ResponsiveValue<FlexAlign>;
      let classes: Record<string, boolean> = {};

      if (responsiveAlignSelf.base) {
        classes = {
          ...classes,
          ...(alignSelfClassMap.base[responsiveAlignSelf.base] || {}),
        };
      }
      if (responsiveAlignSelf.sm) {
        classes = {
          ...classes,
          ...(alignSelfClassMap.sm[responsiveAlignSelf.sm] || {}),
        };
      }
      if (responsiveAlignSelf.md) {
        classes = {
          ...classes,
          ...(alignSelfClassMap.md[responsiveAlignSelf.md] || {}),
        };
      }
      if (responsiveAlignSelf.lg) {
        classes = {
          ...classes,
          ...(alignSelfClassMap.lg[responsiveAlignSelf.lg] || {}),
        };
      }
      if (responsiveAlignSelf.xl) {
        classes = {
          ...classes,
          ...(alignSelfClassMap.xl[responsiveAlignSelf.xl] || {}),
        };
      }
      if (responsiveAlignSelf["2xl"]) {
        classes = {
          ...classes,
          ...(alignSelfClassMap["2xl"][responsiveAlignSelf["2xl"]] || {}),
        };
      }

      return classes;
    }

    return alignSelf && typeof alignSelf === "string"
      ? alignSelfClassMap.base[alignSelf as FlexAlign] || {}
      : {};
  })();

  // Mobile-specific FlexItem features
  const touchTargetClasses = {
    "min-h-[32px] min-w-[32px]": touchTarget === "sm",
    "min-h-[44px] min-w-[44px]": touchTarget === "md", 
    "min-h-[48px] min-w-[48px]": touchTarget === "lg",
    "min-h-[44px] min-w-[44px] touch:min-h-[48px] touch:min-w-[48px]": touchTarget === "accessible",
  };

  const mobilePriorityClasses = {
    "order-last": mobilePriority === "low",
    "order-first": mobilePriority === "high",
  };

  const adaptiveSizeClasses = {
    "flex-1 min-w-0": adaptiveSize, // Allows item to shrink below content size
  };

  const scrollSnapClasses = {
    "snap-start": scrollSnap === "start",
    "snap-center": scrollSnap === "center",
    "snap-end": scrollSnap === "end",
  };

  // Combine all classes
  const allClasses = {
    ...orderClasses,
    ...growClasses,
    ...shrinkClasses,
    ...basisClasses,
    ...alignSelfClasses,
    ...touchTargetClasses,
    ...mobilePriorityClasses,
    ...adaptiveSizeClasses,
    ...scrollSnapClasses,
  };

  // Filter out undefined/null classes
  const classNames = Object.entries(allClasses)
    .filter(([, value]) => value)
    .map(([className]) => className)
    .join(" ");

  // Combine with user-provided classes
  const combinedClassNames = props.class
    ? `${classNames} ${props.class}`
    : classNames;

  const ElementAny = Element as any;

  return (
    <ElementAny 
      {...rest} 
      class={combinedClassNames}
      data-touch-target={touchTarget}
      data-mobile-priority={mobilePriority}
      data-adaptive-size={adaptiveSize ? 'true' : 'false'}
    >
      <Slot />
    </ElementAny>
  );
});

export default Flex;