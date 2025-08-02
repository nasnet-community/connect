import {
  component$,
  Slot,
  useSignal,
  useTask$,
  useVisibleTask$,
  $,
} from "@builder.io/qwik";
import { type DocumentHead, useLocation } from "@builder.io/qwik-city";
import { DocsSideNavigation } from "~/components/Docs";

export const head: DocumentHead = ({ head }) => {
  // Add "Documentation" to the title
  return {
    title: `${head.title ? `${head.title} - ` : ""}Documentation | NASNET Connect`,
  };
};

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  const activePath = useSignal("");
  const sidebarVisible = useSignal(true);
  const isMobile = useSignal(false);

  // Check if screen is mobile-sized
  useVisibleTask$(({ cleanup }) => {
    const checkSize = () => {
      isMobile.value = window.innerWidth < 768;
      // Auto-hide sidebar on mobile by default
      if (isMobile.value && sidebarVisible.value) {
        sidebarVisible.value = false;
      }
    };

    // Initial check
    checkSize();

    // Add resize listener
    window.addEventListener("resize", checkSize);

    // Clean up
    cleanup(() => {
      window.removeEventListener("resize", checkSize);
    });
  });

  // Update active path when location changes
  useTask$(({ track }) => {
    const pathname = track(() => location.url.pathname);

    // Find the best matching path for the navigation
    if (pathname === `/${locale}/docs` || pathname === `/${locale}/docs/`) {
      activePath.value = `/${locale}/docs`;
      return;
    }

    // For component sections, activate the parent section
    if (pathname.includes(`/${locale}/docs/components/`)) {
      if (pathname.includes("/typography/"))
        activePath.value = `/${locale}/docs/components/typography`;
      else if (pathname.includes("/layout/"))
        activePath.value = `/${locale}/docs/components/layout`;
      else if (pathname.includes("/input/"))
        activePath.value = `/${locale}/docs/components/input`;
      else if (pathname.includes("/form/"))
        activePath.value = `/${locale}/docs/components/form`;
      else if (pathname.includes("/data-display/"))
        activePath.value = `/${locale}/docs/components/data-display`;
      else if (pathname.includes("/feedback/"))
        activePath.value = `/${locale}/docs/components/feedback`;
      else if (pathname.includes("/navigation/"))
        activePath.value = `/${locale}/docs/components/navigation`;
      else if (pathname.includes("/overlay/"))
        activePath.value = `/${locale}/docs/components/overlay`;
      else if (pathname.includes("/iconography/"))
        activePath.value = `/${locale}/docs/components/iconography`;
      else if (pathname.includes("/graph/"))
        activePath.value = `/${locale}/docs/components/graph`;
      else activePath.value = `/${locale}/docs/components`;
      return;
    }

    // Default to current path
    activePath.value = pathname;
  });

  // Toggle sidebar visibility
  const toggleSidebar$ = $(() => {
    sidebarVisible.value = !sidebarVisible.value;
  });

  // Categories for navigation
  const categories = [
    {
      id: "getting-started",
      name: "Getting Started",
      links: [{ href: `/${locale}/docs`, label: "Introduction" }],
    },
    {
      id: "components",
      name: "Components",
      links: [
        { href: `/${locale}/docs/components`, label: "Overview" },
        {
          href: `/${locale}/docs/components/typography`,
          label: "Typography",
          subComponents: [
            {
              href: `/${locale}/docs/components/typography/heading`,
              label: "Heading",
            },
            {
              href: `/${locale}/docs/components/typography/text`,
              label: "Text",
            },
            {
              href: `/${locale}/docs/components/typography/link`,
              label: "Link",
            },
            {
              href: `/${locale}/docs/components/typography/code-display`,
              label: "Code Display",
            },
          ],
        },
        {
          href: `/${locale}/docs/components/layout`,
          label: "Layout",
          subComponents: [
            { href: `/${locale}/docs/components/layout/box`, label: "Box" },
            {
              href: `/${locale}/docs/components/layout/container`,
              label: "Container",
            },
            {
              href: `/${locale}/docs/components/layout/divider`,
              label: "Divider",
            },
            { href: `/${locale}/docs/components/layout/flex`, label: "Flex" },
            { href: `/${locale}/docs/components/layout/grid`, label: "Grid" },
            {
              href: `/${locale}/docs/components/layout/spacer`,
              label: "Spacer",
            },
            { href: `/${locale}/docs/components/layout/stack`, label: "Stack" },
          ],
        },
        {
          href: `/${locale}/docs/components/input`,
          label: "Input",
          subComponents: [
            {
              href: `/${locale}/docs/components/input/button`,
              label: "Button",
            },
            {
              href: `/${locale}/docs/components/input/select`,
              label: "Select",
            },
            {
              href: `/${locale}/docs/components/input/switch`,
              label: "Switch",
            },
            {
              href: `/${locale}/docs/components/input/toggle`,
              label: "Toggle",
            },
          ],
        },
        {
          href: `/${locale}/docs/components/form`,
          label: "Form",
          subComponents: [
            {
              href: `/${locale}/docs/components/form/checkbox`,
              label: "Checkbox",
            },
            {
              href: `/${locale}/docs/components/form/container`,
              label: "Container",
            },
            {
              href: `/${locale}/docs/components/form/datepicker`,
              label: "DatePicker",
            },
            { href: `/${locale}/docs/components/form/field`, label: "Field" },
            {
              href: `/${locale}/docs/components/form/fileupload`,
              label: "FileUpload",
            },
            { href: `/${locale}/docs/components/form/form`, label: "Form" },
            {
              href: `/${locale}/docs/components/form/formerrormessage`,
              label: "FormErrorMessage",
            },
            {
              href: `/${locale}/docs/components/form/formhelpertext`,
              label: "FormHelperText",
            },
            {
              href: `/${locale}/docs/components/form/formlabel`,
              label: "FormLabel",
            },
            {
              href: `/${locale}/docs/components/form/passwordfield`,
              label: "PasswordField",
            },
            {
              href: `/${locale}/docs/components/form/radio`,
              label: "Radio",
            },
            {
              href: `/${locale}/docs/components/form/radiogroup`,
              label: "RadioGroup",
            },
            {
              href: `/${locale}/docs/components/form/serverfield`,
              label: "ServerField",
            },
            { href: `/${locale}/docs/components/form/slider`, label: "Slider" },
            {
              href: `/${locale}/docs/components/form/textarea`,
              label: "TextArea",
            },
          ],
        },
        {
          href: `/${locale}/docs/components/data-display`,
          label: "Data Display",
          subComponents: [
            {
              href: `/${locale}/docs/components/data-display/accordion`,
              label: "Accordion",
            },
            {
              href: `/${locale}/docs/components/data-display/avatar`,
              label: "Avatar",
            },
            {
              href: `/${locale}/docs/components/data-display/badge`,
              label: "Badge",
            },
            {
              href: `/${locale}/docs/components/data-display/card`,
              label: "Card",
            },
            {
              href: `/${locale}/docs/components/data-display/list`,
              label: "List",
            },
            {
              href: `/${locale}/docs/components/data-display/progress`,
              label: "Progress",
            },
            {
              href: `/${locale}/docs/components/data-display/table`,
              label: "Table",
            },
            {
              href: `/${locale}/docs/components/data-display/tooltip`,
              label: "Tooltip",
            },
          ],
        },
        {
          href: `/${locale}/docs/components/feedback`,
          label: "Feedback",
          subComponents: [
            {
              href: `/${locale}/docs/components/feedback/alert`,
              label: "Alert",
            },
            {
              href: `/${locale}/docs/components/feedback/dialog`,
              label: "Dialog",
            },
            {
              href: `/${locale}/docs/components/feedback/drawer`,
              label: "Drawer",
            },
            {
              href: `/${locale}/docs/components/feedback/errormessage`,
              label: "Error Message",
            },
            {
              href: `/${locale}/docs/components/feedback/modal`,
              label: "Modal",
            },
            {
              href: `/${locale}/docs/components/feedback/popover`,
              label: "Popover",
            },
            {
              href: `/${locale}/docs/components/feedback/promobanner`,
              label: "Promo Banner",
            },
            {
              href: `/${locale}/docs/components/feedback/showcase`,
              label: "Showcase",
            },
            {
              href: `/${locale}/docs/components/feedback/toast`,
              label: "Toast",
            },
          ],
        },
        {
          href: `/${locale}/docs/components/navigation`,
          label: "Navigation",
          subComponents: [
            {
              href: `/${locale}/docs/components/navigation/breadcrumbs`,
              label: "Breadcrumbs",
            },
            {
              href: `/${locale}/docs/components/navigation/pagination`,
              label: "Pagination",
            },
            {
              href: `/${locale}/docs/components/navigation/side-navigation`,
              label: "Side Navigation",
            },
            {
              href: `/${locale}/docs/components/navigation/tab-navigation`,
              label: "Tab Navigation",
            },
            {
              href: `/${locale}/docs/components/navigation/top-navigation`,
              label: "Top Navigation",
            },
          ],
        },
        { href: `/${locale}/docs/components/overlay`, label: "Overlay" },
        {
          href: `/${locale}/docs/components/iconography`,
          label: "Iconography",
        },
        { href: `/${locale}/docs/components/graph`, label: "Graph" },
        { href: `/${locale}/docs/components/stepper`, label: "Stepper" },
      ],
    },
    {
      id: "guides",
      name: "Guides",
      links: [],
    },
  ];

  return (
    <DocsSideNavigation
      categories={categories}
      activePath={activePath.value}
      sidebarVisible={sidebarVisible.value}
      onToggleSidebar$={toggleSidebar$}
      renderFullLayout={true}
    >
      <Slot />
    </DocsSideNavigation>
  );
});
