import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { Card } from "~/components/Core/Card/Card";
import { Link as CoreLink } from "~/components/Core/Typography/Link";
import { HiChevronLeftOutline } from "@qwikest/icons/heroicons";
import CodeExample from "~/components/Docs/CodeExample";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";

  return (
    <div>
      <div class="mb-8">
        <Link
          href={`/${locale}/docs/components/typography`}
          class="inline-flex items-center text-blue-500 hover:underline"
        >
          <HiChevronLeftOutline class="mr-1 h-5 w-5" />
          Back to Typography
        </Link>
        <h1 class="mb-3 mt-2 text-3xl font-bold">Link</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          The Link component provides a consistent way to navigate between pages
          and manage external links.
        </p>
      </div>

      <Card class="mb-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">Import</h2>
        </div>
        <CodeExample
          code={`import { Link } from "~/components/Core/Typography/Link";`}
          language="tsx"
        />
      </Card>

      {/* Basic Usage */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Basic Usage
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          The Link component seamlessly integrates with Qwik's routing system,
          automatically differentiating between internal and external links.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="flex flex-wrap items-center gap-6">
            <CoreLink href="/docs">Internal Link</CoreLink>
            <CoreLink href="https://qwik.builder.io/">External Link</CoreLink>
          </div>
        </div>
        <CodeExample
          code={`// Internal link (uses Qwik routing)
<Link href="/docs">Internal Link</Link>

// External link (opens in new tab by default)
<Link href="https://qwik.builder.io/">External Link</Link>`}
          language="tsx"
        />
      </section>

      {/* Link Variants */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Link Variants
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Links can be styled in different ways using the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            variant
          </code>{" "}
          prop.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="flex flex-col gap-4">
            <div class="flex flex-wrap items-center gap-6">
              <CoreLink href="#" variant="standard">
                Standard Link
              </CoreLink>
              <CoreLink href="#" variant="button">
                Button Link
              </CoreLink>
              <CoreLink href="#" variant="nav">
                Nav Link
              </CoreLink>
              <CoreLink href="#" variant="subtle">
                Subtle Link
              </CoreLink>
              <CoreLink href="#" variant="icon">
                Icon Link
              </CoreLink>
              <CoreLink href="#" variant="breadcrumb">
                Breadcrumb Link
              </CoreLink>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Standard link (default)
<Link href="/standard">Standard Link</Link>

// Button-style link
<Link href="/button" variant="button">Button Link</Link>

// Navigation link
<Link href="/nav" variant="nav">Nav Link</Link>

// Subtle link
<Link href="/subtle" variant="subtle">Subtle Link</Link>

// Icon link
<Link href="/icons" variant="icon">Icon Link</Link>

// Breadcrumb link
<Link href="/breadcrumb" variant="breadcrumb">Breadcrumb Link</Link>`}
          language="tsx"
        />
      </section>

      {/* Link Colors */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Link Colors
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Customize the link color using the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            color
          </code>{" "}
          prop.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <CoreLink href="#" color="primary">
              Primary Link
            </CoreLink>
            <CoreLink href="#" color="secondary">
              Secondary Link
            </CoreLink>
            <CoreLink href="#" color="tertiary">
              Tertiary Link
            </CoreLink>
            <CoreLink href="#" color="accent">
              Accent Link
            </CoreLink>
            <CoreLink href="#" color="success">
              Success Link
            </CoreLink>
            <CoreLink href="#" color="error">
              Error Link
            </CoreLink>
            <CoreLink href="#" color="warning">
              Warning Link
            </CoreLink>
            <CoreLink href="#" color="info">
              Info Link
            </CoreLink>
          </div>
        </div>
        <CodeExample
          code={`<Link href="#" color="primary">Primary Link</Link>
<Link href="#" color="secondary">Secondary Link</Link>
<Link href="#" color="tertiary">Tertiary Link</Link>
<Link href="#" color="accent">Accent Link</Link>
<Link href="#" color="success">Success Link</Link>
<Link href="#" color="error">Error Link</Link>
<Link href="#" color="warning">Warning Link</Link>
<Link href="#" color="info">Info Link</Link>`}
          language="tsx"
        />
      </section>

      {/* Underline Styles */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Underline Styles
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Control the underline behavior using the{" "}
          <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
            underline
          </code>{" "}
          prop.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="flex flex-col gap-4">
            <CoreLink href="#" underline="none">
              No Underline
            </CoreLink>
            <CoreLink href="#" underline="hover">
              Hover Underline (default)
            </CoreLink>
            <CoreLink href="#" underline="always">
              Always Underlined
            </CoreLink>
            <CoreLink href="#" underline="animate">
              Animated Underline
            </CoreLink>
          </div>
        </div>
        <CodeExample
          code={`<Link href="#" underline="none">No Underline</Link>
<Link href="#" underline="hover">Hover Underline (default)</Link>
<Link href="#" underline="always">Always Underlined</Link>
<Link href="#" underline="animate">Animated Underline</Link>`}
          language="tsx"
        />
      </section>

      {/* Sizes and Weights */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Sizes and Weights
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Customize the size and font weight of links.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="mb-6">
            <h3 class="mb-2 text-lg font-medium">Sizes</h3>
            <div class="flex flex-col gap-2">
              <CoreLink href="#" size="xs">
                Extra Small Link
              </CoreLink>
              <CoreLink href="#" size="sm">
                Small Link
              </CoreLink>
              <CoreLink href="#" size="base">
                Base Link (default)
              </CoreLink>
              <CoreLink href="#" size="lg">
                Large Link
              </CoreLink>
              <CoreLink href="#" size="xl">
                Extra Large Link
              </CoreLink>
            </div>
          </div>
          <div>
            <h3 class="mb-2 text-lg font-medium">Weights</h3>
            <div class="flex flex-col gap-2">
              <CoreLink href="#" weight="normal">
                Normal Weight
              </CoreLink>
              <CoreLink href="#" weight="medium">
                Medium Weight (default)
              </CoreLink>
              <CoreLink href="#" weight="semibold">
                Semibold Weight
              </CoreLink>
              <CoreLink href="#" weight="bold">
                Bold Weight
              </CoreLink>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Sizes
<Link href="#" size="xs">Extra Small Link</Link>
<Link href="#" size="sm">Small Link</Link>
<Link href="#" size="base">Base Link (default)</Link>
<Link href="#" size="lg">Large Link</Link>
<Link href="#" size="xl">Extra Large Link</Link>

// Weights
<Link href="#" weight="normal">Normal Weight</Link>
<Link href="#" weight="medium">Medium Weight (default)</Link>
<Link href="#" weight="semibold">Semibold Weight</Link>
<Link href="#" weight="bold">Bold Weight</Link>`}
          language="tsx"
        />
      </section>

      {/* External Link Behavior */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          External Link Behavior
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          External links automatically open in new tabs with security
          attributes. You can override this behavior.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="flex flex-col gap-4">
            <CoreLink href="https://example.com">
              Default External Link (opens in new tab)
            </CoreLink>
            <CoreLink href="https://example.com" newTab={false}>
              External Link in Same Tab
            </CoreLink>
            <CoreLink href="/api/data" external>
              Internal Path Treated as External
            </CoreLink>
          </div>
        </div>
        <CodeExample
          code={`// Opens in new tab with rel="noopener noreferrer"
<Link href="https://example.com">Default External Link</Link>

// External link that stays in the same tab
<Link href="https://example.com" newTab={false}>External Link in Same Tab</Link>

// Force link to be treated as external
<Link href="/api/data" external>Internal Path Treated as External</Link>`}
          language="tsx"
        />
      </section>

      {/* State Variants */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          State Variants
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Links can be displayed in different states.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="flex flex-col gap-4">
            <CoreLink href="#" disabled>
              Disabled Link
            </CoreLink>
            <CoreLink href="#" active>
              Active Link
            </CoreLink>

            <div class="mt-4 flex gap-4 border-b border-gray-200 dark:border-gray-700">
              <CoreLink href="#" variant="nav">
                Home
              </CoreLink>
              <CoreLink href="#" variant="nav">
                Features
              </CoreLink>
              <CoreLink href="#" variant="nav" active>
                Products
              </CoreLink>
              <CoreLink href="#" variant="nav">
                About
              </CoreLink>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Disabled link
<Link href="#" disabled>Disabled Link</Link>

// Active link (for indicating current page)
<Link href="#" active>Active Link</Link>

// Navigation links with active state
<div class="flex gap-4 border-b">
  <Link href="#" variant="nav">Home</Link>
  <Link href="#" variant="nav">Features</Link>
  <Link href="#" variant="nav" active>Products</Link>
  <Link href="#" variant="nav">About</Link>
</div>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section class="mb-12">
        <h2
          id="api"
          class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100"
        >
          API Reference
        </h2>
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Prop
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Type
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Default
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-300"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                href
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                string
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                (required)
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Link destination URL or path
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                external
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                boolean
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Auto-detect
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Whether to treat as external link
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                variant
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                LinkVariant
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                "standard"
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Link style variant
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                size
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                LinkSize
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                "base"
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Link text size
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                weight
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                LinkWeight
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                "medium"
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Font weight
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                color
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                LinkColor
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                "primary"
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Link color
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                underline
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                LinkUnderline
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                "hover"
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Underline style
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                newTab
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                boolean
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Auto-detect
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Open link in new tab
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                prefixIcon
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                JSXNode
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                -
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Icon before link text
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                suffixIcon
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                JSXNode
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                -
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Icon after link text
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                truncate
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                boolean
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                false
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Truncate text with ellipsis
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                disabled
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                boolean
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                false
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Disable the link
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                active
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                boolean
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                false
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Mark as active (for navigation)
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                secure
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                boolean
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                true
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Add security attributes to external links
              </td>
            </tr>
            <tr>
              <td class="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                class
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                string
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                -
              </td>
              <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                Additional CSS classes
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Accessibility Notes */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Accessibility
        </h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300">
          <p>The Link component follows accessibility best practices:</p>
          <ul class="list-inside list-disc space-y-2 pl-4">
            <li>
              Always provide descriptive link text that clearly indicates the
              destination
            </li>
            <li>
              Use the{" "}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                ariaLabel
              </code>{" "}
              prop to provide an accessible name for links with icons only
            </li>
            <li>
              Use the{" "}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                active
              </code>{" "}
              prop for navigation links to indicate the current page
            </li>
            <li>
              External links that open in new tabs automatically include{" "}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                rel="noopener noreferrer"
              </code>{" "}
              for security
            </li>
            <li>Component supports proper keyboard navigation</li>
            <li>Color combinations meet WCAG contrast requirements</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Best Practices
        </h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300">
          <ul class="list-inside list-disc space-y-2 pl-4">
            <li>
              Use clear, descriptive link text that indicates where the link
              leads
            </li>
            <li>Avoid generic phrases like "click here" or "learn more"</li>
            <li>
              Choose appropriate link variants based on context (use button-like
              links for call-to-action links)
            </li>
            <li>
              Use consistent styling for similar links throughout the
              application
            </li>
            <li>
              For navigation menus, use the{" "}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                nav
              </code>{" "}
              variant and mark the current page with{" "}
              <code class="rounded bg-gray-100 px-1 py-0.5 text-sm dark:bg-gray-800">
                active
              </code>
            </li>
            <li>
              For links that download files, provide a clear indication of what
              will happen
            </li>
            <li>
              Consider using icons to provide additional context (e.g., external
              link icons)
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
});
