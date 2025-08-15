// export const getLocaleFromPath = (pathname: string): string => {
//     const locales = ['en', 'it', 'ru', 'fa', 'zh', 'ar', 'tr'];
//     const urlSegments = pathname.split('/').filter(Boolean);
//     const firstSegment = urlSegments[0];
//     return locales.includes(firstSegment) ? firstSegment : 'en';
//   };

//   export const DEFAULT_LOCALE = 'en';
// export const SUPPORTED_LOCALES = ['en', 'it', 'ru', 'fa', 'zh', 'ar', 'tr'];

// export const getLocaleFromPath = (path: string): string => {
//   const firstSegment = path.split('/')[1];
//   return SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : DEFAULT_LOCALE;
// };

export const removeLocaleFromPath = (path: string): string => {
  return SUPPORTED_LOCALES.some((l) => path.startsWith(`/${l}/`))
    ? path.substring(3)
    : path;
};

// export const buildLocalePath = (locale: string, path: string): string => {
//   const cleanPath = removeLocaleFromPath(path);
//   return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
// };

export const DEFAULT_LOCALE = "en";
export const SUPPORTED_LOCALES = ["en", "it", "ru", "fa", "zh", "ar", "tr"];

export const getLocaleFromPath = (path: string): string => {
  const pathSegments = path.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  return SUPPORTED_LOCALES.includes(firstSegment)
    ? firstSegment
    : DEFAULT_LOCALE;
};

// export const buildLocalePath = (locale: string, path: string): string => {
//   // Remove existing locale if present
//   const pathWithoutLocale = SUPPORTED_LOCALES.some(l => path.startsWith(`/${l}/`))
//     ? path.substring(3)
//     : path;

//   // Ensure path starts with slash
//   const cleanPath = pathWithoutLocale === '' ? '/' : pathWithoutLocale;
//   return `/${locale}${cleanPath === '/' ? '' : cleanPath}`;
// };

export const getPathWithoutLocale = (path: string): string => {
  return SUPPORTED_LOCALES.some((l) => path.startsWith(`/${l}/`))
    ? path.substring(3)
    : path;
};

// export const buildLocalePath = (locale: string, path: string): string => {
//   // Remove existing locale if present
//   const pathWithoutLocale = SUPPORTED_LOCALES.some(l => path.startsWith(`/${l}/`))
//     ? path.substring(3)
//     : path;

//   // Build new path with locale
//   return `/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
// };

export const buildLocalePath = (locale: string, pathWithoutLocale: string = ''): string => {
  // Ensure path doesn't start with slash since we'll add it
  const cleanPath = pathWithoutLocale.startsWith('/') ? pathWithoutLocale.slice(1) : pathWithoutLocale;
  // If path is empty or just '/', return just the locale
  return cleanPath === '' || cleanPath === '/' ? `/${locale}` : `/${locale}/${cleanPath}`;
};
