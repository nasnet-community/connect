import { component$ } from "@builder.io/qwik";
import { UsageTemplate, type UsageTemplateProps, type UsageGuideline, type BestPractice, type AccessibilityTip } from "../templates/UsageTemplate";

export interface NavigationGuideline extends UsageGuideline {
  doExample?: string;
  dontExample?: string;
}

export interface NavigationBestPractice extends BestPractice {
  category?: string;
  practices?: {
    title: string;
    description: string;
    code?: string;
  }[];
}

export interface NavigationUsageProps extends UsageTemplateProps {
  showAdvancedPatterns?: boolean;
  showPerformanceGuide?: boolean;
}

export const NavigationUsage = component$<NavigationUsageProps>(({
  showAdvancedPatterns = true,
  showPerformanceGuide = true,
  ...props
}) => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Structure Your Navigation Hierarchically",
      description: "Group related items under meaningful categories (Components > Form > Input)",
      type: "do"
    },
    {
      title: "Mix unrelated items or create overly deep nesting",
      description: "Avoid mixing unrelated items or creating more than 3-4 levels of nesting",
      type: "dont"
    },
    {
      title: "Use Descriptive Labels",
      description: "Use specific terms like 'API Reference', 'Getting Started', 'Installation Guide'",
      type: "do"
    },
    {
      title: "Use vague labels",
      description: "Avoid vague labels like 'Info', 'Stuff', 'Other' or overly long descriptions",
      type: "dont"
    },
    {
      title: "Maintain Consistent Categorization",
      description: "Group by functionality (Components, Utilities, Hooks) or by complexity (Basic, Advanced)",
      type: "do"
    },
    {
      title: "Mix categorization approaches",
      description: "Don't mix different categorization approaches within the same navigation level",
      type: "dont"
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Minimize Initial Categories",
      description: "Start with essential categories and lazy-load additional navigation items if needed."
    },
    {
      title: "Use Efficient Data Structures",
      description: "Structure navigation data to minimize re-renders and optimize for Qwik's resumability."
    },
    {
      title: "Provide Meaningful Labels",
      description: "Ensure all navigation items have descriptive labels for screen readers."
    },
    {
      title: "Sync with Router State",
      description: "Keep navigation active state in sync with your application's routing system."
    },
    {
      title: "Design for Touch",
      description: "Ensure navigation items have sufficient spacing for touch interaction."
    },
    {
      title: "Test on Real Devices",
      description: "Test navigation behavior on actual mobile devices, not just browser dev tools."
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Keyboard Navigation",
      description: "The component supports full keyboard navigation with Tab, Enter, Space, and Arrow keys. Built-in keyboard support requires no additional configuration."
    },
    {
      title: "Screen Reader Support", 
      description: "ARIA attributes are automatically applied for proper screen reader interaction. aria-expanded, aria-hidden, and role attributes are managed internally."
    },
    {
      title: "Focus Management",
      description: "Focus is properly managed when navigating between categories and links. Visual focus indicators and logical focus flow are provided."
    },
    {
      title: "High Contrast Mode",
      description: "The component respects system high contrast preferences. Use semantic colors from the Tailwind config for automatic contrast adjustment."
    }
  ];

  return (
    <div class="space-y-6">
      <UsageTemplate
        guidelines={guidelines}
        bestPractices={bestPractices}
        accessibilityTips={accessibilityTips}
        {...props}
      >
        <div class="space-y-4">
          <p>
            The Navigation component is designed to handle complex hierarchical navigation structures 
            while maintaining excellent performance and accessibility. Follow these guidelines to get 
            the most out of the component.
          </p>

          <div class="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-900/20">
            <h4 class="mb-2 font-semibold text-success-800 dark:text-success-200">
              Quick Start Checklist
            </h4>
            <ul class="space-y-1 text-sm text-success-700 dark:text-success-300">
              <li>✓ Structure navigation data hierarchically</li>
              <li>✓ Use descriptive, concise labels</li>
              <li>✓ Test on mobile devices</li>
              <li>✓ Verify keyboard accessibility</li>
              <li>✓ Sync with your router state</li>
            </ul>
          </div>
        </div>
      </UsageTemplate>

      {showAdvancedPatterns && (
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Advanced Patterns</h2>
          
          <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
                Dynamic Navigation Loading
              </h3>
              <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
                Load navigation items dynamically based on user permissions or context.
              </p>
              <pre class="rounded bg-gray-100 p-3 text-xs dark:bg-gray-800">
                <code>{`const categories = useResource$(async ({ track }) => {
  const user = track(userSignal);
  return await loadNavigationForUser(user);
});`}</code>
              </pre>
            </div>

            <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <h3 class="mb-2 font-semibold text-gray-900 dark:text-white">
                Search Integration
              </h3>
              <p class="mb-3 text-sm text-gray-600 dark:text-gray-300">
                Integrate search functionality with navigation filtering.
              </p>
              <pre class="rounded bg-gray-100 p-3 text-xs dark:bg-gray-800">
                <code>{`const filteredCategories = useComputed$(() => {
  return filterNavigation(categories, searchTerm.value);
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {showPerformanceGuide && (
        <div class="space-y-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Performance Optimization</h2>
          
          <div class="space-y-4">
            <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-900/20">
              <h3 class="mb-2 font-semibold text-warning-800 dark:text-warning-200">
                Memory Optimization
              </h3>
              <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
                <li>• Avoid deeply nested object structures (use flat arrays with references)</li>
                <li>• Use stable object references to prevent unnecessary re-renders</li>
                <li>• Consider virtual scrolling for navigation with 100+ items</li>
                <li>• Implement lazy loading for large navigation trees</li>
              </ul>
            </div>

            <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-900/20">
              <h3 class="mb-2 font-semibold text-info-800 dark:text-info-200">
                Bundle Size Optimization
              </h3>
              <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
                <li>• Import only the navigation components you need</li>
                <li>• Use code splitting for large navigation structures</li>
                <li>• Leverage Qwik's resumability for optimal initial load</li>
                <li>• Consider using the component's built-in lazy loading features</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});