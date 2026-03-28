import { semanticMessages } from "~/i18n/semantic";
import { normalizeLocale, type AppLocale } from "~/i18n/config";

export const getFeatures = (locale: string = "en") => {
  const resolvedLocale = normalizeLocale(locale) as AppLocale;

  return [
    {
      icon: "LuRouter",
      title: semanticMessages.landing_features_router_support_title(
        {},
        { locale: resolvedLocale },
      ),
      subtitle: semanticMessages.landing_features_router_support_subtitle(
        {},
        { locale: resolvedLocale },
      ),
      description: semanticMessages.landing_features_router_support_description(
        {},
        { locale: resolvedLocale },
      ),
      color: "from-blue-500 to-cyan-500",
      features: [
        semanticMessages.landing_features_router_support_feature_auto_detection(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_router_support_feature_model_configs(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_router_support_feature_capability_mapping(
          {},
          { locale: resolvedLocale },
        ),
      ],
    },
    {
      icon: "LuShield",
      title: semanticMessages.landing_features_advanced_vpn_title(
        {},
        { locale: resolvedLocale },
      ),
      subtitle: semanticMessages.landing_features_advanced_vpn_subtitle(
        {},
        { locale: resolvedLocale },
      ),
      description: semanticMessages.landing_features_advanced_vpn_description(
        {},
        { locale: resolvedLocale },
      ),
      color: "from-purple-500 to-violet-500",
      features: [
        semanticMessages.landing_features_advanced_vpn_feature_wireguard(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_advanced_vpn_feature_openvpn(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_advanced_vpn_feature_enterprise_security(
          {},
          { locale: resolvedLocale },
        ),
      ],
    },
    {
      icon: "LuZap",
      title: semanticMessages.landing_features_gaming_title(
        {},
        { locale: resolvedLocale },
      ),
      subtitle: semanticMessages.landing_features_gaming_subtitle(
        {},
        { locale: resolvedLocale },
      ),
      description: semanticMessages.landing_features_gaming_description(
        {},
        { locale: resolvedLocale },
      ),
      color: "from-orange-500 to-red-500",
      features: [
        semanticMessages.landing_features_gaming_feature_database(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_gaming_feature_port_forwarding(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_gaming_feature_traffic_priority(
          {},
          { locale: resolvedLocale },
        ),
      ],
    },
    {
      icon: "LuGlobe",
      title: semanticMessages.landing_features_multi_wan_title(
        {},
        { locale: resolvedLocale },
      ),
      subtitle: semanticMessages.landing_features_multi_wan_subtitle(
        {},
        { locale: resolvedLocale },
      ),
      description: semanticMessages.landing_features_multi_wan_description(
        {},
        { locale: resolvedLocale },
      ),
      color: "from-green-500 to-emerald-500",
      features: [
        semanticMessages.landing_features_multi_wan_feature_load_balancing(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_multi_wan_feature_failover(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_multi_wan_feature_smart_routing(
          {},
          { locale: resolvedLocale },
        ),
      ],
    },
    {
      icon: "LuWifi",
      title: semanticMessages.landing_features_wireless_title(
        {},
        { locale: resolvedLocale },
      ),
      subtitle: semanticMessages.landing_features_wireless_subtitle(
        {},
        { locale: resolvedLocale },
      ),
      description: semanticMessages.landing_features_wireless_description(
        {},
        { locale: resolvedLocale },
      ),
      color: "from-teal-500 to-blue-500",
      features: [
        semanticMessages.landing_features_wireless_feature_multiple_ssids(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_wireless_feature_guest_access(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_wireless_feature_wpa3_security(
          {},
          { locale: resolvedLocale },
        ),
      ],
    },
    {
      icon: "LuServer",
      title: semanticMessages.landing_features_network_segments_title(
        {},
        { locale: resolvedLocale },
      ),
      subtitle: semanticMessages.landing_features_network_segments_subtitle(
        {},
        { locale: resolvedLocale },
      ),
      description:
        semanticMessages.landing_features_network_segments_description(
          {},
          { locale: resolvedLocale },
        ),
      color: "from-indigo-500 to-purple-500",
      features: [
        semanticMessages.landing_features_network_segments_feature_zones(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_network_segments_feature_isolation(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_features_network_segments_feature_smart_routing(
          {},
          { locale: resolvedLocale },
        ),
      ],
    },
  ];
};

export const features = getFeatures();
