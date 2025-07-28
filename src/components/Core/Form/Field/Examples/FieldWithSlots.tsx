import { component$, useSignal } from "@builder.io/qwik";
import { Field } from "../index";

export default component$(() => {
  const priceValue = useSignal("");
  const searchValue = useSignal("");
  const urlValue = useSignal("");

  return (
    <div class="space-y-6">
      <div>
        <h3 class="mb-2 text-sm font-semibold">Field with Prefix</h3>
        <Field
          label="Price"
          type="number"
          value={priceValue.value}
          onValueChange$={(value) => (priceValue.value = value as string)}
          placeholder="0.00"
        >
          <div
            q:slot="prefix"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            $
          </div>
        </Field>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Field with Suffix</h3>
        <Field
          label="Search"
          type="text"
          value={searchValue.value}
          onValueChange$={(value) => (searchValue.value = value as string)}
          placeholder="Search..."
        >
          <div
            q:slot="suffix"
            class="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </Field>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Field with Prefix and Suffix</h3>
        <Field
          label="Website URL"
          type="text"
          value={urlValue.value}
          onValueChange$={(value) => (urlValue.value = value as string)}
          placeholder="example.com"
        >
          <div
            q:slot="prefix"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            https://
          </div>
          <div
            q:slot="suffix"
            class="absolute right-3 top-1/2 -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        </Field>
      </div>

      <div>
        <h3 class="mb-2 text-sm font-semibold">Field with Custom Content</h3>
        <Field label="Custom field" type="text">
          <div class="flex items-center rounded-md border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-gray-700">
            <div class="flex-1">
              <div class="text-sm font-medium">Custom component</div>
              <div class="text-xs text-gray-500 dark:text-gray-400">
                This is a custom component inside a Field
              </div>
            </div>
            <button class="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
              Action
            </button>
          </div>
        </Field>
      </div>
    </div>
  );
});
