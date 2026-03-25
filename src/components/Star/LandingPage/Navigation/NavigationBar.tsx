import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { LuMenu, LuX, LuRouter } from "@qwikest/icons/lucide";
import { Button } from "~/components/Core";

export const NavigationBar = component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  const isScrolled = useSignal(false);
  const isMobileMenuOpen = useSignal(false);

  useVisibleTask$(() => {
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const navItems = [
    { name: $localize`Features`, href: "#features" },
    { name: $localize`Routers`, href: "#routers" },
    { name: $localize`VPN`, href: "#vpn" },
    { name: $localize`Pricing`, href: "#pricing" },
    { name: $localize`Support`, href: "#support" },
  ];

  return (
    <nav
      class={`
      fixed left-0 right-0 top-0 z-50 transition-all duration-300
      ${
        isScrolled.value
          ? "border-b border-white/20 bg-white/10 shadow-lg backdrop-blur-md dark:bg-black/10"
          : "bg-transparent"
      }
    `}
    >
      <div class="mx-auto max-w-7xl px-4">
        <div class="flex h-16 items-center justify-between">
          {/* Logo */}
          <div class="flex items-center gap-3">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              <LuRouter class="h-5 w-5 text-white" />
            </div>
            <span class="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-xl font-bold text-transparent">
              MikroConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <div class="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                class="group relative font-medium text-gray-700 transition-colors duration-200 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400"
              >
                {item.name}
                <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div class="hidden items-center gap-4 md:flex">
            <Button
              variant="ghost"
              size="sm"
              class="text-gray-700 hover:text-purple-600 dark:text-gray-300"
            >
              {$localize`Sign In`}
            </Button>
            <Link href={`/${locale}/star/`}>
              <Button
                variant="primary"
                size="sm"
                class="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              >
                {$localize`Get Started`}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            class="rounded-lg border border-white/20 bg-white/10 p-2 backdrop-blur-sm dark:bg-black/10 md:hidden"
            onClick$={() => (isMobileMenuOpen.value = !isMobileMenuOpen.value)}
          >
            {isMobileMenuOpen.value ? (
              <LuX class="h-6 w-6 text-gray-700 dark:text-gray-300" />
            ) : (
              <LuMenu class="h-6 w-6 text-gray-700 dark:text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen.value && (
          <div class="absolute left-0 right-0 top-full border-b border-white/20 bg-white/95 shadow-xl backdrop-blur-md dark:bg-black/95 md:hidden">
            <div class="space-y-4 p-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  class="block py-2 font-medium text-gray-700 transition-colors duration-200 hover:text-purple-600 dark:text-gray-300"
                  onClick$={() => (isMobileMenuOpen.value = false)}
                >
                  {item.name}
                </a>
              ))}
              <div class="space-y-2 border-t border-white/20 pt-4">
                <Button
                  variant="ghost"
                  class="w-full justify-center text-gray-700 dark:text-gray-300"
                >
                  {$localize`Sign In`}
                </Button>
                <Link href={`/${locale}/star/`} class="block">
                  <Button
                    variant="primary"
                    class="w-full justify-center bg-gradient-to-r from-purple-500 to-blue-500"
                  >
                    {$localize`Get Started`}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});
