import type { IconName } from "../utils/iconMapper";

export const getFooterSections = (locale: string = "en") => [
  {
    title: $localize`Product`,
    links: [
      { name: $localize`Launch App`, href: `/${locale}/star/` },
      { name: $localize`Features`, href: "#features" },
      { name: $localize`Router Support`, href: "#routers" },
      { name: $localize`VPN Solutions`, href: "#vpn" },
      { name: $localize`Gaming Optimization`, href: "#gaming" },
      { name: $localize`Enterprise`, href: "#enterprise" }
    ]
  },
  {
    title: $localize`Resources`,
    links: [
      { name: $localize`Documentation`, href: `/${locale}/docs` },
      { name: $localize`API Reference`, href: `/${locale}/api` },
      { name: $localize`Tutorials`, href: `/${locale}/tutorials` },
      { name: $localize`Community`, href: `/${locale}/community` },
      { name: $localize`Blog`, href: `/${locale}/blog` }
    ]
  },
  {
    title: $localize`Support`,
    links: [
      { name: $localize`Help Center`, href: `/${locale}/help` },
      { name: $localize`Contact Us`, href: `/${locale}/contact` },
      { name: $localize`Status Page`, href: `/${locale}/status` },
      { name: $localize`Bug Reports`, href: `/${locale}/bugs` },
      { name: $localize`Feature Requests`, href: `/${locale}/features` }
    ]
  },
  {
    title: $localize`Company`,
    links: [
      { name: $localize`About Us`, href: `/${locale}/about` },
      { name: $localize`Careers`, href: `/${locale}/careers` },
      { name: $localize`Privacy`, href: `/${locale}/privacy` },
      { name: $localize`Terms`, href: `/${locale}/terms` },
      { name: $localize`Security`, href: `/${locale}/security` }
    ]
  }
];

export const socialLinks = [
  { icon: "LuGithub" as IconName, href: "https://github.com", label: "GitHub" },
  { icon: "LuTwitter" as IconName, href: "https://twitter.com", label: "Twitter" },
  { icon: "LuLinkedin" as IconName, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: "LuYoutube" as IconName, href: "https://youtube.com", label: "YouTube" }
];