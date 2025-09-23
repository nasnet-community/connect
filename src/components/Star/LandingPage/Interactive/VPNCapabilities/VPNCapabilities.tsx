import { component$, useSignal } from "@builder.io/qwik";
import { Badge } from "~/components/Core";
import { vpnProtocols, vpnBottomFeatures } from "../../data/vpnProtocolsData";
import { ProtocolSelector } from "./ProtocolSelector";
import { ProtocolDetails } from "./ProtocolDetails";
import { BottomFeatures } from "./BottomFeatures";

export const VPNCapabilities = component$(() => {
  const activeProtocol = useSignal("wireguard");
  const currentProtocol = vpnProtocols.find(p => p.id === activeProtocol.value) || vpnProtocols[0];

  return (
    <section class="relative py-24 px-4">
      <div class="max-w-7xl mx-auto">
        {/* Section Header */}
        <div class="text-center mb-16">
          <Badge color="success" variant="outline" size="lg" class="mb-4">
            {$localize`VPN Solutions`}
          </Badge>
          <h2 class="text-3xl md:text-5xl font-bold mb-6">
            <span class="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              {$localize`6 VPN Protocols`}
            </span>
            <br />
            <span class="text-gray-900 dark:text-white">
              {$localize`Server & Client`}
            </span>
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {$localize`Complete VPN solution supporting all major protocols. Set up secure remote access, site-to-site connections, or privacy tunnels with enterprise-grade security.`}
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 items-start">
          {/* Protocol Selection */}
          <ProtocolSelector
            protocols={vpnProtocols}
            activeProtocol={activeProtocol}
          />

          {/* Protocol Details */}
          <ProtocolDetails currentProtocol={currentProtocol} />
        </div>

        {/* Bottom Features */}
        <BottomFeatures features={vpnBottomFeatures} />
      </div>
    </section>
  );
});