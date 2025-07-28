import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const enabledUnchecked = useSignal(false);
  const enabledChecked = useSignal(true);
  const disabledUnchecked = useSignal(false);
  const disabledChecked = useSignal(true);
  const requiredToggle = useSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Standard States:</h3>
        <Toggle
          checked={enabledUnchecked.value}
          onChange$={$((value) => {
            enabledUnchecked.value = value;
          })}
          label="Unchecked"
        />

        <Toggle
          checked={enabledChecked.value}
          onChange$={$((value) => {
            enabledChecked.value = value;
          })}
          label="Checked"
        />
      </div>

      <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Disabled States:</h3>
        <Toggle
          checked={disabledUnchecked.value}
          onChange$={$((value) => {
            disabledUnchecked.value = value;
          })}
          label="Disabled unchecked"
          disabled={true}
        />

        <Toggle
          checked={disabledChecked.value}
          onChange$={$((value) => {
            disabledChecked.value = value;
          })}
          label="Disabled checked"
          disabled={true}
        />
      </div>

      <div class="flex flex-col gap-3">
        <h3 class="text-sm font-medium">Required State:</h3>
        <Toggle
          checked={requiredToggle.value}
          onChange$={$((value) => {
            requiredToggle.value = value;
          })}
          label="Required toggle"
          required={true}
        />
      </div>
    </div>
  );
});
