import { component$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { GameHeader } from "./GameHeader";
import { GameSearch } from "./GameSearch";
import { GameTable } from "./GameTable";
import { GameSelected } from "./GameSelected";
import { GamePagination } from "./GamePagination";
import { useGameLogic } from "./useGame";

export const Game = component$<StepProps>(({ onComplete$ }) => {
  const { searchQuery, currentPage, itemsPerPage, context } = useGameLogic();

  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        <GameHeader />
        <div class="space-y-6 p-6">
          <GameSearch searchQuery={searchQuery} />
          <GameTable
            context={context}
            searchQuery={searchQuery}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <GameSelected context={context} />
          <GamePagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
          <div class="mt-8 flex justify-end">
            <button
              onClick$={onComplete$}
              class="rounded-lg bg-primary-500 px-6 py-2 text-white transition-colors duration-200 hover:bg-primary-600"
            >
              {$localize`Save`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
