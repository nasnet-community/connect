import { component$, $, useSignal, type QRL } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import type { VPNClientAdvancedState } from "../types/VPNClientAdvancedTypes";
import type { UseVPNClientAdvancedReturn } from "../hooks/useVPNClientAdvanced";

export interface Step3StrategyReviewProps {
  wizardState: VPNClientAdvancedState;
  wizardActions: UseVPNClientAdvancedReturn;
  onRefreshCompletion$?: QRL<() => Promise<void>>;
}

export const Step3_StrategyReview = component$<Step3StrategyReviewProps>(({
  wizardState,
  wizardActions,
  onRefreshCompletion$
}) => {
  const draggedIndex = useSignal<number | null>(null);
  const dragOverIndex = useSignal<number | null>(null);
  const isDragging = useSignal(false);
  const editingVPN = useSignal<string | null>(null);
  const editedName = useSignal<string>("");

  // Sort VPNs by priority
  const sortedVPNs = [...wizardState.vpnConfigs].sort(
    (a, b) => (a.priority || 0) - (b.priority || 0)
  );


  // Drag and drop handlers
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

  const handleDrop = $(async (e: DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedIndex.value === null || draggedIndex.value === dropIndex) {
      return;
    }

    const newVPNs = [...sortedVPNs];
    const [draggedVPN] = newVPNs.splice(draggedIndex.value, 1);
    newVPNs.splice(dropIndex, 0, draggedVPN);

    // Prepare batch updates for priority
    const updates = newVPNs.map((vpn, index) => ({
      id: vpn.id,
      updates: { priority: index + 1 }
    }));

    // Update all priorities at once
    await wizardActions.batchUpdateVPNs$(updates);

    draggedIndex.value = null;
    dragOverIndex.value = null;
    isDragging.value = false;

    if (onRefreshCompletion$) {
      await onRefreshCompletion$();
    }
  });

  const moveUp = $(async (index: number) => {
    if (index === 0) return;

    const newVPNs = [...sortedVPNs];
    [newVPNs[index], newVPNs[index - 1]] = [
      newVPNs[index - 1],
      newVPNs[index],
    ];

    // Prepare batch updates
    const updates = newVPNs.map((vpn, idx) => ({
      id: vpn.id,
      updates: { priority: idx + 1 }
    }));

    // Update all priorities at once
    await wizardActions.batchUpdateVPNs$(updates);

    if (onRefreshCompletion$) {
      await onRefreshCompletion$();
    }
  });

  const moveDown = $(async (index: number) => {
    if (index === sortedVPNs.length - 1) return;

    const newVPNs = [...sortedVPNs];
    [newVPNs[index], newVPNs[index + 1]] = [
      newVPNs[index + 1],
      newVPNs[index],
    ];

    // Prepare batch updates
    const updates = newVPNs.map((vpn, idx) => ({
      id: vpn.id,
      updates: { priority: idx + 1 }
    }));

    // Update all priorities at once
    await wizardActions.batchUpdateVPNs$(updates);

    if (onRefreshCompletion$) {
      await onRefreshCompletion$();
    }
  });

  // Quick edit VPN name
  const startEdit = $((vpnId: string, currentName: string) => {
    editingVPN.value = vpnId;
    editedName.value = currentName;
  });

  const saveEdit = $(async (vpnId: string) => {
    await wizardActions.updateVPN$(vpnId, { name: editedName.value });
    editingVPN.value = null;
    editedName.value = "";
  });

  const cancelEdit = $(() => {
    editingVPN.value = null;
    editedName.value = "";
  });

  const getConfigSummary = (vpn: (typeof wizardState.vpnConfigs)[0]) => {
    const details: string[] = [];

    switch (vpn.type) {
      case "Wireguard":
        if (vpn.config && "PeerEndpointAddress" in vpn.config) {
          details.push(
            `Server: ${vpn.config.PeerEndpointAddress}:${vpn.config.PeerEndpointPort || 51820}`
          );
          if (vpn.config.InterfaceAddress) {
            details.push(`Interface: ${vpn.config.InterfaceAddress}`);
          }
        }
        break;

      case "OpenVPN":
        if (vpn.config && "Server" in vpn.config && vpn.config.Server) {
          details.push(
            `Server: ${vpn.config.Server.Address}:${vpn.config.Server.Port || "1194"}`
          );
          if ("AuthType" in vpn.config) {
            details.push(`Auth: ${vpn.config.AuthType || "Certificate"}`);
          }
        }
        break;

      case "L2TP":
        if (vpn.config && "Server" in vpn.config && vpn.config.Server) {
          details.push(`Server: ${vpn.config.Server.Address}`);
          if ("UseIPsec" in vpn.config) {
            details.push(
              `IPSec: ${vpn.config.UseIPsec ? "Enabled" : "Disabled"}`
            );
          }
        }
        break;

      case "PPTP":
        if (vpn.config && "ConnectTo" in vpn.config) {
          details.push(`Server: ${vpn.config.ConnectTo}`);
        }
        break;

      case "SSTP":
        if (vpn.config && "Server" in vpn.config && vpn.config.Server) {
          details.push(
            `Server: ${vpn.config.Server.Address}:${vpn.config.Server.Port || "443"}`
          );
        }
        break;

      case "IKeV2":
        if (vpn.config && "ServerAddress" in vpn.config) {
          details.push(`Server: ${vpn.config.ServerAddress}`);
          if ("AuthMethod" in vpn.config) {
            details.push(
              `Auth: ${vpn.config.AuthMethod || "pre-shared-key"}`
            );
          }
        }
        break;
    }

    return details;
  };


  return wizardState.vpnConfigs.length > 0 ? (
    <Card>
        <div class="p-6">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                {$localize`VPN Clients Detail`}
              </h3>
              <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                {$localize`Manage your VPN client configurations and their priority order`}
              </p>
            </div>
          </div>

          <div class="space-y-3">
            {sortedVPNs.map((vpn, index) => (
              <div
                key={vpn.id}
                draggable
                onDragStart$={() => handleDragStart(index)}
                onDragEnd$={handleDragEnd}
                onDragOver$={(e) => handleDragOver(e, index)}
                onDrop$={(e) => handleDrop(e, index)}
                class={`transition-all duration-200 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-4 cursor-move ${
                  draggedIndex.value === index ? "opacity-50" : ""
                } ${
                  dragOverIndex.value === index && draggedIndex.value !== index ? "scale-105 transform border-primary-300 dark:border-primary-600" : ""
                }`}
              >
                <div class="flex items-center space-x-4">
                  {/* Priority Number */}
                  <div class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30">
                    <span class="text-sm font-semibold text-primary-700 dark:text-primary-300">
                      {index + 1}
                    </span>
                  </div>

                  {/* VPN Info */}
                  <div class="flex-1">
                    <div class="flex items-center space-x-3">
                      {editingVPN.value === vpn.id ? (
                        <div class="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editedName.value}
                            onInput$={(e) => {
                              editedName.value = (e.target as HTMLInputElement).value;
                            }}
                            onKeyDown$={(e) => {
                              if (e.key === "Enter") {
                                saveEdit(vpn.id);
                              } else if (e.key === "Escape") {
                                cancelEdit();
                              }
                            }}
                            class="rounded border border-primary-300 px-2 py-1 text-sm focus:ring-1 focus:ring-primary-500 dark:border-primary-600 dark:bg-gray-700"
                            autoFocus
                          />
                          <button
                            onClick$={() => saveEdit(vpn.id)}
                            class="p-1 text-green-600 hover:text-green-700 dark:text-green-400"
                          >
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button
                            onClick$={cancelEdit}
                            class="p-1 text-red-600 hover:text-red-700 dark:text-red-400"
                          >
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div class="flex items-center space-x-2">
                          <h4 class="font-medium text-gray-900 dark:text-white">
                            {vpn.name}
                          </h4>
                          <button
                            onClick$={() => startEdit(vpn.id, vpn.name)}
                            class="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                      )}
                      
                      <span class="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                        {vpn.type}
                      </span>
                    </div>

                    {/* Config Summary */}
                    <div class="mt-2 text-sm text-gray-600 dark:text-gray-400">
                      {getConfigSummary(vpn).map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </div>

                  {/* Move Controls */}
                  <div class="flex items-center space-x-2">
                    <button
                      onClick$={() => moveUp(index)}
                      disabled={index === 0}
                      class={`rounded-md p-2 transition-colors ${
                        index === 0 ? "cursor-not-allowed text-gray-400" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      }`}
                    >
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>

                    <button
                      onClick$={() => moveDown(index)}
                      disabled={index === sortedVPNs.length - 1}
                      class={`rounded-md p-2 transition-colors ${
                        index === sortedVPNs.length - 1 ? "cursor-not-allowed text-gray-400" : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      }`}
                    >
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Drag Handle */}
                    <div class="cursor-move p-2 text-gray-400">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Card>
  ) : (
    <div class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">
        {$localize`No VPN clients to review`}
      </h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {$localize`Please complete Steps 1 and 2 before reviewing your configuration.`}
      </p>
    </div>
  );
});