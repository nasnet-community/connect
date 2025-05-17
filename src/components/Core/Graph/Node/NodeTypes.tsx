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
  LuHardDrive
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

// Color palette for different node types
export const nodeColors = {
  user: "#f59e0b", // Amber-500
  wan: "#0ea5e9", // Sky-500
  router: "#10b981", // Emerald-500
  service: "#8b5cf6", // Violet-500
  vpn: "#6366f1", // Indigo-500
  website: "#ec4899", // Pink-500
  gaming: "#ef4444", // Red-500
  domestic: "#84cc16", // Lime-500
  foreign: "#9333ea", // Purple-600
};

// Node definitions for each network node type
export const networkNodeTypes: Record<NetworkNodeType, NodeTypeDefinition> = {
  WirelessUser: {
    type: "WirelessUser",
    icon: LuSmartphone,
    color: nodeColors.user,
    label: "Wireless User"
  },
  EthernetUser: {
    type: "EthernetUser",
    icon: LuLaptop,
    color: nodeColors.user,
    label: "Ethernet User"
  },
  User: {
    type: "User",
    icon: LuUser,
    color: nodeColors.user,
    label: "User"
  },
  ForeignWAN: {
    type: "ForeignWAN",
    icon: LuGlobe2,
    color: nodeColors.wan,
    label: "Foreign WAN"
  },
  DomesticWAN: {
    type: "DomesticWAN",
    icon: LuGlobe,
    color: nodeColors.domestic,
    label: "Domestic WAN"
  },
  VPNClient: {
    type: "VPNClient",
    icon: LuShield,
    color: nodeColors.vpn,
    label: "VPN Client"
  },
  VPNServer: {
    type: "VPNServer",
    icon: LuServer,
    color: nodeColors.vpn,
    label: "VPN Server"
  },
  EthernetRouter: {
    type: "EthernetRouter",
    icon: LuRouter,
    color: nodeColors.router,
    label: "Ethernet Router"
  },
  WirelessRouter: {
    type: "WirelessRouter",
    icon: LuWifi,
    color: nodeColors.router,
    label: "Wireless Router"
  },
  AP: {
    type: "AP",
    icon: LuWifiOff,
    color: nodeColors.router,
    label: "Access Point"
  },
  GamingConsole: {
    type: "GamingConsole",
    icon: LuGamepad2,
    color: nodeColors.gaming,
    label: "Gaming Console"
  },
  LTEUser: {
    type: "LTEUser",
    icon: LuSignal,
    color: nodeColors.user,
    label: "LTE User"
  },
  DomesticService: {
    type: "DomesticService",
    icon: LuDatabase,
    color: nodeColors.domestic,
    label: "Domestic Service"
  },
  ForeignService: {
    type: "ForeignService",
    icon: LuCloud,
    color: nodeColors.foreign,
    label: "Foreign Service"
  },
  DomesticWebsite: {
    type: "DomesticWebsite",
    icon: LuMonitor,
    color: nodeColors.domestic,
    label: "Domestic Website"
  },
  ForeignWebsite: {
    type: "ForeignWebsite",
    icon: LuMonitor,
    color: nodeColors.foreign,
    label: "Foreign Website"
  },
  GameServer: {
    type: "GameServer",
    icon: LuHardDrive,
    color: nodeColors.gaming,
    label: "Game Server"
  }
};

/**
 * Create a graph node with the specified type
 */
export const createNode = (
  nodeType: NetworkNodeType,
  id: string | number,
  x: number,
  y: number,
  overrides: Partial<GraphNode> = {}
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
    ...overrides
  };
};

/**
 * Component to render a node icon inside the Graph SVG
 */
export const NodeIcon = component$<{ nodeType: NetworkNodeType; size?: number }>((props) => {
  const { nodeType, size = 24 } = props;
  const definition = networkNodeTypes[nodeType];
  const IconComponent = definition.icon;
  
  return (
    <div 
      style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        color: definition.color 
      }}
    >
      <IconComponent class={`h-${size} w-${size}`} />
    </div>
  );
});

export default networkNodeTypes; 