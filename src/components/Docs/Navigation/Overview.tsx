import { component$ } from "@builder.io/qwik";
import { OverviewTemplate, type OverviewTemplateProps } from "../templates/OverviewTemplate";

export interface NavigationOverviewProps extends OverviewTemplateProps {
  showResponsiveDemo?: boolean;
  showThemeDemo?: boolean;
}

export const NavigationOverview = component$<NavigationOverviewProps>(({
  title = "Navigation Component",
  description = "A responsive, accessible sidebar navigation component with collapsible categories, mobile-optimized interactions, and comprehensive dark mode support.",
  importStatement = `import { DocsSideNavigation } from "~/components/Docs/Navigation";`,
  features = [
    "Fully responsive design with mobile, tablet, and desktop optimizations",
    "Complete dark/light mode support with proper contrast ratios",
    "Collapsible categories with smooth animations",
    "Nested navigation with unlimited depth support",
    "Touch-friendly mobile interactions with gesture support",
    "Accessible keyboard navigation and ARIA compliance",
    "Auto-expand active categories and links",
    "Customizable sidebar layout with overlay modes",
    "TypeScript support with comprehensive interfaces",
    "Optimized for performance with Qwik's resumability"
  ],
  keyFeatures = [
    "Mobile-first responsive design",
    "Dark mode optimization",
    "Smooth animations and transitions",
    "Keyboard accessibility",
    "Touch gesture support",
    "Auto-expanding active states"
  ],
  whenToUse = [
    "Documentation sites with hierarchical content",
    "Admin dashboards with multiple sections",
    "Applications requiring multi-level navigation",
    "Mobile-responsive web applications",
    "Sites needing accessible navigation patterns",
    "Projects requiring dark mode support"
  ],
  whenNotToUse = [
    "Simple single-level navigation requirements",
    "Applications with minimal navigation needs",
    "Sites that don't require responsive behavior",
    "Projects without accessibility requirements"
  ],
  showResponsiveDemo: _showResponsiveDemo = false,
  showThemeDemo: _showThemeDemo = false,
  ..._props
}) => {
  return (
    <OverviewTemplate
      title={title}
      description={description}
      importStatement={importStatement}
      features={features}
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <div class="space-y-4 text-sm text-gray-700 sm:space-y-5 sm:text-base dark:text-gray-300">
        <p>
          The <code class="rounded bg-gray-100 px-2 py-1 text-xs font-mono dark:bg-gray-800">DocsSideNavigation</code> component provides a 
          comprehensive solution for hierarchical navigation in modern web applications. Built with Qwik for optimal performance 
          and Tailwind CSS for consistent styling.
        </p>

        <p>
          Designed with mobile-first principles, the component automatically adapts its layout and interaction patterns 
          based on screen size. On mobile devices, it provides a full-screen overlay experience with touch-friendly 
          gestures, while on desktop it offers a traditional sidebar with collapsible sections.
        </p>

        <p>
          The component supports unlimited nesting levels, making it perfect for complex documentation sites or 
          applications with deep hierarchical structures. Each category and link can have subcategories and 
          subcomponents, all with smooth expand/collapse animations.
        </p>

        <div class="rounded-lg border border-primary-200 bg-primary-50 p-3 sm:p-4 dark:border-primary-800 dark:bg-primary-900/20">
          <h4 class="mb-2 font-semibold text-primary-800 dark:text-primary-200">Performance Note</h4>
          <p class="text-sm text-primary-700 dark:text-primary-300">
            Built with Qwik's resumability in mind, the component loads only the necessary JavaScript when interactions occur, 
            ensuring optimal performance even with complex navigation structures.
          </p>
        </div>

        <div class="rounded-lg border border-info-200 bg-info-50 p-3 sm:p-4 dark:border-info-800 dark:bg-info-900/20">
          <h4 class="mb-2 font-semibold text-info-800 dark:text-info-200">Accessibility Features</h4>
          <ul class="list-disc space-y-1 pl-4 text-sm text-info-700 dark:text-info-300">
            <li>Full keyboard navigation support with arrow keys and Enter/Space</li>
            <li>ARIA attributes for screen readers and assistive technologies</li>
            <li>Focus management and visual focus indicators</li>
            <li>Semantic HTML structure for better accessibility</li>
            <li>High contrast mode support</li>
          </ul>
        </div>
      </div>
    </OverviewTemplate>
  );
});