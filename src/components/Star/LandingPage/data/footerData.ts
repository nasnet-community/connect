import type { IconName } from "../utils/iconMapper";

export const footerSections = [
  {
    title: $localize`Product`,
    links: [
      { name: $localize`Launch App`, href: "/star/" },
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
      { name: $localize`Documentation`, href: "/docs" },
      { name: $localize`API Reference`, href: "/api" },
      { name: $localize`Tutorials`, href: "/tutorials" },
      { name: $localize`Community`, href: "/community" },
      { name: $localize`Blog`, href: "/blog" }
    ]
  },
  {
    title: $localize`Support`,
    links: [
      { name: $localize`Help Center`, href: "/help" },
      { name: $localize`Contact Us`, href: "/contact" },
      { name: $localize`Status Page`, href: "/status" },
      { name: $localize`Bug Reports`, href: "/bugs" },
      { name: $localize`Feature Requests`, href: "/features" }
    ]
  },
  {
    title: $localize`Company`,
    links: [
      { name: $localize`About Us`, href: "/about" },
      { name: $localize`Careers`, href: "/careers" },
      { name: $localize`Privacy`, href: "/privacy" },
      { name: $localize`Terms`, href: "/terms" },
      { name: $localize`Security`, href: "/security" }
    ]
  }
];

export const socialLinks = [
  { icon: "LuGithub" as IconName, href: "https://github.com", label: "GitHub" },
  { icon: "LuTwitter" as IconName, href: "https://twitter.com", label: "Twitter" },
  { icon: "LuLinkedin" as IconName, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: "LuYoutube" as IconName, href: "https://youtube.com", label: "YouTube" }
];