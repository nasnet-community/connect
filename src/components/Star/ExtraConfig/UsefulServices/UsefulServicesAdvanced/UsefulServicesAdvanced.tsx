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

// Create context with services data type
export const UsefulServicesStepperContextId = createStepperContext<{
  servicesData: AdvancedServicesData;
}>("useful-services-stepper");

export const UsefulServicesAdvanced = component$<StepProps>(
  ({ onComplete$ }) => {
    // Initialize services data with defaults
    const servicesData = useStore<AdvancedServicesData>({
      certificate: {
        enableSelfSigned: false,
        enableLetsEncrypt: false,
      },
      ntp: {
        servers: ["pool.ntp.org"],
        timeZone: "UTC",
        updateInterval: "1h",
      },
      graphing: {
        enableInterface: false,
        enableQueue: false,
        enableResources: false,
      },
      cloudDDNS: {
        enableDDNS: false,
        ddnsEntries: [],
      },
      upnp: {
        enabled: false,
        linkType: "domestic",
      },
      natpmp: {
        enabled: false,
        linkType: "domestic",
      },
    });

    // Define the 6 steps
    const steps: CStepMeta[] = [
      {
        id: 1,
        title: $localize`Certificate`,
        description: $localize`Configure SSL/TLS certificates`,
        component: <CertificateStep />,
        isComplete: false,
      },
      {
        id: 2,
        title: $localize`NTP Time Sync`,
        description: $localize`Setup time synchronization`,
        component: <NTPStep />,
        isComplete: false,
      },
      {
        id: 3,
        title: $localize`Graphing`,
        description: $localize`Configure network monitoring graphs`,
        component: <GraphingStep />,
        isComplete: false,
      },
      {
        id: 4,
        title: $localize`Dynamic DNS`,
        description: $localize`Configure dynamic DNS providers`,
        component: <CloudDDNSStep />,
        isComplete: false,
      },
      {
        id: 5,
        title: $localize`UPnP`,
        description: $localize`Universal Plug and Play configuration`,
        component: <UPNPStep />,
        isComplete: false,
      },
      {
        id: 6,
        title: $localize`NAT-PMP`,
        description: $localize`NAT Port Mapping Protocol setup`,
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
      <div class="mx-auto w-full max-w-6xl p-4">
        {/* Background decorative elements */}
        <div class="fixed inset-0 -z-10 overflow-hidden">
          <div class="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 animate-pulse-slow rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 blur-3xl"></div>
          <div class="absolute right-1/4 top-1/4 h-64 w-64 animate-float rounded-full bg-gradient-to-br from-secondary-500/15 to-primary-500/15 blur-2xl"></div>
        </div>

        <div class="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/80 shadow-2xl shadow-primary-500/10 backdrop-blur-xl transition-all duration-700 hover:shadow-3xl hover:shadow-primary-500/20 dark:border-white/10 dark:bg-surface-dark/80 dark:shadow-primary-500/5">
          {/* Gradient border effect */}
          <div class="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary-500/20 via-secondary-500/20 to-primary-500/20 p-px">
            <div class="h-full w-full rounded-3xl bg-white/90 dark:bg-surface-dark/90"></div>
          </div>
          
          {/* Content container */}
          <div class="relative z-10">
            {/* Modern header section */}
            <div class="relative overflow-hidden bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 px-8 py-12">
              {/* Header background pattern */}
              <div class="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div class="absolute right-0 top-0 h-64 w-64 translate-x-32 -translate-y-32 rounded-full bg-white/10 blur-3xl"></div>
              
              <div class="relative flex items-center space-x-6">
                <div class="group/icon flex h-20 w-20 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/25">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-white transition-all duration-300 group-hover/icon:scale-110"
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
                <div class="space-y-2">
                  <h2 class="text-4xl font-bold text-white">{$localize`Useful Services`}</h2>
                  <p class="text-lg text-white/90">{$localize`Advanced Mode`}</p>
                  <p class="text-primary-100 max-w-md">{$localize`Configure advanced network services with detailed settings and modern interface`}</p>
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
