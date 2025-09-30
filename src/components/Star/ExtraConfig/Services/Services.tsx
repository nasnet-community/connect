import {
  $,
  component$,
  useContext,
  useTask$,
  useStylesScoped$,
  useSignal,
} from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { StarContext } from "../../StarContext/StarContext";
import type { ServiceType, services } from "../../StarContext/ExtraType";
import { Select } from "~/components/Core/Select";
import {
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "~/components/Core";

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

  // State for port change confirmation
  const showConfirmDialog = useSignal(false);
  const pendingPortChange = useSignal<{
    serviceName: ServiceName;
    serviceDescription: string;
    oldPort: number;
    newPort: number;
  } | null>(null);

  // State for one-time port warning
  const showInitialWarning = useSignal(false);
  const hasShownPortWarning = useSignal(false);

  // State for temporary input values (to handle editing without immediate state update)
  const tempPortValues = useSignal<Record<ServiceName, string>>({} as Record<ServiceName, string>);

  // Define services array before using it in hooks
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

  // Initialize services if they don't exist
  useTask$(() => {
    if (!ctx.state.ExtraConfig.services) {
      const defaultServices: services = {
        api: { type: "Local" as ServiceType, port: 8728 },
        apissl: { type: "Local" as ServiceType, port: 8729 },
        ftp: { type: "Local" as ServiceType, port: 21 },
        ssh: { type: "Local" as ServiceType, port: 22 },
        telnet: { type: "Local" as ServiceType, port: 23 },
        winbox: { type: "Enable" as ServiceType, port: 8291 },
        web: { type: "Local" as ServiceType, port: 80 },
        webssl: { type: "Local" as ServiceType, port: 443 },
      };
      ctx.state.ExtraConfig.services = defaultServices;
    }
  });


  // Initialize temp port values when services are available
  useTask$(({ track }) => {
    const currentServices = track(() => ctx.state.ExtraConfig.services);
    if (currentServices) {
      const newTempValues = {} as Record<ServiceName, string>;
      services.forEach((service) => {
        const currentConfig = currentServices[service.name];
        const currentPort = typeof currentConfig === "string"
          ? service.defaultPort
          : currentConfig?.port || service.defaultPort;
        newTempValues[service.name] = currentPort.toString();
      });
      tempPortValues.value = newTempValues;
    }
  });

  // Helper function to get current port value for display
  const getCurrentPortValue = (serviceName: ServiceName, defaultPort: number): string => {
    // Return temp value if exists, otherwise return actual port value
    if (tempPortValues.value[serviceName]) {
      return tempPortValues.value[serviceName];
    }

    const currentConfig = ctx.state.ExtraConfig.services?.[serviceName];
    const currentPort = typeof currentConfig === "string"
      ? defaultPort
      : currentConfig?.port || defaultPort;
    return currentPort.toString();
  };

  // Helper function to update temp port value
  const updateTempPortValue = $((serviceName: ServiceName, value: string) => {
    tempPortValues.value = {
      ...tempPortValues.value,
      [serviceName]: value
    };
  });

  const handleSubmit = $(() => {
    if (!ctx.state.ExtraConfig.services) return;

    // Services are already updated via onChange handlers
    onComplete$();
  });

  // Handle port change confirmation
  const handlePortChangeRequest = $((
    service: ServiceItem,
    currentPort: number,
    newPort: number
  ) => {
    // Check if the port is actually changing
    if (currentPort === newPort) return;

    // Safeguard: Don't show dialog if it's already open
    if (showConfirmDialog.value || showInitialWarning.value) {
      // Reset temp value to current port if dialog is already showing
      updateTempPortValue(service.name, currentPort.toString());
      return;
    }

    // Store pending change for later
    pendingPortChange.value = {
      serviceName: service.name,
      serviceDescription: service.description,
      oldPort: currentPort,
      newPort: newPort,
    };

    // Check if we need to show the one-time warning first
    if (!hasShownPortWarning.value) {
      showInitialWarning.value = true;
    } else {
      // If warning has already been shown, go directly to confirmation dialog
      showConfirmDialog.value = true;
    }
  });

  // Handle port input blur event
  const handlePortBlur$ = $(async (
    event: FocusEvent,
    service: ServiceItem,
    currentPort: number
  ) => {
    const target = event.target as HTMLInputElement;
    const newPortStr = target.value;
    const newPort = parseInt(newPortStr);

    // Validate the input
    if (isNaN(newPort) || newPort < 1 || newPort > 65535) {
      // Reset invalid input to current port
      updateTempPortValue(service.name, currentPort.toString());
      return;
    }

    // Check if the port actually changed
    if (newPort !== currentPort) {
      // Initialize services if they don't exist
      if (!ctx.state.ExtraConfig.services) {
        ctx.state.ExtraConfig.services = {
          api: { type: "Local" as ServiceType, port: 8728 },
          apissl: { type: "Local" as ServiceType, port: 8729 },
          ftp: { type: "Local" as ServiceType, port: 21 },
          ssh: { type: "Enable" as ServiceType, port: 22 },
          telnet: { type: "Local" as ServiceType, port: 23 },
          winbox: { type: "Enable" as ServiceType, port: 8291 },
          web: { type: "Local" as ServiceType, port: 80 },
          webssl: { type: "Local" as ServiceType, port: 443 },
        };
      }

      // Request confirmation for port change
      await handlePortChangeRequest(service, currentPort, newPort);
    }
  });

  // Apply the confirmed port change
  const applyPortChange = $(() => {
    if (!pendingPortChange.value || !ctx.state.ExtraConfig.services) return;

    const { serviceName, newPort } = pendingPortChange.value;
    const currentService = ctx.state.ExtraConfig.services[serviceName];
    const type =
      typeof currentService === "string"
        ? currentService
        : currentService.type;

    // Mutate the existing proxy directly (Qwik best practice)
    ctx.state.ExtraConfig.services[serviceName] = {
      type: type,
      port: newPort,
    };

    // Update temp value to match confirmed change
    tempPortValues.value = {
      ...tempPortValues.value,
      [serviceName]: newPort.toString()
    };

    // Clear pending state and close dialog
    pendingPortChange.value = null;
    showConfirmDialog.value = false;
  });

  // Cancel port change
  const cancelPortChange = $(() => {
    // Reset temp value to actual value when cancelling
    if (pendingPortChange.value) {
      const { serviceName, oldPort } = pendingPortChange.value;
      tempPortValues.value = {
        ...tempPortValues.value,
        [serviceName]: oldPort.toString()
      };
    }

    pendingPortChange.value = null;
    showConfirmDialog.value = false;
  });

  // Handle acknowledging the initial warning
  const acknowledgeWarning = $(() => {
    // Mark warning as shown for this session
    hasShownPortWarning.value = true;

    // Close warning dialog
    showInitialWarning.value = false;

    // Now show the actual port change confirmation
    if (pendingPortChange.value) {
      showConfirmDialog.value = true;
    }
  });

  // Cancel initial warning
  const cancelWarning = $(() => {
    // Reset temp value to actual value when cancelling
    if (pendingPortChange.value) {
      const { serviceName, oldPort } = pendingPortChange.value;
      tempPortValues.value = {
        ...tempPortValues.value,
        [serviceName]: oldPort.toString()
      };
    }

    pendingPortChange.value = null;
    showInitialWarning.value = false;
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
                                ctx.state.ExtraConfig.services = {
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
                                };
                              }

                              if (ctx.state.ExtraConfig.services) {
                                const currentService =
                                  ctx.state.ExtraConfig.services[service.name];
                                const port =
                                  typeof currentService === "string"
                                    ? service.defaultPort
                                    : currentService.port ||
                                      service.defaultPort;
                                
                                // Mutate the existing proxy directly (Qwik best practice)
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
                          value={getCurrentPortValue(service.name, service.defaultPort)}
                          onInput$={(event: Event, value: string) => {
                            updateTempPortValue(service.name, value);
                          }}
                          onBlur$={(event: FocusEvent) => handlePortBlur$(event, service, currentPort)}
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

      {/* Initial Port Warning Dialog - Shows only once */}
      <Dialog
        isOpen={showInitialWarning}
        onClose$={cancelWarning}
        ariaLabel="Port Change Warning"
        size="md"
        isCentered={true}
      >
        <DialogHeader>
          <div class="flex items-center space-x-3">
            <div class="rounded-full bg-warning-100 p-2 dark:bg-warning-900/30">
              <svg
                class="h-7 w-7 text-warning-600 dark:text-warning-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <span class="text-xl font-semibold text-text dark:text-text-dark-default">
              {$localize`Important Notice`}
            </span>
          </div>
        </DialogHeader>
        <DialogBody>
          <div class="space-y-4">
            <div class="rounded-lg border-2 border-warning-300 bg-warning-50 p-4 dark:border-warning-700 dark:bg-warning-900/20">
              <div class="flex items-start space-x-3">
                <svg
                  class="mt-0.5 h-5 w-5 flex-shrink-0 text-warning-600 dark:text-warning-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="space-y-2">
                  <p class="font-semibold text-warning-800 dark:text-warning-300">
                    {$localize`Always remember or write down the new port numbers!`}
                  </p>
                  <p class="text-sm text-warning-700 dark:text-warning-400">
                    {$localize`When you change service ports, you will need the new port numbers to connect to your router. Make sure to document them in a safe place.`}
                  </p>
                </div>
              </div>
            </div>
            <div class="space-y-2 text-text-secondary dark:text-text-dark-secondary">
              <p class="text-sm">
                {$localize`This warning will only appear once. Please take note of:`}
              </p>
              <ul class="ml-5 list-disc space-y-1 text-sm">
                <li>{$localize`Write down all custom port numbers`}</li>
                <li>{$localize`Save them in a secure location`}</li>
                <li>{$localize`You'll need them to access your router services`}</li>
                <li>{$localize`Losing port numbers may lock you out of certain services`}</li>
              </ul>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div class="flex justify-end gap-3">
            <Button variant="outline" onClick$={cancelWarning}>
              {$localize`Cancel`}
            </Button>
            <Button
              variant="primary"
              onClick$={acknowledgeWarning}
              class="bg-warning-500 hover:bg-warning-600 dark:bg-warning-600 dark:hover:bg-warning-700"
            >
              <span class="flex items-center space-x-2">
                <svg
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{$localize`I Understand`}</span>
              </span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      {/* Port Change Confirmation Dialog */}
      {pendingPortChange.value && (
        <Dialog
          isOpen={showConfirmDialog}
          onClose$={cancelPortChange}
          ariaLabel="Confirm Port Change"
          size="md"
          isCentered={true}
        >
          <DialogHeader>
            <div class="flex items-center space-x-2">
              <svg
                class="h-6 w-6 text-warning-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span class="text-lg font-semibold">
                {$localize`Confirm Port Change`}
              </span>
            </div>
          </DialogHeader>
          <DialogBody>
            <div class="space-y-4">
              <p class="text-text dark:text-text-dark-default">
                {$localize`You are about to change the port for`}{" "}
                <span class="font-semibold">
                  {pendingPortChange.value.serviceDescription}
                </span>
                :
              </p>
              <div class="rounded-lg border border-border bg-surface-secondary p-4 dark:border-border-dark dark:bg-surface-dark-secondary">
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-text-secondary dark:text-text-dark-secondary">
                      {$localize`Service`}:
                    </span>
                    <span class="font-mono font-semibold text-text dark:text-text-dark-default">
                      {pendingPortChange.value.serviceName}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary dark:text-text-dark-secondary">
                      {$localize`Current Port`}:
                    </span>
                    <span class="font-mono text-text dark:text-text-dark-default">
                      {pendingPortChange.value.oldPort}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary dark:text-text-dark-secondary">
                      {$localize`New Port`}:
                    </span>
                    <span class="font-mono font-semibold text-primary-500">
                      {pendingPortChange.value.newPort}
                    </span>
                  </div>
                </div>
              </div>
              {pendingPortChange.value.serviceName === "ssh" &&
                pendingPortChange.value.newPort !== 22 && (
                  <div class="rounded-md bg-warning-50 p-3 dark:bg-warning-900/20">
                    <p class="text-sm text-warning-700 dark:text-warning-400">
                      <strong>{$localize`Warning`}:</strong>{" "}
                      {$localize`Changing the SSH port from the default (22) may affect your ability to connect to the router. Make sure you remember the new port number.`}
                    </p>
                  </div>
                )}
              {(pendingPortChange.value.serviceName === "web" ||
                pendingPortChange.value.serviceName === "webssl") &&
                (pendingPortChange.value.newPort !== 80 &&
                  pendingPortChange.value.newPort !== 443) && (
                  <div class="rounded-md bg-info-50 p-3 dark:bg-info-900/20">
                    <p class="text-sm text-info-700 dark:text-info-400">
                      <strong>{$localize`Note`}:</strong>{" "}
                      {$localize`You will need to specify the port number in the URL when accessing the web interface.`}
                    </p>
                  </div>
                )}
            </div>
          </DialogBody>
          <DialogFooter>
            <div class="flex justify-end gap-3">
              <Button variant="outline" onClick$={cancelPortChange}>
                {$localize`Cancel`}
              </Button>
              <Button variant="primary" onClick$={applyPortChange}>
                {$localize`Confirm Change`}
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
});
