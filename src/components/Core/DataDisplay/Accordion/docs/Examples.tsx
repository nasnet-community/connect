import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates/ExamplesTemplate';
import BasicAccordion from '../Examples/BasicAccordion';
import AccordionVariants from '../Examples/AccordionVariants';
import AccordionBehavior from '../Examples/AccordionBehavior';

export default component$(() => {
  return (
    <ExamplesTemplate
      examples={[
        {
          title: 'Basic Usage',
          description: 'A simple accordion with default settings. Items expand one at a time.',
          component: <BasicAccordion />
        },
        {
          title: 'Visual Variants',
          description: 'Accordions can be styled in different ways: default, bordered, and separated.',
          component: <AccordionVariants />
        },
        {
          title: 'Expansion Behavior',
          description: 'Control how accordions expand with single, multiple, or collapsible modes.',
          component: <AccordionBehavior />
        }
      ]}
    >
      <p>
        The Accordion component can be customized in various ways to suit different use cases.
        Below are examples showcasing different configurations and features.
      </p>
    </ExamplesTemplate>
  );
});
