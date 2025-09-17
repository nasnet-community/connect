import type { RouterConfig } from "../../ConfigGenerator";
import type {
  InterfaceType,
  Ethernet,
  Wireless,
  Sfp,
  LTE,
  WirelessCredentials,
} from "../../../StarContext/CommonType";
import type { InterfaceConfig } from "../../../StarContext/WANType";

export const configureEthernetInterface = (
  interfaceName: Ethernet | Sfp,
  comment?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface ethernet": [],
  };

  const baseCommand = `set [ find default-name=${interfaceName} ]`;
  const parts = [baseCommand];
  
  if (comment) {
    parts.push(`comment="${comment}"`);
  }

  config["/interface ethernet"].push(parts.join(" "));
  
  return config;
};

export const configureWirelessInterface = (
  interfaceName: Wireless,
  credentials: WirelessCredentials,
  comment?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface wifi": [],
  };

  const { SSID, Password } = credentials;
  
  const parts = [
    `set ${interfaceName}`,
    `configuration.mode=station`,
    `.ssid="${SSID}"`,
    `disabled=no`,
    `security.passphrase="${Password}"`,
  ];
  
  if (comment) {
    parts.splice(1, 0, `comment="${comment}"`);
  }

  config["/interface wifi"].push(parts.join(" \\\n    "));
  
  return config;
};

export const configureSFPInterface = (
  interfaceName: Sfp,
  comment?: string,
): RouterConfig => {
  return configureEthernetInterface(interfaceName, comment);
};

export const configureLTEInterface = (
  interfaceName: LTE,
  comment?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface lte": [],
  };

  if (comment) {
    config["/interface lte"].push(
      `set [ find default-name=${interfaceName} ] comment="${comment}"`
    );
  }
  
  return config;
};

export const setInterfaceComment = (
  interfaceName: InterfaceType,
  comment: string,
): RouterConfig => {
  const config: RouterConfig = {};
  
  const interfaceTypeMap: Record<string, string> = {
    "ether": "/interface ethernet",
    "wlan": "/interface wifi",
    "sfp": "/interface ethernet",
    "lte": "/interface lte",
  };
  
  const prefix = interfaceName.substring(0, interfaceName.match(/\d/)?.index || interfaceName.length);
  const section = interfaceTypeMap[prefix] || "/interface";
  
  config[section] = [
    `set [ find default-name=${interfaceName} ] comment="${comment}"`
  ];
  
  return config;
};

export const generateInterfaceConfig = (
  config: InterfaceConfig,
  comment?: string,
): RouterConfig => {
  const { InterfaceName, WirelessCredentials } = config;
  
  const finalComment = comment || `WAN-${InterfaceName}`;
  
  if (WirelessCredentials) {
    return configureWirelessInterface(
      InterfaceName as Wireless,
      WirelessCredentials,
      finalComment
    );
  }
  
  if (InterfaceName.startsWith("lte")) {
    return configureLTEInterface(InterfaceName as LTE, finalComment);
  }
  
  if (InterfaceName.startsWith("sfp")) {
    return configureSFPInterface(InterfaceName as Sfp, finalComment);
  }
  
  return configureEthernetInterface(InterfaceName as Ethernet, finalComment);
};

export const addInterfaceToList = (
  interfaceName: InterfaceType,
  listNames: string[],
): RouterConfig => {
  const config: RouterConfig = {
    "/interface list member": [],
  };
  
  listNames.forEach(listName => {
    config["/interface list member"].push(
      `add interface=${interfaceName} list="${listName}"`
    );
  });
  
  return config;
};

export const createInterfaceList = (listName: string): RouterConfig => {
  return {
    "/interface list": [
      `add name="${listName}"`
    ],
  };
};

export const setInterfaceState = (
  interfaceName: InterfaceType,
  enabled: boolean,
): RouterConfig => {
  const disabled = enabled ? "no" : "yes";
  
  const interfaceTypeMap: Record<string, string> = {
    "ether": "/interface ethernet",
    "wlan": "/interface wifi",
    "sfp": "/interface ethernet",
    "lte": "/interface lte",
  };
  
  const prefix = interfaceName.substring(0, interfaceName.match(/\d/)?.index || interfaceName.length);
  const section = interfaceTypeMap[prefix] || "/interface";
  
  return {
    [section]: [
      `set [ find default-name=${interfaceName} ] disabled=${disabled}`
    ],
  };
};