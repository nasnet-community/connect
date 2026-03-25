export const removeLocaleFromPath = (path: string): string => {
  return SUPPORTED_LOCALES.some((l) => path.startsWith(`/${l}/`))
    ? path.substring(3)
    : path;
};

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "fa"];

export const getLocaleFromPath = (path: string): string => {
  const pathSegments = path.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  return SUPPORTED_LOCALES.includes(firstSegment)
    ? firstSegment
    : DEFAULT_LOCALE;
};

export const getPathWithoutLocale = (path: string): string => {
  return SUPPORTED_LOCALES.some((l) => path.startsWith(`/${l}/`))
    ? path.substring(3)
    : path;
};

export const buildLocalePath = (
  locale: string,
  pathWithoutLocale: string = "",
): string => {
  // Ensure path doesn't start with slash since we'll add it
  const cleanPath = pathWithoutLocale.startsWith("/")
    ? pathWithoutLocale.slice(1)
    : pathWithoutLocale;
  // If path is empty or just '/', return just the locale
  return cleanPath === "" || cleanPath === "/"
    ? `/${locale}`
    : `/${locale}/${cleanPath}`;
};
