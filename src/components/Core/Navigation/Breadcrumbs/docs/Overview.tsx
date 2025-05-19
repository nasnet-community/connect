import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const keyFeatures = [
    "Responsive truncation with expandable navigation",
    "Multiple separator options",
    "Support for icons within breadcrumb items",
    "WAI-ARIA compliant for accessibility",
    "RTL language support",
    "Customizable styling options"
  ];

  const whenToUse = [
    "When displaying hierarchical navigation in your application",
    "On pages that are nested several levels deep in the site structure",
    "To help users understand their current location within a website",
    "To provide quick navigation to parent or ancestor pages",
    "When users need context about their current location in a complex site"
  ];

  const whenNotToUse = [
    "On home pages or landing pages with no parent pages",
    "When navigation hierarchy is very shallow (1-2 levels)",
    "For linear processes like multi-step forms (use a stepper component instead)",
    "When vertical space is extremely limited (consider a different navigation pattern)",
    "When the navigation structure is frequently changing (may confuse users)"
  ];

  return (
    <OverviewTemplate
      title="Breadcrumbs Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Breadcrumbs component provides users with hierarchical navigation, showing their current location 
        within the application structure. It displays a trail of links from the home page to the current page,
        allowing users to easily navigate back to higher-level pages.
      </p>
      
      <p class="mt-2">
        Designed with accessibility in mind, the component follows WAI-ARIA guidelines for breadcrumb navigation,
        ensuring users of assistive technologies can understand and navigate the hierarchy. The component automatically
        handles responsive behavior, collapsing middle items when screen space is limited.
      </p>
      
      <p class="mt-2">
        Breadcrumbs support various separator styles, icon integration, and can be extensively customized to match
        your application's design language while maintaining their navigational utility.
      </p>
    </OverviewTemplate>
  );
});
