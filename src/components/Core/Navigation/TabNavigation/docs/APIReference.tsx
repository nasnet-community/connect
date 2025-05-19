import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const tabNavigationProps = [
    {
      name: 'orientation',
      type: "'horizontal' | 'vertical'",
      defaultValue: 'horizontal',
      description: 'Direction in which tabs are arranged.'
    },
    {
      name: 'variant',
      type: "'default' | 'filled' | 'outlined' | 'subtle'",
      defaultValue: 'default',
      description: 'Visual style of the tab navigation.'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: 'md',
      description: 'Size of the tabs.'
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end' | 'stretch'",
      defaultValue: 'start',
      description: 'Horizontal alignment of the tabs.'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether tabs should take up the full width of the container.'
    },
    {
      name: 'isFitted',
      type: 'boolean',
      defaultValue: 'false',
      description: 'If true, tabs will be stretched to fill the available space.'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      defaultValue: 'Tab navigation',
      description: 'Accessible label for the tab list (used for aria-label).'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the tab navigation container.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the tab list element.'
    }
  ];

  const tabItemProps = [
    {
      name: 'label',
      type: 'string',
      description: 'Text label for the tab.',
      required: true
    },
    {
      name: 'icon',
      type: 'JSXChildren',
      description: 'Optional icon to display with the tab label.'
    },
    {
      name: 'isActive',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Indicates if this tab is currently selected.'
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the tab is disabled.'
    },
    {
      name: 'onClick$',
      type: '() => void',
      description: 'Event handler called when the tab is clicked.'
    },
    {
      name: 'count',
      type: 'number',
      description: 'Optional counter to display alongside the tab label.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the tab element.'
    },
    {
      name: 'controls',
      type: 'string',
      description: 'ID of the tab panel this tab controls (for accessibility).'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the tab.'
    }
  ];

  return (
    <APIReferenceTemplate props={tabNavigationProps}>
      <p>
        The TabNavigation component consists of a container component (TabNavigation) and 
        individual tab items (TabItem). Each component has its own set of props to control
        its appearance and behavior.
      </p>
      
      <h3 class="text-lg font-semibold mt-6 mb-2">TabItem Props</h3>
      <APIReferenceTemplate props={tabItemProps} />
    </APIReferenceTemplate>
  );
});
