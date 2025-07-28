import { component$ } from "@builder.io/qwik";
import { Heading } from "../Heading";

/**
 * Overview documentation for the Heading component
 * 
 * The Heading component is a fundamental typography element that provides
 * consistent styling for headings across the application.
 */
export const Overview = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Introduction */}
      <section class="space-y-4">
        <Heading level={1} class="text-3xl md:text-4xl lg:text-5xl">
          Heading Component
        </Heading>
        
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The Heading component provides a flexible and accessible way to create semantic headings
          with consistent styling throughout your application. It supports all heading levels (h1-h6),
          responsive sizing, and various visual customizations while maintaining proper document structure.
        </p>
      </section>

      {/* Key Features */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Key Features
        </Heading>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <Heading level={3} color="accent" class="text-lg mb-2">
              🎨 Flexible Styling
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Multiple weight, color, and alignment options with full dark mode support
            </p>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <Heading level={3} color="accent" class="text-lg mb-2">
              📱 Responsive Design
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Built-in responsive sizing with mobile-first approach
            </p>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <Heading level={3} color="accent" class="text-lg mb-2">
              ♿ Accessibility First
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Semantic HTML with proper heading hierarchy and ARIA support
            </p>
          </div>
          
          <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary rounded-lg p-4">
            <Heading level={3} color="accent" class="text-lg mb-2">
              ⚡ Performance
            </Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Lightweight with Qwik's lazy loading and resumability
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Common Use Cases
        </Heading>
        
        <div class="space-y-3">
          <div class="border-l-4 border-primary-500 pl-4">
            <Heading level={4} class="text-lg mb-1">Page Titles</Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Main page headings with responsive sizing from mobile to desktop
            </p>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <Heading level={4} class="text-lg mb-1">Section Headers</Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Organize content with proper semantic hierarchy
            </p>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <Heading level={4} class="text-lg mb-1">Card Titles</Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Consistent component headings with truncation support
            </p>
          </div>
          
          <div class="border-l-4 border-primary-500 pl-4">
            <Heading level={4} class="text-lg mb-1">Modal Headers</Heading>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Accessible dialog titles with proper focus management
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Best Practices
        </Heading>
        
        <ul class="space-y-2 text-sm md:text-base text-gray-700 dark:text-gray-300">
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Always use semantic heading levels in order (h1 → h2 → h3)</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Use the 'as' prop when visual style differs from semantic meaning</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Implement responsive sizing for optimal mobile experience</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="text-success-600 dark:text-success-400 mt-0.5">✓</span>
            <span>Choose appropriate color variants for context (error, success, etc.)</span>
          </li>
        </ul>
      </section>

      {/* Quick Example */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Quick Example
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 space-y-4">
          <Heading 
            level={1}
            responsiveSize={{
              base: 3,
              md: 2,
              lg: 1
            }}
            weight="bold"
            color="primary"
          >
            Responsive Page Title
          </Heading>
          
          <Heading level={2} color="secondary" weight="semibold">
            Section Subtitle
          </Heading>
          
          <Heading level={3} color="tertiary" truncate maxLines={2}>
            This is a very long heading that will be truncated after two lines to maintain layout consistency
          </Heading>
        </div>
      </section>
    </div>
  );
});