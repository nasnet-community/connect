import { component$, $ } from "@builder.io/qwik";
import { LuCpu, LuZap, LuAward } from "@qwikest/icons/lucide";
import { Badge, Graph, createNode } from "~/components/Core";
import type { GraphConnection, GraphNode } from "~/components/Core/Graph/types";

export const GamingOptimizationSection = component$(() => {
  // Create nodes for gaming optimization graph
  const nodes: GraphNode[] = [
    createNode("GamingConsole", "console", 50, 200, { label: $localize`Gaming Console` }),
    createNode("WirelessRouter", "router", 250, 200, { label: $localize`Router (QoS)` }),
    createNode("GameServer", "gameserver1", 400, 100, { label: $localize`Game Server 1` }),
    createNode("GameServer", "gameserver2", 400, 200, { label: $localize`Game Server 2` }),
    createNode("GameServer", "gameserver3", 400, 300, { label: $localize`Game Server 3` }),
    createNode("User", "pc", 50, 100, { label: $localize`PC` }),
    createNode("WirelessUser", "mobile", 50, 300, { label: $localize`Mobile` }),
  ];

  // Create connections with priority traffic
  const connections: GraphConnection[] = [
    {
      from: "console",
      to: "router",
      trafficType: "Game",
      animated: true,
      label: $localize`Priority Traffic`,
      width: 4,
      packetColors: ["#ef4444", "#f97316", "#eab308"],
      packetSize: [12, 12, 12],
    },
    {
      from: "router",
      to: "gameserver1",
      trafficType: "Game",
      animated: true,
      label: $localize`< 10ms`,
      arrowHead: true,
    },
    {
      from: "router",
      to: "gameserver2",
      trafficType: "Game",
      animated: true,
      label: $localize`< 15ms`,
      arrowHead: true,
    },
    {
      from: "router",
      to: "gameserver3",
      trafficType: "Game",
      animated: true,
      label: $localize`< 20ms`,
      arrowHead: true,
    },
    {
      from: "pc",
      to: "router",
      color: "#94a3b8",
      animated: true,
      dashed: true,
      label: $localize`Normal Priority`,
    },
    {
      from: "mobile",
      to: "router",
      color: "#94a3b8",
      animated: true,
      dashed: true,
      label: $localize`Normal Priority`,
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
      { color: "#ef4444", label: $localize`Gaming Priority` },
      { color: "#94a3b8", label: $localize`Normal Traffic` },
      { color: "#22c55e", label: $localize`Optimized Path` },
    ],
  };

  const handleNodeClick$ = $((node: GraphNode) => {
    console.log("Clicked on gaming node:", node.label);
  });

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-violet-50 dark:from-slate-900 dark:via-pink-900 dark:to-purple-900">
      {/* Animated gradient orbs */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute -top-40 -right-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div class="absolute top-40 left-1/2 w-80 h-80 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Gaming grid pattern */}
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf650_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf650_1px,transparent_1px)] bg-[size:30px_30px]" />
        <div class="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#f97316,transparent)]" />
      </div>

      {/* Floating particles */}
      <div class="absolute inset-0">
        <div class="absolute top-1/4 left-1/4 w-2 h-2 bg-pink-500 rounded-full animate-float" />
        <div class="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-500 rounded-full animate-float animation-delay-2000" />
        <div class="absolute bottom-1/4 left-1/2 w-2 h-2 bg-violet-500 rounded-full animate-float animation-delay-4000" />
        <div class="absolute top-1/2 right-1/3 w-4 h-4 bg-orange-500 rounded-full animate-float animation-delay-3000" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Visual Side - Interactive Gaming Graph */}
          <div class="relative animate-fade-in-left order-2 lg:order-1">
            <div class="bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-4 shadow-2xl">
              <Graph
                nodes={nodes}
                connections={connections}
                title={$localize`Gaming Traffic Prioritization`}
                config={graphConfig}
                onNodeClick$={handleNodeClick$}
              />
            </div>
            <div class="mt-4 flex justify-center gap-6">
              <div class="flex items-center gap-2">
                <LuCpu class="w-5 h-5 text-pink-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{$localize`QoS Enabled`}</span>
              </div>
              <div class="flex items-center gap-2">
                <LuZap class="w-5 h-5 text-purple-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{$localize`Low Latency`}</span>
              </div>
              <div class="flex items-center gap-2">
                <LuAward class="w-5 h-5 text-violet-500" />
                <span class="text-sm text-gray-700 dark:text-gray-300">{$localize`Priority Routing`}</span>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-right order-1 lg:order-2">
            <Badge color="secondary" variant="outline" size="lg">
              {$localize`Gaming Performance`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {$localize`Gaming`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Optimization`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Zero-lag gaming with comprehensive game database. Automatic port forwarding, traffic prioritization, and ping optimization for competitive gaming.`}
            </p>

            <div class="grid grid-cols-3 gap-4">
              <div class="text-center">
                <div class="text-3xl font-bold text-pink-600">3MB+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{$localize`Game DB`}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-purple-600">1000+</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{$localize`Games`}</div>
              </div>
              <div class="text-center">
                <div class="text-3xl font-bold text-violet-600">&lt;10ms</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{$localize`Latency`}</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
});