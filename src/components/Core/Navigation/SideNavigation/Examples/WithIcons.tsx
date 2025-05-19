import { component$ } from '@builder.io/qwik';
import { 
  SideNavigation, 
  SideNavigationItem 
} from '../../SideNavigation';

export default component$(() => {
  return (
    <div class="h-64">
      <SideNavigation>
        <SideNavigationItem 
          href="#" 
          label="Dashboard" 
          icon={<i class="fas fa-home"></i>} 
        />
        <SideNavigationItem 
          href="#" 
          label="Analytics" 
          icon={<i class="fas fa-chart-bar"></i>} 
        />
        <SideNavigationItem 
          href="#" 
          label="Reports" 
          icon={<i class="fas fa-file-alt"></i>}
          isActive={true}
        />
        <SideNavigationItem 
          href="#" 
          label="Settings" 
          icon={<i class="fas fa-cog"></i>} 
        />
        <SideNavigationItem 
          href="#" 
          label="Help" 
          icon={<i class="fas fa-question-circle"></i>} 
        />
      </SideNavigation>
    </div>
  );
});
