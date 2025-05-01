import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiDocumentOutline } from "@qwikest/icons/heroicons";
import { useSSTPServer } from "./useSSTPServer";
import type { AuthMethod, TLSVersion } from "../../../../StarContext/CommonType";

export const SSTPServer = component$(() => {
  const { sstpState, updateSSTPServer$, certificateError } = useSSTPServer();
  
  // Create a local store for managing form state
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

  // Handle authentication method toggle
  const toggleAuthMethod = $((method: AuthMethod) => {
    const index = formState.authentication.indexOf(method);
    if (index === -1) {
      formState.authentication = [...formState.authentication, method];
    } else {
      formState.authentication = formState.authentication.filter(m => m !== method);
    }
  });

  // Apply changes to the context
  const applyChanges = $(() => {
    if (isEnabled.value) {
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
    } else {
      updateSSTPServer$({
        Profile: ""
      });
    }
  });

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-6 flex items-center gap-3">
        <HiServerOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`SSTP Server`}</h3>
      </div>

      <div class="mb-4 flex items-center justify-between">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Enable SSTP Server`}
        </label>
        <label class="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={isEnabled.value}
            class="peer sr-only"
            onChange$={() => {
              isEnabled.value = !isEnabled.value;
              if (isEnabled.value && !formState.profile) {
                formState.profile = "default";
              }
              applyChanges();
            }}
          />
          <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700"></div>
        </label>
      </div>

      {isEnabled.value && (
        <div class="space-y-4">
          {/* Profile Name */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Profile Name`}
            </label>
            <input
              type="text"
              value={formState.profile}
              onChange$={(e) => (formState.profile = (e.target as HTMLInputElement).value)}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              placeholder={$localize`Enter profile name`}
            />
          </div>

          {/* Certificate */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`SSL Certificate`}
            </label>
            <div class="flex items-center gap-2">
              <input
                type="text"
                value={formState.certificate}
                onChange$={(e) => (formState.certificate = (e.target as HTMLInputElement).value)}
                class={`w-full rounded-lg border ${
                  certificateError.value
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                placeholder={$localize`Enter certificate name`}
              />
              <button
                type="button"
                class="flex items-center gap-1 rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <HiDocumentOutline class="h-5 w-5" />
                {$localize`Select`}
              </button>
            </div>
            {certificateError.value && (
              <p class="mt-1 text-sm text-red-600 dark:text-red-500">
                {certificateError.value}
              </p>
            )}
            <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {$localize`Select a valid SSL certificate from the router's certificate store.`}
            </p>
          </div>

          {/* Port */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Port`}
            </label>
            <input
              type="number"
              min="1"
              max="65535"
              value={formState.port}
              onChange$={(e) => (formState.port = parseInt((e.target as HTMLInputElement).value, 10))}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Authentication Methods */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Authentication Methods`}
            </label>
            <div class="flex flex-wrap gap-3">
              {authMethods.map((method) => (
                <label key={method} class="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formState.authentication.includes(method)}
                    onChange$={() => toggleAuthMethod(method)}
                    class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">{method.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          {/* TLS Version */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`TLS Version`}
            </label>
            <select
              value={formState.tlsVersion}
              onChange$={(e) => (formState.tlsVersion = (e.target as HTMLSelectElement).value as TLSVersion)}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {tlsVersions.map((version) => (
                <option key={version.value} value={version.value}>
                  {version.label}
                </option>
              ))}
            </select>
          </div>

          {/* Force AES */}
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              id="forceAes"
              checked={formState.forceAes}
              onChange$={() => (formState.forceAes = !formState.forceAes)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              for="forceAes"
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {$localize`Force AES encryption`}
            </label>
          </div>

          {/* PFS */}
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              id="pfs"
              checked={formState.pfs}
              onChange$={() => (formState.pfs = !formState.pfs)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              for="pfs"
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {$localize`Enable Perfect Forward Secrecy (PFS)`}
            </label>
          </div>

          {/* Verify Client Certificate */}
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              id="verifyClientCert"
              checked={formState.verifyClientCertificate}
              onChange$={() => (formState.verifyClientCertificate = !formState.verifyClientCertificate)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              for="verifyClientCert"
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {$localize`Verify Client Certificate`}
            </label>
          </div>

          <button
            onClick$={applyChanges}
            class="mt-4 rounded-lg bg-primary-500 px-4 py-2 text-white transition-colors hover:bg-primary-600 focus:outline-none focus:ring-4 focus:ring-primary-500/25 dark:bg-primary-600 dark:hover:bg-primary-700"
          >
            {$localize`Apply Settings`}
          </button>
        </div>
      )}
    </div>
  );
}); 