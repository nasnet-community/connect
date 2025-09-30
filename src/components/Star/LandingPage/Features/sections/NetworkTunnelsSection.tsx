import { $, component$, useSignal } from "@builder.io/qwik";
import { LuNetwork, LuServer } from "@qwikest/icons/lucide";
import { Badge } from "~/components/Core";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphNode, GraphConnection } from "~/components/Core/Graph";

export const NetworkTunnelsSection = component$(() => {
  const selectedNode = useSignal<string | null>(null);
  const activeTunnels = useSignal<Record<string, boolean>>({
    ipip: true,
    eoip: true,
    gre: true,
    vxlan: false,
  });

  // Graph nodes for network tunnel topology
  const nodes: GraphNode[] = [
    // Main offices/sites
    createNode("DomesticService", "hq", 150, 150, {
      label: $localize`Headquarters`
    }),
    createNode("DomesticService", "branch1", 350, 100, {
      label: $localize`Branch Office 1`
    }),
    createNode("DomesticService", "branch2", 350, 200, {
      label: $localize`Branch Office 2`
    }),
    createNode("DomesticService", "datacenter", 200, 300, {
      label: $localize`Data Center`
    }),
    // Tunnel endpoints
    createNode("WirelessRouter", "router-hq", 100, 150, {
      label: $localize`HQ Router`
    }),
    createNode("WirelessRouter", "router-br1", 400, 100, {
      label: $localize`Branch Router 1`
    }),
    createNode("WirelessRouter", "router-br2", 400, 200, {
      label: $localize`Branch Router 2`
    }),
    createNode("EthernetRouter", "router-dc", 250, 300, {
      label: $localize`DC Router`
    }),
  ];

  // Graph connections representing different tunnel types
  const connections: GraphConnection[] = [
    // Sites to routers (local connections)
    {
      from: "hq",
      to: "router-hq",
      connectionType: "Ethernet",
      animated: false,
      width: 2,
      color: "#64748b",
    },
    {
      from: "branch1",
      to: "router-br1",
      connectionType: "Ethernet",
      animated: false,
      width: 2,
      color: "#64748b",
    },
    {
      from: "branch2",
      to: "router-br2",
      connectionType: "Ethernet",
      animated: false,
      width: 2,
      color: "#64748b",
    },
    {
      from: "datacenter",
      to: "router-dc",
      connectionType: "Ethernet",
      animated: false,
      width: 2,
      color: "#64748b",
    },
    // IPIP tunnels
    {
      from: "router-hq",
      to: "router-br1",
      trafficType: "VPN",
      label: $localize`IPIP Tunnel`,
      animated: activeTunnels.value.ipip,
      dashed: true,
      width: 3,
      color: "#3b82f6",
    },
    // EoIP tunnels
    {
      from: "router-hq",
      to: "router-br2",
      trafficType: "VPN",
      label: $localize`EoIP Tunnel`,
      animated: activeTunnels.value.eoip,
      dashed: true,
      width: 3,
      color: "#10b981",
    },
    // GRE tunnels
    {
      from: "router-hq",
      to: "router-dc",
      trafficType: "VPN",
      label: $localize`GRE Tunnel`,
      animated: activeTunnels.value.gre,
      dashed: true,
      width: 3,
      color: "#f59e0b",
    },
    // VXLAN overlay network
    {
      from: "router-br1",
      to: "router-dc",
      trafficType: "VPN",
      label: $localize`VXLAN Overlay`,
      animated: activeTunnels.value.vxlan,
      dashed: true,
      width: 2,
      color: "#8b5cf6",
    },
    {
      from: "router-br2",
      to: "router-dc",
      trafficType: "VPN",
      label: $localize`VXLAN Overlay`,
      animated: activeTunnels.value.vxlan,
      dashed: true,
      width: 2,
      color: "#8b5cf6",
    },
  ];

  // Tunnel protocol data
  const tunnelProtocols = [
    {
      name: "IPIP",
      key: "ipip",
      color: "#3b82f6",
      description: $localize`IP over IP encapsulation for simple tunneling`,
      active: activeTunnels.value.ipip,
    },
    {
      name: "EoIP",
      key: "eoip",
      color: "#10b981",
      description: $localize`Ethernet over IP for Layer 2 connectivity`,
      active: activeTunnels.value.eoip,
    },
    {
      name: "GRE",
      key: "gre",
      color: "#f59e0b",
      description: $localize`Generic Routing Encapsulation protocol`,
      active: activeTunnels.value.gre,
    },
    {
      name: "VXLAN",
      key: "vxlan",
      color: "#8b5cf6",
      description: $localize`Virtual eXtensible LAN overlay network`,
      active: activeTunnels.value.vxlan,
    },
  ];

  // Handle node clicks
  const handleNodeClick = $((node: GraphNode) => {
    selectedNode.value = node.label || node.id.toString();
  });

  // Handle tunnel protocol toggle
  const toggleTunnel = $((tunnelKey: string) => {
    activeTunnels.value = {
      ...activeTunnels.value,
      [tunnelKey]: !activeTunnels.value[tunnelKey],
    };
  });

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-900 dark:via-gray-900 dark:to-zinc-900">
      {/* Tunnel portal effects with depth */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div class="relative w-96 h-96">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-500 to-zinc-500 rounded-full opacity-5 animate-pulse" />
            <div class="absolute inset-8 bg-gradient-to-r from-slate-400 to-zinc-400 rounded-full opacity-5 animate-pulse animation-delay-1000" />
            <div class="absolute inset-16 bg-gradient-to-r from-slate-300 to-zinc-300 rounded-full opacity-5 animate-pulse animation-delay-2000" />
            <div class="absolute inset-24 bg-gradient-to-r from-slate-200 to-zinc-200 rounded-full opacity-5 animate-pulse animation-delay-3000" />
            <div class="absolute inset-32 bg-gradient-to-r from-slate-100 to-zinc-100 rounded-full opacity-5 animate-pulse animation-delay-4000" />
          </div>
        </div>
      </div>

      {/* 3D tunnel perspective grid */}
      <div class="absolute inset-0 opacity-10">
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="tunnel-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#64748b;stop-opacity:0" />
              <stop offset="50%" style="stop-color:#64748b;stop-opacity:0.5" />
              <stop offset="100%" style="stop-color:#64748b;stop-opacity:0" />
            </linearGradient>
          </defs>
          <line x1="50" y1="0" x2="0" y2="100" stroke="url(#tunnel-gradient)" stroke-width="0.2" />
          <line x1="50" y1="0" x2="100" y2="100" stroke="url(#tunnel-gradient)" stroke-width="0.2" />
          <line x1="50" y1="0" x2="20" y2="100" stroke="url(#tunnel-gradient)" stroke-width="0.2" />
          <line x1="50" y1="0" x2="80" y2="100" stroke="url(#tunnel-gradient)" stroke-width="0.2" />
          <line x1="50" y1="0" x2="40" y2="100" stroke="url(#tunnel-gradient)" stroke-width="0.2" />
          <line x1="50" y1="0" x2="60" y2="100" stroke="url(#tunnel-gradient)" stroke-width="0.2" />
          <circle cx="50" cy="0" r="2" fill="#64748b" opacity="0.3" />
        </svg>
      </div>

      {/* Data streams through tunnel */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full">
          <div class="w-full h-full bg-gradient-to-b from-transparent via-slate-500 to-transparent opacity-30 animate-slide-down" />
        </div>
        <div class="absolute top-0 left-1/3 w-px h-full">
          <div class="w-full h-full bg-gradient-to-b from-transparent via-gray-500 to-transparent opacity-20 animate-slide-down animation-delay-2000" />
        </div>
        <div class="absolute top-0 right-1/3 w-px h-full">
          <div class="w-full h-full bg-gradient-to-b from-transparent via-zinc-500 to-transparent opacity-20 animate-slide-down animation-delay-4000" />
        </div>
      </div>

      {/* Tunnel entry/exit points */}
      <div class="absolute inset-0">
        <div class="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 border-2 border-slate-400 rounded-full opacity-20 animate-pulse" />
        <div class="absolute bottom-10 left-1/4 w-6 h-6 border-2 border-gray-400 rounded-full opacity-15 animate-pulse animation-delay-2000" />
        <div class="absolute bottom-10 right-1/4 w-6 h-6 border-2 border-zinc-400 rounded-full opacity-15 animate-pulse animation-delay-3000" />
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-left">
            <Badge variant="outline" size="lg">
              {$localize`Enterprise Networking`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
                {$localize`Network Tunnels`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Enterprise`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Professional tunneling with IPIP, EoIP, GRE, and VXLAN protocols. Create site-to-site connections with enterprise-grade security.`}
            </p>

            <div class="grid grid-cols-2 gap-3">
              {["IPIP", "EoIP", "GRE", "VXLAN"].map((protocol) => (
                <div key={protocol} class="bg-white/50 dark:bg-black/50 rounded-lg p-4 text-center">
                  <LuNetwork class="w-8 h-8 text-gray-600 mx-auto mb-2" />
                  <span class="font-semibold text-gray-900 dark:text-white">{protocol}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Visual Side - Interactive Network Tunnels Graph */}
          <div class="relative animate-fade-in-right">
            <div class="bg-white/50 dark:bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              {/* Protocol Controls */}
              <div class="mb-4">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {$localize`Tunnel Protocols`}
                </h3>
                <div class="grid grid-cols-2 gap-2">
                  {tunnelProtocols.map((protocol) => (
                    <button
                      key={protocol.key}
                      onClick$={() => toggleTunnel(protocol.key)}
                      class={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                        protocol.active
                          ? "border-opacity-80"
                          : "bg-gray-100/50 border-gray-300 text-gray-500 dark:bg-gray-800/50"
                      }`}
                      style={{
                        backgroundColor: protocol.active ? `${protocol.color}20` : undefined,
                        borderColor: protocol.color,
                        color: protocol.active ? protocol.color : undefined,
                      }}
                    >
                      <span
                        class={`w-2 h-2 rounded-full ${protocol.active ? 'animate-pulse' : ''}`}
                        style={{ backgroundColor: protocol.color }}
                      ></span>
                      {protocol.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Node Info */}
              {selectedNode.value && (
                <div class="mb-3 rounded-lg bg-slate-50 dark:bg-slate-900/30 p-3 border border-slate-200 dark:border-slate-700">
                  <p class="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {$localize`Selected:`} {selectedNode.value}
                  </p>
                </div>
              )}

              {/* Graph Component */}
              <Graph
                nodes={nodes}
                connections={connections.filter(conn => {
                  if (conn.trafficType === "VPN" && conn.label) {
                    if (conn.label.includes("IPIP")) return activeTunnels.value.ipip;
                    if (conn.label.includes("EoIP")) return activeTunnels.value.eoip;
                    if (conn.label.includes("GRE")) return activeTunnels.value.gre;
                    if (conn.label.includes("VXLAN")) return activeTunnels.value.vxlan;
                  }
                  return true;
                })}
                title={$localize`Network Tunnel Infrastructure`}
                config={{
                  width: "100%",
                  height: "420px",
                  viewBox: "0 0 500 420",
                  showLegend: true,
                  legendItems: [
                    { color: "#3b82f6", label: $localize`IPIP Tunnel` },
                    { color: "#10b981", label: $localize`EoIP Tunnel` },
                    { color: "#f59e0b", label: $localize`GRE Tunnel` },
                    { color: "#8b5cf6", label: $localize`VXLAN Overlay` },
                  ],
                }}
                onNodeClick$={handleNodeClick}
              />

              {/* Active Tunnels Summary */}
              <div class="mt-4 p-3 bg-gradient-to-r from-slate-500/10 to-gray-500/10 rounded-lg border border-slate-200 dark:border-slate-700">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="font-semibold text-gray-900 dark:text-white">
                      {$localize`Active Tunnels:`} {Object.values(activeTunnels.value).filter(Boolean).length}/4
                    </div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">
                      {$localize`Enterprise-grade site-to-site connectivity`}
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <LuServer class="w-5 h-5 text-slate-500" />
                    <span class="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {$localize`Multi-Protocol`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Performance Stats */}
              <div class="grid grid-cols-3 gap-3 mt-4">
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <LuNetwork class="w-6 h-6 text-slate-500 mx-auto mb-1" />
                  <div class="text-lg font-bold text-gray-900 dark:text-white">4</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Protocols`}</div>
                </div>
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <LuServer class="w-6 h-6 text-gray-500 mx-auto mb-1" />
                  <div class="text-lg font-bold text-gray-900 dark:text-white">8</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Sites`}</div>
                </div>
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <LuNetwork class="w-6 h-6 text-zinc-500 mx-auto mb-1" />
                  <div class="text-lg font-bold text-gray-900 dark:text-white">5</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Tunnels`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});