import { component$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { ComponentGroup } from "~/components/Docs";
import { ComponentGroupsDisplay } from "~/components/Docs";
import { HiArrowPathOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";

  const componentGroups: ComponentGroup[] = [
    {
      name: "Navigation",
      description: "Components for moving between application views",
      icon: $(HiArrowPathOutline),
      components: [
        {
          name: "Breadcrumbs",
          description: "Hierarchical navigation path showing current location",
          path: `/${locale}/docs/components/navigation/breadcrumbs`,
          status: "stable",
        },
        {
          name: "Pagination",
          description:
            "Component for navigating through multiple pages of content",
          path: `/${locale}/docs/components/navigation/pagination`,
          status: "stable",
        },
        {
          name: "Side Navigation",
          description: "Vertical navigation component for sidebar menus",
          path: `/${locale}/docs/components/navigation/side-navigation`,
          status: "stable",
        },
        {
          name: "Tab Navigation",
          description:
            "Tabbed interface for organizing content into separate views",
          path: `/${locale}/docs/components/navigation/tab-navigation`,
          status: "stable",
        },
        {
          name: "Top Navigation",
          description: "Horizontal navigation component for website headers",
          path: `/${locale}/docs/components/navigation/top-navigation`,
          status: "stable",
        },
      ],
    },
  ];

  return (
    <ComponentGroupsDisplay componentGroups={componentGroups} locale={locale} />
  );
});
