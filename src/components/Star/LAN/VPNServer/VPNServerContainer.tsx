import { component$ } from "@builder.io/qwik";
import { VPNServer } from "./VPNServer";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import type { StepProps } from "~/types/step";

export const VPNServerContainer = component$<StepProps>((props) => {
  return (
    <div class="w-full max-w-6xl">
      {/* Page Header */}
      <div class="mb-6 flex items-center gap-4">
        <div class="rounded-xl bg-primary-100 p-3 dark:bg-primary-900/30">
          <HiServerOutline class="h-8 w-8 text-primary-500 dark:text-primary-400" />
        </div>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {$localize`VPN Server Setup`}
          </h1>
          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Configure your VPN server settings for secure remote access`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div class="flex flex-col gap-8">
        <VPNServer 
          isComplete={props.isComplete} 
          onComplete$={props.onComplete$} 
        />
      </div>
    </div>
  );
}); 