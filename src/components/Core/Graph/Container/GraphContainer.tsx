import { $, component$, useSignal } from "@builder.io/qwik";
import type { CSSProperties, GraphConfig } from "../types";
import { GraphLegend } from "./GraphLegend";

// Default config values
export const defaultConfig = {
  width: "100%",
  height: "300px",
  expandOnHover: true,
  maxExpandedWidth: "90vw",
  maxExpandedHeight: "80vh",
  animationDuration: 300,
  showLegend: true,
  legendItems: [],
  viewBox: "0 0 1000 500",
  preserveAspectRatio: "xMidYMid meet"
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
  
  // Calculate dynamic styling
  const graphContainerStyle: CSSProperties = {
    width: mergedConfig.width,
    height: isExpanded.value ? mergedConfig.maxExpandedHeight : mergedConfig.height,
    transition: `height ${mergedConfig.animationDuration}ms ease-in-out`,
    borderRadius: '0.75rem',
    overflow: 'hidden',
    position: 'relative'
  };
  
  return (
    <div 
      class={{
        "graph-container relative bg-background dark:bg-background-dark": true,
        "expanded": isExpanded.value
      }}
      style={graphContainerStyle as any}
    >
      {/* Graph title */}
      {title && (
        <div class="graph-title p-3 font-medium text-text dark:text-text-dark-default">
          {title}
          {isExpanded.value && 
            <GraphLegend 
              connections={connections} 
              customLegendItems={mergedConfig.legendItems} 
              showLegend={mergedConfig.showLegend} 
            />
          }
        </div>
      )}
      
      {/* SVG Graph */}
      <div style={{ height: title ? "calc(100% - 3rem)" : "100%" }}>
        {children}
      </div>
      
      {/* Expand/collapse button */}
      <button 
        class="absolute bottom-3 right-3 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 shadow-sm text-slate-700 dark:text-white"
        onClick$={toggleExpand}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          class="w-5 h-5"
        >
          {isExpanded.value ? (
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4M12 4v16" />
          ) : (
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          )}
        </svg>
      </button>
      
      {/* Graph component styles */}
      <style>
        {`
          .graph-container {
            transition: all ${mergedConfig.animationDuration}ms ease-in-out;
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
            transition: r 0.2s ease-in-out;
          }
          
          .graph-container:hover .node-highlight {
            r: calc(var(--node-size, 20) * 1.1);
          }
          
          .connection-path {
            transition: stroke-width 0.2s ease-in-out;
          }
          
          .connection-path:hover {
            stroke-width: calc(var(--connection-width, 2) * 1.5);
          }
        `}
      </style>
    </div>
  );
});

export default GraphContainer; 