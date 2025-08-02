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
import { LetsEncryptStep } from "./steps/LetsEncryptStep";

// Create context with services data type
export const UsefulServicesStepperContextId = createStepperContext<{
  servicesData: AdvancedServicesData;
}>("useful-services-stepper");

export const UsefulServicesAdvanced = component$<StepProps>(
  ({ onComplete$ }) => {
    // Initialize services data with defaults
    const servicesData = useStore<AdvancedServicesData>({
      certificate: {
        name: "",
        type: "self-signed",
        keySize: "2048",
        countryCode: "",
        organization: "",
        commonName: "",
      },
      ntp: {
        enableClient: false,
        primaryServer: "pool.ntp.org",
        secondaryServer: "time.google.com",
        enableServer: false,
        allowedNetworks: "",
        timeZone: "UTC",
        updateInterval: "1h",
      },
      graphing: {
        enabled: false,
        dataRetentionDays: 30,
        updateInterval: "15m",
        monitoredInterfaces: {
          wan1: false,
          wan2: false,
          lan: false,
          wireless: false,
        },
        enableCPU: false,
        enableMemory: false,
        enableDisk: false,
        enableNetworkTraffic: false,
        graphResolution: "medium",
        storageLocation: "internal",
      },
      cloudDDNS: {
        enableDDNS: false,
        provider: "no-ip",
        hostname: "",
        username: "",
        password: "",
        updateInterval: "30m",
        enableSSL: true,
        customServerURL: "",
        enableCloudBackup: false,
        backupInterval: "weekly",
      },
      letsEncrypt: {
        enabled: false,
        domainName: "",
        emailAddress: "",
        certificateType: "single",
        autoRenewal: true,
        renewalDaysBeforeExpiry: 30,
        challengeType: "http-01",
        webServerPort: 80,
        enableHTTPSRedirect: true,
        certificateStoragePath: "/certificates/",
      },
    });

    // Define the 5 steps
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
        title: $localize`NTP Client/Server`,
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
        title: $localize`Cloud/DDNS`,
        description: $localize`Setup cloud services and dynamic DNS`,
        component: <CloudDDNSStep />,
        isComplete: false,
      },
      {
        id: 5,
        title: $localize`Let's Encrypt`,
        description: $localize`Configure automatic SSL certificate renewal`,
        component: <LetsEncryptStep />,
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
                <h2 class="text-2xl font-bold text-white">{$localize`Useful Services - Advanced Mode`}</h2>
                <p class="text-primary-50">{$localize`Configure advanced network services with detailed settings`}</p>
              </div>
            </div>
          </div>

          {/* Stepper Content */}
          <div class="p-6">
            <CStepper
              steps={steps}
              activeStep={0}
              contextId={UsefulServicesStepperContextId}
              contextValue={{ servicesData }}
              onStepComplete$={handleStepComplete$}
              onStepChange$={handleStepChange$}
              onComplete$={handleComplete$}
              allowSkipSteps={true} // Allow skipping optional services
              useNumbers={true} // Use numbers for step indicators
            />
          </div>
        </div>
      </div>
    );
  },
);
