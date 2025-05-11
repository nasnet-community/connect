import { component$, useTask$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { VPNType } from "../../../StarContext/CommonType";
import { ProtocolList } from "../Protocols/ProtocolList";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServer";

interface ProtocolsStepProps {
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
}) => {
  // Access the stepper context
  const stepper = useStepperContext(VPNServerContextId);
  
  // Create safe wrappers that don't propagate Promises
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
  
  // When protocols change, update step completion status
  useTask$(async ({ track }) => {
    const protocols = track(() => Object.values(enabledProtocols));
    const anyEnabled = protocols.some(enabled => enabled);
    
    if (anyEnabled) {
      await safeCompleteStep(0);
    } else {
      await safeUpdateStepCompletion(0, false);
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
      {!Object.values(enabledProtocols).some(v => v) && (
        <p class="mt-4 text-sm text-red-600 dark:text-red-500">
          {$localize`Please enable at least one VPN protocol to continue.`}
        </p>
      )}
    </div>
  );
}); 