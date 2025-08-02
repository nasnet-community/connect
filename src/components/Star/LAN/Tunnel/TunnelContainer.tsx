import { component$ } from "@builder.io/qwik";
import { Tunnel } from "./Tunnel";
import { HiCubeTransparentOutline } from "@qwikest/icons/heroicons";
import type { StepProps } from "~/types/step";

export const TunnelContainer = component$<StepProps>((props) => {
  return (
    <div class="w-full max-w-6xl">
      {/* Page Header */}
      <div class="mb-6 flex items-center gap-4">
        <div class="rounded-xl bg-primary-100 p-3 dark:bg-primary-900/30">
          <HiCubeTransparentOutline class="h-8 w-8 text-primary-500 dark:text-primary-400" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {$localize`Network Tunnels`}
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Configure network tunnels for connecting remote networks`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div class="flex flex-col gap-8">
        <Tunnel isComplete={props.isComplete} onComplete$={props.onComplete$} />
      </div>
    </div>
  );
});
