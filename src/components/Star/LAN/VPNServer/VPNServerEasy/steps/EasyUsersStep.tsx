import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { HiUserGroupOutline } from "@qwikest/icons/heroicons";
import type { Credentials } from "../../../../StarContext/Utils/VPNServerType";
import type { VPNType } from "../../../../StarContext/CommonType";
import { UserCredential } from "../../UserCredential/UserCredential";

interface EasyUsersStepProps {
  users: Credentials[];
  usernameErrors: Record<number, string>;
  passwordErrors: Record<number, string>;
  addUser: QRL<() => void>;
  removeUser: QRL<(index: number) => void>;
  handleUsernameChange: QRL<(value: string, index: number) => void>;
  handlePasswordChange: QRL<(value: string, index: number) => void>;
  handleProtocolToggle: QRL<(protocol: VPNType, index: number) => void>;
  isValid: { value: boolean };
}

export const EasyUsersStep = component$<EasyUsersStepProps>(
  ({
    users,
    usernameErrors,
    passwordErrors,
    addUser,
    removeUser,
    handleUsernameChange,
    handlePasswordChange,
    handleProtocolToggle,
    isValid,
  }) => {
    return (
      <div class="space-y-6">
        <div class="mb-6 flex items-center gap-3">
          <HiUserGroupOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {$localize`VPN User Accounts`}
          </h2>
        </div>

        <p class="text-gray-600 dark:text-gray-400">
          {$localize`Create user accounts that will be able to connect to your VPN server. Each user needs a unique username and a strong password.`}
        </p>

        <div class="space-y-6">
          {users.map((user, index) => (
            <UserCredential
              key={index}
              user={user}
              index={index}
              canDelete={index > 0}
              usernameError={usernameErrors[index]}
              passwordError={passwordErrors[index]}
              onUsernameChange$={handleUsernameChange}
              onPasswordChange$={handlePasswordChange}
              onProtocolToggle$={handleProtocolToggle}
              onDelete$={removeUser}
              easyMode={true}
            />
          ))}
        </div>

        <button
          onClick$={addUser}
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 
            bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm 
            transition-colors hover:bg-gray-50 dark:border-gray-600 
            dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          <svg
            class="h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>{$localize`Add User`}</span>
        </button>


        {/* Validation Status */}
        {!isValid.value && users.length > 0 && (
          <div class="rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-orange-800 dark:border-orange-800 dark:bg-orange-900/20 dark:text-orange-200">
            {$localize`Please complete all user information. Each user must have a unique username and a password of at least 8 characters.`}
          </div>
        )}
      </div>
    );
  }
);