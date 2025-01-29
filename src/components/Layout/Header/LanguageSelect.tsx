import { component$, type QRL } from "@builder.io/qwik";

interface Language {
  code: string;
  name: string;
  dir: "ltr" | "rtl";
}

interface LanguageSelectProps {
  currentLocale: string;
  locales: string[];
  onLocaleChange$: QRL<(locale: string) => void>;
  location?: 'header' | 'mobile'; 
}

const LANGUAGES: Record<string, Language> = {
  en: { code: "en", name: "English", dir: "ltr" },
  fa: { code: "fa", name: "فارسی", dir: "rtl" },
  ar: { code: "ar", name: "العربية", dir: "rtl" },
  zh: { code: "zh", name: "中文", dir: "ltr" },
  ru: { code: "ru", name: "Русский", dir: "ltr" },
  tr: { code: "tr", name: "Türkçe", dir: "ltr" },
  it: { code: "it", name: "Italiano", dir: "ltr" },
};

export const LanguageSelect = component$((props: LanguageSelectProps) => {
  const selectId = `language-select-${props.location || 'default'}`;

  return (
    <div class="relative">
      <label 
        for={selectId}
        class="sr-only"
      >
        {$localize`Select language`}
      </label>
      <select
        id="language-select"
        value={props.currentLocale}
        onChange$={(e) =>
          props.onLocaleChange$((e.target as HTMLSelectElement).value)
        }
        class="focus:ring-primary-500 cursor-pointer appearance-none 
               rounded-lg bg-surface-secondary px-4 py-2 
               text-sm tracking-wider 
               text-text-secondary transition-colors duration-300 hover:bg-primary-100 focus:outline-none focus:ring-2
               dark:bg-surface-dark-secondary dark:text-text-dark-secondary dark:hover:bg-primary-900/20"
        dir={LANGUAGES[props.currentLocale]?.dir || "ltr"}
        aria-label={$localize`Select language`}
      >
        {props.locales.map((locale) => (
          <option
            key={locale}
            value={locale}
            class={`bg-white py-2 dark:bg-surface-dark ${props.currentLocale === locale ? "font-bold" : ""}`}
            dir={LANGUAGES[locale]?.dir || "ltr"}
            selected={props.currentLocale === locale}
          >
            {LANGUAGES[locale]?.name || locale.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
});
