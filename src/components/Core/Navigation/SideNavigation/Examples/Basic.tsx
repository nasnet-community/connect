import { component$ } from '@builder.io/qwik';
import { SideNavigation, SideNavigationItem } from '../../SideNavigation';

export default component$(() => {
  return (
    <div class="h-64">
      <SideNavigation>
        <SideNavigationItem href="#" label="Home" />
        <SideNavigationItem href="#" label="Products" />
        <SideNavigationItem href="#" label="Services" isActive={true} />
        <SideNavigationItem href="#" label="About" />
        <SideNavigationItem href="#" label="Contact" />
      </SideNavigation>
    </div>
  );
});
