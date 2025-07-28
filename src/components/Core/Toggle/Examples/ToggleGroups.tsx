import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  // Notification settings group
  const emailNotifications = useSignal(true);
  const pushNotifications = useSignal(false);
  const smsNotifications = useSignal(false);
  
  // Privacy settings group
  const shareProfile = useSignal(false);
  const shareActivity = useSignal(false);
  const shareLocation = useSignal(false);
  
  // Feature flags group
  const experimentalFeatures = useSignal(false);
  const betaFeatures = useSignal(true);
  const debugMode = useSignal(false);

  // Group controls
  const toggleAllNotifications$ = $((enable: boolean) => {
    emailNotifications.value = enable;
    pushNotifications.value = enable;
    smsNotifications.value = enable;
  });

  const toggleAllPrivacy$ = $((enable: boolean) => {
    shareProfile.value = enable;
    shareActivity.value = enable;
    shareLocation.value = enable;
  });

  return (
    <div class="flex flex-col gap-8">
      <div class="space-y-4">
        <h3 class="text-lg font-medium">Toggle Groups</h3>
        
        {/* Notification Settings Group */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="text-base font-medium">Notification Settings</h4>
            <div class="flex gap-2">
              <button
                type="button"
                onClick$={() => toggleAllNotifications$(true)}
                class="rounded px-2 py-1 text-xs text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/20"
              >
                Enable All
              </button>
              <button
                type="button"
                onClick$={() => toggleAllNotifications$(false)}
                class="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Disable All
              </button>
            </div>
          </div>
          
          <div class="space-y-3">
            <Toggle
              checked={emailNotifications.value}
              onChange$={$((value) => {
                emailNotifications.value = value;
              })}
              label="Email notifications"
              color="primary"
            />
            
            <Toggle
              checked={pushNotifications.value}
              onChange$={$((value) => {
                pushNotifications.value = value;
              })}
              label="Push notifications"
              color="primary"
            />
            
            <Toggle
              checked={smsNotifications.value}
              onChange$={$((value) => {
                smsNotifications.value = value;
              })}
              label="SMS notifications"
              color="primary"
            />
          </div>
        </div>

        {/* Privacy Settings Group */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <div class="mb-4 flex items-center justify-between">
            <h4 class="text-base font-medium">Privacy Settings</h4>
            <div class="flex gap-2">
              <button
                type="button"
                onClick$={() => toggleAllPrivacy$(true)}
                class="rounded px-2 py-1 text-xs text-success-600 hover:bg-success-50 dark:text-success-400 dark:hover:bg-success-900/20"
              >
                Enable All
              </button>
              <button
                type="button"
                onClick$={() => toggleAllPrivacy$(false)}
                class="rounded px-2 py-1 text-xs text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-800"
              >
                Disable All
              </button>
            </div>
          </div>
          
          <div class="space-y-3">
            <Toggle
              checked={shareProfile.value}
              onChange$={$((value) => {
                shareProfile.value = value;
              })}
              label="Share profile publicly"
              color="success"
            />
            
            <Toggle
              checked={shareActivity.value}
              onChange$={$((value) => {
                shareActivity.value = value;
              })}
              label="Share activity status"
              color="success"
            />
            
            <Toggle
              checked={shareLocation.value}
              onChange$={$((value) => {
                shareLocation.value = value;
              })}
              label="Share location"
              color="success"
            />
          </div>
        </div>

        {/* Developer Settings Group */}
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <div class="mb-4">
            <h4 class="text-base font-medium">Developer Settings</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Advanced features for development and testing
            </p>
          </div>
          
          <div class="space-y-3">
            <Toggle
              checked={experimentalFeatures.value}
              onChange$={$((value) => {
                experimentalFeatures.value = value;
              })}
              label="Experimental features"
              color="warning"
              size="sm"
            />
            
            <Toggle
              checked={betaFeatures.value}
              onChange$={$((value) => {
                betaFeatures.value = value;
              })}
              label="Beta features"
              color="info"
              size="sm"
            />
            
            <Toggle
              checked={debugMode.value}
              onChange$={$((value) => {
                debugMode.value = value;
              })}
              label="Debug mode"
              color="error"
              size="sm"
            />
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-amber-50 p-4 dark:bg-amber-900/20">
        <p class="text-sm text-amber-700 dark:text-amber-300">
          <strong>Group Management:</strong> Use the "Enable All" and "Disable All" buttons to quickly 
          manage related settings. Each group uses consistent colors for visual coherence.
        </p>
      </div>
    </div>
  );
});