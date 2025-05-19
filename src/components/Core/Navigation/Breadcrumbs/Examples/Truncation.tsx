import { component$ } from '@builder.io/qwik';
import { Breadcrumbs } from '../../Breadcrumbs';

export default component$(() => {
  const items = [
    { label: 'Home', href: '#' },
    { label: 'Category', href: '#' },
    { label: 'Subcategory', href: '#' },
    { label: 'Product Type', href: '#' },
    { label: 'Collection', href: '#' }, 
    { label: 'Item', isCurrent: true }
  ];

  return (
    <div class="space-y-8 p-4">
      <div>
        <h3 class="text-sm font-semibold mb-2">Default Truncation (maxItems=3)</h3>
        <Breadcrumbs items={items} maxItems={3} />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Truncation (maxItems=4)</h3>
        <Breadcrumbs items={items} maxItems={4} />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">No Truncation</h3>
        <Breadcrumbs items={items} maxItems={items.length} />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Custom Expander Label</h3>
        <Breadcrumbs items={items} maxItems={3} expanderLabel="[More]" />
      </div>
    </div>
  );
});
