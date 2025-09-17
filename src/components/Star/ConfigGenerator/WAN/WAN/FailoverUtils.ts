import type { RouterConfig } from "../../ConfigGenerator";
import type { FailoverConfig } from "../../../StarContext/WANType";

export interface FailoverLink {
  interface: string;
  gateway: string;
  priority: number;
  checkTarget?: string;
  routingTable?: string;
  comment?: string;
}

export const configureFailover = (
  links: FailoverLink[],
  config?: FailoverConfig,
): RouterConfig => {
  const routerConfig: RouterConfig = {
    "/ip route": [],
  };
  
  const {
    failoverCheckInterval = 10,
    failoverTimeout = 2,
  } = config || {};
  
  const sortedLinks = [...links].sort((a, b) => a.priority - b.priority);
  
  sortedLinks.forEach((link, index) => {
    const distance = (index + 1) * 10;
    const checkTarget = link.checkTarget || "8.8.8.8";
    
    const routeParts = [
      "add",
      "dst-address=0.0.0.0/0",
      `gateway=${link.gateway}`,
      `distance=${distance}`,
      "check-gateway=ping",
    ];
    
    if (link.routingTable) {
      routeParts.push(`routing-table=${link.routingTable}`);
    }
    
    if (link.comment) {
      routeParts.push(`comment="${link.comment}"`);
    }
    
    routerConfig["/ip route"].push(routeParts.join(" "));
    
    routerConfig["/ip route"].push(
      `add dst-address=${checkTarget} gateway=${link.gateway} scope=10`
    );
  });
  
  const script = generateHealthCheckScript(links, failoverCheckInterval, failoverTimeout);
  
  routerConfig["/system script"] = [
    `add name=failover-monitor source="${script}"`
  ];
  
  routerConfig["/system scheduler"] = [
    `add name=failover-schedule interval=${failoverCheckInterval}s on-event=failover-monitor`
  ];
  
  return routerConfig;
};

export const createRecursiveRoute = (
  gateway: string,
  target: string,
  options: {
    distance?: number;
    scope?: number;
    targetScope?: number;
    routingTable?: string;
    comment?: string;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/ip route": [],
  };
  
  const {
    distance = 1,
    scope = 10,
    targetScope = 10,
    routingTable,
    comment,
  } = options;
  
  config["/ip route"].push(
    `add dst-address=${target}/32 gateway=${gateway} scope=${scope}`,
    `add dst-address=0.0.0.0/0 gateway=${target} distance=${distance} \\
    target-scope=${targetScope} check-gateway=ping \\
    ${routingTable ? `routing-table=${routingTable}` : ""} \\
    ${comment ? `comment="${comment}"` : ""}`.trim()
  );
  
  return config;
};

export const generateHealthCheckScript = (
  links: FailoverLink[],
  checkInterval: number,
  timeout: number,
): string => {
  const scriptLines: string[] = [
    `:local primaryGateway "${links[0].gateway}"`,
    `:local primaryTarget "${links[0].checkTarget || "8.8.8.8"}"`,
    `:local checkInterval ${checkInterval}`,
    `:local timeout ${timeout}`,
    "",
  ];
  
  links.forEach((link, index) => {
    scriptLines.push(
      `:local link${index}Gateway "${link.gateway}"`,
      `:local link${index}Target "${link.checkTarget || "8.8.8.8"}"`,
      `:local link${index}Status [/ping $link${index}Target count=3 interval=$timeout]`,
      ""
    );
  });
  
  scriptLines.push(
    `:foreach route in=[/ip route find dst-address=0.0.0.0/0] do={`,
    `  :local gateway [/ip route get $route gateway]`,
    `  :local distance [/ip route get $route distance]`,
    `  :local disabled [/ip route get $route disabled]`,
    ""
  );
  
  links.forEach((link, index) => {
    scriptLines.push(
      `  :if ($gateway = $link${index}Gateway) do={`,
      `    :if ($link${index}Status = 0 && $disabled = false) do={`,
      `      /ip route set $route disabled=yes`,
      `      :log warning "Link ${index + 1} (${link.gateway}) failed, disabling route"`,
      `    }`,
      `    :if ($link${index}Status > 0 && $disabled = true) do={`,
      `      /ip route set $route disabled=no`,
      `      :log info "Link ${index + 1} (${link.gateway}) recovered, enabling route"`,
      `    }`,
      `  }`,
      ""
    );
  });
  
  scriptLines.push(`}`);
  
  return scriptLines.join("\\r\\n");
};

export const setFailoverPriority = (
  gateway: string,
  priority: number,
): RouterConfig => {
  const distance = priority * 10;
  
  return {
    "/ip route": [
      `set [ find gateway=${gateway} dst-address=0.0.0.0/0 ] distance=${distance}`
    ],
  };
};

export const configureGatewayCheck = (
  gateway: string,
  checkMethod: "ping" | "arp" | "none",
  checkTargets?: string[],
): RouterConfig => {
  const config: RouterConfig = {
    "/ip route": [],
  };
  
  config["/ip route"].push(
    `set [ find gateway=${gateway} ] check-gateway=${checkMethod}`
  );
  
  if (checkMethod === "ping" && checkTargets) {
    checkTargets.forEach(target => {
      config["/ip route"].push(
        `add dst-address=${target}/32 gateway=${gateway} scope=10`
      );
    });
  }
  
  return config;
};

export const createNetwatch = (
  host: string,
  upScript: string,
  downScript: string,
  options: {
    interval?: number;
    timeout?: number;
    comment?: string;
  } = {},
): RouterConfig => {
  const {
    interval = 10,
    timeout = 1000,
    comment,
  } = options;
  
  const config: RouterConfig = {
    "/tool netwatch": [],
  };
  
  const parts = [
    "add",
    `host=${host}`,
    `interval=${interval}s`,
    `timeout=${timeout}ms`,
    `up-script="${upScript}"`,
    `down-script="${downScript}"`,
  ];
  
  if (comment) {
    parts.push(`comment="${comment}"`);
  }
  
  config["/tool netwatch"].push(parts.join(" \\\n    "));
  
  return config;
};

export const configureAdvancedFailover = (
  primaryLink: {
    interface: string;
    gateway: string;
    checkTargets: string[];
  },
  backupLinks: Array<{
    interface: string;
    gateway: string;
    priority: number;
  }>,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip route": [],
    "/system script": [],
    "/system scheduler": [],
  };
  
  primaryLink.checkTargets.forEach(target => {
    config["/ip route"].push(
      `add dst-address=${target}/32 gateway=${primaryLink.gateway} scope=10`
    );
  });
  
  config["/ip route"].push(
    `add dst-address=0.0.0.0/0 gateway=${primaryLink.checkTargets.join(",")} distance=1 check-gateway=ping`
  );
  
  backupLinks
    .sort((a, b) => a.priority - b.priority)
    .forEach((link, index) => {
      config["/ip route"].push(
        `add dst-address=0.0.0.0/0 gateway=${link.gateway} distance=${(index + 2) * 10}`
      );
    });
  
  const scriptName = "advanced-failover";
  const script = [
    `:local primaryStatus [/ip route get [find gateway~"${primaryLink.checkTargets.join("|")}" dst-address=0.0.0.0/0] active]`,
    `:if ($primaryStatus = false) do={`,
    `  :log warning "Primary link failed, switching to backup"`,
    `  /ip firewall connection remove [find]`,
    `} else={`,
    `  :log info "Primary link active"`,
    `}`,
  ].join("\\r\\n");
  
  config["/system script"].push(
    `add name=${scriptName} source="${script}"`
  );
  
  config["/system scheduler"].push(
    `add name=schedule-${scriptName} interval=30s on-event=${scriptName}`
  );
  
  return config;
};

export const configureConnectionTracking = (
  interfaces: string[],
): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall mangle": [],
  };
  
  interfaces.forEach((iface, index) => {
    config["/ip firewall mangle"].push(
      `add action=mark-connection chain=input in-interface=${iface} new-connection-mark=wan${index + 1}_conn passthrough=yes`,
      `add action=mark-routing chain=output connection-mark=wan${index + 1}_conn new-routing-mark=to_wan${index + 1} passthrough=yes`
    );
  });
  
  return config;
};

export const createFailoverNotification = (
  emailTo: string,
  smtpServer?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/tool e-mail": [],
    "/system script": [],
  };
  
  if (smtpServer) {
    config["/tool e-mail"].push(
      `set address=${smtpServer} from=mikrotik@router.local`
    );
  }
  
  const script = [
    `:local currentTime [/system clock get time]`,
    `:local currentDate [/system clock get date]`,
    `:local subject "WAN Failover Alert - $currentDate $currentTime"`,
    `:local body "WAN failover occurred at $currentTime on $currentDate"`,
    `/tool e-mail send to="${emailTo}" subject="$subject" body="$body"`,
    `:log warning "Failover notification sent to ${emailTo}"`,
  ].join("\\r\\n");
  
  config["/system script"].push(
    `add name=failover-notify source="${script}"`
  );
  
  return config;
};

export const configureDualWANFailover = (
  wan1: { interface: string; gateway: string },
  wan2: { interface: string; gateway: string },
): RouterConfig => {
  const config: RouterConfig = {
    "/ip route": [],
    "/ip firewall nat": [],
    "/ip firewall mangle": [],
  };
  
  config["/ip route"].push(
    `add dst-address=8.8.8.8/32 gateway=${wan1.gateway} scope=10`,
    `add dst-address=8.8.4.4/32 gateway=${wan2.gateway} scope=10`,
    `add dst-address=0.0.0.0/0 gateway=8.8.8.8 distance=1 check-gateway=ping`,
    `add dst-address=0.0.0.0/0 gateway=8.8.4.4 distance=2 check-gateway=ping`
  );
  
  config["/ip firewall nat"].push(
    `add chain=srcnat out-interface=${wan1.interface} action=masquerade`,
    `add chain=srcnat out-interface=${wan2.interface} action=masquerade`
  );
  
  config["/ip firewall mangle"].push(
    `add action=mark-connection chain=input in-interface=${wan1.interface} new-connection-mark=wan1_conn`,
    `add action=mark-connection chain=input in-interface=${wan2.interface} new-connection-mark=wan2_conn`,
    `add action=mark-routing chain=output connection-mark=wan1_conn new-routing-mark=to_wan1`,
    `add action=mark-routing chain=output connection-mark=wan2_conn new-routing-mark=to_wan2`
  );
  
  return config;
};