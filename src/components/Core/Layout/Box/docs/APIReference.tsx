import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const boxProps = [
    {
      name: 'as',
      type: 'keyof QwikIntrinsicElements',
      defaultValue: 'div',
      description: 'HTML element to render the Box as.'
    },
    {
      name: 'padding',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | object",
      defaultValue: 'none',
      description: 'Padding to apply to the Box. Can be a string for uniform padding, or an object with top, right, bottom, left, x, y, or all properties.'
    },
    {
      name: 'margin',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | object",
      defaultValue: 'none',
      description: 'Margin to apply to the Box. Can be a string for uniform margin, or an object with top, right, bottom, left, x, y, or all properties.'
    },
    {
      name: 'borderRadius',
      type: "'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'",
      defaultValue: 'none',
      description: 'Border radius to apply to the Box.'
    },
    {
      name: 'borderWidth',
      type: "'none' | 'thin' | 'normal' | 'thick'",
      defaultValue: 'none',
      description: 'Border width to apply to the Box.'
    },
    {
      name: 'borderStyle',
      type: "'solid' | 'dashed' | 'dotted' | 'double' | 'none'",
      defaultValue: 'solid',
      description: 'Border style to apply to the Box.'
    },
    {
      name: 'borderColor',
      type: "'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted'",
      defaultValue: 'default',
      description: 'Border color to apply to the Box.'
    },
    {
      name: 'backgroundColor',
      type: "'transparent' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'muted' | 'surface' | 'surface-alt'",
      defaultValue: 'transparent',
      description: 'Background color to apply to the Box.'
    },
    {
      name: 'shadow',
      type: "'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'inner'",
      defaultValue: 'none',
      description: 'Box shadow to apply to the Box.'
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the Box should take up the full width of its container.'
    },
    {
      name: 'fullHeight',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the Box should take up the full height of its container.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the Box.'
    },
    {
      name: 'role',
      type: 'string',
      description: 'ARIA role for the Box.'
    },
    {
      name: 'aria-label',
      type: 'string',
      description: 'Accessible label for the Box.'
    },
    {
      name: 'aria-labelledby',
      type: 'string',
      description: 'ID of an element that labels the Box.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      description: 'ID of an element that describes the Box.'
    }
  ];

  return (
    <APIReferenceTemplate props={boxProps}>
      <p>
        The Box component is the most basic layout component in the Connect design system.
        It provides a way to apply consistent spacing, backgrounds, borders, and more using
        theme-aware props.
      </p>

      <h3 class="text-lg font-semibold mt-6 mb-2">Component API</h3>
      <p class="mb-4">
        The Box component accepts all standard HTML attributes for div elements in addition to
        the props listed below.
      </p>

      <h3 class="text-lg font-semibold mt-6 mb-2">Component Composition</h3>
      <p class="mb-4">
        Box is a versatile component that can be composed in various ways:
      </p>
      
      <ul class="list-disc list-inside ml-4 mb-4">
        <li>Use as a container for other components</li>
        <li>Combine with other layout components (Grid, Flex, etc.) to create complex layouts</li>
        <li>Use the 'as' prop to change the HTML element type</li>
      </ul>

      <h3 class="text-lg font-semibold mt-6 mb-2">Accessibility</h3>
      <p class="mb-4">
        Box supports ARIA attributes to ensure proper accessibility:
      </p>
      
      <ul class="list-disc list-inside ml-4 mb-4">
        <li>Use <code>role</code> to define the ARIA role when changing the semantic element</li>
        <li>Use <code>aria-label</code> to provide an accessible name</li>
        <li>Use <code>aria-labelledby</code> to reference an element that labels the box</li>
        <li>Use <code>aria-describedby</code> to reference an element that describes the box</li>
      </ul>
    </APIReferenceTemplate>
  );
});
