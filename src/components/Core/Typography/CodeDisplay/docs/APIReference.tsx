import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";

/**
 * API Reference documentation for the CodeDisplay components
 * 
 * Comprehensive documentation of all props, types, and interfaces
 * for both CodeBlock and InlineCode components.
 */
export const APIReference = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          API Reference
        </h1>
        
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Complete API documentation for the CodeDisplay components including all available
          props, types, and usage patterns.
        </p>
      </section>

      {/* CodeBlock Component */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          CodeBlock Component
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            The <InlineCode>CodeBlock</InlineCode> component displays formatted code with syntax highlighting,
            line numbers, and copy functionality.
          </p>
          
          <CodeBlock
            code={`import { CodeBlock } from "~/components/Core/Typography";

<CodeBlock
  code="const message = 'Hello, World!';"
  language="javascript"
  showLineNumbers
  theme="system"
  title="Example"
  copyButton={true}
  highlight={true}
  highlightLines="1,3-5"
  maxHeight="400px"
  caption="Simple greeting function"
/>`}
            language="tsx"
            title="CodeBlock Usage"
          />
        </div>

        {/* CodeBlock Props Table */}
        <div class="overflow-x-auto">
          <table class="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead class="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th class="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Prop
                </th>
                <th class="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Type
                </th>
                <th class="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Default
                </th>
                <th class="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">code</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">required</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">The code content to display</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">language</td>
                <td class="p-4 font-mono text-sm">CodeLanguage</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">"javascript"</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Programming language for syntax highlighting</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">showLineNumbers</td>
                <td class="p-4 font-mono text-sm">boolean</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">false</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Display line numbers alongside code</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">wrap</td>
                <td class="p-4 font-mono text-sm">boolean</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">true</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Enable code wrapping instead of horizontal scroll</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">theme</td>
                <td class="p-4 font-mono text-sm">CodeTheme</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">"system"</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Color theme: "light" | "dark" | "system"</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">title</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">undefined</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Optional title/filename displayed above code</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">copyButton</td>
                <td class="p-4 font-mono text-sm">boolean</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">true</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Show copy-to-clipboard button</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">highlight</td>
                <td class="p-4 font-mono text-sm">boolean</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">true</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Enable syntax highlighting</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">highlightLines</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">undefined</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Comma-separated line numbers/ranges to highlight (e.g., "1,3-5,8")</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">maxHeight</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">undefined</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Maximum height with scroll (e.g., "400px")</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">caption</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">undefined</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Optional caption displayed below code</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">class</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">""</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Additional CSS classes</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">id</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">undefined</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">HTML id attribute</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">onCopy$</td>
                <td class="p-4 font-mono text-sm">QRL&lt;() =&gt; void&gt;</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">undefined</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Callback fired when code is copied</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* InlineCode Component */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          InlineCode Component
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            The <InlineCode>InlineCode</InlineCode> component displays short code snippets within text content
            with consistent monospace styling and background highlighting.
          </p>
          
          <CodeBlock
            code={`import { InlineCode } from "~/components/Core/Typography";

<p>
  Use the <InlineCode>useState</InlineCode> hook to manage component state.
  For longer variable names, you can use <InlineCode noWrap>very_long_variable_name</InlineCode>.
</p>`}
            language="tsx"
            title="InlineCode Usage"
          />
        </div>

        {/* InlineCode Props Table */}
        <div class="overflow-x-auto">
          <table class="w-full text-sm border border-gray-200 dark:border-gray-700 rounded-lg">
            <thead class="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th class="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Prop
                </th>
                <th class="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Type
                </th>
                <th class="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Default
                </th>
                <th class="text-left p-4 font-semibold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                  Description
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">children</td>
                <td class="p-4 font-mono text-sm">string | JSXNode</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">undefined</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">The code content to display</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">class</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">""</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Additional CSS classes</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">id</td>
                <td class="p-4 font-mono text-sm">string</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">undefined</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">HTML id attribute</td>
              </tr>
              <tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="p-4 font-mono text-sm text-blue-600 dark:text-blue-400">noWrap</td>
                <td class="p-4 font-mono text-sm">boolean</td>
                <td class="p-4 text-sm text-gray-600 dark:text-gray-400">false</td>
                <td class="p-4 text-sm text-gray-700 dark:text-gray-300">Prevent text wrapping (whitespace-nowrap)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Type Definitions */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Type Definitions
        </h2>

        {/* CodeTheme */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            CodeTheme
          </h3>
          
          <CodeBlock
            code={`type CodeTheme = "light" | "dark" | "system";`}
            language="typescript"
            title="CodeTheme Type"
          />
          
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li><InlineCode>"light"</InlineCode> - Force light theme</li>
              <li><InlineCode>"dark"</InlineCode> - Force dark theme</li>
              <li><InlineCode>"system"</InlineCode> - Follow system preference (default)</li>
            </ul>
          </div>
        </div>

        {/* CodeLanguage */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            CodeLanguage
          </h3>
          
          <CodeBlock
            code={`type CodeLanguage =
  | "bash" | "c" | "cpp" | "csharp" | "css" | "diff"
  | "go" | "graphql" | "html" | "java" | "javascript" | "js"
  | "json" | "jsx" | "kotlin" | "less" | "markdown" | "md"
  | "mysql" | "objectivec" | "perl" | "php" | "python" | "py"
  | "ruby" | "rust" | "scala" | "scss" | "shell" | "sql"
  | "swift" | "typescript" | "ts" | "tsx" | "yaml" | "yml";`}
            language="typescript"
            title="CodeLanguage Type"
          />
          
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p class="text-sm text-blue-800 dark:text-blue-200 mb-2">
              <strong>Language Aliases:</strong>
            </p>
            <ul class="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li><InlineCode>"js"</InlineCode> → <InlineCode>"javascript"</InlineCode></li>
              <li><InlineCode>"ts"</InlineCode> → <InlineCode>"typescript"</InlineCode></li>
              <li><InlineCode>"py"</InlineCode> → <InlineCode>"python"</InlineCode></li>
              <li><InlineCode>"md"</InlineCode> → <InlineCode>"markdown"</InlineCode></li>
              <li><InlineCode>"yml"</InlineCode> → <InlineCode>"yaml"</InlineCode></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advanced Usage */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Advanced Usage
        </h2>

        {/* Line Highlighting */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Line Highlighting Syntax
          </h3>
          
          <div class="space-y-4">
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Single Lines
              </h4>
              <CodeBlock
                code={`highlightLines="3"`}
                language="typescript"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Highlights line 3
              </p>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Multiple Lines
              </h4>
              <CodeBlock
                code={`highlightLines="1,5,9"`}
                language="typescript"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Highlights lines 1, 5, and 9
              </p>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Line Ranges
              </h4>
              <CodeBlock
                code={`highlightLines="3-7"`}
                language="typescript"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Highlights lines 3 through 7
              </p>
            </div>
            
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 class="font-semibold text-gray-900 dark:text-white mb-2">
                Combined Syntax
              </h4>
              <CodeBlock
                code={`highlightLines="1,3-5,8,10-12"`}
                language="typescript"
              />
              <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Highlights line 1, lines 3-5, line 8, and lines 10-12
              </p>
            </div>
          </div>
        </div>

        {/* Custom Event Handling */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Custom Copy Event Handling
          </h3>
          
          <CodeBlock
            code={`import { $, useSignal } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography";

export const MyComponent = component$(() => {
  const copyCount = useSignal(0);
  
  const handleCopy$ = $(() => {
    copyCount.value++;
    console.log(\`Code copied \${copyCount.value} times\`);
    // Track analytics, show notifications, etc.
  });
  
  return (
    <div>
      <CodeBlock
        code="console.log('Hello, World!');"
        language="javascript"
        onCopy$={handleCopy$}
      />
      <p>Copied {copyCount.value} times</p>
    </div>
  );
});`}
            language="tsx"
            title="Custom Copy Handler"
            showLineNumbers
            highlightLines="7-11"
          />
        </div>
      </section>
    </div>
  );
});