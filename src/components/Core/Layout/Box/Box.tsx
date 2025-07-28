import { component$, Slot } from "@builder.io/qwik";
import type { BoxProps } from "./Box.types";
import { useBox } from "./hooks/useBox";

const Box = component$<BoxProps>((props) => {
  const {
    as = "div",
    role,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-describedby": ariaDescribedby,
    ...rest
  } = props;

  const { combinedClassNames } = useBox(props);

  // Dynamic element type
  const TagName = as as any;

  return (
    <TagName
      {...rest}
      class={combinedClassNames}
      role={role}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
    >
      <Slot />
    </TagName>
  );
});

export default Box;
