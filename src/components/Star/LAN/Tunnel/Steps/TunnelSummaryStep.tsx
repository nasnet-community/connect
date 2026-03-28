import { component$, useTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper/hooks/useStepperContext";
import { TunnelContextId } from "../Tunnel";
import {
  HiServerOutline,
  HiLockClosedOutline,
  HiCubeOutline,
  HiGlobeAltOutline,
} from "@qwikest/icons/heroicons";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const TunnelSummaryStep = component$(() => {
  const locale = useMessageLocale();
  const stepper = useStepperContext(TunnelContextId);

  // Mark the step as complete when mounted
  useTask$(() => {
    stepper.completeStep$();
  });

  return (
    <div class="space-y-6">
      {/* IPIP tunnels */}
      <div class="overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 hover:border-primary-200 hover:shadow-sm dark:border-gray-700 dark:hover:border-primary-700">
        <div class="flex items-center gap-3 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-900/20 dark:text-primary-400">
            <HiServerOutline class="h-5 w-5" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {semanticMessages.tunnel_step_ipip({}, { locale })}
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {stepper.data.ipip.length}
            </span>
          </h3>
        </div>

        {stepper.data.ipip.length > 0 ? (
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            {stepper.data.ipip.map((tunnel, i) => (
              <div key={i} class="p-4">
                <div class="font-medium text-gray-900 dark:text-white">
                  {tunnel.name}
                </div>
                <div class="mt-2 grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    {semanticMessages.tunnel_summary_local({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.localAddress}</span>
                  </div>
                  <div>
                    {semanticMessages.tunnel_summary_remote({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.remoteAddress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p class="p-4 text-sm italic text-gray-500 dark:text-gray-400">
            {semanticMessages.tunnel_summary_no_ipip({}, { locale })}
          </p>
        )}
      </div>

      {/* EOIP tunnels */}
      <div class="overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 hover:border-primary-200 hover:shadow-sm dark:border-gray-700 dark:hover:border-primary-700">
        <div class="flex items-center gap-3 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-900/20 dark:text-primary-400">
            <HiLockClosedOutline class="h-5 w-5" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {semanticMessages.tunnel_step_eoip({}, { locale })}
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {stepper.data.eoip.length}
            </span>
          </h3>
        </div>

        {stepper.data.eoip.length > 0 ? (
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            {stepper.data.eoip.map((tunnel, i) => (
              <div key={i} class="p-4">
                <div class="font-medium text-gray-900 dark:text-white">
                  {tunnel.name}
                </div>
                <div class="mt-2 grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    {semanticMessages.tunnel_summary_local({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.localAddress}</span>
                  </div>
                  <div>
                    {semanticMessages.tunnel_summary_remote({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.remoteAddress}</span>
                  </div>
                  <div>
                    {semanticMessages.tunnel_summary_tunnel_id(
                      {},
                      {
                        locale,
                      },
                    )}{" "}
                    <span class="font-mono">{tunnel.tunnelId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p class="p-4 text-sm italic text-gray-500 dark:text-gray-400">
            {semanticMessages.tunnel_summary_no_eoip({}, { locale })}
          </p>
        )}
      </div>

      {/* GRE tunnels */}
      <div class="overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 hover:border-primary-200 hover:shadow-sm dark:border-gray-700 dark:hover:border-primary-700">
        <div class="flex items-center gap-3 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-900/20 dark:text-primary-400">
            <HiCubeOutline class="h-5 w-5" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {semanticMessages.tunnel_step_gre({}, { locale })}
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {stepper.data.gre.length}
            </span>
          </h3>
        </div>

        {stepper.data.gre.length > 0 ? (
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            {stepper.data.gre.map((tunnel, i) => (
              <div key={i} class="p-4">
                <div class="font-medium text-gray-900 dark:text-white">
                  {tunnel.name}
                </div>
                <div class="mt-2 grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    {semanticMessages.tunnel_summary_local({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.localAddress}</span>
                  </div>
                  <div>
                    {semanticMessages.tunnel_summary_remote({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.remoteAddress}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p class="p-4 text-sm italic text-gray-500 dark:text-gray-400">
            {semanticMessages.tunnel_summary_no_gre({}, { locale })}
          </p>
        )}
      </div>

      {/* VXLAN tunnels */}
      <div class="overflow-hidden rounded-lg border border-gray-200 transition-all duration-200 hover:border-primary-200 hover:shadow-sm dark:border-gray-700 dark:hover:border-primary-700">
        <div class="flex items-center gap-3 border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-500 dark:bg-primary-900/20 dark:text-primary-400">
            <HiGlobeAltOutline class="h-5 w-5" />
          </div>
          <h3 class="text-lg font-medium text-gray-900 dark:text-white">
            {semanticMessages.tunnel_step_vxlan({}, { locale })}
            <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">
              {stepper.data.vxlan.length}
            </span>
          </h3>
        </div>

        {stepper.data.vxlan.length > 0 ? (
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            {stepper.data.vxlan.map((tunnel, i) => (
              <div key={i} class="p-4">
                <div class="font-medium text-gray-900 dark:text-white">
                  {tunnel.name}
                </div>
                <div class="mt-2 grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <div>
                    {semanticMessages.tunnel_summary_local({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.localAddress}</span>
                  </div>
                  <div>
                    {semanticMessages.tunnel_summary_remote({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.remoteAddress}</span>
                  </div>
                  <div>
                    {semanticMessages.tunnel_summary_vni({}, { locale })}{" "}
                    <span class="font-mono">{tunnel.vni}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p class="p-4 text-sm italic text-gray-500 dark:text-gray-400">
            {semanticMessages.tunnel_summary_no_vxlan({}, { locale })}
          </p>
        )}
      </div>
    </div>
  );
});
