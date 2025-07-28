import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";
import type { PropDetail } from "~/components/Docs/templates";

export default component$(() => {
  const flexProps: PropDetail[] = [
    {
      name: "direction",
      type: "FlexDirection | ResponsiveValue<FlexDirection>",
      defaultValue: "'row'",
      description:
        "Controls the direction of flex items. Can be 'row', 'column', 'row-reverse', or 'column-reverse'.",
    },
    {
      name: "wrap",
      type: "FlexWrap | ResponsiveValue<FlexWrap>",
      defaultValue: "'nowrap'",
      description:
        "Determines whether flex items wrap onto multiple lines. Can be 'nowrap', 'wrap', or 'wrap-reverse'.",
    },
    {
      name: "justify",
      type: "FlexJustify | ResponsiveValue<FlexJustify>",
      defaultValue: "'start'",
      description:
        "Controls alignment of flex items along the main axis. Can be 'start', 'center', 'end', 'between', 'around', or 'evenly'.",
    },
    {
      name: "align",
      type: "FlexAlign | ResponsiveValue<FlexAlign>",
      defaultValue: "'stretch'",
      description:
        "Controls alignment of flex items along the cross axis. Can be 'start', 'center', 'end', 'stretch', or 'baseline'.",
    },
    {
      name: "alignContent",
      type: "FlexAlignContent | ResponsiveValue<FlexAlignContent>",
      description:
        "Controls alignment of flex lines within the container when there is extra space on the cross axis. Can be 'start', 'center', 'end', 'between', 'around', or 'stretch'.",
    },
    {
      name: "gap",
      type: "FlexGap | ResponsiveValue<FlexGap>",
      defaultValue: "'none'",
      description:
        "Sets the gap between flex items. Can be 'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', or '3xl'.",
    },
    {
      name: "columnGap",
      type: "FlexGap | ResponsiveValue<FlexGap>",
      description:
        "Sets the gap between columns. Overrides the column gap set by the 'gap' prop.",
    },
    {
      name: "rowGap",
      type: "FlexGap | ResponsiveValue<FlexGap>",
      description:
        "Sets the gap between rows. Overrides the row gap set by the 'gap' prop.",
    },
    {
      name: "supportRtl",
      type: "boolean",
      defaultValue: "true",
      description:
        "Enables RTL (right-to-left) support by automatically reversing horizontal directions when in RTL mode.",
    },
    {
      name: "as",
      type: "keyof QwikIntrinsicElements",
      defaultValue: "'div'",
      description: "The HTML element to render the flex container as.",
    },
    {
      name: "children",
      type: "JSXChildren",
      description: "The content to render inside the flex container.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the flex container.",
    },
  ];

  const flexItemProps: PropDetail[] = [
    {
      name: "order",
      type: "number | ResponsiveValue<number>",
      description:
        "Controls the order in which the flex item appears within the flex container.",
    },
    {
      name: "grow",
      type: "number | boolean | ResponsiveValue<number | boolean>",
      description:
        "Controls how much the flex item grows relative to other items. Use true for 1, false for 0, or a specific number.",
    },
    {
      name: "shrink",
      type: "number | boolean | ResponsiveValue<number | boolean>",
      description:
        "Controls how much the flex item shrinks relative to other items. Use true for 1, false for 0, or a specific number.",
    },
    {
      name: "basis",
      type: "string | 'auto' | ResponsiveValue<string | 'auto'>",
      description:
        "Sets the initial main size of the flex item. Can be a CSS value like '200px', '50%', or 'auto'.",
    },
    {
      name: "alignSelf",
      type: "FlexAlign | ResponsiveValue<FlexAlign>",
      description:
        "Overrides the align prop of the parent container for this specific item. Can be 'start', 'center', 'end', 'stretch', or 'baseline'.",
    },
    {
      name: "as",
      type: "keyof QwikIntrinsicElements",
      defaultValue: "'div'",
      description: "The HTML element to render the flex item as.",
    },
    {
      name: "children",
      type: "JSXChildren",
      description: "The content to render inside the flex item.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the flex item.",
    },
  ];

  // Since APIReferenceTemplate doesn't support multiple components,
  // we'll show both sets of props in sequence
  const allProps = [
    ...flexProps.map((prop) => ({ ...prop, name: `Flex.${prop.name}` })),
    ...flexItemProps.map((prop) => ({
      ...prop,
      name: `FlexItem.${prop.name}`,
    })),
  ];

  return <APIReferenceTemplate props={allProps} />;
});
