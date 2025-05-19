import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates/APIReferenceTemplate';

export default component$(() => {
  const badgeProps = [
    {
      name: 'variant',
      type: "'solid' | 'soft' | 'outline'",
      default: "'solid'",
      description: 'Visual style variant of the badge'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Size of the badge'
    },
    {
      name: 'color',
      type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
      default: "'default'",
      description: 'Color theme of the badge'
    },
    {
      name: 'shape',
      type: "'square' | 'rounded' | 'pill'",
      default: "'rounded'",
      description: 'Shape of the badge'
    },
    {
      name: 'dismissible',
      type: 'boolean',
      default: 'false',
      description: 'Whether the badge can be dismissed with an X button'
    },
    {
      name: 'onDismiss$',
      type: 'QRL<() => void>',
      default: 'undefined',
      description: 'Callback function called when the dismiss button is clicked'
    },
    {
      name: 'dot',
      type: 'boolean',
      default: 'false',
      description: 'Shows a colored dot indicator'
    },
    {
      name: 'dotPosition',
      type: "'start' | 'end'",
      default: "'start'",
      description: 'Position of the dot indicator'
    },
    {
      name: 'bordered',
      type: 'boolean',
      default: 'false',
      description: 'Adds a border to the badge'
    },
    {
      name: 'maxWidth',
      type: 'string',
      default: 'undefined',
      description: 'Maximum width of the badge'
    },
    {
      name: 'truncate',
      type: 'boolean',
      default: 'false',
      description: 'Whether to truncate the text with an ellipsis if it exceeds the width'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes'
    },
    {
      name: 'id',
      type: 'string',
      default: 'undefined',
      description: 'ID attribute for the badge'
    },
    {
      name: 'role',
      type: 'string',
      default: "'status'",
      description: 'ARIA role for the badge'
    },
    {
      name: 'hover',
      type: 'boolean',
      default: 'false',
      description: 'Enables hover effect on the badge'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Disables the badge'
    },
    {
      name: 'href',
      type: 'string',
      default: 'undefined',
      description: 'Makes the badge a link (renders as an anchor)'
    },
    {
      name: 'target',
      type: 'string',
      default: "'_self'",
      description: 'Target attribute for the link when href is provided'
    },
    {
      name: 'startIcon',
      type: 'JSXChildren',
      default: 'undefined',
      description: 'Icon or element to display at the start of the badge'
    },
    {
      name: 'endIcon',
      type: 'JSXChildren',
      default: 'undefined',
      description: 'Icon or element to display at the end of the badge'
    },
    {
      name: 'tooltip',
      type: 'string',
      default: 'undefined',
      description: 'Tooltip text to display on hover (uses the title attribute)'
    }
  ];

  const badgeGroupProps = [
    {
      name: 'spacing',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: 'Space between badges in the group'
    },
    {
      name: 'maxVisible',
      type: 'number',
      default: 'undefined',
      description: 'Maximum number of badges to display'
    },
    {
      name: 'wrap',
      type: 'boolean',
      default: 'true',
      description: 'Whether badges should wrap to multiple lines'
    },
    {
      name: 'align',
      type: "'start' | 'center' | 'end'",
      default: "'start'",
      description: 'Horizontal alignment of badges in the group'
    },
    {
      name: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes'
    }
  ];

  const components = [
    {
      name: 'Badge',
      description: 'The primary component for displaying short pieces of information',
      props: badgeProps
    },
    {
      name: 'BadgeGroup',
      description: 'Component for grouping multiple badges with consistent spacing and alignment',
      props: badgeGroupProps
    }
  ];

  const typeDefinitions = [
    {
      name: 'BadgeVariant',
      type: "'solid' | 'soft' | 'outline'"
    },
    {
      name: 'BadgeSize',
      type: "'sm' | 'md' | 'lg'"
    },
    {
      name: 'BadgeColor',
      type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'"
    },
    {
      name: 'BadgeShape',
      type: "'square' | 'rounded' | 'pill'"
    }
  ];

  return (
    <APIReferenceTemplate
      components={components}
      typeDefinitions={typeDefinitions}
    />
  );
});
