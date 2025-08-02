import { component$ } from "@builder.io/qwik";
import { games } from "./GameData";
import type { GamePaginationProps } from "./type";

export const GamePagination = component$<GamePaginationProps>(
  ({ currentPage, itemsPerPage, searchQuery }) => {
    const filteredGames = games.filter((game) =>
      game.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

    return (
      <div class="flex items-center justify-between pt-4">
        <button
          onClick$={() => currentPage.value > 1 && currentPage.value--}
          disabled={currentPage.value === 1}
          class="text-text-secondary dark:text-text-dark-secondary px-4 py-2 disabled:opacity-50"
        >
          {$localize`Previous`}
        </button>
        <span class="text-text-secondary dark:text-text-dark-secondary">
          {$localize`Page ${currentPage.value} of ${totalPages}`}
        </span>
        <button
          onClick$={() => currentPage.value < totalPages && currentPage.value++}
          disabled={currentPage.value === totalPages}
          class="text-text-secondary dark:text-text-dark-secondary px-4 py-2 disabled:opacity-50"
        >
          {$localize`Next`}
        </button>
      </div>
    );
  },
);
