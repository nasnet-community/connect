import { component$ } from "@builder.io/qwik";
import { SideNavigation } from "../../SideNavigation";
import type { SideNavigationItem } from "../SideNavigation.types";

export default component$(() => {
  const items: SideNavigationItem[] = [
    { href: "#", label: "Dashboard" },
    {
      label: "Products",
      isExpanded: true,
      items: [
        { href: "#", label: "Electronics" },
        { href: "#", label: "Clothing", isActive: true },
        { href: "#", label: "Home & Garden" },
      ],
    },
    {
      label: "Services",
      items: [
        { href: "#", label: "Consulting" },
        { href: "#", label: "Support" },
      ],
    },
    { href: "#", label: "About" },
  ];

  return (
    <div class="h-96">
      <SideNavigation items={items} />
    </div>
  );
});
