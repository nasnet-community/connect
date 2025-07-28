import { component$, useSignal } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const SizeSwitch = component$(() => {
  const smallChecked = useSignal(false);
  const mediumChecked = useSignal(true);
  const largeChecked = useSignal(false);

  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Switch
            checked={smallChecked.value}
            onChange$={(checked) => (smallChecked.value = checked)}
            size="sm"
            aria-label="Small switch"
          />
          <span>Small size</span>
        </div>

        <div class="flex items-center gap-4">
          <Switch
            checked={mediumChecked.value}
            onChange$={(checked) => (mediumChecked.value = checked)}
            size="md"
            aria-label="Medium switch"
          />
          <span>Medium size (default)</span>
        </div>

        <div class="flex items-center gap-4">
          <Switch
            checked={largeChecked.value}
            onChange$={(checked) => (largeChecked.value = checked)}
            size="lg"
            aria-label="Large switch"
          />
          <span>Large size</span>
        </div>
      </div>
    </div>
  );
});
