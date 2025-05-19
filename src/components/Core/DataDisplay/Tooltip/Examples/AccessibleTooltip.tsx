import { component$ } from '@builder.io/qwik';
import { Tooltip } from '~/components/Core/DataDisplay/Tooltip';
import { Button } from '~/components/Core/Input/Button';

export default component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Accessible Tooltips</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          These examples demonstrate tooltips that follow accessibility best practices with proper
          ARIA attributes and keyboard navigation support.
        </p>
        
        <div class="flex flex-wrap gap-4 mb-6">
          <Tooltip 
            content="Information about this field" 
            placement="top"
          >
            <Button aria-label="More information" aria-describedby="tooltip-description">
              Hover for Info
            </Button>
          </Tooltip>
          
          <Tooltip
            content="Click-triggered tooltip with keyboard focus support"
            trigger={["click", "focus"]}
            color="primary"
          >
            <Button aria-label="Help" aria-haspopup="dialog">
              Click or Focus
            </Button>
          </Tooltip>
        </div>
        
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
          <form>
            <div class="mb-4">
              <label for="username" class="block text-sm font-medium mb-1">
                Username
                <Tooltip content="Enter your username (minimum 4 characters)" placement="right">
                  <span class="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold rounded-full bg-gray-200 dark:bg-gray-700 cursor-help" aria-label="Username help">
                    ?
                  </span>
                </Tooltip>
              </label>
              <input
                id="username"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                aria-describedby="username-help"
              />
            </div>
            
            <div class="mb-4">
              <label for="password" class="block text-sm font-medium mb-1">
                Password
                <Tooltip 
                  content="Password must be at least 8 characters with uppercase, lowercase, number, and special character"
                  placement="right"
                >
                  <span class="ml-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold rounded-full bg-gray-200 dark:bg-gray-700 cursor-help" aria-label="Password requirements">
                    ?
                  </span>
                </Tooltip>
              </label>
              <input
                id="password"
                type="password"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                aria-describedby="password-help"
              />
            </div>
          </form>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Keyboard Navigation Example</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Tab through these buttons and press Enter or Space to activate tooltips
        </p>
        
        <div class="flex gap-3">
          <Tooltip content="First tooltip" trigger={["focus", "hover"]}>
            <Button>Button 1</Button>
          </Tooltip>
          
          <Tooltip content="Second tooltip" trigger={["focus", "hover"]}>
            <Button>Button 2</Button>
          </Tooltip>
          
          <Tooltip content="Third tooltip" trigger={["focus", "hover"]}>
            <Button>Button 3</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
