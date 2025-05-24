import { component$, $, useVisibleTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { Credentials } from "../../../StarContext/LANType";
import type { VPNType } from "../../../StarContext/CommonType";
import { VPN_PROTOCOLS } from "../Protocols/constants";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServer";
import { Card, FormField } from "../UI";
import { 
  HiUserOutline, 
  HiLockClosedOutline, 
  HiTrashOutline, 
  HiExclamationTriangleOutline,
  HiCheckCircleOutline,
} from "@qwikest/icons/heroicons";

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
  
  // Determine if this user is valid
  const isUserValid = user.Username.trim() !== "" && 
    user.Password.trim() !== "" && 
    Array.isArray(user.VPNType) && 
    user.VPNType.length > 0;
  
  // Use useVisibleTask$ to validate and update step completion
  // This runs on the client and doesn't have serialization issues
  useVisibleTask$(({ track }) => {
    // Track the user and all users for validation
    track(() => user);
    track(() => stepper.data.users);
    
    // Check if all users are valid
    const isFormValid = stepper.data.users.every(u => {
      const hasCredentials = u.Username?.trim() !== "" && u.Password?.trim() !== "";
      const hasProtocols = Array.isArray(u.VPNType) && u.VPNType.length > 0;
      const hasValidProtocols = Array.isArray(u.VPNType) && 
        u.VPNType.every(protocol => stepper.data.enabledProtocols[protocol] === true);
      return hasCredentials && hasProtocols && hasValidProtocols;
    });
    
    // Update the context data stepState directly
    if (stepper.data.stepState) {
      stepper.data.stepState.users = isFormValid;
    }
    
    // Find the Users step and update its completion status
    const usersStepId = stepper.steps.value.find(step => 
      step.title.includes("Users")
    )?.id;
    
    if (usersStepId !== undefined) {
      if (isFormValid) {
        stepper.completeStep$(usersStepId);
      } else {
        stepper.updateStepCompletion$(usersStepId, false);
      }
    }
  });

  // Event handlers for inputs - they don't need to call validation explicitly
  // as useVisibleTask$ will handle that reactively
  const handleUsernameChange = $(async (value: string) => {
    await onUsernameChange$(value, index);
  });
  
  const handlePasswordChange = $(async (value: string) => {
    await onPasswordChange$(value, index);
  });
  
  const handleProtocolToggle = $(async (protocol: VPNType) => {
    await onProtocolToggle$(protocol, index);
  });
  
  const handleDelete = $(async () => {
    await onDelete$(index);
  });

  // Use a basic title for the Card component to satisfy TypeScript requirements
  const cardTitle = $localize`User ${index + 1}`;
  
  return (
    <Card
      variant="default"
      title={cardTitle}
      class="mb-3 overflow-hidden transition-all"
      loading={false}
    >
      {/* Custom Header - Replaces the standard Card title */}
      <div class="flex w-full items-center justify-between mb-4 -mt-1">
        <div class="flex items-center gap-2">
          <HiUserOutline class="h-4 w-4 text-primary-500" />
          <span class="font-medium">{$localize`User ${index + 1}`}</span>
          {!isUserValid && (
            <span class="ml-1 text-xs px-1.5 py-0.5 rounded-full bg-warning-surface text-warning-dark">
              {$localize`Incomplete`}
            </span>
          )}
        </div>
        <div class="flex items-center gap-2">
          {canDelete && (
            <button
              type="button"
              onClick$={async (e) => {
                e.stopPropagation();
                await handleDelete();
              }}
              class="text-error hover:text-error-dark dark:text-error-light dark:hover:text-error transition-colors"
              aria-label={$localize`Remove User`}
            >
              <HiTrashOutline class="h-4 w-4" />
            </button>
          )}

        </div>
      </div>
      <div class="space-y-4">
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {/* Username Field */}
            <FormField
              label={$localize`Username`}
              id={`username-${index}`}
              required={true}
              size="sm"
              validation={user.Username.trim() !== "" ? "valid" : "invalid"}
              errorMessage={user.Username.trim() === "" ? $localize`Required` : undefined}
            >
              <div class="relative">
                <input
                  id={`username-${index}`}
                  type="text"
                  value={user.Username}
                  onInput$={async (e) => {
                    const target = e.target as HTMLInputElement;
                    await handleUsernameChange(target.value);
                  }}
                  class="w-full rounded-lg border border-border pl-8 py-1.5 text-sm bg-white
                    focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                    dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                  placeholder={$localize`Enter username`}
                />
                <div class="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-dark-muted">
                  <HiUserOutline class="h-4 w-4" />
                </div>
              </div>
            </FormField>
            
            {/* Password Field */}
            <FormField
              label={$localize`Password`}
              id={`password-${index}`}
              required={true}
              size="sm"
              validation={user.Password.trim() !== "" ? "valid" : "invalid"}
              errorMessage={user.Password.trim() === "" ? $localize`Required` : undefined}
            >
              <div class="relative">
                <input
                  id={`password-${index}`}
                  type="text"
                  value={user.Password}
                  onInput$={async (e) => {
                    const target = e.target as HTMLInputElement;
                    await handlePasswordChange(target.value);
                  }}
                  class="w-full rounded-lg border border-border pl-8 py-1.5 text-sm bg-white
                    focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500
                    dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                  placeholder={$localize`Enter password`}
                />
                <div class="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted dark:text-text-dark-muted">
                  <HiLockClosedOutline class="h-4 w-4" />
                </div>
              </div>
            </FormField>
          </div>
          
          {/* Allowed VPN Protocols - Redesigned */}
          <FormField
            label={$localize`Allowed Protocols`}
            size="sm"
            validation={Array.isArray(user.VPNType) && user.VPNType.length > 0 ? "valid" : "invalid"}
            errorMessage={Array.isArray(user.VPNType) && user.VPNType.length === 0 ? $localize`Select at least one protocol` : undefined}
          >
            <div class="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
              {VPN_PROTOCOLS.map((protocol) => {
                // Only show enabled protocols
                if (!stepper.data.enabledProtocols[protocol.id]) return null;
                
                const isSelected = (user.VPNType || []).includes(protocol.id);
                
                return (
                  <div 
                    key={protocol.id}
                    onClick$={async () => await handleProtocolToggle(protocol.id)}
                    class={`
                      relative cursor-pointer rounded-lg border transition-all hover:shadow-md
                      ${isSelected 
                        ? 'border-primary-400 bg-primary-50 shadow-sm dark:border-primary-500 dark:bg-primary-900/20' 
                        : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'}
                    `}
                  >
                    {/* Selected indicator */}
                    {isSelected && (
                      <div class="absolute -right-1 -top-1 rounded-full bg-primary-500 p-0.5 shadow-sm dark:bg-primary-600">
                        <HiCheckCircleOutline class="h-3 w-3 text-white" />
                      </div>
                    )}
                    
                    <div class="p-2 flex flex-col items-center gap-1">
                      {/* Protocol logo */}
                      <img 
                        src={protocol.logo} 
                        alt={protocol.name} 
                        class={`h-6 w-6 ${isSelected 
                          ? 'dark:filter dark:invert dark:sepia dark:saturate-[5] dark:hue-rotate-[180deg] dark:brightness-[1.1] dark:drop-shadow-[0_0_2px_rgba(79,70,229,0.3)]' 
                          : 'dark:filter dark:invert dark:sepia dark:saturate-[2] dark:hue-rotate-[180deg] dark:brightness-75 dark:opacity-80'}`}
                        onError$={(e) => {
                          const target = e.target as HTMLInputElement;
                          target.style.display = 'none';
                        }}
                      />
                      
                      {/* Protocol name */}
                      <span class={`text-xs font-medium text-center ${isSelected 
                        ? 'text-primary-700 dark:text-primary-300' 
                        : 'text-gray-700 dark:text-gray-300'}`}>
                        {protocol.name}
                      </span>
                    </div>
                    
                    {/* Hidden checkbox for accessibility */}
                    <input
                      type="checkbox"
                      class="sr-only"
                      checked={isSelected}
                      onChange$={async () => {
                        await handleProtocolToggle(protocol.id);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </FormField>
          
          {/* Invalid User Warning - Compact Version */}
          {!isUserValid && (
            <div class="flex items-center p-2.5 gap-2 rounded-md border border-warning-400/30 bg-warning-50 text-warning-700 text-xs shadow-sm
              dark:border-warning-500/70 dark:border-l-warning-400 dark:border-l-2
              dark:bg-gradient-to-r dark:from-warning-900/40 dark:to-warning-900/20 
              dark:text-warning-200">
              <div class="dark:animate-pulse">
                <HiExclamationTriangleOutline class="h-4 w-4 flex-shrink-0 text-warning-500 dark:text-warning-300" />
              </div>
              <span class="font-medium">{$localize`Complete all required fields`}</span>
            </div>
          )}
        </div>
    </Card>
  );
}); 