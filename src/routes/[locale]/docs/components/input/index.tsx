import { component$, $ } from '@builder.io/qwik';
import { useLocation } from "@builder.io/qwik-city";
import { ComponentGroupsDisplay, ComponentGroup } from "~/components/Docs";
import { HiCursorArrowRaysOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  
  const componentGroups: ComponentGroup[] = [
    {
      name: "Input",
      description: "Components for collecting user input",
      icon: $(HiCursorArrowRaysOutline),
      components: [
        {
          name: "Button",
          description: "Interactive element for triggering actions with multiple variants and states",
          path: `/${locale}/docs/components/input/button`,
          status: "stable"
        },
        {
          name: "Select",
          description: "Dropdown selection component with search and option grouping capabilities",
          path: `/${locale}/docs/components/input/select`,
          status: "stable"
        },
        {
          name: "Switch",
          description: "Toggle control for binary options with customizable styling",
          path: `/${locale}/docs/components/input/switch`,
          status: "stable"
        }
      ]
    }
  ];

  return <ComponentGroupsDisplay componentGroups={componentGroups} locale={locale} />;
}); 