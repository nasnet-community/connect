import { $, useContext, useSignal } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";

export type UsefulServicesMode = "easy" | "advanced";

export interface CertificateData {
  enableSelfSigned: boolean;
  enableLetsEncrypt: boolean;
}

export interface NTPData {
  servers: string[];
  timeZone: string;
  updateInterval: "1h" | "6h" | "12h" | "24h";
}

export interface GraphingData {
  enableInterface: boolean;
  enableQueue: boolean;
  enableResources: boolean;
}

export interface DDNSEntry {
  id: string;
  provider: "no-ip" | "dyndns" | "duckdns" | "cloudflare" | "custom";
  hostname: string;
  username: string;
  password: string;
  updateInterval: "5m" | "10m" | "30m" | "1h";
  customServerURL?: string;
}

export interface CloudDDNSData {
  enableDDNS: boolean;
  ddnsEntries: DDNSEntry[];
}

export interface UPNPData {
  enabled: boolean;
  linkType: "domestic" | "foreign" | "vpn" | "";
}

export interface NATPMPData {
  enabled: boolean;
  linkType: "domestic" | "foreign" | "vpn" | "";
}

export interface AdvancedServicesData {
  certificate: CertificateData;
  ntp: NTPData;
  graphing: GraphingData;
  cloudDDNS: CloudDDNSData;
  upnp: UPNPData;
  natpmp: NATPMPData;
}

export interface UseUsefulServicesReturn {
  advancedData: Signal<AdvancedServicesData>;
  updateAdvancedData: (data: Partial<AdvancedServicesData>) => void;
  saveEasyMode: (services: {
    certificate: boolean;
    ntp: boolean;
    graphing: boolean;
    DDNS: boolean;
  }) => void;
  saveAdvancedMode: () => void;
  isAdvancedModeComplete: Signal<boolean>;
}

export const useUsefulServices = (): UseUsefulServicesReturn => {
  const ctx = useContext(StarContext);

  // Initialize advanced data with defaults
  const advancedData = useSignal<AdvancedServicesData>({
    certificate: {
      enableSelfSigned: false,
      enableLetsEncrypt: false,
    },
    ntp: {
      servers: ["pool.ntp.org"],
      timeZone: "UTC",
      updateInterval: "1h",
    },
    graphing: {
      enableInterface: false,
      enableQueue: false,
      enableResources: false,
    },
    cloudDDNS: {
      enableDDNS: false,
      ddnsEntries: [],
    },
    upnp: {
      enabled: false,
      linkType: "domestic",
    },
    natpmp: {
      enabled: false,
      linkType: "domestic",
    },
  });

  // Check if advanced mode configuration is complete
  const isAdvancedModeComplete = useSignal<boolean>(false);

  const updateAdvancedData = $((data: Partial<AdvancedServicesData>) => {
    advancedData.value = {
      ...advancedData.value,
      ...data,
    };

    // Update completion status based on configured services
    const services = advancedData.value;
    const hasEnabledService =
      (services.certificate.enableSelfSigned || services.certificate.enableLetsEncrypt) ||
      services.ntp.servers.length > 0 ||
      (services.graphing.enableInterface || services.graphing.enableQueue || services.graphing.enableResources) ||
      services.cloudDDNS.enableDDNS ||
      services.upnp.enabled ||
      services.natpmp.enabled;

    isAdvancedModeComplete.value = hasEnabledService;
  });

  const saveEasyMode = $(
    (services: {
      certificate: boolean;
      ntp: boolean;
      graphing: boolean;
      DDNS: boolean;
    }) => {
      // Map easy mode selections to global state
      ctx.updateExtraConfig$({
        isCertificate: services.certificate,
        isNTP: services.ntp,
        isGraphing: services.graphing,
        isDDNS: services.DDNS,
      });
    },
  );

  const saveAdvancedMode = $(() => {
    const services = advancedData.value;

    // Convert advanced configuration to boolean flags for the global state
    ctx.updateExtraConfig$({
      isCertificate: services.certificate.enableSelfSigned || services.certificate.enableLetsEncrypt,
      isNTP: services.ntp.servers.length > 0,
      isGraphing: services.graphing.enableInterface || services.graphing.enableQueue || services.graphing.enableResources,
      isDDNS: services.cloudDDNS.enableDDNS,

      // Note: Store the detailed advanced configuration if needed
      // servicesAdvancedConfig can be added to ExtraConfigState if needed
    });
  });

  return {
    advancedData,
    updateAdvancedData,
    saveEasyMode,
    saveAdvancedMode,
    isAdvancedModeComplete,
  };
};
