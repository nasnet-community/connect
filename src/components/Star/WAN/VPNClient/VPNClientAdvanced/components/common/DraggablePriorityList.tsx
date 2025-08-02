import { component$, $, useSignal, type QRL } from "@builder.io/qwik";

interface DraggableItem {
  id: string;
  name: string;
  type: string;
}

interface DraggablePriorityListProps {
  items: DraggableItem[];
  onReorder$: QRL<(newOrder: string[]) => Promise<void>>;
}

export const DraggablePriorityList = component$<DraggablePriorityListProps>(
  (props) => {
    const draggedItem = useSignal<string | null>(null);
    const draggedOverItem = useSignal<string | null>(null);

    const handleDragStart = $((e: DragEvent, itemId: string) => {
      draggedItem.value = itemId;
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "move";
      }
    });

    const handleDragOver = $((e: DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer) {
        e.dataTransfer.dropEffect = "move";
      }
    });

    const handleDragEnter = $((itemId: string) => {
      draggedOverItem.value = itemId;
    });

    const handleDragLeave = $(() => {
      draggedOverItem.value = null;
    });

    const handleDrop = $(async (e: DragEvent, dropItemId: string) => {
      e.preventDefault();

      if (draggedItem.value && draggedItem.value !== dropItemId) {
        const newOrder = [...props.items.map((item) => item.id)];
        const draggedIndex = newOrder.indexOf(draggedItem.value);
        const dropIndex = newOrder.indexOf(dropItemId);

        if (draggedIndex !== -1 && dropIndex !== -1) {
          // Remove dragged item
          const [removed] = newOrder.splice(draggedIndex, 1);
          // Insert at new position
          newOrder.splice(dropIndex, 0, removed);

          await props.onReorder$(newOrder);
        }
      }

      draggedItem.value = null;
      draggedOverItem.value = null;
    });

    const handleMoveUp = $(async (itemId: string) => {
      const currentIndex = props.items.findIndex((item) => item.id === itemId);
      if (currentIndex > 0) {
        const newOrder = [...props.items.map((item) => item.id)];
        [newOrder[currentIndex - 1], newOrder[currentIndex]] = [
          newOrder[currentIndex],
          newOrder[currentIndex - 1],
        ];
        await props.onReorder$(newOrder);
      }
    });

    const handleMoveDown = $(async (itemId: string) => {
      const currentIndex = props.items.findIndex((item) => item.id === itemId);
      if (currentIndex < props.items.length - 1) {
        const newOrder = [...props.items.map((item) => item.id)];
        [newOrder[currentIndex], newOrder[currentIndex + 1]] = [
          newOrder[currentIndex + 1],
          newOrder[currentIndex],
        ];
        await props.onReorder$(newOrder);
      }
    });

    return (
      <div class="space-y-2">
        {props.items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart$={(e) => handleDragStart(e, item.id)}
            onDragOver$={handleDragOver}
            onDragEnter$={() => handleDragEnter(item.id)}
            onDragLeave$={handleDragLeave}
            onDrop$={(e) => handleDrop(e, item.id)}
            class={`
            flex items-center justify-between rounded-lg border p-4 transition-all
            ${
              draggedOverItem.value === item.id
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-border bg-surface dark:border-border-dark dark:bg-surface-dark"
            }
            ${draggedItem.value === item.id ? "opacity-50" : ""}
            cursor-move
          `}
          >
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <svg
                  class="text-text-muted dark:text-text-dark-muted h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <span class="text-lg font-medium text-primary-600 dark:text-primary-400">
                  #{index + 1}
                </span>
              </div>

              <div>
                <div class="text-text-default font-medium dark:text-text-dark-default">
                  {item.name}
                </div>
                <div class="text-text-muted dark:text-text-dark-muted text-sm">
                  {item.type}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-2">
              <button
                onClick$={() => handleMoveUp(item.id)}
                disabled={index === 0}
                class={`rounded p-1 transition-colors
                ${
                  index === 0
                    ? "cursor-not-allowed text-gray-300 dark:text-gray-600"
                    : "text-primary-600 hover:bg-primary-100 dark:text-primary-400 dark:hover:bg-primary-900/20"
                }`}
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </button>
              <button
                onClick$={() => handleMoveDown(item.id)}
                disabled={index === props.items.length - 1}
                class={`rounded p-1 transition-colors
                ${
                  index === props.items.length - 1
                    ? "cursor-not-allowed text-gray-300 dark:text-gray-600"
                    : "text-primary-600 hover:bg-primary-100 dark:text-primary-400 dark:hover:bg-primary-900/20"
                }`}
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  },
);
