import { $, component$, useSignal } from "@builder.io/qwik";
import { Badge } from "~/components/Core";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphNode, GraphConnection } from "~/components/Core/Graph";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const VPNServerSection = component$(() => {
  const locale = useMessageLocale();
  const selectedNode = useSignal<string | null>(null);
  const activeConnections = useSignal<Record<string, boolean>>({
    wireguard: true,
    openvpn: true,
    l2tp: true,
    pptp: false,
    sstp: false,
    ikev2: false,
    socks5: false,
    ssh: false,
    httpproxy: false,
    backtohome: false,
    zerotier: false,
  });

  // Graph nodes for VPN server topology
  const nodes: GraphNode[] = [
    createNode("VPNServer", "vpn-server", 250, 200, {
      label: semanticMessages.landing_vpn_server_node({}, { locale }),
    }),
    // Client devices from different locations
    createNode("WirelessUser", "client1", 100, 100, {
      label: semanticMessages.landing_vpn_server_mobile_client(
        {},
        {
          locale,
        },
      ),
    }),
    createNode("EthernetUser", "client2", 400, 100, {
      label: semanticMessages.landing_vpn_server_desktop_client(
        {},
        {
          locale,
        },
      ),
    }),
    createNode("LTEUser", "client3", 100, 300, {
      label: semanticMessages.landing_vpn_server_remote_worker(
        {},
        {
          locale,
        },
      ),
    }),
    createNode("User", "client4", 400, 300, {
      label: semanticMessages.landing_tunnels_branch_office_1({}, { locale }),
    }),
    // External services
    createNode("DomesticService", "internal-srv", 150, 200, {
      label: semanticMessages.landing_vpn_server_internal_services(
        {},
        {
          locale,
        },
      ),
    }),
    createNode("ForeignService", "external-srv", 350, 200, {
      label: semanticMessages.landing_vpn_server_external_access(
        {},
        {
          locale,
        },
      ),
    }),
  ];

  // Graph connections based on protocols
  const connections: GraphConnection[] = [
    // VPN client connections
    {
      from: "client1",
      to: "vpn-server",
      trafficType: "VPN",
      label: semanticMessages.landing_vpn_server_wireguard_tunnel(
        {},
        {
          locale,
        },
      ),
      animated: activeConnections.value.wireguard,
      dashed: true,
      width: 3,
      color: "#6366f1",
    },
    {
      from: "client2",
      to: "vpn-server",
      trafficType: "VPN",
      label: semanticMessages.landing_vpn_server_openvpn_tunnel(
        {},
        {
          locale,
        },
      ),
      animated: activeConnections.value.openvpn,
      dashed: true,
      width: 3,
      color: "#8b5cf6",
    },
    {
      from: "client3",
      to: "vpn-server",
      trafficType: "VPN",
      label: semanticMessages.landing_vpn_server_l2tp({}, { locale }),
      animated: activeConnections.value.l2tp,
      dashed: true,
      width: 2,
      color: "#06b6d4",
    },
    {
      from: "client4",
      to: "vpn-server",
      trafficType: "VPN",
      label: semanticMessages.landing_vpn_server_ikev2_tunnel(
        {},
        {
          locale,
        },
      ),
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
      label: semanticMessages.landing_vpn_server_internal_access(
        {},
        {
          locale,
        },
      ),
      animated: true,
      width: 2,
      color: "#84cc16",
    },
    {
      from: "vpn-server",
      to: "external-srv",
      trafficType: "Foreign",
      label: semanticMessages.landing_vpn_server_external_access(
        {},
        {
          locale,
        },
      ),
      animated: true,
      width: 2,
      color: "#9333ea",
    },
  ];

  // Protocol data
  const protocols = [
    {
      name: "WireGuard",
      active: activeConnections.value.wireguard,
      color: "#6366f1",
    },
    {
      name: "OpenVPN",
      active: activeConnections.value.openvpn,
      color: "#8b5cf6",
    },
    { name: "L2TP", active: activeConnections.value.l2tp, color: "#06b6d4" },
    { name: "PPTP", active: activeConnections.value.pptp, color: "#f59e0b" },
    { name: "SSTP", active: activeConnections.value.sstp, color: "#ef4444" },
    { name: "IKEv2", active: activeConnections.value.ikev2, color: "#10b981" },
    {
      name: "SOCKS5",
      active: activeConnections.value.socks5,
      color: "#3b82f6",
    },
    { name: "SSH", active: activeConnections.value.ssh, color: "#ec4899" },
    {
      name: "HTTP Proxy",
      active: activeConnections.value.httpproxy,
      color: "#14b8a6",
    },
    {
      name: "BackToHome",
      active: activeConnections.value.backtohome,
      color: "#a855f7",
    },
    {
      name: "ZeroTier",
      active: activeConnections.value.zerotier,
      color: "#dc2626",
    },
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
    <section class="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 px-4 py-24 dark:from-slate-900 dark:via-teal-900 dark:to-blue-900">
      {/* Server rack pattern */}
      <div class="absolute inset-0 opacity-10">
        <svg
          class="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="server-rack"
              x="0"
              y="0"
              width="60"
              height="80"
              patternUnits="userSpaceOnUse"
            >
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
        <div class="absolute left-1/4 top-1/3 h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <div class="absolute left-1/4 top-1/3 h-2 w-2 translate-x-4 animate-pulse rounded-full bg-green-500 animation-delay-1000" />
        <div class="absolute left-1/4 top-1/3 h-2 w-2 translate-x-8 animate-pulse rounded-full bg-yellow-500 animation-delay-2000" />
        <div class="absolute right-1/3 top-2/3 h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <div class="absolute right-1/3 top-2/3 h-2 w-2 translate-x-4 animate-pulse rounded-full bg-green-500 animation-delay-3000" />
        <div class="absolute bottom-1/3 left-1/2 h-2 w-2 animate-pulse rounded-full bg-blue-500 animation-delay-4000" />
      </div>

      {/* Network traffic flow lines */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute left-1/3 top-0 h-full w-px animate-slide-down bg-gradient-to-b from-transparent via-teal-500 to-transparent opacity-30" />
        <div class="absolute left-2/3 top-0 h-full w-px animate-slide-down bg-gradient-to-b from-transparent via-cyan-500 to-transparent opacity-30 animation-delay-2000" />
        <div class="absolute left-0 top-1/2 h-px w-full animate-slide-right bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-30" />
      </div>

      {/* Server monitoring graphs */}
      <div class="absolute inset-0 opacity-5">
        <div class="absolute right-20 top-20 h-20 w-32">
          <svg viewBox="0 0 100 50" class="h-full w-full">
            <polyline
              points="0,45 10,40 20,42 30,30 40,35 50,20 60,25 70,15 80,22 90,18 100,20"
              fill="none"
              stroke="#0891b2"
              stroke-width="2"
              class="animate-pulse"
            />
          </svg>
        </div>
        <div class="absolute bottom-32 left-20 h-20 w-32">
          <svg viewBox="0 0 100 50" class="h-full w-full">
            <polyline
              points="0,35 10,30 20,32 30,25 40,28 50,15 60,20 70,12 80,18 90,14 100,16"
              fill="none"
              stroke="#06b6d4"
              stroke-width="2"
              class="animate-pulse animation-delay-2000"
            />
          </svg>
        </div>
      </div>

      {/* Floating server icons */}
      <div class="absolute inset-0">
        <div class="absolute right-1/4 top-1/4 animate-float">
          <svg
            class="h-8 w-8 text-teal-400 opacity-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 2h16a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 6h16m-16 6h16a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4a2 2 0 012-2zm0 6h16" />
            <circle cx="6" cy="5" r="1" />
            <circle cx="6" cy="17" r="1" />
          </svg>
        </div>
        <div class="absolute bottom-1/3 left-1/3 animate-float animation-delay-2000">
          <svg
            class="h-6 w-6 text-cyan-400 opacity-10"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <rect x="3" y="4" width="18" height="5" rx="1" />
            <rect x="3" y="10" width="18" height="5" rx="1" />
            <rect x="3" y="16" width="18" height="5" rx="1" />
            <circle cx="6" cy="6.5" r="0.5" />
            <circle cx="6" cy="12.5" r="0.5" />
            <circle cx="6" cy="18.5" r="0.5" />
          </svg>
        </div>
      </div>

      <div class="relative z-10 mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          {/* Content Side */}
          <div class="animate-fade-in-left space-y-6">
            <Badge color="info" variant="outline" size="lg">
              {semanticMessages.landing_vpn_server_badge({}, { locale })}
            </Badge>

            <h2 class="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span class="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                {semanticMessages.landing_vpn_server_title_line1(
                  {},
                  {
                    locale,
                  },
                )}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {semanticMessages.landing_vpn_server_title_line2(
                  {},
                  {
                    locale,
                  },
                )}
              </span>
            </h2>

            <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {semanticMessages.landing_vpn_server_description(
                {},
                {
                  locale,
                },
              )}
            </p>

            <div class="grid grid-cols-3 gap-3">
              {[
                "WireGuard",
                "OpenVPN",
                "L2TP",
                "PPTP",
                "SSTP",
                "IKEv2",
                "SOCKS5",
                "SSH",
                "HTTP Proxy",
                "BackToHome",
                "ZeroTier",
              ].map((protocol) => (
                <div
                  key={protocol}
                  class="rounded-lg bg-white/50 p-3 text-center dark:bg-black/50"
                >
                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                    {protocol}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Side - Interactive VPN Server Graph */}
          <div class="animate-fade-in-right relative">
            <div class="rounded-2xl bg-white/50 p-4 backdrop-blur-sm dark:bg-black/20">
              {/* Protocol Controls */}
              <div class="mb-4">
                <h3 class="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {semanticMessages.landing_vpn_server_active_protocols(
                    {},
                    {
                      locale,
                    },
                  )}
                </h3>
                <div class="grid grid-cols-3 gap-2">
                  {protocols.map((protocol) => (
                    <button
                      key={protocol.name}
                      onClick$={() =>
                        toggleProtocol(protocol.name.toLowerCase())
                      }
                      class={`flex items-center gap-2 rounded-lg border-2 px-2 py-1.5 text-xs font-medium transition-all ${
                        protocol.active
                          ? "border-opacity-80 text-white"
                          : "border-gray-300 bg-gray-100/50 text-gray-500 dark:bg-gray-800/50"
                      }`}
                      style={{
                        backgroundColor: protocol.active
                          ? `${protocol.color}40`
                          : undefined,
                        borderColor: protocol.color,
                        color: protocol.active ? protocol.color : undefined,
                      }}
                    >
                      <span
                        class={`h-2 w-2 rounded-full ${protocol.active ? "animate-pulse" : ""}`}
                        style={{ backgroundColor: protocol.color }}
                      ></span>
                      {protocol.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Node Info */}
              {selectedNode.value && (
                <div class="mb-3 rounded-lg border border-teal-200 bg-teal-50 p-3 dark:border-teal-700 dark:bg-teal-900/30">
                  <p class="text-sm font-medium text-teal-800 dark:text-teal-200">
                    {semanticMessages.landing_shared_selected({}, { locale })}{" "}
                    {selectedNode.value}
                  </p>
                </div>
              )}

              {/* Graph Component */}
              <Graph
                nodes={nodes}
                connections={connections.filter((conn) => {
                  if (conn.trafficType === "VPN") {
                    if (conn.label?.includes("WireGuard"))
                      return activeConnections.value.wireguard;
                    if (conn.label?.includes("OpenVPN"))
                      return activeConnections.value.openvpn;
                    if (conn.label?.includes("L2TP"))
                      return activeConnections.value.l2tp;
                    if (conn.label?.includes("IKEv2"))
                      return activeConnections.value.ikev2;
                  }
                  return true;
                })}
                title={semanticMessages.landing_vpn_server_graph_title(
                  {},
                  {
                    locale,
                  },
                )}
                config={{
                  width: "100%",
                  height: "420px",
                  viewBox: "0 0 500 420",
                  showLegend: true,
                  legendItems: [
                    {
                      color: "#6366f1",
                      label: semanticMessages.landing_vpn_server_vpn_tunnels(
                        {},
                        {
                          locale,
                        },
                      ),
                    },
                    {
                      color: "#84cc16",
                      label:
                        semanticMessages.landing_vpn_server_internal_access(
                          {},
                          { locale },
                        ),
                    },
                    {
                      color: "#9333ea",
                      label:
                        semanticMessages.landing_vpn_server_external_access(
                          {},
                          { locale },
                        ),
                    },
                  ],
                }}
                onNodeClick$={handleNodeClick}
              />

              {/* Connection Stats */}
              <div class="mt-4 grid grid-cols-3 gap-4">
                <div class="rounded-lg bg-white/60 p-3 text-center dark:bg-black/40">
                  <div class="text-xl font-bold text-teal-600">
                    {protocols.filter((p) => p.active).length}
                  </div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">
                    {semanticMessages.landing_vpn_server_active_protocols(
                      {},
                      {
                        locale,
                      },
                    )}
                  </div>
                </div>
                <div class="rounded-lg bg-white/60 p-3 text-center dark:bg-black/40">
                  <div class="text-xl font-bold text-blue-600">4</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">
                    {semanticMessages.landing_vpn_server_connected_clients(
                      {},
                      {
                        locale,
                      },
                    )}
                  </div>
                </div>
                <div class="rounded-lg bg-white/60 p-3 text-center dark:bg-black/40">
                  <div class="text-xl font-bold text-purple-600">256bit</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">
                    {semanticMessages.landing_vpn_server_encryption(
                      {},
                      {
                        locale,
                      },
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
