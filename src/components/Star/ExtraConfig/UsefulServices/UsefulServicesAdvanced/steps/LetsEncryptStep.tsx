import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { Select } from "~/components/Core/Select";
import { UsefulServicesStepperContextId } from "../UsefulServicesAdvanced";

export const LetsEncryptStep = component$(() => {
  // Get stepper context
  const context = useStepperContext<any>(UsefulServicesStepperContextId);

  // Access servicesData from context
  const { servicesData } = context.data;

  // Create local signals for form state
  const enableLetsEncrypt = useSignal(
    servicesData.letsEncrypt.enabled || false,
  );
  const domainName = useSignal(servicesData.letsEncrypt.domainName || "");
  const emailAddress = useSignal(servicesData.letsEncrypt.emailAddress || "");
  const certificateType = useSignal(
    servicesData.letsEncrypt.certificateType || "single",
  );
  const autoRenewal = useSignal(
    servicesData.letsEncrypt.autoRenewal !== undefined
      ? servicesData.letsEncrypt.autoRenewal
      : true,
  );
  const renewalDaysBefore = useSignal(
    servicesData.letsEncrypt.renewalDaysBeforeExpiry || 30,
  );
  const challengeType = useSignal(
    servicesData.letsEncrypt.challengeType || "http-01",
  );
  const webServerPort = useSignal(servicesData.letsEncrypt.webServerPort || 80);
  const enableHTTPSRedirect = useSignal(
    servicesData.letsEncrypt.enableHTTPSRedirect !== undefined
      ? servicesData.letsEncrypt.enableHTTPSRedirect
      : true,
  );
  const certificateStoragePath = useSignal(
    servicesData.letsEncrypt.certificateStoragePath || "/certificates/",
  );

  // Certificate type options
  const certificateTypeOptions = [
    { value: "single", label: $localize`Single Domain` },
    { value: "wildcard", label: $localize`Wildcard` },
    { value: "multi", label: $localize`Multi-Domain` },
  ];

  // Challenge type options
  const challengeTypeOptions = [
    { value: "http-01", label: $localize`HTTP-01` },
    { value: "dns-01", label: $localize`DNS-01` },
  ];

  // Update context data and validate step completion
  const validateAndUpdate$ = $(() => {
    // Update context data
    servicesData.letsEncrypt = {
      enabled: enableLetsEncrypt.value,
      domainName: domainName.value,
      emailAddress: emailAddress.value,
      certificateType: certificateType.value,
      autoRenewal: autoRenewal.value,
      renewalDaysBeforeExpiry: renewalDaysBefore.value,
      challengeType: challengeType.value,
      webServerPort: webServerPort.value,
      enableHTTPSRedirect: enableHTTPSRedirect.value,
      certificateStoragePath: certificateStoragePath.value,
    };

    // Validate: Let's Encrypt must be enabled and required fields filled
    const isComplete =
      enableLetsEncrypt.value &&
      domainName.value.trim() !== "" &&
      emailAddress.value.trim() !== "";

    // Find the current step and update its completion status
    const currentStepIndex = context.steps.value.findIndex(
      (step) => step.id === 5,
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div class="space-y-1">
              <h2 class="text-2xl font-bold text-white">
                {$localize`Let's Encrypt Configuration`}
              </h2>
              <div class="flex items-center space-x-2">
                <p class="text-sm font-medium text-primary-50">
                  {$localize`Configure automatic SSL/TLS certificates with Let's Encrypt`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div class="p-6">
          <div class="space-y-6">
            {/* Enable Let's Encrypt */}
            <div>
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                  checked={enableLetsEncrypt.value}
                  onChange$={(e: any) => {
                    enableLetsEncrypt.value = e.target.checked;
                    validateAndUpdate$();
                  }}
                />
                <span class="text-sm font-medium text-text dark:text-text-dark-default">
                  {$localize`Enable Let's Encrypt`}
                </span>
              </label>
              <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                {$localize`Automatically obtain and renew SSL/TLS certificates from Let's Encrypt`}
              </p>
            </div>

            {/* Configuration fields - shown only when Let's Encrypt is enabled */}
            {enableLetsEncrypt.value && (
              <div class="space-y-6">
                {/* Certificate Configuration Section */}
                <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
                  <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                    {$localize`Certificate Configuration`}
                  </h3>

                  <div class="space-y-4">
                    {/* Domain Name */}
                    <div>
                      <label
                        class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                        for="domain-name"
                      >
                        {$localize`Domain Name`}
                        <span class="ml-1 text-red-500">*</span>
                      </label>
                      <input
                        id="domain-name"
                        type="text"
                        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                               focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                               dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                        placeholder="example.com"
                        value={domainName.value}
                        onInput$={(e: any) => {
                          domainName.value = e.target.value;
                          validateAndUpdate$();
                        }}
                      />
                    </div>

                    {/* Email Address */}
                    <div>
                      <label
                        class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                        for="email-address"
                      >
                        {$localize`Email Address`}
                        <span class="ml-1 text-red-500">*</span>
                      </label>
                      <input
                        id="email-address"
                        type="email"
                        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                               focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                               dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                        placeholder={$localize`admin@example.com`}
                        value={emailAddress.value}
                        onInput$={(e: any) => {
                          emailAddress.value = e.target.value;
                          validateAndUpdate$();
                        }}
                      />
                      <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                        {$localize`Email address for certificate expiration notifications`}
                      </p>
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
                      <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                        {$localize`Single Domain: Covers one domain. Wildcard: Covers *.domain.com. Multi-Domain: Covers multiple domains`}
                      </p>
                    </div>

                    {/* Challenge Type */}
                    <div>
                      <label class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default">
                        {$localize`Challenge Type`}
                      </label>
                      <Select
                        options={challengeTypeOptions}
                        value={challengeType.value}
                        onChange$={(value) => {
                          challengeType.value = value;
                          validateAndUpdate$();
                        }}
                        clearable={false}
                        class="w-full"
                      />
                      <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                        {$localize`HTTP-01: Uses web server (port 80). DNS-01: Uses DNS records (required for wildcards)`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advanced Settings Section */}
                <div class="dark:bg-surface-secondary-dark bg-surface-secondary rounded-lg border border-border p-4 dark:border-border-dark">
                  <h3 class="mb-4 text-lg font-semibold text-text dark:text-text-dark-default">
                    {$localize`Advanced Settings`}
                  </h3>

                  <div class="space-y-4">
                    {/* Auto Renewal */}
                    <div>
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                          checked={autoRenewal.value}
                          onChange$={(e: any) => {
                            autoRenewal.value = e.target.checked;
                            validateAndUpdate$();
                          }}
                        />
                        <span class="text-sm font-medium text-text dark:text-text-dark-default">
                          {$localize`Auto Renewal`}
                        </span>
                      </label>
                      <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                        {$localize`Automatically renew certificates before expiration`}
                      </p>
                    </div>

                    {/* Renewal Days Before Expiry */}
                    <div>
                      <label
                        class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                        for="renewal-days"
                      >
                        {$localize`Renewal Days Before Expiry`}
                      </label>
                      <input
                        id="renewal-days"
                        type="number"
                        min="1"
                        max="60"
                        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                               focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                               dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                        value={renewalDaysBefore.value}
                        onInput$={(e: any) => {
                          const value = Math.min(
                            60,
                            Math.max(1, parseInt(e.target.value) || 30),
                          );
                          renewalDaysBefore.value = value;
                          validateAndUpdate$();
                        }}
                      />
                      <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                        {$localize`Number of days before expiry to renew certificate (1-60 days)`}
                      </p>
                    </div>

                    {/* Web Server Port */}
                    <div>
                      <label
                        class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                        for="web-server-port"
                      >
                        {$localize`Web Server Port`}
                      </label>
                      <input
                        id="web-server-port"
                        type="number"
                        min="1"
                        max="65535"
                        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                               focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                               dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                        value={webServerPort.value}
                        onInput$={(e: any) => {
                          const value = Math.min(
                            65535,
                            Math.max(1, parseInt(e.target.value) || 80),
                          );
                          webServerPort.value = value;
                          validateAndUpdate$();
                        }}
                      />
                      <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                        {$localize`Port for HTTP challenge verification (typically 80)`}
                      </p>
                    </div>

                    {/* Enable HTTPS Redirect */}
                    <div>
                      <label class="flex items-center">
                        <input
                          type="checkbox"
                          class="mr-3 h-4 w-4 rounded border-border text-primary-500 focus:ring-primary-500 dark:border-border-dark"
                          checked={enableHTTPSRedirect.value}
                          onChange$={(e: any) => {
                            enableHTTPSRedirect.value = e.target.checked;
                            validateAndUpdate$();
                          }}
                        />
                        <span class="text-sm font-medium text-text dark:text-text-dark-default">
                          {$localize`Enable HTTPS Redirect`}
                        </span>
                      </label>
                      <p class="text-text-secondary dark:text-text-dark-secondary ml-7 mt-1 text-xs">
                        {$localize`Automatically redirect HTTP requests to HTTPS`}
                      </p>
                    </div>

                    {/* Certificate Storage Path */}
                    <div>
                      <label
                        class="mb-2 block text-sm font-medium text-text dark:text-text-dark-default"
                        for="storage-path"
                      >
                        {$localize`Certificate Storage Path`}
                      </label>
                      <input
                        id="storage-path"
                        type="text"
                        class="w-full rounded-lg border border-border bg-surface px-4 py-3 text-text transition-colors 
                               focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 
                               dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                        placeholder="/certificates/"
                        value={certificateStoragePath.value}
                        onInput$={(e: any) => {
                          certificateStoragePath.value = e.target.value;
                          validateAndUpdate$();
                        }}
                      />
                      <p class="text-text-secondary dark:text-text-dark-secondary mt-1 text-xs">
                        {$localize`Directory path where certificates will be stored`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
                  {$localize`Required Configuration`}
                </h3>
                <p class="mt-1 text-sm text-primary-700 dark:text-primary-300">
                  {$localize`Enable Let's Encrypt and provide Domain Name and Email Address to proceed to the next step.`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
