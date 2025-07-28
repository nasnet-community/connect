import { component$ } from "@builder.io/qwik";
import { type InlineCodeProps } from "./CodeDisplay.types";
import { useInlineCode } from "./hooks/useInlineCode";

export const InlineCode = component$<InlineCodeProps>(
  ({ 
    children, 
    class: className = "", 
    id, 
    noWrap = false,
    theme = "auto",
    size = "sm",
    highContrast = false,
    touchOptimized = false,
    direction = "auto",
    printOptimized = false,
  }) => {
    const { classes } = useInlineCode({
      noWrap,
      theme,
      size,
      highContrast,
      touchOptimized,
      direction,
      printOptimized,
      class: className,
    });

    return (
      <code id={id} class={classes.value}>
        {children}
      </code>
    );
  },
);
