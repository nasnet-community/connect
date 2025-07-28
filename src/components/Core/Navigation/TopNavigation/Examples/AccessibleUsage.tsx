import { component$ } from "@builder.io/qwik";
import { TopNavigation } from "../../TopNavigation";
import type { TopNavigationItem } from "../../TopNavigation";

export default component$(() => {
  const items: TopNavigationItem[] = [
    {
      label: "Home",
      href: "#",
      isActive: true,
      id: "home-item",
    },
    {
      label: "Products",
      id: "products-dropdown",
      items: [
        {
          label: "Software",
          href: "#",
          id: "software-item",
        },
        {
          label: "Hardware",
          href: "#",
          id: "hardware-item",
        },
        {
          label: "Services",
          href: "#",
          id: "services-item",
        },
      ],
    },
    {
      label: "About",
      href: "#",
      id: "about-item",
    },
    {
      label: "Contact",
      href: "#",
      id: "contact-item",
    },
  ];

  return (
    <div class="p-4">
      <TopNavigation items={items} id="main-nav" />

      <div class="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>
          This example demonstrates proper accessibility implementation with
          ARIA attributes and keyboard navigation support.
        </p>
      </div>
    </div>
  );
});
