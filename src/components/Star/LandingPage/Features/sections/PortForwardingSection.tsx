import { component$, $ } from "@builder.io/qwik";
import { LuPlug, LuShare2, LuServer, LuArrowRight } from "@qwikest/icons/lucide";
import { Button, Badge, Graph, createNode } from "~/components/Core";
import type { GraphConnection, GraphNode } from "~/components/Core/Graph/types";

export const PortForwardingSection = component$(() => {
  // Create nodes for port forwarding graph
  const nodes: GraphNode[] = [
    createNode("ForeignWAN", "internet", 250, 50, { label: $localize`Internet` }),
    createNode("WirelessRouter", "router", 250, 200, { label: $localize`Router NAT` }),
    createNode("DomesticService", "server1", 100, 350, { label: $localize`Web Server :80` }),
    createNode("GameServer", "server2", 200, 350, { label: $localize`Game Server :25565` }),
    createNode("DomesticService", "server3", 300, 350, { label: $localize`FTP Server :21` }),
    createNode("VPNServer", "server4", 400, 350, { label: $localize`VPN Server :1194` }),
  ];

  // Create connections showing port mappings
  const connections: GraphConnection[] = [
    {
      from: "internet",
      to: "router",
      color: "#3b82f6",
      animated: true,
      label: $localize`External Connections`,
      width: 4,
      arrowHead: true,
    },
    {
      from: "router",
      to: "server1",
      color: "#10b981",
      animated: true,
      label: $localize`Port 80 → 80`,
      dashed: false,
      packetColors: ["#3b82f6"],
    },
    {
      from: "router",
      to: "server2",
      color: "#f59e0b",
      animated: true,
      label: $localize`Port 25565 → 25565`,
      dashed: false,
      packetColors: ["#f59e0b"],
    },
    {
      from: "router",
      to: "server3",
      color: "#8b5cf6",
      animated: true,
      label: $localize`Port 21 → 21`,
      dashed: false,
      packetColors: ["#8b5cf6"],
    },
    {
      from: "router",
      to: "server4",
      color: "#ef4444",
      animated: true,
      label: $localize`Port 1194 → 1194`,
      dashed: false,
      packetColors: ["#ef4444"],
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
      { color: "#3b82f6", label: $localize`External Traffic` },
      { color: "#10b981", label: $localize`HTTP/HTTPS` },
      { color: "#f59e0b", label: $localize`Gaming` },
      { color: "#8b5cf6", label: $localize`FTP` },
      { color: "#ef4444", label: $localize`VPN` },
    ],
  };

  const handleNodeClick$ = $((node: GraphNode) => {
    console.log("Clicked on port forwarding node:", node.label);
  });

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-blue-900 dark:to-indigo-900">
      {/* Circuit board pattern */}
      <div class="absolute inset-0 opacity-10">
        <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="#3b82f6" />
              <circle cx="90" cy="10" r="2" fill="#3b82f6" />
              <circle cx="90" cy="90" r="2" fill="#3b82f6" />
              <circle cx="10" cy="90" r="2" fill="#3b82f6" />
              <circle cx="50" cy="50" r="3" fill="#6366f1" />
              <line x1="10" y1="10" x2="50" y2="50" stroke="#3b82f6" stroke-width="0.5" />
              <line x1="90" y1="10" x2="50" y2="50" stroke="#3b82f6" stroke-width="0.5" />
              <line x1="90" y1="90" x2="50" y2="50" stroke="#3b82f6" stroke-width="0.5" />
              <line x1="10" y1="90" x2="50" y2="50" stroke="#3b82f6" stroke-width="0.5" />
              <line x1="10" y1="10" x2="90" y2="10" stroke="#6366f1" stroke-width="0.3" />
              <line x1="90" y1="10" x2="90" y2="90" stroke="#6366f1" stroke-width="0.3" />
              <line x1="90" y1="90" x2="10" y2="90" stroke="#6366f1" stroke-width="0.3" />
              <line x1="10" y1="90" x2="10" y2="10" stroke="#6366f1" stroke-width="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Animated connection paths */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50 animate-pulse" />
        <div class="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-30 animate-pulse animation-delay-2000" />
        <div class="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30 animate-pulse animation-delay-4000" />
      </div>

      {/* Port numbers floating */}
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-1/4 left-1/4 text-blue-600 font-mono text-sm animate-float">:80</div>
        <div class="absolute top-3/4 right-1/3 text-indigo-600 font-mono text-sm animate-float animation-delay-2000">:443</div>
        <div class="absolute bottom-1/4 left-1/2 text-purple-600 font-mono text-sm animate-float animation-delay-3000">:22</div>
        <div class="absolute top-1/2 right-1/4 text-blue-600 font-mono text-sm animate-float animation-delay-4000">:3389</div>
      </div>

      {/* Data packets animation */}
      <div class="absolute inset-0">
        <div class="absolute top-20 left-0 w-4 h-4 bg-blue-500 rounded-full animate-slide-right" />
        <div class="absolute top-40 left-0 w-3 h-3 bg-indigo-500 rounded-full animate-slide-right animation-delay-2000" />
        <div class="absolute bottom-40 left-0 w-4 h-4 bg-purple-500 rounded-full animate-slide-right animation-delay-4000" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-left">
            <Badge color="info" variant="outline" size="lg">
              {$localize`Connectivity`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                {$localize`Port Forwarding`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Features`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Seamless device access with UPNP, NAT-PMP, and manual configuration. Auto discovery, manual rules, and comprehensive port management.`}
            </p>

            <div class="space-y-3">
              {[
                { icon: LuShare2, name: "UPNP", desc: $localize`Automatic port mapping` },
                { icon: LuServer, name: "NAT-PMP", desc: $localize`Apple protocol support` },
                { icon: LuPlug, name: "Manual", desc: $localize`Custom port rules` },
              ].map((feature) => (
                <div key={feature.name} class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <feature.icon class="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-900 dark:text-white">{feature.name}</h4>
                    <p class="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Configure Port Forwarding`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual Side - Interactive Port Forwarding Graph */}
          <div class="relative animate-fade-in-right">
            <div class="bg-white/80 dark:bg-black/40 backdrop-blur-lg rounded-2xl p-4 shadow-2xl">
              <Graph
                nodes={nodes}
                connections={connections}
                title={$localize`Port Forwarding Configuration`}
                config={graphConfig}
                onNodeClick$={handleNodeClick$}
              />
            </div>
            <div class="mt-4 flex justify-center gap-4">
              <div class="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-lg">
                <span class="text-sm font-medium text-blue-700 dark:text-blue-300">{$localize`UPNP Enabled`}</span>
              </div>
              <div class="bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-lg">
                <span class="text-sm font-medium text-indigo-700 dark:text-indigo-300">{$localize`NAT-PMP Active`}</span>
              </div>
              <div class="bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-lg">
                <span class="text-sm font-medium text-purple-700 dark:text-purple-300">{$localize`Manual Rules`}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});