import { component$ } from "@builder.io/qwik";
import { RTLProvider } from "../RTLProvider";

/**
 * Overview documentation for RTLProvider component
 */
export const RTLProviderOverview = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">RTLProvider Overview</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          RTLProvider is a foundational component that enables comprehensive Right-to-Left (RTL) 
          language support for Arabic, Persian/Farsi, Hebrew, and Urdu. It automatically handles 
          document-level direction changes and integrates seamlessly with GlobalStyles for 
          complete layout transformations.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Live Component Demo</h3>
        <div class="rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="space-y-6">
            <div>
              <h4 class="mb-3 text-lg font-medium">Arabic Content (RTL)</h4>
              <RTLProvider language="ar">
                <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                  <div class="mb-2 text-lg font-semibold">مرحباً بالعالم</div>
                  <p class="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                    هذا مثال على النص العربي الذي يتم عرضه من اليمين إلى اليسار تلقائياً
                  </p>
                  <div class="flex space-x-2 space-x-reverse">
                    <button class="rounded bg-primary-500 px-3 py-1 text-white">زر</button>
                    <button class="rounded bg-secondary-500 px-3 py-1 text-white">آخر</button>
                  </div>
                </div>
              </RTLProvider>
            </div>

            <div>
              <h4 class="mb-3 text-lg font-medium">Persian Content (RTL)</h4>
              <RTLProvider language="fa">
                <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
                  <div class="mb-2 text-lg font-semibold">سلام دنیا</div>
                  <p class="mb-3 text-sm text-neutral-600 dark:text-neutral-400">
                    این نمونه‌ای از متن فارسی است که به طور خودکار از راست به چپ نمایش داده می‌شود
                  </p>
                  <div class="flex space-x-2 space-x-reverse">
                    <button class="rounded bg-success-500 px-3 py-1 text-white">دکمه</button>
                    <button class="rounded bg-warning-500 px-3 py-1 text-white">دیگر</button>
                  </div>
                </div>
              </RTLProvider>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Key Features</h3>
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🌍</div>
            <h4 class="mb-2 text-lg font-medium">Multi-Language Support</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Built-in support for Arabic, Persian/Farsi, Hebrew, and Urdu 
              with automatic direction detection.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🎯</div>
            <h4 class="mb-2 text-lg font-medium">Smart Detection</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Automatically detects text direction from language codes 
              or browser preferences with configurable priority.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">⚡</div>
            <h4 class="mb-2 text-lg font-medium">Document-Level Control</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Manages HTML document attributes and CSS classes 
              for comprehensive RTL layout transformations.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🔄</div>
            <h4 class="mb-2 text-lg font-medium">Reactive Updates</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Dynamically responds to prop changes and user 
              preference updates using Qwik's reactive system.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🧹</div>
            <h4 class="mb-2 text-lg font-medium">Proper Cleanup</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Automatically resets document state when unmounting 
              with intelligent conflict detection.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <div class="mb-3 text-2xl">🎨</div>
            <h4 class="mb-2 text-lg font-medium">GlobalStyles Integration</h4>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Works seamlessly with GlobalStyles component 
              for complete RTL layout and styling support.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Usage Examples</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Language-Based Auto-Detection</h4>
            <div class="mb-4 rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Automatic RTL for Arabic content
<RTLProvider language="ar">
  <div>محتوى عربي</div>
</RTLProvider>

// Automatic RTL for Persian content  
<RTLProvider language="fa">
  <div>محتوای فارسی</div>
</RTLProvider>

// LTR remains for other languages
<RTLProvider language="en">
  <div>English content</div>
</RTLProvider>`}</code>
              </pre>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              The component automatically detects RTL languages and sets appropriate direction.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Browser Preference Detection</h4>
            <div class="mb-4 rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Respect user's browser language settings
<RTLProvider useUserPreference={true}>
  <YourAppContent />
</RTLProvider>

// This will automatically set RTL if user's browser is set to:
// - Arabic (ar, ar-SA, ar-EG, etc.)
// - Persian (fa, fa-IR, etc.)  
// - Hebrew (he, he-IL, etc.)
// - Urdu (ur, ur-PK, etc.)`}</code>
              </pre>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Automatically detects and respects the user's browser language preference.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Explicit Direction Control</h4>
            <div class="mb-4 rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// Explicit RTL direction
<RTLProvider direction="rtl">
  <div>Mixed content or custom RTL</div>
</RTLProvider>

// Explicit LTR direction
<RTLProvider direction="ltr">
  <div>Force LTR even for RTL languages</div>
</RTLProvider>`}</code>
              </pre>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Override automatic detection with explicit direction control when needed.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Integration Architecture</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Component Hierarchy</h4>
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400">1</div>
                <div>
                  <div class="font-medium">Application Root</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">Include GlobalStyles in document head</div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-secondary-100 text-secondary-600 dark:bg-secondary-900 dark:text-secondary-400">2</div>
                <div>
                  <div class="font-medium">RTLProvider Wrapper</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">Wrap your app content with RTLProvider</div>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-success-100 text-success-600 dark:bg-success-900 dark:text-success-400">3</div>
                <div>
                  <div class="font-medium">App Components</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">All child components inherit RTL context</div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Complete Setup Example</h4>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// root.tsx
import { component$ } from "@builder.io/qwik";
import { GlobalStyles, RTLProvider } from "~/components/Core/foundation";

export default component$(() => {
  const currentLanguage = useLocale(); // From your i18n system
  
  return (
    <html>
      <head>
        <GlobalStyles />
        <meta charSet="utf-8" />
      </head>
      <body>
        <RTLProvider 
          language={currentLanguage.value} 
          useUserPreference={true}
        >
          <RouterOutlet />
        </RTLProvider>
      </body>
    </html>
  );
});`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Layout Transformations</h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Before RTLProvider</h4>
            <div class="space-y-3">
              <div class="rounded border border-neutral-200 p-3 text-left dark:border-neutral-700">
                <div class="mb-2 font-medium">Left-to-Right Layout</div>
                <div class="flex space-x-2">
                  <button class="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-700">First</button>
                  <button class="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-700">Second</button>
                  <button class="rounded bg-neutral-200 px-2 py-1 text-xs dark:bg-neutral-700">Third</button>
                </div>
                <div class="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                  Text flows left → right, buttons align left
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">With RTLProvider (RTL)</h4>
            <div class="space-y-3">
              <div class="rounded border border-neutral-200 p-3 text-right dark:border-neutral-700" dir="rtl">
                <div class="mb-2 font-medium">تخطيط من اليمين لليسار</div>
                <div class="flex space-x-2 space-x-reverse">
                  <button class="rounded bg-primary-500 px-2 py-1 text-xs text-white">أول</button>
                  <button class="rounded bg-primary-500 px-2 py-1 text-xs text-white">ثاني</button>
                  <button class="rounded bg-primary-500 px-2 py-1 text-xs text-white">ثالث</button>
                </div>
                <div class="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                  النص يتدفق من اليمين ← اليسار، الأزرار تنحاز يمين
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Performance Characteristics</h3>
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-lg border border-neutral-200 p-4 text-center dark:border-neutral-700">
            <div class="mb-2 text-2xl font-bold text-primary-600 dark:text-primary-400">~1KB</div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">Bundle Size</div>
          </div>
          <div class="rounded-lg border border-neutral-200 p-4 text-center dark:border-neutral-700">
            <div class="mb-2 text-2xl font-bold text-success-600 dark:text-success-400">Client-Only</div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">DOM Updates</div>
          </div>
          <div class="rounded-lg border border-neutral-200 p-4 text-center dark:border-neutral-700">
            <div class="mb-2 text-2xl font-bold text-info-600 dark:text-info-400">Reactive</div>
            <div class="text-sm text-neutral-600 dark:text-neutral-400">Prop Changes</div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Common Use Cases</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-950">
            <h4 class="mb-2 text-lg font-medium text-success-900 dark:text-success-100">
              ✅ Perfect For
            </h4>
            <ul class="space-y-1 text-sm text-success-800 dark:text-success-200">
              <li>• Multi-language applications</li>
              <li>• Arabic/Persian/Hebrew/Urdu content</li>
              <li>• International e-commerce sites</li>
              <li>• Government and educational platforms</li>
              <li>• Social media and communication apps</li>
              <li>• Documentation and knowledge bases</li>
            </ul>
          </div>

          <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
            <h4 class="mb-2 text-lg font-medium text-neutral-900 dark:text-neutral-100">
              💡 Consider When
            </h4>
            <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Building for global audiences</li>
              <li>• Supporting right-to-left languages</li>
              <li>• Need automatic language detection</li>
              <li>• Want seamless direction switching</li>
              <li>• Require proper form alignment</li>
              <li>• Building accessibility-first apps</li>
            </ul>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-info-200 bg-info-50 p-6 dark:border-info-800 dark:bg-info-950">
        <h3 class="mb-2 text-lg font-medium text-info-900 dark:text-info-100">
          💡 Best Practices
        </h3>
        <ul class="space-y-2 text-sm text-info-800 dark:text-info-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Use RTLProvider at the application root level for consistent behavior</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Combine with GlobalStyles for complete RTL layout support</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Connect the language prop to your internationalization system</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Test with actual RTL content and native speakers when possible</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-info-500"></span>
            <span>Use useUserPreference for automatic browser language detection</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default RTLProviderOverview;