import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const toggleProps = [
    {
      name: 'checked',
      type: 'boolean',
      description: 'Whether the toggle is checked/on.'
    },
    {
      name: 'onChange$',
      type: 'QRL<(checked: boolean) => void>',
      description: 'Callback function fired when the toggle state changes.'
    },
    {
      name: 'label',
      type: 'string',
      description: 'Text label for the toggle.'
    },
    {
      name: 'labelPosition',
      type: "'left' | 'right'",
      defaultValue: 'right',
      description: 'Where to position the label relative to the toggle.'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: 'md',
      description: 'Size of the toggle.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      defaultValue: 'false',
      description: 'When true, disables the toggle and prevents user interaction.'
    },
    {
      name: 'name',
      type: 'string',
      description: 'Name attribute for the underlying input element, useful in forms.'
    },
    {
      name: 'value',
      type: 'string',
      description: 'Value attribute for the underlying input element.'
    },
    {
      name: 'required',
      type: 'boolean',
      defaultValue: 'false',
      description: 'When true, marks the toggle as required and displays a required indicator.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the toggle container.'
    },
    {
      name: 'id',
      type: 'string',
      defaultValue: 'auto-generated',
      description: 'ID for the underlying input element. If not provided, an ID is auto-generated.'
    },
    {
      name: 'aria-label',
      type: 'string',
      description: 'Accessible label for the toggle when no visible label is provided.'
    },
    {
      name: 'aria-describedby',
      type: 'string',
      description: 'ID of an element that describes the toggle for accessibility.'
    }
  ];

  return (
    <APIReferenceTemplate props={toggleProps}>
      <p>
        The Toggle component provides a switch-like interface for toggling between two states.
        It's built on top of a native checkbox input for accessibility and form compatibility.
      </p>

      <h3 class="text-lg font-semibold mt-6 mb-2">Accessibility</h3>
      <p class="mb-4">
        The Toggle component follows accessibility best practices:
      </p>
      
      <ul class="list-disc list-inside ml-4 mb-4">
        <li>Uses a native checkbox input for complete keyboard and screen reader support</li>
        <li>Supports proper labeling via the <code>label</code> prop or <code>aria-label</code></li>
        <li>Includes proper disabled states with visual and semantic indicators</li>
        <li>Provides additional context with <code>aria-describedby</code> when needed</li>
        <li>Ensures sufficient contrast between states for visibility</li>
        <li>Includes visible focus states for keyboard navigation</li>
      </ul>

      <h3 class="text-lg font-semibold mt-6 mb-2">Form Integration</h3>
      <p class="mb-4">
        The Toggle component is designed to work seamlessly within forms:
      </p>
      
      <ul class="list-disc list-inside ml-4 mb-4">
        <li>It uses a native checkbox input that submits with forms</li>
        <li>Supports <code>name</code> and <code>value</code> attributes for form submissions</li>
        <li>Respects the <code>required</code> attribute and displays appropriate indicators</li>
        <li>Can be controlled via the <code>checked</code> and <code>onChange$</code> props</li>
      </ul>
      
      <h3 class="text-lg font-semibold mt-6 mb-2">Styling</h3>
      <p class="mb-2">
        The Toggle component uses a consistent design that integrates with the Connect design system:
      </p>
      
      <ul class="list-disc list-inside ml-4">
        <li>Automatically adapts to light and dark color modes</li>
        <li>Uses primary colors to indicate the active state</li>
        <li>Includes smooth transitions between states</li>
        <li>Provides clear visual differentiation between on and off states</li>
        <li>Can be customized with additional classes via the <code>class</code> prop</li>
      </ul>
    </APIReferenceTemplate>
  );
});
