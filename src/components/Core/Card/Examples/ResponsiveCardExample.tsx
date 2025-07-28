import { component$ } from "@builder.io/qwik";
import { Card } from "../Card";
import { Button } from "../../button/Button";

/**
 * ResponsiveCardExample - Demonstrating responsive behavior
 *
 * This example shows:
 * - Mobile-first responsive design
 * - Container queries support
 * - Adaptive layouts across different screen sizes
 * - Touch-friendly interfaces
 */
export const ResponsiveCardExample = component$(() => {
  const dashboardCards = [
    { title: "Total Revenue", value: "$45,231", change: "+12%", trend: "up" },
    { title: "Active Users", value: "2,543", change: "+8%", trend: "up" },
    { title: "Conversion Rate", value: "3.24%", change: "-2%", trend: "down" },
    {
      title: "Customer Satisfaction",
      value: "94%",
      change: "+5%",
      trend: "up",
    },
  ];

  return (
    <div class="space-y-8 p-4">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Responsive Card Examples
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Explore how cards adapt to different screen sizes and container widths
        with mobile-first responsive design.
      </p>

      {/* Dashboard Grid - Responsive columns */}
      <section>
        <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Dashboard Metrics
        </h3>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Grid adapts from 1 column on mobile to 4 columns on desktop
        </p>

        <div class="grid grid-cols-1 gap-4 mobile:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4">
          {dashboardCards.map((metric) => (
            <Card key={metric.title} variant="elevated" class="text-center">
              <div class="space-y-2">
                <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {metric.title}
                </h4>
                <p class="text-2xl font-bold text-gray-900 mobile:text-3xl dark:text-gray-100">
                  {metric.value}
                </p>
                <div
                  class={`flex items-center justify-center gap-1 text-sm ${
                    metric.trend === "up"
                      ? "text-success-600 dark:text-success-400"
                      : "text-error-600 dark:text-error-400"
                  }`}
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    {metric.trend === "up" ? (
                      <path
                        fill-rule="evenodd"
                        d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    ) : (
                      <path
                        fill-rule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    )}
                  </svg>
                  {metric.change}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Container Query Example */}
      <section>
        <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Container Query Support
        </h3>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Cards adapt based on their container width, not just viewport width
        </p>

        <div class="space-y-6">
          {/* Large container */}
          <div class="w-full">
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Full width container
            </p>
            <Card
              variant="bordered"
              hasHeader
              hasFooter
              hasActions
              containerClass="@container/large"
            >
              <div q:slot="header">
                <h4 class="font-semibold">Adaptive Card Layout</h4>
              </div>

              <div class="flex flex-col gap-4 @[40rem]/large:flex-row">
                <div class="flex-1">
                  <h5 class="mb-2 font-medium">Primary Content</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    This content layout changes from vertical stacking on narrow
                    containers to horizontal layout on wider containers using
                    container queries.
                  </p>
                </div>
                <div class="w-full rounded bg-gray-100 p-4 @[40rem]/large:w-48 dark:bg-gray-800">
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Sidebar content adapts its width based on container size.
                  </p>
                </div>
              </div>

              <div q:slot="footer">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  Container-responsive layout
                </span>
              </div>

              <div q:slot="actions">
                <Button size="sm" variant="primary">
                  Action
                </Button>
              </div>
            </Card>
          </div>

          {/* Medium container */}
          <div class="max-w-2xl">
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Medium width container (max-w-2xl)
            </p>
            <Card
              variant="bordered"
              hasHeader
              containerClass="@container/medium"
            >
              <div q:slot="header">
                <h4 class="font-semibold">Medium Container</h4>
              </div>

              <div class="grid grid-cols-1 gap-4 @[30rem]/medium:grid-cols-2">
                <div class="space-y-2">
                  <h5 class="font-medium">Feature A</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Grid switches from 1 to 2 columns at 30rem container width.
                  </p>
                </div>
                <div class="space-y-2">
                  <h5 class="font-medium">Feature B</h5>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    Container queries provide more predictable layouts.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Small container */}
          <div class="max-w-sm">
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Small width container (max-w-sm)
            </p>
            <Card
              variant="bordered"
              hasHeader
              containerClass="@container/small"
            >
              <div q:slot="header">
                <h4 class="text-sm font-semibold @[20rem]/small:text-base">
                  Small Container
                </h4>
              </div>

              <div class="space-y-3">
                <p class="text-xs text-gray-600 @[20rem]/small:text-sm dark:text-gray-400">
                  Text size and spacing adapt to container width. This ensures
                  optimal readability regardless of container constraints.
                </p>
                <Button
                  size="sm"
                  variant="primary"
                  fullWidth
                  class="text-xs @[20rem]/small:text-sm"
                >
                  Responsive Button
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mobile-First Example */}
      <section>
        <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Mobile-First Design
        </h3>
        <p class="mb-6 text-sm text-gray-600 dark:text-gray-400">
          Cards designed with mobile users in mind, scaling up to larger screens
        </p>

        <Card variant="elevated" hasHeader hasFooter hasActions>
          <div q:slot="header">
            <h4 class="font-semibold">Mobile-Optimized Card</h4>
          </div>

          <div class="space-y-4">
            {/* Touch-friendly buttons */}
            <div class="grid grid-cols-1 gap-3 mobile:grid-cols-2 tablet:grid-cols-4">
              {["Option A", "Option B", "Option C", "Option D"].map(
                (option) => (
                  <button
                    key={option}
                    class="min-h-[44px] touch-manipulation rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                  >
                    {option}
                  </button>
                ),
              )}
            </div>

            {/* Responsive content */}
            <div class="rounded-lg bg-gray-50 p-3 mobile:p-4 tablet:p-6 dark:bg-gray-800">
              <h5 class="mb-2 font-medium">Responsive Padding</h5>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Padding increases from mobile (12px) to tablet (24px) to desktop
                (24px) for better content density on larger screens.
              </p>
            </div>

            {/* Stack to row layout */}
            <div class="flex flex-col gap-3 mobile:flex-row mobile:gap-4">
              <div class="flex-1">
                <label class="mb-1 block text-sm font-medium">
                  Mobile-First Input
                </label>
                <input
                  type="text"
                  placeholder="Stacks vertically on mobile"
                  class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
              <div class="flex-1">
                <label class="mb-1 block text-sm font-medium">
                  Side by Side
                </label>
                <input
                  type="text"
                  placeholder="Horizontal on larger screens"
                  class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
                />
              </div>
            </div>
          </div>

          <div
            q:slot="footer"
            class="flex flex-col items-start justify-between gap-2 mobile:flex-row mobile:items-center mobile:gap-0"
          >
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Responsive footer layout
            </span>
            <span class="text-xs text-gray-400 dark:text-gray-500">
              Updates to horizontal on mobile breakpoint
            </span>
          </div>

          <div
            q:slot="actions"
            class="flex flex-col gap-2 mobile:flex-row mobile:gap-3"
          >
            <Button size="sm" variant="outline" fullWidth class="mobile:w-auto">
              Cancel
            </Button>
            <Button size="sm" variant="primary" fullWidth class="mobile:w-auto">
              Save Changes
            </Button>
          </div>
        </Card>
      </section>

      {/* Breakpoint Reference */}
      <Card variant="info" hasHeader>
        <div q:slot="header">
          <h3 class="font-semibold">Responsive Breakpoints Reference</h3>
        </div>

        <div class="space-y-4">
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-info-200 dark:border-info-800">
                  <th class="py-2 text-left">Breakpoint</th>
                  <th class="py-2 text-left">Class Prefix</th>
                  <th class="py-2 text-left">Min Width</th>
                  <th class="py-2 text-left">Usage</th>
                </tr>
              </thead>
              <tbody class="space-y-1">
                <tr>
                  <td class="py-1 font-medium">Default</td>
                  <td class="py-1">
                    <code class="rounded bg-info-100 px-1 dark:bg-info-900">
                      none
                    </code>
                  </td>
                  <td class="py-1">0px</td>
                  <td class="py-1">Mobile-first base styles</td>
                </tr>
                <tr>
                  <td class="py-1 font-medium">Mobile</td>
                  <td class="py-1">
                    <code class="rounded bg-info-100 px-1 dark:bg-info-900">
                      mobile:
                    </code>
                  </td>
                  <td class="py-1">480px</td>
                  <td class="py-1">Large phones, small tablets</td>
                </tr>
                <tr>
                  <td class="py-1 font-medium">Tablet</td>
                  <td class="py-1">
                    <code class="rounded bg-info-100 px-1 dark:bg-info-900">
                      tablet:
                    </code>
                  </td>
                  <td class="py-1">768px</td>
                  <td class="py-1">Tablets, small laptops</td>
                </tr>
                <tr>
                  <td class="py-1 font-medium">Desktop</td>
                  <td class="py-1">
                    <code class="rounded bg-info-100 px-1 dark:bg-info-900">
                      desktop:
                    </code>
                  </td>
                  <td class="py-1">1024px</td>
                  <td class="py-1">Desktops, large screens</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 rounded-lg bg-info-50 p-3 dark:bg-info-950">
            <h5 class="mb-2 font-medium">Container Query Support</h5>
            <p class="text-sm">
              Cards also support container queries with{" "}
              <code class="rounded bg-info-100 px-1 dark:bg-info-900">
                @[width]:
              </code>
              syntax for even more responsive control based on container size
              rather than viewport.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
});
