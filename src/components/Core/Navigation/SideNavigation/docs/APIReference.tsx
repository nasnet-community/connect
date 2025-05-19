import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const sideNavigationProps = [
    {
      name: 'isOpen',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Controls visibility of the side navigation on mobile. Has no effect on desktop where the sidebar is always visible.'
    },
    {
      name: 'onClose$',
      type: '() => void',
      description: 'Event handler called when the navigation is closed on mobile.'
    },
    {
      name: 'width',
      type: 'string',
      defaultValue: '250px',
      description: 'Width of the side navigation on desktop.'
    },
    {
      name: 'position',
      type: "'left' | 'right'",
      defaultValue: 'left',
      description: 'Position of the side navigation.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the side navigation container.'
    },
    {
      name: 'mobileClass',
      type: 'string',
      description: 'Additional CSS classes to apply specifically for mobile view.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the side navigation element.'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      defaultValue: 'Navigation',
      description: 'Accessible label for the navigation (used for aria-label).'
    }
  ];

  const sideNavigationItemProps = [
    {
      name: 'label',
      type: 'string',
      description: 'Text label for the navigation item.',
      required: true
    },
    {
      name: 'href',
      type: 'string',
      description: 'URL the item links to. If not provided, the item will not be a link (useful for expandable sections).'
    },
    {
      name: 'isActive',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Indicates if the item represents the current page or section.'
    },
    {
      name: 'icon',
      type: 'JSXChildren',
      description: 'Optional icon to display before the item text.'
    },
    {
      name: 'expandable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the item can expand to show nested items.'
    },
    {
      name: 'expanded',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Controls whether an expandable item is currently expanded.'
    },
    {
      name: 'indent',
      type: 'number',
      defaultValue: '0',
      description: 'Indentation level for nested items (typically used for child items).'
    },
    {
      name: 'onClick$',
      type: '() => void',
      description: 'Event handler called when the item is clicked.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the navigation item.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the navigation item.'
    }
  ];

  const sideNavigationHeaderProps = [
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the header.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the header element.'
    }
  ];

  const sideNavigationBackdropProps = [
    {
      name: 'isOpen',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Controls visibility of the backdrop.',
      required: true
    },
    {
      name: 'onClick$',
      type: '() => void',
      description: 'Event handler called when the backdrop is clicked.',
      required: true
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the backdrop.'
    }
  ];

  return (
    <APIReferenceTemplate props={sideNavigationProps}>
      <p>
        The SideNavigation component consists of multiple subcomponents that work together to create
        a complete sidebar navigation system. Each component has its own set of props to control its
        appearance and behavior.
      </p>
      
      <h3 class="text-lg font-semibold mt-6 mb-2">SideNavigationItem Props</h3>
      <APIReferenceTemplate props={sideNavigationItemProps} />
      
      <h3 class="text-lg font-semibold mt-6 mb-2">SideNavigationHeader Props</h3>
      <APIReferenceTemplate props={sideNavigationHeaderProps} />
      
      <h3 class="text-lg font-semibold mt-6 mb-2">SideNavigationBackdrop Props</h3>
      <APIReferenceTemplate props={sideNavigationBackdropProps} />
    </APIReferenceTemplate>
  );
});
