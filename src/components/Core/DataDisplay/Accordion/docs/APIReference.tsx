import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates/APIReferenceTemplate';

export default component$(() => {
  return (
    <APIReferenceTemplate
      components={[
        {
          name: 'Accordion',
          description: 'The main container component for the accordion.',
          props: [
            { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Determines if one or multiple items can be opened simultaneously.' },
            { name: 'defaultValue', type: 'string[]', default: '[]', description: 'The values of the items that should be opened by default.' },
            { name: 'value', type: 'string[]', default: 'undefined', description: 'The controlled values of the opened items. Should be used with onChange$.' },
            { name: 'onChange$', type: 'QRL<(value: string[]) => void>', default: 'undefined', description: 'Callback fired when the open state changes.' },
            { name: 'collapsible', type: 'boolean', default: 'false', description: 'When type is "single", allows closing content by clicking the trigger of an open item.' },
            { name: 'variant', type: "'default' | 'bordered' | 'separated'", default: "'default'", description: 'Visual style variant of the accordion.' },
            { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size of the accordion affecting padding and text size.' },
            { name: 'iconPosition', type: "'start' | 'end'", default: "'end'", description: 'Position of the chevron icon in the trigger.' },
            { name: 'hideIcon', type: 'boolean', default: 'false', description: 'Whether to hide the chevron icon entirely.' },
            { name: 'animation', type: "'none' | 'slide' | 'fade' | 'scale'", default: "'slide'", description: 'Type of animation for opening/closing content.' },
            { name: 'animationDuration', type: 'number', default: '300', description: 'Duration of the animation in milliseconds.' },
          ]
        },
        {
          name: 'AccordionItem',
          description: 'Container for a single accordion item.',
          props: [
            { name: 'value', type: 'string', default: 'required', description: 'Unique identifier for the accordion item.', required: true },
            { name: 'disabled', type: 'boolean', default: 'false', description: 'Whether the accordion item is disabled.' }
          ]
        },
        {
          name: 'AccordionTrigger',
          description: 'The clickable header that toggles the accordion item.',
          props: [
            { name: 'children', type: 'ReactNode', default: 'required', description: 'The content of the trigger.', required: true },
            { name: 'icon', type: 'ReactNode', default: 'chevron', description: 'Custom icon to display instead of the default chevron.' }
          ]
        },
        {
          name: 'AccordionContent',
          description: 'The collapsible content panel.',
          props: [
            { name: 'children', type: 'ReactNode', default: 'required', description: 'The content to display when the accordion is expanded.', required: true }
          ]
        }
      ]}
      cssVariables={[
        { name: '--accordion-border-color', default: 'theme(colors.gray.200) dark:theme(colors.gray.700)', description: 'Border color for the accordion.' },
        { name: '--accordion-bg-color', default: 'transparent', description: 'Background color for the accordion.' },
        { name: '--accordion-trigger-padding', default: 'varies by size', description: 'Padding for the trigger element.' },
        { name: '--accordion-content-padding', default: 'varies by size', description: 'Padding for the content element.' },
        { name: '--accordion-animation-duration', default: '300ms', description: 'Duration of the animation effect.' }
      ]}
    >
      <p>
        The Accordion component is composed of four main parts that work together to create 
        collapsible content sections. Each part has a specific role in the accordion's functionality
        and can be customized with various props to meet different design requirements.
      </p>
    </APIReferenceTemplate>
  );
});
