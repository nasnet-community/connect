import { useSignal, useOnWindow, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { buildLocalePath, getPathWithoutLocale } from "../../../utils/locale";

export const useHeader = () => {
  const location = useLocation();
  const isMenuOpen = useSignal(false);
  const isDarkMode = useSignal(false);
  const detectedLocale = location.params.locale || "en";
  console.log('[Locale Detection]', {
    urlPath: location.url.pathname,
    params: location.params,
    detectedLocale,
  });
  // Use detected locale directly, not a signal
  const currentLocale = detectedLocale;
  const locales = ["en", "it", "ru", "fa", "zh", "ar", "tr"];

  useOnWindow(
    "load",
    $(() => {
      isDarkMode.value = document.documentElement.classList.contains("dark");
    }),
  );

  const toggleTheme$ = $(() => {
    isDarkMode.value = !isDarkMode.value;
    document.documentElement.classList.toggle("dark");
  });

  const toggleMenu$ = $(() => {
    isMenuOpen.value = !isMenuOpen.value;
  });

  const handleLocaleChange$ = $((locale: string) => {
    const pathWithoutLocale = getPathWithoutLocale(window.location.pathname);
    console.log('[Language Change Debug]', {
      currentPath: window.location.pathname,
      pathWithoutLocale,
      newLocale: locale,
      currentLocale: currentLocale
    });

    const newPath = buildLocalePath(locale, pathWithoutLocale);
    console.log('[Language Change Debug] Navigating to:', newPath + window.location.search);

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
