import { component$ } from "@builder.io/qwik";
import { ExamplesTemplate, type Example } from "~/components/Docs/templates";
import BasicAutocomplete from "../Examples/BasicAutocomplete";

/**
 * Autocomplete component examples documentation
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Autocomplete",
      description: "Simple autocomplete with static options and basic functionality. Shows how to implement filtering, selection, and value handling.",
      component: <BasicAutocomplete />,
      code: `import { component$, useSignal, $ } from "@builder.io/qwik";
import { Autocomplete } from "~/components/Core/Form";

export default component$(() => {
  const value = useSignal<string>("");
  
  const options = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ];

  return (
    <Autocomplete
      value={value.value}
      options={options}
      placeholder="Select a fruit..."
      onValueChange$={(newValue) => {
        value.value = newValue;
      }}
    />
  );
});`
    },
    {
      title: "Async Data Loading",
      description: "Demonstrates loading data from an API with debouncing, loading states, and error handling for dynamic autocomplete.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            This example shows how to implement async search with API calls:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`const searchUsers = $(async (query: string) => {
  if (query.length < 3) return;
  
  setLoading(true);
  try {
    const response = await fetch(\`/api/users?q=\${query}\`);
    const users = await response.json();
    setOptions(users.map(user => ({
      value: user.id,
      label: \`\${user.name} (\${user.email})\`
    })));
  } catch (error) {
    setError("Failed to load users");
  } finally {
    setLoading(false);
  }
});

<Autocomplete
  options={options.value}
  loading={loading.value}
  onInputChange$={searchUsers}
  minCharsToSearch={3}
  loadingText="Searching users..."
  placeholder="Search users..."
/>`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      title: "Form Integration",
      description: "Shows how to integrate Autocomplete with form validation, error handling, and submission in real-world scenarios.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Complete form integration example with validation:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`export default component$(() => {
  const formData = useStore({
    country: "",
    city: ""
  });
  const errors = useStore({
    country: "",
    city: ""
  });

  const validateField = $((field: string) => {
    if (field === "country" && !formData.country) {
      errors.country = "Please select a country";
    } else {
      errors.country = "";
    }
  });

  return (
    <form preventdefault:submit onSubmit$={handleSubmit}>
      <Autocomplete
        name="country"
        label="Country"
        required={true}
        value={formData.country}
        options={countries}
        error={errors.country}
        helperText="Select your country of residence"
        onValueChange$={(value) => {
          formData.country = value;
          validateField("country");
        }}
        onBlur$={() => validateField("country")}
      />
      
      <button type="submit">Submit</button>
    </form>
  );
});`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      title: "Custom Filtering & Highlighting",
      description: "Advanced filtering techniques including fuzzy search, custom scoring, and visual highlighting of matches.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Custom filter functions for advanced search capabilities:
          </p>
          <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
              <code>{`// Fuzzy search filter
const fuzzyFilter = $((option: AutocompleteOption, query: string) => {
  const optionLower = option.label.toLowerCase();
  const queryLower = query.toLowerCase();
  
  let queryIndex = 0;
  for (let i = 0; i < optionLower.length && queryIndex < queryLower.length; i++) {
    if (optionLower[i] === queryLower[queryIndex]) {
      queryIndex++;
    }
  }
  return queryIndex === queryLower.length;
});

// Multi-field search
const multiFieldFilter = $((option: AutocompleteOption, query: string) => {
  const searchText = \`\${option.label} \${option.value} \${option.group || ""}\`;
  return searchText.toLowerCase().includes(query.toLowerCase());
});

<Autocomplete
  options={products}
  filterFunction$={fuzzyFilter}
  highlightMatches={true}
  placeholder="Fuzzy search products..."
/>`}</code>
            </pre>
          </div>
        </div>
      )
    },
    {
      title: "Mobile-Optimized Design",
      description: "Mobile-first design patterns with touch-friendly interfaces, responsive sizing, and gesture support.",
      component: (
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Mobile optimization techniques for better touch experience:
          </p>
          <div class="space-y-4">
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
                Large Touch Targets
              </h4>
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`<Autocomplete
  size="lg"
  options={options}
  class="mobile:min-h-[44px]"
  placeholder="Mobile-friendly search..."
/>`}</code>
              </pre>
            </div>
            <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
                Responsive Positioning
              </h4>
              <pre class="text-sm text-text-default dark:text-text-dark-default overflow-x-auto">
                <code>{`<Autocomplete
  options={options}
  maxDropdownHeight="50vh"
  class="mobile-only:fixed mobile-only:bottom-0 mobile-only:left-0 mobile-only:right-0"
  placeholder="Full-screen mobile dropdown..."
/>`}</code>
              </pre>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <div class="mb-8">
        <p class="text-text-secondary dark:text-text-dark-secondary">
          The Autocomplete component offers extensive customization options for different use cases.
          These examples demonstrate key patterns from basic implementation to advanced features
          like async data loading, custom filtering, and mobile optimization.
        </p>
      </div>

      <div class="mb-8 rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-4">
        <h3 class="mb-2 font-medium text-info-800 dark:text-info-200">
          💡 Implementation Tips
        </h3>
        <ul class="space-y-1 text-sm text-info-700 dark:text-info-300">
          <li>• Debounce input changes for async searches (300-500ms recommended)</li>
          <li>• Use virtual scrolling for lists with 100+ items</li>
          <li>• Implement keyboard navigation for better accessibility</li>
          <li>• Cache frequently accessed data to improve performance</li>
          <li>• Test on actual mobile devices, not just browser dev tools</li>
        </ul>
      </div>

      <div class="rounded-lg border border-warning-200 dark:border-warning-800 bg-warning-50 dark:bg-warning-950 p-4">
        <h3 class="mb-2 font-medium text-warning-800 dark:text-warning-200">
          ⚠️ Common Pitfalls
        </h3>
        <ul class="space-y-1 text-sm text-warning-700 dark:text-warning-300">
          <li>• Not handling loading states properly</li>
          <li>• Making too many API requests without debouncing</li>
          <li>• Poor mobile dropdown positioning</li>
          <li>• Missing accessibility attributes</li>
          <li>• Not providing clear empty states</li>
        </ul>
      </div>
    </ExamplesTemplate>
  );
});