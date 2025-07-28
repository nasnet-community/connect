import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const rightLabelChecked = useSignal(false);
  const leftLabelChecked = useSignal(true);
  const noLabelChecked = useSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <Toggle
        checked={rightLabelChecked.value}
        onChange$={$((value) => {
          rightLabelChecked.value = value;
        })}
        label="Label on right (default)"
        labelPosition="right"
      />

      <Toggle
        checked={leftLabelChecked.value}
        onChange$={$((value) => {
          leftLabelChecked.value = value;
        })}
        label="Label on left"
        labelPosition="left"
      />

      <Toggle
        checked={noLabelChecked.value}
        onChange$={$((value) => {
          noLabelChecked.value = value;
        })}
        aria-label="Toggle without visible label"
      />
    </div>
  );
});
