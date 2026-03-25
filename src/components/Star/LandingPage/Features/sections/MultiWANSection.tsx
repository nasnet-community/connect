import { $, component$, useSignal } from "@builder.io/qwik";
import { LuGlobe, LuHome, LuActivity } from "@qwikest/icons/lucide";
import { Badge } from "~/components/Core";
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
    createNode("WirelessRouter", "router", 250, 200, {
      label: $localize`MikroTik Router`,
    }),
    createNode("DomesticWAN", "domestic-isp", 100, 100, {
      label: $localize`Domestic ISP`,
    }),
    createNode("ForeignWAN", "foreign-isp", 400, 100, {
      label: $localize`Foreign ISP`,
    }),
    createNode("DomesticWAN", "backup1", 100, 300, {
      label: $localize`Backup Link 1`,
    }),
    createNode("ForeignWAN", "backup2", 400, 300, {
      label: $localize`Backup Link 2`,
    }),
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
    <section class="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 px-4 py-24 dark:from-slate-900 dark:via-blue-900 dark:to-purple-900">
      {/* Network mesh pattern */}
      <div class="absolute inset-0 opacity-20">
        <svg
          class="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="mesh"
              x="0"
              y="0"
              width="100"
              height="100"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="0" cy="0" r="1" fill="#3b82f6" />
              <circle cx="50" cy="0" r="1" fill="#3b82f6" />
              <circle cx="100" cy="0" r="1" fill="#3b82f6" />
              <circle cx="0" cy="50" r="1" fill="#06b6d4" />
              <circle cx="50" cy="50" r="2" fill="#8b5cf6" />
              <circle cx="100" cy="50" r="1" fill="#06b6d4" />
              <circle cx="0" cy="100" r="1" fill="#3b82f6" />
              <circle cx="50" cy="100" r="1" fill="#3b82f6" />
              <circle cx="100" cy="100" r="1" fill="#3b82f6" />
              <path
                d="M0,0 L50,50 L100,0 M0,100 L50,50 L100,100 M0,0 L0,100 M100,0 L100,100"
                stroke="#3b82f650"
                stroke-width="0.5"
                fill="none"
              />
              <path
                d="M0,50 L50,50 L100,50 M50,0 L50,100"
                stroke="#06b6d450"
                stroke-width="0.3"
                fill="none"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mesh)" />
        </svg>
      </div>

      {/* Animated data flow visualization */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute left-0 top-1/4 h-px w-full">
          <div class="h-full animate-slide-right bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        </div>
        <div class="absolute left-0 top-3/4 h-px w-full">
          <div class="h-full animate-slide-right bg-gradient-to-r from-transparent via-cyan-500 to-transparent animation-delay-2000" />
        </div>
        <div class="absolute left-1/4 top-0 h-full w-px">
          <div class="w-full animate-slide-down bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
        </div>
        <div class="absolute left-3/4 top-0 h-full w-px">
          <div class="w-full animate-slide-down bg-gradient-to-b from-transparent via-blue-500 to-transparent animation-delay-3000" />
        </div>
      </div>

      {/* Connection nodes */}
      <div class="absolute inset-0">
        <div class="absolute left-1/3 top-1/3 h-4 w-4 animate-pulse rounded-full bg-blue-500" />
        <div class="absolute right-1/3 top-2/3 h-4 w-4 animate-pulse rounded-full bg-cyan-500 animation-delay-2000" />
        <div class="absolute bottom-1/3 left-1/2 h-4 w-4 animate-pulse rounded-full bg-purple-500 animation-delay-4000" />
      </div>

      {/* Glowing orbs for depth */}
      <div class="absolute inset-0">
        <div class="absolute left-20 top-40 h-32 w-32 animate-float rounded-full bg-blue-400 opacity-20 blur-3xl filter" />
        <div class="absolute bottom-40 right-20 h-40 w-40 animate-float rounded-full bg-cyan-400 opacity-20 blur-3xl filter animation-delay-2000" />
      </div>

      <div class="relative z-10 mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          {/* Content Side */}
          <div class="animate-fade-in-left space-y-6">
            <Badge color="primary" variant="outline" size="lg">
              {$localize`Multi-WAN Technology`}
            </Badge>

            <h2 class="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span class="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {$localize`Multiple WAN`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Link Types`}
              </span>
            </h2>

            <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {$localize`Domestic + Foreign links with intelligent routing. Experience optimal performance with geographic-based traffic distribution and automatic failover protection.`}
            </p>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/10">
                  <LuGlobe class="h-4 w-4 text-blue-500" />
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
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-500/10">
                  <LuActivity class="h-4 w-4 text-cyan-500" />
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
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10">
                  <LuHome class="h-4 w-4 text-purple-500" />
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
          </div>

          {/* Visual Side - Interactive Graph Network Topology */}
          <div class="animate-fade-in-right relative">
            <div class="rounded-2xl bg-white/50 p-4 backdrop-blur-sm dark:bg-black/20">
              {/* Traffic Type Controls */}
              <div class="mb-4 flex flex-wrap gap-2">
                <button
                  onClick$={() =>
                    (activeTrafficTypes.value = {
                      ...activeTrafficTypes.value,
                      domestic: !activeTrafficTypes.value.domestic,
                    })
                  }
                  class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    activeTrafficTypes.value.domestic
                      ? "border-green-500 bg-green-500/20 text-green-700 dark:text-green-300"
                      : "border-gray-300 bg-gray-100/50 text-gray-500 dark:bg-gray-800/50"
                  }`}
                >
                  <span
                    class={`h-2 w-2 rounded-full ${activeTrafficTypes.value.domestic ? "bg-green-500" : "bg-gray-400"}`}
                  ></span>
                  {$localize`Domestic Traffic`}
                </button>
                <button
                  onClick$={() =>
                    (activeTrafficTypes.value = {
                      ...activeTrafficTypes.value,
                      foreign: !activeTrafficTypes.value.foreign,
                    })
                  }
                  class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    activeTrafficTypes.value.foreign
                      ? "border-purple-500 bg-purple-500/20 text-purple-700 dark:text-purple-300"
                      : "border-gray-300 bg-gray-100/50 text-gray-500 dark:bg-gray-800/50"
                  }`}
                >
                  <span
                    class={`h-2 w-2 rounded-full ${activeTrafficTypes.value.foreign ? "bg-purple-500" : "bg-gray-400"}`}
                  ></span>
                  {$localize`Foreign Traffic`}
                </button>
                <button
                  onClick$={() =>
                    (activeTrafficTypes.value = {
                      ...activeTrafficTypes.value,
                      backup: !activeTrafficTypes.value.backup,
                    })
                  }
                  class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                    activeTrafficTypes.value.backup
                      ? "border-orange-500 bg-orange-500/20 text-orange-700 dark:text-orange-300"
                      : "border-gray-300 bg-gray-100/50 text-gray-500 dark:bg-gray-800/50"
                  }`}
                >
                  <span
                    class={`h-2 w-2 rounded-full ${activeTrafficTypes.value.backup ? "bg-orange-500" : "bg-gray-400"}`}
                  ></span>
                  {$localize`Backup Links`}
                </button>
              </div>

              {/* Selected Node Info */}
              {selectedNode.value && (
                <div class="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-700 dark:bg-blue-900/30">
                  <p class="text-sm font-medium text-blue-800 dark:text-blue-200">
                    {$localize`Selected:`} {selectedNode.value}
                  </p>
                </div>
              )}

              {/* Graph Component */}
              <Graph
                nodes={nodes}
                connections={connections.filter((conn) => {
                  if (
                    conn.trafficType === "Domestic" &&
                    !activeTrafficTypes.value.domestic
                  )
                    return false;
                  if (
                    conn.trafficType === "Foreign" &&
                    !activeTrafficTypes.value.foreign
                  )
                    return false;
                  if (conn.dashed && !activeTrafficTypes.value.backup)
                    return false;
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
              <div class="mt-4 grid grid-cols-3 gap-4">
                <div class="rounded-lg bg-white/60 p-3 text-center dark:bg-black/40">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">
                    2-8
                  </div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`WAN Links`}</div>
                </div>
                <div class="rounded-lg bg-white/60 p-3 text-center dark:bg-black/40">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">
                    99.9%
                  </div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Uptime`}</div>
                </div>
                <div class="rounded-lg bg-white/60 p-3 text-center dark:bg-black/40">
                  <div class="text-2xl font-bold text-gray-900 dark:text-white">
                    Zero
                  </div>
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
