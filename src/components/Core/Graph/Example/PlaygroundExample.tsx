import { component$, useSignal, useStore } from "@builder.io/qwik";
import { NetworkGraphExample } from "./Example";
import type { GraphNode, GraphConnection } from "../types";
import { createNode } from "../Node/NodeTypes";

export const GraphPlayground = component$(() => {
  // Node configuration
  const nodeConfig = useStore({
    client: { visible: true, x: 50, y: 100, label: "Client" },
    router: { visible: true, x: 180, y: 100, label: "Router" },
    internet: { visible: true, x: 310, y: 100, label: "Internet" },
  });

  // Connection configuration
  const connectionConfig = useStore({
    clientToRouter: {
      visible: true,
      animated: true,
      color: "#f59e0b",
      label: "",
    },
    routerToInternet: {
      visible: true,
      animated: true,
      color: "#84cc16",
      label: "Internet Connection",
    },
  });

  // Animation speed
  const animationSpeed = useSignal(1);

  // Generate nodes based on configuration
  const nodes: GraphNode[] = [];

  if (nodeConfig.client.visible) {
    nodes.push(
      createNode("User", "user1", nodeConfig.client.x, nodeConfig.client.y, {
        label: nodeConfig.client.label,
      }),
    );
  }

  if (nodeConfig.router.visible) {
    nodes.push(
      createNode(
        "WirelessRouter",
        "router",
        nodeConfig.router.x,
        nodeConfig.router.y,
        { label: nodeConfig.router.label },
      ),
    );
  }

  if (nodeConfig.internet.visible) {
    nodes.push(
      createNode(
        "DomesticWAN",
        "wan",
        nodeConfig.internet.x,
        nodeConfig.internet.y,
        { label: nodeConfig.internet.label },
      ),
    );
  }

  // Generate connections based on configuration
  const connections: GraphConnection[] = [];

  if (
    connectionConfig.clientToRouter.visible &&
    nodeConfig.client.visible &&
    nodeConfig.router.visible
  ) {
    connections.push({
      from: "user1",
      to: "router",
      color: connectionConfig.clientToRouter.color,
      animated: connectionConfig.clientToRouter.animated,
      label: connectionConfig.clientToRouter.label || undefined,
    });
  }

  if (
    connectionConfig.routerToInternet.visible &&
    nodeConfig.router.visible &&
    nodeConfig.internet.visible
  ) {
    connections.push({
      from: "router",
      to: "wan",
      color: connectionConfig.routerToInternet.color,
      animated: connectionConfig.routerToInternet.animated,
      label: connectionConfig.routerToInternet.label || undefined,
    });
  }

  return (
    <div>
      <div class="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Customize Graph
        </h3>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Nodes Configuration */}
          <div>
            <h4 class="mb-2 font-medium text-gray-900 dark:text-white">
              Nodes
            </h4>

            <div class="space-y-4">
              <div class="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <label class="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={nodeConfig.client.visible}
                    onChange$={(e: any) =>
                      (nodeConfig.client.visible = e.target.checked)
                    }
                    class="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client Node
                  </span>
                </label>
                <div class="space-y-2 pl-6">
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400">
                      Label
                    </label>
                    <input
                      type="text"
                      value={nodeConfig.client.label}
                      onInput$={(e: any) =>
                        (nodeConfig.client.label = e.target.value)
                      }
                      class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div class="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <label class="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={nodeConfig.router.visible}
                    onChange$={(e: any) =>
                      (nodeConfig.router.visible = e.target.checked)
                    }
                    class="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Router Node
                  </span>
                </label>
                <div class="space-y-2 pl-6">
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400">
                      Label
                    </label>
                    <input
                      type="text"
                      value={nodeConfig.router.label}
                      onInput$={(e: any) =>
                        (nodeConfig.router.label = e.target.value)
                      }
                      class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              <div class="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <label class="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={nodeConfig.internet.visible}
                    onChange$={(e: any) =>
                      (nodeConfig.internet.visible = e.target.checked)
                    }
                    class="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Internet Node
                  </span>
                </label>
                <div class="space-y-2 pl-6">
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400">
                      Label
                    </label>
                    <input
                      type="text"
                      value={nodeConfig.internet.label}
                      onInput$={(e: any) =>
                        (nodeConfig.internet.label = e.target.value)
                      }
                      class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Connections Configuration */}
          <div>
            <h4 class="mb-2 font-medium text-gray-900 dark:text-white">
              Connections
            </h4>

            <div class="space-y-4">
              <div class="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <label class="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={connectionConfig.clientToRouter.visible}
                    onChange$={(e: any) =>
                      (connectionConfig.clientToRouter.visible =
                        e.target.checked)
                    }
                    class="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Client to Router
                  </span>
                </label>
                <div class="space-y-2 pl-6">
                  <div>
                    <label class="flex items-center">
                      <input
                        type="checkbox"
                        checked={connectionConfig.clientToRouter.animated}
                        onChange$={(e: any) =>
                          (connectionConfig.clientToRouter.animated =
                            e.target.checked)
                        }
                        class="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600"
                      />
                      <span class="text-xs text-gray-600 dark:text-gray-400">
                        Animated
                      </span>
                    </label>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400">
                      Label
                    </label>
                    <input
                      type="text"
                      value={connectionConfig.clientToRouter.label}
                      onInput$={(e: any) =>
                        (connectionConfig.clientToRouter.label = e.target.value)
                      }
                      class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400">
                      Color
                    </label>
                    <input
                      type="color"
                      value={connectionConfig.clientToRouter.color}
                      onChange$={(e: any) =>
                        (connectionConfig.clientToRouter.color = e.target.value)
                      }
                      class="mt-1 block border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>

              <div class="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <label class="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    checked={connectionConfig.routerToInternet.visible}
                    onChange$={(e: any) =>
                      (connectionConfig.routerToInternet.visible =
                        e.target.checked)
                    }
                    class="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Router to Internet
                  </span>
                </label>
                <div class="space-y-2 pl-6">
                  <div>
                    <label class="flex items-center">
                      <input
                        type="checkbox"
                        checked={connectionConfig.routerToInternet.animated}
                        onChange$={(e: any) =>
                          (connectionConfig.routerToInternet.animated =
                            e.target.checked)
                        }
                        class="mr-2 h-4 w-4 rounded border-gray-300 text-primary-600"
                      />
                      <span class="text-xs text-gray-600 dark:text-gray-400">
                        Animated
                      </span>
                    </label>
                  </div>
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400">
                      Label
                    </label>
                    <input
                      type="text"
                      value={connectionConfig.routerToInternet.label}
                      onInput$={(e: any) =>
                        (connectionConfig.routerToInternet.label =
                          e.target.value)
                      }
                      class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label class="block text-xs text-gray-600 dark:text-gray-400">
                      Color
                    </label>
                    <input
                      type="color"
                      value={connectionConfig.routerToInternet.color}
                      onChange$={(e: any) =>
                        (connectionConfig.routerToInternet.color =
                          e.target.value)
                      }
                      class="mt-1 block border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                    />
                  </div>
                </div>
              </div>

              <div class="rounded-md border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900">
                <label class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Animation Speed
                </label>
                <input
                  type="range"
                  min="0.2"
                  max="3"
                  step="0.1"
                  value={animationSpeed.value}
                  onChange$={(e: any) =>
                    (animationSpeed.value = parseFloat(e.target.value))
                  }
                  class="mt-1 w-full"
                />
                <div class="mt-1 text-center text-xs text-gray-500 dark:text-gray-400">
                  {animationSpeed.value.toFixed(1)}x
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The graph itself */}
      <div class="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
        <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Preview
        </h3>
        <div class="flex justify-center">
          <NetworkGraphExample
            customNodes={nodes}
            customConnections={connections}
          />
        </div>
      </div>
    </div>
  );
});
