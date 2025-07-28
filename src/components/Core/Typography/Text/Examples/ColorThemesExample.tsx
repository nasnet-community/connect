import { component$ } from "@builder.io/qwik";
import { Text } from "../Text";

/**
 * Color Themes Example - Demonstrates all color variants and dark mode support
 */
export const ColorThemesExample = component$(() => {
  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <Text variant="body" size="lg" weight="semibold">Color Themes Example</Text>
        
        <Text color="secondary">
          This example showcases all available color variants and demonstrates how they 
          automatically adapt to light and dark themes.
        </Text>
      </div>

      {/* Primary Color Hierarchy */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Primary Color Hierarchy</Text>
        <div class="space-y-3 border-l-4 border-gray-500 pl-4">
          <Text color="primary" size="lg" weight="semibold">
            Primary Text - Main content and headings
          </Text>
          <Text color="secondary">
            Secondary Text - Supporting content and descriptions
          </Text>
          <Text color="tertiary">
            Tertiary Text - Less important information and metadata
          </Text>
          <Text color="subtle">
            Subtle Text - Placeholders and disabled states
          </Text>
        </div>
      </div>

      {/* Semantic Colors */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Semantic Colors</Text>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Success */}
          <div class="p-4 border border-green-200 dark:border-green-800 rounded">
            <Text color="success" weight="semibold" class="flex items-center gap-2">
              <span>✅</span> Success State
            </Text>
            <Text color="success" size="sm" class="mt-1">
              Operation completed successfully
            </Text>
          </div>

          {/* Warning */}
          <div class="p-4 border border-yellow-200 dark:border-yellow-800 rounded">
            <Text color="warning" weight="semibold" class="flex items-center gap-2">
              <span>⚠️</span> Warning State
            </Text>
            <Text color="warning" size="sm" class="mt-1">
              Please review before proceeding
            </Text>
          </div>

          {/* Error */}
          <div class="p-4 border border-red-200 dark:border-red-800 rounded">
            <Text color="error" weight="semibold" class="flex items-center gap-2">
              <span>❌</span> Error State
            </Text>
            <Text color="error" size="sm" class="mt-1">
              An error occurred during processing
            </Text>
          </div>

          {/* Info */}
          <div class="p-4 border border-cyan-200 dark:border-cyan-800 rounded">
            <Text color="info" weight="semibold" class="flex items-center gap-2">
              <span>ℹ️</span> Info State
            </Text>
            <Text color="info" size="sm" class="mt-1">
              Additional information available
            </Text>
          </div>
        </div>
      </div>

      {/* Accent Colors */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Accent & Interactive Colors</Text>
        <div class="space-y-3 border-l-4 border-blue-500 pl-4">
          <Text color="accent" weight="semibold">
            Accent Text - Links, CTAs, and interactive elements
          </Text>
          <Text color="accent" decoration="underline">
            This is a link with accent color and underline
          </Text>
          <Text 
            color="accent" 
            onClick$={() => alert('Clicked!')}
            class="cursor-pointer"
          >
            Clickable accent text with hover effects
          </Text>
        </div>
      </div>

      {/* Inverse Colors */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Inverse Colors</Text>
        <div class="p-4 bg-gray-900 dark:bg-gray-100 rounded">
          <Text color="inverse" weight="semibold" size="lg">
            Inverse Text on Dark Background
          </Text>
          <Text color="inverse" class="mt-2">
            This text automatically inverts its color based on the background, 
            ensuring readability in both light and dark themes.
          </Text>
        </div>
      </div>

      {/* Color Combinations in Context */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Color Combinations in Context</Text>
        
        {/* Card Example */}
        <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4">
          <Text color="primary" weight="semibold" size="lg">
            User Profile Card
          </Text>
          
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            <div>
              <Text color="primary" weight="medium">John Doe</Text>
              <Text color="secondary" size="sm">Software Engineer</Text>
            </div>
          </div>
          
          <div class="space-y-2">
            <div class="flex justify-between">
              <Text color="tertiary" size="sm">Status</Text>
              <Text color="success" size="sm" weight="medium">Active</Text>
            </div>
            <div class="flex justify-between">
              <Text color="tertiary" size="sm">Last Login</Text>
              <Text color="secondary" size="sm">2 hours ago</Text>
            </div>
            <div class="flex justify-between">
              <Text color="tertiary" size="sm">Role</Text>
              <Text color="accent" size="sm" weight="medium">Administrator</Text>
            </div>
          </div>
        </div>

        {/* Alert Examples */}
        <div class="space-y-3">
          <div class="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded">
            <Text color="success" weight="semibold">Account Verified</Text>
            <Text color="success" size="sm" class="mt-1">
              Your email address has been successfully verified.
            </Text>
          </div>

          <div class="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded">
            <Text color="warning" weight="semibold">Storage Almost Full</Text>
            <Text color="warning" size="sm" class="mt-1">
              You're using 95% of your available storage space.
            </Text>
          </div>

          <div class="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded">
            <Text color="error" weight="semibold">Connection Failed</Text>
            <Text color="error" size="sm" class="mt-1">
              Unable to connect to the server. Please try again.
            </Text>
          </div>

          <div class="p-4 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded">
            <Text color="info" weight="semibold">New Feature Available</Text>
            <Text color="info" size="sm" class="mt-1">
              Check out our latest dashboard improvements.
            </Text>
          </div>
        </div>
      </div>

      {/* Dark Mode Toggle Indicator */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Theme Adaptation</Text>
        <div class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded">
          <Text color="primary" weight="medium" class="mb-2">
            Current Theme Detection:
          </Text>
          <div class="space-y-1">
            <Text color="secondary" size="sm" class="dark:hidden">
              🌅 Light theme is currently active
            </Text>
            <Text color="secondary" size="sm" class="hidden dark:block">
              🌙 Dark theme is currently active
            </Text>
          </div>
          <Text color="tertiary" size="sm" class="mt-3">
            All text colors automatically adapt to provide optimal contrast and readability.
          </Text>
        </div>
      </div>

      {/* Color Accessibility */}
      <div class="space-y-4">
        <Text variant="label" weight="semibold" color="accent">Color Accessibility</Text>
        <div class="border-l-4 border-purple-500 pl-4 space-y-3">
          <Text color="primary">
            All text colors meet WCAG 2.1 AA contrast requirements for optimal accessibility.
          </Text>
          <Text color="secondary" size="sm">
            Colors automatically adjust in dark mode to maintain proper contrast ratios.
          </Text>
          <Text color="subtle" size="sm">
            Even subtle text maintains sufficient contrast for users with visual impairments.
          </Text>
        </div>
      </div>

      <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-900 rounded">
        <Text size="sm" color="tertiary">
          <Text weight="semibold">🎨 Design System Tip:</Text> Use semantic colors (success, warning, error, info) 
          for system feedback, primary hierarchy for content importance, and accent colors for interactive elements. 
          All colors automatically adapt to light and dark themes.
        </Text>
      </div>
    </div>
  );
});

export default ColorThemesExample;