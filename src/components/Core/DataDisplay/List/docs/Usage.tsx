import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const installation = `
// Import the List components
import { 
  List, 
  ListItem, 
  ListTerm, 
  ListDescription, 
  UnorderedList, 
  OrderedList, 
  DefinitionList 
} from '~/components/Core/DataDisplay/List';
`;

  const basicUsage = `
// Unordered list (default)
<List>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</List>

// Using the convenience component
<UnorderedList>
  <ListItem>First item</ListItem>
  <ListItem>Second item</ListItem>
  <ListItem>Third item</ListItem>
</UnorderedList>

// Ordered list
<List variant="ordered">
  <ListItem>First step</ListItem>
  <ListItem>Second step</ListItem>
  <ListItem>Third step</ListItem>
</List>

// Using the convenience component
<OrderedList>
  <ListItem>First step</ListItem>
  <ListItem>Second step</ListItem>
  <ListItem>Third step</ListItem>
</OrderedList>

// Definition list
<List variant="definition">
  <ListTerm>Term 1</ListTerm>
  <ListDescription>Description for term 1</ListDescription>
  <ListTerm>Term 2</ListTerm>
  <ListDescription>Description for term 2</ListDescription>
</List>

// Using the convenience component
<DefinitionList>
  <ListTerm>Term 1</ListTerm>
  <ListDescription>Description for term 1</ListDescription>
  <ListTerm>Term 2</ListTerm>
  <ListDescription>Description for term 2</ListDescription>
</DefinitionList>
`;

  const advancedUsage = `
// Custom marker style
<List marker="circle">
  <ListItem>Circle marker item</ListItem>
  <ListItem>Circle marker item</ListItem>
</List>

// Different size
<List size="lg">
  <ListItem>Large text item</ListItem>
  <ListItem>Large text item</ListItem>
</List>

// Adjust spacing
<List spacing="relaxed">
  <ListItem>More space between items</ListItem>
  <ListItem>More space between items</ListItem>
</List>

// Combined customizations
<List marker="square" size="sm" spacing="compact">
  <ListItem>Custom list item</ListItem>
  <ListItem>Custom list item</ListItem>
</List>

// Ordered list with custom start and reversed
<List variant="ordered" start={10} reversed>
  <ListItem>Item #10</ListItem>
  <ListItem>Item #9</ListItem>
  <ListItem>Item #8</ListItem>
</List>

// Nested lists
<List>
  <ListItem>First level item</ListItem>
  <ListItem>
    First level item with nested list
    <List nested>
      <ListItem>Second level item</ListItem>
      <ListItem>
        Second level item with nested list
        <List nested>
          <ListItem>Third level item</ListItem>
          <ListItem>Third level item</ListItem>
        </List>
      </ListItem>
    </List>
  </ListItem>
  <ListItem>First level item</ListItem>
</List>

// Interactive list items
<List>
  <ListItem>Regular item</ListItem>
  <ListItem active>Active item</ListItem>
  <ListItem disabled>Disabled item</ListItem>
</List>

// Lists with accessibility features
<List ariaLabel="Important product features">
  <ListItem>Accessible feature 1</ListItem>
  <ListItem>Accessible feature 2</ListItem>
</List>
`;

  const guidelines = [
    {
      title: "Use appropriate list variant",
      description:
        "Use appropriate list variant (unordered, ordered, definition) based on content relationship",
      type: "do" as const,
      code: basicUsage,
    },
    {
      title: "Use semantic markup",
      description:
        "Use semantic markup within list items (headings, paragraphs, etc.) when appropriate",
      type: "do" as const,
    },
    {
      title: "Use ordered lists for sequences",
      description:
        "Consider using ordered lists for sequential steps or ranked items",
      type: "do" as const,
    },
    {
      title: "Use definition lists appropriately",
      description: "Use definition lists for term-description pairs",
      type: "do" as const,
    },
    {
      title: "Add ARIA attributes",
      description: "Add appropriate ARIA attributes for better accessibility",
      type: "do" as const,
    },
    {
      title: "Implement proper nesting",
      description: "Implement proper nesting for hierarchical information",
      type: "do" as const,
      code: advancedUsage,
    },
    {
      title: "Don't use for visual indentation",
      description: "Don't use lists purely for visual indentation",
      type: "dont" as const,
    },
    {
      title: "Avoid deep nesting",
      description: "Avoid deeply nested lists beyond 3-4 levels",
      type: "dont" as const,
    },
    {
      title: "Don't misuse definition lists",
      description:
        "Don't use definition lists for non-term/description content",
      type: "dont" as const,
    },
    {
      title: "Avoid mixing variants",
      description: "Avoid mixing different list variants inconsistently",
      type: "dont" as const,
    },
    {
      title: "Don't break marker positioning",
      description:
        "Don't override marker positioning in ways that break accessibility",
      type: "dont" as const,
    },
    {
      title: "Avoid improper interactive content",
      description:
        "Avoid using list items for interactive content without proper role attributes",
      type: "dont" as const,
    },
  ];

  const bestPractices = [
    {
      title: "Installation",
      description: installation,
    },
  ];

  const accessibilityTips = [
    {
      title: "Use aria-label for context",
      description:
        "Provide aria-label on lists when the context isn't clear from surrounding content",
    },
    {
      title: "Maintain proper structure",
      description:
        "Ensure list items are direct children of list elements for screen reader compatibility",
    },
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
    >
      <p>
        The List component family provides semantic and accessible list
        structures for presenting content in unordered, ordered, and definition
        formats. Lists are fundamental elements for organizing and structuring
        content in a clear and scannable way.
      </p>
    </UsageTemplate>
  );
});
