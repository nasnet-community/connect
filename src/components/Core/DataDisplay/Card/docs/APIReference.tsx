import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const cardProps = [
    {
      name: "children",
      type: "JSXChildren",
      description:
        "Card content. Typically includes CardHeader, CardBody, CardFooter and/or CardMedia components.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the card.",
    },
    {
      name: "id",
      type: "string",
      description: "The ID attribute for the card element.",
    },
    {
      name: "elevation",
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'",
      defaultValue: "sm",
      description: "Controls the shadow depth of the card.",
    },
    {
      name: "radius",
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      defaultValue: "md",
      description: "Controls the border radius of the card.",
    },
    {
      name: "variant",
      type: "'default' | 'outlined' | 'filled'",
      defaultValue: "default",
      description: "Visual style variant of the card.",
    },
    {
      name: "hoverEffect",
      type: "'none' | 'raise' | 'border' | 'shadow'",
      defaultValue: "none",
      description: "Effect to apply when the card is hovered or focused.",
    },
    {
      name: "interactive",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether the card can be interacted with (clicked, focused).",
    },
    {
      name: "fullHeight",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether the card should take up the full height of its container.",
    },
    {
      name: "fullWidth",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether the card should take up the full width of its container.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether the card is disabled (reduces opacity and removes interactivity).",
    },
    {
      name: "bgColor",
      type: "string",
      description:
        "Custom background color for the card. Can be any valid CSS color value.",
    },
    {
      name: "borderColor",
      type: "string",
      description:
        "Custom border color for the card. Can be any valid CSS color value.",
    },
    {
      name: "href",
      type: "string",
      description: "If provided, the card becomes a link pointing to this URL.",
    },
    {
      name: "target",
      type: "string",
      defaultValue: "_self",
      description: "Target attribute for the link when href is provided.",
    },
    {
      name: "as",
      type: "string",
      defaultValue: "div",
      description:
        'HTML element to render the card as (e.g., "section", "article").',
    },
    {
      name: "onClick$",
      type: "QRL<(event: MouseEvent) => void>",
      description: "Event handler called when the card is clicked.",
    },
  ];

  const cardHeaderProps = [
    {
      name: "children",
      type: "JSXChildren",
      description: "Content of the card header.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the header.",
    },
    {
      name: "bordered",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to add a bottom border to the header.",
    },
    {
      name: "compact",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to use reduced padding in the header.",
    },
  ];

  const cardBodyProps = [
    {
      name: "children",
      type: "JSXChildren",
      description: "Content of the card body.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the body.",
    },
    {
      name: "compact",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to use reduced padding in the body.",
    },
  ];

  const cardFooterProps = [
    {
      name: "children",
      type: "JSXChildren",
      description: "Content of the card footer.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the footer.",
    },
    {
      name: "bordered",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to add a top border to the footer.",
    },
    {
      name: "compact",
      type: "boolean",
      defaultValue: "false",
      description: "Whether to use reduced padding in the footer.",
    },
  ];

  const cardMediaProps = [
    {
      name: "src",
      type: "string",
      required: true,
      description: "URL of the image or media to display.",
    },
    {
      name: "alt",
      type: "string",
      description: "Alternative text for the image for accessibility.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the media container.",
    },
    {
      name: "ratio",
      type: "'1:1' | '4:3' | '16:9' | '21:9'",
      description: "Aspect ratio for the media container.",
    },
    {
      name: "position",
      type: "'top' | 'bottom'",
      defaultValue: "top",
      description: "Position of the media within the card.",
    },
    {
      name: "overlay",
      type: "JSXChildren",
      description: "Content to overlay on top of the media.",
    },
  ];

  return (
    <APIReferenceTemplate props={cardProps}>
      <p>
        The Card component is composed of a main Card container and several
        subcomponents: CardHeader, CardBody, CardFooter, and CardMedia. Each
        component has its own set of props to control its appearance and
        behavior.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">CardHeader Props</h3>
      <APIReferenceTemplate props={cardHeaderProps} />

      <h3 class="mb-2 mt-6 text-lg font-semibold">CardBody Props</h3>
      <APIReferenceTemplate props={cardBodyProps} />

      <h3 class="mb-2 mt-6 text-lg font-semibold">CardFooter Props</h3>
      <APIReferenceTemplate props={cardFooterProps} />

      <h3 class="mb-2 mt-6 text-lg font-semibold">CardMedia Props</h3>
      <APIReferenceTemplate props={cardMediaProps} />
    </APIReferenceTemplate>
  );
});
