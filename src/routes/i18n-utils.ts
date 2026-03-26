import "@angular/localize/init";
import {
  clearTranslations,
  loadTranslations,
  ɵparseTranslation,
  ɵtranslate,
} from "@angular/localize";
import { getLocale, useTask$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { RenderOptions } from "@builder.io/qwik/server";

// You must declare all your locales here
import EN from "../locales/message.en.json";
import FA from "../locales/message.fa.json";

// Make sure it's obvious when the default locale was selected
const DEFAULT_LOCALE = "en";
const TRANSLATION_BUNDLES = [EN, FA] as const;
const SUPPORTED_LOCALES = new Set(
  TRANSLATION_BUNDLES.map(({ locale }) => locale),
);
let getServerRenderLocale: (() => string | undefined) | undefined;

/**
 * This file is left for the developer to customize to get the behavior they want for localization.
 */

/// Declare location where extra types will be stored.
const $localizeFn = $localize as any as {
  TRANSLATIONS: Record<string, any>;
  TRANSLATION_BY_LOCALE: Map<string, Record<string, any>>;
  translate?: (
    messageParts: TemplateStringsArray,
    substitutions: readonly any[],
  ) => [TemplateStringsArray, readonly any[]];
};

const buildParsedTranslations = (translations: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(translations).map(([messageId, message]) => [
      messageId,
      ɵparseTranslation(message),
    ]),
  );
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
  if (import.meta.env.SSR) {
    const serverLocale = getServerRenderLocale?.();
    if (serverLocale) {
      return extractLang(serverLocale);
    }
  }

  return getLocale(getDocumentLocale() ?? DEFAULT_LOCALE);
}

function getTranslationsForLocale(locale: string) {
  return (
    $localizeFn.TRANSLATION_BY_LOCALE.get(locale) ??
    $localizeFn.TRANSLATION_BY_LOCALE.get(DEFAULT_LOCALE) ??
    {}
  );
}

function getRawTranslationsForLocale(locale: string) {
  return (TRANSLATION_BUNDLES.find((bundle) => bundle.locale === locale) ?? EN)
    .translations;
}

/**
 * This solution uses the `@angular/localize` package for translations, however out of the box
 * `$localize` works with a single translation only. This code adds support for multiple locales
 * concurrently. It does this by intercepting the `TRANSLATIONS` property read and returning
 * appropriate translation based on the current locale which is store in the `usEnvDate('local')`.
 */

if (import.meta.env.SSR) {
  if (!$localizeFn.translate) {
    $localizeFn.translate = (messageParts, substitutions) => {
      try {
        return ɵtranslate(
          $localizeFn.TRANSLATIONS,
          messageParts,
          substitutions,
        );
      } catch (error) {
        const translationError = error as Error;
        console.warn(translationError.message);
        return [messageParts, substitutions];
      }
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!$localizeFn.TRANSLATION_BY_LOCALE) {
    $localizeFn.TRANSLATION_BY_LOCALE = new Map(
      TRANSLATION_BUNDLES.map(({ locale, translations }) => [
        locale,
        buildParsedTranslations(translations),
      ]),
    );
    Object.defineProperty($localize, "TRANSLATIONS", {
      get: function () {
        return getTranslationsForLocale(getActiveLocale());
      },
    });
  }
}

function initBrowserTranslations(locale: string) {
  const resolvedLocale = extractLang(locale);

  if (typeof document !== "undefined") {
    document.documentElement.lang = resolvedLocale;
    document.documentElement.setAttribute("q:locale", resolvedLocale);
  }

  clearTranslations();
  loadTranslations(getRawTranslationsForLocale(resolvedLocale));
}

export function initializeBrowserI18n(locale?: string) {
  initBrowserTranslations(locale || getDocumentLocale() || DEFAULT_LOCALE);
}

export function setServerRenderLocaleGetter(
  getter: (() => string | undefined) | undefined,
) {
  getServerRenderLocale = getter;
}

/**
 * Function used to examine the request and determine the locale to use.
 *
 * This function is meant to be used with `RenderOptions.locale` property
 *
 * @returns The locale to use which will be stored in the `useEnvData('locale')`.
 */
export function extractLang(locale: string): string {
  return locale && SUPPORTED_LOCALES.has(locale) ? locale : DEFAULT_LOCALE;
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
  const location = useLocation();

  // During development only, keep the browser translation catalog aligned with the
  // active route locale. Locale switches use a full page reload, but this also covers
  // the initial browser render after the dev server has reloaded modules.
  useTask$(({ track }) => {
    if (!import.meta.env.DEV) {
      return;
    }

    if (typeof document === "undefined") {
      return;
    }

    const routeLocale = track(() => location.params.locale);
    initBrowserTranslations(
      routeLocale || getDocumentLocale() || DEFAULT_LOCALE,
    );
  });
}

if (!import.meta.env.SSR && typeof document !== "undefined") {
  initializeBrowserI18n();
}
