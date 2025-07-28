import { component$ } from "@builder.io/qwik";
import { Heading } from "../Heading";

/**
 * API Reference documentation for the Heading component
 * 
 * Comprehensive documentation of all props, types, and interfaces
 */
export const APIReference = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <Heading level={1} class="text-3xl md:text-4xl">
          API Reference
        </Heading>
        
        <p class="text-base text-gray-700 dark:text-gray-300">
          Complete API documentation for the Heading component with all available props and types.
        </p>
      </section>

      {/* Props Table */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Props
        </Heading>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Prop
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Default
                </th>
                <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {/* level */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  level
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  1 | 2 | 3 | 4 | 5 | 6
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  2
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Heading level (h1-h6). Determines both semantic HTML element and visual size.
                </td>
              </tr>

              {/* as */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  as
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'span'
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  Based on level
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Override the rendered HTML element while maintaining visual styling.
                </td>
              </tr>

              {/* weight */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  weight
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  'semibold'
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Font weight of the heading text.
                </td>
              </tr>

              {/* align */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  align
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  'left' | 'center' | 'right'
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  'left'
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Text alignment within the heading element.
                </td>
              </tr>

              {/* color */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  color
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  HeadingColor
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  'primary'
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Color variant for the heading. See color types below.
                </td>
              </tr>

              {/* truncate */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  truncate
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  false
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Whether to truncate text with ellipsis if it overflows.
                </td>
              </tr>

              {/* maxLines */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  maxLines
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  number
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  1
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Maximum number of lines before truncating (requires truncate=true).
                </td>
              </tr>

              {/* responsiveSize */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  responsiveSize
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  ResponsiveSize
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Responsive size configuration for different breakpoints.
                </td>
              </tr>

              {/* class */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  class
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  string
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  ''
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Additional CSS classes to apply to the heading.
                </td>
              </tr>

              {/* id */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  id
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  string
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  HTML id attribute for the heading element.
                </td>
              </tr>

              {/* children */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  children
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  string | JSXNode
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Content to be rendered inside the heading.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Type Definitions */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Type Definitions
        </Heading>

        {/* HeadingLevel */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Heading level={3} class="text-lg mb-2 font-mono">
            HeadingLevel
          </Heading>
          <pre class="text-sm overflow-x-auto">
            <code class="text-purple-600 dark:text-purple-400">
{`type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;`}
            </code>
          </pre>
        </div>

        {/* HeadingWeight */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Heading level={3} class="text-lg mb-2 font-mono">
            HeadingWeight
          </Heading>
          <pre class="text-sm overflow-x-auto">
            <code class="text-purple-600 dark:text-purple-400">
{`type HeadingWeight = 
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";`}
            </code>
          </pre>
        </div>

        {/* HeadingAlignment */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Heading level={3} class="text-lg mb-2 font-mono">
            HeadingAlignment
          </Heading>
          <pre class="text-sm overflow-x-auto">
            <code class="text-purple-600 dark:text-purple-400">
{`type HeadingAlignment = "left" | "center" | "right";`}
            </code>
          </pre>
        </div>

        {/* HeadingColor */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Heading level={3} class="text-lg mb-2 font-mono">
            HeadingColor
          </Heading>
          <pre class="text-sm overflow-x-auto">
            <code class="text-purple-600 dark:text-purple-400">
{`type HeadingColor =
  | "primary"    // Default heading color
  | "secondary"  // Less prominent text
  | "tertiary"   // Even less prominent text
  | "inverse"    // For use on dark backgrounds
  | "accent"     // Brand accent color
  | "success"    // Success/positive messaging
  | "warning"    // Warning messaging
  | "error"      // Error messaging
  | "info";      // Informational messaging`}
            </code>
          </pre>
        </div>

        {/* ResponsiveSize */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Heading level={3} class="text-lg mb-2 font-mono">
            ResponsiveSize
          </Heading>
          <pre class="text-sm overflow-x-auto">
            <code class="text-purple-600 dark:text-purple-400">
{`type ResponsiveSize = {
  base?: HeadingLevel;  // Default size (mobile)
  sm?: HeadingLevel;    // Small screens (640px+)
  md?: HeadingLevel;    // Medium screens (768px+)
  lg?: HeadingLevel;    // Large screens (1024px+)
  xl?: HeadingLevel;    // Extra large screens (1280px+)
};`}
            </code>
          </pre>
        </div>
      </section>

      {/* Import Example */}
      <section class="space-y-4">
        <Heading level={2} class="text-2xl md:text-3xl">
          Import
        </Heading>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <pre class="text-sm overflow-x-auto">
            <code class="text-blue-600 dark:text-blue-400">
{`import { Heading } from "~/components/Core/Typography";

// Or import from the specific component path
import { Heading } from "~/components/Core/Typography/Heading";`}
            </code>
          </pre>
        </div>
      </section>
    </div>
  );
});