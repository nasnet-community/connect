import type {
  Subnets,
  SubnetConfig,
  BaseSubnets,
  VPNClientSubnets,
  VPNServerSubnets,
  TunnelSubnets,
} from "~/components/Star/StarContext/Utils/Subnets";
import type { Networks } from "~/components/Star/StarContext/Utils/Networks";

/**
 * Generates default Subnets configuration based on Networks
 * Assigns placeholder subnet values automatically while preserving existing user configurations
 * @param networks - The Networks configuration
 * @param existingSubnets - Optional existing Subnets to preserve user configurations
 * @returns Subnets configuration with default subnet assignments
 */
export const generateSubnets = (
  networks: Networks,
  existingSubnets?: Subnets
): Subnets => {
  // Helper to create subnet config with preservation of existing values
  // Only creates name, subnet value should be configured by user in Subnets component
  const createSubnetConfig = (
    name: string,
    _thirdOctet?: number,  // Keep for backward compatibility but unused
    _mask: number = 24     // Keep for backward compatibility but unused
  ): SubnetConfig => {
    return {
      name,
      subnet: "",  // Empty subnet value - user configures in Subnets component
    };
  };

  // Helper to find existing subnet by name
  const findExistingSubnet = (
    name: string,
    existingArray?: SubnetConfig[]
  ): SubnetConfig | undefined => {
    return existingArray?.find((s) => s.name === name);
  };

  // Generate BaseSubnets
  const baseSubnets: BaseSubnets = {};

  if (networks.BaseNetworks?.Split) {
    const existing = existingSubnets?.BaseSubnets?.Split;
    // Only preserve if subnet value exists (user configured it)
    baseSubnets.Split = (existing && existing.subnet) 
      ? existing 
      : createSubnetConfig("Split");
  }

  if (networks.BaseNetworks?.Domestic) {
    const existing = existingSubnets?.BaseSubnets?.Domestic;
    // Only preserve if subnet value exists (user configured it)
    baseSubnets.Domestic = (existing && existing.subnet) 
      ? existing 
      : createSubnetConfig("Domestic");
  }

  if (networks.BaseNetworks?.Foreign) {
    const existing = existingSubnets?.BaseSubnets?.Foreign;
    // Only preserve if subnet value exists (user configured it)
    baseSubnets.Foreign = (existing && existing.subnet) 
      ? existing 
      : createSubnetConfig("Foreign");
  }

  if (networks.BaseNetworks?.VPN) {
    const existing = existingSubnets?.BaseSubnets?.VPN;
    // Only preserve if subnet value exists (user configured it)
    baseSubnets.VPN = (existing && existing.subnet) 
      ? existing 
      : createSubnetConfig("VPN");
  }

  // Generate ForeignSubnets
  let foreignSubnets: SubnetConfig[] | undefined;
  if (networks.ForeignNetworks && networks.ForeignNetworks.length > 0) {
    foreignSubnets = networks.ForeignNetworks.map((networkName) => {
      const existing = findExistingSubnet(
        networkName,
        existingSubnets?.ForeignSubnets
      );
      // Only preserve if subnet value exists (user configured it)
      return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
    });
  }

  // Generate DomesticSubnets
  let domesticSubnets: SubnetConfig[] | undefined;
  if (networks.DomesticNetworks && networks.DomesticNetworks.length > 0) {
    domesticSubnets = networks.DomesticNetworks.map((networkName) => {
      const existing = findExistingSubnet(
        networkName,
        existingSubnets?.DomesticSubnets
      );
      // Only preserve if subnet value exists (user configured it)
      return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
    });
  }

  // Generate VPNClientSubnets
  let vpnClientSubnets: VPNClientSubnets | undefined;

  if (networks.VPNClientNetworks) {
    vpnClientSubnets = {};

    // Wireguard clients
    if (
      networks.VPNClientNetworks.Wireguard &&
      networks.VPNClientNetworks.Wireguard.length > 0
    ) {
      vpnClientSubnets.Wireguard = networks.VPNClientNetworks.Wireguard.map(
        (networkName) => {
          const existing = findExistingSubnet(
            networkName,
            existingSubnets?.VPNClientSubnets?.Wireguard
          );
          // Only preserve if subnet value exists (user configured it)
          return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
        }
      );
    }

    // OpenVPN clients
    if (
      networks.VPNClientNetworks.OpenVPN &&
      networks.VPNClientNetworks.OpenVPN.length > 0
    ) {
      vpnClientSubnets.OpenVPN = networks.VPNClientNetworks.OpenVPN.map(
        (networkName) => {
          const existing = findExistingSubnet(
            networkName,
            existingSubnets?.VPNClientSubnets?.OpenVPN
          );
          // Only preserve if subnet value exists (user configured it)
          return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
        }
      );
    }

    // L2TP clients
    if (
      networks.VPNClientNetworks.L2TP &&
      networks.VPNClientNetworks.L2TP.length > 0
    ) {
      vpnClientSubnets.L2TP = networks.VPNClientNetworks.L2TP.map(
        (networkName) => {
          const existing = findExistingSubnet(
            networkName,
            existingSubnets?.VPNClientSubnets?.L2TP
          );
          // Only preserve if subnet value exists (user configured it)
          return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
        }
      );
    }

    // PPTP clients
    if (
      networks.VPNClientNetworks.PPTP &&
      networks.VPNClientNetworks.PPTP.length > 0
    ) {
      vpnClientSubnets.PPTP = networks.VPNClientNetworks.PPTP.map(
        (networkName) => {
          const existing = findExistingSubnet(
            networkName,
            existingSubnets?.VPNClientSubnets?.PPTP
          );
          // Only preserve if subnet value exists (user configured it)
          return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
        }
      );
    }

    // SSTP clients
    if (
      networks.VPNClientNetworks.SSTP &&
      networks.VPNClientNetworks.SSTP.length > 0
    ) {
      vpnClientSubnets.SSTP = networks.VPNClientNetworks.SSTP.map(
        (networkName) => {
          const existing = findExistingSubnet(
            networkName,
            existingSubnets?.VPNClientSubnets?.SSTP
          );
          // Only preserve if subnet value exists (user configured it)
          return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
        }
      );
    }

    // IKev2 clients
    if (
      networks.VPNClientNetworks.IKev2 &&
      networks.VPNClientNetworks.IKev2.length > 0
    ) {
      vpnClientSubnets.IKev2 = networks.VPNClientNetworks.IKev2.map(
        (networkName) => {
          const existing = findExistingSubnet(
            networkName,
            existingSubnets?.VPNClientSubnets?.IKev2
          );
          // Only preserve if subnet value exists (user configured it)
          return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
        }
      );
    }
  }

  // Generate VPNServerSubnets
  let vpnServerSubnets: VPNServerSubnets | undefined;

  if (networks.VPNServerNetworks) {
    vpnServerSubnets = {};

    // Wireguard servers (array)
    if (
      networks.VPNServerNetworks.Wireguard &&
      networks.VPNServerNetworks.Wireguard.length > 0
    ) {
      vpnServerSubnets.Wireguard = networks.VPNServerNetworks.Wireguard.map(
        (networkName) => {
          const existing = findExistingSubnet(
            networkName,
            existingSubnets?.VPNServerSubnets?.Wireguard
          );
          // Only preserve if subnet value exists (user configured it)
          return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
        }
      );
    }

    // OpenVPN servers (array)
    if (
      networks.VPNServerNetworks.OpenVPN &&
      networks.VPNServerNetworks.OpenVPN.length > 0
    ) {
      vpnServerSubnets.OpenVPN = networks.VPNServerNetworks.OpenVPN.map(
        (networkName) => {
          const existing = findExistingSubnet(
            networkName,
            existingSubnets?.VPNServerSubnets?.OpenVPN
          );
          // Only preserve if subnet value exists (user configured it)
          return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
        }
      );
    }

    // L2TP server (single)
    if (networks.VPNServerNetworks.L2TP) {
      const existing = existingSubnets?.VPNServerSubnets?.L2TP;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.L2TP = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("L2TP");
    }

    // PPTP server (single)
    if (networks.VPNServerNetworks.PPTP) {
      const existing = existingSubnets?.VPNServerSubnets?.PPTP;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.PPTP = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("PPTP");
    }

    // SSTP server (single)
    if (networks.VPNServerNetworks.SSTP) {
      const existing = existingSubnets?.VPNServerSubnets?.SSTP;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.SSTP = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("SSTP");
    }

    // IKev2 server (single)
    if (networks.VPNServerNetworks.IKev2) {
      const existing = existingSubnets?.VPNServerSubnets?.IKev2;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.IKev2 = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("IKev2");
    }

    // Socks5 server (single)
    if (networks.VPNServerNetworks.Socks5) {
      const existing = existingSubnets?.VPNServerSubnets?.Socks5;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.Socks5 = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("Socks5");
    }

    // SSH server (single)
    if (networks.VPNServerNetworks.SSH) {
      const existing = existingSubnets?.VPNServerSubnets?.SSH;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.SSH = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("SSH");
    }

    // HTTPProxy server (single)
    if (networks.VPNServerNetworks.HTTPProxy) {
      const existing = existingSubnets?.VPNServerSubnets?.HTTPProxy;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.HTTPProxy = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("HTTPProxy");
    }

    // BackToHome server (single)
    if (networks.VPNServerNetworks.BackToHome) {
      const existing = existingSubnets?.VPNServerSubnets?.BackToHome;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.BackToHome = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("BackToHome");
    }

    // ZeroTier server (single)
    if (networks.VPNServerNetworks.ZeroTier) {
      const existing = existingSubnets?.VPNServerSubnets?.ZeroTier;
      // Only preserve if subnet value exists (user configured it)
      vpnServerSubnets.ZeroTier = (existing && existing.subnet) 
        ? existing 
        : createSubnetConfig("ZeroTier");
    }
  }

  // Generate TunnelSubnets
  let tunnelSubnets: TunnelSubnets | undefined;

  if (networks.TunnelNetworks) {
    tunnelSubnets = {};

    // IPIP tunnels
    if (networks.TunnelNetworks.IPIP && networks.TunnelNetworks.IPIP.length > 0) {
      tunnelSubnets.IPIP = networks.TunnelNetworks.IPIP.map((networkName) => {
        const existing = findExistingSubnet(
          networkName,
          existingSubnets?.TunnelSubnets?.IPIP
        );
        // Only preserve if subnet value exists (user configured it)
        return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
      });
    }

    // Eoip tunnels
    if (networks.TunnelNetworks.Eoip && networks.TunnelNetworks.Eoip.length > 0) {
      tunnelSubnets.Eoip = networks.TunnelNetworks.Eoip.map((networkName) => {
        const existing = findExistingSubnet(
          networkName,
          existingSubnets?.TunnelSubnets?.Eoip
        );
        // Only preserve if subnet value exists (user configured it)
        return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
      });
    }

    // Gre tunnels
    if (networks.TunnelNetworks.Gre && networks.TunnelNetworks.Gre.length > 0) {
      tunnelSubnets.Gre = networks.TunnelNetworks.Gre.map((networkName) => {
        const existing = findExistingSubnet(
          networkName,
          existingSubnets?.TunnelSubnets?.Gre
        );
        // Only preserve if subnet value exists (user configured it)
        return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
      });
    }

    // Vxlan tunnels
    if (networks.TunnelNetworks.Vxlan && networks.TunnelNetworks.Vxlan.length > 0) {
      tunnelSubnets.Vxlan = networks.TunnelNetworks.Vxlan.map((networkName) => {
        const existing = findExistingSubnet(
          networkName,
          existingSubnets?.TunnelSubnets?.Vxlan
        );
        // Only preserve if subnet value exists (user configured it)
        return (existing && existing.subnet) ? existing : createSubnetConfig(networkName);
      });
    }
  }

  // Return the complete Subnets structure
  return {
    BaseSubnets: baseSubnets,
    ForeignSubnets: foreignSubnets,
    DomesticSubnets: domesticSubnets,
    VPNClientSubnets: vpnClientSubnets,
    VPNServerSubnets: vpnServerSubnets,
    TunnelSubnets: tunnelSubnets,
  };
};

/**
 * Helper function to check if Subnets need updating
 * @param networks - Current Networks configuration
 * @param existingSubnets - Existing Subnets configuration
 * @returns true if Subnets need to be regenerated
 */
export const shouldRegenerateSubnets = (
  networks: Networks,
  existingSubnets?: Subnets
): boolean => {
  if (!existingSubnets) return true;

  // Check if network counts match
  const foreignCount = networks.ForeignNetworks?.length || 0;
  const domesticCount = networks.DomesticNetworks?.length || 0;
  const existingForeignCount = existingSubnets.ForeignSubnets?.length || 0;
  const existingDomesticCount = existingSubnets.DomesticSubnets?.length || 0;

  if (foreignCount !== existingForeignCount || domesticCount !== existingDomesticCount) {
    return true;
  }

  // Check VPN client counts
  const vpnProtocols: Array<keyof typeof networks.VPNClientNetworks> = [
    "Wireguard",
    "OpenVPN",
    "L2TP",
    "PPTP",
    "SSTP",
    "IKev2",
  ];

  for (const protocol of vpnProtocols) {
    const networkCount = networks.VPNClientNetworks?.[protocol]?.length || 0;
    const subnetCount =
      existingSubnets.VPNClientSubnets?.[protocol as keyof VPNClientSubnets]?.length || 0;

    if (networkCount !== subnetCount) {
      return true;
    }
  }

  return false;
};

