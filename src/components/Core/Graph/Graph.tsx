import { $, component$, useComputed$ } from "@builder.io/qwik";
import type { GraphNode, GraphProps } from "./types";
import { NodeRenderer } from "./Node/NodeRenderer";
import { processConnections } from "./Traffic/TrafficUtils";
import { processConnectionTypes } from "./Connection/ConnectionUtils";
import { GraphContainer, defaultConfig } from "./Container/GraphContainer";
import { SingleConnectionRenderer } from "./Connection/SingleConnectionRenderer";
import { GraphLegend } from "./Container/GraphLegend";

/**
 * Graph component for visualizing nodes and connections
 * Supports various network node types and traffic visualization
 */
export const Graph = component$<GraphProps>((props) => {
  const { 
    nodes, 
    connections: rawConnections, 
    title = "Network Graph",
    config,
    onNodeClick$,
    onConnectionClick$ 
  } = props;
  
  const mergedConfig = { ...defaultConfig, ...config };
  
  // Make sure we have a valid viewBox that encompasses all nodes
  const computedViewBox = useComputed$(() => {
    if (mergedConfig.viewBox && nodes.length > 0) {
      return mergedConfig.viewBox;
    }
    
    // If no viewBox specified or no nodes, calculate one that fits all nodes with padding
    if (nodes.length === 0) {
      return "0 0 1000 500"; // Default fallback
    }
    
    // Find min/max coordinates to encompass all nodes
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    nodes.forEach(node => {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x);
      maxY = Math.max(maxY, node.y);
    });
    
    // Add padding
    const padding = 100;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = maxX + padding;
    maxY = maxY + padding;
    
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  });
  
  // Process connections to apply traffic and connection type styling
  const processedConnections = useComputed$(() => {
    let result = [...rawConnections];
    // Apply traffic type styling
    result = processConnections(result);
    // Apply connection type styling
    result = processConnectionTypes(result);
    return result;
  });
  
  // Create a map for faster node lookup
  const nodeMap = useComputed$(() => {
    const map = new Map<string | number, GraphNode>();
    nodes.forEach(node => map.set(node.id, node));
    return map;
  });
  
  return (
    <GraphContainer
      title={title}
      config={mergedConfig}
      connections={processedConnections.value}
    >
      <svg 
        width="100%" 
        height="100%"
        viewBox={computedViewBox.value} 
        preserveAspectRatio={mergedConfig.preserveAspectRatio || "xMidYMid meet"} 
        class="graph-svg bg-surface dark:bg-surface-dark"
      >
        {/* SVG background for light/dark mode */}
        <rect 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          fill="transparent" 
          class="graph-bg" 
        />
        
        {/* Draw connections */}
        {processedConnections.value.map(connection => {
          const fromNode = nodeMap.value.get(connection.from);
          const toNode = nodeMap.value.get(connection.to);
          if (!fromNode || !toNode) return null;
          
          const id = connection.id || `${connection.from}-${connection.to}`;
          return (
            <g 
              key={`connection-${id}`}
              onClick$={onConnectionClick$ 
                ? $(async () => {
                    await onConnectionClick$(connection);
                  }) 
                : undefined
              }
              class={{
                "cursor-pointer": !!onConnectionClick$
              }}
            >
              <SingleConnectionRenderer 
                connection={connection} 
                fromNode={fromNode} 
                toNode={toNode} 
              />
            </g>
          );
        })}
        
        {/* Draw nodes */}
        {nodes.map(node => (
          <g 
            key={`node-${node.id}`}
            onClick$={onNodeClick$ 
              ? $(async () => {
                  await onNodeClick$(node);
                }) 
              : undefined
            }
            class={{
              "cursor-pointer": !!onNodeClick$
            }}
          >
            <NodeRenderer node={node} />
          </g>
        ))}
      </svg>
      
      {/* Legend for non-expanded mode */}
      {mergedConfig.showLegend && (
        <div class="mt-2">
          <GraphLegend
            connections={processedConnections.value}
            customLegendItems={mergedConfig.legendItems}
            showLegend={true}
          />
        </div>
      )}

      {/* Debug information in development mode */}
      {process.env.NODE_ENV === 'development' && nodes.length === 0 && (
        <div class="p-4 text-center text-red-500 dark:text-red-400 text-sm">
          No nodes to display. Add nodes to the graph.
        </div>
      )}
    </GraphContainer>
  );
});

export default Graph; 