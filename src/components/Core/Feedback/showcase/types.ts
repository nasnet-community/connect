import type { JSXNode, QRL } from "@builder.io/qwik";

export interface ShowcaseTheme {
  mode: "light" | "dark" | "system";
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
  surfaceColor: string;
  textColor: string;
  borderColor: string;
}

export type DeviceSize = "mobile" | "tablet" | "desktop";

export interface DeviceConfig {
  name: string;
  width: number;
  height: number;
  pixelRatio: number;
  userAgent: string;
  touchEnabled: boolean;
}

export interface ComponentDemoProps {
  title: string;
  description: string;
  component: JSXNode;
  code: string;
  features: string[];
  responsive?: boolean;
  interactive?: boolean;
  mobileOptimized?: boolean;
}

export interface ShowcaseSection {
  id: string;
  title: string;
  description: string;
  icon: JSXNode;
  demos: ComponentDemoProps[];
}

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number;
  renderTime: number;
  interactionLatency: number;
  componentCount: number;
}

export interface AccessibilityIssue {
  type: "error" | "warning" | "info";
  element: string;
  description: string;
  recommendation: string;
  wcagLevel: "A" | "AA" | "AAA";
}

export interface CodeGeneratorConfig {
  component: string;
  variant: string;
  size: string;
  props: Record<string, any>;
  theme: ShowcaseTheme;
  responsive: boolean;
  mobile: boolean;
}

export interface KeyboardShortcut {
  key: string;
  description: string;
  action: QRL<() => void>;
}