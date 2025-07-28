import { component$ } from "@builder.io/qwik";
import { APIReferenceTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const listProps = [
    {
      name: "variant",
      type: "'unordered' | 'ordered' | 'definition'",
      defaultValue: "unordered",
      description: "Type of list to render.",
    },
    {
      name: "marker",
      type: "'disc' | 'circle' | 'square' | 'decimal' | 'roman' | 'alpha' | 'none'",
      defaultValue: "disc (for unordered), decimal (for ordered)",
      description: "Visual style of the list item markers.",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      defaultValue: "md",
      description: "Controls the text size of the list items.",
    },
    {
      name: "spacing",
      type: "'compact' | 'normal' | 'relaxed'",
      defaultValue: "normal",
      description: "Controls vertical spacing between list items.",
    },
    {
      name: "nested",
      type: "boolean",
      defaultValue: "false",
      description: "Indicates if this list is nested within another list item.",
    },
    {
      name: "start",
      type: "number",
      description: "For ordered lists, specifies the starting number.",
    },
    {
      name: "reversed",
      type: "boolean",
      defaultValue: "false",
      description:
        "For ordered lists, whether the list should be displayed in reverse order.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the list.",
    },
    {
      name: "id",
      type: "string",
      description: "The ID attribute for the list element.",
    },
    {
      name: "ariaLabel",
      type: "string",
      description: "Accessible label for the list (used for aria-label).",
    },
  ];

  const listItemProps = [
    {
      name: "children",
      type: "JSXChildren",
      description: "Content of the list item.",
    },
    {
      name: "active",
      type: "boolean",
      defaultValue: "false",
      description: "Indicates if this item is currently active/selected.",
    },
    {
      name: "disabled",
      type: "boolean",
      defaultValue: "false",
      description:
        "Whether the list item is disabled (reduces opacity and removes interactivity).",
    },
    {
      name: "value",
      type: "string",
      description:
        "Provides an explicit value for the list item (useful for accessibility).",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the list item.",
    },
    {
      name: "id",
      type: "string",
      description: "The ID attribute for the list item element.",
    },
  ];

  const listTermProps = [
    {
      name: "children",
      type: "JSXChildren",
      description: "Content of the definition term.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the term.",
    },
  ];

  const listDescriptionProps = [
    {
      name: "children",
      type: "JSXChildren",
      description: "Content of the definition description.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes to apply to the description.",
    },
  ];

  return (
    <APIReferenceTemplate props={listProps}>
      <p>
        The List component consists of a main List container and several
        subcomponents: ListItem, ListTerm, and ListDescription. Each component
        has its own set of props to control its appearance and behavior.
      </p>

      <h3 class="mb-2 mt-6 text-lg font-semibold">ListItem Props</h3>
      <APIReferenceTemplate props={listItemProps} />

      <h3 class="mb-2 mt-6 text-lg font-semibold">ListTerm Props</h3>
      <APIReferenceTemplate props={listTermProps} />

      <h3 class="mb-2 mt-6 text-lg font-semibold">ListDescription Props</h3>
      <APIReferenceTemplate props={listDescriptionProps} />

      <h3 class="mb-2 mt-6 text-lg font-semibold">Component Exports</h3>
      <p class="mb-2">The List module exports the following components:</p>
      <ul class="mb-4 ml-4 list-inside list-disc">
        <li>
          <code>List</code> - Base list component
        </li>
        <li>
          <code>ListItem</code> - Individual list item
        </li>
        <li>
          <code>ListTerm</code> - Term in a definition list
        </li>
        <li>
          <code>ListDescription</code> - Description in a definition list
        </li>
        <li>
          <code>UnorderedList</code> - Convenience component for unordered lists
        </li>
        <li>
          <code>OrderedList</code> - Convenience component for ordered lists
        </li>
        <li>
          <code>DefinitionList</code> - Convenience component for definition
          lists
        </li>
      </ul>

      <p>
        The convenience components (UnorderedList, OrderedList, DefinitionList)
        are wrappers around the base List component with the variant property
        pre-set for easier usage.
      </p>
    </APIReferenceTemplate>
  );
});
