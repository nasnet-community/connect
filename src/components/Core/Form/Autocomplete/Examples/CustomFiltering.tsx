import { component$, useSignal, $ } from "@builder.io/qwik";
import { Autocomplete } from "../Autocomplete";
import type { AutocompleteOption } from "../Autocomplete.types";

/**
 * Custom Filtering Example
 * 
 * Demonstrates advanced filtering techniques including fuzzy search,
 * multi-field search, prefix matching, and custom scoring algorithms.
 */

// Rich dataset for demonstrating various filter types
const employees: AutocompleteOption[] = [
  { value: "john_doe", label: "John Doe", group: "Engineering" },
  { value: "jane_smith", label: "Jane Smith", group: "Design" },
  { value: "robert_johnson", label: "Robert Johnson", group: "Engineering" },
  { value: "emily_davis", label: "Emily Davis", group: "Product" },
  { value: "michael_wilson", label: "Michael Wilson", group: "Marketing" },
  { value: "sarah_brown", label: "Sarah Brown", group: "Engineering" },
  { value: "david_jones", label: "David Jones", group: "Sales" },
  { value: "lisa_garcia", label: "Lisa Garcia", group: "Design" },
  { value: "christopher_miller", label: "Christopher Miller", group: "Engineering" },
  { value: "amanda_davis", label: "Amanda Davis", group: "HR" },
];

const products = [
  { id: "macbook_pro", name: "MacBook Pro 16\"", category: "Laptops", brand: "Apple", tags: ["laptop", "professional", "design"] },
  { id: "iphone_14", name: "iPhone 14 Pro", category: "Smartphones", brand: "Apple", tags: ["phone", "mobile", "camera"] },
  { id: "surface_laptop", name: "Surface Laptop Studio", category: "Laptops", brand: "Microsoft", tags: ["laptop", "touchscreen", "creative"] },
  { id: "galaxy_s23", name: "Galaxy S23 Ultra", category: "Smartphones", brand: "Samsung", tags: ["phone", "android", "camera"] },
  { id: "pixel_7", name: "Pixel 7 Pro", category: "Smartphones", brand: "Google", tags: ["phone", "android", "pure"] },
  { id: "thinkpad_x1", name: "ThinkPad X1 Carbon", category: "Laptops", brand: "Lenovo", tags: ["laptop", "business", "lightweight"] },
  { id: "xps_13", name: "XPS 13 Plus", category: "Laptops", brand: "Dell", tags: ["laptop", "premium", "ultrabook"] },
  { id: "airpods_pro", name: "AirPods Pro 2", category: "Audio", brand: "Apple", tags: ["earbuds", "wireless", "noise-cancelling"] },
];

const productOptions: AutocompleteOption[] = products.map(product => ({
  value: product.id,
  label: product.name,
  group: product.category,
}));

export default component$(() => {
  // State for different filtering examples
  const fuzzyValue = useSignal("");
  const prefixValue = useSignal("");
  const multiFieldValue = useSignal("");
  const scoredValue = useSignal("");
  const groupFilterValue = useSignal("");

  // Fuzzy search filter - allows characters to be out of order
  const fuzzyFilter = $((option: AutocompleteOption, query: string): boolean => {
    if (!query) return true;
    
    const optionText = option.label.toLowerCase();
    const queryText = query.toLowerCase();
    
    let queryIndex = 0;
    for (let i = 0; i < optionText.length && queryIndex < queryText.length; i++) {
      if (optionText[i] === queryText[queryIndex]) {
        queryIndex++;
      }
    }
    
    return queryIndex === queryText.length;
  });

  // Prefix-only filter - only matches from the beginning of words
  const prefixFilter = $((option: AutocompleteOption, query: string): boolean => {
    if (!query) return true;
    
    const words = option.label.toLowerCase().split(/\s+/);
    const queryLower = query.toLowerCase();
    
    return words.some(word => word.startsWith(queryLower));
  });

  // Multi-field search - searches across multiple properties
  const multiFieldFilter = $((option: AutocompleteOption, query: string): boolean => {
    if (!query) return true;
    
    const queryLower = query.toLowerCase();
    const product = products.find(p => p.id === option.value);
    
    if (!product) return false;
    
    // Search across name, category, brand, and tags
    const searchableText = [
      product.name,
      product.category,
      product.brand,
      ...product.tags
    ].join(' ').toLowerCase();
    
    return searchableText.includes(queryLower);
  });

  // Scored filter - provides ranking based on match quality
  const scoredFilter = $((option: AutocompleteOption, query: string): boolean => {
    if (!query) return true;
    
    const optionLower = option.label.toLowerCase();
    const queryLower = query.toLowerCase();
    
    // Score based on different match types
    let score = 0;
    
    // Exact match gets highest score
    if (optionLower === queryLower) score += 100;
    
    // Starts with query gets high score
    if (optionLower.startsWith(queryLower)) score += 50;
    
    // Contains query gets medium score
    if (optionLower.includes(queryLower)) score += 25;
    
    // Word boundary match gets bonus
    const words = optionLower.split(/\s+/);
    if (words.some(word => word.startsWith(queryLower))) score += 10;
    
    // Group relevance bonus
    if (option.group && option.group.toLowerCase().includes(queryLower)) score += 5;
    
    return score > 0;
  });

  // Group-based filter - prioritizes matches within specific groups
  const groupFilter = $((option: AutocompleteOption, query: string): boolean => {
    if (!query) return true;
    
    const queryLower = query.toLowerCase();
    const optionLower = option.label.toLowerCase();
    const groupLower = option.group?.toLowerCase() || '';
    
    // If query matches group, show all items in that group
    if (groupLower.includes(queryLower)) return true;
    
    // Otherwise, standard text matching
    return optionLower.includes(queryLower);
  });

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Custom Filtering Examples
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Advanced filtering techniques for different search scenarios and user behaviors.
        </p>
      </div>

      {/* Fuzzy Search */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Fuzzy Search Filter
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Matches even when characters are out of order. Try typing "jdoe" to match "John Doe".
          </p>
        </div>
        
        <Autocomplete
          value={fuzzyValue.value}
          options={employees}
          filterFunction$={fuzzyFilter}
          label="Employee Search (Fuzzy)"
          placeholder="Try typing 'jdoe' or 'emlv'"
          helperText="Characters can be out of order - forgiving search"
          highlightMatches={true}
          onValueChange$={(value) => {
            fuzzyValue.value = value;
          }}
          class="max-w-md"
        />

        {fuzzyValue.value && (
          <div class="rounded-md bg-info-50 dark:bg-info-950 border border-info-200 dark:border-info-800 p-3">
            <p class="text-sm text-info-800 dark:text-info-200">
              Selected: {employees.find(emp => emp.value === fuzzyValue.value)?.label}
              {employees.find(emp => emp.value === fuzzyValue.value)?.group && (
                <span class="ml-2 text-info-600 dark:text-info-400">
                  ({employees.find(emp => emp.value === fuzzyValue.value)?.group})
                </span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Prefix-Only Filter */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Prefix-Only Filter
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Only matches from the beginning of words. More strict than substring matching.
          </p>
        </div>

        <Autocomplete
          value={prefixValue.value}
          options={employees}
          filterFunction$={prefixFilter}
          label="Employee Search (Prefix)"
          placeholder="Type 'John' or 'Sm' to see matches"
          helperText="Matches only at word boundaries"
          highlightMatches={true}
          onValueChange$={(value) => {
            prefixValue.value = value;
          }}
          class="max-w-md"
        />

        {prefixValue.value && (
          <div class="rounded-md bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800 p-3">
            <p class="text-sm text-success-800 dark:text-success-200">
              Selected: {employees.find(emp => emp.value === prefixValue.value)?.label}
            </p>
          </div>
        )}
      </div>

      {/* Multi-Field Search */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Multi-Field Search
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Searches across name, category, brand, and tags. Try "apple", "laptop", or "camera".
          </p>
        </div>

        <Autocomplete
          value={multiFieldValue.value}
          options={productOptions}
          filterFunction$={multiFieldFilter}
          label="Product Search (Multi-Field)"
          placeholder="Search by name, brand, category, or features"
          helperText="Searches across all product attributes"
          highlightMatches={true}
          onValueChange$={(value) => {
            multiFieldValue.value = value;
          }}
          class="max-w-md"
        />

        {multiFieldValue.value && (
          <div class="rounded-md bg-warning-50 dark:bg-warning-950 border border-warning-200 dark:border-warning-800 p-3">
            <p class="text-sm text-warning-800 dark:text-warning-200">
              Selected: {productOptions.find(opt => opt.value === multiFieldValue.value)?.label}
              <br />
              <span class="text-xs">
                Product details: {(() => {
                  const product = products.find(p => p.id === multiFieldValue.value);
                  return product ? `${product.brand} - ${product.category} - Tags: ${product.tags.join(', ')}` : '';
                })()}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Scored Filter */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark-text-text-dark-default">
            Relevance Scoring Filter
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Ranks results by relevance: exact matches first, then prefix matches, then contains.
          </p>
        </div>

        <Autocomplete
          value={scoredValue.value}
          options={employees}
          filterFunction$={scoredFilter}
          label="Employee Search (Scored)"
          placeholder="Try 'John', 'doe', or 'engineering'"
          helperText="Results ordered by match relevance"
          highlightMatches={true}
          onValueChange$={(value) => {
            scoredValue.value = value;
          }}
          class="max-w-md"
        />

        <div class="text-xs text-text-secondary dark:text-text-dark-secondary">
          <p><strong>Scoring system:</strong></p>
          <ul class="mt-1 space-y-0.5 ml-4">
            <li>• Exact match: +100 points</li>
            <li>• Starts with query: +50 points</li>
            <li>• Contains query: +25 points</li>
            <li>• Word boundary match: +10 points</li>
            <li>• Group relevance: +5 points</li>
          </ul>
        </div>
      </div>

      {/* Group-Based Filter */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-2 text-lg font-medium text-text-default dark:text-text-dark-default">
            Group-Aware Filter
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Searches by department name or employee name. Try "engineering" to see all engineers.
          </p>
        </div>

        <Autocomplete
          value={groupFilterValue.value}
          options={employees}
          filterFunction$={groupFilter}
          label="Employee Search (Group-Aware)"
          placeholder="Search by name or department"
          helperText="Type department name to see all members"
          highlightMatches={true}
          onValueChange$={(value) => {
            groupFilterValue.value = value;
          }}
          class="max-w-md"
        />

        {groupFilterValue.value && (
          <div class="rounded-md bg-primary-50 dark:bg-primary-950 border border-primary-200 dark:border-primary-800 p-3">
            <p class="text-sm text-primary-800 dark:text-primary-200">
              Selected: {employees.find(emp => emp.value === groupFilterValue.value)?.label}
              <br />
              <span class="text-xs">
                Department: {employees.find(emp => emp.value === groupFilterValue.value)?.group}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Implementation Guide */}
      <div class="mt-8 rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Filter Implementation Guide
        </h3>
        <div class="space-y-4 text-sm text-text-secondary dark:text-text-dark-secondary">
          <div>
            <h4 class="font-medium text-text-default dark:text-text-dark-default mb-2">
              When to Use Each Filter Type:
            </h4>
            <div class="grid gap-3 md:grid-cols-2">
              <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-3">
                <strong class="text-text-default dark:text-text-dark-default">Fuzzy Search:</strong>
                <br />Best for typo-tolerant search and when users might not know exact spelling.
              </div>
              <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-3">
                <strong class="text-text-default dark:text-text-dark-default">Prefix Filter:</strong>
                <br />Ideal for autocomplete scenarios where precision is important.
              </div>
              <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-3">
                <strong class="text-text-default dark:text-text-dark-default">Multi-Field:</strong>
                <br />Perfect for complex data with multiple searchable attributes.
              </div>
              <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-3">
                <strong class="text-text-default dark:text-text-dark-default">Scored Filter:</strong>
                <br />Best when result relevance and ranking matter most.
              </div>
            </div>
          </div>
          
          <div>
            <h4 class="font-medium text-text-default dark:text-text-dark-default mb-2">
              Performance Considerations:
            </h4>
            <ul class="space-y-1 ml-4">
              <li>• More complex filters may impact performance with large datasets</li>
              <li>• Consider debouncing input for expensive filter operations</li>
              <li>• Cache filter results when possible</li>
              <li>• Use simple substring matching for basic use cases</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});