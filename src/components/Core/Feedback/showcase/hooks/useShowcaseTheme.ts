import { $ } from "@builder.io/qwik";
import type { ShowcaseTheme } from "../types";
import { DEFAULT_THEME, DARK_THEME } from "../constants";

export const useShowcaseTheme = (themeStore: ShowcaseTheme) => {
  const updateTheme = $((updates: Partial<ShowcaseTheme>) => {
    Object.assign(themeStore, updates);
  });

  const toggleTheme = $(() => {
    const newTheme = themeStore.mode === "light" ? DARK_THEME : DEFAULT_THEME;
    Object.assign(themeStore, newTheme);
  });

  const resetTheme = $(() => {
    Object.assign(themeStore, DEFAULT_THEME);
  });

  const setSystemTheme = $(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const systemTheme = prefersDark ? DARK_THEME : DEFAULT_THEME;
    Object.assign(themeStore, { ...systemTheme, mode: "system" });
  });

  const applyCustomColors = $((colors: {
    primary?: string;
    accent?: string;
    background?: string;
    surface?: string;
    text?: string;
    border?: string;
  }) => {
    Object.assign(themeStore, {
      ...colors,
      ...(colors.primary && { primaryColor: colors.primary }),
      ...(colors.accent && { accentColor: colors.accent }),
      ...(colors.background && { backgroundColor: colors.background }),
      ...(colors.surface && { surfaceColor: colors.surface }),
      ...(colors.text && { textColor: colors.text }),
      ...(colors.border && { borderColor: colors.border }),
    });
  });

  return {
    theme: themeStore,
    updateTheme,
    toggleTheme,
    resetTheme,
    setSystemTheme,
    applyCustomColors,
  };
};