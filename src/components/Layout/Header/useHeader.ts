import { useSignal, useOnWindow, $, getLocale } from "@builder.io/qwik";
import { buildLocalePath, getPathWithoutLocale } from "../../../utils/locale";

export const useHeader = () => {
  const isMenuOpen = useSignal(false);
  const isDarkMode = useSignal(false);
  const currentLocale = useSignal(getLocale());
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

    const newPath = buildLocalePath(locale) + pathWithoutLocale;

    currentLocale.value = locale;

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
