import { component$ } from "@builder.io/qwik";
import type { GraphNode } from "../types";
import { networkNodeTypes, type NetworkNodeType } from "./NodeTypes";

/**
 * Component that renders a node with the appropriate icon based on the node type
 */
export const NodeRenderer = component$<{ node: GraphNode }>((props) => {
  const { node } = props;
  const nodeType = node.type as NetworkNodeType;

  // Default rendering if the node type is not recognized
  if (!nodeType || !networkNodeTypes[nodeType]) {
    return renderBasicNode(node);
  }

  // Get the definition for this node type
  const definition = networkNodeTypes[nodeType];
  const IconComponent = definition.icon;
  const nodeSize = node.size || definition.size || 22;

  // If the icon component is not available, render a basic node
  if (!IconComponent) {
    return renderBasicNode(node, definition.color);
  }

  try {
    const iconSize = Math.floor(nodeSize * 0.9);

    return (
      <g transform={`translate(${node.x}, ${node.y})`}>
        {/* Node highlight effect */}
        <circle
          r={nodeSize}
          fill={`${node.color || definition.color}33`}
          class="node-highlight"
        />

        {/* Node background circle */}
        <circle r={nodeSize - 4} fill={node.color || definition.color} />

        {/* Node icon */}
        <foreignObject
          x={-iconSize / 2}
          y={-iconSize / 2}
          width={iconSize}
          height={iconSize}
        >
          <div
            style={{
              width: `${iconSize}px`,
              height: `${iconSize}px`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
            }}
          >
            <IconComponent width={iconSize * 0.6} height={iconSize * 0.6} />
          </div>
        </foreignObject>

        {/* Node label with enhanced theme support */}
        <text
          x="0"
          y={nodeSize + 15}
          text-anchor="middle"
          fill={node.color || definition.color}
          font-size="11"
          font-weight="bold"
          class="node-label"
          style={{
            // Enhanced theme-aware text visibility
            textShadow: "0 0 3px rgba(0,0,0,0.5)",
            "--text-shadow-light": "0 0 3px rgba(0,0,0,0.5)",
            "--text-shadow-dark": "0 0 3px rgba(255,255,255,0.3)",
            filter: "var(--text-shadow-light)",
          }}
        >
          {node.label}
        </text>

        {/* Enhanced shadow text for better contrast across themes */}
        <text
          x="0"
          y={nodeSize + 15}
          text-anchor="middle"
          fill="rgba(255,255,255,0.9)"
          font-size="11"
          font-weight="bold"
          class="node-label-shadow dark:fill-gray-800"
          style={{
            opacity: "var(--shadow-opacity, 0.4)",
            transform: "translate(0.5px, 0.5px)",
            filter: "blur(0.5px)",
            "--shadow-opacity": "0.2",
          }}
        >
          {node.label}
        </text>
      </g>
    );
  } catch (e) {
    // If there's an error rendering the icon, fall back to basic node
    return renderBasicNode(node, definition.color);
  }
});

/**
 * Render a basic node without an icon
 */
function renderBasicNode(node: GraphNode, color?: string) {
  const nodeSize = node.size || 22;

  return (
    <g transform={`translate(${node.x}, ${node.y})`}>
      {/* Node highlight/background */}
      <circle
        r={nodeSize}
        fill={`${node.color || color || "rgb(251 191 36)"}33`}
        class="node-highlight"
      />

      {/* Node circle */}
      <circle r={nodeSize - 4} fill={node.color || color || "rgb(251 191 36)"} />

      {/* Node label with enhanced theme support */}
      <text
        x="0"
        y={nodeSize + 15}
        text-anchor="middle"
        fill={node.color || color || "rgb(245 158 11)"} // Use theme-aware default
        font-size="11"
        font-weight="bold"
        class="node-label"
        style={{
          textShadow: "0 0 3px rgba(0,0,0,0.5)",
          filter: "var(--text-shadow-light)",
        }}
      >
        {node.label}
      </text>

      {/* Enhanced shadow text for better contrast across themes */}
      <text
        x="0"
        y={nodeSize + 15}
        text-anchor="middle"
        fill="rgba(255,255,255,0.9)"
        font-size="11"
        font-weight="bold"
        class="node-label-shadow dark:fill-gray-800"
        style={{
          opacity: "var(--shadow-opacity, 0.4)",
          transform: "translate(0.5px, 0.5px)",
          filter: "blur(0.5px)",
        }}
      >
        {node.label}
      </text>
    </g>
  );
}

export default NodeRenderer;
