import type { IconName } from "../utils/iconMapper";
import { semanticMessages } from "~/i18n/semantic";
import { normalizeLocale, type AppLocale } from "~/i18n/config";

export const getFooterSections = (locale: string = "en") => {
  const resolvedLocale = normalizeLocale(locale) as AppLocale;

  return [
    {
      title: semanticMessages.landing_footer_product(
        {},
        { locale: resolvedLocale },
      ),
      links: [
        {
          name: semanticMessages.top_nav_launch_app(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/star/`,
        },
        {
          name: semanticMessages.landing_footer_features(
            {},
            { locale: resolvedLocale },
          ),
          href: "#features",
        },
        {
          name: semanticMessages.landing_footer_router_support(
            {},
            { locale: resolvedLocale },
          ),
          href: "#routers",
        },
        {
          name: semanticMessages.landing_footer_vpn_solutions(
            {},
            { locale: resolvedLocale },
          ),
          href: "#vpn",
        },
        {
          name: semanticMessages.landing_footer_gaming_optimization(
            {},
            { locale: resolvedLocale },
          ),
          href: "#gaming",
        },
        {
          name: semanticMessages.landing_footer_enterprise(
            {},
            { locale: resolvedLocale },
          ),
          href: "#enterprise",
        },
      ],
    },
    {
      title: semanticMessages.landing_footer_resources(
        {},
        { locale: resolvedLocale },
      ),
      links: [
        {
          name: semanticMessages.landing_footer_api_reference(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/api`,
        },
        {
          name: semanticMessages.landing_footer_tutorials(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/tutorials`,
        },
        {
          name: semanticMessages.landing_footer_community(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/community`,
        },
        {
          name: semanticMessages.landing_footer_blog(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/blog`,
        },
      ],
    },
    {
      title: semanticMessages.landing_footer_support(
        {},
        { locale: resolvedLocale },
      ),
      links: [
        {
          name: semanticMessages.landing_footer_help_center(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/help`,
        },
        {
          name: semanticMessages.landing_footer_contact_us(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/contact`,
        },
        {
          name: semanticMessages.landing_footer_status_page(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/status`,
        },
        {
          name: semanticMessages.landing_footer_bug_reports(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/bugs`,
        },
        {
          name: semanticMessages.landing_footer_feature_requests(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/features`,
        },
      ],
    },
    {
      title: semanticMessages.landing_footer_company(
        {},
        { locale: resolvedLocale },
      ),
      links: [
        {
          name: semanticMessages.landing_footer_about_us(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/about`,
        },
        {
          name: semanticMessages.landing_footer_careers(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/careers`,
        },
        {
          name: semanticMessages.landing_footer_privacy(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/privacy`,
        },
        {
          name: semanticMessages.landing_footer_terms(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/terms`,
        },
        {
          name: semanticMessages.landing_footer_security(
            {},
            { locale: resolvedLocale },
          ),
          href: `/${locale}/security`,
        },
      ],
    },
  ];
};

export const socialLinks = [
  { icon: "LuGithub" as IconName, href: "https://github.com", label: "GitHub" },
  {
    icon: "LuTwitter" as IconName,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: "LuLinkedin" as IconName,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: "LuYoutube" as IconName,
    href: "https://youtube.com",
    label: "YouTube",
  },
];
