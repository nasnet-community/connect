import { $, component$, useSignal } from "@builder.io/qwik";
import { LuArrowRight } from "@qwikest/icons/lucide";
import { Button, Badge } from "~/components/Core";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphNode, GraphConnection } from "~/components/Core/Graph";

export const VPNServerSection = component$(() => {
  const selectedNode = useSignal<string | null>(null);
  const activeConnections = useSignal<Record<string, boolean>>({
    "wireguard": true,
    "openvpn": true,
    "l2tp": true,
    "pptp": false,
    "sstp": false,
    "ikev2": false,
  });

  // Graph nodes for VPN server topology
  const nodes: GraphNode[] = [
    createNode("VPNServer", "vpn-server", 250, 200, {
      label: $localize`VPN Server`
    }),
    // Client devices from different locations
    createNode("WirelessUser", "client1", 100, 100, {
      label: $localize`Mobile Client`
    }),
    createNode("EthernetUser", "client2", 400, 100, {
      label: $localize`Desktop Client`
    }),
    createNode("LTEUser", "client3", 100, 300, {
      label: $localize`Remote Worker`
    }),
    createNode("User", "client4", 400, 300, {
      label: $localize`Branch Office`
    }),
    // External services
    createNode("DomesticService", "internal-srv", 150, 200, {
      label: $localize`Internal Services`
    }),
    createNode("ForeignService", "external-srv", 350, 200, {
      label: $localize`External Access`
    }),
  ];

  // Graph connections based on protocols
  const connections: GraphConnection[] = [
    // VPN client connections
    {
      from: "client1",
      to: "vpn-server",
      trafficType: "VPN",
      label: $localize`WireGuard Tunnel`,
      animated: activeConnections.value.wireguard,
      dashed: true,
      width: 3,
      color: "#6366f1",
    },
    {
      from: "client2",
      to: "vpn-server",
      trafficType: "VPN",
      label: $localize`OpenVPN Tunnel`,
      animated: activeConnections.value.openvpn,
      dashed: true,
      width: 3,
      color: "#8b5cf6",
    },
    {
      from: "client3",
      to: "vpn-server",
      trafficType: "VPN",
      label: $localize`L2TP/IPSec`,
      animated: activeConnections.value.l2tp,
      dashed: true,
      width: 2,
      color: "#06b6d4",
    },
    {
      from: "client4",
      to: "vpn-server",
      trafficType: "VPN",
      label: $localize`IKEv2 Tunnel`,
      animated: activeConnections.value.ikev2,
      dashed: true,
      width: 2,
      color: "#10b981",
    },
    // Server to internal/external services
    {
      from: "vpn-server",
      to: "internal-srv",
      trafficType: "Domestic",
      label: $localize`Internal Access`,
      animated: true,
      width: 2,
      color: "#84cc16",
    },
    {
      from: "vpn-server",
      to: "external-srv",
      trafficType: "Foreign",
      label: $localize`External Access`,
      animated: true,
      width: 2,
      color: "#9333ea",
    },
  ];

  // Protocol data
  const protocols = [
    { name: "WireGuard", active: activeConnections.value.wireguard, color: "#6366f1" },
    { name: "OpenVPN", active: activeConnections.value.openvpn, color: "#8b5cf6" },
    { name: "L2TP", active: activeConnections.value.l2tp, color: "#06b6d4" },
    { name: "PPTP", active: activeConnections.value.pptp, color: "#f59e0b" },
    { name: "SSTP", active: activeConnections.value.sstp, color: "#ef4444" },
    { name: "IKEv2", active: activeConnections.value.ikev2, color: "#10b981" },
  ];

  // Handle node clicks
  const handleNodeClick = $((node: GraphNode) => {
    selectedNode.value = node.label || node.id.toString();
  });

  // Handle protocol toggle
  const toggleProtocol = $((protocolKey: string) => {
    activeConnections.value = {
      ...activeConnections.value,
      [protocolKey]: !activeConnections.value[protocolKey],
    };
  });

  return (
    <section class="relative min-h-[80vh] py-24 px-4 overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 dark:from-slate-900 dark:via-teal-900 dark:to-blue-900">
      {/* Server rack pattern */}
      <div class="absolute inset-0 opacity-10">
        <svg class="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="server-rack" x="0" y="0" width="60" height="80" patternUnits="userSpaceOnUse">
              <rect x="5" y="5" width="50" height="10" fill="#0891b2" rx="1" />
              <rect x="5" y="20" width="50" height="10" fill="#06b6d4" rx="1" />
              <rect x="5" y="35" width="50" height="10" fill="#0891b2" rx="1" />
              <rect x="5" y="50" width="50" height="10" fill="#06b6d4" rx="1" />
              <rect x="5" y="65" width="50" height="10" fill="#0891b2" rx="1" />
              <circle cx="10" cy="10" r="1" fill="#22d3ee" />
              <circle cx="15" cy="10" r="1" fill="#67e8f9" />
              <circle cx="10" cy="25" r="1" fill="#67e8f9" />
              <circle cx="15" cy="25" r="1" fill="#22d3ee" />
              <circle cx="10" cy="40" r="1" fill="#22d3ee" />
              <circle cx="15" cy="40" r="1" fill="#67e8f9" />
              <circle cx="10" cy="55" r="1" fill="#67e8f9" />
              <circle cx="15" cy="55" r="1" fill="#22d3ee" />
              <circle cx="10" cy="70" r="1" fill="#22d3ee" />
              <circle cx="15" cy="70" r="1" fill="#67e8f9" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#server-rack)" />
        </svg>
      </div>

      {/* Data center status lights */}
      <div class="absolute inset-0">
        <div class="absolute top-1/3 left-1/4 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <div class="absolute top-1/3 left-1/4 translate-x-4 w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-1000" />
        <div class="absolute top-1/3 left-1/4 translate-x-8 w-2 h-2 bg-yellow-500 rounded-full animate-pulse animation-delay-2000" />
        <div class="absolute top-2/3 right-1/3 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <div class="absolute top-2/3 right-1/3 translate-x-4 w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-3000" />
        <div class="absolute bottom-1/3 left-1/2 w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-4000" />
      </div>

      {/* Network traffic flow lines */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-0 left-1/3 h-full w-px bg-gradient-to-b from-transparent via-teal-500 to-transparent opacity-30 animate-slide-down" />
        <div class="absolute top-0 left-2/3 h-full w-px bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30 animate-slide-down animation-delay-2000" />
        <div class="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30 animate-slide-right" />
      </div>

      {/* Server monitoring graphs */}
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 right-20 w-32 h-20">
          <svg viewBox="0 0 100 50" class="w-full h-full">
            <polyline points="0,45 10,40 20,42 30,30 40,35 50,20 60,25 70,15 80,22 90,18 100,20"
                      fill="none" stroke="#0891b2" stroke-width="2" class="animate-pulse" />
          </svg>
        </div>
        <div class="absolute bottom-32 left-20 w-32 h-20">
          <svg viewBox="0 0 100 50" class="w-full h-full">
            <polyline points="0,35 10,30 20,32 30,25 40,28 50,15 60,20 70,12 80,18 90,14 100,16"
                      fill="none" stroke="#06b6d4" stroke-width="2" class="animate-pulse animation-delay-2000" />
          </svg>
        </div>
      </div>

      {/* Floating server icons */}
      <div class="absolute inset-0">
        <div class="absolute top-1/4 right-1/4 animate-float">
          <svg class="w-8 h-8 text-teal-400 opacity-10" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 2h16a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 6h16m-16 6h16a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2zm0 6h16" />
            <circle cx="6" cy="5" r="1" />
            <circle cx="6" cy="17" r="1" />
          </svg>
        </div>
        <div class="absolute bottom-1/3 left-1/3 animate-float animation-delay-2000">
          <svg class="w-6 h-6 text-cyan-400 opacity-10" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="4" width="18" height="5" rx="1" />
            <rect x="3" y="10" width="18" height="5" rx="1" />
            <rect x="3" y="16" width="18" height="5" rx="1" />
            <circle cx="6" cy="6.5" r="0.5" />
            <circle cx="6" cy="12.5" r="0.5" />
            <circle cx="6" cy="18.5" r="0.5" />
          </svg>
        </div>
      </div>

      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Side */}
          <div class="space-y-6 animate-fade-in-left">
            <Badge color="info" variant="outline" size="lg">
              {$localize`Remote Access`}
            </Badge>

            <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span class="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                {$localize`VPN Server`}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {$localize`Global Access`}
              </span>
            </h2>

            <p class="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {$localize`Multi-protocol server supporting 6 VPN types. Enable remote access, content freedom through foreign links, and secure connectivity worldwide.`}
            </p>

            <div class="grid grid-cols-3 gap-3">
              {["WireGuard", "OpenVPN", "L2TP", "PPTP", "SSTP", "IKEv2"].map((protocol) => (
                <div key={protocol} class="bg-white/50 dark:bg-black/50 rounded-lg p-3 text-center">
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    {protocol}
                  </span>
                </div>
              ))}
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <Button variant="primary" size="lg" class="group">
                {$localize`Configure VPN Server`}
                <LuArrowRight class="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>

          {/* Visual Side - Interactive VPN Server Graph */}
          <div class="relative animate-fade-in-right">
            <div class="bg-white/50 dark:bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
              {/* Protocol Controls */}
              <div class="mb-4">
                <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  {$localize`Active Protocols`}
                </h3>
                <div class="grid grid-cols-3 gap-2">
                  {protocols.map((protocol) => (
                    <button
                      key={protocol.name}
                      onClick$={() => toggleProtocol(protocol.name.toLowerCase())}
                      class={`flex items-center gap-2 rounded-lg border-2 px-2 py-1.5 text-xs font-medium transition-all ${
                        protocol.active
                          ? "border-opacity-80 text-white"
                          : "bg-gray-100/50 border-gray-300 text-gray-500 dark:bg-gray-800/50"
                      }`}
                      style={{
                        backgroundColor: protocol.active ? `${protocol.color}40` : undefined,
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
                <div class="mb-3 rounded-lg bg-teal-50 dark:bg-teal-900/30 p-3 border border-teal-200 dark:border-teal-700">
                  <p class="text-sm font-medium text-teal-800 dark:text-teal-200">
                    {$localize`Selected:`} {selectedNode.value}
                  </p>
                </div>
              )}

              {/* Graph Component */}
              <Graph
                nodes={nodes}
                connections={connections.filter(conn => {
                  if (conn.trafficType === "VPN") {
                    if (conn.label?.includes("WireGuard")) return activeConnections.value.wireguard;
                    if (conn.label?.includes("OpenVPN")) return activeConnections.value.openvpn;
                    if (conn.label?.includes("L2TP")) return activeConnections.value.l2tp;
                    if (conn.label?.includes("IKEv2")) return activeConnections.value.ikev2;
                  }
                  return true;
                })}
                title={$localize`VPN Server Connections`}
                config={{
                  width: "100%",
                  height: "420px",
                  viewBox: "0 0 500 420",
                  showLegend: true,
                  legendItems: [
                    { color: "#6366f1", label: $localize`VPN Tunnels` },
                    { color: "#84cc16", label: $localize`Internal Access` },
                    { color: "#9333ea", label: $localize`External Access` },
                  ],
                }}
                onNodeClick$={handleNodeClick}
              />

              {/* Connection Stats */}
              <div class="grid grid-cols-3 gap-4 mt-4">
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <div class="text-xl font-bold text-teal-600">{protocols.filter(p => p.active).length}</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Active Protocols`}</div>
                </div>
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <div class="text-xl font-bold text-blue-600">4</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Connected Clients`}</div>
                </div>
                <div class="text-center bg-white/60 dark:bg-black/40 rounded-lg p-3">
                  <div class="text-xl font-bold text-purple-600">256bit</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">{$localize`Encryption`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});