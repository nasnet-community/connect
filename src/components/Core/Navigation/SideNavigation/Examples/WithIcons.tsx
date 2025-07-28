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
      label: "Analytics",
      icon: <i class="fas fa-chart-bar"></i>,
    },
    {
      href: "#",
      label: "Reports",
      icon: <i class="fas fa-file-alt"></i>,
      isActive: true,
    },
    {
      href: "#",
      label: "Settings",
      icon: <i class="fas fa-cog"></i>,
    },
    {
      href: "#",
      label: "Help",
      icon: <i class="fas fa-question-circle"></i>,
    },
  ];

  return (
    <div class="h-64">
      <SideNavigation items={items} />
    </div>
  );
});
