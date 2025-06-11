import { component$, useSignal, useStore } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import { ServerCard, ServerFormField } from "../../UI";

export const IKEv2ServerEasy = component$(() => {
  const { ikev2State, updateIKEv2Server$, presharedKeyError } = useIKEv2Server();
  
  const formState = useStore({
    presharedKey: ikev2State.identities?.secret || "",
  });

  const showPassword = useSignal(false);

  return (
    <ServerCard
      title={$localize`IKEv2 Server`}
      icon={<HiServerOutline class="h-5 w-5" />}
    >
      <div class="space-y-6">
        <ServerFormField
          label={$localize`Pre-shared Key`}
          errorMessage={presharedKeyError.value}
          helperText={presharedKeyError.value ? undefined : $localize`Key must be at least 8 characters long for security`}
          required={true}
        >
          <div class="relative">
            <input
              type={showPassword.value ? "text" : "password"}
              value={formState.presharedKey}
              onInput$={(e) => {
                const target = e.target as HTMLInputElement;
                formState.presharedKey = target.value;
                // Update settings directly with proper StarContext structure
                updateIKEv2Server$({
                  ipPools: {
                    Name: "ike2-pool",
                    Ranges: "192.168.77.2-192.168.77.254"
                  },
                  identities: {
                    authMethod: "pre-shared-key",
                    secret: target.value,
                    peer: "ike2",
                    generatePolicy: "port-strict",
                    policyTemplateGroup: "ike2-policies"
                  },
                  peer: {
                    name: "ike2",
                    exchangeMode: "ike2",
                    passive: true,
                    profile: "ike2"
                  },
                  profile: {
                    name: "ike2"
                  },
                  proposal: {
                    name: "ike2"
                  },
                  policyGroup: {
                    name: "ike2-policies"
                  },
                  modeConfigs: {
                    name: "ike2-conf",
                    addressPool: "ike2-pool",
                    addressPrefixLength: 32,
                    responder: true
                  }
                });
              }}
              placeholder={$localize`Enter pre-shared key`}
              class="w-full rounded-lg border border-border bg-white px-3 py-2
                     focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                     disabled:cursor-not-allowed disabled:opacity-75
                     dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
            />
            <button
              type="button"
              onClick$={() => (showPassword.value = !showPassword.value)}
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