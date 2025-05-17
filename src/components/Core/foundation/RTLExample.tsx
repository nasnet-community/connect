import { component$ } from '@builder.io/qwik';
import { RTLProvider } from './RTLProvider';

/**
 * RTLExample component
 * 
 * This component demonstrates the RTL text direction support
 * for Arabic and Persian languages.
 */
export const RTLExample = component$(() => {
  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white dark:bg-surface-dark rounded-xl">
      <section class="border border-border rounded-lg p-4 dark:border-border-dark">
        <h3 class="text-xl font-semibold mb-4">LTR (English)</h3>
        <div class="mb-4">
          <p class="mb-2">This is a paragraph in English, flowing from left to right.</p>
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary-500 rounded-md"></div>
            <div class="ml-4 w-10 h-10 bg-secondary-500 rounded-md"></div>
            <div class="ml-4 w-10 h-10 bg-neutral-500 rounded-md"></div>
          </div>
          <div class="flex justify-between mb-4">
            <button class="bg-primary-500 text-white px-4 py-2 rounded-md">Left</button>
            <button class="bg-secondary-500 text-white px-4 py-2 rounded-md">Right</button>
          </div>
          <form class="mb-4">
            <label class="block mb-2">Input Field:</label>
            <input 
              type="text" 
              class="border border-border dark:border-border-dark rounded-md px-3 py-2 w-full" 
              placeholder="Type here..."
            />
          </form>
        </div>
      </section>

      <section class="border border-border rounded-lg p-4 dark:border-border-dark">
        <h3 class="text-xl font-semibold mb-4">RTL (Arabic)</h3>
        <RTLProvider language="ar">
          <div class="mb-4">
            <p class="mb-2">هذه فقرة باللغة العربية تتدفق من اليمين إلى اليسار.</p>
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-primary-500 rounded-md"></div>
              <div class="ml-4 w-10 h-10 bg-secondary-500 rounded-md"></div>
              <div class="ml-4 w-10 h-10 bg-neutral-500 rounded-md"></div>
            </div>
            <div class="flex justify-between mb-4">
              <button class="bg-primary-500 text-white px-4 py-2 rounded-md">يسار</button>
              <button class="bg-secondary-500 text-white px-4 py-2 rounded-md">يمين</button>
            </div>
            <form class="mb-4">
              <label class="block mb-2">حقل الإدخال:</label>
              <input 
                type="text" 
                class="border border-border dark:border-border-dark rounded-md px-3 py-2 w-full" 
                placeholder="اكتب هنا..."
              />
            </form>
          </div>
        </RTLProvider>
      </section>

      <section class="border border-border rounded-lg p-4 dark:border-border-dark">
        <h3 class="text-xl font-semibold mb-4">RTL (Persian/Farsi)</h3>
        <RTLProvider language="fa">
          <div class="mb-4">
            <p class="mb-2">این یک پاراگراف به زبان فارسی است که از راست به چپ جریان دارد.</p>
            <div class="flex items-center mb-4">
              <div class="w-10 h-10 bg-primary-500 rounded-md"></div>
              <div class="ml-4 w-10 h-10 bg-secondary-500 rounded-md"></div>
              <div class="ml-4 w-10 h-10 bg-neutral-500 rounded-md"></div>
            </div>
            <div class="flex justify-between mb-4">
              <button class="bg-primary-500 text-white px-4 py-2 rounded-md">چپ</button>
              <button class="bg-secondary-500 text-white px-4 py-2 rounded-md">راست</button>
            </div>
            <form class="mb-4">
              <label class="block mb-2">فیلد ورودی:</label>
              <input 
                type="text" 
                class="border border-border dark:border-border-dark rounded-md px-3 py-2 w-full" 
                placeholder="اینجا بنویسید..."
              />
            </form>
          </div>
        </RTLProvider>
      </section>

      <section class="border border-border rounded-lg p-4 dark:border-border-dark">
        <h3 class="text-xl font-semibold mb-4">Mixed Content Example</h3>
        <RTLProvider language="ar">
          <div class="mb-4">
            <p class="mb-2">هذا النص باللغة العربية مع بعض <span dir="ltr">English words</span> في الوسط.</p>
            <p class="mb-2 mt-4">This demonstrates how to handle mixed language content within RTL text.</p>
            <p class="mb-2 mt-4">Numbers should display correctly: ١٢٣٤٥٦٧٨٩٠</p>
            <div class="mt-4 border-t border-border dark:border-border-dark pt-4">
              <code dir="ltr" class="block p-2 bg-neutral-100 dark:bg-neutral-800 rounded-md">
                // Code should always be LTR even in RTL context
                const message = "Hello, world!";
                console.log(message);
              </code>
            </div>
          </div>
        </RTLProvider>
      </section>
    </div>
  );
});

export default RTLExample;
