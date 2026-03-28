import { $, component$, useSignal } from "@builder.io/qwik";
import { LuRouter, LuWifi, LuNetwork } from "@qwikest/icons/lucide";
import { Badge } from "~/components/Core";
import { Graph, createNode } from "~/components/Core/Graph";
import type { GraphNode, GraphConnection } from "~/components/Core/Graph";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const RouterChainingSection = component$(() => {
  const locale = useMessageLocale();
  const activeRouter = useSignal<number>(0);
  const selectedNode = useSignal<string | null>(null);
  const showCoverage = useSignal(true);

  const routers = [
    {
      id: "master",
      name: semanticMessages.landing_router_chain_master({}, { locale }),
      type: "primary",
      signal: 100,
    },
    {
      id: "slave1",
      name: semanticMessages.landing_router_chain_slave_1({}, { locale }),
      type: "secondary",
      signal: 90,
    },
    {
      id: "slave2",
      name: semanticMessages.landing_router_chain_slave_2({}, { locale }),
      type: "secondary",
      signal: 85,
    },
    {
      id: "slave3",
      name: semanticMessages.landing_router_chain_slave_3({}, { locale }),
      type: "secondary",
      signal: 80,
    },
  ];

  // Graph nodes for router chain topology
  const nodes: GraphNode[] = [
    createNode("WirelessRouter", "master", 250, 200, {
      label: semanticMessages.landing_router_chain_master({}, { locale }),
    }),
    createNode("AP", "slave1", 100, 100, {
      label: semanticMessages.landing_router_chain_slave_1({}, { locale }),
    }),
    createNode("AP", "slave2", 400, 100, {
      label: semanticMessages.landing_router_chain_slave_2({}, { locale }),
    }),
    createNode("AP", "slave3", 250, 350, {
      label: semanticMessages.landing_router_chain_slave_3({}, { locale }),
    }),
    // Client devices
    createNode("WirelessUser", "client1", 50, 200, {
      label: semanticMessages.landing_router_chain_mobile_device(
        {},
        {
          locale,
        },
      ),
    }),
    createNode("EthernetUser", "client2", 450, 200, {
      label: semanticMessages.landing_vpn_server_desktop_client(
        {},
        {
          locale,
        },
      ),
    }),
    createNode("GamingConsole", "client3", 150, 300, {
      label: semanticMessages.landing_gaming_console({}, { locale }),
    }),
  ];

  // Graph connections
  const connections: GraphConnection[] = [
    // Master to slaves - wireless mesh
    {
      from: "master",
      to: "slave1",
      connectionType: "Wireless",
      label: semanticMessages.landing_router_chain_mesh_link({}, { locale }),
      animated: true,
      width: 3,
      color: "#10b981",
    },
    {
      from: "master",
      to: "slave2",
      connectionType: "Wireless",
      label: semanticMessages.landing_router_chain_mesh_link({}, { locale }),
      animated: true,
      width: 3,
      color: "#10b981",
    },
    {
      from: "master",
      to: "slave3",
      connectionType: "Wireless",
      label: semanticMessages.landing_router_chain_mesh_link({}, { locale }),
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
    const routerIndex = routers.findIndex((r) => r.id === node.id);
    if (routerIndex !== -1) {
      activeRouter.value = routerIndex;
    }
  });

  // Handle connection clicks
  const handleConnectionClick = $((connection: GraphConnection) => {
    console.log("Connection clicked:", connection);
  });

  return (
    <section class="relative min-h-[80vh] overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 px-4 py-24 dark:from-slate-900 dark:via-green-900 dark:to-emerald-900">
      {/* Chain-link pattern */}
      <div class="absolute inset-0 opacity-10">
        <svg
          class="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="chain"
              x="0"
              y="0"
              width="80"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <ellipse
                cx="20"
                cy="20"
                rx="18"
                ry="10"
                fill="none"
                stroke="#10b981"
                stroke-width="1.5"
              />
              <ellipse
                cx="60"
                cy="20"
                rx="18"
                ry="10"
                fill="none"
                stroke="#34d399"
                stroke-width="1.5"
              />
              <ellipse
                cx="40"
                cy="20"
                rx="18"
                ry="10"
                fill="none"
                stroke="#059669"
                stroke-width="1.5"
                transform="rotate(90 40 20)"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#chain)" />
        </svg>
      </div>

      {/* Interconnected nodes animation */}
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute left-1/4 top-1/4 h-3 w-3 rounded-full bg-green-500">
          <div class="absolute inset-0 animate-ping rounded-full bg-green-500" />
        </div>
        <div class="absolute right-1/4 top-1/4 h-3 w-3 rounded-full bg-emerald-500">
          <div class="absolute inset-0 animate-ping rounded-full bg-emerald-500 animation-delay-1000" />
        </div>
        <div class="absolute bottom-1/4 left-1/2 h-3 w-3 rounded-full bg-blue-500">
          <div class="absolute inset-0 animate-ping rounded-full bg-blue-500 animation-delay-2000" />
        </div>
      </div>

      {/* Connection lines between nodes */}
      <div class="absolute inset-0">
        <svg
          class="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <line
            x1="25"
            y1="25"
            x2="75"
            y2="25"
            stroke="#10b981"
            stroke-width="0.2"
            opacity="0.3"
            class="animate-pulse"
          />
          <line
            x1="75"
            y1="25"
            x2="50"
            y2="75"
            stroke="#34d399"
            stroke-width="0.2"
            opacity="0.3"
            class="animate-pulse animation-delay-1000"
          />
          <line
            x1="50"
            y1="75"
            x2="25"
            y2="25"
            stroke="#059669"
            stroke-width="0.2"
            opacity="0.3"
            class="animate-pulse animation-delay-2000"
          />
        </svg>
      </div>

      {/* Signal strength indicators */}
      <div class="absolute inset-0">
        <div class="absolute left-1/3 top-20">
          <svg
            class="h-8 w-8 animate-float text-green-400 opacity-20"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M8.5 16.5l3-3m0 0l3-3m-3 3l-3-3m3 3l3 3"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
            <path
              d="M2 12c0-3.5 2.5-6.5 6-7.5M22 12c0-3.5-2.5-6.5-6-7.5M2 12c0 3.5 2.5 6.5 6 7.5M22 12c0 3.5-2.5 6.5-6 7.5"
              stroke="currentColor"
              stroke-width="1"
              opacity="0.5"
            />
          </svg>
        </div>
        <div class="absolute bottom-32 right-1/4">
          <svg
            class="h-6 w-6 animate-float text-emerald-400 opacity-20 animation-delay-2000"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle cx="12" cy="12" r="1" fill="currentColor" />
            <path
              d="M12 2v6m0 4v6m0 4v-2m10-8h-6m-4 0H6m16 0h-2"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Mesh network overlay */}
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0"
          style="background-image: radial-gradient(circle at 1px 1px, #10b981 1px, transparent 1px); background-size: 30px 30px;"
        />
      </div>

      <div class="relative z-10 mx-auto max-w-7xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          {/* Visual Side - Interactive Graph Router Chain Visualization */}
          <div class="animate-fade-in-left relative order-2 lg:order-1">
            <div class="rounded-2xl bg-white/50 p-4 backdrop-blur-sm dark:bg-black/20">
              {/* Controls */}
              <div class="mb-4 flex items-center justify-between">
                <div class="flex gap-2">
                  <button
                    onClick$={() => (showCoverage.value = !showCoverage.value)}
                    class={`flex items-center gap-2 rounded-lg border-2 px-3 py-1.5 text-sm font-medium transition-all ${
                      showCoverage.value
                        ? "border-green-500 bg-green-500/20 text-green-700 dark:text-green-300"
                        : "border-gray-300 bg-gray-100/50 text-gray-500 dark:bg-gray-800/50"
                    }`}
                  >
                    <LuWifi class="h-4 w-4" />
                    {semanticMessages.landing_router_chain_show_coverage(
                      {},
                      {
                        locale,
                      },
                    )}
                  </button>
                </div>
                <div class="flex items-center gap-2">
                  <LuWifi class="h-4 w-4 animate-pulse text-green-500" />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {semanticMessages.landing_router_chain_active_mesh(
                      {},
                      {
                        locale,
                      },
                    )}
                  </span>
                </div>
              </div>

              {/* Graph Component */}
              <Graph
                nodes={nodes}
                connections={connections}
                title={semanticMessages.landing_router_chain_graph_title(
                  {},
                  {
                    locale,
                  },
                )}
                config={{
                  width: "100%",
                  height: "450px",
                  viewBox: "0 0 500 450",
                  showLegend: true,
                  legendItems: [
                    {
                      color: "#10b981",
                      label:
                        semanticMessages.landing_router_chain_master_slave_link(
                          {},
                          { locale },
                        ),
                    },
                    {
                      color: "#34d399",
                      label:
                        semanticMessages.landing_router_chain_mesh_interconnect(
                          {},
                          { locale },
                        ),
                    },
                    {
                      color: "#60a5fa",
                      label:
                        semanticMessages.landing_router_chain_client_connection(
                          {},
                          { locale },
                        ),
                    },
                    {
                      color: "#ef4444",
                      label:
                        semanticMessages.landing_router_chain_gaming_traffic(
                          {},
                          { locale },
                        ),
                    },
                  ],
                }}
                onNodeClick$={handleNodeClick}
                onConnectionClick$={handleConnectionClick}
              />

              {/* Coverage Info */}
              <div class="mt-4 rounded-xl bg-gradient-to-t from-white/90 to-transparent p-4 dark:from-black/90">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {semanticMessages.landing_router_chain_active_router(
                        {},
                        {
                          locale,
                        },
                      )}
                    </div>
                    <div class="text-lg font-bold text-gray-900 dark:text-white">
                      {selectedNode.value || routers[activeRouter.value].name}
                    </div>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {semanticMessages.landing_router_chain_signal_strength(
                        {},
                        {
                          locale,
                        },
                      )}
                    </div>
                    <div class="text-lg font-bold text-green-500">
                      {routers[activeRouter.value].signal}%
                    </div>
                  </div>
                  <div>
                    <div class="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {semanticMessages.landing_router_chain_connected_devices(
                        {},
                        {
                          locale,
                        },
                      )}
                    </div>
                    <div class="text-lg font-bold text-blue-500">3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div class="animate-fade-in-right order-1 space-y-6 lg:order-2">
            <Badge color="success" variant="outline" size="lg">
              {semanticMessages.landing_router_chain_badge({}, { locale })}
            </Badge>

            <h2 class="text-4xl font-bold md:text-5xl lg:text-6xl">
              <span class="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                {semanticMessages.landing_router_chain_title_line1(
                  {},
                  {
                    locale,
                  },
                )}
              </span>
              <br />
              <span class="text-gray-900 dark:text-white">
                {semanticMessages.landing_router_chain_title_line2(
                  {},
                  {
                    locale,
                  },
                )}
              </span>
            </h2>

            <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {semanticMessages.landing_router_chain_description(
                {},
                {
                  locale,
                },
              )}
            </p>

            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                  <LuWifi class="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {semanticMessages.landing_router_chain_extended_range(
                      {},
                      {
                        locale,
                      },
                    )}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {semanticMessages.landing_router_chain_extended_range_desc(
                      {},
                      {
                        locale,
                      },
                    )}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                  <LuNetwork class="h-4 w-4 text-emerald-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {semanticMessages.landing_router_chain_roaming(
                      {},
                      {
                        locale,
                      },
                    )}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {semanticMessages.landing_router_chain_roaming_desc(
                      {},
                      {
                        locale,
                      },
                    )}
                  </p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-teal-500/10">
                  <LuRouter class="h-4 w-4 text-teal-500" />
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900 dark:text-white">
                    {semanticMessages.landing_router_chain_unified_control(
                      {},
                      {
                        locale,
                      },
                    )}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {semanticMessages.landing_router_chain_unified_control_desc(
                      {},
                      {
                        locale,
                      },
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div class="grid grid-cols-3 gap-4 pt-4">
              <div class="rounded-xl bg-white/50 p-3 text-center dark:bg-black/50">
                <div class="text-2xl font-bold text-green-600">17+</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">
                  {semanticMessages.landing_router_chain_stat_models(
                    {},
                    {
                      locale,
                    },
                  )}
                </div>
              </div>
              <div class="rounded-xl bg-white/50 p-3 text-center dark:bg-black/50">
                <div class="text-2xl font-bold text-emerald-600">∞</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">
                  {semanticMessages.landing_router_chain_stat_expansion(
                    {},
                    {
                      locale,
                    },
                  )}
                </div>
              </div>
              <div class="rounded-xl bg-white/50 p-3 text-center dark:bg-black/50">
                <div class="text-2xl font-bold text-teal-600">100%</div>
                <div class="text-xs text-gray-600 dark:text-gray-400">
                  {semanticMessages.landing_router_chain_stat_coverage(
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
    </section>
  );
});
