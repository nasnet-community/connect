import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates/APIReferenceTemplate";

export default component$(() => {
  const avatarProps = [
    {
      name: "size",
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      defaultValue: "'md'",
      description: "Controls the size of the avatar",
    },
    {
      name: "shape",
      type: "'circle' | 'square' | 'rounded'",
      defaultValue: "'circle'",
      description: "Defines the shape of the avatar",
    },
    {
      name: "variant",
      type: "'image' | 'initials' | 'icon'",
      defaultValue: "Determined by children",
      description: "The visual style variant of the avatar",
    },
    {
      name: "src",
      type: "string",
      defaultValue: "undefined",
      description: "URL for avatar image when using an image avatar",
    },
    {
      name: "alt",
      type: "string",
      defaultValue: "'Avatar'",
      description: "Alternative text for the avatar for accessibility",
    },
    {
      name: "initials",
      type: "string",
      defaultValue: "undefined",
      description: "Text to display when using an initials avatar",
    },
    {
      name: "icon",
      type: "JSXChildren",
      defaultValue: "undefined",
      description: "Icon element to display when using an icon avatar",
    },
    {
      name: "color",
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'",
      defaultValue: "'primary'",
      description: "Background color for initials or icon avatar",
    },
    {
      name: "status",
      type: "'online' | 'offline' | 'away' | 'busy' | 'none'",
      defaultValue: "undefined",
      description: "Displays a status indicator with the avatar",
    },
    {
      name: "statusPosition",
      type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
      defaultValue: "'bottom-right'",
      description: "Position of the status indicator",
    },
    {
      name: "bordered",
      type: "boolean",
      defaultValue: "false",
      description: "Adds a border around the avatar",
    },
    {
      name: "borderColor",
      type: "string",
      defaultValue: "undefined",
      description: "Custom border color class",
    },
    {
      name: "loading",
      type: "boolean",
      defaultValue: "false",
      description: "Shows a loading state",
    },
    {
      name: "clickable",
      type: "boolean",
      defaultValue: "false",
      description: "Makes the avatar clickable (renders as a button)",
    },
    {
      name: "onClick$",
      type: "QRL<(event: MouseEvent) => void>",
      defaultValue: "undefined",
      description: "Click handler for clickable avatars",
    },
    {
      name: "href",
      type: "string",
      defaultValue: "undefined",
      description: "Makes the avatar a link (renders as an anchor)",
    },
    {
      name: "target",
      type: "string",
      defaultValue: "'_self'",
      description: "Target attribute for the link when href is provided",
    },
    {
      name: "class",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes to apply",
    },
    {
      name: "id",
      type: "string",
      defaultValue: "undefined",
      description: "ID attribute for the avatar element",
    },
    {
      name: "ariaLabel",
      type: "string",
      defaultValue: "value of alt prop",
      description: "Accessible label for the avatar",
    },
  ];

  const avatarGroupProps = [
    {
      name: "max",
      type: "number",
      defaultValue: "5",
      description: "Maximum number of avatars to display before showing +X",
    },
    {
      name: "size",
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      defaultValue: "'md'",
      description: "Size of all avatars in the group",
    },
    {
      name: "shape",
      type: "'circle' | 'square' | 'rounded'",
      defaultValue: "'circle'",
      description: "Shape of all avatars in the group",
    },
    {
      name: "bordered",
      type: "boolean",
      defaultValue: "true",
      description: "Whether avatars in the group should have borders",
    },
    {
      name: "spacing",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "'md'",
      description: "Space between the avatars in the group",
    },
    {
      name: "total",
      type: "number",
      defaultValue: "undefined",
      description: "Total number of avatars (to calculate remaining count)",
    },
    {
      name: "class",
      type: "string",
      defaultValue: "''",
      description: "Additional CSS classes to apply",
    },
  ];

  const allProps = [
    ...avatarProps.map((prop) => ({ ...prop, component: "Avatar" })),
    ...avatarGroupProps.map((prop) => ({ ...prop, component: "AvatarGroup" })),
  ];

  return <APIReferenceTemplate props={allProps} />;
});
