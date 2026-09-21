import { component$, Slot } from "@builder.io/qwik";

export interface SummaryItemCardProps {
  statusColorClass: string;
  class?: string;
  contentClass?: string;
  trailingClass?: string;
}

export const SummaryItemCard = component$<SummaryItemCardProps>(
  ({ statusColorClass, class: className, contentClass, trailingClass }) => {
    const wrapperClasses = [
      "rounded-lg border bg-gradient-to-r from-white to-gray-50 p-4 dark:from-gray-800 dark:to-gray-900",
      statusColorClass,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const detailsClasses = ["min-w-0", contentClass].filter(Boolean).join(" ");
    const statusClasses = [
      "flex shrink-0 flex-col items-end gap-1.5 pt-0.5",
      trailingClass,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div class={wrapperClasses}>
        <div class="flex items-start justify-between gap-4">
          <div class="flex min-w-0 items-start gap-3">
            <Slot name="badge" />
            <Slot name="icon" />
            <div class={detailsClasses}>
              <Slot />
            </div>
          </div>

          <div class={statusClasses}>
            <Slot name="trailing" />
          </div>
        </div>
      </div>
    );
  },
);
