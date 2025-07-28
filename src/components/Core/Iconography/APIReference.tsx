import { component$ } from "@builder.io/qwik";
import Icon from "./Icon";
import { 
  HomeIcon, 
  SettingsIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  InfoIcon,
  ArrowRightIcon 
} from "./icons";

/**
 * APIReference component for the Icon system.
 * 
 * This component provides an interactive reference for all Icon component
 * props, types, and usage patterns. It serves as both documentation and
 * a live testing environment for the Icon component.
 */
export const APIReference = component$(() => {
  return (
    <div class="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div class="border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Icon Component API Reference
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Interactive documentation and examples for the Icon component with comprehensive prop coverage.
        </p>
      </div>

      {/* Required Props */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Required Props
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              icon: Component
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              The icon component to display - pass the icon component directly without wrapping
            </p>
            <div class="flex items-center space-x-4 p-4 bg-white dark:bg-gray-900 rounded border">
              <Icon icon={HomeIcon} />
              <code class="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                icon={`{HomeIcon}`}
              </code>
            </div>
          </div>
        </div>
      </section>

      {/* Size Prop */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Size Prop
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              size?: IconSize = "md"
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Size of the icon with extended size options: "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
            </p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { size: "2xs", label: "2xs (10px)" },
              { size: "xs", label: "xs (12px)" },
              { size: "sm", label: "sm (16px)" },
              { size: "md", label: "md (20px)" },
              { size: "lg", label: "lg (24px)" },
              { size: "xl", label: "xl (32px)" },
              { size: "2xl", label: "2xl (40px)" },
              { size: "3xl", label: "3xl (48px)" },
            ].map(({ size, label }) => (
              <div key={size} class="flex flex-col items-center space-y-2 p-3 bg-white dark:bg-gray-900 rounded border">
                <Icon icon={SettingsIcon} size={size as any} />
                <span class="text-xs text-gray-600 dark:text-gray-400 text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Prop */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Color Prop
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <div class="space-y-2">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              color?: IconColor = "current"
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Color variant for the icon with comprehensive theme support
            </p>
          </div>
          
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { color: "current", label: "current", icon: HomeIcon },
              { color: "primary", label: "primary", icon: SettingsIcon },
              { color: "secondary", label: "secondary", icon: InfoIcon },
              { color: "success", label: "success", icon: CheckCircleIcon },
              { color: "warning", label: "warning", icon: InfoIcon },
              { color: "error", label: "error", icon: XCircleIcon },
              { color: "info", label: "info", icon: InfoIcon },
              { color: "muted", label: "muted", icon: HomeIcon },
              { color: "on-surface", label: "on-surface", icon: ArrowRightIcon },
              { color: "on-surface-variant", label: "on-surface-variant", icon: ArrowRightIcon },
              { color: "inverse", label: "inverse", icon: HomeIcon },
            ].map(({ color, label, icon }) => (
              <div key={color} class="flex flex-col items-center space-y-2 p-3 bg-white dark:bg-gray-900 rounded border">
                <Icon icon={icon} color={color as any} size="lg" />
                <span class="text-xs text-gray-600 dark:text-gray-400 text-center">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boolean Props */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Boolean Props
        </h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          {/* Fixed Width */}
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              fixedWidth?: boolean = false
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Whether the icon should have a fixed width (useful for alignment)
            </p>
            
            <div class="space-y-2">
              <div class="flex items-center">
                <Icon icon={HomeIcon} size="sm" />
                <span class="ml-2 text-sm">Home</span>
              </div>
              <div class="flex items-center">
                <Icon icon={SettingsIcon} size="sm" />
                <span class="ml-2 text-sm">Settings</span>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Without fixedWidth
              </div>
            </div>
            
            <div class="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-600">
              <div class="flex items-center">
                <Icon icon={HomeIcon} size="sm" fixedWidth />
                <span class="ml-2 text-sm">Home</span>
              </div>
              <div class="flex items-center">
                <Icon icon={SettingsIcon} size="sm" fixedWidth />
                <span class="ml-2 text-sm">Settings</span>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                With fixedWidth
              </div>
            </div>
          </div>

          {/* Responsive */}
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              responsive?: boolean = false
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Enable responsive sizing that adapts to different screen sizes
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <Icon icon={HomeIcon} size="md" />
                <span class="text-sm">Standard sizing</span>
              </div>
              <div class="flex items-center space-x-4">
                <Icon icon={HomeIcon} size="md" responsive />
                <span class="text-sm">Responsive sizing</span>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Responsive icons adapt to screen size automatically
              </div>
            </div>
          </div>

          {/* Interactive */}
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              interactive?: boolean = false
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Enable interactive behavior with hover, focus, and active states
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <Icon icon={SettingsIcon} size="lg" />
                <span class="text-sm">Static icon</span>
              </div>
              <div class="flex items-center space-x-4">
                <Icon 
                  icon={SettingsIcon} 
                  size="lg" 
                  interactive 
                  label="Settings"
                />
                <span class="text-sm">Interactive icon (hover me!)</span>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Interactive icons have hover, focus, and touch states
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* String Props */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          String Props
        </h2>
        
        <div class="grid md:grid-cols-2 gap-6">
          {/* Class Prop */}
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              class?: string
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Additional CSS classes to apply to the icon
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <Icon icon={HomeIcon} size="lg" />
                <span class="text-sm">No custom classes</span>
              </div>
              <div class="flex items-center space-x-4">
                <Icon 
                  icon={HomeIcon} 
                  size="lg" 
                  class="border-2 border-primary-500 rounded p-1"
                />
                <span class="text-sm">With border classes</span>
              </div>
              <div class="flex items-center space-x-4">
                <Icon 
                  icon={HomeIcon} 
                  size="lg" 
                  class="transform rotate-45 hover:rotate-90 transition-transform"
                />
                <span class="text-sm">With transform classes</span>
              </div>
            </div>
          </div>

          {/* Label Prop */}
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">
              label?: string
            </h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Accessible label for the icon (for screen readers)
            </p>
            
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <Icon icon={CheckCircleIcon} color="success" size="lg" />
                <span class="text-sm">Decorative icon (no label)</span>
              </div>
              <div class="flex items-center space-x-4">
                <Icon 
                  icon={CheckCircleIcon} 
                  color="success" 
                  size="lg" 
                  label="Operation successful"
                />
                <span class="text-sm">Meaningful icon (with label)</span>
              </div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                Labels make icons accessible to screen readers
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Extended HTML Attributes */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Extended HTML Attributes
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
          <p class="text-gray-600 dark:text-gray-400">
            The Icon component extends the native span element and accepts all standard HTML attributes 
            except `children` and `size`.
          </p>
          
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <Icon 
                icon={InfoIcon} 
                size="lg" 
                color="info"
                onClick$={() => alert('Icon clicked!')}
                style={{ cursor: 'pointer' }}
                title="Click me for info"
              />
              <span class="text-sm">
                Icon with onClick$, style, and title attributes
              </span>
            </div>
            
            <div class="flex items-center space-x-4">
              <Icon 
                icon={SettingsIcon} 
                size="lg" 
                onMouseEnter$={() => console.log('Mouse entered')}
                onMouseLeave$={() => console.log('Mouse left')}
                data-testid="settings-icon"
              />
              <span class="text-sm">
                Icon with mouse events and data attributes
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section class="space-y-4">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Complete Usage Examples
        </h2>
        
        <div class="space-y-6">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Basic Icon
            </h3>
            <div class="flex items-center space-x-4 mb-4">
              <Icon icon={HomeIcon} />
              <code class="text-sm bg-white dark:bg-gray-900 px-3 py-2 rounded border">
                &lt;Icon icon={`{HomeIcon}`} /&gt;
              </code>
            </div>
          </div>

          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              Fully Configured Icon
            </h3>
            <div class="flex items-center space-x-4 mb-4">
              <Icon 
                icon={CheckCircleIcon}
                size="xl"
                color="success"
                responsive
                interactive
                label="Success indicator"
                class="transform hover:scale-110 transition-transform"
              />
              <div class="text-sm bg-white dark:bg-gray-900 px-3 py-2 rounded border font-mono">
                {`<Icon 
  icon={CheckCircleIcon}
  size="xl"
  color="success" 
  responsive
  interactive
  label="Success indicator"
  class="transform hover:scale-110 transition-transform"
/>`}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default APIReference;