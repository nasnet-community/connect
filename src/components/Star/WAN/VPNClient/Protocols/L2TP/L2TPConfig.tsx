import { component$, useTask$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useL2TPConfig } from "./useL2TPConfig";
import { L2TPPromoBanner } from "./L2TPPromoBanner";
import type { L2TPCredentials } from "~/utils/supabaseClient";
import { 
  FormField, 
  FormContainer, 
  Switch, 
  ErrorMessage 
} from "../../components";

interface L2TPConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
  isSaving?: boolean;
}

export const L2TPConfig = component$<L2TPConfigProps>(({ onIsValidChange$, isSaving }) => {
  const {
    serverAddress,
    username,
    password,
    useIPsec,
    ipsecSecret,
    errorMessage,
    handleManualFormSubmit$
  } = useL2TPConfig(onIsValidChange$);

  useTask$(({ track }) => {
    const saving = track(() => isSaving);
    if (saving) {
      handleManualFormSubmit$();
    }
  });

  const handleCredentialsReceived$ = $((credentials: L2TPCredentials) => {
    serverAddress.value = credentials.server;
    username.value = credentials.username;
    password.value = credentials.password;
    
    handleManualFormSubmit$();
  });

  return (
    <div class="space-y-6">
      {/* L2TP Promotional Banner - Provides quick configuration from subscription */}
      <L2TPPromoBanner onCredentialsReceived$={handleCredentialsReceived$} />
      
      {/* Connection Settings */}
      <FormContainer
        title={$localize`Connection Settings`}
        description={$localize`Configure your L2TP VPN connection details`}
        bordered
      >
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            label={$localize`Server Address`}
            required
            value={serverAddress.value}
            placeholder="vpn.example.com or IP address"
            onInput$={(_, el) => { 
              serverAddress.value = el.value;
              handleManualFormSubmit$();
            }}
          />
        </div>
      </FormContainer>
      
      {/* Authentication Settings */}
      <FormContainer
        title={$localize`Authentication Settings`}
        bordered
      >
        <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            label={$localize`Username`}
            required
            value={username.value}
            onInput$={(_, el) => { 
              username.value = el.value;
              handleManualFormSubmit$();
            }}
          />
          
          <FormField
            type="text"
            label={$localize`Password`}
            required
            value={password.value}
            onInput$={(_, el) => { 
              password.value = el.value;
              handleManualFormSubmit$();
            }}
          />
        </div>
      </FormContainer>

      {/* IPsec Settings */}
      <FormContainer
        title={$localize`IPsec Security Settings`}
        bordered
      >
        <div class="space-y-4">
          <Switch
            id="useIPsec"
            label={$localize`Use IPsec Encryption`}
            checked={useIPsec.value}
            onChange$={(checked) => {
              useIPsec.value = checked;
              handleManualFormSubmit$();
            }}
          />

          {/* Conditional IPsec Secret Field */}
          {useIPsec.value && (
            <div class="mt-3 ml-7">
              <FormField
                type="text"
                label={$localize`IPsec Pre-shared Secret`}
                required
                value={ipsecSecret.value}
                onInput$={(_, el) => { 
                  ipsecSecret.value = el.value;
                  handleManualFormSubmit$();
                }}
              />
            </div>
          )}
        </div>
      </FormContainer>
      
      {/* Required Fields Note */}
      <p class="text-xs text-text-muted dark:text-text-dark-muted">
        {$localize`Fields marked with * are required`}
      </p>

      {/* Error Message Display */}
      <ErrorMessage message={errorMessage.value} />
    </div>
  );
}); 