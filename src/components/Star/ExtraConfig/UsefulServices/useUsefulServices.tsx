import { $, useContext, useSignal } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";

export type UsefulServicesMode = "easy" | "advanced";

export interface CertificateData {
  name: string;
  type: "self-signed" | "lets-encrypt" | "custom";
  keySize: "2048" | "4096";
  countryCode: string;
  organization: string;
  commonName: string;
}

export interface NTPData {
  enableClient: boolean;
  primaryServer: string;
  secondaryServer: string;
  enableServer: boolean;
  allowedNetworks: string;
  timeZone: string;
  updateInterval: "1h" | "6h" | "12h" | "24h";
}

export interface GraphingData {
  enabled: boolean;
  dataRetentionDays: number;
  updateInterval: "5m" | "15m" | "30m" | "1h";
  monitoredInterfaces: {
    wan1: boolean;
    wan2: boolean;
    lan: boolean;
    wireless: boolean;
  };
  enableCPU: boolean;
  enableMemory: boolean;
  enableDisk: boolean;
  enableNetworkTraffic: boolean;
  graphResolution: "high" | "medium" | "low";
  storageLocation: "internal" | "external";
}

export interface CloudDDNSData {
  enableDDNS: boolean;
  provider: "no-ip" | "dyndns" | "duckdns" | "cloudflare" | "custom";
  hostname: string;
  username: string;
  password: string;
  updateInterval: "5m" | "10m" | "30m" | "1h";
  enableSSL: boolean;
  customServerURL: string;
  enableCloudBackup: boolean;
  backupInterval: "daily" | "weekly" | "monthly";
}

export interface LetsEncryptData {
  enabled: boolean;
  domainName: string;
  emailAddress: string;
  certificateType: "single" | "wildcard" | "multi";
  autoRenewal: boolean;
  renewalDaysBeforeExpiry: number;
  challengeType: "http-01" | "dns-01";
  webServerPort: number;
  enableHTTPSRedirect: boolean;
  certificateStoragePath: string;
}

export interface AdvancedServicesData {
  certificate: CertificateData;
  ntp: NTPData;
  graphing: GraphingData;
  cloudDDNS: CloudDDNSData;
  letsEncrypt: LetsEncryptData;
}

export interface UseUsefulServicesReturn {
  advancedData: Signal<AdvancedServicesData>;
  updateAdvancedData: (data: Partial<AdvancedServicesData>) => void;
  saveEasyMode: (services: {
    certificate: boolean;
    ntp: boolean;
    graphing: boolean;
    DDNS: boolean;
    letsEncrypt: boolean;
  }) => void;
  saveAdvancedMode: () => void;
  isAdvancedModeComplete: Signal<boolean>;
}

export const useUsefulServices = (): UseUsefulServicesReturn => {
  const ctx = useContext(StarContext);

  // Initialize advanced data with defaults
  const advancedData = useSignal<AdvancedServicesData>({
    certificate: {
      name: "",
      type: "self-signed",
      keySize: "2048",
      countryCode: "",
      organization: "",
      commonName: "",
    },
    ntp: {
      enableClient: false,
      primaryServer: "pool.ntp.org",
      secondaryServer: "time.google.com",
      enableServer: false,
      allowedNetworks: "",
      timeZone: "UTC",
      updateInterval: "1h",
    },
    graphing: {
      enabled: false,
      dataRetentionDays: 30,
      updateInterval: "15m",
      monitoredInterfaces: {
        wan1: false,
        wan2: false,
        lan: false,
        wireless: false,
      },
      enableCPU: false,
      enableMemory: false,
      enableDisk: false,
      enableNetworkTraffic: false,
      graphResolution: "medium",
      storageLocation: "internal",
    },
    cloudDDNS: {
      enableDDNS: false,
      provider: "no-ip",
      hostname: "",
      username: "",
      password: "",
      updateInterval: "30m",
      enableSSL: true,
      customServerURL: "",
      enableCloudBackup: false,
      backupInterval: "weekly",
    },
    letsEncrypt: {
      enabled: false,
      domainName: "",
      emailAddress: "",
      certificateType: "single",
      autoRenewal: true,
      renewalDaysBeforeExpiry: 30,
      challengeType: "http-01",
      webServerPort: 80,
      enableHTTPSRedirect: true,
      certificateStoragePath: "/certificates/",
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
      services.certificate.name.length > 0 ||
      services.ntp.enableClient ||
      services.ntp.enableServer ||
      services.graphing.enabled ||
      services.cloudDDNS.enableDDNS ||
      services.letsEncrypt.enabled;

    isAdvancedModeComplete.value = hasEnabledService;
  });

  const saveEasyMode = $(
    (services: {
      certificate: boolean;
      ntp: boolean;
      graphing: boolean;
      DDNS: boolean;
      letsEncrypt: boolean;
    }) => {
      // Map easy mode selections to global state
      ctx.updateExtraConfig$({
        isCertificate: services.certificate,
        isNTP: services.ntp,
        isGraphing: services.graphing,
        isDDNS: services.DDNS,
        isLetsEncrypt: services.letsEncrypt,
      });
    },
  );

  const saveAdvancedMode = $(() => {
    const services = advancedData.value;

    // Convert advanced configuration to boolean flags for the global state
    ctx.updateExtraConfig$({
      isCertificate: services.certificate.name.length > 0,
      isNTP: services.ntp.enableClient || services.ntp.enableServer,
      isGraphing: services.graphing.enabled,
      isDDNS: services.cloudDDNS.enableDDNS,
      isLetsEncrypt: services.letsEncrypt.enabled,

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
