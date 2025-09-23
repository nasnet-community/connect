import { $, component$ } from "@builder.io/qwik";
import type { GraphNode, GraphProps } from "./types";
import { NodeRenderer } from "./Node/NodeRenderer";
import { processConnections } from "./Traffic/TrafficUtils";
import { processConnectionTypes } from "./Connection/ConnectionUtils";
import { GraphContainer, defaultConfig } from "./Container/GraphContainer";
import { SingleConnectionRenderer } from "./Connection/SingleConnectionRenderer";

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
    onConnectionClick$,
  } = props;

  const mergedConfig = { ...defaultConfig, ...config };

  // Calculate viewBox - simplified to avoid useComputed$ issues
  const getViewBox = () => {
    if (mergedConfig.viewBox && nodes.length > 0) {
      return mergedConfig.viewBox;
    }

    // If no viewBox specified or no nodes, use default
    if (nodes.length === 0) {
      return "0 0 500 420";
    }

    // Find min/max coordinates to encompass all nodes
    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;

    nodes.forEach((node) => {
      minX = Math.min(minX, node.x);
      minY = Math.min(minY, node.y);
      maxX = Math.max(maxX, node.x);
      maxY = Math.max(maxY, node.y);
    });

    // Add padding
    const padding = 96;
    minX = Math.max(0, minX - padding);
    minY = Math.max(0, minY - padding);
    maxX = maxX + padding;
    maxY = maxY + padding;

    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
  };

  const computedViewBox = getViewBox();

  // Process connections to apply traffic and connection type styling - simplified
  const getProcessedConnections = () => {
    let result = [...rawConnections];
    // Apply traffic type styling
    result = processConnections(result);
    // Apply connection type styling
    result = processConnectionTypes(result);
    return result;
  };

  const processedConnections = getProcessedConnections();

  // Create a map for faster node lookup - simplified
  const getNodeMap = () => {
    const map = new Map<string | number, GraphNode>();
    nodes.forEach((node) => map.set(node.id, node));
    return map;
  };

  const nodeMap = getNodeMap();

  return (
    <GraphContainer
      title={title}
      config={mergedConfig}
      connections={processedConnections}
    >
      <svg
        class="h-full w-full"
        viewBox={computedViewBox}
        preserveAspectRatio={
          mergedConfig.preserveAspectRatio || "xMidYMid meet"
        }
        role="img"
        aria-label={title || "Network Topology Visualization"}
        aria-describedby="graph-description"
      >
        {/* Accessibility description */}
        <desc id="graph-description">
          Network graph showing {nodes.length} nodes and {processedConnections.length} connections.
          Use arrow keys to navigate between nodes, Enter to select, and Tab to move between interactive elements.
        </desc>
        
        {/* Background is handled by container, no need for rect here */}

        {/* Draw connections with accessibility support */}
        {processedConnections.map((connection) => {
          const fromNode = nodeMap.get(connection.from);
          const toNode = nodeMap.get(connection.to);
          if (!fromNode || !toNode) return null;

          const id = connection.id || `${connection.from}-${connection.to}`;
          const connectionLabel = connection.label || 
            `Connection from ${fromNode.label} to ${toNode.label}`;
          
          return (
            <g
              key={`connection-${id}`}
              onClick$={
                onConnectionClick$
                  ? $(async () => {
                      await onConnectionClick$(connection);
                    })
                  : undefined
              }
              class={{
                "cursor-pointer touch:cursor-default": !!onConnectionClick$,
              }}
              style={{
                // Add touch-friendly interaction for connections
                touchAction: "manipulation",
              }}
              role={onConnectionClick$ ? "button" : "img"}
              aria-label={`${connectionLabel}${connection.trafficType ? `, Traffic type: ${connection.trafficType}` : ""}`}
              tabindex={onConnectionClick$ ? 0 : -1}
              onKeyDown$={
                onConnectionClick$
                  ? $(async (event: KeyboardEvent) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        await onConnectionClick$(connection);
                      }
                    })
                  : undefined
              }
            >
              <SingleConnectionRenderer
                connection={connection}
                fromNode={fromNode}
                toNode={toNode}
              />
            </g>
          );
        })}

        {/* Draw nodes with accessibility support */}
        {nodes.map((node, _index) => (
          <g
            key={`node-${node.id}`}
            onClick$={
              onNodeClick$
                ? $(async () => {
                    await onNodeClick$(node);
                  })
                : undefined
            }
            class={{
              "cursor-pointer touch:cursor-default": !!onNodeClick$,
            }}
            style={{
              // Add larger touch target for nodes on touch devices
              touchAction: "manipulation",
            }}
            role={onNodeClick$ ? "button" : "img"}
            aria-label={`${node.type || "Node"}: ${node.label} at position ${node.x}, ${node.y}`}
            aria-describedby={`node-desc-${node.id}`}
            tabindex={onNodeClick$ ? 0 : -1}
            onKeyDown$={
              onNodeClick$
                ? $(async (event: KeyboardEvent) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      await onNodeClick$(node);
                    }
                  })
                : undefined
            }
          >
            <NodeRenderer node={node} />
          </g>
        ))}
      </svg>

      {/* Legend is now handled inside GraphContainer */}

      {/* Debug information in development mode */}
      {process.env.NODE_ENV === "development" && nodes.length === 0 && (
        <div class="p-4 text-center text-sm text-red-500 dark:text-red-400">
          No nodes to display. Add nodes to the graph.
        </div>
      )}
    </GraphContainer>
  );
});
