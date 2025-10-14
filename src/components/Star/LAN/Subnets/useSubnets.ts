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
  
  // Local state for subnet values and errors
  const values = useSignal<Record<string, number | null>>({});
  const errors = useSignal<Record<string, string>>({});

  // Extract WAN Static Route subnets for conflict detection
  const getWANStaticSubnets = useComputed$(() => {
    const wanSubnets: Array<{ value: number; name: string }> = [];
    const wanLinks = starContext.state.WAN.WANLink;

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

      const ipParts = ip.split('.').map(p => parseInt(p, 10));
      const maskParts = mask.split('.').map(p => parseInt(p, 10));
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

    // Helper to extract third octet from CIDR
    const extractThirdOctet = (cidr: string): number | null => {
      const match = cidr.match(/192\.168\.(\d+)\.0\/\d+/);
      return match ? parseInt(match[1], 10) : null;
    };

    // Handle both legacy flat format and new structured format
    if (typeof existingSubnets === 'object' && !Array.isArray(existingSubnets)) {
      // Check if it's the new structured format (has BaseNetworks property)
      if ('BaseNetworks' in existingSubnets) {
        const subnets = existingSubnets as any; // Type assertion for flexibility
        
        // Extract base networks
        if (subnets.BaseNetworks) {
          Object.entries(subnets.BaseNetworks).forEach(([key, subnetConfig]: [string, any]) => {
            if (subnetConfig && typeof subnetConfig.subnet === 'string') {
              const octet = extractThirdOctet(subnetConfig.subnet);
              if (octet !== null) {
                initialValues[key] = octet;
              }
            }
          });
        }

        // Extract domestic networks
        if (Array.isArray(subnets.DomesticNetworks)) {
          subnets.DomesticNetworks.forEach((config: any, index: number) => {
            if (config && typeof config.subnet === 'string') {
              const octet = extractThirdOctet(config.subnet);
              if (octet !== null) {
                initialValues[`Domestic${index + 1}`] = octet;
              }
            }
          });
        }

        // Extract foreign networks
        if (Array.isArray(subnets.ForeignNetworks)) {
          subnets.ForeignNetworks.forEach((config: any, index: number) => {
            if (config && typeof config.subnet === 'string') {
              const octet = extractThirdOctet(config.subnet);
              if (octet !== null) {
                initialValues[`Foreign${index + 1}`] = octet;
              }
            }
          });
        }

        // Extract VPN client networks
        if (subnets.VPNClientNetworks) {
          let clientIndex = 1;
          ['Wireguard', 'OpenVPN', 'PPTP', 'L2TP', 'SSTP', 'IKev2'].forEach((protocol) => {
            const protocolConfigs = subnets.VPNClientNetworks[protocol];
            if (Array.isArray(protocolConfigs)) {
              protocolConfigs.forEach((config: any) => {
                if (config && typeof config.subnet === 'string') {
                  const octet = extractThirdOctet(config.subnet);
                  if (octet !== null) {
                    initialValues[`VPNClient${clientIndex++}`] = octet;
                  }
                }
              });
            }
          });
        }

        // Extract VPN server networks
        if (subnets.VPNServerNetworks) {
          ['Wireguard', 'OpenVPN', 'L2TP', 'PPTP', 'SSTP', 'IKev2'].forEach((protocol) => {
            const protocolConfig = subnets.VPNServerNetworks[protocol];
            if (Array.isArray(protocolConfig)) {
              // Multiple servers (Wireguard, OpenVPN)
              protocolConfig.forEach((config: any) => {
                if (config && config.name && typeof config.subnet === 'string') {
                  const octet = extractThirdOctet(config.subnet);
                  if (octet !== null) {
                    initialValues[config.name] = octet;
                  }
                }
              });
            } else if (protocolConfig && typeof protocolConfig.subnet === 'string') {
              // Single server (L2TP, PPTP, SSTP, IKev2)
              const octet = extractThirdOctet(protocolConfig.subnet);
              if (octet !== null) {
                initialValues[protocol] = octet;
              }
            }
          });
        }

        // Extract tunnel networks
        if (subnets.TunnelNetworks) {
          ['IPIP', 'Eoip', 'Gre', 'Vxlan'].forEach((tunnelType) => {
            const tunnelConfigs = subnets.TunnelNetworks[tunnelType];
            if (Array.isArray(tunnelConfigs)) {
              tunnelConfigs.forEach((config: any) => {
                if (config && config.name && typeof config.subnet === 'string') {
                  const octet = extractThirdOctet(config.subnet);
                  if (octet !== null) {
                    initialValues[config.name] = octet;
                  }
                }
              });
            }
          });
        }
      } else {
        // Legacy flat format - backward compatibility
        Object.entries(existingSubnets).forEach(([key, cidr]) => {
          if (typeof cidr === 'string') {
            const octet = extractThirdOctet(cidr);
            if (octet !== null) {
              initialValues[key] = octet;
            }
          }
        });
      }
    }

    // If no existing values saved, we'll populate with placeholders later
    values.value = initialValues;
  });

  // Define subnet configurations based on Networks
  const subnetConfigs = useComputed$<SubnetConfig[]>(() => {
    const configs: SubnetConfig[] = [];
    const networks = starContext.state.Choose.Networks;

    // Return empty if Networks is not defined
    if (!networks) return configs;

    // Base Networks - only show if enabled in Networks.BaseNetworks
    if (networks.BaseNetworks?.Split) {
      configs.push({
        key: "Split",
        label: $localize`Split Network`,
        placeholder: 10,
        value: values.value["Split"] ?? null,
        description: $localize`Mixed domestic and foreign traffic`,
        category: "base",
        isRequired: true,
        mask: 24,
        color: "primary",
      });
    }
    
    if (networks.BaseNetworks?.Domestic) {
      configs.push({
        key: "Domestic",
        label: $localize`Domestic Network`,
        placeholder: 20,
        value: values.value["Domestic"] ?? null,
        description: $localize`Domestic-only traffic`,
        category: "base",
        isRequired: true,
        mask: 24,
        color: "primary",
      });
    }
    
    if (networks.BaseNetworks?.Foreign) {
      configs.push({
        key: "Foreign",
        label: $localize`Foreign Network`,
        placeholder: 30,
        value: values.value["Foreign"] ?? null,
        description: $localize`Foreign/international traffic`,
        category: "base",
        isRequired: true,
        mask: 24,
        color: "primary",
      });
    }
    
    if (networks.BaseNetworks?.VPN) {
      configs.push({
        key: "VPN",
        label: $localize`VPN Network`,
        placeholder: 40,
        value: values.value["VPN"] ?? null,
        description: $localize`VPN client traffic`,
        category: "base",
        isRequired: true,
        mask: 24,
        color: "primary",
      });
    }

    // VPN Server Networks - read from Networks.VPNServerNetworks
    // VPN server subnet mapping for placeholders
    const vpnSubnetMap = {
      wireguard: 110,
      openvpn: 120,
      pptp: 130,
      sstp: 140,
      l2tp: 150,
      ikev2: 160
    };

    // WireGuard servers - array of network names
    if (networks.VPNServerNetworks?.Wireguard?.length) {
      networks.VPNServerNetworks.Wireguard.forEach((networkName, index) => {
        configs.push({
          key: networkName,
          label: $localize`${networkName}`,
          placeholder: vpnSubnetMap.wireguard + index,
          value: values.value[networkName] ?? null,
          description: $localize`WireGuard VPN server clients`,
          category: "vpn",
          isRequired: false,
          mask: 24,
        });
      });
    }

    // OpenVPN servers - array of network names
    if (networks.VPNServerNetworks?.OpenVPN?.length) {
      networks.VPNServerNetworks.OpenVPN.forEach((networkName, index) => {
        configs.push({
          key: networkName,
          label: $localize`${networkName}`,
          placeholder: vpnSubnetMap.openvpn + index,
          value: values.value[networkName] ?? null,
          description: $localize`OpenVPN server clients`,
          category: "vpn",
          isRequired: false,
          mask: 24,
        });
      });
    }

    // L2TP - boolean check
    if (networks.VPNServerNetworks?.L2TP) {
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

    // PPTP - boolean check
    if (networks.VPNServerNetworks?.PPTP) {
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

    // SSTP - boolean check
    if (networks.VPNServerNetworks?.SSTP) {
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

    // IKEv2 - boolean check
    if (networks.VPNServerNetworks?.IKev2) {
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

    // SSH - boolean check
    if (networks.VPNServerNetworks?.SSH) {
      configs.push({
        key: "SSH",
        label: $localize`SSH Server`,
        placeholder: 165,
        value: values.value["SSH"] ?? null,
        description: $localize`SSH tunnel server`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    // Socks5 - boolean check
    if (networks.VPNServerNetworks?.Socks5) {
      configs.push({
        key: "Socks5",
        label: $localize`Socks5 Proxy`,
        placeholder: 155,
        value: values.value["Socks5"] ?? null,
        description: $localize`Socks5 proxy server`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    // HTTPProxy - boolean check
    if (networks.VPNServerNetworks?.HTTPProxy) {
      configs.push({
        key: "HTTPProxy",
        label: $localize`HTTP Proxy`,
        placeholder: 156,
        value: values.value["HTTPProxy"] ?? null,
        description: $localize`HTTP proxy server`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    // BackToHome - boolean check
    if (networks.VPNServerNetworks?.BackToHome) {
      configs.push({
        key: "BackToHome",
        label: $localize`Back To Home`,
        placeholder: 157,
        value: values.value["BackToHome"] ?? null,
        description: $localize`Back to home tunnel`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    // ZeroTier - boolean check
    if (networks.VPNServerNetworks?.ZeroTier) {
      configs.push({
        key: "ZeroTier",
        label: $localize`ZeroTier`,
        placeholder: 158,
        value: values.value["ZeroTier"] ?? null,
        description: $localize`ZeroTier network`,
        category: "vpn",
        isRequired: false,
        mask: 24,
      });
    }

    // Tunnel Networks - read from Networks.TunnelNetworks
    // Fixed starting points for each tunnel type for placeholders
    const tunnelSubnetBases = {
      ipip: 170,
      eoip: 180,
      gre: 190,
      vxlan: 210
    };

    // IPIP Tunnels
    if (networks.TunnelNetworks?.IPIP?.length) {
      networks.TunnelNetworks.IPIP.forEach((networkName, index) => {
        configs.push({
          key: networkName,
          label: $localize`${networkName}`,
          placeholder: tunnelSubnetBases.ipip + index,
          value: values.value[networkName] ?? null,
          description: $localize`IPIP tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    // EoIP Tunnels
    if (networks.TunnelNetworks?.Eoip?.length) {
      networks.TunnelNetworks.Eoip.forEach((networkName, index) => {
        configs.push({
          key: networkName,
          label: $localize`${networkName}`,
          placeholder: tunnelSubnetBases.eoip + index,
          value: values.value[networkName] ?? null,
          description: $localize`EoIP tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    // GRE Tunnels
    if (networks.TunnelNetworks?.Gre?.length) {
      networks.TunnelNetworks.Gre.forEach((networkName, index) => {
        configs.push({
          key: networkName,
          label: $localize`${networkName}`,
          placeholder: tunnelSubnetBases.gre + index,
          value: values.value[networkName] ?? null,
          description: $localize`GRE tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    // VXLAN Tunnels
    if (networks.TunnelNetworks?.Vxlan?.length) {
      networks.TunnelNetworks.Vxlan.forEach((networkName, index) => {
        configs.push({
          key: networkName,
          label: $localize`${networkName}`,
          placeholder: tunnelSubnetBases.vxlan + index,
          value: values.value[networkName] ?? null,
          description: $localize`VXLAN tunnel connection`,
          category: "tunnel",
          isRequired: false,
          mask: 30,
        });
      });
    }

    // Domestic WAN Networks - read from Networks.DomesticNetworks
    if (networks.DomesticNetworks?.length) {
      networks.DomesticNetworks.forEach((networkName, index) => {
        const key = `Domestic${index + 1}`;
        configs.push({
          key,
          label: $localize`${networkName}`,
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

    // Foreign WAN Networks - read from Networks.ForeignNetworks
    if (networks.ForeignNetworks?.length) {
      networks.ForeignNetworks.forEach((networkName, index) => {
        const key = `Foreign${index + 1}`;
        configs.push({
          key,
          label: $localize`${networkName}`,
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

    // VPN Client Networks - read from Networks.VPNClientNetworks
    let vpnClientIndex = 0;
    
    // Wireguard clients
    if (networks.VPNClientNetworks?.Wireguard?.length) {
      networks.VPNClientNetworks.Wireguard.forEach((networkName) => {
        const key = `VPNClient${++vpnClientIndex}`;
        configs.push({
          key,
          label: $localize`${networkName}`,
          placeholder: 41 + vpnClientIndex - 1,
          value: values.value[key] ?? null,
          description: $localize`WireGuard VPN client network`,
          category: "vpn-client",
          isRequired: false,
          mask: 24,
          color: "primary",
        });
      });
    }

    // OpenVPN clients
    if (networks.VPNClientNetworks?.OpenVPN?.length) {
      networks.VPNClientNetworks.OpenVPN.forEach((networkName) => {
        const key = `VPNClient${++vpnClientIndex}`;
        configs.push({
          key,
          label: $localize`${networkName}`,
          placeholder: 41 + vpnClientIndex - 1,
          value: values.value[key] ?? null,
          description: $localize`OpenVPN VPN client network`,
          category: "vpn-client",
          isRequired: false,
          mask: 24,
          color: "primary",
        });
      });
    }

    // L2TP clients
    if (networks.VPNClientNetworks?.L2TP?.length) {
      networks.VPNClientNetworks.L2TP.forEach((networkName) => {
        const key = `VPNClient${++vpnClientIndex}`;
        configs.push({
          key,
          label: $localize`${networkName}`,
          placeholder: 41 + vpnClientIndex - 1,
          value: values.value[key] ?? null,
          description: $localize`L2TP VPN client network`,
          category: "vpn-client",
          isRequired: false,
          mask: 24,
          color: "primary",
        });
      });
    }

    // PPTP clients
    if (networks.VPNClientNetworks?.PPTP?.length) {
      networks.VPNClientNetworks.PPTP.forEach((networkName) => {
        const key = `VPNClient${++vpnClientIndex}`;
        configs.push({
          key,
          label: $localize`${networkName}`,
          placeholder: 41 + vpnClientIndex - 1,
          value: values.value[key] ?? null,
          description: $localize`PPTP VPN client network`,
          category: "vpn-client",
          isRequired: false,
          mask: 24,
          color: "primary",
        });
      });
    }

    // SSTP clients
    if (networks.VPNClientNetworks?.SSTP?.length) {
      networks.VPNClientNetworks.SSTP.forEach((networkName) => {
        const key = `VPNClient${++vpnClientIndex}`;
        configs.push({
          key,
          label: $localize`${networkName}`,
          placeholder: 41 + vpnClientIndex - 1,
          value: values.value[key] ?? null,
          description: $localize`SSTP VPN client network`,
          category: "vpn-client",
          isRequired: false,
          mask: 24,
          color: "primary",
        });
      });
    }

    // IKEv2 clients
    if (networks.VPNClientNetworks?.IKev2?.length) {
      networks.VPNClientNetworks.IKev2.forEach((networkName) => {
        const key = `VPNClient${++vpnClientIndex}`;
        configs.push({
          key,
          label: $localize`${networkName}`,
          placeholder: 41 + vpnClientIndex - 1,
          value: values.value[key] ?? null,
          description: $localize`IKEv2 VPN client network`,
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

    if (groups.base.length > 0) tabs.push("base");
    if (groups["wan-domestic"].length > 0) tabs.push("wan-domestic");
    if (groups["wan-foreign"].length > 0) tabs.push("wan-foreign");
    if (groups["vpn-client"].length > 0) tabs.push("vpn-client");
    if (groups.vpn.length > 0) tabs.push("vpn");
    if (groups.tunnel.length > 0) tabs.push("tunnel");

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