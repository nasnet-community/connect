export type LocaleDirection = "ltr" | "rtl";

export interface LocaleMetadata {
  code: string;
  name: string;
  nativeName: string;
  dir: LocaleDirection;
  flag?: string;
  crowdinLanguageId?: string;
}

export const LOCALE_METADATA = {
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    dir: "ltr",
    flag: "🇬🇧",
    crowdinLanguageId: "en",
  },
  fa: {
    code: "fa",
    name: "Persian",
    nativeName: "فارسی",
    dir: "rtl",
    flag: "🇮🇷",
    crowdinLanguageId: "fa",
  },
} as const satisfies Record<string, LocaleMetadata>;

export type AppLocale = keyof typeof LOCALE_METADATA;

export const DEFAULT_LOCALE: AppLocale = "en";
export const SUPPORTED_LOCALES = Object.freeze(
  Object.keys(LOCALE_METADATA) as AppLocale[],
);
export const SUPPORTED_LOCALE_SET = new Set<string>(SUPPORTED_LOCALES);
export const RTL_LOCALES = Object.freeze(
  SUPPORTED_LOCALES.filter((locale) => LOCALE_METADATA[locale].dir === "rtl"),
);

export const isSupportedLocale = (locale: string): locale is AppLocale => {
  return SUPPORTED_LOCALE_SET.has(locale);
};

export const normalizeLocale = (
  locale: string | null | undefined,
): AppLocale => {
  return locale && isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
};

export const resolveRequestedLocale = (
  locale: string | null | undefined,
): AppLocale => {
  if (!locale) {
    return DEFAULT_LOCALE;
  }

  const candidates = locale
    .split(",")
    .map((entry) => entry.split(";")[0]?.trim().toLowerCase())
    .filter((entry): entry is string => Boolean(entry));

  for (const candidate of candidates) {
    if (isSupportedLocale(candidate)) {
      return candidate;
    }

    const baseLanguage = candidate.split(/[-_]/)[0];
    if (isSupportedLocale(baseLanguage)) {
      return baseLanguage;
    }
  }

  return DEFAULT_LOCALE;
};

export const getLocaleMetadata = (locale: string): LocaleMetadata => {
  return LOCALE_METADATA[normalizeLocale(locale)];
};
