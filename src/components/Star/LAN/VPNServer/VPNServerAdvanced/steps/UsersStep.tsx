import { component$, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { HiUserGroupOutline } from "@qwikest/icons/heroicons";
import type { StepProps } from "~/types/step";
import { UserCredential } from "../../UserCredential/UserCredential";
import type { VSCredentials } from "../../../../StarContext/Utils/VPNServerType";
import type { VPNType } from "../../../../StarContext/CommonType";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServerContext";

interface UsersStepProps extends StepProps {
  users: VSCredentials[];
  usernameErrors: Record<number, string>;
  addUser: QRL<() => void>;
  removeUser: QRL<(index: number) => void>;
  handleUsernameChange: QRL<(value: string, index: number) => void>;
  handlePasswordChange: QRL<(value: string, index: number) => void>;
  handleProtocolToggle: QRL<(protocol: VPNType, index: number) => void>;
  isValid: { value: boolean };
}

export const UsersStep = component$<UsersStepProps>(
  ({
    users,
    usernameErrors,
    addUser,
    removeUser,
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,
    isValid,
  }) => {
    // Get the context to pass enabled protocols to UserCredential
    const stepperContext = useStepperContext(VPNServerContextId);

    // Track validation state
    useTask$(({ track }) => {
      // Just track for reactivity
      track(() => isValid.value);
      // Step completion is handled in UserCredential component
    });

    return (
      <div class="space-y-6">
        <div class="mb-6 flex items-center gap-3">
          <HiUserGroupOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {$localize`Manage VPN Users`}
          </h2>
        </div>

        <div class="space-y-6">
          {users.map((user, index) => (
            <UserCredential
              key={index}
              user={user}
              index={index}
              canDelete={index > 0}
              usernameError={usernameErrors[index]}
              onUsernameChange$={handleUsernameChange}
              onPasswordChange$={handlePasswordChange}
              onProtocolToggle$={handleProtocolToggle}
              onDelete$={removeUser}
              enabledProtocols={stepperContext.data.enabledProtocols}
            />
          ))}
        </div>

        <button
          onClick$={addUser}
          class="mt-6 inline-flex items-center gap-2 rounded-lg border border-gray-300 
            bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm 
            transition-colors hover:bg-gray-50 dark:border-gray-600 
            dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <span>{$localize`Add User`}</span>
        </button>
      </div>
    );
  },
);
