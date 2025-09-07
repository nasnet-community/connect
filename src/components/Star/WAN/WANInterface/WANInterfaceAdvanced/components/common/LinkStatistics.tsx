import { component$ } from "@builder.io/qwik";

export interface LinkStatisticsProps {
  activeLinks: number;
  configuredLinks: number;
  completedConnections?: number;
  hasErrors: boolean;
  showCompleted?: boolean;
}

export const LinkStatistics = component$<LinkStatisticsProps>(
  ({ activeLinks, configuredLinks, completedConnections, hasErrors, showCompleted = false }) => {
    return (
      <div class="mt-2 flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
        <span class="flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-green-500"></div>
          {activeLinks} Active
        </span>
        <span class="flex items-center gap-2">
          <div class="h-2 w-2 rounded-full bg-blue-500"></div>
          {configuredLinks} Configured
        </span>
        {showCompleted && completedConnections !== undefined && (
          <span class="flex items-center gap-2">
            <div class="h-2 w-2 rounded-full bg-green-500"></div>
            {completedConnections} Complete
          </span>
        )}
        {hasErrors && (
          <span class="flex items-center gap-2">
            <div class="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
            Issues Detected
          </span>
        )}
      </div>
    );
  }
);