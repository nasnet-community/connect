import { component$, $ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper/hooks/useStepperContext";
import { TunnelContextId } from "../Tunnel";
import { HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { Card } from "~/components/Core/Card";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const TunnelEnableStep = component$(() => {
  const locale = useMessageLocale();
  const stepper = useStepperContext(TunnelContextId);

  // Auto-complete this step on mount and enable tunnels
  $(() => {
    // Set tunnels as enabled
    stepper.data.tunnelEnabled.value = true;

    // Complete step (let CStepper handle navigation)
    stepper.completeStep$();
  })();

  return (
    <div class="space-y-6">
      <Card>
        <div class="flex items-center gap-3">
          <HiLockClosedOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {semanticMessages.tunnel_header_title({}, { locale })}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {semanticMessages.tunnel_enable_step_description({}, { locale })}
            </p>
          </div>
        </div>

        <div class="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {semanticMessages.tunnel_enable_step_prompt({}, { locale })}
          </p>
        </div>
      </Card>
    </div>
  );
});
