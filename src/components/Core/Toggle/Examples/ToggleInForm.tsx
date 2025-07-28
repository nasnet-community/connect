import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const formSubmitted = useSignal(false);
  const enableNotifications = useSignal(false);
  const enableUpdates = useSignal(true);
  const enableDarkMode = useSignal(false);

  return (
    <form
      preventdefault:submit
      onSubmit$={() => {
        formSubmitted.value = true;
      }}
      class="max-w-md rounded-md border border-gray-200 p-4 dark:border-gray-700"
    >
      <div class="space-y-4">
        <h3 class="text-lg font-medium">User Preferences</h3>

        <div class="space-y-3">
          <Toggle
            checked={enableNotifications.value}
            onChange$={$((value) => {
              enableNotifications.value = value;
            })}
            label="Enable notifications"
            name="notifications"
          />

          <Toggle
            checked={enableUpdates.value}
            onChange$={$((value) => {
              enableUpdates.value = value;
            })}
            label="Receive product updates"
            name="updates"
          />

          <Toggle
            checked={enableDarkMode.value}
            onChange$={$((value) => {
              enableDarkMode.value = value;
            })}
            label="Use dark mode"
            name="darkMode"
          />
        </div>

        <div class="pt-2">
          <button
            type="submit"
            class="rounded-md bg-primary-600 px-4 py-2 text-white hover:bg-primary-700"
          >
            Save Preferences
          </button>
        </div>

        {formSubmitted.value && (
          <div class="mt-4 rounded bg-green-100 p-2 text-green-800 dark:bg-green-900 dark:text-green-200">
            <p class="text-sm">
              Preferences saved:
              {enableNotifications.value
                ? " Notifications enabled."
                : " Notifications disabled."}
              {enableUpdates.value ? " Updates enabled." : " Updates disabled."}
              {enableDarkMode.value
                ? " Dark mode enabled."
                : " Dark mode disabled."}
            </p>
          </div>
        )}
      </div>
    </form>
  );
});
