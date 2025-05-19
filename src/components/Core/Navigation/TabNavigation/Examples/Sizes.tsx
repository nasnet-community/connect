import { component$ } from '@builder.io/qwik';
import { TabNavigation, TabItem } from '../../TabNavigation';

export default component$(() => {
  return (
    <div class="p-4 space-y-8">
      <div>
        <h3 class="text-sm font-semibold mb-2">Small Size</h3>
        <TabNavigation size="sm">
          <TabItem label="Profile" isActive={true} />
          <TabItem label="Account" />
          <TabItem label="Settings" />
        </TabNavigation>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Medium Size (Default)</h3>
        <TabNavigation size="md">
          <TabItem label="Profile" isActive={true} />
          <TabItem label="Account" />
          <TabItem label="Settings" />
        </TabNavigation>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Large Size</h3>
        <TabNavigation size="lg">
          <TabItem label="Profile" isActive={true} />
          <TabItem label="Account" />
          <TabItem label="Settings" />
        </TabNavigation>
      </div>
    </div>
  );
});
