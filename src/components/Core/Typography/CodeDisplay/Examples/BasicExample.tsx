import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";

/**
 * Basic Example - Demonstrates fundamental CodeBlock and InlineCode usage
 */
export const BasicExample = component$(() => {
  const simpleCode = `function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`;

  return (
    <div class="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Basic Code Display</h2>
        
        <p class="text-gray-600 dark:text-gray-400">
          This example shows the basic usage of CodeBlock and InlineCode components for displaying code snippets.
        </p>
      </div>

      {/* Inline Code Examples */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Inline Code</h3>
        
        <div class="space-y-2">
          <p class="text-gray-700 dark:text-gray-300">
            Use <InlineCode>npm install</InlineCode> to install dependencies, or run <InlineCode>npm run dev</InlineCode> to start the development server.
          </p>
          
          <p class="text-gray-700 dark:text-gray-300">
            The <InlineCode>useState</InlineCode> hook manages component state, while <InlineCode>useEffect</InlineCode> handles side effects.
          </p>
          
          <p class="text-gray-700 dark:text-gray-300">
            Configure your API endpoint: <InlineCode noWrap>https://api.example.com/v1/users</InlineCode>
          </p>
        </div>
      </div>

      {/* Basic Code Block */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Code Block</h3>
        
        <CodeBlock
          code={simpleCode}
          language="javascript"
        />
      </div>

      {/* Code Block without highlighting */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Plain Code Block</h3>
        
        <CodeBlock
          code={simpleCode}
          language="javascript"
          highlight={false}
          copyButton={false}
        />
      </div>

      {/* Code Block with line numbers */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Code Block with Line Numbers</h3>
        
        <CodeBlock
          code={simpleCode}
          language="javascript"
          showLineNumbers={true}
        />
      </div>

      <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded border-l-4 border-blue-500">
        <p class="text-sm text-blue-700 dark:text-blue-300">
          <strong>💡 Tip:</strong> Use InlineCode for short code snippets within text, and CodeBlock for multi-line code examples. Both support dark mode automatically.
        </p>
      </div>
    </div>
  );
});

export default BasicExample;