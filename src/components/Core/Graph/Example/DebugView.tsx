import { component$ } from "@builder.io/qwik";
import type { GraphNode, GraphConnection } from "../types";

/**
 * Component to debug graph node and connection data
 */
export const GraphDebugView = component$<{
  nodes: GraphNode[];
  connections: GraphConnection[];
}>((props) => {
  const { nodes, connections } = props;

  return (
    <div class="mb-4 max-h-80 overflow-auto rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="mb-2 text-sm font-semibold">Graph Debug Info</h3>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h4 class="mb-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
            Nodes ({nodes.length})
          </h4>
          <div class="max-h-40 overflow-auto rounded bg-white p-2 text-xs dark:bg-gray-700">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="p-1 text-left">ID</th>
                  <th class="p-1 text-left">Type</th>
                  <th class="p-1 text-left">Position</th>
                  <th class="p-1 text-left">Label</th>
                </tr>
              </thead>
              <tbody>
                {nodes.map((node) => (
                  <tr
                    key={node.id}
                    class="hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td class="p-1">{node.id}</td>
                    <td class="p-1">{node.type}</td>
                    <td class="p-1">
                      ({node.x}, {node.y})
                    </td>
                    <td class="p-1">{node.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h4 class="mb-1 text-xs font-semibold text-green-600 dark:text-green-400">
            Connections ({connections.length})
          </h4>
          <div class="max-h-40 overflow-auto rounded bg-white p-2 text-xs dark:bg-gray-700">
            <table class="w-full">
              <thead>
                <tr>
                  <th class="p-1 text-left">From</th>
                  <th class="p-1 text-left">To</th>
                  <th class="p-1 text-left">Type</th>
                  <th class="p-1 text-left">Color</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((conn) => (
                  <tr
                    key={`${conn.from}-${conn.to}`}
                    class="hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <td class="p-1">{conn.from}</td>
                    <td class="p-1">{conn.to}</td>
                    <td class="p-1">
                      {conn.connectionType || conn.trafficType || "Default"}
                    </td>
                    <td class="p-1">
                      <div
                        class="mr-1 inline-block h-4 w-4"
                        style={{ backgroundColor: conn.color }}
                      ></div>
                      {conn.color}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h4 class="mb-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
          SVG ViewBox Debug
        </h4>
        <div class="rounded-lg border border-dashed border-gray-300 p-4 dark:border-gray-600">
          <svg
            width="100%"
            height="150px"
            viewBox="0 0 500 200"
            style={{ backgroundColor: "rgba(0,0,0,0.03)" }}
          >
            {/* Grid */}
            <g>
              {Array.from({ length: 11 }).map((_, i) => (
                <line
                  key={`vgrid-${i}`}
                  x1={i * 50}
                  y1="0"
                  x2={i * 50}
                  y2="200"
                  stroke="#ddd"
                  stroke-width="1"
                  stroke-dasharray="2,2"
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`hgrid-${i}`}
                  x1="0"
                  y1={i * 50}
                  x2="500"
                  y2={i * 50}
                  stroke="#ddd"
                  stroke-width="1"
                  stroke-dasharray="2,2"
                />
              ))}
            </g>

            {/* Debug Node points */}
            {nodes.map((node) => (
              <g key={`debug-${node.id}`}>
                <circle cx={node.x} cy={node.y} r="5" fill="red" />
                <text
                  x={node.x}
                  y={node.y - 10}
                  text-anchor="middle"
                  fill="black"
                  font-size="10"
                >
                  {node.label}
                </text>
              </g>
            ))}

            {/* Debug Connections */}
            {connections.map((conn) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              return (
                <line
                  key={`debug-${conn.from}-${conn.to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke="blue"
                  stroke-width="1"
                  stroke-dasharray="3,3"
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
});

export default GraphDebugView;
