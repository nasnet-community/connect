import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate, type PropertyControl } from '~/components/Docs/templates';
import { Alert } from '../';

/**
 * Alert component playground using the standard template
 */
export default component$(() => {
  // Define the AlertDemo component that will be controlled by the playground
  const AlertDemo = component$<{
    status: 'info' | 'success' | 'warning' | 'error';
    title: string;
    message: string;
    dismissible: boolean;
    icon: boolean;
    size: 'sm' | 'md' | 'lg';
    variant: 'solid' | 'outline';
    subtle: boolean;
    loading: boolean;
  }>((props) => {
    return (
      <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <Alert
          status={props.status}
          title={props.title || undefined}
          message={props.message || undefined}
          dismissible={props.dismissible}
          icon={props.icon}
          size={props.size}
          variant={props.variant}
          subtle={props.subtle}
          loading={props.loading}
        />
      </div>
    );
  });

  // Define the controls for the playground
  const properties: PropertyControl[] = [
    {
      type: 'select',
      name: 'status',
      label: 'Status',
      options: [
        { label: 'Info', value: 'info' },
        { label: 'Success', value: 'success' },
        { label: 'Warning', value: 'warning' },
        { label: 'Error', value: 'error' }
      ],
      defaultValue: 'info'
    },
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      defaultValue: 'Alert Title'
    },
    {
      type: 'text',
      name: 'message',
      label: 'Message',
      defaultValue: 'This is an alert message providing additional information.'
    },
    {
      type: 'boolean',
      name: 'dismissible',
      label: 'Dismissible',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'icon',
      label: 'Show Icon',
      defaultValue: true
    },
    {
      type: 'select',
      name: 'size',
      label: 'Size',
      options: [
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' }
      ],
      defaultValue: 'md'
    },
    {
      type: 'select',
      name: 'variant',
      label: 'Variant',
      options: [
        { label: 'Solid', value: 'solid' },
        { label: 'Outline', value: 'outline' }
      ],
      defaultValue: 'solid'
    },
    {
      type: 'boolean',
      name: 'subtle',
      label: 'Subtle',
      defaultValue: false
    },
    {
      type: 'boolean',
      name: 'loading',
      label: 'Loading',
      defaultValue: false
    }
  ];

  return (
    <PlaygroundTemplate
      component={AlertDemo}
      properties={properties}
    />
  );
}); 