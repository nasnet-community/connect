import type { RouterModels, OccupiedInterface } from "../StarContext/ChooseType";
import type { Ethernet, Wireless, Sfp, InterfaceType } from "../StarContext/CommonType";

export interface OccupiedInterfaceInfo {
  name: string;
  usedBy: "Trunk" | "WAN" | "VPN" | "Other";
  routerModel?: string;
}

export interface OccupiedInterfacesMap {
  ethernet: OccupiedInterfaceInfo[];
  wireless: OccupiedInterfaceInfo[];
  sfp: OccupiedInterfaceInfo[];
  lte: OccupiedInterfaceInfo[];
}

/**
 * Add an interface to the occupied interfaces list
 */
export function addOccupiedInterface(
  currentOccupied: OccupiedInterface[],
  interfaceName: InterfaceType,
  usedBy: "Trunk" | "WAN" | "VPN" | "Other",
  _routerModel?: string
): OccupiedInterface[] {
  const occupied = [...currentOccupied];

  // Check if interface is already occupied
  const existingIndex = occupied.findIndex(item => item.interface === interfaceName);

  if (existingIndex >= 0) {
    // Update existing entry
    occupied[existingIndex] = {
      interface: interfaceName as Ethernet | Wireless | Sfp,
      UsedFor: usedBy
    };
  } else {
    // Add new entry
    occupied.push({
      interface: interfaceName as Ethernet | Wireless | Sfp,
      UsedFor: usedBy
    });
  }

  return occupied;
}

/**
 * Remove an interface from the occupied interfaces list
 */
export function removeOccupiedInterface(
  currentOccupied: OccupiedInterface[],
  interfaceName: InterfaceType
): OccupiedInterface[] {
  return currentOccupied.filter(item => item.interface !== interfaceName);
}

/**
 * Check if an interface is occupied
 */
export function isInterfaceOccupied(
  occupied: OccupiedInterface[],
  interfaceName: string
): boolean {
  return occupied.some(item => item.interface === interfaceName);
}

/**
 * Get occupied interfaces for a specific router model only
 */
export function getOccupiedInterfacesForRouter(routerModel: RouterModels): OccupiedInterface[] {
  return routerModel.Interfaces.OccupiedInterfaces || [];
}

/**
 * Get all occupied interfaces from all router models
 */
export function getAllOccupiedInterfaces(routerModels: RouterModels[]): OccupiedInterface[] {
  const interfaceMap = new Map<string, OccupiedInterface>();

  routerModels.forEach(model => {
    const occupied = model.Interfaces.OccupiedInterfaces;

    occupied.forEach(item => {
      interfaceMap.set(item.interface, item);
    });
  });

  return Array.from(interfaceMap.values());
}

/**
 * Merge two occupied interfaces lists
 */
export function mergeOccupiedInterfaces(
  first: OccupiedInterface[],
  second: OccupiedInterface[]
): OccupiedInterface[] {
  const interfaceMap = new Map<string, OccupiedInterface>();

  // Add first list
  first.forEach(item => {
    interfaceMap.set(item.interface, item);
  });

  // Add second list (overwrites duplicates with second's UsedFor)
  second.forEach(item => {
    interfaceMap.set(item.interface, item);
  });

  return Array.from(interfaceMap.values());
}

/**
 * Get a detailed map of occupied interfaces with usage information
 */
export function getOccupiedInterfacesMap(
  routerModels: RouterModels[],
  wanInterfaces?: string[],
  trunkInterfaces?: string[]
): OccupiedInterfacesMap {
  const map: OccupiedInterfacesMap = {
    ethernet: [],
    wireless: [],
    sfp: [],
    lte: []
  };

  // Add WAN interfaces
  if (wanInterfaces) {
    wanInterfaces.forEach(iface => {
      const info: OccupiedInterfaceInfo = {
        name: iface,
        usedBy: "WAN"
      };

      if (iface.startsWith("ether")) {
        map.ethernet.push(info);
      } else if (iface.startsWith("wifi") || iface.startsWith("wlan")) {
        map.wireless.push(info);
      } else if (iface.startsWith("sfp")) {
        map.sfp.push(info);
      } else if (iface.startsWith("lte")) {
        map.lte.push(info);
      }
    });
  }

  // Add Trunk interfaces
  if (trunkInterfaces) {
    trunkInterfaces.forEach(iface => {
      const info: OccupiedInterfaceInfo = {
        name: iface,
        usedBy: "Trunk"
      };

      if (iface.startsWith("ether")) {
        map.ethernet.push(info);
      } else if (iface.startsWith("wifi") || iface.startsWith("wlan")) {
        map.wireless.push(info);
      } else if (iface.startsWith("sfp")) {
        map.sfp.push(info);
      } else if (iface.startsWith("lte")) {
        map.lte.push(info);
      }
    });
  }

  return map;
}

/**
 * Clear all occupied interfaces for a router model
 */
export function clearOccupiedInterfaces(): OccupiedInterface[] {
  return [];
}

/**
 * Get the usage reason for a specific interface
 */
export function getInterfaceUsage(
  occupied: OccupiedInterface[],
  interfaceName: string
): string | null {
  const item = occupied.find(item => item.interface === interfaceName);
  return item ? item.UsedFor : null;
}

/**
 * Get all interfaces used for a specific purpose
 */
export function getInterfacesByUsage(
  occupied: OccupiedInterface[],
  usedFor: string
): string[] {
  return occupied
    .filter(item => item.UsedFor === usedFor)
    .map(item => item.interface);
}