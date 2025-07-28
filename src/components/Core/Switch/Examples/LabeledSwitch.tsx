import { component$, useSignal } from "@builder.io/qwik";
import { Switch } from "~/components/Core/Switch";

export const LabeledSwitch = component$(() => {
  const darkModeEnabled = useSignal(false);
  const notificationsEnabled = useSignal(true);

  return (
    <div class="space-y-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <label id="dark-mode-label" class="font-medium">
            Dark Mode
          </label>
          <Switch
            checked={darkModeEnabled.value}
            onChange$={(checked) => (darkModeEnabled.value = checked)}
            aria-labelledby="dark-mode-label"
          />
        </div>

        <div class="flex items-center justify-between">
          <div>
            <label id="notifications-label" class="font-medium">
              Notifications
            </label>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Receive notifications about updates and activity
            </p>
          </div>
          <Switch
            checked={notificationsEnabled.value}
            onChange$={(checked) => (notificationsEnabled.value = checked)}
            aria-labelledby="notifications-label"
          />
        </div>
      </div>
    </div>
  );
});
