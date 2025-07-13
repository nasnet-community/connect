import { component$ } from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { StarContext } from "~/components/Star/StarContext/StarContext";
import { StateHeader } from "./StateHeader";
import { StateHistory } from "./StateHistory";
import { ContextPaster } from "./ContextPaster";
import { ConfigViewer } from "./ConfigViewer";
import { useStateViewer } from "./useStateViewer";

export const StateViewer = component$(() => {
  const context = useContext(StarContext);
  const {
    isOpen,
    stateHistory,
    configOutput,
    pastedContext,
    pastedContextConfig,
    pasteError,
    generateConfig$,
    handlePasteContext$,
    handleGenerateFromPaste$,
    refreshState$,
    downloadLatest$,
    downloadPastedConfig$,
    downloadCurrentConfig$,
  } = useStateViewer(context.state);

  return (
    <>
      <button
        onClick$={() => (isOpen.value = true)}
        class="fixed bottom-4 right-4 z-50 rounded-full bg-primary-500 p-3 text-white shadow-lg hover:bg-primary-600"
        aria-label={$localize`Open Developer Tools`}
      >
        <span class="sr-only">{$localize`Open Developer Tools`}</span>
        <svg
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      </button>

      {isOpen.value && (
        <div class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div class="fixed inset-4 overflow-hidden rounded-xl bg-surface shadow-2xl dark:bg-surface-dark lg:inset-10">
            <StateHeader onClose$={() => (isOpen.value = false)} />

            <div class="grid h-[calc(100%-89px)] grid-cols-2 gap-4 overflow-auto p-6">
              <div class="space-y-6">
                <StateHistory
                  entries={stateHistory.value}
                  onCopy$={(state) =>
                    navigator.clipboard.writeText(
                      JSON.stringify(state, null, 2),
                    )
                  }
                  onClearHistory$={() => (stateHistory.value = [])}
                  onCopyAll$={() =>
                    navigator.clipboard.writeText(
                      JSON.stringify(stateHistory.value, null, 2),
                    )
                  }
                  onRefresh$={refreshState$}
                  onGenerateConfig$={generateConfig$}
                  onDownloadLatest$={downloadLatest$}
                />
                <ContextPaster
                  value={pastedContext.value}
                  error={pasteError.value}
                  onPaste={handlePasteContext$}
                  onGenerate={handleGenerateFromPaste$}
                />
              </div>

              <ConfigViewer
                currentConfig={configOutput.value}
                pastedConfig={pastedContextConfig.value}
                onDownloadPastedConfig$={downloadPastedConfig$}
                onDownloadCurrentConfig$={downloadCurrentConfig$}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
});
