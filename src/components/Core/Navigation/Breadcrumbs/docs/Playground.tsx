import { component$ } from '@builder.io/qwik';
import { PlaygroundTemplate } from '~/components/Docs/templates';
import { Breadcrumbs } from '../Breadcrumbs';

export default component$(() => {
  const properties = [
    {
      type: 'select',
      name: 'separator',
      label: 'Separator',
      defaultValue: '/',
      options: [
        { label: 'Slash (/)', value: '/' },
        { label: 'Arrow (>)', value: '>' },
        { label: 'Dash (-)', value: '-' },
        { label: 'Bullet (•)', value: '•' },
        { label: 'Pipe (|)', value: '|' },
      ]
    },
    {
      type: 'number',
      name: 'maxItems',
      label: 'Max Items',
      defaultValue: 3,
      min: 2,
      max: 10
    },
    {
      type: 'text',
      name: 'expanderLabel',
      label: 'Expander Label',
      defaultValue: '...'
    },
    {
      type: 'boolean',
      name: 'useIcons',
      label: 'Show Icons',
      defaultValue: false
    }
  ];

  return (
    <PlaygroundTemplate
      component={(props: any) => {
        const useIcons = props.useIcons || false;
        
        const items = [
          { 
            label: 'Home', 
            href: '#',
            icon: useIcons ? <i class="fas fa-home" /> : undefined
          },
          { 
            label: 'Products', 
            href: '#',
            icon: useIcons ? <i class="fas fa-box" /> : undefined
          },
          { 
            label: 'Electronics', 
            href: '#',
            icon: useIcons ? <i class="fas fa-laptop" /> : undefined
          },
          { 
            label: 'Cameras', 
            href: '#',
            icon: useIcons ? <i class="fas fa-camera" /> : undefined
          },
          { 
            label: 'DSLR', 
            isCurrent: true,
            icon: useIcons ? <i class="fas fa-camera-retro" /> : undefined
          }
        ];

        return (
          <div class="p-4 bg-white dark:bg-gray-800 rounded-md">
            <Breadcrumbs
              items={items}
              separator={props.separator || '/'}
              maxItems={props.maxItems || 3}
              expanderLabel={props.expanderLabel || '...'}
            />
          </div>
        );
      }}
      properties={properties}
    />
  );
});
