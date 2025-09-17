import type { RouterConfig } from "../../ConfigGenerator";
import type { InterfaceType } from "../../../StarContext/CommonType";
import type { StaticIPConfig } from "../../../StarContext/Utils/WANLinkType";

export const configureStaticIP = (
  interfaceName: InterfaceType,
  config: StaticIPConfig,
  comment?: string,
): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip address": [],
    "/ip route": [],
    "/ip dns": [],
  };
  
  const cidr = calculateCIDR(config.subnet);
  
  const addressParts = [
    "add",
    `address=${config.ipAddress}/${cidr}`,
    `interface=${interfaceName}`,
  ];
  
  if (comment) {
    addressParts.push(`comment="${comment}"`);
  }
  
  routerConfig["/ip address"].push(addressParts.join(" "));
  
  routerConfig["/ip route"].push(
    `add gateway=${config.gateway} distance=1`
  );
  
  if (config.DNS) {
    const dnsServers = config.DNS.split(",").map(dns => dns.trim());
    routerConfig["/ip dns"].push(
      `set servers=${dnsServers.join(",")}`
    );
  }
  
  return routerConfig;
};

export const addStaticRoute = (
  destination: string,
  gateway: string,
  options: {
    distance?: number;
    routingTable?: string;
    comment?: string;
    check?: "ping" | "arp" | "none";
    scope?: number;
    targetScope?: number;
    disabled?: boolean;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/ip route": [],
  };
  
  const {
    distance = 1,
    routingTable,
    comment,
    check = "ping",
    scope,
    targetScope,
    disabled = false,
  } = options;
  
  const parts = [
    "add",
    `dst-address=${destination}`,
    `gateway=${gateway}`,
    `distance=${distance}`,
    `disabled=${disabled ? "yes" : "no"}`,
  ];
  
  if (routingTable) {
    parts.push(`routing-table=${routingTable}`);
  }
  
  if (comment) {
    parts.push(`comment="${comment}"`);
  }
  
  if (check !== "none") {
    parts.push(`check-gateway=${check}`);
  }
  
  if (scope !== undefined) {
    parts.push(`scope=${scope}`);
  }
  
  if (targetScope !== undefined) {
    parts.push(`target-scope=${targetScope}`);
  }
  
  config["/ip route"].push(parts.join(" "));
  
  return config;
};

export const configureStaticDNS = (
  servers: string[],
  options: {
    allowRemoteRequests?: boolean;
    cacheSize?: number;
    cacheMaxTTL?: string;
    queryServerTimeout?: string;
    queryTotalTimeout?: string;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/ip dns": [],
  };
  
  const {
    allowRemoteRequests = false,
    cacheSize = 2048,
    cacheMaxTTL = "1w",
    queryServerTimeout = "2s",
    queryTotalTimeout = "10s",
  } = options;
  
  const parts = [
    "set",
    `servers=${servers.join(",")}`,
    `allow-remote-requests=${allowRemoteRequests ? "yes" : "no"}`,
    `cache-size=${cacheSize}`,
    `cache-max-ttl=${cacheMaxTTL}`,
    `query-server-timeout=${queryServerTimeout}`,
    `query-total-timeout=${queryTotalTimeout}`,
  ];
  
  config["/ip dns"].push(parts.join(" "));
  
  return config;
};

export const validateIPConfig = (config: StaticIPConfig): boolean => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  
  if (!ipRegex.test(config.ipAddress)) {
    return false;
  }
  
  if (!ipRegex.test(config.gateway)) {
    return false;
  }
  
  if (!ipRegex.test(config.subnet) && !config.subnet.includes("/")) {
    return false;
  }
  
  const ipParts = config.ipAddress.split(".").map(Number);
  const gatewayParts = config.gateway.split(".").map(Number);
  
  for (const part of [...ipParts, ...gatewayParts]) {
    if (part < 0 || part > 255) {
      return false;
    }
  }
  
  if (config.DNS) {
    const dnsServers = config.DNS.split(",");
    for (const dns of dnsServers) {
      if (!ipRegex.test(dns.trim())) {
        return false;
      }
    }
  }
  
  return true;
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

export const calculateSubnetMask = (cidr: number): string => {
  if (cidr < 0 || cidr > 32) {
    throw new Error("Invalid CIDR value");
  }
  
  const mask = [];
  let bits = cidr;
  
  for (let i = 0; i < 4; i++) {
    const octetBits = Math.min(bits, 8);
    mask.push(256 - Math.pow(2, 8 - octetBits));
    bits -= octetBits;
  }
  
  return mask.join(".");
};

export const createStaticARP = (
  ipAddress: string,
  macAddress: string,
  interfaceName?: InterfaceType,
  comment?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip arp": [],
  };
  
  const parts = [
    "add",
    `address=${ipAddress}`,
    `mac-address=${macAddress}`,
  ];
  
  if (interfaceName) {
    parts.push(`interface=${interfaceName}`);
  }
  
  if (comment) {
    parts.push(`comment="${comment}"`);
  }
  
  config["/ip arp"].push(parts.join(" "));
  
  return config;
};

export const configureMultipleGateways = (
  gateways: Array<{
    gateway: string;
    distance: number;
    check?: "ping" | "arp" | "none";
    comment?: string;
    routingTable?: string;
  }>,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip route": [],
  };
  
  gateways.forEach(gw => {
    const route = addStaticRoute("0.0.0.0/0", gw.gateway, {
      distance: gw.distance,
      check: gw.check,
      comment: gw.comment,
      routingTable: gw.routingTable,
    });
    
    config["/ip route"].push(...route["/ip route"]);
  });
  
  return config;
};

export const createPolicyRoute = (
  srcAddress: string,
  routingTable: string,
  comment?: string,
): RouterConfig => {
  return {
    "/ip route rule": [
      `add src-address=${srcAddress} table=${routingTable} ${comment ? `comment="${comment}"` : ""}`.trim(),
    ],
  };
};

export const configureSourceNAT = (
  interfaceName: InterfaceType,
  srcAddress?: string,
  toAddress?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall nat": [],
  };
  
  const parts = [
    "add",
    "chain=srcnat",
    `out-interface=${interfaceName}`,
  ];
  
  if (srcAddress) {
    parts.push(`src-address=${srcAddress}`);
  }
  
  if (toAddress) {
    parts.push("action=src-nat", `to-addresses=${toAddress}`);
  } else {
    parts.push("action=masquerade");
  }
  
  config["/ip firewall nat"].push(parts.join(" "));
  
  return config;
};

export const validateIPInSubnet = (
  ipAddress: string,
  subnet: string,
  subnetMask: string,
): boolean => {
  const ipParts = ipAddress.split(".").map(Number);
  const subnetParts = subnet.split(".").map(Number);
  const maskParts = subnetMask.split(".").map(Number);
  
  for (let i = 0; i < 4; i++) {
    if ((ipParts[i] & maskParts[i]) !== (subnetParts[i] & maskParts[i])) {
      return false;
    }
  }
  
  return true;
};