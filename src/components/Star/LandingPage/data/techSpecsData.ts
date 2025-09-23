import type { IconName } from "../utils/iconMapper";

export const techSpecs = [
  {
    category: $localize`Performance`,
    icon: "LuZap" as IconName,
    color: "from-yellow-500 to-orange-500",
    specs: [
      { label: $localize`Configuration Time`, value: "< 5 min", highlight: true },
      { label: $localize`Script Generation`, value: "Real-time" },
      { label: $localize`Router Models`, value: "17+" },
      { label: $localize`Concurrent Users`, value: "Unlimited" }
    ]
  },
  {
    category: $localize`Security`,
    icon: "LuShield" as IconName,
    color: "from-green-500 to-emerald-500",
    specs: [
      { label: $localize`VPN Protocols`, value: "6", highlight: true },
      { label: $localize`Encryption`, value: "AES-256" },
      { label: $localize`Authentication`, value: "Multi-factor" },
      { label: $localize`Firewall Rules`, value: "Advanced" }
    ]
  },
  {
    category: $localize`Networking`,
    icon: "LuGlobe" as IconName,
    color: "from-blue-500 to-cyan-500",
    specs: [
      { label: $localize`WAN Connections`, value: "Multi-WAN", highlight: true },
      { label: $localize`Network Segments`, value: "4 Zones" },
      { label: $localize`Load Balancing`, value: "Intelligent" },
      { label: $localize`Failover`, value: "Automatic" }
    ]
  },
  {
    category: $localize`Platform`,
    icon: "LuCpu" as IconName,
    color: "from-purple-500 to-violet-500",
    specs: [
      { label: $localize`Web Interface`, value: "Modern", highlight: true },
      { label: $localize`Mobile Support`, value: "Responsive" },
      { label: $localize`Languages`, value: "9+" },
      { label: $localize`Updates`, value: "Continuous" }
    ]
  }
];

export const stats = [
  { number: "10,000+", label: $localize`Active Users`, icon: "LuUsers" as IconName },
  { number: "99.9%", label: $localize`Uptime`, icon: "LuTrendingUp" as IconName },
  { number: "4.9/5", label: $localize`User Rating`, icon: "LuStar" as IconName },
  { number: "24/7", label: $localize`Support`, icon: "LuAward" as IconName }
];

export const testimonials = [
  {
    name: "Network Admin",
    company: $localize`Enterprise Corp`,
    text: $localize`Reduced our router configuration time from hours to minutes. The automation is incredible.`,
    rating: 5
  },
  {
    name: "Gaming Enthusiast",
    company: $localize`Pro Gamer`,
    text: $localize`Finally, a tool that understands gaming requirements. My latency has never been better.`,
    rating: 5
  },
  {
    name: "IT Manager",
    company: $localize`Tech Solutions`,
    text: $localize`The VPN setup wizard saved us thousands in consulting fees. Professional grade results.`,
    rating: 5
  }
];

export const trustIndicators = [
  { name: $localize`Enterprise Ready`, icon: "LuShield" as IconName },
  { name: $localize`SOC 2 Compliant`, icon: "LuCheckCircle" as IconName },
  { name: $localize`99.9% Uptime`, icon: "LuTrendingUp" as IconName },
  { name: $localize`24/7 Support`, icon: "LuUsers" as IconName }
];