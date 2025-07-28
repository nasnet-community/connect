import { component$ } from "@builder.io/qwik";
import type { DividerProps } from "./Divider.types";
import { useDivider } from "./hooks";

const Divider = component$<DividerProps>((props) => {
  const { role = "separator", label, ...rest } = props;

  const { combinedClassNames, orientation, hasLabel } = useDivider(props);

  // If there's a label, render a div with the label content
  if (hasLabel) {
    return (
      <div
        {...rest}
        class={combinedClassNames}
        role={role}
        aria-orientation={orientation}
      >
        {label}
      </div>
    );
  }

  // Otherwise, render a simple divider
  return (
    <div
      {...rest}
      class={combinedClassNames}
      role={role}
      aria-orientation={orientation}
    />
  );
});

export default Divider;
