import { component$ } from "@builder.io/qwik";
import {
  Stat,
  StatNumber,
  StatLabel,
  StatIcon,
  StatTrend,
  StatGroup,
} from "../index";

export default component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h1 class="mb-4 text-3xl font-bold">Usage Guidelines</h1>
        <p class="mb-6 text-lg text-gray-700 dark:text-gray-300">
          Learn how to effectively use the Stat component in your applications
          with best practices, patterns, and implementation tips.
        </p>
      </section>

      {/* Basic Usage */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Basic Usage</h2>
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Import the Stat components from the Core DataDisplay module:
          </p>

          <pre class="rounded bg-gray-100 p-4 text-sm dark:bg-gray-800">
            {`import { 
  Stat, 
  StatNumber, 
  StatLabel, 
  StatIcon, 
  StatTrend, 
  StatGroup 
} from "~/components/Core/DataDisplay/Stat";`}
          </pre>

          <p class="text-gray-700 dark:text-gray-300">
            Create a simple stat by combining the main components:
          </p>

          <div class="rounded-lg border p-6 dark:border-gray-700">
            <Stat>
              <StatNumber value={1234} />
              <StatLabel>Total Users</StatLabel>
            </Stat>

            <pre class="mt-4 rounded bg-gray-100 p-4 text-sm dark:bg-gray-800">
              {`<Stat>
  <StatNumber value={1234} />
  <StatLabel>Total Users</StatLabel>
</Stat>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Number Formatting */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Number Formatting</h2>
        <div class="space-y-6">
          <p class="text-gray-700 dark:text-gray-300">
            The StatNumber component supports various formatting options:
          </p>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="rounded-lg border p-4 dark:border-gray-700">
              <h3 class="mb-3 font-semibold">Currency Format</h3>
              <Stat variant="bordered">
                <StatNumber
                  value={12345.67}
                  format="currency"
                  currency="USD"
                  decimals={2}
                />
                <StatLabel>Revenue (USD)</StatLabel>
              </Stat>
              <pre class="mt-3 rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                {`<StatNumber 
  value={12345.67} 
  format="currency" 
  currency="USD"
  decimals={2}
/>`}
              </pre>
            </div>

            <div class="rounded-lg border p-4 dark:border-gray-700">
              <h3 class="mb-3 font-semibold">Percentage Format</h3>
              <Stat variant="bordered">
                <StatNumber value={0.856} format="percent" decimals={1} />
                <StatLabel>Success Rate</StatLabel>
              </Stat>
              <pre class="mt-3 rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                {`<StatNumber 
  value={0.856} 
  format="percent" 
  decimals={1}
/>`}
              </pre>
            </div>

            <div class="rounded-lg border p-4 dark:border-gray-700">
              <h3 class="mb-3 font-semibold">Custom Format</h3>
              <Stat variant="bordered">
                <StatNumber value={42} prefix="+" suffix=" items" />
                <StatLabel>New Inventory</StatLabel>
              </Stat>
              <pre class="mt-3 rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                {`<StatNumber 
  value={42} 
  prefix="+" 
  suffix=" items"
/>`}
              </pre>
            </div>

            <div class="rounded-lg border p-4 dark:border-gray-700">
              <h3 class="mb-3 font-semibold">Locale-Specific</h3>
              <Stat variant="bordered">
                <StatNumber value={1234567} format="number" locale="de-DE" />
                <StatLabel>German Format</StatLabel>
              </Stat>
              <pre class="mt-3 rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">
                {`<StatNumber 
  value={1234567} 
  format="number"
  locale="de-DE"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Working with Trends */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Working with Trends</h2>
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Use StatTrend to show directional changes with automatic color
            coding:
          </p>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-lg border p-4 dark:border-gray-700">
              <Stat variant="elevated">
                <StatNumber value={523} />
                <StatLabel>Sales</StatLabel>
                <StatTrend value={15.3} />
              </Stat>
              <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Positive trend (green)
              </p>
            </div>

            <div class="rounded-lg border p-4 dark:border-gray-700">
              <Stat variant="elevated">
                <StatNumber value={89} />
                <StatLabel>Costs</StatLabel>
                <StatTrend value={-8.2} />
              </Stat>
              <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Negative trend (red)
              </p>
            </div>

            <div class="rounded-lg border p-4 dark:border-gray-700">
              <Stat variant="elevated">
                <StatNumber value={100} />
                <StatLabel>Stable</StatLabel>
                <StatTrend value={0} />
              </Stat>
              <p class="mt-2 text-xs text-gray-600 dark:text-gray-400">
                Neutral trend (gray)
              </p>
            </div>
          </div>

          <pre class="rounded bg-gray-100 p-4 text-sm dark:bg-gray-800">
            {`// Basic trend
<StatTrend value={15.3} />

// With custom label
<StatTrend value={-8.2} label="vs last week" />

// Number format instead of percentage
<StatTrend value={123} format="number" label="new users" />`}
          </pre>
        </div>
      </section>

      {/* Icon Usage */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Icon Usage</h2>
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Icons can be positioned in different locations relative to the stat
            content:
          </p>

          <div class="grid gap-4 md:grid-cols-3">
            <div class="rounded-lg border p-4 dark:border-gray-700">
              <Stat variant="bordered">
                <StatIcon position="left">💼</StatIcon>
                <StatNumber value={45} />
                <StatLabel>Icon Left</StatLabel>
              </Stat>
            </div>

            <div class="rounded-lg border p-4 dark:border-gray-700">
              <Stat variant="bordered" align="center">
                <StatIcon position="top">💼</StatIcon>
                <StatNumber value={45} />
                <StatLabel>Icon Top</StatLabel>
              </Stat>
            </div>

            <div class="rounded-lg border p-4 dark:border-gray-700">
              <Stat variant="bordered">
                <StatIcon position="right">💼</StatIcon>
                <StatNumber value={45} />
                <StatLabel>Icon Right</StatLabel>
              </Stat>
            </div>
          </div>
        </div>
      </section>

      {/* Animation */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Animation</h2>
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Enable count-up animations for engaging number presentations:
          </p>

          <div class="rounded-lg border p-6 dark:border-gray-700">
            <button
              class="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              onClick$={() => window.location.reload()}
            >
              Refresh to see animation
            </button>

            <StatGroup columns={3} gap="md">
              <Stat variant="elevated">
                <StatNumber value={1234} animate animationDuration={2000} />
                <StatLabel>2s Animation</StatLabel>
              </Stat>

              <Stat variant="elevated">
                <StatNumber value={5678} animate animationDuration={3000} />
                <StatLabel>3s Animation</StatLabel>
              </Stat>

              <Stat variant="elevated">
                <StatNumber value={9999} animate animationDuration={4000} />
                <StatLabel>4s Animation</StatLabel>
              </Stat>
            </StatGroup>

            <pre class="mt-4 rounded bg-gray-100 p-4 text-sm dark:bg-gray-800">
              {`<StatNumber 
  value={1234} 
  animate 
  animationDuration={2000} 
/>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Responsive Grids */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Responsive Grids</h2>
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Use StatGroup to create responsive grid layouts:
          </p>

          <div class="rounded-lg border p-6 dark:border-gray-700">
            <StatGroup columns={4} gap="md" responsive>
              {["Users", "Revenue", "Orders", "Growth"].map((label, i) => (
                <Stat key={label} variant="bordered">
                  <StatNumber value={(i + 1) * 234} />
                  <StatLabel>{label}</StatLabel>
                </Stat>
              ))}
            </StatGroup>

            <pre class="mt-4 rounded bg-gray-100 p-4 text-sm dark:bg-gray-800">
              {`<StatGroup columns={4} gap="md" responsive>
  {stats.map((stat) => (
    <Stat key={stat.id} variant="bordered">
      <StatNumber value={stat.value} />
      <StatLabel>{stat.label}</StatLabel>
    </Stat>
  ))}
</StatGroup>`}
            </pre>
          </div>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Loading States</h2>
        <div class="space-y-4">
          <p class="text-gray-700 dark:text-gray-300">
            Show skeleton loading states while data is being fetched:
          </p>

          <div class="rounded-lg border p-6 dark:border-gray-700">
            <StatGroup columns={3} gap="md">
              <Stat variant="bordered" loading>
                <StatNumber value={0} />
                <StatLabel>Loading...</StatLabel>
              </Stat>

              <Stat variant="bordered" loading>
                <StatIcon>📊</StatIcon>
                <StatNumber value={0} />
                <StatLabel>Loading...</StatLabel>
              </Stat>

              <Stat variant="bordered" loading>
                <StatNumber value={0} />
                <StatLabel>Loading...</StatLabel>
                <StatTrend value={0} />
              </Stat>
            </StatGroup>
          </div>
        </div>
      </section>

      {/* Common Patterns */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Common Patterns</h2>

        <div class="space-y-6">
          <div>
            <h3 class="mb-3 text-lg font-semibold">Dashboard Header Stats</h3>
            <div class="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
              <StatGroup columns={4} gap="lg">
                <Stat variant="elevated" size="lg">
                  <StatIcon position="top">💰</StatIcon>
                  <StatNumber value={52340} format="currency" animate />
                  <StatLabel>Total Revenue</StatLabel>
                  <StatTrend value={12.5} label="MoM" />
                </Stat>

                <Stat variant="elevated" size="lg">
                  <StatIcon position="top">👥</StatIcon>
                  <StatNumber value={8234} animate />
                  <StatLabel>Active Users</StatLabel>
                  <StatTrend value={-2.3} label="MoM" />
                </Stat>

                <Stat variant="elevated" size="lg">
                  <StatIcon position="top">📈</StatIcon>
                  <StatNumber value={89.2} suffix="%" animate />
                  <StatLabel>Conversion</StatLabel>
                  <StatTrend value={5.7} label="MoM" />
                </Stat>

                <Stat variant="elevated" size="lg">
                  <StatIcon position="top">⚡</StatIcon>
                  <StatNumber value={1.2} suffix="s" />
                  <StatLabel>Avg Response</StatLabel>
                  <StatTrend value={-15} label="MoM" />
                </Stat>
              </StatGroup>
            </div>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-semibold">Compact Inline Stats</h3>
            <div class="flex flex-wrap gap-4">
              <Stat size="sm">
                <StatNumber value={42} prefix="+" />
                <StatLabel secondary>new today</StatLabel>
              </Stat>

              <Stat size="sm">
                <StatNumber value={156} />
                <StatLabel secondary>in queue</StatLabel>
              </Stat>

              <Stat size="sm">
                <StatNumber value={98.5} suffix="%" />
                <StatLabel secondary>uptime</StatLabel>
              </Stat>
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Best Practices</h2>
        <div class="space-y-4">
          <div class="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
            <h3 class="mb-2 font-semibold text-green-800 dark:text-green-200">
              Do's
            </h3>
            <ul class="list-inside list-disc space-y-1 text-sm text-green-700 dark:text-green-300">
              <li>Use consistent number formatting across related stats</li>
              <li>Include trend indicators for time-based comparisons</li>
              <li>Group related statistics using StatGroup</li>
              <li>Enable animations for initial page loads</li>
              <li>Use appropriate semantic labels for accessibility</li>
              <li>Consider viewport size when setting column counts</li>
            </ul>
          </div>

          <div class="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h3 class="mb-2 font-semibold text-red-800 dark:text-red-200">
              Don'ts
            </h3>
            <ul class="list-inside list-disc space-y-1 text-sm text-red-700 dark:text-red-300">
              <li>Don't overuse icons - they should add meaningful context</li>
              <li>Avoid mixing different number formats in the same group</li>
              <li>Don't use animations for frequently updating values</li>
              <li>Avoid too many decimal places for readability</li>
              <li>Don't use trend indicators without time context</li>
              <li>Avoid overcrowding stat groups on mobile devices</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibility Notes */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Accessibility Considerations</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <ul class="space-y-3 text-sm">
            <li class="flex items-start">
              <span class="mr-2 text-blue-500">•</span>
              <div>
                <strong>Screen Readers:</strong> Numbers are properly formatted
                for screen reader announcement using semantic HTML and ARIA
                attributes.
              </div>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-blue-500">•</span>
              <div>
                <strong>Reduced Motion:</strong> Animations respect user
                preferences for reduced motion through CSS media queries.
              </div>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-blue-500">•</span>
              <div>
                <strong>Color Contrast:</strong> Trend colors meet WCAG AA
                standards for contrast against both light and dark backgrounds.
              </div>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-blue-500">•</span>
              <div>
                <strong>Keyboard Navigation:</strong> Interactive elements
                within stats maintain proper focus management.
              </div>
            </li>
            <li class="flex items-start">
              <span class="mr-2 text-blue-500">•</span>
              <div>
                <strong>Loading States:</strong> Loading indicators include
                aria-busy attributes for assistive technology.
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
});
