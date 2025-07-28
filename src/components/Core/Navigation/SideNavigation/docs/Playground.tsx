import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { SideNavigation } from "../SideNavigation";
import type { SideNavigationItem } from "../SideNavigation.types";

export default component$(() => {
  const properties = [
    {
      type: "select" as const,
      name: "position",
      label: "Position",
      defaultValue: "left",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
    {
      type: "text" as const,
      name: "width",
      label: "Width",
      defaultValue: "250px",
    },
    {
      type: "boolean" as const,
      name: "showHeader",
      label: "Show Header",
      defaultValue: true,
    },
    {
      type: "boolean" as const,
      name: "showIcons",
      label: "Show Icons",
      defaultValue: true,
    },
    {
      type: "boolean" as const,
      name: "expandableGroups",
      label: "Expandable Groups",
      defaultValue: true,
    },
    {
      type: "select" as const,
      name: "activeItem",
      label: "Active Item",
      defaultValue: "analytics",
      options: [
        { label: "Dashboard", value: "dashboard" },
        { label: "Analytics", value: "analytics" },
        { label: "Content", value: "content" },
        { label: "Users", value: "users" },
        { label: "Settings", value: "settings" },
      ],
    },
  ];

  return (
    <PlaygroundTemplate
      component={(props: any) => {
        const showHeader = props.showHeader !== false;
        const showIcons = props.showIcons !== false;
        const expandableGroups = props.expandableGroups !== false;
        const activeItem = props.activeItem || "analytics";

        const headerContent = showHeader ? (
          <div class="flex items-center gap-2 p-4">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 font-bold text-white">
              A
            </div>
            <span class="font-medium">App Name</span>
          </div>
        ) : undefined;

        const items: SideNavigationItem[] = [
          {
            href: "#",
            label: "Dashboard",
            isActive: activeItem === "dashboard",
            icon: showIcons ? <i class="fas fa-home"></i> : undefined,
          },
          {
            href: "#",
            label: "Analytics",
            isActive: activeItem === "analytics",
            icon: showIcons ? <i class="fas fa-chart-bar"></i> : undefined,
          },
          expandableGroups
            ? {
                label: "Content",
                isExpanded: activeItem === "content",
                icon: showIcons ? <i class="fas fa-file-alt"></i> : undefined,
                items: [
                  { href: "#", label: "Pages" },
                  {
                    href: "#",
                    label: "Blog Posts",
                    isActive: activeItem === "content",
                  },
                  { href: "#", label: "Media" },
                ],
              }
            : {
                href: "#",
                label: "Content",
                isActive: activeItem === "content",
                icon: showIcons ? <i class="fas fa-file-alt"></i> : undefined,
              },
          {
            href: "#",
            label: "Users",
            isActive: activeItem === "users",
            icon: showIcons ? <i class="fas fa-users"></i> : undefined,
          },
          {
            href: "#",
            label: "Settings",
            isActive: activeItem === "settings",
            icon: showIcons ? <i class="fas fa-cog"></i> : undefined,
          },
        ];

        return (
          <div
            class="relative h-96 rounded-md border border-gray-200 dark:border-gray-700"
            style={{ width: props.width || "250px" }}
          >
            <SideNavigation
              items={items}
              header={headerContent}
              class="h-full"
            />
          </div>
        );
      }}
      properties={properties}
    />
  );
});
