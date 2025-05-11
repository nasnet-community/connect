import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
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

export const SSTPServer = component$(() => {
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

  const isEnabled = useSignal(!!sstpState.Profile);

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

  const toggleAuthMethod = $((method: string) => {
    try {
      const authMethod = method as AuthMethod;
      const index = formState.authentication.indexOf(authMethod);
      if (index === -1) {
        formState.authentication = [...formState.authentication, authMethod];
      } else {
        formState.authentication = formState.authentication.filter(m => m !== authMethod);
      }
      // Call updateSSTPServer with the properly mapped object
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
    } catch (error) {
      console.error("Error toggling auth method:", error);
    }
  });

  const handleToggle = $((enabled: boolean) => {
    try {
      isEnabled.value = enabled;
      
      if (enabled) {
        // Only update server if enabled
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
      }
    } catch (error) {
      console.error("Error toggling SSTP server:", error);
    }
  });

  return (
    <ServerCard
      title={$localize`SSTP Server`}
      icon={ServerIcon}
      enabled={isEnabled.value}
      onToggle$={handleToggle}
    >
      <div class="space-y-4">
        {/* Profile Name */}
        <ServerFormField label={$localize`Profile Name`}>
          <Input
            type="text"
            value={formState.profile}
            onChange$={(_, value) => {
              formState.profile = value;
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
            }}
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
              onChange$={(_, value) => {
                formState.certificate = value;
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
              }}
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
            onChange$={(_, value) => {
              formState.port = parseInt(value) || 443;
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
            }}
            placeholder="443"
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
            onChange$={(value) => {
              formState.tlsVersion = value as TLSVersion;
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
            }}
          />
        </ServerFormField>

        {/* Force AES */}
        <ServerFormField label={$localize`Force AES encryption`} inline={true}>
          <input
            type="checkbox"
            checked={formState.forceAes}
            onChange$={() => {
              formState.forceAes = !formState.forceAes;
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
            }}
            class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </ServerFormField>

        {/* PFS */}
        <ServerFormField label={$localize`Enable Perfect Forward Secrecy (PFS)`} inline={true}>
          <input
            type="checkbox"
            checked={formState.pfs}
            onChange$={() => {
              formState.pfs = !formState.pfs;
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
            }}
            class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </ServerFormField>

        {/* Verify Client Certificate */}
        <ServerFormField label={$localize`Verify Client Certificate`} inline={true}>
          <input
            type="checkbox"
            checked={formState.verifyClientCertificate}
            onChange$={() => {
              formState.verifyClientCertificate = !formState.verifyClientCertificate;
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
            }}
            class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
        </ServerFormField>
      </div>
    </ServerCard>
  );
}); 