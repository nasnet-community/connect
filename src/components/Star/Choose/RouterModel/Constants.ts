import { type RouterInterfaces } from "../../StarContext/ChooseType";

export interface RouterData {
  model: "hAP AX2" | "hAP AX3" | "RB5009";
  icon: string;
  title: string;
  description: string;
  specs: {
    [key: string]: string;
  };
  features: string[];
  isWireless: boolean;
  interfaces: RouterInterfaces;
}

export const routers: RouterData[] = [
  {
    model: "hAP AX2",
    icon: "wifi",
    title: "hAP AX2",
    description: "Dual-band Wi-Fi 6 home access point",
    specs: {
      CPU: "Quad-Core 1.8 GHz",
      RAM: "1 GB",
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
    interfaces: {
      ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
      wireless: ["wifi5", "wifi2.4"],
    },
  },
  {
    model: "hAP AX3",
    icon: "wifi",
    title: "hAP AX3",
    description: "High-performance Wi-Fi 6 router",
    specs: {
      CPU: "Quad-Core 2.0 GHz",
      RAM: "1 GB",
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
    interfaces: {
      ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
      wireless: ["wifi5", "wifi2.4"],
    },
  },
  {
    model: "RB5009",
    icon: "router",
    title: "RB5009",
    description: "Enterprise-grade router",
    specs: {
      CPU: "Quad-Core 2.2 GHz",
      RAM: "1 GB",
      Ports: "8x Gigabit + SFP+",
      "Wi-Fi": "None",
      Speed: "Up to 10 Gbps (SFP+)",
    },
    features: [
      "Enterprise performance",
      "SFP+ port",
      "Advanced routing",
      "High reliability",
    ],
    isWireless: false,
    interfaces: {
      ethernet: [
        "ether1",
        "ether2",
        "ether3",
        "ether4",
        "ether5",
        "ether6",
        "ether7",
        "ether8",
      ],
      sfp: ["sfp-sfpplus1"],
    },
  },
];
