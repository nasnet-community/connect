import type { RouterConfig } from "../../ConfigGenerator";
import type { InterfaceType } from "../../../StarContext/CommonType";

const RESERVED_VLAN_IDS = [0, 1, 4095];

export const validateVLANID = (vlanId: number | string): boolean => {
  const id = typeof vlanId === "string" ? parseInt(vlanId, 10) : vlanId;
  
  if (isNaN(id)) {
    return false;
  }
  
  if (RESERVED_VLAN_IDS.includes(id)) {
    return false;
  }
  
  return id >= 2 && id <= 4094;
};

export const createVLAN = (
  interfaceName: InterfaceType,
  vlanId: number | string,
  vlanName?: string,
  comment?: string,
): RouterConfig => {
  if (!validateVLANID(vlanId)) {
    throw new Error(`Invalid VLAN ID: ${vlanId}. Must be between 2-4094, excluding reserved IDs.`);
  }
  
  const config: RouterConfig = {
    "/interface vlan": [],
  };
  
  const name = vlanName || `vlan${vlanId}`;
  
  const parts = [
    "add",
    `interface=${interfaceName}`,
    `vlan-id=${vlanId}`,
    `name=${name}`,
  ];
  
  if (comment) {
    parts.push(`comment="${comment}"`);
  }
  
  config["/interface vlan"].push(parts.join(" "));
  
  return config;
};

export const configureVLANTagging = (
  interfaceName: InterfaceType,
  vlanIds: (number | string)[],
  mode: "tagged" | "untagged" = "tagged",
): RouterConfig => {
  const config: RouterConfig = {
    "/interface bridge vlan": [],
  };
  
  const validVlanIds = vlanIds.filter(id => validateVLANID(id));
  
  if (validVlanIds.length === 0) {
    throw new Error("No valid VLAN IDs provided");
  }
  
  const vlanIdString = validVlanIds.join(",");
  
  if (mode === "tagged") {
    config["/interface bridge vlan"].push(
      `add bridge=bridge tagged=${interfaceName} vlan-ids=${vlanIdString}`
    );
  } else {
    config["/interface bridge vlan"].push(
      `add bridge=bridge untagged=${interfaceName} vlan-ids=${vlanIdString}`
    );
  }
  
  return config;
};

export const generateVLANInterface = (
  baseInterface: InterfaceType,
  vlanId: number | string,
  suffix?: string,
): string => {
  if (!validateVLANID(vlanId)) {
    throw new Error(`Invalid VLAN ID: ${vlanId}`);
  }
  
  if (suffix) {
    return `vlan${vlanId}-${suffix}`;
  }
  
  return `vlan${vlanId}-${baseInterface}`;
};

export const createVLANBridge = (
  vlanId: number | string,
  interfaces: InterfaceType[],
  bridgeName?: string,
): RouterConfig => {
  if (!validateVLANID(vlanId)) {
    throw new Error(`Invalid VLAN ID: ${vlanId}`);
  }
  
  const config: RouterConfig = {
    "/interface bridge": [],
    "/interface bridge port": [],
    "/interface bridge vlan": [],
  };
  
  const name = bridgeName || `bridge-vlan${vlanId}`;
  
  config["/interface bridge"].push(
    `add name=${name} vlan-filtering=yes`
  );
  
  interfaces.forEach(iface => {
    config["/interface bridge port"].push(
      `add bridge=${name} interface=${iface} pvid=${vlanId}`
    );
  });
  
  config["/interface bridge vlan"].push(
    `add bridge=${name} tagged=${name} vlan-ids=${vlanId}`
  );
  
  return config;
};

export const setVLANPriority = (
  vlanInterfaceName: string,
  priority: number,
): RouterConfig => {
  if (priority < 0 || priority > 7) {
    throw new Error("VLAN priority must be between 0 and 7");
  }
  
  return {
    "/interface vlan": [
      `set [ find name=${vlanInterfaceName} ] vlan-priority=${priority}`
    ],
  };
};

export const createQinQVLAN = (
  outerInterface: InterfaceType,
  outerVlanId: number | string,
  innerVlanId: number | string,
  name?: string,
): RouterConfig => {
  if (!validateVLANID(outerVlanId) || !validateVLANID(innerVlanId)) {
    throw new Error("Invalid VLAN ID for QinQ configuration");
  }
  
  const config: RouterConfig = {
    "/interface vlan": [],
  };
  
  const outerVlanName = `vlan${outerVlanId}-outer`;
  const innerVlanName = name || `vlan${innerVlanId}-qinq`;
  
  config["/interface vlan"].push(
    `add interface=${outerInterface} vlan-id=${outerVlanId} name=${outerVlanName}`,
    `add interface=${outerVlanName} vlan-id=${innerVlanId} name=${innerVlanName}`
  );
  
  return config;
};

export const configureVLANMTU = (
  vlanInterfaceName: string,
  mtu: number,
): RouterConfig => {
  if (mtu < 68 || mtu > 65535) {
    throw new Error("MTU must be between 68 and 65535");
  }
  
  return {
    "/interface vlan": [
      `set [ find name=${vlanInterfaceName} ] mtu=${mtu}`
    ],
  };
};

export const createMacVLAN = (
  interfaceName: InterfaceType,
  macAddress: string,
  vlanId?: number | string,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface bridge filter": [],
  };
  
  const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
  if (!macRegex.test(macAddress)) {
    throw new Error("Invalid MAC address format");
  }
  
  const parts = [
    "add",
    "action=accept",
    "chain=forward",
    `in-interface=${interfaceName}`,
    `mac-protocol=0x8100`,
    `src-mac-address=${macAddress}`,
  ];
  
  if (vlanId && validateVLANID(vlanId)) {
    parts.push(`vlan-id=${vlanId}`);
  }
  
  config["/interface bridge filter"].push(parts.join(" "));
  
  return config;
};