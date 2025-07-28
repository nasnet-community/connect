import { component$ } from "@builder.io/qwik";
import type { KbdGroupProps } from "./Kbd.types";
import { Kbd } from "./Kbd";
import { useKbdGroup } from "./hooks/useKbdGroup";

export const KbdGroup = component$<KbdGroupProps>((props) => {
  const {
    keys,
    separator = "+",
    variant = "raised",
    size = "md",
    class: className,
    osSpecific = false,
    forceOs,
  } = props;

  const { formattedSeparator, groupClass } = useKbdGroup({ separator });

  return (
    <span class={`${groupClass} ${className || ""}`}>
      {keys.map((key, index) => [
        <Kbd
          key={`kbd-${index}`}
          variant={variant}
          size={size}
          osSpecific={osSpecific}
          forceOs={forceOs}
        >
          {key}
        </Kbd>,
        index < keys.length - 1 && (
          <span key={`sep-${index}`} class="text-gray-500 dark:text-gray-400">
            {formattedSeparator}
          </span>
        ),
      ])}
    </span>
  );
});
