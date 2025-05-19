import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates/PlaygroundTemplate';
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '../index';

export default component$(() => {
  const properties = {
    accordion: {
      type: {
        options: ['single', 'multiple'],
        defaultValue: 'single',
      },
      collapsible: {
        type: 'boolean',
        defaultValue: false,
      },
      variant: {
        options: ['default', 'bordered', 'separated'],
        defaultValue: 'default',
      },
      size: {
        options: ['sm', 'md', 'lg'],
        defaultValue: 'md',
      },
      iconPosition: {
        options: ['start', 'end'],
        defaultValue: 'end',
      },
      hideIcon: {
        type: 'boolean',
        defaultValue: false,
      },
      animation: {
        options: ['none', 'slide', 'fade', 'scale'],
        defaultValue: 'slide',
      },
      animationDuration: {
        type: 'number',
        defaultValue: 300,
        min: 100,
        max: 1000,
        step: 50,
      },
    }
  };

  return (
    <PlaygroundTemplate
      component={(props) => (
        <Accordion
          type={props.type}
          collapsible={props.collapsible}
          variant={props.variant}
          size={props.size}
          iconPosition={props.iconPosition}
          hideIcon={props.hideIcon}
          animation={props.animation}
          animationDuration={props.animationDuration}
          defaultValue={['item-1']}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Qwik?</AccordionTrigger>
            <AccordionContent>
              Qwik is a new kind of web framework that can deliver instant loading 
              web applications at any size or complexity. It uses resumability to 
              serialize the application state, allowing instant startup without
              costly hydration.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2">
            <AccordionTrigger>How does Qwik differ from other frameworks?</AccordionTrigger>
            <AccordionContent>
              Unlike traditional frameworks that require downloading, parsing, and
              executing JavaScript before the app becomes interactive, Qwik can
              resume where the server left off. This results in instant-on
              applications with minimal JS payload.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3">
            <AccordionTrigger>What is the significance of the $ sign?</AccordionTrigger>
            <AccordionContent>
              The $ sign in Qwik marks lazy-loading boundaries. It tells Qwik
              that this piece of code should be loaded only when needed. This is how
              Qwik achieves fine-grained lazy loading of application code.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
      properties={properties.accordion}
      imports={`import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from '~/components/Core/DataDisplay/Accordion';`}
    >
      <p>
        Use this playground to experiment with the Accordion component's properties
        and see how different configurations affect its appearance and behavior.
        Adjust the controls to customize the accordion and view the corresponding code.
      </p>
    </PlaygroundTemplate>
  );
});
