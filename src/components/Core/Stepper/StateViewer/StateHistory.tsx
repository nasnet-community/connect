import { component$ } from "@builder.io/qwik";
import { StateEntry } from "./StateEntry";
import type { StateHistoryProps } from "./type";

export const StateHistory = component$((props: StateHistoryProps) => {
  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="font-medium">{$localize`State History`}</h4>
      </div>

      {props.entries.length === 0 ? (
        <div class="text-sm text-text-secondary dark:text-text-dark-secondary">
          {$localize`No state history available`}
        </div>
      ) : (
        <div class="space-y-4">
          {props.entries.map((entry) => (
            <StateEntry
              key={entry.timestamp}
              entry={entry}
              onCopy$={() => props.onCopy$?.(entry.state)}
              onRefresh$={props.onRefresh$}
              onGenerateConfig$={props.onGenerateConfig$}
            />
          ))}
        </div>
      )}
    </div>
  );
});
