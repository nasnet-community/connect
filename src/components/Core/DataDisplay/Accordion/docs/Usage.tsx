import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates/UsageTemplate';

export default component$(() => {
  return (
    <UsageTemplate
      guidelines={[
        {
          title: 'Use descriptive headers',
          description: 'Make your accordion headers clear and descriptive so users understand what content to expect when expanded.',
          code: `
// Good ✅
<AccordionTrigger>Payment Methods</AccordionTrigger>

// Avoid ❌
<AccordionTrigger>Section 1</AccordionTrigger>
          `
        },
        {
          title: 'Keep content focused',
          description: 'Each accordion section should contain related information that makes sense as a group.',
          code: `
// Good ✅
<AccordionItem value="shipping">
  <AccordionTrigger>Shipping Options</AccordionTrigger>
  <AccordionContent>
    {/* All shipping-related content */}
  </AccordionContent>
</AccordionItem>

// Avoid mixing unrelated content ❌
<AccordionItem value="mixed">
  <AccordionTrigger>Miscellaneous</AccordionTrigger>
  <AccordionContent>
    {/* Content about shipping, return policy, and company history */}
  </AccordionContent>
</AccordionItem>
          `
        },
        {
          title: 'Choose the right expansion mode',
          description: 'Use single mode for mutually exclusive content and multiple mode when users might need to compare information across sections.',
          code: `
// For FAQ or settings where one section at a time makes sense
<Accordion type="single" defaultValue={['faq-1']} collapsible>
  {/* Items */}
</Accordion>

// For content comparison where multiple open sections are helpful
<Accordion type="multiple" defaultValue={['section-1', 'section-2']}>
  {/* Items */}
</Accordion>
          `
        },
        {
          title: 'Consider nested accordions carefully',
          description: 'While possible, deeply nested accordions can create a confusing hierarchy. Use sparingly and ensure visual differentiation between levels.',
          code: `
// Use visual differentiation for nested accordions
<Accordion variant="bordered">
  <AccordionItem value="parent">
    <AccordionTrigger>Main Category</AccordionTrigger>
    <AccordionContent>
      <Accordion variant="separated" size="sm">
        <AccordionItem value="child">
          <AccordionTrigger>Subcategory</AccordionTrigger>
          <AccordionContent>
            {/* Content */}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </AccordionContent>
  </AccordionItem>
</Accordion>
          `
        },
        {
          title: 'Implement controlled mode for complex interactions',
          description: 'When accordion state needs to interact with other components or be controlled by external logic, use the controlled mode.',
          code: `
import { component$, useSignal } from '@builder.io/qwik';

export default component$(() => {
  const openSections = useSignal(['section-1']);
  
  return (
    <>
      <button onClick$={() => openSections.value = ['section-2']}>
        Open Section 2
      </button>
      
      <Accordion 
        type="single" 
        value={openSections.value} 
        onChange$={(value) => openSections.value = value}
      >
        <AccordionItem value="section-1">
          {/* Content */}
        </AccordionItem>
        <AccordionItem value="section-2">
          {/* Content */}
        </AccordionItem>
      </Accordion>
    </>
  );
});
          `
        }
      ]}
      accessibility={{
        keyboardInteraction: [
          { key: 'Tab', behavior: 'Moves focus to the accordion trigger' },
          { key: 'Space/Enter', behavior: 'When focus is on the trigger, toggles the accordion panel' },
          { key: 'Home', behavior: 'When focus is within the accordion, moves focus to the first accordion header' },
          { key: 'End', behavior: 'When focus is within the accordion, moves focus to the last accordion header' }
        ],
        bestPractices: [
          'Use proper heading levels in accordion triggers for correct document structure',
          'Ensure sufficient color contrast between trigger text and background',
          'Include visible focus indicators for keyboard navigation',
          'Provide clear visual indication of the accordion\'s current state (open/closed)',
          'For dynamic content loading, announce changes to screen reader users'
        ]
      }}
    >
      <p>
        The Accordion component is a versatile tool for organizing content into collapsible sections,
        allowing users to focus on specific information while reducing visual clutter. For optimal
        user experience, consider these usage guidelines when implementing accordions in your interface.
      </p>
    </UsageTemplate>
  );
});
