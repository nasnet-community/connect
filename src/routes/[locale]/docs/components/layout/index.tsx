import { component$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { ComponentGroup } from "~/components/Docs";
import { ComponentGroupsDisplay } from "~/components/Docs";
import { HiRectangleGroupOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";

  const componentGroups: ComponentGroup[] = [
    {
      name: "Layout",
      description: "Structural elements for page organization",
      icon: $(HiRectangleGroupOutline),
      components: [
        {
          name: "Box",
          description:
            "Fundamental layout container with spacing and styling options",
          path: `/${locale}/docs/components/layout/box`,
          status: "stable",
        },
        {
          name: "Container",
          description:
            "Centered content container with responsive width constraints",
          path: `/${locale}/docs/components/layout/container`,
          status: "stable",
        },
        {
          name: "Grid",
          description:
            "Two-dimensional grid layout system with responsive options",
          path: `/${locale}/docs/components/layout/grid`,
          status: "stable",
        },
        {
          name: "Flex",
          description:
            "Flexible box layout with alignment and distribution controls",
          path: `/${locale}/docs/components/layout/flex`,
          status: "stable",
        },
        {
          name: "Stack",
          description:
            "Vertical or horizontal stack of elements with even spacing",
          path: `/${locale}/docs/components/layout/stack`,
          status: "stable",
        },
        {
          name: "Divider",
          description:
            "Horizontal or vertical dividing line with customizable styles",
          path: `/${locale}/docs/components/layout/divider`,
          status: "stable",
        },
        {
          name: "Spacer",
          description: "Empty space component with configurable dimensions",
          path: `/${locale}/docs/components/layout/spacer`,
          status: "stable",
        },
      ],
    },
  ];

  return (
    <ComponentGroupsDisplay componentGroups={componentGroups} locale={locale} />
  );
});
