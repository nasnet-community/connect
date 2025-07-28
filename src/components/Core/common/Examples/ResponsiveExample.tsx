import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { classNames } from "../utils";

export const ResponsiveUtilitiesExample = component$(() => {
  const viewportSize = useSignal<"mobile" | "tablet" | "desktop">("desktop");
  
  const containerClasses = classNames(
    // Base mobile styles
    "w-full p-4 space-y-4",
    
    // Tablet styles (768px and up)
    "md:p-6 md:space-y-6",
    "md:grid md:grid-cols-2 md:gap-6 md:space-y-0",
    
    // Desktop styles (1024px and up)
    "lg:p-8 lg:gap-8",
    "lg:grid-cols-3",
    
    // Extra large desktop (1280px and up)
    "xl:p-12 xl:gap-12",
    
    // Container max-width management
    "mx-auto max-w-7xl",
    
    // Background and styling
    "bg-white dark:bg-gray-800",
    "rounded-lg shadow-lg",
    "border border-gray-200 dark:border-gray-700"
  );
  
  const cardClasses = classNames(
    // Mobile card styles
    "p-4 rounded-md border border-gray-200",
    "bg-gray-50 dark:bg-gray-900 dark:border-gray-700",
    
    // Tablet adjustments
    "md:p-6",
    
    // Desktop enhancements
    "lg:p-8 lg:rounded-lg",
    "lg:hover:shadow-md lg:transition-shadow",
    
    // Text sizing
    "text-sm md:text-base lg:text-lg"
  );
  
  const mockViewport = classNames(
    "transition-all duration-300 border-2 border-dashed border-gray-300 dark:border-gray-600",
    viewportSize.value === "mobile" && "max-w-sm mx-auto",
    viewportSize.value === "tablet" && "max-w-2xl mx-auto", 
    viewportSize.value === "desktop" && "max-w-full"
  );
  
  return (
    <div class="space-y-6 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Responsive Utilities
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Create components that adapt seamlessly to different device sizes using Tailwind's responsive utilities:
        </p>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Simulate Viewport Size:
            </label>
            <div class="mt-2 flex space-x-3">
              {(["mobile", "tablet", "desktop"] as const).map((size) => (
                <label key={size} class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="viewport"
                    value={size}
                    checked={viewportSize.value === size}
                    onChange$={() => viewportSize.value = size}
                    class="rounded"
                  />
                  <span class="text-sm capitalize text-gray-700 dark:text-gray-300">
                    {size} {size === "mobile" && "📱"} {size === "tablet" && "📱"} {size === "desktop" && "💻"}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div class={mockViewport}>
            <div class={containerClasses}>
              <div class={cardClasses}>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">
                  Card 1
                </h4>
                <p class="text-gray-600 dark:text-gray-400">
                  This card adapts its padding, text size, and layout based on screen size.
                </p>
                <div class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  <div class="block sm:hidden">📱 Mobile Layout</div>
                  <div class="hidden sm:block md:hidden">📱 Small Screen</div>
                  <div class="hidden md:block lg:hidden">💻 Tablet Layout</div>
                  <div class="hidden lg:block">💻 Desktop Layout</div>
                </div>
              </div>
              
              <div class={cardClasses}>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">
                  Card 2
                </h4>
                <p class="text-gray-600 dark:text-gray-400">
                  On mobile: stacked vertically. On tablet: 2 columns. On desktop: 3 columns.
                </p>
              </div>
              
              <div class={cardClasses}>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">
                  Card 3
                </h4>
                <p class="text-gray-600 dark:text-gray-400">
                  Hover effects are enabled only on larger screens where hover is available.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">Responsive Pattern:</p>
          <code class="mt-1 block overflow-x-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
            classNames(
              "base-mobile-styles",
              "md:tablet-styles md:grid md:grid-cols-2",
              "lg:desktop-styles lg:grid-cols-3", 
              "xl:large-desktop-styles"
            )
          </code>
        </div>
      </div>
    </div>
  );
});

export const MobileOptimizedExample = component$(() => {
  const isMenuOpen = useSignal(false);
  
  const mobileMenuClasses = classNames(
    // Mobile menu base styles
    "fixed inset-0 z-50 bg-black bg-opacity-50",
    "transition-opacity duration-300",
    
    // Show/hide states
    isMenuOpen.value ? "opacity-100" : "opacity-0 pointer-events-none",
    
    // Hide on larger screens
    "md:hidden"
  );
  
  const menuContentClasses = classNames(
    "fixed top-0 right-0 h-full w-64 bg-white dark:bg-gray-800",
    "transform transition-transform duration-300 ease-in-out",
    "shadow-xl border-l border-gray-200 dark:border-gray-700",
    
    // Slide animation
    isMenuOpen.value ? "translate-x-0" : "translate-x-full"
  );
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Mobile-Optimized Components
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Build mobile-first components with touch-friendly interactions and optimized layouts:
        </p>
        
        <div class="relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          {/* Mock Mobile Interface */}
          <div class="bg-gray-50 dark:bg-gray-900">
            {/* Mobile Header */}
            <header class="flex items-center justify-between bg-primary-500 p-4 text-white">
              <h1 class="text-lg font-semibold">Mobile App</h1>
              
              {/* Hamburger Menu - Mobile Only */}
              <button
                onClick$={() => isMenuOpen.value = !isMenuOpen.value}
                class="p-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500 md:hidden"
                aria-label="Toggle menu"
              >
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d={isMenuOpen.value ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
              
              {/* Desktop Navigation */}
              <nav class="hidden space-x-4 md:flex">
                <a href="#" class="hover:text-primary-200">Home</a>
                <a href="#" class="hover:text-primary-200">About</a>
                <a href="#" class="hover:text-primary-200">Services</a>
                <a href="#" class="hover:text-primary-200">Contact</a>
              </nav>
            </header>
            
            {/* Content Area */}
            <main class="p-4">
              <div class="space-y-4">
                {/* Touch-Friendly Cards */}
                <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      class="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800
                             touch-manipulation cursor-pointer
                             transition-all duration-200
                             active:scale-95 hover:shadow-md
                             min-h-[120px] flex items-center justify-center
                             border border-gray-200 dark:border-gray-700"
                    >
                      <div class="text-center">
                        <div class="text-2xl mb-2">📱</div>
                        <h3 class="font-medium text-gray-900 dark:text-gray-100">
                          Touch Card {i}
                        </h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Tap me!
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Mobile-Optimized Button */}
                <button class="w-full rounded-lg bg-primary-500 py-4 text-white font-medium
                             touch-manipulation transition-colors
                             hover:bg-primary-600 active:bg-primary-700
                             focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                             min-h-[44px] text-base">
                  Large Touch Target Button
                </button>
              </div>
            </main>
          </div>
          
          {/* Mobile Menu Overlay */}
          <div class={mobileMenuClasses}>
            <div class={menuContentClasses}>
              <div class="flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">Menu</h2>
                <button
                  onClick$={() => isMenuOpen.value = false}
                  class="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
                >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <nav class="p-4">
                <div class="space-y-2">
                  {["Home", "About", "Services", "Contact"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      class="block rounded-md px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-gray-100
                             min-h-[44px] flex items-center touch-manipulation"
                      onClick$={() => isMenuOpen.value = false}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </nav>
            </div>
          </div>
        </div>
        
        <div class="text-sm space-y-2">
          <p class="font-medium text-gray-900 dark:text-gray-100">Mobile Optimization Features:</p>
          <ul class="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 text-xs">
            <li><code>touch-manipulation</code> - Optimizes touch interactions</li>
            <li><code>min-h-[44px]</code> - Meets minimum touch target size (44px)</li>
            <li><code>active:scale-95</code> - Provides visual feedback on touch</li>
            <li><code>transition-all</code> - Smooth animations for better UX</li>
            <li>Mobile-first responsive design with <code>md:hidden</code> and <code>md:flex</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
});

export const TouchFriendlyExample = component$(() => {
  const interactions = useStore({
    tapCount: 0,
    swipeDirection: "",
    longPressActive: false,
  });
  
  const longPressTimer = useSignal<number | undefined>(undefined);
  
  const handleTouchStart = $(() => {
    longPressTimer.value = window.setTimeout(() => {
      interactions.longPressActive = true;
    }, 500);
  });
  
  const handleTouchEnd = $(() => {
    if (longPressTimer.value) {
      clearTimeout(longPressTimer.value);
    }
    if (interactions.longPressActive) {
      interactions.longPressActive = false;
    } else {
      interactions.tapCount++;
    }
  });
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Touch-Friendly Interactions
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Implement components with appropriate touch targets and gesture support for mobile devices:
        </p>
        
        <div class="space-y-6">
          {/* Touch Target Sizes */}
          <div>
            <h4 class="mb-3 font-medium text-gray-900 dark:text-gray-100">
              Touch Target Sizes
            </h4>
            <div class="flex flex-wrap gap-4">
              <button class="h-8 w-16 rounded bg-red-500 text-xs text-white">
                Too Small
              </button>
              <button class="h-10 w-20 rounded bg-yellow-500 text-sm text-white">
                Marginal
              </button>
              <button class="min-h-[44px] min-w-[44px] rounded bg-green-500 px-4 py-2 text-white">
                Perfect ✓
              </button>
              <button class="min-h-[48px] min-w-[48px] rounded bg-blue-500 px-6 py-3 text-white">
                Generous
              </button>
            </div>
            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Minimum recommended touch target: 44px × 44px (Apple HIG) or 48dp × 48dp (Material Design)
            </p>
          </div>
          
          {/* Interactive Touch Area */}
          <div>
            <h4 class="mb-3 font-medium text-gray-900 dark:text-gray-100">
              Touch Interactions
            </h4>
            <div class="space-y-3">
              <div
                class="relative flex min-h-[120px] cursor-pointer select-none items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg transition-all duration-200 active:scale-95 active:shadow-md"
                onTouchStart$={handleTouchStart}
                onTouchEnd$={handleTouchEnd}
                onClick$={() => interactions.tapCount++}
              >
                <div class="text-center">
                  <div class="text-2xl mb-2">👆</div>
                  <div class="font-medium">
                    {interactions.longPressActive ? "Long Press Detected!" : "Touch Me!"}
                  </div>
                  <div class="text-sm opacity-90">
                    Taps: {interactions.tapCount}
                  </div>
                </div>
                
                {interactions.longPressActive && (
                  <div class="absolute inset-0 flex items-center justify-center rounded-lg bg-green-500 bg-opacity-90">
                    <div class="text-center">
                      <div class="text-xl">🎉</div>
                      <div class="font-medium">Long Press!</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Try tapping quickly or holding for 500ms to trigger long press
              </div>
            </div>
          </div>
          
          {/* Swipe Gestures */}
          <div>
            <h4 class="mb-3 font-medium text-gray-900 dark:text-gray-100">
              Swipe Gestures
            </h4>
            <div
              class="flex min-h-[100px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors dark:border-gray-600 dark:bg-gray-900"
            >
              <div class="text-center">
                <div class="text-lg mb-1">👈 👉 👆 👇</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  Swipe area (basic implementation)
                </div>
                {interactions.swipeDirection && (
                  <div class="mt-2 text-sm font-medium text-blue-600 dark:text-blue-400">
                    Last swipe: {interactions.swipeDirection}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Button States */}
          <div>
            <h4 class="mb-3 font-medium text-gray-900 dark:text-gray-100">
              Touch Feedback States
            </h4>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <button class="min-h-[44px] rounded-md bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-gray-200">
                Default
              </button>
              <button class="min-h-[44px] rounded-md bg-blue-500 px-4 py-2 text-white transition-all hover:bg-blue-600 active:scale-95 active:bg-blue-700">
                Scale Feedback
              </button>
              <button class="min-h-[44px] rounded-md bg-green-500 px-4 py-2 text-white transition-all hover:shadow-lg active:shadow-sm">
                Shadow Feedback
              </button>
              <button class="min-h-[44px] rounded-md bg-purple-500 px-4 py-2 text-white transition-all hover:bg-purple-600 active:bg-purple-700 active:scale-95">
                Combined
              </button>
            </div>
          </div>
        </div>
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">Touch-Friendly CSS Classes:</p>
          <code class="mt-1 block overflow-x-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
            classNames(
              "min-h-[44px] min-w-[44px]",    // Minimum touch target size
              "touch-manipulation",            // Optimize touch interactions
              "select-none",                   // Prevent text selection
              "active:scale-95",              // Touch feedback
              "transition-all duration-200"   // Smooth animations
            )
          </code>
        </div>
      </div>
    </div>
  );
});