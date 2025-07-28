import { component$, useSignal, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { Rating } from "../Rating";

/**
 * ResponsiveRating Example
 * 
 * Demonstrates responsive design patterns for the Rating component:
 * - Adaptive sizing based on screen size
 * - Mobile-optimized touch interactions
 * - Responsive layouts for different viewports
 * - Dynamic sizing based on container width
 * - Accessibility considerations for mobile devices
 */
export const ResponsiveRatingExample = component$(() => {
  const mobileRating = useSignal(3);
  const tabletRating = useSignal(4);
  const desktopRating = useSignal(2);
  const adaptiveRating = useSignal(3.5);
  
  // Screen size detection for responsive behavior
  const screenSize = useSignal<"mobile" | "tablet" | "desktop">("desktop");
  
  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        screenSize.value = "mobile";
      } else if (width < 1024) {
        screenSize.value = "tablet";
      } else {
        screenSize.value = "desktop";
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
    
    return () => window.removeEventListener("resize", updateScreenSize);
  });

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Responsive Rating Examples</h2>
        <p class="text-gray-600">
          Rating components that adapt to different screen sizes and device types.
        </p>
        <div class="mt-2 text-sm text-blue-600">
          Current screen size: <strong>{screenSize.value}</strong>
        </div>
      </div>

      {/* Adaptive Size Based on Screen */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Adaptive Sizing</h3>
        <p class="text-sm text-gray-600">
          Rating size automatically adapts to screen size: Large on desktop, 
          medium on tablet, small on mobile for optimal touch interaction.
        </p>
        
        <div class="space-y-4">
          <Rating
            value={adaptiveRating.value}
            precision={0.5}
            onValueChange$={(value) => {
              adaptiveRating.value = value || 0;
            }}
            label="Adaptive rating (resize window to test)"
            size={screenSize.value === "mobile" ? "sm" : 
                  screenSize.value === "tablet" ? "md" : "lg"}
            showValue
            helperText={`Optimized for ${screenSize.value} devices`}
            class="transition-all duration-300"
          />
        </div>
      </div>

      {/* Mobile-First Design */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Mobile-First Approach</h3>
        <p class="text-sm text-gray-600">
          Designed primarily for mobile with touch-friendly interactions.
        </p>
        
        {/* Mobile Optimized - Larger touch targets */}
        <div class="space-y-6">
          <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700 sm:p-6">
            <h4 class="mb-4 font-medium">Mobile Touch-Optimized</h4>
            <Rating
              value={mobileRating.value}
              onValueChange$={(value) => {
                mobileRating.value = value || 0;
              }}
              label="Rate your mobile experience"
              size="lg"
              class="text-4xl sm:text-3xl md:text-2xl" // Larger on mobile
              labels={["Poor", "Fair", "Good", "Great", "Excellent"]}
              showValue
            />
            <p class="mt-2 text-xs text-gray-500">
              Extra large stars for easy mobile interaction
            </p>
          </div>

          {/* Tablet Optimized */}
          <div class="hidden rounded-lg border border-gray-200 p-4 dark:border-gray-700 sm:block lg:p-6">
            <h4 class="mb-4 font-medium">Tablet Optimized</h4>
            <Rating
              value={tabletRating.value}
              precision={0.5}
              onValueChange$={(value) => {
                tabletRating.value = value || 0;
              }}
              label="Rate your tablet experience"
              size="md"
              allowClear
              showValue
            />
            <p class="mt-2 text-xs text-gray-500">
              Medium size with half-star precision for tablets
            </p>
          </div>

          {/* Desktop Optimized */}
          <div class="hidden rounded-lg border border-gray-200 p-4 dark:border-gray-700 lg:block">
            <h4 class="mb-4 font-medium">Desktop Optimized</h4>
            <Rating
              value={desktopRating.value}
              precision={0.5}
              onValueChange$={(value) => {
                desktopRating.value = value || 0;
              }}
              label="Rate your desktop experience"
              size="sm"
              allowClear
              showValue
              helperText="Hover for precise half-star selection"
            />
            <p class="mt-2 text-xs text-gray-500">
              Compact size with precise hover interactions for desktop
            </p>
          </div>
        </div>
      </div>

      {/* Responsive Grid Layout */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Responsive Grid Layout</h3>
        <p class="text-sm text-gray-600">
          Multiple ratings in a responsive grid that adapts to screen size.
        </p>
        
        <ResponsiveRatingGrid />
      </div>

      {/* Container Query Simulation */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Container-Based Responsive Design</h3>
        <p class="text-sm text-gray-600">
          Rating components that adapt based on their container width.
        </p>
        
        <ContainerResponsiveDemo />
      </div>

      {/* Orientation Responsive */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Orientation-Aware Design</h3>
        <p class="text-sm text-gray-600">
          Different layouts for portrait and landscape orientations on mobile.
        </p>
        
        <OrientationResponsiveDemo />
      </div>

      {/* Accessibility Responsive Features */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Accessibility-Responsive Features</h3>
        <p class="text-sm text-gray-600">
          Adaptive features based on user preferences and device capabilities.
        </p>
        
        <AccessibilityResponsiveDemo />
      </div>

      {/* Best Practices Guide */}
      <div class="mt-8 rounded-lg bg-green-50 p-6 dark:bg-green-900/20">
        <h3 class="mb-4 text-lg font-semibold text-green-800 dark:text-green-200">
          Responsive Design Best Practices
        </h3>
        <div class="space-y-3 text-sm text-green-700 dark:text-green-300">
          <div>
            <strong>Mobile Touch Targets:</strong> Use larger sizes (lg) on mobile 
            for easier touch interaction. Minimum 44px touch target recommended.
          </div>
          <div>
            <strong>Precision on Desktop:</strong> Enable half-star precision on 
            desktop/tablet where hover is available for precise selection.
          </div>
          <div>
            <strong>Progressive Enhancement:</strong> Start with mobile-friendly 
            defaults and enhance for larger screens.
          </div>
          <div>
            <strong>Container Queries:</strong> Consider the component's container 
            size, not just screen size, for better component-level responsiveness.
          </div>
          <div>
            <strong>Reduced Motion:</strong> Respect user preferences for reduced 
            motion and provide alternative feedback methods.
          </div>
        </div>
      </div>

      {/* Responsive Testing Grid */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Responsive Testing</h3>
        <ResponsiveTester />
      </div>
    </div>
  );
});

/* ===============================
   RESPONSIVE DEMO COMPONENTS
   =============================== */

/**
 * Responsive Rating Grid Component
 * Demonstrates ratings in a responsive grid layout
 */
const ResponsiveRatingGrid = component$(() => {
  const categories = useStore([
    { id: 1, name: "Product Quality", rating: 4, max: 5 },
    { id: 2, name: "Customer Service", rating: 3.5, max: 5 },
    { id: 3, name: "Value for Money", rating: 4.5, max: 5 },
    { id: 4, name: "Delivery Speed", rating: 3, max: 5 },
    { id: 5, name: "User Experience", rating: 4, max: 5 },
    { id: 6, name: "Recommendation", rating: 8, max: 10 },
  ]);

  return (
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category) => (
        <div
          key={category.id}
          class="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
        >
          <h4 class="mb-2 font-medium text-sm sm:text-base">{category.name}</h4>
          <Rating
            value={category.rating}
            max={category.max}
            precision={0.5}
            readOnly
            size="sm"
            showValue
            class="sm:text-lg lg:text-xl" // Responsive text sizing
          />
        </div>
      ))}
    </div>
  );
});

/**
 * Container Responsive Demo Component
 * Shows how ratings adapt to container width
 */
const ContainerResponsiveDemo = component$(() => {
  const rating = useSignal(3);
  const containerWidth = useSignal(100);

  return (
    <div class="space-y-4">
      <div class="flex items-center gap-4">
        <label class="text-sm font-medium">Container Width:</label>
        <input
          type="range"
          min="20"
          max="100"
          value={containerWidth.value}
          onInput$={(e) => {
            containerWidth.value = parseInt((e.target as HTMLInputElement).value);
          }}
          class="flex-1 max-w-xs"
        />
        <span class="text-sm text-gray-600">{containerWidth.value}%</span>
      </div>
      
      <div
        class="rounded-lg border border-gray-200 p-4 transition-all duration-300 dark:border-gray-700"
        style={`width: ${containerWidth.value}%`}
      >
        <Rating
          value={rating.value}
          onValueChange$={(value) => {
            rating.value = value || 0;
          }}
          label="Container-responsive rating"
          size={containerWidth.value < 40 ? "sm" : 
                containerWidth.value < 70 ? "md" : "lg"}
          precision={containerWidth.value > 50 ? 0.5 : 1}
          showValue={containerWidth.value > 60}
          helperText={containerWidth.value < 50 ? undefined : "Hover for half stars"}
        />
      </div>
    </div>
  );
});

/**
 * Orientation Responsive Demo Component
 * Different layouts for portrait vs landscape
 */
const OrientationResponsiveDemo = component$(() => {
  const ratings = useStore({
    quality: 4,
    service: 3,
    value: 5,
  });

  return (
    <div class="space-y-4">
      {/* Portrait layout (stacked) */}
      <div class="portrait:block landscape:hidden">
        <h4 class="mb-4 font-medium">Portrait Layout (Stacked)</h4>
        <div class="space-y-4">
          <Rating
            value={ratings.quality}
            onValueChange$={(value) => { ratings.quality = value || 0; }}
            label="Quality"
            size="lg"
            showValue
          />
          <Rating
            value={ratings.service}
            onValueChange$={(value) => { ratings.service = value || 0; }}
            label="Service"
            size="lg"
            showValue
          />
          <Rating
            value={ratings.value}
            onValueChange$={(value) => { ratings.value = value || 0; }}
            label="Value"
            size="lg"
            showValue
          />
        </div>
      </div>

      {/* Landscape layout (horizontal) */}
      <div class="portrait:hidden landscape:block">
        <h4 class="mb-4 font-medium">Landscape Layout (Horizontal)</h4>
        <div class="grid grid-cols-3 gap-4">
          <Rating
            value={ratings.quality}
            onValueChange$={(value) => { ratings.quality = value || 0; }}
            label="Quality"
            size="md"
            showValue
          />
          <Rating
            value={ratings.service}
            onValueChange$={(value) => { ratings.service = value || 0; }}
            label="Service"
            size="md"
            showValue
          />
          <Rating
            value={ratings.value}
            onValueChange$={(value) => { ratings.value = value || 0; }}
            label="Value"
            size="md"
            showValue
          />
        </div>
      </div>
    </div>
  );
});

/**
 * Accessibility Responsive Demo Component
 * Adapts to user accessibility preferences
 */
const AccessibilityResponsiveDemo = component$(() => {
  const rating = useSignal(3);
  const prefersReducedMotion = useSignal(false);
  const highContrast = useSignal(false);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.value = mediaQuery.matches;
    
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.value = e.matches;
    };
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  });

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-4">
        <label class="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={prefersReducedMotion.value}
            onChange$={(e) => {
              prefersReducedMotion.value = (e.target as HTMLInputElement).checked;
            }}
          />
          Prefers Reduced Motion
        </label>
        <label class="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={highContrast.value}
            onChange$={(e) => {
              highContrast.value = (e.target as HTMLInputElement).checked;
            }}
          />
          High Contrast Mode
        </label>
      </div>
      
      <Rating
        value={rating.value}
        onValueChange$={(value) => {
          rating.value = value || 0;
        }}
        label="Accessibility-aware rating"
        size="lg"
        showValue
        class={`transition-none ${
          prefersReducedMotion.value ? "" : "hover:scale-105 transition-transform duration-200"
        } ${
          highContrast.value ? "text-black dark:text-white contrast-more" : ""
        }`}
        helperText={`${prefersReducedMotion.value ? "Reduced motion enabled" : "Animations enabled"} • ${highContrast.value ? "High contrast" : "Normal contrast"}`}
      />
    </div>
  );
});

/**
 * Responsive Testing Component
 * Tool for testing different screen sizes
 */
const ResponsiveTester = component$(() => {
  const testRating = useSignal(2.5);
  const simulatedWidth = useSignal(375); // Default to mobile width
  
  const breakpoints = [
    { name: "Mobile (375px)", width: 375 },
    { name: "Mobile Large (414px)", width: 414 },
    { name: "Tablet (768px)", width: 768 },
    { name: "Desktop (1024px)", width: 1024 },
    { name: "Large Desktop (1440px)", width: 1440 },
  ];

  const getSizeForWidth = (width: number): "sm" | "md" | "lg" => {
    if (width < 768) return "sm";
    if (width < 1024) return "md";
    return "lg";
  };

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        {breakpoints.map((bp) => (
          <button
            key={bp.width}
            onClick$={() => { simulatedWidth.value = bp.width; }}
            class={`rounded px-3 py-1 text-sm transition-colors ${
              simulatedWidth.value === bp.width
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
          >
            {bp.name}
          </button>
        ))}
      </div>
      
      <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <div class="mb-4 text-sm text-gray-600">
          Testing at {simulatedWidth.value}px width • Size: {getSizeForWidth(simulatedWidth.value)}
        </div>
        
        <div 
          class="mx-auto transition-all duration-300"
          style={`width: ${Math.min(simulatedWidth.value, 600)}px`}
        >
          <Rating
            value={testRating.value}
            precision={0.5}
            onValueChange$={(value) => {
              testRating.value = value || 0;
            }}
            label="Test rating at different screen sizes"
            size={getSizeForWidth(simulatedWidth.value)}
            showValue
            allowClear
            helperText={`Optimized for ${simulatedWidth.value}px screens`}
          />
        </div>
      </div>
    </div>
  );
});