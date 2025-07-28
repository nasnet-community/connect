import { component$ } from "@builder.io/qwik";
import {
  LuLaptop,
  LuSmartphone,
  LuUser,
  LuGlobe,
  LuGlobe2,
  LuShield,
  LuServer,
  LuRouter,
  LuWifi,
  LuWifiOff,
  LuGamepad2,
  LuSignal,
  LuDatabase,
  LuMonitor,
  LuCloud,
  LuHardDrive,
} from "@qwikest/icons/lucide";
import type { GraphNode } from "../types";

export type NetworkNodeType =
  | "WirelessUser"
  | "EthernetUser"
  | "User"
  | "ForeignWAN"
  | "DomesticWAN"
  | "VPNClient"
  | "VPNServer"
  | "EthernetRouter"
  | "WirelessRouter"
  | "AP"
  | "GamingConsole"
  | "LTEUser"
  | "DomesticService"
  | "ForeignService"
  | "DomesticWebsite"
  | "ForeignWebsite"
  | "GameServer";

export interface NodeTypeDefinition {
  type: NetworkNodeType;
  icon: any;
  color: string;
  size?: number;
  label?: string;
}

// Color palette for different node types using Tailwind theme values
// These colors map to the custom color system defined in tailwind.config.js
export const nodeColors = {
  user: "rgb(245 158 11)", // warning.DEFAULT from config (amber-500)
  wan: "rgb(14 165 233)", // info.DEFAULT from config (sky-500)  
  router: "rgb(34 197 94)", // success.DEFAULT from config (emerald-500)
  service: "rgb(139 92 246)", // Violet-500 - maps to secondary palette
  vpn: "rgb(99 102 241)", // Indigo-500 - matches config indigo shades
  website: "rgb(236 72 153)", // Pink-500 for website content
  gaming: "rgb(239 68 68)", // error.DEFAULT from config (red-500)
  domestic: "rgb(132 204 22)", // Green variant for domestic traffic
  foreign: "rgb(147 51 234)", // Purple-600 for foreign traffic
};

// Node definitions for each network node type
export const networkNodeTypes: Record<NetworkNodeType, NodeTypeDefinition> = {
  WirelessUser: {
    type: "WirelessUser",
    icon: LuSmartphone,
    color: nodeColors.user,
    label: "Wireless User",
  },
  EthernetUser: {
    type: "EthernetUser",
    icon: LuLaptop,
    color: nodeColors.user,
    label: "Ethernet User",
  },
  User: {
    type: "User",
    icon: LuUser,
    color: nodeColors.user,
    label: "User",
  },
  ForeignWAN: {
    type: "ForeignWAN",
    icon: LuGlobe2,
    color: nodeColors.wan,
    label: "Foreign WAN",
  },
  DomesticWAN: {
    type: "DomesticWAN",
    icon: LuGlobe,
    color: nodeColors.domestic,
    label: "Domestic WAN",
  },
  VPNClient: {
    type: "VPNClient",
    icon: LuShield,
    color: nodeColors.vpn,
    label: "VPN Client",
  },
  VPNServer: {
    type: "VPNServer",
    icon: LuServer,
    color: nodeColors.vpn,
    label: "VPN Server",
  },
  EthernetRouter: {
    type: "EthernetRouter",
    icon: LuRouter,
    color: nodeColors.router,
    label: "Ethernet Router",
  },
  WirelessRouter: {
    type: "WirelessRouter",
    icon: LuWifi,
    color: nodeColors.router,
    label: "Wireless Router",
  },
  AP: {
    type: "AP",
    icon: LuWifiOff,
    color: nodeColors.router,
    label: "Access Point",
  },
  GamingConsole: {
    type: "GamingConsole",
    icon: LuGamepad2,
    color: nodeColors.gaming,
    label: "Gaming Console",
  },
  LTEUser: {
    type: "LTEUser",
    icon: LuSignal,
    color: nodeColors.user,
    label: "LTE User",
  },
  DomesticService: {
    type: "DomesticService",
    icon: LuDatabase,
    color: nodeColors.domestic,
    label: "Domestic Service",
  },
  ForeignService: {
    type: "ForeignService",
    icon: LuCloud,
    color: nodeColors.foreign,
    label: "Foreign Service",
  },
  DomesticWebsite: {
    type: "DomesticWebsite",
    icon: LuMonitor,
    color: nodeColors.domestic,
    label: "Domestic Website",
  },
  ForeignWebsite: {
    type: "ForeignWebsite",
    icon: LuMonitor,
    color: nodeColors.foreign,
    label: "Foreign Website",
  },
  GameServer: {
    type: "GameServer",
    icon: LuHardDrive,
    color: nodeColors.gaming,
    label: "Game Server",
  },
};

/**
 * Create a graph node with the specified type
 */
export const createNode = (
  nodeType: NetworkNodeType,
  id: string | number,
  x: number,
  y: number,
  overrides: Partial<GraphNode> = {},
): GraphNode => {
  const typeDefinition = networkNodeTypes[nodeType];

  return {
    id,
    type: nodeType,
    x,
    y,
    label: typeDefinition.label || "Node",
    color: typeDefinition.color,
    size: typeDefinition.size || 22,
    ...overrides,
  };
};

/**
 * Component to render a node icon inside the Graph SVG
 */
export const NodeIcon = component$<{
  nodeType: NetworkNodeType;
  size?: number;
}>((props) => {
  const { nodeType, size = 24 } = props;
  const definition = networkNodeTypes[nodeType];
  const IconComponent = definition.icon;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: definition.color,
      }}
    >
      <IconComponent class={`h-${size} w-${size}`} />
    </div>
  );
});

export default networkNodeTypes;
