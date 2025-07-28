import type { DeviceConfig } from "./types";

export const DEVICE_CONFIGS: Record<string, DeviceConfig> = {
  mobile: {
    name: "iPhone 14",
    width: 390,
    height: 844,
    pixelRatio: 3,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)",
    touchEnabled: true,
  },
  tablet: {
    name: "iPad Pro",
    width: 1024,
    height: 1366,
    pixelRatio: 2,
    userAgent: "Mozilla/5.0 (iPad; CPU OS 16_0 like Mac OS X)",
    touchEnabled: true,
  },
  desktop: {
    name: "Desktop",
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    touchEnabled: false,
  },
};

export const DEFAULT_THEME = {
  mode: "light" as const,
  primaryColor: "#3b82f6",
  accentColor: "#10b981",
  backgroundColor: "#ffffff",
  surfaceColor: "#f8fafc",
  textColor: "#1f2937",
  borderColor: "#e5e7eb",
};

export const DARK_THEME = {
  mode: "dark" as const,
  primaryColor: "#60a5fa",
  accentColor: "#34d399",
  backgroundColor: "#111827",
  surfaceColor: "#1f2937",
  textColor: "#f9fafb",
  borderColor: "#374151",
};

export const COMPONENT_CATEGORIES = [
  {
    id: "status",
    name: "Status Components",
    description: "Components for displaying status and feedback",
    components: ["Alert", "ErrorMessage", "Toast"],
  },
  {
    id: "overlay",
    name: "Overlay Components", 
    description: "Modal and overlay components for focus and interaction",
    components: ["Dialog", "Drawer", "Popover"],
  },
  {
    id: "promotional",
    name: "Promotional Components",
    description: "Components for marketing and promotional content",
    components: ["PromoBanner"],
  },
];

export const KEYBOARD_SHORTCUTS = [
  { key: "1", description: "Switch to Overview section" },
  { key: "2", description: "Switch to Component Gallery" },
  { key: "3", description: "Switch to Mobile Features" },
  { key: "4", description: "Switch to Theme System" },
  { key: "5", description: "Switch to Performance" },
  { key: "t", description: "Toggle theme (light/dark)" },
  { key: "d", description: "Cycle device size" },
  { key: "r", description: "Reset all settings" },
  { key: "g", description: "Generate code for current config" },
  { key: "a", description: "Toggle accessibility scanner" },
  { key: "p", description: "Toggle performance monitor" },
  { key: "?", description: "Show/hide keyboard shortcuts" },
];

export const PERFORMANCE_THRESHOLDS = {
  fps: {
    good: 55,
    warning: 45,
    critical: 30,
  },
  memory: {
    good: 50,
    warning: 100,
    critical: 200,
  },
  interaction: {
    good: 16,
    warning: 100,
    critical: 300,
  },
};

export const ACCESSIBILITY_RULES = [
  {
    id: "color-contrast",
    name: "Color Contrast",
    description: "Text has sufficient contrast ratio",
    wcagLevel: "AA" as const,
  },
  {
    id: "alt-text",
    name: "Alt Text",
    description: "Images have descriptive alt text",
    wcagLevel: "A" as const,
  },
  {
    id: "keyboard-navigation",
    name: "Keyboard Navigation",
    description: "All interactive elements are keyboard accessible",
    wcagLevel: "A" as const,
  },
  {
    id: "focus-indicators",
    name: "Focus Indicators",
    description: "Focus indicators are visible and clear",
    wcagLevel: "AA" as const,
  },
  {
    id: "aria-labels",
    name: "ARIA Labels",
    description: "Interactive elements have appropriate ARIA labels",
    wcagLevel: "A" as const,
  },
];