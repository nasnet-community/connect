import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const guidelines = [
    {
      title: "Implement responsive behavior",
      description:
        "Make your side navigation responsive by toggling between fixed and off-canvas modes based on screen size.",
      code: `
import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { SideNavigation, SideNavigationItem, SideNavigationBackdrop } from '~/components/Core/Navigation/SideNavigation';

export default component$(() => {
  const isOpen = useSignal(false);
  const isMobile = useSignal(false);
  
  // Check if screen is mobile size on mount and window resize
  useVisibleTask$(() => {
    const checkMobile = () => {
      isMobile.value = window.innerWidth < 768;
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  });
  
  return (
    <>
      {isMobile.value && (
        <>
          <button onClick$={() => isOpen.value = true}>Open Menu</button>
          <SideNavigationBackdrop 
            isOpen={isOpen.value} 
            onClick$={() => isOpen.value = false} 
          />
        </>
      )}
      
      <SideNavigation
        isOpen={isMobile.value ? isOpen.value : true}
        onClose$={() => isOpen.value = false}
      >
        {/* Navigation items */}
      </SideNavigation>
    </>
  );
});
      `,
      type: "do" as const,
    },
    {
      title: "Organize items logically",
      description:
        "Group related navigation items under expandable sections for better organization.",
      code: `
<SideNavigation>
  <SideNavigationItem href="/dashboard" label="Dashboard" />
  
  {/* Group related items */}
  <SideNavigationItem label="Content" expandable={true}>
    <SideNavigationItem href="/content/pages" label="Pages" indent={1} />
    <SideNavigationItem href="/content/posts" label="Posts" indent={1} />
    <SideNavigationItem href="/content/media" label="Media" indent={1} />
  </SideNavigationItem>
  
  {/* Another group */}
  <SideNavigationItem label="Settings" expandable={true}>
    <SideNavigationItem href="/settings/general" label="General" indent={1} />
    <SideNavigationItem href="/settings/users" label="Users" indent={1} />
    <SideNavigationItem href="/settings/security" label="Security" indent={1} />
  </SideNavigationItem>
</SideNavigation>
      `,
      type: "do" as const,
    },
    {
      title: "Use icons consistently",
      description:
        "If using icons, apply them consistently across all navigation items for visual balance.",
      code: `
<SideNavigation>
  {/* All items have icons for consistency */}
  <SideNavigationItem 
    href="/dashboard" 
    label="Dashboard" 
    icon={<i class="fas fa-home" />} 
  />
  <SideNavigationItem 
    href="/analytics" 
    label="Analytics" 
    icon={<i class="fas fa-chart-bar" />} 
  />
  <SideNavigationItem 
    href="/settings" 
    label="Settings" 
    icon={<i class="fas fa-cog" />} 
  />
</SideNavigation>
      `,
      type: "do" as const,
    },
    {
      title: "Overload with too many nested levels",
      description:
        "Avoid creating deep hierarchies that make navigation confusing and difficult to use.",
      code: `
<SideNavigation>
  <SideNavigationItem label="Products" expandable={true}>
    <SideNavigationItem label="Electronics" expandable={true} indent={1}>
      <SideNavigationItem label="Computers" expandable={true} indent={2}>
        <SideNavigationItem label="Laptops" expandable={true} indent={3}>
          <SideNavigationItem label="Gaming" expandable={true} indent={4}>
            <SideNavigationItem href="#" label="High-end" indent={5} />
            <SideNavigationItem href="#" label="Budget" indent={5} />
          </SideNavigationItem>
        </SideNavigationItem>
      </SideNavigationItem>
    </SideNavigationItem>
  </SideNavigationItem>
</SideNavigation>
      `,
      type: "dont" as const,
    },
    {
      title: "Mix navigation patterns",
      description:
        "Don't mix different navigation patterns in the same side navigation.",
      code: `
<SideNavigation>
  {/* Inconsistent pattern: some items have icons, others don't */}
  <SideNavigationItem 
    href="/dashboard" 
    label="Dashboard" 
    icon={<i class="fas fa-home" />} 
  />
  <SideNavigationItem 
    href="/analytics" 
    label="Analytics" 
  />
  <SideNavigationItem 
    href="/settings" 
    label="Settings" 
    icon={<i class="fas fa-cog" />} 
  />
</SideNavigation>
      `,
      type: "dont" as const,
    },
    {
      title: "Neglect mobile users",
      description:
        "Make sure your side navigation is usable on mobile devices with proper open/close controls.",
      code: `
// DON'T: Navigation with no way to close it on mobile
<SideNavigation>
  {/* No mobile toggle or backdrop */}
  <SideNavigationItem href="/dashboard" label="Dashboard" />
  <SideNavigationItem href="/analytics" label="Analytics" />
  <SideNavigationItem href="/settings" label="Settings" />
</SideNavigation>
      `,
      type: "dont" as const,
    },
  ];

  const bestPractices = [
    {
      title: "Highlight the active page",
      description:
        "Always indicate the current page or section to help users understand their location in the navigation hierarchy.",
    },
    {
      title: "Limit navigation depth",
      description:
        "Try to limit navigation to no more than 2-3 levels deep to prevent confusion and excessive clicking.",
    },
    {
      title: "Use clear labels",
      description:
        "Use concise but descriptive labels for navigation items to clearly communicate their destination.",
    },
    {
      title: "Group related items",
      description:
        "Organize related navigation items under expandable sections to reduce cognitive load and improve findability.",
    },
  ];

  const accessibilityTips = [
    {
      title: "Use semantic markup",
      description:
        "The SideNavigation uses proper semantic nav element and appropriate ARIA roles.",
    },
    {
      title: "Support keyboard navigation",
      description:
        "Ensure users can navigate through all menu items using the keyboard, including expanding/collapsing sections.",
    },
    {
      title: "Provide ARIA labels",
      description:
        "Set descriptive ariaLabel prop to provide context for screen reader users.",
    },
    {
      title: "Indicate current page",
      description:
        'Use the isActive prop to apply aria-current="page" for the current page, helping screen reader users understand their location.',
    },
  ];

  const performanceTips = [
    "Consider using code splitting for large navigation structures to minimize initial load time.",
    "For very complex navigation trees, consider lazy-loading nested items when expanded.",
    "When using icons, ensure they're optimized or use icon fonts to reduce bundle size.",
    "If your navigation requires state management, consider using local state rather than global store for better performance.",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        The SideNavigation component provides a flexible system for implementing
        vertical navigation in your application. This section offers guidelines
        and best practices for using the component effectively, focusing on
        organization, responsiveness, and accessibility.
      </p>
    </UsageTemplate>
  );
});
