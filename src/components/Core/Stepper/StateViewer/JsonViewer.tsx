import { component$, useSignal } from "@builder.io/qwik";
import { JsonTreeNode } from "./JsonTreeNode";

interface JsonViewerProps {
  data: any;
  class?: string;
  maxHeight?: string;
}

type ViewMode = "tree" | "compact" | "raw" | "tabs";

export const JsonViewer = component$<JsonViewerProps>((props) => {
  const { data, class: className = "", maxHeight = "500px" } = props;
  const viewMode = useSignal<ViewMode>("tree");
  const searchTerm = useSignal("");
  const expandAll = useSignal(false);
  const activeTab = useSignal("");

  // Initialize activeTab with first key when data changes
  if (data && typeof data === "object" && !activeTab.value) {
    const keys = Object.keys(data);
    if (keys.length > 0) {
      activeTab.value = keys[0];
    }
  }


  const renderTreeView = () => {
    if (!data || typeof data !== "object") {
      return (
        <div class="p-4 text-sm text-gray-500 dark:text-gray-400">
          No data available
        </div>
      );
    }

    return (
      <div class="p-4 font-mono text-sm">
        {Object.entries(data).map(([key, value], index, entries) => (
          <JsonTreeNode
            key={key}
            nodeKey={key}
            value={value}
            level={0}
            isLast={index === entries.length - 1}
            searchTerm={searchTerm}
            expandAll={expandAll}
          />
        ))}
      </div>
    );
  };

  const renderCompactView = () => {
    const renderCompactValue = (obj: any, _indent = 0): string => {
      if (obj === null) return "null";
      if (obj === undefined) return "undefined";
      if (typeof obj !== "object") return JSON.stringify(obj);
      if (Array.isArray(obj)) {
        if (obj.length === 0) return "[]";
        if (obj.length <= 3 && obj.every(item => typeof item !== "object")) {
          return `[${obj.map(item => JSON.stringify(item)).join(", ")}]`;
        }
        return `[${obj.length} items]`;
      }

      const keys = Object.keys(obj);
      if (keys.length === 0) return "{}";
      if (keys.length <= 3 && Object.values(obj).every(val => typeof val !== "object")) {
        return `{${keys.map(k => `${k}: ${JSON.stringify(obj[k])}`).join(", ")}}`;
      }
      return `{${keys.length} properties}`;
    };

    return (
      <div class="p-4 font-mono text-sm space-y-2">
        {Object.entries(data || {}).map(([key, value]) => (
          <div key={key} class="flex items-start gap-2">
            <span class="font-semibold text-primary-600 dark:text-primary-400">
              {key}:
            </span>
            <span class="text-text-secondary dark:text-text-dark-secondary">
              {renderCompactValue(value)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderTabView = () => {
    if (!data || typeof data !== "object") {
      return (
        <div class="p-4 text-sm text-gray-500 dark:text-gray-400">
          No data available
        </div>
      );
    }

    const rootKeys = Object.keys(data);

    const getItemCount = (value: any): number => {
      if (value === null || value === undefined) return 0;
      if (Array.isArray(value)) return value.length;
      if (typeof value === "object") return Object.keys(value).length;
      return 1;
    };

    return (
      <>
        {/* Tab Headers */}
        <div class="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {rootKeys.map((key) => {
            const isActive = activeTab.value === key;
            const itemCount = getItemCount(data[key]);

            return (
              <button
                key={key}
                onClick$={() => (activeTab.value = key)}
                class={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors whitespace-nowrap border-b-2 ${
                  isActive
                    ? "text-primary-600 dark:text-primary-400 border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                    : "text-gray-600 dark:text-gray-400 border-transparent hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <span>{key}</span>
                <span class={`text-xs px-1.5 py-0.5 rounded-full ${
                  isActive
                    ? "bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-300"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                }`}>
                  {itemCount}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div class="p-4 font-mono text-sm">
          {activeTab.value && data[activeTab.value] !== undefined ? (
            typeof data[activeTab.value] === "object" && data[activeTab.value] !== null ? (
              Object.entries(data[activeTab.value]).map(([key, value], index, entries) => (
                <JsonTreeNode
                  key={key}
                  nodeKey={key}
                  value={value}
                  level={0}
                  isLast={index === entries.length - 1}
                  searchTerm={searchTerm}
                  expandAll={expandAll}
                />
              ))
            ) : (
              <div class="flex items-start gap-2">
                <span class="font-semibold">{activeTab.value}:</span>
                <span class={`${
                  typeof data[activeTab.value] === "string"
                    ? "text-green-600 dark:text-green-400"
                    : typeof data[activeTab.value] === "number"
                    ? "text-blue-600 dark:text-blue-400"
                    : typeof data[activeTab.value] === "boolean"
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-500 dark:text-gray-400"
                }`}>
                  {typeof data[activeTab.value] === "string"
                    ? `"${data[activeTab.value]}"`
                    : String(data[activeTab.value])}
                </span>
              </div>
            )
          ) : (
            <div class="text-sm text-gray-500 dark:text-gray-400">
              No data in this tab
            </div>
          )}
        </div>
      </>
    );
  };

  const renderRawView = () => {
    return (
      <pre class="p-4 font-mono text-sm overflow-auto">
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    );
  };

  return (
    <div class={`rounded-lg bg-surface-secondary/50 dark:bg-surface-dark-secondary/50 ${className}`}>
      {/* Header Controls */}
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex items-center gap-2 w-full sm:w-auto">
          {/* Search Input */}
          {(viewMode.value === "tree" || viewMode.value === "tabs") && (
            <div class="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder={$localize`Search...`}
                value={searchTerm.value}
                onInput$={(e) => {
                  searchTerm.value = (e.target as HTMLInputElement).value;
                }}
                class="w-full sm:w-48 px-3 py-1.5 pl-8 text-sm rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <svg
                class="absolute left-2.5 top-2 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}

          {/* View Mode Selector */}
          <div class="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-md p-0.5">
            <button
              onClick$={() => (viewMode.value = "tree")}
              class={`px-3 py-1 text-xs rounded transition-colors ${
                viewMode.value === "tree"
                  ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {$localize`Tree`}
            </button>
            <button
              onClick$={() => (viewMode.value = "compact")}
              class={`px-3 py-1 text-xs rounded transition-colors ${
                viewMode.value === "compact"
                  ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {$localize`Compact`}
            </button>
            <button
              onClick$={() => (viewMode.value = "raw")}
              class={`px-3 py-1 text-xs rounded transition-colors ${
                viewMode.value === "raw"
                  ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {$localize`Raw`}
            </button>
            <button
              onClick$={() => (viewMode.value = "tabs")}
              class={`px-3 py-1 text-xs rounded transition-colors ${
                viewMode.value === "tabs"
                  ? "bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              {$localize`Tabs`}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div class="flex items-center gap-2">
          {(viewMode.value === "tree" || viewMode.value === "tabs") && (
            <>
              <button
                onClick$={() => (expandAll.value = !expandAll.value)}
                class="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                title={expandAll.value ? $localize`Collapse All` : $localize`Expand All`}
              >
                <svg
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {expandAll.value ? (
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  ) : (
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  )}
                </svg>
                <span>{expandAll.value ? $localize`Collapse` : $localize`Expand`}</span>
              </button>
            </>
          )}
          <button
            onClick$={() => {
              navigator.clipboard.writeText(JSON.stringify(data, null, 2));
            }}
            class="flex items-center gap-1 px-2 py-1 text-xs rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title={$localize`Copy JSON`}
          >
            <svg
              class="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>{$localize`Copy`}</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div style={`max-height: ${maxHeight}; overflow: auto;`}>
        {viewMode.value === "tree" && renderTreeView()}
        {viewMode.value === "compact" && renderCompactView()}
        {viewMode.value === "raw" && renderRawView()}
        {viewMode.value === "tabs" && renderTabView()}
      </div>
    </div>
  );
});