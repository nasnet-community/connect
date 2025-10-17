import {
  component$,
  useStore,
  $,
  useVisibleTask$,
  useTask$,
} from "@builder.io/qwik";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServerContext";
import type { VPNType } from "../../../../StarContext/CommonType";
import { VPN_PROTOCOLS } from "../../Protocols/constants";
import { PPTPServerWrapper } from "../../Protocols/PPTP/PPTPServer.wrapper";
import { L2TPServerWrapper } from "../../Protocols/L2TP/L2TPServer.wrapper";
import { SSTPServerWrapper } from "../../Protocols/SSTP/SSTPServer.wrapper";
import { IKEv2ServerWrapper } from "../../Protocols/IKeV2/IKEv2Server.wrapper";
import { OpenVPNServerWrapper } from "../../Protocols/OpenVPN/OpenVPNServer.wrapper";
import { WireguardServerWrapper } from "../../Protocols/Wireguard/WireguardServer.wrapper";
import { Socks5ServerWrapper } from "../../Protocols/Socks5/Socks5Server.wrapper";
import { SSHServerWrapper } from "../../Protocols/SSH/SSHServer.wrapper";
import { HTTPProxyServerWrapper } from "../../Protocols/HTTPProxy/HTTPProxyServer.wrapper";
import { BackToHomeServerWrapper } from "../../Protocols/BackToHome/BackToHomeServer.wrapper";
import { ZeroTierServerWrapper } from "../../Protocols/ZeroTier/ZeroTierServer.wrapper";
import { HiCogOutline } from "@qwikest/icons/heroicons";
import { CertificateStep } from "./CertificateStep";
import type { useOpenVPNServer } from "../../Protocols/OpenVPN/useOpenVPNServer";
import type { useWireguardServer } from "../../Protocols/Wireguard/useWireguardServer";

interface ConfigStepProps {
  enabledProtocols: Record<VPNType, boolean>;
  vpnHooks?: {
    openVpn?: ReturnType<typeof useOpenVPNServer>;
    wireguard?: ReturnType<typeof useWireguardServer>;
  };
}

export const ConfigStep = component$<ConfigStepProps>(
  ({ enabledProtocols, vpnHooks }) => {
    const context = useStepperContext(VPNServerContextId);
    const state = useStore({
      initialProcessingDone: false,
      configStepId: -1,
      isProcessing: false,
      stepsByProtocol: new Map<string, number>(),
      processedProtocols: new Set<string>(),
      lastProtocolState: JSON.stringify({}),
      certificateStepId: -1,
      hasCertificateStep: false,
    });

    // Create lazy protocol component factories (QRLs) so they render only when needed
    const protocolFactories = {
      Wireguard: $(() => <WireguardServerWrapper hook={vpnHooks?.wireguard} />),
      OpenVPN: $(() => <OpenVPNServerWrapper hook={vpnHooks?.openVpn} />),
      PPTP: $(() => <PPTPServerWrapper />),
      L2TP: $(() => <L2TPServerWrapper />),
      SSTP: $(() => <SSTPServerWrapper />),
      IKeV2: $(() => <IKEv2ServerWrapper />),
      Socks5: $(() => <Socks5ServerWrapper />),
      SSH: $(() => <SSHServerWrapper />),
      HTTPProxy: $(() => <HTTPProxyServerWrapper />),
      BackToHome: $(() => <BackToHomeServerWrapper />),
      ZeroTier: $(() => <ZeroTierServerWrapper />),
    } as const;

    // Check if any protocols requiring certificates are enabled
    const requiresCertificateStep = $(() => {
      const certificateProtocols: VPNType[] = ["OpenVPN", "SSTP", "IKeV2"];
      return certificateProtocols.some(protocol => enabledProtocols[protocol]);
    });

    // Find existing Certificate step in stepper
    const findExistingCertificateStep = $(() => {
      const stepIndex = context.steps.value.findIndex(
        (step) => step.title === $localize`Certificate Configuration`
      );
      return stepIndex >= 0 ? context.steps.value[stepIndex].id : -1;
    });

    // Add Certificate step if needed
    const addCertificateStep = $(async () => {
      // Skip if already has certificate step
      if (state.hasCertificateStep) {
        return state.certificateStepId;
      }

      // Check if step already exists
      const existingStepId = await findExistingCertificateStep();
      if (existingStepId >= 0) {
        state.certificateStepId = existingStepId;
        state.hasCertificateStep = true;
        return existingStepId;
      }

      // Find the protocols step position
      const protocolsStepIndex = context.steps.value.findIndex((step) =>
        step.title.includes("Protocols")
      );

      if (protocolsStepIndex < 0) return -1;

      // Position certificate step after protocols step but before configuration step
      const insertPosition = protocolsStepIndex + 1;

      // Create Certificate step component
      const CertificateStepWrapper$ = $(() => (
        <CertificateStep enabledProtocols={enabledProtocols} />
      ));

      // Add the step
      const stepId = await context.addStep$(
        {
          id: Date.now() + 1000, // Unique ID
          title: $localize`Certificate Configuration`,
          description: $localize`Configure certificates for VPN protocols that require them`,
          component: CertificateStepWrapper$,
          isComplete: true, // Mark as complete by default
        },
        insertPosition,
      );

      state.certificateStepId = stepId;
      state.hasCertificateStep = true;
      return stepId;
    });

    // Remove Certificate step
    const removeCertificateStep = $(async () => {
      if (state.hasCertificateStep && state.certificateStepId >= 0) {
        await context.removeStep$(state.certificateStepId);
        state.certificateStepId = -1;
        state.hasCertificateStep = false;
        return true;
      }
      return false;
    });

    // Check if a protocol already has an existing step in the stepper
    const findExistingStepByProtocol = $((protocol: VPNType) => {
      const protocolInfo = VPN_PROTOCOLS.find((p) => p.id === protocol);
      if (!protocolInfo) return -1;

      const stepIndex = context.steps.value.findIndex(
        (step) => step.title === `Configure ${protocolInfo.name}`,
      );

      return stepIndex >= 0 ? context.steps.value[stepIndex].id : -1;
    });

    // Function to add a single protocol step if it doesn't already exist
    const addProtocolStep = $(async (protocol: VPNType) => {
      // Skip if this protocol already has a step in our tracking map
      if (state.stepsByProtocol.has(protocol)) {
        return state.stepsByProtocol.get(protocol) || -1;
      }

      // Check if a step for this protocol already exists in the stepper
      const existingStepId = await findExistingStepByProtocol(protocol);
      if (existingStepId >= 0) {
        // Found an existing step, track it in our map
        state.stepsByProtocol.set(protocol, existingStepId);
        state.processedProtocols.add(protocol);
        return existingStepId;
      }

      const protocolInfo = VPN_PROTOCOLS.find((p) => p.id === protocol);
      if (!protocolInfo) return -1;

      const componentQrl =
        protocolFactories[protocol as keyof typeof protocolFactories];
      if (!componentQrl) return -1;

      // Find the config step position
      const configStepIndex = context.steps.value.findIndex((step) =>
        step.title.includes("Configuration"),
      );

      if (configStepIndex < 0) return -1;

      // Position to insert (after any existing protocol steps but before the next main step)
      let insertPosition = configStepIndex + 1;

      // Adjust position to be after any existing protocol steps
      while (
        insertPosition < context.steps.value.length &&
        context.steps.value[insertPosition]?.title.startsWith("Configure ")
      ) {
        insertPosition++;
      }

      // Create a step for this protocol
      const stepId = await context.addStep$(
        {
          id: Date.now(), // Unique ID based on timestamp
          title: `Configure ${protocolInfo.name}`,
          description: `Configure settings for the ${protocolInfo.name} VPN protocol`,
          component: componentQrl,
          isComplete: true, // Mark as complete by default since configuration is optional
        },
        insertPosition,
      );

      // Track this step ID by protocol
      state.stepsByProtocol.set(protocol, stepId);
      state.processedProtocols.add(protocol);

      return stepId;
    });

    // Remove a protocol step
    const removeProtocolStep = $(async (protocol: VPNType) => {
      const stepId = state.stepsByProtocol.get(protocol);
      if (stepId !== undefined) {
        await context.removeStep$(stepId);
        state.stepsByProtocol.delete(protocol);
        return true;
      }
      return false;
    });

    // Process all enabled protocols
    const processEnabledProtocols = $(async () => {
      // Skip if already processing or if prevented by the context flag
      if (state.isProcessing || context.data.preventStepRecalculation) {
        return;
      }

      state.isProcessing = true;

      try {
        // First, check for any existing protocol steps in the stepper that we don't know about
        // This happens when navigating back to this step after completing it once
        for (const protocol of Object.keys(enabledProtocols) as VPNType[]) {
          if (
            enabledProtocols[protocol] &&
            !state.stepsByProtocol.has(protocol)
          ) {
            const existingStepId = await findExistingStepByProtocol(protocol);
            if (existingStepId >= 0) {
              state.stepsByProtocol.set(protocol, existingStepId);
              state.processedProtocols.add(protocol);
            }
          }
        }

        // Also check for existing certificate step
        if (!state.hasCertificateStep && await requiresCertificateStep()) {
          const existingCertStepId = await findExistingCertificateStep();
          if (existingCertStepId >= 0) {
            state.certificateStepId = existingCertStepId;
            state.hasCertificateStep = true;
          }
        }

        // Get current enabled protocols
        const currentEnabledProtocols = Object.entries(enabledProtocols)
          .filter(([, enabled]) => enabled)
          .map(([protocol]) => protocol as VPNType);

        // Get current protocols that have steps but should not (no longer enabled)
        const protocolsToRemove = Array.from(
          state.stepsByProtocol.keys(),
        ).filter(
          (protocol) => !currentEnabledProtocols.includes(protocol as VPNType),
        );

        // Remove steps for protocols that are no longer enabled
        for (const protocol of protocolsToRemove) {
          await removeProtocolStep(protocol as VPNType);
        }

        // Add steps for newly enabled protocols
        for (const protocol of currentEnabledProtocols) {
          await addProtocolStep(protocol);
        }

        // Handle Certificate step based on enabled protocols
        const needsCertificateStep = await requiresCertificateStep();
        if (needsCertificateStep && !state.hasCertificateStep) {
          // Add certificate step if protocols requiring certificates are enabled
          await addCertificateStep();
        } else if (!needsCertificateStep && state.hasCertificateStep) {
          // Remove certificate step if no protocols requiring certificates are enabled
          await removeCertificateStep();
        }

        // Store current config for comparison next time
        state.lastProtocolState = JSON.stringify(enabledProtocols);

        // If we have no enabled protocols, mark config step as complete and move on
        if (currentEnabledProtocols.length === 0) {
          // Directly update the step state in the context
          if (context.data.stepState) {
            context.data.stepState.config = true;
          }

          // Get the current step and mark it as complete
          const configStep = context.steps.value.find((step) =>
            step.title.includes("Configuration"),
          );
          if (configStep) {
            await context.updateStepCompletion$(configStep.id, true);
          }

          // If we're on the config step, proceed to next step
          if (context.activeStep.value === state.configStepId) {
            await context.nextStep$();
          }
        }
      } finally {
        state.isProcessing = false;
      }
    });

    // Update configStepId when steps change
    useTask$(({ track }) => {
      const steps = track(() => context.steps.value);
      const configStepIndex = steps.findIndex((step) =>
        step.title.includes("Configuration"),
      );

      if (configStepIndex >= 0) {
        state.configStepId = configStepIndex;
      }
    });

    // Watch for active step changes and process when reaching the config step
    useTask$(({ track }) => {
      // Track active step changes
      const activeStepIndex = track(() => context.activeStep.value);

      // If now on config step, process protocols
      if (activeStepIndex === state.configStepId) {
        // Always process when moving to the config step
        void processEnabledProtocols();
        state.initialProcessingDone = true;
      }
    });

    // React to protocol changes ONLY when coming from protocols step
    useTask$(({ track }) => {
      // Track current protocol state
      const currentProtocolState = track(() =>
        JSON.stringify(enabledProtocols),
      );

      // Skip if preventStepRecalculation is set
      if (context.data.preventStepRecalculation) {
        return;
      }

      // Skip if no actual changes
      if (currentProtocolState === state.lastProtocolState) {
        return;
      }

      // Process protocol changes if on step 0 (protocols step)
      if (context.activeStep.value === 0) {
        void processEnabledProtocols();
      }
    });

    // Ensure initial processing happens
    useVisibleTask$(() => {
      if (!state.initialProcessingDone) {
        void processEnabledProtocols();
        state.initialProcessingDone = true;
      }
    });

    // Check if we have any protocols to show
    const hasEnabledProtocols = Object.values(enabledProtocols).some(
      (enabled) => enabled,
    );

    // Now includes a visible UI when there are no enabled protocols
    return (
      <div class="py-2">
        {!hasEnabledProtocols && (
          <div class="flex flex-col items-center justify-center space-y-4 py-8">
            <HiCogOutline class="h-12 w-12 text-primary-500 dark:text-primary-400" />
            <h2 class="text-center text-xl font-semibold text-gray-900 dark:text-white">
              {$localize`VPN Protocol Configuration`}
            </h2>
            <p class="max-w-md text-center text-gray-600 dark:text-gray-400">
              {$localize`No VPN protocols are currently enabled. Return to the previous step to select at least one protocol to configure.`}
            </p>
          </div>
        )}
      </div>
    );
  },
);
