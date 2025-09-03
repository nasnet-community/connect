import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { Card, CardHeader, CardBody, Toggle, Input, FormField } from "~/components/Core";

export const CertificateStep = component$(() => {
  // Get stepper and star contexts
  const context = useStepperContext<any>(UsefulServicesStepperContextId);
  const starCtx = useContext(StarContext);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableSelfSigned = useSignal(servicesData.certificate.enableSelfSigned || false);
  const enableLetsEncrypt = useSignal(servicesData.certificate.enableLetsEncrypt || false);
  const enableWWWSSL = useSignal(servicesData.certificate.enableWWWSSL || false);
  const enableAPISSL = useSignal(servicesData.certificate.enableAPISSL || false);
  const certificateName = useSignal(servicesData.certificate.name || "");
  const keySize = useSignal(servicesData.certificate.keySize || "2048");
  const countryCode = useSignal(servicesData.certificate.countryCode || "");
  const organization = useSignal(servicesData.certificate.organization || "");
  const commonName = useSignal(servicesData.certificate.commonName || "");

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
      enableWWWSSL: enableWWWSSL.value,
      enableAPISSL: enableAPISSL.value,
      name: certificateName.value,
      keySize: keySize.value as any,
      countryCode: countryCode.value,
      organization: organization.value,
      commonName: commonName.value,
    };

    // Validate required fields if any certificate type is enabled
    const anyCertificateEnabled = enableSelfSigned.value || enableLetsEncrypt.value;
    const isComplete = !anyCertificateEnabled || 
      (certificateName.value.trim() !== "" && commonName.value.trim() !== "");

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

  const anyCertificateEnabled = enableSelfSigned.value || enableLetsEncrypt.value;

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
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  onChange$={(checked) => {
                    enableSelfSigned.value = checked;
                    validateAndUpdate$();
                  }}
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
                  onChange$={(checked) => {
                    enableLetsEncrypt.value = checked;
                    validateAndUpdate$();
                  }}
                  size="lg"
                  color="success"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Certificate Configuration - shown only when any certificate is enabled */}
      {anyCertificateEnabled && (
        <Card class="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-2 border-gray-200/50 dark:border-gray-700/50 shadow-lg">
          <CardHeader>
            <h4 class="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {$localize`Certificate Configuration`}
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              {$localize`Configure certificate details and parameters`}
            </p>
          </CardHeader>
          <CardBody class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label={$localize`Certificate Name`}
                required
                helperText={$localize`Unique name for this certificate`}
              >
                <Input
                  type="text"
                  placeholder={$localize`Enter certificate name`}
                  value={certificateName.value}
                  onInput$={(e: any) => {
                    certificateName.value = e.target.value;
                    validateAndUpdate$();
                  }}
                />
              </FormField>

              <FormField
                label={$localize`Common Name`}
                required
                helperText={$localize`Domain name or IP address`}
              >
                <Input
                  type="text"
                  placeholder={$localize`e.g., example.com`}
                  value={commonName.value}
                  onInput$={(e: any) => {
                    commonName.value = e.target.value;
                    validateAndUpdate$();
                  }}
                />
              </FormField>

              <FormField
                label={$localize`Country Code`}
                helperText={$localize`Two-letter country code`}
              >
                <Input
                  type="text"
                  placeholder={$localize`e.g., US, CA, GB`}
                  value={countryCode.value}
                  onInput$={(e: any) => {
                    const value = e.target.value.toUpperCase().slice(0, 2);
                    countryCode.value = value;
                    validateAndUpdate$();
                  }}
                />
              </FormField>

              <FormField
                label={$localize`Organization`}
                helperText={$localize`Organization or company name`}
              >
                <Input
                  type="text"
                  placeholder={$localize`Enter organization name`}
                  value={organization.value}
                  onInput$={(e: any) => {
                    organization.value = e.target.value;
                    validateAndUpdate$();
                  }}
                />
              </FormField>
            </div>

            {/* Key Size Selection - only for self-signed */}
            {enableSelfSigned.value && (
              <div class="space-y-4">
                <label class="text-sm font-semibold text-gray-900 dark:text-white">
                  {$localize`Key Size (Self-Signed)`}
                </label>
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      keySize.value === "2048"
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary-300"
                    }`}
                    onClick$={() => {
                      keySize.value = "2048";
                      validateAndUpdate$();
                    }}
                  >
                    <h5 class="font-bold text-gray-900 dark:text-white">2048 bits</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{$localize`Standard security`}</p>
                  </div>
                  <div
                    class={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      keySize.value === "4096"
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-primary-300"
                    }`}
                    onClick$={() => {
                      keySize.value = "4096";
                      validateAndUpdate$();
                    }}
                  >
                    <h5 class="font-bold text-gray-900 dark:text-white">4096 bits</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{$localize`High security`}</p>
                  </div>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      )}

      {/* SSL Services Assignment */}
      <Card class="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 border-2 border-primary-200/50 dark:border-primary-700/50 shadow-xl">
        <CardHeader>
          <h4 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {$localize`SSL Services`}
          </h4>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            {$localize`Configure which services will use SSL certificates`}
          </p>
        </CardHeader>
        <CardBody class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* WWW-SSL Service */}
            <div class="group relative overflow-hidden rounded-2xl border-2 border-white/50 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary-300 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80 dark:hover:border-primary-500">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="text-lg font-bold text-gray-900 dark:text-white">{$localize`WWW-SSL Service`}</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{$localize`Web interface (HTTPS)`}</p>
                  </div>
                </div>
                <Toggle
                  checked={enableWWWSSL.value}
                  onChange$={(checked) => {
                    enableWWWSSL.value = checked;
                    validateAndUpdate$();
                  }}
                  size="lg"
                  color="primary"
                />
              </div>
            </div>

            {/* API-SSL Service */}
            <div class="group relative overflow-hidden rounded-2xl border-2 border-white/50 bg-white/80 backdrop-blur-sm p-6 transition-all duration-300 hover:border-secondary-300 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/80 dark:hover:border-secondary-500">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-secondary-500 to-secondary-600 text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="text-lg font-bold text-gray-900 dark:text-white">{$localize`API-SSL Service`}</h5>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{$localize`REST API access`}</p>
                  </div>
                </div>
                <Toggle
                  checked={enableAPISSL.value}
                  onChange$={(checked) => {
                    enableAPISSL.value = checked;
                    validateAndUpdate$();
                  }}
                  size="lg"
                  color="secondary"
                />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
});