import { $, component$, useSignal } from "@builder.io/qwik";
import { Graph } from "../Graph";
import { createNode } from "../Node/NodeTypes";
import type { GraphConnection, ConnectionType } from "../types";
import {
  connectionColors,
  connectionStyles,
} from "../Connection/ConnectionUtils";

/**
 * Example showcasing the different physical connection types available in the Graph component
 */
export const ConnectionTypeExample = component$(() => {
  // Track the selected connection type for details view
  const selectedConnectionType = useSignal<ConnectionType>("Ethernet");
  const showDetailedView = useSignal(true);

  // Create nodes for the network
  const nodes = [
    createNode("User", "user", 200, 300, { label: "User" }),
    createNode("WirelessRouter", "router", 500, 300, { label: "Router" }),
    createNode("EthernetRouter", "isp", 800, 300, { label: "ISP" }),
    createNode("ForeignWAN", "internet", 1100, 300, { label: "Internet" }),
    createNode("DomesticService", "service1", 500, 100, { label: "IoT Hub" }),
    createNode("EthernetUser", "user2", 800, 100, { label: "Desktop" }),
    createNode("LTEUser", "mobile", 800, 500, { label: "Mobile" }),
    createNode("ForeignService", "cloud", 1100, 100, { label: "Cloud" }),
  ];

  // Helper function to create connections with connection types
  const createConnection = (
    from: string | number,
    to: string | number,
    connectionType: ConnectionType,
    label?: string,
  ): GraphConnection => {
    return {
      from,
      to,
      connectionType,
      label: label || `${connectionType} Connection`,
      animated: true,
    };
  };

  // Create connections with different connection types
  const connections: GraphConnection[] = [
    // Ethernet connections
    createConnection("user", "router", "Ethernet", "Ethernet"),
    createConnection("router", "isp", "Ethernet", "Ethernet Backhaul"),
    createConnection("router", "user2", "Ethernet", "LAN"),

    // Fiber connection
    createConnection("isp", "internet", "Fiber", "Fiber"),

    // Wireless connections
    createConnection("router", "service1", "Wireless", "WiFi"),

    // LTE connection
    createConnection("mobile", "isp", "LTE", "LTE"),

    // DSL connection
    createConnection("user2", "cloud", "DSL", "DSL"),

    // Satellite connection
    createConnection("internet", "cloud", "Satellite", "Satellite"),
  ];

  // Handle selecting a connection type
  const selectConnectionType = $((type: ConnectionType) => {
    selectedConnectionType.value = type;
    showDetailedView.value = true;
  });

  // Get style properties for the selected connection type
  const getSelectedStyleProps = () => {
    if (!selectedConnectionType.value) return { dashed: "Solid", width: "2px" };

    const style = connectionStyles[selectedConnectionType.value] || {
      dashed: false,
      width: 2,
    };
    return {
      dashed: style.dashed ? "Dashed" : "Solid",
      width: `${style.width}px`,
    };
  };

  // Get color for a connection type safely
  const getConnectionColor = (type: string): string => {
    // Check if the type is a valid ConnectionType
    const validType = Object.keys(connectionColors).includes(type)
      ? (type as ConnectionType)
      : undefined;

    return validType ? connectionColors[validType] : "#64748b";
  };

  // Get style for a connection type safely
  const getConnectionStyle = (type: string) => {
    // Check if the type is a valid ConnectionType
    const validType = Object.keys(connectionStyles).includes(type)
      ? (type as ConnectionType)
      : undefined;

    return validType
      ? connectionStyles[validType]
      : { dashed: false, width: 2 };
  };

  // Configuration for the graph
  const graphConfig = {
    width: "100%",
    height: "450px",
    viewBox: "0 0 1400 600",
    showLegend: true,
    legendItems: Object.entries(connectionColors).map(([type, color]) => ({
      color,
      label: type,
    })),
  };

  // List of all connection types with descriptions
  const connectionTypeDetails = [
    {
      type: "Ethernet",
      description: "Wired connections over standard Ethernet cables",
      speed: "10Mbps - 10Gbps",
      pros: "Reliable, low latency, high bandwidth",
      cons: "Requires physical cables, limited mobility",
    },
    {
      type: "Wireless",
      description: "Wi-Fi connections using radio waves",
      speed: "54Mbps - 1Gbps+",
      pros: "No cables required, high mobility",
      cons: "More interference, lower reliability than wired",
    },
    {
      type: "LTE",
      description: "Cellular mobile network connections",
      speed: "5Mbps - 100Mbps",
      pros: "Wide coverage, mobility",
      cons: "Variable speeds, data caps",
    },
    {
      type: "Satellite",
      description: "Connections via satellite communications",
      speed: "5Mbps - 100Mbps",
      pros: "Available in remote areas",
      cons: "High latency, weather dependent",
    },
    {
      type: "DSL",
      description: "Digital Subscriber Line over telephone lines",
      speed: "1Mbps - 100Mbps",
      pros: "Widely available, dedicated line",
      cons: "Speed drops with distance from exchange",
    },
    {
      type: "Fiber",
      description: "Fiber optic connections using light signals",
      speed: "100Mbps - 10Gbps+",
      pros: "Very high speed, low latency",
      cons: "Limited availability, higher cost",
    },
  ];

  // Helper to get connection details safely
  const getConnectionDetails = (connType: string) => {
    return (
      connectionTypeDetails.find((c) => c.type === connType) || {
        type: connType,
        description: "Connection type",
        speed: "Unknown",
        pros: "Not specified",
        cons: "Not specified",
      }
    );
  };

  return (
    <div class="rounded-lg bg-white p-6 dark:bg-slate-800">
      <h2 class="mb-2 text-xl font-semibold text-slate-800 dark:text-white">
        Connection Types Explorer
      </h2>
      <p class="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Visualize the different physical connection types available for network
        graphs
      </p>

      {/* Connection Type Selector */}
      <div class="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {connectionTypeDetails.map(({ type }) => {
          const color = getConnectionColor(type);
          const style = getConnectionStyle(type);

          return (
            <button
              key={type}
              onClick$={() => selectConnectionType(type as ConnectionType)}
              class={{
                "rounded-md border p-3 text-center transition-all": true,
                "shadow-md": selectedConnectionType.value === type,
                "opacity-70": selectedConnectionType.value !== type,
              }}
              style={{
                borderColor: color,
                backgroundColor:
                  selectedConnectionType.value === type
                    ? `${color}15`
                    : "transparent",
              }}
            >
              <div class="flex justify-center">
                <div
                  class="inline-block h-1 w-10"
                  style={{
                    backgroundColor: color,
                    borderStyle: style.dashed ? "dashed" : "solid",
                    height: `${style.width || 2}px`,
                  }}
                ></div>
              </div>
              <span class="text-sm font-medium">{type}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Connection Type Details */}
      {showDetailedView.value && selectedConnectionType.value && (
        <div
          class="mb-6 rounded-lg border p-4"
          style={{
            borderColor: getConnectionColor(selectedConnectionType.value),
          }}
        >
          <div class="mb-3 flex flex-wrap items-center gap-4">
            <h3 class="text-lg font-semibold">
              {selectedConnectionType.value} Connection
            </h3>
            <div class="flex items-center gap-2">
              <div
                class="inline-block h-1 w-8 rounded-full"
                style={{
                  backgroundColor: getConnectionColor(
                    selectedConnectionType.value,
                  ),
                  height: `${getConnectionStyle(selectedConnectionType.value).width || 2}px`,
                  borderStyle: getConnectionStyle(selectedConnectionType.value)
                    .dashed
                    ? "dashed"
                    : "solid",
                }}
              ></div>
              <span class="text-xs text-slate-500">
                {getSelectedStyleProps().dashed} line,{" "}
                {getSelectedStyleProps().width} width
              </span>
            </div>
          </div>

          <p class="mb-3 text-sm text-slate-600 dark:text-slate-300">
            {getConnectionDetails(selectedConnectionType.value).description}
          </p>

          <div class="grid grid-cols-1 gap-3 text-xs sm:grid-cols-3">
            <div class="rounded bg-slate-50 p-2 dark:bg-slate-700">
              <span class="font-medium">Typical Speed:</span>{" "}
              {getConnectionDetails(selectedConnectionType.value).speed}
            </div>
            <div class="rounded bg-green-50 p-2 dark:bg-green-900/20">
              <span class="font-medium">Pros:</span>{" "}
              {getConnectionDetails(selectedConnectionType.value).pros}
            </div>
            <div class="rounded bg-amber-50 p-2 dark:bg-amber-900/20">
              <span class="font-medium">Cons:</span>{" "}
              {getConnectionDetails(selectedConnectionType.value).cons}
            </div>
          </div>
        </div>
      )}

      {/* The graph component */}
      <div class="overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
        <Graph
          nodes={nodes}
          connections={connections}
          title="Network Connection Types"
          config={graphConfig}
        />
      </div>

      {/* Feature list */}
      <div class="mt-6 rounded-lg border border-slate-200 p-4 dark:border-slate-700">
        <h3 class="mb-2 font-semibold text-slate-800 dark:text-white">
          Connection Type Features
        </h3>
        <ul class="grid grid-cols-1 gap-x-6 gap-y-1 text-sm text-slate-600 md:grid-cols-2 dark:text-slate-300">
          <li>• Visual differentiation between connection types</li>
          <li>• Automatic styling based on connection type</li>
          <li>• Custom line styles (solid/dashed)</li>
          <li>• Custom line widths for importance</li>
          <li>• Consistent color schemes</li>
          <li>• Animated packets for traffic visualization</li>
        </ul>
      </div>
    </div>
  );
});

export default ConnectionTypeExample;
