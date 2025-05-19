import { component$, useSignal } from '@builder.io/qwik';
import { 
  SideNavigation, 
  SideNavigationItem,
  SideNavigationBackdrop
} from '../../SideNavigation';

export default component$(() => {
  const isOpen = useSignal(false);
  
  return (
    <div class="h-64 relative">
      <button 
        onClick$={() => isOpen.value = true}
        class="mb-4 px-4 py-2 bg-primary-500 text-white rounded-md"
      >
        Open Menu
      </button>
      
      <div class={{
        'fixed inset-0 z-40': true,
        'hidden': !isOpen.value
      }}>
        <SideNavigationBackdrop 
          isOpen={isOpen.value} 
          onClick$={() => isOpen.value = false} 
        />
        
        <SideNavigation
          isOpen={isOpen.value}
          class="w-64"
          mobileClass="fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-800 shadow-xl transition-transform duration-300"
          onClose$={() => isOpen.value = false}
        >
          <SideNavigationItem href="#" label="Home" />
          <SideNavigationItem href="#" label="Products" isActive={true} />
          <SideNavigationItem href="#" label="Services" />
          <SideNavigationItem href="#" label="Contact" />
        </SideNavigation>
      </div>
    </div>
  );
});
