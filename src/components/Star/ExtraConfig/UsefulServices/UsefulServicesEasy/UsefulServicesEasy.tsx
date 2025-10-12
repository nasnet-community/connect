import {
  $,
  component$,
  useContext,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { StarContext } from "../../../StarContext/StarContext";
import { Toggle } from "~/components/Core/Toggle";

interface ServiceState {
  [key: string]: boolean;
}

const SERVICES = [
  {
    id: "certificate",
    title: $localize`Certificate`,
    description: $localize`Manage SSL/TLS certificates for secure connections`,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    id: "ntp",
    title: $localize`NTP Client/Server`,
    description: $localize`Synchronize time across your network devices`,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: "graphing",
    title: $localize`Graphing`,
    description: $localize`Visualize network performance and statistics`,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={2}
          d="M9 19v-6a2 2 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  {
    id: "DDNS",
    title: $localize`Cloud/DDNS`,
    description: $localize`Dynamic DNS service for remote access`,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={2}
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
        />
      </svg>
    ),
  },
  {
    id: "letsEncrypt",
    title: $localize`Let's Encrypt`,
    description: $localize`Automated SSL/TLS certificate management`,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
];

export const UsefulServicesEasy = component$<StepProps>(({ onComplete$ }) => {
  const ctx = useContext(StarContext);

  // Initialize default values if they don't exist
  useTask$(() => {
    // Ensure usefulServices is initialized with defaults
    if (!ctx.state.ExtraConfig.usefulServices) {
      const defaultUsefulServices = {
        certificate: { SelfSigned: false, LetsEncrypt: false },
        ntp: { servers: [] },
        graphing: { Interface: false, Queue: false, Resources: false },
        cloudDDNS: { ddnsEntries: [] },
        upnp: { linkType: "" as const },
        natpmp: { linkType: "" as const },
      };

      ctx.updateExtraConfig$({
        usefulServices: defaultUsefulServices
      });
    }
  });

  const serviceStates = useStore<ServiceState>({
    certificate: ctx.state.ExtraConfig.usefulServices?.certificate?.SelfSigned ?? false,
    ntp: ctx.state.ExtraConfig.usefulServices?.ntp?.servers.length ? true : false,
    graphing: ctx.state.ExtraConfig.usefulServices?.graphing?.Interface ?? false,
    DDNS: ctx.state.ExtraConfig.usefulServices?.cloudDDNS?.ddnsEntries.length ? true : false,
    letsEncrypt: ctx.state.ExtraConfig.usefulServices?.certificate?.LetsEncrypt ?? false,
  });

  const handleSubmit = $(() => {
    // Update usefulServices structure
    const usefulServicesConfig = {
      ...ctx.state.ExtraConfig.usefulServices,
      certificate: {
        SelfSigned: serviceStates.certificate,
        LetsEncrypt: serviceStates.letsEncrypt
      },
      ntp: serviceStates.ntp ?
        { servers: ["pool.ntp.org"] } :
        { servers: [] },
      graphing: {
        Interface: serviceStates.graphing,
        Queue: serviceStates.graphing,
        Resources: serviceStates.graphing
      },
      cloudDDNS: serviceStates.DDNS ?
        { ddnsEntries: [] } :
        { ddnsEntries: [] },
    };

    ctx.updateExtraConfig$({
      usefulServices: usefulServicesConfig
    });
    onComplete$();
  });

  return (
    <div class="animate-fade-in-up">
      {/* Simplified background elements */}
      <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div class="absolute left-1/4 top-1/4 h-72 w-72 animate-pulse-slow rounded-full bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
        <div class="absolute right-1/3 bottom-1/3 h-64 w-64 animate-float rounded-full bg-gradient-to-br from-secondary-500/5 to-primary-500/5"></div>
      </div>

      <div class="group relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        {/* Simplified border effect */}
        <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/10 via-secondary-500/5 to-primary-500/10 p-px">
          <div class="h-full w-full rounded-3xl bg-white dark:bg-gray-800"></div>
        </div>
        
        {/* Content container */}
        <div class="relative z-10">
          {/* Modern header section */}
          <div class="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 px-8 py-10">
            {/* Header background pattern */}
            <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div class="absolute right-0 top-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-white/5"></div>
            
            <div class="relative flex items-center space-x-6">
              <div class="group/icon flex h-16 w-16 items-center justify-center rounded-2xl border border-white/30 bg-white/20 transition-all duration-300 hover:scale-110 hover:bg-white/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 text-white transition-all duration-300 group-hover/icon:scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div class="space-y-1">
                <h2 class="text-3xl font-bold text-white">{$localize`Useful Services`}</h2>
                <p class="text-lg text-white/90">{$localize`Easy Mode`}</p>
                <p class="text-primary-100 max-w-md">{$localize`Quick enable/disable services for your network`}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div class="relative p-8">
            <div class="space-y-4">
              {SERVICES.map((service, index) => (
                <div
                  key={service.id}
                  class="group/card relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-primary-500/10 dark:border-gray-700/50 dark:from-gray-800 dark:to-gray-900 animate-fade-in-up"
                  style={`animation-delay: ${index * 100}ms`}
                >
                  {/* Gradient overlay on hover */}
                  <div class="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-secondary-500/0 to-primary-500/0 transition-opacity duration-500 opacity-0 group-hover/card:opacity-5"></div>
                  
                  <div class="relative p-6">
                    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                      <div class="flex items-center gap-4">
                        <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 transition-all duration-300 group-hover/card:scale-110 group-hover/card:shadow-lg group-hover/card:shadow-primary-500/20 dark:from-primary-900/30 dark:to-primary-800/30 dark:text-primary-400">
                          <div class="transition-transform duration-300 group-hover/card:rotate-12">
                            {service.icon}
                          </div>
                        </div>
                        <div class="space-y-1">
                          <h3 class="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
                            {service.title}
                          </h3>
                          <p class="text-sm text-gray-600 dark:text-gray-400">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      <Toggle
                        checked={serviceStates[service.id]}
                        onChange$={$((checked) =>
                          (serviceStates[service.id] = checked)
                        )}
                        label={
                          serviceStates[service.id]
                            ? $localize`Enabled`
                            : $localize`Disabled`
                        }
                        size="lg"
                        color={serviceStates[service.id] ? "primary" : "secondary"}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div class="mt-8 flex justify-end">
              <button
                onClick$={handleSubmit}
                class="group relative overflow-hidden rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary-500/25"
              >
                {/* Shimmer effect on hover */}
                <div class="absolute inset-0 -top-2 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-x-full -skew-x-12"></div>
                <span class="relative flex items-center gap-2">
                  {$localize`Save Settings`}
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
