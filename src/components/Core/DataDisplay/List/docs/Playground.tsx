import { component$ } from "@builder.io/qwik";
import { PlaygroundTemplate } from "~/components/Docs/templates";
import { List, ListItem, ListTerm, ListDescription } from "../List";

export default component$(() => {
  // Define properties for the playground
  const properties = [
    {
      type: "select" as const,
      name: "variant",
      label: "Variant",
      defaultValue: "unordered",
      options: [
        { label: "Unordered", value: "unordered" },
        { label: "Ordered", value: "ordered" },
        { label: "Definition", value: "definition" },
      ],
    },
    {
      type: "select" as const,
      name: "marker",
      label: "Marker",
      defaultValue: "disc",
      options: [
        { label: "Disc", value: "disc" },
        { label: "Circle", value: "circle" },
        { label: "Square", value: "square" },
        { label: "Decimal", value: "decimal" },
        { label: "Roman", value: "roman" },
        { label: "Alpha", value: "alpha" },
        { label: "None", value: "none" },
      ],
    },
    {
      type: "select" as const,
      name: "size",
      label: "Size",
      defaultValue: "md",
      options: [
        { label: "Small", value: "sm" },
        { label: "Medium", value: "md" },
        { label: "Large", value: "lg" },
      ],
    },
    {
      type: "select" as const,
      name: "spacing",
      label: "Spacing",
      defaultValue: "normal",
      options: [
        { label: "Compact", value: "compact" },
        { label: "Normal", value: "normal" },
        { label: "Relaxed", value: "relaxed" },
      ],
    },
    {
      type: "boolean" as const,
      name: "nested",
      label: "Nested",
      defaultValue: false,
    },
    {
      type: "number" as const,
      name: "start",
      label: "Start (ordered list)",
      defaultValue: 1,
      min: 1,
      max: 100,
      step: 1,
    },
    {
      type: "boolean" as const,
      name: "reversed",
      label: "Reversed (ordered list)",
      defaultValue: false,
    },
    {
      type: "text" as const,
      name: "ariaLabel",
      label: "ARIA Label",
      defaultValue: "Example list",
    },
  ];

  // Component that renders based on property values
  const ListComponent = component$((props: any) => {
    const { variant, ...restProps } = props;

    if (variant === "definition") {
      return (
        <List variant={variant} {...restProps}>
          <ListTerm>Term 1</ListTerm>
          <ListDescription>Description for term 1</ListDescription>
          <ListTerm>Term 2</ListTerm>
          <ListDescription>Description for term 2</ListDescription>
        </List>
      );
    }

    return (
      <List variant={variant} {...restProps}>
        <ListItem>First item</ListItem>
        <ListItem>Second item</ListItem>
        <ListItem>Third item</ListItem>
      </List>
    );
  });

  return (
    <PlaygroundTemplate component={ListComponent} properties={properties} />
  );
});
