import { nodeColors } from "../Node/NodeTypes";
import type { GraphConnection, GraphTrafficType } from "../types";

/**
 * Get the color for a specific traffic type
 */
export const getTrafficColor = (trafficType?: GraphTrafficType): string => {
  switch (trafficType) {
    case "Domestic":
      return nodeColors.domestic;
    case "Foreign":
      return nodeColors.foreign;
    case "Game":
      return nodeColors.gaming;
    case "VPN":
      return nodeColors.vpn;
    default:
      return "#64748b"; // Default slate-500
  }
};

/**
 * Apply traffic type styling to a connection
 * This updates the connection object with appropriate colors and styling based on the traffic type
 */
export const applyTrafficStyling = (
  connection: GraphConnection,
): GraphConnection => {
  if (!connection.trafficType || connection.color) {
    // If no traffic type or color already set, return as is
    return connection;
  }

  const color = getTrafficColor(connection.trafficType);

  return {
    ...connection,
    color: color,
    packetColors: connection.packetColors || [color],
    animated: connection.animated !== undefined ? connection.animated : true,
    label: connection.label || connection.trafficType,
  };
};

/**
 * Process all connections to apply traffic styling
 */
export const processConnections = (
  connections: GraphConnection[],
): GraphConnection[] => {
  return connections.map(applyTrafficStyling);
};

export default { getTrafficColor, applyTrafficStyling, processConnections };
