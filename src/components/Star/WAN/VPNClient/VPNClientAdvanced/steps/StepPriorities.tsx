import { component$, $, useSignal } from "@builder.io/qwik";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";
import { VPNBox } from "../components/VPNBox/VPNBox";
import { VPNBoxContent } from "../components/VPNBox/VPNBoxContent";

export interface StepPrioritiesProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
}

export const StepPriorities = component$<StepPrioritiesProps>(
  ({ wizardState, wizardActions }) => {
    const draggedIndex = useSignal<number | null>(null);
    const dragOverIndex = useSignal<number | null>(null);
    const isDragging = useSignal(false);

    // Sort VPNs by priority
    const sortedVPNs = [...wizardState.vpnConfigs].sort(
      (a, b) => (a.priority || 0) - (b.priority || 0),
    );

    const handleDragStart = $((index: number) => {
      draggedIndex.value = index;
      isDragging.value = true;
    });

    const handleDragEnd = $(() => {
      draggedIndex.value = null;
      dragOverIndex.value = null;
      isDragging.value = false;
    });

    const handleDragOver = $((e: DragEvent, index: number) => {
      e.preventDefault();
      dragOverIndex.value = index;
    });

    const handleDrop = $((e: DragEvent, dropIndex: number) => {
      e.preventDefault();

      if (draggedIndex.value === null || draggedIndex.value === dropIndex) {
        return;
      }

      const newVPNs = [...sortedVPNs];
      const [draggedVPN] = newVPNs.splice(draggedIndex.value, 1);
      newVPNs.splice(dropIndex, 0, draggedVPN);

      // Update priorities based on new order
      newVPNs.forEach((vpn, index) => {
        wizardActions.updateVPN$(vpn.id, { priority: index + 1 });
      });

      draggedIndex.value = null;
      dragOverIndex.value = null;
      isDragging.value = false;
    });

    const moveUp = $((index: number) => {
      if (index === 0) return;

      const newVPNs = [...sortedVPNs];
      [newVPNs[index], newVPNs[index - 1]] = [
        newVPNs[index - 1],
        newVPNs[index],
      ];

      newVPNs.forEach((vpn, idx) => {
        wizardActions.updateVPN$(vpn.id, { priority: idx + 1 });
      });
    });

    const moveDown = $((index: number) => {
      if (index === sortedVPNs.length - 1) return;

      const newVPNs = [...sortedVPNs];
      [newVPNs[index], newVPNs[index + 1]] = [
        newVPNs[index + 1],
        newVPNs[index],
      ];

      newVPNs.forEach((vpn, idx) => {
        wizardActions.updateVPN$(vpn.id, { priority: idx + 1 });
      });
    });

    return (
      <div class="space-y-6">
        {/* Header */}
        <div>
          <h2 class="text-lg font-medium text-gray-900 dark:text-gray-100">
            {$localize`Set VPN Priorities`}
          </h2>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {$localize`Drag and drop VPNs to set their priority order. Higher priority VPNs will be tried first.`}
          </p>
        </div>

        {/* Priority List */}
        <div class="space-y-3">
          {sortedVPNs.map((vpn, index) => (
            <div
              key={vpn.id}
              draggable
              onDragStart$={() => handleDragStart(index)}
              onDragEnd$={handleDragEnd}
              onDragOver$={(e) => handleDragOver(e, index)}
              onDrop$={(e) => handleDrop(e, index)}
              class={{
                "transition-all duration-200": true,
                "opacity-50": draggedIndex.value === index,
                "scale-105 transform":
                  dragOverIndex.value === index && draggedIndex.value !== index,
                "cursor-move": true,
              }}
            >
              <div class="flex items-center space-x-3">
                {/* Priority number */}
                <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                  <span class="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    {index + 1}
                  </span>
                </div>

                {/* VPN Box */}
                <div class="flex-1">
                  <VPNBox
                    id={vpn.id}
                    name={vpn.name}
                    type={vpn.type}
                    error={false}
                  >
                    <VPNBoxContent>
                      <div class="flex items-center justify-between">
                        <div>
                          <p class="font-medium text-gray-900 dark:text-gray-100">
                            {vpn.name}
                          </p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">
                            {vpn.type} Protocol
                          </p>
                        </div>

                        {/* Move buttons for non-touch devices */}
                        <div class="flex items-center space-x-2">
                          <button
                            onClick$={() => moveUp(index)}
                            disabled={index === 0}
                            class={{
                              "rounded-md p-2 transition-colors": true,
                              "cursor-not-allowed text-gray-400": index === 0,
                              "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700":
                                index > 0,
                            }}
                            title={$localize`Move up`}
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
                            onClick$={() => moveDown(index)}
                            disabled={index === sortedVPNs.length - 1}
                            class={{
                              "rounded-md p-2 transition-colors": true,
                              "cursor-not-allowed text-gray-400":
                                index === sortedVPNs.length - 1,
                              "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700":
                                index < sortedVPNs.length - 1,
                            }}
                            title={$localize`Move down`}
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

                          {/* Drag handle */}
                          <div class="cursor-move p-2 text-gray-400">
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
                                d="M4 8h16M4 16h16"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </VPNBoxContent>
                  </VPNBox>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div class="mt-6 rounded-lg bg-info-50 p-4 dark:bg-info-900/20">
          <div class="flex">
            <svg
              class="mr-2 h-5 w-5 text-info-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            <div class="text-sm text-info-700 dark:text-info-300">
              <p>{$localize`Tips:`}</p>
              <ul class="mt-1 list-inside list-disc space-y-1">
                <li>{$localize`Drag and drop VPN boxes to reorder them`}</li>
                <li>{$localize`Use arrow buttons for precise positioning`}</li>
                <li>{$localize`Priority 1 VPN will be tried first, then 2, and so on`}</li>
                <li>{$localize`VPNs with the same foreign link will be used in this priority order`}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
);
