import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const doList = [
    "Use clear, concise tab labels that describe the content",
    "Position the most important or frequently used tab first",
    "Maintain the same height for all tabs in a set",
    "Use icons with labels to enhance recognition when appropriate",
    "Ensure there's enough contrast between active and inactive tabs",
    "Implement proper keyboard navigation (arrow keys, Home, End)",
    "Limit tabs to a reasonable number (ideally 2-7 tabs)"
  ];

  const dontList = [
    "Use tabs for sequential steps (use a stepper component instead)",
    "Place tabs at multiple levels on the same page",
    "Hide critical information behind tabs where users might miss it",
    "Use tabs when all content could comfortably fit on one view",
    "Create tabs with widely different widths if possible",
    "Nest tabs within other tabs (creates confusion)",
    "Use tabs for single items (at least two tabs are needed)"
  ];

  const accessibility = [
    {
      title: "Keyboard Navigation",
      description: "Ensure users can navigate between tabs using Tab key, and between tabbed items using arrow keys. Use Home/End keys to navigate to first/last tabs."
    },
    {
      title: "ARIA Roles and Attributes",
      description: "Use role='tablist' for the container, role='tab' for each tab, and role='tabpanel' for the content panels. Associate each tab with its panel using aria-controls and id attributes."
    },
    {
      title: "Focus Management",
      description: "When a tab is selected, focus should move to the associated tab panel. Implement proper focus management to ensure keyboard users can navigate efficiently."
    },
    {
      title: "Visible Focus Indicators",
      description: "Ensure focus states are clearly visible for keyboard navigation, with sufficient contrast against the background."
    },
    {
      title: "Descriptive Labels",
      description: "Use clear, descriptive labels for tabs. When using icons without text labels, provide aria-label to convey meaning to screen reader users."
    }
  ];

  return (
    <UsageTemplate
      doList={doList}
      dontList={dontList}
      accessibility={accessibility}
    >
      <h3 class="text-lg font-semibold mb-2">Implementation Guidelines</h3>
      <p class="mb-4">
        TabNavigation is designed to organize related content within the same context. When implementing
        tabs in your application, consider the following guidelines:
      </p>
      
      <h4 class="font-medium mt-4 mb-1">Content Organization</h4>
      <p class="mb-2">
        Group related information into logical sections that make sense to be separated into tabs.
        The content behind each tab should be related to the same overall context but represent
        distinct categories or aspects of that context.
      </p>
      
      <h4 class="font-medium mt-4 mb-1">Visual Consistency</h4>
      <p class="mb-2">
        Maintain consistent styling of tabs across your application. Choose a tab variant that
        matches your overall design system and stick with it throughout the interface unless
        there's a specific need for differentiation.
      </p>
      
      <h4 class="font-medium mt-4 mb-1">Performance Considerations</h4>
      <p class="mb-2">
        For content-heavy tab panels, consider lazy loading content only when the tab is selected,
        especially if the content requires data fetching or heavy rendering. This can improve the
        initial load time of your interface.
      </p>
      
      <h4 class="font-medium mt-4 mb-1">Mobile Responsiveness</h4>
      <p>
        When using tabs on mobile devices, consider how they will behave on smaller screens:
      </p>
      <ul class="list-disc ml-6 mb-4">
        <li>For many tabs, consider a scrollable tab bar rather than wrapping to multiple lines</li>
        <li>Use the "stretched" variant on small screens to make tap targets larger</li>
        <li>Consider switching to vertical tabs or an alternative navigation pattern if horizontal space is limited</li>
      </ul>
    </UsageTemplate>
  );
});
