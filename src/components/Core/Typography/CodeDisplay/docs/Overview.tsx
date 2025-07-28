import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";

/**
 * Overview documentation for the CodeDisplay components
 * 
 * The CodeDisplay components provide a comprehensive solution for displaying
 * code snippets with syntax highlighting, line numbers, and copy functionality.
 */
export const Overview = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Introduction */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          CodeDisplay Components
        </h1>
        
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          The CodeDisplay components provide a powerful and flexible way to display code snippets
          throughout your application. Whether you need inline code within text or full code blocks
          with syntax highlighting, these components offer consistent styling, accessibility features,
          and enhanced user experience with copy functionality and theme support.
        </p>
      </section>

      {/* Key Features */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Key Features
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              🎨 Syntax Highlighting
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Support for 30+ programming languages with dynamic loading and fallback
            </p>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              📱 Responsive Design
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Mobile-optimized with horizontal scrolling and touch-friendly copy buttons
            </p>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              🌙 Theme Support
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Light, dark, and system themes with automatic preference detection
            </p>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              📋 Copy Functionality
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              One-click copy with visual feedback and clipboard API support
            </p>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              🔢 Line Numbers
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Optional line numbering with highlight support for specific lines
            </p>
          </div>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h3 class="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
              ⚡ Performance
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Lazy loading of syntax highlighters with Qwik's resumability
            </p>
          </div>
        </div>
      </section>

      {/* Component Types */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Component Types
        </h2>
        
        <div class="space-y-6">
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              InlineCode
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Perfect for displaying short code snippets within paragraphs or text content.
              Use the <InlineCode>InlineCode</InlineCode> component to highlight function names,
              variables, or small code expressions.
            </p>
            <div class="bg-gray-100 dark:bg-gray-800 rounded p-4">
              <p>
                To create a reactive state in Qwik, use the <InlineCode>useSignal()</InlineCode> hook.
                The <InlineCode noWrap>initial_value</InlineCode> parameter is optional.
              </p>
            </div>
          </div>
          
          <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              CodeBlock
            </h3>
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Ideal for displaying larger code snippets with syntax highlighting, line numbers,
              and copy functionality. Supports multiple programming languages and themes.
            </p>
            <CodeBlock
              code={`import { component$, useSignal } from "@builder.io/qwik";

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
              title="Counter.tsx"
              showLineNumbers
              theme="system"
            />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Common Use Cases
        </h2>
        
        <div class="space-y-3">
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Documentation & Tutorials
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Display code examples with syntax highlighting and copy functionality for technical documentation
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              API Reference
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Show function signatures, parameters, and usage examples with proper formatting
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Configuration Examples
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Display JSON, YAML, or other configuration formats with proper syntax highlighting
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Error Messages & Logs
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Show formatted error messages and log outputs with line highlighting for debugging
            </p>
          </div>
          
          <div class="border-l-4 border-blue-500 pl-4">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white mb-1">
              Inline Code References
            </h4>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Highlight variable names, function calls, and short code snippets within text content
            </p>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Best Practices
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-green-600 dark:text-green-400">
              ✓ Do's
            </h3>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li class="flex items-start gap-2">
                <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                <span>Use appropriate language identifiers for syntax highlighting</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                <span>Enable line numbers for longer code blocks ({'>'}10 lines)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                <span>Provide descriptive titles for code blocks when helpful</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                <span>Use maxHeight for very long code blocks to maintain layout</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
                <span>Highlight important lines when demonstrating specific concepts</span>
              </li>
            </ul>
          </div>
          
          <div class="space-y-3">
            <h3 class="text-lg font-semibold text-red-600 dark:text-red-400">
              ✗ Don'ts
            </h3>
            <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li class="flex items-start gap-2">
                <span class="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                <span>Don't use CodeBlock for very short snippets (use InlineCode)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                <span>Avoid disabling the copy button unless there's a strong reason</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                <span>Don't nest CodeDisplay components inside each other</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                <span>Avoid using incorrect language identifiers (breaks highlighting)</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-red-600 dark:text-red-400 mt-0.5">✗</span>
                <span>Don't force light/dark themes unless required by design</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Performance Considerations */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Performance Considerations
        </h2>
        
        <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Lazy Loading & Bundle Optimization
          </h3>
          <ul class="space-y-2 text-sm text-blue-800 dark:text-blue-200">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Syntax highlighters are loaded dynamically only when needed</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Language modules are imported separately to reduce initial bundle size</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Graceful fallback when language highlighting fails to load</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Qwik's resumability ensures minimal runtime overhead</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
});