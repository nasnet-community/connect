import { component$, useStore, $ } from "@builder.io/qwik";
import {
  PlaygroundTemplate,
  type PropertyControl,
} from "~/components/Docs/templates";
import { Autocomplete } from "../Autocomplete";
import type { AutocompleteOption } from "../Autocomplete.types";

/**
 * Autocomplete component interactive playground
 */
export default component$(() => {
  // Sample data for playground
  const countries: AutocompleteOption[] = [
    { value: "af", label: "Afghanistan" },
    { value: "al", label: "Albania" },
    { value: "dz", label: "Algeria" },
    { value: "ar", label: "Argentina" },
    { value: "au", label: "Australia" },
    { value: "at", label: "Austria" },
    { value: "br", label: "Brazil" },
    { value: "ca", label: "Canada" },
    { value: "cn", label: "China" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
    { value: "in", label: "India" },
    { value: "it", label: "Italy" },
    { value: "jp", label: "Japan" },
    { value: "mx", label: "Mexico" },
    { value: "nl", label: "Netherlands" },
    { value: "ru", label: "Russia" },
    { value: "es", label: "Spain" },
    { value: "gb", label: "United Kingdom" },
    { value: "us", label: "United States" },
  ];

  const technologies: AutocompleteOption[] = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue.js" },
    { value: "angular", label: "Angular" },
    { value: "qwik", label: "Qwik" },
    { value: "svelte", label: "Svelte" },
    { value: "nodejs", label: "Node.js" },
    { value: "python", label: "Python" },
    { value: "typescript", label: "TypeScript" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
  ];

  // Playground state
  const state = useStore({
    // Data options
    dataSource: "countries" as "countries" | "technologies",
    
    // Basic props
    placeholder: "Start typing to search...",
    label: "Select an option",
    helperText: "",
    error: "",
    
    // Behavior
    size: "md" as "sm" | "md" | "lg",
    disabled: false,
    required: false,
    allowCustomValue: true,
    filterOptions: true,
    highlightMatches: true,
    clearable: true,
    openOnFocus: true,
    closeOnSelect: true,
    
    // Search behavior
    minCharsToSearch: 0,
    
    // Appearance
    noOptionsText: "No options found",
    loadingText: "Loading...",
    maxDropdownHeight: "300px",
    
    // Current values
    selectedValue: "",
    inputValue: "",
    loading: false,
  });

  // Get current options based on data source
  const currentOptions = state.dataSource === "countries" ? countries : technologies;

  // Control definitions for the playground
  const controls: PropertyControl[] = [
    {
      name: "dataSource",
      label: "Data Source",
      type: "select",
      options: [
        { label: "Countries", value: "countries" },
        { label: "Technologies", value: "technologies" },
      ],
    },
    {
      name: "size",
      label: "Size",
      type: "select",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      name: "placeholder",
      label: "Placeholder",
      type: "text",
    },
    {
      name: "label",
      label: "Label",
      type: "text",
    },
    {
      name: "helperText",
      label: "Helper Text",
      type: "text",
    },
    {
      name: "error",
      label: "Error Message",
      type: "text",
    },
    {
      name: "disabled",
      label: "Disabled",
      type: "boolean",
    },
    {
      name: "required",
      label: "Required",
      type: "boolean",
    },
    {
      name: "allowCustomValue",
      label: "Allow Custom Value",
      type: "boolean",
    },
    {
      name: "filterOptions",
      label: "Filter Options",
      type: "boolean",
    },
    {
      name: "highlightMatches",
      label: "Highlight Matches",
      type: "boolean",
    },
    {
      name: "clearable",
      label: "Clearable",
      type: "boolean",
    },
    {
      name: "openOnFocus",
      label: "Open on Focus",
      type: "boolean",
    },
    {
      name: "closeOnSelect",
      label: "Close on Select",
      type: "boolean",
    },
    {
      name: "minCharsToSearch",
      label: "Min Chars to Search",
      type: "number",
    },
    {
      name: "noOptionsText",
      label: "No Options Text",
      type: "text",
    },
    {
      name: "loading",
      label: "Loading State",
      type: "boolean",
    },
  ];

  // Event handlers
  const handleValueChange$ = $((value: string) => {
    state.selectedValue = value;
  });

  const handleInputChange$ = $((value: string) => {
    state.inputValue = value;
  });

  const handleControlChange$ = $((property: string, value: any) => {
    (state as any)[property] = value;
  });

  return (
    <PlaygroundTemplate
      title="Autocomplete Playground"
      description="Experiment with different Autocomplete configurations and see how they affect the component's behavior and appearance."
      controls={controls}
      onControlChange$={handleControlChange$}
      state={state}
    >
      <div class="space-y-6">
        {/* Main Component Demo */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Interactive Demo
          </h3>
          
          <div class="max-w-md">
            <Autocomplete
              options={currentOptions}
              value={state.selectedValue}
              inputValue={state.inputValue}
              onValueChange$={handleValueChange$}
              onInputChange$={handleInputChange$}
              placeholder={state.placeholder}
              label={state.label}
              helperText={state.helperText}
              error={state.error}
              size={state.size}
              disabled={state.disabled}
              required={state.required}
              allowCustomValue={state.allowCustomValue}
              filterOptions={state.filterOptions}
              highlightMatches={state.highlightMatches}
              clearable={state.clearable}
              openOnFocus={state.openOnFocus}
              closeOnSelect={state.closeOnSelect}
              minCharsToSearch={state.minCharsToSearch}
              noOptionsText={state.noOptionsText}
              loadingText={state.loadingText}
              loading={state.loading}
              maxDropdownHeight={state.maxDropdownHeight}
            />
          </div>
          
          {/* Current State Display */}
          <div class="mt-6 rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
            <h4 class="mb-2 text-sm font-medium text-text-default dark:text-text-dark-default">
              Current State:
            </h4>
            <div class="grid gap-2 text-xs font-mono text-text-secondary dark:text-text-dark-secondary">
              <div>selectedValue: <span class="text-primary-600 dark:text-primary-400">"{state.selectedValue}"</span></div>
              <div>inputValue: <span class="text-primary-600 dark:text-primary-400">"{state.inputValue}"</span></div>
              <div>dataSource: <span class="text-primary-600 dark:text-primary-400">"{state.dataSource}"</span></div>
              <div>options.length: <span class="text-primary-600 dark:text-primary-400">{currentOptions.length}</span></div>
            </div>
          </div>
        </div>

        {/* Different Size Variants */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Size Variants
          </h3>
          <div class="grid gap-4 md:grid-cols-3">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Small
              </label>
              <Autocomplete
                options={currentOptions.slice(0, 5)}
                size="sm"
                placeholder="Small size..."
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Medium (Default)
              </label>
              <Autocomplete
                options={currentOptions.slice(0, 5)}
                size="md"
                placeholder="Medium size..."
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Large
              </label>
              <Autocomplete
                options={currentOptions.slice(0, 5)}
                size="lg"
                placeholder="Large size..."
              />
            </div>
          </div>
        </div>

        {/* States Demo */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Component States
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Loading State
              </label>
              <Autocomplete
                options={[]}
                loading={true}
                loadingText="Searching..."
                placeholder="Loading example..."
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Error State
              </label>
              <Autocomplete
                options={currentOptions.slice(0, 3)}
                error="Please select a valid option"
                placeholder="Error example..."
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Disabled State
              </label>
              <Autocomplete
                options={currentOptions.slice(0, 3)}
                disabled={true}
                placeholder="Disabled example..."
              />
            </div>
            <div>
              <label class="mb-2 block text-sm font-medium text-text-default dark:text-text-dark-default">
                Required Field
              </label>
              <Autocomplete
                options={currentOptions.slice(0, 3)}
                required={true}
                label="Required field"
                placeholder="Required example..."
              />
            </div>
          </div>
        </div>

        {/* Generated Code */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Generated Code
          </h3>
          <div class="rounded-md bg-gray-900 p-4">
            <pre class="text-sm text-gray-100 overflow-x-auto">
              <code>{`<Autocomplete
  options={${state.dataSource === "countries" ? "countries" : "technologies"}}${state.selectedValue ? `
  value="${state.selectedValue}"` : ""}${state.placeholder ? `
  placeholder="${state.placeholder}"` : ""}${state.label ? `
  label="${state.label}"` : ""}${state.helperText ? `
  helperText="${state.helperText}"` : ""}${state.error ? `
  error="${state.error}"` : ""}${state.size !== "md" ? `
  size="${state.size}"` : ""}${state.disabled ? `
  disabled={true}` : ""}${state.required ? `
  required={true}` : ""}${!state.allowCustomValue ? `
  allowCustomValue={false}` : ""}${!state.filterOptions ? `
  filterOptions={false}` : ""}${!state.highlightMatches ? `
  highlightMatches={false}` : ""}${!state.clearable ? `
  clearable={false}` : ""}${!state.openOnFocus ? `
  openOnFocus={false}` : ""}${!state.closeOnSelect ? `
  closeOnSelect={false}` : ""}${state.minCharsToSearch > 0 ? `
  minCharsToSearch={${state.minCharsToSearch}}` : ""}${state.noOptionsText !== "No options found" ? `
  noOptionsText="${state.noOptionsText}"` : ""}${state.loading ? `
  loading={true}` : ""}
  onValueChange$={(value) => console.log(value)}
/>`}</code>
            </pre>
          </div>
        </div>
      </div>
    </PlaygroundTemplate>
  );
});