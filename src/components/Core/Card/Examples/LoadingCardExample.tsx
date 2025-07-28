import { component$, useSignal, $ } from "@builder.io/qwik";
import { Card } from "../Card";
import { Button } from "../../button/Button";

/**
 * LoadingCardExample - Interactive loading state demonstration
 *
 * This example shows:
 * - Loading overlay with spinner
 * - Simulated async operations
 * - Loading state management
 * - User feedback during operations
 */
export const LoadingCardExample = component$(() => {
  const isLoading1 = useSignal(false);
  const isLoading2 = useSignal(false);
  const isLoading3 = useSignal(false);
  const loadingMessage = useSignal("");

  const simulateLoading = $(
    async (loadingSignal: any, message: string, duration: number = 2000) => {
      loadingSignal.value = true;
      loadingMessage.value = message;
      await new Promise((resolve) => setTimeout(resolve, duration));
      loadingSignal.value = false;
      loadingMessage.value = "";
    },
  );

  return (
    <div class="space-y-6 p-4">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Loading State Examples
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Demonstrate how cards handle loading states during async operations.
      </p>

      {/* Basic Loading Example */}
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card loading={isLoading1.value} hasHeader hasFooter hasActions>
          <div q:slot="header">
            <h3 class="font-semibold">User Profile</h3>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-4">
              <div class="h-16 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div>
                <h4 class="font-medium">John Doe</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  john.doe@example.com
                </p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400">
              Senior Software Engineer with 5+ years of experience in full-stack
              development.
            </p>
          </div>

          <div q:slot="footer">
            <span class="text-sm text-gray-500 dark:text-gray-400">
              Last active: 5 minutes ago
            </span>
          </div>

          <div q:slot="actions">
            <Button
              size="sm"
              variant="primary"
              onClick$={() =>
                simulateLoading(isLoading1, "Loading profile data...", 3000)
              }
              disabled={isLoading1.value}
            >
              Refresh Profile
            </Button>
          </div>
        </Card>

        {/* Loading with Different Variant */}
        <Card variant="elevated" loading={isLoading2.value} hasHeader>
          <div q:slot="header">
            <h3 class="font-semibold">Analytics Dashboard</h3>
          </div>

          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-2xl font-bold">1,234</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Total Users
                </p>
              </div>
              <div>
                <p class="text-2xl font-bold">89%</p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Growth Rate
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              fullWidth
              onClick$={() =>
                simulateLoading(isLoading2, "Fetching latest data...", 2000)
              }
              disabled={isLoading2.value}
            >
              Update Analytics
            </Button>
          </div>
        </Card>
      </div>

      {/* Complex Loading Example with State Messages */}
      <Card variant="bordered" loading={isLoading3.value} hasHeader hasFooter>
        <div q:slot="header">
          <h3 class="font-semibold">Data Processing Center</h3>
        </div>

        <div class="space-y-4">
          <div class="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <h4 class="mb-2 font-medium">Current Status</h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {loadingMessage.value || "System ready for processing"}
            </p>
          </div>

          <div class="space-y-2">
            <Button
              variant="success"
              fullWidth
              onClick$={() =>
                simulateLoading(
                  isLoading3,
                  "Processing data batch 1/3...",
                  1500,
                )
              }
              disabled={isLoading3.value}
            >
              Start Processing
            </Button>

            <Button
              variant="warning"
              fullWidth
              onClick$={() =>
                simulateLoading(isLoading3, "Analyzing results...", 2500)
              }
              disabled={isLoading3.value}
            >
              Analyze Data
            </Button>

            <Button
              variant="error"
              fullWidth
              onClick$={() =>
                simulateLoading(isLoading3, "Clearing cache...", 1000)
              }
              disabled={isLoading3.value}
            >
              Clear Cache
            </Button>
          </div>
        </div>

        <div q:slot="footer">
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {isLoading3.value
              ? "Operation in progress..."
              : "All systems operational"}
          </span>
        </div>
      </Card>

      {/* Loading States Comparison */}
      <div class="mt-8">
        <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Loading Behavior Comparison
        </h3>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          {["default", "elevated", "gradient"].map((variant) => (
            <Card key={variant} variant={variant as any} loading={true}>
              <h4 class="mb-2 font-medium">Always Loading</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                This shows how the {variant} variant looks with a loading
                overlay.
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <Card variant="info" hasHeader>
        <div q:slot="header">
          <h3 class="font-semibold">Loading State Best Practices</h3>
        </div>

        <ul class="space-y-2 text-sm">
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-info-600 dark:text-info-400">•</span>
            <span>Always provide visual feedback during async operations</span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-info-600 dark:text-info-400">•</span>
            <span>
              Disable interactive elements while loading to prevent duplicate
              requests
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-info-600 dark:text-info-400">•</span>
            <span>
              Consider showing progress messages for long-running operations
            </span>
          </li>
          <li class="flex items-start gap-2">
            <span class="mt-0.5 text-info-600 dark:text-info-400">•</span>
            <span>
              The loading overlay preserves content layout to prevent layout
              shift
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
});
