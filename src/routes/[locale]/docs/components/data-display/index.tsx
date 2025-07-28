import { component$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { ComponentGroup } from "~/components/Docs";
import { ComponentGroupsDisplay } from "~/components/Docs";
import { HiQueueListOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";

  const componentGroups: ComponentGroup[] = [
    {
      name: "Data Display",
      description:
        "Components for displaying data and information in various formats",
      icon: $(HiQueueListOutline),
      components: [
        {
          name: "Accordion",
          description:
            "A vertically stacked set of interactive headings that reveal content when expanded.",
          path: `/${locale}/docs/components/data-display/accordion`,
          status: "stable",
        },
        {
          name: "Avatar",
          description:
            "A graphical representation of a user or entity with support for images and fallback text.",
          path: `/${locale}/docs/components/data-display/avatar`,
          status: "stable",
        },
        {
          name: "Badge",
          description:
            "A small visual indicator for statuses, counts, or labels.",
          path: `/${locale}/docs/components/data-display/badge`,
          status: "stable",
        },
        {
          name: "Card",
          description:
            "A flexible container with multiple variants for organizing content.",
          path: `/${locale}/docs/components/data-display/card`,
          status: "stable",
        },
        {
          name: "List",
          description:
            "A component for displaying multiple items in a structured format.",
          path: `/${locale}/docs/components/data-display/list`,
          status: "stable",
        },
        {
          name: "Progress",
          description:
            "Visual indicators for loading states or task completion, including progress bars and spinners.",
          path: `/${locale}/docs/components/data-display/progress`,
          status: "stable",
        },
        {
          name: "Table",
          description:
            "A structured display of data organized in rows and columns.",
          path: `/${locale}/docs/components/data-display/table`,
          status: "stable",
        },
        {
          name: "Tooltip",
          description:
            "Display additional information when hovering or focusing on an element.",
          path: `/${locale}/docs/components/data-display/tooltip`,
          status: "stable",
        },
      ],
    },
  ];

  return (
    <ComponentGroupsDisplay componentGroups={componentGroups} locale={locale} />
  );
});
