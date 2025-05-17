import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { HiServerOutline, HiLockClosedOutline } from "@qwikest/icons/heroicons";
import { useIKEv2Server } from "./useIKEv2Server";
import { ServerCard } from "~/components/Core/Card";
import { 
  ServerFormField
} from "~/components/Core/Form/ServerField";
import { Input } from "~/components/Core/Input";

// Create a serialized version of the server icon
const ServerIcon = $(HiServerOutline);

export const IKEv2ServerEasy = component$(() => {
  const { ikev2State, updateIKEv2Server$, presharedKeyError } = useIKEv2Server();
  
  const formState = useStore({
    presharedKey: ikev2State.PresharedKey || "",
  });

  const showPassword = useSignal(false);

  return (
    <ServerCard
      title={$localize`IKEv2 Server`}
      icon={ServerIcon}
    >
      <div class="space-y-6">
        <ServerFormField 
          label={$localize`Pre-shared Key`}
          errorMessage={presharedKeyError.value}
        >
          <div class="relative">
            <Input
              type={showPassword.value ? "text" : "password"}
              value={formState.presharedKey}
              onChange$={(_, value) => {
                formState.presharedKey = value;
                // Update settings directly on field change
                updateIKEv2Server$({
                  AddressPool: "192.168.77.0/24", // Default value in easy mode
                  ClientAuthMethod: "pre-shared-key", // Fixed to pre-shared-key in easy mode
                  PresharedKey: value,
                });
              }}
              placeholder={$localize`Enter pre-shared key`}
              validation={presharedKeyError.value ? "invalid" : "default"}
              hasSuffixSlot={true}
            >
              <button
                q:slot="suffix"
                type="button"
                onClick$={() => (showPassword.value = !showPassword.value)}
                class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <HiLockClosedOutline class="h-5 w-5" />
              </button>
            </Input>
          </div>
          <p class="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {$localize`Key must be at least 8 characters long for security`}
          </p>
        </ServerFormField>
      </div>
    </ServerCard>
  );
}); 