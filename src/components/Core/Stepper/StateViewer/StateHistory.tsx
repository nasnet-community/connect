import { component$, type QRL } from "@builder.io/qwik";
import { StateEntry } from "./StateEntry";

interface StateHistoryProps {
  entries: { timestamp: string; state: any }[];
  onCopy$?: QRL<(state: any) => void>;
}

export const StateHistory = component$((props: StateHistoryProps) => {
  return (
    <div class="space-y-4">
      <h4 class="font-medium">{$localize`State History`}</h4>
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
            />
          ))}
        </div>
      )}
    </div>
  );
});
