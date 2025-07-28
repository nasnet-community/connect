import { component$ } from "@builder.io/qwik";
import Icon from "../Icon";
import { 
  HomeIcon, 
  SettingsIcon, 
  UserIcon, 
  StarIcon, 
  HeartIcon,
  CheckCircleIcon,
  InfoIcon,
  SearchIcon
} from "../icons";

/**
 * IconSizes - Comprehensive size demonstrations with responsive considerations
 * 
 * Shows all available icon sizes and how they adapt across different devices
 * and contexts for optimal user experience.
 */

export const AllSizes = component$(() => {
  const sizes = [
    { size: "2xs", label: "2xs (10px)", description: "Micro icons for dense interfaces" },
    { size: "xs", label: "xs (12px)", description: "Small UI elements and inline content" },
    { size: "sm", label: "sm (16px)", description: "Compact layouts and secondary actions" },
    { size: "md", label: "md (20px)", description: "Standard size for most use cases" },
    { size: "lg", label: "lg (24px)", description: "Prominent elements and primary actions" },
    { size: "xl", label: "xl (32px)", description: "Large features and hero sections" },
    { size: "2xl", label: "2xl (40px)", description: "Hero elements and major visual impact" },
    { size: "3xl", label: "3xl (48px)", description: "Maximum impact for hero sections" },
  ];

  return (
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Complete Size Range
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          8 carefully crafted sizes to fit every design need
        </p>
      </div>

      {/* Size Grid */}
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
        {sizes.map(({ size, label, description }) => (
          <div key={size} class="text-center p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow">
            <div class="flex justify-center mb-3">
              <Icon icon={StarIcon} size={size as any} color="primary" />
            </div>
            <div class="space-y-1">
              <div class="font-medium text-gray-900 dark:text-gray-100 text-sm">
                {label}
              </div>
              <div class="text-xs text-gray-600 dark:text-gray-400">
                {description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Size Comparison */}
      <div class="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-2xl p-8">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Side-by-Side Comparison
        </h3>
        <div class="flex items-end justify-center space-x-4">
          {sizes.map(({ size }) => (
            <div key={size} class="flex flex-col items-center space-y-2">
              <Icon icon={HeartIcon} size={size as any} color="error" />
              <span class="text-xs text-gray-700 dark:text-gray-300 font-medium">
                {size}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export const ContextualSizing = component$(() => {
  return (
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Contextual Size Usage
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Choosing the right size for different UI contexts
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        {/* Dense Interface (Small sizes) */}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Dense Interfaces (2xs, xs, sm)
          </h3>
          
          {/* Table-like layout */}
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
              <h4 class="font-medium text-gray-900 dark:text-gray-100 text-sm">
                User Management
              </h4>
            </div>
            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              <div class="flex items-center justify-between px-4 py-2">
                <div class="flex items-center space-x-2">
                  <Icon icon={UserIcon} size="2xs" color="muted" />
                  <span class="text-sm text-gray-900 dark:text-gray-100">John Doe</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon icon={SettingsIcon} size="2xs" color="on-surface-variant" interactive label="Settings" />
                  <Icon icon={InfoIcon} size="2xs" color="info" interactive label="Info" />
                </div>
              </div>
              <div class="flex items-center justify-between px-4 py-2">
                <div class="flex items-center space-x-2">
                  <Icon icon={UserIcon} size="2xs" color="muted" />
                  <span class="text-sm text-gray-900 dark:text-gray-100">Jane Smith</span>
                </div>
                <div class="flex items-center space-x-1">
                  <Icon icon={SettingsIcon} size="2xs" color="on-surface-variant" interactive label="Settings" />
                  <Icon icon={InfoIcon} size="2xs" color="info" interactive label="Info" />
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
            {`<Icon icon={UserIcon} size="2xs" color="muted" />`}
          </div>
        </div>

        {/* Standard Interface (Medium sizes) */}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Standard Interfaces (md, lg)
          </h3>
          
          {/* Card layout */}
          <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div class="flex items-center space-x-4 mb-4">
              <div class="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <Icon icon={UserIcon} size="lg" color="primary" />
              </div>
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-gray-100">
                  User Profile
                </h4>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                  Manage your account settings
                </p>
              </div>
            </div>
            <div class="flex space-x-2">
              <button class="flex items-center space-x-2 px-3 py-2 bg-primary-600 text-white rounded-md">
                <Icon icon={SettingsIcon} size="sm" color="inherit" />
                <span>Settings</span>
              </button>
              <button class="flex items-center space-x-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md">
                <Icon icon={InfoIcon} size="sm" color="on-surface-variant" />
                <span>Info</span>
              </button>
            </div>
          </div>
          
          <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
            {`<Icon icon={UserIcon} size="lg" color="primary" />`}
          </div>
        </div>
      </div>

      {/* Hero Interface (Large sizes) */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Hero Sections (xl, 2xl, 3xl)
        </h3>
        
        <div class="bg-gradient-to-br from-primary-600 to-secondary-600 text-white rounded-2xl p-8 text-center">
          <div class="space-y-6">
            <Icon icon={StarIcon} size="3xl" color="inherit" class="mx-auto" />
            <div class="space-y-2">
              <h2 class="text-3xl font-bold">Welcome to Our Platform</h2>
              <p class="text-primary-100 text-lg">
                Get started with our amazing features today
              </p>
            </div>
            <div class="flex justify-center space-x-4">
              <button class="flex items-center space-x-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold">
                <Icon icon={CheckCircleIcon} size="sm" color="inherit" />
                <span>Get Started</span>
              </button>
            </div>
          </div>
        </div>
        
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`<Icon icon={StarIcon} size="3xl" color="inherit" />`}
        </div>
      </div>
    </div>
  );
});

export const ResponsiveSizing = component$(() => {
  return (
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Responsive Sizing
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Icons that adapt automatically to different screen sizes
        </p>
      </div>

      <div class="space-y-6">
        {/* Responsive Examples */}
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">
              Standard (Non-Responsive)
            </h3>
            <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="flex items-center space-x-3">
                <Icon icon={SearchIcon} size="md" color="primary" />
                <span class="text-gray-900 dark:text-gray-100">Search</span>
              </div>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Same size on all devices
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-gray-100">
              Responsive (Adaptive)
            </h3>
            <div class="p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div class="flex items-center space-x-3">
                <Icon icon={SearchIcon} size="md" color="primary" responsive />
                <span class="text-gray-900 dark:text-gray-100">Search</span>
              </div>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Larger on mobile for better touch targets
            </div>
          </div>
        </div>

        {/* Device-Specific Guidelines */}
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Device-Specific Size Guidelines
          </h3>
          
          <div class="grid md:grid-cols-3 gap-4">
            <div class="space-y-2">
              <h4 class="font-medium text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                <Icon icon={UserIcon} size="sm" />
                <span>Mobile (≤ 768px)</span>
              </h4>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Minimum 44px touch targets</li>
                <li>• Larger icons for better visibility</li>
                <li>• Use responsive prop when possible</li>
              </ul>
            </div>
            
            <div class="space-y-2">
              <h4 class="font-medium text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                <Icon icon={SettingsIcon} size="sm" />
                <span>Tablet (768px - 1024px)</span>
              </h4>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Balanced sizing approach</li>
                <li>• Consider touch and mouse use</li>
                <li>• Medium to large sizes work well</li>
              </ul>
            </div>
            
            <div class="space-y-2">
              <h4 class="font-medium text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                <Icon icon={HomeIcon} size="sm" />
                <span>Desktop (≥ 1024px)</span>
              </h4>
              <ul class="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Precise cursor targeting</li>
                <li>• Can use smaller sizes effectively</li>
                <li>• Focus on visual hierarchy</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div class="space-y-4">
          <h3 class="font-semibold text-gray-900 dark:text-gray-100">
            Implementation Examples
          </h3>
          
          <div class="grid md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                Manual Responsive Classes
              </h4>
              <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
                {`<Icon 
  icon={SearchIcon} 
  size="sm" 
  class="md:w-6 md:h-6 lg:w-5 lg:h-5" 
/>`}
              </div>
            </div>
            
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                Automatic Responsive Prop
              </h4>
              <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
                {`<Icon 
  icon={SearchIcon} 
  size="md" 
  responsive 
/>`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export const SizingBestPractices = component$(() => {
  return (
    <div class="space-y-8">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Sizing Best Practices
        </h2>
        <p class="text-gray-600 dark:text-gray-400">
          Guidelines for effective icon sizing in your applications
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        {/* Do's */}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-success-600 dark:text-success-400">
            ✅ Best Practices
          </h3>
          
          <div class="space-y-4">
            <div class="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
              <h4 class="font-medium text-success-800 dark:text-success-200 mb-2">
                1. Maintain Visual Hierarchy
              </h4>
              <div class="flex items-center space-x-4 mb-2">
                <Icon icon={StarIcon} size="2xl" color="primary" />
                <Icon icon={HeartIcon} size="lg" color="secondary" />
                <Icon icon={CheckCircleIcon} size="md" color="success" />
              </div>
              <p class="text-sm text-success-700 dark:text-success-300">
                Use larger icons for primary actions, smaller for secondary
              </p>
            </div>

            <div class="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
              <h4 class="font-medium text-success-800 dark:text-success-200 mb-2">
                2. Consistent Context Sizing
              </h4>
              <div class="flex items-center space-x-3 mb-2">
                <Icon icon={HomeIcon} size="sm" />
                <Icon icon={UserIcon} size="sm" />
                <Icon icon={SettingsIcon} size="sm" />
              </div>
              <p class="text-sm text-success-700 dark:text-success-300">
                Use same size for icons in the same context (navigation, toolbars, etc.)
              </p>
            </div>

            <div class="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
              <h4 class="font-medium text-success-800 dark:text-success-200 mb-2">
                3. Touch-Friendly Mobile Sizes
              </h4>
              <div class="flex items-center space-x-3 mb-2">
                <Icon icon={UserIcon} size="lg" responsive interactive label="Profile" />
              </div>
              <p class="text-sm text-success-700 dark:text-success-300">
                Use responsive prop for interactive icons on mobile
              </p>
            </div>
          </div>
        </div>

        {/* Don'ts */}
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-error-600 dark:text-error-400">
            ❌ Common Mistakes
          </h3>
          
          <div class="space-y-4">
            <div class="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
              <h4 class="font-medium text-error-800 dark:text-error-200 mb-2">
                1. Inconsistent Sizing
              </h4>
              <div class="flex items-center space-x-4 mb-2">
                <Icon icon={HomeIcon} size="xs" />
                <Icon icon={UserIcon} size="xl" />
                <Icon icon={SettingsIcon} size="sm" />
              </div>
              <p class="text-sm text-error-700 dark:text-error-300">
                Mixing different sizes randomly creates visual chaos
              </p>
            </div>

            <div class="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
              <h4 class="font-medium text-error-800 dark:text-error-200 mb-2">
                2. Too Small for Touch
              </h4>
              <div class="flex items-center space-x-3 mb-2">
                <Icon icon={UserIcon} size="2xs" interactive label="Profile" />
              </div>
              <p class="text-sm text-error-700 dark:text-error-300">
                Interactive icons that are too small for comfortable touch interaction
              </p>
            </div>

            <div class="p-4 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg">
              <h4 class="font-medium text-error-800 dark:text-error-200 mb-2">
                3. Overwhelming Hero Icons
              </h4>
              <div class="flex items-center space-x-3 mb-2">
                <Icon icon={StarIcon} size="3xl" />
                <span class="text-sm">Regular text content</span>
              </div>
              <p class="text-sm text-error-700 dark:text-error-300">
                Using very large icons next to regular content creates imbalance
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6">
        <h3 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Size Reference
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div class="space-y-1">
            <div class="font-medium text-gray-900 dark:text-gray-100">Dense UI</div>
            <div class="text-gray-600 dark:text-gray-400">2xs, xs</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-gray-900 dark:text-gray-100">Standard UI</div>
            <div class="text-gray-600 dark:text-gray-400">sm, md</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-gray-900 dark:text-gray-100">Prominent UI</div>
            <div class="text-gray-600 dark:text-gray-400">lg, xl</div>
          </div>
          <div class="space-y-1">
            <div class="font-medium text-gray-900 dark:text-gray-100">Hero Sections</div>
            <div class="text-gray-600 dark:text-gray-400">2xl, 3xl</div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Main component that combines all examples
export default component$(() => {
  return (
    <div class="max-w-6xl mx-auto p-6 space-y-16">
      <div class="text-center border-b border-gray-200 dark:border-gray-700 pb-8">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Icon Sizes & Responsive Design
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Complete guide to icon sizing with responsive considerations for optimal 
          user experience across all devices and contexts.
        </p>
      </div>

      <AllSizes />
      <ContextualSizing />
      <ResponsiveSizing />
      <SizingBestPractices />
    </div>
  );
});