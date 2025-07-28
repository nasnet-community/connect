import { component$ } from "@builder.io/qwik";
import { UsageTemplate, type BestPractice } from "~/components/Docs/templates";

export default component$(() => {
  const installationCode = `import { 
  VisuallyHidden, 
  classNames, 
  generateId, 
  debounce,
  type ValidationState,
  type InputSize,
  type Option 
} from "~/components/Core/common";`;

  const usageSteps = [
    {
      title: "Import Required Utilities",
      description: "Import the utilities and types you need from the common module",
      code: `import { classNames, generateId, VisuallyHidden } from "~/components/Core/common";
import type { ValidationState, Option } from "~/components/Core/common";`,
    },
    {
      title: "Using VisuallyHidden for Accessibility",
      description: "Hide content visually while keeping it accessible to screen readers",
      code: `export const SkipLink = component$(() => {
  return (
    <VisuallyHidden>
      <a 
        href="#main-content" 
        class="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
               focus:z-50 focus:rounded-md focus:bg-primary-500 
               focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
    </VisuallyHidden>
  );
});`,
    },
    {
      title: "Dynamic Class Names",
      description: "Conditionally apply classes based on component state",
      code: `export const DynamicButton = component$(() => {
  const isActive = useSignal(false);
  const isDisabled = useSignal(false);
  
  const buttonClasses = classNames(
    "px-4 py-2 rounded-md transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    isActive.value && "bg-primary-500 text-white",
    !isActive.value && "bg-gray-200 text-gray-800",
    isDisabled.value && "opacity-50 cursor-not-allowed",
    "hover:bg-primary-600 dark:hover:bg-primary-400"
  );
  
  return (
    <button 
      class={buttonClasses}
      disabled={isDisabled.value}
    >
      Click Me
    </button>
  );
});`,
    },
    {
      title: "Generating Unique IDs",
      description: "Create unique identifiers for form elements and ARIA relationships",
      code: `export const FormField = component$(() => {
  const inputId = generateId("input");
  const errorId = generateId("error");
  const helpId = generateId("help");
  
  return (
    <div class="space-y-2">
      <label for={inputId} class="block text-sm font-medium">
        Email Address
      </label>
      <input
        id={inputId}
        type="email"
        aria-describedby={\`\${helpId} \${errorId}\`}
        class="w-full rounded-md border px-3 py-2"
      />
      <p id={helpId} class="text-sm text-gray-600">
        We'll never share your email
      </p>
      <p id={errorId} class="text-sm text-red-600" aria-live="polite">
        Please enter a valid email
      </p>
    </div>
  );
});`,
    },
    {
      title: "Debouncing User Input",
      description: "Optimize performance by debouncing expensive operations",
      code: `export const SearchInput = component$(() => {
  const searchResults = useSignal<string[]>([]);
  
  const performSearch = $((query: string) => {
    // Simulate API call
    console.log("Searching for:", query);
    // Update searchResults.value with results
  });
  
  const debouncedSearch = debounce(performSearch, 300);
  
  return (
    <div class="space-y-4">
      <input
        type="search"
        placeholder="Search..."
        onInput$={(e) => {
          const target = e.target as HTMLInputElement;
          debouncedSearch(target.value);
        }}
        class="w-full rounded-md border px-4 py-2 
               dark:bg-gray-800 dark:border-gray-700"
      />
      <div class="space-y-2">
        {searchResults.value.map((result) => (
          <div key={result} class="p-2 bg-gray-100 dark:bg-gray-800 rounded">
            {result}
          </div>
        ))}
      </div>
    </div>
  );
});`,
    },
    {
      title: "Using Type Definitions",
      description: "Leverage TypeScript types for better type safety",
      code: `interface FormFieldProps {
  validation?: ValidationState;
  size?: InputSize;
  options?: Option[];
}

export const TypedFormField = component$<FormFieldProps>((props) => {
  const { 
    validation = "default", 
    size = "md", 
    options = [] 
  } = props;
  
  const inputClasses = classNames(
    "rounded-md border transition-colors",
    size === "sm" && "px-2 py-1 text-sm",
    size === "md" && "px-3 py-2",
    size === "lg" && "px-4 py-3 text-lg",
    validation === "valid" && "border-green-500 focus:ring-green-500",
    validation === "invalid" && "border-red-500 focus:ring-red-500",
    validation === "default" && "border-gray-300 focus:ring-primary-500"
  );
  
  return (
    <select class={inputClasses}>
      {options.map((option) => (
        <option 
          key={option.value} 
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
});`,
    },
  ];

  const bestPractices: BestPractice[] = [
    { title: "Accessibility First", description: "Always use VisuallyHidden for skip links and screen reader announcements" },
    { title: "Clean Class Management", description: "Prefer classNames utility over string concatenation for conditional classes" },
    { title: "Proper ID Generation", description: "Generate IDs for form elements to ensure proper accessibility relationships" },
    { title: "Performance Optimization", description: "Use debounce for search inputs and other expensive operations" },
    { title: "Type Safety", description: "Leverage TypeScript types for better IDE support and type safety" },
    { title: "Mobile Considerations", description: "Consider mobile users when implementing interactive elements" },
    { title: "Screen Reader Testing", description: "Test with screen readers to ensure VisuallyHidden content is accessible" },
    { title: "Semantic HTML", description: "Use semantic HTML elements before applying utilities" },
  ];

  const commonPitfalls = [
    "Don't use VisuallyHidden for interactive elements that need keyboard focus",
    "Avoid generating new IDs on every render - store them in signals or constants",
    "Don't debounce critical user actions like form submissions",
    "Remember that classNames filters out falsy values - use empty strings carefully",
    "Don't hide content that should be removed from the accessibility tree entirely",
  ];

  return (
    <UsageTemplate
      installation={installationCode}
      guidelines={usageSteps.map(step => ({ title: step.title, description: step.description, code: step.code }))}
      bestPractices={bestPractices}
      donts={commonPitfalls}
    >
      <p>
        The common module provides essential utilities that solve everyday development challenges.
        These utilities are designed to work seamlessly with Qwik's reactive system and Tailwind CSS,
        providing a consistent foundation for building accessible, responsive applications.
      </p>
    </UsageTemplate>
  );
});