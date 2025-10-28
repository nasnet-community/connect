import { component$, useSignal, $ } from "@builder.io/qwik";
import type { ContextPasterProps } from "./type";

export const ContextPaster = component$((props: ContextPasterProps) => {
  const selectedFileName = useSignal<string>("");

  const handleFileChange$ = $((event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      selectedFileName.value = file.name;
      props.onFileUpload(file);
    }
  });

  const clearFile$ = $(() => {
    selectedFileName.value = "";
    props.onPaste("");
  });

  return (
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h4 class="font-medium">{$localize`Context Input`}</h4>
        <button
          onClick$={props.onGenerate}
          class="flex items-center gap-2 rounded-lg bg-primary-500 px-3 py-1.5 text-sm text-white hover:bg-primary-600"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
          {$localize`Generate`}
        </button>
      </div>

      {/* Mode Toggle */}
      <div class="flex items-center gap-2 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
        <button
          onClick$={() => props.onModeChange("paste")}
          class={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            props.uploadMode === "paste"
              ? "bg-white text-primary-600 shadow-sm dark:bg-gray-700 dark:text-primary-400"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          <div class="flex items-center justify-center gap-2">
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            {$localize`Paste`}
          </div>
        </button>
        <button
          onClick$={() => props.onModeChange("upload")}
          class={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            props.uploadMode === "upload"
              ? "bg-white text-primary-600 shadow-sm dark:bg-gray-700 dark:text-primary-400"
              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
          }`}
        >
          <div class="flex items-center justify-center gap-2">
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            {$localize`Upload`}
          </div>
        </button>
      </div>

      {/* Router Selection Dropdown */}
      <div class="space-y-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-950">
        <label class="block text-xs font-medium text-text-secondary dark:text-text-dark-secondary">
          {$localize`Select Router`}
        </label>
        {props.routerOptions.length > 0 ? (
          <>
            <select
              value={props.selectedRouter}
              onChange$={(e) => props.onRouterChange((e.target as HTMLSelectElement).value)}
              class="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              {props.routerOptions.map((router) => (
                <option key={router.id} value={router.id}>
                  {router.name}
                </option>
              ))}
            </select>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              {$localize`Configuration will be generated for the selected router`}
            </p>
          </>
        ) : (
          <div class="rounded-md border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-950">
            <p class="text-xs text-yellow-700 dark:text-yellow-300">
              {$localize`No routers configured. Please configure routers in Trunk Mode with Master and Slave routers to use this feature.`}
            </p>
          </div>
        )}
      </div>

      <div class="space-y-2">
        {/* Paste Mode */}
        {props.uploadMode === "paste" && (
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <button
                onClick$={() =>
                  navigator.clipboard.readText().then((text) => props.onPaste(text))
                }
                class="flex items-center gap-2 rounded-lg bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-600"
              >
                <svg
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                {$localize`Paste from Clipboard`}
              </button>
            </div>
            <textarea
              value={props.value}
              onChange$={(_, el) => props.onPaste(el.value)}
              class="h-96 w-full resize-none rounded-lg border border-gray-300 bg-white p-4 font-mono text-sm text-gray-900 placeholder:text-gray-500 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary dark:focus:ring-primary/30"
              placeholder={$localize`Paste your context here...`}
            />
          </div>
        )}

        {/* Upload Mode */}
        {props.uploadMode === "upload" && (
          <div class="space-y-2">
            <label
              class={`flex h-96 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                selectedFileName.value
                  ? "border-primary-500 bg-primary-50 dark:border-primary-400 dark:bg-primary-900/20"
                  : "border-gray-300 bg-white hover:border-primary-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:hover:border-primary-500 dark:hover:bg-gray-800"
              }`}
            >
              <input
                type="file"
                accept=".rsc,.txt"
                class="hidden"
                onChange$={handleFileChange$}
              />
              <div class="flex flex-col items-center justify-center gap-4 p-6 text-center">
                {selectedFileName.value ? (
                  <>
                    <svg
                      class="h-16 w-16 text-primary-500 dark:text-primary-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div class="space-y-2">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {$localize`File selected`}
                      </p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">
                        {selectedFileName.value}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick$={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        clearFile$();
                      }}
                      class="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                    >
                      <svg
                        class="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      {$localize`Clear File`}
                    </button>
                  </>
                ) : (
                  <>
                    <svg
                      class="h-16 w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                    <div class="space-y-2">
                      <p class="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {$localize`Click to upload or drag and drop`}
                      </p>
                      <p class="text-xs text-gray-600 dark:text-gray-400">
                        {$localize`MikroTik configuration files (.rsc, .txt)`}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </label>
            {selectedFileName.value && props.value && (
              <div class="rounded-lg border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800">
                <div class="flex items-center justify-between border-b border-gray-200 p-3 dark:border-gray-700">
                  <p class="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {$localize`Extracted State Preview`}
                  </p>
                  <button
                    onClick$={() => navigator.clipboard.writeText(props.value)}
                    class="flex items-center gap-1.5 rounded-md bg-primary-500 px-2.5 py-1 text-xs text-white hover:bg-primary-600"
                    title={$localize`Copy extracted state`}
                  >
                    <svg
                      class="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                    {$localize`Copy`}
                  </button>
                </div>
                <pre class="max-h-32 overflow-auto p-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                  {props.value.substring(0, 500)}
                  {props.value.length > 500 ? "..." : ""}
                </pre>
              </div>
            )}
          </div>
        )}

        {props.error && (
          <div class="rounded-lg border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
            <p class="text-sm text-red-600 dark:text-red-400">{props.error}</p>
          </div>
        )}
      </div>
    </div>
  );
});
