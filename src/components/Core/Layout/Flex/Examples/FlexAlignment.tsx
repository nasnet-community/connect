import { component$ } from '@builder.io/qwik';
import { Flex } from '../index';

export default component$(() => {
  return (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-2">Justify Content Options</h3>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">justify="start" (Default)</p>
            <Flex 
              justify="start" 
              gap="md" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">justify="center"</p>
            <Flex 
              justify="center" 
              gap="md" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">justify="end"</p>
            <Flex 
              justify="end" 
              gap="md" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">justify="between"</p>
            <Flex 
              justify="between" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">justify="around"</p>
            <Flex 
              justify="around" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">justify="evenly"</p>
            <Flex 
              justify="evenly" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-lg font-semibold mb-2">Align Items Options</h3>
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">align="stretch" (Default)</p>
            <Flex 
              align="stretch" 
              gap="md" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md h-32"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">align="start"</p>
            <Flex 
              align="start" 
              gap="md" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md h-32"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">align="center"</p>
            <Flex 
              align="center" 
              gap="md" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md h-32"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">align="end"</p>
            <Flex 
              align="end" 
              gap="md" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md h-32"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 1</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 2</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded">Item 3</div>
            </Flex>
          </div>
          
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">align="baseline"</p>
            <Flex 
              align="baseline" 
              gap="md" 
              class="bg-gray-100 dark:bg-gray-800 p-4 rounded-md h-32"
            >
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded text-sm">Small</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded text-xl">Medium</div>
              <div class="bg-blue-100 dark:bg-blue-800 p-4 rounded text-3xl">Large</div>
            </Flex>
          </div>
        </div>
      </div>
    </div>
  );
});
