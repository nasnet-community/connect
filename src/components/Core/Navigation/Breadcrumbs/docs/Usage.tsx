import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const guidelines = [
    {
      title: 'Keep it Simple',
      description: 'Use clear, concise labels that represent each level of navigation accurately.',
      type: 'do',
      code: `<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Cameras', isCurrent: true }
  ]}
/>`
    },
    {
      title: 'Avoid Long Labels',
      description: 'Don\'t use lengthy text for breadcrumb items as it can cause layout issues and confusion.',
      type: 'dont',
      code: `<Breadcrumbs
  items={[
    { label: 'Homepage of Our Website', href: '/' },
    { label: 'All Available Products and Services Category Page', href: '/products' },
    { label: 'Digital Photography Equipment and Accessories', isCurrent: true }
  ]}
/>`
    },
    {
      title: 'Match URL Structure',
      description: 'Ensure breadcrumbs reflect the actual hierarchy of your site structure.',
      type: 'do',
      code: `// For URL: /shop/electronics/cameras/dslr
<Breadcrumbs
  items={[
    { label: 'Shop', href: '/shop' },
    { label: 'Electronics', href: '/shop/electronics' },
    { label: 'Cameras', href: '/shop/electronics/cameras' },
    { label: 'DSLR', isCurrent: true }
  ]}
/>`
    },
    {
      title: 'Avoid Misleading Paths',
      description: 'Don\'t create breadcrumbs that don\'t match your actual navigation structure.',
      type: 'dont',
      code: `// For URL: /cameras/dslr
// But with misleading hierarchy
<Breadcrumbs
  items={[
    { label: 'Shop', href: '/shop' },
    { label: 'Special Offers', href: '/offers' }, // Not actually in the path
    { label: 'Cameras', href: '/cameras' }, 
    { label: 'DSLR', isCurrent: true }
  ]}
/>`
    },
    {
      title: 'Mark Current Page',
      description: 'Always mark the current page with isCurrent=true for proper accessibility.',
      type: 'do',
      code: `<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile', isCurrent: true } // Properly marked as current
  ]}
/>`
    },
    {
      title: 'Don\'t Link the Current Page',
      description: 'The current page should not be a link to avoid confusion and improve accessibility.',
      type: 'dont',
      code: `<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Settings', href: '/settings' },
    { label: 'Profile', href: '/settings/profile', isCurrent: true } // Should not have href
  ]}
/>`
    }
  ];

  const bestPractices = [
    {
      title: 'Position Consistently',
      description: 'Place breadcrumbs in the same location across all pages, typically at the top of the content area below the main navigation.'
    },
    {
      title: 'Use with Other Navigation',
      description: 'Breadcrumbs should complement, not replace, other primary navigation elements like menus or search.'
    },
    {
      title: 'Consider Responsive Behavior',
      description: 'Use the maxItems prop to control how breadcrumbs appear on smaller screens. The component will automatically handle truncation.'
    },
    {
      title: 'Keep the Root Visible',
      description: 'Always show the root/home level, even when truncating, to provide users with an "escape" to the top level.'
    }
  ];

  const accessibilityTips = [
    {
      title: 'Use Proper Structure',
      description: 'The component uses <nav>, <ol>, and <li> elements for proper semantic structure, enhancing screen reader navigation.'
    },
    {
      title: 'Aria Labeling',
      description: 'Use the label prop to provide an appropriate aria-label for the navigation region, helping screen reader users understand the purpose.'
    },
    {
      title: 'Current Page Marking',
      description: 'The component automatically adds aria-current="page" to the current item when isCurrent is true.'
    },
    {
      title: 'Keyboard Navigation',
      description: 'Ensure all clickable breadcrumb items can be reached and activated using keyboard navigation.'
    }
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
    >
      <p>
        Breadcrumbs are a secondary navigation pattern that helps users understand their location 
        within the application's hierarchy and move between levels. Follow these guidelines to 
        implement breadcrumbs effectively in your interface.
      </p>
    </UsageTemplate>
  );
});
