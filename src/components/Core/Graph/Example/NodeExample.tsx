import { $, component$, useSignal } from "@builder.io/qwik";import { Graph } from "../Graph";import { createNode, networkNodeTypes } from "../Node/NodeTypes";import type { GraphNode, GraphConnection } from "../types";import type { NetworkNodeType } from "../Node/NodeTypes";

/**
 * Example component showcasing all available node types in the graph library
 */
export const NodeTypesExample = component$(() => {
  // Track the selected node for details
  const selectedNodeType = useSignal<NetworkNodeType | null>(null);
  
  // Get all available node types
  const nodeTypes = Object.keys(networkNodeTypes) as NetworkNodeType[];
  
  // Create a grid layout for nodes
  const gridCols = 4; // Number of columns in the grid
  const gridRows = Math.ceil(nodeTypes.length / gridCols);
  const cellWidth = 200;
  const cellHeight = 150;
  const startX = 100;
  const startY = 100;
  
  // Create a node for each node type
  const nodes: GraphNode[] = nodeTypes.map((nodeType, index) => {
    const col = index % gridCols;
    const row = Math.floor(index / gridCols);
    const x = startX + col * cellWidth;
    const y = startY + row * cellHeight;
    
    const definition = networkNodeTypes[nodeType];
    return createNode(nodeType, nodeType, x, y, { 
      label: definition.label || nodeType
    });
  });
  
  // Create connections between some nodes to demonstrate connections
  const connections: GraphConnection[] = [];
  
  // Connect User to Router
  if (nodes.find(n => n.id === "User") && nodes.find(n => n.id === "WirelessRouter")) {
    connections.push({
      from: "User",
      to: "WirelessRouter",
      animated: true,
      trafficType: "Domestic",
      label: "Connects to"
    });
  }
  
  // Connect Router to WAN
  if (nodes.find(n => n.id === "WirelessRouter") && nodes.find(n => n.id === "DomesticWAN")) {
    connections.push({
      from: "WirelessRouter",
      to: "DomesticWAN",
      animated: true,
      trafficType: "Domestic",
      label: "Connects to"
    });
  }
  
  // Connect Gaming Console to Router
  if (nodes.find(n => n.id === "GamingConsole") && nodes.find(n => n.id === "WirelessRouter")) {
    connections.push({
      from: "GamingConsole",
      to: "WirelessRouter",
      animated: true,
      trafficType: "Game",
      label: "Game Traffic"
    });
  }
  
  // Handle node click to show details
  const handleNodeClick = $((node: GraphNode) => {
    if (node.type) {
      selectedNodeType.value = node.type as NetworkNodeType;
    }
  });
  
  // Get details for the selected node type
  const getNodeTypeDetails = (type: NetworkNodeType | null) => {
    if (!type) return null;
    
    const nodeType = networkNodeTypes[type];
    return {
      type,
      label: nodeType.label || type,
      color: nodeType.color,
      size: nodeType.size || 22,
      category: getNodeCategory(type)
    };
  };
  
  // Helper to categorize node types
  const getNodeCategory = (type: NetworkNodeType): string => {
    if (type.includes('User') || type === 'User') return 'End User Device';
    if (type.includes('Router') || type === 'AP') return 'Network Infrastructure';
    if (type.includes('WAN')) return 'Internet Connection';
    if (type.includes('Service') || type.includes('Website')) return 'Network Service';
    if (type.includes('VPN')) return 'VPN Component';
    if (type.includes('Gaming') || type.includes('Game')) return 'Gaming Component';
    return 'Miscellaneous';
  };
  
  // Optional graph configuration
  const graphConfig = {
    width: "100%",
    height: "450px",
    viewBox: `0 0 ${gridCols * cellWidth + startX} ${gridRows * cellHeight + startY}`,
    showLegend: false
  };

  return (
    <div class="p-6 bg-white dark:bg-slate-800 rounded-lg">
      <h2 class="text-xl font-semibold mb-2 text-slate-800 dark:text-white">Network Node Types</h2>
      <p class="mb-4 text-sm text-slate-600 dark:text-slate-300">
        Explore all available node types for network visualization. Click on any node to see details.
      </p>
      
      {/* Node categories legend */}
      <div class="mb-6 flex flex-wrap gap-3">
        <div class="px-3 py-1 rounded-md text-xs bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <span class="font-medium">End User Devices</span>
        </div>
        <div class="px-3 py-1 rounded-md text-xs bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
          <span class="font-medium">Network Infrastructure</span>
        </div>
        <div class="px-3 py-1 rounded-md text-xs bg-blue-100 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <span class="font-medium">Internet Connections</span>
        </div>
        <div class="px-3 py-1 rounded-md text-xs bg-purple-100 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
          <span class="font-medium">Network Services</span>
        </div>
        <div class="px-3 py-1 rounded-md text-xs bg-indigo-100 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800">
          <span class="font-medium">VPN Components</span>
        </div>
        <div class="px-3 py-1 rounded-md text-xs bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
          <span class="font-medium">Gaming Components</span>
        </div>
      </div>
      
      {/* Selected node details */}
      {selectedNodeType.value && (
        <div class="mb-6 p-4 border rounded-lg" style={{ borderColor: networkNodeTypes[selectedNodeType.value].color }}>
          <div class="flex items-start gap-4">
            <div 
              class="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${networkNodeTypes[selectedNodeType.value].color}20` }}
            >
              <div class="w-8 h-8 rounded-full" style={{ backgroundColor: networkNodeTypes[selectedNodeType.value].color }}></div>
            </div>
            
            <div class="flex-1">
              <h3 class="text-lg font-semibold mb-1">{networkNodeTypes[selectedNodeType.value].label || selectedNodeType.value}</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300">
                Type: <span class="font-medium">{selectedNodeType.value}</span> | 
                Category: <span class="font-medium">{getNodeTypeDetails(selectedNodeType.value)?.category}</span>
              </p>
              
              <div class="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="text-xs p-2 bg-slate-50 dark:bg-slate-700 rounded">
                  <span class="font-medium">Color:</span> {networkNodeTypes[selectedNodeType.value].color}
                </div>
                <div class="text-xs p-2 bg-slate-50 dark:bg-slate-700 rounded">
                  <span class="font-medium">Size:</span> {networkNodeTypes[selectedNodeType.value].size || 22}px
                </div>
                <div class="text-xs p-2 bg-slate-50 dark:bg-slate-700 rounded">
                  <span class="font-medium">Usage:</span> NetworkNode type identifier
                </div>
              </div>
              
              <div class="mt-3 text-xs bg-slate-50 dark:bg-slate-700 p-2 rounded">
                <span class="font-medium">Usage Example: </span>
                <code>createNode("{selectedNodeType.value}", "id1", x, y, &#123; label: "Label" &#125;)</code>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Graph with all node types */}
      <div class="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <Graph 
          nodes={nodes}
          connections={connections}
          title="Node Types Demo"
          config={graphConfig}
          onNodeClick$={handleNodeClick}
        />
      </div>
      
      {/* Node types grid */}
      <div class="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {nodeTypes.map((nodeType) => (
          <button
            key={nodeType}
            onClick$={() => handleNodeClick({ 
              id: nodeType, 
              type: nodeType, 
              x: 0, 
              y: 0, 
              label: networkNodeTypes[nodeType].label || nodeType 
            })}
            class="p-3 border rounded-md flex flex-col items-center hover:shadow-md transition-all"
            style={{ 
              borderColor: networkNodeTypes[nodeType].color,
              backgroundColor: selectedNodeType.value === nodeType ? 
                `${networkNodeTypes[nodeType].color}15` : 'transparent'
            }}
          >
            <div 
              class="w-8 h-8 rounded-full mb-2" 
              style={{ backgroundColor: networkNodeTypes[nodeType].color }}
            ></div>
            <span class="text-xs font-medium text-center">{networkNodeTypes[nodeType].label || nodeType}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

export default NodeTypesExample; 