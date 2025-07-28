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
        <h1 class="mb-4 text-3xl font-bold">Stat Component</h1>
        <p class="mb-6 text-lg text-gray-700 dark:text-gray-300">
          A comprehensive statistics display component for presenting key
          metrics, KPIs, and numerical data with support for formatting, trends,
          and animations.
        </p>
      </section>

      {/* Key Features */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Key Features</h2>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 font-semibold">🎨 Multiple Variants</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Choose from default, bordered, or elevated styles to match your
              design needs.
            </p>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 font-semibold">📊 Number Formatting</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Built-in support for currency, percentage, and custom number
              formatting.
            </p>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 font-semibold">📈 Trend Indicators</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Show trends with automatic color coding and directional icons.
            </p>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 font-semibold">✨ Animations</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Smooth count-up animations for engaging number presentations.
            </p>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 font-semibold">📱 Responsive</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Responsive grid layouts that adapt to different screen sizes.
            </p>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 font-semibold">♿ Accessible</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Built with accessibility in mind, including proper ARIA
              attributes.
            </p>
          </div>
        </div>
      </section>

      {/* Basic Example */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Basic Example</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <div class="mb-6">
            <Stat variant="elevated">
              <StatIcon>💰</StatIcon>
              <StatNumber value={42350} format="currency" />
              <StatLabel>Total Revenue</StatLabel>
              <StatTrend value={12.5} label="vs last month" />
            </Stat>
          </div>

          <pre class="rounded bg-gray-100 p-4 text-sm dark:bg-gray-800">
            {`<Stat variant="elevated">
  <StatIcon>💰</StatIcon>
  <StatNumber value={42350} format="currency" />
  <StatLabel>Total Revenue</StatLabel>
  <StatTrend value={12.5} label="vs last month" />
</Stat>`}
          </pre>
        </div>
      </section>

      {/* Component Anatomy */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Component Anatomy</h2>
        <div class="space-y-4">
          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 text-lg font-semibold">Stat</h3>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
              The main container component that provides context and styling for
              child components.
            </p>
            <code class="text-sm text-blue-600 dark:text-blue-400">
              import {"{ Stat }"} from "~/components/Core/DataDisplay/Stat";
            </code>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 text-lg font-semibold">StatNumber</h3>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Displays the main numeric value with formatting and animation
              options.
            </p>
            <code class="text-sm text-blue-600 dark:text-blue-400">
              import {"{ StatNumber }"} from
              "~/components/Core/DataDisplay/Stat";
            </code>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 text-lg font-semibold">StatLabel</h3>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Provides a descriptive label for the statistic.
            </p>
            <code class="text-sm text-blue-600 dark:text-blue-400">
              import {"{ StatLabel }"} from
              "~/components/Core/DataDisplay/Stat";
            </code>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 text-lg font-semibold">StatIcon</h3>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Optional icon to visually represent the statistic.
            </p>
            <code class="text-sm text-blue-600 dark:text-blue-400">
              import {"{ StatIcon }"} from "~/components/Core/DataDisplay/Stat";
            </code>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 text-lg font-semibold">StatTrend</h3>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Shows trend information with automatic direction indicators.
            </p>
            <code class="text-sm text-blue-600 dark:text-blue-400">
              import {"{ StatTrend }"} from
              "~/components/Core/DataDisplay/Stat";
            </code>
          </div>

          <div class="rounded-lg border p-4 dark:border-gray-700">
            <h3 class="mb-2 text-lg font-semibold">StatGroup</h3>
            <p class="mb-2 text-sm text-gray-600 dark:text-gray-400">
              Container for organizing multiple stats in a responsive grid
              layout.
            </p>
            <code class="text-sm text-blue-600 dark:text-blue-400">
              import {"{ StatGroup }"} from
              "~/components/Core/DataDisplay/Stat";
            </code>
          </div>
        </div>
      </section>

      {/* Common Use Cases */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Common Use Cases</h2>
        <div class="space-y-6">
          <div>
            <h3 class="mb-3 text-lg font-semibold">Dashboard Metrics</h3>
            <StatGroup columns={4} gap="md">
              <Stat variant="bordered">
                <StatNumber value={1234} animate />
                <StatLabel>Total Users</StatLabel>
                <StatTrend value={5.4} />
              </Stat>

              <Stat variant="bordered">
                <StatNumber value={89.2} suffix="%" />
                <StatLabel>Completion Rate</StatLabel>
                <StatTrend value={-2.1} />
              </Stat>

              <Stat variant="bordered">
                <StatNumber value={42} prefix="+" />
                <StatLabel>New Features</StatLabel>
                <StatTrend value={0} />
              </Stat>

              <Stat variant="bordered">
                <StatNumber value={98765} format="currency" />
                <StatLabel>Revenue</StatLabel>
                <StatTrend value={15.7} />
              </Stat>
            </StatGroup>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-semibold">Analytics Summary</h3>
            <StatGroup columns={3} gap="lg">
              <Stat variant="elevated" size="lg" align="center">
                <StatIcon position="top">📊</StatIcon>
                <StatNumber value={2.5} suffix="M" />
                <StatLabel>Page Views</StatLabel>
              </Stat>

              <Stat variant="elevated" size="lg" align="center">
                <StatIcon position="top">⏱️</StatIcon>
                <StatNumber value="3:45" />
                <StatLabel>Avg. Session</StatLabel>
              </Stat>

              <Stat variant="elevated" size="lg" align="center">
                <StatIcon position="top">📈</StatIcon>
                <StatNumber value={67.8} suffix="%" />
                <StatLabel>Conversion Rate</StatLabel>
              </Stat>
            </StatGroup>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Best Practices</h2>
        <div class="space-y-3">
          <div class="flex items-start space-x-2">
            <span class="text-green-500">✓</span>
            <p class="text-sm">
              Use consistent formatting across related statistics for better
              readability.
            </p>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-green-500">✓</span>
            <p class="text-sm">
              Include trend indicators when showing time-based comparisons.
            </p>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-green-500">✓</span>
            <p class="text-sm">
              Use icons sparingly and ensure they add meaningful context.
            </p>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-green-500">✓</span>
            <p class="text-sm">
              Enable animations for initial page loads but consider user
              preferences for reduced motion.
            </p>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-green-500">✓</span>
            <p class="text-sm">
              Group related statistics together using StatGroup for better
              organization.
            </p>
          </div>
          <div class="flex items-start space-x-2">
            <span class="text-green-500">✓</span>
            <p class="text-sm">
              Use appropriate number formatting (currency, percentage) for
              clarity.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
});
