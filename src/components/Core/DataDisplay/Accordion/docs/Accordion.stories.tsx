import { Meta, StoryObj } from 'storybook-framework-qwik';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './Accordion';
import type { AccordionProps } from './Accordion.types';
import { component$, useSignal } from '@builder.io/qwik';

export default {
  title: 'Core/DataDisplay/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A vertically stacked set of interactive headings that each reveal a section of content.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated'],
      description: 'The visual variant of the accordion',
      defaultValue: 'default'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the accordion',
      defaultValue: 'md'
    },
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether to allow single or multiple items to be open',
      defaultValue: 'single'
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'The position of the expand/collapse icon',
      defaultValue: 'end'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether to disable all accordion items',
      defaultValue: false
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether to allow all items to be closed (only for type="single")',
      defaultValue: true
    },
    animation: {
      control: 'select',
      options: ['slide', 'fade', 'scale', 'none'],
      description: 'Animation type for expanding/collapsing',
      defaultValue: 'slide'
    },
    animationDuration: {
      control: 'number',
      description: 'Animation duration in milliseconds',
      defaultValue: 300
    }
  }
} satisfies Meta<AccordionProps>;

type Story = StoryObj<AccordionProps>;

// Basic Accordion
export const Default: Story = {
  render: (args) => (
    <div class="w-full max-w-md mx-auto">
      <Accordion {...args}>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Qwik?</AccordionTrigger>
          <AccordionContent>
            Qwik is a new kind of web framework that can deliver instant loading web applications at any size or complexity. Your sites and apps can boot with about 1kb of JS (regardless of application complexity), and achieve consistent performance at scale.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>How does Qwik differ from other frameworks?</AccordionTrigger>
          <AccordionContent>
            Qwik is designed from the ground up for the fastest possible page load time, directly addressing what would otherwise become exponentially complex as your app grows. Qwik is resumable, which means it doesn't need to hydrate in the browser.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>What is Resumability?</AccordionTrigger>
          <AccordionContent>
            Resumability means Qwik apps don't need to be downloaded and executed in order to become interactive. They just resume execution from where the server stopped. This means your application's startup cost is constant (and tiny) regardless of application size.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

// Variants
export const Variants: Story = {
  render: () => (
    <div class="w-full max-w-md mx-auto space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Default Variant</h3>
        <Accordion variant="default">
          <AccordionItem value="item-1">
            <AccordionTrigger>Default Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              This is the content for the first accordion item. It uses the default variant styling.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Default Accordion Item 2</AccordionTrigger>
            <AccordionContent>
              This is the content for the second accordion item. It uses the default variant styling.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Bordered Variant</h3>
        <Accordion variant="bordered">
          <AccordionItem value="item-1">
            <AccordionTrigger>Bordered Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              This is the content for the first accordion item. It uses the bordered variant styling.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Bordered Accordion Item 2</AccordionTrigger>
            <AccordionContent>
              This is the content for the second accordion item. It uses the bordered variant styling.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Separated Variant</h3>
        <Accordion variant="separated">
          <AccordionItem value="item-1">
            <AccordionTrigger>Separated Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              This is the content for the first accordion item. It uses the separated variant styling.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Separated Accordion Item 2</AccordionTrigger>
            <AccordionContent>
              This is the content for the second accordion item. It uses the separated variant styling.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div class="w-full max-w-md mx-auto space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Small Size</h3>
        <Accordion size="sm">
          <AccordionItem value="item-1">
            <AccordionTrigger>Small Accordion Item</AccordionTrigger>
            <AccordionContent>
              This accordion uses the small size setting.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Medium Size (Default)</h3>
        <Accordion size="md">
          <AccordionItem value="item-1">
            <AccordionTrigger>Medium Accordion Item</AccordionTrigger>
            <AccordionContent>
              This accordion uses the medium size setting.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Large Size</h3>
        <Accordion size="lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>Large Accordion Item</AccordionTrigger>
            <AccordionContent>
              This accordion uses the large size setting.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
};

// Single vs Multiple
export const Types: Story = {
  render: () => (
    <div class="w-full max-w-md mx-auto space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Single Type (Default)</h3>
        <Accordion type="single" defaultValue={['item-1']}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Single Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              In single type accordions, only one item can be open at a time.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Single Accordion Item 2</AccordionTrigger>
            <AccordionContent>
              Opening this item will close the other one.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Single Accordion Item 3</AccordionTrigger>
            <AccordionContent>
              Opening this item will close all others.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Multiple Type</h3>
        <Accordion type="multiple" defaultValue={['item-1', 'item-3']}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Multiple Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              In multiple type accordions, multiple items can be open simultaneously.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Multiple Accordion Item 2</AccordionTrigger>
            <AccordionContent>
              Opening this item won't close the others.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Multiple Accordion Item 3</AccordionTrigger>
            <AccordionContent>
              You can have as many items open as you want.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
};

// Icon Positions
export const IconPositions: Story = {
  render: () => (
    <div class="w-full max-w-md mx-auto space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Icon at End (Default)</h3>
        <Accordion iconPosition="end">
          <AccordionItem value="item-1">
            <AccordionTrigger>Icon at End</AccordionTrigger>
            <AccordionContent>
              This accordion has its expand/collapse icon at the end of the trigger.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Icon at Start</h3>
        <Accordion iconPosition="start">
          <AccordionItem value="item-1">
            <AccordionTrigger>Icon at Start</AccordionTrigger>
            <AccordionContent>
              This accordion has its expand/collapse icon at the start of the trigger.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">No Icon</h3>
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger hideIcon={true}>No Icon</AccordionTrigger>
            <AccordionContent>
              This accordion item doesn't display an expand/collapse icon.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Custom Icon</h3>
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger
              icon={
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  stroke-width="2" 
                  stroke-linecap="round" 
                  stroke-linejoin="round"
                  class="h-5 w-5 text-primary-500"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              }
            >
              Custom Icon
            </AccordionTrigger>
            <AccordionContent>
              This accordion item uses a custom icon.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
};

// Disabled State
export const DisabledStates: Story = {
  render: () => (
    <div class="w-full max-w-md mx-auto space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Fully Disabled Accordion</h3>
        <Accordion disabled defaultValue={['item-1']}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Disabled Accordion Item 1</AccordionTrigger>
            <AccordionContent>
              This content is not accessible because the entire accordion is disabled.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Disabled Accordion Item 2</AccordionTrigger>
            <AccordionContent>
              This content is not accessible because the entire accordion is disabled.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Individual Disabled Items</h3>
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Normal Accordion Item</AccordionTrigger>
            <AccordionContent>
              This item is fully functional and can be opened/closed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" disabled>
            <AccordionTrigger>Disabled Accordion Item</AccordionTrigger>
            <AccordionContent>
              This content is not accessible because this specific item is disabled.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Another Normal Item</AccordionTrigger>
            <AccordionContent>
              This item is fully functional and can be opened/closed.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
};

// Animation Types
export const Animations: Story = {
  render: () => (
    <div class="w-full max-w-md mx-auto space-y-8">
      <div>
        <h3 class="text-sm font-medium mb-2">Slide Animation (Default)</h3>
        <Accordion animation="slide">
          <AccordionItem value="item-1">
            <AccordionTrigger>Slide Animation</AccordionTrigger>
            <AccordionContent>
              This accordion uses the slide animation when expanding and collapsing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Fade Animation</h3>
        <Accordion animation="fade">
          <AccordionItem value="item-1">
            <AccordionTrigger>Fade Animation</AccordionTrigger>
            <AccordionContent>
              This accordion uses the fade animation when expanding and collapsing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">Scale Animation</h3>
        <Accordion animation="scale">
          <AccordionItem value="item-1">
            <AccordionTrigger>Scale Animation</AccordionTrigger>
            <AccordionContent>
              This accordion uses the scale animation when expanding and collapsing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      <div>
        <h3 class="text-sm font-medium mb-2">No Animation</h3>
        <Accordion animation="none">
          <AccordionItem value="item-1">
            <AccordionTrigger>No Animation</AccordionTrigger>
            <AccordionContent>
              This accordion has no animation when expanding and collapsing.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
};

// Controlled Accordion
const ControlledAccordion = component$(() => {
  const expandedItems = useSignal<string[]>(['item-1']);
  
  return (
    <div class="w-full max-w-md mx-auto">
      <div class="mb-4">
        <h3 class="text-sm font-medium mb-2">Controlled Accordion</h3>
        <div class="flex gap-2 mb-4">
          <button 
            onClick$={() => expandedItems.value = ['item-1']}
            class="px-3 py-1 bg-primary-500 text-white rounded text-sm"
          >
            Open Item 1
          </button>
          <button 
            onClick$={() => expandedItems.value = ['item-2']}
            class="px-3 py-1 bg-primary-500 text-white rounded text-sm"
          >
            Open Item 2
          </button>
          <button 
            onClick$={() => expandedItems.value = ['item-3']}
            class="px-3 py-1 bg-primary-500 text-white rounded text-sm"
          >
            Open Item 3
          </button>
          <button 
            onClick$={() => expandedItems.value = []}
            class="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Close All
          </button>
        </div>
      </div>
      
      <Accordion value={expandedItems} type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger>Controlled Item 1</AccordionTrigger>
          <AccordionContent>
            This item is controlled by external buttons.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Controlled Item 2</AccordionTrigger>
          <AccordionContent>
            This item is controlled by external buttons.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Controlled Item 3</AccordionTrigger>
          <AccordionContent>
            This item is controlled by external buttons.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
});

export const Controlled: Story = {
  render: () => <ControlledAccordion />
};

// Rich Content
export const RichContent: Story = {
  render: () => (
    <div class="w-full max-w-md mx-auto">
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5 mr-2 text-primary-500"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
              <span>Documentation</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div class="space-y-2">
              <p>Here's some rich content inside an accordion:</p>
              <ul class="list-disc pl-5">
                <li>Supports lists</li>
                <li>And other HTML elements</li>
              </ul>
              <div class="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                <code>const example = "Code blocks too!";</code>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <div class="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-5 w-5 mr-2 text-primary-500"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>About</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div class="flex items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <img 
                src="https://placeholder.pics/svg/64/DEDEDE/555555/ICON" 
                alt="Company Logo"
                class="w-12 h-12 mr-4 rounded"
              />
              <div>
                <h4 class="font-semibold">Company Name</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  We build amazing web applications with Qwik.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};

// Nested Accordions
export const NestedAccordions: Story = {
  render: () => (
    <div class="w-full max-w-md mx-auto">
      <Accordion>
        <AccordionItem value="item-1">
          <AccordionTrigger>Main Category</AccordionTrigger>
          <AccordionContent>
            <p class="mb-2">Here's some content for the main category.</p>
            
            <Accordion variant="bordered" class="mt-2">
              <AccordionItem value="nested-1">
                <AccordionTrigger>Subcategory 1</AccordionTrigger>
                <AccordionContent>
                  <p>Content for subcategory 1.</p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="nested-2">
                <AccordionTrigger>Subcategory 2</AccordionTrigger>
                <AccordionContent>
                  <p>Content for subcategory 2.</p>
                  
                  <Accordion variant="separated" class="mt-2">
                    <AccordionItem value="nested-nested-1">
                      <AccordionTrigger>Sub-subcategory</AccordionTrigger>
                      <AccordionContent>
                        <p>Even deeper nesting is possible!</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>Another Category</AccordionTrigger>
          <AccordionContent>
            <p>This category doesn't have any nested accordions.</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
};
