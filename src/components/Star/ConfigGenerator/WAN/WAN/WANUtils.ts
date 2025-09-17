import type { RouterConfig } from "../../ConfigGenerator";
import type { InterfaceType } from "../../../StarContext/CommonType";
import type { 
  WANLinks, 
  // WANLink, 
  WANLinkConfig,
  MultiLinkConfig,
  // MultiLinkStrategy,
  // LoadBalanceMethod,
} from "../../../StarContext/WANType";
import { mergeMultipleConfigs } from "../../utils/ConfigGeneratorUtil";
import { generateInterfaceConfig, addInterfaceToList } from "./WANInterface";
import { createVLAN } from "./VLANUtils";
import { createPPPoEClient } from "./PPPoEUtils";
import { createDHCPClient } from "./DHCPUtils";
import { configureStaticIP } from "./StaticIPUtils";
// import { configureLTEInterface } from "./LTEUtils";
// import { generateMangle, configurePCC, configureECMP, configureNTH, configureBonding } from "./LoadBalanceUtils";
// import { configureFailover, createRecursiveRoute } from "./FailoverUtils";
import { generateMangle, configureNTH } from "./LoadBalanceUtils";
import { configureFailover } from "./FailoverUtils";
export const generateNATRules = (
  interfaces: string[],
  options: {
    action?: "masquerade" | "src-nat";
    toAddress?: string;
    comment?: string;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall nat": [],
  };
  
  const { action = "masquerade", toAddress, comment } = options;
  
  interfaces.forEach(iface => {
    const parts = [
      "add",
      "chain=srcnat",
      `out-interface=${iface}`,
      `action=${action}`,
    ];
    
    if (action === "src-nat" && toAddress) {
      parts.push(`to-addresses=${toAddress}`);
    }
    
    if (comment) {
      parts.push(`comment="${comment}"`);
    }
    
    config["/ip firewall nat"].push(parts.join(" "));
  });
  
  return config;
};

export const createRoutingTables = (
  tables: Array<{
    name: string;
    fib?: boolean;
    comment?: string;
  }>,
): RouterConfig => {
  const config: RouterConfig = {
    "/routing table": [],
  };
  
  tables.forEach(table => {
    const parts = ["add", `name=${table.name}`];
    
    if (table.fib !== undefined) {
      parts.push(`fib=${table.fib ? "yes" : "no"}`);
    }
    
    if (table.comment) {
      parts.push(`comment="${table.comment}"`);
    }
    
    config["/routing table"].push(parts.join(" "));
  });
  
  return config;
};

export const generateFirewallRules = (
  wanInterfaces: string[],
  options: {
    allowPing?: boolean;
    allowEstablished?: boolean;
    dropInvalid?: boolean;
    logPrefix?: string;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall filter": [],
  };
  
  const {
    allowPing = false,
    allowEstablished = true,
    dropInvalid = true,
    logPrefix = "FW",
  } = options;
  
  if (allowEstablished) {
    config["/ip firewall filter"].push(
      `add action=accept chain=input connection-state=established,related comment="Accept established/related"`
    );
  }
  
  if (dropInvalid) {
    config["/ip firewall filter"].push(
      `add action=drop chain=input connection-state=invalid comment="Drop invalid"`
    );
  }
  
  if (allowPing) {
    config["/ip firewall filter"].push(
      `add action=accept chain=input protocol=icmp comment="Allow ICMP"`
    );
  }
  
  wanInterfaces.forEach(iface => {
    config["/ip firewall filter"].push(
      `add action=drop chain=input in-interface=${iface} log=yes log-prefix="${logPrefix}-DROP-${iface}" comment="Drop all from ${iface}"`
    );
  });
  
  config["/ip firewall filter"].push(
    `add action=accept chain=forward connection-state=established,related comment="Accept established/related forward"`,
    `add action=drop chain=forward connection-state=invalid comment="Drop invalid forward"`,
    `add action=accept chain=forward in-interface-list=LAN out-interface-list=WAN comment="Allow LAN to WAN"`,
    `add action=drop chain=forward comment="Drop all other forward"`
  );
  
  return config;
};

export const validateWANConfig = (config: WANLinkConfig): boolean => {
  if (!config.InterfaceConfig?.InterfaceName) {
    return false;
  }
  
  if (config.InterfaceConfig.VLANID) {
    const vlanId = parseInt(config.InterfaceConfig.VLANID, 10);
    if (isNaN(vlanId) || vlanId < 2 || vlanId > 4094) {
      return false;
    }
  }
  
  if (config.InterfaceConfig.MacAddress) {
    const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
    if (!macRegex.test(config.InterfaceConfig.MacAddress)) {
      return false;
    }
  }
  
  if (config.ConnectionConfig?.pppoe) {
    if (!config.ConnectionConfig.pppoe.username || !config.ConnectionConfig.pppoe.password) {
      return false;
    }
  }
  
  if (config.ConnectionConfig?.static) {
    const { ipAddress, subnet: _subnet, gateway } = config.ConnectionConfig.static;
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    
    if (!ipRegex.test(ipAddress) || !ipRegex.test(gateway)) {
      return false;
    }
  }
  
  return true;
};

export const mergeWANConfigs = (...configs: RouterConfig[]): RouterConfig => {
  return mergeMultipleConfigs(...configs);
};

export const generateInterfaceList = (
  listName: string,
  interfaces: string[],
  comment?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface list": [],
    "/interface list member": [],
  };
  
  const listParts = [`add name="${listName}"`];
  if (comment) {
    listParts.push(`comment="${comment}"`);
  }
  
  config["/interface list"].push(listParts.join(" "));
  
  interfaces.forEach(iface => {
    config["/interface list member"].push(
      `add interface=${iface} list="${listName}"`
    );
  });
  
  return config;
};

export const calculateCIDR = (subnet: string): number => {
  if (subnet.includes("/")) {
    return parseInt(subnet.split("/")[1], 10);
  }
  
  const subnetParts = subnet.split(".").map(Number);
  let cidr = 0;
  
  for (const part of subnetParts) {
    let bits = part;
    while (bits > 0) {
      if (bits & 1) cidr++;
      bits >>= 1;
    }
  }
  
  return cidr;
};

export const generateMAC = (
  interfaceName: InterfaceType,
  macAddress: string,
): RouterConfig => {
  const config: RouterConfig = {};
  
  const interfaceTypeMap: Record<string, string> = {
    "ether": "/interface ethernet",
    "wlan": "/interface wifi",
    "sfp": "/interface ethernet",
  };
  
  const prefix = interfaceName.substring(0, interfaceName.match(/\d/)?.index || interfaceName.length);
  const section = interfaceTypeMap[prefix];
  
  if (section) {
    config[section] = [
      `set [ find default-name=${interfaceName} ] mac-address=${macAddress}`
    ];
  }
  
  return config;
};

export const generateMultiWANConfig = (
  wanLinks: WANLinks,
  multiLinkConfig?: MultiLinkConfig,
): RouterConfig => {
  const configs: RouterConfig[] = [];
  const allInterfaces: string[] = [];
  
  if (wanLinks.Foreign) {
    const foreignConfigs = wanLinks.Foreign.WANConfigs.map(config => {
      allInterfaces.push(config.InterfaceConfig.InterfaceName);
      return processWANLinkConfig(config, "Foreign");
    });
    configs.push(...foreignConfigs);
  }
  
  if (wanLinks.Domestic) {
    const domesticConfigs = wanLinks.Domestic.WANConfigs.map(config => {
      allInterfaces.push(config.InterfaceConfig.InterfaceName);
      return processWANLinkConfig(config, "Domestic");
    });
    configs.push(...domesticConfigs);
  }
  
  if (multiLinkConfig && allInterfaces.length > 1) {
    const multiConfig = processMultiLinkConfig(allInterfaces, multiLinkConfig);
    configs.push(multiConfig);
  }
  
  configs.push(generateNATRules(allInterfaces));
  configs.push(generateInterfaceList("WAN", allInterfaces, "All WAN interfaces"));
  
  return mergeMultipleConfigs(...configs);
};

function processWANLinkConfig(
  config: WANLinkConfig,
  type: "Foreign" | "Domestic",
): RouterConfig {
  const configs: RouterConfig[] = [];
  
  const interfaceConfig = generateInterfaceConfig(
    config.InterfaceConfig,
    `${type}-${config.name}`
  );
  configs.push(interfaceConfig);
  
  if (config.InterfaceConfig.VLANID) {
    const vlanConfig = createVLAN(
      config.InterfaceConfig.InterfaceName,
      config.InterfaceConfig.VLANID,
      `vlan${config.InterfaceConfig.VLANID}-${type}`,
      `VLAN for ${type} WAN`
    );
    configs.push(vlanConfig);
  }
  
  if (config.InterfaceConfig.MacAddress) {
    const macConfig = generateMAC(
      config.InterfaceConfig.InterfaceName,
      config.InterfaceConfig.MacAddress
    );
    configs.push(macConfig);
  }
  
  if (config.ConnectionConfig) {
    const connectionConfig = processConnectionConfig(
      config.InterfaceConfig.InterfaceName,
      config.ConnectionConfig,
      type
    );
    configs.push(connectionConfig);
  } else {
    const dhcpConfig = createDHCPClient(config.InterfaceConfig.InterfaceName, {
      comment: `DHCP for ${type} WAN`,
    });
    configs.push(dhcpConfig);
  }
  
  const listConfig = addInterfaceToList(
    config.InterfaceConfig.InterfaceName,
    ["WAN", `${type}-WAN`]
  );
  configs.push(listConfig);
  
  return mergeMultipleConfigs(...configs);
}

function processConnectionConfig(
  interfaceName: InterfaceType,
  connectionConfig: any,
  type: string,
): RouterConfig {
  if (connectionConfig.pppoe) {
    return createPPPoEClient(interfaceName, connectionConfig.pppoe, {
      comment: `PPPoE for ${type} WAN`,
    });
  }
  
  if (connectionConfig.static) {
    return configureStaticIP(interfaceName, connectionConfig.static, `Static IP for ${type} WAN`);
  }
  
  return createDHCPClient(interfaceName, {
    comment: `DHCP for ${type} WAN`,
  });
}

function processMultiLinkConfig(
  interfaces: string[],
  config: MultiLinkConfig,
): RouterConfig {
  switch (config.strategy) {
    case "LoadBalance":
      return generateMangle(config.loadBalanceMethod || "PCC", interfaces);
    
    case "Failover":
      return configureFailover(
        interfaces.map((iface, index) => ({
          interface: iface,
          gateway: iface,
          priority: index + 1,
        })),
        config.FailoverConfig
      );
    
    case "RoundRobin":
      return configureNTH({ interfaces });
    
    case "Both":
      const loadBalance = generateMangle(config.loadBalanceMethod || "PCC", interfaces);
      const failover = configureFailover(
        interfaces.map((iface, index) => ({
          interface: iface,
          gateway: iface,
          priority: index + 1,
        })),
        config.FailoverConfig
      );
      return mergeMultipleConfigs(loadBalance, failover);
    
    default:
      return {};
  }
}

export const generateWANScript = (
  scriptName: string,
  commands: string[],
  options: {
    runOnStartup?: boolean;
    scheduleInterval?: number;
    comment?: string;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/system script": [],
  };
  
  const { runOnStartup = false, scheduleInterval, comment } = options;
  
  const scriptParts = [
    `add name=${scriptName}`,
    `source="${commands.join("\\r\\n")}"`,
  ];
  
  if (comment) {
    scriptParts.push(`comment="${comment}"`);
  }
  
  config["/system script"].push(scriptParts.join(" "));
  
  if (runOnStartup) {
    config["/system scheduler"] = [
      `add name=startup-${scriptName} on-event=${scriptName} start-time=startup`
    ];
  }
  
  if (scheduleInterval) {
    config["/system scheduler"] = config["/system scheduler"] || [];
    config["/system scheduler"].push(
      `add name=schedule-${scriptName} on-event=${scriptName} interval=${scheduleInterval}s`
    );
  }
  
  return config;
};

export const createWANMonitoring = (
  interfaces: string[],
  options: {
    logTraffic?: boolean;
    graphing?: boolean;
    snmp?: boolean;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {};
  
  if (options.logTraffic) {
    config["/ip firewall mangle"] = interfaces.map(iface => 
      `add action=passthrough chain=forward out-interface=${iface} comment="Monitor ${iface} traffic"`
    );
  }
  
  if (options.graphing) {
    config["/tool graphing interface"] = interfaces.map(iface =>
      `add interface=${iface}`
    );
  }
  
  if (options.snmp) {
    config["/snmp"] = [`set enabled=yes`];
    config["/snmp community"] = [
      `add name=public addresses=0.0.0.0/0 read-access=yes`
    ];
  }
  
  return config;
};