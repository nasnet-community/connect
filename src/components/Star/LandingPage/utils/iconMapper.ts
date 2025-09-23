import {
  LuRouter, LuShield, LuZap, LuGlobe, LuWifi, LuServer,
  LuSmartphone, LuLock, LuCpu, LuUsers, LuTrendingUp,
  LuAward, LuCheckCircle, LuStar, LuGithub, LuTwitter,
  LuLinkedin, LuYoutube, LuMemoryStick, LuNetwork
} from "@qwikest/icons/lucide";

export type IconName =
  | "LuRouter" | "LuShield" | "LuZap" | "LuGlobe" | "LuWifi"
  | "LuServer" | "LuSmartphone" | "LuLock" | "LuCpu" | "LuUsers"
  | "LuTrendingUp" | "LuAward" | "LuCheckCircle" | "LuStar"
  | "LuGithub" | "LuTwitter" | "LuLinkedin" | "LuYoutube"
  | "LuMemoryStick" | "LuNetwork";

const iconMap = {
  LuRouter,
  LuShield,
  LuZap,
  LuGlobe,
  LuWifi,
  LuServer,
  LuSmartphone,
  LuLock,
  LuCpu,
  LuUsers,
  LuTrendingUp,
  LuAward,
  LuCheckCircle,
  LuStar,
  LuGithub,
  LuTwitter,
  LuLinkedin,
  LuYoutube,
  LuMemoryStick,
  LuNetwork
};

export function getIcon(iconName: IconName) {
  return iconMap[iconName];
}