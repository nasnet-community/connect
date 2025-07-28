import { component$ } from "@builder.io/qwik";
import { Accordion } from "../Accordion";
import { AccordionItem } from "../AccordionItem";
import { AccordionTrigger } from "../AccordionTrigger";
import { AccordionContent } from "../AccordionContent";

export const AccordionBehavior = component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="mb-2 text-sm font-medium">
          Single Item Expansion (Default)
        </h3>
        <Accordion type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>
              When this is open, clicking another item will close this one.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>
              Only one accordion item can be open at a time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Third Item</AccordionTrigger>
            <AccordionContent>
              This behavior is ideal for FAQ sections or content that should be
              viewed one section at a time.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">Multiple Item Expansion</h3>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger>First Item</AccordionTrigger>
            <AccordionContent>
              You can have multiple items open simultaneously.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>
              This is useful when users might need to compare information across
              different sections.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Third Item</AccordionTrigger>
            <AccordionContent>
              Each item can be opened or closed independently of the others.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-medium">With Default Open Item</h3>
        <Accordion type="single" defaultValue={["item-1"]}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Pre-opened Item</AccordionTrigger>
            <AccordionContent>
              This item is open by default when the component mounts.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Second Item</AccordionTrigger>
            <AccordionContent>
              This is useful when you want to direct the user's attention to
              specific content.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
});

export default AccordionBehavior;
