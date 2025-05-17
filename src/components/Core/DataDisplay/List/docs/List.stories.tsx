import { component$ } from '@builder.io/qwik';
import type { Meta, StoryObj } from 'storybook-framework-qwik';
import { 
  List, 
  ListItem, 
  ListTerm, 
  ListDescription, 
  OrderedList, 
  UnorderedList, 
  DefinitionList 
} from './index';

const meta: Meta<typeof List> = {
  title: 'Core/Data Display/List',
  component: List,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['unordered', 'ordered', 'definition'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    spacing: {
      control: 'radio',
      options: ['compact', 'normal', 'relaxed'],
    },
    marker: {
      control: 'select',
      options: ['disc', 'circle', 'square', 'decimal', 'roman', 'alpha', 'none'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

/**
 * Basic unordered list example.
 */
export const BasicUnorderedList: Story = {
  render: component$(() => (
    <List>
      <ListItem>Features fully responsive components</ListItem>
      <ListItem>Supports dark mode out of the box</ListItem>
      <ListItem>Written in TypeScript for type safety</ListItem>
      <ListItem>Integrates with your favorite frameworks</ListItem>
      <ListItem>Provides extensive documentation</ListItem>
    </List>
  )),
};

/**
 * Basic ordered list example.
 */
export const BasicOrderedList: Story = {
  render: component$(() => (
    <List variant="ordered">
      <ListItem>Install dependencies with npm or yarn</ListItem>
      <ListItem>Import the components you need</ListItem>
      <ListItem>Use the components in your application</ListItem>
      <ListItem>Customize with your own styles if needed</ListItem>
      <ListItem>Enjoy the beautiful design system</ListItem>
    </List>
  )),
};

/**
 * Basic definition list example.
 */
export const BasicDefinitionList: Story = {
  render: component$(() => (
    <List variant="definition">
      <ListTerm>Connect</ListTerm>
      <ListDescription>A comprehensive design system built with Qwik for enterprise applications.</ListDescription>
      
      <ListTerm>Qwik</ListTerm>
      <ListDescription>Resumable, fine-grained reactivity, and edge-optimized framework for the fastest possible page load.</ListDescription>
      
      <ListTerm>Components</ListTerm>
      <ListDescription>Pre-built, accessible, customizable building blocks for rapid application development.</ListDescription>
    </List>
  )),
};

/**
 * Unordered list with different marker types.
 */
export const UnorderedListMarkers: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-2">Disc Markers (Default)</h3>
        <List marker="disc">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Circle Markers</h3>
        <List marker="circle">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Square Markers</h3>
        <List marker="square">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">No Markers</h3>
        <List marker="none">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
        </List>
      </div>
    </div>
  )),
};

/**
 * Ordered list with different marker types.
 */
export const OrderedListMarkers: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-2">Decimal Markers (Default)</h3>
        <List variant="ordered" marker="decimal">
          <ListItem>Install dependencies</ListItem>
          <ListItem>Import components</ListItem>
          <ListItem>Use in your application</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Roman Numerals</h3>
        <List variant="ordered" marker="roman">
          <ListItem>Install dependencies</ListItem>
          <ListItem>Import components</ListItem>
          <ListItem>Use in your application</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Alphabetical</h3>
        <List variant="ordered" marker="alpha">
          <ListItem>Install dependencies</ListItem>
          <ListItem>Import components</ListItem>
          <ListItem>Use in your application</ListItem>
        </List>
      </div>
    </div>
  )),
};

/**
 * Lists with different sizes.
 */
export const ListSizes: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-2">Small Size</h3>
        <List size="sm">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Medium Size (Default)</h3>
        <List size="md">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Large Size</h3>
        <List size="lg">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
        </List>
      </div>
    </div>
  )),
};

/**
 * Lists with different spacing.
 */
export const ListSpacing: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-2">Compact Spacing</h3>
        <List spacing="compact">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
          <ListItem>Integrates with your favorite frameworks</ListItem>
          <ListItem>Provides extensive documentation</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Normal Spacing (Default)</h3>
        <List spacing="normal">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
          <ListItem>Integrates with your favorite frameworks</ListItem>
          <ListItem>Provides extensive documentation</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Relaxed Spacing</h3>
        <List spacing="relaxed">
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
          <ListItem>Integrates with your favorite frameworks</ListItem>
          <ListItem>Provides extensive documentation</ListItem>
        </List>
      </div>
    </div>
  )),
};

/**
 * Nested lists.
 */
export const NestedLists: Story = {
  render: component$(() => (
    <List>
      <ListItem>First level item</ListItem>
      <ListItem>First level item with nested list
        <List nested>
          <ListItem>Second level item</ListItem>
          <ListItem>Second level item with nested list
            <List nested>
              <ListItem>Third level item</ListItem>
              <ListItem>Third level item</ListItem>
            </List>
          </ListItem>
          <ListItem>Second level item</ListItem>
        </List>
      </ListItem>
      <ListItem>First level item</ListItem>
    </List>
  )),
};

/**
 * List with active and disabled items.
 */
export const ActiveAndDisabledItems: Story = {
  render: component$(() => (
    <List>
      <ListItem>Regular item</ListItem>
      <ListItem active>Active item</ListItem>
      <ListItem disabled>Disabled item</ListItem>
      <ListItem>Regular item</ListItem>
      <ListItem>Regular item</ListItem>
    </List>
  )),
};

/**
 * Ordered list with custom start value and reversed.
 */
export const OrderedListCustom: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-2">Custom Start Value (10)</h3>
        <List variant="ordered" start={10}>
          <ListItem>This item starts at 10</ListItem>
          <ListItem>This item is 11</ListItem>
          <ListItem>This item is 12</ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Reversed Order</h3>
        <List variant="ordered" reversed>
          <ListItem>This item will be 3</ListItem>
          <ListItem>This item will be 2</ListItem>
          <ListItem>This item will be 1</ListItem>
        </List>
      </div>
    </div>
  )),
};

/**
 * Example using convenience components.
 */
export const ConvenienceComponents: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-2">UnorderedList Component</h3>
        <UnorderedList>
          <ListItem>Features fully responsive components</ListItem>
          <ListItem>Supports dark mode out of the box</ListItem>
          <ListItem>Written in TypeScript for type safety</ListItem>
        </UnorderedList>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">OrderedList Component</h3>
        <OrderedList>
          <ListItem>Install dependencies</ListItem>
          <ListItem>Import components</ListItem>
          <ListItem>Use in your application</ListItem>
        </OrderedList>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">DefinitionList Component</h3>
        <DefinitionList>
          <ListTerm>Connect</ListTerm>
          <ListDescription>A comprehensive design system built with Qwik.</ListDescription>
          
          <ListTerm>Components</ListTerm>
          <ListDescription>Pre-built building blocks for rapid development.</ListDescription>
        </DefinitionList>
      </div>
    </div>
  )),
};

/**
 * List with custom styling.
 */
export const CustomStyling: Story = {
  render: component$(() => (
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-medium mb-2">Custom Unordered List</h3>
        <List class="pl-0">
          <ListItem class="flex items-center mb-3">
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span>Features fully responsive components</span>
          </ListItem>
          
          <ListItem class="flex items-center mb-3">
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span>Supports dark mode out of the box</span>
          </ListItem>
          
          <ListItem class="flex items-center mb-3">
            <span class="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500 text-white flex items-center justify-center mr-2">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <span>Written in TypeScript for type safety</span>
          </ListItem>
        </List>
      </div>
      
      <div>
        <h3 class="text-lg font-medium mb-2">Custom Definition List</h3>
        <DefinitionList class="divide-y divide-gray-200 dark:divide-gray-700">
          <div class="py-4">
            <ListTerm class="text-lg text-primary-600 dark:text-primary-400">Connect</ListTerm>
            <ListDescription class="italic">A comprehensive design system built with Qwik.</ListDescription>
          </div>
          
          <div class="py-4">
            <ListTerm class="text-lg text-primary-600 dark:text-primary-400">Components</ListTerm>
            <ListDescription class="italic">Pre-built building blocks for rapid development.</ListDescription>
          </div>
          
          <div class="py-4">
            <ListTerm class="text-lg text-primary-600 dark:text-primary-400">Accessibility</ListTerm>
            <ListDescription class="italic">Built with a11y in mind for all users.</ListDescription>
          </div>
        </DefinitionList>
      </div>
    </div>
  )),
};
