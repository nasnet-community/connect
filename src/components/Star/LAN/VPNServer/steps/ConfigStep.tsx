import { component$, useStore, $, useVisibleTask$ } from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServer";
import type { VPNType } from "../../../StarContext/CommonType";
import { VPN_PROTOCOLS } from "../Protocols/constants";
import { PPTPServerWrapper } from "../Protocols/PPTP/PPTPServer.wrapper";
import { L2TPServerWrapper } from "../Protocols/L2TP/L2TPServer.wrapper";
import { SSTPServerWrapper } from "../Protocols/SSTP/SSTPServer.wrapper";
import { IKEv2ServerWrapper } from "../Protocols/IKeV2/IKEv2Server.wrapper";
import { OpenVPNServerWrapper } from "../Protocols/OpenVPN/OpenVPNServer.wrapper";
import { WireguardServerWrapper } from "../Protocols/Wireguard/WireguardServer.wrapper";

interface ConfigStepProps {
  enabledProtocols: Record<VPNType, boolean>;
}

export const ConfigStep = component$<ConfigStepProps>(({ enabledProtocols }) => {
  const context = useStepperContext(VPNServerContextId);
  const state = useStore({
    processingComplete: false,
    initialProcessingDone: false,
    addedStepIds: [] as number[],
    configStepId: -1,
    isProcessing: false, // Add a flag to prevent multiple concurrent processing
    lastEnabledCount: 0, // Track the last enabled count to detect real changes
  });

  // Create protocol component map for easier lookup using exact VPNType enum values
  const protocolComponents = {
    "Wireguard": <WireguardServerWrapper />,
    "OpenVPN": <OpenVPNServerWrapper />,
    "PPTP": <PPTPServerWrapper />,
    "L2TP": <L2TPServerWrapper />,
    "SSTP": <SSTPServerWrapper />,
    "IKeV2": <IKEv2ServerWrapper />,
  };

  // Function to add a protocol configuration step
  const addProtocolStep = $(async (protocol: VPNType, position?: number) => {
    const protocolInfo = VPN_PROTOCOLS.find(p => p.id === protocol);
    if (!protocolInfo) return -1;
    
    const component = protocolComponents[protocol as keyof typeof protocolComponents];
    if (!component) return -1;
    
    // Create a step for this protocol
    const stepId = await context.addStep$({
      id: Math.random(), // Temporary ID that will be replaced by addStep$
      title: `Configure ${protocolInfo.name}`,
      description: `Configure settings for the ${protocolInfo.name} VPN protocol`,
      component,
      isComplete: true // Mark as complete by default since configuration is optional
    }, position);
    
    return stepId;
  });

  // Process enabled protocols
  const processEnabledProtocols = $(async () => {
    // Prevent multiple concurrent processing
    if (state.isProcessing) return;
    state.isProcessing = true;
    
    try {
      // First, remove any previously added steps
      for (const stepId of state.addedStepIds) {
        await context.removeStep$(stepId);
      }
      state.addedStepIds = [];
      
      // Get the config step position
      const configStepIndex = context.steps.value.findIndex(step => 
        step.title.includes("Protocol Configuration")
      );
      
      if (configStepIndex < 0) {
        state.isProcessing = false;
        return;
      }
      
      // Store config step id
      state.configStepId = configStepIndex;
      
      // Get enabled protocols
      const enabledProtocolEntries = Object.entries(enabledProtocols)
        .filter(([, enabled]) => enabled)
        .map(([protocol]) => protocol as VPNType);
      
      // Update last enabled count
      state.lastEnabledCount = enabledProtocolEntries.length;
      
      // If no protocols are enabled, just proceed to the next step
      if (enabledProtocolEntries.length === 0) {
        state.processingComplete = true;
        await context.nextStep$();
        state.isProcessing = false;
        return;
      }
      
      // Position to insert the first step (at current position)
      let position = configStepIndex;
      
      // Add steps for each enabled protocol
      for (const protocol of enabledProtocolEntries) {
        const stepId = await addProtocolStep(protocol, position);
        if (stepId >= 0) {
          state.addedStepIds.push(stepId);
          position++; // Increment position for next step
        }
      }
      
      // Mark the process as complete
      state.processingComplete = true;
      
      // Remove the original config step - we'll remove it after adding the protocol steps
      // to avoid shifting indexes during the addition process
      if (state.configStepId >= 0) {
        await context.removeStep$(state.configStepId);
      }
    } finally {
      // Always reset the processing flag when done
      state.isProcessing = false;
    }
  });
  
  // Process enabled protocols ONCE when the component is first rendered
  useVisibleTask$(() => {
    // Execute only once for initial setup
    if (!state.initialProcessingDone) {
      void processEnabledProtocols();
      state.initialProcessingDone = true;
    }
  });

  // Only reprocess when enabledProtocols actually change
  useVisibleTask$(({ track }) => {
    // Track the enabledProtocols object
    const enabledCount = Object.values(track(() => enabledProtocols))
      .filter(Boolean).length;
    
    // Only reprocess if we've already done initial processing AND the count has changed
    if (state.initialProcessingDone && enabledCount !== state.lastEnabledCount) {
      void processEnabledProtocols();
    }
  });

  // No need to render anything substantial since we're just
  // manipulating the parent stepper's steps
  return (
    <div class="py-2">
      {Object.values(enabledProtocols).some(enabled => enabled) ? (
        <div class="text-gray-600 dark:text-gray-400 text-center">
          <p>
            {$localize`Please continue to configure each VPN protocol in the next steps.`}
          </p>
          {state.processingComplete && (
            <button 
              onClick$={() => context.nextStep$()}
              class="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md"
            >
              {$localize`Continue to Protocol Configuration`}
            </button>
          )}
        </div>
      ) : (
        <div class="p-4 text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg border border-yellow-300 dark:border-yellow-800">
          <p>
            {$localize`No VPN protocols selected. Please enable at least one protocol or continue to the next step.`}
          </p>
          <button 
            onClick$={() => context.nextStep$()}
            class="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md"
          >
            {$localize`Skip Protocol Configuration`}
          </button>
        </div>
      )}
    </div>
  );
}); 