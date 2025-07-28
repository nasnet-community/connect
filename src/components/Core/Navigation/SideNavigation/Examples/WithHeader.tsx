import { component$ } from "@builder.io/qwik";
import { SideNavigation } from "../../SideNavigation";
import type { SideNavigationItem } from "../SideNavigation.types";

export default component$(() => {
  const items: SideNavigationItem[] = [
    {
      href: "#",
      label: "Dashboard",
      icon: <i class="fas fa-home"></i>,
    },
    {
      href: "#",
      label: "Projects",
      icon: <i class="fas fa-project-diagram"></i>,
      isActive: true,
    },
    {
      href: "#",
      label: "Calendar",
      icon: <i class="fas fa-calendar"></i>,
    },
    {
      href: "#",
      label: "Messages",
      icon: <i class="fas fa-envelope"></i>,
    },
  ];

  const headerContent = (
    <div class="flex items-center gap-2 p-2">
      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-bold text-white">
        C
      </div>
      <span class="font-medium">Company Name</span>
    </div>
  );

  return (
    <div class="h-72">
      <SideNavigation items={items} header={headerContent} />
    </div>
  );
});
