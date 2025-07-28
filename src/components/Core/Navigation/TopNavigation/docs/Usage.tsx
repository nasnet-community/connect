import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const doList = [
    "Keep navigation items concise and clear",
    "Clearly indicate the active/current page",
    "Group related navigation items together in dropdown menus",
    "Maintain consistency in navigation across your site",
    "Use icons to enhance recognition and scanability",
    "Include a logo that links to the homepage",
    "Implement proper responsive behavior for mobile devices",
  ];

  const dontList = [
    "Overcrowd the navigation with too many items",
    "Use ambiguous or generic labels like 'Click Here'",
    "Hide critical navigation items in dropdowns",
    "Create deep nested dropdown hierarchies (limit to 1-2 levels)",
    "Use different navigation patterns on different pages",
    "Change the order of navigation items across pages",
    "Make the navigation bar too tall or visually dominant",
  ];

  const accessibilityTips = [
    {
      title: "Keyboard Navigation",
      description:
        "Ensure users can navigate using Tab key for main items and arrow keys for dropdown menus. Implement proper focus management for dropdown menus.",
    },
    {
      title: "ARIA Roles and Attributes",
      description:
        "Use appropriate ARIA roles like 'navigation', 'menuitem', and 'menu'. Include aria-expanded, aria-haspopup, and aria-controls for dropdown menus.",
    },
    {
      title: "Screen Reader Compatibility",
      description:
        "Ensure navigation is properly labeled with aria-label and that all interactive elements have accessible names.",
    },
    {
      title: "Mobile Considerations",
      description:
        "Make sure mobile navigation is easily accessible and provides enough touch target size (at least 44×44px).",
    },
    {
      title: "Focus Visibility",
      description:
        "Ensure focus indicators are clearly visible for all interactive navigation elements.",
    },
  ];

  return (
    <UsageTemplate
      dos={doList}
      donts={dontList}
      accessibilityTips={accessibilityTips}
    >
      <h3 class="mb-2 text-lg font-semibold">Implementation Guidelines</h3>
      <p class="mb-4">
        TopNavigation is a critical component of most user interfaces, serving
        as the primary way users navigate through your website or application.
        When implementing top navigation, consider the following guidelines:
      </p>

      <h4 class="mb-1 mt-4 font-medium">Information Architecture</h4>
      <p class="mb-2">
        Before implementing navigation, plan your site's information
        architecture carefully. Organize content into logical sections and
        determine the hierarchy of pages. Your navigation should reflect this
        structure and make it easy for users to find what they need.
      </p>

      <h4 class="mb-1 mt-4 font-medium">Responsive Behavior</h4>
      <p class="mb-2">
        Ensure your navigation adapts gracefully to different screen sizes:
      </p>
      <ul class="mb-4 ml-6 list-disc">
        <li>On large screens, display the full horizontal navigation</li>
        <li>
          On medium screens, consider collapsing less important items into a
          "More" dropdown
        </li>
        <li>
          On small screens, implement a hamburger menu toggle to reveal the full
          menu
        </li>
        <li>
          Test navigation usability across different devices and screen sizes
        </li>
      </ul>

      <h4 class="mb-1 mt-4 font-medium">Visual Hierarchy</h4>
      <p class="mb-2">
        Use visual design to help users understand the navigation structure:
      </p>
      <ul class="mb-4 ml-6 list-disc">
        <li>
          Clearly distinguish between active and inactive navigation items
        </li>
        <li>
          If using dropdown menus, provide visual cues like arrows or chevrons
        </li>
        <li>Consider using subtle separators between navigation sections</li>
        <li>Use consistent hover and focus states for interactive elements</li>
      </ul>

      <h4 class="mb-1 mt-4 font-medium">Performance Considerations</h4>
      <p class="mb-2">
        When implementing fixed or sticky navigation, be aware of potential
        performance impacts:
      </p>
      <ul class="mb-4 ml-6 list-disc">
        <li>
          Fixed or sticky navigation can cause repaints and jank on scroll
        </li>
        <li>
          Consider using CSS will-change or transform properties for better
          performance
        </li>
        <li>
          Keep the navigation lightweight to avoid negative impacts on page load
          time
        </li>
      </ul>
    </UsageTemplate>
  );
});
