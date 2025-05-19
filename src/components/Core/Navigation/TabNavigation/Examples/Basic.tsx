import { component$ } from '@builder.io/qwik';
import { TabNavigation, TabItem } from '../../TabNavigation';

export default component$(() => {
  return (
    <div class="p-4">
      <TabNavigation>
        <TabItem label="Home" isActive={true} />
        <TabItem label="Products" />
        <TabItem label="Services" />
        <TabItem label="About" />
        <TabItem label="Contact" />
      </TabNavigation>
    </div>
  );
});
