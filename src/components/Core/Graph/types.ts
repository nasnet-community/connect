import { type QRL } from "@builder.io/qwik";

export type GraphTrafficType =
  | "Domestic"
  | "Foreign"
  | "Game"
  | "VPN"
  | undefined;

export type ConnectionType =
  | "Ethernet"
  | "Wireless"
  | "LTE"
  | "Satellite"
  | "DSL"
  | "Fiber"
  | undefined;

// CSS Properties type for styling
export interface CSSProperties {
  [key: string]: string | number | undefined;
}

export interface GraphNode {
  id: string | number;
  type?: "laptop" | "wifi" | "globe" | "globe2" | "server" | string;
  x: number;
  y: number;
  label: string;
  color?: string;
  size?: number;
}

export interface GraphConnection {
  id?: string | number;
  from: string | number;
  to: string | number;
  color?: string;
  animated?: boolean;
  dashed?: boolean;
  width?: number;
  arrowHead?: boolean;
  packetColors?: string[];
  packetSize?: number[];
  packetDelay?: number[];
  label?: string;
  type?: string;
  trafficType?: GraphTrafficType;
  connectionType?: ConnectionType;
  isDomestic?: boolean;
}

export interface GraphConfig {
  width?: string;
  height?: string;
  backgroundColor?: string;
  darkBackgroundColor?: string;
  expandOnHover?: boolean;
  expandOnClick?: boolean;
  maxExpandedWidth?: string;
  maxExpandedHeight?: string;
  animationDuration?: number;
  zoomable?: boolean;
  draggable?: boolean;
  showLegend?: boolean;
  showDomesticLegend?: boolean;
  legendItems?: LegendItem[];
  viewBox?: string;
  preserveAspectRatio?: string;
}

export interface LegendItem {
  color: string;
  label: string;
}

export interface GraphProps {
  nodes: GraphNode[];
  connections: GraphConnection[];
  title?: string;
  config?: GraphConfig;
  onNodeClick$?: QRL<(node: GraphNode) => void>;
  onConnectionClick$?: QRL<(connection: GraphConnection) => void>;
}

export interface UseGraphResult {
  isExpanded: boolean;
  toggleExpand: () => void;
  containerRef: any;
  svgRef: any;
}
