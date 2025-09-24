import {
  $,
  useComputed$,
  useContext,
  useSignal,
  useTask$,
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
  const isDomesticLink = (starContext.state.Choose.WANLinkType === "domestic" || starContext.state.Choose.WANLinkType === "both");
  
  // Local state for subnet values and errors
  const values = useSignal<Record<string, number | null>>({});
  const errors = useSignal<Record<string, string>>({});

  // Extract WAN Static Route subnets for conflict detection
  const getWANStaticSubnets = useComputed$(() => {
    const wanSubnets: Array<{ value: number; name: string }> = [];
    const wanLinks = starContext.state.WAN?.WANLink;

    if (!wanLinks) return wanSubnets;

    // Check both Domestic and Foreign WAN links
    const allLinks = [
      ...(wanLinks.Domestic?.WANConfigs || []).map(c => ({ ...c, type: 'Domestic' })),
      ...(wanLinks.Foreign?.WANConfigs || []).map(c => ({ ...c, type: 'Foreign' }))
    ];

    // Helper to compute third octet of network from IP and mask
    const toThirdOctet = (ip: string, mask: string): number | null => {
      // Fallback: handle accidental CIDR stored in mask field (e.g., "192.168.30.0/24")
      if (mask && mask.includes('/')) {
        const m = mask.match(/192\.168\.(\d+)\.\d+\/\d+/);
        if (m) return parseInt(m[1], 10);
      }

      const ipParts = ip?.split('.').map(p => parseInt(p, 10));
      const maskParts = mask?.split('.').map(p => parseInt(p, 10));
      if (!ipParts || !maskParts || ipParts.length !== 4 || maskParts.length !== 4) return null;
      if (ipParts.some(n => isNaN(n)) || maskParts.some(n => isNaN(n))) return null;

      const network = ipParts.map((octet, i) => (octet & maskParts[i]));
      if (network[0] === 192 && network[1] === 168) {
        return network[2];
      }
      return null;
    };

    allLinks.forEach(link => {
      const staticCfg = link.ConnectionConfig?.static;
      if (staticCfg?.ipAddress && staticCfg.subnet) {
        const third = toThirdOctet(staticCfg.ipAddress, staticCfg.subnet);
        if (third !== null) {
          wanSubnets.push({
            value: third,
            name: `${link.type} WAN: ${link.name || 'Link'}`
          });
        }
      } else if (staticCfg?.subnet) {
        // Legacy: attempt to parse CIDR-like subnet stored in 'subnet'
        const match = staticCfg.subnet.match(/192\.168\.(\d+)\.\d+\/\d+/);
        if (match) {
          wanSubnets.push({
            value: parseInt(match[1], 10),
            name: `${link.type} WAN: ${link.name || 'Link'}`
          });
        }
      }
    });

    return wanSubnets;
  });

  // Initialize values from context or use placeholders as defaults
  const _initializeValues = useTask$(({ track }) => {
    track(() => starContext.state.LAN.Subnets);
    const existingSubnets = starContext.state.LAN.Subnets || {};
    const initialValues: Record<string, number | null> = {};

    // Convert existing CIDR subnets back to third octet values
    // Handle both simple Record<string, string> and complex Subnets type
    if (typeof existingSubnets === 'object' && !Array.isArray(existingSubnets)) {
      Object.entries(existingSubnets).forEach(([key, cidr]) => {
        if (typeof cidr === 'string') {
          const match = cidr.match(/192\.168\.(\d+)\.0\/\d+/);
          if (match) {
            initialValues[key] = parseInt(match[1], 10);
          }
        }
      });
    }

    // If no existing values saved, we'll populate with placeholders later
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

    // Add VPN server subnets with specific subnet allocations
    const vpnServers = starContext.state.LAN.VPNServer;

    // VPN server subnet mapping
    const vpnSubnetMap = {
      wireguard: 110,
      openvpn: 120,
      pptp: 130,
      sstp: 140,
      l2tp: 150,
      ikev2: 160
    };

    // Multiple WireGuard servers - each gets its own subnet
    if (vpnServers?.WireguardServers?.length) {
      vpnServers.WireguardServers.forEach((server, index) => {
        const serverName = server.Interface?.Name || `WireGuard${index + 1}`;
        const key = serverName;
        configs.push({
          key,
          label: $localize`${serverName} Network`,
          placeholder: vpnSubnetMap.wireguard + index,
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
          placeholder: vpnSubnetMap.openvpn + index,
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
        placeholder: vpnSubnetMap.l2tp,
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
        placeholder: vpnSubnetMap.pptp,
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
        placeholder: vpnSubnetMap.sstp,
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
        placeholder: vpnSubnetMap.ikev2,
        value: values.value["IKev2"] ?? null,
        description: $localize`IKEv2 clients`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    // Add tunnel subnets (using /30 mask for point-to-point)
    const tunnels = starContext.state.LAN.Tunnel;

    // Fixed starting points for each tunnel type
    const tunnelSubnetBases = {
      ipip: 170,
      eoip: 180,
      gre: 190,
      vxlan: 210
    };

    // IPIP Tunnels
    if (tunnels?.IPIP?.length) {
      tunnels.IPIP.forEach((tunnel, index) => {
        const key = tunnel.name || `IPIP${index + 1}`;
        configs.push({
          key,
          label: $localize`${tunnel.name || `IPIP ${index + 1}`}`,
          placeholder: tunnelSubnetBases.ipip + index,
          value: values.value[key] ?? null,
          description: $localize`IPIP tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    // EoIP Tunnels
    if (tunnels?.Eoip?.length) {
      tunnels.Eoip.forEach((tunnel, index) => {
        const key = tunnel.name || `EoIP${index + 1}`;
        configs.push({
          key,
          label: $localize`${tunnel.name || `EoIP ${index + 1}`}`,
          placeholder: tunnelSubnetBases.eoip + index,
          value: values.value[key] ?? null,
          description: $localize`EoIP tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    // GRE Tunnels
    if (tunnels?.Gre?.length) {
      tunnels.Gre.forEach((tunnel, index) => {
        const key = tunnel.name || `GRE${index + 1}`;
        configs.push({
          key,
          label: $localize`${tunnel.name || `GRE ${index + 1}`}`,
          placeholder: tunnelSubnetBases.gre + index,
          value: values.value[key] ?? null,
          description: $localize`GRE tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    // VXLAN Tunnels
    if (tunnels?.Vxlan?.length) {
      tunnels.Vxlan.forEach((tunnel, index) => {
        const key = tunnel.name || `VXLAN${index + 1}`;
        configs.push({
          key,
          label: $localize`${tunnel.name || `VXLAN ${index + 1}`}`,
          placeholder: tunnelSubnetBases.vxlan + index,
          value: values.value[key] ?? null,
          description: $localize`VXLAN tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    // Multiple Domestic WAN Links - only show if there are 2+ domestic links
    const domesticLinks = starContext.state.WAN.WANLink?.Domestic?.WANConfigs;
    if (domesticLinks && domesticLinks.length >= 2) {
      domesticLinks.forEach((link, index) => {
        const key = `Domestic${index + 1}`;
        configs.push({
          key,
          label: $localize`${link.name || `Domestic Link ${index + 1}`}`,
          placeholder: 21 + index,
          value: values.value[key] ?? null,
          description: $localize`Domestic WAN link network`,
          category: "wan-domestic",
          isRequired: false,
          mask: 24,
          color: "primary",
        });
      });
    }

    // Multiple Foreign WAN Links - only show if there are 2+ foreign links
    const foreignLinks = starContext.state.WAN.WANLink?.Foreign?.WANConfigs;
    if (foreignLinks && foreignLinks.length >= 2) {
      foreignLinks.forEach((link, index) => {
        const key = `Foreign${index + 1}`;
        configs.push({
          key,
          label: $localize`${link.name || `Foreign Link ${index + 1}`}`,
          placeholder: 31 + index,
          value: values.value[key] ?? null,
          description: $localize`Foreign WAN link network`,
          category: "wan-foreign",
          isRequired: false,
          mask: 24,
          color: "primary",
        });
      });
    }

    // Multiple VPN Clients - count total across all types
    const vpnClients = starContext.state.WAN.VPNClient;
    const vpnClientConfigs: { name: string; type: string }[] = [];

    if (vpnClients) {
      // Collect all VPN clients
      if (vpnClients.Wireguard?.length) {
        vpnClients.Wireguard.forEach((_, index) => {
          vpnClientConfigs.push({ name: `WireGuard Client ${index + 1}`, type: "Wireguard" });
        });
      }
      if (vpnClients.OpenVPN?.length) {
        vpnClients.OpenVPN.forEach((_, index) => {
          vpnClientConfigs.push({ name: `OpenVPN Client ${index + 1}`, type: "OpenVPN" });
        });
      }
      if (vpnClients.PPTP?.length) {
        vpnClients.PPTP.forEach((_, index) => {
          vpnClientConfigs.push({ name: `PPTP Client ${index + 1}`, type: "PPTP" });
        });
      }
      if (vpnClients.L2TP?.length) {
        vpnClients.L2TP.forEach((_, index) => {
          vpnClientConfigs.push({ name: `L2TP Client ${index + 1}`, type: "L2TP" });
        });
      }
      if (vpnClients.SSTP?.length) {
        vpnClients.SSTP.forEach((_, index) => {
          vpnClientConfigs.push({ name: `SSTP Client ${index + 1}`, type: "SSTP" });
        });
      }
      if (vpnClients.IKeV2?.length) {
        vpnClients.IKeV2.forEach((_, index) => {
          vpnClientConfigs.push({ name: `IKEv2 Client ${index + 1}`, type: "IKEv2" });
        });
      }
    }

    // Only show VPN Client subnets if there are 2+ VPN clients
    if (vpnClientConfigs.length >= 2) {
      vpnClientConfigs.forEach((client, index) => {
        const key = `VPNClient${index + 1}`;
        configs.push({
          key,
          label: $localize`${client.name}`,
          placeholder: 41 + index,
          value: values.value[key] ?? null,
          description: $localize`${client.type} VPN client network`,
          category: "vpn-client",
          isRequired: false,
          mask: 24,
          color: "primary",
        });
      });
    }

    return configs;
  });

  // Real-time validation function that runs on every value change
  const validateRealTime$ = $(() => {
    const newErrors: Record<string, string> = {};
    const usedValues = new Map<number, string>();

    // First, add all WAN static subnets to the used values map
    const wanSubnets = getWANStaticSubnets.value;
    wanSubnets.forEach(wan => {
      usedValues.set(wan.value, `WAN:${wan.name}`);
    });

    // Validate all current values
    for (const config of subnetConfigs.value) {
      const value = values.value[config.key];

      if (value !== null && value !== undefined) {
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

        // Check for conflicts (both LAN-LAN and LAN-WAN)
        if (usedValues.has(value)) {
          const conflictingKey = usedValues.get(value)!;

          // Check if it's a WAN conflict
          if (conflictingKey.startsWith('WAN:')) {
            const wanName = conflictingKey.substring(4);
            newErrors[config.key] = $localize`Conflicts with ${wanName} (192.168.${value}.0)`;
          } else {
            // It's a LAN-LAN conflict
            const conflictingConfig = subnetConfigs.value.find(c => c.key === conflictingKey);
            const conflictingLabel = conflictingConfig?.label || conflictingKey;

            // Mark both conflicting subnets
            newErrors[config.key] = $localize`Conflicts with ${conflictingLabel} (192.168.${value}.0)`;
            newErrors[conflictingKey] = $localize`Conflicts with ${config.label} (192.168.${value}.0)`;
          }
        } else {
          usedValues.set(value, config.key);
        }
      }
    }

    // Update errors signal
    errors.value = newErrors;
  });

  // Initialize subnet values with placeholders if not already set
  useTask$(({ track }) => {
    track(() => subnetConfigs.value);
    track(() => values.value);
    track(() => starContext.state.LAN.Subnets);
    const currentValues = { ...values.value };
    let hasChanges = false;

    // Only set defaults if we don't have saved values
    const hasSavedValues = Object.keys(starContext.state.LAN.Subnets || {}).length > 0;

    if (!hasSavedValues) {
      // Go through all configurations and set placeholder as default if not set
      subnetConfigs.value.forEach((config) => {
        if (currentValues[config.key] === undefined || currentValues[config.key] === null) {
          currentValues[config.key] = config.placeholder;
          hasChanges = true;
        }
      });

      // Update values if we made changes
      if (hasChanges) {
        values.value = currentValues;
      }
    } else {
      // keep current values; no defaulting
    }
    // run validation when tracked deps change
    validateRealTime$();
  });

  // Group configurations by category
  const groupedConfigs = useComputed$(() => {
    const groups = {
      base: [] as SubnetConfig[],
      vpn: [] as SubnetConfig[],
      tunnel: [] as SubnetConfig[],
      "wan-domestic": [] as SubnetConfig[],
      "wan-foreign": [] as SubnetConfig[],
      "vpn-client": [] as SubnetConfig[],
    };

    subnetConfigs.value.forEach((config) => {
      groups[config.category].push(config);
    });

    return groups;
  });

  // Validation state
  const isValid = useSignal<boolean>(true);
  useTask$(({ track }) => {
    track(() => errors.value);
    isValid.value = Object.keys(errors.value).length === 0;
  });

  // Handle subnet value changes with immediate validation
  const handleChange$ = $((key: string, value: number | null) => {
    // Update the value
    values.value = {
      ...values.value,
      [key]: value,
    };

    // Run validation immediately
    validateRealTime$();
  });

  // Validate all subnets (enhanced version for save validation)
  const validateAll$ = $(async (): Promise<boolean> => {
    const newErrors: Record<string, string> = {};
    const usedValues = new Map<number, string>();

    // First, add all WAN static subnets to the used values map
    const wanSubnets = getWANStaticSubnets.value;
    wanSubnets.forEach(wan => {
      usedValues.set(wan.value, `WAN:${wan.name}`);
    });

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

        // Check for conflicts (both LAN-LAN and LAN-WAN)
        if (usedValues.has(value)) {
          const conflictingKey = usedValues.get(value)!;

          // Check if it's a WAN conflict
          if (conflictingKey.startsWith('WAN:')) {
            const wanName = conflictingKey.substring(4);
            newErrors[config.key] = $localize`Conflicts with ${wanName} (192.168.${value}.0)`;
          } else {
            // It's a LAN-LAN conflict
            const conflictingConfig = subnetConfigs.value.find(c => c.key === conflictingKey);
            const conflictingLabel = conflictingConfig?.label || conflictingKey;
            newErrors[config.key] = $localize`Conflicts with ${conflictingLabel} (192.168.${value}.0)`;
          }
        } else {
          usedValues.set(value, config.key);
        }
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
    const baseSuggestions: Record<SubnetCategory, number[]> = {
      base: [10, 20, 30, 40],
      vpn: [41, 42, 43, 44, 45],
      tunnel: [100, 104, 108, 112], // /30 subnets increment by 4
      "wan-domestic": [21, 22, 23, 24, 25],
      "wan-foreign": [31, 32, 33, 34, 35],
      "vpn-client": [41, 42, 43, 44, 45],
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

  // Get tabs that have content
  const getTabsWithContent = $(() => {
    const tabs: SubnetCategory[] = [];
    const groups = groupedConfigs.value;

    if (groups.base?.length > 0) tabs.push("base");
    if (groups["wan-domestic"]?.length > 0) tabs.push("wan-domestic");
    if (groups["wan-foreign"]?.length > 0) tabs.push("wan-foreign");
    if (groups["vpn-client"]?.length > 0) tabs.push("vpn-client");
    if (groups.vpn?.length > 0) tabs.push("vpn");
    if (groups.tunnel?.length > 0) tabs.push("tunnel");

    return tabs;
  });

  // Get progress for a category
  const getCategoryProgress = $((category: SubnetCategory) => {
    const configs = groupedConfigs.value[category] || [];
    const configured = configs.filter(c => values.value[c.key] !== null).length;
    const total = configs.length;
    const percentage = total > 0 ? Math.round((configured / total) * 100) : 0;

    return { configured, total, percentage };
  });

  return {
    subnetConfigs: subnetConfigs.value,
    groupedConfigs: groupedConfigs.value,
    values,
    errors,
    isValid,
    handleChange$,
    validateAll$,
    reset$,
    getSubnetString,
    getSuggestedValue,
    getTabsWithContent,
    getCategoryProgress,
  };
};