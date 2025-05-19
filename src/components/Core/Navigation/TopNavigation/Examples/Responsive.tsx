import { component$, useSignal } from '@builder.io/qwik';
import { TopNavigation, TopNavItem, TopNavToggle } from '../../TopNavigation';
import { HamburgerMenuIcon } from '~/components/Core/Iconography/Icons';
import { CloseIcon } from '~/components/Core/Iconography/Icons';

export default component$(() => {
  const isOpen = useSignal(false);

  return (
    <div class="p-4">
      <TopNavigation responsive={true}>
        <div class="flex items-center">
          <div class="mr-4">
            <img src="/images/logo.jpg" alt="Logo" class="h-8" />
          </div>
          
          <TopNavToggle 
            isOpen={isOpen.value} 
            onClick$={() => isOpen.value = !isOpen.value}
            openIcon={<HamburgerMenuIcon class="w-6 h-6" />}
            closeIcon={<CloseIcon class="w-6 h-6" />}
          />
        </div>
        
        <div class={`flex flex-col md:flex-row ${isOpen.value ? 'block' : 'hidden md:flex'}`}>
          <TopNavItem href="#" label="Home" isActive={true} />
          <TopNavItem href="#" label="Products" />
          <TopNavItem href="#" label="Services" />
          <TopNavItem href="#" label="About" />
          <TopNavItem href="#" label="Contact" />
        </div>
      </TopNavigation>
      
      <div class="mt-4 text-sm text-gray-600 dark:text-gray-300">
        <p>Try resizing the browser window to see how the navigation responds to different screen sizes.</p>
      </div>
    </div>
  );
});
