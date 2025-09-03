import {
  $,
  useComputed$,
  useContext,
  useSignal,
} from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import type { 
  SubnetConfig, 
  UseSubnetsReturn, 
  SubnetCategory 
} from "./types";

/**
 * Custom hook for managing subnet configuration state and logic
 * Handles validation, suggestions, and state management
 */
export const useSubnets = (): UseSubnetsReturn => {
  const starContext = useContext(StarContext);
  const isDomesticLink = (starContext.state.Choose.WANLinkType === "domestic-only" || starContext.state.Choose.WANLinkType === "both");
  
  // Local state for subnet values and errors
  const values = useSignal<Record<string, number | null>>({});
  const errors = useSignal<Record<string, string>>({});

  // Initialize values from context
  useComputed$(() => {
    const existingSubnets = starContext.state.LAN.Subnets || {};
    const initialValues: Record<string, number | null> = {};
    
    // Convert existing CIDR subnets back to third octet values
    Object.entries(existingSubnets).forEach(([key, cidr]) => {
      if (cidr) {
        const match = cidr.match(/192\.168\.(\d+)\.0\/\d+/);
        if (match) {
          initialValues[key] = parseInt(match[1], 10);
        }
      }
    });
    
    values.value = initialValues;
  });

  // Define subnet configurations based on current state
  const subnetConfigs = useComputed$<SubnetConfig[]>(() => {
    const configs: SubnetConfig[] = [];

    // Base network subnets based on DomesticLink
    if (isDomesticLink) {
      configs.push(
        {
          key: "Split",
          label: $localize`Split Network`,
          placeholder: 10,
          value: values.value["Split"] ?? null,
          description: $localize`Mixed domestic and foreign traffic`,
          category: "base",
          isRequired: true,
          mask: 24,
          color: "primary",
        },
        {
          key: "Domestic", 
          label: $localize`Domestic Network`,
          placeholder: 20,
          value: values.value["Domestic"] ?? null,
          description: $localize`Domestic-only traffic`,
          category: "base",
          isRequired: true,
          mask: 24,
          color: "primary",
        },
        {
          key: "Foreign",
          label: $localize`Foreign Network`, 
          placeholder: 30,
          value: values.value["Foreign"] ?? null,
          description: $localize`Foreign/international traffic`,
          category: "base",
          isRequired: true,
          mask: 24,
          color: "primary",
        },
        {
          key: "VPN",
          label: $localize`VPN Network`,
          placeholder: 40,
          value: values.value["VPN"] ?? null,
          description: $localize`VPN client traffic`,
          category: "base",
          isRequired: true,
          mask: 24,
          color: "primary",
        }
      );
    } else {
      configs.push(
        {
          key: "VPN",
          label: $localize`VPN Network`,
          placeholder: 10,
          value: values.value["VPN"] ?? null,
          description: $localize`Primary VPN traffic`,
          category: "base",
          isRequired: true,
          mask: 24,
          color: "primary",
        },
        {
          key: "Foreign",
          label: $localize`Foreign Network`,
          placeholder: 30,
          value: values.value["Foreign"] ?? null,
          description: $localize`Foreign/international traffic`,
          category: "base",
          isRequired: true,
          mask: 24,
          color: "primary",
        }
      );
    }

    // Add VPN server subnets
    const vpnServers = starContext.state.LAN.VPNServer;
    let vpnSubnetBase = 40;

    // Multiple WireGuard servers - each gets its own subnet
    if (vpnServers?.WireguardServers?.length) {
      vpnServers.WireguardServers.forEach((server, index) => {
        const serverName = server.Interface?.Name || `WireGuard${index + 1}`;
        const key = serverName;
        configs.push({
          key,
          label: $localize`${serverName} Network`,
          placeholder: vpnSubnetBase++,
          value: values.value[key] ?? null,
          description: $localize`WireGuard VPN server clients`,
          category: "vpn",
          isRequired: false,
          mask: 24,
        });
      });
    }

    // Multiple OpenVPN servers - each gets its own subnet
    if (vpnServers?.OpenVpnServer?.length) {
      vpnServers.OpenVpnServer.forEach((server, index) => {
        const key = server.name || `OpenVPN${index + 1}`;
        configs.push({
          key,
          label: $localize`${server.name} Network`,
          placeholder: vpnSubnetBase++,
          value: values.value[key] ?? null,
          description: $localize`OpenVPN server clients`,
          category: "vpn", 
          isRequired: false,
          mask: 24,
        });
      });
    }

    if (vpnServers?.L2tpServer?.enabled) {
      configs.push({
        key: "L2TP",
        label: $localize`L2TP Network`,
        placeholder: vpnSubnetBase++,
        value: values.value["L2TP"] ?? null,
        description: $localize`L2TP/IPSec clients`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    if (vpnServers?.PptpServer?.enabled) {
      configs.push({
        key: "PPTP",
        label: $localize`PPTP Network`,
        placeholder: vpnSubnetBase++,
        value: values.value["PPTP"] ?? null,
        description: $localize`PPTP clients`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    if (vpnServers?.SstpServer?.enabled) {
      configs.push({
        key: "SSTP",
        label: $localize`SSTP Network`,
        placeholder: vpnSubnetBase++,
        value: values.value["SSTP"] ?? null,
        description: $localize`SSTP clients`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    if (vpnServers?.Ikev2Server) {
      configs.push({
        key: "IKev2", 
        label: $localize`IKEv2 Network`,
        placeholder: vpnSubnetBase++,
        value: values.value["IKev2"] ?? null,
        description: $localize`IKEv2 clients`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    // Add tunnel subnets (using /30 mask for point-to-point)
    const tunnels = starContext.state.LAN.Tunnel;
    let tunnelSubnetBase = 100;

    // IPIP Tunnels
    if (tunnels?.IPIP?.length) {
      tunnels.IPIP.forEach((tunnel, index) => {
        const key = tunnel.name || `IPIP${index + 1}`;
        configs.push({
          key,
          label: $localize`${tunnel.name || `IPIP ${index + 1}`}`,
          placeholder: tunnelSubnetBase + index * 4,
          value: values.value[key] ?? null,
          description: $localize`IPIP tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
      tunnelSubnetBase += tunnels.IPIP.length * 4;
    }

    // EoIP Tunnels
    if (tunnels?.Eoip?.length) {
      tunnels.Eoip.forEach((tunnel, index) => {
        const key = tunnel.name || `EoIP${index + 1}`;
        configs.push({
          key,
          label: $localize`${tunnel.name || `EoIP ${index + 1}`}`,
          placeholder: tunnelSubnetBase + index * 4,
          value: values.value[key] ?? null,
          description: $localize`EoIP tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
      tunnelSubnetBase += tunnels.Eoip.length * 4;
    }

    // GRE Tunnels
    if (tunnels?.Gre?.length) {
      tunnels.Gre.forEach((tunnel, index) => {
        const key = tunnel.name || `GRE${index + 1}`;
        configs.push({
          key,
          label: $localize`${tunnel.name || `GRE ${index + 1}`}`,
          placeholder: tunnelSubnetBase + index * 4,
          value: values.value[key] ?? null,
          description: $localize`GRE tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
      tunnelSubnetBase += tunnels.Gre.length * 4;
    }

    // VXLAN Tunnels
    if (tunnels?.Vxlan?.length) {
      tunnels.Vxlan.forEach((tunnel, index) => {
        const key = tunnel.name || `VXLAN${index + 1}`;
        configs.push({
          key,
          label: $localize`${tunnel.name || `VXLAN ${index + 1}`}`,
          placeholder: tunnelSubnetBase + index * 4,
          value: values.value[key] ?? null,
          description: $localize`VXLAN tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    return configs;
  });

  // Group configurations by category
  const groupedConfigs = useComputed$(() => {
    const groups = {
      base: [] as SubnetConfig[],
      vpn: [] as SubnetConfig[],
      tunnel: [] as SubnetConfig[],
    };

    subnetConfigs.value.forEach((config) => {
      groups[config.category].push(config);
    });

    return groups;
  });

  // Validation state
  const isValid = useComputed$(() => {
    return Object.keys(errors.value).length === 0;
  });

  // Handle subnet value changes
  const handleChange$ = $((key: string, value: number | null) => {
    values.value = {
      ...values.value,
      [key]: value,
    };

    // Clear error when user changes value
    if (errors.value[key]) {
      errors.value = {
        ...errors.value,
        [key]: "",
      };
    }
  });

  // Validate all subnets
  const validateAll$ = $(async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};
    const usedValues = new Set<number>();

    // Check each configuration
    for (const config of subnetConfigs.value) {
      const value = values.value[config.key];

      // Required field validation
      if (config.isRequired && (value === null || value === undefined)) {
        newErrors[config.key] = $localize`This subnet is required`;
        continue;
      }

      if (value !== null) {
        // Range validation
        if (value < 1 || value > 254) {
          newErrors[config.key] = $localize`Value must be between 1-254`;
          continue;
        }

        // Reserved addresses validation
        if (value === 1 || value === 255) {
          newErrors[config.key] = $localize`Values 1 and 255 are reserved`;
          continue;
        }

        // Duplicate validation
        if (usedValues.has(value)) {
          newErrors[config.key] = $localize`This subnet is already in use`;
          continue;
        }

        usedValues.add(value);
      }
    }

    errors.value = newErrors;
    return Object.keys(newErrors).length === 0;
  });

  // Reset all values
  const reset$ = $(() => {
    values.value = {};
    errors.value = {};
  });

  // Generate subnet string
  const getSubnetString = $((config: SubnetConfig, value: number | null): string => {
    if (value === null) {
      return `192.168.___.0/${config.mask}`;
    }
    return `192.168.${value}.0/${config.mask}`;
  });

  // Get suggested value for a category
  const getSuggestedValue = $((category: SubnetCategory): number => {
    const usedValues = new Set(
      Object.values(values.value).filter((v): v is number => v !== null)
    );

    // Base suggestions by category
    const baseSuggestions = {
      base: [10, 20, 30, 40],
      vpn: [41, 42, 43, 44, 45],
      tunnel: [100, 104, 108, 112], // /30 subnets increment by 4
    };

    // Find first available suggestion
    for (const suggestion of baseSuggestions[category]) {
      if (!usedValues.has(suggestion)) {
        return suggestion;
      }
    }

    // Fallback: find any available value in range
    for (let i = 2; i < 254; i++) {
      if (!usedValues.has(i)) {
        return i;
      }
    }

    return 50; // Fallback
  });

  return {
    subnetConfigs: subnetConfigs.value,
    groupedConfigs: groupedConfigs.value,
    values: values.value,
    errors: errors.value,
    isValid: isValid.value,
    handleChange$,
    validateAll$,
    reset$,
    getSubnetString,
    getSuggestedValue,
  };
};