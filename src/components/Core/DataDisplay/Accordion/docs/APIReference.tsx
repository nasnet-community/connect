import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates/APIReferenceTemplate";

export default component$(() => {
  return (
    <APIReferenceTemplate
      props={[
        // Accordion props
        {
          name: "type",
          type: "'single' | 'multiple'",
          defaultValue: "'single'",
          description:
            "Determines if one or multiple items can be opened simultaneously.",
        },
        {
          name: "defaultValue",
          type: "string[]",
          defaultValue: "[]",
          description:
            "The values of the items that should be opened by default.",
        },
        {
          name: "value",
          type: "string[]",
          defaultValue: "undefined",
          description:
            "The controlled values of the opened items. Should be used with onChange$.",
        },
        {
          name: "onChange$",
          type: "QRL<(value: string[]) => void>",
          defaultValue: "undefined",
          description: "Callback fired when the open state changes.",
        },
        {
          name: "collapsible",
          type: "boolean",
          defaultValue: "false",
          description:
            'When type is "single", allows closing content by clicking the trigger of an open item.',
        },
        {
          name: "variant",
          type: "'default' | 'bordered' | 'separated'",
          defaultValue: "'default'",
          description: "Visual style variant of the accordion.",
        },
        {
          name: "size",
          type: "'sm' | 'md' | 'lg'",
          defaultValue: "'md'",
          description: "Size of the accordion affecting padding and text size.",
        },
        {
          name: "iconPosition",
          type: "'start' | 'end'",
          defaultValue: "'end'",
          description: "Position of the chevron icon in the trigger.",
        },
        {
          name: "hideIcon",
          type: "boolean",
          defaultValue: "false",
          description: "Whether to hide the chevron icon entirely.",
        },
        {
          name: "animation",
          type: "'none' | 'slide' | 'fade' | 'scale'",
          defaultValue: "'slide'",
          description: "Type of animation for opening/closing content.",
        },
        {
          name: "animationDuration",
          type: "number",
          defaultValue: "300",
          description: "Duration of the animation in milliseconds.",
        },
        // AccordionItem props
        {
          name: "value (AccordionItem)",
          type: "string",
          defaultValue: "required",
          description: "Unique identifier for the accordion item.",
          required: true,
        },
        {
          name: "disabled (AccordionItem)",
          type: "boolean",
          defaultValue: "false",
          description: "Whether the accordion item is disabled.",
        },
        // AccordionTrigger props
        {
          name: "children (AccordionTrigger)",
          type: "JSXNode",
          defaultValue: "required",
          description: "The content of the trigger.",
          required: true,
        },
        {
          name: "icon (AccordionTrigger)",
          type: "JSXNode",
          defaultValue: "chevron",
          description: "Custom icon to display instead of the default chevron.",
        },
        // AccordionContent props
        {
          name: "children (AccordionContent)",
          type: "JSXNode",
          defaultValue: "required",
          description: "The content to display when the accordion is expanded.",
          required: true,
        },
      ]}
      cssVariables={[
        {
          name: "--accordion-border-color",
          defaultValue: "theme(colors.gray.200) dark:theme(colors.gray.700)",
          description: "Border color for the accordion.",
        },
        {
          name: "--accordion-bg-color",
          defaultValue: "transparent",
          description: "Background color for the accordion.",
        },
        {
          name: "--accordion-trigger-padding",
          defaultValue: "varies by size",
          description: "Padding for the trigger element.",
        },
        {
          name: "--accordion-content-padding",
          defaultValue: "varies by size",
          description: "Padding for the content element.",
        },
        {
          name: "--accordion-animation-duration",
          defaultValue: "300ms",
          description: "Duration of the animation effect.",
        },
      ]}
    >
      <p>
        The Accordion component is composed of four main parts that work
        together to create collapsible content sections. Each part has a
        specific role in the accordion's functionality and can be customized
        with various props to meet different design requirements.
      </p>
    </APIReferenceTemplate>
  );
});
