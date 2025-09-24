import { component$ } from "@builder.io/qwik";
import type { GraphConnection, GraphNode } from "../types";

/**
 * Component that renders a single connection between nodes
 */
export const SingleConnectionRenderer = component$<{
  connection: GraphConnection;
  fromNode: GraphNode;
  toNode: GraphNode;
}>((props) => {
  const { connection, fromNode, toNode } = props;


  const id = connection.id || `${connection.from}-${connection.to}`;
  const color = connection.color || "rgb(251 191 36)"; // Default: amber-400
  const width = connection.width || 2.5;
  const dashed = connection.dashed !== false; // Default to true for animated dashes
  const arrowHead =
    connection.arrowHead !== undefined ? connection.arrowHead : true;

  // Robust numeric seed for animation timings (avoid NaN when id is non-numeric)
  const idString = id.toString();
  const numericSeed = (() => {
    const direct = Number(idString);
    if (!Number.isNaN(direct)) return direct;
    let sum = 0;
    for (let i = 0; i < idString.length; i++) {
      sum = (sum + idString.charCodeAt(i)) % 1024;
    }
    return sum;
  })();
  const baseDur = 2 + (numericSeed % 3) * 0.5;

  // Path for line (straight, not curved for NetworkTopology style)
  const x1 = fromNode.x + 16;
  const y1 = fromNode.y;
  const x2 = toNode.x - 16;
  const y2 = toNode.y;
  
  // Calculate arrow points based on direction
  let arrowPoints = "";
  if (y1 === y2) {
    arrowPoints = `${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 10},${y2 + 5}`;
  } else if (x1 < x2 && y1 < y2) {
    arrowPoints = `${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 3},${y2 - 12}`;
  } else if (x1 < x2 && y1 > y2) {
    arrowPoints = `${x2},${y2} ${x2 - 10},${y2 + 5} ${x2 - 3},${y2 + 12}`;
  }

  // Path for animation
  const pathD = `M${x1},${y1} L${x2},${y2}`;

  // Calculate midpoint for label positioning
  const midX = (fromNode.x + toNode.x) / 2;
  const midY = (fromNode.y + toNode.y) / 2 - 10;
  
  // Check if connection has domestic/foreign traffic type
  const domesticPacketColor = "rgb(16, 185, 129)"; // Emerald-500
  const foreignPacketColor = "rgb(168, 85, 247)"; // Purple-500
  const packetColor = connection.isDomestic
    ? domesticPacketColor
    : foreignPacketColor;

  return (
    <>
      {/* Path for dashed line with animation */}
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        class="traffic-path"
        stroke-width={width}
        stroke-dasharray={dashed ? "4,3" : "none"}
      >
        {dashed && (
          <animate
            attributeName="stroke-dashoffset"
            from="8"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </line>

      {/* Arrow pointing to destination node */}
      {arrowHead && arrowPoints && (
        <polygon
          points={arrowPoints}
          fill={color}
          class="traffic-path-arrow"
        />
      )}

      {/* Animate packets if enabled with enhanced styling */}
      {connection.animated !== false && (
        <>
          {/* Animated packet 1 */}
          <circle r="3" fill={packetColor} opacity="0.9">
            <animateMotion
              path={pathD}
              dur={`${baseDur}s`}
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>

          {/* Animated packet 2 (offset start) */}
          <circle r="2" fill={packetColor} opacity="0.7">
            <animateMotion
              path={pathD}
              dur={`${baseDur}s`}
              begin={`${0.7 + (numericSeed % 3) * 0.2}s`}
              repeatCount="indefinite"
              rotate="auto"
            />
          </circle>
          
          {/* Animated packet 3 (faster and smaller) - if multi-packet enabled */}
          {connection.packetColors && connection.packetColors.length > 2 && (
            <circle
              r="1.5"
              fill="#ffffff"
              stroke={packetColor}
              stroke-width="1"
              opacity="0.8"
            >
              <animateMotion
                path={pathD}
                dur={`${1.5 + (numericSeed % 3) * 0.3}s`}
                begin={`${1.3 + (numericSeed % 3) * 0.1}s`}
                repeatCount="indefinite"
                rotate="auto"
              />
            </circle>
          )}
        </>
      )}

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
            class="connection-label-bg hidden dark:block"
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
            class="connection-label-bg block dark:hidden"
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
