import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";

/**
 * Usage documentation for the CodeDisplay components
 * 
 * Implementation patterns, guidelines, and best practices for using
 * the CodeDisplay components effectively in real-world applications.
 */
export const Usage = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Usage Guidelines
        </h1>
        
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Learn how to effectively implement the CodeDisplay components in your Qwik applications
          with practical examples and proven patterns for common use cases.
        </p>
      </section>

      {/* Installation & Setup */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Installation & Setup
        </h2>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Import Components
          </h3>
          
          <CodeBlock
            code={`// Import both components
import { CodeBlock, InlineCode } from "~/components/Core/Typography";

// Or import individually
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";
import { InlineCode } from "~/components/Core/Typography/CodeDisplay";

// Import types for TypeScript
import type { CodeBlockProps, InlineCodeProps } from "~/components/Core/Typography";`}
            language="typescript"
            title="Import Examples"
            showLineNumbers
          />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Basic Usage Patterns
          </h3>
          
          <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
              Quick Start Template
            </h4>
            
            <CodeBlock
              code={`import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "~/components/Core/Typography";

export const DocumentationPage = component$(() => {
  return (
    <article class="prose dark:prose-invert">
      <h1>API Documentation</h1>
      
      <p>
        To use the API, call the <InlineCode>fetchUser()</InlineCode> function
        with a valid user ID.
      </p>
      
      <CodeBlock
        code="const user = await fetchUser(123);"
        language="javascript"
        title="Example Usage"
      />
    </article>
  );
});`}
              language="tsx"
              title="DocumentationPage.tsx"
              showLineNumbers
            />
          </div>
        </div>
      </section>

      {/* Common Implementation Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Common Implementation Patterns
        </h2>

        {/* Dynamic Code Content */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Dynamic Code Content
          </h3>
          
          <CodeBlock
            code={`import { component$, useSignal } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography";

export const CodeExamples = component$(() => {
  const selectedExample = useSignal("basic");
  
  const examples = {
    basic: \`const count = useSignal(0);\`,
    advanced: \`const state = useStore({
  count: 0,
  name: "example"
});\`,
    hooks: \`const resource = useResource$(async ({ track }) => {
  track(() => count.value);
  return fetchData(count.value);
});\`
  };
  
  return (
    <div class="space-y-4">
      <select 
        value={selectedExample.value}
        onChange$={(e) => selectedExample.value = e.target.value}
        class="p-2 border rounded"
      >
        <option value="basic">Basic Example</option>
        <option value="advanced">Advanced Example</option>
        <option value="hooks">Hooks Example</option>
      </select>
      
      <CodeBlock
        code={examples[selectedExample.value]}
        language="typescript"
        title={\`\${selectedExample.value}.ts\`}
        showLineNumbers
      />
    </div>
  );
});`}
            language="tsx"
            title="Dynamic Code Examples"
            showLineNumbers
            highlightLines="6-14,23-28"
          />
        </div>

        {/* Code Comparison */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Before/After Code Comparison
          </h3>
          
          <CodeBlock
            code={`export const CodeComparison = component$(() => {
  return (
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Before */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-red-600">❌ Before</h3>
        <CodeBlock
          code={\`class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>+</button>
      </div>
    );
  }
}\`}
          language="javascript"
          title="React Class Component"
          theme="light"
        />
      </div>
      
      {/* After */}
      <div class="space-y-2">
        <h3 class="text-lg font-semibold text-green-600">✅ After</h3>
        <CodeBlock
          code={\`export const Component = component$(() => {
  const count = useSignal(0);
  
  return (
    <div>
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>+</button>
    </div>
  );
});\`}
          language="typescript"
          title="Qwik Component"
          theme="light"
        />
      </div>
    </div>
  );
});`}
            language="tsx"
            title="Before/After Comparison Component"
            showLineNumbers
          />
        </div>

        {/* Step-by-Step Tutorial */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Step-by-Step Tutorial
          </h3>
          
          <CodeBlock
            code={`export const TutorialSteps = component$(() => {
  const steps = [
    {
      title: "1. Create the component",
      code: \`export const Counter = component$(() => {
  // Component logic here
});\`,
      language: "typescript"
    },
    {
      title: "2. Add reactive state",
      code: \`export const Counter = component$(() => {
  const count = useSignal(0);
  
  // Component logic here
});\`,
      language: "typescript",
      highlightLines: "2"
    },
    {
      title: "3. Implement the UI",
      code: \`export const Counter = component$(() => {
  const count = useSignal(0);
  
  return (
    <div class="counter">
      <p>Count: {count.value}</p>
      <button onClick$={() => count.value++}>
        Increment
      </button>
    </div>
  );
});\`,
      language: "typescript",
      highlightLines: "4-11"
    }
  ];
  
  return (
    <div class="space-y-8">
      <h2 class="text-2xl font-bold">Building a Counter Component</h2>
      
      {steps.map((step, index) => (
        <div key={index} class="border-l-4 border-blue-500 pl-6">
          <h3 class="text-lg font-semibold mb-4">{step.title}</h3>
          <CodeBlock
            code={step.code}
            language={step.language}
            highlightLines={step.highlightLines}
            title={\`Step \${index + 1}\`}
            showLineNumbers
          />
        </div>
      ))}
    </div>
  );
});`}
            language="tsx"
            title="Tutorial Steps Component"
            showLineNumbers
            maxHeight="500px"
          />
        </div>
      </section>

      {/* Accessibility Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Accessibility Patterns
        </h2>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Screen Reader Friendly Code Blocks
          </h3>
          
          <CodeBlock
            code={`export const AccessibleCodeBlock = component$(() => {
  return (
    <section aria-labelledby="code-example-heading">
      <h3 id="code-example-heading">
        API Authentication Example
      </h3>
      
      <p>
        The following code demonstrates how to authenticate 
        with our API using a bearer token:
      </p>
      
      <CodeBlock
        code={\`const response = await fetch('/api/data', {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
});\`}
        language="javascript"
        title="API Authentication"
        caption="This example shows proper header configuration for API requests"
        id="auth-example"
      />
      
      <p>
        The <InlineCode>Authorization</InlineCode> header must include 
        the word "Bearer" followed by your API token.
      </p>
    </section>
  );
});`}
            language="tsx"
            title="Accessible Documentation Pattern"
            showLineNumbers
            highlightLines="2,4-6,19,25-27"
          />
        </div>

        <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h4 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
            Accessibility Best Practices
          </h4>
          <ul class="space-y-2 text-sm text-green-800 dark:text-green-200">
            <li class="flex items-start gap-2">
              <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              <span>Always provide context before code blocks with descriptive text</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              <span>Use semantic headings to structure code documentation</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              <span>Include captions for complex code examples</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-green-600 dark:text-green-400 mt-0.5">✓</span>
              <span>Use InlineCode for technical terms within paragraphs</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Performance Optimization */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Performance Optimization
        </h2>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Lazy Loading Large Code Examples
          </h3>
          
          <CodeBlock
            code={`import { component$, useSignal, $ } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography";

export const LazyCodeExample = component$(() => {
  const showCode = useSignal(false);
  const largeCodeExample = \`// Very large code example here...
// This could be a complete component or configuration file
// that we don't want to render immediately
\`;
  
  const toggleCode = $(() => {
    showCode.value = !showCode.value;
  });
  
  return (
    <div class="space-y-4">
      <button
        onClick$={toggleCode}
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showCode.value ? 'Hide' : 'Show'} Complete Example
      </button>
      
      {showCode.value && (
        <CodeBlock
          code={largeCodeExample}
          language="typescript"
          title="complete-example.ts"
          showLineNumbers
          maxHeight="400px"
        />
      )}
    </div>
  );
});`}
            language="tsx"
            title="Lazy Loading Pattern"
            showLineNumbers
            highlightLines="4-9,23-31"
          />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Memoizing Dynamic Code Content
          </h3>
          
          <CodeBlock
            code={`import { component$, useComputed$, useSignal } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography";

export const OptimizedCodeDisplay = component$(() => {
  const selectedFramework = useSignal("qwik");
  const selectedPattern = useSignal("component");
  
  // Memoize code generation to avoid unnecessary re-computation
  const generatedCode = useComputed$(() => {
    const framework = selectedFramework.value;
    const pattern = selectedPattern.value;
    
    if (framework === "qwik" && pattern === "component") {
      return \`export const MyComponent = component$(() => {
  return <div>Qwik Component</div>;
});\`;
    }
    
    if (framework === "react" && pattern === "component") {
      return \`export const MyComponent = () => {
  return <div>React Component</div>;
};\`;
    }
    
    // More patterns...
    return "// Select a framework and pattern";
  });
  
  return (
    <div class="space-y-4">
      <div class="flex gap-4">
        <select
          value={selectedFramework.value}
          onChange$={(e) => selectedFramework.value = e.target.value}
          class="p-2 border rounded"
        >
          <option value="qwik">Qwik</option>
          <option value="react">React</option>
        </select>
        
        <select
          value={selectedPattern.value}
          onChange$={(e) => selectedPattern.value = e.target.value}
          class="p-2 border rounded"
        >
          <option value="component">Component</option>
          <option value="hook">Hook</option>
        </select>
      </div>
      
      <CodeBlock
        code={generatedCode.value}
        language="typescript"
        title={\`\${selectedFramework.value}-\${selectedPattern.value}.ts\`}
      />
    </div>
  );
});`}
            language="tsx"
            title="Memoized Code Generation"
            showLineNumbers
            highlightLines="8-25"
          />
        </div>
      </section>

      {/* Responsive Design */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Responsive Design Patterns
        </h2>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Mobile-Optimized Code Display
          </h3>
          
          <CodeBlock
            code={`export const ResponsiveCodeExample = component$(() => {
  return (
    <div class="space-y-6">
      {/* Mobile: Stack vertically */}
      <div class="block lg:hidden space-y-4">
        <h3>Mobile View</h3>
        <CodeBlock
          code="const example = 'short';"
          language="javascript"
          wrap={true}
          showLineNumbers={false}
          title="mobile-example.js"
        />
      </div>
      
      {/* Desktop: Side by side */}
      <div class="hidden lg:grid lg:grid-cols-2 gap-6">
        <div>
          <h3>Before</h3>
          <CodeBlock
            code={\`const longVariableName = someFunction(
  withManyParameters,
  andComplexLogic
);\`}
            language="javascript"
            showLineNumbers
            wrap={false}
            title="before.js"
          />
        </div>
        
        <div>
          <h3>After</h3>
          <CodeBlock
            code={\`const result = someFunction(
  withManyParameters,
  andComplexLogic
);\`}
            language="javascript"
            showLineNumbers
            wrap={false}
            title="after.js"
          />
        </div>
      </div>
      
      {/* Tablet: Responsive wrapping */}
      <div class="hidden md:block lg:hidden">
        <CodeBlock
          code={\`// Tablet-optimized code display
const config = {
  mobile: { wrap: true, lineNumbers: false },
  tablet: { wrap: true, lineNumbers: true },
  desktop: { wrap: false, lineNumbers: true }
};\`}
          language="javascript"
          title="responsive-config.js"
          showLineNumbers
          wrap={true}
        />
      </div>
    </div>
  );
});`}
            language="tsx"
            title="Responsive Code Display"
            showLineNumbers
            maxHeight="400px"
          />
        </div>
      </section>

      {/* Error Handling */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Error Handling & Edge Cases
        </h2>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Graceful Fallbacks
          </h3>
          
          <CodeBlock
            code={`export const SafeCodeBlock = component$(() => {
  const codeContent = useSignal("");
  const isLoading = useSignal(false);
  const error = useSignal<string | null>(null);
  
  const loadCode = $(async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch('/api/code-examples/example1');
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }
      codeContent.value = await response.text();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
      // Fallback to static example
      codeContent.value = "// Example code unavailable";
    } finally {
      isLoading.value = false;
    }
  });
  
  if (isLoading.value) {
    return (
      <div class="border border-gray-200 rounded-lg p-6 animate-pulse">
        <div class="h-4 bg-gray-200 rounded mb-2"></div>
        <div class="h-32 bg-gray-100 rounded"></div>
      </div>
    );
  }
  
  if (error.value) {
    return (
      <div class="border border-red-200 bg-red-50 rounded-lg p-4">
        <p class="text-red-700 mb-2">Failed to load code example</p>
        <CodeBlock
          code="// Fallback example when loading fails
console.log('Example not available');"
          language="javascript"
          title="Fallback Example"
          theme="light"
        />
      </div>
    );
  }
  
  return (
    <CodeBlock
      code={codeContent.value || "// No code available"}
      language="javascript"
      title="Dynamic Example"
      showLineNumbers
    />
  );
});`}
            language="tsx"
            title="Error-Safe Code Loading"
            showLineNumbers
            highlightLines="6-22,24-30,32-42"
          />
        </div>
      </section>

      {/* Testing Patterns */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Testing Patterns
        </h2>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Testing CodeDisplay Components
          </h3>
          
          <CodeBlock
            code={`import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/qwik';
import { CodeBlock, InlineCode } from '~/components/Core/Typography';

describe('CodeBlock Component', () => {
  it('should render code with syntax highlighting', async () => {
    const { getByText } = await render(
      <CodeBlock 
        code="const test = 'hello';" 
        language="javascript" 
        data-testid="code-block"
      />
    );
    
    expect(getByText("const test = 'hello';")).toBeInTheDocument();
  });
  
  it('should show line numbers when enabled', async () => {
    const { container } = await render(
      <CodeBlock 
        code="line 1\\nline 2" 
        language="javascript" 
        showLineNumbers={true}
      />
    );
    
    expect(container.querySelector('.hljs-ln')).toBeInTheDocument();
  });
  
  it('should display title when provided', async () => {
    const { getByText } = await render(
      <CodeBlock 
        code="test" 
        language="javascript" 
        title="example.js"
      />
    );
    
    expect(getByText('example.js')).toBeInTheDocument();
  });
});

describe('InlineCode Component', () => {
  it('should render inline code with proper styling', async () => {
    const { getByText } = await render(
      <InlineCode>useState</InlineCode>
    );
    
    const element = getByText('useState');
    expect(element.tagName).toBe('CODE');
    expect(element).toHaveClass('font-mono');
  });
  
  it('should apply noWrap when specified', async () => {
    const { getByText } = await render(
      <InlineCode noWrap>longVariableName</InlineCode>
    );
    
    expect(getByText('longVariableName')).toHaveClass('whitespace-nowrap');
  });
});`}
            language="typescript"
            title="code-display.test.tsx"
            showLineNumbers
            caption="Unit tests for CodeDisplay components"
          />
        </div>
      </section>

      {/* Integration Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Integration with Other Components
        </h2>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            CodeDisplay with Tabs
          </h3>
          
          <CodeBlock
            code={`import { component$, useSignal } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography";

export const TabbedCodeExamples = component$(() => {
  const activeTab = useSignal("javascript");
  
  const examples = {
    javascript: {
      code: \`async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}\`,
      title: "example.js"
    },
    typescript: {
      code: \`async function fetchData(): Promise<Data> {
  const response = await fetch('/api/data');
  return response.json();
}\`,
      title: "example.ts"
    },
    python: {
      code: \`import asyncio
import aiohttp

async def fetch_data():
    async with aiohttp.ClientSession() as session:
        async with session.get('/api/data') as response:
            return await response.json()\`,
      title: "example.py"
    }
  };
  
  return (
    <div class="border border-gray-200 rounded-lg overflow-hidden">
      {/* Tab Headers */}
      <div class="flex border-b border-gray-200 bg-gray-50">
        {Object.keys(examples).map((lang) => (
          <button
            key={lang}
            onClick$={() => activeTab.value = lang}
            class={\`px-4 py-2 text-sm font-medium border-b-2 transition-colors \${
              activeTab.value === lang
                ? 'border-blue-500 text-blue-600 bg-white'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }\`}
          >
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div class="p-0">
        <CodeBlock
          code={examples[activeTab.value].code}
          language={activeTab.value}
          title={examples[activeTab.value].title}
          showLineNumbers
          class="!border-0 !rounded-none"
        />
      </div>
    </div>
  );
});`}
            language="tsx"
            title="Tabbed Code Examples"
            showLineNumbers
            maxHeight="500px"
          />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            CodeDisplay in Modal/Dialog
          </h3>
          
          <CodeBlock
            code={`export const CodeModal = component$(() => {
  const isOpen = useSignal(false);
  
  return (
    <>
      <button
        onClick$={() => isOpen.value = true}
        class="px-4 py-2 bg-blue-600 text-white rounded"
      >
        View Full Code
      </button>
      
      {isOpen.value && (
        <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div class="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            {/* Modal Header */}
            <div class="flex items-center justify-between p-4 border-b">
              <h2 class="text-lg font-semibold">Complete Implementation</h2>
              <button
                onClick$={() => isOpen.value = false}
                class="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            {/* Modal Content */}
            <div class="overflow-auto max-h-[calc(80vh-4rem)]">
              <CodeBlock
                code={\`// Complete component implementation
export const AdvancedComponent = component$(() => {
  const state = useStore({
    data: [],
    loading: false,
    error: null
  });
  
  const resource = useResource$(async ({ track }) => {
    track(() => state.loading);
    if (!state.loading) return;
    
    try {
      const response = await fetch('/api/data');
      const result = await response.json();
      state.data = result;
    } catch (error) {
      state.error = error.message;
    }
  });
  
  return (
    <div class="component">
      {/* Component JSX here */}
    </div>
  );
});\`}
                language="typescript"
                title="advanced-component.tsx"
                showLineNumbers
                maxHeight="400px"
                class="!border-0 !rounded-none"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
});`}
            language="tsx"
            title="Code Modal Pattern"
            showLineNumbers
          />
        </div>
      </section>

      {/* Summary */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Summary
        </h2>
        
        <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Key Takeaways
          </h3>
          
          <ul class="space-y-2 text-gray-700 dark:text-gray-300">
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Use <InlineCode>InlineCode</InlineCode> for short code snippets within text</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Use <InlineCode>CodeBlock</InlineCode> for larger code examples with syntax highlighting</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Always provide context and proper headings for accessibility</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Consider performance implications for dynamic or large code content</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Implement responsive patterns for mobile-friendly code display</span>
            </li>
            <li class="flex items-start gap-2">
              <span class="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
              <span>Include error handling and fallbacks for dynamic code loading</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
});