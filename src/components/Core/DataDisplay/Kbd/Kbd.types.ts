import type { QwikIntrinsicElements } from "@builder.io/qwik";

export type KbdVariant = "raised" | "flat" | "outlined";
export type KbdSize = "sm" | "md" | "lg";

export interface KbdProps extends Omit<QwikIntrinsicElements["kbd"], "class"> {
  /**
   * Visual style of the keyboard key
   * @default 'raised'
   */
  variant?: KbdVariant;

  /**
   * Size of the keyboard key
   * @default 'md'
   */
  size?: KbdSize;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Whether to show OS-specific key names
   * @default false
   */
  osSpecific?: boolean;

  /**
   * Force a specific OS style (overrides detection)
   */
  forceOs?: "mac" | "windows" | "linux";
}

export interface KbdGroupProps {
  /**
   * Array of keys to display as a combination
   */
  keys: string[];

  /**
   * Separator between keys
   * @default '+'
   */
  separator?: string;

  /**
   * Visual style for all keys in the group
   * @default 'raised'
   */
  variant?: KbdVariant;

  /**
   * Size for all keys in the group
   * @default 'md'
   */
  size?: KbdSize;

  /**
   * Additional CSS classes
   */
  class?: string;

  /**
   * Whether to show OS-specific key names
   * @default false
   */
  osSpecific?: boolean;

  /**
   * Force a specific OS style (overrides detection)
   */
  forceOs?: "mac" | "windows" | "linux";
}

export interface UseKbdOptions {
  osSpecific?: boolean;
  forceOs?: "mac" | "windows" | "linux";
}

export interface UseKbdReturn {
  formattedKey: string;
  detectedOs: "mac" | "windows" | "linux";
}

export interface UseKbdGroupOptions {
  separator?: string;
}

export interface UseKbdGroupReturn {
  formattedSeparator: string;
  groupClass: string;
}
