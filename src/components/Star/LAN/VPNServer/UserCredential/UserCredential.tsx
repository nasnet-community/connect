import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Credentials } from "../../../StarContext/LANType";
import type { VPNType } from "../../../StarContext/CommonType";
import { VPN_PROTOCOLS } from "../Protocols/constants";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServer";

interface UserCredentialProps {
  user: Credentials;
  index: number;
  canDelete: boolean;
  onUsernameChange$: QRL<(value: string, index: number) => void>;
  onPasswordChange$: QRL<(value: string, index: number) => void>;
  onProtocolToggle$: QRL<(protocol: VPNType, index: number) => void>;
  onDelete$: QRL<(index: number) => void>;
}

export const UserCredential = component$<UserCredentialProps>(({
  user,
  index,
  canDelete,
  onUsernameChange$,
  onPasswordChange$,
  onProtocolToggle$,
  onDelete$,
}) => {
  const stepper = useStepperContext(VPNServerContextId);
  
  const safeCompleteStep = $(async (stepId: number) => {
    if (stepper?.completeStep$) {
      await stepper.completeStep$(stepId);
    }
    return null;
  });
  
  const safeUpdateStepCompletion = $(async (stepId: number, isComplete: boolean) => {
    if (stepper?.updateStepCompletion$) {
      await stepper.updateStepCompletion$(stepId, isComplete);
    }
    return null;
  });
  
  const isUserValid = user.Username.trim() !== "" && 
    user.Password.trim() !== "" && 
    Array.isArray(user.VPNType) && 
    user.VPNType.length > 0;
  
  const validateAndUpdateStep$ = $(async () => {
    const isFormValid = stepper.data.users.every(u => {
      const hasCredentials = u.Username.trim() !== "" && u.Password.trim() !== "";
      const hasProtocols = Array.isArray(u.VPNType) && u.VPNType.length > 0;
      const hasValidProtocols = Array.isArray(u.VPNType) && 
        u.VPNType.every(protocol => stepper.data.enabledProtocols[protocol] === true);
      return hasCredentials && hasProtocols && hasValidProtocols;
    });
    
    if (isFormValid) {
      await safeCompleteStep(2);
    } else {
      await safeUpdateStepCompletion(2, false);
    }
    return null;
  });

  return (
    <div class="border border-gray-200 rounded-lg p-4 dark:border-gray-700">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label for={`username-${index}`} class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {$localize`Username`}
          </label>
          <input
            id={`username-${index}`}
            type="text"
            value={user.Username}
            onChange$={async (e) => {
              const target = e.target as HTMLInputElement;
              await onUsernameChange$(target.value, index);
              await validateAndUpdateStep$();
            }}
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label for={`password-${index}`} class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {$localize`Password`}
          </label>
          <input
            id={`password-${index}`}
            type="password"
            value={user.Password}
            onChange$={async (e) => {
              const target = e.target as HTMLInputElement;
              await onPasswordChange$(target.value, index);
              await validateAndUpdateStep$();
            }}
            class="w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {$localize`Allowed VPN Protocols`}
        </label>
        <div class="flex flex-wrap gap-2">
          {VPN_PROTOCOLS.map((protocol) => (
            <div key={protocol.id} class="flex-none">
              {stepper.data.enabledProtocols[protocol.id] && (
                <label
                  class={`
                    inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1
                    ${(user.VPNType || []).includes(protocol.id)
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'}
                  `}
                >
                  <input
                    type="checkbox"
                    class="sr-only"
                    checked={(user.VPNType || []).includes(protocol.id)}
                    onChange$={async () => {
                      await onProtocolToggle$(protocol.id, index);
                      await validateAndUpdateStep$();
                    }}
                  />
                  <span>{protocol.name}</span>
                </label>
              )}
            </div>
          ))}
        </div>
        {Array.isArray(user.VPNType) && user.VPNType.length === 0 && (
          <p class="mt-1 text-sm text-red-600 dark:text-red-500">
            {$localize`Please select at least one protocol`}
          </p>
        )}
      </div>
      {canDelete && (
        <div class="mt-4 flex justify-end">
          <button
            onClick$={async () => {
              await onDelete$(index);
              await validateAndUpdateStep$();
            }}
            class="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
          >
            {$localize`Remove User`}
          </button>
        </div>
      )}
      {!isUserValid && (
        <div class="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md dark:bg-yellow-900/20 dark:border-yellow-800">
          <p class="text-sm text-yellow-800 dark:text-yellow-200">
            {$localize`This user is missing required information.`}
          </p>
        </div>
      )}
    </div>
  );
}); 