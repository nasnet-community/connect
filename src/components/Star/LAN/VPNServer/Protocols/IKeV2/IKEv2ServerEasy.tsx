import { component$ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import { ServerCard } from "~/components/Core/Card/ServerCard";
import { ServerFormField } from "~/components/Core/Form/ServerField";
import { NetworkDropdown } from "../../components/NetworkSelection";

export const IKEv2ServerEasy = component$(() => {
  const {
    easyFormState,
    // showPassword,
    presharedKeyError,
    updateEasyForm$,
    togglePasswordVisibility$,
  } = useIKEv2Server();

  return (
    <ServerCard
      title={$localize`IKEv2 Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Network Selection */}
        <ServerFormField label={$localize`Network`}>
          <NetworkDropdown
            selectedNetwork={"VPN" as const}
            onNetworkChange$={(network) => {
              console.log("IKEv2 Easy network changed to:", network);
            }}
          />
        </ServerFormField>

        <ServerFormField
          label={$localize`Pre-shared Key`}
          errorMessage={presharedKeyError.value || (!presharedKeyError.value ? $localize`Key must be at least 8 characters long for security` : undefined)}
          required={true}
        >
          <div class="relative">
            <input
              type="text"
              value={easyFormState.presharedKey}
              onInput$={(e) => {
                const target = e.target as HTMLInputElement;
                updateEasyForm$(target.value);
              }}
              placeholder={$localize`Enter pre-shared key`}
              class="w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     disabled:cursor-not-allowed disabled:opacity-75
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
            <button
              type="button"
              onClick$={togglePasswordVisibility$}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <HiLockClosedOutline class="h-5 w-5" />
            </button>
          </div>
        </ServerFormField>
      </div>
    </ServerCard>
  );
});
