import { component$ } from "@builder.io/qwik";
import { Heading } from "../Heading";

/**
 * Usage guidelines and best practices for the Heading component
 * 
 * Provides implementation patterns and accessibility considerations
 */
export const Usage = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <Heading level={1} class="text-3xl md:text-4xl">
          Usage Guidelines
        </Heading>
        
        <p class="text-base text-gray-700 dark:text-gray-300">
          Learn how to effectively use the Heading component in your applications with best practices and common patterns.
        </p>
      </section>

      {/* Basic Usage */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Basic Usage
        </Heading>
        
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            The Heading component should be used for all headings in your application to ensure consistency and accessibility.
          </p>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre class="text-sm overflow-x-auto">
              <code class="text-blue-600 dark:text-blue-400">
{`import { Heading } from "~/components/Core/Typography";

export default component$(() => {
  return (
    <article>
      <Heading level={1}>Article Title</Heading>
      <Heading level={2}>Section Header</Heading>
      <p>Content goes here...</p>
    </article>
  );
});`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Document Structure */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Document Structure
        </Heading>
        
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Maintain proper heading hierarchy for accessibility and SEO. Never skip heading levels.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Good Example */}
            <div class="bg-success-50 dark:bg-success-900/20 rounded-lg p-4">
              <Heading level={3} color="success" class="mb-2">
                ✅ Correct Structure
              </Heading>
              <pre class="text-sm">
                <code class="text-gray-700 dark:text-gray-300">
{`<Heading level={1}>Page Title</Heading>
  <Heading level={2}>Section</Heading>
    <Heading level={3}>Subsection</Heading>
    <Heading level={3}>Subsection</Heading>
  <Heading level={2}>Section</Heading>`}
                </code>
              </pre>
            </div>

            {/* Bad Example */}
            <div class="bg-error-50 dark:bg-error-900/20 rounded-lg p-4">
              <Heading level={3} color="error" class="mb-2">
                ❌ Incorrect Structure
              </Heading>
              <pre class="text-sm">
                <code class="text-gray-700 dark:text-gray-300">
{`<Heading level={1}>Page Title</Heading>
  <Heading level={3}>Section</Heading> // Skipped h2!
    <Heading level={5}>Subsection</Heading> // Skipped h4!`}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Patterns */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Responsive Patterns
        </Heading>
        
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Use responsive sizing to optimize readability across devices while maintaining visual hierarchy.
          </p>

          {/* Hero Section Example */}
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Heading level={3} class="mb-2">Hero Section</Heading>
            <pre class="text-sm overflow-x-auto">
              <code class="text-blue-600 dark:text-blue-400">
{`<Heading 
  level={1}
  responsiveSize={{
    base: 3,  // Smaller on mobile
    md: 2,    // Medium on tablet
    lg: 1     // Full size on desktop
  }}
  weight="bold"
  align="center"
>
  Welcome to Our Platform
</Heading>`}
              </code>
            </pre>
          </div>

          {/* Card Title Example */}
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Heading level={3} class="mb-2">Card Titles</Heading>
            <pre class="text-sm overflow-x-auto">
              <code class="text-blue-600 dark:text-blue-400">
{`<Heading 
  level={3}
  truncate
  maxLines={2}
  weight="semibold"
>
  {cardTitle}
</Heading>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Semantic HTML */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Semantic HTML with Visual Override
        </Heading>
        
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Use the 'as' prop when you need different visual styling while maintaining proper semantic structure.
          </p>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <pre class="text-sm overflow-x-auto">
              <code class="text-blue-600 dark:text-blue-400">
{`// Sidebar navigation where h2 is semantically correct
// but visually should look like h4
<nav>
  <Heading level={4} as="h2">
    Navigation Menu
  </Heading>
  <ul>...</ul>
</nav>

// Marketing section that needs large text
// but is semantically an h3
<section>
  <Heading level={1} as="h3" color="accent">
    Special Offer!
  </Heading>
</section>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Color Usage */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Color Usage Guidelines
        </Heading>
        
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <Heading level={3} class="text-lg">Semantic Colors</Heading>
              
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-gray-900 dark:bg-gray-100 rounded"></div>
                  <span><strong>Primary:</strong> Main headings, titles</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-gray-700 dark:bg-gray-300 rounded"></div>
                  <span><strong>Secondary:</strong> Subtitles, less emphasis</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-gray-500 dark:bg-gray-400 rounded"></div>
                  <span><strong>Tertiary:</strong> Supporting text</span>
                </div>
              </div>
            </div>

            <div class="space-y-3">
              <Heading level={3} class="text-lg">Status Colors</Heading>
              
              <div class="space-y-2 text-sm">
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-success-600 rounded"></div>
                  <span><strong>Success:</strong> Positive outcomes</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-error-600 rounded"></div>
                  <span><strong>Error:</strong> Error states, alerts</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-warning-600 rounded"></div>
                  <span><strong>Warning:</strong> Caution messages</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-4 h-4 bg-info-600 rounded"></div>
                  <span><strong>Info:</strong> Informational content</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Accessibility Considerations
        </Heading>
        
        <div class="space-y-4">
          <ul class="space-y-3 text-gray-700 dark:text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-primary-600 dark:text-primary-400 mt-0.5">🎯</span>
              <div>
                <strong>Screen Readers:</strong> Use proper heading hierarchy so screen reader users can navigate by headings.
              </div>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary-600 dark:text-primary-400 mt-0.5">🎯</span>
              <div>
                <strong>Keyboard Navigation:</strong> Headings with IDs can be targeted with skip links for keyboard users.
              </div>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary-600 dark:text-primary-400 mt-0.5">🎯</span>
              <div>
                <strong>Color Contrast:</strong> All color variants meet WCAG AA standards for contrast ratios.
              </div>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-primary-600 dark:text-primary-400 mt-0.5">🎯</span>
              <div>
                <strong>Focus Indicators:</strong> When used in interactive contexts, ensure proper focus styles.
              </div>
            </li>
          </ul>

          <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <Heading level={3} class="text-lg mb-2">
              Example: Skip Navigation
            </Heading>
            <pre class="text-sm overflow-x-auto">
              <code class="text-blue-600 dark:text-blue-400">
{`<a href="#main-content" class="sr-only focus:not-sr-only">
  Skip to main content
</a>

<Heading level={1} id="main-content">
  Main Page Content
</Heading>`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Common Implementation Patterns
        </Heading>
        
        <div class="space-y-6">
          {/* Page Header Pattern */}
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Heading level={3} class="mb-2">Page Header with Breadcrumbs</Heading>
            <pre class="text-sm overflow-x-auto">
              <code class="text-blue-600 dark:text-blue-400">
{`<header class="space-y-2">
  <nav aria-label="Breadcrumb">...</nav>
  <Heading 
    level={1}
    responsiveSize={{ base: 3, md: 2, lg: 1 }}
    weight="bold"
  >
    {pageTitle}
  </Heading>
  <p class="text-gray-600">{pageDescription}</p>
</header>`}
              </code>
            </pre>
          </div>

          {/* Section Pattern */}
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Heading level={3} class="mb-2">Content Section</Heading>
            <pre class="text-sm overflow-x-auto">
              <code class="text-blue-600 dark:text-blue-400">
{`<section class="space-y-4">
  <Heading level={2} class="border-b pb-2">
    Section Title
  </Heading>
  <div class="prose">
    {content}
  </div>
</section>`}
              </code>
            </pre>
          </div>

          {/* Modal Pattern */}
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <Heading level={3} class="mb-2">Modal Dialog</Heading>
            <pre class="text-sm overflow-x-auto">
              <code class="text-blue-600 dark:text-blue-400">
{`<dialog role="dialog" aria-labelledby="modal-title">
  <Heading 
    level={2} 
    id="modal-title"
    weight="semibold"
  >
    Confirm Action
  </Heading>
  {modalContent}
</dialog>`}
              </code>
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
});