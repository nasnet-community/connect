import { component$ } from '@builder.io/qwik';
import { Link, useLocation } from "@builder.io/qwik-city";
import { Card } from "~/components/Core/Card/Card";
import { InlineCode, CodeBlock } from "~/components/Core/Typography/CodeDisplay";
import { HiChevronLeftOutline } from "@qwikest/icons/heroicons";
import CodeExample from '../../../../../../components/Docs/CodeExample';

export default component$(() => {
  const location = useLocation();
  const locale = location.params.locale || "en";
  
  return (
    <div>
      <div class="mb-8">
        <Link 
          href={`/${locale}/docs/components/typography`}
          class="text-blue-500 inline-flex items-center hover:underline"
        >
          <HiChevronLeftOutline class="mr-1 h-5 w-5" />
          Back to Typography
        </Link>
        <h1 class="text-3xl font-bold mt-2 mb-3">Code Display</h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Components for displaying code snippets with syntax highlighting and copy functionality.
        </p>
      </div>

      <Card class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold">Import</h2>
        </div>
        <CodeExample
          code={`import { InlineCode, CodeBlock } from "~/components/Core/Typography/CodeDisplay";`}
          language="tsx"
        />
      </Card>

      {/* Overview */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Component Overview</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-6">
          The Code Display module provides two components for displaying code:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="elevated" class="p-4">
            <h3 class="text-lg font-medium mb-2">InlineCode</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              For displaying short code snippets inline with text.
            </p>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <p class="text-gray-700 dark:text-gray-300">
                Use the <InlineCode>useSignal()</InlineCode> hook to create reactive state.
              </p>
            </div>
          </Card>
          <Card variant="elevated" class="p-4">
            <h3 class="text-lg font-medium mb-2">CodeBlock</h3>
            <p class="text-gray-700 dark:text-gray-300 mb-3">
              For displaying multi-line code snippets with rich features.
            </p>
            <div class="bg-white dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <CodeBlock 
                code={`function greeting(name) {
  return 'Hello, ' + name + '!';
}`}
                language="javascript"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* InlineCode */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">InlineCode Component</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The <InlineCode>InlineCode</InlineCode> component displays short code snippets within text with proper styling.
        </p>
        <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-medium mb-2">Basic Usage</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-3">
                Import and use <InlineCode>InlineCode</InlineCode> inline with your text:
              </p>
              <p class="text-gray-700 dark:text-gray-300">
                To update a signal, use <InlineCode>count.value++</InlineCode> syntax.
              </p>
            </div>
            <div>
              <h3 class="text-lg font-medium mb-2">With No Wrap Option</h3>
              <p class="text-gray-700 dark:text-gray-300 mb-3">
                Prevent long code from wrapping:
              </p>
              <div class="overflow-auto">
                <InlineCode noWrap>const reallyLongVariableName = useStore( {'{'} items: [], settings: {'{}'} {'}'} );</InlineCode>
              </div>
            </div>
          </div>
        </div>
        <CodeExample
          code={`// Basic usage
<p>
  Use the <InlineCode>useSignal()</InlineCode> hook to create reactive state.
</p>

// With no wrap option
<div class="overflow-auto">
  <InlineCode noWrap>
    const reallyLongVariableName = useStore( {'{'} items: [], settings: {'{}'} {'}'} );
  </InlineCode>
</div>`}
          language="tsx"
        />
      </section>

      {/* CodeBlock */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">CodeBlock Component</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The <InlineCode>CodeBlock</InlineCode> component displays multi-line code with syntax highlighting and additional features.
        </p>
        
        {/* Basic Usage */}
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-3">Basic Usage</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <CodeBlock 
              code={`function greeting(name) {
  return 'Hello, ' + name + '!';
}

console.log(greeting('World'));`} 
              language="javascript"
            />
          </div>
          <CodeExample
            code={`<CodeBlock 
  code={\`function greeting(name) {
  return 'Hello, ' + name + '!';
}

console.log(greeting('World'));\`} 
  language="javascript"
/>`}
            language="tsx"
          />
        </div>

        {/* With Line Numbers and Title */}
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-3">With Line Numbers and Title</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <CodeBlock 
              code={`import { component$, useSignal } from '@builder.io/qwik';

export const Counter = component$(() => {
  const count = useSignal(0);
  
  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>
        Increment
      </button>
    </div>
  );
});`} 
              language="typescript"
              showLineNumbers={true}
              title="counter.tsx"
            />
          </div>
          <CodeExample
            code={`<CodeBlock 
  code={\`import { component$, useSignal } from '@builder.io/qwik';

export const Counter = component$(() => {
  const count = useSignal(0);
  
  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>
        Increment
      </button>
    </div>
  );
});\`} 
  language="typescript"
  showLineNumbers={true}
  title="counter.tsx"
/>`}
            language="tsx"
          />
        </div>

        {/* Highlighting Specific Lines */}
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-3">Highlighting Specific Lines</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <CodeBlock 
              code={`import { component$, useSignal } from '@builder.io/qwik';

export const Counter = component$(() => {
  // Create reactive state
  const count = useSignal(0);
  
  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>
        Increment
      </button>
    </div>
  );
});`} 
              language="typescript"
              showLineNumbers={true}
              highlightLines="4,8"
              title="Counter with highlighted lines"
            />
          </div>
          <CodeExample
            code={`<CodeBlock 
  code={codeString} 
  language="typescript"
  showLineNumbers={true}
  highlightLines="4,8"
  title="Counter with highlighted lines"
/>`}
            language="tsx"
          />
        </div>

        {/* Theme Variants */}
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-3">Theme Variants</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <div class="grid grid-cols-1 gap-6">
              <div>
                <h4 class="text-sm font-medium mb-2">Light Theme</h4>
                <CodeBlock 
                  code={`.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}`} 
                  language="css"
                  theme="light"
                  title="styles.css"
                />
              </div>
              <div>
                <h4 class="text-sm font-medium mb-2">Dark Theme</h4>
                <CodeBlock 
                  code={`.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
}`} 
                  language="css"
                  theme="dark"
                  title="styles.css"
                />
              </div>
            </div>
          </div>
          <CodeExample
            code={`// Light theme
<CodeBlock 
  code={cssCode} 
  language="css"
  theme="light"
  title="styles.css"
/>

// Dark theme
<CodeBlock 
  code={cssCode} 
  language="css"
  theme="dark"
  title="styles.css"
/>`}
            language="tsx"
          />
        </div>

        {/* With Caption and Max Height */}
        <div>
          <h3 class="text-lg font-medium mb-3">With Caption and Max Height</h3>
          <div class="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <CodeBlock 
              code={`import { component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export const Clock = component$(() => {
  const time = useSignal(new Date().toLocaleTimeString());
  
  useVisibleTask$(({ cleanup }) => {
    // Update the time every second
    const interval = setInterval(() => {
      time.value = new Date().toLocaleTimeString();
    }, 1000);
    
    // Clean up the interval when the component is unmounted
    cleanup(() => clearInterval(interval));
  });
  
  return <div class="clock">{time.value}</div>;
});\n// More code could appear here but will be hidden due to max height`} 
              language="typescript"
              showLineNumbers={true}
              title="clock.tsx"
              maxHeight="300px"
              caption="A simple clock component that updates every second"
            />
          </div>
          <CodeExample
            code={`<CodeBlock 
  code={longCode} 
  language="typescript"
  showLineNumbers={true}
  title="clock.tsx"
  maxHeight="300px"
  caption="A simple clock component that updates every second"
/>`}
            language="tsx"
          />
        </div>
      </section>

      {/* API Reference */}
      <section class="mb-12">
        <h2 id="api" class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">API Reference</h2>
        
        {/* InlineCode API */}
        <div class="mb-8">
          <h3 class="text-lg font-medium mb-3">InlineCode Component</h3>
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prop</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Default</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">children</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string | JSXNode</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">The code content to display</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">noWrap</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Whether to prevent text wrapping</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">class</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Additional CSS classes</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">id</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">ID attribute</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* CodeBlock API */}
        <div>
          <h3 class="text-lg font-medium mb-3">CodeBlock Component</h3>
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Prop</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Default</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">code</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">(required)</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">The code to display</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">language</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">CodeLanguage</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">"javascript"</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Programming language for syntax highlighting</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">showLineNumbers</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">false</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Whether to show line numbers</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">wrap</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">true</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Whether to enable word wrapping</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">theme</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">CodeTheme</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">"system"</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Visual theme: "light", "dark", or "system"</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">title</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Custom title or filename to display above the code block</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">copyButton</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">true</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Whether to show a copy button</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">highlight</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">boolean</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">true</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Whether to add syntax highlighting</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">highlightLines</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Line numbers to highlight (e.g., "1,3-5,8")</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">maxHeight</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Maximum height before scrolling (e.g., "300px")</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">caption</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Caption to display below the code block</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">class</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">Additional CSS classes</td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">id</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">string</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">-</td>
                <td class="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">ID attribute</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Supported Languages */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Supported Languages</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          The CodeBlock component supports syntax highlighting for numerous languages, including:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 class="text-md font-medium mb-2">JavaScript/TypeScript</h3>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>javascript, js</li>
              <li>typescript, ts</li>
              <li>jsx, tsx</li>
            </ul>
          </div>
          <div>
            <h3 class="text-md font-medium mb-2">Web</h3>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>html</li>
              <li>css, scss, less</li>
              <li>json</li>
            </ul>
          </div>
          <div>
            <h3 class="text-md font-medium mb-2">Backend</h3>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>python, py</li>
              <li>ruby, php, java</li>
              <li>c, cpp, csharp</li>
              <li>go, rust</li>
            </ul>
          </div>
          <div>
            <h3 class="text-md font-medium mb-2">Other</h3>
            <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
              <li>bash, shell</li>
              <li>sql, mysql</li>
              <li>markdown, md</li>
              <li>yaml, yml</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Accessibility */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Accessibility</h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300">
          <p>The CodeDisplay components follow accessibility best practices:</p>
          <ul class="list-disc list-inside pl-4 space-y-2">
            <li>Uses proper semantic HTML elements for code display</li>
            <li>Copy buttons include appropriate ARIA labels</li>
            <li>Sufficient color contrast in both light and dark themes</li>
            <li>Line numbers are properly separated from code content for screen readers</li>
            <li>Focus styles are visible for keyboard navigation</li>
          </ul>
        </div>
      </section>

      {/* Best Practices */}
      <section class="mb-12">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Best Practices</h2>
        <div class="space-y-4 text-gray-700 dark:text-gray-300">
          <ul class="list-disc list-inside pl-4 space-y-2">
            <li>Use <InlineCode>InlineCode</InlineCode> for short snippets within text and <InlineCode>CodeBlock</InlineCode> for multi-line examples</li>
            <li>Add meaningful titles to code blocks to indicate file names or code context</li>
            <li>Use line numbers for longer code samples to make it easier to reference specific parts</li>
            <li>Use the highlightLines prop to draw attention to important parts of the code</li>
            <li>Set a maxHeight for very long code blocks to avoid excessive scrolling</li>
            <li>Add captions to explain what the code examples are demonstrating</li>
            <li>Choose the appropriate language for proper syntax highlighting</li>
          </ul>
        </div>
      </section>
    </div>
  );
}); 