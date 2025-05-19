import { component$ } from '@builder.io/qwik';
import { CodeBlock, UsageTemplate } from '~/components/Docs/templates';

export default component$(() => {
  return (
    <UsageTemplate title="Flex">
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Installation</h2>
        <p class="mb-4">
          The Flex component is part of the Core Layout components in the Connect
          design system. Import it directly from the layout components:
        </p>
        <CodeBlock
          code={`import { Flex, FlexItem } from '~/components/Core/Layout/Flex';`}
        />
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Basic Usage</h2>
        <p class="mb-4">
          The Flex component creates a flexible box layout. By default, it arranges
          items in a row:
        </p>
        <CodeBlock
          code={`
<Flex>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>
          `}
        />
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Responsive Properties</h2>
        <p class="mb-4">
          All Flex properties can be set responsively to adapt to different screen
          sizes:
        </p>
        <CodeBlock
          code={`
// Column layout on mobile, row layout on medium screens and up
<Flex 
  direction={{ base: 'column', md: 'row' }}
  gap={{ base: 'sm', md: 'lg' }}
  align={{ base: 'stretch', md: 'center' }}
>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>
          `}
        />
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Using FlexItem</h2>
        <p class="mb-4">
          The FlexItem component can be used to configure individual items within
          a Flex container:
        </p>
        <CodeBlock
          code={`
<Flex>
  {/* This item will grow to fill available space */}
  <FlexItem grow={1}>
    <div>Flexible Item</div>
  </FlexItem>
  
  {/* This item will stay at its natural size */}
  <FlexItem>
    <div>Fixed Item</div>
  </FlexItem>
  
  {/* This item will grow twice as much as the first item */}
  <FlexItem grow={2}>
    <div>Extra Flexible Item</div>
  </FlexItem>
</Flex>
          `}
        />
      </div>

      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Common Layout Patterns</h2>
        
        <h3 class="text-lg font-medium mb-2 mt-6">Centered content:</h3>
        <CodeBlock
          code={`
<Flex justify="center" align="center" class="h-64">
  <div>Centered Content</div>
</Flex>
          `}
        />
        
        <h3 class="text-lg font-medium mb-2 mt-6">Navigation bar:</h3>
        <CodeBlock
          code={`
<Flex justify="between" align="center" class="p-4">
  <div>Logo</div>
  
  <Flex gap="md">
    <div>Link 1</div>
    <div>Link 2</div>
    <div>Link 3</div>
  </Flex>
  
  <div>Profile</div>
</Flex>
          `}
        />
        
        <h3 class="text-lg font-medium mb-2 mt-6">Holy grail layout:</h3>
        <CodeBlock
          code={`
<Flex direction="column" class="h-screen">
  <div class="p-4">Header</div>
  
  <Flex grow={1}>
    <div class="p-4 w-64">Sidebar</div>
    <div class="p-4 flex-grow">Main Content</div>
    <div class="p-4 w-64">Right Sidebar</div>
  </Flex>
  
  <div class="p-4">Footer</div>
</Flex>
          `}
        />
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-4">Accessibility Considerations</h2>
        <ul class="list-disc pl-6 space-y-2">
          <li>
            Consider using semantic HTML elements with the <code>as</code> prop
            when appropriate (e.g., <code>as="nav"</code>)
          </li>
          <li>
            When building layouts with Flex, ensure that the visual order matches the
            DOM order for consistent keyboard navigation experience
          </li>
          <li>
            If you change the visual order with <code>order</code> property, be
            aware that it may affect the tab order, potentially confusing keyboard users
          </li>
          <li>
            For RTL language support, enable the <code>supportRtl</code> prop (enabled by default)
          </li>
        </ul>
      </div>
    </UsageTemplate>
  );
});
