import type { IconName } from "../utils/iconMapper";

export const features = [
  {
    icon: "LuRouter" as IconName,
    title: $localize`Multi-Router Support`,
    subtitle: $localize`17+ Models Supported`,
    description: $localize`From hAP series to Chateau models, configure any MikroTik router with intelligent model detection and capability mapping.`,
    color: "from-blue-500 to-cyan-500",
    features: [$localize`Auto-detection`, $localize`Model-specific configs`, $localize`Capability mapping`]
  },
  {
    icon: "LuShield" as IconName,
    title: $localize`Advanced VPN`,
    subtitle: $localize`6 Protocol Support`,
    description: $localize`Complete VPN solution with WireGuard, OpenVPN, L2TP, PPTP, SSTP, and IKeV2. Both server and client configurations.`,
    color: "from-purple-500 to-violet-500",
    features: [$localize`WireGuard`, $localize`OpenVPN`, $localize`Enterprise security`]
  },
  {
    icon: "LuZap" as IconName,
    title: $localize`Gaming Optimization`,
    subtitle: $localize`Zero-Lag Performance`,
    description: $localize`Built-in gaming database with automatic port forwarding and traffic prioritization for popular games.`,
    color: "from-orange-500 to-red-500",
    features: [$localize`Game database`, $localize`Port forwarding`, $localize`Traffic priority`]
  },
  {
    icon: "LuGlobe" as IconName,
    title: $localize`Multi-WAN Setup`,
    subtitle: $localize`Smart Load Balancing`,
    description: $localize`Configure multiple WAN connections with intelligent routing, failover, and domestic/foreign link separation.`,
    color: "from-green-500 to-emerald-500",
    features: [$localize`Load balancing`, $localize`Failover`, $localize`Smart routing`]
  },
  {
    icon: "LuWifi" as IconName,
    title: $localize`Wireless Networks`,
    subtitle: $localize`Professional WiFi`,
    description: $localize`Advanced wireless configuration with multiple SSIDs, guest networks, and enterprise-grade security.`,
    color: "from-teal-500 to-blue-500",
    features: [$localize`Multiple SSIDs`, $localize`Guest access`, $localize`WPA3 security`]
  },
  {
    icon: "LuServer" as IconName,
    title: $localize`Network Segments`,
    subtitle: $localize`Isolated LANs`,
    description: $localize`Create secure network segments: VPN, Domestic, Foreign, and Split networks with intelligent routing rules.`,
    color: "from-indigo-500 to-purple-500",
    features: [$localize`4 Network zones`, $localize`Isolation rules`, $localize`Smart routing`]
  }
];