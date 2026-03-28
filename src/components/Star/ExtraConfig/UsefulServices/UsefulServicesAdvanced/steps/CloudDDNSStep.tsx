import {
  component$,
  useSignal,
  $,
  useTask$,
  useContext,
} from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import {
  Select,
  Card,
  CardHeader,
  CardBody,
  Input,
  FormField,
  Toggle,
  Button,
} from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const CloudDDNSStep = component$(() => {
  const locale = useMessageLocale();
  // Get stepper and star contexts
  const context = useStepperContext<any>(UsefulServicesStepperContextId);
  const starCtx = useContext(StarContext);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableDDNS = useSignal(servicesData.cloudDDNS.enableDDNS || false);
  const ddnsEntries = useSignal(servicesData.cloudDDNS.ddnsEntries || []);

  // New DDNS entry form state
  const newEntryProvider = useSignal("no-ip");
  const newEntryHostname = useSignal("");
  const newEntryUsername = useSignal("");
  const newEntryPassword = useSignal("");
  const newEntryUpdateInterval = useSignal("30m");
  const newEntryCustomURL = useSignal("");

  // DDNS Provider options
  const providerOptions = [
    { value: "no-ip", label: "No-IP" },
    { value: "dyndns", label: "DynDNS" },
    { value: "duckdns", label: "Duck DNS" },
    { value: "cloudflare", label: "Cloudflare" },
    {
      value: "custom",
      label: semanticMessages.useful_services_ddns_custom_provider(
        {},
        {
          locale,
        },
      ),
    },
  ];

  // Update interval options
  const updateIntervalOptions = [
    {
      value: "5m",
      label: semanticMessages.useful_services_ddns_interval_5m(
        {},
        {
          locale,
        },
      ),
    },
    {
      value: "10m",
      label: semanticMessages.useful_services_ddns_interval_10m(
        {},
        {
          locale,
        },
      ),
    },
    {
      value: "30m",
      label: semanticMessages.useful_services_ddns_interval_30m(
        {},
        {
          locale,
        },
      ),
    },
    {
      value: "1h",
      label: semanticMessages.useful_services_ddns_interval_1h(
        {},
        {
          locale,
        },
      ),
    },
  ];

  // Add new DDNS entry
  const addDDNSEntry$ = $(() => {
    if (
      newEntryHostname.value.trim() &&
      newEntryUsername.value.trim() &&
      newEntryPassword.value.trim()
    ) {
      const newEntry = {
        id: `ddns-${Date.now()}`,
        provider: newEntryProvider.value,
        hostname: newEntryHostname.value.trim(),
        username: newEntryUsername.value.trim(),
        password: newEntryPassword.value.trim(),
        updateInterval: newEntryUpdateInterval.value,
        customServerURL:
          newEntryProvider.value === "custom"
            ? newEntryCustomURL.value.trim()
            : undefined,
      };

      ddnsEntries.value = [...ddnsEntries.value, newEntry];

      // Clear form
      newEntryHostname.value = "";
      newEntryUsername.value = "";
      newEntryPassword.value = "";
      newEntryCustomURL.value = "";

      validateAndUpdate$();
    }
  });

  // Remove DDNS entry
  const removeDDNSEntry$ = $((id: string) => {
    ddnsEntries.value = ddnsEntries.value.filter(
      (entry: any) => entry.id !== id,
    );
    validateAndUpdate$();
  });

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data with only ddnsEntries
    const entries = enableDDNS.value ? ddnsEntries.value : [];
    servicesData.cloudDDNS = {
      ddnsEntries: entries,
    };

    // Update StarContext - explicit property assignment to avoid spread operator issues
    const currentServices = starCtx.state.ExtraConfig.usefulServices || {};
    starCtx.updateExtraConfig$({
      usefulServices: {
        certificate: currentServices.certificate,
        ntp: currentServices.ntp,
        graphing: currentServices.graphing,
        cloudDDNS: {
          ddnsEntries: entries,
        },
        upnp: currentServices.upnp,
        natpmp: currentServices.natpmp,
      },
    });

    // Validate: DDNS is disabled or at least one valid entry exists
    const isComplete = !enableDDNS.value || ddnsEntries.value.length > 0;

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 4,
    );
    if (currentStepIndex !== -1) {
      context.updateStepCompletion$(
        context.steps.value[currentStepIndex].id,
        isComplete,
      );
    }
  });

  // Run validation on component mount and when values change
  useTask$(() => {
    if (typeof window === "undefined") {
      return;
    }

    validateAndUpdate$();
  });

  return (
    <div class="animate-fade-in-up space-y-8">
      {/* Modern header */}
      <div class="space-y-4 text-center">
        <div class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-500 text-white shadow-xl shadow-primary-500/25 transition-transform hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
            />
          </svg>
        </div>
        <h3 class="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300">
          {semanticMessages.useful_services_ddns_title({}, { locale })}
        </h3>
        <p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-400">
          {semanticMessages.useful_services_ddns_description(
            {},
            {
              locale,
            },
          )}
        </p>
      </div>

      {/* Dynamic DNS Section */}
      <div class="space-y-6">
        {/* DDNS Enable Toggle */}
        <Card class="border-2 border-primary-200/50 bg-gradient-to-br from-primary-50 to-primary-100 shadow-lg dark:border-primary-700/50 dark:from-primary-900/20 dark:to-primary-800/20">
          <CardHeader>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-7"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                    />
                  </svg>
                </div>
                <div>
                  <h4 class="text-xl font-bold text-gray-900 dark:text-white">
                    {semanticMessages.useful_services_ddns_enable(
                      {},
                      {
                        locale,
                      },
                    )}
                  </h4>
                  <p class="text-gray-600 dark:text-gray-400">
                    {semanticMessages.useful_services_ddns_enable_description(
                      {},
                      { locale },
                    )}
                  </p>
                </div>
              </div>
              <Toggle
                checked={enableDDNS.value}
                onChange$={$((checked) => {
                  enableDDNS.value = checked;
                  validateAndUpdate$();
                })}
                size="lg"
                color="primary"
              />
            </div>
          </CardHeader>
        </Card>

        {/* Current DDNS Entries List */}
        {enableDDNS.value && ddnsEntries.value.length > 0 && (
          <Card class="animate-fade-in-up border-2 border-primary-200/50 bg-gradient-to-br from-primary-50 to-primary-100 shadow-lg dark:border-primary-700/50 dark:from-primary-900/20 dark:to-primary-800/20">
            <CardHeader>
              <h4 class="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary-600 dark:text-primary-400"
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
                {semanticMessages.useful_services_ddns_configured_entries(
                  {},
                  { locale },
                )}{" "}
                ({ddnsEntries.value.length})
              </h4>
            </CardHeader>
            <CardBody>
              <div class="space-y-4">
                {ddnsEntries.value.map((entry: any) => {
                  const provider = providerOptions.find(
                    (p) => p.value === entry.provider,
                  );
                  return (
                    <div
                      key={entry.id}
                      class="group/entry flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                    >
                      <div class="flex items-center gap-4">
                        <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-100 to-secondary-200 text-secondary-600 transition-all duration-300 group-hover/entry:rotate-6 group-hover/entry:scale-110 dark:from-secondary-800/50 dark:to-secondary-700/50 dark:text-secondary-300">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-7 w-7 transition-transform duration-300 group-hover/entry:rotate-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width={2}
                              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                            />
                          </svg>
                        </div>
                        <div>
                          <p class="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text font-semibold text-gray-900 text-transparent dark:from-white dark:to-gray-300 dark:text-white">
                            {entry.hostname}
                          </p>
                          <p class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <span class="inline-flex items-center gap-1">
                              <span class="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
                              {provider?.label}
                            </span>
                            •{" "}
                            {semanticMessages.useful_services_ddns_updates_every(
                              {},
                              { locale },
                            )}{" "}
                            {entry.updateInterval}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick$={() => removeDDNSEntry$(entry.id)}
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
                    </div>
                  );
                })}
              </div>
            </CardBody>
          </Card>
        )}

        {/* Add New DDNS Entry Form - shown only when enabled */}
        {enableDDNS.value && (
          <Card class="animate-fade-in-up border-2 border-primary-200/50 bg-gradient-to-br from-primary-50 to-primary-100 shadow-lg dark:border-primary-700/50 dark:from-primary-900/20 dark:to-primary-800/20">
            <CardHeader>
              <h4 class="flex items-center gap-3 text-xl font-bold text-gray-900 dark:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-primary-600 dark:text-primary-400"
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
                {semanticMessages.useful_services_ddns_add_entry(
                  {},
                  {
                    locale,
                  },
                )}
              </h4>
              <p class="text-gray-600 dark:text-gray-400">
                {semanticMessages.useful_services_ddns_add_entry_description(
                  {},
                  { locale },
                )}
              </p>
            </CardHeader>
            <CardBody class="space-y-6">
              <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  label={semanticMessages.useful_services_ddns_provider_label(
                    {},
                    { locale },
                  )}
                  helperText={semanticMessages.useful_services_ddns_provider_helper(
                    {},
                    { locale },
                  )}
                >
                  <Select
                    options={providerOptions}
                    value={newEntryProvider.value}
                    onChange$={(value) => {
                      newEntryProvider.value = Array.isArray(value)
                        ? value[0]
                        : value;
                    }}
                    clearable={false}
                  />
                </FormField>

                <FormField
                  label={semanticMessages.useful_services_ddns_update_interval_label(
                    {},
                    { locale },
                  )}
                  helperText={semanticMessages.useful_services_ddns_update_interval_helper(
                    {},
                    { locale },
                  )}
                >
                  <Select
                    options={updateIntervalOptions}
                    value={newEntryUpdateInterval.value}
                    onChange$={(value) => {
                      newEntryUpdateInterval.value = Array.isArray(value)
                        ? value[0]
                        : value;
                    }}
                    clearable={false}
                  />
                </FormField>
              </div>

              {/* Custom Server URL for custom provider */}
              {newEntryProvider.value === "custom" && (
                <FormField
                  label={semanticMessages.useful_services_ddns_custom_url_label(
                    {},
                    { locale },
                  )}
                  required
                  helperText={semanticMessages.useful_services_ddns_custom_url_helper(
                    {},
                    { locale },
                  )}
                >
                  <Input
                    type="text"
                    placeholder={semanticMessages.useful_services_ddns_custom_url_placeholder(
                      {},
                      { locale },
                    )}
                    value={newEntryCustomURL.value}
                    onInput$={(e: any) => {
                      newEntryCustomURL.value = e.target.value;
                    }}
                  />
                </FormField>
              )}

              <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
                <FormField
                  label={semanticMessages.useful_services_ddns_hostname_label(
                    {},
                    { locale },
                  )}
                  required
                  helperText={semanticMessages.useful_services_ddns_hostname_helper(
                    {},
                    { locale },
                  )}
                >
                  <Input
                    type="text"
                    placeholder={semanticMessages.useful_services_ddns_hostname_placeholder(
                      {},
                      { locale },
                    )}
                    value={newEntryHostname.value}
                    onInput$={(e: any) => {
                      newEntryHostname.value = e.target.value;
                    }}
                  />
                </FormField>

                <FormField
                  label={semanticMessages.useful_services_ddns_username_label(
                    {},
                    { locale },
                  )}
                  required
                  helperText={semanticMessages.useful_services_ddns_username_helper(
                    {},
                    { locale },
                  )}
                >
                  <Input
                    type="text"
                    placeholder={semanticMessages.useful_services_ddns_username_placeholder(
                      {},
                      { locale },
                    )}
                    value={newEntryUsername.value}
                    onInput$={(e: any) => {
                      newEntryUsername.value = e.target.value;
                    }}
                  />
                </FormField>

                <FormField
                  label={semanticMessages.useful_services_ddns_password_label(
                    {},
                    { locale },
                  )}
                  required
                  helperText={semanticMessages.useful_services_ddns_password_helper(
                    {},
                    { locale },
                  )}
                >
                  <Input
                    type="password"
                    placeholder={semanticMessages.useful_services_ddns_password_placeholder(
                      {},
                      { locale },
                    )}
                    value={newEntryPassword.value}
                    onInput$={(e: any) => {
                      newEntryPassword.value = e.target.value;
                    }}
                  />
                </FormField>
              </div>

              <div class="flex justify-end">
                <Button
                  onClick$={addDDNSEntry$}
                  disabled={
                    !newEntryHostname.value.trim() ||
                    !newEntryUsername.value.trim() ||
                    !newEntryPassword.value.trim()
                  }
                  class="px-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="mr-2 h-4 w-4"
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
                  {semanticMessages.useful_services_ddns_add_entry(
                    {},
                    {
                      locale,
                    },
                  )}
                </Button>
              </div>
            </CardBody>
          </Card>
        )}
      </div>

      {/* Bottom status indicator - only show when active */}
      {enableDDNS.value && ddnsEntries.value.length > 0 && (
        <div class="text-center">
          <div class="inline-flex items-center gap-3 rounded-full border border-primary-200/50 bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-3 text-sm dark:border-primary-700/50 dark:from-primary-900/30 dark:to-primary-800/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-primary-600 dark:text-primary-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13a3 3 0 00-6 0l3 3 3-3z"
              />
            </svg>
            <span class="font-medium text-primary-700 dark:text-primary-300">
              {ddnsEntries.value.length === 1
                ? semanticMessages.useful_services_ddns_summary_singular(
                    { count: String(ddnsEntries.value.length) },
                    { locale },
                  )
                : semanticMessages.useful_services_ddns_summary_plural(
                    { count: String(ddnsEntries.value.length) },
                    { locale },
                  )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});
