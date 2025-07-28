import { $, component$, useSignal } from "@builder.io/qwik";
import type { CSSProperties, GraphConfig } from "../types";
import { GraphLegend } from "./GraphLegend";

// Default config values
export const defaultConfig = {
  width: "100%",
  height: "20rem", // Using Tailwind rem units (320px) instead of hardcoded px
  expandOnHover: true,
  maxExpandedWidth: "90vw",
  maxExpandedHeight: "80vh",
  animationDuration: 300,
  showLegend: true,
  legendItems: [],
  viewBox: "0 0 800 400", // More mobile-friendly aspect ratio
  preserveAspectRatio: "xMidYMid meet",
};

/**
 * Container component for the Graph that handles expansion, styling, and layout
 */
export const GraphContainer = component$<{
  title?: string;
  config?: GraphConfig;
  children?: any;
  connections: any[];
}>((props) => {
  const { title, config, children, connections } = props;
  const mergedConfig = { ...defaultConfig, ...config };

  // State for expanded mode
  const isExpanded = useSignal(false);

  // Toggle expanded state
  const toggleExpand = $(() => {
    isExpanded.value = !isExpanded.value;

    if (isExpanded.value) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  });

  // Calculate dynamic styling using CSS custom properties for better Tailwind integration
  const graphContainerStyle: CSSProperties = {
    "--graph-width": mergedConfig.width,
    "--graph-height": isExpanded.value
      ? mergedConfig.maxExpandedHeight
      : mergedConfig.height,
    "--animation-duration": `${mergedConfig.animationDuration}ms`,
    width: mergedConfig.width,
    height: isExpanded.value
      ? mergedConfig.maxExpandedHeight
      : mergedConfig.height,
  } as any;

  return (
    <div
      class={{
        "graph-container relative overflow-hidden rounded-xl bg-background transition-all ease-in-out dark:bg-background-dark": true,
        expanded: isExpanded.value,
      }}
      style={graphContainerStyle as any}
    >
      {/* Graph title */}
      {title && (
        <div class="graph-title p-3 font-medium text-text dark:text-text-dark-default">
          {title}
          {isExpanded.value && (
            <GraphLegend
              connections={connections}
              customLegendItems={mergedConfig.legendItems}
              showLegend={mergedConfig.showLegend}
            />
          )}
        </div>
      )}

      {/* SVG Graph */}
      <div style={{ height: title ? "calc(100% - 3rem)" : "100%" }}>
        {children}
      </div>

      {/* Expand/collapse button with accessibility and touch-friendly sizing */}
      <button
        class="absolute bottom-3 mobile:bottom-safe right-3 mobile:right-safe-right rounded-full bg-surface-light/90 p-2 touch:p-3 text-gray-700 shadow-sm dark:bg-surface-dark/90 dark:text-gray-200 min-h-[44px] min-w-[44px] touch:min-h-[48px] touch:min-w-[48px] touch-manipulation"
        onClick$={toggleExpand}
        aria-label={isExpanded.value ? "Collapse graph to normal size" : "Expand graph to full screen"}
        aria-expanded={isExpanded.value}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-5 w-5"
        >
          {isExpanded.value ? (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4M12 4v16"
            />
          ) : (
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
            />
          )}
        </svg>
      </button>

      {/* Graph component styles using CSS custom properties and Tailwind-compatible classes */}
      <style>
        {`
          .graph-container {
            transition-duration: var(--animation-duration, ${mergedConfig.animationDuration}ms);
          }
          
          .graph-container.expanded {
            position: fixed !important;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            width: 90vw !important;
            max-width: 1200px !important;
            height: 80vh !important;
            max-height: 800px !important;
            z-index: 50 !important;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
          }
          
          .graph-container.expanded::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: -1;
          }
          
          .node-highlight {
            transition: r 200ms ease-in-out;
          }
          
          .graph-container:hover .node-highlight {
            r: calc(var(--node-size, 20) * 1.1);
          }
          
          .connection-path {
            transition: stroke-width 200ms ease-in-out;
          }
          
          .connection-path:hover {
            stroke-width: calc(var(--connection-width, 2) * 1.5);
          }

          /* Add touch-friendly interactions from Tailwind config */
          @media (hover: none) and (pointer: coarse) {
            .graph-container:hover .node-highlight,
            .connection-path:hover {
              /* Disable hover effects on touch devices */
              transition: none;
            }
          }
        `}
      </style>
    </div>
  );
});

export default GraphContainer;
