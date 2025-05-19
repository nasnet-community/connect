import { component$ } from '@builder.io/qwik';
import { Breadcrumbs } from '../../Breadcrumbs';

export default component$(() => {
  const items = [
    { label: 'Home', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Current Page', isCurrent: true }
  ];

  return (
    <div class="space-y-8 p-4">
      <div>
        <h3 class="text-sm font-semibold mb-2">Default Separator ('/')</h3>
        <Breadcrumbs items={items} separator="/" />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Arrow Separator ('&gt;')</h3>
        <Breadcrumbs items={items} separator="&gt;" />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Dash Separator ('-')</h3>
        <Breadcrumbs items={items} separator="-" />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Bullet Separator ('•')</h3>
        <Breadcrumbs items={items} separator="•" />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Pipe Separator ('|')</h3>
        <Breadcrumbs items={items} separator="|" />
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Custom Separator</h3>
        <Breadcrumbs 
          items={items} 
          separator={<span class="text-blue-500 font-bold">&raquo;</span>} 
        />
      </div>
    </div>
  );
});
