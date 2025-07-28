import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const autoSaveEnabled = useSignal(false);
  const autoSaveLoading = useSignal(false);
  const syncEnabled = useSignal(true);
  const syncLoading = useSignal(false);
  const notificationsEnabled = useSignal(false);
  const notificationsLoading = useSignal(false);

  // Simulate async operation
  const handleToggleChange$ = $(async (setter: any, loadingSetter: any, value: boolean) => {
    loadingSetter.value = true;
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setter.value = value;
    loadingSetter.value = false;
  });

  return (
    <div class="flex flex-col gap-6">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Settings with Async Operations</h3>
        
        <div class="space-y-3">
          <Toggle
            checked={autoSaveEnabled.value}
            onChange$={$((value) => {
              handleToggleChange$(autoSaveEnabled, autoSaveLoading, value);
            })}
            label="Enable auto-save"
            loading={autoSaveLoading.value}
            disabled={autoSaveLoading.value}
          />
          
          <Toggle
            checked={syncEnabled.value}
            onChange$={$((value) => {
              handleToggleChange$(syncEnabled, syncLoading, value);
            })}
            label="Sync across devices"
            loading={syncLoading.value}
            disabled={syncLoading.value}
            color="secondary"
          />
          
          <Toggle
            checked={notificationsEnabled.value}
            onChange$={$((value) => {
              handleToggleChange$(notificationsEnabled, notificationsLoading, value);
            })}
            label="Push notifications"
            loading={notificationsLoading.value}
            disabled={notificationsLoading.value}
            color="info"
          />
        </div>
      </div>

      <div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          <strong>Tip:</strong> Click any toggle to see the loading state. The toggle is disabled during loading to prevent multiple requests.
        </p>
      </div>
    </div>
  );
});