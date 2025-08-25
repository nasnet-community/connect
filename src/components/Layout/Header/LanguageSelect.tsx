import { component$, type QRL, useSignal, useTask$, useVisibleTask$ } from "@builder.io/qwik";

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
  ar: { code: "ar", name: "العربية", dir: "rtl", flag: "🇸🇦" },
  zh: { code: "zh", name: "中文", dir: "ltr", flag: "🇨🇳" },
  ru: { code: "ru", name: "Русский", dir: "ltr", flag: "🇷🇺" },
  tr: { code: "tr", name: "Türkçe", dir: "ltr", flag: "🇹🇷" },
  it: { code: "it", name: "Italiano", dir: "ltr", flag: "🇮🇹" },
};

export const LanguageSelect = component$((props: LanguageSelectProps) => {
  const selectId = `language-select-${props.location || "default"}`;
  const currentLang = LANGUAGES[props.currentLocale];
  const selectedLocale = useSignal(props.currentLocale);
  
  // Update the signal when props change
  useTask$(({ track }) => {
    track(() => props.currentLocale);
    selectedLocale.value = props.currentLocale;
  });
  
  // Ensure select value is correct after hydration
  useVisibleTask$(({ track }) => {
    track(() => props.currentLocale);
    const selectElement = document.getElementById(selectId) as HTMLSelectElement;
    if (selectElement && selectElement.value !== props.currentLocale) {
      selectElement.value = props.currentLocale;
    }
  });

  return (
    <div class="relative group">
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
          class="appearance-none cursor-pointer
                 pl-10 pr-8 py-2.5 
                 text-sm font-medium
                 bg-gradient-to-r from-gray-50 to-gray-100
                 hover:from-gray-100 hover:to-gray-150
                 text-gray-700 
                 border border-gray-200
                 rounded-xl
                 shadow-sm hover:shadow-md
                 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                 
                 dark:from-gray-800 dark:to-gray-900
                 dark:hover:from-gray-700 dark:hover:to-gray-800
                 dark:text-gray-200
                 dark:border-gray-700
                 dark:hover:border-gray-600
                 dark:shadow-lg dark:shadow-black/20
                 dark:hover:shadow-xl dark:hover:shadow-black/30"
          dir={currentLang.dir || "ltr"}
          aria-label={$localize`Select language`}
        >
          {props.locales.map((locale) => (
            <option
              key={locale}
              value={locale}
              class="py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200"
              dir={LANGUAGES[locale].dir || "ltr"}
            >
              {`${LANGUAGES[locale].flag || ""} ${LANGUAGES[locale].name || locale.toUpperCase()}`}
            </option>
          ))}
        </select>
        
        {/* Flag icon display */}
        <div class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-lg">
          {currentLang.flag || ""}
        </div>
        
        {/* Dropdown chevron icon */}
        <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg 
            class="w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 group-hover:text-gray-700 dark:group-hover:text-gray-300"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {/* Subtle glow effect on hover for dark mode */}
        <div class="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                    dark:bg-gradient-to-r dark:from-blue-500/10 dark:via-purple-500/10 dark:to-pink-500/10 
                    dark:blur-xl" />
      </div>
    </div>
  );
});
