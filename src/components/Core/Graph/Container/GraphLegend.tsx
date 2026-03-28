import { component$ } from "@builder.io/qwik";
import type { GraphConnection, LegendItem } from "../types";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

/**
 * Component that renders a legend for the graph based on connections or custom legend items
 */
export const GraphLegend = component$<{
  connections: GraphConnection[];
  customLegendItems?: LegendItem[];
  showLegend: boolean;
  showDomesticLegend?: boolean;
}>((props) => {
  const locale = useMessageLocale();
  const { customLegendItems, showLegend, showDomesticLegend = true } = props;

  if (!showLegend) {
    return null;
  }

  // Default legend items for NetworkTopologyGraph style
  const defaultLegendItems = [
    {
      color: "rgb(251 191 36)",
      label: semanticMessages.star_network_topology_traffic_path(
        {},
        { locale },
      ),
    }, // amber-500
    ...(showDomesticLegend
      ? [
          {
            color: "rgb(16, 185, 129)",
            label: semanticMessages.game_network_domestic({}, { locale }),
          },
        ]
      : []), // emerald-500
    {
      color: "rgb(168, 85, 247)",
      label: semanticMessages.game_network_foreign({}, { locale }),
    }, // purple-500
  ];

  // Use custom legend items if provided, otherwise use defaults
  const legendItems =
    customLegendItems && customLegendItems.length > 0
      ? customLegendItems
      : defaultLegendItems;

  return (
    <div class="flex items-center space-x-3">
      {legendItems.map((item, index) => (
        <div key={`legend-${index}`} class="flex items-center">
          <div
            class="mr-1.5 h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          ></div>
          <span class="text-xs text-amber-800 dark:text-secondary-300">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );

  // This code path is now handled above
  // Return null as fallback (shouldn't reach here)
  return null;
});

export default GraphLegend;
