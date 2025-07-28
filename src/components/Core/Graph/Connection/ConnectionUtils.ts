import type { ConnectionType, GraphConnection } from "../types";

// Colors for different connection types
export const connectionColors = {
  Ethernet: "#3b82f6", // Blue-500
  Wireless: "#8b5cf6", // Violet-500
  LTE: "#ec4899", // Pink-500
  Satellite: "#06b6d4", // Cyan-500
  DSL: "#f97316", // Orange-500
  Fiber: "#22c55e", // Green-500
};

// Line styles for different connection types
export const connectionStyles = {
  Ethernet: { dashed: false, width: 2 },
  Wireless: { dashed: true, width: 2 },
  LTE: { dashed: true, width: 1.5 },
  Satellite: { dashed: true, width: 1 },
  DSL: { dashed: false, width: 1.5 },
  Fiber: { dashed: false, width: 3 },
};

/**
 * Get the style properties for a specific connection type
 */
export const getConnectionStyle = (connectionType?: ConnectionType) => {
  if (!connectionType || !connectionStyles[connectionType]) {
    return { dashed: false, width: 2 }; // Default style
  }
  return connectionStyles[connectionType];
};

/**
 * Get the color for a specific connection type
 */
export const getConnectionColor = (connectionType?: ConnectionType): string => {
  if (!connectionType || !connectionColors[connectionType]) {
    return "#64748b"; // Default color (slate-500)
  }
  return connectionColors[connectionType];
};

/**
 * Apply connection type styling to a connection
 */
export const applyConnectionStyling = (
  connection: GraphConnection,
): GraphConnection => {
  if (!connection.connectionType || connection.color) {
    // If no connection type or color already set, return as is
    return connection;
  }

  const color = getConnectionColor(connection.connectionType);
  const style = getConnectionStyle(connection.connectionType);

  return {
    ...connection,
    color: color,
    dashed: style.dashed,
    width: style.width,
    animated: connection.animated !== undefined ? connection.animated : true,
    packetColors: connection.packetColors || [color],
    // Add connection type to label if none provided
    label: connection.label || `${connection.connectionType}`,
  };
};

/**
 * Process all connections to apply connection type styling
 */
export const processConnectionTypes = (
  connections: GraphConnection[],
): GraphConnection[] => {
  return connections.map(applyConnectionStyling);
};

// Icon codes for SVG path data for connection types
export const connectionIcons = {
  Ethernet:
    "M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6",
  Wireless:
    "M8.111 16.404a5.5 5.5 0 0 1 7.778 0M12 12a9 9 0 0 1 6.364 2.636M12 8c2.648 0 5.195.89 7.272 2.545",
  LTE: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z",
  Satellite:
    "M19 21a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h3a2 2 0 0 1 2 2z",
  DSL: "M12 19l7-7 3 3-7 7-3-3z M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z",
  Fiber:
    "M9.663 17h4.673M12 3v1m0 16v1m-8-8h1m16 0h1M4.6 4.6l.7.7m12.4-.7l-.7.7m-.7 12.4l.7.7M5.3 16.7l.7-.7",
};

export default {
  connectionColors,
  connectionStyles,
  getConnectionColor,
  getConnectionStyle,
  applyConnectionStyling,
  processConnectionTypes,
  connectionIcons,
};
