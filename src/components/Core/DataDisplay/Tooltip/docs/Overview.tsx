import { component$ } from '@builder.io/qwik';
import { OverviewTemplate } from '~/components/Docs/templates';
import { Tooltip } from '../index';
import { Button } from '~/components/Core/Input/Button';

export default component$(() => {
  return (
    <OverviewTemplate
      title="Tooltip"
      description="A small informative message that appears when a user hovers over, focuses on, or clicks an element."
      importStatement="import { Tooltip } from '~/components/Core/DataDisplay/Tooltip';"
      features={[
        'Multiple placement options (top, bottom, left, right, and variations)',
        'Different color variants for various contexts',
        'Multiple trigger types (hover, click, focus)',
        'Customizable appearance (size, width, arrow)',
        'Delay options for showing and hiding',
        'Interactive tooltips that remain visible when hovered',
        'Accessible with keyboard navigation support',
        'Support for both simple text and rich content'
      ]}
    >
      <div class="flex flex-wrap justify-center gap-4 p-8 rounded-md border border-neutral-200 dark:border-neutral-700">
        <Tooltip 
          content="This is a tooltip that provides additional information"
          placement="top"
        >
          <Button>Hover me</Button>
        </Tooltip>
        
        <Tooltip 
          content={
            <div class="flex flex-col gap-1">
              <p class="font-semibold">Rich Content Tooltip</p>
              <p>You can include complex content within tooltips</p>
              <p class="text-blue-500">With different styling</p>
            </div>
          }
          color="primary"
          placement="bottom"
        >
          <Button variant="outline">Rich Content</Button>
        </Tooltip>
        
        <Tooltip 
          content="Click-triggered tooltip"
          trigger="click"
          color="secondary"
          placement="right"
        >
          <Button variant="ghost">Click me</Button>
        </Tooltip>
      </div>
    </OverviewTemplate>
  );
});
