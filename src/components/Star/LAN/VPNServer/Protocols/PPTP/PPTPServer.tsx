import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { usePPTPServer } from "./usePPTPServer";
import type { AuthMethod } from "../../../../StarContext/CommonType";

export const PPTPServer = component$(() => {
  const { pptpState, updatePPTPServer$ } = usePPTPServer();
  
  const formState = useStore({
    profile: pptpState.Profile || "default",
    authentication: pptpState.Authentication || ["mschap2", "mschap1"],
    maxMtu: pptpState.MaxMtu || 1450,
    maxMru: pptpState.MaxMru || 1450,
    keepaliveTimeout: pptpState.KeepaliveTimeout || 30
  });

  const isEnabled = useSignal(!!pptpState.Profile);

  const authMethods: AuthMethod[] = ["pap", "chap", "mschap1", "mschap2"];

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
      updatePPTPServer$({
        Profile: formState.profile,
        Authentication: formState.authentication,
        MaxMtu: formState.maxMtu,
        MaxMru: formState.maxMru,
        KeepaliveTimeout: formState.keepaliveTimeout
      });
    } else {
      updatePPTPServer$({
        Profile: ""
      });
    }
  });

  return (
    <div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div class="mb-6 flex items-center gap-3">
        <HiServerOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">{$localize`PPTP Server`}</h3>
      </div>

      <div class="mb-4 flex items-center justify-between">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Enable PPTP Server`}
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