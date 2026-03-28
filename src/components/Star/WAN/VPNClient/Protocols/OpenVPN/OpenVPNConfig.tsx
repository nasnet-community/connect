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
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface OpenVPNConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const OpenVPNConfig = component$<OpenVPNConfigProps>(
  ({ onIsValidChange$, isSaving }) => {
    const locale = useMessageLocale();
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
                  {semanticMessages.vpn_openvpn_easy_routeros_support_title(
                    {},
                    { locale },
                  )}
                </h3>
                <p class="mb-4 text-sm leading-relaxed text-info-800 dark:text-info-200">
                  {semanticMessages.vpn_openvpn_easy_routeros_support_description(
                    {},
                    { locale },
                  )}
                </p>

                {/* Feature Grid */}
                <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  {/* Supported Features */}
                  <div class="rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm dark:border-gray-700/60 dark:bg-surface-dark/70">
                    <div class="mb-3 flex items-center">
                      <div class="mr-2 h-2 w-2 rounded-full bg-success"></div>
                      <h4 class="text-sm font-semibold text-success-dark dark:text-success-light">
                        {semanticMessages.vpn_openvpn_easy_supported_features(
                          {},
                          { locale },
                        )}
                      </h4>
                    </div>
                    <ul class="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                      <li class="flex items-center">
                        <HiCheckCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        {semanticMessages.vpn_openvpn_easy_feature_protocols(
                          {},
                          { locale },
                        )}
                      </li>
                      <li class="flex items-center">
                        <HiCheckCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        {semanticMessages.vpn_openvpn_easy_feature_aes(
                          {},
                          { locale },
                        )}
                      </li>
                      <li class="flex items-center">
                        <HiCheckCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        {semanticMessages.vpn_openvpn_easy_feature_credentials(
                          {},
                          { locale },
                        )}
                      </li>
                      <li class="flex items-center">
                        <HiCheckCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        {semanticMessages.vpn_openvpn_easy_feature_certificates(
                          {},
                          { locale },
                        )}
                      </li>
                    </ul>
                  </div>

                  {/* Limitations */}
                  <div class="rounded-xl border border-white/60 bg-white/70 p-4 backdrop-blur-sm dark:border-gray-700/60 dark:bg-surface-dark/70">
                    <div class="mb-3 flex items-center">
                      <div class="mr-2 h-2 w-2 rounded-full bg-warning"></div>
                      <h4 class="text-sm font-semibold text-warning-dark dark:text-warning-light">
                        {semanticMessages.vpn_openvpn_easy_key_limitations(
                          {},
                          { locale },
                        )}
                      </h4>
                    </div>
                    <ul class="space-y-1.5 text-xs text-gray-700 dark:text-gray-300">
                      <li class="flex items-center">
                        <HiXCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        {semanticMessages.vpn_openvpn_easy_limitation_lzo(
                          {},
                          { locale },
                        )}
                      </li>
                      <li class="flex items-center">
                        <HiXCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        {semanticMessages.vpn_openvpn_easy_limitation_cipher_negotiation(
                          {},
                          { locale },
                        )}
                      </li>
                      <li class="flex items-center">
                        <HiXCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        {semanticMessages.vpn_openvpn_easy_limitation_tls(
                          {},
                          { locale },
                        )}
                      </li>
                      <li class="flex items-center">
                        <HiXCircleOutline class="mr-2 h-3 w-3 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                        {semanticMessages.vpn_openvpn_easy_limitation_manual_cert_import(
                          {},
                          { locale },
                        )}
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
                    {semanticMessages.vpn_openvpn_easy_compatibility_issues_title(
                      {},
                      { locale },
                    )}
                  </h3>
                  <p class="mb-4 text-sm text-warning-800 dark:text-warning-200">
                    {semanticMessages.vpn_openvpn_easy_compatibility_issues_description(
                      {},
                      { locale },
                    )}
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
                        {semanticMessages.vpn_openvpn_easy_quick_fixes(
                          {},
                          { locale },
                        )}
                      </h4>
                    </div>
                    <ul class="space-y-1 text-xs text-info-700 dark:text-info-300">
                      <li>
                        •{" "}
                        {semanticMessages.vpn_openvpn_easy_fix_remove_comp_lzo(
                          {},
                          { locale },
                        )}
                      </li>
                      <li>
                        •{" "}
                        {semanticMessages.vpn_openvpn_easy_fix_replace_ncp_ciphers(
                          {},
                          { locale },
                        )}
                      </li>
                      <li>
                        •{" "}
                        {semanticMessages.vpn_openvpn_easy_fix_import_certificates(
                          {},
                          { locale },
                        )}
                      </li>
                      <li>
                        •{" "}
                        {semanticMessages.vpn_openvpn_easy_fix_use_tls_1_2(
                          {},
                          { locale },
                        )}
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
                      {semanticMessages.vpn_openvpn_easy_config_file_title(
                        {},
                        { locale },
                      )}
                    </h3>
                    <p class="text-text-muted dark:text-text-dark-muted text-sm">
                      {semanticMessages.vpn_openvpn_easy_config_file_description(
                        {},
                        { locale },
                      )}
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
                  placeholder={semanticMessages.vpn_openvpn_config_placeholder_full(
                    {},
                    { locale },
                  )}
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
                      {semanticMessages.vpn_openvpn_easy_auth_method_title(
                        {},
                        { locale },
                      )}
                    </h3>
                    <p class="text-sm text-info-700 dark:text-info-300">
                      {semanticMessages.vpn_openvpn_easy_auth_method_description(
                        {},
                        { locale },
                      )}
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
                          {semanticMessages.vpn_openvpn_easy_auth_credentials_title(
                            {},
                            { locale },
                          )}
                        </h4>
                        <p class="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                          {semanticMessages.vpn_openvpn_easy_auth_credentials_description(
                            {},
                            { locale },
                          )}
                        </p>
                        <div class="mt-3 text-xs font-medium text-primary-600 dark:text-primary-400">
                          {semanticMessages.vpn_openvpn_easy_auth_credentials_requires(
                            {},
                            { locale },
                          )}
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
                          {semanticMessages.vpn_openvpn_easy_auth_certificate_title(
                            {},
                            { locale },
                          )}
                        </h4>
                        <p class="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                          {semanticMessages.vpn_openvpn_easy_auth_certificate_description(
                            {},
                            { locale },
                          )}
                        </p>
                        <div class="mt-3 text-xs font-medium text-secondary-600 dark:text-secondary-400">
                          {semanticMessages.vpn_openvpn_easy_auth_certificate_requires(
                            {},
                            { locale },
                          )}
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
                          {semanticMessages.vpn_openvpn_easy_auth_both_title(
                            {},
                            { locale },
                          )}
                        </h4>
                        <p class="text-text-muted dark:text-text-dark-muted text-sm leading-relaxed">
                          {semanticMessages.vpn_openvpn_easy_auth_both_description(
                            {},
                            { locale },
                          )}
                        </p>
                        <div class="mt-3 text-xs font-medium text-warning-600 dark:text-warning-400">
                          {semanticMessages.vpn_openvpn_easy_auth_both_requires(
                            {},
                            { locale },
                          )}
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
                        {semanticMessages.vpn_openvpn_easy_complete_configuration(
                          {},
                          { locale },
                        )}
                      </h3>
                      <p class="text-sm text-warning-700 dark:text-warning-300">
                        {semanticMessages.vpn_openvpn_easy_missing_config_description(
                          {},
                          { locale },
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="space-y-5 p-6">
                  {missingFields.value.includes("Username") && (
                    <FormField
                      label={semanticMessages.shared_username({}, { locale })}
                      value={username.value}
                      onInput$={(_, el) => {
                        username.value = el.value;
                        handleManualFormSubmit$();
                      }}
                      required
                      placeholder={semanticMessages.vpn_openvpn_easy_username_placeholder(
                        {},
                        { locale },
                      )}
                      helperText={semanticMessages.vpn_openvpn_easy_username_help(
                        {},
                        { locale },
                      )}
                    />
                  )}
                  {missingFields.value.includes("Password") && (
                    <FormField
                      type="text"
                      label={semanticMessages.vpn_openvpn_password(
                        {},
                        { locale },
                      )}
                      value={password.value}
                      onInput$={(_, el) => {
                        password.value = el.value;
                        handleManualFormSubmit$();
                      }}
                      required
                      placeholder={semanticMessages.vpn_openvpn_easy_password_placeholder(
                        {},
                        { locale },
                      )}
                      helperText={semanticMessages.vpn_openvpn_easy_password_help(
                        {},
                        { locale },
                      )}
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
                title={semanticMessages.vpn_pptp_connection_title(
                  {},
                  { locale },
                )}
                description={semanticMessages.vpn_openvpn_easy_connection_description(
                  {},
                  { locale },
                )}
                bordered
              >
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    label={semanticMessages.vpn_openvpn_server_address(
                      {},
                      { locale },
                    )}
                    required
                    value={serverAddress.value}
                    onInput$={(_, el) => {
                      serverAddress.value = el.value;
                      handleManualFormSubmit$();
                    }}
                    placeholder="vpn.example.com"
                    helperText={semanticMessages.vpn_openvpn_easy_server_address_help(
                      {},
                      { locale },
                    )}
                  />

                  <FormField
                    label={semanticMessages.vpn_openvpn_server_port(
                      {},
                      { locale },
                    )}
                    required
                    value={serverPort.value}
                    onInput$={(_, el) => {
                      serverPort.value = el.value;
                      handleManualFormSubmit$();
                    }}
                    placeholder="1194"
                    helperText={semanticMessages.vpn_openvpn_easy_server_port_help(
                      {},
                      { locale },
                    )}
                  />
                </div>

                <div class="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label class="text-text-secondary dark:text-text-dark-secondary mb-3 block text-sm font-semibold">
                      {semanticMessages.vpn_openvpn_protocol({}, { locale })} *
                    </label>
                    <RadioGroup
                      value={protocol.value}
                      onChange$={(value) => {
                        protocol.value = value as "tcp" | "udp";
                        handleManualFormSubmit$();
                      }}
                      options={[
                        {
                          value: "udp",
                          label:
                            semanticMessages.vpn_openvpn_easy_protocol_udp_recommended(
                              {},
                              { locale },
                            ),
                        },
                        {
                          value: "tcp",
                          label: semanticMessages.vpn_openvpn_easy_protocol_tcp(
                            {},
                            { locale },
                          ),
                        },
                      ]}
                      name="protocol"
                      class="space-x-8"
                    />
                    <p class="text-text-muted dark:text-text-dark-muted mt-2 text-xs">
                      {semanticMessages.vpn_openvpn_easy_protocol_help(
                        {},
                        { locale },
                      )}
                    </p>
                  </div>

                  <div>
                    <label class="text-text-secondary dark:text-text-dark-secondary mb-3 block text-sm font-semibold">
                      {semanticMessages.vpn_openvpn_easy_auth_type(
                        {},
                        { locale },
                      )}{" "}
                      *
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
                      <option value="Credentials">
                        {semanticMessages.vpn_openvpn_easy_auth_type_credentials(
                          {},
                          { locale },
                        )}
                      </option>
                      <option value="Certificate" disabled>
                        {semanticMessages.vpn_ikev2_auth_cert_soon(
                          {},
                          { locale },
                        )}
                      </option>
                      <option value="CredentialsCertificate" disabled>
                        {semanticMessages.vpn_openvpn_easy_auth_type_credentials_certificates_soon(
                          {},
                          { locale },
                        )}
                      </option>
                    </select>
                    <p class="text-text-muted dark:text-text-dark-muted mt-2 text-xs">
                      {semanticMessages.vpn_openvpn_easy_auth_type_help(
                        {},
                        { locale },
                      )}
                    </p>
                  </div>
                </div>
              </FormContainer>

              {/* Authentication Section */}
              {(authType.value === "Credentials" ||
                authType.value === "CredentialsCertificate") && (
                <FormContainer
                  title={semanticMessages.vpn_openvpn_easy_credentials_title(
                    {},
                    { locale },
                  )}
                  description={semanticMessages.vpn_openvpn_easy_credentials_description(
                    {},
                    { locale },
                  )}
                  bordered
                >
                  <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <FormField
                      label={semanticMessages.shared_username({}, { locale })}
                      required
                      value={username.value}
                      onInput$={(_, el) => {
                        username.value = el.value;
                        handleManualFormSubmit$();
                      }}
                      placeholder={semanticMessages.vpn_openvpn_easy_username_placeholder(
                        {},
                        { locale },
                      )}
                      helperText={semanticMessages.vpn_openvpn_easy_username_help(
                        {},
                        { locale },
                      )}
                    />

                    <FormField
                      type="text"
                      label={semanticMessages.vpn_openvpn_password(
                        {},
                        { locale },
                      )}
                      required
                      value={password.value}
                      onInput$={(_, el) => {
                        password.value = el.value;
                        handleManualFormSubmit$();
                      }}
                      placeholder={semanticMessages.vpn_openvpn_easy_password_placeholder(
                        {},
                        { locale },
                      )}
                      helperText={semanticMessages.vpn_openvpn_easy_password_help(
                        {},
                        { locale },
                      )}
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
                        {semanticMessages.vpn_openvpn_easy_certificate_auth_title(
                          {},
                          { locale },
                        )}
                      </h3>
                      <p class="text-sm leading-relaxed text-blue-800 dark:text-blue-200">
                        {semanticMessages.vpn_openvpn_easy_certificate_auth_description(
                          {},
                          { locale },
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Encryption Settings */}
              <FormContainer
                title={semanticMessages.vpn_openvpn_easy_encryption_title(
                  {},
                  { locale },
                )}
                description={semanticMessages.vpn_openvpn_easy_encryption_description(
                  {},
                  { locale },
                )}
                bordered
              >
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <FormField
                    label={semanticMessages.vpn_openvpn_cipher({}, { locale })}
                    value={cipher.value}
                    onInput$={(_, el) => {
                      cipher.value = el.value;
                      handleManualFormSubmit$();
                    }}
                    placeholder="aes256-gcm"
                    helperText={semanticMessages.vpn_openvpn_easy_cipher_help(
                      {},
                      { locale },
                    )}
                  />

                  <FormField
                    label={semanticMessages.vpn_openvpn_easy_auth_hash(
                      {},
                      { locale },
                    )}
                    value={auth.value}
                    onInput$={(_, el) => {
                      auth.value = el.value;
                      handleManualFormSubmit$();
                    }}
                    placeholder="sha256"
                    helperText={semanticMessages.vpn_openvpn_easy_auth_hash_help(
                      {},
                      { locale },
                    )}
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
            title={semanticMessages.vpn_openvpn_easy_configuration_error(
              {},
              { locale },
            )}
          />
        )}

        {/* Help Footer */}
        <div class="rounded-2xl border border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-6 text-center backdrop-blur-sm dark:border-gray-700/60 dark:from-gray-800/50 dark:to-gray-900/50">
          <p class="text-text-muted dark:text-text-dark-muted text-sm">
            {semanticMessages.vpn_openvpn_easy_help_footer({}, { locale })}
          </p>
        </div>
      </div>
    );
  },
);
