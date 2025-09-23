import { type RouterInterfaces } from "../../StarContext/ChooseType";

export interface RouterData {
  model: string;
  icon: string;
  title: string;
  description: string;
  specs: {
    CPU: string;
    RAM: string;
    Storage: string;
    Ports: string;
    "Wi-Fi": string;
    Speed: string;
  };
  features: string[];
  isWireless: boolean;
  isLTE: boolean;
  isSFP: boolean;
  interfaces: RouterInterfaces;
  canBeMaster: boolean;
  canBeSlave: boolean;
  images?: string[];
  // New capability fields
  hasUSB?: boolean;
  has25GPort?: boolean;
  dockerCapable?: boolean;
  networkCapabilities?: {
    vpnProtocols: string[];
    maxConnections: number;
    routingProtocols: string[];
    vlanSupport: boolean;
    qosFeatures: string[];
    firewallType: string;
    throughput: string;
    maxVlans?: number;
    natPerformance?: string;
    ipsecThroughput?: string;
    wireguardSupport?: boolean;
  };
}

export const routers: RouterData[] = [
  // ===== MASTER ROUTERS (Can be used as primary routers) =====
  
  // Chateau Series - LTE/5G Routers
  {
    model: "Chateau 5G R17 ax",
    icon: "wifi",
    title: "Chateau 5G R17 ax",
    description: "5G home router with Wi-Fi 6 and eSIM support",
    specs: {
      CPU: "Quad-Core 1.8 GHz",
      RAM: "1 GB",
      Storage: "128 MB NAND",
      Ports: "4x Gigabit + 1x 2.5G",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps, 5 GHz: 1200 Mbps",
    },
    features: [
      "5G NSA/SA support",
      "eSIM capability",
      "4x4 MIMO",
      "2.5G Ethernet port",
    ],
    isWireless: true,
    isLTE: true,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
        wireless: ["wifi5", "wifi2.4"],
        lte: ["lte1"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: true,
    canBeSlave: false,
    images: [
      "/images/routers/chateau-5g-r17-ax/chateau-5g-r17-ax-1.png",
      "/images/routers/chateau-5g-r17-ax/chateau-5g-r17-ax-2.png",
      "/images/routers/chateau-5g-r17-ax/chateau-5g-r17-ax-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN", "WireGuard", "SSTP"],
      maxConnections: 200,
      routingProtocols: ["Static", "RIP", "OSPF", "BGP"],
      vlanSupport: true,
      qosFeatures: ["Traffic Shaping", "Queue Management", "Priority Queuing"],
      firewallType: "Stateful Firewall with DPI",
      throughput: "1 Gbps",
      maxVlans: 4094,
      natPerformance: "1 Gbps",
      ipsecThroughput: "500 Mbps",
      wireguardSupport: true,
    },
  },
  {
    model: "Chateau LTE18 ax",
    icon: "wifi",
    title: "Chateau LTE18 ax",
    description: "LTE Cat18 router with Wi-Fi 6 and high-speed connectivity",
    specs: {
      CPU: "Quad-Core 1.8 GHz",
      RAM: "1 GB",
      Storage: "128 MB NAND",
      Ports: "4x Gigabit + 1x 2.5G",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps, 5 GHz: 1200 Mbps",
    },
    features: [
      "LTE Cat18 (1.2Gbps)",
      "2.5G Ethernet port",
      "4x4 MIMO on LTE",
      "WPA3 encryption",
    ],
    isWireless: true,
    isLTE: true,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
        wireless: ["wifi5", "wifi2.4"],
        lte: ["lte1"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: true,
    canBeSlave: false,
    images: [
      "/images/routers/chateau-lte18-ax/chateau-lte18-ax-1.png",
      "/images/routers/chateau-lte18-ax/chateau-lte18-ax-2.png",
      "/images/routers/chateau-lte18-ax/chateau-lte18-ax-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN", "WireGuard", "SSTP"],
      maxConnections: 200,
      routingProtocols: ["Static", "RIP", "OSPF", "BGP"],
      vlanSupport: true,
      qosFeatures: ["Traffic Shaping", "Queue Management", "Priority Queuing"],
      firewallType: "Stateful Firewall with DPI",
      throughput: "1.2 Gbps",
      maxVlans: 4094,
      natPerformance: "1.2 Gbps",
      ipsecThroughput: "500 Mbps",
      wireguardSupport: true,
    },
  },
  {
    model: "Chateau LTE6 ax",
    icon: "wifi",
    title: "Chateau LTE6 ax",
    description: "LTE Cat6 router with Wi-Fi 6 for home and office",
    specs: {
      CPU: "Quad-Core 1.8 GHz",
      RAM: "1 GB",
      Storage: "128 MB NAND",
      Ports: "4x Gigabit + 1x 2.5G",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps, 5 GHz: 1200 Mbps",
    },
    features: [
      "LTE Cat6 support",
      "2.5G Ethernet port",
      "TR-069 management",
      "VPN support",
    ],
    isWireless: true,
    isLTE: true,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
        wireless: ["wifi5", "wifi2.4"],
        lte: ["lte1"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: true,
    canBeSlave: false,
    images: [
      "/images/routers/chateau-lte6-ax/chateau-lte6-ax-1.png",
      "/images/routers/chateau-lte6-ax/chateau-lte6-ax-2.png",
      "/images/routers/chateau-lte6-ax/chateau-lte6-ax-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN", "WireGuard"],
      maxConnections: 150,
      routingProtocols: ["Static", "RIP", "OSPF"],
      vlanSupport: true,
      qosFeatures: ["Traffic Shaping", "Queue Management"],
      firewallType: "Stateful Firewall",
      throughput: "300 Mbps",
      maxVlans: 4094,
      natPerformance: "300 Mbps",
      ipsecThroughput: "200 Mbps",
      wireguardSupport: true,
    },
  },
  {
    model: "Chateau PRO ax",
    icon: "wifi",
    title: "Chateau PRO ax",
    description: "Professional Wi-Fi 6 router with superior performance",
    specs: {
      CPU: "Quad-Core 2.2 GHz",
      RAM: "1 GB",
      Storage: "128 MB NAND",
      Ports: "5x Gigabit (1x PoE-out)",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 1148 Mbps, 5 GHz: 2400 Mbps",
    },
    features: [
      "4x4 spatial streams",
      "USB 3.0 port",
      "PoE-out capability",
      "Professional performance",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: true,
    canBeSlave: false,
    images: [
      "/images/routers/chateau-pro-ax/chateau-pro-ax-1.png",
      "/images/routers/chateau-pro-ax/chateau-pro-ax-2.png",
      "/images/routers/chateau-pro-ax/chateau-pro-ax-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN", "WireGuard", "SSTP", "IKEv2"],
      maxConnections: 300,
      routingProtocols: ["Static", "RIP", "OSPF", "BGP", "MPLS"],
      vlanSupport: true,
      qosFeatures: ["Traffic Shaping", "Queue Management", "Priority Queuing", "Bandwidth Management"],
      firewallType: "Enterprise Stateful Firewall with DPI",
      throughput: "2 Gbps",
      maxVlans: 4094,
      natPerformance: "2 Gbps",
      ipsecThroughput: "800 Mbps",
      wireguardSupport: true,
    },
  },

  // hAP ax Series - Wi-Fi 6 Routers
  {
    model: "hAP ax3",
    icon: "wifi",
    title: "hAP ax³",
    description: "High-performance Wi-Fi 6 router",
    specs: {
      CPU: "Quad-Core 1.8 GHz",
      RAM: "1 GB",
      Storage: "128 MB NAND",
      Ports: "5x Gigabit",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 600 Mbps, 5 GHz: 1800 Mbps",
    },
    features: [
      "Advanced Wi-Fi 6",
      "Enhanced coverage",
      "Higher throughput",
      "Better multi-device handling",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: true,
    canBeSlave: true,
    images: [
      "/images/routers/hap-ax3/hap-ax3-1.png",
      "/images/routers/hap-ax3/hap-ax3-2.png",
      "/images/routers/hap-ax3/hap-ax3-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN", "WireGuard"],
      maxConnections: 200,
      routingProtocols: ["Static", "RIP", "OSPF"],
      vlanSupport: true,
      qosFeatures: ["Traffic Shaping", "Queue Management", "Priority Queuing"],
      firewallType: "Stateful Firewall",
      throughput: "1.8 Gbps",
      maxVlans: 4094,
      natPerformance: "1.8 Gbps",
      ipsecThroughput: "600 Mbps",
      wireguardSupport: true,
    },
  },
  {
    model: "hAP ax2",
    icon: "wifi",
    title: "hAP ax²",
    description: "Dual-band Wi-Fi 6 home access point",
    specs: {
      CPU: "Quad-Core 1.8 GHz",
      RAM: "1 GB",
      Storage: "128 MB NAND",
      Ports: "5x Gigabit",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps, 5 GHz: 1201 Mbps",
    },
    features: [
      "Dual-band Wi-Fi 6",
      "IPsec hardware acceleration",
      "MU-MIMO support",
      "Compact design",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: true,
    canBeSlave: true,
    images: [
      "/images/routers/hap-ax2/hap-ax2-1.png",
      "/images/routers/hap-ax2/hap-ax2-2.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN", "WireGuard"],
      maxConnections: 150,
      routingProtocols: ["Static", "RIP", "OSPF"],
      vlanSupport: true,
      qosFeatures: ["Traffic Shaping", "Queue Management"],
      firewallType: "Stateful Firewall",
      throughput: "1.2 Gbps",
      maxVlans: 4094,
      natPerformance: "1.2 Gbps",
      ipsecThroughput: "400 Mbps",
      wireguardSupport: true,
    },
  },
  {
    model: "hAP ax lite LTE6",
    icon: "wifi",
    title: "hAP ax lite LTE6",
    description: "Budget Wi-Fi 6 router with LTE connectivity",
    specs: {
      CPU: "Dual-Core 800 MHz",
      RAM: "256 MB",
      Storage: "128 MB NAND",
      Ports: "4x Gigabit",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps",
    },
    features: [
      "LTE Cat6 modem",
      "Wi-Fi 6 on budget",
      "Compact size",
      "Dual-core CPU",
    ],
    isWireless: true,
    isLTE: true,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4"],
        wireless: ["wifi2.4"],
        lte: ["lte1"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: true,
    canBeSlave: true,
    images: [
      "/images/routers/hap-ax-lite-lte6/hap-ax-lite-lte6-1.png",
      "/images/routers/hap-ax-lite-lte6/hap-ax-lite-lte6-2.png",
      "/images/routers/hap-ax-lite-lte6/hap-ax-lite-lte6-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN"],
      maxConnections: 100,
      routingProtocols: ["Static", "RIP"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS"],
      firewallType: "Basic Firewall",
      throughput: "300 Mbps",
      maxVlans: 4094,
      natPerformance: "300 Mbps",
      ipsecThroughput: "100 Mbps",
      wireguardSupport: false,
    },
  },
  {
    model: "hAP ax lite",
    icon: "wifi",
    title: "hAP ax lite",
    description: "Affordable Wi-Fi 6 router for home use",
    specs: {
      CPU: "Dual-Core 800 MHz",
      RAM: "256 MB",
      Storage: "128 MB NAND",
      Ports: "4x Gigabit",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps",
    },
    features: [
      "Budget Wi-Fi 6",
      "Compact design",
      "Passive cooling",
      "RouterOS v7",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4"],
        wireless: ["wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/hap-ax-lite/hap-ax-lite-1.png",
      "/images/routers/hap-ax-lite/hap-ax-lite-2.png",
      "/images/routers/hap-ax-lite/hap-ax-lite-3.png",
      "/images/routers/hap-ax-lite/hap-ax-lite-4.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP"],
      maxConnections: 50,
      routingProtocols: ["Static"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS"],
      firewallType: "Basic Firewall",
      throughput: "200 Mbps",
      maxVlans: 4094,
      natPerformance: "200 Mbps",
      ipsecThroughput: "50 Mbps",
      wireguardSupport: false,
    },
  },

  // Enterprise Router
  {
    model: "RB5009UPr+S+IN",
    icon: "router",
    title: "RB5009UPr+S+IN",
    description: "Enterprise-grade router with PoE and SFP+",
    specs: {
      CPU: "Quad-Core 1.4 GHz",
      RAM: "1 GB",
      Storage: "1 GB NAND",
      Ports: "7x Gigabit + 1x 2.5G + SFP+",
      "Wi-Fi": "None",
      Speed: "Up to 10 Gbps (SFP+)",
    },
    features: [
      "Enterprise performance",
      "Universal PoE on all ports",
      "SFP+ 10G port",
      "2.5G Ethernet port",
    ],
    isWireless: false,
    isLTE: false,
    isSFP: true,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5", "ether6", "ether7", "ether8"],
        sfp: ["sfp-sfpplus1"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: true,
    canBeSlave: false,
    images: [
      "/images/routers/rb5009upr-s-in/rb5009upr-s-in-1.png",
      "/images/routers/rb5009upr-s-in/rb5009upr-s-in-2.png",
      "/images/routers/rb5009upr-s-in/rb5009upr-s-in-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN", "WireGuard", "SSTP", "IKEv2", "GRE"],
      maxConnections: 500,
      routingProtocols: ["Static", "RIP", "OSPF", "BGP", "MPLS", "VPLS"],
      vlanSupport: true,
      qosFeatures: ["Traffic Shaping", "Queue Management", "Priority Queuing", "Bandwidth Management", "HTB"],
      firewallType: "Enterprise Stateful Firewall with DPI",
      throughput: "7.5 Gbps",
      maxVlans: 4094,
      natPerformance: "7.5 Gbps",
      ipsecThroughput: "1 Gbps",
      wireguardSupport: true,
    },
  },

  // ===== SLAVE ROUTERS (Can be used in trunk mode) =====
  
  // Audience - Mesh System
  {
    model: "Audience",
    icon: "wifi",
    title: "Audience",
    description: "Tri-band mesh access point",
    specs: {
      CPU: "Quad-Core 896 MHz",
      RAM: "256 MB",
      Storage: "128 MB NAND",
      Ports: "2x Gigabit",
      "Wi-Fi": "Wi-Fi 5 (802.11ac)",
      Speed: "2.4 GHz: 300 Mbps, 5 GHz: 867+1733 Mbps",
    },
    features: [
      "Tri-band wireless",
      "Mesh technology",
      "Large area coverage",
      "Easy mobile setup",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2"],
        wireless: ["wifi5", "wifi5-2", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/audience/audience-1.png",
      "/images/routers/audience/audience-2.png",
      "/images/routers/audience/audience-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP"],
      maxConnections: 100,
      routingProtocols: ["Static"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS"],
      firewallType: "Basic Firewall",
      throughput: "867 Mbps",
      maxVlans: 4094,
      natPerformance: "500 Mbps",
      ipsecThroughput: "200 Mbps",
      wireguardSupport: false,
    },
  },

  // cAP Series - Ceiling Access Points
  {
    model: "cAP ax",
    icon: "wifi",
    title: "cAP ax",
    description: "Wi-Fi 6 ceiling access point",
    specs: {
      CPU: "Quad-Core 1.8 GHz",
      RAM: "1 GB",
      Storage: "128 MB NAND",
      Ports: "2x Gigabit (1x PoE-out)",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps, 5 GHz: 1200 Mbps",
    },
    features: [
      "Ceiling mount",
      "PoE-in and PoE-out",
      "Wi-Fi 6 technology",
      "CAPsMAN support",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/cap-ax/cap-ax-1.png",
      "/images/routers/cap-ax/cap-ax-2.png",
      "/images/routers/cap-ax/cap-ax-3.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP"],
      maxConnections: 150,
      routingProtocols: ["Static"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS", "WMM"],
      firewallType: "Basic Firewall",
      throughput: "1.2 Gbps",
      maxVlans: 4094,
      natPerformance: "1 Gbps",
      ipsecThroughput: "300 Mbps",
      wireguardSupport: false,
    },
  },
  {
    model: "cAP XL ac",
    icon: "wifi",
    title: "cAP XL ac",
    description: "High-gain ceiling access point",
    specs: {
      CPU: "Quad-Core 896 MHz",
      RAM: "128 MB",
      Storage: "16 MB FLASH",
      Ports: "2x Gigabit (1x PoE-out)",
      "Wi-Fi": "Wi-Fi 5 (802.11ac)",
      Speed: "2.4 GHz: 300 Mbps, 5 GHz: 867 Mbps",
    },
    features: [
      "High-gain antenna",
      "360-degree coverage",
      "PoE support",
      "Ceiling mount",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/cap-xl-ac/cap-xl-ac-1.png",
      "/images/routers/cap-xl-ac/cap-xl-ac-2.png",
      "/images/routers/cap-xl-ac/cap-xl-ac-3.png",
      "/images/routers/cap-xl-ac/cap-xl-ac-4.png",
      "/images/routers/cap-xl-ac/cap-xl-ac-5.png",
      "/images/routers/cap-xl-ac/cap-xl-ac-6.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP"],
      maxConnections: 100,
      routingProtocols: ["Static"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS", "WMM"],
      firewallType: "Basic Firewall",
      throughput: "867 Mbps",
      maxVlans: 4094,
      natPerformance: "500 Mbps",
      ipsecThroughput: "150 Mbps",
      wireguardSupport: false,
    },
  },
  {
    model: "cAP ac",
    icon: "wifi",
    title: "cAP ac",
    description: "Dual-band ceiling access point",
    specs: {
      CPU: "Quad-Core 896 MHz",
      RAM: "128 MB",
      Storage: "16 MB FLASH",
      Ports: "2x Gigabit",
      "Wi-Fi": "Wi-Fi 5 (802.11ac)",
      Speed: "2.4 GHz: 300 Mbps, 5 GHz: 867 Mbps",
    },
    features: [
      "Dual-band wireless",
      "360-degree coverage",
      "PoE support",
      "IPsec acceleration",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/cap-ac/cap-ac-1.png",
      "/images/routers/cap-ac/cap-ac-2.png",
      "/images/routers/cap-ac/cap-ac-3.png",
      "/images/routers/cap-ac/cap-ac-4.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP"],
      maxConnections: 100,
      routingProtocols: ["Static"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS", "WMM"],
      firewallType: "Basic Firewall",
      throughput: "867 Mbps",
      maxVlans: 4094,
      natPerformance: "500 Mbps",
      ipsecThroughput: "150 Mbps",
      wireguardSupport: false,
    },
  },

  // L009 Router
  {
    model: "L009UiGS-2HaxD-IN",
    icon: "router",
    title: "L009UiGS-2HaxD-IN",
    description: "Router with Wi-Fi 6 and SFP",
    specs: {
      CPU: "Dual-Core 800 MHz",
      RAM: "512 MB",
      Storage: "128 MB NAND",
      Ports: "8x Gigabit + SFP",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps",
    },
    features: [
      "Container support",
      "SFP 2.5G port",
      "PoE-in and PoE-out",
      "USB 3.0 port",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: true,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5", "ether6", "ether7", "ether8"],
        wireless: ["wifi2.4"],
        sfp: ["sfp1"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/l009uigs-2haxd-in/l009uigs-2haxd-in-1.png",
      "/images/routers/l009uigs-2haxd-in/l009uigs-2haxd-in-2.png",
      "/images/routers/l009uigs-2haxd-in/l009uigs-2haxd-in-3.png",
      "/images/routers/l009uigs-2haxd-in/l009uigs-2haxd-in-4.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN", "WireGuard"],
      maxConnections: 150,
      routingProtocols: ["Static", "RIP", "OSPF"],
      vlanSupport: true,
      qosFeatures: ["Traffic Shaping", "Queue Management"],
      firewallType: "Stateful Firewall",
      throughput: "2.5 Gbps",
      maxVlans: 4094,
      natPerformance: "1 Gbps",
      ipsecThroughput: "250 Mbps",
      wireguardSupport: true,
    },
  },

  // hAP ac Series - Wi-Fi 5 Routers
  {
    model: "hAP ac3",
    icon: "wifi",
    title: "hAP ac³",
    description: "Dual-band Wi-Fi 5 router with external antennas",
    specs: {
      CPU: "Quad-Core 896 MHz",
      RAM: "256 MB",
      Storage: "128 MB NAND",
      Ports: "5x Gigabit (1x PoE-out)",
      "Wi-Fi": "Wi-Fi 5 (802.11ac)",
      Speed: "2.4 GHz: 300 Mbps, 5 GHz: 867 Mbps",
    },
    features: [
      "External antennas",
      "PoE-out support",
      "USB port",
      "Versatile mounting",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/hap-ac3/hap-ac3-1.png",
      "/images/routers/hap-ac3/hap-ac3-2.png",
      "/images/routers/hap-ac3/hap-ac3-3.png",
      "/images/routers/hap-ac3/hap-ac3-4.png",
      "/images/routers/hap-ac3/hap-ac3-5.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP", "OpenVPN"],
      maxConnections: 100,
      routingProtocols: ["Static", "RIP"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS", "WMM"],
      firewallType: "Stateful Firewall",
      throughput: "867 Mbps",
      maxVlans: 4094,
      natPerformance: "500 Mbps",
      ipsecThroughput: "200 Mbps",
      wireguardSupport: false,
    },
  },
  {
    model: "hAP ac2",
    icon: "wifi",
    title: "hAP ac²",
    description: "Dual-band Wi-Fi 5 home access point",
    specs: {
      CPU: "Quad-Core 896 MHz",
      RAM: "128 MB",
      Storage: "16 MB FLASH",
      Ports: "5x Gigabit",
      "Wi-Fi": "Wi-Fi 5 (802.11ac)",
      Speed: "2.4 GHz: 300 Mbps, 5 GHz: 867 Mbps",
    },
    features: [
      "Dual-concurrent AP",
      "IPsec acceleration",
      "USB for 3G/4G",
      "Universal case",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/hap-ac2/hap-ac2-1.png",
      "/images/routers/hap-ac2/hap-ac2-2.png",
      "/images/routers/hap-ac2/hap-ac2-3.png",
      "/images/routers/hap-ac2/hap-ac2-4.png",
      "/images/routers/hap-ac2/hap-ac2-5.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP", "PPTP"],
      maxConnections: 100,
      routingProtocols: ["Static", "RIP"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS", "WMM"],
      firewallType: "Stateful Firewall",
      throughput: "867 Mbps",
      maxVlans: 4094,
      natPerformance: "500 Mbps",
      ipsecThroughput: "150 Mbps",
      wireguardSupport: false,
    },
  },

  // wAP Series - Weatherproof
  {
    model: "wAP ax",
    icon: "wifi",
    title: "wAP ax",
    description: "Weatherproof Wi-Fi 6 access point",
    specs: {
      CPU: "Dual-Core 800 MHz",
      RAM: "256 MB",
      Storage: "128 MB NAND",
      Ports: "2x Gigabit",
      "Wi-Fi": "Wi-Fi 6 (802.11ax)",
      Speed: "2.4 GHz: 574 Mbps, 5 GHz: 2400 Mbps",
    },
    features: [
      "Weatherproof design",
      "Wi-Fi 6 support",
      "PoE-in support",
      "CAPsMAN compatible",
    ],
    isWireless: true,
    isLTE: false,
    isSFP: false,
    interfaces: {
      Interfaces: {
        ethernet: ["ether1", "ether2"],
        wireless: ["wifi5", "wifi2.4"],
      },
      OccupiedInterfaces: [],
    },
    canBeMaster: false,
    canBeSlave: true,
    images: [
      "/images/routers/wap-ax/wap-ax-1.png",
      "/images/routers/wap-ax/wap-ax-2.png",
      "/images/routers/wap-ax/wap-ax-3.png",
      "/images/routers/wap-ax/wap-ax-4.png",
    ],
    networkCapabilities: {
      vpnProtocols: ["IPSec", "L2TP"],
      maxConnections: 150,
      routingProtocols: ["Static"],
      vlanSupport: true,
      qosFeatures: ["Basic QoS", "WMM"],
      firewallType: "Basic Firewall",
      throughput: "2.4 Gbps",
      maxVlans: 4094,
      natPerformance: "1 Gbps",
      ipsecThroughput: "200 Mbps",
      wireguardSupport: false,
    },
  },
];

// Helper functions to get routers by category
export const getMasterRouters = (): RouterData[] => {
  return routers.filter(router => router.canBeMaster);
};

export const getSlaveRouters = (): RouterData[] => {
  return routers.filter(router => router.canBeSlave);
};

// Get router by model name with backward compatibility
export const getRouterByModel = (model: string): RouterData | undefined => {
  // Map legacy model names to new names
  const legacyMapping: Record<string, string> = {
    "RB5009": "RB5009UPr+S+IN",
    "hAP AX2": "hAP ax2",
    "hAP AX3": "hAP ax3",
  };
  
  const mappedModel = legacyMapping[model] || model;
  return routers.find(router => router.model === mappedModel);
};

// Helper functions to detect router capabilities
export const hasUSBPort = (router: RouterData): boolean => {
  if (router.hasUSB !== undefined) return router.hasUSB;
  return router.features.some(feature => 
    feature.toLowerCase().includes('usb')
  );
};

export const has25GigPort = (router: RouterData): boolean => {
  if (router.has25GPort !== undefined) return router.has25GPort;
  return router.features.some(feature => 
    feature.toLowerCase().includes('2.5g')
  ) || router.specs.Ports.includes('2.5G');
};

export const isDockerCapable = (router: RouterData): boolean => {
  if (router.dockerCapable !== undefined) return router.dockerCapable;
  
  // Check for explicit Docker/Container support in features
  const hasContainerSupport = router.features.some(feature => 
    feature.toLowerCase().includes('container') || 
    feature.toLowerCase().includes('docker')
  );
  
  if (hasContainerSupport) return true;
  
  // Check RAM requirement (need at least 1GB for Docker)
  const ramValue = router.specs.RAM;
  const hasEnoughRAM = ramValue.includes('1 GB') || ramValue.includes('2 GB') || 
                      ramValue.includes('1GB') || ramValue.includes('2GB');
  
  // Check CPU (quad-core preferred for Docker)
  const isQuadCore = router.specs.CPU.toLowerCase().includes('quad-core');
  
  return hasEnoughRAM && isQuadCore;
};

export const isStarlinkMiniCompatible = (router: RouterData): boolean => {
  return router.isLTE;
};

export const isDomesticLinkAlternative = (router: RouterData): boolean => {
  return router.isLTE;
};