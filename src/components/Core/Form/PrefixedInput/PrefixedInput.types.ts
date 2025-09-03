import type { QRL } from "@builder.io/qwik";
import type { InputProps } from "../../Input/Input";

// Visual variants for modern design
export type PrefixedInputVariant = 
  | 'default' 
  | 'elevated' 
  | 'glass' 
  | 'gradient' 
  | 'bordered'
  | 'minimal';

// Animation types
export type AnimationType = 'subtle' | 'smooth' | 'energetic';

// Prefix styling variants
export type PrefixVariant = 'solid' | 'gradient' | 'outline' | 'ghost';

// Size variants
export type PrefixedInputSize = 'sm' | 'md' | 'lg';

// Color themes
export type PrefixedInputColor = 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info';

// Enhanced prefix-specific props
export interface PrefixedInputProps extends Omit<InputProps, 'value' | 'onChange$' | 'size' | 'type'> {
  // Core prefix functionality
  prefix: string;
  value?: string;
  onChange$?: QRL<(event: Event, value: string) => void>;
  
  // Modern visual variants
  variant?: PrefixedInputVariant;
  prefixVariant?: PrefixVariant;
  color?: PrefixedInputColor;
  size?: PrefixedInputSize;
  
  // Animation options
  animate?: boolean;
  animationType?: AnimationType;
  
  // Interactive features
  showTooltip?: boolean;
  tooltipText?: string;
  copyable?: boolean;
  prefixIcon?: string; // Icon name/component
  
  // Accessibility enhancements
  'aria-describedby'?: string;
  'data-testid'?: string;
  
  // Styling hooks
  prefixClass?: string;
  containerClass?: string;
}

// Interface Name Input specific props
export interface InterfaceNameInputProps extends Omit<PrefixedInputProps, 'prefix' | 'type'> {
  type: 'wireguard' | 'openvpn';
}

// Port Input props
export interface PortInputProps extends Omit<PrefixedInputProps, 'prefix'> {
  portType?: 'tcp' | 'udp' | 'both';
}

// Service Input props  
export interface ServiceInputProps extends Omit<PrefixedInputProps, 'prefix'> {
  serviceType?: 'system' | 'user' | 'network';
}

// ID Input props
export interface IdInputProps extends Omit<PrefixedInputProps, 'prefix'> {
  idType?: 'tunnel' | 'interface' | 'rule' | 'connection';
}

// Style configuration interfaces
export interface VariantConfig {
  container: string;
  prefix: string;
  input: string;
  focus: string;
  hover: string;
}

export interface AnimationConfig {
  transition: string;
  focus: string;
  hover: string;
  loading: string;
}