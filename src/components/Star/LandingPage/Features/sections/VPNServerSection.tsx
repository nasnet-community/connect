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