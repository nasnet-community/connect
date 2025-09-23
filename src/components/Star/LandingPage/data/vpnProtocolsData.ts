import type { IconName } from "../utils/iconMapper";

export const vpnProtocols = [
  {
    id: "wireguard",
    name: "WireGuard",
    icon: "LuZap" as IconName,
    description: $localize`Modern, fast, and secure VPN protocol with minimal configuration overhead`,
    features: [$localize`Fastest`, $localize`Modern crypto`, $localize`Low latency`],
    color: "from-green-500 to-emerald-500",
    performance: { speed: 95, security: 99, ease: 90 }
  },
  {
    id: "openvpn",
    name: "OpenVPN",
    icon: "LuShield" as IconName,
    description: $localize`Industry standard SSL/TLS VPN with excellent compatibility and security`,
    features: [$localize`SSL/TLS`, $localize`Cross-platform`, $localize`Stable`],
    color: "from-blue-500 to-cyan-500",
    performance: { speed: 80, security: 95, ease: 75 }
  },
  {
    id: "l2tp",
    name: "L2TP/IPSec",
    icon: "LuLock" as IconName,
    description: $localize`Layer 2 Tunneling Protocol with IPSec encryption for enterprise security`,
    features: [$localize`Enterprise`, $localize`IPSec encryption`, $localize`NAT support`],
    color: "from-purple-500 to-violet-500",
    performance: { speed: 70, security: 90, ease: 80 }
  },
  {
    id: "ikev2",
    name: "IKeV2",
    description: $localize`Internet Key Exchange version 2 with excellent mobile device support`,
    icon: "LuSmartphone" as IconName,
    features: [$localize`Mobile optimized`, $localize`Auto-reconnect`, $localize`Fast handoff`],
    color: "from-orange-500 to-red-500",
    performance: { speed: 85, security: 95, ease: 85 }
  },
  {
    id: "sstp",
    name: "SSTP",
    description: $localize`Secure Socket Tunneling Protocol with firewall traversal capabilities`,
    icon: "LuGlobe" as IconName,
    features: [$localize`Firewall friendly`, $localize`SSL encryption`, $localize`Windows native`],
    color: "from-indigo-500 to-blue-500",
    performance: { speed: 75, security: 85, ease: 85 }
  },
  {
    id: "pptp",
    name: "PPTP",
    description: $localize`Point-to-Point Tunneling Protocol for legacy device compatibility`,
    icon: "LuServer" as IconName,
    features: [$localize`Legacy support`, $localize`Simple setup`, $localize`Wide compatibility`],
    color: "from-gray-500 to-slate-500",
    performance: { speed: 90, security: 60, ease: 95 }
  }
];

export const vpnBottomFeatures = [
  {
    icon: "LuShield" as IconName,
    title: $localize`Enterprise Security`,
    description: $localize`Military-grade encryption with certificate management and advanced authentication methods.`
  },
  {
    icon: "LuZap" as IconName,
    title: $localize`High Performance`,
    description: $localize`Optimized for speed with hardware acceleration and efficient packet processing.`
  },
  {
    icon: "LuGlobe" as IconName,
    title: $localize`Global Access`,
    description: $localize`Secure remote access from anywhere with intelligent routing and failover support.`
  }
];