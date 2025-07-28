import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { VisuallyHidden, classNames, generateId, debounce } from "../index";
import type { InputSize } from "../types";

export default component$(() => {
  // VisuallyHidden Playground State
  const showSkipLink = useSignal(false);
  const srText = useSignal("This text is only visible to screen readers");

  // classNames Playground State
  const classNamesState = useStore({
    baseClasses: "px-4 py-2 rounded-md transition-colors",
    isActive: false,
    isDisabled: false,
    variant: "primary" as "primary" | "secondary" | "danger",
    size: "md" as InputSize,
  });

  // Debounce Playground State
  const searchQuery = useSignal("");
  const searchResults = useSignal<string[]>([]);
  const searchCount = useSignal(0);

  // Mock search function
  const performSearch = $((query: string) => {
    searchCount.value++;
    const mockResults = query
      ? [`Result 1 for "${query}"`, `Result 2 for "${query}"`, `Result 3 for "${query}"`]
      : [];
    searchResults.value = mockResults;
  });

  const debouncedSearch = $((query: string) => {
    debounce(performSearch, 500)(query);
  });

  // Generate computed classes for the playground
  const computedClasses = classNames(
    classNamesState.baseClasses,
    classNamesState.variant === "primary" && "bg-primary-500 text-white",
    classNamesState.variant === "secondary" && "bg-gray-500 text-white",
    classNamesState.variant === "danger" && "bg-red-500 text-white",
    classNamesState.size === "sm" && "text-sm px-2 py-1",
    classNamesState.size === "md" && "text-base px-4 py-2",
    classNamesState.size === "lg" && "text-lg px-6 py-3",
    classNamesState.isActive && "ring-2 ring-offset-2 ring-blue-500",
    classNamesState.isDisabled && "opacity-50 cursor-not-allowed"
  );

  const playgroundSections = [
    {
      title: "VisuallyHidden Playground",
      description: "Experiment with the VisuallyHidden component and see how it affects accessibility.",
      component: (
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium">Screen Reader Text:</label>
            <input
              type="text"
              value={srText.value}
              onInput$={(e) => (srText.value = (e.target as HTMLInputElement).value)}
              class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              placeholder="Enter text for screen readers..."
            />
          </div>

          <div class="space-y-2">
            <label class="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={showSkipLink.value}
                onChange$={(e) => (showSkipLink.value = (e.target as HTMLInputElement).checked)}
                class="rounded"
              />
              <span class="text-sm">Show Skip Link Example</span>
            </label>
          </div>

          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <h4 class="mb-2 font-medium">Preview:</h4>
            <div class="space-y-2">
              <VisuallyHidden>{srText.value}</VisuallyHidden>
              
              {showSkipLink.value && (
                <VisuallyHidden>
                  <a
                    href="#main-content"
                    class="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 
                           focus:rounded-md focus:bg-primary-500 focus:px-4 focus:py-2 focus:text-white
                           focus:shadow-lg"
                  >
                    Skip to main content
                  </a>
                </VisuallyHidden>
              )}
              
              <p class="text-sm text-gray-600 dark:text-gray-400">
                The text above is hidden visually but accessible to screen readers.
                {showSkipLink.value && " Tab to see the skip link!"}
              </p>
            </div>
          </div>

          <div class="text-xs text-gray-600 dark:text-gray-400">
            <strong>Testing tip:</strong> Use a screen reader (like NVDA, JAWS, or VoiceOver) to verify
            the hidden content is announced properly.
          </div>
        </div>
      ),
    },
    {
      title: "classNames Utility Playground",
      description: "Build dynamic class strings with conditional logic.",
      component: (
        <div class="space-y-4">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div class="space-y-2">
              <label class="block text-sm font-medium">Base Classes:</label>
              <input
                type="text"
                value={classNamesState.baseClasses}
                onInput$={(e) =>
                  (classNamesState.baseClasses = (e.target as HTMLInputElement).value)
                }
                class="w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-mono dark:border-gray-600 dark:bg-gray-800"
              />
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">Variant:</label>
              <select
                value={classNamesState.variant}
                onChange$={(e) =>
                  (classNamesState.variant = (e.target as HTMLSelectElement).value as any)
                }
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="danger">Danger</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">Size:</label>
              <select
                value={classNamesState.size}
                onChange$={(e) =>
                  (classNamesState.size = (e.target as HTMLSelectElement).value as InputSize)
                }
                class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium">States:</label>
              <div class="space-y-1">
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={classNamesState.isActive}
                    onChange$={(e) =>
                      (classNamesState.isActive = (e.target as HTMLInputElement).checked)
                    }
                    class="rounded"
                  />
                  <span class="text-sm">Active</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={classNamesState.isDisabled}
                    onChange$={(e) =>
                      (classNamesState.isDisabled = (e.target as HTMLInputElement).checked)
                    }
                    class="rounded"
                  />
                  <span class="text-sm">Disabled</span>
                </label>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <h4 class="mb-2 font-medium">Preview:</h4>
            <button class={computedClasses} disabled={classNamesState.isDisabled}>
              Sample Button
            </button>

            <div class="mt-4">
              <p class="text-sm font-medium">Generated Classes:</p>
              <code class="mt-1 block rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                {computedClasses}
              </code>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Debounce Function Playground",
      description: "See how debouncing reduces function calls for better performance.",
      component: (
        <div class="space-y-4">
          <div class="space-y-2">
            <label class="block text-sm font-medium">Search Query:</label>
            <input
              type="search"
              placeholder="Type to search (debounced by 500ms)..."
              onInput$={(e) => {
                const value = (e.target as HTMLInputElement).value;
                searchQuery.value = value;
                debouncedSearch(value);
              }}
              class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
            />
          </div>

          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
            <div class="mb-2 flex items-center justify-between">
              <h4 class="font-medium">Search Results:</h4>
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Searches performed: {searchCount.value}
              </span>
            </div>
            
            {searchResults.value.length > 0 ? (
              <div class="space-y-1">
                {searchResults.value.map((result, index) => (
                  <div
                    key={index}
                    class="rounded bg-white p-2 text-sm dark:bg-gray-800"
                  >
                    {result}
                  </div>
                ))}
              </div>
            ) : (
              <p class="text-sm text-gray-600 dark:text-gray-400">
                {searchQuery.value ? "No results found" : "Start typing to search..."}
              </p>
            )}
          </div>

          <div class="text-xs text-gray-600 dark:text-gray-400">
            <strong>Notice:</strong> Without debouncing, the search count would increase on every
            keystroke. With debouncing, it only increases after you stop typing for 500ms.
          </div>
        </div>
      ),
    },
    {
      title: "ID Generation Playground",
      description: "Generate unique IDs for form elements and accessibility.",
      component: (
        <div class="space-y-4">
          <div class="space-y-4">
            <button
              onClick$={() => {
                const newId = generateId("demo");
                console.log("Generated ID:", newId);
              }}
              class="rounded-md bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
            >
              Generate New ID (check console)
            </button>
            
            <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
              <h4 class="mb-2 font-medium">Form Example with Generated IDs:</h4>
              {(() => {
                const inputId = generateId("input");
                const helpId = generateId("help");
                const errorId = generateId("error");
                
                return (
                  <div class="space-y-2">
                    <label for={inputId} class="block text-sm font-medium">
                      Email Address
                    </label>
                    <input
                      id={inputId}
                      type="email"
                      aria-describedby={`${helpId} ${errorId}`}
                      class="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-800"
                      placeholder="Enter your email"
                    />
                    <p id={helpId} class="text-xs text-gray-600 dark:text-gray-400">
                      We'll never share your email with anyone else.
                    </p>
                    <p id={errorId} class="text-xs text-red-600" aria-live="polite">
                      {/* Error message would go here */}
                    </p>
                    
                    <div class="mt-2 text-xs text-gray-500">
                      <div>Input ID: <code>{inputId}</code></div>
                      <div>Help ID: <code>{helpId}</code></div>
                      <div>Error ID: <code>{errorId}</code></div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <PlaygroundTemplate
      title="Common Utilities Playground"
      description="Experiment with the common utilities in an interactive environment."
      sections={playgroundSections}
    >
      <div class="mb-6 rounded-lg bg-amber-50 p-4 dark:bg-amber-950">
        <h3 class="font-medium text-amber-900 dark:text-amber-100">🎮 Interactive Playground</h3>
        <p class="mt-1 text-sm text-amber-800 dark:text-amber-200">
          This playground lets you experiment with all the common utilities in real-time. 
          Try different combinations and see how they work together to create accessible, 
          responsive components.
        </p>
      </div>
    </PlaygroundTemplate>
  );
});