import { component$, useSignal, $, useVisibleTask$, useContext } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { Card, CardHeader, CardBody, Toggle, Input } from "~/components/Core";

export const CertificateStep = component$(() => {
  // Get stepper and star contexts
  const context = useStepperContext<any>(UsefulServicesStepperContextId);
  const starCtx = useContext(StarContext);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableSelfSigned = useSignal(servicesData.certificate.enableSelfSigned || false);
  const enableLetsEncrypt = useSignal(servicesData.certificate.enableLetsEncrypt || false);

  // Certificate passphrase state
  const certificatePassphrase = useSignal(starCtx.state.LAN.VPNServer?.CertificatePassphrase || "");
  const showPassphrase = useSignal(false);
  const passphraseError = useSignal("");

  // Check if VPN servers that require certificates are enabled
  const requiresCertificate = useSignal(false);

  // Validate passphrase
  const validatePassphrase$ = $((value: string) => {
    if (enableSelfSigned.value && value.length > 0 && value.length < 10) {
      passphraseError.value = $localize`Passphrase must be at least 10 characters`;
      return false;
    }
    passphraseError.value = "";
    return true;
  });

  // Update passphrase with validation
  const updatePassphrase$ = $((value: string) => {
    certificatePassphrase.value = value;
    validatePassphrase$(value);
  });

  // Toggle passphrase visibility
  const togglePassphraseVisibility$ = $(() => {
    showPassphrase.value = !showPassphrase.value;
  });

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

    // Validate passphrase
    validatePassphrase$(certificatePassphrase.value);

    // Update context data with correct property names
    servicesData.certificate = {
      SelfSigned: enableSelfSigned.value,
      LetsEncrypt: enableLetsEncrypt.value,
    };

    // Update StarContext - explicit property assignment to avoid spread operator issues
    const currentServices = starCtx.state.ExtraConfig.usefulServices || {};
    starCtx.updateExtraConfig$({
      usefulServices: {
        certificate: {
          SelfSigned: enableSelfSigned.value,
          LetsEncrypt: enableLetsEncrypt.value,
        },
        ntp: currentServices.ntp,
        graphing: currentServices.graphing,
        cloudDDNS: currentServices.cloudDDNS,
        upnp: currentServices.upnp,
        natpmp: currentServices.natpmp,
      }
    });

    // Update LAN VPNServer with certificate passphrase
    if (enableSelfSigned.value && certificatePassphrase.value) {
      const currentVpnServer = starCtx.state.LAN.VPNServer;
      starCtx.updateLAN$({
        VPNServer: {
          Users: currentVpnServer?.Users || [],
          CertificatePassphrase: certificatePassphrase.value,
          ...currentVpnServer,
        }
      });
    }

    // Validate - step is complete when:
    // 1. Either certificate type is enabled or none are required
    // 2. If self-signed is enabled, passphrase must be valid (>= 10 chars)
    const passphraseValid = !enableSelfSigned.value || 
      (certificatePassphrase.value.length >= 10);
    const isComplete = (!requiresCertificate.value || 
      (enableSelfSigned.value || enableLetsEncrypt.value)) && 
      passphraseValid;

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
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    validateAndUpdate$();
  });

  return (
    <div class="space-y-8 animate-fade-in-up">
      {/* Enhanced modern header with glassmorphism */}
      <div class="text-center space-y-6">
        <div class="relative inline-flex items-center justify-center">
          {/* Subtle glow effect */}
          <div class="absolute inset-0 w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500/15 via-warning-500/15 to-primary-500/15 animate-pulse-slow"></div>
          <div class="relative inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-warning-500 text-white shadow-2xl shadow-primary-500/30 transition-all duration-500 hover:scale-110 hover:rotate-3 hover:shadow-primary-500/40">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 transition-transform duration-500 hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <div class="space-y-3">
          <h3 class="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-gray-200 dark:to-white animate-gradient bg-300%">
            {$localize`SSL/TLS Certificates`}
          </h3>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {$localize`Configure SSL/TLS certificates for secure network communications`}
          </p>
        </div>
      </div>

      {/* VPN Certificate Required Warning with enhanced styling */}
      {requiresCertificate.value && (
        <Card class="relative overflow-hidden bg-gradient-to-r from-warning-50 to-warning-100 dark:from-warning-900/30 dark:to-warning-800/30 border border-warning-200 dark:border-warning-700 shadow-lg animate-fade-in-up">
          <CardBody>
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-warning-500/20 to-warning-600/20 text-warning-600 dark:text-warning-400 animate-pulse-subtle">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p class="font-medium text-warning-800 dark:text-warning-200">
                {$localize`Certificate required: You have VPN servers (SSTP, OpenVPN, or IKEv2) enabled that require SSL certificates.`}
              </p>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Certificate Types with glassmorphism */}
      <Card class="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl">
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
            {/* Self-Signed Certificate Toggle with enhanced styling */}
            <div class="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 p-6 transition-all duration-300 hover:border-primary-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-700 dark:hover:border-primary-500 animate-fade-in-up">
              {/* Gradient overlay */}
              <div class="absolute inset-0 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 transition-opacity duration-500 opacity-0 group-hover:opacity-5"></div>
              <div class="relative flex items-center justify-between">
                <div class="flex items-center gap-5">
                  <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">{$localize`Self-Signed Certificate`}</h5>
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

            {/* Let's Encrypt Certificate Toggle with enhanced styling */}
            <div class="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white dark:bg-gray-800 p-6 transition-all duration-300 hover:border-success-300 hover:scale-[1.02] hover:shadow-lg dark:border-gray-700 dark:hover:border-success-500 animate-fade-in-up" style="animation-delay: 0.2s">
              {/* Gradient overlay */}
              <div class="absolute inset-0 bg-gradient-to-r from-success-500/0 via-success-500/0 to-success-500/0 transition-opacity duration-500 opacity-0 group-hover:opacity-5"></div>
              <div class="relative flex items-center justify-between">
                <div class="flex items-center gap-5">
                  <div class="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-success-500 to-success-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 class="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-white dark:to-gray-300">{$localize`Let's Encrypt Certificate`}</h5>
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

      {/* Certificate Passphrase Input - Show when self-signed is enabled and passphrase is missing */}
      {enableSelfSigned.value && !certificatePassphrase.value && (
        <Card class="relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl transition-all duration-300 hover:shadow-2xl animate-fade-in-up">
          <CardHeader>
            <h4 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-warning-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
              {$localize`Certificate Passphrase Required`}
            </h4>
            <p class="text-gray-600 dark:text-gray-400">
              {$localize`Enter a passphrase to protect your self-signed certificate`}
            </p>
          </CardHeader>
          <CardBody class="space-y-4">
            <div class="relative">
              <Input
                type={showPassphrase.value ? "text" : "password"}
                value={certificatePassphrase.value}
                onInput$={$((e: any) => updatePassphrase$(e.target.value))}
                placeholder={$localize`Enter certificate passphrase (min 10 characters)`}
                label={$localize`Certificate Passphrase`}
                errorMessage={passphraseError.value}
                validation={passphraseError.value ? "invalid" : undefined}
                class="pr-12"
              />
              <button
                type="button"
                onClick$={togglePassphraseVisibility$}
                class="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label={showPassphrase.value ? $localize`Hide passphrase` : $localize`Show passphrase`}
              >
                {showPassphrase.value ? (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {$localize`This passphrase will be used to encrypt your certificate for secure export to VPN clients.`}
            </p>
          </CardBody>
        </Card>
      )}


    </div>
  );
});