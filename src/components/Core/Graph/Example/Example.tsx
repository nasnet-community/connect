import { $, component$, useSignal } from "@builder.io/qwik";
import { Graph } from "../Graph";
import { createNode } from "../Node/NodeTypes";
import type { GraphConnection, GraphNode } from "../types";

/**
 * Example showcasing the basic features of the Graph component
 */
export const NetworkGraphExample = component$(() => {
  // Track the selected node for highlighting
  const selectedNodeId = useSignal<string | null>(null);
  const selectedInfo = useSignal<string>("");
  
  // Create nodes using the predefined node types
  const nodes = [
    createNode("User", "user1", 50, 100, { label: "Client" }),
    createNode("WirelessRouter", "router", 180, 100, { label: "Router" }),
    createNode("DomesticWAN", "domestic", 310, 60, { label: "Domestic" }),
    createNode("ForeignWAN", "foreign", 310, 140, { label: "Foreign" }),
    createNode("DomesticWebsite", "website1", 440, 60, { label: "Local Site" }),
    createNode("ForeignWebsite", "website2", 440, 140, { label: "Global Site" })
  ];

  // Create connections between nodes
  const connections: GraphConnection[] = [
    { 
      from: "user1", 
      to: "router",
      color: "#f59e0b",
      animated: true,
      packetColors: ["#f59e0b"]
    },
    { 
      from: "router", 
      to: "domestic",
      color: "#84cc16",
      animated: true, 
      packetColors: ["#84cc16"],
      label: "Local Traffic"
    },
    { 
      from: "router", 
      to: "foreign",
      color: "#9333ea",
      animated: true,
      packetColors: ["#9333ea"],
      label: "Foreign Traffic"
    },
    { 
      from: "domestic", 
      to: "website1",
      color: "#84cc16",
      animated: true,
      packetColors: ["#84cc16"]
    },
    { 
      from: "foreign", 
      to: "website2",
      color: "#9333ea",
      animated: true,
      packetColors: ["#9333ea"]
    }
  ];

  // Handler for node clicks
  const handleNodeClick = $((node: GraphNode) => {
    selectedNodeId.value = node.id.toString();
    selectedInfo.value = `Selected: ${node.label} (${node.type})`;
  });

  // Optional graph configuration
  const graphConfig = {
    width: "100%",
    height: "350px",
    viewBox: "0 0 500 200",
    showLegend: true,
    legendItems: [
      { color: "#84cc16", label: "Domestic Traffic" },
      { color: "#9333ea", label: "Foreign Traffic" }
    ]
  };

  return (
    <div class="p-6 bg-white dark:bg-slate-800 rounded-lg">
      {/* Feature highlights */}
      <div class="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-blue-50 dark:bg-slate-700 p-3 rounded-md">
          <h3 class="font-semibold text-sm text-blue-700 dark:text-blue-300">Interactive Nodes</h3>
          <p class="text-xs text-slate-600 dark:text-slate-300">Click on any node to select it and see details</p>
        </div>
        <div class="bg-green-50 dark:bg-slate-700 p-3 rounded-md">
          <h3 class="font-semibold text-sm text-green-700 dark:text-green-300">Animated Connections</h3>
          <p class="text-xs text-slate-600 dark:text-slate-300">Packet animations visualize traffic flow</p>
        </div>
        <div class="bg-purple-50 dark:bg-slate-700 p-3 rounded-md">
          <h3 class="font-semibold text-sm text-purple-700 dark:text-purple-300">Expandable View</h3>
          <p class="text-xs text-slate-600 dark:text-slate-300">Click the expand button to see a full-size view</p>
        </div>
      </div>
      
      {/* Selected node info */}
      {selectedInfo.value && (
        <div class="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-md">
          <p class="text-sm font-medium text-amber-800 dark:text-amber-200">{selectedInfo.value}</p>
        </div>
      )}
      
      {/* The graph component */}
      <div class="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden mb-6">
        <Graph 
          nodes={nodes}
          connections={connections}
          title="Interactive Network Graph"
          config={graphConfig}
          onNodeClick$={handleNodeClick}
        />
      </div>
      
      {/* Feature documentation */}
      <div class="mt-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
        <h3 class="font-semibold mb-2 text-slate-800 dark:text-white">Component Features</h3>
        <ul class="text-sm space-y-1 text-slate-600 dark:text-slate-300">
          <li>• Predefined node types with icons</li>
          <li>• Customizable connection colors and styles</li>
          <li>• Animated packet visualization</li>
          <li>• Interactive nodes and connections</li>
          <li>• Expandable view for detailed exploration</li>
          <li>• Dark and light mode support</li>
          <li>• Custom legends and labels</li>
        </ul>
      </div>
    </div>
  );
});

export default NetworkGraphExample; 