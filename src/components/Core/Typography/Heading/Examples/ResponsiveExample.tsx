import { component$ } from "@builder.io/qwik";
import { Heading } from "../Heading";

/**
 * Responsive Example - Shows adaptive heading sizes across breakpoints
 */
export const ResponsiveExample = component$(() => {
  return (
    <div class="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <Heading level={2}>Responsive Heading Examples</Heading>
        
        <p class="text-gray-600 dark:text-gray-400">
          Resize your browser window to see how these headings adapt to different screen sizes.
        </p>
      </div>

      {/* Hero Title */}
      <div class="space-y-2 p-4 border border-gray-200 dark:border-gray-700 rounded">
        <Heading 
          responsiveSize={{
            base: 3,  // h3 on mobile
            md: 2,    // h2 on tablet
            lg: 1     // h1 on desktop
          }}
          weight="bold"
          color="primary"
        >
          Responsive Hero Title
        </Heading>
        <p class="text-sm text-gray-500">
          Mobile: h3 → Tablet: h2 → Desktop: h1
        </p>
      </div>

      {/* Progressive Scaling */}
      <div class="space-y-2 p-4 border border-gray-200 dark:border-gray-700 rounded">
        <Heading 
          responsiveSize={{
            base: 6,  // h6 on mobile
            sm: 5,    // h5 on small screens
            md: 4,    // h4 on medium screens
            lg: 3,    // h3 on large screens
            xl: 2     // h2 on extra large screens
          }}
          color="accent"
        >
          Progressive Scaling Example
        </Heading>
        <p class="text-sm text-gray-500">
          Scales up gradually across all breakpoints
        </p>
      </div>

      {/* Mobile-First Design */}
      <div class="space-y-2 p-4 bg-primary-50 dark:bg-primary-900/20 rounded">
        <Heading 
          responsiveSize={{
            base: 4,  // Start smaller on mobile
            lg: 2     // Larger on desktop
          }}
          weight="semibold"
          align="center"
        >
          Mobile-First Approach
        </Heading>
        <p class="text-sm text-center text-gray-600 dark:text-gray-400">
          Optimized for mobile readability, enhanced for desktop
        </p>
      </div>

      {/* Marketing Section */}
      <div class="space-y-2 p-6 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded">
        <Heading 
          responsiveSize={{
            base: 3,
            md: 1
          }}
          weight="extrabold"
          align="center"
          color="primary"
        >
          50% OFF Today Only!
        </Heading>
        <p class="text-center text-gray-700 dark:text-gray-300">
          Marketing headlines that grab attention on all devices
        </p>
      </div>

      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded">
        <p class="text-sm text-blue-700 dark:text-blue-300">
          <strong>📱 Note:</strong> Responsive sizing ensures optimal readability across all devices while maintaining visual hierarchy.
        </p>
      </div>
    </div>
  );
});

export default ResponsiveExample;