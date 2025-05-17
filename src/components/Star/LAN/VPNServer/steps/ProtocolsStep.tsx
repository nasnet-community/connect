import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { ProtocolList } from "../Protocols/ProtocolList";
import type { VPNType } from "../../../StarContext/CommonType";

interface ProtocolsStepProps extends StepProps {
  enabledProtocols: Record<VPNType, boolean>;
  expandedSections: Record<string, boolean>;
  toggleSection$: QRL<(section: string) => void>;
  toggleProtocol$: QRL<(protocol: VPNType) => void>;
}

export const ProtocolsStep = component$<ProtocolsStepProps>(({
  enabledProtocols,
  expandedSections,
  toggleSection$,
  toggleProtocol$,
  onComplete$,
  isComplete
}) => {
  const showProtocolWarning = useSignal(false);
  const anyProtocolEnabled = useSignal(false);

  // Check if any protocol is enabled
  useTask$(({ track }) => {
    // Track the entire enabledProtocols object
    track(() => enabledProtocols);
    
    anyProtocolEnabled.value = Object.values(enabledProtocols).some(enabled => enabled);
    
    if (anyProtocolEnabled.value) {
      showProtocolWarning.value = false;
      if (!isComplete) {
        onComplete$();
      }
    } else if (isComplete) {
      // Will attempt to complete itself again when a protocol is enabled
    }
  });

  return (
    <div>
      <ProtocolList
        expandedSections={expandedSections}
        enabledProtocols={enabledProtocols}
        toggleSection$={toggleSection$}
        toggleProtocol$={toggleProtocol$}
      />
      
      {!anyProtocolEnabled.value && showProtocolWarning.value && (
        <p class="mt-4 text-sm text-red-600 dark:text-red-500">
          {$localize`Please enable at least one VPN protocol to continue.`}
        </p>
      )}
    </div>
  );
}); 