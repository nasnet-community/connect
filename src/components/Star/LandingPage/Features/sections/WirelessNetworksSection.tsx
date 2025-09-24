import { component$, $ } from "@builder.io/qwik";
import { LuArrowRight } from "@qwikest/icons/lucide";
import { Button, Badge, Graph, createNode } from "~/components/Core";
import type { GraphConnection, GraphNode } from "~/components/Core/Graph/types";

export const WirelessNetworksSection = component$(() => {
  const networks = [
    { name: $localize`Foreign Network`, color: "from-purple-500 to-violet-500", icon: "🌍" },
    { name: $localize`Domestic Network`, color: "from-green-500 to-emerald-500", icon: "🏠" },
    { name: $localize`Split Network`, color: "from-blue-500 to-cyan-500", icon: "🔀" },
    { name: $localize`VPN Network`, color: "from-orange-500 to-red-500", icon: "🔒" },
  ];

  // Create nodes for the network graph
  const nodes: GraphNode[] = [
    createNode("WirelessRouter", "router", 250, 200, { label: $localize`Central Router` }),
    createNode("ForeignWAN", "foreign", 100, 50, { label: $localize`Foreign Network` }),
    createNode("DomesticWAN", "domestic", 400, 50, { label: $localize`Domestic Network` }),
    createNode("WirelessUser", "split", 100, 350, { label: $localize`Split Network` }),
    createNode("VPNServer", "vpn", 400, 350, { label: $localize`VPN Network` }),
  ];

  // Create connections with different traffic types
  const connections: GraphConnection[] = [
    {
      from: "router",
      to: "foreign",
      trafficType: "Foreign",
      animated: true,
      label: $localize`Foreign Traffic`,
    },
    {
      from: "router",
      to: "domestic",
      trafficType: "Domestic",
      animated: true,
      label: $localize`Domestic Traffic`,
    },
    {
      from: "router",
      to: "split",
      color: "#06b6d4",
      animated: true,
      label: $localize`Split Traffic`,
      dashed: true,
    },
    {
      from: "router",
      to: "vpn",
      trafficType: "VPN",
      animated: true,
      label: $localize`VPN Traffic`,
    },
  ];

  // Graph configuration
  const graphConfig = {
    width: "100%",
    height: "400px",
    viewBox: "0 0 500 400",
    showLegend: true,
    expandOnHover: true,
    legendItems: [
      { color: "#9333ea", label: $localize`Foreign` },
      { color: "#84cc16", label: $localize`Domestic` },
      { color: "#06b6d4", label: $localize`Split` },
      { color: "#f97316", label: $localize`VPN` },
    ],
  };

  const handleNodeClick$ = $((node: GraphNode) => {
    console.log("Clicked on network:", node.label);
  });

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-slate-900 dark:via-orange-900 dark:to-red-900">
      {/* Animated wave patterns */}
      <div class="absolute inset-0 overflow-hidden">
        <svg class="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none" viewBox="0 0 1440 800">
          <path d="M0,400 C360,300 720,500 1440,400 L1440,800 L0,800 Z" fill="url(#wave-gradient)" class="animate-wave" />
          <path d="M0,450 C360,350 720,550 1440,450 L1440,800 L0,800 Z" fill="url(#wave-gradient)" class="animate-wave animation-delay-2000" opacity="0.5" />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#f97316;stop-opacity:0.8" />
              <stop offset="50%" style="stop-color:#ef4444;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wireless signal pulses */}
      <div class="absolute inset-0">
        <div class="absolute top-1/3 left-1/4 w-32 h-32">
          <div class="absolute inset-0 bg-orange-400 rounded-full opacity-20 animate-ping" />
          <div class="absolute inset-4 bg-orange-400 rounded-full opacity-30 animate-ping animation-delay-1000" />
          <div class="absolute inset-8 bg-orange-400 rounded-full opacity-40 animate-ping animation-delay-2000" />
        </div>
        <div class="absolute bottom-1/3 right-1/4 w-24 h-24">
          <div class="absolute inset-0 bg-red-400 rounded-full opacity-20 animate-ping animation-delay-3000" />
          <div class="absolute inset-3 bg-red-400 rounded-full opacity-30 animate-ping animation-delay-4000" />
        </div>
      </div>

      {/* Dot matrix pattern */}
      <div class="absolute inset-0 opacity-5">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle, #f97316 1px, transparent 1px); background-size: 20px 20px;" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side - Interactive Graph */}
          <div class="relative animate-fade-in-left order-2 lg:order-1">
            <div class="bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-4 shadow-2xl">
              <Graph
                nodes={nodes}
                connections={connections}
                title={$localize`Network Segmentation Topology`}
                config={graphConfig}
                onNodeClick$={handleNodeClick$}
              />
            </div>
            <div class="mt-4 grid grid-cols-2 gap-2 text-sm">
              {networks.map((network) => (
                <div key={network.name} class="flex items-center gap-2">
                  <span class="text-xl">{network.icon}</span>
                  <span class="text-gray-700 dark:text-gray-300">{network.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-right order-1 lg:order-2">
            <Badge color="warning" variant="outline" size="lg">
              {$localize`Network Segmentation`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {$localize`Multiple Wireless`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Networks`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Purpose-built networks with intelligent segmentation. Create isolated networks for different purposes with bandwidth control and routing rules.`}
            </p>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Configure Networks`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});