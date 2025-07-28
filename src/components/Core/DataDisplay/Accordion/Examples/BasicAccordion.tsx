import { component$ } from "@builder.io/qwik";
import { Accordion } from "../Accordion";
import { AccordionItem } from "../AccordionItem";
import { AccordionTrigger } from "../AccordionTrigger";
import { AccordionContent } from "../AccordionContent";

export const BasicAccordion = component$(() => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is Qwik easy to use?</AccordionTrigger>
        <AccordionContent>
          <div>
            Yes! Qwik is designed to be easy to use while delivering exceptional
            performance through its resumability model.
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>What is resumability?</AccordionTrigger>
        <AccordionContent>
          <div>
            Resumability means the app starts in the browser exactly where it
            left off on the server, without having to replay and re-execute all
            the code that led to that state.
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          How does it compare to other frameworks?
        </AccordionTrigger>
        <AccordionContent>
          <div>
            Unlike other frameworks that use hydration, Qwik delivers instant-on
            applications by resuming where the server left off, drastically
            reducing the amount of JavaScript needed to make the application
            interactive.
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});

export default BasicAccordion;
