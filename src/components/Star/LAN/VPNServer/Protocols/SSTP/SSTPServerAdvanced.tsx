import { component$, useStore, $ } from "@builder.io/qwik";
import { HiDocumentOutline } from "@qwikest/icons/heroicons";
import { useSSTPServer } from "./useSSTPServer";
import type { AuthMethod, TLSVersion } from "../../../../StarContext/CommonType";
import { ServerCard } from "~/components/Core/Card";
import { 
  ServerFormField, 
  ServerButton,
  Select,
  CheckboxGroup
} from "~/components/Core/Form/ServerField";
import { Input } from "~/components/Core/Input";
import { ServerIcon } from "../icons";

// Using shared serialized icon from icons.ts

export const SSTPServerAdvanced = component$(() => {
  const { sstpState, updateSSTPServer$, certificateError } = useSSTPServer();
  
  const formState = useStore({
    profile: sstpState.Profile || "default",
    certificate: sstpState.Certificate || "",
    port: sstpState.Port || 443,
    authentication: sstpState.Authentication || ["mschap2", "mschap1"],
    forceAes: sstpState.ForceAes !== undefined ? sstpState.ForceAes : true,
    pfs: sstpState.Pfs !== undefined ? sstpState.Pfs : true,
    verifyClientCertificate: sstpState.VerifyClientCertificate !== undefined ? sstpState.VerifyClientCertificate : false,
    tlsVersion: sstpState.TlsVersion || "only-1.2"
  });

  const authMethods: AuthMethod[] = ["pap", "chap", "mschap1", "mschap2"];
  const tlsVersions: {value: TLSVersion, label: string}[] = [
    { value: "any", label: "Any" },
    { value: "only-1.2", label: "TLS 1.2 Only" },
    { value: "only-1.3", label: "TLS 1.3 Only" }
  ];

  const authOptions = authMethods.map(method => ({
    value: method,
    label: method.toUpperCase()
  }));

  // Helper function to update the server configuration
  const updateServerConfig = $((updatedValues: Partial<typeof formState>) => {
    // Update local state first
    Object.assign(formState, updatedValues);
    
    // Then update server config
    updateSSTPServer$({
      Profile: formState.profile,
      Certificate: formState.certificate,
      Port: formState.port,
      Authentication: formState.authentication,
      ForceAes: formState.forceAes,
      Pfs: formState.pfs,
      VerifyClientCertificate: formState.verifyClientCertificate,
      TlsVersion: formState.tlsVersion as TLSVersion
    });
  });

  const toggleAuthMethod = $((method: string) => {
    try {
      const authMethod = method as AuthMethod;
      const index = formState.authentication.indexOf(authMethod);
      if (index === -1) {
        formState.authentication = [...formState.authentication, authMethod];
      } else {
        formState.authentication = formState.authentication.filter(m => m !== authMethod);
      }
      // Apply changes immediately
      updateServerConfig({});
    } catch (error) {
      console.error("Error toggling auth method:", error);
    }
  });

  return (
    <ServerCard
      title={$localize`SSTP Server`}
      icon={ServerIcon}
    >
      <div class="space-y-4">
        {/* Profile Name */}
        <ServerFormField label={$localize`Profile Name`}>
          <Input
            type="text"
            value={formState.profile}
            onChange$={(_, value) => updateServerConfig({ profile: value })}
            placeholder={$localize`Enter profile name`}
          />
        </ServerFormField>

        {/* Certificate */}
        <ServerFormField 
          label={$localize`SSL Certificate`}
          errorMessage={certificateError.value}
        >
          <div class="flex items-center gap-2">
            <Input
              type="text"
              value={formState.certificate}
              onChange$={(_, value) => updateServerConfig({ certificate: value })}
              placeholder={$localize`Enter certificate name`}
              validation={certificateError.value ? "invalid" : "default"}
            />
            <ServerButton
              onClick$={() => {}}
              primary={false}
              class="flex items-center gap-1"
            >
              <HiDocumentOutline class="h-5 w-5" />
              {$localize`Select`}
            </ServerButton>
          </div>
          {certificateError.value && (
            <p class="mt-1 text-sm text-red-600 dark:text-red-500">
              {certificateError.value}
            </p>
          )}
        </ServerFormField>

        {/* Port */}
        <ServerFormField label={$localize`Port`}>
          <Input
            type="number"
            value={formState.port.toString()}
            onChange$={(_, value) => updateServerConfig({ port: parseInt(value, 10) || 443 })}
            placeholder="1-65535"
          />
        </ServerFormField>

        {/* Authentication Methods */}
        <ServerFormField label={$localize`Authentication Methods`}>
          <CheckboxGroup
            options={authOptions}
            selected={formState.authentication}
            onToggle$={toggleAuthMethod}
          />
        </ServerFormField>

        {/* TLS Version */}
        <ServerFormField label={$localize`TLS Version`}>
          <Select
            options={tlsVersions}
            value={formState.tlsVersion}
            onChange$={(value) => updateServerConfig({ tlsVersion: value as TLSVersion })}
          />
        </ServerFormField>

        {/* Force AES */}
        <ServerFormField label={$localize`Force AES Encryption`}>
          <input
            type="checkbox"
            checked={formState.forceAes}
            onChange$={() => updateServerConfig({ forceAes: !formState.forceAes })}
            class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Force AES encryption for better security`}
          </p>
        </ServerFormField>

        {/* Perfect Forward Secrecy */}
        <ServerFormField label={$localize`Perfect Forward Secrecy (PFS)`}>
          <input
            type="checkbox"
            checked={formState.pfs}
            onChange$={() => updateServerConfig({ pfs: !formState.pfs })}
            class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Enable perfect forward secrecy for enhanced security`}
          </p>
        </ServerFormField>

        {/* Verify Client Certificate */}
        <ServerFormField label={$localize`Verify Client Certificate`}>
          <input
            type="checkbox"
            checked={formState.verifyClientCertificate}
            onChange$={() => updateServerConfig({ verifyClientCertificate: !formState.verifyClientCertificate })}
            class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Validate client certificates for additional security`}
          </p>
        </ServerFormField>
      </div>
    </ServerCard>
  );
}); 