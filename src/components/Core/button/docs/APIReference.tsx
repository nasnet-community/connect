import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const buttonProps = [
    {
      name: "variant",
      type: "'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'error' | 'warning' | 'info'",
      defaultValue: "primary",
      description: "Controls the visual style of the button.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "md",
      description: "Sets the size of the button.",
    },
    {
      name: "type",
      type: "'button' | 'submit' | 'reset'",
      defaultValue: "button",
      description: "Specifies the HTML button type attribute.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, disables the button and prevents user interaction.",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, displays a loading spinner and disables the button.",
    },
    {
      name: "onClick$",
      type: "QRL<() => void>",
      description: "Function called when the button is clicked.",
    },
    {
      name: "aria-label",
      type: "string",
      description: "Accessible label for the button that describes its action.",
    },
    {
      name: "leftIcon",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, reserves space for an icon on the left side of the button text.",
    },
    {
      name: "rightIcon",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, reserves space for an icon on the right side of the button text.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the button element.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description: "When true, makes the button full width of its container.",
    },
    {
      name: "responsive",
      type: "boolean",
      defaultValue: "false",
      description:
        "When true, makes the button full width on mobile devices (max-sm breakpoint).",
    },
    {
      name: "ripple",
      type: "boolean",
      defaultValue: "true",
      description: "When true, enables the ripple effect on button click.",
    },
    {
      name: "iconSize",
      type: "'auto' | 'sm' | 'md' | 'lg'",
      defaultValue: "auto",
      description:
        "Controls the size of icons in the button. 'auto' adjusts icon size based on button size.",
    },
  ];

  return (
    <APIReferenceTemplate props={buttonProps}>
      <p>
        The Button component is a versatile element for triggering actions or
        events in your application. It accepts standard HTML button attributes
        in addition to its specific props.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Slots</h3>
      <p class="mb-2">
        The Button component provides the following slots for content:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>default</code> - Primary content of the button (text/child
          elements)
        </li>
        <li>
          <code>leftIcon</code> - Content to display as an icon on the left side
          (requires <code>leftIcon</code> prop)
        </li>
        <li>
          <code>rightIcon</code> - Content to display as an icon on the right
          side (requires <code>rightIcon</code> prop)
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Events</h3>
      <p class="mb-4">
        In addition to standard HTML button events, the Button component
        specifically handles:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>onClick$</code> - Triggered when the button is clicked
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Variant Styles</h3>
      <p class="mb-2">
        The Button component supports multiple variants for different use cases:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>primary</code> - Primary action buttons with brand colors
        </li>
        <li>
          <code>secondary</code> - Secondary actions with subtle styling
        </li>
        <li>
          <code>outline</code> - Bordered buttons for tertiary actions
        </li>
        <li>
          <code>ghost</code> - Minimal buttons for less prominent actions
        </li>
        <li>
          <code>success</code> - Positive actions like save or confirm
        </li>
        <li>
          <code>error</code> - Destructive actions like delete or cancel
        </li>
        <li>
          <code>warning</code> - Actions requiring caution
        </li>
        <li>
          <code>info</code> - Informational or neutral actions
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-semibold">Accessibility</h3>
      <p class="mb-2">
        The Button component follows accessibility best practices:
      </p>

      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>Maintains proper focus states for keyboard navigation</li>
        <li>
          Supports <code>aria-label</code> for buttons with icon-only content
        </li>
        <li>Uses appropriate disabled attribute for unavailable actions</li>
        <li>Preserves proper focus ring visibility for keyboard users</li>
      </ul>
    </APIReferenceTemplate>
  );
});
