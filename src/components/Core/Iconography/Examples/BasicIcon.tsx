import { component$ } from "@builder.io/qwik";
import Icon from "../Icon";
import { HomeIcon, SettingsIcon, UserIcon, CheckCircleIcon } from "../icons";

/**
 * BasicIcon - Fundamental icon usage patterns
 * 
 * Demonstrates the most common and essential ways to use the Icon component,
 * serving as a starting point for developers new to the system.
 */

export const BasicIconUsage = component$(() => {
  return (
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Basic Icon Usage
      </h3>
      
      {/* Simple Icons */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">
          1. Simple Icon Display
        </h4>
        <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Icon icon={HomeIcon} />
          <span class="text-gray-700 dark:text-gray-300">Default icon (medium size)</span>
        </div>
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`<Icon icon={HomeIcon} />`}
        </div>
      </div>

      {/* Icons with Labels */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">
          2. Icons with Accessibility Labels
        </h4>
        <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Icon icon={UserIcon} label="User profile" />
          <span class="text-gray-700 dark:text-gray-300">Icon with screen reader label</span>
        </div>
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`<Icon icon={UserIcon} label="User profile" />`}
        </div>
      </div>

      {/* Icons with Custom Classes */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">
          3. Icons with Custom Styling
        </h4>
        <div class="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <Icon 
            icon={CheckCircleIcon} 
            class="border-2 border-green-500 rounded-full p-1" 
          />
          <span class="text-gray-700 dark:text-gray-300">Icon with custom border and padding</span>
        </div>
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`<Icon 
  icon={CheckCircleIcon} 
  class="border-2 border-green-500 rounded-full p-1" 
/>`}
        </div>
      </div>
    </div>
  );
});

export const TextWithIcons = component$(() => {
  return (
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Text Integration
      </h3>
      
      {/* Inline Icons */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">
          1. Inline Icons with Text
        </h4>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p class="text-gray-700 dark:text-gray-300">
            Welcome to your dashboard{" "}
            <Icon icon={HomeIcon} size="sm" class="inline" />
            {" "}where you can manage your settings{" "}
            <Icon icon={SettingsIcon} size="sm" class="inline" />
            {" "}and view your profile.
          </p>
        </div>
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`<p>
  Welcome to your dashboard{" "}
  <Icon icon={HomeIcon} size="sm" class="inline" />
  {" "}where you can manage your settings{" "}
  <Icon icon={SettingsIcon} size="sm" class="inline" />
  {" "}and view your profile.
</p>`}
        </div>
      </div>

      {/* Leading Icons */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">
          2. Leading Icons
        </h4>
        <div class="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="flex items-center space-x-2">
            <Icon icon={HomeIcon} size="sm" />
            <span class="text-gray-700 dark:text-gray-300">Home Dashboard</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon icon={UserIcon} size="sm" />
            <span class="text-gray-700 dark:text-gray-300">User Profile</span>
          </div>
          <div class="flex items-center space-x-2">
            <Icon icon={SettingsIcon} size="sm" />
            <span class="text-gray-700 dark:text-gray-300">Account Settings</span>
          </div>
        </div>
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`<div class="flex items-center space-x-2">
  <Icon icon={HomeIcon} size="sm" />
  <span>Home Dashboard</span>
</div>`}
        </div>
      </div>

      {/* Trailing Icons */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">
          3. Trailing Icons
        </h4>
        <div class="space-y-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span class="text-gray-700 dark:text-gray-300">Navigate to Dashboard</span>
            <Icon icon={HomeIcon} size="sm" />
          </div>
          <div class="flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <span class="text-gray-700 dark:text-gray-300">View Profile</span>
            <Icon icon={UserIcon} size="sm" />
          </div>
        </div>
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`<div class="flex items-center justify-between">
  <span>Navigate to Dashboard</span>
  <Icon icon={HomeIcon} size="sm" />
</div>`}
        </div>
      </div>
    </div>
  );
});

export const DecorativeVsMeaningful = component$(() => {
  return (
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Decorative vs Meaningful Icons
      </h3>
      
      {/* Decorative Icons */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">
          1. Decorative Icons (No Label Required)
        </h4>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h5 class="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            <Icon icon={CheckCircleIcon} size="sm" color="success" />
            <span>Success Story</span>
          </h5>
          <p class="text-gray-600 dark:text-gray-400">
            In this case, the icon is purely decorative and doesn't convey additional meaning 
            beyond what the text already communicates.
          </p>
        </div>
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`{/* No label needed - text provides the meaning */}
<h5 class="flex items-center space-x-2">
  <Icon icon={CheckCircleIcon} size="sm" color="success" />
  <span>Success Story</span>
</h5>`}
        </div>
      </div>

      {/* Meaningful Icons */}
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-gray-100">
          2. Meaningful Icons (Label Required)
        </h4>
        <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div class="flex items-center space-x-4">
            <Icon 
              icon={UserIcon} 
              size="lg" 
              color="primary" 
              label="Edit user profile" 
              interactive
            />
            <Icon 
              icon={SettingsIcon} 
              size="lg" 
              color="on-surface-variant" 
              label="Open settings" 
              interactive
            />
            <Icon 
              icon={HomeIcon} 
              size="lg" 
              color="secondary" 
              label="Go to homepage" 
              interactive
            />
          </div>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">
            These icons function as buttons and need descriptive labels for screen readers.
          </p>
        </div>
        <div class="text-sm font-mono bg-gray-100 dark:bg-gray-900 p-3 rounded border">
          {`{/* Label required - icon conveys specific action */}
<Icon 
  icon={UserIcon} 
  size="lg" 
  color="primary" 
  label="Edit user profile" 
  interactive
/>`}
        </div>
      </div>
    </div>
  );
});

export const CommonMistakes = component$(() => {
  return (
    <div class="space-y-6">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Common Mistakes to Avoid
      </h3>
      
      <div class="grid md:grid-cols-2 gap-6">
        {/* Wrong Examples */}
        <div class="space-y-4">
          <h4 class="font-medium text-error-600 dark:text-error-400">
            ❌ Incorrect Usage
          </h4>
          
          <div class="space-y-3">
            <div class="p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded">
              <p class="text-sm text-error-800 dark:text-error-200 mb-2">
                Interactive icon without label:
              </p>
              <div class="font-mono text-xs bg-error-100 dark:bg-error-900/30 p-2 rounded">
                {`<Icon icon={SettingsIcon} interactive />`}
              </div>
            </div>
            
            <div class="p-3 bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded">
              <p class="text-sm text-error-800 dark:text-error-200 mb-2">
                Inconsistent sizes in same context:
              </p>
              <div class="font-mono text-xs bg-error-100 dark:bg-error-900/30 p-2 rounded">
                {`<Icon icon={HomeIcon} size="sm" />
<Icon icon={UserIcon} size="xl" />`}
              </div>
            </div>
          </div>
        </div>

        {/* Right Examples */}
        <div class="space-y-4">
          <h4 class="font-medium text-success-600 dark:text-success-400">
            ✅ Correct Usage
          </h4>
          
          <div class="space-y-3">
            <div class="p-3 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded">
              <p class="text-sm text-success-800 dark:text-success-200 mb-2">
                Interactive icon with descriptive label:
              </p>
              <div class="font-mono text-xs bg-success-100 dark:bg-success-900/30 p-2 rounded">
                {`<Icon 
  icon={SettingsIcon} 
  interactive 
  label="Open settings" 
/>`}
              </div>
            </div>
            
            <div class="p-3 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded">
              <p class="text-sm text-success-800 dark:text-success-200 mb-2">
                Consistent sizes in same context:
              </p>
              <div class="font-mono text-xs bg-success-100 dark:bg-success-900/30 p-2 rounded">
                {`<Icon icon={HomeIcon} size="sm" />
<Icon icon={UserIcon} size="sm" />`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Main component that combines all examples
export default component$(() => {
  return (
    <div class="max-w-4xl mx-auto p-6 space-y-12">
      <div class="text-center border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Basic Icon Examples
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Fundamental patterns for using icons effectively in your applications
        </p>
      </div>

      <BasicIconUsage />
      <TextWithIcons />
      <DecorativeVsMeaningful />
      <CommonMistakes />
    </div>
  );
});