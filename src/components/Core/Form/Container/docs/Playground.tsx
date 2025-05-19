import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates';
import { Container } from '../';

/**
 * Container component playground using the standard template
 */
export default component$(() => {
  // Define the ContainerDemo component that will be controlled by the playground
  const ContainerDemo = component$<{
    title: string;
    description: string;
    bordered: boolean;
    showFooter: boolean;
  }>((props) => {
    return (
      <Container
        title={props.title || undefined}
        description={props.description || undefined}
        bordered={props.bordered}
        class="max-w-lg"
      >
        <div class="grid gap-4">
          <div>
            <label class="block text-sm font-medium mb-1" for="name-demo">Name</label>
            <input
              type="text"
              id="name-demo"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1" for="email-demo">Email</label>
            <input
              type="email"
              id="email-demo"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
              placeholder="Enter your email"
            />
          </div>
        </div>
        
        {props.showFooter && (
          <div q:slot="footer" class="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
            <button class="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md">
              Cancel
            </button>
            <button class="px-3 py-1.5 bg-primary-600 text-white rounded-md">
              Submit
            </button>
          </div>
        )}
      </Container>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      defaultValue: 'Contact Information'
    },
    {
      type: 'text',
      name: 'description',
      label: 'Description',
      defaultValue: 'Please provide your contact details below.'
    },
    {
      type: 'boolean',
      name: 'bordered',
      label: 'Bordered',
      defaultValue: true
    },
    {
      type: 'boolean',
      name: 'showFooter',
      label: 'Show Footer',
      defaultValue: true
    }
  ];

  return (
    <PlaygroundTemplate
      component={ContainerDemo}
      properties={properties}
    />
  );
}); 