import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Card } from "~/components/Core/Card/Card";
import {
  HiChevronLeftOutline,
  HiCodeBracketOutline,
  HiPlayOutline,
  HiCubeOutline,
} from "@qwikest/icons/heroicons";
import CodeExample from "~/components/Docs/CodeExample";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";

  const tabs = [
    { id: "overview", label: "Overview", icon: HiCubeOutline },
    { id: "examples", label: "Examples", icon: HiPlayOutline },
    { id: "api", label: "API", icon: HiCodeBracketOutline },
  ];

  return (
    <div>
      <div class="mb-8">
        <Link
          href={`/${locale}/docs/components/typography`}
          class="mb-4 inline-flex items-center text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
        >
          <HiChevronLeftOutline class="mr-1 h-4 w-4" />
          Back to Typography
        </Link>

        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Text Component
        </h1>
        <p class="mt-2 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Versatile text component with styles, sizing, weights, and
          transformation options
        </p>
      </div>

      {/* Tab navigation */}
      <div class="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav class="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              class={{
                "flex items-center gap-2 border-b-2 px-1 py-3 font-medium":
                  true,
                "border-primary-500 text-primary-600 dark:text-primary-400":
                  tab.id === "overview",
                "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-300":
                  tab.id !== "overview",
              }}
            >
              <tab.icon class="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Overview section */}
      <section class="mb-12">
        <Card variant="elevated">
          <div class="prose max-w-none dark:prose-invert">
            <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Overview
            </h2>
            <p>
              The Text component provides a consistent way to display text
              content across the application with proper typography, styling
              options, and accessibility features.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li>
                Multiple text variants (body, paragraph, caption, label, code,
                quote)
              </li>
              <li>
                Semantic HTML rendering based on variant or custom element
              </li>
              <li>Customizable font sizes, weights, alignment, and colors</li>
              <li>Responsive sizing across different breakpoints</li>
              <li>
                Text utilities for truncation, transformation, and decoration
              </li>
              <li>Screen reader support for accessibility</li>
              <li>Automatic dark mode adaptation</li>
            </ul>
          </div>
        </Card>
      </section>

      {/* Import section */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Import
        </h2>
        <CodeExample
          code={`import { Text } from '~/components/Core/Typography/Text';`}
          language="typescript"
        />
      </section>

      {/* Usage section */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Basic Usage
        </h2>
        <CodeExample
          code={`import { component$ } from '@builder.io/qwik';
import { Text } from '~/components/Core/Typography/Text';

export default component$(() => {
  return (
    <Text>This is a standard body text.</Text>
  );
});`}
          language="tsx"
        />
      </section>

      {/* Text Variants */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Text Variants
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            variant
          </code>{" "}
          prop to change the text style and semantic element.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-base text-gray-900 dark:text-white">
              Standard body text
            </div>
            <div class="text-base text-gray-900 dark:text-white">
              Paragraph text with block styling
            </div>
            <div class="text-sm text-gray-500 dark:text-gray-400">
              Caption text
            </div>
            <div class="text-base font-medium text-gray-900 dark:text-white">
              Label text
            </div>
            <div class="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-gray-900 dark:bg-gray-800 dark:text-white">
              Code text
            </div>
            <div class="border-l-4 border-gray-300 pl-4 italic text-gray-900 dark:border-gray-700 dark:text-white">
              Blockquote with special styling
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Text variant="body">Standard body text</Text>
<Text variant="paragraph">Paragraph text with block styling</Text>
<Text variant="caption">Caption text</Text>
<Text variant="label">Label text (often used with form fields)</Text>
<Text variant="code">Code text with monospace font</Text>
<Text variant="quote">Blockquote with special styling</Text>`}
          language="tsx"
        />
      </section>

      {/* Text Sizes */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Text Sizes
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            size
          </code>{" "}
          prop to change the font size.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-xs text-gray-900 dark:text-white">
              Extra small text (xs)
            </div>
            <div class="text-sm text-gray-900 dark:text-white">
              Small text (sm)
            </div>
            <div class="text-base text-gray-900 dark:text-white">
              Base size text (base) - default
            </div>
            <div class="text-lg text-gray-900 dark:text-white">
              Large text (lg)
            </div>
            <div class="text-xl text-gray-900 dark:text-white">
              Extra large text (xl)
            </div>
            <div class="text-2xl text-gray-900 dark:text-white">
              Double extra large text (2xl)
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Text size="xs">Extra small text</Text>
<Text size="sm">Small text</Text>
<Text size="base">Base size text (default)</Text>
<Text size="lg">Large text</Text>
<Text size="xl">Extra large text</Text>
<Text size="2xl">Double extra large text</Text>`}
          language="tsx"
        />
      </section>

      {/* Font Weights */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Font Weights
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            weight
          </code>{" "}
          prop to change the font weight.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-lg font-light text-gray-900 dark:text-white">
              Light weight text
            </div>
            <div class="text-lg font-normal text-gray-900 dark:text-white">
              Normal weight text (default)
            </div>
            <div class="text-lg font-medium text-gray-900 dark:text-white">
              Medium weight text
            </div>
            <div class="text-lg font-semibold text-gray-900 dark:text-white">
              Semibold weight text
            </div>
            <div class="text-lg font-bold text-gray-900 dark:text-white">
              Bold weight text
            </div>
            <div class="text-lg font-extrabold text-gray-900 dark:text-white">
              Extra bold weight text
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Text weight="light">Light weight text</Text>
<Text weight="normal">Normal weight text (default)</Text>
<Text weight="medium">Medium weight text</Text>
<Text weight="semibold">Semibold weight text</Text>
<Text weight="bold">Bold weight text</Text>
<Text weight="extrabold">Extra bold weight text</Text>`}
          language="tsx"
        />
      </section>

      {/* Text Alignment */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Text Alignment
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            align
          </code>{" "}
          prop to set the text alignment.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-left text-lg text-gray-900 dark:text-white">
              Left aligned text (default)
            </div>
            <div class="text-center text-lg text-gray-900 dark:text-white">
              Center aligned text
            </div>
            <div class="text-right text-lg text-gray-900 dark:text-white">
              Right aligned text
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Text align="left">Left aligned text (default)</Text>
<Text align="center">Center aligned text</Text>
<Text align="right">Right aligned text</Text>`}
          language="tsx"
        />
      </section>

      {/* Color Variants */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Color Variants
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            color
          </code>{" "}
          prop to change the text color.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-gray-900 dark:text-gray-100">
              Primary text color (default)
            </div>
            <div class="text-gray-700 dark:text-gray-300">
              Secondary text color
            </div>
            <div class="text-gray-500 dark:text-gray-400">
              Tertiary text color
            </div>
            <div class="text-gray-400 dark:text-gray-500">
              Subtle text color
            </div>
            <div class="text-blue-600 dark:text-blue-400">
              Accent color for emphasis
            </div>
            <div class="text-green-600 dark:text-green-400">
              Success message color
            </div>
            <div class="text-yellow-600 dark:text-yellow-400">
              Warning message color
            </div>
            <div class="text-red-600 dark:text-red-400">
              Error message color
            </div>
            <div class="text-cyan-600 dark:text-cyan-400">
              Info message color
            </div>
            <div class="rounded bg-gray-900 p-2 dark:bg-gray-100">
              <span class="text-white dark:text-gray-900">
                Inverse text color (for dark backgrounds)
              </span>
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Text color="primary">Primary text color (default)</Text>
<Text color="secondary">Secondary text color</Text>
<Text color="tertiary">Tertiary text color</Text>
<Text color="subtle">Subtle text color</Text>
<Text color="accent">Accent color for emphasis</Text>
<Text color="success">Success message color</Text>
<Text color="warning">Warning message color</Text>
<Text color="error">Error message color</Text>
<Text color="info">Info message color</Text>

{/* For dark backgrounds */}
<div class="bg-gray-900 p-2 rounded dark:bg-gray-100">
  <Text color="inverse">Inverse text color</Text>
</div>`}
          language="tsx"
        />
      </section>

      {/* Text Utilities */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Text Utilities
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          The Text component provides several utility props for common text
          formatting needs.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-6">
            <div>
              <h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Text Transformation
              </h3>
              <div class="space-y-2">
                <div class="uppercase text-gray-900 dark:text-white">
                  Uppercase text
                </div>
                <div class="lowercase text-gray-900 dark:text-white">
                  LOWERCASE TEXT
                </div>
                <div class="capitalize text-gray-900 dark:text-white">
                  capitalize first letter of each word
                </div>
              </div>
            </div>

            <div>
              <h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Text Decoration
              </h3>
              <div class="space-y-2">
                <div class="text-gray-900 underline dark:text-white">
                  Underlined text
                </div>
                <div class="text-gray-900 line-through dark:text-white">
                  Strikethrough text
                </div>
              </div>
            </div>

            <div>
              <h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Font Styling
              </h3>
              <div class="space-y-2">
                <div class="italic text-gray-900 dark:text-white">
                  Italic text
                </div>
                <div class="font-mono text-gray-900 dark:text-white">
                  Monospace font text
                </div>
              </div>
            </div>

            <div>
              <h3 class="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Truncation
              </h3>
              <div class="space-y-2">
                <div class="max-w-[200px] truncate text-gray-900 dark:text-white">
                  This long text will be truncated with an ellipsis when it
                  overflows the container width
                </div>
                <div class="line-clamp-2 max-w-[200px] text-gray-900 dark:text-white">
                  This long text will be truncated after two lines with an
                  ellipsis to indicate that there is more content available that
                  doesn't fit in the allocated space.
                </div>
              </div>
            </div>
          </div>
        </div>
        <CodeExample
          code={`{/* Text transformation */}
<Text transform="uppercase">uppercase text</Text>
<Text transform="lowercase">LOWERCASE TEXT</Text>
<Text transform="capitalize">capitalize first letter of each word</Text>

{/* Text decoration */}
<Text decoration="underline">Underlined text</Text>
<Text decoration="line-through">Strikethrough text</Text>

{/* Font styling */}
<Text italic>Italic text</Text>
<Text monospace>Monospace font text</Text>

{/* Truncation */}
<div class="w-48">
  <Text truncate>This long text will be truncated with an ellipsis</Text>
</div>

{/* Multi-line truncation */}
<div class="w-48">
  <Text truncate maxLines={2}>
    This long text will be truncated after two lines with an ellipsis
    to indicate that there is more content available.
  </Text>
</div>`}
          language="tsx"
        />
      </section>

      {/* Responsive Text */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Responsive Text
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            responsiveSize
          </code>{" "}
          prop to adjust text size at different breakpoints.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="text-sm text-gray-900 sm:text-base md:text-lg lg:text-xl xl:text-2xl dark:text-white">
            This text changes size at different breakpoints
          </div>
        </div>
        <CodeExample
          code={`<Text
  responsiveSize={{
    base: "sm",    // Small on mobile
    md: "base",    // Base size on tablets (768px+)
    lg: "lg",      // Large on desktops (1024px+)
    xl: "xl"       // Extra large on large screens (1280px+)
  }}
>
  This text will change size at different breakpoints
</Text>`}
          language="tsx"
        />
      </section>

      {/* Accessibility section */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Accessibility
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          The Text component is designed with accessibility in mind. Here are
          some best practices to ensure your text is accessible:
        </p>
        <div class="space-y-4">
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-2 font-medium text-gray-900 dark:text-white">
              Use Semantic Elements
            </h3>
            <p class="text-gray-700 dark:text-gray-300">
              Choose the appropriate{" "}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                variant
              </code>{" "}
              or{" "}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                as
              </code>{" "}
              prop to ensure proper semantic HTML elements are used.
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-2 font-medium text-gray-900 dark:text-white">
              Screen Reader Only Text
            </h3>
            <p class="text-gray-700 dark:text-gray-300">
              Use the{" "}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                srOnly
              </code>{" "}
              prop to provide text that's only available to screen readers,
              useful for adding context to visual elements.
            </p>
            <CodeExample
              code={`{/* Screen reader only text */}
<Text srOnly>This text is only announced to screen readers</Text>

{/* Descriptive text for an icon button */}
<button aria-label="Close">
  <IconX />
  <Text srOnly>Close dialog</Text>
</button>`}
              language="tsx"
            />
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-2 font-medium text-gray-900 dark:text-white">
              Color Contrast
            </h3>
            <p class="text-gray-700 dark:text-gray-300">
              Ensure sufficient color contrast between text and background,
              especially when using custom colors. All predefined colors meet
              WCAG AA standards.
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-2 font-medium text-gray-900 dark:text-white">
              Text Size
            </h3>
            <p class="text-gray-700 dark:text-gray-300">
              Maintain readable text sizes. The base size (16px) is recommended
              as a minimum for body text.
            </p>
          </div>
        </div>
      </section>

      {/* API Reference section */}
      <section class="mb-12">
        <h2 class="mb-6 flex items-center text-2xl font-bold text-gray-900 dark:text-white">
          <HiCodeBracketOutline class="mr-2 h-6 w-6 text-primary-500" />
          API Reference
        </h2>

        <Card variant="elevated">
          <div q:slot="header" class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Props
            </h3>
          </div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Default
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-transparent">
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    variant
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'body' | 'paragraph' | 'caption' | 'label' | 'code' |
                    'quote'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'body'
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Text style variant
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    as
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'p' | 'span' | 'div' | 'label' | 'strong' | 'em' | 'time' |
                    'pre' | 'code' | 'blockquote' | 'figcaption'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Based on variant
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Element to render the text as
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    size
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'base'
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Font size
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    weight
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'light' | 'normal' | 'medium' | 'semibold' | 'bold' |
                    'extrabold'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'normal'
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Font weight
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    align
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'left' | 'center' | 'right'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'left'
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Text alignment
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    color
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'primary' | 'secondary' | 'tertiary' | 'inverse' | 'accent'
                    | 'success' | 'warning' | 'error' | 'info' | 'subtle'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'primary'
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Text color
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    truncate
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    boolean
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    false
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Whether to truncate text with ellipsis if it overflows
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    maxLines
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    number
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    1
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Maximum number of lines before truncating
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    transform
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'uppercase' | 'lowercase' | 'capitalize' | 'none'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'none'
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Text transformation
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    decoration
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'underline' | 'line-through' | 'none'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'none'
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Text decoration
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    italic
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    boolean
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    false
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Whether to enable italics
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    monospace
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    boolean
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    false (true for code variant)
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Whether to enable monospace font
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    srOnly
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    boolean
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    false
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Text for screen readers only (visually hidden)
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    responsiveSize
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    ResponsiveTextSize
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Responsive size configuration
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    class
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    string
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Additional CSS classes
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    onClick$
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    QRL
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Click handler
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </section>
    </div>
  );
});
