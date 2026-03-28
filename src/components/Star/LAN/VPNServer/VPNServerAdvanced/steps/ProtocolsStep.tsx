import { component$, useSignal, useTask$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { ProtocolList } from "../../Protocols/ProtocolList";
import type { VPNType } from "../../../../StarContext/CommonType";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServerContext";
import { HiServerOutline } from "@qwikest/icons/heroicons";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface ProtocolsStepProps extends StepProps {
  enabledProtocols: Record<VPNType, boolean>;
  expandedSections: Record<string, boolean>;
  toggleSection$: QRL<(section: string) => void>;
  toggleProtocol$: QRL<(protocol: VPNType) => void>;
}

export const ProtocolsStep = component$<ProtocolsStepProps>(
  ({ enabledProtocols, expandedSections, toggleSection$, toggleProtocol$ }) => {
    const locale = useMessageLocale();
    const context = useStepperContext(VPNServerContextId);
    const showProtocolWarning = useSignal(false);
    const anyProtocolEnabled = useSignal(false);

    // Check if any protocol is enabled without trying to use context methods
    useTask$(({ track }) => {
      // Track the entire enabledProtocols object
      track(() => enabledProtocols);

      // Just update the local signal for protocol status
      anyProtocolEnabled.value = Object.values(enabledProtocols).some(
        (enabled) => enabled,
      );

      if (!anyProtocolEnabled.value) {
        showProtocolWarning.value = true;
      } else {
        showProtocolWarning.value = false;
      }
    });

    // Mirror protocol enablement into step completion state on the client.
    useTask$(({ track }) => {
      if (typeof window === "undefined") {
        return;
      }

      const isEnabled = track(() => anyProtocolEnabled.value);

      // Directly update the context data's stepState
      context.data.stepState.protocols = isEnabled;

      // Complete the step if protocols are enabled
      if (isEnabled) {
        const currentStepId = context.steps.value.find((s) =>
          s.title.includes("Protocols"),
        )?.id;
        if (currentStepId !== undefined) {
          context.completeStep$(currentStepId);
        }
      }
    });

    return (
      <div class="space-y-6">
        <div class="mb-4 flex items-center gap-3">
          <HiServerOutline class="h-6 w-6 text-primary-500 dark:text-primary-400" />
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
            {semanticMessages.vpn_server_available_protocols({}, { locale })}
          </h2>
        </div>

        <ProtocolList
          expandedSections={expandedSections}
          enabledProtocols={enabledProtocols}
          toggleSection$={toggleSection$}
          toggleProtocol$={toggleProtocol$}
        />

        {!anyProtocolEnabled.value && showProtocolWarning.value && (
          <p class="mt-4 text-sm text-red-600 dark:text-red-500">
            {semanticMessages.vpn_server_protocol_warning({}, { locale })}
          </p>
        )}
      </div>
    );
  },
);
