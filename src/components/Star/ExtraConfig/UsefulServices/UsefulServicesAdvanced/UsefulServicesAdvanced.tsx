import { component$, useStore, $ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { CStepper } from "~/components/Core/Stepper/CStepper/CStepper";
import type { CStepMeta } from "~/components/Core/Stepper/CStepper/types";
import { createStepperContext } from "~/components/Core/Stepper/CStepper/hooks/useStepperContext";
import type { AdvancedServicesData } from "../useUsefulServices";

// Import step components
import { CertificateStep } from "./steps/CertificateStep";
import { NTPStep } from "./steps/NTPStep";
import { GraphingStep } from "./steps/GraphingStep";
import { CloudDDNSStep } from "./steps/CloudDDNSStep";
import { UPNPStep } from "./steps/UPNPStep";
import { NATPMPStep } from "./steps/NATPMPStep";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

// Create context with services data type
export const UsefulServicesStepperContextId = createStepperContext<{
  servicesData: AdvancedServicesData;
}>("useful-services-stepper");

export const UsefulServicesAdvanced = component$<StepProps>(
  ({ onComplete$ }) => {
    const locale = useMessageLocale();
    // Initialize services data with defaults
    const servicesData = useStore<AdvancedServicesData>({
      certificate: {
        SelfSigned: false,
        LetsEncrypt: false,
      },
      ntp: {
        servers: ["pool.ntp.org"],
      },
      graphing: {
        Interface: false,
        Queue: false,
        Resources: false,
      },
      cloudDDNS: {
        ddnsEntries: [],
      },
      upnp: {
        linkType: "",
      },
      natpmp: {
        linkType: "",
      },
    });

    // Define the 6 steps
    const steps: CStepMeta[] = [
      {
        id: 1,
        title: semanticMessages.useful_services_step_certificate(
          {},
          { locale },
        ),
        description:
          semanticMessages.useful_services_step_certificate_description(
            {},
            { locale },
          ),
        component: <CertificateStep />,
        isComplete: false,
      },
      {
        id: 2,
        title: semanticMessages.useful_services_step_ntp({}, { locale }),
        description: semanticMessages.useful_services_step_ntp_description(
          {},
          {
            locale,
          },
        ),
        component: <NTPStep />,
        isComplete: false,
      },
      {
        id: 3,
        title: semanticMessages.useful_services_step_graphing({}, { locale }),
        description: semanticMessages.useful_services_step_graphing_description(
          {},
          { locale },
        ),
        component: <GraphingStep />,
        isComplete: false,
      },
      {
        id: 4,
        title: semanticMessages.useful_services_step_ddns({}, { locale }),
        description: semanticMessages.useful_services_step_ddns_description(
          {},
          {
            locale,
          },
        ),
        component: <CloudDDNSStep />,
        isComplete: false,
      },
      {
        id: 5,
        title: semanticMessages.useful_services_step_upnp({}, { locale }),
        description: semanticMessages.useful_services_step_upnp_description(
          {},
          {
            locale,
          },
        ),
        component: <UPNPStep />,
        isComplete: false,
      },
      {
        id: 6,
        title: semanticMessages.useful_services_step_natpmp({}, { locale }),
        description: semanticMessages.useful_services_step_natpmp_description(
          {},
          { locale },
        ),
        component: <NATPMPStep />,
        isComplete: false,
      },
    ];

    // Event handlers
    const handleStepComplete$ = $((id: number) => {
      console.log(`Services step ${id} completed`);
      // Handle any global step completion logic if needed
    });

    const handleStepChange$ = $((id: number) => {
      console.log(`Changed to services step ${id}`);
      // Handle step change logic if needed
    });

    const handleComplete$ = $(() => {
      console.log("All services steps completed!", servicesData);

      // Convert advanced configuration to the format expected by the global state
      // You can add logic here to save the advanced configuration to the global context

      // Call the parent onComplete callback
      onComplete$();
    });

    return (
      <div class="mx-auto w-full max-w-7xl animate-fade-in-up">
        {/* Simplified background decorative elements */}
        <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div class="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
          <div class="absolute right-1/4 top-1/4 h-80 w-80 animate-float rounded-full bg-gradient-to-br from-secondary-500/5 to-primary-500/5 animation-delay-2000"></div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-all duration-300 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800">
          {/* Simplified gradient border effect */}
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/10 via-secondary-500/5 to-primary-500/10 p-px">
            <div class="h-full w-full rounded-3xl bg-white dark:bg-gray-800"></div>
          </div>

          {/* Content container */}
          <div class="relative z-10">
            {/* Enhanced modern header section */}
            <div class="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 px-8 py-14">
              {/* Enhanced header background patterns */}
              <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div class="absolute right-0 top-0 h-64 w-64 -translate-y-32 translate-x-32 animate-pulse-slow rounded-full bg-white/5"></div>
              <div class="absolute bottom-0 left-0 h-48 w-48 -translate-x-24 translate-y-24 animate-float rounded-full bg-secondary-500/5"></div>

              <div class="relative flex flex-col items-start gap-8 md:flex-row md:items-center">
                <div class="group/icon flex h-24 w-24 items-center justify-center rounded-3xl border-2 border-white/30 bg-gradient-to-br from-white/25 to-white/15 transition-all duration-500 hover:rotate-3 hover:scale-110 hover:bg-white/35 hover:shadow-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-12 w-12 text-white transition-all duration-500 group-hover/icon:rotate-12 group-hover/icon:scale-110"
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
                <div class="flex-1 space-y-3">
                  <h2 class="animate-gradient bg-gradient-to-r from-white via-primary-100 to-white bg-clip-text text-4xl font-bold tracking-tight text-white md:text-5xl">
                    {semanticMessages.useful_services_title({}, { locale })}
                  </h2>
                  <p class="text-xl font-medium text-white/95">
                    {semanticMessages.useful_services_mode({}, { locale })}
                  </p>
                  <p class="max-w-2xl leading-relaxed text-primary-100/90">
                    {semanticMessages.useful_services_description(
                      {},
                      {
                        locale,
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Modern stepper content */}
            <div class="relative p-8">
              <CStepper
                steps={steps}
                activeStep={0}
                contextId={UsefulServicesStepperContextId}
                contextValue={{ servicesData }}
                onStepComplete$={handleStepComplete$}
                onStepChange$={handleStepChange$}
                onComplete$={handleComplete$}
                allowSkipSteps={true}
                useNumbers={true}
                hideStepHeader={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
);
