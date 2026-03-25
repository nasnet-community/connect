import { component$, $ } from "@builder.io/qwik";
import { Badge, Graph, createNode } from "~/components/Core";
import type { GraphConnection, GraphNode } from "~/components/Core/Graph/types";

export const WirelessNetworksSection = component$(() => {
  const networks = [
    {
      name: $localize`Foreign Network`,
      color: "from-purple-500 to-violet-500",
      icon: "🌍",
    },
    {
      name: $localize`Domestic Network`,
      color: "from-green-500 to-emerald-500",
      icon: "🏠",
    },
    {
      name: $localize`Split Network`,
      color: "from-blue-500 to-cyan-500",
      icon: "🔀",
    },
    {
      name: $localize`VPN Network`,
      color: "from-orange-500 to-red-500",
      icon: "🔒",
    },
  ];

  // Create nodes for the network graph
  const nodes: GraphNode[] = [
    createNode("WirelessRouter", "router", 250, 200, {
      label: $localize`Central Router`,
    }),
    createNode("ForeignWAN", "foreign", 100, 50, {
      label: $localize`Foreign Network`,
    }),
    createNode("DomesticWAN", "domestic", 400, 50, {
      label: $localize`Domestic Network`,
    }),
    createNode("WirelessUser", "split", 100, 350, {
      label: $localize`Split Network`,
    }),
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
    <section class="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 px-4 py-24 dark:from-slate-900 dark:via-orange-900 dark:to-red-900">
      {/* Animated wave patterns */}
      <div class="absolute inset-0 overflow-hidden">
        <svg
          class="absolute inset-0 h-full w-full opacity-10"
          preserveAspectRatio="none"
          viewBox="0 0 1440 800"
        >
          <path
            d="M0,400 C360,300 720,500 1440,400 L1440,800 L0,800 Z"
            fill="url(#wave-gradient)"
            class="animate-wave"
          />
          <path
            d="M0,450 C360,350 720,550 1440,450 L1440,800 L0,800 Z"
            fill="url(#wave-gradient)"
            class="animate-wave animation-delay-2000"
            opacity="0.5"
          />
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" style="stop-color:#f97316;stop-opacity:0.8" />
              <stop offset="50%" style="stop-color:#ef4444;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Wireless signal pulses */}
      <div class="absolute inset-0">
        <div class="absolute left-1/4 top-1/3 h-32 w-32">
          <div class="absolute inset-0 animate-ping rounded-full bg-orange-400 opacity-20" />
          <div class="absolute inset-4 animate-ping rounded-full bg-orange-400 opacity-30 animation-delay-1000" />
          <div class="absolute inset-8 animate-ping rounded-full bg-orange-400 opacity-40 animation-delay-2000" />
        </div>
        <div class="absolute bottom-1/3 right-1/4 h-24 w-24">
          <div class="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-20 animation-delay-3000" />
          <div class="absolute inset-3 animate-ping rounded-full bg-red-400 opacity-30 animation-delay-4000" />
        </div>
      </div>

      {/* Dot matrix pattern */}
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0"
          style="background-image: radial-gradient(circle, #f97316 1px, transparent 1px); background-size: 20px 20px;"
        />
      </div>

      <div class="relative z-10 mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual Side - Interactive Graph */}
          <div class="animate-fade-in-left relative order-2 lg:order-1">
            <div class="rounded-2xl bg-white/80 p-4 shadow-2xl backdrop-blur-lg dark:bg-black/40">
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
                  <span class="text-gray-700 dark:text-gray-300">
                    {network.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content Side */}
          <div class="animate-fade-in-right order-1 space-y-6 lg:order-2">
            <Badge color="warning" variant="outline" size="lg">
              {$localize`Network Segmentation`}
            </Badge>

            <h2 class="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span class="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {$localize`Multiple Wireless`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Networks`}
              </span>
            </h2>

            <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {$localize`Purpose-built networks with intelligent segmentation. Create isolated networks for different purposes with bandwidth control and routing rules.`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});
