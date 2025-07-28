import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

interface PerformanceMetrics {
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

/**
 * Performance testing and monitoring component
 */
export const PerformanceTest = component$(() => {
  const metrics = useSignal<PerformanceMetrics>({
    loadTime: 0,
    domContentLoaded: 0,
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    cumulativeLayoutShift: 0,
    firstInputDelay: 0,
  });

  const connectionInfo = useSignal({
    effectiveType: "unknown",
    downlink: 0,
    rtt: 0,
    saveData: false,
  });

  const _renderMetrics = useSignal({
    componentsRendered: 0,
    renderTime: 0,
    reRenders: 0,
  });

  useVisibleTask$(() => {
    // Get performance metrics
    if (typeof window !== "undefined" && window.performance) {
      const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType("paint");
      
      if (navigation) {
        metrics.value = {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          firstPaint: paint.find(entry => entry.name === "first-paint")?.startTime || 0,
          firstContentfulPaint: paint.find(entry => entry.name === "first-contentful-paint")?.startTime || 0,
          largestContentfulPaint: 0,
          cumulativeLayoutShift: 0,
          firstInputDelay: 0,
        };
      }

      // Get LCP
      if ("PerformanceObserver" in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            metrics.value = { ...metrics.value, largestContentfulPaint: lastEntry.startTime };
          });
          lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });

          // Get CLS
          const clsObserver = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
            metrics.value = { ...metrics.value, cumulativeLayoutShift: clsValue };
          });
          clsObserver.observe({ entryTypes: ["layout-shift"] });

          // Get FID
          const fidObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              metrics.value = { ...metrics.value, firstInputDelay: (entry as any).processingStart - entry.startTime };
            }
          });
          fidObserver.observe({ entryTypes: ["first-input"] });
        } catch (e) {
          console.warn("Performance Observer not supported");
        }
      }

      // Get connection info
      if ("connection" in navigator) {
        const conn = (navigator as any).connection;
        connectionInfo.value = {
          effectiveType: conn.effectiveType || "unknown",
          downlink: conn.downlink || 0,
          rtt: conn.rtt || 0,
          saveData: conn.saveData || false,
        };
      }
    }
  });

  const formatTime = (time: number) => {
    if (time < 1000) return `${time.toFixed(0)}ms`;
    return `${(time / 1000).toFixed(2)}s`;
  };

  const getPerformanceRating = (metric: string, value: number) => {
    const thresholds: Record<string, { good: number; poor: number }> = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
    };

    const threshold = thresholds[metric];
    if (!threshold) return "unknown";
    
    if (value <= threshold.good) return "good";
    if (value <= threshold.poor) return "needs-improvement";
    return "poor";
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "good": return "text-success-600 bg-success-100 dark:text-success-400 dark:bg-success-900";
      case "needs-improvement": return "text-warning-600 bg-warning-100 dark:text-warning-400 dark:bg-warning-900";
      case "poor": return "text-error-600 bg-error-100 dark:text-error-400 dark:bg-error-900";
      default: return "text-neutral-600 bg-neutral-100 dark:text-neutral-400 dark:bg-neutral-800";
    }
  };

  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">Performance Monitoring</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Real-time performance metrics and optimization insights for the Connect design system.
          Monitor Core Web Vitals and identify performance bottlenecks.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Core Web Vitals</h3>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center justify-between">
              <h4 class="text-lg font-medium">LCP</h4>
              <span class={`rounded-full px-2 py-1 text-xs font-medium ${getRatingColor(getPerformanceRating("lcp", metrics.value.largestContentfulPaint))}`}>
                {getPerformanceRating("lcp", metrics.value.largestContentfulPaint)}
              </span>
            </div>
            <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {formatTime(metrics.value.largestContentfulPaint)}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Largest Contentful Paint
            </div>
            <div class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              Good: &lt; 2.5s | Poor: &gt; 4.0s
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center justify-between">
              <h4 class="text-lg font-medium">FID</h4>
              <span class={`rounded-full px-2 py-1 text-xs font-medium ${getRatingColor(getPerformanceRating("fid", metrics.value.firstInputDelay))}`}>
                {getPerformanceRating("fid", metrics.value.firstInputDelay)}
              </span>
            </div>
            <div class="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
              {formatTime(metrics.value.firstInputDelay)}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              First Input Delay
            </div>
            <div class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              Good: &lt; 100ms | Poor: &gt; 300ms
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="mb-2 flex items-center justify-between">
              <h4 class="text-lg font-medium">CLS</h4>
              <span class={`rounded-full px-2 py-1 text-xs font-medium ${getRatingColor(getPerformanceRating("cls", metrics.value.cumulativeLayoutShift))}`}>
                {getPerformanceRating("cls", metrics.value.cumulativeLayoutShift)}
              </span>
            </div>
            <div class="text-2xl font-bold text-success-600 dark:text-success-400">
              {metrics.value.cumulativeLayoutShift.toFixed(3)}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Cumulative Layout Shift
            </div>
            <div class="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
              Good: &lt; 0.1 | Poor: &gt; 0.25
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Loading Performance</h3>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="text-xl font-bold text-info-600 dark:text-info-400">
              {formatTime(metrics.value.firstPaint)}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              First Paint
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="text-xl font-bold text-info-600 dark:text-info-400">
              {formatTime(metrics.value.firstContentfulPaint)}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              First Contentful Paint
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="text-xl font-bold text-info-600 dark:text-info-400">
              {formatTime(metrics.value.domContentLoaded)}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              DOM Content Loaded
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="text-xl font-bold text-info-600 dark:text-info-400">
              {formatTime(metrics.value.loadTime)}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Load Event
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Network Information</h3>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="text-xl font-bold text-warning-600 dark:text-warning-400">
              {connectionInfo.value.effectiveType.toUpperCase()}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Connection Type
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="text-xl font-bold text-warning-600 dark:text-warning-400">
              {connectionInfo.value.downlink} Mbps
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Downlink Speed
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="text-xl font-bold text-warning-600 dark:text-warning-400">
              {connectionInfo.value.rtt}ms
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Round Trip Time
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <div class="text-xl font-bold text-warning-600 dark:text-warning-400">
              {connectionInfo.value.saveData ? "ON" : "OFF"}
            </div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              Data Saver
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Component Performance Test</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Rendering Stress Test</h4>
            <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
              Test component rendering performance with multiple elements:
            </p>
            <div class="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  class="aspect-square flex items-center justify-center rounded-lg bg-gradient-to-br from-primary-400 to-secondary-500 text-white shadow-sm transition-transform hover:scale-105"
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <div class="text-xs text-neutral-500 dark:text-neutral-400">
              32 rendered components with gradients, shadows, and hover effects
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Animation Performance</h4>
            <div class="grid gap-4 md:grid-cols-3">
              <div class="group cursor-pointer">
                <div class="motion-safe:group-hover:animate-pulse rounded-lg bg-primary-100 p-4 transition-colors group-hover:bg-primary-200 dark:bg-primary-900 dark:group-hover:bg-primary-800">
                  <div class="text-sm font-medium">CSS Animation</div>
                  <div class="text-xs text-neutral-600 dark:text-neutral-400">Hover to test</div>
                </div>
              </div>

              <div class="group cursor-pointer">
                <div class="motion-safe:group-hover:scale-105 rounded-lg bg-secondary-100 p-4 transition-transform dark:bg-secondary-900">
                  <div class="text-sm font-medium">Transform</div>
                  <div class="text-xs text-neutral-600 dark:text-neutral-400">Hover to scale</div>
                </div>
              </div>

              <div class="group cursor-pointer">
                <div class="motion-safe:group-hover:shadow-lg rounded-lg bg-success-100 p-4 transition-shadow group-hover:shadow-md dark:bg-success-900">
                  <div class="text-sm font-medium">Shadow Effect</div>
                  <div class="text-xs text-neutral-600 dark:text-neutral-400">Hover for shadow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Memory Usage Monitor</h3>
        <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
          <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
            Open browser DevTools (F12) → Performance tab to monitor:
          </p>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <h4 class="mb-2 font-medium">Memory Monitoring</h4>
              <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• JavaScript heap size</li>
                <li>• DOM nodes count</li>
                <li>• Event listeners count</li>
                <li>• GPU memory usage</li>
              </ul>
            </div>
            <div>
              <h4 class="mb-2 font-medium">Performance Profiling</h4>
              <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Frame rate (FPS)</li>
                <li>• Paint operations</li>
                <li>• Layout recalculations</li>
                <li>• JavaScript execution time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Optimization Recommendations</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-info-200 bg-info-50 p-4 dark:border-info-800 dark:bg-info-950">
            <h4 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
              🚀 Performance Best Practices
            </h4>
            <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
                <span><strong>Minimize Layout Shifts:</strong> Use fixed dimensions for images and containers</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
                <span><strong>Optimize Critical Path:</strong> Prioritize above-the-fold content loading</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
                <span><strong>Reduce JavaScript Bundles:</strong> Use code splitting and lazy loading</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
                <span><strong>Optimize Images:</strong> Use modern formats (WebP, AVIF) and responsive sizing</span>
              </li>
            </ul>
          </div>

          <div class="rounded-lg border border-warning-200 bg-warning-50 p-4 dark:border-warning-800 dark:bg-warning-950">
            <h4 class="mb-2 text-lg font-medium text-warning-900 dark:text-warning-100">
              ⚡ Foundation-Specific Tips
            </h4>
            <ul class="space-y-2 text-sm text-warning-800 dark:text-warning-200">
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
                <span><strong>CSS Custom Properties:</strong> Minimize theme switching layout shifts</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
                <span><strong>Animation Performance:</strong> Use transform and opacity for smooth animations</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
                <span><strong>Font Loading:</strong> Use font-display: swap to prevent invisible text</span>
              </li>
              <li class="flex items-start">
                <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
                <span><strong>Color Calculations:</strong> Pre-calculate color variations to avoid runtime computation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-success-200 bg-success-50 p-6 dark:border-success-800 dark:bg-success-950">
        <h3 class="mb-2 text-lg font-medium text-success-900 dark:text-success-100">
          📊 Performance Monitoring Tools
        </h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <h4 class="mb-2 font-medium">Browser Tools</h4>
            <ul class="space-y-1 text-sm text-success-800 dark:text-success-200">
              <li>• Chrome DevTools Performance tab</li>
              <li>• Firefox Developer Tools</li>
              <li>• Safari Web Inspector</li>
              <li>• Edge DevTools</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-2 font-medium">Online Tools</h4>
            <ul class="space-y-1 text-sm text-success-800 dark:text-success-200">
              <li>• Google PageSpeed Insights</li>
              <li>• WebPageTest.org</li>
              <li>• GTmetrix</li>
              <li>• Lighthouse CI</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PerformanceTest;