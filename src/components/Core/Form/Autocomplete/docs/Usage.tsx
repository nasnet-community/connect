import { component$ } from "@builder.io/qwik";
import {
  UsageTemplate,
  type UsageGuideline,
  type BestPractice,
  type AccessibilityTip,
} from "~/components/Docs/templates";

/**
 * Autocomplete component usage guidelines and best practices
 */
export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Progressive Enhancement",
      description: "Start with a basic search experience and enhance with advanced features as needed.",
      example: "Begin with simple text filtering before adding async search or complex custom filters."
    },
    {
      title: "Performance Considerations", 
      description: "Optimize for large datasets using debouncing, virtual scrolling, and efficient filtering.",
      example: "Debounce search requests by 300ms and limit initial results to 50 items."
    },
    {
      title: "Mobile-First Design",
      description: "Ensure touch targets are at least 44px and dropdown positioning works on all viewports.",
      example: "Use size='lg' for mobile interfaces and test dropdown behavior on small screens."
    },
    {
      title: "Fallback Options",
      description: "Always provide fallback options when async data fails to load or no results are found.",
      example: "Show 'No results found' with an option to 'Search again' or 'View all items'."
    }
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "UX Design Best Practices",
      description: "Guidelines for creating intuitive autocomplete experiences",
      category: "UX Design",
      practices: [
        {
          title: "Provide Clear Feedback",
          description: "Show loading states, empty states, and error messages clearly.",
          correct: "Display a spinner with 'Loading...' text during async searches",
          incorrect: "Leave users wondering if their search is processing"
        },
        {
          title: "Highlight Search Matches",
          description: "Make it easy to see why an option matches the search query.",
          correct: "Highlight matching text within option labels",
          incorrect: "Show results without any visual indication of matches"
        },
        {
          title: "Limit Initial Options",
          description: "Don't overwhelm users with too many options at once.",
          correct: "Show 5-10 most relevant options initially",
          incorrect: "Display 100+ options without any prioritization"
        }
      ]
    },
    {
      title: "Performance Best Practices",
      description: "Optimize autocomplete for speed and efficiency",
      category: "Performance",
      practices: [
        {
          title: "Debounce Input Changes",
          description: "Prevent excessive API calls by debouncing user input.",
          correct: "Wait 300ms after user stops typing before searching",
          incorrect: "Make an API call for every keystroke"
        },
        {
          title: "Cache Results",
          description: "Cache search results to improve perceived performance.",
          correct: "Store recent searches and results for quick access",
          incorrect: "Re-fetch the same data repeatedly"
        },
        {
          title: "Optimize Rendering",
          description: "Use virtual scrolling for large option lists.",
          correct: "Render only visible options in the viewport",
          incorrect: "Render all 1000+ options at once"
        }
      ]
    },
    {
      title: "Accessibility Best Practices",
      description: "Ensure autocomplete is usable by everyone",
      category: "Accessibility",
      practices: [
        {
          title: "Keyboard Navigation",
          description: "Ensure full keyboard accessibility for all interactions.",
          correct: "Support arrow keys, Enter, Escape, and Tab navigation",
          incorrect: "Require mouse interaction for dropdown navigation"
        },
        {
          title: "Screen Reader Support",
          description: "Provide proper ARIA attributes and announcements.",
          correct: "Announce search results count and selected options",
          incorrect: "Rely only on visual feedback for state changes"
        },
        {
          title: "Focus Management",
          description: "Manage focus appropriately during interactions.",
          correct: "Return focus to input after option selection",
          incorrect: "Leave focus in an unclear state after interactions"
        }
      ]
    }
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "ARIA Labels",
      description: "Use proper ARIA attributes to describe the component's purpose and state.",
      implementation: `<Autocomplete
  ariaLabel="Search for products"
  aria-describedby="search-help"
  helperText="Type at least 3 characters to search"
/>`
    },
    {
      title: "Keyboard Support",
      description: "Implement comprehensive keyboard navigation following standard patterns.",
      implementation: `// Supported keyboard interactions:
// Arrow Up/Down: Navigate options
// Enter: Select highlighted option  
// Escape: Close dropdown
// Tab: Move to next form element`
    },
    {
      title: "Status Announcements",
      description: "Announce important state changes to screen readers.",
      implementation: `// Use live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {loading ? "Loading results..." : \`\${results.length} results found\`}
</div>`
    },
    {
      title: "Error Handling",
      description: "Provide clear error messages that are accessible to all users.",
      implementation: `<Autocomplete
  error="Unable to load results. Please try again."
  aria-invalid={!!error}
  aria-describedby="error-message"
/>`
    }
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
    >
      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          When to Use Autocomplete
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-success-200 dark:border-success-800 bg-success-50 dark:bg-success-950 p-4">
            <h3 class="mb-2 font-medium text-success-800 dark:text-success-200">
              ✅ Use When
            </h3>
            <ul class="space-y-1 text-sm text-success-700 dark:text-success-300">
              <li>• You have 10+ options to choose from</li>
              <li>• Users need to search through data</li>
              <li>• Options come from an API or database</li>
              <li>• You want to save space in your UI</li>
              <li>• Users need to filter large datasets</li>
            </ul>
          </div>
          
          <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
            <h3 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
              ⚠️ Consider Alternatives When
            </h3>
            <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
              <li>• You have fewer than 5 options (use RadioGroup)</li>
              <li>• Making a binary choice (use Checkbox/Toggle)</li>
              <li>• Options are well-known to users (use Select)</li>
              <li>• Requiring exact selections only</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Implementation Patterns
        </h2>
        
        <div class="space-y-6">
          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Static Data Search
            </h3>
            <p class="mb-3 text-text-secondary dark:text-text-dark-secondary">
              For searches within a known, static dataset that doesn't change frequently.
            </p>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const countries = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  // ... more countries
];

<Autocomplete
  options={countries}
  placeholder="Select country..."
  filterOptions={true}
  highlightMatches={true}
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Async API Integration
            </h3>
            <p class="mb-3 text-text-secondary dark:text-text-dark-secondary">
              For dynamic searches that fetch data from APIs based on user input.
            </p>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`const searchProducts = $(async (query: string) => {
  if (query.length < 3) return;
  
  setLoading(true);
  try {
    const response = await fetch(\`/api/products?q=\${query}\`);
    const products = await response.json();
    setOptions(products);
  } catch (error) {
    setError("Failed to search products");
  } finally {
    setLoading(false);
  }
});

<Autocomplete
  options={options.value}
  loading={loading.value}
  onInputChange$={searchProducts}
  minCharsToSearch={3}
  loadingText="Searching products..."
/>`}</code>
              </pre>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-medium text-text-default dark:text-text-dark-default">
              Form Integration
            </h3>
            <p class="mb-3 text-text-secondary dark:text-text-dark-secondary">
              Integrating autocomplete with form validation and state management.
            </p>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`<Autocomplete
  name="product"
  required={true}
  value={formData.product}
  onValueChange$={(value) => {
    formData.product = value;
    validateField("product");
  }}
  error={errors.product}
  helperText="Select a product from the catalog"
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-8">
        <h2 class="mb-4 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Mobile Optimization Tips
        </h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-3">
            <h3 class="font-medium text-text-default dark:text-text-dark-default">
              Touch Interactions
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Use larger touch targets (min 44px height)</li>
              <li>• Provide visual feedback for touch events</li>
              <li>• Consider thumb-friendly positioning</li>
              <li>• Test on actual devices, not just emulators</li>
            </ul>
          </div>
          <div class="space-y-3">
            <h3 class="font-medium text-text-default dark:text-text-dark-default">
              Performance on Mobile
            </h3>
            <ul class="space-y-2 text-sm text-text-secondary dark:text-text-dark-secondary">
              <li>• Debounce aggressively (400-500ms)</li>
              <li>• Limit initial result count</li>
              <li>• Use virtual scrolling for long lists</li>
              <li>• Cache frequently accessed data</li>
            </ul>
          </div>
        </div>
      </div>
    </UsageTemplate>
  );
});