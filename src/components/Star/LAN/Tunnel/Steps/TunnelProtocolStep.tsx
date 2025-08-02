import { component$, useTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper/hooks/useStepperContext";
import { TunnelContextId } from "../Tunnel";
import { TUNNEL_PROTOCOLS } from "./constants";
import {
  HiLockClosedOutline,
  HiGlobeAltOutline,
  HiServerOutline,
  HiCubeOutline,
} from "@qwikest/icons/heroicons";

export const TunnelProtocolStep = component$(() => {
  const stepper = useStepperContext(TunnelContextId);

  // Use useTask$ to auto-complete this step
  useTask$(() => {
    stepper.completeStep$();
  });

  return (
    <div class="space-y-6">
      <div class="mx-auto grid max-w-3xl grid-cols-2 gap-6">
        {TUNNEL_PROTOCOLS.map((protocol) => {
          // Determine the appropriate icon for each protocol
          let ProtocolIcon = HiGlobeAltOutline;
          if (protocol.id === "ipip") ProtocolIcon = HiServerOutline;
          else if (protocol.id === "eoip") ProtocolIcon = HiLockClosedOutline;
          else if (protocol.id === "gre") ProtocolIcon = HiCubeOutline;
          else if (protocol.id === "vxlan") ProtocolIcon = HiGlobeAltOutline;

          return (
            <div
              key={protocol.id}
              class="group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-all duration-200 hover:border-primary-200 hover:shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-700"
            >
              {/* Card Icon */}
              <div class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-900/20 dark:text-primary-400">
                <ProtocolIcon class="h-5 w-5" />
              </div>

              {/* Card Content */}
              <div class="relative z-10 flex h-full flex-col p-5">
                <h4 class="mb-2 text-lg font-medium text-gray-900 transition-colors duration-200 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                  {protocol.name}
                </h4>
                <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {protocol.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
