import { component$ } from "@builder.io/qwik";
import type { SpacerProps, SpacerSize } from "./Spacer.types";

/**
 * Spacer component - a flexible layout component for creating consistent spacing.
 *
 * The Spacer component provides whitespace between elements with responsive sizing
 * options, helping maintain consistent spacing throughout the UI.
 */
const Spacer = component$<SpacerProps>((props) => {
  const {
    size = "md",
    isFlexible = false,
    horizontal = false,
    vertical = !horizontal,
    hideOnMobile = false,
    role = "none",
    ...rest
  } = props;

  // Generate size classes
  const sizeClasses = (() => {
    if (typeof size === "string") {
      if (horizontal) {
        return {
          "w-0": size === "none",
          "w-1": size === "xs",
          "w-2": size === "sm",
          "w-4": size === "md",
          "w-6": size === "lg",
          "w-8": size === "xl",
          "w-10": size === "2xl",
          "w-12": size === "3xl",
          "w-16": size === "4xl",
        };
      }

      if (vertical) {
        return {
          "h-0": size === "none",
          "h-1": size === "xs",
          "h-2": size === "sm",
          "h-4": size === "md",
          "h-6": size === "lg",
          "h-8": size === "xl",
          "h-10": size === "2xl",
          "h-12": size === "3xl",
          "h-16": size === "4xl",
        };
      }
    }

    // If we're here, size must be a responsive object
    const responsiveObj = size as {
      base?: SpacerSize;
      sm?: SpacerSize;
      md?: SpacerSize;
      lg?: SpacerSize;
      xl?: SpacerSize;
      "2xl"?: SpacerSize;
    };

    // Handle responsive size
    const baseSize = responsiveObj.base || "md";
    const responsiveClasses: Record<string, boolean> = {};

    if (horizontal) {
      // Base horizontal sizes
      responsiveClasses["w-0"] = baseSize === "none";
      responsiveClasses["w-1"] = baseSize === "xs";
      responsiveClasses["w-2"] = baseSize === "sm";
      responsiveClasses["w-4"] = baseSize === "md";
      responsiveClasses["w-6"] = baseSize === "lg";
      responsiveClasses["w-8"] = baseSize === "xl";
      responsiveClasses["w-10"] = baseSize === "2xl";
      responsiveClasses["w-12"] = baseSize === "3xl";
      responsiveClasses["w-16"] = baseSize === "4xl";

      // Responsive horizontal sizes
      if (responsiveObj.sm) {
        responsiveClasses[`sm:w-${getSizeValue(responsiveObj.sm)}`] = true;
      }
      if (responsiveObj.md) {
        responsiveClasses[`md:w-${getSizeValue(responsiveObj.md)}`] = true;
      }
      if (responsiveObj.lg) {
        responsiveClasses[`lg:w-${getSizeValue(responsiveObj.lg)}`] = true;
      }
      if (responsiveObj.xl) {
        responsiveClasses[`xl:w-${getSizeValue(responsiveObj.xl)}`] = true;
      }
      if (responsiveObj["2xl"]) {
        responsiveClasses[`2xl:w-${getSizeValue(responsiveObj["2xl"])}`] = true;
      }
    }

    if (vertical) {
      // Base vertical sizes
      responsiveClasses["h-0"] = baseSize === "none";
      responsiveClasses["h-1"] = baseSize === "xs";
      responsiveClasses["h-2"] = baseSize === "sm";
      responsiveClasses["h-4"] = baseSize === "md";
      responsiveClasses["h-6"] = baseSize === "lg";
      responsiveClasses["h-8"] = baseSize === "xl";
      responsiveClasses["h-10"] = baseSize === "2xl";
      responsiveClasses["h-12"] = baseSize === "3xl";
      responsiveClasses["h-16"] = baseSize === "4xl";

      // Responsive vertical sizes
      if (responsiveObj.sm) {
        responsiveClasses[`sm:h-${getSizeValue(responsiveObj.sm)}`] = true;
      }
      if (responsiveObj.md) {
        responsiveClasses[`md:h-${getSizeValue(responsiveObj.md)}`] = true;
      }
      if (responsiveObj.lg) {
        responsiveClasses[`lg:h-${getSizeValue(responsiveObj.lg)}`] = true;
      }
      if (responsiveObj.xl) {
        responsiveClasses[`xl:h-${getSizeValue(responsiveObj.xl)}`] = true;
      }
      if (responsiveObj["2xl"]) {
        responsiveClasses[`2xl:h-${getSizeValue(responsiveObj["2xl"])}`] = true;
      }
    }

    return responsiveClasses;
  })();

  // Helper function to convert size names to Tailwind values
  function getSizeValue(size: string): string {
    switch (size) {
      case "none":
        return "0";
      case "xs":
        return "1";
      case "sm":
        return "2";
      case "md":
        return "4";
      case "lg":
        return "6";
      case "xl":
        return "8";
      case "2xl":
        return "10";
      case "3xl":
        return "12";
      case "4xl":
        return "16";
      default:
        return "4"; // Default to medium
    }
  }

  // Flexible spacer
  const flexibleClasses = {
    "flex-grow": isFlexible,
    "flex-shrink-0": !isFlexible,
  };

  // Hide on mobile
  const responsiveClasses = {
    "hidden sm:block": hideOnMobile,
  };

  // Combine all classes
  const allClasses = {
    ...sizeClasses,
    ...flexibleClasses,
    ...responsiveClasses,
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

  return (
    <div
      {...rest}
      id={props.id}
      class={combinedClassNames}
      role={role}
      aria-hidden="true"
    />
  );
});

export default Spacer;
