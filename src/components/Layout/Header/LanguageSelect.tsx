import { component$, type QRL, useSignal, useTask$ } from "@builder.io/qwik";

interface Language {
  code: string;
  name: string;
  dir: "ltr" | "rtl";
  flag?: string;
}

interface LanguageSelectProps {
  currentLocale: string;
  locales: string[];
  onLocaleChange$: QRL<(locale: string) => void>;
  location?: "header" | "mobile";
}

const LANGUAGES: Record<string, Language> = {
  en: { code: "en", name: "English", dir: "ltr", flag: "🇬🇧" },
  fa: { code: "fa", name: "فارسی", dir: "rtl", flag: "🇮🇷" },
};

const getLanguage = (locale: string): Language => {
  return (
    LANGUAGES[locale] ?? {
      code: locale,
      name: locale.toUpperCase(),
      dir: "ltr",
    }
  );
};

export const LanguageSelect = component$((props: LanguageSelectProps) => {
  const selectId = `language-select-${props.location || "default"}`;
  const currentLang = getLanguage(props.currentLocale);
  const isCurrentRtl = currentLang.dir === "rtl";
  const selectedLocale = useSignal(props.currentLocale);

  // Update the signal when props change
  useTask$(({ track }) => {
    track(() => props.currentLocale);
    selectedLocale.value = props.currentLocale;
  });

  return (
    <div class="group relative">
      <label for={selectId} class="sr-only">
        {$localize`Select language`}
      </label>

      {/* Custom select wrapper for better styling */}
      <div class="relative">
        <select
          id={selectId}
          value={selectedLocale.value}
          onChange$={(e) =>
            props.onLocaleChange$((e.target as HTMLSelectElement).value)
          }
          class={`cursor-pointer appearance-none
               ${isCurrentRtl ? "pl-8 pr-10 text-right" : "pl-10 pr-8 text-left"} hover:to-gray-150 
                 rounded-xl border
                 border-gray-200 bg-gradient-to-r from-gray-50
                 to-gray-100 py-2.5
                 text-sm 
                 font-medium text-gray-700
                 shadow-sm
                 transition-all duration-200
                 hover:from-gray-100 hover:shadow-md
                 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500
                 
                 dark:border-gray-700 dark:from-gray-800
                 dark:to-gray-900 dark:text-gray-200
                 dark:shadow-lg
                 dark:shadow-black/20
                 dark:hover:border-gray-600
                 dark:hover:from-gray-700 dark:hover:to-gray-800
                 dark:hover:shadow-xl dark:hover:shadow-black/30`}
          dir={currentLang.dir}
          aria-label={$localize`Select language`}
        >
          {props.locales.map((locale) => {
            const language = getLanguage(locale);

            return (
              <option
                key={locale}
                value={locale}
                class="bg-white py-2 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                dir={language.dir}
              >
                {language.name}
              </option>
            );
          })}
        </select>

        {/* Flag icon display */}
        <div
          class={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-lg ${isCurrentRtl ? "right-3" : "left-3"}`}
        >
          {currentLang.flag || ""}
        </div>

        {/* Dropdown chevron icon */}
        <div
          class={`pointer-events-none absolute top-1/2 -translate-y-1/2 ${isCurrentRtl ? "left-2" : "right-2"}`}
        >
          <svg
            class="h-4 w-4 text-gray-500 transition-transform duration-200 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Subtle glow effect on hover for dark mode */}
        <div
          class="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100
                    dark:bg-gradient-to-r dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 
                    dark:blur-xl"
        />
      </div>
    </div>
  );
});
