import { $, component$, useSignal } from "@builder.io/qwik";
import { Graph } from "../Graph";
import { createNode } from "../Node/NodeTypes";
import type { GraphConnection, GraphNode } from "../types";

/**
 * Example showcasing the basic features of the Graph component
 */
export interface NetworkGraphExampleProps {
  customNodes?: GraphNode[];
  customConnections?: GraphConnection[];
}

export const NetworkGraphExample = component$<NetworkGraphExampleProps>(
  ({ customNodes, customConnections }) => {
    // Track the selected node for highlighting
    const selectedNodeId = useSignal<string | null>(null);
    const selectedInfo = useSignal<string>("");

    // Default nodes if no custom nodes are provided
    const nodes = customNodes || [
      createNode("User", "user1", 50, 100, { label: "Client" }),
      createNode("WirelessRouter", "router", 180, 100, { label: "Router" }),
      createNode("DomesticWAN", "wan", 310, 100, { label: "Internet" }),
    ];

    // Default connections if no custom connections are provided
    const connections: GraphConnection[] = customConnections || [
      {
        from: "user1",
        to: "router",
        color: "#f59e0b",
        animated: true,
      },
      {
        from: "router",
        to: "wan",
        color: "#84cc16",
        animated: true,
        label: "Internet Connection",
      },
    ];

    // Handler for node clicks
    const handleNodeClick = $((node: GraphNode) => {
      selectedNodeId.value = node.id.toString();
      selectedInfo.value = `Selected: ${node.label} (${node.type})`;
    });

    // Optional graph configuration using Tailwind-aligned values
    const graphConfig = {
      width: "100%",
      height: "21.875rem", // 350px in rem units
      viewBox: "0 0 500 200",
      showLegend: true,
      legendItems: [
        { color: "#84cc16", label: "Domestic Traffic" },
        { color: "#9333ea", label: "Foreign Traffic" },
      ],
    };

    return (
      <div class="rounded-lg bg-surface-light p-4 mobile:p-5 tablet:p-6 desktop:p-8 pb-safe mobile:pb-safe-bottom dark:bg-surface-dark">
        {/* Feature highlights with enhanced responsive breakpoints */}
        <div class="mb-4 grid grid-cols-1 gap-3 mobile:gap-4 sm:grid-cols-2 tablet:grid-cols-3 desktop:gap-6">
          <div class="rounded-md bg-info-surface p-3 mobile:p-4 tablet:p-5 dark:bg-surface-dark-secondary">
            <h3 class="text-xs mobile:text-sm font-semibold text-info dark:text-info-light">
              Interactive Nodes
            </h3>
            <p class="text-2xs mobile:text-xs text-gray-600 dark:text-gray-300">
              Click on any node to select it and see details
            </p>
          </div>
          <div class="rounded-md bg-success-surface p-3 mobile:p-4 tablet:p-5 dark:bg-surface-dark-secondary">
            <h3 class="text-xs mobile:text-sm font-semibold text-success dark:text-success-light">
              Animated Connections
            </h3>
            <p class="text-2xs mobile:text-xs text-gray-600 dark:text-gray-300">
              Packet animations visualize traffic flow
            </p>
          </div>
          <div class="rounded-md bg-secondary-100 p-3 mobile:p-4 tablet:p-5 dark:bg-surface-dark-secondary">
            <h3 class="text-xs mobile:text-sm font-semibold text-secondary-700 dark:text-secondary-dark-300">
              Expandable View
            </h3>
            <p class="text-2xs mobile:text-xs text-gray-600 dark:text-gray-300">
              Click the expand button to see a full-size view
            </p>
          </div>
        </div>

        {/* Selected node info */}
        {selectedInfo.value && (
          <div class="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 dark:border-amber-700 dark:bg-amber-900/20">
            <p class="text-sm font-medium text-amber-800 dark:text-amber-200">
              {selectedInfo.value}
            </p>
          </div>
        )}

        {/* The graph component */}
        <div class="mb-6 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
          <Graph
            nodes={nodes}
            connections={connections}
            title="Interactive Network Graph"
            config={graphConfig}
            onNodeClick$={handleNodeClick}
          />
        </div>

        {/* Feature documentation with RTL support */}
        <div class="mt-6 rounded-lg border border-slate-200 p-4 text-start dark:border-slate-700 rtl:text-end">
          <h3 class="mb-2 font-semibold text-slate-800 dark:text-white">
            Component Features
          </h3>
          <ul class="space-y-1 text-sm text-slate-600 dark:text-slate-300 ps-4 rtl:ps-0 rtl:pe-4">
            <li class="before:content-['•'] before:me-2 rtl:before:me-0 rtl:before:ms-2">Predefined node types with icons</li>
            <li class="before:content-['•'] before:me-2 rtl:before:me-0 rtl:before:ms-2">Customizable connection colors and styles</li>
            <li class="before:content-['•'] before:me-2 rtl:before:me-0 rtl:before:ms-2">Animated packet visualization</li>
            <li class="before:content-['•'] before:me-2 rtl:before:me-0 rtl:before:ms-2">Interactive nodes and connections</li>
            <li class="before:content-['•'] before:me-2 rtl:before:me-0 rtl:before:ms-2">Expandable view for detailed exploration</li>
            <li class="before:content-['•'] before:me-2 rtl:before:me-0 rtl:before:ms-2">Dark and light mode support</li>
            <li class="before:content-['•'] before:me-2 rtl:before:me-0 rtl:before:ms-2">Custom legends and labels</li>
          </ul>
        </div>
      </div>
    );
  },
);

export default NetworkGraphExample;
