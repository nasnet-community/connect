// ====================
// COMPONENT STATE TYPES
// ====================

/**
 * Validation states for form components
 */
export type ValidationState = "default" | "valid" | "invalid";

/**
 * Standard size options for components
 */
export type InputSize = "sm" | "md" | "lg";

/**
 * Extended size options with extra small and extra large
 */
export type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

/**
 * Common variant types for styled components
 */
export type ComponentVariant = 
  | "default" 
  | "primary" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "error" 
  | "info";

/**
 * Semantic status types
 */
export type Status = "idle" | "loading" | "success" | "error";

/**
 * Loading states for async operations
 */
export type LoadingState = "idle" | "pending" | "fulfilled" | "rejected";

// ====================
// EVENT HANDLER TYPES
// ====================

/**
 * Generic change event handler
 */
export type ChangeHandler<T = HTMLElement> = (event: Event, element: T) => void;

/**
 * Click event handler
 */
export type ClickHandler = () => void;

/**
 * Focus event handlers
 */
export type FocusHandler = (event: FocusEvent) => void;
export type BlurHandler = (event: FocusEvent) => void;

/**
 * Keyboard event handler
 */
export type KeyHandler = (event: KeyboardEvent) => void;

/**
 * Touch event handlers
 */
export type TouchHandler = (event: TouchEvent) => void;

/**
 * Generic async event handler
 */
export type AsyncHandler<T = void> = () => Promise<T>;

// ====================
// RESPONSIVE DESIGN TYPES
// ====================

/**
 * Tailwind CSS breakpoint names
 */
export type Breakpoint = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

/**
 * Device type classifications
 */
export type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Screen orientation types
 */
export type Orientation = "portrait" | "landscape";

/**
 * Responsive value that can be different at different breakpoints
 */
export type ResponsiveValue<T> = T | {
  base?: T;
  "2xs"?: T;
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  "2xl"?: T;
};

/**
 * Responsive boolean properties
 */
export type ResponsiveBoolean = ResponsiveValue<boolean>;

/**
 * Responsive size properties
 */
export type ResponsiveSize = ResponsiveValue<ComponentSize>;

/**
 * Viewport dimensions
 */
export interface ViewportDimensions {
  width: number;
  height: number;
  aspectRatio: number;
}

/**
 * Device capabilities
 */
export interface DeviceCapabilities {
  isTouchDevice: boolean;
  supportsHover: boolean;
  prefersReducedMotion: boolean;
  devicePixelRatio: number;
  maxTouchPoints: number;
}

// ====================
// THEME & STYLING TYPES
// ====================

/**
 * Theme color schemes
 */
export type ColorScheme = "light" | "dark" | "auto";

/**
 * Theme variants
 */
export type ThemeVariant = "light" | "dark" | "dim" | "high-contrast";

/**
 * Color palette keys from Tailwind config
 */
export type ColorPalette = 
  | "primary" 
  | "secondary" 
  | "success" 
  | "warning" 
  | "error" 
  | "info" 
  | "gray"
  | "surface";

/**
 * Color shade options
 */
export type ColorShade = 
  | "50" | "100" | "200" | "300" | "400" 
  | "500" | "600" | "700" | "800" | "900" | "950";

/**
 * Complete color specification
 */
export type Color = `${ColorPalette}-${ColorShade}` | ColorPalette;

/**
 * Theme configuration
 */
export interface ThemeConfig {
  colorScheme: ColorScheme;
  variant: ThemeVariant;
  customColors?: Record<string, string>;
  fontFamily?: string;
  fontSize?: ComponentSize;
  reducedMotion?: boolean;
}

/**
 * Animation preferences
 */
export type AnimationPreference = "none" | "reduced" | "full";

/**
 * Direction for RTL/LTR support
 */
export type Direction = "ltr" | "rtl";

// ====================
// LAYOUT & POSITIONING TYPES
// ====================

/**
 * CSS position values
 */
export type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";

/**
 * CSS display values (common ones)
 */
export type Display = 
  | "block" 
  | "inline" 
  | "inline-block" 
  | "flex" 
  | "inline-flex" 
  | "grid" 
  | "inline-grid" 
  | "hidden";

/**
 * CSS overflow values
 */
export type Overflow = "visible" | "hidden" | "scroll" | "auto";

/**
 * Flex direction values
 */
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";

/**
 * Justify content values
 */
export type JustifyContent = 
  | "start" 
  | "end" 
  | "center" 
  | "between" 
  | "around" 
  | "evenly";

/**
 * Align items values
 */
export type AlignItems = "start" | "end" | "center" | "stretch" | "baseline";

/**
 * Text alignment
 */
export type TextAlign = "left" | "center" | "right" | "justify" | "start" | "end";

/**
 * Border radius sizes
 */
export type BorderRadius = "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

// ====================
// UTILITY TYPES
// ====================

/**
 * Makes all properties optional recursively
 */
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

/**
 * Makes all properties required recursively
 */
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Optional type helper
 */
export type Optional<T> = T | undefined;

/**
 * Maybe type (nullable or undefined)
 */
export type Maybe<T> = T | null | undefined;

/**
 * Pick properties that are of a specific type
 */
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

/**
 * Omit properties that are of a specific type
 */
export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

/**
 * Exact type that doesn't allow extra properties
 */
export type Exact<T, U extends T> = T & {
  [K in keyof U]: K extends keyof T ? U[K] : never;
};

/**
 * String literal type for CSS values
 */
export type CSSValue = string | number;

/**
 * Polymorphic component props
 */
export type PolymorphicProps<T extends keyof JSX.IntrinsicElements> = {
  as?: T;
} & JSX.IntrinsicElements[T];

// ====================
// FORM & INPUT TYPES
// ====================

/**
 * Form field types
 */
export type FieldType = 
  | "text" 
  | "email" 
  | "password" 
  | "number" 
  | "tel" 
  | "url" 
  | "search"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "file"
  | "date"
  | "time"
  | "datetime-local";

/**
 * Input validation rules
 */
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean | string;
}

/**
 * Form field configuration
 */
export interface FieldConfig {
  type: FieldType;
  label?: string;
  placeholder?: string;
  helperText?: string;
  validation?: ValidationRule;
  disabled?: boolean;
  readonly?: boolean;
  autoComplete?: string;
}

/**
 * Select/dropdown option interface
 */
export interface Option {
  value: string;
  label: string;
  disabled?: boolean;
  group?: string;
  icon?: string;
  description?: string;
}

/**
 * Option group for organized selects
 */
export interface OptionGroup {
  label: string;
  options: Option[];
  disabled?: boolean;
}

// ====================
// DATA FETCHING TYPES
// ====================

/**
 * API response wrapper
 */
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  errors?: string[];
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    [key: string]: any;
  };
}

/**
 * Pagination information
 */
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * Sort configuration
 */
export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

/**
 * Filter configuration
 */
export interface FilterConfig {
  field: string;
  operator: "eq" | "ne" | "gt" | "gte" | "lt" | "lte" | "contains" | "startsWith" | "endsWith";
  value: any;
}

/**
 * Search parameters
 */
export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sort?: SortConfig[];
  filters?: FilterConfig[];
}

// ====================
// ACCESSIBILITY TYPES
// ====================

/**
 * ARIA roles
 */
export type AriaRole = 
  | "button" 
  | "link" 
  | "tab" 
  | "tabpanel" 
  | "menu" 
  | "menuitem"
  | "dialog" 
  | "alertdialog" 
  | "alert" 
  | "status" 
  | "progressbar"
  | "slider" 
  | "spinbutton" 
  | "textbox" 
  | "combobox" 
  | "listbox"
  | "option" 
  | "checkbox" 
  | "radio" 
  | "switch";

/**
 * ARIA live region politeness
 */
export type AriaLive = "off" | "polite" | "assertive";

/**
 * ARIA autocomplete
 */
export type AriaAutoComplete = "none" | "inline" | "list" | "both";

/**
 * ARIA expanded state
 */
export type AriaExpanded = boolean | "false" | "true" | undefined;

/**
 * ARIA pressed state
 */
export type AriaPressed = boolean | "false" | "true" | "mixed" | undefined;

/**
 * ARIA checked state
 */
export type AriaChecked = boolean | "false" | "true" | "mixed" | undefined;

/**
 * Focus management configuration
 */
export interface FocusConfig {
  autoFocus?: boolean;
  restoreFocus?: boolean;
  trapFocus?: boolean;
  initialFocus?: string;
}

// ====================
// ANIMATION TYPES
// ====================

/**
 * Animation duration presets
 */
export type AnimationDuration = "none" | "fast" | "normal" | "slow" | "slower";

/**
 * Animation easing functions
 */
export type AnimationEasing = 
  | "linear" 
  | "ease" 
  | "ease-in" 
  | "ease-out" 
  | "ease-in-out"
  | "bounce" 
  | "elastic";

/**
 * Animation direction
 */
export type AnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";

/**
 * Animation fill mode
 */
export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

/**
 * Transition configuration
 */
export interface TransitionConfig {
  property?: string;
  duration?: AnimationDuration | number;
  easing?: AnimationEasing;
  delay?: number;
}

// ====================
// APPLICATION SPECIFIC TYPES
// ====================

/**
 * Configuration method selection
 */
export type ConfigMethod = "file" | "manual";

/**
 * VPN credentials structure
 */
export interface VPNCredentials {
  server: string;
  username: string;
  password: string;
  port?: number;
  protocol?: "tcp" | "udp";
  [key: string]: string | number | undefined;
}

/**
 * File upload configuration
 */
export interface FileUploadConfig {
  maxSize?: number;
  maxFiles?: number;
  acceptedTypes?: string[];
  multiple?: boolean;
  dragAndDrop?: boolean;
}

/**
 * Toast notification types
 */
export type ToastType = "success" | "error" | "warning" | "info";

/**
 * Modal sizes
 */
export type ModalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";

/**
 * Modal positions
 */
export type ModalPosition = "center" | "top" | "bottom";

// ====================
// COMPONENT PROP HELPERS
// ====================

/**
 * Base props that most components accept
 */
export interface BaseProps {
  className?: string;
  id?: string;
  "data-testid"?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  "aria-describedby"?: string;
}

/**
 * Props for components that can be disabled
 */
export interface DisableableProps {
  disabled?: boolean;
  "aria-disabled"?: boolean | "false" | "true";
}

/**
 * Props for components with loading states
 */
export interface LoadableProps {
  loading?: boolean;
  loadingText?: string;
}

/**
 * Props for components with size variants
 */
export interface SizeableProps {
  size?: ComponentSize;
}

/**
 * Props for components with color variants
 */
export interface ColorableProps {
  variant?: ComponentVariant;
  color?: Color;
}

/**
 * Props for clickable components
 */
export interface ClickableProps {
  onClick?: ClickHandler;
  onDoubleClick?: ClickHandler;
}

/**
 * Props for focusable components
 */
export interface FocusableProps {
  onFocus?: FocusHandler;
  onBlur?: BlurHandler;
  tabIndex?: number;
  autoFocus?: boolean;
}

/**
 * Complete interactive component props
 */
export interface InteractiveProps extends 
  BaseProps, 
  DisableableProps, 
  ClickableProps, 
  FocusableProps {}

// ====================
// CONTEXT TYPES
// ====================

/**
 * Theme context value
 */
export interface ThemeContextValue {
  theme: ThemeConfig;
  setTheme: (theme: Partial<ThemeConfig>) => void;
  toggleColorScheme: () => void;
}

/**
 * Responsive context value
 */
export interface ResponsiveContextValue {
  breakpoint: Breakpoint;
  deviceType: DeviceType;
  orientation: Orientation;
  viewport: ViewportDimensions;
  capabilities: DeviceCapabilities;
}

/**
 * Toast context value
 */
export interface ToastContextValue {
  showToast: (message: string, type?: ToastType, options?: any) => void;
  hideToast: (id: string) => void;
  clearAllToasts: () => void;
}
