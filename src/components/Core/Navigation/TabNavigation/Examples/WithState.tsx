import { component$, useSignal } from '@builder.io/qwik';
import { TabNavigation, TabItem } from '../../TabNavigation';

export default component$(() => {
  const activeTab = useSignal('home');
  
  return (
    <div class="p-4">
      <TabNavigation>
        <TabItem 
          label="Home" 
          isActive={activeTab.value === 'home'} 
          onClick$={() => activeTab.value = 'home'}
        />
        <TabItem 
          label="Services" 
          isActive={activeTab.value === 'services'} 
          onClick$={() => activeTab.value = 'services'}
        />
        <TabItem 
          label="About" 
          isActive={activeTab.value === 'about'} 
          onClick$={() => activeTab.value = 'about'}
        />
        <TabItem 
          label="Contact" 
          isActive={activeTab.value === 'contact'} 
          onClick$={() => activeTab.value = 'contact'}
        />
      </TabNavigation>
      
      <div class="mt-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        {activeTab.value === 'home' && (
          <div>
            <h3 class="text-lg font-medium mb-2">Home Tab Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content for the Home tab.
            </p>
          </div>
        )}
        
        {activeTab.value === 'services' && (
          <div>
            <h3 class="text-lg font-medium mb-2">Services Tab Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content for the Services tab.
            </p>
          </div>
        )}
        
        {activeTab.value === 'about' && (
          <div>
            <h3 class="text-lg font-medium mb-2">About Tab Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content for the About tab.
            </p>
          </div>
        )}
        
        {activeTab.value === 'contact' && (
          <div>
            <h3 class="text-lg font-medium mb-2">Contact Tab Content</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This is the content for the Contact tab.
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
