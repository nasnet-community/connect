import type { RouterConfig } from "../../ConfigGenerator";
import type { InterfaceType } from "../../../StarContext/CommonType";
import type { PPPoEConfig } from "../../../StarContext/Utils/WANLinkType";

export interface PPPoEClientOptions {
  name?: string;
  addDefaultRoute?: boolean;
  usePeerDNS?: boolean;
  usePeerNTP?: boolean;
  dialOnDemand?: boolean;
  maxMTU?: number;
  maxMRU?: number;
  keepaliveTimeout?: number;
  defaultRouteDistance?: number;
  comment?: string;
  script?: string;
}

export const createPPPoEClient = (
  interfaceName: InterfaceType,
  config: PPPoEConfig,
  options: PPPoEClientOptions = {},
): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/interface pppoe-client": [],
  };
  
  const {
    name = `pppoe-${interfaceName}`,
    addDefaultRoute = true,
    usePeerDNS = true,
    usePeerNTP = false,
    dialOnDemand = false,
    maxMTU = 1480,
    maxMRU = 1480,
    keepaliveTimeout = 10,
    defaultRouteDistance = 1,
    comment,
    script,
  } = options;
  
  const parts = [
    "add",
    `interface=${interfaceName}`,
    `name=${name}`,
    `user="${config.username}"`,
    `password="${config.password}"`,
    `add-default-route=${addDefaultRoute ? "yes" : "no"}`,
    `use-peer-dns=${usePeerDNS ? "yes" : "no"}`,
    `use-peer-ntp=${usePeerNTP ? "yes" : "no"}`,
    `dial-on-demand=${dialOnDemand ? "yes" : "no"}`,
    `max-mtu=${maxMTU}`,
    `max-mru=${maxMRU}`,
    `keepalive-timeout=${keepaliveTimeout}`,
    `default-route-distance=${defaultRouteDistance}`,
    "disabled=no",
  ];
  
  if (comment) {
    parts.push(`comment="${comment}"`);
  }
  
  routerConfig["/interface pppoe-client"].push(parts.join(" \\\n    "));
  
  if (script) {
    routerConfig["/interface pppoe-client"].push(
      `set [ find name=${name} ] on-up="${script}"`
    );
  }
  
  return routerConfig;
};

export const configurePPPoEAuth = (
  pppoeName: string,
  username: string,
  password: string,
): RouterConfig => {
  return {
    "/interface pppoe-client": [
      `set [ find name=${pppoeName} ] user="${username}" password="${password}"`
    ],
  };
};

export const setPPPoERouting = (
  pppoeName: string,
  routingTable?: string,
  distance?: number,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip route": [],
  };
  
  const parts = [
    "add",
    "dst-address=0.0.0.0/0",
    `gateway=${pppoeName}`,
    `distance=${distance || 1}`,
  ];
  
  if (routingTable) {
    parts.push(`routing-table=${routingTable}`);
  }
  
  config["/ip route"].push(parts.join(" "));
  
  return config;
};

export const generatePPPoEScript = (
  action: "on-up" | "on-down",
  commands: string[],
): string => {
  const scriptLines = [
    `:local interface $interface`,
    `:local localAddress $"local-address"`,
    `:local remoteAddress $"remote-address"`,
    "",
  ];
  
  if (action === "on-up") {
    scriptLines.push(
      `:if ($bound=1) do={`,
      ...commands.map(cmd => `  ${cmd}`),
      `}`,
    );
  } else {
    scriptLines.push(...commands);
  }
  
  return scriptLines.join("\\r\\n");
};

export const createPPPoEWithVLAN = (
  interfaceName: InterfaceType,
  vlanId: number,
  config: PPPoEConfig,
  options: PPPoEClientOptions = {},
): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/interface vlan": [],
    "/interface pppoe-client": [],
  };
  
  const vlanName = `vlan${vlanId}-pppoe`;
  
  routerConfig["/interface vlan"].push(
    `add interface=${interfaceName} vlan-id=${vlanId} name=${vlanName}`
  );
  
  const pppoeConfig = createPPPoEClient(vlanName as InterfaceType, config, options);
  Object.assign(routerConfig, pppoeConfig);
  
  return routerConfig;
};

export const setPPPoEProfile = (
  pppoeName: string,
  profileName: string,
): RouterConfig => {
  return {
    "/interface pppoe-client": [
      `set [ find name=${pppoeName} ] profile=${profileName}`
    ],
  };
};

export const createPPPoEProfile = (
  profileName: string,
  settings: {
    localAddress?: string;
    remoteAddress?: string;
    bridgePort?: string;
    idleTimeout?: number;
    sessionTimeout?: number;
    rateLimit?: string;
  },
): RouterConfig => {
  const config: RouterConfig = {
    "/ppp profile": [],
  };
  
  const parts = ["add", `name=${profileName}`];
  
  if (settings.localAddress) {
    parts.push(`local-address=${settings.localAddress}`);
  }
  
  if (settings.remoteAddress) {
    parts.push(`remote-address=${settings.remoteAddress}`);
  }
  
  if (settings.bridgePort) {
    parts.push(`bridge=${settings.bridgePort}`);
  }
  
  if (settings.idleTimeout !== undefined) {
    parts.push(`idle-timeout=${settings.idleTimeout}`);
  }
  
  if (settings.sessionTimeout !== undefined) {
    parts.push(`session-timeout=${settings.sessionTimeout}`);
  }
  
  if (settings.rateLimit) {
    parts.push(`rate-limit="${settings.rateLimit}"`);
  }
  
  config["/ppp profile"].push(parts.join(" "));
  
  return config;
};

export const monitorPPPoEConnection = (
  pppoeName: string,
  checkInterval: number = 30,
  // maxRetries: number = 3,
): RouterConfig => {
  const config: RouterConfig = {
    "/system scheduler": [],
    "/system script": [],
  };
  
  const scriptName = `monitor-${pppoeName}`;
  const script = [
    `:local interface "${pppoeName}"`,
    `:local status [/interface pppoe-client get $interface running]`,
    `:if ($status != true) do={`,
    `  :log warning "PPPoE interface $interface is down, attempting to reconnect"`,
    `  /interface pppoe-client enable $interface`,
    `}`,
  ].join("\\r\\n");
  
  config["/system script"].push(
    `add name=${scriptName} source="${script}"`
  );
  
  config["/system scheduler"].push(
    `add name=schedule-${scriptName} interval=${checkInterval}s on-event=${scriptName}`
  );
  
  return config;
};

export const setPPPoEMSS = (
  pppoeName: string,
  mssValue: number = 1440,
): RouterConfig => {
  return {
    "/ip firewall mangle": [
      `add action=change-mss chain=forward in-interface=${pppoeName} new-mss=${mssValue} protocol=tcp tcp-flags=syn tcp-mss=1441-65535`,
      `add action=change-mss chain=forward out-interface=${pppoeName} new-mss=${mssValue} protocol=tcp tcp-flags=syn tcp-mss=1441-65535`,
    ],
  };
};