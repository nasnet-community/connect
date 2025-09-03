import type { JSXChildren, QRL, Signal } from "@builder.io/qwik";

export type GradientDirection = "to-r" | "to-br" | "to-b" | "to-bl" | "to-l" | "to-tl" | "to-t" | "to-tr";

export interface GradientConfig {
  direction?: GradientDirection;
  from: string;
  via?: string;
  to: string;
}

export interface FeatureHighlight {
  label: string;
  color: string;
  description?: string;
}

export interface ToggleConfig {
  enabled: Signal<boolean>;
  label: string;
  onChange$: QRL<(value: boolean) => void>;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
}

export interface StatusIndicatorConfig {
  active: boolean;
  activeText: string;
  inactiveText: string;
  showDot?: boolean;
  activeColor?: string;
  inactiveColor?: string;
}

export interface GradientHeaderProps {
  title: string;
  description?: string;
  
  // Icon configuration
  icon?: JSXChildren;
  iconAnimation?: boolean;
  
  // Background and styling
  gradient?: GradientConfig;
  backgroundPattern?: boolean;
  floatingIcon?: JSXChildren;
  
  // Features section
  features?: FeatureHighlight[];
  showFeaturesWhen?: boolean;
  
  // Toggle control
  toggleConfig?: ToggleConfig;
  
  // Status indicator
  statusIndicator?: StatusIndicatorConfig;
  
  // Layout options
  layout?: "default" | "compact" | "centered";
  size?: "sm" | "md" | "lg";
  
  // Custom styling
  class?: string;
  titleClass?: string;
  descriptionClass?: string;
  
  // Content slots
  children?: JSXChildren;
  rightContent?: JSXChildren;
}

export interface GradientHeaderExampleProps {
  variant?: "basic" | "with-toggle" | "with-features" | "compact";
  title?: string;
  description?: string;
}