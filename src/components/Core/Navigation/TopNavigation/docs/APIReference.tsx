import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const topNavigationProps = [
    {
      name: 'variant',
      type: "'default' | 'filled' | 'bordered'",
      defaultValue: 'default',
      description: 'Visual style of the navigation bar.'
    },
    {
      name: 'position',
      type: "'static' | 'fixed' | 'sticky'",
      defaultValue: 'static',
      description: 'Position styling of the navigation bar.'
    },
    {
      name: 'responsive',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the navigation should adapt to different screen sizes.'
    },
    {
      name: 'containerWidth',
      type: "'full' | 'contained'",
      defaultValue: 'contained',
      description: 'Controls whether the navigation spans the full width or is contained.'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      defaultValue: 'Main navigation',
      description: 'Accessible label for the navigation (used for aria-label).'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the navigation container.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the navigation element.'
    }
  ];

  const topNavItemProps = [
    {
      name: 'label',
      type: 'string',
      description: 'Text label for the navigation item.',
      required: true
    },
    {
      name: 'href',
      type: 'string',
      description: 'URL that the navigation item links to.',
      required: true
    },
    {
      name: 'icon',
      type: 'JSXChildren',
      description: 'Optional icon to display with the navigation item label.'
    },
    {
      name: 'isActive',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Indicates if this item is currently active.'
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the navigation item is disabled.'
    },
    {
      name: 'onClick$',
      type: '() => void',
      description: 'Event handler called when the navigation item is clicked.'
    },
    {
      name: 'ariaDescription',
      type: 'string',
      description: 'Additional accessible description (used for aria-description).'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the navigation item.'
    }
  ];

  const topNavDropdownProps = [
    {
      name: 'label',
      type: 'string',
      description: 'Text label for the dropdown trigger.',
      required: true
    },
    {
      name: 'isOpen',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Controls whether the dropdown is open.'
    },
    {
      name: 'icon',
      type: 'JSXChildren',
      description: 'Optional icon to display with the dropdown label.'
    },
    {
      name: 'isActive',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Indicates if this dropdown is currently active.'
    },
    {
      name: 'isDisabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the dropdown is disabled.'
    },
    {
      name: 'onClick$',
      type: '() => void',
      description: 'Event handler called when the dropdown trigger is clicked.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the dropdown element.'
    },
    {
      name: 'ariaControls',
      type: 'string',
      description: 'ID of the element controlled by the dropdown (for accessibility).'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the dropdown container.'
    }
  ];

  const topNavToggleProps = [
    {
      name: 'isOpen',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Controls the toggle state (open/closed).',
      required: true
    },
    {
      name: 'onClick$',
      type: '() => void',
      description: 'Event handler called when the toggle is clicked.',
      required: true
    },
    {
      name: 'openIcon',
      type: 'JSXChildren',
      description: 'Icon to display when the menu is closed (e.g., hamburger icon).'
    },
    {
      name: 'closeIcon',
      type: 'JSXChildren',
      description: 'Icon to display when the menu is open (e.g., close icon).'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      defaultValue: 'Toggle navigation',
      description: 'Accessible label for the toggle button (used for aria-label).'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the toggle button.'
    }
  ];

  return (
    <APIReferenceTemplate props={topNavigationProps}>
      <p>
        The TopNavigation component consists of a container component (TopNavigation) and 
        several subcomponents: TopNavItem, TopNavDropdown, TopNavDropdownItem, and TopNavToggle.
        Each component has its own set of props to control its appearance and behavior.
      </p>
      
      <h3 class="text-lg font-semibold mt-6 mb-2">TopNavItem Props</h3>
      <APIReferenceTemplate props={topNavItemProps} />

      <h3 class="text-lg font-semibold mt-6 mb-2">TopNavDropdown Props</h3>
      <APIReferenceTemplate props={topNavDropdownProps} />

      <h3 class="text-lg font-semibold mt-6 mb-2">TopNavToggle Props</h3>
      <APIReferenceTemplate props={topNavToggleProps} />
    </APIReferenceTemplate>
  );
});
