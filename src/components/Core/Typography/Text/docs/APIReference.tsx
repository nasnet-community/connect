import { component$ } from "@builder.io/qwik";
import { Text } from "../Text";

/**
 * API Reference documentation for the Text component
 * 
 * Comprehensive documentation of all props, types, and interfaces
 */
export const APIReference = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <Text variant="body" as="h1" size="2xl" weight="bold" class="text-3xl md:text-4xl">
          API Reference
        </Text>
        
        <Text variant="paragraph" size="base" color="secondary">
          Complete API documentation for the Text component with all available props and types.
        </Text>
      </section>

      {/* Props Table */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Props
        </Text>
        
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
              {/* variant */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  variant
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  TextStyle
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "body"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Text style variant: body, paragraph, caption, label, code, quote
                </td>
              </tr>

              {/* as */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  as
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  ElementType
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  Based on variant
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Override the rendered HTML element while maintaining visual styling
                </td>
              </tr>

              {/* size */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  size
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  TextSize
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "base"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Font size: xs, sm, base, lg, xl, 2xl
                </td>
              </tr>

              {/* weight */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  weight
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  FontWeight
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "normal"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Font weight: light, normal, medium, semibold, bold, extrabold
                </td>
              </tr>

              {/* align */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  align
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  TextAlign
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "left"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Text alignment: left, center, right
                </td>
              </tr>

              {/* color */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  color
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  TextColor
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "primary"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Color variant with dark mode support
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
                  Whether to truncate text with ellipsis if it overflows
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
                  Maximum number of lines before truncating (requires truncate=true)
                </td>
              </tr>

              {/* transform */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  transform
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  TextTransform
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "none"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Text transformation: uppercase, lowercase, capitalize, none
                </td>
              </tr>

              {/* decoration */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  decoration
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  TextDecoration
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "none"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Text decoration: underline, line-through, none
                </td>
              </tr>

              {/* responsiveSize */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  responsiveSize
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  ResponsiveTextSize
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Enhanced responsive size configuration with custom breakpoints (2xs, mobile, tablet, desktop, etc.)
                </td>
              </tr>

              {/* fontFamily */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  fontFamily
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  FontFamily
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "sans"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Font family variant including RTL support (sans, sans-rtl, serif, serif-rtl, mono, display, body)
                </td>
              </tr>

              {/* highContrast */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  highContrast
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  false
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Enable high contrast mode for improved accessibility
                </td>
              </tr>

              {/* reduceMotion */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  reduceMotion
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  true
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Respect user's reduced motion preferences for accessibility
                </td>
              </tr>

              {/* touchOptimized */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  touchOptimized
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  false
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Enable touch-optimized interactions for mobile devices
                </td>
              </tr>

              {/* theme */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  theme
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  ThemeVariant
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "auto"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Theme variant for color scheme (light, dark, dim, auto)
                </td>
              </tr>

              {/* direction */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  direction
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  TextDirection
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  "auto"
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Text direction for RTL support (ltr, rtl, auto)
                </td>
              </tr>

              {/* containerResponsive */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  containerResponsive
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  false
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Enable container-based responsive sizing using container queries
                </td>
              </tr>

              {/* printOptimized */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  printOptimized
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  false
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Enable print-optimized styles for better document printing
                </td>
              </tr>

              {/* italic */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  italic
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  false
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Whether to enable italic font style
                </td>
              </tr>

              {/* monospace */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  monospace
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  false (true for code)
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Whether to use monospace font family
                </td>
              </tr>

              {/* srOnly */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  srOnly
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  boolean
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  false
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Text for screen readers only (visually hidden)
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
                  ""
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Additional CSS classes to apply to the text element
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
                  HTML id attribute for the text element
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
                  Content to be rendered inside the text element
                </td>
              </tr>

              {/* onClick$ */}
              <tr>
                <td class="px-4 py-4 text-sm font-mono text-gray-900 dark:text-gray-100">
                  onClick$
                </td>
                <td class="px-4 py-4 text-sm font-mono text-purple-600 dark:text-purple-400">
                  QRL&lt;MouseEvent&gt;
                </td>
                <td class="px-4 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">
                  undefined
                </td>
                <td class="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                  Click handler for interactive text elements
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Type Definitions */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Type Definitions
        </Text>

        {/* TextStyle */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            TextStyle
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type TextStyle =
  | "body"       // Default body text
  | "paragraph"  // Paragraph blocks (renders as <p>)
  | "caption"    // Small descriptive text
  | "label"      // Form labels and UI descriptions
  | "code"       // Inline code snippets with background
  | "quote";     // Blockquote text with styling`}
            </Text>
          </pre>
        </div>

        {/* TextSize */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            TextSize (Enhanced)
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type TextSize = 
  | "3xs" | "2xs" | "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "9xl"
  | "fluid-xs" | "fluid-sm" | "fluid-base" | "fluid-lg" | "fluid-xl" | "fluid-2xl" | "fluid-3xl" | "fluid-4xl";`}
            </Text>
          </pre>
        </div>

        {/* FontWeight */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            FontWeight
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type FontWeight =
  | "light"      // 300
  | "normal"     // 400
  | "medium"     // 500
  | "semibold"   // 600
  | "bold"       // 700
  | "extrabold"; // 800`}
            </Text>
          </pre>
        </div>

        {/* TextAlign */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            TextAlign
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type TextAlign = "left" | "center" | "right";`}
            </Text>
          </pre>
        </div>

        {/* TextColor */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            TextColor
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type TextColor =
  | "primary"    // Main text color (gray-900/gray-100)
  | "secondary"  // Less prominent (gray-700/gray-300)
  | "tertiary"   // Subtle text (gray-500/gray-400)
  | "inverse"    // For dark backgrounds (white/gray-900)
  | "accent"     // Brand accent color (blue-600/blue-400)
  | "success"    // Success states (green-600/green-400)
  | "warning"    // Warning states (yellow-600/yellow-400)
  | "error"      // Error states (red-600/red-400)
  | "info"       // Info states (cyan-600/cyan-400)
  | "subtle";    // Very subtle (gray-400/gray-500)`}
            </Text>
          </pre>
        </div>

        {/* TextTransform */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            TextTransform
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type TextTransform = "uppercase" | "lowercase" | "capitalize" | "none";`}
            </Text>
          </pre>
        </div>

        {/* TextDecoration */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            TextDecoration
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type TextDecoration = "underline" | "line-through" | "none";`}
            </Text>
          </pre>
        </div>

        {/* ResponsiveTextSize */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            ResponsiveTextSize (Enhanced)
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`interface ResponsiveTextSize {
  // Standard breakpoints
  "2xs"?: TextSize;    // Extra small phones (360px+)
  xs?: TextSize;       // Small phones (475px+)
  sm?: TextSize;       // Large phones (640px+)
  md?: TextSize;       // Tablets (768px+)
  lg?: TextSize;       // Small laptops (1024px+)
  xl?: TextSize;       // Desktop (1280px+)
  "2xl"?: TextSize;    // Large desktop (1536px+)
  "3xl"?: TextSize;    // Full HD (1920px+)
  "4xl"?: TextSize;    // 2K/4K (2560px+)
  
  // Device-specific breakpoints
  base?: TextSize;     // Base/default size (mobile-first)
  mobile?: TextSize;   // Mobile devices (360px+)
  "mobile-md"?: TextSize; // Mobile medium (475px+)
  tablet?: TextSize;   // Tablet devices (768px+)
  laptop?: TextSize;   // Laptop devices (1024px+)
  desktop?: TextSize;  // Desktop devices (1280px+)
}`}
            </Text>
          </pre>
        </div>

        {/* New Type Definitions */}
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            FontFamily
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type FontFamily = 
  | "sans"      // Default sans-serif font
  | "sans-rtl"  // RTL-optimized sans-serif
  | "serif"     // Serif font family
  | "serif-rtl" // RTL-optimized serif
  | "mono"      // Monospace font
  | "display"   // Display font for headings
  | "body";     // Body text font`}
            </Text>
          </pre>
        </div>

        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            ThemeVariant
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type ThemeVariant = 
  | "light" // Force light theme
  | "dark"  // Force dark theme
  | "dim"   // Dim theme (reduced contrast)
  | "auto"; // Follow system preference`}
            </Text>
          </pre>
        </div>

        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <Text variant="label" weight="medium" class="text-lg mb-2 font-mono">
            TextDirection
          </Text>
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="accent">
{`type TextDirection = 
  | "ltr"  // Left-to-right text direction
  | "rtl"  // Right-to-left text direction
  | "auto"; // Auto-detect from content/locale`}
            </Text>
          </pre>
        </div>
      </section>

      {/* Import Example */}
      <section class="space-y-4">
        <Text variant="body" as="h2" size="xl" weight="semibold" class="text-2xl md:text-3xl">
          Import
        </Text>
        
        <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <pre class="text-sm overflow-x-auto">
            <Text variant="code" color="info">
{`import { Text } from "~/components/Core/Typography";

// Or import from the specific component path
import { Text } from "~/components/Core/Typography/Text";`}
            </Text>
          </pre>
        </div>
      </section>
    </div>
  );
});