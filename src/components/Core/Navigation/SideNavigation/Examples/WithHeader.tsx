import { component$ } from '@builder.io/qwik';
import { 
  SideNavigation, 
  SideNavigationItem, 
  SideNavigationHeader 
} from '../../SideNavigation';

export default component$(() => {
  return (
    <div class="h-72">
      <SideNavigation>
        <SideNavigationHeader>
          <div class="flex items-center gap-2 p-2">
            <div class="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold">
              C
            </div>
            <span class="font-medium">Company Name</span>
          </div>
        </SideNavigationHeader>
        
        <SideNavigationItem 
          href="#" 
          label="Dashboard" 
          icon={<i class="fas fa-home"></i>} 
        />
        <SideNavigationItem 
          href="#" 
          label="Projects" 
          icon={<i class="fas fa-project-diagram"></i>} 
          isActive={true}
        />
        <SideNavigationItem 
          href="#" 
          label="Calendar" 
          icon={<i class="fas fa-calendar"></i>} 
        />
        <SideNavigationItem 
          href="#" 
          label="Messages" 
          icon={<i class="fas fa-envelope"></i>} 
        />
      </SideNavigation>
    </div>
  );
});
