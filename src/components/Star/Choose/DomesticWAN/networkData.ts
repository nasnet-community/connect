import {
  type NetworkTopologyNode,
  type NetworkTopologyConnection,
} from "./NetworkTopologyGraph";

export const domesticNetworkNodes: NetworkTopologyNode[] = [
  { type: "laptop", x: 40, y: 100, label: "USER" },
  { type: "wifi", x: 150, y: 100, label: "Router" },
  { type: "globe", x: 260, y: 50, label: "Domestic WAN" },
  { type: "globe2", x: 260, y: 150, label: "Foreign WAN" },
  { type: "server", x: 370, y: 50, label: "Domestic Site" },
  { type: "server", x: 370, y: 150, label: "Foreign Site" },
];

export const domesticNetworkConnections: NetworkTopologyConnection[] = [
  { from: 0, to: 1, color: "#f59e0b", isDomestic: undefined },
  { from: 1, to: 2, color: "#eab308", isDomestic: true },
  { from: 1, to: 3, color: "#eab308", isDomestic: false },
  { from: 2, to: 4, color: "#eab308", isDomestic: true },
  { from: 3, to: 5, color: "#eab308", isDomestic: false },
];

export const foreignNetworkNodes: NetworkTopologyNode[] = [
  { type: "laptop", x: 40, y: 100, label: "USER" },
  { type: "wifi", x: 150, y: 100, label: "Router" },
  { type: "globe2", x: 260, y: 100, label: "Foreign WAN" },
  { type: "server", x: 370, y: 50, label: "Domestic Site" },
  { type: "server", x: 370, y: 150, label: "Foreign Site" },
];

export const foreignNetworkConnections: NetworkTopologyConnection[] = [
  { from: 0, to: 1, color: "#f59e0b", isDomestic: false },
  { from: 1, to: 2, color: "#eab308", isDomestic: false },
  { from: 2, to: 3, color: "#eab308", isDomestic: false },
  { from: 2, to: 4, color: "#eab308", isDomestic: false },
];

export const bothLinksNetworkNodes: NetworkTopologyNode[] = [
  { type: "laptop", x: 40, y: 100, label: "USER" },
  { type: "wifi", x: 150, y: 100, label: "Router" },
  { type: "globe", x: 260, y: 50, label: "Domestic WAN" },
  { type: "globe2", x: 260, y: 150, label: "Foreign WAN" },
  { type: "server", x: 370, y: 50, label: "Domestic Site" },
  { type: "server", x: 370, y: 150, label: "Foreign Site" },
];

export const bothLinksNetworkConnections: NetworkTopologyConnection[] = [
  { from: 0, to: 1, color: "#f59e0b", isDomestic: undefined },
  { from: 1, to: 2, color: "#eab308", isDomestic: true },
  { from: 1, to: 3, color: "#eab308", isDomestic: false },
  { from: 2, to: 4, color: "#eab308", isDomestic: true },
  { from: 3, to: 5, color: "#eab308", isDomestic: false },
];

// Dedicated domestic-only network configuration (no foreign WAN or site)
export const domesticOnlyNetworkNodes: NetworkTopologyNode[] = [
  { type: "laptop", x: 40, y: 100, label: "USER" },
  { type: "wifi", x: 150, y: 100, label: "Router" },
  { type: "globe", x: 260, y: 100, label: "Domestic WAN" },
  { type: "server", x: 370, y: 100, label: "Domestic Site" },
];

export const domesticOnlyNetworkConnections: NetworkTopologyConnection[] = [
  { from: 0, to: 1, color: "#f59e0b", isDomestic: undefined },
  { from: 1, to: 2, color: "#eab308", isDomestic: true },
  { from: 2, to: 3, color: "#eab308", isDomestic: true },
];
