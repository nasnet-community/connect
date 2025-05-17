import { component$ } from "@builder.io/qwik";
import { type InlineCodeProps } from "./CodeDisplay.types";
import { useInlineCode } from "./hooks/useInlineCode";


export const InlineCode = component$<InlineCodeProps>(({
  children,
  class: className = "",
  id,
  noWrap = false,
}) => {
  const { classes } = useInlineCode({
    noWrap,
    class: className
  });

  return (
    <code
      id={id}
      class={classes.value}
    >
      {children}
    </code>
  );
});
