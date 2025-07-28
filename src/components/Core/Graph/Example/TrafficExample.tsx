import { $, component$, useSignal } from "@builder.io/qwik";
import { Graph } from "../Graph";
import { createNode } from "../Node/NodeTypes";
import type { GraphConnection, GraphNode, GraphTrafficType } from "../types";

/**
 * Example showcasing different traffic types and controls
 */
export const NetworkTrafficExample = component$(() => {
  // Track active traffic types for toggling
  const activeTrafficTypes = useSignal<Record<string, boolean>>({
    Domestic: true,
    Foreign: true,
    VPN: true,
    Game: true,
  });

  // Track selected connection for details
  const selectedConnection = useSignal<GraphConnection | null>(null);

  // Create nodes for the network
  const nodes = [
    createNode("User", "user1", 100, 200, { label: "User" }),
    createNode("WirelessRouter", "router", 300, 200, { label: "Router" }),
    createNode("DomesticWAN", "domestic", 500, 100, { label: "Domestic ISP" }),
    createNode("ForeignWAN", "foreign", 500, 300, { label: "Foreign ISP" }),
    createNode("VPNServer", "vpn", 700, 200, { label: "VPN Server" }),
    createNode("GameServer", "game", 700, 350, { label: "Game Server" }),
    createNode("DomesticWebsite", "website", 700, 50, {
      label: "Local Website",
    }),
  ];

  // Helper function to create connections with traffic types
  const createConnection = (
    from: string | number,
    to: string | number,
    trafficType: GraphTrafficType,
    label?: string,
    additionalProps: Partial<GraphConnection> = {},
  ): GraphConnection => {
    return {
      from,
      to,
      trafficType,
      label: label || `${trafficType} Traffic`,
      animated: true,
      ...additionalProps,
    };
  };

  // Create all possible connections with different traffic types
  const allConnections: GraphConnection[] = [
    // Domestic traffic
    createConnection("user1", "router", "Domestic", "User to Router"),
    createConnection("router", "domestic", "Domestic", "Domestic Traffic"),
    createConnection("domestic", "website", "Domestic", "Web Browsing"),

    // Foreign traffic
    createConnection("router", "foreign", "Foreign", "Foreign Traffic"),

    // VPN traffic
    createConnection("router", "vpn", "VPN", "VPN Connection", {
      dashed: true,
      width: 3,
    }),

    // Game traffic
    createConnection("router", "game", "Game", "Game Traffic", {
      packetSize: [5, 3],
      packetDelay: [0, 0.5],
    }),
  ];

  // Filter connections based on active types
  const filteredConnections = allConnections.filter((conn) =>
    conn.trafficType ? activeTrafficTypes.value[conn.trafficType] : true,
  );

  // Handle toggling a traffic type
  const toggleTrafficType = $((type: string) => {
    activeTrafficTypes.value = {
      ...activeTrafficTypes.value,
      [type]: !activeTrafficTypes.value[type],
    };
  });

  // Handle node click
  const handleNodeClick = $((node: GraphNode) => {
    console.log("Node clicked:", node);
  });

  // Handle connection click
  const handleConnectionClick = $((connection: GraphConnection) => {
    selectedConnection.value = connection;
  });

  // Optional graph configuration
  const graphConfig = {
    width: "100%",
    height: "350px",
    viewBox: "0 0 800 400",
    showLegend: false, // We're providing custom legend with toggles
  };

  // Traffic types and their colors for the legend
  const trafficTypes = [
    {
      type: "Domestic",
      color: "#84cc16",
      description: "Traffic to/from local networks",
    },
    {
      type: "Foreign",
      color: "#9333ea",
      description: "Traffic to/from external/international networks",
    },
    { type: "VPN", color: "#6366f1", description: "Encrypted tunnel traffic" },
    { type: "Game", color: "#ef4444", description: "Gaming-specific traffic" },
  ];

  return (
    <div class="rounded-lg bg-surface-light p-4 mobile:p-6 pb-safe mobile:pb-safe-bottom dark:bg-surface-dark">
      <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
        Traffic Type Explorer
      </h2>

      {/* Traffic type toggles - interactive legend with responsive spacing */}
      <div class="mb-4 mobile:mb-6 flex flex-wrap gap-2 mobile:gap-3 tablet:gap-4">
        {trafficTypes.map(({ type, color }) => (
          <button
            key={type}
            onClick$={() => toggleTrafficType(type)}
            class={{
              "flex items-center gap-1 mobile:gap-2 rounded-lg border px-2 mobile:px-3 py-1 mobile:py-2 transition-all text-xs mobile:text-sm min-h-[44px] touch:min-h-[48px] touch-manipulation":
                true,
              "bg-opacity-20 shadow-sm": activeTrafficTypes.value[type],
              "opacity-50": !activeTrafficTypes.value[type],
            }}
            style={{
              backgroundColor: activeTrafficTypes.value[type]
                ? `${color}20`
                : "transparent",
              borderColor: color,
            }}
          >
            <span
              class="inline-block h-3 w-3 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
            <span class="text-sm font-medium">{type}</span>
          </button>
        ))}
      </div>

      {/* Selected connection info */}
      {selectedConnection.value && (
        <div class="mb-4 rounded-md border border-blue-200 bg-blue-50 p-3 dark:border-blue-700 dark:bg-blue-900/20">
          <h3 class="text-sm font-medium text-blue-800 dark:text-blue-200">
            {selectedConnection.value.label || "Connection Details"}
          </h3>
          <p class="text-xs text-slate-600 dark:text-slate-300">
            Type: {selectedConnection.value.trafficType || "Standard"} | From:{" "}
            {selectedConnection.value.from} | To: {selectedConnection.value.to}
          </p>
        </div>
      )}

      {/* Graph component */}
      <Graph
        nodes={nodes}
        connections={filteredConnections}
        title="Traffic Type Demo"
        config={graphConfig}
        onNodeClick$={handleNodeClick}
        onConnectionClick$={handleConnectionClick}
      />

      {/* Traffic type details with enhanced responsive grid */}
      <div class="mt-4 mobile:mt-6 grid grid-cols-1 gap-3 mobile:gap-4 tablet:grid-cols-2 desktop:gap-6">
        {trafficTypes.map(({ type, color, description }) => (
          <div
            key={`detail-${type}`}
            class="rounded-lg border p-3 mobile:p-4 tablet:p-5"
            style={{ borderColor: color }}
          >
            <div class="mb-2 flex items-center gap-2">
              <span
                class="h-4 w-4 rounded-full"
                style={{ backgroundColor: color }}
              ></span>
              <h3 class="font-semibold">{type} Traffic</h3>
            </div>
            <p class="text-sm text-slate-600 dark:text-slate-300">
              {description}
            </p>

            {/* Traffic specific features */}
            <div class="mt-2 text-xs text-slate-500 dark:text-slate-400">
              {type === "VPN" && "Features: Dashed lines, wider connections"}
              {type === "Game" && "Features: Multiple packet sizes and delays"}
              {type === "Domestic" &&
                "Features: Animated packets flowing to local sites"}
              {type === "Foreign" &&
                "Features: Animated packets flowing to external sites"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default NetworkTrafficExample;
