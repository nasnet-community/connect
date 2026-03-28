import type { IconName } from "../utils/iconMapper";
import { semanticMessages } from "~/i18n/semantic";
import { normalizeLocale, type AppLocale } from "~/i18n/config";

export const routerModels = [
  {
    name: "Chateau 5G R17 ax",
    category: "5g",
    image: "/images/routers/chateau-5g-r17-ax/chateau-5g-r17-ax-1.png",
    isWireless: true,
    isLTE: true,
    specs: { cpu: "ARM Cortex-A53", ram: "1GB", ethernet: "4x Gigabit" },
    features: ["5G", "WiFi 6", "Enterprise"],
  },
  {
    name: "hAP ax3",
    category: "wifi6",
    image: "/images/routers/hap-ax3/hap-ax3-1.png",
    isWireless: true,
    isLTE: false,
    specs: { cpu: "ARM Cortex-A53", ram: "512MB", ethernet: "5x Gigabit" },
    features: ["WiFi 6", "Home", "Gaming"],
  },
  {
    name: "RB5009UPr+S+IN",
    category: "enterprise",
    image: "/images/routers/rb5009upr-s-in/rb5009upr-s-in-1.png",
    isWireless: false,
    isLTE: false,
    specs: { cpu: "ARM Cortex-A57", ram: "1GB", ethernet: "8x Gigabit + SFP+" },
    features: ["Enterprise", "High Performance", "Rackmount"],
  },
  {
    name: "Chateau LTE18 ax",
    category: "lte",
    image: "/images/routers/chateau-lte18-ax/chateau-lte18-ax-1.png",
    isWireless: true,
    isLTE: true,
    specs: { cpu: "ARM Cortex-A53", ram: "512MB", ethernet: "4x Gigabit" },
    features: ["LTE", "WiFi 6", "Backup"],
  },
  {
    name: "hAP ax2",
    category: "wifi6",
    image: "/images/routers/hap-ax2/hap-ax2-1.png",
    isWireless: true,
    isLTE: false,
    specs: { cpu: "ARM Cortex-A53", ram: "256MB", ethernet: "5x Gigabit" },
    features: ["WiFi 6", "Affordable", "Home"],
  },
  {
    name: "cAP ax",
    category: "wifi6",
    image: "/images/routers/cap-ax/cap-ax-1.png",
    isWireless: true,
    isLTE: false,
    specs: { cpu: "ARM Cortex-A53", ram: "256MB", ethernet: "2x Gigabit" },
    features: ["Access Point", "WiFi 6", "Ceiling Mount"],
  },
];

export const getRouterCategories = (locale: string = "en") => {
  const resolvedLocale = normalizeLocale(locale) as AppLocale;

  return [
    {
      id: "all",
      name: semanticMessages.landing_router_models_category_all(
        {},
        { locale: resolvedLocale },
      ),
      icon: "LuRouter" as IconName,
    },
    {
      id: "wifi6",
      name: semanticMessages.landing_router_models_category_wifi6(
        {},
        { locale: resolvedLocale },
      ),
      icon: "LuWifi" as IconName,
    },
    {
      id: "5g",
      name: semanticMessages.landing_router_models_category_5g(
        {},
        { locale: resolvedLocale },
      ),
      icon: "LuZap" as IconName,
    },
    {
      id: "enterprise",
      name: semanticMessages.landing_router_models_category_enterprise(
        {},
        { locale: resolvedLocale },
      ),
      icon: "LuCpu" as IconName,
    },
  ];
};

export const getRouterStats = (locale: string = "en") => {
  const resolvedLocale = normalizeLocale(locale) as AppLocale;

  return [
    {
      number: "17+",
      label: semanticMessages.landing_router_models_stat_router_models(
        {},
        { locale: resolvedLocale },
      ),
    },
    {
      number: "100%",
      label: semanticMessages.landing_router_models_stat_auto_detection(
        {},
        { locale: resolvedLocale },
      ),
    },
    {
      number: "6",
      label: semanticMessages.landing_router_models_stat_vpn_protocols(
        {},
        { locale: resolvedLocale },
      ),
    },
    {
      number: "∞",
      label: semanticMessages.landing_router_models_stat_configurations(
        {},
        { locale: resolvedLocale },
      ),
    },
  ];
};
