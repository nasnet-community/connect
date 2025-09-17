import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useOpenVPNConfig } from "./useOpenVPNConfig";
import {
  FormField,
  FormContainer,
  ErrorMessage,
  RadioGroup,
  ConfigMethodToggle,
  VPNConfigFileSection,
} from "../../components";
import {
  HiInformationCircleSolid,
  HiExclamationTriangleSolid,
  HiCheckCircleOutline,
  HiXCircleOutline,
  HiDocumentTextOutline,
  HiUserOutline,
  HiLockClosedOutline,
  HiShieldCheckOutline,
  HiQuestionMarkCircleOutline,
} from "@qwikest/icons/heroicons";

interface OpenVPNConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const OpenVPNConfig = component$<OpenVPNConfigProps>(
  ({ onIsValidChange$, isSaving }) => {
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
      clientCertName: _clientCertName,
      handleConfigChange$,
      handleManualFormSubmit$,
      handleFileUpload$,
      unsupportedDirectives,
      authTypeSelectionNeeded,
      handleAuthTypeSelection$,
    } = useOpenVPNConfig(onIsValidChange$);

    useTask$(({ track }) => {
      const saving = track(() => isSaving);
      if (saving) {
        handleManualFormSubmit$();
      }
    });

    return (
      <div class="space-y-8">
        {/* Header Section with RouterOS Compatibility Information */}
        <div class="relative overflow-hidden rounded-2xl border border-info-200 bg-gradient-to-br from-info-50 via-blue-50 to-primary-50 shadow-lg backdrop-blur-sm dark:border-info-800/60 dark:from-info-900/40 dark:via-blue-900/40 dark:to-primary-900/40">
          {/* Background Pattern */}
          <div class="absolute inset-0 opacity-5 dark:opacity-10">
            <div class="absolute right-0 top-0 h-32 w-32 -translate-y-6 translate-x-6 transform rounded-full bg-info-600 blur-2xl dark:bg-info-400"></div>
            <div class="absolute bottom-0 left-0 h-24 w-24 -translate-x-3 translate-y-3 transform rounded-full bg-primary-500 blur-2xl dark:bg-primary-400"></div>
          </div>

          <div class="relative p-6 md:p-8">
            <div class="flex items-start space-x-5">
              {/* Icon */}
              <div class="flex-shrink-0">
                <div class="rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-3 shadow-lg dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                  <HiInformationCircleSolid class="h-7 w-7 text-primary-600 dark:text-primary-400" />
                </div>
              </div>

              {/* Content */}
              <div class="min-w-0 flex-1">
                <h3 class="mb-2 text-xl font-bold text-info-900 dark:text-info-100">
                  {$localize`MikroTik RouterOS OpenVPN Support`}
                </h3>
                <p class="mb-4 text-sm leading-relaxed text-info-800 dark:text-info-200">
                  {$localize`RouterOS has specialized OpenVPN implementation with specific capabilities. Our intelligent parser automatically detects and handles compatibility requirements.`}
                </p>

                {/* Feature Grid */}
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* Supported Features */}
                  <div class="rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm dark:border-gray-700/60 dark:bg-surface-dark/70">
                    <div class="mb-3 flex items-center">
                      <div class="mr-2 h-2 w-2 rounded-full bg-success"></div>
                      <h4 class="text-sm font-semibold text-success-dark dark:text-success-light">
                        {$localize`Supported Features`}
                      </h4>
                    </div>
                    <ul class="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                      <li class="flex items-center">
                        <HiCheckCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        TCP/UDP protocols
                      </li>
                      <li class="flex items-center">
                        <HiCheckCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        AES encryption (128/192/256)
                      </li>
                      <li class="flex items-center">
                        <HiCheckCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        Username/password authentication
                      </li>
                      <li class="flex items-center">
                        <HiCheckCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        Certificate-based auth
                      </li>
                    </ul>
                  </div>

                  {/* Limitations */}
                  <div class="rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm dark:border-gray-700/60 dark:bg-surface-dark/70">
                    <div class="mb-3 flex items-center">
                      <div class="mr-2 h-2 w-2 rounded-full bg-warning"></div>
                      <h4 class="text-sm font-semibold text-warning-dark dark:text-warning-light">
                        {$localize`Key Limitations`}
                      </h4>
                    </div>
                    <ul class="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                      <li class="flex items-center">
                        <HiXCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        No LZO compression
                      </li>
                      <li class="flex items-center">
                        <HiXCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        No cipher negotiation
                      </li>
                      <li class="flex items-center">
                        <HiXCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        Limited TLS features
                      </li>
                      <li class="flex items-center">
                        <HiXCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        Manual certificate import
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Method Toggle */}
        <div class="flex justify-center">
          <div class="rounded-2xl border border-border bg-white/90 p-2 shadow-lg backdrop-blur-sm dark:border-border-dark dark:bg-surface-dark/90">
            <ConfigMethodToggle
              method={configMethod.value}
              onMethodChange$={(method) => (configMethod.value = method)}
              class="rounded-xl"
            />
          </div>
        </div>

        {/* Compatibility Warnings */}
        {unsupportedDirectives.value.length > 0 && (
          <div class="relative overflow-hidden rounded-2xl border border-warning-200 bg-gradient-to-br from-warning-50 via-orange-50 to-red-50 shadow-lg backdrop-blur-sm dark:border-warning-800/60 dark:from-warning-900/40 dark:via-orange-900/40 dark:to-red-900/40">
            {/* Background Pattern */}
            <div class="absolute inset-0 opacity-5 dark:opacity-10">
              <div class="absolute right-4 top-4 h-20 w-20 rotate-12 transform rounded-full bg-warning-400 blur-2xl dark:bg-warning-300"></div>
            </div>

            <div class="relative p-6">
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div class="rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-3 shadow-lg dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                    <HiExclamationTriangleSolid class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>

                <div class="min-w-0 flex-1">
                  <h3 class="mb-2 text-lg font-bold text-warning-900 dark:text-warning-100">
                    {$localize`RouterOS Compatibility Issues Detected`}
                  </h3>
                  <p class="mb-4 text-sm text-warning-800 dark:text-warning-200">
                    {$localize`Your configuration contains features that aren't supported by RouterOS and will be automatically ignored or adapted:`}
                  </p>

                  {/* Unsupported Directives Grid */}
                  <div class="mb-4 rounded-xl border border-warning-200/40 bg-white/70 p-4 backdrop-blur-sm dark:border-warning-700/40 dark:bg-gray-800/70">
                    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {unsupportedDirectives.value.map((directive) => (
                        <div
                          key={directive}
                          class="flex items-center rounded-lg bg-warning-100/60 p-3 dark:bg-warning-800/60"
                        >
                          <div class="mr-3 h-2 w-2 flex-shrink-0 rounded-full bg-warning-500"></div>
                          <code class="break-all font-mono text-xs text-warning-800 dark:text-warning-200">
                            {directive}
                          </code>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Fixes */}
                  <div class="rounded-xl border border-info-200/40 bg-info-50/60 p-4 dark:border-info-700/40 dark:bg-info-900/60">
                    <div class="mb-2 flex items-center">
                      <HiInformationCircleSolid class="mr-2 h-4 w-4 text-primary-600 dark:text-primary-400" />
                      <h4 class="text-sm font-semibold text-primary-800 dark:text-primary-200">
                        {$localize`Quick Fixes`}
                      </h4>
                    </div>
                    <ul class="space-y-1 text-xs text-info-700 dark:text-info-300">
                      <li>
                        •{" "}
                        {$localize`Remove 'comp-lzo' directives (compression not supported)`}
                      </li>
                      <li>
                        •{" "}
                        {$localize`Replace 'ncp-ciphers' with explicit 'cipher' directive`}
                      </li>
                      <li>
                        •{" "}
                        {$localize`Import certificates manually in RouterOS certificate store`}
                      </li>
                      <li>
                        •{" "}
                        {$localize`Use TLS 1.2+ for tls-auth/tls-crypt features (RouterOS 7.17+)`}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configuration Content */}
        <div class="space-y-6">
          {/* File-based Configuration */}
          {configMethod.value === "file" && (
            <div class="overflow-hidden rounded-2xl border border-border bg-white shadow-xl dark:border-border-dark dark:bg-surface-dark">
              <div class="border-b border-border bg-gradient-to-r from-primary-50 to-secondary-50 px-6 py-4 dark:border-border-dark dark:from-primary-900/30 dark:to-secondary-900/30">
                <div class="flex items-center space-x-3">
                  <div class="rounded-lg border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-2 dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                    <HiDocumentTextOutline class="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 class="text-text-default text-lg font-semibold dark:text-text-dark-default">
                      {$localize`OpenVPN Configuration File`}
                    </h3>
                    <p class="text-text-muted dark:text-text-dark-muted text-sm">
                      {$localize`Upload or paste your .ovpn file. We'll automatically validate RouterOS compatibility.`}
                    </p>
                  </div>
                </div>
              </div>

              <div class="p-6">
                <VPNConfigFileSection
                  protocolName="OpenVPN"
                  acceptedExtensions=".ovpn,.conf"
                  configValue={config.value}
                  onConfigChange$={handleConfigChange$}
                  onFileUpload$={handleFileUpload$}
                  placeholder={$localize`Paste your OpenVPN configuration here. It should include directives like 'remote', 'proto', 'dev', etc.

Example:
client
dev tun
proto udp
remote vpn.example.com 1194
auth-user-pass
cipher AES-256-GCM
auth SHA256`}
                />
              </div>
            </div>
          )}

          {/* Authentication Type Selection */}
          {configMethod.value === "file" && authTypeSelectionNeeded.value && (
            <div class="overflow-hidden rounded-2xl border border-info-200 bg-white shadow-xl dark:border-info-700/60 dark:bg-surface-dark">
              <div class="border-b border-info-200 bg-gradient-to-r from-info-50 to-blue-50 px-6 py-4 dark:border-info-700/60 dark:from-info-900/30 dark:to-blue-900/30">
                <div class="flex items-center space-x-3">
                  <div class="rounded-lg border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-2 dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                    <HiQuestionMarkCircleOutline class="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 class="text-lg font-semibold text-info-900 dark:text-info-100">
                      {$localize`Choose Authentication Method`}
                    </h3>
                    <p class="text-sm text-info-700 dark:text-info-300">
                      {$localize`Your configuration doesn't specify an authentication method. Please choose how you want to authenticate with the VPN server.`}
                    </p>
                  </div>
                </div>
              </div>

              <div class="p-6">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Username/Password Option */}
                  <button
                    onClick$={() => handleAuthTypeSelection$("Credentials")}
                    class="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white 
                         p-6 text-left transition-all duration-200 
                         hover:border-primary-500 hover:shadow-lg dark:border-gray-700 dark:bg-surface-dark dark:hover:border-primary-400"
                  >
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0">
                        <div class="rounded-lg border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-3 transition-transform duration-200 group-hover:scale-110 dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                          <HiUserOutline class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-text-default mb-2 text-lg font-semibold dark:text-text-dark-default">
                          {$localize`Username & Password`}
                        </h4>
                        <p class="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                          {$localize`Use your VPN service username and password for authentication. Most common method.`}
                        </p>
                        <div class="mt-3 text-xs font-medium text-primary-600 dark:text-primary-400">
                          {$localize`Requires: Username, Password`}
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Certificate Option */}
                  <button
                    onClick$={() => handleAuthTypeSelection$("Certificate")}
                    class="group relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white 
                         p-6 text-left transition-all duration-200 
                         hover:border-secondary-500 hover:shadow-lg dark:border-gray-700 dark:bg-surface-dark dark:hover:border-secondary-400"
                  >
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0">
                        <div class="rounded-lg border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-3 transition-transform duration-200 group-hover:scale-110 dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                          <HiShieldCheckOutline class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-text-default mb-2 text-lg font-semibold dark:text-text-dark-default">
                          {$localize`Certificate Only`}
                        </h4>
                        <p class="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                          {$localize`Use client certificates for authentication. More secure but requires certificate management.`}
                        </p>
                        <div class="mt-3 text-xs font-medium text-secondary-600 dark:text-secondary-400">
                          {$localize`Requires: Client Certificate`}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>

                {/* Both Option */}
                <div class="mt-4">
                  <button
                    onClick$={() =>
                      handleAuthTypeSelection$("CredentialsCertificate")
                    }
                    class="group relative w-full overflow-hidden rounded-xl border-2 border-gray-200 bg-white 
                         p-6 text-left transition-all duration-200 
                         hover:border-warning-500 hover:shadow-lg dark:border-gray-700 dark:bg-surface-dark dark:hover:border-warning-400"
                  >
                    <div class="flex items-start space-x-4">
                      <div class="flex-shrink-0">
                        <div class="rounded-lg border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-3 transition-transform duration-200 group-hover:scale-110 dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                          <HiLockClosedOutline class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                      </div>
                      <div class="flex-1">
                        <h4 class="text-text-default mb-2 text-lg font-semibold dark:text-text-dark-default">
                          {$localize`Username & Password + Certificate`}
                        </h4>
                        <p class="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                          {$localize`Maximum security using both username/password and client certificates. Dual authentication.`}
                        </p>
                        <div class="mt-3 text-xs font-medium text-warning-600 dark:text-warning-400">
                          {$localize`Requires: Username, Password, Client Certificate`}
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Missing Fields Configuration */}
          {configMethod.value === "file" &&
            missingFields.value.length > 0 &&
            !authTypeSelectionNeeded.value && (
              <div class="overflow-hidden rounded-2xl border border-warning-200 bg-white shadow-xl dark:border-warning-700/60 dark:bg-surface-dark">
                <div class="border-b border-warning-200 bg-gradient-to-r from-warning-50 to-orange-50 px-6 py-4 dark:border-warning-700/60 dark:from-warning-900/30 dark:to-orange-900/30">
                  <div class="flex items-center space-x-3">
                    <div class="rounded-lg border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-2 dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                      <HiExclamationTriangleSolid class="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 class="text-lg font-semibold text-warning-900 dark:text-warning-100">
                        {$localize`Complete Your Configuration`}
                      </h3>
                      <p class="text-sm text-warning-700 dark:text-warning-300">
                        {$localize`Your configuration file is missing some required information. Please provide the missing details below.`}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="space-y-5 p-6">
                  {missingFields.value.includes("Username") && (
                    <FormField
                      label={$localize`Username`}
                      value={username.value}
                      onInput$={(_, el) => {
                        username.value = el.value;
                        handleManualFormSubmit$();
                      }}
                      required
                      placeholder={$localize`Your VPN username`}
                      helperText={$localize`Maximum 27 characters for RouterOS compatibility`}
                    />
                  )}
                  {missingFields.value.includes("Password") && (
                    <FormField
                      type="text"
                      label={$localize`Password`}
                      value={password.value}
                      onInput$={(_, el) => {
                        password.value = el.value;
                        handleManualFormSubmit$();
                      }}
                      required
                      placeholder={$localize`Your VPN password`}
                      helperText={$localize`Maximum 1000 characters for RouterOS compatibility`}
                    />
                  )}
                </div>
              </div>
            )}

          {/* Manual Configuration */}
          {configMethod.value === "manual" && (
            <div class="space-y-6">
              {/* Connection Settings */}
              <FormContainer
                title={$localize`Connection Settings`}
                description={$localize`Configure the basic connection parameters for your OpenVPN server`}
                bordered
              >
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    label={$localize`Server Address`}
                    required
                    value={serverAddress.value}
                    onInput$={(_, el) => {
                      serverAddress.value = el.value;
                      handleManualFormSubmit$();
                    }}
                    placeholder="vpn.example.com"
                    helperText={$localize`Domain name or IP address of your VPN server`}
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
                    helperText={$localize`Default OpenVPN port is 1194`}
                  />
                </div>

                <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label class="text-text-secondary dark:text-text-dark-secondary mb-3 block text-sm font-semibold">
                      {$localize`Protocol`} *
                    </label>
                    <RadioGroup
                      value={protocol.value}
                      onChange$={(value) => {
                        protocol.value = value as "tcp" | "udp";
                        handleManualFormSubmit$();
                      }}
                      options={[
                        { value: "udp", label: "UDP (Recommended)" },
                        { value: "tcp", label: "TCP" },
                      ]}
                      name="protocol"
                      class="space-x-8"
                    />
                    <p class="text-text-muted dark:text-text-dark-muted mt-2 text-xs">
                      {$localize`UDP is faster, TCP is more reliable through firewalls`}
                    </p>
                  </div>

                  <div>
                    <label class="text-text-secondary dark:text-text-dark-secondary mb-3 block text-sm font-semibold">
                      {$localize`Authentication Type`} *
                    </label>
                    <select
                      value={authType.value}
                      onChange$={(_, el) => {
                        authType.value = el.value as
                          | "Credentials"
                          | "Certificate"
                          | "CredentialsCertificate";
                        handleManualFormSubmit$();
                      }}
                      class="block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm transition-all duration-200
                           focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                           dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                    >
                      <option value="Credentials">{$localize`Username/Password`}</option>
                      <option
                        value="Certificate"
                        disabled
                      >{$localize`Certificates (Coming Soon)`}</option>
                      <option
                        value="CredentialsCertificate"
                        disabled
                      >{$localize`Username/Password & Certificates (Coming Soon)`}</option>
                    </select>
                    <p class="text-text-muted dark:text-text-dark-muted mt-2 text-xs">
                      {$localize`Most VPN providers use username/password authentication`}
                    </p>
                  </div>
                </div>
              </FormContainer>

              {/* Authentication Section */}
              {(authType.value === "Credentials" ||
                authType.value === "CredentialsCertificate") && (
                <FormContainer
                  title={$localize`Authentication Credentials`}
                  description={$localize`Enter your VPN service credentials`}
                  bordered
                >
                  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      label={$localize`Username`}
                      required
                      value={username.value}
                      onInput$={(_, el) => {
                        username.value = el.value;
                        handleManualFormSubmit$();
                      }}
                      placeholder={$localize`Your VPN username`}
                      helperText={$localize`Maximum 27 characters for RouterOS compatibility`}
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
                      placeholder={$localize`Your VPN password`}
                      helperText={$localize`Maximum 1000 characters for RouterOS compatibility`}
                    />
                  </div>
                </FormContainer>
              )}

              {/* Certificate Information */}
              {(authType.value === "Certificate" ||
                authType.value === "CredentialsCertificate") && (
                <div class="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 dark:border-blue-700/40 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <div class="rounded-xl border border-primary-200 bg-gradient-to-br from-primary-50 to-primary-100 p-3 dark:border-primary-700/60 dark:from-primary-900/40 dark:to-primary-800/40">
                        <HiLockClosedOutline class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <h3 class="mb-2 text-lg font-semibold text-blue-900 dark:text-blue-100">
                        {$localize`Certificate-Based Authentication`}
                      </h3>
                      <p class="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
                        {$localize`For certificate-based authentication, you'll need to manually import your certificates into RouterOS's certificate store using the Files → Certificates section in WinBox or the certificate import commands.`}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Encryption Settings */}
              <FormContainer
                title={$localize`Encryption Settings`}
                description={$localize`Configure the encryption parameters (leave default for most providers)`}
                bordered
              >
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    label={$localize`Cipher`}
                    value={cipher.value}
                    onInput$={(_, el) => {
                      cipher.value = el.value;
                      handleManualFormSubmit$();
                    }}
                    placeholder="aes256-gcm"
                    helperText={$localize`Supported: aes128/192/256-cbc, aes128/192/256-gcm, blowfish128, null`}
                  />

                  <FormField
                    label={$localize`Auth Hash`}
                    value={auth.value}
                    onInput$={(_, el) => {
                      auth.value = el.value;
                      handleManualFormSubmit$();
                    }}
                    placeholder="sha256"
                    helperText={$localize`Supported: md5, sha1, sha256, sha512, null (use null for GCM ciphers)`}
                  />
                </div>
              </FormContainer>
            </div>
          )}
        </div>

        {/* Error Message Display */}
        {errorMessage.value && (
          <ErrorMessage
            message={errorMessage.value}
            title={$localize`Configuration Error`}
          />
        )}

        {/* Help Footer */}
        <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center backdrop-blur-sm dark:border-gray-700/60 dark:from-gray-800/50 dark:to-gray-900/50">
          <p class="text-text-muted dark:text-text-dark-muted text-sm">
            {$localize`Fields marked with * are required • Need help? Check your VPN provider's RouterOS setup guide`}
          </p>
        </div>
      </div>
    );
  },
);
