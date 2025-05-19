import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from "@builder.io/qwik-city";
import { Card } from "~/components/Core/Card/Card";
import { Container } from "~/components/Core/Form/Container";
import { HiChevronLeftOutline } from "@qwikest/icons/heroicons";
import CodeExample from '../../../../../../components/Docs/CodeExample';

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  
  return (
    <div>
      <div class="mb-8">
        <Link 
          href={`/${locale}/docs/components/form`}
          class="text-blue-500 inline-flex items-center hover:underline"
        >
          <HiChevronLeftOutline class="mr-1 h-5 w-5" />
          Back to Form Components
        </Link>
        <h1 class="text-3xl font-bold mt-2 mb-3">Form Container</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          A wrapper component for form elements providing consistent spacing and layout.
        </p>
      </div>

      <Card class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Import</h2>
        </div>
        <CodeExample
          code={`import { Container } from "~/components/Core/Form/Container";`}
          language="tsx"
        />
      </Card>
      
      {/* Basic Usage */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Basic Usage</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The Container component provides a consistent wrapper for form sections with optional title, description, and border styling.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <Container title="Personal Information" description="Please provide your personal details.">
            <div class="grid gap-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="name">Name</label>
                <input
                  type="text"
                  id="name"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1" for="email">Email</label>
                <input
                  type="email"
                  id="email"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                  placeholder="john@example.com"
                />
              </div>
            </div>
          </Container>
        </div>
        <CodeExample
          code={`<Container 
  title="Personal Information" 
  description="Please provide your personal details."
>
  <div class="grid gap-4">
    <div>
      <label class="block text-sm font-medium mb-1" for="name">Name</label>
      <input
        type="text"
        id="name"
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
        placeholder="John Doe"
      />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1" for="email">Email</label>
      <input
        type="email"
        id="email"
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
        placeholder="john@example.com"
      />
    </div>
  </div>
</Container>`}
          language="tsx"
        />
      </section>

      {/* Variants */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Variants</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The Container component can be used with or without a border.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">With Border (Default)</h3>
              <Container 
                title="Bordered Container" 
                description="This container has a border."
                bordered={true}
              >
                <p class="text-gray-700 dark:text-gray-300">Content goes here</p>
              </Container>
            </div>
            
            <div>
              <h3 class="text-lg font-medium mb-2">Without Border</h3>
              <Container 
                title="Borderless Container" 
                description="This container has no border."
                bordered={false}
              >
                <p class="text-gray-700 dark:text-gray-300">Content goes here</p>
              </Container>
            </div>
          </div>
        </div>
        <CodeExample
          code={`{/* With Border (Default) */}
<Container 
  title="Bordered Container" 
  description="This container has a border."
  bordered={true}
>
  <p>Content goes here</p>
</Container>

{/* Without Border */}
<Container 
  title="Borderless Container" 
  description="This container has no border."
  bordered={false}
>
  <p>Content goes here</p>
</Container>`}
          language="tsx"
        />
      </section>

      {/* Using Slots */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Using Slots</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The Container component supports a default slot for content and a named slot for footer content.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <Container 
            title="Form with Footer" 
            description="This form uses the footer slot for buttons."
          >
            <div class="grid gap-4">
              <div>
                <label class="block text-sm font-medium mb-1" for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
                />
              </div>
            </div>
            
            <div q:slot="footer" class="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
            </div>
          </Container>
        </div>
        <CodeExample
          code={`<Container 
  title="Form with Footer" 
  description="This form uses the footer slot for buttons."
>
  <div class="grid gap-4">
    <div>
      <label class="block text-sm font-medium mb-1" for="username">Username</label>
      <input
        type="text"
        id="username"
        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md"
      />
    </div>
  </div>
  
  <div q:slot="footer" class="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
    <button class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md">Cancel</button>
    <button class="px-4 py-2 bg-blue-500 text-white rounded-md">Submit</button>
  </div>
</Container>`}
          language="tsx"
        />
      </section>

      {/* Without Title or Description */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Without Title or Description</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The Container component can be used without title or description to create simple content sections.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <Container>
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p class="text-gray-700 dark:text-gray-300">This container has no title or description but provides consistent spacing and border styling.</p>
            </div>
          </Container>
        </div>
        <CodeExample
          code={`<Container>
  <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
    <p>This container has no title or description but provides consistent spacing and border styling.</p>
  </div>
</Container>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section class="mb-12">
        <h2 id="api" class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">API Reference</h2>
        <Card variant="elevated" class="overflow-hidden">
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="p-4 grid grid-cols-5 gap-4 font-medium bg-gray-50 dark:bg-gray-800">
              <div class="col-span-1">Prop</div>
              <div class="col-span-2">Type</div>
              <div class="col-span-1">Default</div>
              <div class="col-span-1">Description</div>
            </div>
            
            <div class="p-4 grid grid-cols-5 gap-4 items-center">
              <div class="col-span-1 font-mono text-sm">title</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">undefined</div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">Optional title for the container</div>
            </div>
            
            <div class="p-4 grid grid-cols-5 gap-4 items-center bg-gray-50 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">description</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">undefined</div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">Optional description text</div>
            </div>
            
            <div class="p-4 grid grid-cols-5 gap-4 items-center">
              <div class="col-span-1 font-mono text-sm">bordered</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                boolean
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">true</div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">Whether to show a border</div>
            </div>
            
            <div class="p-4 grid grid-cols-5 gap-4 items-center bg-gray-50 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">class</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">undefined</div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">Additional CSS classes</div>
            </div>
          </div>
        </Card>
      </section>

      {/* Slots */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Slots</h2>
        <Card variant="elevated" class="overflow-hidden">
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="p-4 grid grid-cols-4 gap-4 font-medium bg-gray-50 dark:bg-gray-800">
              <div class="col-span-1">Name</div>
              <div class="col-span-3">Description</div>
            </div>
            
            <div class="p-4 grid grid-cols-4 gap-4 items-center">
              <div class="col-span-1 font-mono text-sm">default</div>
              <div class="col-span-3 text-sm text-gray-600 dark:text-gray-300">
                The main content area of the container
              </div>
            </div>
            
            <div class="p-4 grid grid-cols-4 gap-4 items-center bg-gray-50 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">footer</div>
              <div class="col-span-3 text-sm text-gray-600 dark:text-gray-300">
                Optional footer content, typically used for action buttons
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Accessibility */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Accessibility</h2>
        <Card variant="elevated">
          <div class="prose dark:prose-invert max-w-none">
            <p>
              The Container component follows accessibility best practices:
            </p>
            <ul>
              <li>Titles use semantic heading elements (h3) for proper document structure</li>
              <li>Color contrast meets WCAG AA standards for readability</li>
              <li>Logical document structure is maintained for screen readers</li>
            </ul>
            
            <h3 class="text-lg font-medium mt-4">Best Practices</h3>
            <ul>
              <li>Use descriptive titles that clearly indicate the purpose of the contained form section</li>
              <li>Provide helpful descriptions that guide users on how to complete the form</li>
              <li>Maintain consistent usage across your application for predictable user experience</li>
              <li>When including footer actions, ensure they follow a logical tab order</li>
            </ul>
          </div>
        </Card>
      </section>
    </div>
  );
}); 