import { component$, useSignal, $, useTask$ } from "@builder.io/qwik";
import type { Signal } from "@builder.io/qwik";

interface JsonTreeNodeProps {
  nodeKey: string;
  value: any;
  level?: number;
  isLast?: boolean;
  searchTerm?: Signal<string>;
  expandAll?: Signal<boolean>;
}

export const JsonTreeNode = component$<JsonTreeNodeProps>((props) => {
  const { nodeKey, value, level = 0, isLast = true, searchTerm, expandAll } = props;
  const isExpanded = useSignal(level < 2);

  // Watch for changes to expandAll signal
  useTask$(({ track }) => {
    const shouldExpandAll = track(() => expandAll?.value);
    if (shouldExpandAll !== undefined) {
      isExpanded.value = shouldExpandAll;
    }
  });

  const getValueType = (val: any): string => {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
  };

  const valueType = getValueType(value);
  const isComplex = valueType === "object" || valueType === "array";

  const getPropertyCount = (_obj: any): number => {
    if (valueType === "array") return value.length;
    if (valueType === "object") return Object.keys(value).length;
    return 0;
  };

  const propertyCount = getPropertyCount(value);

  const getValueColor = (type: string): string => {
    switch (type) {
      case "string":
        return "text-green-600 dark:text-green-400";
      case "number":
        return "text-blue-600 dark:text-blue-400";
      case "boolean":
        return "text-purple-600 dark:text-purple-400";
      case "null":
      case "undefined":
        return "text-gray-500 dark:text-gray-400";
      default:
        return "text-text-primary dark:text-text-dark-primary";
    }
  };

  const highlightMatch = (text: string): boolean => {
    if (!searchTerm?.value) return false;
    return text.toLowerCase().includes(searchTerm.value.toLowerCase());
  };

  const renderValue = () => {
    if (!isComplex) {
      const valueStr = valueType === "string" ? `"${value}"` : String(value);
      return (
        <span class={`ml-2 ${getValueColor(valueType)}`}>
          {valueStr}
        </span>
      );
    }

    if (!isExpanded.value) {
      const preview = valueType === "array"
        ? `[${propertyCount} items]`
        : `{${propertyCount} properties}`;
      return (
        <span class="ml-2 text-gray-500 dark:text-gray-400">
          {preview}
        </span>
      );
    }

    return null;
  };

  const handleToggle$ = $(() => {
    if (isComplex) {
      isExpanded.value = !isExpanded.value;
    }
  });

  const isHighlighted = highlightMatch(nodeKey) || highlightMatch(String(value));

  return (
    <div class={`${level > 0 ? "ml-4" : ""} ${!isLast ? "border-l border-gray-200 dark:border-gray-700" : ""}`}>
      <div class="flex items-start">
        <button
          onClick$={handleToggle$}
          disabled={!isComplex}
          class={`flex items-center gap-1 py-0.5 px-1 rounded hover:bg-surface-secondary/50 dark:hover:bg-surface-dark-secondary/50 ${
            !isComplex ? "cursor-default" : ""
          } ${isHighlighted ? "bg-yellow-100 dark:bg-yellow-900/20" : ""}`}
        >
          {isComplex && (
            <svg
              class={`h-3 w-3 text-gray-500 transition-transform ${
                isExpanded.value ? "rotate-90" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
          <span class={`font-mono text-sm ${level === 0 ? "font-semibold" : ""}`}>
            {nodeKey}:
          </span>
          {renderValue()}
        </button>
      </div>

      {isComplex && isExpanded.value && (
        <div class="mt-1">
          {valueType === "array" ? (
            value.map((item: any, index: number) => (
              <JsonTreeNode
                key={`${nodeKey}-${index}`}
                nodeKey={`[${index}]`}
                value={item}
                level={level + 1}
                isLast={index === value.length - 1}
                searchTerm={searchTerm}
                expandAll={expandAll}
              />
            ))
          ) : (
            Object.entries(value).map(([key, val], index, entries) => (
              <JsonTreeNode
                key={`${nodeKey}-${key}`}
                nodeKey={key}
                value={val}
                level={level + 1}
                isLast={index === entries.length - 1}
                searchTerm={searchTerm}
                expandAll={expandAll}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
});