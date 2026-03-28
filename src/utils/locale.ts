import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  normalizeLocale,
  isSupportedLocale,
} from "~/i18n/config";

const stripLeadingLocaleSegment = (path: string): string => {
  const pathSegments = path.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  if (!firstSegment || !isSupportedLocale(firstSegment)) {
    return path;
  }

  const remainingPath = pathSegments.slice(1).join("/");
  return remainingPath ? `/${remainingPath}` : "/";
};

export { DEFAULT_LOCALE, SUPPORTED_LOCALES };

export const removeLocaleFromPath = (path: string): string => {
  return stripLeadingLocaleSegment(path);
};

export const getLocaleFromPath = (path: string): string => {
  const pathSegments = path.split("/").filter(Boolean);
  return normalizeLocale(pathSegments[0]);
};

export const getPathWithoutLocale = (path: string): string => {
  return stripLeadingLocaleSegment(path);
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
