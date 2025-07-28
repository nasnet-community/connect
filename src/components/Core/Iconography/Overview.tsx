import { component$ } from "@builder.io/qwik";
import Icon from "./Icon";
import {
  HomeIcon,
  SettingsIcon,
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  StarIcon,
  HeartIcon,
  CubeIcon,
  WifiIcon,
  ShowIcon,
  GlobeIcon,
  ServerIcon,
  PhoneIcon,
} from "./icons";

/**
 * Overview component for the Icon system.
 * 
 * This component provides a comprehensive introduction to the Icon component,
 * showcasing its key features, design principles, and capabilities in an
 * engaging and informative way.
 */
export const Overview = component$(() => {
  return (
    <div class="max-w-5xl mx-auto p-6 space-y-16">
      {/* Hero Section */}
      <div class="text-center space-y-8">
        <div class="space-y-4">
          <h1 class="text-5xl font-bold text-gray-900 dark:text-gray-100">
            Icon Component
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A powerful, accessible, and highly customizable icon system built for the modern web. 
            Seamlessly integrated with the Connect design system and optimized for every device.
          </p>
        </div>
        
        {/* Hero Icons */}
        <div class="flex items-center justify-center space-x-6">
          <Icon icon={CubeIcon} size="3xl" color="primary" class="animate-pulse" />
          <Icon icon={ServerIcon} size="3xl" color="success" class="transform hover:scale-110 transition-transform" />
          <Icon icon={HeartIcon} size="3xl" color="error" class="animate-bounce" />
        </div>
      </div>

      {/* Key Features Grid */}
      <section class="space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Why Choose Our Icon System?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Built with performance, accessibility, and developer experience in mind
          </p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Responsive Design */}
          <div class="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Icon icon={PhoneIcon} size="lg" color="info" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Responsive Design
                </h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Automatically adapts to mobile, tablet, and desktop with touch-friendly targets 
                and optimized sizing for every screen.
              </p>
              <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Icon icon={PhoneIcon} size="sm" />
                <Icon icon={CubeIcon} size="sm" />
                <Icon icon={ServerIcon} size="sm" />
                <span>All devices supported</span>
              </div>
            </div>
          </div>

          {/* Dark Mode */}
          <div class="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Icon icon={CubeIcon} size="lg" color="secondary" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Advanced Dark Mode
                </h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Intelligent color adaptation with support for light, dark, and high-contrast modes. 
                Colors automatically adjust for optimal visibility.
              </p>
              <div class="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Icon icon={StarIcon} size="sm" color="warning" />
                <Icon icon={CubeIcon} size="sm" color="info" />
                <span>Theme aware</span>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div class="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Icon icon={ShowIcon} size="lg" color="success" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Accessibility First
                </h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                WCAG 2.1 AA compliant with proper ARIA attributes, screen reader support, 
                and keyboard navigation for all interactive elements.
              </p>
              <div class="flex items-center space-x-2 text-sm text-success-600 dark:text-success-400">
                <Icon icon={CheckCircleIcon} size="sm" color="success" />
                <span>WCAG 2.1 AA compliant</span>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div class="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Icon icon={ServerIcon} size="lg" color="warning" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  High Performance
                </h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Leverages Qwik's resumability for instant loading, tree-shaking for minimal bundles, 
                and efficient rendering with zero hydration cost.
              </p>
              <div class="flex items-center space-x-2 text-sm text-warning-600 dark:text-warning-400">
                <Icon icon={StarIcon} size="sm" color="warning" />
                <span>Zero hydration cost</span>
              </div>
            </div>
          </div>

          {/* Design System */}
          <div class="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Icon icon={WifiIcon} size="lg" color="secondary" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Design System Ready
                </h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Seamlessly integrated with the Connect design system, using semantic colors, 
                consistent spacing, and unified visual language.
              </p>
              <div class="flex items-center space-x-2 text-sm text-secondary-600 dark:text-secondary-400">
                <Icon icon={StarIcon} size="sm" color="secondary" />
                <span>Design system integrated</span>
              </div>
            </div>
          </div>

          {/* Global Support */}
          <div class="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all duration-200">
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <div class="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg group-hover:scale-110 transition-transform">
                  <Icon icon={GlobeIcon} size="lg" color="error" />
                </div>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  Global Ready
                </h3>
              </div>
              <p class="text-gray-600 dark:text-gray-400">
                Built-in RTL support, internationalization-ready, and optimized for 
                global applications with logical properties and flexible layouts.
              </p>
              <div class="flex items-center space-x-2 text-sm text-error-600 dark:text-error-400">
                <Icon icon={GlobeIcon} size="sm" color="error" />
                <span>RTL & i18n ready</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Showcase */}
      <section class="space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Flexible Sizing System
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            8 carefully crafted sizes to fit every design need
          </p>
        </div>
        
        <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8">
          <div class="flex items-end justify-center space-x-6">
            {[
              { size: "2xs", label: "2xs", color: "muted" },
              { size: "xs", label: "xs", color: "on-surface-variant" },
              { size: "sm", label: "sm", color: "on-surface" },
              { size: "md", label: "md", color: "primary" },
              { size: "lg", label: "lg", color: "secondary" },
              { size: "xl", label: "xl", color: "success" },
              { size: "2xl", label: "2xl", color: "warning" },
              { size: "3xl", label: "3xl", color: "error" },
            ].map(({ size, label, color }) => (
              <div key={size} class="flex flex-col items-center space-y-2">
                <Icon icon={StarIcon} size={size as any} color={color as any} />
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Showcase */}
      <section class="space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Semantic Color System
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Meaningful colors that adapt to light and dark themes automatically
          </p>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { color: "primary", icon: HomeIcon, label: "Primary" },
            { color: "secondary", icon: SettingsIcon, label: "Secondary" },
            { color: "success", icon: CheckCircleIcon, label: "Success" },
            { color: "warning", icon: InfoIcon, label: "Warning" },
            { color: "error", icon: XCircleIcon, label: "Error" },
            { color: "info", icon: InfoIcon, label: "Info" },
          ].map(({ color, icon, label }) => (
            <div key={color} class="flex flex-col items-center space-y-3 p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
              <Icon icon={icon} size="2xl" color={color as any} />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Features */}
      <section class="space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Interactive Capabilities
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Touch-friendly interactions with smooth animations and feedback
          </p>
        </div>
        
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Hover Effects
              </h3>
              <div class="flex justify-center">
                <Icon 
                  icon={HeartIcon} 
                  size="3xl" 
                  color="error" 
                  interactive 
                  label="Like"
                  class="transform hover:scale-110 transition-transform duration-200" 
                />
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Smooth scaling and color transitions on hover
              </p>
            </div>

            <div class="text-center space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Focus States
              </h3>
              <div class="flex justify-center">
                <Icon 
                  icon={SettingsIcon} 
                  size="3xl" 
                  color="primary" 
                  interactive 
                  label="Settings"
                />
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Keyboard navigation with visible focus indicators
              </p>
            </div>

            <div class="text-center space-y-4">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Touch Targets
              </h3>
              <div class="flex justify-center">
                <Icon 
                  icon={StarIcon} 
                  size="3xl" 
                  color="warning" 
                  interactive 
                  responsive
                  label="Favorite"
                />
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Minimum 44px touch targets on mobile devices
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section class="space-y-8">
        <div class="text-center">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Get Started in Seconds
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            Simple import and you're ready to use hundreds of beautiful icons
          </p>
        </div>
        
        <div class="bg-gray-900 dark:bg-gray-800 rounded-xl p-6 text-green-400 font-mono text-sm overflow-x-auto">
          <div class="space-y-2">
            <div>
              <span class="text-gray-500">// Import the icon component and icons</span>
            </div>
            <div>
              <span class="text-blue-400">import</span> {`{ Icon, HomeIcon }`} <span class="text-blue-400">from</span> <span class="text-yellow-300">"~/components/Core/Iconography"</span>;
            </div>
            <div class="mt-4">
              <span class="text-gray-500">// Use in your component</span>
            </div>
            <div>
              <span class="text-red-400">&lt;Icon</span> <span class="text-blue-400">icon</span>=<span class="text-yellow-300">{`{HomeIcon}`}</span> <span class="text-blue-400">size</span>=<span class="text-yellow-300">"lg"</span> <span class="text-blue-400">color</span>=<span class="text-yellow-300">"primary"</span> <span class="text-red-400">/&gt;</span>
            </div>
          </div>
        </div>
        
        <div class="text-center">
          <div class="inline-flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
            <Icon icon={StarIcon} size="sm" color="inherit" />
            <span>Start Building Amazing UIs</span>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2">
            <div class="text-3xl font-bold text-primary-600 dark:text-primary-400">
              200+
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Available Icons
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-success-600 dark:text-success-400">
              8
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Size Options
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-warning-600 dark:text-warning-400">
              11
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Color Variants
            </div>
          </div>
          <div class="space-y-2">
            <div class="text-3xl font-bold text-error-600 dark:text-error-400">
              100%
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Accessible
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Overview;