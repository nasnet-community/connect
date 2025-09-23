import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { LuMenu, LuX, LuRouter } from "@qwikest/icons/lucide";
import { Button } from "~/components/Core";

export const NavigationBar = component$(() => {
  const isScrolled = useSignal(false);
  const isMobileMenuOpen = useSignal(false);

  useVisibleTask$(() => {
    const handleScroll = () => {
      isScrolled.value = window.scrollY > 20;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const navItems = [
    { name: $localize`Features`, href: "#features" },
    { name: $localize`Routers`, href: "#routers" },
    { name: $localize`VPN`, href: "#vpn" },
    { name: $localize`Pricing`, href: "#pricing" },
    { name: $localize`Support`, href: "#support" }
  ];

  return (
    <nav class={`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      ${isScrolled.value
        ? 'bg-white/10 dark:bg-black/10 backdrop-blur-md border-b border-white/20 shadow-lg'
        : 'bg-transparent'
      }
    `}>
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center justify-between h-16">

          {/* Logo */}
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <LuRouter class="h-5 w-5 text-white" />
            </div>
            <span class="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              MikroConnect
            </span>
          </div>

          {/* Desktop Navigation */}
          <div class="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                class="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div class="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              class="text-gray-700 dark:text-gray-300 hover:text-purple-600"
            >
              {$localize`Sign In`}
            </Button>
            <Button
              variant="primary"
              size="sm"
              class="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {$localize`Get Started`}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            class="md:hidden p-2 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-sm border border-white/20"
            onClick$={() => isMobileMenuOpen.value = !isMobileMenuOpen.value}
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
          <div class="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-white/20 shadow-xl">
            <div class="p-4 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  class="block py-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 font-medium transition-colors duration-200"
                  onClick$={() => isMobileMenuOpen.value = false}
                >
                  {item.name}
                </a>
              ))}
              <div class="pt-4 border-t border-white/20 space-y-2">
                <Button
                  variant="ghost"
                  class="w-full justify-center text-gray-700 dark:text-gray-300"
                >
                  {$localize`Sign In`}
                </Button>
                <Button
                  variant="primary"
                  class="w-full justify-center bg-gradient-to-r from-purple-500 to-blue-500"
                >
                  {$localize`Get Started`}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
});