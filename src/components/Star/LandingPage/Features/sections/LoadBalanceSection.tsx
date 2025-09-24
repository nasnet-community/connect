import { $, component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { LuTrendingUp, LuActivity, LuZap, LuArrowRight } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphNode, GraphConnection } from "~/components/Core/Graph";

export const LoadBalanceSection = component$(() => {
  const activeAlgorithm = useSignal("pcc");
  const trafficFlow = useSignal([30, 25, 20, 25]);
  const selectedNode = useSignal<string | null>(null);
  const showTrafficFlow = useSignal(true);

  const algorithms = [
    {
      id: "pcc",
      name: "PCC",
      full: $localize`Per Connection Classifier`,
      description: $localize`Distributes connections evenly across links`,
      efficiency: 95,
    },
    {
      id: "nth",
      name: "NTH",
      full: $localize`Nth Packet`,
      description: $localize`Round-robin packet distribution`,
      efficiency: 85,
    },
    {
      id: "ecmp",
      name: "ECMP",
      full: $localize`Equal Cost Multi-Path`,
      description: $localize`Load balancing across equal cost paths`,
      efficiency: 90,
    },
    {
      id: "bonding",
      name: "Bonding",
      full: $localize`Link Aggregation`,
      description: $localize`Combines multiple links into single pipe`,
      efficiency: 98,
    },
  ];

  // Graph nodes for load balancing topology
  const nodes: GraphNode[] = [
    createNode("WirelessRouter", "router", 250, 200, {
      label: $localize`Load Balancer`
    }),
    // WAN links
    createNode("DomesticWAN", "wan1", 100, 100, {
      label: $localize`WAN 1`
    }),
    createNode("ForeignWAN", "wan2", 400, 100, {
      label: $localize`WAN 2`
    }),
    createNode("DomesticWAN", "wan3", 100, 300, {
      label: $localize`WAN 3`
    }),
    createNode("ForeignWAN", "wan4", 400, 300, {
      label: $localize`WAN 4`
    }),
    // Client traffic sources
    createNode("User", "clients", 50, 200, {
      label: $localize`Client Traffic`
    }),
  ];

  // Graph connections with dynamic load percentages
  const connections: GraphConnection[] = [
    // Client to router
    {
      from: "clients",
      to: "router",
      trafficType: "Domestic",
      label: $localize`Incoming Traffic`,
      animated: true,
      width: 4,
      color: "#6366f1",
    },
    // Router to WAN links with traffic percentages
    {
      from: "router",
      to: "wan1",
      trafficType: "Domestic",
      label: `${Math.round(trafficFlow.value[0])}% Load`,
      animated: showTrafficFlow.value,
      width: Math.max(2, Math.round(trafficFlow.value[0] / 15)),
      color: "#84cc16",
      packetDelay: [0, 1],
    },
    {
      from: "router",
      to: "wan2",
      trafficType: "Foreign",
      label: `${Math.round(trafficFlow.value[1])}% Load`,
      animated: showTrafficFlow.value,
      width: Math.max(2, Math.round(trafficFlow.value[1] / 15)),
      color: "#9333ea",
      packetDelay: [0.3, 1.3],
    },
    {
      from: "router",
      to: "wan3",
      trafficType: "Domestic",
      label: `${Math.round(trafficFlow.value[2])}% Load`,
      animated: showTrafficFlow.value,
      width: Math.max(2, Math.round(trafficFlow.value[2] / 15)),
      color: "#f59e0b",
      packetDelay: [0.6, 1.6],
    },
    {
      from: "router",
      to: "wan4",
      trafficType: "Foreign",
      label: `${Math.round(trafficFlow.value[3])}% Load`,
      animated: showTrafficFlow.value,
      width: Math.max(2, Math.round(trafficFlow.value[3] / 15)),
      color: "#ef4444",
      packetDelay: [0.9, 1.9],
    },
  ];

  // Handle node clicks
  const handleNodeClick = $((node: GraphNode) => {
    selectedNode.value = node.label || node.id.toString();
  });

  // Animate traffic flow bars
  useVisibleTask$(({ track, cleanup }) => {
    track(() => activeAlgorithm.value);

    const interval = setInterval(() => {
      trafficFlow.value = trafficFlow.value.map(() =>
        15 + Math.random() * 35 // Random values between 15-50
      );
    }, 2000);

    cleanup(() => clearInterval(interval));
  });

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-purple-50 via-violet-50 to-pink-50 dark:from-slate-900 dark:via-purple-900 dark:to-violet-900">
      {/* Balanced geometric shapes */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-purple-200 dark:border-purple-800 rounded-full opacity-20 animate-spin-slow" />
        <div class="absolute bottom-1/4 right-1/4 w-64 h-64 border-4 border-violet-200 dark:border-violet-800 rounded-full opacity-20 animate-spin-slow animation-delay-3000" />
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-4 border-pink-200 dark:border-pink-800 rotate-45 opacity-20 animate-pulse" />
      </div>

      {/* Floating balance indicators */}
      <div class="absolute inset-0">
        <div class="absolute top-20 right-1/3 animate-float">
          <svg class="w-12 h-12 text-purple-400 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2"/>
            <path d="M12 2v20M2 12h20" stroke-width="1"/>
          </svg>
        </div>
        <div class="absolute bottom-32 left-1/4 animate-float animation-delay-2000">
          <svg class="w-8 h-8 text-violet-400 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke-width="2"/>
            <line x1="4" y1="12" x2="20" y2="12" stroke-width="1"/>
            <line x1="12" y1="4" x2="12" y2="20" stroke-width="1"/>
          </svg>
        </div>
      </div>

      {/* Grid pattern with gradient overlay */}
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,purple_1px,transparent_1px)] bg-[size:50px_50px]" />
        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20" />
      </div>

      {/* Animated load bars */}
      <div class="absolute inset-0">
        <div class="absolute top-1/3 left-10 w-32 h-2 bg-purple-200 dark:bg-purple-800 rounded-full overflow-hidden">
          <div class="h-full bg-purple-500 animate-load-bar" style="width: 75%;" />
        </div>
        <div class="absolute top-1/2 right-10 w-32 h-2 bg-violet-200 dark:bg-violet-800 rounded-full overflow-hidden">
          <div class="h-full bg-violet-500 animate-load-bar animation-delay-2000" style="width: 60%;" />
        </div>
        <div class="absolute bottom-1/3 left-20 w-32 h-2 bg-pink-200 dark:bg-pink-800 rounded-full overflow-hidden">
          <div class="h-full bg-pink-500 animate-load-bar animation-delay-4000" style="width: 85%;" />
        </div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-left">
            <Badge color="secondary" variant="outline" size="lg">
              {$localize`High Availability`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                {$localize`LoadBalance`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`& Failover`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Advanced algorithms for optimal performance. Ensure high availability with intelligent traffic distribution and automatic failover protection.`}
            </p>

            {/* Algorithm Selection */}
            <div class="space-y-3">
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
                {$localize`Load Balancing Algorithms`}
              </h3>
              <div class="grid grid-cols-2 gap-3">
                {algorithms.map((algo) => (
                  <button
                    key={algo.id}
                    class={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
                      activeAlgorithm.value === algo.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-purple-300"
                    }`}
                    onClick$={() => activeAlgorithm.value = algo.id}
                  >
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {algo.name}
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">
                      {algo.full}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Algorithm Details */}
            {algorithms.find(a => a.id === activeAlgorithm.value) && (
              <div class="bg-white/50 dark:bg-black/50 rounded-xl p-4">
                <div class="flex items-start gap-3">
                  <div class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <LuActivity class="w-5 h-5 text-purple-500" />
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                      {algorithms.find(a => a.id === activeAlgorithm.value)?.name}
                    </h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {algorithms.find(a => a.id === activeAlgorithm.value)?.description}
                    </p>
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-gray-500">{$localize`Efficiency`}:</span>
                      <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          class="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-500"
                          style={`width: ${algorithms.find(a => a.id === activeAlgorithm.value)?.efficiency}%`}
                        />
                      </div>
                      <span class="text-xs font-semibold text-purple-600">
                        {algorithms.find(a => a.id === activeAlgorithm.value)?.efficiency}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Configure Load Balancing`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual Side - Interactive Load Balance Graph */}
          <div class="relative animate-fade-in-right">
            <div class="bg-white/30 dark:bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                  <LuActivity class="w-5 h-5 text-purple-500" />
                  {$localize`Live Load Distribution`}
                </h3>
                <button
                  onClick$={() => showTrafficFlow.value = !showTrafficFlow.value}
                  class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    showTrafficFlow.value
                      ? "bg-purple-500/20 border-purple-500 text-purple-700 dark:text-purple-300"
                      : "bg-gray-100/50 border-gray-300 text-gray-500 dark:bg-gray-800/50"
                  }`}
                >
                  <LuZap class="w-4 h-4" />
                  {$localize`Animation`}
                </button>
              </div>

              {/* Selected Node Info */}
              {selectedNode.value && (
                <div class="mb-3 rounded-lg bg-purple-50 dark:bg-purple-900/30 p-3 border border-purple-200 dark:border-purple-700">
                  <p class="text-sm font-medium text-purple-800 dark:text-purple-200">
                    {$localize`Selected:`} {selectedNode.value}
                  </p>
                </div>
              )}

              {/* Algorithm Indicator */}
              <div class="mb-4 p-3 bg-gradient-to-r from-purple-500/10 to-violet-500/10 rounded-lg border border-purple-200 dark:border-purple-700">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {$localize`Active Algorithm:`} {algorithms.find(a => a.id === activeAlgorithm.value)?.name}
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">
                      {algorithms.find(a => a.id === activeAlgorithm.value)?.description}
                    </div>
                  </div>
                  <div class="text-lg font-bold text-purple-600">
                    {algorithms.find(a => a.id === activeAlgorithm.value)?.efficiency}%
                  </div>
                </div>
              </div>

              {/* Graph Component */}
              <Graph
                nodes={nodes}
                connections={connections}
                title={$localize`Load Balancing Topology`}
                config={{
                  width: "100%",
                  height: "380px",
                  viewBox: "0 0 500 380",
                  showLegend: true,
                  legendItems: [
                    { color: "#84cc16", label: $localize`Domestic Link` },
                    { color: "#9333ea", label: $localize`Foreign Link` },
                    { color: "#f59e0b", label: $localize`Backup Link` },
                    { color: "#6366f1", label: $localize`Client Traffic` },
                  ],
                }}
                onNodeClick$={handleNodeClick}
              />

              {/* Traffic Flow Bars */}
              <div class="mt-4 space-y-2">
                <h4 class="text-sm font-semibold text-gray-700 dark:text-gray-300">{$localize`Real-time Load:`}</h4>
                {["WAN 1", "WAN 2", "WAN 3", "WAN 4"].map((wan, index) => (
                  <div key={wan} class="flex items-center gap-3">
                    <span class="text-xs font-medium text-gray-600 dark:text-gray-400 w-12">{wan}</span>
                    <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        class="h-full bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-1000 rounded-full"
                        style={`width: ${Math.max(10, trafficFlow.value[index] * 2)}%`}
                      />
                    </div>
                    <span class="text-xs font-semibold text-purple-600 w-8">
                      {Math.round(trafficFlow.value[index])}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Performance Stats */}
              <div class="grid grid-cols-3 gap-3 mt-6">
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <LuZap class="w-6 h-6 text-purple-500 mx-auto mb-1" />
                  <div class="text-lg font-bold text-gray-900 dark:text-white">&lt;1ms</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Failover`}</div>
                </div>
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <LuTrendingUp class="w-6 h-6 text-violet-500 mx-auto mb-1" />
                  <div class="text-lg font-bold text-gray-900 dark:text-white">4x</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Throughput`}</div>
                </div>
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <LuActivity class="w-6 h-6 text-pink-500 mx-auto mb-1" />
                  <div class="text-lg font-bold text-gray-900 dark:text-white">99.99%</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Uptime`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});