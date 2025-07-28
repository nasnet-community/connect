import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";

/**
 * Features Example - Demonstrates advanced features like line numbers, copy button, titles, captions, and line highlighting
 */
export const FeaturesExample = component$(() => {
  const reactComponentCode = `import { useState, useEffect } from 'react';
import { Button, Spinner, Alert } from '@/components/ui';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export const UserProfileCard = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(\`/api/users/\${userId}\`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <Spinner size="lg" />;
  if (error) return <Alert variant="error">{error}</Alert>;
  if (!user) return <Alert variant="warning">User not found</Alert>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-4">
        {user.avatar && (
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};`;

  const configCode = `# Configuration file with sensitive data
DATABASE_URL=postgresql://user:password@localhost:5432/myapp
API_KEY=sk-1234567890abcdef
JWT_SECRET=super-secret-key-dont-share

# Server configuration
PORT=3000
NODE_ENV=production
LOG_LEVEL=info

# Feature flags
ENABLE_ANALYTICS=true
ENABLE_CACHE=true
CACHE_TTL=3600`;

  const shortCode = `const sum = (a, b) => a + b;`;

  const longCode = `// This is a very long line of code that demonstrates how the wrap feature works when you have code that extends beyond the normal viewport width and needs to be handled properly
const veryLongVariableName = someVeryLongFunctionName(withMultipleParameters, andAnotherParameter, andYetAnotherParameter, andOneMoreParameter);

// Normal line
console.log("This is normal");

// Another very long line that shows wrapping behavior in action with multiple chained method calls and complex expressions
const result = myObject.property.someMethod().anotherMethod().yetAnotherMethod().finalMethod();`;

  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Advanced Features</h2>
        
        <p class="text-gray-600 dark:text-gray-400">
          Explore the advanced features of CodeBlock including titles, captions, line highlighting, 
          copy functionality, and various display options.
        </p>
      </div>

      {/* Title and Caption */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Title and Caption</h3>
        
        <CodeBlock
          code={reactComponentCode}
          language="tsx"
          title="UserProfileCard.tsx"
          caption="A reusable React component for displaying user profile information with loading and error states."
          showLineNumbers={true}
          maxHeight="400px"
        />
      </div>

      {/* Line Highlighting */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Line Highlighting</h3>
        
        <p class="text-gray-600 dark:text-gray-400">
          Highlight specific lines using the <InlineCode>highlightLines</InlineCode> prop. 
          Supports ranges like <InlineCode>"1,3-5,7"</InlineCode>.
        </p>
        
        <CodeBlock
          code={reactComponentCode}
          language="tsx"
          title="Highlighted Lines Example"
          showLineNumbers={true}
          highlightLines="1-3,7,12-15,20-22"
          maxHeight="350px"
          caption="Lines 1-3, 7, 12-15, and 20-22 are highlighted to draw attention to important code sections."
        />
      </div>

      {/* Copy Button Features */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Copy Functionality</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">With Copy Button (Default)</h4>
            <CodeBlock
              code={configCode}
              language="bash"
              title=".env"
              caption="Hover over the code block to see the copy button in the top-right corner."
            />
          </div>
          
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">Without Copy Button</h4>
            <CodeBlock
              code={configCode}
              language="bash"
              title=".env"
              copyButton={false}
              caption="Copy button is disabled for sensitive configuration files."
            />
          </div>
        </div>
      </div>

      {/* Text Wrapping */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Text Wrapping Options</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">With Wrapping (Default)</h4>
            <CodeBlock
              code={longCode}
              language="javascript"
              title="wrapped-code.js"
              wrap={true}
              caption="Long lines wrap to fit within the container width."
            />
          </div>
          
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">Without Wrapping</h4>
            <CodeBlock
              code={longCode}
              language="javascript"
              title="unwrapped-code.js"
              wrap={false}
              caption="Long lines overflow with horizontal scroll for precise formatting."
            />
          </div>
        </div>
      </div>

      {/* Maximum Height */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Height Constraints</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">Limited Height</h4>
            <CodeBlock
              code={reactComponentCode}
              language="tsx"
              title="constrained-height.tsx"
              maxHeight="200px"
              showLineNumbers={true}
              caption="Code block with maxHeight set to 200px - scroll to see more content."
            />
          </div>
          
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">Auto Height</h4>
            <CodeBlock
              code={shortCode}
              language="javascript"
              title="auto-height.js"
              showLineNumbers={true}
              caption="Code block expands to fit all content naturally."
            />
          </div>
        </div>
      </div>

      {/* Inline Code Features */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Inline Code Options</h3>
        
        <div class="space-y-3">
          <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">Normal Wrapping</h4>
            <p class="text-gray-700 dark:text-gray-300">
              This is a paragraph with <InlineCode>normal inline code</InlineCode> that will wrap 
              naturally when the line becomes too long for the container. The code 
              <InlineCode>function calculateVeryLongVariableNameForDemonstration()</InlineCode> 
              wraps as expected.
            </p>
          </div>
          
          <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded">
            <h4 class="font-medium text-gray-900 dark:text-white mb-2">No Wrapping</h4>
            <p class="text-gray-700 dark:text-gray-300">
              This is a paragraph with <InlineCode noWrap>non-wrapping inline code</InlineCode> that 
              will never wrap even when very long. For example: 
              <InlineCode noWrap>function calculateVeryLongVariableNameForDemonstration()</InlineCode> 
              stays on one line.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="p-4 bg-purple-50 dark:bg-purple-950 rounded border-l-4 border-purple-500">
          <h4 class="font-semibold text-purple-800 dark:text-purple-200 mb-2">Line Numbers</h4>
          <p class="text-sm text-purple-700 dark:text-purple-300">
            Use <InlineCode>{"showLineNumbers={true}"}</InlineCode> for easier code reference and debugging.
          </p>
        </div>
        
        <div class="p-4 bg-orange-50 dark:bg-orange-950 rounded border-l-4 border-orange-500">
          <h4 class="font-semibold text-orange-800 dark:text-orange-200 mb-2">Copy Button</h4>
          <p class="text-sm text-orange-700 dark:text-orange-300">
            Disable with <InlineCode>{"copyButton={false}"}</InlineCode> for sensitive content.
          </p>
        </div>
        
        <div class="p-4 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Line Highlighting</h4>
          <p class="text-sm text-green-700 dark:text-green-300">
            Use <InlineCode>highlightLines="1,3-5"</InlineCode> to emphasize important code sections.
          </p>
        </div>
      </div>
    </div>
  );
});

export default FeaturesExample;