import { component$ } from '@builder.io/qwik';
import { Divider } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Divider Line Styles</h3>
        <div class="space-y-6">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Solid (Default)</p>
            <Divider variant="solid" />
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Dashed</p>
            <Divider variant="dashed" />
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Dotted</p>
            <Divider variant="dotted" />
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Divider Thickness</h3>
        <div class="space-y-6">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Thin (Default)</p>
            <Divider thickness="thin" />
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Medium</p>
            <Divider thickness="medium" />
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">Thick</p>
            <Divider thickness="thick" />
          </div>
        </div>
      </div>
    </div>
  );
});
