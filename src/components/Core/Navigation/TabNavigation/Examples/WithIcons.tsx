import { component$ } from '@builder.io/qwik';
import { TabNavigation, TabItem } from '../../TabNavigation';

export default component$(() => {
  return (
    <div class="p-4">
      <TabNavigation>
        <TabItem 
          label="Dashboard" 
          icon={<i class="fas fa-home"></i>}
          isActive={true}
        />
        <TabItem 
          label="Analytics" 
          icon={<i class="fas fa-chart-bar"></i>}
        />
        <TabItem 
          label="Reports" 
          icon={<i class="fas fa-file-alt"></i>}
        />
        <TabItem 
          label="Settings" 
          icon={<i class="fas fa-cog"></i>}
        />
      </TabNavigation>
    </div>
  );
});
