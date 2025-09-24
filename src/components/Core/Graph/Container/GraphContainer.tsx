import { $, component$, useSignal, useVisibleTask$, Slot } from "@builder.io/qwik";
import type { CSSProperties, GraphConfig } from "../types";
import { GraphLegend } from "./GraphLegend";
import { LuX } from "@qwikest/icons/lucide";

// Default config values
export const defaultConfig = {
  width: "100%",
  height: "26rem", // 416px to accommodate larger graphs
  expandOnHover: false,
  expandOnClick: true,
  maxExpandedWidth: "90vw",
  maxExpandedHeight: "80vh",
  animationDuration: 500,
  showLegend: true,
  showDomesticLegend: true,
  legendItems: [],
  viewBox: "0 0 500 420", // Updated to accommodate typical node coordinates
  preserveAspectRatio: "xMidYMid meet",
};

/**
 * Container component for the Graph that handles expansion, styling, and layout
 */
export const GraphContainer = component$<{
  title?: string;
  config?: GraphConfig;
  connections: any[];
}>((props) => {
  const { title, config, connections } = props;
  const mergedConfig = { ...defaultConfig, ...config };

  // State for expanded mode and touch detection
  const isExpanded = useSignal(false);
  const isTouch = useSignal(false);

  // Detect touch device for better UX
  useVisibleTask$(() => {
    isTouch.value = window.matchMedia(
      "(hover: none) and (pointer: coarse)",
    ).matches;
  });

  // Handle expand
  const handleExpand = $(() => {
    isExpanded.value = true;
    document.body.style.overflow = "hidden";
  });

  // Handle collapse
  const handleCollapse = $(() => {
    isExpanded.value = false;
    document.body.style.overflow = "";
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
        "topology-container relative h-96 transition-all duration-500 ease-in-out": true,
        expanded: isExpanded.value,
      }}
      style={graphContainerStyle as any}
      tabIndex={0}
      onClick$={() => {
        if (!isExpanded.value && mergedConfig.expandOnClick) handleExpand();
      }}
      onKeyDown$={(e) => {
        if ((e.key === "Enter" || e.key === " ") && !isExpanded.value && mergedConfig.expandOnClick) {
          handleExpand();
        }
        if ((e.key === "Escape" || e.key === "Esc") && isExpanded.value) {
          handleCollapse();
        }
      }}
      aria-expanded={isExpanded.value}
      role="region"
      aria-label={title || "Network Graph"}
    >
      <div class="network-graph relative h-full w-full rounded-xl bg-amber-50/50 p-5 shadow-sm transition-all duration-500 ease-in-out dark:border dark:border-gray-800 dark:bg-gray-900/95">
      {/* Graph header with title, legend, and close icon button (when expanded) */}
      <div
        class={`graph-header mb-4 ${isExpanded.value ? "expanded-header" : "relative items-center justify-between hidden"}`}
      >
        {/* Centered legend and title */}
        <div
          class={`legend-center flex w-full flex-col items-center ${isExpanded.value ? "absolute left-1/2 top-6 z-10 -translate-x-1/2" : ""}`}
          style={isExpanded.value ? "pointer-events: auto;" : ""}
        >
          <span class="mb-1 text-sm font-medium text-amber-800 dark:text-secondary-300">
            {title || "Network Graph"}
          </span>
          <GraphLegend
            connections={connections}
            customLegendItems={mergedConfig.legendItems}
            showLegend={mergedConfig.showLegend}
            showDomesticLegend={mergedConfig.showDomesticLegend}
          />
        </div>
        {/* Close icon button - visible when expanded, top right of expanded graph */}
        {isExpanded.value && (
          <button
            class="close-graph-btn absolute right-4 top-4 z-20 rounded-full bg-amber-100 p-2 text-amber-800 shadow-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            onClick$={$((e) => {
              e.stopPropagation();
              handleCollapse();
            })}
            aria-label="Close expanded network graph"
            tabIndex={0}
            type="button"
          >
            <LuX class="h-6 w-6" />
          </button>
        )}
      </div>

      {/* Network topology visualization with expandable height */}
      <div class="topology-content relative flex h-80 items-center justify-center transition-all duration-500 ease-in-out">
        <Slot />
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
        
        /* Adjust animation speed when expanded */
        .topology-container.expanded .node-highlight {
          animation-duration: 3s;
        }
        
        .topology-container.expanded circle {
          animation-duration: 3s;
        }
        
        /* Apply secondary color to traffic paths in dark mode */
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
});

export default GraphContainer;
