import { component$ } from '@builder.io/qwik';
import { TabNavigation, TabItem } from '../../TabNavigation';

export default component$(() => {
  return (
    <div class="p-4 space-y-8">
      <div>
        <h3 class="text-sm font-semibold mb-2">Default Variant</h3>
        <TabNavigation variant="default">
          <TabItem label="Overview" isActive={true} />
          <TabItem label="Features" />
          <TabItem label="Pricing" />
          <TabItem label="FAQ" />
        </TabNavigation>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Filled Variant</h3>
        <TabNavigation variant="filled">
          <TabItem label="Overview" isActive={true} />
          <TabItem label="Features" />
          <TabItem label="Pricing" />
          <TabItem label="FAQ" />
        </TabNavigation>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Outlined Variant</h3>
        <TabNavigation variant="outlined">
          <TabItem label="Overview" isActive={true} />
          <TabItem label="Features" />
          <TabItem label="Pricing" />
          <TabItem label="FAQ" />
        </TabNavigation>
      </div>
      
      <div>
        <h3 class="text-sm font-semibold mb-2">Subtle Variant</h3>
        <TabNavigation variant="subtle">
          <TabItem label="Overview" isActive={true} />
          <TabItem label="Features" />
          <TabItem label="Pricing" />
          <TabItem label="FAQ" />
        </TabNavigation>
      </div>
    </div>
  );
});
