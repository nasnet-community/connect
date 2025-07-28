// ====================
// CORE EXPORTS
// ====================

// Types and interfaces
export * from "./types";

// Utility functions
export * from "./utils";

// Components
export * from "./VisuallyHidden";

// ====================
// DOCUMENTATION EXPORTS
// ====================

// Documentation components
export * from "./docs";

// Example components
export * from "./Examples";

// ====================
// CONVENIENCE RE-EXPORTS
// ====================

// Most commonly used utilities (for easier imports)
export { 
  classNames, 
  cn,
  generateId,
  debounce,
  throttle,
  isServer,
  isClient,
  formatDate,
  formatCurrency,
  truncate,
  capitalize,
  isEmpty,
  isValidEmail,
  copyToClipboard,
} from "./utils";

// Most commonly used types
export type {
  ValidationState,
  InputSize,
  ComponentSize,
  ComponentVariant,
  Option,
  ChangeHandler,
  ClickHandler,
  ResponsiveValue,
  ColorScheme,
  ThemeVariant,
  Breakpoint,
  DeviceType,
  BaseProps,
  InteractiveProps,
} from "./types";
