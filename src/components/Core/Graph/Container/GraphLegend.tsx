import { component$ } from "@builder.io/qwik";
import type { GraphConnection, LegendItem } from "../types";

/**
 * Component that renders a legend for the graph based on connections or custom legend items
 */
export const GraphLegend = component$<{ 
  connections: GraphConnection[]; 
  customLegendItems?: LegendItem[];
  showLegend: boolean;
}>((props) => {
  const { connections, customLegendItems, showLegend } = props;
  
  if (!showLegend) {
    return null;
  }
  
  // If custom legend items are provided, use those
  if (customLegendItems && customLegendItems.length > 0) {
    return (
      <div class="graph-legend flex flex-wrap gap-2 mt-2">
        {customLegendItems.map((item, index) => (
          <div key={`legend-${index}`} class="flex items-center gap-2">
            <div class="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span class="text-xs text-text-secondary dark:text-text-dark-secondary">{item.label}</span>
          </div>
        ))}
      </div>
    );
  }
  
  // Otherwise, automatically generate legend from connections
  const uniqueColors = new Map<string, string>();
  const uniqueConnectionTypes = new Map<string, string>();
  
  connections.forEach(conn => {
    if (conn.color && conn.connectionType) {
      uniqueConnectionTypes.set(conn.connectionType, conn.color);
    } else if (conn.color && conn.trafficType) {
      uniqueColors.set(conn.trafficType, conn.color);
    } else if (conn.color) {
      uniqueColors.set(conn.label || 'Connection', conn.color);
    }
  });
  
  // Convert Maps to arrays for rendering
  const connectionTypeEntries = Array.from(uniqueConnectionTypes.entries());
  const colorEntries = Array.from(uniqueColors.entries());
  
  return (
    <div class="graph-legend flex flex-wrap gap-2 mt-2">
      {/* Render connection types */}
      {connectionTypeEntries.map(([type, color]) => (
        <div key={`legend-conn-${type}`} class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <span class="text-xs text-text-secondary dark:text-text-dark-secondary">{type}</span>
        </div>
      ))}
      
      {/* Render traffic types */}
      {colorEntries.map(([type, color]) => (
        <div key={`legend-traffic-${type}`} class="flex items-center gap-2">
          <div class="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
          <span class="text-xs text-text-secondary dark:text-text-dark-secondary">{type}</span>
        </div>
      ))}
    </div>
  );
});

export default GraphLegend; 