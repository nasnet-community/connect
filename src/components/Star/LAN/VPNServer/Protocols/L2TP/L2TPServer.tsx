import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { useL2TPServer } from "./useL2TPServer";
import type { AuthMethod } from "../../../../StarContext/CommonType";

export const L2TPServer = component$(() => {
  const { l2tpState, updateL2TPServer$, secretError } = useL2TPServer();
  
  const formState = useStore({
    profile: l2tpState.Profile || "default",
    useIpsec: l2tpState.UseIpsec || "required",
    ipsecSecret: l2tpState.IpsecSecret || "",
    authentication: l2tpState.Authentication || ["mschap2", "mschap1"],
    maxMtu: l2tpState.MaxMtu || 1450,
    maxMru: l2tpState.MaxMru || 1450,
    keepaliveTimeout: l2tpState.KeepaliveTimeout || 30,
    oneSessionPerHost: l2tpState.OneSessionPerHost !== undefined ? l2tpState.OneSessionPerHost : true
  });

  const isEnabled = useSignal(!!l2tpState.Profile);
  const showPassword = useSignal(false);

  const authMethods: AuthMethod[] = ["pap", "chap", "mschap1", "mschap2"];
  const ipsecOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
    { value: "required", label: "Required" }
  ];

  const toggleAuthMethod = $((method: AuthMethod) => {
    const index = formState.authentication.indexOf(method);
    if (index === -1) {
      formState.authentication = [...formState.authentication, method];
    } else {
      formState.authentication = formState.authentication.filter(m => m !== method);
    }
  });

  const applyChanges = $(() => {
    if (isEnabled.value) {
      updateL2TPServer$({
        Profile: formState.profile,
        UseIpsec: formState.useIpsec as 'yes' | 'no' | 'required',
        IpsecSecret: formState.ipsecSecret,
        Authentication: formState.authentication,
        MaxMtu: formState.maxMtu,
        MaxMru: formState.maxMru,
        KeepaliveTimeout: formState.keepaliveTimeout,
        OneSessionPerHost: formState.oneSessionPerHost
      });
    } else {
      updateL2TPServer$({
        Profile: ""
      });
    }
  });

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-6 flex items-center gap-3">
        <HiServerOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`L2TP Server`}</h3>
      </div>

      <div class="mb-4 flex items-center justify-between">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Enable L2TP Server`}
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

          {/* IPsec Usage */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Use IPsec`}
            </label>
            <select
              value={formState.useIpsec}
              onChange$={(e) => (formState.useIpsec = (e.target as HTMLSelectElement).value as 'yes' | 'no' | 'required')}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {ipsecOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* IPsec Secret */}
          {formState.useIpsec !== "no" && (
            <div>
              <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {$localize`IPsec Secret Key`}
              </label>
              <div class="relative">
                <input
                  type={showPassword.value ? "text" : "password"}
                  value={formState.ipsecSecret}
                  onChange$={(e) => (formState.ipsecSecret = (e.target as HTMLInputElement).value)}
                  class={`w-full rounded-lg border ${
                    secretError.value
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600"
                  } px-4 py-2 dark:bg-gray-700 dark:text-white`}
                  placeholder={$localize`Enter IPsec secret key`}
                />
                <button
                  type="button"
                  onClick$={() => (showPassword.value = !showPassword.value)}
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <HiLockClosedOutline class="h-5 w-5" />
                </button>
              </div>
              {secretError.value && (
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                  {secretError.value}
                </p>
              )}
            </div>
          )}

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

          {/* Max MTU */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Max MTU`}
            </label>
            <input
              type="number"
              min="576"
              max="1500"
              value={formState.maxMtu}
              onChange$={(e) => (formState.maxMtu = parseInt((e.target as HTMLInputElement).value, 10))}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Max MRU */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Max MRU`}
            </label>
            <input
              type="number"
              min="576"
              max="1500"
              value={formState.maxMru}
              onChange$={(e) => (formState.maxMru = parseInt((e.target as HTMLInputElement).value, 10))}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Keepalive Timeout */}
          <div>
            <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              {$localize`Keepalive Timeout (seconds)`}
            </label>
            <input
              type="number"
              min="0"
              max="1000"
              value={formState.keepaliveTimeout}
              onChange$={(e) => (formState.keepaliveTimeout = parseInt((e.target as HTMLInputElement).value, 10))}
              class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* One Session Per Host */}
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              id="oneSessionPerHost"
              checked={formState.oneSessionPerHost}
              onChange$={() => (formState.oneSessionPerHost = !formState.oneSessionPerHost)}
              class="h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
            />
            <label
              for="oneSessionPerHost"
              class="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              {$localize`Only One Session Per Host`}
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