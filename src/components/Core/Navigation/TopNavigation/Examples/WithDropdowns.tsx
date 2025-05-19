import { component$ } from '@builder.io/qwik';
import { TopNavigation, TopNavItem, TopNavDropdown, TopNavDropdownItem } from '../../TopNavigation';

export default component$(() => {
  return (
    <div class="p-4">
      <TopNavigation>
        <TopNavItem href="#" label="Home" isActive={true} />
        
        <TopNavDropdown label="Products">
          <TopNavDropdownItem href="#" label="Software" />
          <TopNavDropdownItem href="#" label="Hardware" />
          <TopNavDropdownItem href="#" label="Services" />
        </TopNavDropdown>
        
        <TopNavDropdown label="Solutions">
          <TopNavDropdownItem href="#" label="Enterprise" />
          <TopNavDropdownItem href="#" label="Small Business" />
          <TopNavDropdownItem href="#" label="Startups" />
        </TopNavDropdown>
        
        <TopNavItem href="#" label="About" />
        <TopNavItem href="#" label="Contact" />
      </TopNavigation>
    </div>
  );
});
