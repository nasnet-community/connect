// Main documentation exports for Stat component
export { default as APIReference } from "./APIReference";
export { default as Examples } from "./Examples";
export { default as Overview } from "./Overview";
export { default as Playground } from "./Playground";
export { default as Usage } from "./Usage";

// Re-export component types for documentation use
export type {
  StatProps,
  StatNumberProps,
  StatLabelProps,
  StatIconProps,
  StatTrendProps,
  StatGroupProps,
  StatSize,
  StatVariant,
  TrendDirection,
  StatAlign,
  StatAnimationOptions,
  UseStatOptions,
  UseStatGroupOptions,
} from "../Stat.types";

// Re-export components for documentation examples
export {
  Stat,
  StatNumber,
  StatLabel,
  StatIcon,
  StatTrend,
  StatGroup,
  useStat,
  useStatGroup,
} from "../index";
