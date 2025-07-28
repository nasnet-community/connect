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
      {/* Basic Examples */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Basic Examples</h2>

        <div class="space-y-6 rounded-lg border p-6 dark:border-gray-700">
          <div>
            <h3 class="mb-3 text-lg font-semibold">Simple Stat</h3>
            <Stat>
              <StatNumber value={2450} />
              <StatLabel>Total Orders</StatLabel>
            </Stat>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-semibold">With Icon</h3>
            <Stat variant="bordered">
              <StatIcon>📊</StatIcon>
              <StatNumber value={89.5} suffix="%" />
              <StatLabel>Success Rate</StatLabel>
            </Stat>
          </div>

          <div>
            <h3 class="mb-3 text-lg font-semibold">With Trend</h3>
            <Stat variant="elevated">
              <StatNumber value={42300} format="currency" />
              <StatLabel>Revenue</StatLabel>
              <StatTrend value={12.5} label="vs last month" />
            </Stat>
          </div>
        </div>
      </section>

      {/* Size Variations */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Size Variations</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={3} gap="lg">
            <Stat size="sm" variant="bordered">
              <StatIcon>🎯</StatIcon>
              <StatNumber value={156} />
              <StatLabel>Small Size</StatLabel>
            </Stat>

            <Stat size="md" variant="bordered">
              <StatIcon>🎯</StatIcon>
              <StatNumber value={156} />
              <StatLabel>Medium Size</StatLabel>
            </Stat>

            <Stat size="lg" variant="bordered">
              <StatIcon>🎯</StatIcon>
              <StatNumber value={156} />
              <StatLabel>Large Size</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Variants */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Variants</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={3} gap="md">
            <Stat variant="default">
              <StatNumber value={768} />
              <StatLabel>Default Variant</StatLabel>
            </Stat>

            <Stat variant="bordered">
              <StatNumber value={768} />
              <StatLabel>Bordered Variant</StatLabel>
            </Stat>

            <Stat variant="elevated">
              <StatNumber value={768} />
              <StatLabel>Elevated Variant</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Number Formatting */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Number Formatting</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={4} gap="md">
            <Stat variant="elevated">
              <StatNumber value={1234567} format="number" />
              <StatLabel>Number Format</StatLabel>
            </Stat>

            <Stat variant="elevated">
              <StatNumber
                value={1234.56}
                format="currency"
                currency="USD"
                locale="en-US"
              />
              <StatLabel>USD Currency</StatLabel>
            </Stat>

            <Stat variant="elevated">
              <StatNumber
                value={1234.56}
                format="currency"
                currency="EUR"
                locale="de-DE"
              />
              <StatLabel>EUR Currency</StatLabel>
            </Stat>

            <Stat variant="elevated">
              <StatNumber value={0.8567} format="percent" decimals={2} />
              <StatLabel>Percentage</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Custom Formatting */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Custom Formatting</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={3} gap="md">
            <Stat variant="bordered">
              <StatNumber value={42} prefix="+" suffix=" items" />
              <StatLabel>With Prefix & Suffix</StatLabel>
            </Stat>

            <Stat variant="bordered">
              <StatNumber value={1234.5678} decimals={3} />
              <StatLabel>Custom Decimals</StatLabel>
            </Stat>

            <Stat variant="bordered">
              <StatNumber value="2.5k" />
              <StatLabel>String Value</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Alignment */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Alignment Options</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={3} gap="md">
            <Stat align="left" variant="bordered">
              <StatNumber value={512} />
              <StatLabel>Left Aligned</StatLabel>
            </Stat>

            <Stat align="center" variant="bordered">
              <StatNumber value={512} />
              <StatLabel>Center Aligned</StatLabel>
            </Stat>

            <Stat align="right" variant="bordered">
              <StatNumber value={512} />
              <StatLabel>Right Aligned</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Icon Positions */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Icon Positions</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={3} gap="md">
            <Stat variant="elevated">
              <StatIcon position="left">💰</StatIcon>
              <StatNumber value={999} />
              <StatLabel>Icon Left</StatLabel>
            </Stat>

            <Stat variant="elevated" align="center">
              <StatIcon position="top">💰</StatIcon>
              <StatNumber value={999} />
              <StatLabel>Icon Top</StatLabel>
            </Stat>

            <Stat variant="elevated">
              <StatIcon position="right">💰</StatIcon>
              <StatNumber value={999} />
              <StatLabel>Icon Right</StatLabel>
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Trend Examples */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Trend Indicators</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={4} gap="md">
            <Stat variant="elevated">
              <StatNumber value={156} />
              <StatLabel>Positive Trend</StatLabel>
              <StatTrend value={23.5} />
            </Stat>

            <Stat variant="elevated">
              <StatNumber value={89} />
              <StatLabel>Negative Trend</StatLabel>
              <StatTrend value={-15.2} />
            </Stat>

            <Stat variant="elevated">
              <StatNumber value={100} />
              <StatLabel>Neutral Trend</StatLabel>
              <StatTrend value={0} />
            </Stat>

            <Stat variant="elevated">
              <StatNumber value={456} />
              <StatLabel>With Label</StatLabel>
              <StatTrend value={8.7} label="this week" />
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Complex Examples */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Complex Examples</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={3} gap="lg">
            <Stat variant="elevated" size="lg" align="center">
              <StatIcon position="top">🎯</StatIcon>
              <StatNumber value={98.5} suffix="%" decimals={1} animate />
              <StatLabel>Goal Achievement</StatLabel>
              <StatTrend value={5.2} label="vs target" />
            </Stat>

            <Stat variant="elevated" size="lg" align="center">
              <StatIcon position="top">💳</StatIcon>
              <StatNumber
                value={523400}
                format="currency"
                animate
                animationDuration={3000}
              />
              <StatLabel>Total Revenue</StatLabel>
              <StatTrend value={-2.4} format="number" label="MoM" />
            </Stat>

            <Stat variant="elevated" size="lg" align="center">
              <StatIcon position="top">👥</StatIcon>
              <StatNumber value={12543} animate />
              <StatLabel>Active Users</StatLabel>
              <StatTrend
                value={156}
                format="number"
                showIcon={false}
                label="+156 new"
              />
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Loading States</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <StatGroup columns={3} gap="md">
            <Stat variant="bordered" loading>
              <StatNumber value={0} />
              <StatLabel>Loading Default</StatLabel>
            </Stat>

            <Stat variant="bordered" size="lg" loading>
              <StatIcon>📊</StatIcon>
              <StatNumber value={0} />
              <StatLabel>Loading Large</StatLabel>
            </Stat>

            <Stat variant="elevated" loading>
              <StatNumber value={0} />
              <StatLabel>Loading with Trend</StatLabel>
              <StatTrend value={0} />
            </Stat>
          </StatGroup>
        </div>
      </section>

      {/* Responsive Grid */}
      <section>
        <h2 class="mb-4 text-2xl font-bold">Responsive Grid</h2>
        <div class="rounded-lg border p-6 dark:border-gray-700">
          <p class="mb-4 text-sm text-gray-600 dark:text-gray-400">
            This grid adjusts columns based on viewport size
          </p>
          <StatGroup columns={6} gap="md" responsive>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Stat key={i} variant="bordered">
                <StatNumber value={i * 100} />
                <StatLabel>Metric {i}</StatLabel>
              </Stat>
            ))}
          </StatGroup>
        </div>
      </section>
    </div>
  );
});
