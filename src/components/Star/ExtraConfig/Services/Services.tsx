import {
  $,
  component$,
  useContext,
  useTask$,
  useStylesScoped$,
} from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { StarContext } from "../../StarContext/StarContext";
import type { ServiceType } from "../../StarContext/ExtraType";
import { Select } from "~/components/Core/Select";
import { Input } from "~/components/Core";

// Add scoped styles to fix dropdown positioning
const dropdownStyles = `
  .dropdown-container {
    position: relative;
    z-index: 0;
  }
  
  .dropdown-container:hover,
  .dropdown-container:focus-within {
    z-index: 50;
  }
  
  /* Force dropdown menu to appear above all other elements */
  :global(.dropdown-container [role="listbox"]) {
    z-index: 50 !important;
    position: absolute !important;
    max-height: 200px !important;
  }
  
  /* Adjust positioning for last rows */
  tr:nth-last-child(-n+2) .dropdown-container :global([role="listbox"]) {
    bottom: 100% !important;
    top: auto !important;
  }
`;

type ServiceName =
  | "api"
  | "apissl"
  | "ftp"
  | "ssh"
  | "telnet"
  | "winbox"
  | "web"
  | "webssl";

interface ServiceItem {
  name: ServiceName;
  description: string;
  recommended: boolean;
  defaultPort: number;
}

export const Services = component$<StepProps>(({ onComplete$ }) => {
  const ctx = useContext(StarContext);

  // Apply scoped styles to fix dropdown positioning
  useStylesScoped$(dropdownStyles);

  // Initialize services if they don't exist
  useTask$(() => {
    if (!ctx.state.ExtraConfig.services) {
      const defaultServices = {
        api: { type: "Local" as ServiceType, port: 8728 },
        apissl: { type: "Local" as ServiceType, port: 8729 },
        ftp: { type: "Local" as ServiceType, port: 21 },
        ssh: { type: "Local" as ServiceType, port: 22 },
        telnet: { type: "Local" as ServiceType, port: 23 },
        winbox: { type: "Enable" as ServiceType, port: 8291 },
        web: { type: "Local" as ServiceType, port: 80 },
        webssl: { type: "Local" as ServiceType, port: 443 },
      };
      ctx.updateExtraConfig$({ services: defaultServices });
    }
  });

  const services: ServiceItem[] = [
    {
      name: "api",
      description: $localize`RouterOS API access`,
      recommended: false,
      defaultPort: 8728,
    },
    {
      name: "apissl",
      description: $localize`RouterOS API with SSL`,
      recommended: false,
      defaultPort: 8729,
    },
    {
      name: "ftp",
      description: $localize`File Transfer Protocol`,
      recommended: false,
      defaultPort: 21,
    },
    {
      name: "ssh",
      description: $localize`Secure Shell`,
      recommended: true,
      defaultPort: 22,
    },
    {
      name: "telnet",
      description: $localize`Telnet Protocol`,
      recommended: false,
      defaultPort: 23,
    },
    {
      name: "winbox",
      description: $localize`WinBox Management Tool`,
      recommended: true,
      defaultPort: 8291,
    },
    {
      name: "web",
      description: $localize`Web Interface Access`,
      recommended: false,
      defaultPort: 80,
    },
    {
      name: "webssl",
      description: $localize`Secure Web Interface`,
      recommended: false,
      defaultPort: 443,
    },
  ];

  const handleSubmit = $(() => {
    if (!ctx.state.ExtraConfig.services) return;

    // Services are already updated via onChange handlers
    onComplete$();
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        {/* Header */}
        <div class="bg-primary-500 px-6 py-8 dark:bg-primary-600">
          <div class="flex items-center space-x-5">
            <div class="rounded-xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
              <svg
                class="h-7 w-7 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">
                {$localize`Services Configuration`}
              </h2>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium text-primary-50">
                  {$localize`Configure RouterOS service accessibility`}
                </p>
                <span class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white">
                  {services.length} {$localize`Services`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div class="p-6">
          <div class="overflow-visible rounded-xl border border-border dark:border-border-dark">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="bg-surface-secondary dark:bg-surface-dark-secondary border-b border-border dark:border-border-dark">
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {$localize`Service`}
                  </th>
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {$localize`Description`}
                  </th>
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {$localize`Link`}
                  </th>
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {$localize`Port`}
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-border dark:divide-border-dark">
                {services.map((service) => {
                  const currentConfig = ctx.state.ExtraConfig.services?.[
                    service.name
                  ] || {
                    type: "Local" as ServiceType,
                    port: service.defaultPort,
                  };
                  const currentValue =
                    typeof currentConfig === "string"
                      ? currentConfig
                      : currentConfig.type;
                  const currentPort =
                    typeof currentConfig === "string"
                      ? service.defaultPort
                      : currentConfig.port || service.defaultPort;
                  return (
                    <tr
                      key={service.name}
                      class="hover:bg-surface-secondary dark:hover:bg-surface-dark-secondary bg-surface transition-colors dark:bg-surface-dark"
                    >
                      <td class="px-6 py-4">
                        <div class="flex items-center space-x-3">
                          <div
                            class={`h-2.5 w-2.5 rounded-full ${
                              currentValue === "Enable"
                                ? "bg-primary-500"
                                : "bg-text-secondary/50"
                            }`}
                          ></div>
                          <span class="font-medium text-text dark:text-text-dark-default">
                            {service.name}
                          </span>
                        </div>
                      </td>
                      <td class="text-text-secondary dark:text-text-dark-secondary px-6 py-4">
                        {service.description}
                      </td>
                      <td class="px-6 py-4">
                        <div class="dropdown-container">
                          <Select
                            options={[
                              { value: "Enable", label: $localize`Enable` },
                              { value: "Disable", label: $localize`Disable` },
                              { value: "Local", label: $localize`Local` },
                            ]}
                            value={currentValue}
                            onChange$={(value: string | string[]) => {
                              if (!ctx.state.ExtraConfig.services) {
                                ctx.updateExtraConfig$({
                                  services: {
                                    api: {
                                      type: "Local" as ServiceType,
                                      port: 8728,
                                    },
                                    apissl: {
                                      type: "Local" as ServiceType,
                                      port: 8729,
                                    },
                                    ftp: {
                                      type: "Local" as ServiceType,
                                      port: 21,
                                    },
                                    ssh: {
                                      type: "Enable" as ServiceType,
                                      port: 22,
                                    },
                                    telnet: {
                                      type: "Local" as ServiceType,
                                      port: 23,
                                    },
                                    winbox: {
                                      type: "Enable" as ServiceType,
                                      port: 8291,
                                    },
                                    web: {
                                      type: "Local" as ServiceType,
                                      port: 80,
                                    },
                                    webssl: {
                                      type: "Local" as ServiceType,
                                      port: 443,
                                    },
                                  },
                                });
                              }

                              if (ctx.state.ExtraConfig.services) {
                                const currentService =
                                  ctx.state.ExtraConfig.services[service.name];
                                const port =
                                  typeof currentService === "string"
                                    ? service.defaultPort
                                    : currentService.port ||
                                      service.defaultPort;
                                ctx.state.ExtraConfig.services[service.name] = {
                                  type: value as ServiceType,
                                  port: port,
                                };
                              }
                            }}
                            clearable={false}
                            class="w-full"
                            size="sm"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-4">
                        <Input
                          type="number"
                          min={1}
                          max={65535}
                          value={currentPort}
                          onInput$={(event: Event, value: string) => {
                            const port = parseInt(value);
                            if (!isNaN(port) && port >= 1 && port <= 65535) {
                              if (!ctx.state.ExtraConfig.services) {
                                ctx.updateExtraConfig$({
                                  services: {
                                    api: {
                                      type: "Local" as ServiceType,
                                      port: 8728,
                                    },
                                    apissl: {
                                      type: "Local" as ServiceType,
                                      port: 8729,
                                    },
                                    ftp: {
                                      type: "Local" as ServiceType,
                                      port: 21,
                                    },
                                    ssh: {
                                      type: "Enable" as ServiceType,
                                      port: 22,
                                    },
                                    telnet: {
                                      type: "Local" as ServiceType,
                                      port: 23,
                                    },
                                    winbox: {
                                      type: "Enable" as ServiceType,
                                      port: 8291,
                                    },
                                    web: {
                                      type: "Local" as ServiceType,
                                      port: 80,
                                    },
                                    webssl: {
                                      type: "Local" as ServiceType,
                                      port: 443,
                                    },
                                  },
                                });
                              }

                              if (ctx.state.ExtraConfig.services) {
                                const currentService =
                                  ctx.state.ExtraConfig.services[service.name];
                                const type =
                                  typeof currentService === "string"
                                    ? currentService
                                    : currentService.type;
                                ctx.state.ExtraConfig.services[service.name] = {
                                  type: type,
                                  port: port,
                                };
                              }
                            }
                          }}
                          class="w-20"
                          size="sm"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Button */}
          <div class="mt-6 flex justify-end">
            <button
              onClick$={handleSubmit}
              class="group rounded-lg bg-primary-500 px-6 py-2.5 font-medium text-white shadow-md 
                     shadow-primary-500/25 transition-all duration-200 hover:bg-primary-600 
                     focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 
                     active:scale-[0.98] dark:focus:ring-offset-surface-dark"
            >
              <span class="flex items-center space-x-2">
                <span>{$localize`Save`}</span>
                <svg
                  class="h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
