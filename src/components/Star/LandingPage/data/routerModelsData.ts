import type { IconName } from "../utils/iconMapper";

export const routerModels = [
  {
    name: "Chateau 5G R17 ax",
    category: "5g",
    image: "/images/routers/chateau-5g-r17-ax/chateau-5g-r17-ax-1.png",
    isWireless: true,
    isLTE: true,
    specs: { cpu: "ARM Cortex-A53", ram: "1GB", ethernet: "4x Gigabit" },
    features: ["5G", "WiFi 6", "Enterprise"]
  },
  {
    name: "hAP ax3",
    category: "wifi6",
    image: "/images/routers/hap-ax3/hap-ax3-1.png",
    isWireless: true,
    isLTE: false,
    specs: { cpu: "ARM Cortex-A53", ram: "512MB", ethernet: "5x Gigabit" },
    features: ["WiFi 6", "Home", "Gaming"]
  },
  {
    name: "RB5009UPr+S+IN",
    category: "enterprise",
    image: "/images/routers/rb5009upr-s-in/rb5009upr-s-in-1.png",
    isWireless: false,
    isLTE: false,
    specs: { cpu: "ARM Cortex-A57", ram: "1GB", ethernet: "8x Gigabit + SFP+" },
    features: ["Enterprise", "High Performance", "Rackmount"]
  },
  {
    name: "Chateau LTE18 ax",
    category: "lte",
    image: "/images/routers/chateau-lte18-ax/chateau-lte18-ax-1.png",
    isWireless: true,
    isLTE: true,
    specs: { cpu: "ARM Cortex-A53", ram: "512MB", ethernet: "4x Gigabit" },
    features: ["LTE", "WiFi 6", "Backup"]
  },
  {
    name: "hAP ax2",
    category: "wifi6",
    image: "/images/routers/hap-ax2/hap-ax2-1.png",
    isWireless: true,
    isLTE: false,
    specs: { cpu: "ARM Cortex-A53", ram: "256MB", ethernet: "5x Gigabit" },
    features: ["WiFi 6", "Affordable", "Home"]
  },
  {
    name: "cAP ax",
    category: "wifi6",
    image: "/images/routers/cap-ax/cap-ax-1.png",
    isWireless: true,
    isLTE: false,
    specs: { cpu: "ARM Cortex-A53", ram: "256MB", ethernet: "2x Gigabit" },
    features: ["Access Point", "WiFi 6", "Ceiling Mount"]
  }
];

export const routerCategories = [
  { id: "all", name: $localize`All Models`, icon: "LuRouter" as IconName },
  { id: "wifi6", name: $localize`WiFi 6`, icon: "LuWifi" as IconName },
  { id: "5g", name: $localize`5G / LTE`, icon: "LuZap" as IconName },
  { id: "enterprise", name: $localize`Enterprise`, icon: "LuCpu" as IconName }
];

export const routerStats = [
  { number: "17+", label: $localize`Router Models` },
  { number: "100%", label: $localize`Auto-Detection` },
  { number: "6", label: $localize`VPN Protocols` },
  { number: "∞", label: $localize`Configurations` }
];