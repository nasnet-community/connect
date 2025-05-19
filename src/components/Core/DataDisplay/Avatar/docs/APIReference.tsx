import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates/APIReferenceTemplate';

export default component$(() => {
  const avatarProps = [
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      default: "'md'",
      description: 'Controls the size of the avatar'
    },
    {
      name: 'shape',
      type: "'circle' | 'square' | 'rounded'",
      default: "'circle'",
      description: 'Defines the shape of the avatar'
    },
    {
      name: 'variant',
      type: "'image' | 'initials' | 'icon'",
      default: 'Determined by children',
      description: 'The visual style variant of the avatar'
    },
    {
      name: 'src',
      type: 'string',
      default: 'undefined',
      description: 'URL for avatar image when using an image avatar'
    },
    {
      name: 'alt',
      type: 'string',
      default: "'Avatar'",
      description: 'Alternative text for the avatar for accessibility'
    },
    {
      name: 'initials',
      type: 'string',
      default: 'undefined',
      description: 'Text to display when using an initials avatar'
    },
    {
      name: 'icon',
      type: 'JSXChildren',
      default: 'undefined',
      description: 'Icon element to display when using an icon avatar'
    },
    {
      name: 'color',
      type: "'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'gray'",
      default: "'primary'",
      description: 'Background color for initials or icon avatar'
    },
    {
      name: 'status',
      type: "'online' | 'offline' | 'away' | 'busy' | 'none'",
      default: 'undefined',
      description: "Displays a status indicator with the avatar"
    },
    {
      name: 'statusPosition',
      type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
      default: "'bottom-right'",
      description: 'Position of the status indicator'
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'false',
      description: 'Adds a border around the avatar'
    },
    {
      name: 'borderColor',
      type: 'string',
      default: 'undefined',
      description: 'Custom border color class'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Shows a loading state'
    },
    {
      name: 'clickable',
      type: 'boolean',
      default: 'false',
      description: 'Makes the avatar clickable (renders as a button)'
    },
    {
      name: 'onClick$',
      type: 'QRL<(event: MouseEvent) => void>',
      default: 'undefined',
      description: 'Click handler for clickable avatars'
    },
    {
      name: 'href',
      type: 'string',
      default: 'undefined',
      description: 'Makes the avatar a link (renders as an anchor)'
    },
    {
      name: 'target',
      type: 'string',
      default: "'_self'",
      description: 'Target attribute for the link when href is provided'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes to apply'
    },
    {
      name: 'id',
      type: 'string',
      default: 'undefined',
      description: 'ID attribute for the avatar element'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      default: 'value of alt prop',
      description: 'Accessible label for the avatar'
    }
  ];

  const avatarGroupProps = [
    {
      name: 'max',
      type: 'number',
      default: '5',
      description: 'Maximum number of avatars to display before showing +X'
    },
    {
      name: 'size',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
      default: "'md'",
      description: 'Size of all avatars in the group'
    },
    {
      name: 'shape',
      type: "'circle' | 'square' | 'rounded'",
      default: "'circle'",
      description: 'Shape of all avatars in the group'
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'true',
      description: 'Whether avatars in the group should have borders'
    },
    {
      name: 'spacing',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Space between the avatars in the group'
    },
    {
      name: 'total',
      type: 'number',
      default: 'undefined',
      description: 'Total number of avatars (to calculate remaining count)'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes to apply'
    }
  ];

  const components = [
    {
      name: 'Avatar',
      description: 'The primary component for user representation',
      props: avatarProps
    },
    {
      name: 'AvatarGroup',
      description: 'Component for displaying multiple avatars as a stack',
      props: avatarGroupProps
    }
  ];

  const typeDefinitions = [
    {
      name: 'AvatarSize',
      type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'"
    },
    {
      name: 'AvatarShape',
      type: "'circle' | 'square' | 'rounded'"
    },
    {
      name: 'AvatarStatus',
      type: "'online' | 'offline' | 'away' | 'busy' | 'none'"
    },
    {
      name: 'AvatarVariant',
      type: "'image' | 'initials' | 'icon'"
    },
    {
      name: 'AvatarStatusPosition',
      type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'"
    }
  ];

  return (
    <APIReferenceTemplate
      components={components}
      typeDefinitions={typeDefinitions}
    />
  );
});
