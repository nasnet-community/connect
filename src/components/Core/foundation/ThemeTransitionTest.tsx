import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { Theme } from "./ThemeToggle";

/**
 * ThemeTransitionTest component
 *
 * This component tests the performance of theme transitions by measuring:
 * 1. Time to apply the theme change
 * 2. Time to complete the animation
 * 3. Frame rate during animation
 *
 * It provides insights into the performance impact of theme transitions
 * and can be used to optimize the animation parameters.
 */
export const ThemeTransitionTest = component$(() => {
  const activeTheme = useSignal<Theme>("light");
  const isTransitioning = useSignal(false);
  const transitionResults = useSignal<{
    applyTime: number;
    animationTime: number;
    frameRate: number;
    elementCount: number;
    timestamp: string;
  } | null>(null);

  // Frame data for measuring performance
  const frameData = useSignal<number[]>([]);

  // Apply theme with performance measurements
  const applyThemeWithMetrics = $((newTheme: Theme) => {
    // Reset measurements
    frameData.value = [];
    isTransitioning.value = true;

    // Start timing
    const startTime = performance.now();

    // Count the number of elements that will be affected by transition
    const elementCount = document.querySelectorAll("*").length;

    // Add transition class to enable animation
    document.documentElement.classList.add("transition-theme");

    // Apply theme change
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Measure time to apply theme (before animation starts)
    const applyEndTime = performance.now();

    // Set up frame rate measurement
    let animationFrameId: number;
    const frameRateMeasurement = (timestamp: number) => {
      frameData.value = [...frameData.value, timestamp];
      animationFrameId = requestAnimationFrame(frameRateMeasurement);
    };

    // Start measuring frames
    animationFrameId = requestAnimationFrame(frameRateMeasurement);

    // After animation completes, calculate metrics
    setTimeout(() => {
      // Stop frame measurement
      cancelAnimationFrame(animationFrameId);

      // Remove transition class
      document.documentElement.classList.remove("transition-theme");

      // Animation end time
      const endTime = performance.now();

      // Calculate metrics
      const applyTime = applyEndTime - startTime;
      const animationTime = endTime - startTime;

      // Calculate frame rate (if we have enough frames)
      let frameRate = 0;
      if (frameData.value.length > 1) {
        const frameTimes = [];
        for (let i = 1; i < frameData.value.length; i++) {
          frameTimes.push(frameData.value[i] - frameData.value[i - 1]);
        }
        const avgFrameTime =
          frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
        frameRate = 1000 / avgFrameTime;
      }

      // Record results
      transitionResults.value = {
        applyTime,
        animationTime,
        frameRate,
        elementCount,
        timestamp: new Date().toISOString(),
      };

      // Update state
      isTransitioning.value = false;
      activeTheme.value = newTheme;
    }, 500); // Slightly longer than animation duration
  });

  // Toggle theme
  const toggleTheme = $(() => {
    const newTheme: Theme = activeTheme.value === "light" ? "dark" : "light";
    applyThemeWithMetrics(newTheme);
  });

  // Ensures we start with a clean slate (no transition class)
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    document.documentElement.classList.remove("transition-theme");
  });

  return (
    <div class="space-y-6 rounded-lg border border-border bg-white p-6 dark:border-border-dark dark:bg-surface-dark">
      <div>
        <h2 class="mb-2 text-2xl font-semibold">
          Theme Transition Performance Test
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          This component measures the performance of theme transitions by
          toggling between light and dark modes.
        </p>
      </div>

      <div class="bg-surface-secondary dark:bg-surface-dark-secondary flex items-center justify-between gap-4 rounded-lg p-4">
        <div>
          <p class="font-medium">
            Current theme:{" "}
            <span class="text-primary-600 dark:text-primary-400">
              {activeTheme.value}
            </span>
          </p>
          <p class="text-text-muted dark:text-text-dark-muted text-sm">
            {isTransitioning.value ? "Transitioning..." : "Ready to test"}
          </p>
        </div>

        <button
          onClick$={toggleTheme}
          disabled={isTransitioning.value}
          class={`rounded-md px-4 py-2 font-medium ${
            isTransitioning.value
              ? "cursor-not-allowed bg-neutral-300 dark:bg-neutral-700"
              : "bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500"
          }`}
        >
          Toggle Theme
        </button>
      </div>

      {/* Performance Results */}
      {transitionResults.value && (
        <div class="overflow-hidden rounded-lg border border-border dark:border-border-dark">
          <div class="border-b border-border bg-neutral-50 px-4 py-3 dark:border-border-dark dark:bg-neutral-800">
            <h3 class="font-medium">Performance Results</h3>
          </div>

          <div class="space-y-2 p-4">
            <div class="grid grid-cols-2 gap-4">
              <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-md p-3">
                <p class="text-text-muted dark:text-text-dark-muted text-sm">
                  Apply Time
                </p>
                <p class="text-lg font-medium">
                  {transitionResults.value.applyTime.toFixed(2)} ms
                </p>
                <p class="text-text-muted dark:text-text-dark-muted text-xs">
                  Time to apply class changes
                </p>
              </div>

              <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-md p-3">
                <p class="text-text-muted dark:text-text-dark-muted text-sm">
                  Animation Time
                </p>
                <p class="text-lg font-medium">
                  {transitionResults.value.animationTime.toFixed(2)} ms
                </p>
                <p class="text-text-muted dark:text-text-dark-muted text-xs">
                  Total transition duration
                </p>
              </div>

              <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-md p-3">
                <p class="text-text-muted dark:text-text-dark-muted text-sm">
                  Frame Rate
                </p>
                <p class="text-lg font-medium">
                  {transitionResults.value.frameRate.toFixed(1)} fps
                </p>
                <p class="text-text-muted dark:text-text-dark-muted text-xs">
                  {transitionResults.value.frameRate >= 50
                    ? "Smooth"
                    : transitionResults.value.frameRate >= 30
                      ? "Acceptable"
                      : "Poor"}
                </p>
              </div>

              <div class="bg-surface-secondary dark:bg-surface-dark-secondary rounded-md p-3">
                <p class="text-text-muted dark:text-text-dark-muted text-sm">
                  Elements
                </p>
                <p class="text-lg font-medium">
                  {transitionResults.value.elementCount}
                </p>
                <p class="text-text-muted dark:text-text-dark-muted text-xs">
                  Elements affected by transition
                </p>
              </div>
            </div>

            <div class="mt-4 rounded-md bg-neutral-50 p-3 text-sm dark:bg-neutral-800">
              <p>
                <span class="font-medium">Performance Assessment: </span>
                {transitionResults.value.applyTime < 16 &&
                transitionResults.value.frameRate >= 50
                  ? "Excellent - transitions are smooth and performant"
                  : transitionResults.value.applyTime < 50 &&
                      transitionResults.value.frameRate >= 30
                    ? "Good - transitions are acceptable but could be optimized"
                    : "Needs improvement - consider reducing animated elements or simplifying transitions"}
              </p>
              <p class="text-text-muted dark:text-text-dark-muted mt-1 text-xs">
                For reference: Target is &lt;16ms apply time and &gt;60fps for
                optimal smoothness
              </p>
            </div>
          </div>

          <div class="text-text-muted dark:text-text-dark-muted bg-neutral-50 px-4 py-3 text-xs dark:bg-neutral-800">
            Last test:{" "}
            {new Date(transitionResults.value.timestamp).toLocaleString()}
          </div>
        </div>
      )}

      {/* Transition Test UI Elements */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* We include a variety of elements to ensure we're testing a realistic scenario */}
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            class="rounded-lg border border-border bg-white p-4 dark:border-border-dark dark:bg-surface-dark"
          >
            <h4 class="mb-2 font-medium">Test Element {i + 1}</h4>
            <p class="text-text-secondary dark:text-text-dark-secondary mb-3 text-sm">
              This element transitions between light and dark mode.
            </p>
            <div class="flex gap-2">
              <button class="rounded bg-primary-500 px-3 py-1 text-sm text-white">
                Button
              </button>
              <div class="rounded bg-neutral-100 px-3 py-1 text-sm dark:bg-neutral-700">
                Label
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optimization Tips */}
      <div class="rounded-lg bg-neutral-50 p-4 text-sm dark:bg-neutral-800">
        <h3 class="mb-2 font-medium">Performance Optimization Tips</h3>
        <ul class="list-disc space-y-1 pl-5">
          <li>Limit the number of elements that transition</li>
          <li>
            Avoid transitioning complex properties like box-shadow on many
            elements
          </li>
          <li>
            Use the hardware-accelerated properties when possible (transform,
            opacity)
          </li>
          <li>Consider staggered transitions for complex UIs</li>
          <li>Test on lower-end devices to ensure universal performance</li>
        </ul>
      </div>
    </div>
  );
});

export default ThemeTransitionTest;
