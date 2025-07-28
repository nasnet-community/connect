import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

/**
 * Visual component for testing and displaying responsive breakpoints
 */
export const BreakpointVisual = component$(() => {
  const currentBreakpoint = useSignal("unknown");
  const windowWidth = useSignal(0);
  const windowHeight = useSignal(0);

  useVisibleTask$(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      windowWidth.value = width;
      windowHeight.value = height;

      // Match Tailwind's breakpoint system
      if (width >= 1536) {
        currentBreakpoint.value = "2xl";
      } else if (width >= 1280) {
        currentBreakpoint.value = "xl";
      } else if (width >= 1024) {
        currentBreakpoint.value = "lg";
      } else if (width >= 768) {
        currentBreakpoint.value = "md";
      } else if (width >= 640) {
        currentBreakpoint.value = "sm";
      } else if (width >= 475) {
        currentBreakpoint.value = "xs";
      } else if (width >= 360) {
        currentBreakpoint.value = "2xs";
      } else {
        currentBreakpoint.value = "< 2xs";
      }
    };

    // Initial update
    updateBreakpoint();

    // Listen for resize events
    window.addEventListener("resize", updateBreakpoint);

    return () => {
      window.removeEventListener("resize", updateBreakpoint);
    };
  });

  const breakpoints = [
    { name: "2xs", value: "360px", description: "Small phones", color: "bg-red-500" },
    { name: "xs", value: "475px", description: "Standard phones", color: "bg-orange-500" },
    { name: "sm", value: "640px", description: "Large phones", color: "bg-yellow-500" },
    { name: "md", value: "768px", description: "Tablets", color: "bg-green-500" },
    { name: "lg", value: "1024px", description: "Small laptops", color: "bg-blue-500" },
    { name: "xl", value: "1280px", description: "Desktop", color: "bg-indigo-500" },
    { name: "2xl", value: "1536px", description: "Large desktop", color: "bg-purple-500" },
  ];

  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">Responsive Breakpoint Visualizer</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Real-time visualization of your current screen size and corresponding Tailwind CSS breakpoint.
          Resize your browser window to see how breakpoints change.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Current Viewport</h3>
        <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="grid gap-6 md:grid-cols-2">
            <div class="text-center">
              <div class="mb-2 text-4xl font-bold text-primary-600 dark:text-primary-400">
                {currentBreakpoint.value}
              </div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">
                Current Breakpoint
              </div>
            </div>
            <div class="text-center">
              <div class="mb-2 text-2xl font-semibold">
                {windowWidth.value} × {windowHeight.value}
              </div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">
                Viewport Size (px)
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Breakpoint Scale</h3>
        <div class="space-y-3">
          {breakpoints.map((bp) => (
            <div
              key={bp.name}
              class={`rounded-lg border p-4 transition-all ${
                currentBreakpoint.value === bp.name
                  ? "border-primary-500 bg-primary-50 shadow-md dark:border-primary-400 dark:bg-primary-950"
                  : "border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900"
              }`}
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class={`h-4 w-4 rounded-full ${bp.color}`}></div>
                  <div>
                    <div class="flex items-center space-x-2">
                      <span class="font-mono text-lg font-semibold">{bp.name}</span>
                      <span class="text-sm text-neutral-500 dark:text-neutral-400">
                        ({bp.value}+)
                      </span>
                    </div>
                    <div class="text-sm text-neutral-600 dark:text-neutral-400">
                      {bp.description}
                    </div>
                  </div>
                </div>
                {currentBreakpoint.value === bp.name && (
                  <div class="rounded-full bg-primary-500 px-3 py-1 text-xs font-medium text-white">
                    ACTIVE
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Responsive Visibility Test</h3>
        <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          These boxes demonstrate Tailwind's responsive utility classes. Resize your browser to see how they appear and disappear:
        </p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          <div class="block rounded-lg bg-red-100 p-4 text-center text-red-800 2xs:hidden dark:bg-red-900 dark:text-red-200">
            <div class="font-semibold">Always Hidden on 2xs+</div>
            <div class="text-xs">hidden 2xs:block</div>
          </div>
          
          <div class="hidden rounded-lg bg-orange-100 p-4 text-center text-orange-800 xs:block sm:hidden dark:bg-orange-900 dark:text-orange-200">
            <div class="font-semibold">Only xs</div>
            <div class="text-xs">hidden xs:block sm:hidden</div>
          </div>
          
          <div class="hidden rounded-lg bg-yellow-100 p-4 text-center text-yellow-800 sm:block md:hidden dark:bg-yellow-900 dark:text-yellow-200">
            <div class="font-semibold">Only sm</div>
            <div class="text-xs">hidden sm:block md:hidden</div>
          </div>
          
          <div class="hidden rounded-lg bg-green-100 p-4 text-center text-green-800 md:block lg:hidden dark:bg-green-900 dark:text-green-200">
            <div class="font-semibold">Only md</div>
            <div class="text-xs">hidden md:block lg:hidden</div>
          </div>
          
          <div class="hidden rounded-lg bg-blue-100 p-4 text-center text-blue-800 lg:block xl:hidden dark:bg-blue-900 dark:text-blue-200">
            <div class="font-semibold">Only lg</div>
            <div class="text-xs">hidden lg:block xl:hidden</div>
          </div>
          
          <div class="hidden rounded-lg bg-indigo-100 p-4 text-center text-indigo-800 xl:block 2xl:hidden dark:bg-indigo-900 dark:text-indigo-200">
            <div class="font-semibold">Only xl</div>
            <div class="text-xs">hidden xl:block 2xl:hidden</div>
          </div>
          
          <div class="hidden rounded-lg bg-purple-100 p-4 text-center text-purple-800 2xl:block dark:bg-purple-900 dark:text-purple-200">
            <div class="font-semibold">Only 2xl+</div>
            <div class="text-xs">hidden 2xl:block</div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Grid Layout Test</h3>
        <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Watch how this grid adapts across different breakpoints:
        </p>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              class="aspect-square flex items-center justify-center rounded-lg bg-neutral-100 font-bold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div class="mt-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <span class="inline sm:hidden">1 column (base)</span>
          <span class="hidden sm:inline md:hidden">2 columns (sm)</span>
          <span class="hidden md:inline lg:hidden">3 columns (md)</span>
          <span class="hidden lg:inline xl:hidden">4 columns (lg)</span>
          <span class="hidden xl:inline 2xl:hidden">5 columns (xl)</span>
          <span class="hidden 2xl:inline">6 columns (2xl)</span>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Typography Scale Test</h3>
        <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Responsive typography that scales with viewport size:
        </p>
        <div class="space-y-4">
          <h1 class="text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Responsive Heading
          </h1>
          <p class="text-sm sm:text-base md:text-lg lg:text-xl">
            This paragraph text scales from small on mobile to extra large on desktop viewports.
            Notice how the text size increases as you expand your browser window.
          </p>
          <div class="text-xs text-neutral-500 dark:text-neutral-400">
            <span class="inline sm:hidden">text-2xl (mobile)</span>
            <span class="hidden sm:inline md:hidden">text-3xl (sm)</span>
            <span class="hidden md:inline lg:hidden">text-4xl (md)</span>
            <span class="hidden lg:inline xl:hidden">text-5xl (lg)</span>
            <span class="hidden xl:inline">text-6xl (xl+)</span>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Spacing Test</h3>
        <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Responsive spacing that adapts to different screen sizes:
        </p>
        <div class="space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8">
          <div class="rounded-lg bg-primary-100 p-2 sm:p-4 md:p-6 lg:p-8 dark:bg-primary-900">
            <div class="font-semibold">Responsive Padding</div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              p-2 sm:p-4 md:p-6 lg:p-8
            </div>
          </div>
          <div class="rounded-lg bg-secondary-100 p-2 sm:p-4 md:p-6 lg:p-8 dark:bg-secondary-900">
            <div class="font-semibold">Responsive Spacing</div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">
              space-y-2 sm:space-y-4 md:space-y-6 lg:space-y-8
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-info-200 bg-info-50 p-6 dark:border-info-800 dark:bg-info-950">
        <h3 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
          💡 How to Use This Tool
        </h3>
        <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Resize your browser window to see how breakpoints change in real-time</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Use this tool to test your responsive designs at different viewport sizes</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>The visualization shows Tailwind's mobile-first responsive approach</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Use browser DevTools to simulate specific device sizes for precise testing</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default BreakpointVisual;