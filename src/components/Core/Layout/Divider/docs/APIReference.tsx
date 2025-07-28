import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const dividerProps = [
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      defaultValue: "horizontal",
      description: "The orientation of the divider.",
    },
    {
      name: "thickness",
      type: "'thin' | 'medium' | 'thick'",
      defaultValue: "medium",
      description: "The thickness of the divider line.",
    },
    {
      name: "variant",
      type: "'solid' | 'dashed' | 'dotted'",
      defaultValue: "solid",
      description: "The style of the divider line.",
    },
    {
      name: "color",
      type: "'default' | 'primary' | 'secondary' | 'muted'",
      defaultValue: "default",
      description: "The color of the divider.",
    },
    {
      name: "label",
      type: "JSXChildren",
      description: "Optional text or content to display within the divider.",
    },
    {
      name: "labelPosition",
      type: "'start' | 'center' | 'end'",
      defaultValue: "center",
      description: "Position of the label within the divider.",
    },
    {
      name: "spacing",
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "md",
      description:
        "Controls the spacing above and below the divider (for horizontal) or left and right (for vertical).",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the divider.",
    },
    {
      name: "role",
      type: "string",
      defaultValue: "separator",
      description: 'ARIA role for the divider. Default is "separator".',
    },
  ];

  return (
    <APIReferenceTemplate props={dividerProps}>
      <p>
        The Divider component creates a visual separation between content
        sections. It can be customized with different orientations, styles, and
        can include labels.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Accessibility</h3>
      <p class="mb-4">
        The Divider component follows accessibility best practices:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          Uses appropriate ARIA attributes with <code>role="separator"</code> by
          default
        </li>
        <li>
          Includes <code>aria-orientation</code> to specify the divider's
          direction
        </li>
        <li>
          Ensures sufficient contrast between divider and background for
          visibility
        </li>
        <li>
          When used with labels, proper text contrast is maintained for
          readability
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Design Considerations</h3>
      <p class="mb-4">
        When using dividers, consider the following design guidelines:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>Use dividers sparingly to avoid cluttering the interface</li>
        <li>
          Choose thickness based on the visual hierarchy needed - thicker lines
          create stronger visual breaks
        </li>
        <li>
          Match the divider's color to your overall design system's color
          palette
        </li>
        <li>
          Consider using labeled dividers to help organize large sections of
          content
        </li>
        <li>
          For vertical dividers, ensure they have sufficient height to be
          clearly visible
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Styling</h3>
      <p class="mb-2">
        The Divider component can be styled through these props or with custom
        CSS classes:
      </p>

      <ul class="ml-4 list-inside list-disc">
        <li>
          Use the <code>color</code> prop for semantic color variations
        </li>
        <li>
          Use the <code>variant</code> prop to switch between solid, dashed, or
          dotted styles
        </li>
        <li>
          Use the <code>thickness</code> prop to control the weight of the
          dividing line
        </li>
        <li>
          Use the <code>class</code> prop for additional customization when
          needed
        </li>
      </ul>
    </APIReferenceTemplate>
  );
});
