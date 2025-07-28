import { component$, useSignal, $ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";
import type { CodeLanguage, CodeTheme } from "../CodeDisplay.types";

/**
 * Playground documentation for the CodeDisplay components
 * 
 * Interactive playground allowing users to test different configurations
 * and see real-time results with the CodeDisplay components.
 */
export const Playground = component$(() => {
  // CodeBlock configuration signals
  const codeContent = useSignal(`import { component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
  const count = useSignal(0);
  
  const increment = $(() => {
    count.value++;
  });
  
  const decrement = $(() => {
    count.value--;
  });
  
  return (
    <div class="counter">
      <h2>Count: {count.value}</h2>
      <div class="buttons">
        <button onClick$={increment}>+</button>
        <button onClick$={decrement}>-</button>
      </div>
    </div>
  );
});`);
  
  const selectedLanguage = useSignal<CodeLanguage>("typescript");
  const selectedTheme = useSignal<CodeTheme>("system");
  const showLineNumbers = useSignal(true);
  const enableCopyButton = useSignal(true);
  const enableHighlighting = useSignal(true);
  const enableWrapping = useSignal(true);
  const codeTitle = useSignal("Counter.tsx");
  const codeCaption = useSignal("A simple counter component with increment/decrement functionality");
  const highlightLines = useSignal("1,3-5,13-15");
  const maxHeight = useSignal("");

  // InlineCode configuration signals
  const inlineText = useSignal("useSignal()");
  const inlineNoWrap = useSignal(false);

  // Predefined code examples
  const codeExamples: Partial<Record<CodeLanguage, string>> = {
    typescript: `import { component$, useSignal } from "@builder.io/qwik";

export const Counter = component$(() => {
  const count = useSignal(0);
  
  const increment = $(() => {
    count.value++;
  });
  
  const decrement = $(() => {
    count.value--;
  });
  
  return (
    <div class="counter">
      <h2>Count: {count.value}</h2>
      <div class="buttons">
        <button onClick$={increment}>+</button>
        <button onClick$={decrement}>-</button>
      </div>
    </div>
  );
});`,
    javascript: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

// Usage
fetchUserData(123).then(user => {
  if (user) {
    console.log(\`Welcome, \${user.name}!\`);
  }
});`,
    python: `import asyncio
import aiohttp
from typing import Optional, Dict

class APIClient:
    def __init__(self, base_url: str):
        self.base_url = base_url
    
    async def get_user(self, user_id: int) -> Optional[Dict]:
        """Fetch user data from API."""
        async with aiohttp.ClientSession() as session:
            try:
                url = f"{self.base_url}/users/{user_id}"
                async with session.get(url) as response:
                    response.raise_for_status()
                    return await response.json()
            except aiohttp.ClientError as e:
                print(f"API error: {e}")
                return None

# Usage example
async def main():
    client = APIClient("https://api.example.com")
    user = await client.get_user(123)
    if user:
        print(f"User: {user['name']}")

if __name__ == "__main__":
    asyncio.run(main())`,
    json: `{
  "name": "qwik-app",
  "version": "1.0.0",
  "description": "A modern Qwik application",
  "scripts": {
    "dev": "vite",
    "build": "qwik build",
    "preview": "qwik build preview && vite preview",
    "test": "vitest",
    "lint": "eslint src/"
  },
  "dependencies": {
    "@builder.io/qwik": "^1.0.0",
    "@builder.io/qwik-city": "^1.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^4.0.0"
  }
}`,
    css: `/* Modern CSS with custom properties */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #6b7280;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --error-color: #ef4444;
  
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: var(--spacing-lg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

@media (prefers-color-scheme: dark) {
  .card {
    background: #1f2937;
    border-color: #374151;
    color: white;
  }
}`,
    bash: `#!/bin/bash

# Deployment script for Qwik application
set -e

PROJECT_NAME="qwik-app"
BUILD_DIR="dist"
DEPLOY_DIR="/var/www/html"

echo "🚀 Starting deployment of $PROJECT_NAME..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run tests
echo "🧪 Running tests..."
npm run test

# Build the application
echo "🏗️  Building application..."
npm run build

# Create backup of current deployment
if [ -d "$DEPLOY_DIR" ]; then
    echo "💾 Creating backup..."
    sudo cp -r "$DEPLOY_DIR" "$DEPLOY_DIR.backup.$(date +%Y%m%d_%H%M%S)"
fi

# Deploy new build
echo "🚀 Deploying to $DEPLOY_DIR..."
sudo rm -rf "$DEPLOY_DIR"
sudo cp -r "$BUILD_DIR" "$DEPLOY_DIR"
sudo chown -R www-data:www-data "$DEPLOY_DIR"

echo "✅ Deployment completed successfully!"`,
  };

  // Event handlers
  const handleLanguageChange = $((language: CodeLanguage) => {
    selectedLanguage.value = language;
    codeContent.value = codeExamples[language] || codeExamples.typescript || '';
  });

  const handleCopyToClipboard = $((text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
  });

  const languages: CodeLanguage[] = [
    "typescript", "javascript", "python", "json", "css", "bash",
    "html", "jsx", "tsx", "yaml", "sql", "go", "rust", "java"
  ];

  const themes: CodeTheme[] = ["system", "light", "dark"];

  return (
    <div class="space-y-8 p-6">
      {/* Header */}
      <section class="space-y-4">
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Interactive Playground
        </h1>
        
        <p class="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Test and experiment with different CodeDisplay configurations in real-time.
          Adjust the settings below to see how they affect the rendered output.
        </p>
      </section>

      {/* CodeBlock Playground */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          CodeBlock Playground
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <div class="space-y-6">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Configuration
            </h3>

            {/* Language Selection */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Programming Language
              </label>
              <select
                value={selectedLanguage.value}
                onChange$={(e) => handleLanguageChange((e.target as HTMLSelectElement).value as CodeLanguage)}
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Theme Selection */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme
              </label>
              <select
                value={selectedTheme.value}
                onChange$={(e) => selectedTheme.value = (e.target as HTMLSelectElement).value as CodeTheme}
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {themes.map((theme) => (
                  <option key={theme} value={theme}>
                    {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Title Input */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title (optional)
              </label>
              <input
                type="text"
                value={codeTitle.value}
                onInput$={(e) => codeTitle.value = (e.target as HTMLInputElement).value}
                placeholder="Enter title..."
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Caption Input */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Caption (optional)
              </label>
              <input
                type="text"
                value={codeCaption.value}
                onInput$={(e) => codeCaption.value = (e.target as HTMLInputElement).value}
                placeholder="Enter caption..."
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Highlight Lines Input */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Highlight Lines (e.g., "1,3-5,8")
              </label>
              <input
                type="text"
                value={highlightLines.value}
                onInput$={(e) => highlightLines.value = (e.target as HTMLInputElement).value}
                placeholder="1,3-5,8"
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Max Height Input */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Max Height (e.g., "300px")
              </label>
              <input
                type="text"
                value={maxHeight.value}
                onInput$={(e) => maxHeight.value = (e.target as HTMLInputElement).value}
                placeholder="300px"
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            {/* Boolean Options */}
            <div class="space-y-3">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">Options</h4>
              
              <label class="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={showLineNumbers.value}
                  onChange$={(e) => showLineNumbers.value = (e.target as HTMLInputElement).checked}
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Show Line Numbers</span>
              </label>
              
              <label class="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={enableCopyButton.value}
                  onChange$={(e) => enableCopyButton.value = (e.target as HTMLInputElement).checked}
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Enable Copy Button</span>
              </label>
              
              <label class="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={enableHighlighting.value}
                  onChange$={(e) => enableHighlighting.value = (e.target as HTMLInputElement).checked}
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Enable Syntax Highlighting</span>
              </label>
              
              <label class="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={enableWrapping.value}
                  onChange$={(e) => enableWrapping.value = (e.target as HTMLInputElement).checked}
                  class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Enable Line Wrapping</span>
              </label>
            </div>

            {/* Code Content Textarea */}
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Code Content
              </label>
              <textarea
                value={codeContent.value}
                onInput$={(e) => codeContent.value = (e.target as HTMLTextAreaElement).value}
                rows={12}
                class="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-mono text-sm"
                placeholder="Enter your code here..."
              />
            </div>
          </div>

          {/* Preview Panel */}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Preview
            </h3>
            
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
              <CodeBlock
                code={codeContent.value}
                language={selectedLanguage.value}
                theme={selectedTheme.value}
                showLineNumbers={showLineNumbers.value}
                copyButton={enableCopyButton.value}
                highlight={enableHighlighting.value}
                wrap={enableWrapping.value}
                title={codeTitle.value || undefined}
                caption={codeCaption.value || undefined}
                highlightLines={highlightLines.value || undefined}
                maxHeight={maxHeight.value || undefined}
              />
            </div>

            {/* Generated Code */}
            <div class="space-y-2">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                Generated JSX
              </h4>
              <CodeBlock
                code={`<CodeBlock
  code="${codeContent.value.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"
  language="${selectedLanguage.value}"${selectedTheme.value !== "system" ? `\n  theme="${selectedTheme.value}"` : ""}${showLineNumbers.value ? `\n  showLineNumbers` : ""}${!enableCopyButton.value ? `\n  copyButton={false}` : ""}${!enableHighlighting.value ? `\n  highlight={false}` : ""}${!enableWrapping.value ? `\n  wrap={false}` : ""}${codeTitle.value ? `\n  title="${codeTitle.value}"` : ""}${codeCaption.value ? `\n  caption="${codeCaption.value}"` : ""}${highlightLines.value ? `\n  highlightLines="${highlightLines.value}"` : ""}${maxHeight.value ? `\n  maxHeight="${maxHeight.value}"` : ""}
/>`}
                language="jsx"
                title="Copy this code to use in your project"
                maxHeight="200px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* InlineCode Playground */}
      <section class="space-y-6">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          InlineCode Playground
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Configuration
            </h3>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Inline Code Content
              </label>
              <input
                type="text"
                value={inlineText.value}
                onInput$={(e) => inlineText.value = (e.target as HTMLInputElement).value}
                placeholder="Enter inline code..."
                class="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <label class="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={inlineNoWrap.value}
                onChange$={(e) => inlineNoWrap.value = (e.target as HTMLInputElement).checked}
                class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">No Wrap</span>
            </label>

            <div class="space-y-2">
              <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                Generated JSX
              </h4>
              <CodeBlock
                code={`<InlineCode${inlineNoWrap.value ? ' noWrap' : ''}>${inlineText.value}</InlineCode>`}
                language="jsx"
                title="Copy this code to use in your project"
              />
            </div>
          </div>

          {/* Preview */}
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
              Preview
            </h3>
            
            <div class="border border-gray-200 dark:border-gray-700 rounded-lg p-6 bg-gray-50 dark:bg-gray-800">
              <p class="text-gray-700 dark:text-gray-300">
                This is a paragraph with inline code: <InlineCode noWrap={inlineNoWrap.value}>{inlineText.value}</InlineCode> embedded within the text.
              </p>
              
              <p class="text-gray-700 dark:text-gray-300 mt-4">
                Here's another example with multiple inline codes:
                <InlineCode noWrap={inlineNoWrap.value}>{inlineText.value}</InlineCode> and 
                <InlineCode>another_function()</InlineCode> and 
                <InlineCode>variable_name</InlineCode>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copy to Clipboard Helper */}
      <section class="space-y-4">
        <h2 class="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white">
          Quick Copy Templates
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick$={() => {
              const template = `<CodeBlock
  code="const example = 'Hello, World!';"
  language="javascript"
  showLineNumbers
  title="Example.js"
/>`;
              handleCopyToClipboard(template);
            }}
            class="p-4 text-left bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">
              Basic CodeBlock Template
            </h3>
            <p class="text-sm text-blue-700 dark:text-blue-300">
              Simple code block with line numbers and title
            </p>
          </button>

          <button
            onClick$={() => {
              const template = `<CodeBlock
  code="// Your code here"
  language="typescript"
  showLineNumbers
  highlightLines="1,3-5"
  title="Component.tsx"
  caption="Component implementation example"
  maxHeight="400px"
/>`;
              handleCopyToClipboard(template);
            }}
            class="p-4 text-left bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <h3 class="font-semibold text-green-900 dark:text-green-100 mb-2">
              Advanced CodeBlock Template
            </h3>
            <p class="text-sm text-green-700 dark:text-green-300">
              Full-featured with highlighting and scrolling
            </p>
          </button>

          <button
            onClick$={() => {
              const template = `<p>
  Use the <InlineCode>useSignal()</InlineCode> hook for reactive state.
</p>`;
              handleCopyToClipboard(template);
            }}
            class="p-4 text-left bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <h3 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">
              InlineCode Template
            </h3>
            <p class="text-sm text-purple-700 dark:text-purple-300">
              Basic inline code within text
            </p>
          </button>

          <button
            onClick$={() => {
              const template = `<CodeBlock
  code="npm install @builder.io/qwik"
  language="bash"
  copyButton={false}
  title="Installation"
/>`;
              handleCopyToClipboard(template);
            }}
            class="p-4 text-left bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
          >
            <h3 class="font-semibold text-orange-900 dark:text-orange-100 mb-2">
              Terminal Command Template
            </h3>
            <p class="text-sm text-orange-700 dark:text-orange-300">
              Command line example without copy button
            </p>
          </button>
        </div>
      </section>
    </div>
  );
});