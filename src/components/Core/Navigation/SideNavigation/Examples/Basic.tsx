import { component$ } from "@builder.io/qwik";
import { SideNavigation } from "../../SideNavigation";
import type { SideNavigationItem } from "../SideNavigation.types";

export default component$(() => {
  const items: SideNavigationItem[] = [
    { href: "#", label: "Home" },
    { href: "#", label: "Products" },
    { href: "#", label: "Services", isActive: true },
    { href: "#", label: "About" },
    { href: "#", label: "Contact" },
  ];

  return (
    <div class="h-64">
      <SideNavigation items={items} />
    </div>
  );
});
