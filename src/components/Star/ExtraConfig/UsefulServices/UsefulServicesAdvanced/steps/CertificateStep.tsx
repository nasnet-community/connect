import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Select } from "~/components/Core/Select";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const CertificateStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const certificateName = useSignal(servicesData.certificate.name || "");
  const certificateType = useSignal(
    servicesData.certificate.type || "self-signed",
  );
  const keySize = useSignal(servicesData.certificate.keySize || "2048");
  const countryCode = useSignal(servicesData.certificate.countryCode || "");
  const organization = useSignal(servicesData.certificate.organization || "");
  const commonName = useSignal(servicesData.certificate.commonName || "");

  // Certificate type options
  const certificateTypeOptions = [
    { value: "self-signed", label: $localize`Self-Signed` },
    { value: "lets-encrypt", label: $localize`Let's Encrypt` },
    { value: "custom", label: $localize`Custom` },
  ];

  // Key size options
  const keySizeOptions = [
    { value: "2048", label: $localize`2048 bits` },
    { value: "4096", label: $localize`4096 bits` },
  ];

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data
    servicesData.certificate = {
      name: certificateName.value,
      type: certificateType.value as any,
      keySize: keySize.value as any,
      countryCode: countryCode.value,
      organization: organization.value,
      commonName: commonName.value,
    };

    // Validate required fields: Certificate Name and Common Name
    const isComplete =
      certificateName.value.trim() !== "" && commonName.value.trim() !== "";

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
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        {/* Header */}
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">
                {$localize`Certificate Configuration`}
              </h2>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium text-primary-50">
                  {$localize`Configure SSL/TLS certificates for secure connections`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div class="p-6">
          <div class="space-y-6">
            {/* Certificate Name */}
            <div>
              <label
                class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                for="certificate-name"
              >
                {$localize`Certificate Name`}
                <span class="ml-1 text-red-500">*</span>
              </label>
              <input
                id="certificate-name"
                type="text"
                class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                       focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                       dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter certificate name`}
                value={certificateName.value}
                onInput$={(e: any) => {
                  certificateName.value = e.target.value;
                  validateAndUpdate$();
                }}
              />
            </div>

            {/* Certificate Type */}
            <div>
              <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                {$localize`Certificate Type`}
              </label>
              <Select
                options={certificateTypeOptions}
                value={certificateType.value}
                onChange$={(value) => {
                  certificateType.value = value;
                  validateAndUpdate$();
                }}
                clearable={false}
                class="w-full"
              />
            </div>

            {/* Key Size */}
            <div>
              <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                {$localize`Key Size`}
              </label>
              <Select
                options={keySizeOptions}
                value={keySize.value}
                onChange$={(value) => {
                  keySize.value = value;
                  validateAndUpdate$();
                }}
                clearable={false}
                class="w-full"
              />
            </div>

            {/* Country Code */}
            <div>
              <label
                class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                for="country-code"
              >
                {$localize`Country Code`}
              </label>
              <input
                id="country-code"
                type="text"
                maxLength={2}
                class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                       focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                       dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`e.g., US, CA, GB`}
                value={countryCode.value}
                onInput$={(e: any) => {
                  const value = e.target.value.toUpperCase().slice(0, 2);
                  countryCode.value = value;
                  validateAndUpdate$();
                }}
              />
              <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                {$localize`Two-letter country code (ISO 3166-1 alpha-2)`}
              </p>
            </div>

            {/* Organization */}
            <div>
              <label
                class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                for="organization"
              >
                {$localize`Organization`}
              </label>
              <input
                id="organization"
                type="text"
                class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                       focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                       dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`Enter organization name`}
                value={organization.value}
                onInput$={(e: any) => {
                  organization.value = e.target.value;
                  validateAndUpdate$();
                }}
              />
            </div>

            {/* Common Name */}
            <div>
              <label
                class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                for="common-name"
              >
                {$localize`Common Name`}
                <span class="ml-1 text-red-500">*</span>
              </label>
              <input
                id="common-name"
                type="text"
                class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                       focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                       dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                placeholder={$localize`e.g., example.com or *.example.com`}
                value={commonName.value}
                onInput$={(e: any) => {
                  commonName.value = e.target.value;
                  validateAndUpdate$();
                }}
              />
              <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                {$localize`The domain name or IP address for the certificate`}
              </p>
            </div>
          </div>

          {/* Required Fields Notice */}
          <div class="mt-6 rounded-lg bg-primary-50 p-4 dark:bg-primary-900/20">
            <div class="flex items-start">
              <svg
                class="mr-3 mt-0.5 h-5 w-5 text-primary-600 dark:text-primary-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <h3 class="text-sm font-medium text-primary-800 dark:text-primary-200">
                  {$localize`Required Fields`}
                </h3>
                <p class="mt-1 text-sm text-primary-700 dark:text-primary-300">
                  {$localize`Certificate Name and Common Name are required to proceed to the next step.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
