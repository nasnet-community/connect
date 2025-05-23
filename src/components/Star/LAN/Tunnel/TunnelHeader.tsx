import { component$ } from "@builder.io/qwik";
import { HiCubeTransparentOutline } from "@qwikest/icons/heroicons";

export const TunnelHeader = component$(() => {
  return (
    <div class="mb-6 flex items-center gap-4">
      <div class="rounded-xl bg-primary-100 p-3 dark:bg-primary-900/30">
        <HiCubeTransparentOutline class="h-8 w-8 text-primary-500 dark:text-primary-400" />
      </div>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          {$localize`Network Tunnels Setup`}
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          {$localize`Configure network tunnels for connecting remote networks`}
        </p>
      </div>
    </div>
  );
}); 