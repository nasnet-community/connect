import { component$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { ComponentGroup } from "~/components/Docs";
import { ComponentGroupsDisplay } from "~/components/Docs";
import { HiDocumentTextOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";

  const componentGroups: ComponentGroup[] = [
    {
      name: "Typography",
      description: "Text formatting and display components",
      icon: $(HiDocumentTextOutline),
      components: [
        {
          name: "Heading",
          description:
            "Six levels of section headings with customizable weights, alignments, and responsive sizing",
          path: `/${locale}/docs/components/typography/heading`,
          status: "stable",
        },
        {
          name: "Text",
          description:
            "Versatile text component with styles, sizing, weights, and transformation options",
          path: `/${locale}/docs/components/typography/text`,
          status: "stable",
        },
        {
          name: "Link",
          description:
            "Smart links with internal/external routing and multiple visual variants",
          path: `/${locale}/docs/components/typography/link`,
          status: "stable",
        },
        {
          name: "Code Display",
          description:
            "Formatted code blocks with syntax highlighting and copy functionality",
          path: `/${locale}/docs/components/typography/code-display`,
          status: "stable",
        },
      ],
    },
  ];

  return (
    <ComponentGroupsDisplay componentGroups={componentGroups} locale={locale} />
  );
});
