import type { IconName } from "../utils/iconMapper";
import { semanticMessages } from "~/i18n/semantic";
import { normalizeLocale, type AppLocale } from "~/i18n/config";

export const getVpnProtocols = (locale: string = "en") => {
  const resolvedLocale = normalizeLocale(locale) as AppLocale;

  return [
    {
      id: "wireguard",
      name: "WireGuard",
      icon: "LuZap" as IconName,
      description: semanticMessages.landing_vpn_protocols_wireguard_description(
        {},
        { locale: resolvedLocale },
      ),
      features: [
        semanticMessages.landing_vpn_protocols_wireguard_feature_fastest(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_wireguard_feature_modern_crypto(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_wireguard_feature_low_latency(
          {},
          { locale: resolvedLocale },
        ),
      ],
      color: "from-green-500 to-emerald-500",
      performance: { speed: 95, security: 99, ease: 90 },
    },
    {
      id: "openvpn",
      name: "OpenVPN",
      icon: "LuShield" as IconName,
      description: semanticMessages.landing_vpn_protocols_openvpn_description(
        {},
        { locale: resolvedLocale },
      ),
      features: [
        semanticMessages.landing_vpn_protocols_openvpn_feature_ssl_tls(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_openvpn_feature_cross_platform(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_openvpn_feature_stable(
          {},
          { locale: resolvedLocale },
        ),
      ],
      color: "from-blue-500 to-cyan-500",
      performance: { speed: 80, security: 95, ease: 75 },
    },
    {
      id: "l2tp",
      name: "L2TP/IPSec",
      icon: "LuLock" as IconName,
      description: semanticMessages.landing_vpn_protocols_l2tp_description(
        {},
        { locale: resolvedLocale },
      ),
      features: [
        semanticMessages.landing_vpn_protocols_l2tp_feature_enterprise(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_l2tp_feature_ipsec(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_l2tp_feature_nat_support(
          {},
          { locale: resolvedLocale },
        ),
      ],
      color: "from-purple-500 to-violet-500",
      performance: { speed: 70, security: 90, ease: 80 },
    },
    {
      id: "ikev2",
      name: "IKeV2",
      description: semanticMessages.landing_vpn_protocols_ikev2_description(
        {},
        { locale: resolvedLocale },
      ),
      icon: "LuSmartphone" as IconName,
      features: [
        semanticMessages.landing_vpn_protocols_ikev2_feature_mobile_optimized(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_ikev2_feature_auto_reconnect(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_ikev2_feature_fast_handoff(
          {},
          { locale: resolvedLocale },
        ),
      ],
      color: "from-orange-500 to-red-500",
      performance: { speed: 85, security: 95, ease: 85 },
    },
    {
      id: "sstp",
      name: "SSTP",
      description: semanticMessages.landing_vpn_protocols_sstp_description(
        {},
        { locale: resolvedLocale },
      ),
      icon: "LuGlobe" as IconName,
      features: [
        semanticMessages.landing_vpn_protocols_sstp_feature_firewall_friendly(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_sstp_feature_ssl_encryption(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_sstp_feature_windows_native(
          {},
          { locale: resolvedLocale },
        ),
      ],
      color: "from-indigo-500 to-blue-500",
      performance: { speed: 75, security: 85, ease: 85 },
    },
    {
      id: "pptp",
      name: "PPTP",
      description: semanticMessages.landing_vpn_protocols_pptp_description(
        {},
        { locale: resolvedLocale },
      ),
      icon: "LuServer" as IconName,
      features: [
        semanticMessages.landing_vpn_protocols_pptp_feature_legacy_support(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_pptp_feature_simple_setup(
          {},
          { locale: resolvedLocale },
        ),
        semanticMessages.landing_vpn_protocols_pptp_feature_wide_compatibility(
          {},
          { locale: resolvedLocale },
        ),
      ],
      color: "from-gray-500 to-slate-500",
      performance: { speed: 90, security: 60, ease: 95 },
    },
  ];
};

export const getVpnBottomFeatures = (locale: string = "en") => {
  const resolvedLocale = normalizeLocale(locale) as AppLocale;

  return [
    {
      icon: "LuShield" as IconName,
      title: semanticMessages.landing_vpn_bottom_enterprise_security_title(
        {},
        { locale: resolvedLocale },
      ),
      description:
        semanticMessages.landing_vpn_bottom_enterprise_security_description(
          {},
          { locale: resolvedLocale },
        ),
    },
    {
      icon: "LuZap" as IconName,
      title: semanticMessages.landing_vpn_bottom_high_performance_title(
        {},
        { locale: resolvedLocale },
      ),
      description:
        semanticMessages.landing_vpn_bottom_high_performance_description(
          {},
          { locale: resolvedLocale },
        ),
    },
    {
      icon: "LuGlobe" as IconName,
      title: semanticMessages.landing_vpn_bottom_global_access_title(
        {},
        { locale: resolvedLocale },
      ),
      description:
        semanticMessages.landing_vpn_bottom_global_access_description(
          {},
          { locale: resolvedLocale },
        ),
    },
  ];
};

export const vpnProtocols = getVpnProtocols();
export const vpnBottomFeatures = getVpnBottomFeatures();
