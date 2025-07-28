import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const topNavigationProps = [
    {
      name: "items",
      type: "TopNavigationItem[]",
      description: "The main menu navigation items.",
      required: true,
    },
    {
      name: "logo",
      type: "JSXChildren",
      description: "Optional logo content to display in the navigation bar.",
    },
    {
      name: "logoHref",
      type: "string",
      description: "Directs the user to this URL when clicking the logo.",
    },
    {
      name: "rightContent",
      type: "JSXChildren",
      description:
        "Optional content to display on the right side of the navigation bar.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "md",
      description: "The size of the top navigation component.",
    },
    {
      name: "variant",
      type: "'default' | 'minimal' | 'filled' | 'transparent' | 'bordered'",
      defaultValue: "default",
      description: "The visual variant of the top navigation component.",
    },
    {
      name: "position",
      type: "'static' | 'sticky' | 'fixed'",
      defaultValue: "static",
      description: "The position of the top navigation component.",
    },
    {
      name: "mobileMenuEnabled",
      type: "boolean",
      defaultValue: "true",
      description:
        "Whether to show a mobile menu toggle button on small screens.",
    },
    {
      name: "isMobileMenuOpen",
      type: "boolean",
      defaultValue: "false",
      description: "Whether the mobile menu is initially open.",
    },
    {
      name: "onMobileMenuToggle$",
      type: "QRL<(isOpen: boolean) => void>",
      description: "Optional handler for toggling the mobile menu.",
    },
    {
      name: "onNavItemClick$",
      type: "QRL<(item: TopNavigationItem) => void>",
      description: "Optional handler when a navigation item is clicked.",
    },
    {
      name: "class",
      type: "string",
      description:
        "Optional custom CSS class for the top navigation container.",
    },
    {
      name: "id",
      type: "string",
      description: "Optional ID for the top navigation container.",
    },
    // TopNavigationItem interface props
    {
      name: "label (TopNavigationItem)",
      type: "string",
      description: "The label text for the navigation item.",
      required: true,
    },
    {
      name: "href (TopNavigationItem)",
      type: "string",
      description: "Optional URL for the navigation item.",
    },
    {
      name: "icon (TopNavigationItem)",
      type: "JSXChildren",
      description: "Optional icon to display with the label.",
    },
    {
      name: "isActive (TopNavigationItem)",
      type: "boolean",
      description: "Whether this navigation item is currently active.",
    },
    {
      name: "isDisabled (TopNavigationItem)",
      type: "boolean",
      description: "Whether this navigation item is disabled.",
    },
    {
      name: "items (TopNavigationItem)",
      type: "TopNavigationItem[]",
      description: "Optional subitems for dropdown menus.",
    },
    {
      name: "onClick$ (TopNavigationItem)",
      type: "QRL<() => void>",
      description: "Optional click handler for the navigation item.",
    },
    {
      name: "badge (TopNavigationItem)",
      type: "JSXChildren",
      description: "Optional badge to display with the navigation item.",
    },
  ];

  return (
    <APIReferenceTemplate props={topNavigationProps}>
      <p>
        The TopNavigation component provides a horizontal navigation bar with
        support for dropdown menus, mobile responsiveness, and various styling
        options. It accepts an array of navigation items and handles responsive
        behavior automatically.
      </p>
      <p class="mt-4">
        The component is designed with accessibility in mind and includes proper
        ARIA attributes, keyboard navigation support, and screen reader
        compatibility.
      </p>
    </APIReferenceTemplate>
  );
});
