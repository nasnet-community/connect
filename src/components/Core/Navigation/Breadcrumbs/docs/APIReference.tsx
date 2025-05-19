import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const props = [
    {
      name: 'items',
      type: 'BreadcrumbItem[]',
      description: 'Array of breadcrumb items to display in the navigation.',
      required: true
    },
    {
      name: 'separator',
      type: 'BreadcrumbSeparator | JSXChildren',
      defaultValue: '/',
      description: 'Specifies the separator between breadcrumb items. Can be a predefined separator (/, >, -, •, |) or custom JSX content.'
    },
    {
      name: 'maxItems',
      type: 'number',
      defaultValue: '3',
      description: 'Maximum number of items to display before truncating. Middle items will be replaced with an expander.'
    },
    {
      name: 'expanderLabel',
      type: 'string',
      defaultValue: '...',
      description: 'The label to show for the truncated items expander.'
    },
    {
      name: 'label',
      type: 'string',
      defaultValue: 'Breadcrumb',
      description: 'Accessible label for the breadcrumb navigation (used for aria-label).'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the breadcrumbs container.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the breadcrumbs element.'
    }
  ];

  // BreadcrumbItem interface details
  const breadcrumbItemProps = [
    {
      name: 'label',
      type: 'string',
      required: true,
      description: 'The text to display for the breadcrumb item.'
    },
    {
      name: 'href',
      type: 'string',
      description: 'The URL the breadcrumb item links to. If not provided, the item will not be a link.'
    },
    {
      name: 'icon',
      type: 'JSXChildren',
      description: 'Optional icon to display before the breadcrumb text.'
    },
    {
      name: 'isCurrent',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether this item represents the current page. Adds aria-current="page" for accessibility.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'Optional ID for the breadcrumb item.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to this specific breadcrumb item.'
    }
  ];

  return (
    <APIReferenceTemplate props={props}>
      <p>
        The Breadcrumbs component provides a navigation trail showing the hierarchical path to the current page.
        Below is the complete API reference for the component and its related types.
      </p>

      <h3 class="text-lg font-semibold mt-6 mb-2">BreadcrumbItem Interface</h3>
      <p class="mb-4">
        The configuration object for each breadcrumb item in the navigation trail.
      </p>

      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-6 overflow-auto">
        <pre class="text-xs sm:text-sm font-mono">
          {`interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: JSXChildren;
  isCurrent?: boolean;
  id?: string;
  class?: string;
}`}
        </pre>
      </div>

      <table class="min-w-full text-xs sm:text-sm mb-6">
        <thead class="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th class="p-2 text-left font-semibold">Property</th>
            <th class="p-2 text-left font-semibold">Type</th>
            <th class="p-2 text-left font-semibold">Required</th>
            <th class="p-2 text-left font-semibold">Default</th>
            <th class="p-2 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
          {breadcrumbItemProps.map((prop, i) => (
            <tr key={i} class="bg-white dark:bg-gray-900">
              <td class="p-2 font-mono text-primary-600">{prop.name}</td>
              <td class="p-2 font-mono">{prop.type}</td>
              <td class="p-2">{prop.required ? 'Yes' : 'No'}</td>
              <td class="p-2">{prop.defaultValue || '-'}</td>
              <td class="p-2">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 class="text-lg font-semibold mt-6 mb-2">BreadcrumbSeparator Type</h3>
      <p class="mb-4">
        Predefined separator options for the breadcrumb items.
      </p>

      <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-md mb-6 overflow-auto">
        <pre class="text-xs sm:text-sm font-mono">
          {`type BreadcrumbSeparator = '/' | '>' | '-' | '•' | '|';`}
        </pre>
      </div>
    </APIReferenceTemplate>
  );
});
