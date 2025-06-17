import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useOpenVPNConfig } from "./useOpenVPNConfig";
import { 
  FormField, 
  FormContainer, 
  ErrorMessage, 
  RadioGroup,
  ConfigMethodToggle,
  VPNConfigFileSection
} from "../../components";

interface OpenVPNConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const OpenVPNConfig = component$<OpenVPNConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    config,
    configMethod,
    serverAddress,
    serverPort,
    protocol,
    authType,
    username,
    password,
    cipher,
    auth,
    errorMessage,
    missingFields,
    clientCertName,
    handleConfigChange$,
    handleManualFormSubmit$,
    handleFileUpload$,
    unsupportedDirectives,
  } = useOpenVPNConfig(onIsValidChange$);

  useTask$(({ track }) => {
    const saving = track(() => isSaving);
    if (saving) {
      handleManualFormSubmit$();
    }
  });

  return (
    <div class="space-y-6">
      {/* Configuration Method Selector */}
      <div class="mb-6 flex justify-center">
        <ConfigMethodToggle 
          method={configMethod.value}
          onMethodChange$={(method) => configMethod.value = method}
          class="max-w-md"
        />
      </div>
      
      {unsupportedDirectives.value.length > 0 && (
        <div class="mb-4 rounded-md bg-warning-50 p-4 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-700/30">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg class="h-5 w-5 text-warning-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="ml-3">
              <h3 class="text-sm font-medium text-warning-800 dark:text-warning-200">
                {$localize`Unsupported Configuration`}
              </h3>
              <div class="mt-2 text-sm text-warning-700 dark:text-warning-300">
                <p>
                  {$localize`Your configuration file contains directives that are not supported by MikroTik RouterOS and will be ignored. This may cause connection issues.`}
                </p>
                <ul class="list-disc space-y-1 pl-5 mt-2">
                  {unsupportedDirectives.value.map(directive => (
                    <li><code>{directive}</code></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* File-based Configuration */}
      {configMethod.value === "file" && (
        <VPNConfigFileSection
          protocolName="OpenVPN"
          acceptedExtensions=".ovpn,.conf"
          configValue={config.value}
          onConfigChange$={handleConfigChange$}
          onFileUpload$={handleFileUpload$}
          placeholder={$localize`Paste your OpenVPN configuration here. It should include directives like 'remote', 'proto', 'dev', etc.`}
        />
      )}

      {configMethod.value === "file" && missingFields.value.length > 0 && (
         <div class="mt-4">
            <FormContainer 
              title={$localize`Complete Your Configuration`}
              description={$localize`Your .ovpn file is missing some required details. Please provide them below.`}
              bordered
            >
              <div class="space-y-4 p-4">
                {missingFields.value.includes("Username") && (
                   <FormField
                     label={$localize`Username`}
                     value={username.value}
                     onInput$={(_, el) => {
                       username.value = el.value;
                       handleManualFormSubmit$();
                     }}
                     required
                   />
                 )}
                 {missingFields.value.includes("Password") && (
                   <FormField
                     type="password"
                     label={$localize`Password`}
                     value={password.value}
                     onInput$={(_, el) => {
                       password.value = el.value;
                       handleManualFormSubmit$();
                     }}
                     required
                   />
                 )}
                 {missingFields.value.includes("Client Certificate") && (
                  <FormField
                    label={$localize`Client Certificate Name`}
                    value={clientCertName.value} 
                    onInput$={(_, el) => {
                      clientCertName.value = el.value;
                      handleManualFormSubmit$();
                    }}
                    required
                    helperText={$localize`Enter the name of the client certificate installed on your router.`}
                  />
                 )}
              </div>
            </FormContainer>
         </div>
      )}

      {/* Manual Configuration */}
      {configMethod.value === "manual" && (
        <div class="space-y-6">
          {/* Connection Settings */}
          <FormContainer 
            title={$localize`Connection Settings`}
            bordered
          >
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                label={$localize`Server Address`}
                required
                value={serverAddress.value}
                onInput$={(_, el) => { 
                  serverAddress.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="vpn.example.com or IP address"
              />
              
              <FormField
                label={$localize`Server Port`}
                required
                value={serverPort.value}
                onInput$={(_, el) => { 
                  serverPort.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="1194"
              />
            </div>

            <div class="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                  {$localize`Protocol`} *
                </label>
                <RadioGroup
                  value={protocol.value}
                  onChange$={(value) => {
                    protocol.value = value as "tcp" | "udp";
                    handleManualFormSubmit$();
                  }}
                  options={[
                    { value: 'udp', label: 'UDP' },
                    { value: 'tcp', label: 'TCP' },
                  ]}
                  name="protocol"
                  class="mt-1"
                />
              </div>
              
              <div>
                <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                  {$localize`Authentication Type`} *
                </label>
                <select
                  value={authType.value}
                  onChange$={(_, el) => {
                    authType.value = el.value as "Credentials" | "Certificate" | "CredentialsCertificate";
                    handleManualFormSubmit$();
                  }}
                  class="mt-1 block w-full rounded-lg border border-border bg-white px-3 py-2
                         focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                         dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                >
                  <option value="Credentials">{$localize`Username/Password`}</option>
                  <option value="Certificate" disabled>{$localize`Certificates (Coming Soon)`}</option>
                  <option value="CredentialsCertificate" disabled>{$localize`Username/Password & Certificates (Coming Soon)`}</option>
                </select>
              </div>
            </div>
          </FormContainer>
          
          {/* Authentication Section - Conditionally Rendered */}
          {(authType.value === "Credentials" || authType.value === "CredentialsCertificate") && (
            <FormContainer 
              title={$localize`Authentication Details`}
              bordered
            >
              <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField
                  label={$localize`Username`}
                  required
                  value={username.value}
                  onInput$={(_, el) => { 
                    username.value = el.value;
                    handleManualFormSubmit$();
                  }}
                />
                
                <FormField
                  type="text"
                  label={$localize`Password`}
                  required
                  value={password.value}
                  onInput$={(_, el) => { 
                    password.value = el.value;
                    handleManualFormSubmit$();
                  }}
                />
              </div>
            </FormContainer>
          )}
          
          {/* Certificate Note - Conditionally Rendered */}
          {(authType.value === "Certificate" || authType.value === "CredentialsCertificate") && (
            <div class="rounded-lg bg-info-50/70 p-4 dark:bg-info-900/20 border border-info-200 dark:border-info-700/30">
              <div class="flex items-start">
                <div class="flex-shrink-0 pt-0.5">
                  <svg class="h-5 w-5 text-info-600 dark:text-info-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clip-rule="evenodd" />
                  </svg>
                </div>
                <div class="ml-3">
                  <p class="text-sm text-info-700 dark:text-info-300">
                    {$localize`For certificate-based authentication, certificates must be added in the router's certificate store.`}
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {/* Encryption Settings */}
          <FormContainer 
            title={$localize`Encryption Settings`}
            bordered
          >
            <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
              <FormField
                label={$localize`Cipher`}
                value={cipher.value}
                onInput$={(_, el) => { 
                  cipher.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="AES-256-CBC"
              />
              
              <FormField
                label={$localize`Auth`}
                value={auth.value}
                onInput$={(_, el) => { 
                  auth.value = el.value;
                  handleManualFormSubmit$();
                }}
                placeholder="SHA256"
              />
            </div>
          </FormContainer>
          
          {/* Required Fields Note */}
          <p class="text-xs text-text-muted dark:text-text-dark-muted">
            {$localize`Fields marked with * are required`}
          </p>
        </div>
      )}

      {/* Error Message Display */}
      <ErrorMessage message={errorMessage.value} />
    </div>
  );
}); 