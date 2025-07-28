import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const smallChecked = useSignal(false);
  const mediumChecked = useSignal(true);
  const largeChecked = useSignal(false);

  return (
    <div class="flex flex-col gap-4">
      <div class="flex items-center gap-2">
        <span class="w-16 text-sm">Small:</span>
        <Toggle
          checked={smallChecked.value}
          onChange$={$((value) => {
            smallChecked.value = value;
          })}
          label="Small toggle"
          size="sm"
        />
      </div>

      <div class="flex items-center gap-2">
        <span class="w-16 text-sm">Medium:</span>
        <Toggle
          checked={mediumChecked.value}
          onChange$={$((value) => {
            mediumChecked.value = value;
          })}
          label="Medium toggle"
          size="md"
        />
      </div>

      <div class="flex items-center gap-2">
        <span class="w-16 text-sm">Large:</span>
        <Toggle
          checked={largeChecked.value}
          onChange$={$((value) => {
            largeChecked.value = value;
          })}
          label="Large toggle"
          size="lg"
        />
      </div>
    </div>
  );
});
