import { component$, useSignal, $ } from "@builder.io/qwik";
import { Toggle } from "../Toggle";

export default component$(() => {
  const soundEnabled = useSignal(true);
  const wifiEnabled = useSignal(false);
  const locationEnabled = useSignal(true);
  const darkMode = useSignal(false);
  const notificationsEnabled = useSignal(false);

  // Icon components
  const SoundOnIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.82L4.9 13.7H2a1 1 0 01-1-1V7.3a1 1 0 011-1h2.9l3.483-3.12a1 1 0 011.617.796z" />
      <path d="M12.146 6.146a.5.5 0 01.708 0 4 4 0 010 5.708.5.5 0 01-.708-.708 3 3 0 000-4.292.5.5 0 010-.708z" />
    </svg>
  );

  const SoundOffIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.82L4.9 13.7H2a1 1 0 01-1-1V7.3a1 1 0 011-1h2.9l3.483-3.12a1 1 0 011.617.796z" />
      <path d="M12 6l4 4m0-4l-4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  );

  const WifiOnIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
    </svg>
  );

  const WifiOffIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M2.5 2.5a.5.5 0 01.708 0L17.5 16.792a.5.5 0 01-.708.708L2.5 3.208a.5.5 0 010-.708z" />
      <path d="M8.5 8.5l2 2m0 0l2 2m-2-2l2-2m-2 2l-2 2" stroke="currentColor" stroke-width="1" />
    </svg>
  );

  const LocationOnIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
    </svg>
  );

  const LocationOffIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2C7.79 2 6 3.79 6 6c0 .74.2 1.43.54 2.03L8.83 6.2C8.93 6.08 9 5.93 9 5.8c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1c-.13 0-.25-.03-.37-.08L7.8 8.54C8.4 8.8 9.17 9 10 9s1.6-.2 2.2-.46l-1.83-1.82C10.25 6.73 10.13 6.8 10 6.8c.55 0 1-.45 1-1s-.45-1-1-1z" />
      <path d="M2.5 2.5l15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
    </svg>
  );

  const MoonIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
    </svg>
  );

  const SunIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
    </svg>
  );

  const BellIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
    </svg>
  );

  const BellSlashIcon = () => (
    <svg viewBox="0 0 20 20" fill="currentColor">
      <path d="M3.707 2.293a1 1 0 00-1.414 1.414l16 16a1 1 0 001.414-1.414l-1.473-1.473A1.001 1.001 0 0018 16H4a1 1 0 00-.707-1.707L4 13.586V8a6.002 6.002 0 016-6c1.297 0 2.505.417 3.487 1.126l1.42-1.42C13.76 1.249 11.952 1 10 1a8.001 8.001 0 00-8 8v2.838L.293 13.546a1 1 0 000 1.414l1.414 1.414 2-2zM13.414 14l-6-6H16a1 1 0 00-.586-2z" />
    </svg>
  );

  return (
    <div class="flex flex-col gap-6">
      <div class="space-y-6">
        <h3 class="text-lg font-medium">Toggles with Icons</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Icons provide visual context and improve the usability of toggles by making their purpose immediately clear.
        </p>
        
        {/* Basic Icon Examples */}
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-800 dark:text-gray-200">Basic Icon Toggles</h4>
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="space-y-3">
              <Toggle
                checked={soundEnabled.value}
                onChange$={$((value) => {
                  soundEnabled.value = value;
                })}
                label="Sound"
                checkedIcon={<SoundOnIcon />}
                uncheckedIcon={<SoundOffIcon />}
                color="primary"
                size="lg"
              />
              
              <Toggle
                checked={wifiEnabled.value}
                onChange$={$((value) => {
                  wifiEnabled.value = value;
                })}
                label="WiFi"
                checkedIcon={<WifiOnIcon />}
                uncheckedIcon={<WifiOffIcon />}
                color="info"
                size="md"
              />
            </div>
            
            <div class="space-y-3">
              <Toggle
                checked={locationEnabled.value}
                onChange$={$((value) => {
                  locationEnabled.value = value;
                })}
                label="Location Services"
                checkedIcon={<LocationOnIcon />}
                uncheckedIcon={<LocationOffIcon />}
                color="error"
                size="md"
              />
              
              <Toggle
                checked={darkMode.value}
                onChange$={$((value) => {
                  darkMode.value = value;
                })}
                label="Dark Mode"
                checkedIcon={<MoonIcon />}
                uncheckedIcon={<SunIcon />}
                color="warning"
                size="lg"
              />
            </div>
          </div>
        </div>

        {/* Custom Icon Examples */}
        <div class="space-y-4">
          <h4 class="text-md font-medium text-gray-800 dark:text-gray-200">Custom Icon Examples</h4>

          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h5 class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              State-Dependent Icons
            </h5>
            <div class="space-y-3">
              <Toggle
                checked={notificationsEnabled.value}
                onChange$={$((value) => {
                  notificationsEnabled.value = value;
                })}
                label="Notifications"
                checkedIcon={<BellIcon />}
                uncheckedIcon={<BellSlashIcon />}
                color="secondary"
                size="md"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Different icons for checked vs unchecked states provide clear visual feedback
              </p>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <h5 class="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Icon-Only Toggle (Same Icon Both States)
            </h5>
            <div class="space-y-3">
              <Toggle
                checked={locationEnabled.value}
                onChange$={$((value) => {
                  locationEnabled.value = value;
                })}
                aria-label="Enable location services"
                checkedIcon={<LocationOnIcon />}
                color="primary"
                size="sm"
              />
              <p class="text-xs text-gray-500 dark:text-gray-400">
                Single icon that relies on color/position changes to indicate state. 
                Uses <code class="px-1 bg-gray-100 dark:bg-gray-800 rounded">aria-label</code> for accessibility.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <p class="text-sm text-blue-700 dark:text-blue-300">
          <strong>Icon Best Practices:</strong> Icons are displayed inside the toggle thumb and automatically 
          adapt to the current theme. Use meaningful icons that clearly represent the feature being toggled. 
          Consider using different icons for checked/unchecked states to provide immediate visual feedback.
        </p>
      </div>
    </div>
  );
});