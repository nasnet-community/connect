import { component$, useTask$, $ } from "@builder.io/qwik";
import { PPTPServer } from "../Protocols/PPTP/PPTPServer";
import { L2TPServer } from "../Protocols/L2TP/L2TPServer";
import { SSTPServer } from "../Protocols/SSTP/SSTPServer";
import { IKEv2Server } from "../Protocols/IKeV2/IKEv2Server";
import { OpenVPNServer } from "../Protocols/OpenVPN/OpenVPNServer";
import { WireguardServer } from "../Protocols/Wireguard/WireguardServer";
import { useStepperContext } from "~/components/Core/Stepper/CStepper";
import { VPNServerContextId } from "../VPNServer";

interface ConfigStepProps {
  enabledProtocols: Record<string, boolean>;
}

export const ConfigStep = component$<ConfigStepProps>(({
  enabledProtocols,
}) => {
  // Access the stepper context
  const stepper = useStepperContext(VPNServerContextId);
  
  // Create safe wrapper function that doesn't leak promises
  const safeCompleteStep = $(async (stepId: number) => {
    if (stepper?.completeStep$) {
      await stepper.completeStep$(stepId);
    }
    return null;
  });
  
  // Auto complete this step since configuration is optional
  useTask$(async () => {
    await safeCompleteStep(1);
  });

  return (
    <div class="space-y-6">
      {/* Wireguard Server Configuration - Only if enabled */}
      {enabledProtocols.Wireguard && <WireguardServer />}
      
      {/* PPTP Server Configuration - Only if enabled */}
      {enabledProtocols.PPTP && <PPTPServer />}
      
      {/* L2TP Server Configuration - Only if enabled */}
      {enabledProtocols.L2TP && <L2TPServer />}
      
      {/* SSTP Server Configuration - Only if enabled */}
      {enabledProtocols.SSTP && <SSTPServer />}
      
      {/* IKEv2 Server Configuration - Only if enabled */}
      {enabledProtocols.IKeV2 && <IKEv2Server />}
      
      {/* OpenVPN Server Configuration - Only if enabled */}
      {enabledProtocols.OpenVPN && <OpenVPNServer />}
    </div>
  );
}); 