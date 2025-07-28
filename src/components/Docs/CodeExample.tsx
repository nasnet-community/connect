import { component$ } from "@builder.io/qwik";

interface CodeExampleProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export const CodeExample = component$<CodeExampleProps>(
  ({ code, language = "tsx", title, showLineNumbers = false }) => {
    return (
      <div class="relative mb-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
        {title && (
          <div class="border-b border-gray-200 bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
            <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300">
              {title}
            </h3>
          </div>
        )}
        <div class="relative">
          <pre
            class={`language-${language} ${showLineNumbers ? "line-numbers" : ""} overflow-x-auto bg-gray-50 p-4 text-sm text-gray-800 dark:bg-gray-900 dark:text-gray-200`}
          >
            <code class={`language-${language}`}>{code}</code>
          </pre>
          <button
            class="absolute right-2 top-2 rounded-md border border-gray-200 bg-white p-2 text-gray-500 opacity-70 transition-opacity hover:text-gray-700 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Copy code"
            title="Copy code"
            onClick$={() => {
              // In a real implementation, this would copy the code to clipboard
              // navigator.clipboard.writeText(code)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  },
);

export default CodeExample;
