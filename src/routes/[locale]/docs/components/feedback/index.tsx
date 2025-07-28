import { component$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import type { ComponentGroup } from "~/components/Docs";
import { ComponentGroupsDisplay } from "~/components/Docs";
import { HiBellOutline } from "@qwikest/icons/heroicons";

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";

  const componentGroups: ComponentGroup[] = [
    {
      name: "Feedback",
      description: "Components for user notifications and status indication",
      icon: $(HiBellOutline),
      components: [
        {
          name: "📱 Enhanced Showcase",
          description:
            "Interactive showcase of all feedback components with mobile optimizations, touch gestures, and accessibility features.",
          path: `/${locale}/docs/components/feedback/showcase`,
          status: "stable",
        },
        {
          name: "Alert",
          description:
            "A component for displaying status messages, notifications, and feedback.",
          path: `/${locale}/docs/components/feedback/alert`,
          status: "stable",
        },
        {
          name: "Dialog",
          description:
            "A modal dialog component for displaying content that requires user attention or interaction.",
          path: `/${locale}/docs/components/feedback/dialog`,
          status: "stable",
        },
        {
          name: "Drawer",
          description:
            "Side and edge panels that slide in from screen edges for supplementary content.",
          path: `/${locale}/docs/components/feedback/drawer`,
          status: "stable",
        },
        {
          name: "Error Message",
          description:
            "Components for displaying error messages in forms or other contexts.",
          path: `/${locale}/docs/components/feedback/errormessage`,
          status: "stable",
        },
        {
          name: "Popover",
          description:
            "Floating content that appears when interacting with a trigger element.",
          path: `/${locale}/docs/components/feedback/popover`,
          status: "stable",
        },
        {
          name: "Promo Banner",
          description:
            "Promotional messaging displays for announcements and marketing content.",
          path: `/${locale}/docs/components/feedback/promobanner`,
          status: "stable",
        },
        {
          name: "Toast",
          description:
            "Temporary notifications with positioning options and auto-dismiss functionality.",
          path: `/${locale}/docs/components/feedback/toast`,
          status: "stable",
        },
      ],
    },
  ];

  return (
    <ComponentGroupsDisplay componentGroups={componentGroups} locale={locale} />
  );
});
