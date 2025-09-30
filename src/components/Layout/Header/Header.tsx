import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSelect } from "./LanguageSelect";
import { useHeader } from "./useHeader";

export const Header = component$(() => {
  const {
    isMenuOpen,
    isDarkMode,
    currentLocale,
    locales,
    toggleTheme$,
    handleLocaleChange$,
    toggleMenu$,
  } = useHeader();

  return (
    <header class="fixed left-0 right-0 top-0 z-50 h-20">
      <div class="absolute inset-0 bg-white/70 backdrop-blur-xl dark:bg-surface-dark/70">
        <div class="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-primary-500/0 via-primary-500/70 to-secondary-500/0"></div>
      </div>

      <div class="relative mx-auto h-full max-w-[1400px] px-4 sm:px-6 xl:px-8">
        <div class="flex h-full items-center justify-between">
          <Logo />

          <div class="hidden items-center gap-6 lg:flex">
            <Link
              href={`/${currentLocale}/star/`}
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
            >
              {$localize`Launch App`}
            </Link>
            <ThemeToggle
              isDarkMode={isDarkMode.value}
              onToggle$={toggleTheme$}
            />
            <LanguageSelect
              currentLocale={currentLocale}
              locales={locales}
              onLocaleChange$={handleLocaleChange$}
              location="header"
            />
          </div>

          <button
            onClick$={toggleMenu$}
            class="rounded-lg p-2 hover:bg-primary-100 lg:hidden dark:hover:bg-primary-900/20"
            aria-label={$localize`Toggle menu`}
          >
            {isMenuOpen.value ? (
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          class={`fixed inset-x-0 top-20 border-t border-primary-100 bg-white/90 p-4 backdrop-blur-xl transition-all duration-300 lg:hidden dark:border-primary-900/20 dark:bg-surface-dark/90 ${isMenuOpen.value ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0"}`}
        >
          <div class="space-y-4">
            <Link
              href={`/${currentLocale}/star/`}
              class="block px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
            >
              {$localize`Launch App`}
            </Link>
            <div class="flex items-center justify-between gap-4 border-t border-primary-100 pt-4 dark:border-primary-900/20">
              <ThemeToggle
                isDarkMode={isDarkMode.value}
                onToggle$={toggleTheme$}
              />
              <LanguageSelect
                currentLocale={currentLocale}
                locales={locales}
                onLocaleChange$={handleLocaleChange$}
                location="mobile"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
});
