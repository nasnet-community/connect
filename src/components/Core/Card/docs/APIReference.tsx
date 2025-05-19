import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates/APIReferenceTemplate';
import type { PropDetail } from '~/components/Docs/templates/APIReferenceTemplate';

export default component$(() => {
  const props: PropDetail[] = [
    {
      name: 'variant',
      type: "'default' | 'bordered' | 'elevated'",
      defaultValue: "'default'",
      description: 'Determines the visual style of the card.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the card container.'
    },
    {
      name: 'hasHeader',
      type: 'boolean',
      defaultValue: 'false',
      description: "When true, creates a header section at the top of the card that will receive content from the 'header' slot."
    },
    {
      name: 'hasFooter',
      type: 'boolean',
      defaultValue: 'false',
      description: "When true, creates a footer section at the bottom of the card that will receive content from the 'footer' slot."
    },
    {
      name: 'hasActions',
      type: 'boolean',
      defaultValue: 'false',
      description: "When true, creates an action buttons container in the footer section that will receive content from the 'actions' slot. Requires hasFooter to be true as well."
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description: 'When true, displays a loading spinner overlay on top of the card content.'
    },
    {
      name: 'noPadding',
      type: 'boolean',
      defaultValue: 'false',
      description: 'When true, removes the default padding from the card body. Useful for cards with media content or custom internal layouts.'
    }
  ];
  
  const cssVariables = [];
  
  const dataAttributes = [
    {
      name: 'data-loading',
      description: 'Present when the card is in loading state.'
    }
  ];

  return (
    <APIReferenceTemplate
      props={props}
      cssVariables={cssVariables}
      dataAttributes={dataAttributes}
    >
      <div>
        <h3 class="text-lg font-semibold mb-3">Slots</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th class="py-2 px-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="py-2 px-4 text-sm text-gray-700 dark:text-gray-300 font-mono">default</td>
                <td class="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">The main content area of the card.</td>
              </tr>
              <tr>
                <td class="py-2 px-4 text-sm text-gray-700 dark:text-gray-300 font-mono">header</td>
                <td class="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">Content to be rendered in the card header section. Only visible when hasHeader is true.</td>
              </tr>
              <tr>
                <td class="py-2 px-4 text-sm text-gray-700 dark:text-gray-300 font-mono">footer</td>
                <td class="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">Content to be rendered in the card footer section. Only visible when hasFooter is true.</td>
              </tr>
              <tr>
                <td class="py-2 px-4 text-sm text-gray-700 dark:text-gray-300 font-mono">actions</td>
                <td class="py-2 px-4 text-sm text-gray-700 dark:text-gray-300">Interactive elements like buttons to be placed in the footer's action area. Only visible when both hasFooter and hasActions are true.</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3 class="text-lg font-semibold mb-3 mt-8">Accessibility</h3>
        <ul class="list-disc list-inside space-y-2">
          <li>The Card component uses a semantic div container by default.</li>
          <li>While cards are primarily visual containers, ensure that interactive elements within the card (such as buttons or links) have appropriate accessibility attributes.</li>
          <li>When using cards in a collection or grid, consider adding appropriate ARIA attributes to improve screen reader navigation.</li>
          <li>For interactive cards that serve as clickable entities, consider using appropriate keyboard focus management and ARIA roles.</li>
        </ul>
      </div>
    </APIReferenceTemplate>
  );
});
