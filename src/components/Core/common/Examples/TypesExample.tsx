import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { classNames } from "../utils";
import type { 
  ValidationState, 
  InputSize, 
  Option, 
  ChangeHandler, 
  ClickHandler
} from "../types";

interface TypedComponentProps {
  size?: InputSize;
  validation?: ValidationState;
  options?: Option[];
  onChange?: ChangeHandler<HTMLSelectElement>;
  onClick?: ClickHandler;
}

export const TypeDefinitionsExample = component$<TypedComponentProps>(({
  size = "md", 
  validation = "default", 
  options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3", disabled: true }
  ]
}) => {
  
  const selectedValue = useSignal("");
  
  const selectClasses = classNames(
    "rounded-md border transition-colors focus:outline-none focus:ring-2",
    
    // Size variants
    size === "sm" && "px-2 py-1 text-sm",
    size === "md" && "px-3 py-2 text-base", 
    size === "lg" && "px-4 py-3 text-lg",
    
    // Validation states
    validation === "default" && "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
    validation === "valid" && "border-green-500 focus:border-green-500 focus:ring-green-500",
    validation === "invalid" && "border-red-500 focus:border-red-500 focus:ring-red-500",
    
    // Dark mode support
    "dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
  );
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Type Definitions in Practice
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          This component demonstrates how to use the common type definitions for better type safety:
        </p>
        
        <div class="space-y-3">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Typed Select Component (size: {size}, validation: {validation})
            </label>
            <select
              class={selectClasses}
              value={selectedValue.value}
              onChange$={$((e) => {
                selectedValue.value = (e.target as HTMLSelectElement).value;
              })}
            >
              <option value="">Select an option...</option>
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
          </div>
          
          {selectedValue.value && (
            <div class="rounded-md bg-green-50 p-3 dark:bg-green-950">
              <p class="text-sm text-green-800 dark:text-green-200">
                Selected: {options.find(opt => opt.value === selectedValue.value)?.label}
              </p>
            </div>
          )}
        </div>
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">TypeScript Interface:</p>
          <pre class="mt-1 overflow-x-auto rounded bg-gray-100 p-3 text-xs dark:bg-gray-800">
            <code>{`interface TypedComponentProps {
  size?: InputSize;           // "sm" | "md" | "lg"
  validation?: ValidationState; // "default" | "valid" | "invalid"
  options?: Option[];         // { value: string; label: string; disabled?: boolean }[]
  onChange?: ChangeHandler<HTMLSelectElement>;
  onClick?: ClickHandler;
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
});

export const ValidationStateExample = component$(() => {
  const formState = useStore({
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const validationStates = useStore<Record<string, ValidationState>>({
    email: "default",
    password: "default", 
    confirmPassword: "default",
  });
  
  const validateEmail = $((email: string): ValidationState => {
    if (!email) return "default";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "valid" : "invalid";
  });
  
  const validatePassword = $((password: string): ValidationState => {
    if (!password) return "default";
    return password.length >= 8 ? "valid" : "invalid";
  });
  
  const validateConfirmPassword = $((password: string, confirmPassword: string): ValidationState => {
    if (!confirmPassword) return "default";
    return password === confirmPassword ? "valid" : "invalid";
  });
  
  const _getInputClasses = $((validation: ValidationState) => classNames(
    "w-full rounded-md border px-3 py-2 transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "dark:bg-gray-700 dark:text-gray-100",
    
    validation === "default" && "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
    validation === "valid" && "border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50 dark:bg-green-950",
    validation === "invalid" && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-950"
  ));
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Validation States
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Use ValidationState types to create consistent form validation UI:
        </p>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              value={formState.email}
              onInput$={async (e) => {
                formState.email = (e.target as HTMLInputElement).value;
                validationStates.email = await validateEmail(formState.email);
              }}
              class={classNames(
                "w-full rounded-md border px-3 py-2 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                "dark:bg-gray-700 dark:text-gray-100",
                validationStates.email === "default" && "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
                validationStates.email === "valid" && "border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50 dark:bg-green-950",
                validationStates.email === "invalid" && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-950"
              )}
              placeholder="Enter your email"
            />
            {validationStates.email === "invalid" && (
              <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                Please enter a valid email address
              </p>
            )}
            {validationStates.email === "valid" && (
              <p class="mt-1 text-sm text-green-600 dark:text-green-400">
                Email format is valid
              </p>
            )}
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={formState.password}
              onInput$={async (e) => {
                formState.password = (e.target as HTMLInputElement).value;
                validationStates.password = await validatePassword(formState.password);
                if (formState.confirmPassword) {
                  validationStates.confirmPassword = await validateConfirmPassword(
                    formState.password, 
                    formState.confirmPassword
                  );
                }
              }}
              class={classNames(
                "w-full rounded-md border px-3 py-2 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                "dark:bg-gray-700 dark:text-gray-100",
                validationStates.password === "default" && "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
                validationStates.password === "valid" && "border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50 dark:bg-green-950",
                validationStates.password === "invalid" && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-950"
              )}
              placeholder="Enter password (min 8 characters)"
            />
            {validationStates.password === "invalid" && (
              <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                Password must be at least 8 characters long
              </p>
            )}
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={formState.confirmPassword}
              onInput$={async (e) => {
                formState.confirmPassword = (e.target as HTMLInputElement).value;
                validationStates.confirmPassword = await validateConfirmPassword(
                  formState.password,
                  formState.confirmPassword
                );
              }}
              class={classNames(
                "w-full rounded-md border px-3 py-2 transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                "dark:bg-gray-700 dark:text-gray-100",
                validationStates.confirmPassword === "default" && "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
                validationStates.confirmPassword === "valid" && "border-green-500 focus:border-green-500 focus:ring-green-500 bg-green-50 dark:bg-green-950",
                validationStates.confirmPassword === "invalid" && "border-red-500 focus:border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-950"
              )}
              placeholder="Confirm your password"
            />
            {validationStates.confirmPassword === "invalid" && (
              <p class="mt-1 text-sm text-red-600 dark:text-red-400">
                Passwords do not match
              </p>
            )}
          </div>
        </div>
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">ValidationState Type:</p>
          <code class="mt-1 block rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
            type ValidationState = "default" | "valid" | "invalid"
          </code>
        </div>
      </div>
    </div>
  );
});

export const OptionInterfaceExample = component$(() => {
  const categories: Option[] = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "books", label: "Books" },
    { value: "sports", label: "Sports & Outdoors", disabled: true },
    { value: "home", label: "Home & Garden" },
  ];
  
  const countries: Option[] = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan", disabled: true },
  ];
  
  const selectedCategory = useSignal("");
  const selectedCountry = useSignal("");
  
  const selectClasses = "w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700";
  
  return (
    <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        Option Interface Usage
      </h3>
      
      <div class="space-y-4">
        <p class="text-gray-600 dark:text-gray-400">
          Implement consistent dropdown and select components using the standardized Option interface:
        </p>
        
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              class={selectClasses}
              value={selectedCategory.value}
              onChange$={(e) => selectedCategory.value = (e.target as HTMLSelectElement).value}
            >
              <option value="">Select a category...</option>
              {categories.map((option) => (
                <option 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label + (option.disabled ? " (Coming Soon)" : "")}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Country
            </label>
            <select
              class={selectClasses}
              value={selectedCountry.value}
              onChange$={(e) => selectedCountry.value = (e.target as HTMLSelectElement).value}
            >
              <option value="">Select a country...</option>
              {countries.map((option) => (
                <option 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label + (option.disabled ? " (Not Available)" : "")}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {(selectedCategory.value || selectedCountry.value) && (
          <div class="rounded-md bg-blue-50 p-3 dark:bg-blue-950">
            <p class="text-sm text-blue-800 dark:text-blue-200">
              Selected: 
              {selectedCategory.value && ` Category: ${categories.find(c => c.value === selectedCategory.value)?.label}`}
              {selectedCategory.value && selectedCountry.value && ", "}
              {selectedCountry.value && ` Country: ${countries.find(c => c.value === selectedCountry.value)?.label}`}
            </p>
          </div>
        )}
        
        <div class="text-sm">
          <p class="font-medium text-gray-900 dark:text-gray-100">Option Interface:</p>
          <pre class="mt-1 overflow-x-auto rounded bg-gray-100 p-3 text-xs dark:bg-gray-800">
            <code>{`interface Option {
  value: string;
  label: string;
  disabled?: boolean;
}

// Usage example:
const options: Option[] = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "books", label: "Books", disabled: true },
];`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
});