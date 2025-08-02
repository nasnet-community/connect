import { component$ } from "@builder.io/qwik";
import { useOpenVPNServer } from "./useOpenVPNServer";
import {
  Card,
  FormField,
  Input,
  Button,
  TabNavigation,
  Select,
} from "../../../VPNServer/UI";
import {
  HiDocumentOutline,
  HiLockClosedOutline,
  HiServerOutline,
} from "@qwikest/icons/heroicons";

export const OpenVPNServerAdvanced = component$(() => {
  const {
    advancedFormState,
    isEnabled,
    showPassphrase,
    activeTab,
    certificateError,
    passphraseError,
    tabOptions,
    protocolOptions,
    modeOptions,
    authMethodOptions,
    cipherOptions,
    tlsVersionOptions,
    updateName$,
    updateCertificate$,
    updateCertificateKeyPassphrase$,
    updateProtocol$,
    updatePort$,
    updateMode$,
    updateAddressPool$,
    updateDefaultProfile$,
    updateMaxMtu$,
    updateMaxMru$,
    updateKeepaliveTimeout$,
    updateAuth$,
    updateCipher$,
    updateTlsVersion$,
    updateRequireClientCertificate$,
    handleToggle,
    togglePassphraseVisibility$,
  } = useOpenVPNServer();

  return (
    <Card
      title={$localize`OpenVPN Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      {/* Enable/Disable */}
      <FormField label={$localize`Enable OpenVPN Server`}>
        <input
          type="checkbox"
          checked={isEnabled.value}
          onChange$={() => handleToggle(!isEnabled.value)}
          class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
        />
      </FormField>

      {isEnabled.value && (
        <>
          {/* Tab Navigation */}
          <TabNavigation
            tabs={tabOptions}
            activeTab={activeTab.value}
            onSelect$={(tabId: string) =>
              (activeTab.value = tabId as "basic" | "network" | "security")
            }
          />

          {/* Basic Settings */}
          {activeTab.value === "basic" && (
            <div class="space-y-4">
              {/* Profile Name */}
              <FormField label={$localize`Profile Name`}>
                <Input
                  type="text"
                  value={advancedFormState.name}
                  onChange$={(event: Event, value: string) => {
                    updateName$(value);
                  }}
                  placeholder={$localize`Enter profile name`}
                />
              </FormField>

              {/* Certificate */}
              <FormField
                label={$localize`Server Certificate`}
                errorMessage={certificateError.value}
              >
                <div class="flex items-center gap-2">
                  <Input
                    type="text"
                    value={advancedFormState.certificate}
                    onChange$={(event: Event, value: string) => {
                      updateCertificate$(value);
                    }}
                    placeholder={$localize`Enter certificate name`}
                    validation={certificateError.value ? "invalid" : "default"}
                  />
                  <Button
                    onClick$={() => {}}
                    primary={false}
                    class="flex items-center gap-1"
                  >
                    <HiDocumentOutline class="h-5 w-5" />
                    {$localize`Select`}
                  </Button>
                </div>
              </FormField>

              {/* Certificate Key Passphrase */}
              <FormField
                label={$localize`Certificate Key Passphrase`}
                errorMessage={passphraseError.value}
              >
                <div class="relative">
                  <Input
                    type={showPassphrase.value ? "text" : "password"}
                    value={advancedFormState.certificateKeyPassphrase}
                    onChange$={(event: Event, value: string) => {
                      updateCertificateKeyPassphrase$(value);
                    }}
                    placeholder={$localize`Enter passphrase (at least 10 characters)`}
                    validation={passphraseError.value ? "invalid" : "default"}
                    hasSuffixSlot={true}
                  >
                    <button
                      q:slot="suffix"
                      type="button"
                      onClick$={togglePassphraseVisibility$}
                      class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <HiLockClosedOutline class="h-5 w-5" />
                    </button>
                  </Input>
                </div>
              </FormField>

              {/* Protocol */}
              <FormField label={$localize`Protocol`}>
                <Select
                  options={protocolOptions}
                  value={advancedFormState.protocol}
                  onChange$={(value: string) => {
                    updateProtocol$(value as any);
                  }}
                />
              </FormField>

              {/* Port */}
              <FormField label={$localize`Port`}>
                <Input
                  type="number"
                  value={advancedFormState.port.toString()}
                  onChange$={(event: Event, value: string) => {
                    updatePort$(parseInt(value, 10) || 1194);
                  }}
                  placeholder="1-65535"
                />
              </FormField>
            </div>
          )}

          {/* Network Settings */}
          {activeTab.value === "network" && (
            <div class="space-y-4">
              {/* Mode */}
              <FormField label={$localize`Mode`}>
                <Select
                  options={modeOptions}
                  value={advancedFormState.mode}
                  onChange$={(value: string) => {
                    updateMode$(value as any);
                  }}
                />
              </FormField>

              {/* Address Pool */}
              <FormField label={$localize`Address Pool`}>
                <Input
                  type="text"
                  value={advancedFormState.addressPool}
                  onChange$={(event: Event, value: string) => {
                    updateAddressPool$(value);
                  }}
                  placeholder={$localize`e.g., 192.168.78.0/24`}
                />
              </FormField>

              {/* Default Profile */}
              <FormField label={$localize`Default Profile`}>
                <Input
                  type="text"
                  value={advancedFormState.defaultProfile}
                  onChange$={(event: Event, value: string) => {
                    updateDefaultProfile$(value);
                  }}
                  placeholder={$localize`Enter PPP profile name`}
                />
              </FormField>

              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField label={$localize`Maximum MTU`}>
                  <Input
                    type="number"
                    value={String(advancedFormState.maxMtu)}
                    onChange$={(event: Event, value: string) => {
                      updateMaxMtu$(parseInt(value) || 1450);
                    }}
                  />
                </FormField>

                <FormField label={$localize`Maximum MRU`}>
                  <Input
                    type="number"
                    value={String(advancedFormState.maxMru)}
                    onChange$={(event: Event, value: string) => {
                      updateMaxMru$(parseInt(value) || 1450);
                    }}
                  />
                </FormField>
              </div>

              <FormField label={$localize`Keepalive Timeout`}>
                <Input
                  type="number"
                  value={String(advancedFormState.keepaliveTimeout)}
                  onChange$={(event: Event, value: string) => {
                    updateKeepaliveTimeout$(parseInt(value) || 30);
                  }}
                />
              </FormField>
            </div>
          )}

          {/* Security Settings */}
          {activeTab.value === "security" && (
            <div class="space-y-4">
              {/* Auth Method */}
              <FormField label={$localize`Authentication Algorithm`}>
                <Select
                  options={authMethodOptions}
                  value={advancedFormState.auth}
                  onChange$={(value: string) => {
                    updateAuth$(value as any);
                  }}
                />
              </FormField>

              {/* Cipher */}
              <FormField label={$localize`Encryption Cipher`}>
                <Select
                  options={cipherOptions}
                  value={advancedFormState.cipher}
                  onChange$={(value: string) => {
                    updateCipher$(value as any);
                  }}
                />
              </FormField>

              {/* TLS Version */}
              <FormField label={$localize`TLS Version`}>
                <Select
                  options={tlsVersionOptions}
                  value={advancedFormState.tlsVersion}
                  onChange$={(value: string) => {
                    updateTlsVersion$(value as any);
                  }}
                />
              </FormField>

              {/* Require Client Certificate */}
              <FormField label={$localize`Require Client Certificate`}>
                <input
                  type="checkbox"
                  checked={advancedFormState.requireClientCertificate}
                  onChange$={() => {
                    updateRequireClientCertificate$(
                      !advancedFormState.requireClientCertificate,
                    );
                  }}
                  class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                />
              </FormField>
            </div>
          )}
        </>
      )}
    </Card>
  );
});
