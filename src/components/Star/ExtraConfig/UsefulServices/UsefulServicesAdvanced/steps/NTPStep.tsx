import {
  component$,
  useSignal,
  $,
  useTask$,
  useContext,
} from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Card, CardHeader, CardBody, Input, Button } from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const NTPStep = component$(() => {
  const locale = useMessageLocale();
  // Get stepper and star contexts
  const context = useStepperContext<any>(UsefulServicesStepperContextId);
  const starCtx = useContext(StarContext);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const ntpServers = useSignal<string[]>(
    servicesData.ntp.servers || ["pool.ntp.org"],
  );
  const newServerInput = useSignal("");

  // Popular NTP servers for quick add
  const popularServers = [
    "pool.ntp.org",
    "time.google.com",
    "time.cloudflare.com",
    "time.windows.com",
    "time.nist.gov",
    "1.pool.ntp.org",
    "2.pool.ntp.org",
    "3.pool.ntp.org",
  ];

  // Add NTP server
  const addServer$ = $((server: string) => {
    if (server.trim() && !ntpServers.value.includes(server.trim())) {
      ntpServers.value = [...ntpServers.value, server.trim()];
      newServerInput.value = "";
    }
  });

  // Remove NTP server
  const removeServer$ = $((index: number) => {
    ntpServers.value = ntpServers.value.filter((_, i) => i !== index);
  });

  // Quick add popular server
  const addPopularServer$ = $((server: string) => {
    if (!ntpServers.value.includes(server)) {
      ntpServers.value = [...ntpServers.value, server];
    }
  });

  // Reactive task: Update contexts whenever ntpServers changes
  useTask$(({ track }) => {
    // Track the ntpServers signal - this task will run whenever it changes
    const servers = track(() => ntpServers.value);

    // Update context data with only servers property
    servicesData.ntp = {
      servers: servers,
    };

    // Update StarContext - explicit property assignment to avoid spread operator issues
    const currentServices = starCtx.state.ExtraConfig.usefulServices || {};
    starCtx.updateExtraConfig$({
      usefulServices: {
        certificate: currentServices.certificate,
        ntp: {
          servers: [...servers], // Create new array copy
        },
        graphing: currentServices.graphing,
        cloudDDNS: currentServices.cloudDDNS,
        upnp: currentServices.upnp,
        natpmp: currentServices.natpmp,
      },
    });

    // Validate: At least one NTP server must be configured
    const isComplete =
      servers.length > 0 && servers.every((server) => server.trim() !== "");

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 2,
    );
    if (currentStepIndex !== -1) {
      context.updateStepCompletion$(
        context.steps.value[currentStepIndex].id,
        isComplete,
      );
    }
  });

  return (
    <div class="animate-fade-in-up space-y-8">
      {/* Enhanced modern header with glassmorphism */}
      <div class="space-y-6 text-center">
        <div class="relative inline-flex items-center justify-center">
          {/* Subtle glow effect */}
          <div class="absolute inset-0 h-24 w-24 animate-pulse-slow rounded-3xl bg-gradient-to-br from-primary-500/15 via-secondary-500/15 to-primary-500/15"></div>
          <div class="relative inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white shadow-2xl shadow-primary-500/30 transition-all duration-500 hover:rotate-3 hover:scale-110 hover:shadow-primary-500/40">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-12 w-12 transition-transform duration-500 hover:rotate-12"
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
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="animate-gradient bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-300% bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:via-gray-200 dark:to-white md:text-5xl">
            {semanticMessages.useful_services_ntp_title({}, { locale })}
          </h3>
          <p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-400">
            {semanticMessages.useful_services_ntp_description(
              {},
              {
                locale,
              },
            )}
          </p>
        </div>
      </div>

      {/* NTP Servers Configuration with glassmorphism */}
      <Card class="relative overflow-hidden border border-gray-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
        <CardHeader class="relative">
          <div class="flex items-start justify-between">
            <div class="space-y-2">
              <h4 class="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 text-primary-600 dark:text-primary-400">
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
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                {semanticMessages.useful_services_ntp_servers_title(
                  {},
                  {
                    locale,
                  },
                )}
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {semanticMessages.useful_services_ntp_servers_description(
                  {},
                  { locale },
                )}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardBody class="space-y-6">
          {/* Current NTP Servers List */}
          <div class="space-y-4">
            <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
              {semanticMessages.useful_services_ntp_configured_servers(
                {},
                {
                  locale,
                },
              )}{" "}
              ({ntpServers.value.length})
            </h5>
            <div class="space-y-3">
              {ntpServers.value.map((server, index) => (
                <div
                  key={index}
                  class="group/item flex animate-fade-in-up items-center justify-between rounded-xl border border-primary-200/50 bg-gradient-to-r from-primary-50/50 to-secondary-50/50 p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary-500/10 dark:border-primary-700/30 dark:from-primary-900/20 dark:to-secondary-900/20"
                >
                  <div class="flex items-center gap-4">
                    <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 text-primary-600 transition-all duration-300 group-hover/item:rotate-6 group-hover/item:scale-110 dark:from-primary-800/50 dark:to-primary-700/50 dark:text-primary-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 transition-transform duration-300 group-hover/item:rotate-12"
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
                    </div>
                    <div>
                      <p class="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text font-semibold text-gray-900 text-transparent dark:from-white dark:to-gray-300 dark:text-white">
                        {server}
                      </p>
                      <p class="text-sm text-gray-600 dark:text-gray-400">
                        {index === 0 ? (
                          <span class="inline-flex items-center gap-1.5">
                            <span class="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                            {semanticMessages.useful_services_ntp_primary_server(
                              {},
                              { locale },
                            )}
                          </span>
                        ) : (
                          semanticMessages.useful_services_ntp_backup_server(
                            { index: String(index) },
                            { locale },
                          )
                        )}
                      </p>
                    </div>
                  </div>
                  {ntpServers.value.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick$={() => removeServer$(index)}
                      class="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add Custom Server */}
          <div class="space-y-4">
            <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
              {semanticMessages.useful_services_ntp_add_custom_server(
                {},
                {
                  locale,
                },
              )}
            </h5>
            <div class="flex gap-4">
              <div class="flex-1">
                <Input
                  type="text"
                  placeholder={semanticMessages.useful_services_ntp_server_placeholder(
                    {},
                    { locale },
                  )}
                  value={newServerInput.value}
                  onInput$={(e: any) => {
                    newServerInput.value = e.target.value;
                  }}
                  onKeyDown$={(e: KeyboardEvent) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addServer$(newServerInput.value);
                    }
                  }}
                />
              </div>
              <Button
                variant="outline"
                onClick$={() => addServer$(newServerInput.value)}
                disabled={!newServerInput.value.trim()}
              >
                {semanticMessages.useful_services_ntp_add_server(
                  {},
                  {
                    locale,
                  },
                )}
              </Button>
            </div>
          </div>

          {/* Popular Servers Quick Add */}
          <div class="space-y-4">
            <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
              {semanticMessages.useful_services_ntp_popular_servers(
                {},
                {
                  locale,
                },
              )}
            </h5>
            <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
              {popularServers
                .filter((server) => !ntpServers.value.includes(server))
                .map((server, _index) => (
                  <Button
                    key={server}
                    variant="ghost"
                    size="sm"
                    onClick$={() => addPopularServer$(server)}
                    class="group h-auto animate-fade-in-up rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 px-4 py-3 text-left transition-all duration-300 hover:scale-[1.02] hover:border-primary-300 hover:bg-gradient-to-br hover:from-primary-50 hover:to-secondary-50 hover:shadow-md dark:border-gray-700/50 dark:from-gray-800 dark:to-gray-900 dark:hover:border-primary-600 dark:hover:from-primary-900/20 dark:hover:to-secondary-900/20"
                  >
                    <div class="w-full space-y-1">
                      <p class="truncate text-sm font-medium text-gray-900 transition-colors group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                        {server}
                      </p>
                      <p class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        {semanticMessages.useful_services_ntp_click_to_add(
                          {},
                          { locale },
                        )}
                      </p>
                    </div>
                  </Button>
                ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
});
