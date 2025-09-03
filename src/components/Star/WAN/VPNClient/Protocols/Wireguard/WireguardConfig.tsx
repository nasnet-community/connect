import { component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import { useWireguardConfig } from "./useWireguardConfig";
import {
  ErrorMessage,
  VPNConfigFileSection,
} from "../../components";

interface WireguardConfigProps {
  onIsValidChange$: QRL<(isValid: boolean) => void>;
}

export const WireguardConfig = component$<WireguardConfigProps>(
  ({ onIsValidChange$ }) => {
    const {
      config,
      errorMessage,
      handleConfigChange$,
      handleFileUpload$,
    } = useWireguardConfig(onIsValidChange$);


    return (
      <div class="space-y-6">
        {/* File Configuration Only */}
        <VPNConfigFileSection
          protocolName="WireGuard"
          acceptedExtensions=".conf"
          configValue={config.value}
          onConfigChange$={handleConfigChange$}
          onFileUpload$={handleFileUpload$}
          placeholder={$localize`Paste your WireGuard configuration here. It should include sections like [Interface] and [Peer].`}
        />

        {/* Error Message Display */}
        <ErrorMessage message={errorMessage.value} />
      </div>
    );
  },
);
