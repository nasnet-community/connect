import { $, component$, useContext, useTask$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { StarContext } from "../../StarContext/StarContext";
import type { ServiceType } from "../../StarContext/ExtraType";
import { Select } from "~/components/Core/Select/Select";

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
}

export const Services = component$<StepProps>(({ onComplete$ }) => {
  const ctx = useContext(StarContext);

  // Initialize services if they don't exist
  useTask$(() => {
    if (!ctx.state.ExtraConfig.services) {
      const defaultServices = {
        api: "Disable" as ServiceType,
        apissl: "Disable" as ServiceType,
        ftp: "Disable" as ServiceType,
        ssh: "Enable" as ServiceType,
        telnet: "Disable" as ServiceType,
        winbox: "Enable" as ServiceType,
        web: "Disable" as ServiceType,
        webssl: "Disable" as ServiceType,
      };
      ctx.updateExtraConfig$({ services: defaultServices });
    }
  });

  const services: ServiceItem[] = [
    {
      name: "api",
      description: $localize`RouterOS API access`,
      recommended: false,
    },
    {
      name: "apissl",
      description: $localize`RouterOS API with SSL`,
      recommended: false,
    },
    {
      name: "ftp",
      description: $localize`File Transfer Protocol`,
      recommended: false,
    },
    { name: "ssh", description: $localize`Secure Shell`, recommended: true },
    {
      name: "telnet",
      description: $localize`Telnet Protocol`,
      recommended: false,
    },
    {
      name: "winbox",
      description: $localize`WinBox Management Tool`,
      recommended: true,
    },
    {
      name: "web",
      description: $localize`Web Interface Access`,
      recommended: false,
    },
    {
      name: "webssl",
      description: $localize`Secure Web Interface`,
      recommended: false,
    },
  ];

  const handleSubmit = $(() => {
    if (!ctx.state.ExtraConfig.services) return;
    
    const api = ctx.state.ExtraConfig.services?.api || "Disable";
    const apissl = ctx.state.ExtraConfig.services?.apissl || "Disable";
    const ftp = ctx.state.ExtraConfig.services?.ftp || "Disable";
    const ssh = ctx.state.ExtraConfig.services?.ssh || "Enable";
    const telnet = ctx.state.ExtraConfig.services?.telnet || "Disable";
    const winbox = ctx.state.ExtraConfig.services?.winbox || "Enable";
    const web = ctx.state.ExtraConfig.services?.web || "Disable";
    const webssl = ctx.state.ExtraConfig.services?.webssl || "Disable";
    
    ctx.updateExtraConfig$({
      services: {
        api,
        apissl,
        ftp,
        ssh,
        telnet,
        winbox,
        web,
        webssl,
      },
    });
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
          <div class="overflow-hidden rounded-xl border border-border dark:border-border-dark">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-border bg-surface-secondary dark:border-border-dark dark:bg-surface-dark-secondary">
                  <th
                    scope="col"
                    class="px-6 py-4 font-semibold text-text-secondary dark:text-text-dark-secondary"
                  >
                    {$localize`Service`}
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 font-semibold text-text-secondary dark:text-text-dark-secondary"
                  >
                    {$localize`Description`}
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-4 font-semibold text-text-secondary dark:text-text-dark-secondary"
                  >
                    {$localize`Link`}
                  </th>
                </tr>
              </thead>

              <tbody class="divide-y divide-border dark:divide-border-dark">
              {services.map((service) => {
                  const currentValue = ctx.state.ExtraConfig.services?.[service.name] || "Disable";
                  return (
                    <tr
                      key={service.name}
                      class="bg-surface transition-colors hover:bg-surface-secondary dark:bg-surface-dark dark:hover:bg-surface-dark-secondary"
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
                      <td class="px-6 py-4 text-text-secondary dark:text-text-dark-secondary">
                        {service.description}
                      </td>
                      <td class="px-6 py-4">
                        <Select
                          options={[
                            { value: "Enable", label: $localize`Enable` },
                            { value: "Disable", label: $localize`Disable` },
                            { value: "Local", label: $localize`Local` }
                          ]}
                          value={currentValue}
                          onChange$={(value) => {
                            if (!ctx.state.ExtraConfig.services) {
                              ctx.updateExtraConfig$({
                                services: {
                                  api: "Disable" as ServiceType,
                                  apissl: "Disable" as ServiceType,
                                  ftp: "Disable" as ServiceType,
                                  ssh: "Enable" as ServiceType,
                                  telnet: "Disable" as ServiceType,
                                  winbox: "Enable" as ServiceType,
                                  web: "Disable" as ServiceType,
                                  webssl: "Disable" as ServiceType,
                                }
                              });
                            }
                            
                            if (ctx.state.ExtraConfig.services) {
                              ctx.state.ExtraConfig.services[service.name] = 
                                value as ServiceType;
                            }
                          }}
                          clearable={false}
                          class="w-full"
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
              class="focus:ring-primary-500/50 group rounded-lg bg-primary-500 px-6 py-2.5 font-medium text-white 
                     shadow-md shadow-primary-500/25 transition-all duration-200 
                     hover:bg-primary-600 focus:ring-2 focus:ring-offset-2 
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
