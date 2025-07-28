import { component$ } from "@builder.io/qwik";
import type { GraphConnection } from "../types";

/**
 * Component that renders SVG markers for connection arrows
 */
export const ConnectionMarkers = component$<{
  connections: GraphConnection[];
}>((props) => {
  return (
    <defs>
      {props.connections.map((connection) => {
        if (!connection.arrowHead && connection.arrowHead !== undefined) {
          return null;
        }

        const id = connection.id || `${connection.from}-${connection.to}`;
        const markerId = `arrow-${id}`;
        const color = connection.color || "#94a3b8"; // Default: slate-400

        return (
          <marker
            key={markerId}
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
        );
      })}
    </defs>
  );
});

export default ConnectionMarkers;
