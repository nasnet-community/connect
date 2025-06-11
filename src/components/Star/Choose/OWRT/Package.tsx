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

        {/* Step 1: SSH into OpenWrt router */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`SSH into OpenWrt router`}
            </h3>
          </div>
          <div class="space-y-3 text-text-secondary/90 dark:text-text-dark-secondary/95">
            <p>{$localize`Open the Terminal app on your device and SSH into your OpenWrt router by typing the following command:`}</p>
            <div class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <code class="text-sm">
                ssh root@192.168.1.1
              </code>
            </div>
          </div>
        </div>

        {/* Step 2: Run installation script */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Run installation script`}
            </h3>
          </div>
          <div class="space-y-3 text-text-secondary/90 dark:text-text-dark-secondary/95">
            <p>{$localize`Run the following command to download and execute the installation script:`}</p>
            <div class="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
              <code class="text-sm">
                wget -O- https://raw.githubusercontent.com/happynet-why/nclink/main/install.sh | sh
              </code>
            </div>
          </div>
        </div>

        {/* Step 3: Final Setup via Wizard */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white font-bold">
              3
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