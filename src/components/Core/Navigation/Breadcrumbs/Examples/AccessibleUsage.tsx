import { component$ } from '@builder.io/qwik';
import { Breadcrumbs } from '../../Breadcrumbs';

export default component$(() => {
  const items = [
    { label: 'Home', href: '#' },
    { label: 'Settings', href: '#' },
    { label: 'Account', isCurrent: true }
  ];

  return (
    <div class="space-y-4 p-4">
      {/* Accessible Breadcrumbs */}
      <div>
        <Breadcrumbs 
          items={items}
          label="Navigation path"
          id="accessible-breadcrumb"
        />
        <p class="text-sm mt-2 text-gray-600">
          This breadcrumb uses proper ARIA attributes, marking the current page 
          with aria-current="page" and using nav and ol elements for semantic structure.
        </p>
      </div>
    </div>
  );
});
