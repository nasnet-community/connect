import { component$, useSignal, $ } from "@builder.io/qwik";
import { TopNavigation } from "../TopNavigation";
import { Button } from "~/components/Core";

export default component$(() => {
  const isMobileMenuOpen = useSignal(false);

  const handleMobileMenuToggle$ = $(() => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
  });

  const handleItemClick$ = $((item: any) => {
    console.log("Clicked item:", item);
    // Close mobile menu when item is clicked
    isMobileMenuOpen.value = false;
  });

  // Enhanced navigation items with nested menus
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      href: "/",
      isActive: true,
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      id: "products",
      label: "Products",
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      items: [
        {
          id: "router-config",
          label: "Router Configuration",
          href: "/products/router-config",
          icon: (
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          ),
        },
        {
          id: "vpn-setup",
          label: "VPN Setup",
          href: "/products/vpn-setup",
          icon: (
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          ),
        },
        {
          id: "network-tools",
          label: "Network Tools",
          href: "/products/network-tools",
          icon: (
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          ),
        },
        {
          id: "gaming-optimization",
          label: "Gaming Optimization",
          href: "/products/gaming",
          icon: (
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M16 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "solutions",
      label: "Solutions",
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      items: [
        {
          id: "enterprise",
          label: "Enterprise Solutions",
          href: "/solutions/enterprise",
          icon: (
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
        },
        {
          id: "small-business",
          label: "Small Business",
          href: "/solutions/small-business",
          icon: (
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          ),
        },
        {
          id: "home-users",
          label: "Home Users",
          href: "/solutions/home-users",
          icon: (
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          ),
        },
      ],
    },
    {
      id: "docs",
      label: "Documentation",
      href: "/docs",
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      id: "support",
      label: "Support",
      href: "/support",
      icon: (
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V18.75A.75.75 0 0112 18zM3.75 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H4.5a.75.75 0 01-.75-.75zM19.5 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H20.25a.75.75 0 01-.75-.75z" />
        </svg>
      ),
    },
  ];

  // Enhanced right content with proper mobile styling
  const rightContent = (
    <div class="space-y-3">
      {/* User profile section */}
      <div class="flex items-center space-x-3 p-3 bg-white/80 rounded-lg border border-gray-200 dark:bg-gray-800/80 dark:border-gray-700">
        <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center dark:bg-primary-900/30">
          <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
            John Doe
          </p>
          <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
            john@example.com
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div class="space-y-2">
        <Button
          variant="outline"
          size="sm"
          class="w-full justify-center min-h-[44px] touch-manipulation"
          onClick$={() => console.log("Settings clicked")}
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Settings
        </Button>
        
        <Button
          variant="primary"
          size="sm"
          class="w-full justify-center min-h-[44px] touch-manipulation"
          onClick$={() => console.log("Get Started clicked")}
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Get Started
        </Button>
      </div>

      {/* Theme toggle */}
      <div class="pt-3 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          class="
            w-full flex items-center justify-between p-3 text-sm
            bg-white/80 hover:bg-gray-50 rounded-lg border border-gray-200
            dark:bg-gray-800/80 dark:hover:bg-gray-700 dark:border-gray-700
            motion-safe:transition-colors motion-safe:duration-200
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500
            min-h-[44px] touch-manipulation
          "
          onClick$={() => console.log("Theme toggle clicked")}
        >
          <span class="text-gray-700 dark:text-gray-300">Dark Mode</span>
          <div class="w-10 h-6 bg-gray-300 rounded-full relative dark:bg-gray-600">
            <div class="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform dark:translate-x-4 dark:bg-gray-300"></div>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div class="bg-gray-50 min-h-screen dark:bg-gray-900">
      <TopNavigation
        items={navigationItems}
        isMobileMenuOpen={isMobileMenuOpen.value}
        onMobileMenuToggle$={handleMobileMenuToggle$}
        onNavItemClick$={handleItemClick$}
        rightContent={rightContent}
        class="bg-white/95 backdrop-blur-md border-b border-gray-200 dark:bg-gray-900/95 dark:border-gray-700"
      />
      
      {/* Demo content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Mobile Enhanced Navigation Demo
          </h1>
          <p class="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Resize your screen to mobile size or use developer tools to test the enhanced mobile menu features:
          </p>
          
          <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 dark:bg-primary-900/30">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Enhanced Touch Targets
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                All interactive elements meet the minimum 44x44px touch target size for better accessibility.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 dark:bg-primary-900/30">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-6 8l2 2 4-4" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Smooth Animations
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Fluid transitions and animations that respect user motion preferences.
              </p>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800">
              <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 dark:bg-primary-900/30">
                <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Nested Menu Items
              </h3>
              <p class="text-gray-600 dark:text-gray-400">
                Hierarchical navigation with proper visual hierarchy and indentation.
              </p>
            </div>
          </div>
          
          <div class="mt-8 p-6 bg-primary-50 rounded-lg dark:bg-primary-900/20">
            <p class="text-sm text-primary-800 dark:text-primary-200">
              <strong>Try it out:</strong> Toggle the mobile menu using the hamburger button and explore the enhanced features like backdrop overlay, 
              smooth animations, nested menu items, and the right content section with user profile and action buttons.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
});