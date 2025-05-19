import { component$ } from '@builder.io/qwik';
import { TabNavigation, TabItem } from '../../TabNavigation';

export default component$(() => {
  return (
    <div class="p-4 h-64 flex">
      <TabNavigation orientation="vertical" class="h-full">
        <TabItem label="Personal Info" isActive={true} />
        <TabItem label="Account Settings" />
        <TabItem label="Notifications" />
        <TabItem label="Billing" />
        <TabItem label="Security" />
      </TabNavigation>
      
      <div class="p-4 flex-1 border-l border-gray-200 dark:border-gray-700">
        <h3 class="text-lg font-medium mb-2">Personal Info</h3>
        <p class="text-sm text-gray-500">
          Content for the active tab would be displayed here.
        </p>
      </div>
    </div>
  );
});
