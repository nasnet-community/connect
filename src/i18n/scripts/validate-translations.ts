import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  DEFAULT_LOCALE,
  LOCALE_METADATA,
  SUPPORTED_LOCALES,
  type AppLocale,
} from "../config";

interface LocaleCatalog {
  locale: string;
  translations: Record<string, string>;
}

interface LocaleReport {
  locale: AppLocale;
  totalSourceKeys: number;
  translatedKeys: number;
  missingKeys: number;
  extraKeys: number;
  emptyKeys: number;
  identicalToSource: number;
  coveragePercent: number;
}

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.resolve(scriptDir, "../../locales");
const args = new Set(process.argv.slice(2));
const outputJson = args.has("--json");
const outputMarkdown = args.has("--markdown");

const readLocaleCatalog = async (locale: AppLocale): Promise<LocaleCatalog> => {
  const filePath = path.join(localesDir, `message.${locale}.json`);
  const fileContents = await readFile(filePath, "utf8");
  return JSON.parse(fileContents) as LocaleCatalog;
};

const formatPercent = (value: number) => `${value.toFixed(1)}%`;

const createReport = (
  locale: AppLocale,
  sourceTranslations: Record<string, string>,
  targetTranslations: Record<string, string>,
): LocaleReport => {
  const sourceKeys = Object.keys(sourceTranslations);
  const sourceKeySet = new Set(sourceKeys);
  const targetKeys = new Set(Object.keys(targetTranslations));

  let missingKeys = 0;
  let emptyKeys = 0;
  let identicalToSource = 0;
  let translatedKeys = 0;

  for (const key of sourceKeys) {
    if (!targetKeys.has(key)) {
      missingKeys += 1;
      continue;
    }

    const targetValue = targetTranslations[key]?.trim() ?? "";
    if (!targetValue) {
      emptyKeys += 1;
      continue;
    }

    if (locale !== DEFAULT_LOCALE && targetValue === sourceTranslations[key]) {
      identicalToSource += 1;
    }

    translatedKeys += 1;
  }

  const extraKeys = Object.keys(targetTranslations).filter(
    (key) => !sourceKeySet.has(key),
  ).length;

  return {
    locale,
    totalSourceKeys: sourceKeys.length,
    translatedKeys,
    missingKeys,
    extraKeys,
    emptyKeys,
    identicalToSource,
    coveragePercent:
      sourceKeys.length === 0
        ? 100
        : (translatedKeys / sourceKeys.length) * 100,
  };
};

const formatTextReport = (reports: LocaleReport[]) => {
  return reports
    .map((report) => {
      const localeInfo = LOCALE_METADATA[report.locale];
      return [
        `${localeInfo.code} (${localeInfo.nativeName})`,
        `  coverage: ${formatPercent(report.coveragePercent)}`,
        `  translated: ${report.translatedKeys}/${report.totalSourceKeys}`,
        `  missing: ${report.missingKeys}`,
        `  empty: ${report.emptyKeys}`,
        `  identical-to-source: ${report.identicalToSource}`,
        `  extra: ${report.extraKeys}`,
      ].join("\n");
    })
    .join("\n\n");
};

const formatMarkdownReport = (reports: LocaleReport[]) => {
  const lines = [
    "| Locale | Coverage | Translated | Missing | Empty | Identical to source | Extra |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: |",
  ];

  for (const report of reports) {
    const localeInfo = LOCALE_METADATA[report.locale];
    lines.push(
      `| ${localeInfo.nativeName} (${localeInfo.code}) | ${formatPercent(report.coveragePercent)} | ${report.translatedKeys}/${report.totalSourceKeys} | ${report.missingKeys} | ${report.emptyKeys} | ${report.identicalToSource} | ${report.extraKeys} |`,
    );
  }

  return lines.join("\n");
};

const main = async () => {
  const catalogs = await Promise.all(
    SUPPORTED_LOCALES.map(async (locale) => [
      locale,
      await readLocaleCatalog(locale),
    ]),
  );

  let hasErrors = false;
  const localeCatalogs = Object.fromEntries(catalogs) as Record<
    AppLocale,
    LocaleCatalog
  >;

  for (const locale of SUPPORTED_LOCALES) {
    if (localeCatalogs[locale].locale !== locale) {
      console.error(
        `Locale file mismatch: expected "${locale}" but found "${localeCatalogs[locale].locale}" in message.${locale}.json`,
      );
      hasErrors = true;
    }
  }

  const sourceTranslations = localeCatalogs[DEFAULT_LOCALE].translations;
  const reports = SUPPORTED_LOCALES.map((locale) =>
    createReport(
      locale,
      sourceTranslations,
      localeCatalogs[locale].translations,
    ),
  );

  for (const report of reports) {
    if (
      report.missingKeys > 0 ||
      report.emptyKeys > 0 ||
      report.extraKeys > 0
    ) {
      hasErrors = true;
    }
  }

  if (outputJson) {
    console.log(JSON.stringify(reports, null, 2));
  } else if (outputMarkdown) {
    console.log(formatMarkdownReport(reports));
  } else {
    console.log(formatTextReport(reports));
  }

  if (hasErrors) {
    process.exitCode = 1;
  }
};

void main();
