import { $, component$, useSignal } from "@builder.io/qwik";
import { LuRouter, LuWifi, LuLink, LuArrowRight, LuRadio } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphNode, GraphConnection } from "~/components/Core/Graph";

export const RouterChainingSection = component$(() => {
  const activeRouter = useSignal<number>(0);
  const selectedNode = useSignal<string | null>(null);
  const showCoverage = useSignal(true);

  const routers = [
    { id: "master", name: $localize`Master Router`, type: "primary", signal: 100 },
    { id: "slave1", name: $localize`Slave Router 1`, type: "secondary", signal: 90 },
    { id: "slave2", name: $localize`Slave Router 2`, type: "secondary", signal: 85 },
    { id: "slave3", name: $localize`Slave Router 3`, type: "secondary", signal: 80 },
  ];

  // Graph nodes for router chain topology
  const nodes: GraphNode[] = [
    createNode("WirelessRouter", "master", 250, 200, {
      label: $localize`Master Router`
    }),
    createNode("AP", "slave1", 100, 100, {
      label: $localize`Slave Router 1`
    }),
    createNode("AP", "slave2", 400, 100, {
      label: $localize`Slave Router 2`
    }),
    createNode("AP", "slave3", 250, 350, {
      label: $localize`Slave Router 3`
    }),
    // Client devices
    createNode("WirelessUser", "client1", 50, 200, { label: $localize`Mobile Device` }),
    createNode("EthernetUser", "client2", 450, 200, { label: $localize`Desktop` }),
    createNode("GamingConsole", "client3", 150, 300, { label: $localize`Gaming Console` }),
  ];

  // Graph connections
  const connections: GraphConnection[] = [
    // Master to slaves - wireless mesh
    {
      from: "master",
      to: "slave1",
      connectionType: "Wireless",
      label: $localize`Mesh Link`,
      animated: true,
      width: 3,
      color: "#10b981",
    },
    {
      from: "master",
      to: "slave2",
      connectionType: "Wireless",
      label: $localize`Mesh Link`,
      animated: true,
      width: 3,
      color: "#10b981",
    },
    {
      from: "master",
      to: "slave3",
      connectionType: "Wireless",
      label: $localize`Mesh Link`,
      animated: true,
      width: 3,
      color: "#10b981",
    },
    // Slave routers interconnected
    {
      from: "slave1",
      to: "slave2",
      connectionType: "Wireless",
      animated: false,
      dashed: true,
      width: 2,
      color: "#34d399",
    },
    {
      from: "slave2",
      to: "slave3",
      connectionType: "Wireless",
      animated: false,
      dashed: true,
      width: 2,
      color: "#34d399",
    },
    // Client connections
    {
      from: "client1",
      to: "slave1",
      connectionType: "Wireless",
      animated: true,
      width: 2,
      color: "#60a5fa",
    },
    {
      from: "client2",
      to: "slave2",
      connectionType: "Ethernet",
      animated: true,
      width: 2,
      color: "#60a5fa",
    },
    {
      from: "client3",
      to: "slave3",
      connectionType: "Wireless",
      animated: true,
      width: 2,
      color: "#ef4444",
    },
  ];

  // Handle node clicks
  const handleNodeClick = $((node: GraphNode) => {
    selectedNode.value = node.label || node.id.toString();
    // Find router index if it's a router
    const routerIndex = routers.findIndex(r => r.id === node.id);
    if (routerIndex !== -1) {
      activeRouter.value = routerIndex;
    }
  });

  // Handle connection clicks
  const handleConnectionClick = $((connection: GraphConnection) => {
    console.log("Connection clicked:", connection);
  });

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 dark:from-slate-900 dark:via-green-900 dark:to-emerald-900">
      {/* Background Pattern */}
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-grid-pattern bg-[size:60px_60px]" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side - Interactive Graph Router Chain Visualization */}
          <div class="relative animate-fade-in-left order-2 lg:order-1">
            <div class="bg-white/50 dark:bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              {/* Controls */}
              <div class="mb-4 flex items-center justify-between">
                <div class="flex gap-2">
                  <button
                    onClick$={() => showCoverage.value = !showCoverage.value}
                    class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                      showCoverage.value
                        ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300"
                        : "bg-gray-100/50 border-gray-300 text-gray-500 dark:bg-gray-800/50"
                    }`}
                  >
                    <LuWifi class="w-4 h-4" />
                    {$localize`Show Coverage`}
                  </button>
                </div>
                <div class="flex items-center gap-2">
                  <LuRadio class="w-4 h-4 text-green-500 animate-pulse" />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Active Mesh Network`}
                  </span>
                </div>
              </div>

              {/* Graph Component */}
              <Graph
                nodes={nodes}
                connections={connections}
                title={$localize`Router Chain Topology`}
                config={{
                  width: "100%",
                  height: "450px",
                  viewBox: "0 0 500 450",
                  showLegend: true,
                  legendItems: [
                    { color: "#10b981", label: $localize`Master-Slave Link` },
                    { color: "#34d399", label: $localize`Mesh Interconnect` },
                    { color: "#60a5fa", label: $localize`Client Connection` },
                    { color: "#ef4444", label: $localize`Gaming Traffic` },
                  ],
                }}
                onNodeClick$={handleNodeClick}
                onConnectionClick$={handleConnectionClick}
              />

              {/* Coverage Info */}
              <div class="mt-4 bg-gradient-to-t from-white/90 to-transparent dark:from-black/90 p-4 rounded-xl">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {$localize`Active Router`}
                    </div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedNode.value || routers[activeRouter.value].name}
                    </div>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {$localize`Signal Strength`}
                    </div>
                    <div class="text-lg font-bold text-green-500">
                      {routers[activeRouter.value].signal}%
                    </div>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {$localize`Connected Devices`}
                    </div>
                    <div class="text-lg font-bold text-blue-500">
                      3
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-right order-1 lg:order-2">
            <Badge color="success" variant="outline" size="lg">
              {$localize`Network Expansion`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {$localize`Router Chaining`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`& Coverage`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Master-Slave architecture for seamless network expansion. Connect multiple routers to extend coverage, increase capacity, and create unified wireless networks.`}
            </p>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <LuWifi class="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {$localize`Extended Range`}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Expand coverage area with multiple access points`}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <LuLink class="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {$localize`Seamless Roaming`}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Automatic handoff between routers without disconnection`}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <LuRouter class="w-4 h-4 text-teal-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {$localize`Unified Control`}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Manage all routers from a single master interface`}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div class="grid grid-cols-3 gap-4 pt-4">
              <div class="bg-white/50 dark:bg-black/50 rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-green-600">17+</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Router Models`}</div>
              </div>
              <div class="bg-white/50 dark:bg-black/50 rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-emerald-600">∞</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Expansion`}</div>
              </div>
              <div class="bg-white/50 dark:bg-black/50 rounded-xl p-3 text-center">
                <div class="text-2xl font-bold text-teal-600">100%</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Coverage`}</div>
              </div>
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Setup Router Chain`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});