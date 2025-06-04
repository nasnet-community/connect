import { component$ } from "@builder.io/qwik";

export const OWRTPackage = component$(() => {
  return (
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Install Custom Package`}
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-text-secondary/90 dark:text-text-dark-secondary/95">
          {$localize`Install and configure the custom package using LuCI web interface`}
        </p>
      </div>

      <div class="mx-auto max-w-4xl space-y-6">
        {/* Important hint */}
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p class="text-blue-800 dark:text-blue-200">
            <strong>{$localize`Hint:`}</strong> {$localize`Make sure your router is connected to the internet before continuing.`}
          </p>
        </div>

        <div class="text-lg font-semibold text-text dark:text-text-dark-default mb-6">
          {$localize`Install custom package from GitHub using LuCI (web interface):`}
        </div>

        {/* Step 1: Open LuCI */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Open LuCI`}
            </h3>
          </div>
          <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
            {$localize`In your browser, go to:`}{" "}
            <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
              http://192.168.1.1
            </code>{" "}
            {$localize`(default)`}
          </p>
        </div>

        {/* Step 2: Log in */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Log in`}
            </h3>
          </div>
          <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
            {$localize`Use your router username/password (default is usually root / no password)`}
          </p>
        </div>

        {/* Step 3: Add custom package source */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Add custom package source`}
            </h3>
          </div>
          <div class="space-y-3 text-text-secondary/90 dark:text-text-dark-secondary/95">
            <p>{$localize`Go to:`} <strong>System → Software</strong></p>
            <p>{$localize`Click "Configuration"`}</p>
            <p>{$localize`Add this line under "Custom feeds":`}</p>
            <div class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <code class="text-sm">
                src/gz custompkg https://github.com/nasnet-community/linkmask/packages
              </code>
            </div>
            <p>{$localize`Click "Save & Apply"`}</p>
          </div>
        </div>

        {/* Step 4: Update package list */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              4
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Update package list`}
            </h3>
          </div>
          <div class="space-y-3 text-text-secondary/90 dark:text-text-dark-secondary/95">
            <p>{$localize`Go back to`} <strong>System → Software</strong></p>
            <p>{$localize`Click "Update lists..."`}</p>
          </div>
        </div>

        {/* Step 5: Install your package */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              5
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Install your package`}
            </h3>
          </div>
          <div class="space-y-3 text-text-secondary/90 dark:text-text-dark-secondary/95">
            <p>{$localize`In the search box, type:`} <strong>linkmask</strong></p>
            <p>{$localize`Click "Install" next to the package`}</p>
          </div>
        </div>

        {/* Step 6: Final Setup via Wizard */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              6
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Final Setup via Wizard`}
            </h3>
          </div>
          <div class="space-y-3 text-text-secondary/90 dark:text-text-dark-secondary/95">
            <p>{$localize`Log out of LuCI, then log in again`}</p>
            <p>{$localize`Go to:`} <strong>Services → LinkMask</strong></p>
            <p>{$localize`Click "Open Wizard"`}</p>
            <p>{$localize`Press the "Setup" button`}</p>
            <p class="font-medium text-success">{$localize`The system will now automatically configure your device.`}</p>
          </div>
        </div>


      </div>
    </div>
  );
});