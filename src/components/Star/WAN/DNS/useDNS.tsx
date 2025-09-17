import { $, useSignal, useStore, useContext, useComputed$ } from "@builder.io/qwik";
import { StarContext } from "../../StarContext/StarContext";
import type { 
  NetworkType, 
  ValidationErrors, 
  NetworkDNSConfig, 
  DOHNetworkInfo,
  DNSPreset 
} from "./types";
import type { DNSConfig, DOHConfig } from "../../StarContext/WANType";

export const useDNS = () => {
  const starContext = useContext(StarContext);
  const isDomestic = (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both");

  // Initialize DNS configuration with existing state or defaults
  const dnsConfig = useStore<DNSConfig>({
    ForeignDNS: starContext.state.WAN.DNSConfig?.ForeignDNS || "",
    VPNDNS: starContext.state.WAN.DNSConfig?.VPNDNS || "",
    DomesticDNS: starContext.state.WAN.DNSConfig?.DomesticDNS || "",
    SplitDNS: starContext.state.WAN.DNSConfig?.SplitDNS || "",
    DOH: {
      domain: starContext.state.WAN.DNSConfig?.DOH?.domain || "",
      bindingIP: starContext.state.WAN.DNSConfig?.DOH?.bindingIP || "",
    },
  });

  const validationErrors = useStore<ValidationErrors>({});
  const isValidating = useSignal(false);

  // Track which preset is selected for each network
  const selectedPresets = useStore<Record<NetworkType, string | null>>({
    Foreign: null,
    VPN: null,
    Split: null,
    Domestic: null,
  });

  // IPv4 validation regex
  const IPv4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  // Domain validation regex for DOH
  const DOMAIN_REGEX = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)*[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

  // DNS Presets for quick selection
  const dnsPresets: DNSPreset[] = [
    // Fast & Secure Options
    {
      name: "Cloudflare",
      description: "Fast and secure DNS with privacy protection",
      primary: "1.1.1.1",
      secondary: "1.0.0.1",
      category: "fast"
    },
    {
      name: "Google Public DNS",
      description: "Reliable and fast public DNS service",
      primary: "8.8.8.8",
      secondary: "8.8.4.4",
      category: "public"
    },
    {
      name: "Quad9",
      description: "Security-focused DNS with threat protection",
      primary: "9.9.9.9",
      secondary: "149.112.112.112",
      category: "secure"
    },
    {
      name: "OpenDNS",
      description: "Fast DNS with content filtering options",
      primary: "208.67.222.222",
      secondary: "208.67.220.220",
      category: "filtered"
    },
    // Ad-blocking & Privacy Options
    {
      name: "AdGuard DNS",
      description: "Blocks ads, trackers, and malicious domains",
      primary: "94.140.14.14",
      secondary: "94.140.15.15",
      category: "adblock"
    },
    {
      name: "AdGuard Family",
      description: "Blocks ads, trackers, and adult content",
      primary: "94.140.14.15",
      secondary: "94.140.15.16",
      category: "family"
    },
    {
      name: "NextDNS",
      description: "Customizable DNS with privacy and security",
      primary: "45.90.28.0",
      secondary: "45.90.30.0",
      category: "privacy"
    },
    {
      name: "Control D",
      description: "Advanced DNS filtering and control",
      primary: "76.76.2.0",
      secondary: "76.76.10.0",
      category: "privacy"
    },
    // Security-focused Options
    {
      name: "Cloudflare for Families",
      description: "Blocks malware and adult content",
      primary: "1.1.1.3",
      secondary: "1.0.0.3",
      category: "family"
    },
    {
      name: "Cloudflare Malware Blocking",
      description: "Blocks malware and phishing sites",
      primary: "1.1.1.2",
      secondary: "1.0.0.2",
      category: "secure"
    },
    {
      name: "CleanBrowsing Security",
      description: "Blocks malware, spam, and phishing",
      primary: "185.228.168.9",
      secondary: "185.228.169.9",
      category: "secure"
    },
    {
      name: "CleanBrowsing Family",
      description: "Family-safe browsing with content filters",
      primary: "185.228.168.168",
      secondary: "185.228.169.168",
      category: "family"
    },
    {
      name: "Comodo Secure DNS",
      description: "Enterprise-grade DNS security",
      primary: "8.26.56.26",
      secondary: "8.20.247.20",
      category: "secure"
    },
    // Alternative & Regional Options
    {
      name: "Verisign Public DNS",
      description: "Stable and secure public DNS",
      primary: "64.6.64.6",
      secondary: "64.6.65.6",
      category: "public"
    },
    {
      name: "DNS.WATCH",
      description: "German DNS with no logging",
      primary: "84.200.69.80",
      secondary: "84.200.70.40",
      category: "privacy"
    },
    {
      name: "Alternate DNS",
      description: "Fast alternative public DNS",
      primary: "76.76.19.19",
      secondary: "76.223.122.150",
      category: "public"
    }
  ];

  // DOH Presets for DNS over HTTPS
  const dohPresets: DNSPreset[] = [
    {
      name: "Cloudflare",
      description: "Fast and secure DNS over HTTPS",
      primary: "cloudflare-dns.com",
      secondary: "one.one.one.one",
      category: "fast"
    },
    {
      name: "Google",
      description: "Google's DNS over HTTPS service",
      primary: "dns.google",
      secondary: "dns.google.com",
      category: "public"
    },
    {
      name: "Quad9",
      description: "Security-focused DNS over HTTPS",
      primary: "dns.quad9.net",
      secondary: "dns9.quad9.net",
      category: "secure"
    },
    {
      name: "AdGuard",
      description: "Ad-blocking DNS over HTTPS",
      primary: "dns.adguard.com",
      secondary: "dns-unfiltered.adguard.com",
      category: "adblock"
    },
    {
      name: "NextDNS",
      description: "Privacy-focused DNS over HTTPS",
      primary: "dns.nextdns.io",
      secondary: "dns.nextdns.io",
      category: "privacy"
    },
    {
      name: "Control D",
      description: "Advanced filtering DNS over HTTPS",
      primary: "dns.controld.com",
      secondary: "freedns.controld.com",
      category: "filtered"
    },
    {
      name: "OpenDNS",
      description: "Cisco's DNS over HTTPS service",
      primary: "doh.opendns.com",
      secondary: "doh.familyshield.opendns.com",
      category: "filtered"
    },
    {
      name: "CleanBrowsing",
      description: "Family-safe DNS over HTTPS",
      primary: "doh.cleanbrowsing.org",
      secondary: "family-filter-dns.cleanbrowsing.org",
      category: "family"
    }
  ];

  // Get currently used DNS IPs from presets to prevent duplicates
  const getUsedDNSPresets = useComputed$(() => {
    const usedDNS: string[] = [];
    
    // Check each network type for preset usage
    Object.keys(selectedPresets).forEach((networkType) => {
      const preset = selectedPresets[networkType as NetworkType];
      if (preset) {
        usedDNS.push(preset);
      }
    });
    
    return usedDNS;
  });

  // Get available presets for a specific network (excluding already used ones)
  const getAvailablePresetsForNetwork = $((networkType: NetworkType) => {
    const usedDNS = getUsedDNSPresets.value;
    const currentNetworkPreset = selectedPresets[networkType];
    
    return dnsPresets.filter(preset => {
      // Allow current network's preset to remain available
      if (preset.primary === currentNetworkPreset) {
        return true;
      }
      // Exclude presets used by other networks
      return !usedDNS.includes(preset.primary);
    });
  });

  // Get DOH network information based on isDomestic flag
  const getDOHNetworkInfo = $(() => {
    const dohInfo: DOHNetworkInfo = isDomestic
      ? {
          target: "Domestic",
          label: $localize`Domestic Network DOH`,
          description: $localize`Secure DNS resolution for domestic network traffic`,
          networkColor: "orange",
          networkIcon: "home"
        }
      : {
          target: "VPN",
          label: $localize`VPN Network DOH`,
          description: $localize`Secure DNS resolution for VPN network traffic`,
          networkColor: "green",
          networkIcon: "shield"
        };
    
    return dohInfo;
  });

  const validateIPv4 = $((ip: string): boolean => {
    return IPv4_REGEX.test(ip.trim());
  });

  const validateDomain = $((domain: string): boolean => {
    return DOMAIN_REGEX.test(domain.trim());
  });

  const getNetworkConfigs = $(() => {
    const configs: NetworkDNSConfig[] = [
      {
        type: "Foreign",
        dns: dnsConfig.ForeignDNS || "",
        label: $localize`Foreign Network DNS`,
        description: $localize`DNS server for foreign network traffic`,
        required: true,
        placeholder: "8.8.8.8",
        icon: "globe",
        gradient: "from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/30 border-blue-200/60 dark:border-blue-700/50"
      },
      {
        type: "VPN",
        dns: dnsConfig.VPNDNS || "",
        label: $localize`VPN Network DNS`,
        description: $localize`DNS server for VPN network traffic`,
        required: true,
        placeholder: "1.1.1.1",
        icon: "shield",
        gradient: "from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/30 border-green-200/60 dark:border-green-700/50"
      },
    ];

    if (isDomestic) {
      configs.push({
        type: "Split",
        dns: dnsConfig.SplitDNS || "",
        label: $localize`Split Network DNS`,
        description: $localize`DNS server for split network traffic`,
        required: true,
        placeholder: "9.9.9.9",
        icon: "split",
        gradient: "from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/30 border-purple-200/60 dark:border-purple-700/50"
      });

      configs.push({
        type: "Domestic",
        dns: dnsConfig.DomesticDNS || "",
        label: $localize`Domestic Network DNS`,
        description: $localize`DNS server for domestic network traffic`,
        required: true,
        placeholder: "208.67.222.222",
        icon: "home",
        gradient: "from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/30 border-orange-200/60 dark:border-orange-700/50"
      });
    }

    return configs;
  });

  const updateDNS = $((networkType: NetworkType, value: string) => {
    switch (networkType) {
      case "Foreign":
        dnsConfig.ForeignDNS = value;
        break;
      case "VPN":
        dnsConfig.VPNDNS = value;
        break;
      case "Split":
        dnsConfig.SplitDNS = value;
        break;
      case "Domestic":
        dnsConfig.DomesticDNS = value;
        break;
    }
    
    // Clear preset selection if user manually types (not from preset)
    const matchingPreset = dnsPresets.find(preset => preset.primary === value);
    if (!matchingPreset) {
      selectedPresets[networkType] = null;
    }
    
    // Clear validation error when user types
    if (validationErrors[networkType]) {
      delete validationErrors[networkType];
    }
  });

  const updateDOH = $((field: keyof DOHConfig | "enabled", value: string | boolean) => {
    if (!dnsConfig.DOH) {
      dnsConfig.DOH = {};
    }
    
    if (field === "enabled") {
      // Handle enabled state separately (not part of DOHConfig)
      // Clear DOH fields if disabled
      if (!value) {
        dnsConfig.DOH.domain = "";
        dnsConfig.DOH.bindingIP = "";
      }
    } else {
      dnsConfig.DOH[field as keyof DOHConfig] = value as string;
    }

    // Clear validation errors for DOH fields
    if (validationErrors.dohDomain) {
      delete validationErrors.dohDomain;
    }
    if (validationErrors.dohBinding) {
      delete validationErrors.dohBinding;
    }
  });

  const validateAll = $(async () => {
    isValidating.value = true;
    const errors: ValidationErrors = {};

    // Validate Foreign DNS
    if (!dnsConfig.ForeignDNS || !dnsConfig.ForeignDNS.trim()) {
      errors.Foreign = $localize`Foreign Network DNS is required`;
    } else if (!(await validateIPv4(dnsConfig.ForeignDNS))) {
      errors.Foreign = $localize`Please enter a valid IPv4 address`;
    }

    // Validate VPN DNS
    if (!dnsConfig.VPNDNS || !dnsConfig.VPNDNS.trim()) {
      errors.VPN = $localize`VPN Network DNS is required`;
    } else if (!(await validateIPv4(dnsConfig.VPNDNS))) {
      errors.VPN = $localize`Please enter a valid IPv4 address`;
    }

    // Validate Split and Domestic DNS if domestic link is enabled
    if (isDomestic) {
      if (!dnsConfig.SplitDNS?.trim()) {
        errors.Split = $localize`Split Network DNS is required`;
      } else if (!(await validateIPv4(dnsConfig.SplitDNS))) {
        errors.Split = $localize`Please enter a valid IPv4 address`;
      }

      if (!dnsConfig.DomesticDNS?.trim()) {
        errors.Domestic = $localize`Domestic Network DNS is required`;
      } else if (!(await validateIPv4(dnsConfig.DomesticDNS))) {
        errors.Domestic = $localize`Please enter a valid IPv4 address`;
      }
    }

    // Validate DOH configuration if domain is set (DOH is enabled)
    if (isDomestic && dnsConfig.DOH?.domain) {
      if (!(await validateDomain(dnsConfig.DOH.domain))) {
        errors.dohDomain = $localize`Please enter a valid domain name`;
      }

      if (dnsConfig.DOH.bindingIP?.trim() && !(await validateIPv4(dnsConfig.DOH.bindingIP))) {
        errors.dohBinding = $localize`Please enter a valid IPv4 address for binding IP`;
      }
    }

    // Update validation errors
    Object.keys(validationErrors).forEach(key => {
      delete validationErrors[key];
    });
    Object.assign(validationErrors, errors);

    isValidating.value = false;
    return Object.keys(errors).length === 0;
  });

  const saveConfiguration = $(() => {
    // Update the global state
    if (!starContext.state.WAN.DNSConfig) {
      starContext.state.WAN.DNSConfig = {
        ForeignDNS: "",
        VPNDNS: "",
      };
    }

    Object.assign(starContext.state.WAN.DNSConfig, dnsConfig);
  });

  // Apply DNS preset to a specific network
  const applyDNSPreset = $((networkType: NetworkType, preset: DNSPreset) => {
    // Clear any previous preset selection for this network
    selectedPresets[networkType] = null;
    
    // Update the DNS value
    updateDNS(networkType, preset.primary);
    
    // Track the new preset selection
    selectedPresets[networkType] = preset.primary;
  });

  // Apply DOH preset
  const applyDOHPreset = $((preset: DNSPreset) => {
    updateDOH("domain", preset.primary);
  });

  // Copy DNS configuration to clipboard
  const copyDNSConfig = $(async (networkType: NetworkType) => {
    const config = dnsConfig[`${networkType}DNS` as keyof DNSConfig] as string;
    if (config && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(config);
        return true;
      } catch (error) {
        console.error("Failed to copy DNS config:", error);
        return false;
      }
    }
    return false;
  });

  // Reset DNS configuration to defaults
  const resetDNSConfig = $(() => {
    dnsConfig.ForeignDNS = "";
    dnsConfig.VPNDNS = "";
    dnsConfig.DomesticDNS = "";
    dnsConfig.SplitDNS = "";
    if (dnsConfig.DOH) {
      dnsConfig.DOH.domain = "";
      dnsConfig.DOH.bindingIP = "";
    }
    
    // Clear validation errors
    Object.keys(validationErrors).forEach(key => {
      delete validationErrors[key];
    });
  });

  return {
    dnsConfig,
    validationErrors,
    isValidating,
    isDomestic,
    dnsPresets,
    dohPresets,
    selectedPresets,
    getUsedDNSPresets,
    getAvailablePresetsForNetwork,
    getNetworkConfigs,
    getDOHNetworkInfo,
    updateDNS,
    updateDOH,
    validateAll,
    saveConfiguration,
    applyDNSPreset,
    applyDOHPreset,
    copyDNSConfig,
    resetDNSConfig,
  };
};