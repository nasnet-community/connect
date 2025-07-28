import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

/**
 * Autocomplete component documentation index
 * 
 * This serves as the main entry point for the Autocomplete component documentation,
 * providing navigation to all available documentation sections.
 */
export default component$(() => {
  return (
    <div class="mx-auto max-w-4xl px-4 py-8">
      <div class="mb-8">
        <h1 class="mb-4 text-3xl font-bold text-text-default dark:text-text-dark-default">
          Autocomplete
        </h1>
        <p class="text-lg text-text-secondary dark:text-text-dark-secondary">
          A flexible autocomplete input component that provides intelligent search and selection capabilities.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Overview */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h2 class="mb-3 text-xl font-semibold text-text-default dark:text-text-dark-default">
            Overview
          </h2>
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Learn about the Autocomplete component's purpose, features, and design principles.
          </p>
          <a
            href="./overview"
            class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Read Overview
            <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Examples */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h2 class="mb-3 text-xl font-semibold text-text-default dark:text-text-dark-default">
            Examples
          </h2>
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Explore interactive examples showcasing different use cases and configurations.
          </p>
          <a
            href="./examples"
            class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            View Examples
            <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* API Reference */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h2 class="mb-3 text-xl font-semibold text-text-default dark:text-text-dark-default">
            API Reference
          </h2>
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Complete API documentation with all props, methods, and type definitions.
          </p>
          <a
            href="./api-reference"
            class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            API Reference
            <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Usage Guidelines */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h2 class="mb-3 text-xl font-semibold text-text-default dark:text-text-dark-default">
            Usage Guidelines
          </h2>
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Best practices, accessibility guidelines, and when to use this component.
          </p>
          <a
            href="./usage"
            class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Usage Guide
            <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Playground */}
        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <h2 class="mb-3 text-xl font-semibold text-text-default dark:text-text-dark-default">
            Playground
          </h2>
          <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
            Interactive playground to experiment with component properties and configurations.
          </p>
          <a
            href="./playground"
            class="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Open Playground
            <svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <div class="mt-8 rounded-lg border border-border dark:border-border-dark bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-6">
        <h2 class="mb-3 text-xl font-semibold text-text-default dark:text-text-dark-default">
          Quick Start
        </h2>
        <p class="mb-4 text-text-secondary dark:text-text-dark-secondary">
          Get started with the Autocomplete component in just a few lines of code:
        </p>
        <pre class="rounded-md bg-gray-900 p-4 text-sm text-gray-100 overflow-x-auto">
          <code>{`import { Autocomplete } from "~/components/Core/Form";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" }
];

<Autocomplete
  options={options}
  placeholder="Select a fruit..."
  onValueChange$={(value) => console.log(value)}
/>`}</code>
        </pre>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Autocomplete Component - Documentation",
  meta: [
    {
      name: "description",
      content: "Complete documentation for the Autocomplete component including examples, API reference, and usage guidelines.",
    },
  ],
};