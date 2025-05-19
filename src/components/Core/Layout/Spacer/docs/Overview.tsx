import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates/OverviewTemplate';

export const SpacerOverview = component$(() => {
  return (
    <OverviewTemplate
      title="Spacer Component"
      keyFeatures={[
        "Create consistent spacing with predefined size options",
        "Vertical or horizontal orientation",
        "Responsive sizing using breakpoint-specific options",
        "Flexible spacer option that grows to fill available space",
        "Option to hide the spacer on mobile screens"
      ]}
      whenToUse={[
        "Adding vertical space between sections or components",
        "Creating horizontal spacing between inline elements",
        "Pushing elements apart in a flex container",
        "Creating consistent, responsive spacing across the application"
      ]}
      whenNotToUse={[
        "Creating complex layout structures (use Grid or Flex instead)",
        "Fixed spacing that should not respond to different screen sizes",
        "As a workaround for layout issues that should be resolved with proper component design",
        "Nesting multiple Spacers within one another"
      ]}
    >
      <p class="mb-4">
        The Spacer component is a layout utility that creates consistent whitespace between elements.
        It can be used for vertical or horizontal spacing with flexible size options.
      </p>
      
      <h3 class="text-lg font-semibold mb-2 mt-4">Accessibility Considerations</h3>
      <ul class="list-disc list-inside space-y-2 mb-4">
        <li>Spacers are purely presentational and are marked with <code class="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">aria-hidden="true"</code></li>
        <li>They don't interfere with keyboard navigation or screen readers</li>
        <li>Consider how spacing affects the visual hierarchy and readability of your content</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2 mt-4">Design System Integration</h3>
      <p class="mb-3">
        The Spacer component follows our design system's spacing scale, ensuring consistent
        whitespace across the application. The sizes (xs, sm, md, lg, xl, etc.) correspond
        to predefined spacing values that maintain visual harmony.
      </p>
      <p class="mb-4">
        Spacers are composable with other layout components like Box, Flex, and Grid to
        create complex layouts while maintaining consistent spacing patterns.
      </p>
      
      <h3 class="text-lg font-semibold mb-2 mt-4">Responsive Behavior</h3>
      <p class="mb-3">
        The Spacer component can adapt its size across different viewport widths using
        the responsive object syntax. This allows for more compact spacing on mobile
        devices and more generous spacing on larger screens.
      </p>
      <p>
        You can also completely hide a spacer on mobile screens using the hideOnMobile prop,
        which helps create more efficient layouts on smaller devices.
      </p>
    </OverviewTemplate>
  );
});

export default SpacerOverview;
