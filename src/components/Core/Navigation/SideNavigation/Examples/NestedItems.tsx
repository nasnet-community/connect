import { component$ } from '@builder.io/qwik';
import { 
  SideNavigation, 
  SideNavigationItem 
} from '../../SideNavigation';

export default component$(() => {
  return (
    <div class="h-96">
      <SideNavigation>
        <SideNavigationItem 
          href="#" 
          label="Dashboard" 
        />
        <SideNavigationItem 
          label="Products" 
          expandable={true}
          expanded={true}
        >
          <SideNavigationItem 
            href="#" 
            label="Electronics" 
            indent={1} 
          />
          <SideNavigationItem 
            href="#" 
            label="Clothing" 
            indent={1}
            isActive={true}
          />
          <SideNavigationItem 
            href="#" 
            label="Home & Garden" 
            indent={1} 
          />
        </SideNavigationItem>
        <SideNavigationItem 
          label="Services" 
          expandable={true}
        >
          <SideNavigationItem 
            href="#" 
            label="Consulting" 
            indent={1} 
          />
          <SideNavigationItem 
            href="#" 
            label="Support" 
            indent={1} 
          />
        </SideNavigationItem>
        <SideNavigationItem 
          href="#" 
          label="About" 
        />
      </SideNavigation>
    </div>
  );
});
