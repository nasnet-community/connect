import { component$ } from '@builder.io/qwik';
import { TopNavigation, TopNavItem, TopNavDropdown, TopNavDropdownItem } from '../../TopNavigation';

export default component$(() => {
  return (
    <div class="p-4">
      <TopNavigation ariaLabel="Main Navigation" id="main-nav">
        <TopNavItem href="#" label="Home" isActive={true} />
        
        <TopNavDropdown 
          label="Products" 
          id="products-dropdown"
          ariaControls="products-menu"
        >
          <div id="products-menu" role="menu">
            <TopNavDropdownItem 
              href="#" 
              label="Software" 
              id="software-item"
              role="menuitem"
            />
            <TopNavDropdownItem 
              href="#" 
              label="Hardware" 
              id="hardware-item"
              role="menuitem"
            />
            <TopNavDropdownItem 
              href="#" 
              label="Services" 
              id="services-item"
              role="menuitem"
            />
          </div>
        </TopNavDropdown>
        
        <TopNavItem 
          href="#" 
          label="About" 
          ariaDescription="Learn more about our company"
        />
        
        <TopNavItem 
          href="#" 
          label="Contact" 
          ariaDescription="Get in touch with our team"
        />
      </TopNavigation>
      
      <div class="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>This example demonstrates proper accessibility implementation with ARIA attributes and keyboard navigation support.</p>
      </div>
    </div>
  );
});
