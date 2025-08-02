import { component$ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { ServerCard, ServerFormField } from "../../UI";
import { useOpenVPNServer } from "./useOpenVPNServer";

export const OpenVPNServerEasy = component$(() => {
  const { easyFormState, passphraseError, updateEasyPassphrase$ } =
    useOpenVPNServer();

  return (
    <ServerCard
      title={$localize`OpenVPN Server (TCP & UDP)`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        {/* Certificate Key Passphrase */}
        <ServerFormField
          label={$localize`Certificate Key Passphrase`}
          errorMessage={passphraseError.value}
          helperText={
            passphraseError.value
              ? undefined
              : $localize`Creates both TCP and UDP OpenVPN servers with this passphrase`
          }
        >
          <div class="relative">
            <input
              type="text"
              value={easyFormState.certificateKeyPassphrase}
              onInput$={(e) => {
                const target = e.target as HTMLInputElement;
                updateEasyPassphrase$(target.value);
              }}
              placeholder={$localize`Enter passphrase for both servers`}
              class="w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     disabled:cursor-not-allowed disabled:opacity-75
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
            <button
              type="button"
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
