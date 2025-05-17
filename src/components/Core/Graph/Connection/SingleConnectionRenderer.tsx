import { component$ } from "@builder.io/qwik";
import type { GraphConnection, GraphNode } from "../types";
import { PacketAnimation } from "./PacketAnimation";

/**
 * Component that renders a single connection between nodes
 */
export const SingleConnectionRenderer = component$<{
  connection: GraphConnection;
  fromNode: GraphNode;
  toNode: GraphNode;
}>((props) => {
  const { connection, fromNode, toNode } = props;
  
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
    const perpX = -dy / distance * curveFactor;
    const perpY = dx / distance * curveFactor;
    
    // Path for curved line
    return `M ${x1} ${y1} Q ${(x1 + x2) / 2 + perpX} ${(y1 + y2) / 2 + perpY} ${x2} ${y2}`;
  };
  
  const id = connection.id || `${connection.from}-${connection.to}`;
  const color = connection.color || "#94a3b8"; // Default: slate-400
  const width = connection.width || 2;
  const dashed = connection.dashed || false;
  const arrowHead = connection.arrowHead !== undefined ? connection.arrowHead : true;
  
  // Calculate marker
  const markerId = arrowHead ? `arrow-${id}` : undefined;
  
  // Path for curved line
  const pathD = generatePath(fromNode, toNode);
  
  // Calculate midpoint for label positioning
  const midX = (fromNode.x + toNode.x) / 2;
  const midY = (fromNode.y + toNode.y) / 2 - 10;
  
  return (
    <>
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
        <>
          {/* Background/outline for better readability in both light and dark modes */}
          <text 
            x={midX}
            y={midY}
            text-anchor="middle" 
            stroke="rgba(255,255,255,0.8)"
            stroke-width="3"
            stroke-linejoin="round"
            paint-order="stroke"
            fill="transparent"
            font-size="11" 
            font-weight="500"
            class="connection-label-bg dark:block hidden"
          >
            {connection.label}
          </text>
          
          {/* Background/outline for better readability in both light and dark modes */}
          <text 
            x={midX}
            y={midY}
            text-anchor="middle" 
            stroke="rgba(0,0,0,0.1)"
            stroke-width="3"
            stroke-linejoin="round"
            paint-order="stroke"
            fill="transparent"
            font-size="11" 
            font-weight="500"
            class="connection-label-bg dark:hidden block"
          >
            {connection.label}
          </text>
          
          {/* Main label text */}
          <text 
            x={midX}
            y={midY}
            text-anchor="middle" 
            fill={color}
            font-size="11" 
            font-weight="500"
            class="connection-label"
          >
            {connection.label}
          </text>
        </>
      )}
    </>
  );
});

export default SingleConnectionRenderer; 