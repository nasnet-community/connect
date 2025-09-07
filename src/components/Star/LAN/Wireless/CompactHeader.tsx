import { component$, type QRL } from "@builder.io/qwik";
import { 
  HiExclamationTriangleOutline, 
  HiSparklesOutline
} from "@qwikest/icons/heroicons";
import { Button } from "~/components/Core";

interface CompactHeaderProps {
  generateAllPasswords: QRL<() => Promise<void>>;
  isLoading: boolean;
  activeNetworksCount: number;
  totalNetworksCount: number;
}

export const CompactHeader = component$<CompactHeaderProps>(
  ({ 
    generateAllPasswords, 
    isLoading,
    activeNetworksCount,
    totalNetworksCount
  }) => {
    return (
      <div class="rounded-lg border border-warning-200 bg-gradient-to-r 
                  from-warning-50 to-warning-100 dark:border-warning-800 
                  dark:from-warning-900/20 dark:to-warning-800/20 p-3 sm:p-4">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left side - Info */}
          <div class="flex items-start gap-2">
            <HiExclamationTriangleOutline class="mt-0.5 h-5 w-5 flex-shrink-0 text-warning-500" />
            <div>
              <h3 class="text-sm font-medium text-warning-700 dark:text-warning-300">
                {$localize`Multiple Networks Configuration`}
              </h3>
              <p class="mt-0.5 text-xs text-warning-600 dark:text-warning-400">
                {$localize`${activeNetworksCount} of ${totalNetworksCount} networks active`}
              </p>
            </div>
          </div>

          {/* Right side - Actions */}
          <div class="flex items-center gap-2">
            {/* Generate Common Password Button */}
            <Button
              onClick$={generateAllPasswords}
              disabled={isLoading}
              loading={isLoading}
              variant="primary"
              size="sm"
              leftIcon
              class="min-w-[140px] sm:min-w-[180px]"
            >
              <HiSparklesOutline q:slot="leftIcon" class="h-4 w-4" />
              <span class="hidden sm:inline">{$localize`Generate Common Password`}</span>
              <span class="sm:hidden">{$localize`Common Pass`}</span>
            </Button>
          </div>
        </div>
      </div>
    );
  },
);