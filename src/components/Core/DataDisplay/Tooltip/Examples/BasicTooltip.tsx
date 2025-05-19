import { component$ } from '@builder.io/qwik';
import { Tooltip } from '~/components/Core/DataDisplay/Tooltip';
import { Button } from '~/components/Core/Input/Button';

export const BasicTooltip = component$(() => {
  return (
    <div class="flex flex-col gap-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Basic Tooltip</h3>
        <div class="flex items-center gap-2">
          <Tooltip content="This is a basic tooltip">
            <Button>Hover Me</Button>
          </Tooltip>
        </div>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Tooltip with Different Content</h3>
        <div class="flex items-center gap-4">
          <Tooltip content="Simple text tooltip">
            <Button variant="outline">Text Tooltip</Button>
          </Tooltip>
          
          <Tooltip 
            content={
              <div class="flex flex-col gap-1">
                <p class="font-semibold">Rich Content</p>
                <p>You can use HTML in tooltips</p>
                <p class="text-blue-500">Including styling</p>
              </div>
            }
          >
            <Button variant="outline">Rich Content</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
});
