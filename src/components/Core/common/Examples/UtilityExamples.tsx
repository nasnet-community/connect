import { component$, useSignal, useStore } from "@builder.io/qwik";
import { classNames } from "../utils";

export const ClassNamesBasicExample = component$(() => {
  const dynamicClass = useSignal("text-blue-600");
  
  const baseClasses = "px-4 py-2 rounded-md font-medium transition-colors";
  const conditionalClasses = classNames(
    baseClasses,
    dynamicClass.value,
    "hover:bg-gray-100",
    "dark:hover:bg-gray-700"
  );
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Basic className Merging
      </h3>
      
      <div class="space-y-3">
        <p class="text-gray-600 dark:text-gray-400">
          Combine multiple class strings safely, filtering out falsy values:
        </p>
        
        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Dynamic Class:
          </label>
          <select
            value={dynamicClass.value}
            onChange$={(e) => dynamicClass.value = (e.target as HTMLSelectElement).value}
            class="rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
          >
            <option value="text-blue-600">Blue Text</option>
            <option value="text-green-600">Green Text</option>
            <option value="text-red-600">Red Text</option>
            <option value="">No Dynamic Class</option>
          </select>
        </div>
        
        <div class="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
          <div class={conditionalClasses}>
            Sample Element with Merged Classes
          </div>
        </div>
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">Generated classes:</p>
          <code class="mt-1 block rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
            classNames("{baseClasses}", "{dynamicClass.value}", "hover:bg-gray-100", "dark:hover:bg-gray-700")
          </code>
          <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Result: <code>{conditionalClasses}</code>
          </p>
        </div>
      </div>
    </div>
  );
});

export const ConditionalClassesExample = component$(() => {
  const state = useStore({
    isActive: false,
    isDisabled: false,
    variant: "primary" as "primary" | "secondary" | "danger",
    size: "md" as "sm" | "md" | "lg"
  });
  
  const buttonClasses = classNames(
    // Base classes
    "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    
    // Size variants
    state.size === "sm" && "px-3 py-1.5 text-sm",
    state.size === "md" && "px-4 py-2 text-base",
    state.size === "lg" && "px-6 py-3 text-lg",
    
    // Color variants
    state.variant === "primary" && "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-500",
    state.variant === "secondary" && "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
    state.variant === "danger" && "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    
    // State classes
    state.isActive && "ring-2 ring-offset-2 ring-blue-500",
    state.isDisabled && "opacity-50 cursor-not-allowed",
    
    // Dark mode support
    "dark:focus:ring-offset-gray-800"
  );
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Conditional Class Application
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Build complex, conditional class strings based on component state:
        </p>
        
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Variant:
              </label>
              <select
                value={state.variant}
                onChange$={(e) => state.variant = (e.target as HTMLSelectElement).value as any}
                class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="danger">Danger</option>
              </select>
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Size:
              </label>
              <select
                value={state.size}
                onChange$={(e) => state.size = (e.target as HTMLSelectElement).value as any}
                class="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            
            <div class="space-y-2">
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state.isActive}
                  onChange$={(e) => state.isActive = (e.target as HTMLInputElement).checked}
                  class="rounded"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Active State</span>
              </label>
              
              <label class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state.isDisabled}
                  onChange$={(e) => state.isDisabled = (e.target as HTMLInputElement).checked}
                  class="rounded"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Disabled State</span>
              </label>
            </div>
          </div>
          
          <div class="space-y-3">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Preview:
            </label>
            <div class="flex items-center justify-center rounded-md bg-gray-50 p-8 dark:bg-gray-900">
              <button 
                class={buttonClasses}
                disabled={state.isDisabled}
              >
                Sample Button
              </button>
            </div>
          </div>
        </div>
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">Generated classes:</p>
          <code class="mt-1 block overflow-x-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
            {buttonClasses}
          </code>
        </div>
      </div>
    </div>
  );
});

export const ResponsiveClassesExample = component$(() => {
  const showMobile = useSignal(false);
  
  const responsiveClasses = classNames(
    // Mobile-first responsive design
    "w-full p-4 text-sm",                    // Mobile (default)
    "sm:w-auto sm:p-6 sm:text-base",         // Small screens and up
    "md:p-8 md:text-lg",                     // Medium screens and up  
    "lg:p-12 lg:text-xl",                    // Large screens and up
    "xl:p-16 xl:text-2xl",                   // Extra large screens and up
    
    // Background colors responsive to screen size
    "bg-red-100 sm:bg-yellow-100 md:bg-green-100 lg:bg-blue-100 xl:bg-purple-100",
    "dark:bg-red-900 dark:sm:bg-yellow-900 dark:md:bg-green-900 dark:lg:bg-blue-900 dark:xl:bg-purple-900",
    
    // Additional responsive utilities
    "rounded-md sm:rounded-lg md:rounded-xl",
    "shadow-sm sm:shadow-md md:shadow-lg lg:shadow-xl",
    
    // Typography
    "font-medium sm:font-semibold md:font-bold",
    "text-center sm:text-left"
  );
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Responsive Class Management
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Use Tailwind's responsive breakpoints with the classNames utility:
        </p>
        
        <div class="space-y-3">
          <label class="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showMobile.value}
              onChange$={(e) => showMobile.value = (e.target as HTMLInputElement).checked}
              class="rounded"
            />
            <span class="text-sm text-gray-700 dark:text-gray-300">
              Simulate Mobile View (ignore actual screen size)
            </span>
          </label>
          
          <div class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <div 
              class={classNames(
                responsiveClasses,
                showMobile.value && "!w-full !p-4 !text-sm !bg-red-100 dark:!bg-red-900"
              )}
            >
              <h4 class="font-bold text-gray-900 dark:text-gray-100">
                Responsive Component
              </h4>
              <p class="mt-2 text-gray-700 dark:text-gray-300">
                This component adapts its padding, text size, background color, and other properties 
                based on the screen size using Tailwind's responsive utilities.
              </p>
              <div class="mt-3 text-xs opacity-75">
                <div class="block sm:hidden">📱 Mobile (red)</div>
                <div class="hidden sm:block md:hidden">📱 Small (yellow)</div>
                <div class="hidden md:block lg:hidden">💻 Medium (green)</div>
                <div class="hidden lg:block xl:hidden">💻 Large (blue)</div>
                <div class="hidden xl:block">🖥️ Extra Large (purple)</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">Responsive class pattern:</p>
          <code class="mt-1 block overflow-x-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
            classNames(
              "base-mobile-classes",
              "sm:small-screen-classes", 
              "md:medium-screen-classes",
              "lg:large-screen-classes",
              "xl:extra-large-classes"
            )
          </code>
        </div>
      </div>
    </div>
  );
});

export const ThemeAwareClassesExample = component$(() => {
  const currentTheme = useSignal<"light" | "dark" | "auto">("auto");
  
  const themeClasses = classNames(
    // Base classes
    "p-6 rounded-xl transition-all duration-300",
    "border-2 backdrop-blur-sm",
    
    // Light theme classes
    currentTheme.value === "light" && [
      "bg-white/90 border-gray-200",
      "text-gray-900",
      "shadow-lg shadow-gray-200/50"
    ],
    
    // Dark theme classes  
    currentTheme.value === "dark" && [
      "bg-gray-900/90 border-gray-700",
      "text-gray-100", 
      "shadow-lg shadow-gray-900/50"
    ],
    
    // Auto theme (follows system preference)
    currentTheme.value === "auto" && [
      "bg-white/90 border-gray-200 dark:bg-gray-900/90 dark:border-gray-700",
      "text-gray-900 dark:text-gray-100",
      "shadow-lg shadow-gray-200/50 dark:shadow-gray-900/50"
    ]
  );
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Theme-Aware Styling
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Apply different classes based on the current theme preference:
        </p>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Theme Override:
            </label>
            <div class="mt-2 flex space-x-3">
              {(["light", "dark", "auto"] as const).map((theme) => (
                <label key={theme} class="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="theme"
                    value={theme}
                    checked={currentTheme.value === theme}
                    onChange$={() => currentTheme.value = theme}
                    class="rounded"
                  />
                  <span class="text-sm capitalize text-gray-700 dark:text-gray-300">
                    {theme}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div class="min-h-[200px] rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 p-4 dark:from-blue-950 dark:to-purple-950">
            <div class={themeClasses}>
              <h4 class="text-xl font-bold">Theme-Aware Component</h4>
              <p class="mt-2">
                This component automatically adapts its appearance based on the selected theme.
                The styling changes include background colors, text colors, borders, and shadows.
              </p>
              <div class="mt-4 flex items-center space-x-2">
                <div class="h-4 w-4 rounded-full bg-current opacity-50"></div>
                <span class="text-sm opacity-75">
                  Current theme: {currentTheme.value}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">Theme-aware pattern:</p>
          <code class="mt-1 block overflow-x-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
            classNames(
              "base-classes",
              theme === "light" && "light-theme-classes",
              theme === "dark" && "dark-theme-classes", 
              theme === "auto" && "auto-theme-classes dark:dark-variant-classes"
            )
          </code>
        </div>
      </div>
    </div>
  );
});