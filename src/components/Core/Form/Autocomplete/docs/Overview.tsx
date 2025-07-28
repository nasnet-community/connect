import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";

/**
 * Autocomplete component overview documentation
 */
export default component$(() => {
  return (
    <OverviewTemplate
      title="Autocomplete"
      description="A flexible autocomplete input component that provides intelligent search and selection capabilities with support for async data loading, custom filtering, and mobile-optimized interactions."
      features={[
        {
          icon: "🔍",
          title: "Smart Search",
          description: "Intelligent filtering with customizable search algorithms and highlight matching."
        },
        {
          icon: "📱",
          title: "Mobile Optimized", 
          description: "Touch-friendly interface with responsive dropdown positioning and gesture support."
        },
        {
          icon: "⚡",
          title: "Async Support",
          description: "Built-in support for loading remote data with loading states and error handling."
        },
        {
          icon: "🎨",
          title: "Customizable",
          description: "Extensive theming options with dark mode support and flexible styling."
        },
        {
          icon: "♿",
          title: "Accessible",
          description: "Full keyboard navigation, screen reader support, and ARIA compliance."
        },
        {
          icon: "🌐",
          title: "Internationalization",
          description: "RTL support and customizable text labels for global applications."
        }
      ]}
      whenToUse={[
        "Perfect for implementing search functionality with suggestions and auto-completion",
        "Ideal for selecting from large datasets with filtering and pagination support",
        "Enhance traditional select inputs with search capabilities and better UX",
        "Connect to REST APIs or GraphQL endpoints for dynamic option loading"
      ]}
      keyFeatures={[
        {
          icon: "⚡",
          title: "Performance First",
          description: "Optimized for large datasets with virtual scrolling and efficient rendering."
        },
        {
          icon: "📱",
          title: "Mobile Experience",
          description: "Designed with mobile-first approach for optimal touch interactions."
        },
        {
          icon: "♿",
          title: "Accessibility",
          description: "Follows WCAG guidelines with comprehensive keyboard and screen reader support."
        },
        {
          icon: "🎨",
          title: "Flexibility", 
          description: "Configurable behavior for different use cases while maintaining consistency."
        }
      ]}
    >
      <div class="mt-8 space-y-6">
        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Key Features
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
              <h4 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
                Intelligent Filtering
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Built-in fuzzy search with customizable filter functions. Supports prefix matching, 
                substring matching, and custom scoring algorithms.
              </p>
            </div>
            <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
              <h4 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
                Responsive Design
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Adaptive dropdown positioning that works on all screen sizes. Optimized touch targets 
                and gesture support for mobile devices.
              </p>
            </div>
            <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
              <h4 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
                Async Data Loading
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Seamless integration with APIs, debounced requests, loading states, and error handling
                for dynamic data sources.
              </p>
            </div>
            <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4">
              <h4 class="mb-2 font-medium text-text-default dark:text-text-dark-default">
                Keyboard Navigation
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Full keyboard support with arrow keys, Enter/Escape handling, and Tab navigation.
                Compliant with accessibility standards.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            When to Use
          </h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-success-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Large Option Sets
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  When you have more than 10-15 options that would be unwieldy in a standard select.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-success-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Search-Heavy Workflows
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  For applications where users frequently search or filter data.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-success-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Dynamic Data Sources
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  When options need to be loaded from APIs or change based on user input.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            When Not to Use
          </h3>
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-warning-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Simple Selection
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  For simple selections with fewer than 10 known options, use a standard Select.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 h-2 w-2 rounded-full bg-warning-500"></div>
              <div>
                <p class="font-medium text-text-default dark:text-text-dark-default">
                  Binary Choices
                </p>
                <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                  For yes/no or on/off selections, use Checkbox, RadioGroup, or Toggle components.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OverviewTemplate>
  );
});