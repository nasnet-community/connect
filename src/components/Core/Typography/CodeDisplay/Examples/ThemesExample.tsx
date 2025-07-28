import { component$ } from "@builder.io/qwik";
import { CodeBlock, InlineCode } from "../index";

/**
 * Themes Example - Demonstrates light/dark themes and responsive behavior
 */
export const ThemesExample = component$(() => {
  const sampleCode = `// Theme-aware code display example
import { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8 animate-pulse bg-gray-200 rounded" />;
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className={\`
        p-2 rounded-lg transition-colors duration-200
        \${theme === 'light' 
          ? 'bg-gray-100 hover:bg-gray-200 text-gray-900' 
          : 'bg-gray-800 hover:bg-gray-700 text-gray-100'
        }
      \`}
      aria-label={\`Switch to \${theme === 'light' ? 'dark' : 'light'} theme\`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};`;

  const cssVariablesCode = `:root {
  /* Light theme variables */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1e293b;
  --text-secondary: #64748b;
  --border-color: #e2e8f0;
  --code-bg: #f1f5f9;
  --code-text: #e11d48;
}

[data-theme="dark"] {
  /* Dark theme variables */
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --border-color: #334155;
  --code-bg: #334155;
  --code-text: #fb7185;
}

/* Apply theme variables */
.themed-component {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}

code {
  background-color: var(--code-bg);
  color: var(--code-text);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'Fira Code', monospace;
}`;

  const configCode = `{
  "extends": [
    "@qwik/eslint-config"
  ],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "warn"
  }
}`;

  return (
    <div class="space-y-8 p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Theme Support</h2>
        
        <p class="text-gray-600 dark:text-gray-400">
          The CodeDisplay components automatically adapt to your application's theme. 
          They support light, dark, and system themes with smooth transitions.
        </p>
      </div>

      {/* System Theme (Default) */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">System Theme (Automatic)</h3>
        
        <p class="text-gray-600 dark:text-gray-400">
          The default <InlineCode>theme="system"</InlineCode> automatically follows your system's color scheme preference.
          Try switching your system's dark mode to see it adapt!
        </p>
        
        <CodeBlock
          code={sampleCode}
          language="tsx"
          title="ThemeToggle.tsx"
          theme="system"
          showLineNumbers={true}
          maxHeight="300px"
        />
      </div>

      {/* Explicit Themes */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Explicit Theme Control</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light Theme */}
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">
              Light Theme <InlineCode>theme="light"</InlineCode>
            </h4>
            <CodeBlock
              code={cssVariablesCode}
              language="css"
              title="light-theme.css"
              theme="light"
              maxHeight="250px"
              caption="Always displays in light mode, regardless of system preference."
            />
          </div>

          {/* Dark Theme */}
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">
              Dark Theme <InlineCode>theme="dark"</InlineCode>
            </h4>
            <CodeBlock
              code={cssVariablesCode}
              language="css"
              title="dark-theme.css"
              theme="dark"
              maxHeight="250px"
              caption="Always displays in dark mode, regardless of system preference."
            />
          </div>
        </div>
      </div>

      {/* Responsive Behavior */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Responsive Design</h3>
        
        <p class="text-gray-600 dark:text-gray-400">
          Code blocks are fully responsive and adapt to different screen sizes. 
          On mobile devices, they provide optimal scrolling and readability.
        </p>

        <div class="space-y-4">
          {/* Mobile-friendly example */}
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">Mobile Optimization</h4>
            <div class="max-w-sm mx-auto border-2 border-gray-300 dark:border-gray-600 rounded-lg p-2">
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">📱 Mobile Preview</div>
              <CodeBlock
                code={configCode}
                language="json"
                title=".eslintrc.json"
                theme="system"
              />
            </div>
          </div>

          {/* Tablet-friendly example */}
          <div class="space-y-3">
            <h4 class="font-medium text-gray-900 dark:text-white">Tablet Optimization</h4>
            <div class="max-w-md mx-auto border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4">
              <div class="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">📱 Tablet Preview</div>
              <CodeBlock
                code={configCode}
                language="json"
                title=".eslintrc.json"
                theme="system"
                showLineNumbers={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Theme Consistency */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Theme Consistency</h3>
        
        <div class="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Inline code elements automatically match the theme of your application. 
            For example, this paragraph contains <InlineCode>useEffect</InlineCode>, 
            <InlineCode>useState</InlineCode>, and <InlineCode>component$</InlineCode> 
            that all respect the current theme.
          </p>
          
          <p class="text-gray-700 dark:text-gray-300">
            Even long inline code like <InlineCode>{'import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik"'}</InlineCode> 
            maintains consistent theming throughout your application.
          </p>
        </div>
      </div>

      {/* Performance Note */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Performance & Accessibility</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 bg-blue-50 dark:bg-blue-950 rounded border-l-4 border-blue-500">
            <h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">Lazy Loading</h4>
            <p class="text-sm text-blue-700 dark:text-blue-300">
              Syntax highlighting libraries are loaded only when needed, 
              reducing initial bundle size and improving performance.
            </p>
          </div>
          
          <div class="p-4 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
            <h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">Accessibility</h4>
            <p class="text-sm text-green-700 dark:text-green-300">
              Themes maintain proper contrast ratios and support screen readers 
              with semantic HTML and ARIA labels.
            </p>
          </div>
        </div>
      </div>

      {/* Theme Switching Demo */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Live Theme Examples</h3>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">System Theme</h4>
            <CodeBlock
              code="console.log('System theme');"
              language="javascript"
              theme="system"
              copyButton={false}
            />
          </div>
          
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Light Theme</h4>
            <CodeBlock
              code="console.log('Light theme');"
              language="javascript"
              theme="light"
              copyButton={false}
            />
          </div>
          
          <div class="space-y-2">
            <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300">Dark Theme</h4>
            <CodeBlock
              code="console.log('Dark theme');"
              language="javascript"
              theme="dark"
              copyButton={false}
            />
          </div>
        </div>
      </div>

      <div class="mt-8 p-4 bg-yellow-50 dark:bg-yellow-950 rounded border-l-4 border-yellow-500">
        <h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 Pro Tip</h4>
        <p class="text-sm text-yellow-700 dark:text-yellow-300">
          Use <InlineCode>theme="system"</InlineCode> for the best user experience. 
          It automatically respects user preferences and provides seamless dark/light mode transitions.
          Only use explicit themes when you need to override the system preference for specific use cases.
        </p>
      </div>
    </div>
  );
});

export default ThemesExample;