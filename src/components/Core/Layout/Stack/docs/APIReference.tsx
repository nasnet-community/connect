import { component$ } from "@builder.io/qwik";
import {
  APIReferenceTemplate,
  type PropDetail,
} from "~/components/Docs/templates/APIReferenceTemplate";
import CodeExample from "~/components/Docs/CodeExample";

export const StackAPIReference = component$(() => {
  const props: PropDetail[] = [
    {
      name: "direction",
      type: "'row' | 'column' | ResponsiveDirection",
      defaultValue: "'column'",
      description:
        "The direction to arrange items. Can be a fixed direction or responsive object for different breakpoints.",
    },
    {
      name: "spacing",
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
      defaultValue: "'md'",
      description: "The spacing between items in the stack.",
    },
    {
      name: "justify",
      type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'",
      defaultValue: "'start'",
      description: "How to position items along the main axis.",
    },
    {
      name: "align",
      type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'",
      defaultValue: "'start'",
      description: "How to align items along the cross axis.",
    },
    {
      name: "wrap",
      type: "'nowrap' | 'wrap' | 'wrap-reverse'",
      defaultValue: "'nowrap'",
      description: "Whether and how to wrap items.",
    },
    {
      name: "dividers",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to show dividers between items.",
    },
    {
      name: "dividerColor",
      type: "'default' | 'primary' | 'secondary' | 'muted'",
      defaultValue: "'muted'",
      description: "The color of dividers when dividers is true.",
    },
    {
      name: "reverse",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to reverse the order of items.",
    },
    {
      name: "supportRtl",
      type: "boolean",
      defaultValue: "true",
      description: "Whether to automatically adjust for RTL languages.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the Stack.",
    },
    {
      name: "role",
      type: "string",
      description: "ARIA role for the Stack element.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the Stack.",
    },
  ];

  const cssVariables: {
    name: string;
    description: string;
    defaultValue?: string;
  }[] = [];

  return (
    <>
      <APIReferenceTemplate props={props} cssVariables={cssVariables} />

      <div class="mt-8">
        <h3 class="mb-4 text-lg font-medium">Type Definitions</h3>
        <CodeExample
          code={`// Stack direction type
type StackDirection = 'row' | 'column';

// Responsive direction configuration
interface ResponsiveDirection {
  base?: StackDirection;
  sm?: StackDirection;
  md?: StackDirection;
  lg?: StackDirection;
  xl?: StackDirection;
  '2xl'?: StackDirection;
}

// Spacing options
type StackSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';

// Justify content options
type StackJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';

// Align items options
type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

// Flex wrap options
type StackWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

// Divider color options
type DividerColor = 'default' | 'primary' | 'secondary' | 'muted';`}
          language="typescript"
        />
      </div>
    </>
  );
});

export default StackAPIReference;
