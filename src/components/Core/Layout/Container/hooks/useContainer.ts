import type { ContainerProps } from "../Container.types";

export function useContainer(props: ContainerProps) {
  const {
    maxWidth = "lg",
    centered = true,
    paddingX = "md",
    paddingY = "none",
    fixedWidth = false,
  } = props;

  // Generate max-width classes
  const maxWidthClasses = (() => {
    // For fixed width containers, apply max-width at all breakpoints
    if (fixedWidth) {
      return {
        "max-w-screen-xs": maxWidth === "xs",
        "max-w-screen-sm": maxWidth === "sm",
        "max-w-screen-md": maxWidth === "md",
        "max-w-screen-lg": maxWidth === "lg",
        "max-w-screen-xl": maxWidth === "xl",
        "max-w-screen-2xl": maxWidth === "2xl",
        "max-w-full": maxWidth === "full",
        "max-w-none": maxWidth === "fluid",
      };
    }

    // For responsive containers, max-width is only applied at the target breakpoint and up
    return {
      "max-w-none xs:max-w-screen-xs": maxWidth === "xs",
      "max-w-none sm:max-w-screen-sm": maxWidth === "sm",
      "max-w-none md:max-w-screen-md": maxWidth === "md",
      "max-w-none lg:max-w-screen-lg": maxWidth === "lg",
      "max-w-none xl:max-w-screen-xl": maxWidth === "xl",
      "max-w-none 2xl:max-w-screen-2xl": maxWidth === "2xl",
      "max-w-full": maxWidth === "full",
      "max-w-none": maxWidth === "fluid",
    };
  })();

  // Generate horizontal padding classes
  const paddingXClasses = {
    "px-0": paddingX === "none",
    "px-2": paddingX === "xs",
    "px-4": paddingX === "sm",
    "px-6": paddingX === "md",
    "px-8": paddingX === "lg",
    "px-12": paddingX === "xl",
  };

  // Generate vertical padding classes
  const paddingYClasses = {
    "py-0": paddingY === "none",
    "py-2": paddingY === "xs",
    "py-4": paddingY === "sm",
    "py-6": paddingY === "md",
    "py-8": paddingY === "lg",
    "py-12": paddingY === "xl",
  };

  // Generate centering classes
  const centeringClasses = {
    "mx-auto": centered,
  };

  // Combine all classes
  const allClasses = {
    "w-full": true,
    ...maxWidthClasses,
    ...paddingXClasses,
    ...paddingYClasses,
    ...centeringClasses,
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

  return {
    combinedClassNames,
  };
}
