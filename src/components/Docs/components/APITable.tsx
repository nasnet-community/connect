import { component$ } from "@builder.io/qwik";
import type { PropDetail, EventDetail, MethodDetail } from "../templates";

export interface APITableProps {
  type: "props" | "events" | "methods" | "cssVariables" | "dataAttributes";
  data: PropDetail[] | EventDetail[] | MethodDetail[] | any[];
  title?: string;
}

export const APITable = component$<APITableProps>(
  ({ type, data = [], title }) => {
    if (data.length === 0) {
      return null;
    }

    return (
      <div class="mb-8 overflow-x-auto">
        {title && (
          <h3 class="mb-4 text-lg font-semibold text-gray-900 sm:text-xl dark:text-white">
            {title}
          </h3>
        )}

        <table class="w-full text-left text-sm">
          <thead class="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              {/* Common column for all table types */}
              <th class="px-4 py-3 font-medium">Name</th>

              {/* Specific columns based on table type */}
              {type === "props" && (
                <>
                  <th class="px-4 py-3 font-medium">Type</th>
                  <th class="px-4 py-3 font-medium">Default</th>
                  <th class="px-4 py-3 font-medium">Description</th>
                </>
              )}

              {type === "events" && (
                <>
                  <th class="px-4 py-3 font-medium">Arguments</th>
                  <th class="px-4 py-3 font-medium">Description</th>
                </>
              )}

              {type === "methods" && (
                <>
                  <th class="px-4 py-3 font-medium">Arguments</th>
                  <th class="px-4 py-3 font-medium">Return Type</th>
                  <th class="px-4 py-3 font-medium">Description</th>
                </>
              )}

              {type === "cssVariables" && (
                <>
                  <th class="px-4 py-3 font-medium">Default</th>
                  <th class="px-4 py-3 font-medium">Description</th>
                </>
              )}

              {type === "dataAttributes" && (
                <>
                  <th class="px-4 py-3 font-medium">Description</th>
                </>
              )}
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item, index) => (
              <tr key={index} class="bg-white dark:bg-gray-900">
                {/* Common cell for all table types */}
                <td class="whitespace-nowrap px-4 py-3 font-mono text-primary-600 dark:text-primary-400">
                  {item.name}
                  {type === "props" && (item as PropDetail).required && (
                    <span class="ml-1 text-red-500">*</span>
                  )}
                </td>

                {/* Specific cells based on table type */}
                {type === "props" && (
                  <>
                    <td class="px-4 py-3 font-mono text-gray-500 dark:text-gray-400">
                      {(item as PropDetail).type}
                    </td>
                    <td class="px-4 py-3 font-mono text-gray-500 dark:text-gray-400">
                      {(item as PropDetail).defaultValue !== undefined ? (
                        (item as PropDetail).defaultValue
                      ) : (
                        <span class="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {(item as PropDetail).description}
                    </td>
                  </>
                )}

                {type === "events" && (
                  <>
                    <td class="px-4 py-3 font-mono text-gray-500 dark:text-gray-400">
                      {(item as EventDetail).args !== undefined ? (
                        (item as EventDetail).args
                      ) : (
                        <span class="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {(item as EventDetail).description}
                    </td>
                  </>
                )}

                {type === "methods" && (
                  <>
                    <td class="px-4 py-3 font-mono text-gray-500 dark:text-gray-400">
                      {(item as MethodDetail).args !== undefined ? (
                        (item as MethodDetail).args
                      ) : (
                        <span class="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </td>
                    <td class="px-4 py-3 font-mono text-gray-500 dark:text-gray-400">
                      {(item as MethodDetail).returnType !== undefined ? (
                        (item as MethodDetail).returnType
                      ) : (
                        <span class="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {(item as MethodDetail).description}
                    </td>
                  </>
                )}

                {type === "cssVariables" && (
                  <>
                    <td class="px-4 py-3 font-mono text-gray-500 dark:text-gray-400">
                      {item.defaultValue !== undefined ? (
                        item.defaultValue
                      ) : (
                        <span class="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </td>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {item.description}
                    </td>
                  </>
                )}

                {type === "dataAttributes" && (
                  <>
                    <td class="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {item.description}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
);

export default APITable;
