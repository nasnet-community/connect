import { component$ } from "@builder.io/qwik";

/**
 * API Reference documentation for the Link component
 * 
 * Complete documentation of all props, types, and interfaces
 */
export const APIReference = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          API Reference
        </h1>
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Complete API documentation for the Link component including all props, types, and usage patterns.
        </p>
      </section>

      {/* Props Table */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Props
        </h2>
        
        <div class="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Prop
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Default
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  href
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  string
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  -
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Link destination URL for external links or path for internal links. <span class="text-error-600 dark:text-error-400">Required</span>
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  external
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  boolean
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  auto-detect
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether the link should be treated as external regardless of URL format
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  variant
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  LinkVariant
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  "standard"
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Link style variant: "standard" | "button" | "nav" | "subtle" | "icon" | "breadcrumb"
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  size
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  LinkSize
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  "base"
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Link text size: "xs" | "sm" | "base" | "lg" | "xl"
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  weight
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  LinkWeight
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  "medium"
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Font weight: "normal" | "medium" | "semibold" | "bold"
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  color
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  LinkColor
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  "primary"
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Link color theme: "primary" | "secondary" | "tertiary" | "inverse" | "accent" | "inherit" | "success" | "error" | "warning" | "info"
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  underline
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  LinkUnderline
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  "hover"
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Underline style: "none" | "hover" | "always" | "animate"
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  newTab
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  boolean
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  auto-detect
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether to open link in a new tab. Defaults to true for external links
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  prefixIcon
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  JSXNode
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Icon to display before link text
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  suffixIcon
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  JSXNode
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Icon to display after link text
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  truncate
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  boolean
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  false
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether to truncate text with ellipsis if it overflows
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  disabled
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  boolean
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  false
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether the link is disabled
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  active
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  boolean
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  false
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether the link is currently active (for navigation links)
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  secure
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  boolean
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  true
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Whether to add security attributes (rel="noopener noreferrer") to external links
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  rel
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  string
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Additional rel attribute values (combined with security attributes)
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  ariaLabel
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  string
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  ARIA label for better accessibility
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  class
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  string
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  ""
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Additional CSS classes
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  id
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  string
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  ID attribute for the link element
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  children
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  string | JSXNode
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Link content (text or JSX)
                </td>
              </tr>
              <tr class="bg-gray-50 dark:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  onClick$
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  QRL&lt;(e: MouseEvent) =&gt; void&gt;
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Click event handler
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  qwikCity
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-primary-600 dark:text-primary-400 font-mono">
                  Partial&lt;QwikLinkProps&gt;
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  Additional Qwik-specific Link props for internal routing
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Type Definitions */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Type Definitions
        </h2>
        
        <div class="space-y-6">
          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">LinkVariant</h3>
            <pre class="text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto">
{`type LinkVariant =
  | "standard"    // Default underlined on hover
  | "button"      // Button-like appearance
  | "nav"         // Navigation link style
  | "subtle"      // Minimal styling
  | "icon"        // Icon with optional text
  | "breadcrumb"; // For breadcrumb navigation`}
            </pre>
          </div>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">LinkSize</h3>
            <pre class="text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto">
{`type LinkSize = "xs" | "sm" | "base" | "lg" | "xl";`}
            </pre>
          </div>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">LinkWeight</h3>
            <pre class="text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto">
{`type LinkWeight = "normal" | "medium" | "semibold" | "bold";`}
            </pre>
          </div>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">LinkColor</h3>
            <pre class="text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto">
{`type LinkColor =
  | "primary"     // Default blue link color
  | "secondary"   // Subdued color
  | "tertiary"    // Even more subdued
  | "inverse"     // For dark backgrounds
  | "accent"      // Brand accent color
  | "inherit"     // Inherits from parent text color
  | "success"
  | "error"
  | "warning"
  | "info";`}
            </pre>
          </div>

          <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
            <h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">LinkUnderline</h3>
            <pre class="text-sm text-gray-700 dark:text-gray-300 font-mono overflow-x-auto">
{`type LinkUnderline =
  | "none"     // No underline
  | "hover"    // Underline on hover (default)
  | "always"   // Always show underline
  | "animate"; // Animated underline effect`}
            </pre>
          </div>
        </div>
      </section>

      {/* Usage Notes */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Usage Notes
        </h2>
        
        <div class="space-y-4">
          <div class="p-4 bg-info-50 dark:bg-info-900/20 border border-info-200 dark:border-info-800 rounded-lg">
            <h4 class="font-medium text-info-800 dark:text-info-200 mb-2">Automatic Link Detection</h4>
            <p class="text-sm text-info-700 dark:text-info-300">
              The component automatically detects external links based on URL patterns (http, https, mailto, tel).
              You can override this behavior with the <code class="bg-info-100 dark:bg-info-800 px-1 rounded">external</code> prop.
            </p>
          </div>
          
          <div class="p-4 bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800 rounded-lg">
            <h4 class="font-medium text-success-800 dark:text-success-200 mb-2">Security Features</h4>
            <p class="text-sm text-success-700 dark:text-success-300">
              External links automatically include security attributes to prevent tabnabbing attacks.
              The <code class="bg-success-100 dark:bg-success-800 px-1 rounded">secure</code> prop can be used to disable this behavior if needed.
            </p>
          </div>
          
          <div class="p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg">
            <h4 class="font-medium text-warning-800 dark:text-warning-200 mb-2">Accessibility</h4>
            <p class="text-sm text-warning-700 dark:text-warning-300">
              Always provide descriptive link text or use the <code class="bg-warning-100 dark:bg-warning-800 px-1 rounded">ariaLabel</code> prop
              for links with non-descriptive text or icon-only links to ensure accessibility compliance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});