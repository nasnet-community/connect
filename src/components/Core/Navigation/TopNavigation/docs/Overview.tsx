import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const keyFeatures = [
    "Responsive design that adapts to different screen sizes",
    "Support for dropdown menus and nested navigation",
    "Customizable styling with various alignment options",
    "Icon support for enhanced visual recognition",
    "Accessible implementation with proper ARIA attributes",
    "Mobile-friendly hamburger menu toggle"
  ];

  const whenToUse = [
    "For primary navigation across an entire website or application",
    "When users need consistent access to main sections of your site",
    "For organizing complex site hierarchies with dropdown menus",
    "When you need to display branding alongside navigation options",
    "For sites that require responsive navigation across devices"
  ];

  const whenNotToUse = [
    "For secondary or tertiary level navigation within a page (use TabNavigation instead)",
    "For very complex multi-level navigation with many items (consider SideNavigation)",
    "For single-page applications with very limited navigation needs",
    "When vertical space is at a premium (consider a bottom navigation bar)",
    "For wizard or step-by-step interfaces (use a stepper component instead)"
  ];

  return (
    <OverviewTemplate
      title="TopNavigation Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The TopNavigation component provides a horizontal navigation bar typically positioned at the 
        top of a website or application. It serves as the primary navigation interface, allowing users 
        to access the main sections of your site at any time.
      </p>
      
      <p class="mt-2">
        With built-in responsive behavior, TopNavigation automatically adjusts to different screen sizes,
        transforming into a mobile-friendly navigation menu on smaller devices. The component supports 
        various configurations including simple link navigation, dropdown menus for nested navigation
        structures, and can be enhanced with icons and action buttons.
      </p>
      
      <p class="mt-2">
        Designed with accessibility in mind, TopNavigation implements proper keyboard navigation and 
        ARIA attributes to ensure all users can navigate your site effectively. The component is also
        highly customizable in terms of styling and behavior to match your application's design language.
      </p>
    </OverviewTemplate>
  );
});
