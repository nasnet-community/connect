import { component$, type PropFunction } from "@builder.io/qwik";

interface OWRTInstallProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const OWRTInstall = component$((props: OWRTInstallProps) => {
  return (
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Install OpenWrt`}
        </h2>
        <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 mx-auto mt-3 max-w-2xl">
          {$localize`Follow these steps to install OpenWrt on your router`}
        </p>
      </div>

      <div class="mx-auto max-w-4xl space-y-8">
        {/* Step 1: Check compatibility */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-bold text-white">
              1
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Check compatibility`}
            </h3>
          </div>
          <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 mb-4">
            {$localize`Go to`}{" "}
            <a
              href="https://firmware-selector.openwrt.org/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-500 underline hover:text-primary-600"
            >
              https://firmware-selector.openwrt.org/
            </a>{" "}
            {$localize`and search for your router model.`}
          </p>
        </div>

        {/* Step 2: Download OpenWrt firmware */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-bold text-white">
              2
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Download OpenWrt firmware`}
            </h3>
          </div>
          <div class="text-text-secondary/90 dark:text-text-dark-secondary/95 space-y-3">
            <p class="rounded-lg border border-warning/20 bg-warning/10 p-3 text-warning-dark dark:text-warning-light">
              <strong>{$localize`Important:`}</strong>{" "}
              {$localize`Set the Version to 23.05.5`}
            </p>
            <p>{$localize`Find and download the factory .bin file for your device`}</p>
          </div>
        </div>

        {/* Step 3: Install OpenWrt */}
        <div class="rounded-2xl bg-surface/50 p-6 dark:bg-surface-dark/50">
          <div class="mb-4 flex items-center">
            <div class="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-bold text-white">
              3
            </div>
            <h3 class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Install OpenWrt`}
            </h3>
          </div>
          <p class="text-text-secondary/90 dark:text-text-dark-secondary/95">
            {$localize`Follow the OpenWrt install guide for your router model (usually through the router's firmware upgrade page).`}
          </p>
        </div>

        {/* Complete button */}
        <div class="text-center">
          <button
            class="rounded-lg bg-primary-500 px-8 py-3 font-medium text-white transition-colors hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
            onClick$={() => props.onComplete$?.()}
          >
            {$localize`Installation Complete`}
          </button>
        </div>
      </div>
    </div>
  );
});
