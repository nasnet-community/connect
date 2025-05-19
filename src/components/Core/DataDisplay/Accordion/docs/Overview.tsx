import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates/OverviewTemplate';

export default component$(() => {
  return (
    <OverviewTemplate
      keyFeatures={[
        "Multiple expansion modes: single (only one open at a time) or multiple (several items can be opened)",
        "Collapsible option to allow closing all panels",
        "Three visual variants: default, bordered, and separated",
        "Three size options: sm, md, lg",
        "Customizable animation types: slide, fade, scale, or none",
        "Configurable icon display and positioning",
        "Full keyboard navigation and screen reader support"
      ]}
      whenToUse={[
        "When you need to organize content into logical sections that can be expanded or collapsed",
        "When you want to reduce visual clutter by hiding content until it's needed",
        "For creating FAQs, nested navigation menus, or settings pages",
        "When content needs to be progressively disclosed to the user",
        "In forms to group related fields that aren't always needed"
      ]}
      whenNotToUse={[
        "For content that users need to see all at once",
        "When users need to compare information across multiple sections simultaneously",
        "For high-priority information that shouldn't be hidden",
        "In place of tabs when users need to quickly switch between different views",
        "For very simple content that doesn't benefit from being collapsed"
      ]}
    >
      <p>
        The Accordion component provides a way to organize content into collapsible sections, 
        allowing users to show or hide information as needed. It helps manage complex content 
        by breaking it into digestible, focused sections that users can navigate easily.
      </p>
      
      <p class="mt-4">
        Built with accessibility in mind, the Accordion follows WAI-ARIA best practices with proper 
        keyboard navigation, focus management, and screen reader announcements. The component consists 
        of four parts: <code>Accordion</code> (the container), <code>AccordionItem</code> (individual sections), 
        <code>AccordionTrigger</code> (clickable headers), and <code>AccordionContent</code> (expandable content areas).
      </p>
    </OverviewTemplate>
  );
});
