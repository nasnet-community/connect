import { component$ } from "@builder.io/qwik";
import { ComponentPage } from "~/components/Docs/ComponentPage";
import {
  Overview,
  Examples,
  APIReference,
  Usage,
  Playground,
} from "~/components/Core/DataDisplay/Accordion/docs";
import { Card } from "~/components/Core/Card/Card";
import CodeExample from "~/components/Docs/CodeExample";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "~/components/Core/DataDisplay/Accordion";

export default component$(() => {
  return (
    <ComponentPage
      name="Accordion"
      description="A vertically stacked set of interactive headings that each reveal a section of content."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration="Accordion components can be easily integrated with other Connect components like Card and Form to create structured content areas or form sections that can be expanded or collapsed as needed."
      Customization="The Accordion can be customized by adjusting variants, sizes, animations, and icon positioning. For more advanced customization, you can provide custom icons or modify the styling through CSS variables."
      defaultTab="overview"
    >
      <Card class="mb-8">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-xl font-semibold">Import</h2>
        </div>
        <CodeExample
          code={`import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "~/components/Core/DataDisplay/Accordion";`}
          language="tsx"
        />
      </Card>

      {/* Basic Usage */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Basic Usage
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          The Accordion component provides an interactive way to expand and
          collapse content sections.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <Accordion type="single" defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Qwik?</AccordionTrigger>
              <AccordionContent>
                Qwik is a new kind of web framework that can deliver instant
                loading web applications at any size or complexity. It's
                designed from the ground up for the fastest possible page load
                time.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                How does Qwik differ from other frameworks?
              </AccordionTrigger>
              <AccordionContent>
                Qwik is designed from the ground up for the fastest possible
                page load time. It eliminates the need for hydration by using
                resumability instead, making initial page loads much faster than
                traditional frameworks.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What is resumability?</AccordionTrigger>
              <AccordionContent>
                Resumability is Qwik's ability to continue execution where the
                server left off. Unlike traditional hydration that needs to
                rebuild the component tree and state on the client, Qwik can
                "resume" with minimal JavaScript.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <CodeExample
          code={`<Accordion type="single" defaultValue={['item-1']}>
  <AccordionItem value="item-1">
    <AccordionTrigger>What is Qwik?</AccordionTrigger>
    <AccordionContent>
      Qwik is a new kind of web framework that can deliver instant loading 
      web applications at any size or complexity.
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-2">
    <AccordionTrigger>How does Qwik differ from other frameworks?</AccordionTrigger>
    <AccordionContent>
      Qwik is designed from the ground up for the fastest possible page load time.
    </AccordionContent>
  </AccordionItem>
  
  <AccordionItem value="item-3">
    <AccordionTrigger>What is resumability?</AccordionTrigger>
    <AccordionContent>
      Resumability is Qwik's ability to continue execution where the server left off.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          language="tsx"
        />
      </section>

      {/* Variants */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Variants
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          The Accordion component comes in three visual variants: default,
          bordered, and separated.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-8">
            <div>
              <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Default
              </h3>
              <Accordion
                type="single"
                defaultValue={["default-1"]}
                class="mb-6"
              >
                <AccordionItem value="default-1">
                  <AccordionTrigger>First Item</AccordionTrigger>
                  <AccordionContent>
                    This is the default accordion style with simple dividers
                    between items.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="default-2">
                  <AccordionTrigger>Second Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the second accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Bordered
              </h3>
              <Accordion
                type="single"
                variant="bordered"
                defaultValue={["bordered-1"]}
                class="mb-6"
              >
                <AccordionItem value="bordered-1">
                  <AccordionTrigger>First Item</AccordionTrigger>
                  <AccordionContent>
                    This variant has a border around the entire accordion.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bordered-2">
                  <AccordionTrigger>Second Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the second accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Separated
              </h3>
              <Accordion
                type="single"
                variant="separated"
                defaultValue={["separated-1"]}
              >
                <AccordionItem value="separated-1">
                  <AccordionTrigger>First Item</AccordionTrigger>
                  <AccordionContent>
                    This variant has a border and margin around each individual
                    item.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="separated-2">
                  <AccordionTrigger>Second Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the second accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Default Variant
<Accordion type="single" defaultValue={['default-1']}>
  <AccordionItem value="default-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>
      This is the default accordion style with simple dividers between items.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="default-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>
      Content for the second accordion item.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Bordered Variant
<Accordion type="single" variant="bordered" defaultValue={['bordered-1']}>
  <AccordionItem value="bordered-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>
      This variant has a border around the entire accordion.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="bordered-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>
      Content for the second accordion item.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Separated Variant
<Accordion type="single" variant="separated" defaultValue={['separated-1']}>
  <AccordionItem value="separated-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>
      This variant has a border and margin around each individual item.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="separated-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>
      Content for the second accordion item.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          language="tsx"
        />
      </section>

      {/* Sizes */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Sizes
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Choose from small, medium, or large sizes to match your design needs.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-8">
            <div>
              <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Small (sm)
              </h3>
              <Accordion
                type="single"
                size="sm"
                defaultValue={["sm-1"]}
                class="mb-6"
              >
                <AccordionItem value="sm-1">
                  <AccordionTrigger>Small Accordion Item</AccordionTrigger>
                  <AccordionContent>
                    This is a small size accordion with compact spacing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="sm-2">
                  <AccordionTrigger>Another Small Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the second accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Medium (md) - Default
              </h3>
              <Accordion
                type="single"
                size="md"
                defaultValue={["md-1"]}
                class="mb-6"
              >
                <AccordionItem value="md-1">
                  <AccordionTrigger>Medium Accordion Item</AccordionTrigger>
                  <AccordionContent>
                    This is the default size for the accordion component.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="md-2">
                  <AccordionTrigger>Another Medium Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the second accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Large (lg)
              </h3>
              <Accordion type="single" size="lg" defaultValue={["lg-1"]}>
                <AccordionItem value="lg-1">
                  <AccordionTrigger>Large Accordion Item</AccordionTrigger>
                  <AccordionContent>
                    This is a large size accordion with generous spacing.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="lg-2">
                  <AccordionTrigger>Another Large Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the second accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Small Size
<Accordion type="single" size="sm" defaultValue={['sm-1']}>
  <AccordionItem value="sm-1">
    <AccordionTrigger>Small Accordion Item</AccordionTrigger>
    <AccordionContent>
      This is a small size accordion with compact spacing.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Medium Size (Default)
<Accordion type="single" size="md" defaultValue={['md-1']}>
  <AccordionItem value="md-1">
    <AccordionTrigger>Medium Accordion Item</AccordionTrigger>
    <AccordionContent>
      This is the default size for the accordion component.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Large Size
<Accordion type="single" size="lg" defaultValue={['lg-1']}>
  <AccordionItem value="lg-1">
    <AccordionTrigger>Large Accordion Item</AccordionTrigger>
    <AccordionContent>
      This is a large size accordion with generous spacing.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          language="tsx"
        />
      </section>

      {/* Single vs Multiple Expansion */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Single vs Multiple Expansion
        </h2>
        <p class="mb-4 text-gray-700 dark:text-gray-300">
          Control whether users can expand multiple items at once or just one
          item at a time.
        </p>
        <div class="mb-4 rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div class="space-y-8">
            <div>
              <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Single Expansion
              </h3>
              <p class="mb-4 text-gray-600 dark:text-gray-400">
                Only one item can be expanded at a time.
              </p>
              <Accordion type="single" defaultValue={["single-1"]} class="mb-6">
                <AccordionItem value="single-1">
                  <AccordionTrigger>First Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the first accordion item.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="single-2">
                  <AccordionTrigger>Second Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the second accordion item.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="single-3">
                  <AccordionTrigger>Third Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the third accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div>
              <h3 class="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">
                Multiple Expansion
              </h3>
              <p class="mb-4 text-gray-600 dark:text-gray-400">
                Multiple items can be expanded simultaneously.
              </p>
              <Accordion type="multiple" defaultValue={["multi-1", "multi-3"]}>
                <AccordionItem value="multi-1">
                  <AccordionTrigger>First Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the first accordion item.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="multi-2">
                  <AccordionTrigger>Second Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the second accordion item.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="multi-3">
                  <AccordionTrigger>Third Item</AccordionTrigger>
                  <AccordionContent>
                    Content for the third accordion item.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Single Expansion (Only one item open at a time)
<Accordion type="single" defaultValue={['single-1']}>
  <AccordionItem value="single-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>
      Content for the first accordion item.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="single-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>
      Content for the second accordion item.
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Multiple Expansion (Multiple items can be open)
<Accordion type="multiple" defaultValue={['multi-1', 'multi-3']}>
  <AccordionItem value="multi-1">
    <AccordionTrigger>First Item</AccordionTrigger>
    <AccordionContent>
      Content for the first accordion item.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="multi-2">
    <AccordionTrigger>Second Item</AccordionTrigger>
    <AccordionContent>
      Content for the second accordion item.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="multi-3">
    <AccordionTrigger>Third Item</AccordionTrigger>
    <AccordionContent>
      Content for the third accordion item.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          language="tsx"
        />
      </section>

      {/* API Reference */}
      <section class="mb-12">
        <h2
          id="api"
          class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100"
        >
          API Reference
        </h2>

        <h3 class="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          Accordion Props
        </h3>
        <Card variant="elevated" class="mb-8 overflow-hidden">
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="grid grid-cols-5 gap-4 bg-gray-50 p-4 font-medium dark:bg-gray-800">
              <div class="col-span-1">Prop</div>
              <div class="col-span-2">Type</div>
              <div class="col-span-1">Default</div>
              <div class="col-span-1">Description</div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">variant</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                'default' | 'bordered' | 'separated'
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                'default'
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Visual style of the accordion
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 bg-gray-50 p-4 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">size</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                'sm' | 'md' | 'lg'
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                'md'
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Size of the accordion
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">type</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                'single' | 'multiple'
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                'single'
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Whether to allow single or multiple items to be open
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 bg-gray-50 p-4 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">iconPosition</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                'start' | 'end'
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                'end'
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Position of the expand/collapse icon
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">defaultValue</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string[]
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                []
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Initial expanded item values
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 bg-gray-50 p-4 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">value</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                Signal{`<string[]>`}
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                -
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Controlled expanded item values
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">onValueChange$</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                Function
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                -
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Change handler for controlled usage
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 bg-gray-50 p-4 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">disabled</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                boolean
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                false
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Disables all accordion items
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">collapsible</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                boolean
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                true
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Whether to allow all items to be closed (only for type="single")
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 bg-gray-50 p-4 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">animation</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                'slide' | 'fade' | 'scale' | 'none'
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                'slide'
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Animation type for expanding/collapsing
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">animationDuration</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                number
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                300
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Animation duration in milliseconds
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 bg-gray-50 p-4 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">class</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                ''
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Additional CSS classes
              </div>
            </div>
          </div>
        </Card>

        <h3 class="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          AccordionItem Props
        </h3>
        <Card variant="elevated" class="mb-8 overflow-hidden">
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="grid grid-cols-5 gap-4 bg-gray-50 p-4 font-medium dark:bg-gray-800">
              <div class="col-span-1">Prop</div>
              <div class="col-span-2">Type</div>
              <div class="col-span-1">Default</div>
              <div class="col-span-1">Description</div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">value</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                required
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Unique identifier for the item
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 bg-gray-50 p-4 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">disabled</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                boolean
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                false
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Disables this specific item
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">class</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                ''
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Additional CSS classes
              </div>
            </div>
          </div>
        </Card>

        <h3 class="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          AccordionTrigger Props
        </h3>
        <Card variant="elevated" class="mb-8 overflow-hidden">
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="grid grid-cols-5 gap-4 bg-gray-50 p-4 font-medium dark:bg-gray-800">
              <div class="col-span-1">Prop</div>
              <div class="col-span-2">Type</div>
              <div class="col-span-1">Default</div>
              <div class="col-span-1">Description</div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">hideIcon</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                boolean
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                false
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Hides the expand/collapse icon
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 bg-gray-50 p-4 dark:bg-gray-800">
              <div class="col-span-1 font-mono text-sm">icon</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                JSX
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                -
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Custom icon element
              </div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">class</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                ''
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Additional CSS classes
              </div>
            </div>
          </div>
        </Card>

        <h3 class="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          AccordionContent Props
        </h3>
        <Card variant="elevated" class="overflow-hidden">
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div class="grid grid-cols-5 gap-4 bg-gray-50 p-4 font-medium dark:bg-gray-800">
              <div class="col-span-1">Prop</div>
              <div class="col-span-2">Type</div>
              <div class="col-span-1">Default</div>
              <div class="col-span-1">Description</div>
            </div>

            <div class="grid grid-cols-5 items-center gap-4 p-4">
              <div class="col-span-1 font-mono text-sm">class</div>
              <div class="col-span-2 font-mono text-sm text-gray-600 dark:text-gray-300">
                string
              </div>
              <div class="col-span-1 font-mono text-sm text-gray-600 dark:text-gray-300">
                ''
              </div>
              <div class="col-span-1 text-sm text-gray-600 dark:text-gray-300">
                Additional CSS classes
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Accessibility */}
      <section class="mb-12">
        <h2 class="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Accessibility
        </h2>
        <Card variant="elevated">
          <div class="prose max-w-none dark:prose-invert">
            <p>
              The Accordion component follows WAI-ARIA Accordion Pattern for
              maximum accessibility:
            </p>
            <ul>
              <li>
                Proper ARIA roles are automatically applied (button, region,
                etc.)
              </li>
              <li>
                Accordion headers are implemented as buttons for keyboard
                navigation
              </li>
              <li>aria-expanded attributes indicate the open/closed state</li>
              <li>
                aria-controls associates the header with its controlled panel
              </li>
              <li>
                Keyboard navigation is fully supported:
                <ul>
                  <li>Enter or Space: Toggles the accordion item</li>
                  <li>
                    Tab: Moves focus between accordion headers and other
                    focusable elements
                  </li>
                  <li>
                    Arrow Keys: When implementing keyboard navigation between
                    accordion headers
                  </li>
                </ul>
              </li>
            </ul>

            <h3 class="mt-4 text-lg font-medium">Best Practices</h3>
            <ul>
              <li>
                Always provide descriptive, concise headers for accordion items
              </li>
              <li>Use semantic HTML within accordion content</li>
              <li>
                Consider whether single or multiple expansion mode is more
                appropriate for your content
              </li>
              <li>Set logical default open states for important information</li>
              <li>Ensure sufficient contrast for focus indicators</li>
              <li>
                Use animations judiciously, and consider users who prefer
                reduced motion
              </li>
            </ul>
          </div>
        </Card>
      </section>
    </ComponentPage>
  );
});
