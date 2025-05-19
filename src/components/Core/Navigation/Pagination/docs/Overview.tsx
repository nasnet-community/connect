import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const keyFeatures = [
    "Customizable page count display",
    "Multiple navigation options (next/prev, page numbers, input field)",
    "Responsive design that adapts to different screen sizes",
    "Support for custom page size selection",
    "Accessible keyboard navigation and screen reader support",
    "Customizable styling with consistent design system integration"
  ];

  const whenToUse = [
    "When displaying large datasets that need to be divided into pages",
    "For long search results or content lists",
    "When users need to navigate through sequential content",
    "For tables with many rows that would be overwhelming on a single page",
    "When implementing infinite scroll isn't appropriate for the content type"
  ];

  const whenNotToUse = [
    "For small datasets that fit comfortably on a single page",
    "When implementing infinite scroll for content that's better consumed continuously",
    "For step-by-step processes (use a Stepper component instead)",
    "When performance would benefit from virtual scrolling rather than pagination",
    "For content that should be dynamically loaded as the user scrolls (consider lazy loading)"
  ];

  return (
    <OverviewTemplate
      title="Pagination Component"
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The Pagination component provides a user-friendly interface for navigating through multi-page content. 
        It helps users browse through large datasets by dividing content into manageable pages and providing 
        intuitive navigation controls.
      </p>
      
      <p class="mt-2">
        The component offers multiple navigation methods, including next/previous buttons, clickable page numbers,
        and direct page input. It's designed to be accessible, with proper ARIA attributes and keyboard navigation
        support to ensure all users can effectively navigate paginated content.
      </p>
      
      <p class="mt-2">
        Pagination automatically adapts to different screen sizes, ensuring a consistent user experience across
        devices. The component also supports customizable page size options, allowing users to control how much
        content is displayed per page.
      </p>
    </OverviewTemplate>
  );
});
