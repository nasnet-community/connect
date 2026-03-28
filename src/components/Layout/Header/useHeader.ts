import { useSignal, useOnWindow, useTask$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { buildLocalePath, getPathWithoutLocale } from "../../../utils/locale";
import { SUPPORTED_LOCALES, normalizeLocale } from "~/i18n/config";

const THEME_STORAGE_KEY = "theme";
const resolveTheme = () => {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};
const applyTheme = (theme: "light" | "dark") => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
  localStorage.setItem(THEME_STORAGE_KEY, theme);
};

export const useHeader = () => {
  const location = useLocation();
  const isMenuOpen = useSignal(false);
  const isDarkMode = useSignal(false);
  const detectedLocale = normalizeLocale(location.params.locale);
  console.log("[Locale Detection]", {
    urlPath: location.url.pathname,
    params: location.params,
    detectedLocale,
  });
  // Use detected locale directly, not a signal
  const currentLocale = detectedLocale;
  const locales = [...SUPPORTED_LOCALES];

  useTask$(() => {
    if (typeof document === "undefined") {
      return;
    }

    isDarkMode.value = resolveTheme() === "dark";
  });

  useOnWindow(
    "load",
    $(() => {
      isDarkMode.value = resolveTheme() === "dark";
    }),
  );

  useOnWindow(
    "storage",
    $(() => {
      isDarkMode.value = resolveTheme() === "dark";
    }),
  );

  const toggleTheme$ = $(() => {
    const nextTheme = isDarkMode.value ? "light" : "dark";
    applyTheme(nextTheme);
    isDarkMode.value = nextTheme === "dark";
  });

  const toggleMenu$ = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  const handleLocaleChange$ = $((locale: string) => {
    const pathWithoutLocale = getPathWithoutLocale(window.location.pathname);
    console.log("[Language Change Debug]", {
      currentPath: window.location.pathname,
      pathWithoutLocale,
      newLocale: locale,
      currentLocale: currentLocale,
    });

    const newPath = buildLocalePath(locale, pathWithoutLocale);
    console.log(
      "[Language Change Debug] Navigating to:",
      newPath + window.location.search,
    );

    // Navigate to the new locale path - the page will reload with the correct locale
    window.location.href = newPath + window.location.search;
  });

  return {
    isMenuOpen,
    isDarkMode,
    currentLocale,
    locales,
    toggleTheme$,
    handleLocaleChange$,
    toggleMenu$,
  };
};
