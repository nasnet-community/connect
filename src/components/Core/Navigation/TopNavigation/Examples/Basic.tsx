import { component$ } from '@builder.io/qwik';
import { TopNavigation, TopNavItem } from '../../TopNavigation';

export default component$(() => {
  return (
    <div class="p-4">
      <TopNavigation>
        <TopNavItem href="#" label="Home" isActive={true} />
        <TopNavItem href="#" label="Products" />
        <TopNavItem href="#" label="Services" />
        <TopNavItem href="#" label="About" />
        <TopNavItem href="#" label="Contact" />
      </TopNavigation>
    </div>
  );
});
