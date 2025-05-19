import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const props = [
    {
      name: 'direction',
      type: "FlexDirection | ResponsiveValue<FlexDirection>",
      default: "'row'",
      description: "Controls the direction of flex items. Can be 'row', 'column', 'row-reverse', or 'column-reverse'.",
    },
    {
      name: 'wrap',
      type: "FlexWrap | ResponsiveValue<FlexWrap>",
      default: "'nowrap'",
      description: "Determines whether flex items wrap onto multiple lines. Can be 'nowrap', 'wrap', or 'wrap-reverse'.",
    },
    {
      name: 'justify',
      type: "FlexJustify | ResponsiveValue<FlexJustify>",
      default: "'start'",
      description: "Controls alignment of flex items along the main axis. Can be 'start', 'center', 'end', 'between', 'around', or 'evenly'.",
    },
    {
      name: 'align',
      type: "FlexAlign | ResponsiveValue<FlexAlign>",
      default: "'stretch'",
      description: "Controls alignment of flex items along the cross axis. Can be 'start', 'center', 'end', 'stretch', or 'baseline'.",
    },
    {
      name: 'alignContent',
      type: "FlexAlignContent | ResponsiveValue<FlexAlignContent>",
      default: "undefined",
      description: "Controls alignment of flex lines within the container when there is extra space on the cross axis. Can be 'start', 'center', 'end', 'between', 'around', or 'stretch'.",
    },
    {
      name: 'gap',
      type: "FlexGap | ResponsiveValue<FlexGap>",
      default: "'none'",
      description: "Sets the gap between flex items. Can be 'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', or '3xl'.",
    },
    {
      name: 'columnGap',
      type: "FlexGap | ResponsiveValue<FlexGap>",
      default: "undefined",
      description: "Sets the gap between columns. Overrides the column gap set by the 'gap' prop.",
    },
    {
      name: 'rowGap',
      type: "FlexGap | ResponsiveValue<FlexGap>",
      default: "undefined",
      description: "Sets the gap between rows. Overrides the row gap set by the 'gap' prop.",
    },
    {
      name: 'supportRtl',
      type: "boolean",
      default: "true",
      description: "Enables RTL (right-to-left) support by automatically reversing horizontal directions when in RTL mode.",
    },
    {
      name: 'as',
      type: "keyof QwikIntrinsicElements",
      default: "'div'",
      description: "The HTML element to render the flex container as.",
    },
    {
      name: 'children',
      type: "JSXNode | string",
      default: "undefined",
      description: "The content to render inside the flex container.",
    },
    {
      name: 'class',
      type: "string",
      default: "undefined",
      description: "Additional CSS classes to apply to the flex container.",
    },
  ];

  const flexItemProps = [
    {
      name: 'order',
      type: "number | ResponsiveValue<number>",
      default: "undefined",
      description: "Controls the order in which the flex item appears within the flex container.",
    },
    {
      name: 'grow',
      type: "number | boolean | ResponsiveValue<number | boolean>",
      default: "undefined",
      description: "Controls how much the flex item grows relative to other items. Use true for 1, false for 0, or a specific number.",
    },
    {
      name: 'shrink',
      type: "number | boolean | ResponsiveValue<number | boolean>",
      default: "undefined",
      description: "Controls how much the flex item shrinks relative to other items. Use true for 1, false for 0, or a specific number.",
    },
    {
      name: 'basis',
      type: "string | 'auto' | ResponsiveValue<string | 'auto'>",
      default: "undefined",
      description: "Sets the initial main size of the flex item. Can be a CSS value like '200px', '50%', or 'auto'.",
    },
    {
      name: 'alignSelf',
      type: "FlexAlign | ResponsiveValue<FlexAlign>",
      default: "undefined",
      description: "Overrides the align prop of the parent container for this specific item. Can be 'start', 'center', 'end', 'stretch', or 'baseline'.",
    },
    {
      name: 'as',
      type: "keyof QwikIntrinsicElements",
      default: "'div'",
      description: "The HTML element to render the flex item as.",
    },
    {
      name: 'children',
      type: "JSXNode | string",
      default: "undefined",
      description: "The content to render inside the flex item.",
    },
    {
      name: 'class',
      type: "string",
      default: "undefined",
      description: "Additional CSS classes to apply to the flex item.",
    },
  ];

  const types = [
    {
      name: 'FlexDirection',
      type: "'row' | 'column' | 'row-reverse' | 'column-reverse'",
    },
    {
      name: 'FlexWrap',
      type: "'nowrap' | 'wrap' | 'wrap-reverse'",
    },
    {
      name: 'FlexJustify',
      type: "'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'",
    },
    {
      name: 'FlexAlign',
      type: "'start' | 'center' | 'end' | 'stretch' | 'baseline'",
    },
    {
      name: 'FlexAlignContent',
      type: "'start' | 'center' | 'end' | 'between' | 'around' | 'stretch'",
    },
    {
      name: 'FlexGap',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
    },
    {
      name: 'ResponsiveValue<T>',
      type: "{ base?: T; sm?: T; md?: T; lg?: T; xl?: T; '2xl'?: T }",
      description: "Type for defining responsive values across different breakpoints.",
    },
  ];

  return (
    <APIReferenceTemplate
      components={[
        {
          name: 'Flex',
          description: 'A flexible layout container for creating complex UI arrangements using CSS Flexbox.',
          props,
        },
        {
          name: 'FlexItem',
          description: 'A component for configuring individual items within a Flex container.',
          props: flexItemProps,
        },
      ]}
      types={types}
    />
  );
});
