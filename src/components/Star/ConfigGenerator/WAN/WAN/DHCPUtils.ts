import type { RouterConfig } from "../../ConfigGenerator";
import type { InterfaceType } from "../../../StarContext/CommonType";

export interface DHCPClientOptions {
  addDefaultRoute?: boolean;
  defaultRouteDistance?: number;
  usePeerDNS?: boolean;
  usePeerNTP?: boolean;
  dhcpOptions?: string;
  clientId?: string;
  hostname?: string;
  comment?: string;
  script?: string;
  disabled?: boolean;
}

export const createDHCPClient = (
  interfaceName: InterfaceType,
  options: DHCPClientOptions = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/ip dhcp-client": [],
  };
  
  const {
    addDefaultRoute = true,
    defaultRouteDistance = 1,
    usePeerDNS = true,
    usePeerNTP = true,
    dhcpOptions,
    clientId,
    hostname,
    comment,
    script,
    disabled = false,
  } = options;
  
  const parts = [
    "add",
    `interface=${interfaceName}`,
    `add-default-route=${addDefaultRoute ? "yes" : "no"}`,
    `default-route-distance=${defaultRouteDistance}`,
    `use-peer-dns=${usePeerDNS ? "yes" : "no"}`,
    `use-peer-ntp=${usePeerNTP ? "yes" : "no"}`,
    `disabled=${disabled ? "yes" : "no"}`,
  ];
  
  if (dhcpOptions) {
    parts.push(`dhcp-options="${dhcpOptions}"`);
  }
  
  if (clientId) {
    parts.push(`client-id="${clientId}"`);
  }
  
  if (hostname) {
    parts.push(`host-name="${hostname}"`);
  }
  
  if (comment) {
    parts.push(`comment="${comment}"`);
  }
  
  if (script) {
    parts.push(`script="${script}"`);
  }
  
  config["/ip dhcp-client"].push(parts.join(" \\\n    "));
  
  return config;
};

export const configureDHCPOptions = (
  interfaceName: InterfaceType,
  options: {
    hostname?: string;
    clientId?: string;
    vendorClassId?: string;
  },
): RouterConfig => {
  const config: RouterConfig = {
    "/ip dhcp-client": [],
  };
  
  const parts = [`set [ find interface=${interfaceName} ]`];
  
  if (options.hostname) {
    parts.push(`host-name="${options.hostname}"`);
  }
  
  if (options.clientId) {
    parts.push(`client-id="${options.clientId}"`);
  }
  
  if (options.vendorClassId) {
    parts.push(`dhcp-options="vendor-class-id=${options.vendorClassId}"`);
  }
  
  config["/ip dhcp-client"].push(parts.join(" "));
  
  return config;
};

export const setDHCPRouting = (
  interfaceName: InterfaceType,
  routingTable?: string,
  routeComment?: string,
): RouterConfig => {
  const script = generateDHCPScript({
    onBound: {
      updateRoute: true,
      routingTable,
      routeComment,
    },
  });
  
  return {
    "/ip dhcp-client": [
      `set [ find interface=${interfaceName} ] script="${script}"`,
    ],
  };
};

export interface DHCPScriptOptions {
  onBound?: {
    updateRoute?: boolean;
    routingTable?: string;
    routeComment?: string;
    customCommands?: string[];
  };
  onRenew?: {
    customCommands?: string[];
  };
  onRelease?: {
    customCommands?: string[];
  };
}

export const generateDHCPScript = (options: DHCPScriptOptions): string => {
  const scriptLines: string[] = [];
  
  if (options.onBound) {
    scriptLines.push(`:if ($bound=1) do={`);
    
    if (options.onBound.updateRoute) {
      scriptLines.push(`  :local gw $"gateway-address"`);
      
      if (options.onBound.routeComment) {
        scriptLines.push(
          `  /ip route set [ find comment="${options.onBound.routeComment}" gateway!=$gw ] gateway=$gw`
        );
      } else {
        const routingTablePart = options.onBound.routingTable 
          ? ` routing-table=${options.onBound.routingTable}` 
          : "";
        scriptLines.push(
          `  /ip route remove [ find gateway=$interface dynamic=no${routingTablePart} ]`,
          `  /ip route add dst-address=0.0.0.0/0 gateway=$gw${routingTablePart}`
        );
      }
    }
    
    if (options.onBound.customCommands) {
      scriptLines.push(...options.onBound.customCommands.map(cmd => `  ${cmd}`));
    }
    
    scriptLines.push(`}`);
  }
  
  if (options.onRenew) {
    scriptLines.push(`:if ($renew=1) do={`);
    if (options.onRenew.customCommands) {
      scriptLines.push(...options.onRenew.customCommands.map(cmd => `  ${cmd}`));
    }
    scriptLines.push(`}`);
  }
  
  if (options.onRelease) {
    scriptLines.push(`:if ($"lease-expired"=1) do={`);
    if (options.onRelease.customCommands) {
      scriptLines.push(...options.onRelease.customCommands.map(cmd => `  ${cmd}`));
    }
    scriptLines.push(`}`);
  }
  
  return scriptLines.join("\\r\\n");
};

export const createDHCPWithFallback = (
  interfaceName: InterfaceType,
  fallbackIP: string,
  fallbackGateway: string,
  fallbackDNS?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip dhcp-client": [],
    "/system script": [],
    "/system scheduler": [],
  };
  
  const script = [
    `:local interface "${interfaceName}"`,
    `:local dhcpStatus [/ip dhcp-client get [find interface=$interface] status]`,
    `:if ($dhcpStatus != "bound") do={`,
    `  :if ([/ip address find interface=$interface] = "") do={`,
    `    /ip address add address=${fallbackIP} interface=$interface`,
    `    /ip route add gateway=${fallbackGateway}`,
    fallbackDNS ? `    /ip dns set servers=${fallbackDNS}` : "",
    `    :log warning "DHCP failed on $interface, using fallback IP"`,
    `  }`,
    `} else={`,
    `  /ip address remove [find interface=$interface dynamic=no]`,
    `  /ip route remove [find gateway=${fallbackGateway} dynamic=no]`,
    `}`,
  ].filter(line => line).join("\\r\\n");
  
  const scriptName = `dhcp-fallback-${interfaceName}`;
  
  config["/ip dhcp-client"] = createDHCPClient(interfaceName)["/ip dhcp-client"];
  
  config["/system script"].push(
    `add name=${scriptName} source="${script}"`
  );
  
  config["/system scheduler"].push(
    `add name=schedule-${scriptName} interval=1m on-event=${scriptName}`
  );
  
  return config;
};

export const configureDHCPClientAdvanced = (
  interfaceName: InterfaceType,
  advancedOptions: {
    requestList?: string[];
    sendBeforeList?: string[];
    releaseOnShutdown?: boolean;
  },
): RouterConfig => {
  const config: RouterConfig = {
    "/ip dhcp-client": [],
    "/ip dhcp-client option": [],
  };
  
  if (advancedOptions.requestList) {
    const optionName = `${interfaceName}-request`;
    config["/ip dhcp-client option"].push(
      `add code=55 name=${optionName} value='${advancedOptions.requestList.join(",")}'`
    );
  }
  
  if (advancedOptions.sendBeforeList) {
    advancedOptions.sendBeforeList.forEach((option, index) => {
      const optionName = `${interfaceName}-send-${index}`;
      config["/ip dhcp-client option"].push(
        `add name=${optionName} ${option}`
      );
    });
  }
  
  const parts = [`set [ find interface=${interfaceName} ]`];
  
  if (advancedOptions.releaseOnShutdown !== undefined) {
    parts.push(`release-on-shutdown=${advancedOptions.releaseOnShutdown ? "yes" : "no"}`);
  }
  
  if (parts.length > 1) {
    config["/ip dhcp-client"].push(parts.join(" "));
  }
  
  return config;
};

export const monitorDHCPLease = (
  interfaceName: InterfaceType,
  alertThreshold: number = 300,
): RouterConfig => {
  const config: RouterConfig = {
    "/system script": [],
  };
  
  const script = [
    `:local interface "${interfaceName}"`,
    `:local client [/ip dhcp-client find interface=$interface]`,
    `:if ($client != "") do={`,
    `  :local expiresAfter [/ip dhcp-client get $client expires-after]`,
    `  :if ($expiresAfter < ${alertThreshold}) do={`,
    `    :log warning "DHCP lease on $interface expires in $expiresAfter seconds"`,
    `  }`,
    `}`,
  ].join("\\r\\n");
  
  config["/system script"].push(
    `add name=monitor-dhcp-${interfaceName} source="${script}"`
  );
  
  return config;
};