import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { Card, CardHeader, CardBody, Toggle } from "~/components/Core";

export const CertificateStep = component$(() => {
  // Get stepper and star contexts
  const context = useStepperContext<any>(UsefulServicesStepperContextId);
  const starCtx = useContext(StarContext);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableSelfSigned = useSignal(servicesData.certificate.enableSelfSigned || false);
  const enableLetsEncrypt = useSignal(servicesData.certificate.enableLetsEncrypt || false);

  // Check if VPN servers that require certificates are enabled
  const requiresCertificate = useSignal(false);

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Check if any VPN server that requires certificates is enabled
    const vpnServer = starCtx.state.LAN.VPNServer;
    const hasSSTP = vpnServer?.SstpServer?.enabled;
    const hasOpenVPN = vpnServer?.OpenVpnServer?.some((server: any) => server?.enabled);
    const hasIKEv2 = !!vpnServer?.Ikev2Server;
    
    requiresCertificate.value = !!(hasSSTP || hasOpenVPN || hasIKEv2);

    // If VPN requires certificate, force enable self-signed
    if (requiresCertificate.value && !enableSelfSigned.value && !enableLetsEncrypt.value) {
      enableSelfSigned.value = true;
    }

    // Update context data
    servicesData.certificate = {
      enableSelfSigned: enableSelfSigned.value,
      enableLetsEncrypt: enableLetsEncrypt.value,
    };

    // Validate - step is complete when either certificate type is enabled or none are required
    const isComplete = !requiresCertificate.value || (enableSelfSigned.value || enableLetsEncrypt.value);

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 1,
    );
    if (currentStepIndex !== -1) {
      context.updateStepCompletion$(
        context.steps.value[currentStepIndex].id,
        isComplete,
      );
    }
  });

  // Run validation on component mount and when values change
  useVisibleTask$(() => {
    validateAndUpdate$();
  });

  return (
    <div class="space-y-8 animate-fade-in-up">
      {/* Modern header */}
      <div class="text-center space-y-4">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-500 text-white mb-6 shadow-xl shadow-primary-500/25 transition-transform hover:scale-105">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 class="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">
          {$localize`SSL/TLS Certificates`}
        </h3>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
          {$localize`Configure SSL/TLS certificates for secure network communications`}
        </p>
      </div>

      {/* VPN Certificate Required Warning */}
      {requiresCertificate.value && (
        <Card class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200/50 dark:border-amber-700/50 shadow-lg">
          <CardBody>
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <p class="text-sm font-medium text-amber-800 dark:text-amber-200">
                {$localize`Certificate required: You have VPN servers (SSTP, OpenVPN, or IKEv2) enabled that require SSL certificates.`}
              </p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Certificate Types */}
      <Card class="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-2 border-gray-200/50 dark:border-gray-700/50 shadow-xl">
        <CardHeader>
          <h4 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {$localize`Certificate Types`}
          </h4>
          <p class="text-gray-600 dark:text-gray-400">
            {$localize`Enable the types of certificates you want to use`}
          </p>
        </CardHeader>
        <CardBody class="space-y-6">
          <div class="grid grid-cols-1 gap-6">
            {/* Self-Signed Certificate Toggle */}
            <div class="group relative overflow-hidden rounded-2xl border-2 border-white/50 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary-300 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80 dark:hover:border-primary-500">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="text-lg font-bold text-gray-900 dark:text-white">{$localize`Self-Signed`}</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{$localize`Quick setup for internal use`}</p>
                  </div>
                </div>
                <Toggle
                  checked={enableSelfSigned.value}
                  disabled={requiresCertificate.value && !enableLetsEncrypt.value}
                  onChange$={$((checked) => {
                    enableSelfSigned.value = checked;
                    validateAndUpdate$();
                  })}
                  size="lg"
                  color="primary"
                />
              </div>
            </div>

            {/* Let's Encrypt Certificate Toggle */}
            <div class="group relative overflow-hidden rounded-2xl border-2 border-white/50 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-green-300 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80 dark:hover:border-green-500">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="text-lg font-bold text-gray-900 dark:text-white">{$localize`Let's Encrypt`}</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{$localize`Trusted by all browsers`}</p>
                  </div>
                </div>
                <Toggle
                  checked={enableLetsEncrypt.value}
                  onChange$={$((checked) => {
                    enableLetsEncrypt.value = checked;
                    validateAndUpdate$();
                  })}
                  size="lg"
                  color="success"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>


    </div>
  );
});