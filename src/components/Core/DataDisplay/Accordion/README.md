# Accordion Component

A vertically stacked set of interactive headings that each reveal a section of content. The Accordion component has been refactored to use custom hooks and follow a modular architecture.

## Usage

```tsx
import { component$ } from "@builder.io/qwik";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "~/components/Core/DataDisplay/Accordion";

export default component$(() => {
  return (
    <Accordion type="single" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Qwik?</AccordionTrigger>
        <AccordionContent>
          Qwik is a new kind of web framework that can deliver instant loading
          web applications at any size or complexity.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          How does Qwik differ from other frameworks?
        </AccordionTrigger>
        <AccordionContent>
          Qwik is designed from the ground up for the fastest possible page load
          time.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});
```

## Component Structure

The component has been refactored into:

1. **Accordion** - The main container component
2. **AccordionItem** - Individual expandable sections
3. **AccordionTrigger** - The clickable header that toggles the content
4. **AccordionContent** - The content that is shown/hidden

## Hooks

Custom hooks were created to extract the logic:

- `useAccordion` - Manages the main accordion state and toggle behavior
- `useAccordionItem` - Handles individual accordion item state and accessibility

## Context

Two context providers are used:

- `AccordionContext` - Shares accordion state between parent and children
- `AccordionItemContext` - Shares item state between trigger and content

## Features

- Supports single and multiple expanded items
- Various visual variants (default, bordered, separated)
- Multiple sizes (sm, md, lg)
- Customizable animation types
- Controllable via state
- Full keyboard navigation and screen reader support
