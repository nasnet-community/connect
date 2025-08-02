import { component$, useSignal, $, type QRL } from "@builder.io/qwik";

interface VPNBoxHeaderProps {
  id: string;
  name: string;
  type: string;
  onRemove$?: QRL<() => Promise<void>>;
  onNameChange$?: QRL<(name: string) => Promise<void>>;
  editable?: boolean;
}

export const VPNBoxHeader = component$<VPNBoxHeaderProps>(
  ({ name, type, onRemove$, onNameChange$, editable = true }) => {
    const isEditing = useSignal(false);
    const editedName = useSignal(name);

    const handleSave = $(async () => {
      if (onNameChange$ && editedName.value !== name) {
        await onNameChange$(editedName.value);
      }
      isEditing.value = false;
    });

    const handleCancel = $(() => {
      editedName.value = name;
      isEditing.value = false;
    });

    return (
      <div class="mb-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          {isEditing.value && editable ? (
            <div class="flex items-center gap-2">
              <input
                type="text"
                value={editedName.value}
                onInput$={(e) =>
                  (editedName.value = (e.target as HTMLInputElement).value)
                }
                class="text-text-default rounded border border-border bg-background px-2
                     py-1 text-lg
                     font-medium dark:border-border-dark
                     dark:bg-background-dark dark:text-text-dark-default"
                onKeyDown$={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
              />
              <button
                onClick$={handleSave}
                class="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </button>
              <button
                onClick$={handleCancel}
                class="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <>
              <h3 class="text-text-default text-lg font-medium dark:text-text-dark-default">
                {name}
              </h3>
              {editable && (
                <button
                  onClick$={() => (isEditing.value = true)}
                  class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                >
                  <svg
                    class="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
              )}
            </>
          )}
          <span
            class="rounded-full bg-primary-100 px-2 py-1 text-xs
                     font-medium text-primary-700
                     dark:bg-primary-900/20 dark:text-primary-300"
          >
            {type}
          </span>
        </div>

        {onRemove$ && (
          <button
            onClick$={onRemove$}
            class="text-red-600 transition-colors hover:text-red-700 dark:text-red-400
                 dark:hover:text-red-300"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);
