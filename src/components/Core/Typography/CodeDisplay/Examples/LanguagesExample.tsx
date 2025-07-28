import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";

/**
 * Languages Example - Demonstrates syntax highlighting across different programming languages
 */
export const LanguagesExample = component$(() => {
  const javascriptCode = `// JavaScript/TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
}

const fetchUser = async (id: number): Promise<User> => {
  const response = await fetch(\`/api/users/\${id}\`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};`;

  const pythonCode = `# Python Example
import asyncio
import aiohttp
from typing import Dict, Optional

class UserService:
    def __init__(self, base_url: str):
        self.base_url = base_url
    
    async def get_user(self, user_id: int) -> Optional[Dict]:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{self.base_url}/users/{user_id}") as response:
                if response.status == 200:
                    return await response.json()
                return None`;

  const bashCode = `#!/bin/bash
# Bash Script Example

# Set up environment
export NODE_ENV=production
export PORT=3000

# Install dependencies
npm ci --production

# Run database migrations
npm run migrate

# Start the application
echo "Starting application on port $PORT"
npm start`;

  const cssCode = `/* CSS Example with modern features */
.code-container {
  @apply relative rounded-lg border overflow-hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* CSS Grid Layout */
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: 
    "header header header"
    "sidebar content actions";
  
  /* Custom properties */
  --primary-color: #3b82f6;
  --border-radius: 0.5rem;
  --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
}

@media (prefers-color-scheme: dark) {
  .code-container {
    --primary-color: #60a5fa;
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  }
}`;

  const jsonCode = `{
  "name": "@example/code-display",
  "version": "1.0.0",
  "description": "A beautiful code display component",
  "main": "dist/index.js",
  "scripts": {
    "build": "vite build",
    "dev": "vite dev",
    "test": "vitest",
    "lint": "eslint src/**/*.{ts,tsx}"
  },
  "dependencies": {
    "@builder.io/qwik": "^1.0.0",
    "highlight.js": "^11.8.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^4.0.0",
    "vitest": "^0.32.0"
  }
}`;

  const sqlCode = `-- SQL Example with advanced queries
WITH RECURSIVE user_hierarchy AS (
  -- Base case: top-level users
  SELECT 
    id,
    name,
    email,
    manager_id,
    0 as level
  FROM users 
  WHERE manager_id IS NULL
  
  UNION ALL
  
  -- Recursive case: subordinates
  SELECT 
    u.id,
    u.name,
    u.email,
    u.manager_id,
    uh.level + 1
  FROM users u
  INNER JOIN user_hierarchy uh ON u.manager_id = uh.id
)

SELECT 
  level,
  COUNT(*) as user_count,
  STRING_AGG(name, ', ' ORDER BY name) as users
FROM user_hierarchy
GROUP BY level
ORDER BY level;`;

  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Language Support</h2>
        
        <p class="text-gray-600 dark:text-gray-400">
          The CodeDisplay components support syntax highlighting for multiple programming languages.
          Here are examples showing different languages with their characteristic syntax patterns.
        </p>
      </div>

      {/* JavaScript/TypeScript */}
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">JavaScript/TypeScript</h3>
          <InlineCode>javascript</InlineCode>
          <InlineCode>typescript</InlineCode>
        </div>
        
        <CodeBlock
          code={javascriptCode}
          language="typescript"
          title="user-service.ts"
        />
      </div>

      {/* Python */}
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Python</h3>
          <InlineCode>python</InlineCode>
          <InlineCode>py</InlineCode>
        </div>
        
        <CodeBlock
          code={pythonCode}
          language="python"
          title="user_service.py"
          showLineNumbers={true}
        />
      </div>

      {/* Bash/Shell */}
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Bash/Shell</h3>
          <InlineCode>bash</InlineCode>
          <InlineCode>shell</InlineCode>
        </div>
        
        <CodeBlock
          code={bashCode}
          language="bash"
          title="deploy.sh"
        />
      </div>

      {/* CSS */}
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">CSS</h3>
          <InlineCode>css</InlineCode>
          <InlineCode>scss</InlineCode>
        </div>
        
        <CodeBlock
          code={cssCode}
          language="css"
          title="styles.css"
          maxHeight="300px"
        />
      </div>

      {/* JSON */}
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">JSON</h3>
          <InlineCode>json</InlineCode>
        </div>
        
        <CodeBlock
          code={jsonCode}
          language="json"
          title="package.json"
        />
      </div>

      {/* SQL */}
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">SQL</h3>
          <InlineCode>sql</InlineCode>
          <InlineCode>mysql</InlineCode>
        </div>
        
        <CodeBlock
          code={sqlCode}
          language="sql"
          title="user-hierarchy.sql"
          showLineNumbers={true}
          maxHeight="400px"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div class="p-4 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
          <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Supported Languages</h4>
          <div class="text-sm text-green-700 dark:text-green-300 space-y-1">
            <p><InlineCode>javascript</InlineCode>, <InlineCode>typescript</InlineCode>, <InlineCode>jsx</InlineCode>, <InlineCode>tsx</InlineCode></p>
            <p><InlineCode>python</InlineCode>, <InlineCode>java</InlineCode>, <InlineCode>c</InlineCode>, <InlineCode>cpp</InlineCode>, <InlineCode>csharp</InlineCode></p>
            <p><InlineCode>html</InlineCode>, <InlineCode>css</InlineCode>, <InlineCode>scss</InlineCode>, <InlineCode>less</InlineCode></p>
            <p><InlineCode>bash</InlineCode>, <InlineCode>shell</InlineCode>, <InlineCode>sql</InlineCode>, <InlineCode>json</InlineCode></p>
          </div>
        </div>
        
        <div class="p-4 bg-blue-50 dark:bg-blue-950 rounded border-l-4 border-blue-500">
          <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Language Aliases</h4>
          <div class="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <p><InlineCode>js</InlineCode> → <InlineCode>javascript</InlineCode></p>
            <p><InlineCode>ts</InlineCode> → <InlineCode>typescript</InlineCode></p>
            <p><InlineCode>py</InlineCode> → <InlineCode>python</InlineCode></p>
            <p><InlineCode>md</InlineCode> → <InlineCode>markdown</InlineCode></p>
            <p><InlineCode>yml</InlineCode> → <InlineCode>yaml</InlineCode></p>
          </div>
        </div>
      </div>
    </div>
  );
});

export default LanguagesExample;