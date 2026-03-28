import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useWireguardConfig } from "./useWireguardConfig";
import { ErrorMessage, VPNConfigFileSection } from "../../components";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface WireguardConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
}

export const WireguardConfig = component$<WireguardConfigProps>(
  ({ onIsValidChange$ }) => {
    const locale = useMessageLocale();
    const { config, errorMessage, handleConfigChange$, handleFileUpload$ } =
      useWireguardConfig(onIsValidChange$);

    return (
      <div class="space-y-6">
        {/* File Configuration Only */}
        <VPNConfigFileSection
          protocolName="WireGuard"
          acceptedExtensions=".conf"
          configValue={config.value}
          onConfigChange$={handleConfigChange$}
          onFileUpload$={handleFileUpload$}
          placeholder={semanticMessages.vpn_config_input_placeholder_wireguard(
            {},
            { locale },
          )}
        />

        {/* Error Message Display */}
        <ErrorMessage message={errorMessage.value} />
      </div>
    );
  },
);
