import { component$, $ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import { ComponentGroupsDisplay, ComponentGroup } from "~/components/Docs";
import { 
  HiChartBarOutline,
  HiCursorArrowRaysOutline,
  HiSquare2StackOutline,
  HiDocumentTextOutline,
  HiRectangleGroupOutline,
  HiBellOutline,
  HiArrowPathOutline,
  HiPaintBrushOutline,
  HiQueueListOutline
} from "@qwikest/icons/heroicons";

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
          description: "Six levels of section headings with customizable weights, alignments, and responsive sizing",
          path: `/${locale}/docs/components/typography/heading`,
          status: "stable"
        },
        {
          name: "Text",
          description: "Versatile text component with styles, sizing, weights, and transformation options",
          path: `/${locale}/docs/components/typography/text`,
          status: "stable"
        },
        {
          name: "Link",
          description: "Smart links with internal/external routing and multiple visual variants",
          path: `/${locale}/docs/components/typography/link`,
          status: "stable"
        },
        {
          name: "CodeDisplay",
          description: "Formatted code blocks with syntax highlighting and copy functionality",
          path: `/${locale}/docs/components/typography/code-display`,
          status: "stable"
        }
      ]
    },
    {
      name: "Layout",
      description: "Structural elements for page organization",
      icon: $(HiRectangleGroupOutline),
      components: [
        {
          name: "Box",
          description: "Fundamental layout container with spacing and styling options",
          path: `/${locale}/docs/components/layout/box`,
          status: "stable"
        },
        {
          name: "Container",
          description: "Centered content container with responsive width constraints",
          path: `/${locale}/docs/components/layout/container`,
          status: "stable"
        },
        {
          name: "Grid",
          description: "Two-dimensional grid layout system with responsive options",
          path: `/${locale}/docs/components/layout/grid`,
          status: "stable"
        },
        {
          name: "Flex",
          description: "Flexible box layout with alignment and distribution controls",
          path: `/${locale}/docs/components/layout/flex`,
          status: "stable"
        },
        {
          name: "Stack",
          description: "Vertical or horizontal stack of elements with even spacing",
          path: `/${locale}/docs/components/layout/stack`,
          status: "stable"
        },
        {
          name: "Divider",
          description: "Horizontal or vertical dividing line with customizable styles",
          path: `/${locale}/docs/components/layout/divider`,
          status: "stable"
        },
        {
          name: "Spacer",
          description: "Empty space component with configurable dimensions",
          path: `/${locale}/docs/components/layout/spacer`,
          status: "stable"
        }
      ]
    },
    {
      name: "Forms",
      description: "Input components for collecting user data",
      icon: $(HiCursorArrowRaysOutline),
      components: [
        {
          name: "Input",
          description: "Text input field with validation and multiple style variants",
          path: `/${locale}/docs/components/input`,
          status: "stable"
        },
        {
          name: "TextArea",
          description: "Multi-line text input with auto-resizing and character counting",
          path: `/${locale}/docs/components/form/textarea`,
          status: "stable"
        },
        {
          name: "Select",
          description: "Dropdown selection with search and option grouping",
          path: `/${locale}/docs/components/input/select`,
          status: "stable"
        },
        {
          name: "DatePicker",
          description: "Calendar-based date selection with range support and localization",
          path: `/${locale}/docs/components/form/datepicker`,
          status: "stable"
        }
      ]
    },
    {
      name: "Data Display",
      description: "Components for presenting structured data",
      icon: $(HiQueueListOutline),
      components: [
        {
          name: "Table",
          description: "Sortable and responsive data tables with customization options",
          path: `/${locale}/docs/components/data-display/table`,
          status: "stable"
        },
        {
          name: "List",
          description: "Ordered, unordered, and definition lists with multiple styling options",
          path: `/${locale}/docs/components/data-display/list`,
          status: "stable"
        },
        {
          name: "Avatar",
          description: "User representation with images, initials, or icons and group support",
          path: `/${locale}/docs/components/data-display/avatar`,
          status: "stable"
        },
        {
          name: "Badge",
          description: "Small count indicators or labels with semantic colors and variants",
          path: `/${locale}/docs/components/data-display/badge`,
          status: "stable"
        }
      ]
    },
    {
      name: "Feedback",
      description: "Components for user notifications and status indications",
      icon: $(HiBellOutline),
      components: [
        {
          name: "Alert",
          description: "Status messages with multiple variants, icons, and dismissibility",
          path: `/${locale}/docs/components/feedback/alert`,
          status: "stable"
        },
        {
          name: "Toast",
          description: "Temporary notifications with positioning options and auto-dismiss",
          path: `/${locale}/docs/components/feedback/toast`,
          status: "stable"
        },
        {
          name: "Progress",
          description: "Linear progress indicators with variants, animations, and theming",
          path: `/${locale}/docs/components/data-display/progress`,
          status: "stable"
        },
        {
          name: "Spinner",
          description: "Loading indicators with multiple visual styles and sizes",
          path: `/${locale}/docs/components/data-display/progress/spinner`,
          status: "stable"
        }
      ]
    },
    {
      name: "Overlay",
      description: "Floating and modal interface elements",
      icon: $(HiSquare2StackOutline),
      components: [
        {
          name: "Dialog",
          description: "Modal dialog boxes with focus management and accessibility features",
          path: `/${locale}/docs/components/feedback/dialog`,
          status: "stable"
        },
        {
          name: "Drawer",
          description: "Side and edge panels that slide in from screen edges",
          path: `/${locale}/docs/components/feedback/drawer`,
          status: "stable"
        },
        {
          name: "Tooltip",
          description: "Contextual information that appears on hover or focus",
          path: `/${locale}/docs/components/data-display/tooltip`,
          status: "stable"
        }
      ]
    },
    {
      name: "Navigation",
      description: "Components for moving between application views",
      icon: $(HiArrowPathOutline),
      components: [
        {
          name: "Tabs",
          description: "Tabbed interface for organizing content into separate views",
          path: `/${locale}/docs/components/navigation`,
          status: "stable"
        },
        {
          name: "Breadcrumb",
          description: "Hierarchical navigation path showing current location",
          path: `/${locale}/docs/components/navigation`,
          status: "stable"
        }
      ]
    },
    {
      name: "Iconography",
      description: "Visual symbols and icons for the interface",
      icon: $(HiPaintBrushOutline),
      components: [
        {
          name: "Icon",
          description: "Flexible icon component with sizing, colors, and accessibility features",
          path: `/${locale}/docs/components/iconography`,
          status: "stable"
        },
        {
          name: "Icon Library",
          description: "Collection of categorized icons using @qwikest/icons",
          path: `/${locale}/docs/components/iconography`,
          status: "stable"
        }
      ]
    },
    {
      name: "Data Visualization",
      description: "Components for displaying data in visual formats",
      icon: $(HiChartBarOutline),
      components: [
        {
          name: "Graph",
          description: "Interactive network graph for displaying connections and topology",
          path: `/${locale}/docs/components/graph`,
          status: "stable"
        }
      ]
    }
  ];

  return <ComponentGroupsDisplay componentGroups={componentGroups} locale={locale} />;
}); 