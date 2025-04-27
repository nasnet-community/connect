import { $, component$, useContext, useStore } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { StarContext } from "../../StarContext/StarContext";
import { RadioButton } from "~/components/Core/button/RadioButton";

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
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
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

export const UsefulServices = component$<StepProps>(({ onComplete$ }) => {
  const ctx = useContext(StarContext);

  const serviceStates = useStore<ServiceState>({
    certificate: ctx.state.ExtraConfig.isCertificate,
    ntp: ctx.state.ExtraConfig.isNTP,
    graphing: ctx.state.ExtraConfig.isGraphing,
    DDNS: ctx.state.ExtraConfig.isDDNS,
    letsEncrypt: ctx.state.ExtraConfig.isLetsEncrypt,
  });

  const handleSubmit = $(() => {
    ctx.updateExtraConfig$({
      ...ctx.state.ExtraConfig,
      isCertificate: serviceStates.certificate,
      isNTP: serviceStates.ntp,
      isGraphing: serviceStates.graphing,
      isDDNS: serviceStates.DDNS,
      isLetsEncrypt: serviceStates.letsEncrypt,
    });
    onComplete$();
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        {/* Header section */}
        <div class="bg-primary-500 px-6 py-8 dark:bg-primary-600">
          <div class="flex items-center space-x-5">
            <div class="rounded-xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-7 w-7 text-white"
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
              <h2 class="text-2xl font-bold text-white">{$localize`Useful Services`}</h2>
              <p class="text-primary-50">{$localize`Enable additional services for your network`}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div class="p-6">
          <div class="space-y-4">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                class="rounded-xl border border-border bg-surface-secondary dark:border-border-dark dark:bg-surface-dark-secondary"
              >
                <div class="p-6">
                  <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                    <div class="flex items-center gap-4">
                      <div class="rounded-lg bg-primary-100 p-2.5 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                        {service.icon}
                      </div>
                      <div class="space-y-1">
                        <h3 class="text-lg font-semibold text-text dark:text-text-dark-default">
                          {service.title}
                        </h3>
                        <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                          {service.description}
                        </p>
                      </div>
                    </div>

                    <RadioButton
                      checked={serviceStates[service.id]}
                      onChange$={() => (serviceStates[service.id] = true)}
                      label={
                        serviceStates[service.id]
                          ? $localize`Enabled`
                          : $localize`Disabled`
                      }
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
              class="rounded-lg bg-primary-500 px-6 py-2 text-white transition-colors 
                          duration-200 hover:bg-primary-600"
            >
              {$localize`Save`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
