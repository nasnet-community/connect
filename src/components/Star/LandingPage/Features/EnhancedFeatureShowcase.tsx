import { component$ } from "@builder.io/qwik";

// Import all feature sections
import { MultiWANSection } from "./sections/MultiWANSection";
import { RouterChainingSection } from "./sections/RouterChainingSection";
import { LoadBalanceSection } from "./sections/LoadBalanceSection";
import { VPNClientSection } from "./sections/VPNClientSection";
import { VPNServerSection } from "./sections/VPNServerSection";
import { WirelessNetworksSection } from "./sections/WirelessNetworksSection";
import { NetworkTunnelsSection } from "./sections/NetworkTunnelsSection";
import { GamingOptimizationSection } from "./sections/GamingOptimizationSection";
import { PortForwardingSection } from "./sections/PortForwardingSection";

export const EnhancedFeatureShowcase = component$(() => {
  return (
    <>
      {/* Render all 9 feature sections in sequence */}
      <MultiWANSection />
      <RouterChainingSection />
      <LoadBalanceSection />
      <VPNClientSection />
      <VPNServerSection />
      <WirelessNetworksSection />
      <NetworkTunnelsSection />
      <GamingOptimizationSection />
      <PortForwardingSection />
    </>
  );
});
