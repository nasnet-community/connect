import { component$, Slot, type QRL } from "@builder.io/qwik";
import { HiServerOutline } from "@qwikest/icons/heroicons";

export interface ServerCardProps {

  title: string;

  enabled: boolean;

  onToggle$: QRL<(enabled: boolean) => void>;

  class?: string;

  titleClass?: string;
}

export const ServerCard = component$<ServerCardProps>(({
  title,
  enabled,
  onToggle$,
  class: className = "",
  titleClass = "",
}) => {
  return (
    <div class={`rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-800 ${className}`}>
      {/* Card Header with Title and Icon */}
      <div class={`mb-4 flex items-center gap-2 ${titleClass}`}>
        <HiServerOutline class="h-5 w-5 text-primary-500 dark:text-primary-400" />
        <h3 class="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
      </div>

      {/* Enable/Disable Toggle Switch */}
      <div class="mb-4 flex items-center justify-between">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          {$localize`Enable ${title}`}
        </label>
        <label class="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            checked={enabled}
            class="peer sr-only"
            onChange$={() => onToggle$(!enabled)}
          />
          <div class="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-500/25 dark:border-gray-600 dark:bg-gray-700"></div>
        </label>
      </div>
      
      {/* Content area - only shown when enabled */}
      {enabled && (
        <div class="space-y-4">
          <Slot />
        </div>
      )}
    </div>
  );
}); 