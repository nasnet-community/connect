import { component$ } from "@builder.io/qwik";
import type { GraphConnection, GraphNode } from "../types";
import { PacketAnimation } from "./PacketAnimation";
import { ConnectionMarkers } from "./ConnectionMarkers";

/**
 * Component that renders connections between nodes
 * Note: This component no longer handles click events directly to avoid serialization issues
 */
export const ConnectionRenderer = component$<{
  connections: GraphConnection[];
  nodeMap: Map<string | number, GraphNode>;
}>((props) => {
  const { connections, nodeMap } = props;

  /**
   * Generate a path for a connection between two nodes
   */
  const generatePath = (fromNode: GraphNode, toNode: GraphNode) => {
    const x1 = fromNode.x;
    const y1 = fromNode.y;
    const x2 = toNode.x;
    const y2 = toNode.y;

    // For curved line
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const curveFactor = Math.min(distance * 0.2, 30);

    // Perpendicular direction for curve
    const perpX = (-dy / distance) * curveFactor;
    const perpY = (dx / distance) * curveFactor;

    // Path for curved line
    return `M ${x1} ${y1} Q ${(x1 + x2) / 2 + perpX} ${(y1 + y2) / 2 + perpY} ${x2} ${y2}`;
  };

  // Render a single connection
  const renderConnection = (connection: GraphConnection) => {
    const fromNode = nodeMap.get(connection.from);
    const toNode = nodeMap.get(connection.to);

    if (!fromNode || !toNode) return null;

    const id = connection.id || `${connection.from}-${connection.to}`;
    const color = connection.color || "#94a3b8"; // Default: slate-400
    const width = connection.width || 2;
    const dashed = connection.dashed || false;
    const arrowHead =
      connection.arrowHead !== undefined ? connection.arrowHead : true;

    // Calculate marker
    const markerId = arrowHead ? `arrow-${id}` : undefined;

    // Path for curved line
    const pathD = generatePath(fromNode, toNode);

    return (
      <g key={`connection-${id}`}>
        {arrowHead && (
          <defs>
            <marker
              id={markerId}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
            </marker>
          </defs>
        )}

        <path
          d={pathD}
          fill="none"
          stroke={color}
          stroke-width={width}
          stroke-dasharray={dashed ? "5,3" : "none"}
          marker-end={markerId ? `url(#${markerId})` : undefined}
          class="connection-path"
        />

        {/* Animate packets if enabled */}
        <PacketAnimation connection={connection} pathD={pathD} />

        {/* Connection label */}
        {connection.label && (
          <text
            x={(fromNode.x + toNode.x) / 2}
            y={(fromNode.y + toNode.y) / 2 - 10}
            text-anchor="middle"
            fill={color}
            font-size="11"
            font-weight="500"
            class="connection-label"
          >
            {connection.label}
          </text>
        )}
      </g>
    );
  };

  return (
    <>
      <ConnectionMarkers connections={connections} />
      {connections.map((connection) => renderConnection(connection))}
    </>
  );
});

export default ConnectionRenderer;
