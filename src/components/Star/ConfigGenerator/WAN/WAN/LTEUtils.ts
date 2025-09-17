import type { RouterConfig } from "../../ConfigGenerator";
import type { LTE } from "../../../StarContext/CommonType";
import type { LTESettings } from "../../../StarContext/Utils/WANLinkType";

export interface LTEAdvancedSettings extends LTESettings {
  band?: string;
  earfcn?: number;
  networkMode?: "3g" | "lte" | "auto";
  allowRoaming?: boolean;
  pin?: string;
  plmn?: string;
  ipType?: 0 | 1 | 2;
}

export const configureLTEInterface = (
  interfaceName: LTE,
  settings: LTEAdvancedSettings,
  comment?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface lte": [],
    "/interface lte apn": [],
  };
  
  const apnName = `${interfaceName}-apn`;
  
  const apnParts = [
    "add",
    `name=${apnName}`,
    `apn="${settings.apn}"`,
  ];
  
  if (settings.username) {
    apnParts.push(`user="${settings.username}"`);
  }
  
  if (settings.password) {
    apnParts.push(`password="${settings.password}"`);
  }
  
  if (settings.ipType !== undefined) {
    apnParts.push(`ip-type=${settings.ipType}`);
  }
  
  config["/interface lte apn"].push(apnParts.join(" "));
  
  const lteParts = [
    `set [ find default-name=${interfaceName} ]`,
    `apn-profile=${apnName}`,
  ];
  
  if (settings.band) {
    lteParts.push(`band="${settings.band}"`);
  }
  
  if (settings.earfcn !== undefined) {
    lteParts.push(`earfcn=${settings.earfcn}`);
  }
  
  if (settings.networkMode) {
    const modeMap = {
      "3g": "3g-only",
      "lte": "lte-only",
      "auto": "auto",
    };
    lteParts.push(`network-mode=${modeMap[settings.networkMode]}`);
  }
  
  if (settings.allowRoaming !== undefined) {
    lteParts.push(`allow-roaming=${settings.allowRoaming ? "yes" : "no"}`);
  }
  
  if (settings.pin) {
    lteParts.push(`pin="${settings.pin}"`);
  }
  
  if (settings.plmn) {
    lteParts.push(`plmn="${settings.plmn}"`);
  }
  
  if (comment) {
    lteParts.push(`comment="${comment}"`);
  }
  
  config["/interface lte"].push(lteParts.join(" "));
  
  return config;
};

export const createAPNProfile = (
  profileName: string,
  apn: string,
  options: {
    username?: string;
    password?: string;
    authType?: "pap" | "chap" | "both";
    ipType?: "ipv4" | "ipv6" | "ipv4v6";
    defaultRouteDistance?: number;
    addDefaultRoute?: boolean;
    usePeerDNS?: boolean;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/interface lte apn": [],
  };
  
  const parts = [
    "add",
    `name=${profileName}`,
    `apn="${apn}"`,
  ];
  
  if (options.username) {
    parts.push(`user="${options.username}"`);
  }
  
  if (options.password) {
    parts.push(`password="${options.password}"`);
  }
  
  if (options.authType) {
    const authMap = {
      "pap": "pap",
      "chap": "chap",
      "both": "pap,chap",
    };
    parts.push(`authentication=${authMap[options.authType]}`);
  }
  
  if (options.ipType) {
    const ipTypeMap = {
      "ipv4": 0,
      "ipv6": 1,
      "ipv4v6": 2,
    };
    parts.push(`ip-type=${ipTypeMap[options.ipType]}`);
  }
  
  if (options.defaultRouteDistance !== undefined) {
    parts.push(`default-route-distance=${options.defaultRouteDistance}`);
  }
  
  if (options.addDefaultRoute !== undefined) {
    parts.push(`add-default-route=${options.addDefaultRoute ? "yes" : "no"}`);
  }
  
  if (options.usePeerDNS !== undefined) {
    parts.push(`use-peer-dns=${options.usePeerDNS ? "yes" : "no"}`);
  }
  
  config["/interface lte apn"].push(parts.join(" "));
  
  return config;
};

export const setLTEAuth = (
  interfaceName: LTE,
  apnProfile: string,
): RouterConfig => {
  return {
    "/interface lte": [
      `set [ find default-name=${interfaceName} ] apn-profile=${apnProfile}`,
    ],
  };
};

export const generateLTEMonitoring = (
  interfaceName: LTE,
  options: {
    checkInterval?: number;
    signalThreshold?: number;
    reconnectOnLowSignal?: boolean;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/system script": [],
    "/system scheduler": [],
  };
  
  const {
    checkInterval = 60,
    signalThreshold = -100,
    reconnectOnLowSignal = false,
  } = options;
  
  const scriptName = `monitor-lte-${interfaceName}`;
  
  const scriptLines = [
    `:local interface "${interfaceName}"`,
    `:local info [/interface lte info $interface once as-value]`,
    `:local rssi ($info->"rssi")`,
    `:local rsrp ($info->"rsrp")`,
    `:local rsrq ($info->"rsrq")`,
    `:local sinr ($info->"sinr")`,
    `:local status ($info->"registration-status")`,
    "",
    `:log info "LTE $interface - RSSI: $rssi, RSRP: $rsrp, RSRQ: $rsrq, SINR: $sinr, Status: $status"`,
    "",
    `:if ($status != "registered") do={`,
    `  :log warning "LTE $interface not registered, attempting reconnect"`,
    `  /interface lte disable $interface`,
    `  :delay 5s`,
    `  /interface lte enable $interface`,
    `}`,
  ];
  
  if (reconnectOnLowSignal) {
    scriptLines.push(
      "",
      `:if ($rsrp < ${signalThreshold}) do={`,
      `  :log warning "LTE $interface signal too low (RSRP: $rsrp), reconnecting"`,
      `  /interface lte at-chat $interface input="AT+CFUN=1,1"`,
      `}`,
    );
  }
  
  config["/system script"].push(
    `add name=${scriptName} source="${scriptLines.join("\\r\\n")}"`
  );
  
  config["/system scheduler"].push(
    `add name=schedule-${scriptName} interval=${checkInterval}s on-event=${scriptName}`
  );
  
  return config;
};

export const configureLTEBands = (
  interfaceName: LTE,
  bands: number[],
): RouterConfig => {
  const bandString = bands.join(",");
  
  return {
    "/interface lte": [
      `set [ find default-name=${interfaceName} ] band="${bandString}"`,
    ],
  };
};

export const setLTENetworkMode = (
  interfaceName: LTE,
  mode: "3g-only" | "lte-only" | "gsm-only" | "auto",
): RouterConfig => {
  return {
    "/interface lte": [
      `set [ find default-name=${interfaceName} ] network-mode=${mode}`,
    ],
  };
};

export const configureLTEFailover = (
  primaryInterface: string,
  lteInterface: LTE,
  options: {
    checkInterval?: number;
    pingTarget?: string;
    failoverThreshold?: number;
  } = {},
): RouterConfig => {
  const config: RouterConfig = {
    "/system script": [],
    "/system scheduler": [],
  };
  
  const {
    checkInterval = 10,
    pingTarget = "8.8.8.8",
    failoverThreshold = 3,
  } = options;
  
  const scriptName = `lte-failover-${lteInterface}`;
  
  const script = [
    `:local primaryInterface "${primaryInterface}"`,
    `:local lteInterface "${lteInterface}"`,
    `:local pingTarget "${pingTarget}"`,
    `:local failCount 0`,
    "",
    `:if ([/ping $pingTarget interface=$primaryInterface count=3] = 0) do={`,
    `  :set failCount ($failCount + 1)`,
    `  :if ($failCount >= ${failoverThreshold}) do={`,
    `    :log warning "Primary WAN failed, switching to LTE"`,
    `    /ip route set [find gateway=$primaryInterface] disabled=yes`,
    `    /ip route set [find gateway=$lteInterface] disabled=no`,
    `    /interface lte enable $lteInterface`,
    `  }`,
    `} else={`,
    `  :if ([/ip route get [find gateway=$primaryInterface] disabled] = true) do={`,
    `    :log info "Primary WAN restored, switching back from LTE"`,
    `    /ip route set [find gateway=$primaryInterface] disabled=no`,
    `    /ip route set [find gateway=$lteInterface] disabled=yes`,
    `  }`,
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

export const sendLTEATCommand = (
  interfaceName: LTE,
  command: string,
  waitFor?: string,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface lte": [],
  };
  
  if (waitFor) {
    config["/interface lte"].push(
      `at-chat ${interfaceName} input="${command}" wait="${waitFor}"`
    );
  } else {
    config["/interface lte"].push(
      `at-chat ${interfaceName} input="${command}"`
    );
  }
  
  return config;
};

export const configureLTEDualSIM = (
  interfaceName: LTE,
  primarySIM: 1 | 2,
  autoSwitch: boolean = false,
): RouterConfig => {
  const config: RouterConfig = {
    "/interface lte": [],
  };
  
  config["/interface lte"].push(
    `set [ find default-name=${interfaceName} ] sim-slot=${primarySIM}`
  );
  
  if (autoSwitch) {
    const scriptName = `dual-sim-switch-${interfaceName}`;
    const script = [
      `:local interface "${interfaceName}"`,
      `:local currentSlot [/interface lte get $interface sim-slot]`,
      `:local info [/interface lte info $interface once as-value]`,
      `:local status ($info->"registration-status")`,
      "",
      `:if ($status != "registered") do={`,
      `  :local newSlot 1`,
      `  :if ($currentSlot = 1) do={ :set newSlot 2 }`,
      `  :log warning "LTE not registered on SIM $currentSlot, switching to SIM $newSlot"`,
      `  /interface lte set $interface sim-slot=$newSlot`,
      `  :delay 30s`,
      `}`,
    ].join("\\r\\n");
    
    config["/system script"] = [
      `add name=${scriptName} source="${script}"`
    ];
    
    config["/system scheduler"] = [
      `add name=schedule-${scriptName} interval=2m on-event=${scriptName}`
    ];
  }
  
  return config;
};

export const setLTECellLock = (
  interfaceName: LTE,
  cellId: number,
  physCellId?: number,
): RouterConfig => {
  const parts = [`set [ find default-name=${interfaceName} ]`];
  
  if (cellId) {
    parts.push(`cell-id=${cellId}`);
  }
  
  if (physCellId !== undefined) {
    parts.push(`phys-cell-id=${physCellId}`);
  }
  
  return {
    "/interface lte": [parts.join(" ")],
  };
};