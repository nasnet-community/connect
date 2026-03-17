import "@angular/localize/init";
import { clearTranslations, loadTranslations } from "@angular/localize";
import { $, getLocale, useOnDocument, withLocale } from "@builder.io/qwik";
import type { RenderOptions } from "@builder.io/qwik/server";

// You must declare all your locales here
import EN from "../locales/message.en.json";
import FA from "../locales/message.fa.json";

// Make sure it's obvious when the default locale was selected
const DEFAULT_LOCALE = "en";
const TRANSLATION_BUNDLES = [EN, FA] as const;

/**
 * This file is left for the developer to customize to get the behavior they want for localization.
 */

/// Declare location where extra types will be stored.
const $localizeFn = $localize as any as {
  TRANSLATIONS: Record<string, any>;
  TRANSLATION_BY_LOCALE: Map<string, Record<string, any>>;
};

function getDocumentLocale(): string | undefined {
  if (typeof document === "undefined") {
    return undefined;
  }

  return (
    document.documentElement.getAttribute("q:locale") ||
    document.documentElement.lang ||
    undefined
  );
}

function getActiveLocale(): string {
  return getLocale(getDocumentLocale() ?? DEFAULT_LOCALE);
}

function getTranslationsForLocale(locale: string) {
  return (
    TRANSLATION_BUNDLES.find((bundle) => bundle.locale === locale) ?? EN
  ).translations;
}

/**
 * This solution uses the `@angular/localize` package for translations, however out of the box
 * `$localize` works with a single translation only. This code adds support for multiple locales
 * concurrently. It does this by intercepting the `TRANSLATIONS` property read and returning
 * appropriate translation based on the current locale which is store in the `usEnvDate('local')`.
 */

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!$localizeFn.TRANSLATION_BY_LOCALE) {
  $localizeFn.TRANSLATION_BY_LOCALE = new Map([["", {}]]);
  Object.defineProperty($localize, "TRANSLATIONS", {
    get: function () {
      const locale = getActiveLocale();
      let translations = $localizeFn.TRANSLATION_BY_LOCALE.get(locale);
      if (!translations) {
        $localizeFn.TRANSLATION_BY_LOCALE.set(locale, (translations = {}));
      }
      return translations;
    },
    set: function (translations: Record<string, any>) {
      $localizeFn.TRANSLATION_BY_LOCALE.set(getActiveLocale(), translations);
    },
  });
}

/**
 * Function used to load all translations variants.
 */
export function initTranslations() {
  TRANSLATION_BUNDLES.forEach(({ translations, locale }) => {
    withLocale(locale, () => loadTranslations(translations));
  });
}

function initClientTranslations(locale: string) {
  const resolvedLocale = extractLang(locale);

  withLocale(resolvedLocale, () => {
    clearTranslations();
    loadTranslations(getTranslationsForLocale(resolvedLocale));
  });
}

/**
 * Function used to examine the request and determine the locale to use.
 *
 * This function is meant to be used with `RenderOptions.locale` property
 *
 * @returns The locale to use which will be stored in the `useEnvData('locale')`.
 */
export function extractLang(locale: string): string {
  return locale && TRANSLATION_BUNDLES.some((bundle) => bundle.locale === locale)
    ? locale
    : DEFAULT_LOCALE;
}

/**
 * Function used to determine the base URL to use for loading the chunks in the browser.
 *
 * The function returns `/build` in dev mode or `/build/<locale>` in prod mode.
 *
 * This function is meant to be used with `RenderOptions.base` property
 *
 * @returns The base URL to use for loading the chunks in the browser.
 */
export function extractBase({ serverData }: RenderOptions): string {
  if (import.meta.env.DEV) {
    return `${import.meta.env.BASE_URL}build`;
  } else {
    return `${import.meta.env.BASE_URL}build/` + serverData!.locale;
  }
}

export function useI18n() {
  if (import.meta.env.DEV) {
    // During development only, load the current locale into the browser once.
    // Angular localize is not designed for switching between multiple runtime catalogs
    // within the same session after messages have been evaluated.
    // eslint-disable-next-line
    useOnDocument("qinit", $(() => {
      initClientTranslations(getDocumentLocale() ?? DEFAULT_LOCALE);
    }));
  }
}

// We always need the translations on the server
if (import.meta.env.SSR) {
  initTranslations();
}
