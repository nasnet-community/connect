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
import {
  HiInformationCircleSolid,
  HiExclamationTriangleSolid,
  HiCheckCircleOutline,
  HiXCircleOutline,
  HiDocumentTextOutline,
  HiUserOutline,
  HiLockClosedOutline,
  HiShieldCheckOutline,
  HiQuestionMarkCircleOutline
} from "@qwikest/icons/heroicons";

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
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-info-50 via-blue-50 to-primary-50 dark:from-info-900/40 dark:via-blue-900/40 dark:to-primary-900/40 border border-info-200 dark:border-info-800/60 shadow-lg backdrop-blur-sm">
        {/* Background Pattern */}
        <div class="absolute inset-0 opacity-5 dark:opacity-10">
          <div class="absolute right-0 top-0 h-32 w-32 bg-info-600 dark:bg-info-400 rounded-full transform translate-x-6 -translate-y-6 blur-2xl"></div>
          <div class="absolute left-0 bottom-0 h-24 w-24 bg-primary-500 dark:bg-primary-400 rounded-full transform -translate-x-3 translate-y-3 blur-2xl"></div>
        </div>
        
        <div class="relative p-6 md:p-8">
          <div class="flex items-start space-x-5">
            {/* Icon */}
            <div class="flex-shrink-0">
              <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-xl shadow-lg p-3 border border-primary-200 dark:border-primary-700/60">
                <HiInformationCircleSolid class="h-7 w-7 text-primary-600 dark:text-primary-400" />
              </div>
            </div>
            
            {/* Content */}
            <div class="flex-1 min-w-0">
              <h3 class="text-xl font-bold text-info-900 dark:text-info-100 mb-2">
                {$localize`MikroTik RouterOS OpenVPN Support`}
              </h3>
              <p class="text-info-800 dark:text-info-200 text-sm leading-relaxed mb-4">
                {$localize`RouterOS has specialized OpenVPN implementation with specific capabilities. Our intelligent parser automatically detects and handles compatibility requirements.`}
              </p>
              
              {/* Feature Grid */}
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Supported Features */}
                <div class="bg-white/70 dark:bg-surface-dark/70 rounded-xl p-4 backdrop-blur-sm border border-white/60 dark:border-gray-700/60">
                  <div class="flex items-center mb-3">
                    <div class="w-2 h-2 bg-success rounded-full mr-2"></div>
                    <h4 class="font-semibold text-success-dark dark:text-success-light text-sm">
                      {$localize`Supported Features`}
                    </h4>
                  </div>
                  <ul class="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                    <li class="flex items-center">
                      <HiCheckCircleOutline class="w-3 h-3 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                      TCP/UDP protocols
                    </li>
                    <li class="flex items-center">
                      <HiCheckCircleOutline class="w-3 h-3 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                      AES encryption (128/192/256)
                    </li>
                    <li class="flex items-center">
                      <HiCheckCircleOutline class="w-3 h-3 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                      Username/password authentication
                    </li>
                    <li class="flex items-center">
                      <HiCheckCircleOutline class="w-3 h-3 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                      Certificate-based auth
                    </li>
                  </ul>
                </div>
                
                {/* Limitations */}
                <div class="bg-white/70 dark:bg-surface-dark/70 rounded-xl p-4 backdrop-blur-sm border border-white/60 dark:border-gray-700/60">
                  <div class="flex items-center mb-3">
                    <div class="w-2 h-2 bg-warning rounded-full mr-2"></div>
                    <h4 class="font-semibold text-warning-dark dark:text-warning-light text-sm">
                      {$localize`Key Limitations`}
                    </h4>
                  </div>
                  <ul class="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                    <li class="flex items-center">
                      <HiXCircleOutline class="w-3 h-3 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                      No LZO compression
                    </li>
                    <li class="flex items-center">
                      <HiXCircleOutline class="w-3 h-3 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                      No cipher negotiation
                    </li>
                    <li class="flex items-center">
                      <HiXCircleOutline class="w-3 h-3 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
                      Limited TLS features
                    </li>
                    <li class="flex items-center">
                      <HiXCircleOutline class="w-3 h-3 text-primary-600 dark:text-primary-400 mr-2 flex-shrink-0" />
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
        <div class="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-border dark:border-border-dark">
          <ConfigMethodToggle 
            method={configMethod.value}
            onMethodChange$={(method) => configMethod.value = method}
            class="rounded-xl"
          />
        </div>
      </div>
      
      {/* Compatibility Warnings */}
      {unsupportedDirectives.value.length > 0 && (
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-warning-50 via-orange-50 to-red-50 dark:from-warning-900/40 dark:via-orange-900/40 dark:to-red-900/40 border border-warning-200 dark:border-warning-800/60 shadow-lg backdrop-blur-sm">
          {/* Background Pattern */}
          <div class="absolute inset-0 opacity-5 dark:opacity-10">
            <div class="absolute right-4 top-4 h-20 w-20 bg-warning-400 dark:bg-warning-300 rounded-full transform rotate-12 blur-2xl"></div>
          </div>
          
          <div class="relative p-6">
            <div class="flex items-start space-x-4">
              <div class="flex-shrink-0">
                <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-xl shadow-lg p-3 border border-primary-200 dark:border-primary-700/60">
                  <HiExclamationTriangleSolid class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
              
              <div class="flex-1 min-w-0">
                <h3 class="text-lg font-bold text-warning-900 dark:text-warning-100 mb-2">
                  {$localize`RouterOS Compatibility Issues Detected`}
                </h3>
                <p class="text-warning-800 dark:text-warning-200 text-sm mb-4">
                  {$localize`Your configuration contains features that aren't supported by RouterOS and will be automatically ignored or adapted:`}
                </p>
                
                {/* Unsupported Directives Grid */}
                <div class="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 backdrop-blur-sm border border-warning-200/40 dark:border-warning-700/40 mb-4">
                  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {unsupportedDirectives.value.map(directive => (
                      <div key={directive} class="flex items-center bg-warning-100/60 dark:bg-warning-800/60 rounded-lg p-3">
                        <div class="w-2 h-2 bg-warning-500 rounded-full mr-3 flex-shrink-0"></div>
                        <code class="text-xs font-mono text-warning-800 dark:text-warning-200 break-all">
                          {directive}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Quick Fixes */}
                <div class="bg-info-50/60 dark:bg-info-900/60 rounded-xl p-4 border border-info-200/40 dark:border-info-700/40">
                  <div class="flex items-center mb-2">
                    <HiInformationCircleSolid class="w-4 h-4 text-primary-600 dark:text-primary-400 mr-2" />
                    <h4 class="font-semibold text-primary-800 dark:text-primary-200 text-sm">
                      {$localize`Quick Fixes`}
                    </h4>
                  </div>
                  <ul class="space-y-1 text-xs text-info-700 dark:text-info-300">
                    <li>• {$localize`Remove 'comp-lzo' directives (compression not supported)`}</li>
                    <li>• {$localize`Replace 'ncp-ciphers' with explicit 'cipher' directive`}</li>
                    <li>• {$localize`Import certificates manually in RouterOS certificate store`}</li>
                    <li>• {$localize`Use TLS 1.2+ for tls-auth/tls-crypt features (RouterOS 7.17+)`}</li>
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
          <div class="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-border dark:border-border-dark overflow-hidden">
            <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/30 dark:to-secondary-900/30 px-6 py-4 border-b border-border dark:border-border-dark">
              <div class="flex items-center space-x-3">
                <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-lg p-2 border border-primary-200 dark:border-primary-700/60">
                  <HiDocumentTextOutline class="h-5 w-5 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-text-default dark:text-text-dark-default">
                    {$localize`OpenVPN Configuration File`}
                  </h3>
                  <p class="text-sm text-text-muted dark:text-text-dark-muted">
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
          <div class="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-info-200 dark:border-info-700/60 overflow-hidden">
            <div class="bg-gradient-to-r from-info-50 to-blue-50 dark:from-info-900/30 dark:to-blue-900/30 px-6 py-4 border-b border-info-200 dark:border-info-700/60">
              <div class="flex items-center space-x-3">
                <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-lg p-2 border border-primary-200 dark:border-primary-700/60">
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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Username/Password Option */}
                <button
                  onClick$={() => handleAuthTypeSelection$("Credentials")}
                  class="group relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 
                         hover:border-primary-500 dark:hover:border-primary-400 transition-all duration-200 
                         bg-white dark:bg-surface-dark p-6 text-left hover:shadow-lg"
                >
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-lg p-3 group-hover:scale-110 transition-transform duration-200 border border-primary-200 dark:border-primary-700/60">
                        <HiUserOutline class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-text-default dark:text-text-dark-default mb-2">
                        {$localize`Username & Password`}
                      </h4>
                      <p class="text-sm text-text-muted dark:text-text-dark-muted leading-relaxed">
                        {$localize`Use your VPN service username and password for authentication. Most common method.`}
                      </p>
                      <div class="mt-3 text-xs text-primary-600 dark:text-primary-400 font-medium">
                        {$localize`Requires: Username, Password`}
                      </div>
                    </div>
                  </div>
                </button>

                {/* Certificate Option */}
                <button
                  onClick$={() => handleAuthTypeSelection$("Certificate")}
                  class="group relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 
                         hover:border-secondary-500 dark:hover:border-secondary-400 transition-all duration-200 
                         bg-white dark:bg-surface-dark p-6 text-left hover:shadow-lg"
                >
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-lg p-3 group-hover:scale-110 transition-transform duration-200 border border-primary-200 dark:border-primary-700/60">
                        <HiShieldCheckOutline class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-text-default dark:text-text-dark-default mb-2">
                        {$localize`Certificate Only`}
                      </h4>
                      <p class="text-sm text-text-muted dark:text-text-dark-muted leading-relaxed">
                        {$localize`Use client certificates for authentication. More secure but requires certificate management.`}
                      </p>
                      <div class="mt-3 text-xs text-secondary-600 dark:text-secondary-400 font-medium">
                        {$localize`Requires: Client Certificate`}
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {/* Both Option */}
              <div class="mt-4">
                <button
                  onClick$={() => handleAuthTypeSelection$("CredentialsCertificate")}
                  class="group w-full relative overflow-hidden rounded-xl border-2 border-gray-200 dark:border-gray-700 
                         hover:border-warning-500 dark:hover:border-warning-400 transition-all duration-200 
                         bg-white dark:bg-surface-dark p-6 text-left hover:shadow-lg"
                >
                  <div class="flex items-start space-x-4">
                    <div class="flex-shrink-0">
                      <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-lg p-3 group-hover:scale-110 transition-transform duration-200 border border-primary-200 dark:border-primary-700/60">
                        <HiLockClosedOutline class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-semibold text-text-default dark:text-text-dark-default mb-2">
                        {$localize`Username & Password + Certificate`}
                      </h4>
                      <p class="text-sm text-text-muted dark:text-text-dark-muted leading-relaxed">
                        {$localize`Maximum security using both username/password and client certificates. Dual authentication.`}
                      </p>
                      <div class="mt-3 text-xs text-warning-600 dark:text-warning-400 font-medium">
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
        {configMethod.value === "file" && missingFields.value.length > 0 && !authTypeSelectionNeeded.value && (
          <div class="bg-white dark:bg-surface-dark rounded-2xl shadow-xl border border-warning-200 dark:border-warning-700/60 overflow-hidden">
            <div class="bg-gradient-to-r from-warning-50 to-orange-50 dark:from-warning-900/30 dark:to-orange-900/30 px-6 py-4 border-b border-warning-200 dark:border-warning-700/60">
              <div class="flex items-center space-x-3">
                <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-lg p-2 border border-primary-200 dark:border-primary-700/60">
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
            
            <div class="p-6 space-y-5">
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
                  type="password"
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
              {missingFields.value.includes("Client Certificate") && (
                <FormField
                  label={$localize`Client Certificate Name`}
                  value={clientCertName.value} 
                  onInput$={(_, el) => {
                    clientCertName.value = el.value;
                    handleManualFormSubmit$();
                  }}
                  required
                  placeholder={$localize`client-cert`}
                  helperText={$localize`Name of the client certificate in your RouterOS certificate store`}
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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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

              <div class="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-semibold text-text-secondary dark:text-text-dark-secondary mb-3">
                    {$localize`Protocol`} *
                  </label>
                  <RadioGroup
                    value={protocol.value}
                    onChange$={(value) => {
                      protocol.value = value as "tcp" | "udp";
                      handleManualFormSubmit$();
                    }}
                    options={[
                      { value: 'udp', label: 'UDP (Recommended)' },
                      { value: 'tcp', label: 'TCP' },
                    ]}
                    name="protocol"
                    class="space-x-8"
                  />
                  <p class="mt-2 text-xs text-text-muted dark:text-text-dark-muted">
                    {$localize`UDP is faster, TCP is more reliable through firewalls`}
                  </p>
                </div>
                
                <div>
                  <label class="block text-sm font-semibold text-text-secondary dark:text-text-dark-secondary mb-3">
                    {$localize`Authentication Type`} *
                  </label>
                  <select
                    value={authType.value}
                    onChange$={(_, el) => {
                      authType.value = el.value as "Credentials" | "Certificate" | "CredentialsCertificate";
                      handleManualFormSubmit$();
                    }}
                    class="block w-full rounded-xl border border-border dark:border-border-dark bg-white dark:bg-surface-dark px-4 py-3 text-sm
                           focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20
                           dark:text-text-dark-default transition-all duration-200"
                  >
                    <option value="Credentials">{$localize`Username/Password`}</option>
                    <option value="Certificate" disabled>{$localize`Certificates (Coming Soon)`}</option>
                    <option value="CredentialsCertificate" disabled>{$localize`Username/Password & Certificates (Coming Soon)`}</option>
                  </select>
                  <p class="mt-2 text-xs text-text-muted dark:text-text-dark-muted">
                    {$localize`Most VPN providers use username/password authentication`}
                  </p>
                </div>
              </div>
            </FormContainer>
            
            {/* Authentication Section */}
            {(authType.value === "Credentials" || authType.value === "CredentialsCertificate") && (
              <FormContainer 
                title={$localize`Authentication Credentials`}
                description={$localize`Enter your VPN service credentials`}
                bordered
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    type="password"
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
            {(authType.value === "Certificate" || authType.value === "CredentialsCertificate") && (
              <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-700/40 p-6">
                <div class="flex items-start space-x-4">
                  <div class="flex-shrink-0">
                    <div class="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/40 dark:to-primary-800/40 rounded-xl p-3 border border-primary-200 dark:border-primary-700/60">
                      <HiLockClosedOutline class="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      {$localize`Certificate-Based Authentication`}
                    </h3>
                    <p class="text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
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
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      <div class="text-center bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700/60 backdrop-blur-sm">
        <p class="text-sm text-text-muted dark:text-text-dark-muted">
          {$localize`Fields marked with * are required • Need help? Check your VPN provider's RouterOS setup guide`}
        </p>
      </div>
    </div>
  );
}); 