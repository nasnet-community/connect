import { component$ } from "@builder.io/qwik";
import { RTLProvider } from "./RTLProvider";

/**
 * RTLExample component
 *
 * This component demonstrates the RTL text direction support
 * for Arabic and Persian languages.
 */
export const RTLExample = component$(() => {
  return (
    <div class="grid grid-cols-1 gap-8 rounded-xl bg-white p-6 md:grid-cols-2 dark:bg-surface-dark">
      <section class="rounded-lg border border-border p-4 dark:border-border-dark">
        <h3 class="mb-4 text-xl font-semibold">LTR (English)</h3>
        <div class="mb-4">
          <p class="mb-2">
            This is a paragraph in English, flowing from left to right.
          </p>
          <div class="mb-4 flex items-center">
            <div class="h-10 w-10 rounded-md bg-primary-500"></div>
            <div class="ml-4 h-10 w-10 rounded-md bg-secondary-500"></div>
            <div class="ml-4 h-10 w-10 rounded-md bg-neutral-500"></div>
          </div>
          <div class="mb-4 flex justify-between">
            <button class="rounded-md bg-primary-500 px-4 py-2 text-white">
              Left
            </button>
            <button class="rounded-md bg-secondary-500 px-4 py-2 text-white">
              Right
            </button>
          </div>
          <form class="mb-4">
            <label class="mb-2 block">Input Field:</label>
            <input
              type="text"
              class="w-full rounded-md border border-border px-3 py-2 dark:border-border-dark"
              placeholder="Type here..."
            />
          </form>
        </div>
      </section>

      <section class="rounded-lg border border-border p-4 dark:border-border-dark">
        <h3 class="mb-4 text-xl font-semibold">RTL (Arabic)</h3>
        <RTLProvider language="ar">
          <div class="mb-4">
            <p class="mb-2">
              هذه فقرة باللغة العربية تتدفق من اليمين إلى اليسار.
            </p>
            <div class="mb-4 flex items-center">
              <div class="h-10 w-10 rounded-md bg-primary-500"></div>
              <div class="ml-4 h-10 w-10 rounded-md bg-secondary-500"></div>
              <div class="ml-4 h-10 w-10 rounded-md bg-neutral-500"></div>
            </div>
            <div class="mb-4 flex justify-between">
              <button class="rounded-md bg-primary-500 px-4 py-2 text-white">
                يسار
              </button>
              <button class="rounded-md bg-secondary-500 px-4 py-2 text-white">
                يمين
              </button>
            </div>
            <form class="mb-4">
              <label class="mb-2 block">حقل الإدخال:</label>
              <input
                type="text"
                class="w-full rounded-md border border-border px-3 py-2 dark:border-border-dark"
                placeholder="اكتب هنا..."
              />
            </form>
          </div>
        </RTLProvider>
      </section>

      <section class="rounded-lg border border-border p-4 dark:border-border-dark">
        <h3 class="mb-4 text-xl font-semibold">RTL (Persian/Farsi)</h3>
        <RTLProvider language="fa">
          <div class="mb-4">
            <p class="mb-2">
              این یک پاراگراف به زبان فارسی است که از راست به چپ جریان دارد.
            </p>
            <div class="mb-4 flex items-center">
              <div class="h-10 w-10 rounded-md bg-primary-500"></div>
              <div class="ml-4 h-10 w-10 rounded-md bg-secondary-500"></div>
              <div class="ml-4 h-10 w-10 rounded-md bg-neutral-500"></div>
            </div>
            <div class="mb-4 flex justify-between">
              <button class="rounded-md bg-primary-500 px-4 py-2 text-white">
                چپ
              </button>
              <button class="rounded-md bg-secondary-500 px-4 py-2 text-white">
                راست
              </button>
            </div>
            <form class="mb-4">
              <label class="mb-2 block">فیلد ورودی:</label>
              <input
                type="text"
                class="w-full rounded-md border border-border px-3 py-2 dark:border-border-dark"
                placeholder="اینجا بنویسید..."
              />
            </form>
          </div>
        </RTLProvider>
      </section>

      <section class="rounded-lg border border-border p-4 dark:border-border-dark">
        <h3 class="mb-4 text-xl font-semibold">Mixed Content Example</h3>
        <RTLProvider language="ar">
          <div class="mb-4">
            <p class="mb-2">
              هذا النص باللغة العربية مع بعض{" "}
              <span dir="ltr">English words</span> في الوسط.
            </p>
            <p class="mb-2 mt-4">
              This demonstrates how to handle mixed language content within RTL
              text.
            </p>
            <p class="mb-2 mt-4">
              Numbers should display correctly: ١٢٣٤٥٦٧٨٩٠
            </p>
            <div class="mt-4 border-t border-border pt-4 dark:border-border-dark">
              <code
                dir="ltr"
                class="block rounded-md bg-neutral-100 p-2 dark:bg-neutral-800"
              >
                // Code should always be LTR even in RTL context const message =
                "Hello, world!"; console.log(message);
              </code>
            </div>
          </div>
        </RTLProvider>
      </section>
    </div>
  );
});

export default RTLExample;
