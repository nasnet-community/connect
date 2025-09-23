import { $, component$, useSignal } from "@builder.io/qwik";
import { LuGlobe, LuHome, LuArrowRight, LuActivity } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphNode, GraphConnection } from "~/components/Core/Graph";

export const MultiWANSection = component$(() => {
  const selectedNode = useSignal<string | null>(null);
  const activeTrafficTypes = useSignal<Record<string, boolean>>({
    domestic: true,
    foreign: true,
    backup: true,
  });

  // Graph nodes for network topology
  const nodes: GraphNode[] = [
    createNode("WirelessRouter", "router", 250, 200, { label: $localize`MikroTik Router` }),
    createNode("DomesticWAN", "domestic-isp", 100, 100, { label: $localize`Domestic ISP` }),
    createNode("ForeignWAN", "foreign-isp", 400, 100, { label: $localize`Foreign ISP` }),
    createNode("DomesticWAN", "backup1", 100, 300, { label: $localize`Backup Link 1` }),
    createNode("ForeignWAN", "backup2", 400, 300, { label: $localize`Backup Link 2` }),
  ];

  // Graph connections with traffic types
  const connections: GraphConnection[] = [
    {
      from: "router",
      to: "domestic-isp",
      trafficType: "Domestic",
      label: $localize`Primary Domestic`,
      animated: activeTrafficTypes.value.domestic,
      width: 3,
    },
    {
      from: "router",
      to: "foreign-isp",
      trafficType: "Foreign",
      label: $localize`Primary Foreign`,
      animated: activeTrafficTypes.value.foreign,
      width: 3,
    },
    {
      from: "router",
      to: "backup1",
      trafficType: "Domestic",
      label: $localize`Backup Domestic`,
      animated: activeTrafficTypes.value.backup,
      dashed: true,
      width: 2,
    },
    {
      from: "router",
      to: "backup2",
      trafficType: "Foreign",
      label: $localize`Backup Foreign`,
      animated: activeTrafficTypes.value.backup,
      dashed: true,
      width: 2,
    },
  ];

  // Handle node clicks
  const handleNodeClick = $((node: GraphNode) => {
    selectedNode.value = node.label || node.id.toString();
  });

  // Handle connection clicks
  const handleConnectionClick = $((connection: GraphConnection) => {
    console.log("Connection clicked:", connection);
  });

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Animated Background Pattern */}
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-grid-pattern bg-[size:50px_50px] animate-pulse-slow" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-left">
            <Badge color="primary" variant="outline" size="lg">
              {$localize`Multi-WAN Technology`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {$localize`Multiple WAN`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Link Types`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Domestic + Foreign links with intelligent routing. Experience optimal performance with geographic-based traffic distribution and automatic failover protection.`}
            </p>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <LuGlobe class="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {$localize`Smart Routing`}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Automatically routes traffic through optimal links based on destination`}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <LuActivity class="w-4 h-4 text-cyan-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {$localize`Link Redundancy`}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {$localize`2-8 WAN links support with automatic failover and load balancing`}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <LuHome class="w-4 h-4 text-purple-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {$localize`Geographic Optimization`}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {$localize`Separate domestic and foreign traffic for optimal performance`}
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Configure WAN Links`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual Side - Interactive Graph Network Topology */}
          <div class="relative animate-fade-in-right">
            <div class="bg-white/50 dark:bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              {/* Traffic Type Controls */}
              <div class="mb-4 flex flex-wrap gap-2">
                <button
                  onClick$={() => activeTrafficTypes.value = { ...activeTrafficTypes.value, domestic: !activeTrafficTypes.value.domestic }}
                  class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    activeTrafficTypes.value.domestic
                      ? "bg-green-500/20 border-green-500 text-green-700 dark:text-green-300"
                      : "bg-gray-100/50 border-gray-300 text-gray-500 dark:bg-gray-800/50"
                  }`}
                >
                  <span class={`w-2 h-2 rounded-full ${activeTrafficTypes.value.domestic ? "bg-green-500" : "bg-gray-400"}`}></span>
                  {$localize`Domestic Traffic`}
                </button>
                <button
                  onClick$={() => activeTrafficTypes.value = { ...activeTrafficTypes.value, foreign: !activeTrafficTypes.value.foreign }}
                  class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    activeTrafficTypes.value.foreign
                      ? "bg-purple-500/20 border-purple-500 text-purple-700 dark:text-purple-300"
                      : "bg-gray-100/50 border-gray-300 text-gray-500 dark:bg-gray-800/50"
                  }`}
                >
                  <span class={`w-2 h-2 rounded-full ${activeTrafficTypes.value.foreign ? "bg-purple-500" : "bg-gray-400"}`}></span>
                  {$localize`Foreign Traffic`}
                </button>
                <button
                  onClick$={() => activeTrafficTypes.value = { ...activeTrafficTypes.value, backup: !activeTrafficTypes.value.backup }}
                  class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    activeTrafficTypes.value.backup
                      ? "bg-orange-500/20 border-orange-500 text-orange-700 dark:text-orange-300"
                      : "bg-gray-100/50 border-gray-300 text-gray-500 dark:bg-gray-800/50"
                  }`}
                >
                  <span class={`w-2 h-2 rounded-full ${activeTrafficTypes.value.backup ? "bg-orange-500" : "bg-gray-400"}`}></span>
                  {$localize`Backup Links`}
                </button>
              </div>

              {/* Selected Node Info */}
              {selectedNode.value && (
                <div class="mb-3 rounded-lg bg-blue-50 dark:bg-blue-900/30 p-3 border border-blue-200 dark:border-blue-700">
                  <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {$localize`Selected:`} {selectedNode.value}
                  </p>
                </div>
              )}

              {/* Graph Component */}
              <Graph
                nodes={nodes}
                connections={connections.filter(conn => {
                  if (conn.trafficType === "Domestic" && !activeTrafficTypes.value.domestic) return false;
                  if (conn.trafficType === "Foreign" && !activeTrafficTypes.value.foreign) return false;
                  if (conn.dashed && !activeTrafficTypes.value.backup) return false;
                  return true;
                })}
                title={$localize`Multi-WAN Network Topology`}
                config={{
                  width: "100%",
                  height: "400px",
                  viewBox: "0 0 500 400",
                  showLegend: true,
                  legendItems: [
                    { color: "#84cc16", label: $localize`Domestic Link` },
                    { color: "#9333ea", label: $localize`Foreign Link` },
                    { color: "#f97316", label: $localize`Backup Link` },
                  ],
                }}
                onNodeClick$={handleNodeClick}
                onConnectionClick$={handleConnectionClick}
              />

              {/* Stats */}
              <div class="grid grid-cols-3 gap-4 mt-4">
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">2-8</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`WAN Links`}</div>
                </div>
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Uptime`}</div>
                </div>
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">Zero</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Downtime`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});