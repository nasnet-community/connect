import { component$ } from '@builder.io/qwik';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '~/components/Core/DataDisplay/Accordion';

export const AccordionVariants = component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Default Variant</h3>
        <Accordion variant="default">
          <AccordionItem value="item-1">
            <AccordionTrigger>Default Accordion Item</AccordionTrigger>
            <AccordionContent>
              This is the default accordion style with minimal styling.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Bordered Variant</h3>
        <Accordion variant="bordered">
          <AccordionItem value="item-1">
            <AccordionTrigger>Bordered Accordion Item</AccordionTrigger>
            <AccordionContent>
              This accordion has borders around each item for better visual separation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Separated Variant</h3>
        <Accordion variant="separated">
          <AccordionItem value="item-1">
            <AccordionTrigger>Separated Accordion Item</AccordionTrigger>
            <AccordionContent>
              This accordion has separation between items with distinct cards for each item.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>
              The gap between items is clearly visible in this variant.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
});
