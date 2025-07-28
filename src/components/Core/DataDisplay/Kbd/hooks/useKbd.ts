import { useComputed$ } from "@builder.io/qwik";
import type { UseKbdOptions, UseKbdReturn } from "../Kbd.types";

// Key mappings for different operating systems
const keyMappings: Record<string, Record<string, string>> = {
  mac: {
    ctrl: "⌃",
    control: "⌃",
    cmd: "⌘",
    command: "⌘",
    opt: "⌥",
    option: "⌥",
    alt: "⌥",
    shift: "⇧",
    enter: "⏎",
    return: "⏎",
    delete: "⌫",
    backspace: "⌫",
    tab: "⇥",
    caps: "⇪",
    capslock: "⇪",
    esc: "⎋",
    escape: "⎋",
    space: "␣",
    up: "↑",
    down: "↓",
    left: "←",
    right: "→",
  },
  windows: {
    cmd: "Ctrl",
    command: "Ctrl",
    opt: "Alt",
    option: "Alt",
    meta: "Win",
    delete: "Del",
    return: "Enter",
  },
  linux: {
    cmd: "Ctrl",
    command: "Ctrl",
    opt: "Alt",
    option: "Alt",
    meta: "Super",
    delete: "Del",
    return: "Enter",
  },
};

export const useKbd = (
  key: string,
  options: UseKbdOptions = {},
): UseKbdReturn => {
  const detectedOs = useComputed$(() => {
    if (options.forceOs) {
      return options.forceOs;
    }

    // Simple OS detection (in real app, you might want to use navigator.userAgent)
    if (typeof window !== "undefined") {
      const platform = window.navigator.platform.toLowerCase() || "";
      if (platform.includes("mac")) return "mac";
      if (platform.includes("win")) return "windows";
      return "linux";
    }

    return "windows"; // Default fallback
  });

  const formattedKey = useComputed$(() => {
    if (!options.osSpecific) {
      // Capitalize first letter for consistency
      return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
    }

    const os = detectedOs.value;
    const lowerKey = key.toLowerCase();
    const mapping = keyMappings[os][lowerKey];

    if (mapping) {
      return mapping;
    }

    // Default formatting: capitalize first letter
    return key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
  });

  return {
    formattedKey: formattedKey.value,
    detectedOs: detectedOs.value,
  };
};
