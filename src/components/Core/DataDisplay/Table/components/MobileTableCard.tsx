import { component$, $ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";
import type { TableColumn } from "../Table.types";

interface MobileTableCardProps {
  row: any;
  rowIndex: number;
  columns: TableColumn<any>[];
  getCellValue: (row: any, column: TableColumn<any>, index: number) => unknown;
  onClick$?: QRL<(row: any, index: number) => void>;
}

export const MobileTableCard = component$<MobileTableCardProps>((props) => {
  const { row, rowIndex, columns, getCellValue, onClick$ } = props;

  return (
    <div
      class={[
        "bg-white dark:bg-gray-800",
        "rounded-lg",
        "shadow-mobile-card",
        "p-4",
        "mb-3",
        "transition-all duration-200",
        "animate-fade-in motion-safe:animate-slide-up",
        onClick$
          ? "cursor-pointer touch:active:scale-[0.98] can-hover:hover:shadow-md"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...(onClick$ && { onClick$: $(() => onClick$(row, rowIndex)) })}
    >
      {columns.map((column) => {
        const value = getCellValue(row, column, rowIndex);
        const isHidden = column.hideOnMobile;

        if (isHidden) return null;

        return (
          <div
            key={column.id}
            class={[
              "flex",
              "items-start",
              "justify-between",
              "py-2",
              "border-b border-gray-100 dark:border-gray-700",
              "last:border-b-0",
            ].join(" ")}
          >
            {/* Label */}
            <div class="min-w-[120px] text-sm font-medium text-gray-600 dark:text-gray-400">
              {column.mobileLabel || column.header}
            </div>

            {/* Value */}
            <div
              class={[
                "text-sm",
                "text-gray-900 dark:text-gray-100",
                "text-right",
                "flex-1",
                "ml-3",
                column.truncate ? "truncate" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {column.renderCell
                ? column.renderCell(value, row, rowIndex)
                : value !== undefined && value !== null
                  ? String(value)
                  : "—"}
            </div>
          </div>
        );
      })}
    </div>
  );
});
