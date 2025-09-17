import { $, useContext, useSignal } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type {
  CertificateConfig,
  NTPConfig,
  GraphingConfig,
  DDNSEntry,
  CloudDDNSConfig,
  UPNPConfig,
  NATPMPConfig,
  UsefulServicesConfig,
} from "../../StarContext/ExtraType";

// Define missing types locally
export type UsefulServicesMode = "easy" | "advanced";
export type InterfaceOption = {
  label: string;
  value: string;
  type: 'domestic' | 'foreign' | 'vpn';
};

// Re-export types for backward compatibility
export type CertificateData = CertificateConfig;
export type NTPData = NTPConfig;
export type GraphingData = GraphingConfig;
export type CloudDDNSData = CloudDDNSConfig;
export type UPNPData = UPNPConfig;
export type NATPMPData = NATPMPConfig;
export type AdvancedServicesData = UsefulServicesConfig;

// Re-export other types
export type { DDNSEntry };

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

  // Initialize advanced data with defaults that match StarContext structure
  const advancedData = useSignal<AdvancedServicesData>({
    certificate: {
      SelfSigned: false,
      LetsEncrypt: false,
    },
    ntp: {
      servers: ["pool.ntp.org"],
      updateInterval: "1h",
    },
    graphing: {
      Interface: false,
      Queue: false,
      Resources: false,
    },
    cloudDDNS: {
      ddnsEntries: [],
    },
    upnp: {
      linkType: "domestic",
    },
    natpmp: {
      linkType: "",
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
      (services.certificate?.SelfSigned || services.certificate?.LetsEncrypt) ||
      (services.ntp?.servers && services.ntp.servers.length > 0) ||
      (services.graphing?.Interface || services.graphing?.Queue || services.graphing?.Resources) ||
      (services.cloudDDNS?.ddnsEntries && services.cloudDDNS.ddnsEntries.length > 0) ||
      (services.upnp?.linkType !== "") ||
      (services.natpmp?.linkType !== "");

    isAdvancedModeComplete.value = hasEnabledService;
  });

  const saveEasyMode = $(
    (services: {
      certificate: boolean;
      ntp: boolean;
      graphing: boolean;
      DDNS: boolean;
    }) => {
      // Map easy mode selections to usefulServices structure
      const usefulServicesConfig = {
        ...ctx.state.ExtraConfig.usefulServices,
        certificate: services.certificate ? { SelfSigned: true, LetsEncrypt: false } : { SelfSigned: false, LetsEncrypt: false },
        ntp: services.ntp ? { servers: ["pool.ntp.org"], updateInterval: "1h" as const } : { servers: [], updateInterval: "1h" as const },
        graphing: services.graphing ? { Interface: true, Queue: true, Resources: true } : { Interface: false, Queue: false, Resources: false },
        cloudDDNS: services.DDNS ? { ddnsEntries: [] } : { ddnsEntries: [] },
      };
      
      ctx.updateExtraConfig$({
        usefulServices: usefulServicesConfig
      });
    },
  );

  const saveAdvancedMode = $(() => {
    const services = advancedData.value;

    // Save the entire usefulServices configuration to the context
    ctx.updateExtraConfig$({
      usefulServices: services
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
