import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";

/**
 * Examples documentation for the CodeDisplay components
 * 
 * Interactive examples showcasing different configurations and use cases
 * for both CodeBlock and InlineCode components.
 */
export const Examples = component$(() => {
  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Examples
        </h1>
        
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Interactive examples demonstrating various configurations and use cases for the
          CodeDisplay components across different scenarios and programming languages.
        </p>
      </section>

      {/* InlineCode Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          InlineCode Examples
        </h2>

        {/* Basic Inline Code */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Basic Usage
          </h3>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                To create a reactive state in Qwik, use the <InlineCode>useSignal()</InlineCode> hook.
                You can also use <InlineCode>useStore()</InlineCode> for complex objects.
              </p>
              
              <p class="text-gray-700 dark:text-gray-300">
                Common HTML elements include <InlineCode>&lt;div&gt;</InlineCode>, 
                <InlineCode>&lt;span&gt;</InlineCode>, and <InlineCode>&lt;p&gt;</InlineCode> tags.
              </p>
            </div>
          </div>
          
          <CodeBlock
            code={`<p>
  To create a reactive state in Qwik, use the <InlineCode>useSignal()</InlineCode> hook.
  You can also use <InlineCode>useStore()</InlineCode> for complex objects.
</p>`}
            language="tsx"
            title="Basic InlineCode Usage"
          />
        </div>

        {/* No Wrap Example */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            No Wrap Option
          </h3>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <div class="space-y-4">
              <p class="text-gray-700 dark:text-gray-300">
                For long variable names that shouldn't break, use the noWrap prop:
                <InlineCode noWrap>thisIsAVeryLongVariableNameThatShouldNotWrap</InlineCode>
              </p>
              
              <p class="text-gray-700 dark:text-gray-300">
                Compare with normal wrapping behavior:
                <InlineCode>thisIsAVeryLongVariableNameThatWillWrapNormally</InlineCode>
              </p>
            </div>
          </div>
          
          <CodeBlock
            code={`<p>
  Long variable with noWrap: 
  <InlineCode noWrap>thisIsAVeryLongVariableNameThatShouldNotWrap</InlineCode>
</p>

<p>
  Normal wrapping behavior:
  <InlineCode>thisIsAVeryLongVariableNameThatWillWrapNormally</InlineCode>
</p>`}
            language="tsx"
            title="NoWrap Example"
          />
        </div>
      </section>

      {/* CodeBlock Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          CodeBlock Examples
        </h2>

        {/* Basic Code Block */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Basic TypeScript Example
          </h3>
          
          <CodeBlock
            code={`import { component$, useSignal } from "@builder.io/qwik";

interface User {
  id: number;
  name: string;
  email: string;
}

export const UserProfile = component$(() => {
  const user = useSignal<User | null>(null);
  const loading = useSignal(false);
  
  const fetchUser$ = $(async (userId: number) => {
    loading.value = true;
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      user.value = await response.json();
    } catch (error) {
      console.error('Failed to fetch user:', error);
    } finally {
      loading.value = false;
    }
  });
  
  return (
    <div class="user-profile">
      {loading.value ? (
        <div>Loading...</div>
      ) : user.value ? (
        <div>
          <h1>{user.value.name}</h1>
          <p>{user.value.email}</p>
        </div>
      ) : (
        <div>No user found</div>
      )}
    </div>
  );
});`}
            language="typescript"
            title="UserProfile.tsx"
            showLineNumbers
            theme="system"
          />
        </div>

        {/* Line Highlighting */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Line Highlighting
          </h3>
          
          <CodeBlock
            code={`export const calculateTotal = (items: CartItem[]) => {
  // Calculate subtotal
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  // Apply tax rate
  const tax = subtotal * 0.08;
  
  // Add shipping cost
  const shipping = subtotal > 50 ? 0 : 9.99;
  
  // Return final total
  return subtotal + tax + shipping;
};`}
            language="typescript"
            title="price-calculator.ts"
            showLineNumbers
            highlightLines="3-5,7,10"
            caption="Key calculation steps are highlighted"
          />
        </div>

        {/* Different Languages */}
        <div class="space-y-6">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Multiple Programming Languages
          </h3>

          {/* JavaScript */}
          <div class="space-y-2">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white">JavaScript</h4>
            <CodeBlock
              code={`// Async/await with error handling
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}`}
              language="javascript"
              title="user-service.js"
              showLineNumbers
            />
          </div>

          {/* Python */}
          <div class="space-y-2">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white">Python</h4>
            <CodeBlock
              code={`import asyncio
import aiohttp
from typing import Optional, Dict, Any

class UserService:
    def __init__(self, base_url: str):
        self.base_url = base_url
    
    async def fetch_user(self, user_id: int) -> Optional[Dict[str, Any]]:
        """Fetch user data from the API."""
        async with aiohttp.ClientSession() as session:
            try:
                async with session.get(f"{self.base_url}/users/{user_id}") as response:
                    response.raise_for_status()
                    return await response.json()
            except aiohttp.ClientError as e:
                print(f"Error fetching user {user_id}: {e}")
                return None

# Usage example
async def main():
    service = UserService("https://api.example.com")
    user = await service.fetch_user(123)
    if user:
        print(f"User: {user['name']} ({user['email']})")

if __name__ == "__main__":
    asyncio.run(main())`}
              language="python"
              title="user_service.py"
              showLineNumbers
            />
          </div>

          {/* JSON Configuration */}
          <div class="space-y-2">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white">JSON Configuration</h4>
            <CodeBlock
              code={`{
  "name": "qwik-app",
  "version": "1.0.0",
  "description": "A modern Qwik application",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "qwik build",
    "preview": "qwik build preview && vite preview --open",
    "test": "vitest",
    "lint": "eslint src/"
  },
  "dependencies": {
    "@builder.io/qwik": "^1.0.0",
    "@builder.io/qwik-city": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "vite": "^4.0.0",
    "vitest": "^1.0.0"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}`}
              language="json"
              title="package.json"
              showLineNumbers
            />
          </div>

          {/* CSS Styles */}
          <div class="space-y-2">
            <h4 class="text-lg font-medium text-gray-900 dark:text-white">CSS with Tailwind</h4>
            <CodeBlock
              code={`/* Custom component styles */
.card {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
  @apply border border-gray-200 dark:border-gray-700;
  @apply transition-all duration-200 ease-in-out;
}

.card:hover {
  @apply shadow-lg transform -translate-y-1;
}

.card-title {
  @apply text-xl font-semibold text-gray-900 dark:text-white;
  @apply mb-2;
}

.card-content {
  @apply text-gray-700 dark:text-gray-300;
  @apply leading-relaxed;
}

/* Responsive grid layout */
.card-grid {
  @apply grid gap-6;
  @apply grid-cols-1 md:grid-cols-2 lg:grid-cols-3;
  @apply p-4 md:p-6 lg:p-8;
}

/* Animation utilities */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}`}
              language="css"
              title="components.css"
              showLineNumbers
            />
          </div>
        </div>

        {/* Maximum Height Example */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Maximum Height with Scrolling
          </h3>
          
          <CodeBlock
            code={`import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const DataTable = component$(() => {
  const data = useSignal<any[]>([]);
  const loading = useSignal(true);
  const error = useSignal<string | null>(null);
  const page = useSignal(1);
  const pageSize = 10;

  const fetchData$ = $(async (pageNum: number) => {
    loading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(\`/api/data?page=\${pageNum}&size=\${pageSize}\`);
      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }
      
      const result = await response.json();
      data.value = result.items;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  });

  useVisibleTask$(({ track }) => {
    track(() => page.value);
    fetchData$(page.value);
  });

  const handlePageChange = $((newPage: number) => {
    page.value = newPage;
  });

  const handleRetry = $(() => {
    fetchData$(page.value);
  });

  if (loading.value) {
    return (
      <div class="flex items-center justify-center p-8">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-2 text-gray-600">Loading data...</span>
      </div>
    );
  }

  if (error.value) {
    return (
      <div class="bg-red-50 border border-red-200 rounded-md p-4">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <h3 class="text-sm font-medium text-red-800">Error loading data</h3>
            <p class="mt-1 text-sm text-red-700">{error.value}</p>
            <button
              onClick$={handleRetry}
              class="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-2 rounded text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="space-y-4">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            {data.value.map((item) => (
              <tr key={item.id} class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.id}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.name}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.email}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class={\`inline-flex px-2 py-1 text-xs font-semibold rounded-full \${
                    item.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }\`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div class="flex items-center justify-between">
        <button
          onClick$={() => handlePageChange(page.value - 1)}
          disabled={page.value <= 1}
          class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded"
        >
          Previous
        </button>
        
        <span class="text-sm text-gray-700">
          Page {page.value}
        </span>
        
        <button
          onClick$={() => handlePageChange(page.value + 1)}
          class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
});`}
            language="typescript"
            title="DataTable.tsx"
            showLineNumbers
            maxHeight="400px"
            caption="This long component example demonstrates scrollable code blocks"
          />
        </div>

        {/* Without Copy Button */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Without Copy Button
          </h3>
          
          <CodeBlock
            code={`# Environment Variables
DATABASE_URL=postgresql://user:password@localhost:5432/mydb
API_SECRET_KEY=your-secret-key-here
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Development Settings
NODE_ENV=development
DEBUG=true
LOG_LEVEL=debug`}
            language="bash"
            title=".env.example"
            copyButton={false}
            caption="Sensitive configuration file - copy disabled for security"
          />
        </div>

        {/* No Syntax Highlighting */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Plain Text (No Highlighting)
          </h3>
          
          <CodeBlock
            code={`Server log output:
[2024-01-15 10:30:25] INFO: Application started successfully
[2024-01-15 10:30:26] INFO: Database connection established
[2024-01-15 10:30:27] INFO: Server listening on port 3000
[2024-01-15 10:35:12] WARN: Rate limit exceeded for IP 192.168.1.100
[2024-01-15 10:35:15] ERROR: Failed to process request: Invalid JSON payload
[2024-01-15 10:35:15] ERROR: Stack trace:
  at JSONParser.parse (/app/src/utils/parser.js:45:12)
  at RequestHandler.handlePost (/app/src/handlers/api.js:123:8)
  at Server.processRequest (/app/src/server.js:67:15)`}
            language="bash"
            title="application.log"
            showLineNumbers
            highlight={false}
            caption="Raw log output without syntax highlighting"
          />
        </div>
      </section>

      {/* Theme Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Theme Examples
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light Theme */}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Light Theme
            </h3>
            
            <CodeBlock
              code={`const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
};`}
              language="typescript"
              title="theme-config.ts"
              theme="light"
            />
          </div>

          {/* Dark Theme */}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Dark Theme
            </h3>
            
            <CodeBlock
              code={`const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#6b7280',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem'
  }
};`}
              language="typescript"
              title="theme-config.ts"
              theme="dark"
            />
          </div>
        </div>
      </section>

      {/* Real-world Examples */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Real-world Documentation Examples
        </h2>

        {/* API Documentation */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            API Documentation
          </h3>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              User Authentication Endpoint
            </h4>
            
            <p class="text-gray-700 dark:text-gray-300 mb-4">
              Authenticate a user with email and password. Returns a JWT token on success.
            </p>
            
            <div class="space-y-4">
              <div>
                <h5 class="font-medium text-gray-900 dark:text-white mb-2">Request</h5>
                <CodeBlock
                  code={`POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "secretpassword"
}`}
                  language="json"
                  title="Request"
                />
              </div>
              
              <div>
                <h5 class="font-medium text-gray-900 dark:text-white mb-2">Response</h5>
                <CodeBlock
                  code={`{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 123,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "user"
    },
    "expiresAt": "2024-01-16T10:30:00Z"
  }
}`}
                  language="json"
                  title="Success Response (200)"
                />
              </div>
              
              <div>
                <h5 class="font-medium text-gray-900 dark:text-white mb-2">Error Response</h5>
                <CodeBlock
                  code={`{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": null
  }
}`}
                  language="json"
                  title="Error Response (401)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Installation Guide */}
        <div class="space-y-4">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            Installation Guide
          </h3>
          
          <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Setting up the Development Environment
            </h4>
            
            <div class="space-y-4">
              <div>
                <p class="text-gray-700 dark:text-gray-300 mb-2">
                  1. Clone the repository and install dependencies:
                </p>
                <CodeBlock
                  code={`git clone https://github.com/your-org/qwik-app.git
cd qwik-app
npm install`}
                  language="bash"
                  title="Terminal"
                />
              </div>
              
              <div>
                <p class="text-gray-700 dark:text-gray-300 mb-2">
                  2. Create your environment configuration:
                </p>
                <CodeBlock
                  code={`cp .env.example .env.local
# Edit .env.local with your configuration`}
                  language="bash"
                  title="Terminal"
                />
              </div>
              
              <div>
                <p class="text-gray-700 dark:text-gray-300 mb-2">
                  3. Start the development server:
                </p>
                <CodeBlock
                  code={`npm run dev`}
                  language="bash"
                  title="Terminal"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});