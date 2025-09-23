import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import {
  LuGlobe,
  LuGlobe2,
  LuLaptop,
  LuWifi,
  LuServer,
  LuX,
} from "@qwikest/icons/lucide";

export interface NetworkTopologyNode {
  type: "laptop" | "wifi" | "globe" | "globe2" | "server";
  x: number;
  y: number;
  label: string;
}

export interface NetworkTopologyConnection {
  from: number;
  to: number;
  color: string;
  isDomestic?: boolean;
}

export interface NetworkTopologyGraphProps {
  nodes: NetworkTopologyNode[];
  connections: NetworkTopologyConnection[];
  title?: string;
  showDomesticLegend?: boolean;
}

export const NetworkTopologyGraph = component$(
  (props: NetworkTopologyGraphProps) => {
    const {
      nodes,
      connections,
      title = $localize`Network Topology`,
      showDomesticLegend = true,
    } = props;

    // Add expanded state
    const isExpanded = useSignal(false);
    const isTouch = useSignal(false);

    // Detect touch device for better UX
    useVisibleTask$(() => {
      isTouch.value = window.matchMedia(
        "(hover: none) and (pointer: coarse)",
      ).matches;
    });

    // Handlers
    const handleExpand = $(() => {
      isExpanded.value = true;
    });
    const handleCollapse = $(() => {
      isExpanded.value = false;
    });

    const renderNodeIcon = (type: string) => {
      switch (type) {
        case "laptop":
          return (
            <LuLaptop class="h-8 w-8 text-amber-600 dark:text-secondary-400" />
          );
        case "wifi":
          return (
            <LuWifi class="h-8 w-8 text-amber-600 dark:text-secondary-400" />
          );
        case "globe":
          return (
            <LuGlobe class="h-8 w-8 text-amber-600 dark:text-secondary-400" />
          );
        case "globe2":
          return (
            <LuGlobe2 class="h-8 w-8 text-amber-600 dark:text-secondary-400" />
          );
        case "server":
          return (
            <LuServer class="h-8 w-8 text-amber-600 dark:text-secondary-400" />
          );
        default:
          return null;
      }
    };

    const findDestinationTypes = (connection: NetworkTopologyConnection) => {
      const destinationTypes = { hasDomestic: false, hasForeign: false };

      if (connection.from === 0 && connection.to === 1) {
        connections.forEach((conn) => {
          if (conn.from === 1) {
            const nextNodeIndex = conn.to;

            connections.forEach((subConn) => {
              if (subConn.from === nextNodeIndex) {
                if (subConn.isDomestic === true) {
                  destinationTypes.hasDomestic = true;
                } else if (subConn.isDomestic === false) {
                  destinationTypes.hasForeign = true;
                }
              }
            });
          }
        });
      }

      if (connection.from === 1 && connection.to === 2) {
        connections.forEach((conn) => {
          if (conn.from === 2) {
            if (conn.isDomestic === true) {
              destinationTypes.hasDomestic = true;
            } else if (conn.isDomestic === false) {
              destinationTypes.hasForeign = true;
            }
          }
        });
      }

      return destinationTypes;
    };

    return (
      <div
        class={`topology-container relative h-44${isExpanded.value ? " expanded" : ""}`}
        tabIndex={0}
        onClick$={() => {
          if (!isExpanded.value) handleExpand();
        }}
        onKeyDown$={(e) => {
          if ((e.key === "Enter" || e.key === " ") && !isExpanded.value) {
            handleExpand();
          }
          if ((e.key === "Escape" || e.key === "Esc") && isExpanded.value) {
            handleCollapse();
          }
        }}
        aria-expanded={isExpanded.value}
        role="region"
        aria-label={title}
      >
        <div class="network-graph relative h-full w-full rounded-xl bg-amber-50/50 p-5 shadow-sm transition-all duration-500 ease-in-out dark:border dark:border-gray-800 dark:bg-gray-900/95">
          {/* Graph header with title, legend, and close icon button (when expanded) */}
          <div
            class={`graph-header mb-4 hidden ${isExpanded.value ? "expanded-header" : "relative items-center justify-between"}`}
          >
            {/* Centered legend and title */}
            <div
              class={`legend-center flex w-full flex-col items-center ${isExpanded.value ? "absolute left-1/2 top-6 z-10 -translate-x-1/2" : ""}`}
              style={isExpanded.value ? "pointer-events: auto;" : ""}
            >
              <span class="mb-1 text-sm font-medium text-amber-800 dark:text-secondary-300">
                {title}
              </span>
              <div class="flex items-center space-x-3">
                <div class="flex items-center">
                  <div class="mr-1.5 h-2.5 w-2.5 rounded-full bg-amber-500 dark:bg-secondary-500"></div>
                  <span class="text-xs text-amber-800 dark:text-secondary-300">
                    {$localize`Traffic Path`}
                  </span>
                </div>
                {/* Add legend for domestic and foreign connections */}
                {showDomesticLegend && (
                  <div class="flex items-center">
                    <div class="mr-1.5 h-2.5 w-2.5 rounded-full bg-emerald-500"></div>
                    <span class="text-xs text-amber-800 dark:text-emerald-300">
                      {$localize`Domestic`}
                    </span>
                  </div>
                )}
                <div class="flex items-center">
                  <div class="mr-1.5 h-2.5 w-2.5 rounded-full bg-purple-500"></div>
                  <span class="text-xs text-amber-800 dark:text-purple-300">
                    {$localize`Foreign`}
                  </span>
                </div>
              </div>
            </div>
            {/* Close icon button - visible when expanded, top right of expanded graph */}
            {isExpanded.value && (
              <button
                class="close-graph-btn absolute right-4 top-4 z-20 rounded-full bg-amber-100 p-2 text-amber-800 shadow-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick$={$((e) => {
                  e.stopPropagation();
                  handleCollapse();
                })}
                aria-label={$localize`Close expanded network graph`}
                tabIndex={0}
                type="button"
              >
                <LuX class="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Network topology visualization with expandable height on hover */}
          <div class="topology-content relative flex h-24 items-center justify-center transition-all duration-500 ease-in-out">
            {/* SVG-based network topology graph */}
            <svg
              class="h-full w-full"
              viewBox="0 0 400 200"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Render connections between nodes with animated lines */}
              {connections.map((conn, index) => {
                const fromNode = nodes[conn.from];
                const toNode = nodes[conn.to];
                
                // Safety check: skip rendering if nodes don't exist
                if (!fromNode || !toNode) {
                  console.warn(`NetworkTopologyGraph: Missing node for connection ${conn.from} -> ${conn.to}`);
                  return null;
                }
                
                const x1 = fromNode.x + 16;
                const y1 = fromNode.y;
                const x2 = toNode.x - 16;
                const y2 = toNode.y;

                let arrowPoints = "";
                if (y1 === y2) {
                  arrowPoints = `${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 10},${y2 + 5}`;
                } else if (x1 < x2 && y1 < y2) {
                  arrowPoints = `${x2},${y2} ${x2 - 10},${y2 - 5} ${x2 - 3},${y2 - 12}`;
                } else if (x1 < x2 && y1 > y2) {
                  arrowPoints = `${x2},${y2} ${x2 - 10},${y2 + 5} ${x2 - 3},${y2 + 12}`;
                }

                // Use the connection color from props (amber in light mode)
                const lineColor = conn.color;
                // Modern color palette with better visibility in dark mode
                const domesticPacketColor = "rgb(16, 185, 129)"; // Emerald-500
                const foreignPacketColor = "rgb(168, 85, 247)"; // Purple-500

                const packetColor = conn.isDomestic
                  ? domesticPacketColor
                  : foreignPacketColor;

                const destinations = findDestinationTypes(conn);

                return (
                  <g key={`conn-${index}`}>
                    {/* Path for dashed line */}
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={lineColor}
                      class="traffic-path"
                      stroke-width="2.5"
                      stroke-dasharray="4,3"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="8"
                        to="0"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </line>

                    {/* Arrow pointing to destination node */}
                    <polygon
                      points={arrowPoints}
                      fill={lineColor}
                      class="traffic-path-arrow"
                    />

                    {/* For the User to Router connection, render domestic packets */}
                    {destinations.hasDomestic && (
                      <>
                        {/* Domestic packet 1 */}
                        <circle r="3" fill={domesticPacketColor} opacity="0.9">
                          <animateMotion
                            path={`M${x1},${y1} L${x2},${y2}`}
                            dur={`${2 + index * 0.5}s`}
                            repeatCount="indefinite"
                            rotate="auto"
                          />
                        </circle>

                        {/* Domestic packet 2 (offset start) */}
                        <circle r="2" fill={domesticPacketColor} opacity="0.7">
                          <animateMotion
                            path={`M${x1},${y1} L${x2},${y2}`}
                            dur={`${2 + index * 0.5}s`}
                            begin={`${0.7 + index * 0.2}s`}
                            repeatCount="indefinite"
                            rotate="auto"
                          />
                        </circle>
                      </>
                    )}

                    {/* For the User to Router connection, render foreign packets */}
                    {destinations.hasForeign && (
                      <>
                        {/* Foreign packet 1 */}
                        <circle r="3" fill={foreignPacketColor} opacity="0.9">
                          <animateMotion
                            path={`M${x1},${y1} L${x2},${y2}`}
                            dur={`${2 + index * 0.5}s`}
                            begin="0.3s"
                            repeatCount="indefinite"
                            rotate="auto"
                          />
                        </circle>

                        {/* Foreign packet 2 (offset start) */}
                        <circle r="2" fill={foreignPacketColor} opacity="0.7">
                          <animateMotion
                            path={`M${x1},${y1} L${x2},${y2}`}
                            dur={`${2 + index * 0.5}s`}
                            begin={`${1.0 + index * 0.2}s`}
                            repeatCount="indefinite"
                            rotate="auto"
                          />
                        </circle>
                      </>
                    )}

                    {/* For all other connections, render standard packets with appropriate color */}
                    {!(conn.from === 0 && conn.to === 1) && (
                      <>
                        {/* Animated packet 1 */}
                        <circle r="3" fill={packetColor} opacity="0.9">
                          <animateMotion
                            path={`M${x1},${y1} L${x2},${y2}`}
                            dur={`${2 + index * 0.5}s`}
                            repeatCount="indefinite"
                            rotate="auto"
                          />
                        </circle>

                        {/* Animated packet 2 (offset start) */}
                        <circle r="2" fill={packetColor} opacity="0.7">
                          <animateMotion
                            path={`M${x1},${y1} L${x2},${y2}`}
                            dur={`${2 + index * 0.5}s`}
                            begin={`${0.7 + index * 0.2}s`}
                            repeatCount="indefinite"
                            rotate="auto"
                          />
                        </circle>

                        {/* Animated packet 3 (faster and smaller) */}
                        <circle
                          r="1.5"
                          fill="#ffffff"
                          stroke={packetColor}
                          stroke-width="1"
                          opacity="0.8"
                        >
                          <animateMotion
                            path={`M${x1},${y1} L${x2},${y2}`}
                            dur={`${1.5 + index * 0.3}s`}
                            begin={`${1.3 + index * 0.1}s`}
                            repeatCount="indefinite"
                            rotate="auto"
                          />
                        </circle>
                      </>
                    )}
                  </g>
                );
              })}

              {/* Render nodes (devices, routers, servers) */}
              {nodes.map((node, index) => (
                <g key={index} transform={`translate(${node.x}, ${node.y})`}>
                  {/* Node highlight effect */}
                  <circle
                    r="22"
                    fill="rgba(251, 191, 36, 0.2)"
                    class="node-highlight dark:fill-secondary-500/20"
                  />

                  <foreignObject x="-16" y="-16" width="32" height="32">
                    <div class="flex h-8 w-8 items-center justify-center">
                      {renderNodeIcon(node.type)}
                    </div>
                  </foreignObject>
                  <text
                    x="0"
                    y={node.y < 100 ? "-20" : "25"}
                    text-anchor="middle"
                    fill={node.y < 100 ? "#eab308" : "#f59e0b"}
                    class="dark:fill-secondary-300"
                    font-size="11"
                    font-weight="bold"
                  >
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Add CSS directly inside component */}
        <style
          dangerouslySetInnerHTML={`
        .topology-container {
          z-index: 1;
          overflow: visible;
        }
        .graph-header.expanded-header {
          position: static !important;
          display: block !important;
          min-height: 60px;
        }
        .graph-header .legend-center {
          position: static;
          left: unset;
          top: unset;
          transform: none;
        }
        .topology-container.expanded .graph-header.expanded-header .legend-center {
          position: absolute;
          left: 50%;
          top: 24px;
          transform: translateX(-50%);
          z-index: 10;
          width: auto;
          background: rgba(255,251,235,0.95);
          border-radius: 0.75rem;
          padding: 0.5rem 1.5rem;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
        }
        .dark .topology-container.expanded .graph-header.expanded-header .legend-center {
          background: rgba(31, 41, 55, 0.95);
          border: 1px solid rgba(75, 85, 99, 0.4);
          box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.3);
        }
        .topology-container.expanded .graph-header.expanded-header .close-graph-btn {
          z-index: 20;
        }
        .graph-header { position: relative; }
        .graph-header button[type="button"] {
          z-index: 1;
        }

        /* Use .expanded instead of :hover for expanded state */
        .topology-container.expanded .network-graph {
          position: fixed;
          transform: translate(-50%, -50%);
          left: 50%;
          top: 50%;
          width: 90vw;
          max-width: 800px;
          height: 80vh;
          max-height: 600px;
          z-index: 9000 !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          background-color: rgb(255 251 235 / 0.98);
        }
        
        /* Show the graph header when the graph is expanded */
        .topology-container.expanded .graph-header {
          display: flex;
        }
        
        /* Apply a higher z-index to the backdrop overlay */
        .topology-container.expanded::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.4);
          z-index: 8900 !important;
        }
        
        /* Make sure the domestic option has a higher z-index than the foreign option */
        .domestic-option .topology-container.expanded .network-graph {
          z-index: 9100 !important;
        }
        
        .domestic-option .topology-container.expanded::before {
          z-index: 9000 !important;
        }
        
        .dark .topology-container.expanded .network-graph {
          background-color: rgb(17, 24, 39, 0.98);
          border: 1px solid rgb(55, 65, 81);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .topology-container.expanded .topology-content {
          height: calc(80vh - 150px);
          max-height: 450px;
        }
        

        
        /* Node highlight pulse animation */
        .node-highlight {
          animation: pulse 2s infinite ease-in-out;
        }
        
        @keyframes pulse {
          0% { opacity: 0.3; r: 20; }
          50% { opacity: 0.6; r: 22; }
          100% { opacity: 0.3; r: 20; }
        }
        
        /* Adjust animation speed when hovered */
        .topology-container.expanded .node-highlight {
          animation-duration: 3s;
        }
        
        .topology-container.expanded circle {
          animation-duration: 3s;
        }
        
        /* Apply secondary color to traffic paths in dark mode - using Connect's design system secondary color */
        .dark .traffic-path {
          stroke: #4972ba !important; /* Using the exact secondary-500 color from tailwind.config.js */
          stroke-opacity: 1 !important;
          stroke-width: 3px !important;
        }
        
        .dark .traffic-path-arrow {
          fill: #4972ba !important; /* Using the exact secondary-500 color from tailwind.config.js */
        }
      `}
        />
      </div>
    );
  },
);


