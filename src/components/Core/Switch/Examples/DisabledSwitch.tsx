import { component$ } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const DisabledSwitch = component$(() => {
  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <Switch
            checked={false}
            onChange$={() => {}}
            disabled
            aria-label="Disabled off switch"
          />
          <span>Disabled (off state)</span>
        </div>

        <div class="flex items-center gap-4">
          <Switch
            checked={true}
            onChange$={() => {}}
            disabled
            aria-label="Disabled on switch"
          />
          <span>Disabled (on state)</span>
        </div>
      </div>
    </div>
  );
});
