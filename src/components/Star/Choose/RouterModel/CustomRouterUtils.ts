import type { RouterData } from "./Constants";
import type {
  CustomRouterForm,
  CustomEthernetConfig,
  CustomWirelessConfig,
  CustomSfpConfig,
} from "./CustomRouterTypes";
import type { Ethernet, Wireless, Sfp, LTE } from "../../StarContext/CommonType";
import type { RouterInterfaces } from "../../StarContext/ChooseType";

/**
 * Generate interface names for ethernet interfaces
 */
export function generateEthernetInterfaces(
  configs: CustomEthernetConfig[]
): Ethernet[] {
  const interfaces: Ethernet[] = [];
  let counter = 1;

  for (const config of configs) {
    for (let i = 0; i < config.count; i++) {
      interfaces.push(`ether${counter}` as Ethernet);
      counter++;
    }
  }

  return interfaces;
}

/**
 * Generate interface names for wireless interfaces
 */
export function generateWirelessInterfaces(
  configs: CustomWirelessConfig[]
): Wireless[] {
  const interfaces: Wireless[] = [];
  
  for (const config of configs) {
    for (let i = 0; i < config.count; i++) {
      if (config.band === "2.4") {
        interfaces.push("wifi2.4" as Wireless);
      } else if (config.band === "5") {
        // Allow multiple 5GHz interfaces
        if (i === 0) {
          interfaces.push("wifi5" as Wireless);
        } else {
          interfaces.push("wifi5-2" as Wireless);
        }
      } else if (config.band === "6") {
        // 6GHz band - use wifi5 as placeholder (RouterOS doesn't have wifi6 interface type yet)
        interfaces.push("wifi5" as Wireless);
      }
    }
  }

  return interfaces;
}

/**
 * Generate interface names for SFP interfaces
 */
export function generateSfpInterfaces(configs: CustomSfpConfig[]): Sfp[] {
  const interfaces: Sfp[] = [];
  let counter = 1;

  for (const config of configs) {
    for (let i = 0; i < config.count; i++) {
      if (config.type === "sfp+") {
        interfaces.push(`sfp-sfpplus${counter}` as Sfp);
      } else {
        interfaces.push(`sfp${counter}` as Sfp);
      }
      counter++;
    }
  }

  return interfaces;
}

/**
 * Generate interface names for LTE interfaces
 */
export function generateLteInterfaces(count: number): LTE[] {
  const interfaces: LTE[] = [];
  for (let i = 1; i <= count; i++) {
    interfaces.push(`lte${i}` as LTE);
  }
  return interfaces;
}

/**
 * Generate specs object for display
 */
export function generateSpecs(form: CustomRouterForm): RouterData["specs"] {
  const ethernetCount = form.ethernet.reduce((sum, config) => sum + config.count, 0);
  const wirelessCount = form.wireless.reduce((sum, config) => sum + config.count, 0);
  const sfpCount = form.sfp.reduce((sum, config) => sum + config.count, 0);

  // Build ethernet description
  const ethernetDescriptions = form.ethernet
    .map((config) => `${config.count}x ${config.speed.toUpperCase()}`)
    .join(", ");

  // Build wireless description
  const wirelessDescriptions = form.wireless
    .map((config) => `${config.count}x ${config.band}GHz`)
    .join(", ");

  // Build SFP description
  const sfpDescriptions = form.sfp
    .map((config) => `${config.count}x ${config.type.toUpperCase()}`)
    .join(", ");

  return {
    CPU: form.cpuArch || "Custom",
    RAM: form.isCHR ? "Virtual" : "N/A",
    Storage: form.isCHR ? "Virtual" : "N/A",
    Ports: ethernetCount > 0 ? ethernetDescriptions : "N/A",
    "Wi-Fi": wirelessCount > 0 ? wirelessDescriptions : "None",
    Speed: ethernetCount > 0 || sfpCount > 0 ? 
      `${ethernetDescriptions}${sfpCount > 0 ? `, ${sfpDescriptions}` : ""}` : "N/A",
  };
}

/**
 * Generate features list for display
 */
export function generateFeatures(form: CustomRouterForm): string[] {
  const features: string[] = [];

  if (form.isCHR) {
    features.push($localize`Cloud Hosted Router (CHR)`);
  }

  const ethernetCount = form.ethernet.reduce((sum, config) => sum + config.count, 0);
  if (ethernetCount > 0) {
    features.push(
      $localize`${ethernetCount}:ethernet_count: Ethernet Port${ethernetCount > 1 ? "s" : ""}`
    );
  }

  const wirelessCount = form.wireless.reduce((sum, config) => sum + config.count, 0);
  if (wirelessCount > 0) {
    features.push($localize`${wirelessCount}:wireless_count: Wireless Interface${wirelessCount > 1 ? "s" : ""}`);
  }

  const sfpCount = form.sfp.reduce((sum, config) => sum + config.count, 0);
  if (sfpCount > 0) {
    features.push($localize`${sfpCount}:sfp_count: SFP Port${sfpCount > 1 ? "s" : ""}`);
  }

  if (form.lte > 0) {
    features.push($localize`${form.lte}:lte_count: LTE Modem${form.lte > 1 ? "s" : ""}`);
  }

  if (form.cpuArch) {
    features.push($localize`${form.cpuArch}:cpu_arch: CPU Architecture`);
  }

  return features;
}

/**
 * Validate custom router form data
 */
export function validateCustomRouterForm(form: CustomRouterForm): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!form.name || form.name.trim().length === 0) {
    errors.push($localize`Router name is required`);
  }

  if (form.name.length > 50) {
    errors.push($localize`Router name must be 50 characters or less`);
  }

  const totalInterfaces =
    form.ethernet.reduce((sum, config) => sum + config.count, 0) +
    form.wireless.reduce((sum, config) => sum + config.count, 0) +
    form.sfp.reduce((sum, config) => sum + config.count, 0) +
    form.lte;

  if (totalInterfaces === 0) {
    errors.push($localize`Router must have at least one interface`);
  }

  // Validate ethernet configs
  for (const config of form.ethernet) {
    if (config.count < 0 || config.count > 32) {
      errors.push($localize`Ethernet count must be between 0 and 32`);
    }
  }

  // Validate wireless configs
  for (const config of form.wireless) {
    if (config.count < 0 || config.count > 5) {
      errors.push($localize`Wireless count must be between 0 and 5`);
    }
  }

  // Validate SFP configs
  for (const config of form.sfp) {
    if (config.count < 0 || config.count > 32) {
      errors.push($localize`SFP count must be between 0 and 32`);
    }
  }

  // Validate LTE
  if (form.lte < 0 || form.lte > 5) {
    errors.push($localize`LTE count must be between 0 and 5`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Convert CustomRouterForm to RouterData format
 */
export function convertFormToRouterData(form: CustomRouterForm): RouterData {
  const ethernetInterfaces = generateEthernetInterfaces(form.ethernet);
  const wirelessInterfaces = generateWirelessInterfaces(form.wireless);
  const sfpInterfaces = generateSfpInterfaces(form.sfp);
  const lteInterfaces = generateLteInterfaces(form.lte);

  const interfaces: RouterInterfaces = {
    Interfaces: {
      ethernet: ethernetInterfaces.length > 0 ? ethernetInterfaces : undefined,
      wireless: wirelessInterfaces.length > 0 ? wirelessInterfaces : undefined,
      sfp: sfpInterfaces.length > 0 ? sfpInterfaces : undefined,
      lte: lteInterfaces.length > 0 ? lteInterfaces : undefined,
    },
    OccupiedInterfaces: [],
  };

  const specs = generateSpecs(form);
  const features = generateFeatures(form);

  const routerData: RouterData = {
    model: form.name,
    icon: "router",
    title: form.name,
    description: form.isCHR
      ? $localize`Custom Cloud Hosted Router configuration`
      : $localize`Custom router configuration`,
    specs,
    features,
    isWireless: wirelessInterfaces.length > 0,
    isLTE: lteInterfaces.length > 0,
    isSFP: sfpInterfaces.length > 0,
    interfaces,
    canBeMaster: true,
    canBeSlave: true,
    images: ["/images/routers/placeholder.png"],
    networkCapabilities: {
      vpnProtocols: ["OpenVPN", "WireGuard", "L2TP", "PPTP", "SSTP", "IKEv2"],
      maxConnections: 1000,
      routingProtocols: ["BGP", "OSPF", "RIP"],
      vlanSupport: true,
      qosFeatures: ["HTB", "SFQ", "PCQ"],
      firewallType: "Stateful",
      throughput: "Custom",
    },
  };

  return routerData;
}

/**
 * Generate a unique router model name
 */
export function generateUniqueRouterName(
  baseName: string,
  existingRouters: RouterData[]
): string {
  let name = baseName;
  let counter = 1;

  while (existingRouters.some((r) => r.model === name)) {
    name = `${baseName} (${counter})`;
    counter++;
  }

  return name;
}

