import {
  component$,
  useSignal,
  $,
  useTask$,
  useContext,
} from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import {
  SelectionCard,
  Card,
  CardHeader,
  Toggle,
  Alert,
} from "~/components/Core";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const UPNPStep = component$(() => {
  const locale = useMessageLocale();
  // Get stepper and star contexts
  const context = useStepperContext<any>(UsefulServicesStepperContextId);
  const starCtx = useContext(StarContext);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const upnpEnabled = useSignal(servicesData.upnp?.enabled || false);
  const linkType = useSignal(servicesData.upnp?.linkType || "");

  // Link type options
  const linkTypeOptions = [
    {
      id: "domestic",
      title: semanticMessages.useful_services_upnp_domestic_link(
        {},
        {
          locale,
        },
      ),
      description: semanticMessages.useful_services_upnp_local_connection(
        {},
        {
          locale,
        },
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
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
      colorTheme: "primary",
      recommended: true,
    },
    {
      id: "foreign",
      title: semanticMessages.useful_services_upnp_foreign_link(
        {},
        {
          locale,
        },
      ),
      description: semanticMessages.useful_services_upnp_external_connection(
        {},
        { locale },
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
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
      ),
      colorTheme: "primary",
    },
    {
      id: "vpn",
      title: semanticMessages.useful_services_upnp_vpn_link({}, { locale }),
      description: semanticMessages.useful_services_upnp_vpn_connection(
        {},
        {
          locale,
        },
      ),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-8 w-8"
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
      colorTheme: "primary",
      warning: true,
    },
  ];

  // Color theme mappings using primary colors
  const colorThemes = {
    primary: {
      bg: "from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20",
      border: "border-primary-200/50 dark:border-primary-700/50",
      icon: "bg-gradient-to-br from-primary-500 to-primary-600",
      selectedBg:
        "from-primary-100 to-primary-200 dark:from-primary-800/40 dark:to-primary-700/40",
      selectedBorder: "border-primary-400/60 dark:border-primary-500/60",
    },
  };

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data with only linkType
    const selectedLinkType = upnpEnabled.value ? linkType.value : "";
    servicesData.upnp = {
      linkType: selectedLinkType,
    };

    // Update StarContext - explicit property assignment to avoid spread operator issues
    const currentServices = starCtx.state.ExtraConfig.usefulServices || {};
    starCtx.updateExtraConfig$({
      usefulServices: {
        certificate: currentServices.certificate,
        ntp: currentServices.ntp,
        graphing: currentServices.graphing,
        cloudDDNS: currentServices.cloudDDNS,
        upnp: {
          linkType: selectedLinkType,
        },
        natpmp: currentServices.natpmp,
      },
    });

    // Validate: Step is complete when UPNP is disabled or when enabled with a link type selected
    const isComplete =
      !upnpEnabled.value || (upnpEnabled.value && linkType.value);

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 5, // UPNP step ID
    );
    if (currentStepIndex !== -1) {
      context.updateStepCompletion$(
        context.steps.value[currentStepIndex].id,
        isComplete,
      );
    }
  });

  // Handle link type selection
  const handleLinkTypeSelect$ = $((selectedType: string) => {
    linkType.value = selectedType;
    validateAndUpdate$();
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
              d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
            />
          </svg>
        </div>
        <h3 class="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300">
          {semanticMessages.useful_services_upnp_title({}, { locale })}
        </h3>
        <p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-400">
          {semanticMessages.useful_services_upnp_description(
            {},
            {
              locale,
            },
          )}
        </p>
      </div>

      {/* UPnP Enable Toggle */}
      <Card class="border-2 border-primary-200/50 bg-gradient-to-br from-primary-50 to-primary-100 shadow-lg dark:border-primary-700/50 dark:from-primary-900/20 dark:to-primary-800/20">
        <CardHeader>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <div class="flex h-16 w-16 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
                  />
                </svg>
              </div>
              <div>
                <h4 class="text-2xl font-bold text-gray-900 dark:text-white">
                  {semanticMessages.useful_services_upnp_enable({}, { locale })}
                </h4>
                <p class="mt-1 text-gray-600 dark:text-gray-400">
                  {semanticMessages.useful_services_upnp_enable_description(
                    {},
                    { locale },
                  )}
                </p>
                <div class="mt-3 flex items-center gap-3">
                  <span class="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-400">
                    {semanticMessages.useful_services_upnp_auto_port_forwarding(
                      {},
                      { locale },
                    )}
                  </span>
                  <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900/50 dark:text-green-400">
                    {semanticMessages.useful_services_upnp_device_discovery(
                      {},
                      { locale },
                    )}
                  </span>
                </div>
              </div>
            </div>
            <Toggle
              checked={upnpEnabled.value}
              onChange$={$((checked) => {
                upnpEnabled.value = checked;
                validateAndUpdate$();
              })}
              size="lg"
              color="primary"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Link Type Selection - shown only when UPnP is enabled */}
      {upnpEnabled.value && (
        <div class="animate-fade-in-up space-y-6">
          <div class="text-center">
            <h4 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
              {semanticMessages.useful_services_upnp_choose_link_type(
                {},
                {
                  locale,
                },
              )}
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              {semanticMessages.useful_services_upnp_choose_link_type_description(
                {},
                { locale },
              )}
            </p>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
            {linkTypeOptions.map((option) => {
              const theme = colorThemes.primary;
              const isSelected = linkType.value === option.id;
              return (
                <SelectionCard
                  key={option.id}
                  isSelected={isSelected}
                  title={option.title}
                  description={option.description}
                  icon={
                    <div
                      class={`flex h-16 w-16 items-center justify-center rounded-2xl ${theme.icon} text-white shadow-lg transition-transform group-hover:scale-110`}
                    >
                      {option.icon}
                    </div>
                  }
                  onClick$={() => handleLinkTypeSelect$(option.id)}
                  class={`bg-gradient-to-br transition-all duration-300 hover:scale-105 hover:shadow-2xl ${isSelected ? theme.selectedBg : theme.bg} border-2 ${isSelected ? theme.selectedBorder : theme.border} ${option.warning && isSelected ? "ring-2 ring-primary-400 dark:ring-primary-500" : ""}`}
                />
              );
            })}
          </div>

          {/* VPN Warning */}
          {linkType.value === "vpn" && (
            <Alert
              status="warning"
              title={semanticMessages.useful_services_upnp_vpn_warning_title(
                {},
                { locale },
              )}
              class="animate-fade-in-up border-0 bg-gradient-to-r from-amber-50 to-orange-50 shadow-lg dark:from-amber-900/20 dark:to-orange-900/20"
            >
              <div class="text-sm text-amber-800 dark:text-amber-300">
                <p class="mb-2">
                  {semanticMessages.useful_services_upnp_vpn_warning_intro(
                    {},
                    {
                      locale,
                    },
                  )}
                </p>
                <ul class="ml-4 space-y-1">
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 text-amber-600 dark:text-amber-400">
                      •
                    </span>
                    {semanticMessages.useful_services_upnp_vpn_warning_forwarding(
                      {},
                      { locale },
                    )}
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 text-amber-600 dark:text-amber-400">
                      •
                    </span>
                    {semanticMessages.useful_services_upnp_vpn_warning_multicast(
                      {},
                      { locale },
                    )}
                  </li>
                  <li class="flex items-start gap-2">
                    <span class="mt-0.5 text-amber-600 dark:text-amber-400">
                      •
                    </span>
                    {semanticMessages.useful_services_upnp_vpn_warning_remote_devices(
                      {},
                      { locale },
                    )}
                  </li>
                </ul>
                <p class="mt-3 font-medium text-amber-900 dark:text-amber-200">
                  ⚠️{" "}
                  {semanticMessages.useful_services_upnp_vpn_warning_footer(
                    {},
                    { locale },
                  )}
                </p>
              </div>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
});
