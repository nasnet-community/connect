import { component$, useSignal } from "@builder.io/qwik";
import { SideNavigation } from "../../SideNavigation";
import type { SideNavigationItem } from "../SideNavigation.types";

export default component$(() => {
  const isOpen = useSignal(false);

  const items: SideNavigationItem[] = [
    { href: "#", label: "Home" },
    { href: "#", label: "Products", isActive: true },
    { href: "#", label: "Services" },
    { href: "#", label: "Contact" },
  ];

  return (
    <div class="relative h-64">
      <button
        onClick$={() => (isOpen.value = true)}
        class="mb-4 rounded-md bg-primary-500 px-4 py-2 text-white"
      >
        Open Menu
      </button>

      <SideNavigation
        items={items}
        isMobileModal={true}
        isMobileOpen={isOpen.value}
        onCloseMobile$={() => (isOpen.value = false)}
        class="w-64"
      />
    </div>
  );
});
