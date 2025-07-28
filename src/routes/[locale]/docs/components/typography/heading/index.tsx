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
          Heading Component
        </h1>
        <p class="mt-2 max-w-3xl text-lg text-gray-600 dark:text-gray-300">
          Six levels of section headings with customizable weights, alignments,
          and responsive sizing
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
              The Heading component is used to render semantic HTML heading
              elements (h1-h6). It provides consistent styling across your
              application while respecting the document outline.
            </p>

            <h3>Key Features</h3>
            <ul>
              <li>Six heading levels (h1-h6) aligned with semantic HTML</li>
              <li>
                Configurable font weights (light, normal, medium, semibold,
                bold)
              </li>
              <li>Customizable text alignment</li>
              <li>Responsive sizing through the size property</li>
              <li>Truncation support for long headings</li>
              <li>Support for both light and dark themes</li>
              <li>Accessibility-first approach to heading hierarchy</li>
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
          code={`import { Heading } from '~/components/Core/Typography/Heading';`}
          language="typescript"
        />
      </section>

      {/* Usage section */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Usage
        </h2>
        <CodeExample
          code={`import { component$ } from '@builder.io/qwik';
import { Heading } from '~/components/Core/Typography/Heading';

export default component$(() => {
  return (
    <Heading level={1}>Welcome to Connect</Heading>
  );
});`}
          language="tsx"
        />
      </section>

      {/* Heading Levels */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Heading Levels
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            level
          </code>{" "}
          prop to specify the heading level (1-6). This determines both the
          visual styling and the semantic HTML element used.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-3xl font-bold text-gray-900 dark:text-white">
              Heading Level 1
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              Heading Level 2
            </div>
            <div class="text-xl font-semibold text-gray-900 dark:text-white">
              Heading Level 3
            </div>
            <div class="text-lg font-semibold text-gray-900 dark:text-white">
              Heading Level 4
            </div>
            <div class="text-base font-medium text-gray-900 dark:text-white">
              Heading Level 5
            </div>
            <div class="text-sm font-medium text-gray-900 dark:text-white">
              Heading Level 6
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Heading level={1}>Heading Level 1</Heading>
<Heading level={2}>Heading Level 2</Heading>
<Heading level={3}>Heading Level 3</Heading>
<Heading level={4}>Heading Level 4</Heading>
<Heading level={5}>Heading Level 5</Heading>
<Heading level={6}>Heading Level 6</Heading>`}
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
          prop to change the font weight of the heading.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-2xl font-light text-gray-900 dark:text-white">
              Light Weight
            </div>
            <div class="text-2xl font-normal text-gray-900 dark:text-white">
              Normal Weight
            </div>
            <div class="text-2xl font-medium text-gray-900 dark:text-white">
              Medium Weight
            </div>
            <div class="text-2xl font-semibold text-gray-900 dark:text-white">
              Semibold Weight
            </div>
            <div class="text-2xl font-bold text-gray-900 dark:text-white">
              Bold Weight
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Heading level={2} weight="light">Light Weight</Heading>
<Heading level={2} weight="normal">Normal Weight</Heading>
<Heading level={2} weight="medium">Medium Weight</Heading>
<Heading level={2} weight="semibold">Semibold Weight</Heading>
<Heading level={2} weight="bold">Bold Weight</Heading>`}
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
            <div class="text-left text-2xl font-bold text-gray-900 dark:text-white">
              Left Aligned
            </div>
            <div class="text-center text-2xl font-bold text-gray-900 dark:text-white">
              Center Aligned
            </div>
            <div class="text-right text-2xl font-bold text-gray-900 dark:text-white">
              Right Aligned
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Heading level={2} align="left">Left Aligned</Heading>
<Heading level={2} align="center">Center Aligned</Heading>
<Heading level={2} align="right">Right Aligned</Heading>`}
          language="tsx"
        />
      </section>

      {/* Truncation */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Truncation
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            isTruncated
          </code>{" "}
          prop to truncate text with an ellipsis when it overflows.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="max-w-md truncate text-2xl font-bold text-gray-900 dark:text-white">
              This is a very long heading that will be truncated with an
              ellipsis when it overflows the container width
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Heading level={2} isTruncated>
  This is a very long heading that will be truncated with an ellipsis when it overflows the container width
</Heading>`}
          language="tsx"
        />
      </section>

      {/* Custom Styling */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Custom Styling
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Add custom classes using the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            class
          </code>{" "}
          prop.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-2xl font-bold text-blue-600 underline dark:text-blue-400">
              Custom Styled Heading
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Heading level={2} class="text-blue-600 dark:text-blue-400 underline">
  Custom Styled Heading
</Heading>`}
          language="tsx"
        />
      </section>

      {/* Responsive Size */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Responsive Size
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Use the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            size
          </code>{" "}
          prop to override the default size for a specific heading level.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-4">
            <div class="text-4xl font-bold text-gray-900 dark:text-white">
              Larger Heading
            </div>
            <div class="text-base font-bold text-gray-900 dark:text-white">
              Smaller Heading
            </div>
          </div>
        </div>
        <CodeExample
          code={`<Heading level={2} size="4xl">Larger Heading</Heading>
<Heading level={2} size="base">Smaller Heading</Heading>`}
          language="tsx"
        />
      </section>

      {/* Accessibility section */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Accessibility
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Headings create a hierarchical structure that helps users of assistive
          technologies understand the page organization. Follow these guidelines
          for maximum accessibility:
        </p>
        <div class="space-y-4">
          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-2 font-medium text-gray-900 dark:text-white">
              Use Proper Heading Hierarchy
            </h3>
            <p class="text-gray-700 dark:text-gray-300">
              Start with h1 and follow a logical order (h1 → h2 → h3). Avoid
              skipping levels as it confuses screen reader users.
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-2 font-medium text-gray-900 dark:text-white">
              Maintain Semantic Structure
            </h3>
            <p class="text-gray-700 dark:text-gray-300">
              Don't choose heading levels based on their visual style. Use the{" "}
              <code>size</code> prop to adjust the visual size if needed.
            </p>
          </div>

          <div class="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="mb-2 font-medium text-gray-900 dark:text-white">
              Include Descriptive Content
            </h3>
            <p class="text-gray-700 dark:text-gray-300">
              Headings should clearly describe the content that follows them.
              Avoid using the same text for multiple headings.
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
                    level
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    1 | 2 | 3 | 4 | 5 | 6
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    -
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Heading level, determines the rendered HTML element (h1-h6)
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    weight
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'light' | 'normal' | 'medium' | 'semibold' | 'bold'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Based on level
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Font weight of the heading
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    size
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' |
                    '5xl' | '6xl'
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Based on level
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Font size override, if different from the default for the
                    heading level
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
                    Text alignment of the heading
                  </td>
                </tr>
                <tr>
                  <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                    isTruncated
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    boolean
                  </td>
                  <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    false
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Whether to truncate the text with an ellipsis if it
                    overflows
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
                    undefined
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    Additional CSS classes to apply
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
