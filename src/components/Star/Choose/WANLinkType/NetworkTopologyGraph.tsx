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
    const dialogRef = useSignal<HTMLDialogElement>();

    useVisibleTask$(({ track, cleanup }) => {
      track(() => isExpanded.value);
      track(() => dialogRef.value);

      const dialog = dialogRef.value;

      if (!dialog) {
        return;
      }

      if (isExpanded.value) {
        if (!dialog.open) {
          dialog.showModal();
        }
      } else if (dialog.open) {
        dialog.close();
      }

      if (!isExpanded.value) {
        return;
      }

      const previousOverflow = document.body.style.overflow;
      const previousOverscrollBehavior = document.body.style.overscrollBehavior;
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape" || event.key === "Esc") {
          isExpanded.value = false;
        }
      };

      document.body.style.overflow = "hidden";
      document.body.style.overscrollBehavior = "contain";
      window.addEventListener("keydown", onKeyDown);

      cleanup(() => {
        document.body.style.overflow = previousOverflow;
        document.body.style.overscrollBehavior = previousOverscrollBehavior;
        window.removeEventListener("keydown", onKeyDown);
      });
    });

    // Handlers
    const handleExpand = $(() => {
      isExpanded.value = true;
    });
    const handleCollapse = $(() => {
      isExpanded.value = false;
    });
    const stopPropagation = $((event: Event) => {
      event.stopPropagation();
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

    const renderGraphSurface = (expanded: boolean) => (
      <div
        class={[
          "network-graph rounded-xl dark:border dark:border-gray-800 dark:bg-gray-900/95",
          expanded
            ? "expanded-graph h-full w-full overflow-hidden border border-amber-200/70 bg-amber-50/95 p-6 shadow-[0_32px_80px_-24px_rgba(15,23,42,0.65)] sm:p-8"
            : "preview-graph relative h-full w-full overflow-hidden bg-amber-50/50 p-5 shadow-sm",
        ].join(" ")}
      >
        {expanded && (
          <div class="graph-header expanded-header mb-4 flex min-h-[72px] items-start justify-center">
            <div class="legend-center flex max-w-[calc(100%-5rem)] flex-col items-center gap-2 rounded-xl bg-amber-50/95 px-4 py-3 text-center shadow-[0_10px_35px_-22px_rgba(15,23,42,0.45)] dark:border dark:border-gray-700/60 dark:bg-gray-900/95 sm:px-6">
              <span class="text-sm font-medium text-amber-800 dark:text-secondary-300">
                {title}
              </span>
              <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                <div class="flex items-center">
                  <div class="mr-1.5 h-2.5 w-2.5 rounded-full bg-amber-500 dark:bg-secondary-500"></div>
                  <span class="text-xs text-amber-800 dark:text-secondary-300">
                    {$localize`Traffic Path`}
                  </span>
                </div>
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

            <button
              class="close-graph-btn absolute right-0 top-0 rounded-full bg-amber-100 p-2 text-amber-800 shadow-md transition-colors hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              onClick$={$((event) => {
                event.stopPropagation();
                handleCollapse();
              })}
              aria-label={$localize`Close expanded network graph`}
              tabIndex={0}
              type="button"
            >
              <LuX class="h-6 w-6" />
            </button>
          </div>
        )}

        <div
          class={[
            "topology-content relative flex items-center justify-center",
            expanded
              ? "h-[calc(100%-5.5rem)] min-h-[280px] sm:min-h-[360px]"
              : "h-24",
          ].join(" ")}
        >
          <svg
            class="h-full w-full"
            viewBox="0 0 400 200"
            preserveAspectRatio="xMidYMid meet"
          >
            {connections.map((conn, index) => {
              const fromNode = nodes[conn.from];
              const toNode = nodes[conn.to];

              if (!fromNode || !toNode) {
                console.warn(
                  `NetworkTopologyGraph: Missing node for connection ${conn.from} -> ${conn.to}`,
                );
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

              const lineColor = conn.color;
              const domesticPacketColor = "rgb(16, 185, 129)";
              const foreignPacketColor = "rgb(168, 85, 247)";
              const packetColor = conn.isDomestic
                ? domesticPacketColor
                : foreignPacketColor;
              const destinations = findDestinationTypes(conn);

              return (
                <g key={`conn-${index}`}>
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

                  <polygon
                    points={arrowPoints}
                    fill={lineColor}
                    class="traffic-path-arrow"
                  />

                  {destinations.hasDomestic && (
                    <>
                      <circle r="3" fill={domesticPacketColor} opacity="0.9">
                        <animateMotion
                          path={`M${x1},${y1} L${x2},${y2}`}
                          dur={`${2 + index * 0.5}s`}
                          repeatCount="indefinite"
                          rotate="auto"
                        />
                      </circle>
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

                  {destinations.hasForeign && (
                    <>
                      <circle r="3" fill={foreignPacketColor} opacity="0.9">
                        <animateMotion
                          path={`M${x1},${y1} L${x2},${y2}`}
                          dur={`${2 + index * 0.5}s`}
                          begin="0.3s"
                          repeatCount="indefinite"
                          rotate="auto"
                        />
                      </circle>
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

                  {!(conn.from === 0 && conn.to === 1) && (
                    <>
                      <circle r="3" fill={packetColor} opacity="0.9">
                        <animateMotion
                          path={`M${x1},${y1} L${x2},${y2}`}
                          dur={`${2 + index * 0.5}s`}
                          repeatCount="indefinite"
                          rotate="auto"
                        />
                      </circle>
                      <circle r="2" fill={packetColor} opacity="0.7">
                        <animateMotion
                          path={`M${x1},${y1} L${x2},${y2}`}
                          dur={`${2 + index * 0.5}s`}
                          begin={`${0.7 + index * 0.2}s`}
                          repeatCount="indefinite"
                          rotate="auto"
                        />
                      </circle>
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

            {nodes.map((node, index) => (
              <g key={index} transform={`translate(${node.x}, ${node.y})`}>
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
    );

    return (
      <div
        class={`topology-container relative h-44 cursor-zoom-in${isExpanded.value ? " overlay-open" : ""}`}
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
        <div class="preview-shell h-full w-full">
          {renderGraphSurface(false)}
        </div>

        {isExpanded.value && (
          <dialog
            ref={dialogRef}
            class="expanded-graph-dialog"
            aria-label={title}
            onClick$={$((event) => {
              if (event.target === dialogRef.value) {
                handleCollapse();
              }
            })}
            onCancel$={$((event) => {
              event.preventDefault();
              handleCollapse();
            })}
          >
            <div
              class="expanded-graph-overlay flex min-h-screen w-screen items-center justify-center p-4 sm:p-6"
            >
              <div
                class="expanded-graph-backdrop absolute inset-0 bg-slate-950/55 backdrop-blur-[2px]"
                onClick$={handleCollapse}
              />
              <div
                class="expanded-graph-panel relative z-10 h-[min(80vh,600px)] w-[min(90vw,800px)]"
                onClick$={stopPropagation}
              >
                {renderGraphSurface(true)}
              </div>
            </div>
          </dialog>
        )}

        {/* Add CSS directly inside component */}
        <style
          dangerouslySetInnerHTML={`
        .topology-container {
          z-index: 1;
          overflow: visible;
        }
        .preview-graph {
          transition: transform 220ms ease-out, box-shadow 220ms ease-out, opacity 220ms ease-out;
        }
        .topology-container:not(.expanded):hover .preview-graph {
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 18px 30px -18px rgba(15, 23, 42, 0.35);
        }
        .topology-content {
          transition: height 280ms ease-out, opacity 220ms ease-out, transform 280ms ease-out;
        }
        .expanded-graph-dialog {
          margin: 0;
          height: 100vh;
          width: 100vw;
          max-height: none;
          max-width: none;
          border: none;
          padding: 0;
          background: transparent;
          overflow: visible;
        }
        .expanded-graph-dialog::backdrop {
          background: transparent;
        }
        .expanded-graph-overlay {
          animation: overlayFadeIn 220ms ease-out;
        }
        .expanded-graph-backdrop {
          animation: overlayBackdropIn 220ms ease-out;
        }
        .expanded-graph-panel {
          transform-origin: center;
          animation: overlayPanelIn 280ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .dark .expanded-graph {
          background-color: rgb(17, 24, 39, 0.98);
          border-color: rgb(55, 65, 81);
        }

        .node-highlight {
          animation: pulse 2s infinite ease-in-out;
        }

        @keyframes pulse {
          0% { opacity: 0.3; r: 20; }
          50% { opacity: 0.6; r: 22; }
          100% { opacity: 0.3; r: 20; }
        }

        @keyframes overlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes overlayBackdropIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes overlayPanelIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .expanded-graph .node-highlight {
          animation-duration: 3s;
        }

        .expanded-graph circle {
          animation-duration: 3s;
        }

        .dark .traffic-path {
          stroke: #4972ba !important;
          stroke-opacity: 1 !important;
          stroke-width: 3px !important;
        }

        .dark .traffic-path-arrow {
          fill: #4972ba !important;
        }
      `}
        />
      </div>
    );
  },
);
