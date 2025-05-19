import { component$ } from '@builder.io/qwik';
import { TopNavigation, TopNavItem } from '../../TopNavigation';
import { Button } from '~/components/Core/button';

export default component$(() => {
  return (
    <div class="p-4">
      <TopNavigation>
        <div class="flex items-center">
          <div class="mr-4">
            <img src="/images/logo.jpg" alt="Logo" class="h-8" />
          </div>
        </div>
        
        <div class="flex-1 flex items-center justify-center">
          <TopNavItem href="#" label="Home" isActive={true} />
          <TopNavItem href="#" label="Products" />
          <TopNavItem href="#" label="Services" />
          <TopNavItem href="#" label="About" />
        </div>
        
        <div class="flex items-center space-x-2">
          <Button size="sm" variant="ghost">Sign In</Button>
          <Button size="sm" variant="primary">Sign Up</Button>
        </div>
      </TopNavigation>
    </div>
  );
});
