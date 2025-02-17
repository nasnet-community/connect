import { component$ } from "@builder.io/qwik";
import { games } from "./GameData";
import type { GamePaginationProps } from "./type";

export const GamePagination = component$<GamePaginationProps>(
  ({ currentPage, itemsPerPage }) => {
    const totalPages = Math.ceil(games.length / itemsPerPage);

    return (
      <div class="flex items-center justify-between pt-4">
        <button
          onClick$={() => currentPage.value > 1 && currentPage.value--}
          disabled={currentPage.value === 1}
          class="px-4 py-2 text-text-secondary disabled:opacity-50 dark:text-text-dark-secondary"
        >
          {$localize`Previous`}
        </button>
        <span class="text-text-secondary dark:text-text-dark-secondary">
          {$localize`Page ${currentPage.value} of ${totalPages}`}
        </span>
        <button
          onClick$={() => currentPage.value < totalPages && currentPage.value++}
          disabled={currentPage.value === totalPages}
          class="px-4 py-2 text-text-secondary disabled:opacity-50 dark:text-text-dark-secondary"
        >
          {$localize`Next`}
        </button>
      </div>
    );
  },
);
