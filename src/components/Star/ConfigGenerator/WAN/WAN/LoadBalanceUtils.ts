import type { RouterConfig } from "../../ConfigGenerator";
import type { LoadBalanceMethod } from "../../../StarContext/WANType";

export interface PCCConfig {
  interfaces: string[];
  classifier: "src-address" | "dst-address" | "both-addresses" | "src-port" | "dst-port" | "both-ports";
  perConnectionClassifier?: string;
  routingTables?: string[];
}

export const configurePCC = (config: PCCConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip firewall mangle": [],
    "/ip route": [],
  };
  
  const { interfaces, classifier } = config;
  const routingTables = config.routingTables || interfaces.map((_, i) => `wan${i + 1}`);
  
  interfaces.forEach((iface, index) => {
    routerConfig["/ip firewall mangle"].push(
      `add action=mark-connection chain=input in-interface=${iface} new-connection-mark=wan${index + 1}_conn passthrough=yes`
    );
  });
  
  interfaces.forEach((_, index) => {
    routerConfig["/ip firewall mangle"].push(
      `add action=mark-routing chain=output connection-mark=wan${index + 1}_conn new-routing-mark=to_wan${index + 1} passthrough=yes`
    );
  });
  
  const classifierMap = {
    "src-address": "src-address",
    "dst-address": "dst-address",
    "both-addresses": "both-addresses",
    "src-port": "src-port",
    "dst-port": "dst-port",
    "both-ports": "both-ports",
  };
  
  interfaces.forEach((_, index) => {
    const pccRule = `${classifierMap[classifier]}:${interfaces.length}/${index}`;
    
    routerConfig["/ip firewall mangle"].push(
      `add action=mark-connection chain=prerouting dst-address-type=!local \\
    in-interface-list=LAN new-connection-mark=wan${index + 1}_conn \\
    passthrough=yes per-connection-classifier=${pccRule}`
    );
  });
  
  interfaces.forEach((_, index) => {
    routerConfig["/ip firewall mangle"].push(
      `add action=mark-routing chain=prerouting connection-mark=wan${index + 1}_conn \\
    in-interface-list=LAN new-routing-mark=${routingTables[index]} passthrough=yes`
    );
  });
  
  interfaces.forEach((iface, index) => {
    routerConfig["/ip route"].push(
      `add distance=1 gateway=${iface} routing-table=${routingTables[index]}`
    );
  });
  
  return routerConfig;
};

export interface ECMPConfig {
  gateways: Array<{
    gateway: string;
    weight?: number;
    interface?: string;
  }>;
  checkGateway?: "ping" | "arp" | "none";
  distance?: number;
}

export const configureECMP = (config: ECMPConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip route": [],
  };
  
  const { gateways, checkGateway = "ping", distance = 1 } = config;
  
  const flatGateways = gateways.flatMap(gw => {
    const weight = gw.weight || 1;
    return Array(weight).fill(gw.gateway);
  });
  
  if (flatGateways.length === 1) {
    routerConfig["/ip route"].push(
      `add distance=${distance} dst-address=0.0.0.0/0 gateway=${flatGateways[0]} check-gateway=${checkGateway}`
    );
  } else {
    const gatewayList = flatGateways.join(",");
    routerConfig["/ip route"].push(
      `add distance=${distance} dst-address=0.0.0.0/0 gateway=${gatewayList} check-gateway=${checkGateway}`
    );
  }
  
  gateways.forEach((gw, index) => {
    if (gw.interface) {
      routerConfig["/ip firewall mangle"] = routerConfig["/ip firewall mangle"] || [];
      routerConfig["/ip firewall mangle"].push(
        `add action=mark-connection chain=input in-interface=${gw.interface} new-connection-mark=ecmp_wan${index + 1} passthrough=yes`,
        `add action=mark-routing chain=output connection-mark=ecmp_wan${index + 1} new-routing-mark=ecmp_wan${index + 1} passthrough=yes`
      );
      
      routerConfig["/ip route"].push(
        `add distance=1 gateway=${gw.gateway} routing-table=ecmp_wan${index + 1}`
      );
    }
  });
  
  return routerConfig;
};

export interface NTHConfig {
  interfaces: string[];
  nthValues?: Array<{ every: number; packet: number }>;
}

export const configureNTH = (config: NTHConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip firewall mangle": [],
    "/ip route": [],
  };
  
  const { interfaces } = config;
  const nthValues = config.nthValues || generateNTHValues(interfaces.length);
  
  interfaces.forEach((iface, index) => {
    routerConfig["/ip firewall mangle"].push(
      `add action=mark-connection chain=input in-interface=${iface} new-connection-mark=nth_wan${index + 1} passthrough=yes`
    );
  });
  
  interfaces.forEach((_, index) => {
    routerConfig["/ip firewall mangle"].push(
      `add action=mark-routing chain=output connection-mark=nth_wan${index + 1} new-routing-mark=to_nth_wan${index + 1} passthrough=yes`
    );
  });
  
  interfaces.forEach((_, index) => {
    const nth = nthValues[index];
    
    routerConfig["/ip firewall mangle"].push(
      `add action=mark-connection chain=prerouting dst-address-type=!local \\
    in-interface-list=LAN new-connection-mark=nth_wan${index + 1} \\
    nth=${nth.every},${nth.packet} passthrough=yes`
    );
  });
  
  interfaces.forEach((_, index) => {
    routerConfig["/ip firewall mangle"].push(
      `add action=mark-routing chain=prerouting connection-mark=nth_wan${index + 1} \\
    in-interface-list=LAN new-routing-mark=nth_wan${index + 1} passthrough=yes`
    );
  });
  
  interfaces.forEach((iface, index) => {
    routerConfig["/ip route"].push(
      `add distance=1 gateway=${iface} routing-table=nth_wan${index + 1}`
    );
  });
  
  return routerConfig;
};

export interface BondingConfig {
  interfaces: string[];
  mode: "balance-rr" | "active-backup" | "balance-xor" | "broadcast" | "802.3ad" | "balance-tlb" | "balance-alb";
  name?: string;
  primaryInterface?: string;
  lacpRate?: "30secs" | "fast";
  transmitHashPolicy?: "layer-2" | "layer-2-and-3" | "layer-3-and-4";
  miiInterval?: number;
  downDelay?: number;
  upDelay?: number;
}

export const configureBonding = (config: BondingConfig): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/interface bonding": [],
  };
  
  const {
    interfaces,
    mode,
    name = "bond1",
    primaryInterface,
    lacpRate = "30secs",
    transmitHashPolicy = "layer-2-and-3",
    miiInterval = 100,
    downDelay = 200,
    upDelay = 200,
  } = config;
  
  const parts = [
    "add",
    `name=${name}`,
    `mode=${mode}`,
    `slaves=${interfaces.join(",")}`,
    `mii-interval=${miiInterval}ms`,
    `down-delay=${downDelay}ms`,
    `up-delay=${upDelay}ms`,
  ];
  
  if (primaryInterface && mode === "active-backup") {
    parts.push(`primary=${primaryInterface}`);
  }
  
  if (mode === "802.3ad") {
    parts.push(`lacp-rate=${lacpRate}`);
  }
  
  if (["balance-xor", "802.3ad", "balance-tlb", "balance-alb"].includes(mode)) {
    parts.push(`transmit-hash-policy=${transmitHashPolicy}`);
  }
  
  routerConfig["/interface bonding"].push(parts.join(" "));
  
  return routerConfig;
};

export const generateMangle = (
  method: LoadBalanceMethod,
  interfaces: string[],
): RouterConfig => {
  switch (method) {
    case "PCC":
      return configurePCC({
        interfaces,
        classifier: "both-addresses",
      });
    
    case "ECMP":
      return configureECMP({
        gateways: interfaces.map(iface => ({ gateway: iface })),
      });
    
    case "NTH":
      return configureNTH({ interfaces });
    
    case "Bonding":
      return configureBonding({
        interfaces,
        mode: "balance-rr",
      });
    
    default:
      return {};
  }
};

export const calculateWeight = (
  bandwidths: number[],
): number[] => {
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  
  const findGCD = (arr: number[]): number => {
    return arr.reduce((acc, val) => gcd(acc, val));
  };
  
  const divisor = findGCD(bandwidths);
  return bandwidths.map(bw => Math.round(bw / divisor));
};

function generateNTHValues(count: number): Array<{ every: number; packet: number }> {
  const values: Array<{ every: number; packet: number }> = [];
  
  for (let i = 0; i < count; i++) {
    values.push({
      every: count,
      packet: i,
    });
  }
  
  return values;
}

export const configureLoadBalanceWithFailover = (
  method: LoadBalanceMethod,
  primaryInterfaces: string[],
  backupInterfaces: string[],
): RouterConfig => {
  const config: RouterConfig = {
    ...generateMangle(method, primaryInterfaces),
    "/ip route": [],
  };
  
  primaryInterfaces.forEach((iface, _index) => {
    config["/ip route"].push(
      `add distance=1 gateway=${iface} check-gateway=ping`
    );
  });
  
  backupInterfaces.forEach((iface, index) => {
    config["/ip route"].push(
      `add distance=${10 + index} gateway=${iface} check-gateway=ping`
    );
  });
  
  return config;
};

export const configureWeightedPCC = (
  interfaces: Array<{ name: string; weight: number }>,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall mangle": [],
    "/ip route": [],
  };
  
  const totalWeight = interfaces.reduce((sum, iface) => sum + iface.weight, 0);
  let currentWeight = 0;
  
  interfaces.forEach((iface, index) => {
    const startRange = currentWeight;
    const endRange = currentWeight + iface.weight - 1;
    
    for (let i = startRange; i <= endRange; i++) {
      config["/ip firewall mangle"].push(
        `add action=mark-connection chain=prerouting dst-address-type=!local \\
      in-interface-list=LAN new-connection-mark=wan${index + 1}_conn \\
      passthrough=yes per-connection-classifier=both-addresses:${totalWeight}/${i}`
      );
    }
    
    currentWeight += iface.weight;
    
    config["/ip firewall mangle"].push(
      `add action=mark-routing chain=prerouting connection-mark=wan${index + 1}_conn \\
    in-interface-list=LAN new-routing-mark=to_wan${index + 1} passthrough=yes`
    );
    
    config["/ip route"].push(
      `add distance=1 gateway=${iface.name} routing-table=to_wan${index + 1}`
    );
  });
  
  return config;
};