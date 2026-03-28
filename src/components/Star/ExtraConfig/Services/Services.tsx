import {
  $,
  component$,
  useContext,
  useTask$,
  useStylesScoped$,
  useSignal,
  useComputed$,
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
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

const dropdownStyles = `
  .dropdown-container {
    position: relative;
    z-index: 0;
  }

  .dropdown-container:hover,
  .dropdown-container:focus-within {
    z-index: 50;
  }

  :global(.dropdown-container [role="listbox"]) {
    z-index: 50 !important;
    position: absolute !important;
    max-height: 200px !important;
  }

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
  const locale = useMessageLocale();
  const ctx = useContext(StarContext);

  useStylesScoped$(dropdownStyles);

  const showConfirmDialog = useSignal(false);
  const pendingPortChange = useSignal<{
    serviceName: ServiceName;
    serviceDescription: string;
    oldPort: number;
    newPort: number;
  } | null>(null);

  const showInitialWarning = useSignal(false);
  const hasShownPortWarning = useSignal(false);
  const warningCloseByAcknowledge = useSignal(false);

  const tempPortValues = useSignal<Record<ServiceName, string>>(
    {} as Record<ServiceName, string>,
  );

  const services: ServiceItem[] = [
    {
      name: "api",
      description: semanticMessages.service_description_api({}, { locale }),
      recommended: false,
      defaultPort: 8728,
    },
    {
      name: "apissl",
      description: semanticMessages.service_description_apissl({}, { locale }),
      recommended: false,
      defaultPort: 8729,
    },
    {
      name: "ftp",
      description: semanticMessages.service_description_ftp({}, { locale }),
      recommended: false,
      defaultPort: 21,
    },
    {
      name: "ssh",
      description: semanticMessages.service_description_ssh({}, { locale }),
      recommended: false,
      defaultPort: 22,
    },
    {
      name: "telnet",
      description: semanticMessages.service_description_telnet({}, { locale }),
      recommended: false,
      defaultPort: 23,
    },
    {
      name: "winbox",
      description: semanticMessages.service_description_winbox({}, { locale }),
      recommended: true,
      defaultPort: 8291,
    },
    {
      name: "web",
      description: semanticMessages.service_description_web({}, { locale }),
      recommended: false,
      defaultPort: 80,
    },
    {
      name: "webssl",
      description: semanticMessages.service_description_webssl({}, { locale }),
      recommended: false,
      defaultPort: 443,
    },
  ];

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

  const isSSHVPNServerEnabled = useComputed$(() => {
    return ctx.state.LAN.VPNServer?.SSHServer?.enabled === true;
  });

  useTask$(({ track }) => {
    const sshVPNEnabled = track(
      () => ctx.state.LAN.VPNServer?.SSHServer?.enabled,
    );

    if (sshVPNEnabled && ctx.state.ExtraConfig.services) {
      const currentSSH = ctx.state.ExtraConfig.services.ssh;
      const currentType =
        typeof currentSSH === "string" ? currentSSH : currentSSH.type;

      if (currentType !== "Enable") {
        const currentPort =
          typeof currentSSH === "string" ? 22 : currentSSH.port || 22;
        ctx.state.ExtraConfig.services.ssh = {
          type: "Enable",
          port: currentPort,
        };
      }
    }
  });

  useTask$(({ track }) => {
    const currentServices = track(() => ctx.state.ExtraConfig.services);
    if (currentServices) {
      const newTempValues = {} as Record<ServiceName, string>;
      services.forEach((service) => {
        const currentConfig = currentServices[service.name];
        const currentPort =
          typeof currentConfig === "string"
            ? service.defaultPort
            : currentConfig.port || service.defaultPort;
        newTempValues[service.name] = currentPort.toString();
      });
      tempPortValues.value = newTempValues;
    }
  });

  const getCurrentPortValue = (
    serviceName: ServiceName,
    defaultPort: number,
  ): string => {
    if (tempPortValues.value[serviceName]) {
      return tempPortValues.value[serviceName];
    }

    const currentConfig = ctx.state.ExtraConfig.services?.[serviceName];
    const currentPort =
      typeof currentConfig === "string"
        ? defaultPort
        : currentConfig?.port || defaultPort;
    return currentPort.toString();
  };

  const updateTempPortValue = $((serviceName: ServiceName, value: string) => {
    tempPortValues.value = {
      ...tempPortValues.value,
      [serviceName]: value,
    };
  });

  const handleSubmit = $(() => {
    if (!ctx.state.ExtraConfig.services) return;
    onComplete$();
  });

  const handlePortChangeRequest = $(
    (service: ServiceItem, currentPort: number, newPort: number) => {
      if (currentPort === newPort) return;

      if (showConfirmDialog.value || showInitialWarning.value) {
        updateTempPortValue(service.name, currentPort.toString());
        return;
      }

      pendingPortChange.value = {
        serviceName: service.name,
        serviceDescription: service.description,
        oldPort: currentPort,
        newPort: newPort,
      };

      if (!hasShownPortWarning.value) {
        showInitialWarning.value = true;
      } else {
        showConfirmDialog.value = true;
      }
    },
  );

  const handlePortBlur$ = $(
    async (event: FocusEvent, service: ServiceItem, currentPort: number) => {
      const target = event.target as HTMLInputElement;
      const newPortStr = target.value;
      const newPort = parseInt(newPortStr);

      if (isNaN(newPort) || newPort < 1 || newPort > 65535) {
        updateTempPortValue(service.name, currentPort.toString());
        return;
      }

      if (newPort !== currentPort) {
        if (!ctx.state.ExtraConfig.services) {
          ctx.state.ExtraConfig.services = {
            api: { type: "Local" as ServiceType, port: 8728 },
            apissl: { type: "Local" as ServiceType, port: 8729 },
            ftp: { type: "Local" as ServiceType, port: 21 },
            ssh: { type: "Local" as ServiceType, port: 22 },
            telnet: { type: "Local" as ServiceType, port: 23 },
            winbox: { type: "Enable" as ServiceType, port: 8291 },
            web: { type: "Local" as ServiceType, port: 80 },
            webssl: { type: "Local" as ServiceType, port: 443 },
          };
        }

        await handlePortChangeRequest(service, currentPort, newPort);
      }
    },
  );

  const applyPortChange = $(() => {
    if (!pendingPortChange.value || !ctx.state.ExtraConfig.services) return;

    const { serviceName, newPort } = pendingPortChange.value;
    const currentService = ctx.state.ExtraConfig.services[serviceName];
    const type =
      typeof currentService === "string" ? currentService : currentService.type;

    ctx.state.ExtraConfig.services[serviceName] = {
      type: type,
      port: newPort,
    };

    tempPortValues.value = {
      ...tempPortValues.value,
      [serviceName]: newPort.toString(),
    };

    pendingPortChange.value = null;
    showConfirmDialog.value = false;
  });

  const cancelPortChange = $(() => {
    if (pendingPortChange.value) {
      const { serviceName, oldPort } = pendingPortChange.value;
      tempPortValues.value = {
        ...tempPortValues.value,
        [serviceName]: oldPort.toString(),
      };
    }

    pendingPortChange.value = null;
    showConfirmDialog.value = false;
  });

  const acknowledgeWarning = $(() => {
    hasShownPortWarning.value = true;
    warningCloseByAcknowledge.value = true;
    showInitialWarning.value = false;

    if (pendingPortChange.value) {
      showConfirmDialog.value = true;
    }
  });

  const cancelWarning = $(() => {
    if (warningCloseByAcknowledge.value) {
      warningCloseByAcknowledge.value = false;
      return;
    }

    if (pendingPortChange.value) {
      const { serviceName, oldPort } = pendingPortChange.value;
      tempPortValues.value = {
        ...tempPortValues.value,
        [serviceName]: oldPort.toString(),
      };
    }

    pendingPortChange.value = null;
    showInitialWarning.value = false;
  });

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
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
                {semanticMessages.services_header_title({}, { locale })}
              </h2>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium text-primary-50">
                  {semanticMessages.services_header_description({}, { locale })}
                </p>
                <span class="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white">
                  {services.length}{" "}
                  {semanticMessages.services_badge_label({}, { locale })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-6">
          <div class="overflow-visible rounded-xl border border-border dark:border-border-dark">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="bg-surface-secondary dark:bg-surface-dark-secondary border-b border-border dark:border-border-dark">
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {semanticMessages.shared_service({}, { locale })}
                  </th>
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {semanticMessages.shared_description({}, { locale })}
                  </th>
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {semanticMessages.shared_link({}, { locale })}
                  </th>
                  <th
                    scope="col"
                    class="text-text-secondary dark:text-text-dark-secondary px-6 py-4 font-semibold"
                  >
                    {semanticMessages.shared_port({}, { locale })}
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
                          {service.name === "ssh" &&
                            isSSHVPNServerEnabled.value && (
                              <span class="inline-flex items-center rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-700 dark:bg-primary-900/30 dark:text-primary-300">
                                {semanticMessages.services_ssh_required(
                                  {},
                                  { locale },
                                )}
                              </span>
                            )}
                        </div>
                      </td>
                      <td class="text-text-secondary dark:text-text-dark-secondary px-6 py-4">
                        {service.description}
                      </td>
                      <td class="px-6 py-4">
                        <div class="dropdown-container">
                          <Select
                            options={[
                              {
                                value: "Enable",
                                label: semanticMessages.shared_enable(
                                  {},
                                  { locale },
                                ),
                              },
                              {
                                value: "Disable",
                                label: semanticMessages.shared_disable(
                                  {},
                                  { locale },
                                ),
                              },
                              {
                                value: "Local",
                                label: semanticMessages.shared_local(
                                  {},
                                  { locale },
                                ),
                              },
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
                                    type: "Local" as ServiceType,
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

                              const currentService =
                                ctx.state.ExtraConfig.services[service.name];
                              const port =
                                typeof currentService === "string"
                                  ? service.defaultPort
                                  : (currentService.port ??
                                    service.defaultPort);

                              ctx.state.ExtraConfig.services[service.name] = {
                                type: value as ServiceType,
                                port: port,
                              };
                            }}
                            clearable={false}
                            disabled={
                              service.name === "ssh" &&
                              isSSHVPNServerEnabled.value
                            }
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
                          value={getCurrentPortValue(
                            service.name,
                            service.defaultPort,
                          )}
                          onInput$={(event: Event, value: string) => {
                            updateTempPortValue(service.name, value);
                          }}
                          onBlur$={(event: FocusEvent) =>
                            handlePortBlur$(event, service, currentPort)
                          }
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

          <div class="mt-6 flex justify-end">
            <button
              onClick$={handleSubmit}
              class="group rounded-lg bg-primary-500 px-6 py-2.5 font-medium text-white shadow-md 
                     shadow-primary-500/25 transition-all duration-200 hover:bg-primary-600 
                     focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 
                     active:scale-[0.98] dark:focus:ring-offset-surface-dark"
            >
              <span class="flex items-center space-x-2">
                <span>{semanticMessages.shared_save({}, { locale })}</span>
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

      <Dialog
        isOpen={showInitialWarning}
        onClose$={cancelWarning}
        ariaLabel={semanticMessages.services_port_warning_dialog_aria(
          {},
          { locale },
        )}
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
              {semanticMessages.reboot_notice_title({}, { locale })}
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
                    {semanticMessages.services_warning_title({}, { locale })}
                  </p>
                  <p class="text-sm text-warning-700 dark:text-warning-400">
                    {semanticMessages.services_warning_body({}, { locale })}
                  </p>
                </div>
              </div>
            </div>
            <div class="text-text-secondary dark:text-text-dark-secondary space-y-2">
              <p class="text-sm">
                {semanticMessages.services_warning_intro({}, { locale })}
              </p>
              <ul class="ml-5 list-disc space-y-1 text-sm">
                <li>
                  {semanticMessages.services_warning_item_write({}, { locale })}
                </li>
                <li>
                  {semanticMessages.services_warning_item_save({}, { locale })}
                </li>
                <li>
                  {semanticMessages.services_warning_item_access(
                    {},
                    { locale },
                  )}
                </li>
                <li>
                  {semanticMessages.services_warning_item_lockout(
                    {},
                    { locale },
                  )}
                </li>
              </ul>
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <div class="flex justify-end gap-3">
            <Button variant="outline" onClick$={cancelWarning}>
              {semanticMessages.shared_cancel({}, { locale })}
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
                <span>
                  {semanticMessages.services_warning_acknowledge(
                    {},
                    { locale },
                  )}
                </span>
              </span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>

      {pendingPortChange.value && (
        <Dialog
          isOpen={showConfirmDialog}
          onClose$={cancelPortChange}
          ariaLabel={semanticMessages.services_confirm_dialog_aria(
            {},
            { locale },
          )}
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
                {semanticMessages.services_confirm_title({}, { locale })}
              </span>
            </div>
          </DialogHeader>
          <DialogBody>
            <div class="space-y-4">
              <p class="text-text dark:text-text-dark-default">
                {semanticMessages.services_confirm_intro({}, { locale })}{" "}
                <span class="font-semibold">
                  {pendingPortChange.value.serviceDescription}
                </span>
                :
              </p>
              <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-lg border border-border p-4 dark:border-border-dark">
                <div class="space-y-2">
                  <div class="flex justify-between">
                    <span class="text-text-secondary dark:text-text-dark-secondary">
                      {semanticMessages.shared_service({}, { locale })}:
                    </span>
                    <span class="font-mono font-semibold text-text dark:text-text-dark-default">
                      {pendingPortChange.value.serviceName}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary dark:text-text-dark-secondary">
                      {semanticMessages.shared_current_port({}, { locale })}:
                    </span>
                    <span class="font-mono text-text dark:text-text-dark-default">
                      {pendingPortChange.value.oldPort}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-text-secondary dark:text-text-dark-secondary">
                      {semanticMessages.shared_new_port({}, { locale })}:
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
                      <strong>
                        {semanticMessages.shared_warning({}, { locale })}:
                      </strong>{" "}
                      {semanticMessages.services_ssh_port_warning(
                        {},
                        { locale },
                      )}
                    </p>
                  </div>
                )}
              {(pendingPortChange.value.serviceName === "web" ||
                pendingPortChange.value.serviceName === "webssl") &&
                pendingPortChange.value.newPort !== 80 &&
                pendingPortChange.value.newPort !== 443 && (
                  <div class="rounded-md bg-info-50 p-3 dark:bg-info-900/20">
                    <p class="text-sm text-info-700 dark:text-info-400">
                      <strong>
                        {semanticMessages.shared_note({}, { locale })}:
                      </strong>{" "}
                      {semanticMessages.services_web_port_note({}, { locale })}
                    </p>
                  </div>
                )}
            </div>
          </DialogBody>
          <DialogFooter>
            <div class="flex justify-end gap-3">
              <Button variant="outline" onClick$={cancelPortChange}>
                {semanticMessages.shared_cancel({}, { locale })}
              </Button>
              <Button variant="primary" onClick$={applyPortChange}>
                {semanticMessages.shared_confirm_change({}, { locale })}
              </Button>
            </div>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
});
