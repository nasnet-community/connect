import { component$, useSignal } from "@builder.io/qwik";
import { RTLProvider } from "../RTLProvider";

/**
 * Examples documentation for RTLProvider component
 */
export const RTLProviderExamples = component$(() => {
  const selectedLanguage = useSignal("ar");
  const useUserPref = useSignal(false);

  const languages = [
    { code: "ar", name: "Arabic", nativeName: "العربية", sample: "مرحباً بكم في موقعنا الإلكتروني" },
    { code: "fa", name: "Persian", nativeName: "فارسی", sample: "به وب‌سایت ما خوش آمدید" },
    { code: "he", name: "Hebrew", nativeName: "עברית", sample: "ברוכים הבאים לאתר שלנו" },
    { code: "ur", name: "Urdu", nativeName: "اردو", sample: "ہماری ویب سائٹ میں خوش آمدید" },
    { code: "en", name: "English", nativeName: "English", sample: "Welcome to our website" }
  ];

  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">RTLProvider Examples</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Practical examples demonstrating RTLProvider's features and capabilities 
          across different languages and usage scenarios.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Interactive Language Demo</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <div class="mb-4 flex flex-wrap items-center gap-4">
              <div>
                <label class="mb-1 block text-sm font-medium">Select Language:</label>
                <select 
                  class="rounded border border-neutral-200 p-2 dark:border-neutral-700"
                  value={selectedLanguage.value}
                  onChange$={(e) => selectedLanguage.value = (e.target as HTMLSelectElement).value}
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {`${lang.name} (${lang.nativeName})`}
                    </option>
                  ))}
                </select>
              </div>
              <div class="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="user-pref"
                  class="rounded"
                  checked={useUserPref.value}
                  onChange$={(e) => useUserPref.value = (e.target as HTMLInputElement).checked}
                />
                <label for="user-pref" class="text-sm">Use browser preference</label>
              </div>
            </div>

            <RTLProvider 
              language={useUserPref.value ? "auto" : selectedLanguage.value as any}
              useUserPreference={useUserPref.value}
            >
              <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-700 dark:bg-neutral-800">
                <div class="mb-4">
                  <h4 class="mb-2 text-lg font-semibold">
                    {languages.find(l => l.code === selectedLanguage.value)?.nativeName}
                  </h4>
                  <p class="text-neutral-600 dark:text-neutral-400">
                    {languages.find(l => l.code === selectedLanguage.value)?.sample}
                  </p>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 class="mb-2 font-medium">Form Elements</h5>
                    <div class="space-y-2">
                      <input
                        type="text"
                        placeholder={selectedLanguage.value === "ar" ? "اسمك" : 
                                   selectedLanguage.value === "fa" ? "نام شما" :
                                   selectedLanguage.value === "he" ? "השם שלך" :
                                   selectedLanguage.value === "ur" ? "آپ کا نام" : "Your name"}
                        class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                      />
                      <select class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700">
                        <option>
                          {selectedLanguage.value === "ar" ? "اختر خياراً" : 
                           selectedLanguage.value === "fa" ? "گزینه‌ای انتخاب کنید" :
                           selectedLanguage.value === "he" ? "בחר אפשרות" :
                           selectedLanguage.value === "ur" ? "ایک آپشن منتخب کریں" : "Select an option"}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <h5 class="mb-2 font-medium">Button Group</h5>
                    <div class="flex space-x-2 space-x-reverse">
                      <button class="rounded bg-primary-500 px-3 py-2 text-white">
                        {selectedLanguage.value === "ar" ? "موافق" : 
                         selectedLanguage.value === "fa" ? "تأیید" :
                         selectedLanguage.value === "he" ? "אישור" :
                         selectedLanguage.value === "ur" ? "تصدیق" : "Confirm"}
                      </button>
                      <button class="rounded bg-neutral-500 px-3 py-2 text-white">
                        {selectedLanguage.value === "ar" ? "إلغاء" : 
                         selectedLanguage.value === "fa" ? "لغو" :
                         selectedLanguage.value === "he" ? "ביטול" :
                         selectedLanguage.value === "ur" ? "منسوخ" : "Cancel"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </RTLProvider>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Application-Level Integration</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Root Layout Integration</h4>
            <div class="mb-4 rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// root.tsx - Application root with RTL support
import { component$ } from "@builder.io/qwik";
import { GlobalStyles, RTLProvider } from "~/components/Core/foundation";
import { useI18n } from "~/hooks/useI18n";

export default component$(() => {
  const i18n = useI18n();
  
  return (
    <html>
      <head>
        <GlobalStyles />
        <meta charSet="utf-8" />
        <title>My App</title>
      </head>
      <body>
        <RTLProvider 
          language={i18n.locale.value} 
          useUserPreference={false}
        >
          <RouterOutlet />
        </RTLProvider>
      </body>
    </html>
  );
});`}</code>
              </pre>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Integrate RTLProvider at the application root level for consistent RTL support throughout your app.
            </p>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Dynamic Language Switching</h4>
            <div class="mb-4 rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`// components/LanguageSwitcher.tsx
import { component$, useSignal } from "@builder.io/qwik";
import { RTLProvider } from "~/components/Core/foundation";

export const LanguageSwitcher = component$(() => {
  const currentLang = useSignal("en");
  
  const switchLanguage = $((newLang: string) => {
    currentLang.value = newLang;
    // Update your i18n system here
    // updateLocale(newLang);
  });
  
  return (
    <RTLProvider language={currentLang.value}>
      <div class="language-switcher">
        <select 
          value={currentLang.value}
          onChange$={(e) => switchLanguage((e.target as HTMLSelectElement).value)}
        >
          <option value="en">English</option>
          <option value="ar">العربية</option>
          <option value="fa">فارسی</option>
          <option value="he">עברית</option>
        </select>
        
        <div class="content">
          {/* Your app content that adapts to RTL/LTR */}
        </div>
      </div>
    </RTLProvider>
  );
});`}</code>
              </pre>
            </div>
            <p class="text-sm text-neutral-600 dark:text-neutral-400">
              Dynamically switch languages with automatic RTL/LTR direction changes.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Form Layout Examples</h3>
        <div class="space-y-6">
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <h4 class="mb-3 text-lg font-medium">LTR Form (English)</h4>
              <RTLProvider direction="ltr">
                <div class="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                  <div class="space-y-4">
                    <div>
                      <label class="mb-1 block text-sm font-medium">First Name</label>
                      <input
                        type="text"
                        placeholder="Enter your first name"
                        class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium">Email</label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium">Country</label>
                      <select class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700">
                        <option>Select Country</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                        <option>Canada</option>
                      </select>
                    </div>
                    <div class="flex space-x-2">
                      <button class="rounded bg-primary-500 px-4 py-2 text-white">Submit</button>
                      <button class="rounded bg-neutral-500 px-4 py-2 text-white">Cancel</button>
                    </div>
                  </div>
                </div>
              </RTLProvider>
            </div>

            <div>
              <h4 class="mb-3 text-lg font-medium">RTL Form (Arabic)</h4>
              <RTLProvider language="ar">
                <div class="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
                  <div class="space-y-4">
                    <div>
                      <label class="mb-1 block text-sm font-medium">الاسم الأول</label>
                      <input
                        type="text"
                        placeholder="أدخل اسمك الأول"
                        class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium">البريد الإلكتروني</label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                      />
                    </div>
                    <div>
                      <label class="mb-1 block text-sm font-medium">البلد</label>
                      <select class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700">
                        <option>اختر البلد</option>
                        <option>السعودية</option>
                        <option>الإمارات</option>
                        <option>مصر</option>
                      </select>
                    </div>
                    <div class="flex space-x-2 space-x-reverse">
                      <button class="rounded bg-primary-500 px-4 py-2 text-white">إرسال</button>
                      <button class="rounded bg-neutral-500 px-4 py-2 text-white">إلغاء</button>
                    </div>
                  </div>
                </div>
              </RTLProvider>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Navigation Layout Examples</h3>
        <div class="space-y-6">
          <div class="grid gap-6 md:grid-cols-2">
            <div>
              <h4 class="mb-3 text-lg font-medium">LTR Navigation</h4>
              <RTLProvider direction="ltr">
                <div class="rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
                  <header class="border-b border-neutral-200 p-4 dark:border-neutral-700">
                    <nav class="flex items-center justify-between">
                      <div class="flex items-center space-x-4">
                        <div class="text-lg font-bold">Logo</div>
                        <div class="hidden space-x-4 md:flex">
                          <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">Home</a>
                          <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">About</a>
                          <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">Contact</a>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2">
                        <button class="rounded bg-primary-500 px-3 py-1 text-white">Sign In</button>
                        <button class="rounded bg-neutral-500 px-3 py-1 text-white">Sign Up</button>
                      </div>
                    </nav>
                  </header>
                  <div class="p-4">
                    <h1 class="mb-2 text-xl font-bold">Welcome to Our Site</h1>
                    <p class="text-neutral-600 dark:text-neutral-400">
                      This is a left-to-right layout with standard navigation flow.
                    </p>
                  </div>
                </div>
              </RTLProvider>
            </div>

            <div>
              <h4 class="mb-3 text-lg font-medium">RTL Navigation</h4>
              <RTLProvider language="ar">
                <div class="rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
                  <header class="border-b border-neutral-200 p-4 dark:border-neutral-700">
                    <nav class="flex items-center justify-between">
                      <div class="flex items-center space-x-4 space-x-reverse">
                        <div class="text-lg font-bold">الشعار</div>
                        <div class="hidden space-x-4 space-x-reverse md:flex">
                          <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">الرئيسية</a>
                          <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">حول</a>
                          <a href="#" class="text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100">اتصل</a>
                        </div>
                      </div>
                      <div class="flex items-center space-x-2 space-x-reverse">
                        <button class="rounded bg-primary-500 px-3 py-1 text-white">دخول</button>
                        <button class="rounded bg-neutral-500 px-3 py-1 text-white">تسجيل</button>
                      </div>
                    </nav>
                  </header>
                  <div class="p-4">
                    <h1 class="mb-2 text-xl font-bold">أهلاً بكم في موقعنا</h1>
                    <p class="text-neutral-600 dark:text-neutral-400">
                      هذا تخطيط من اليمين إلى اليسار مع تدفق التنقل المعياري.
                    </p>
                  </div>
                </div>
              </RTLProvider>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Mixed Content Examples</h3>
        <div class="space-y-6">
          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Bidirectional Text</h4>
            <RTLProvider direction="rtl">
              <div class="space-y-4">
                <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                  <p class="mb-2">
                    This paragraph contains <span dir="ltr">English text</span> embedded within Arabic text: 
                    <span class="font-medium"> هذا نص عربي يحتوي على نص إنجليزي مدمج بداخله</span>.
                  </p>
                  <p>
                    Here's how to handle <code dir="ltr">code snippets</code> and 
                    <span dir="ltr">URLs like https://example.com</span> in RTL content.
                  </p>
                </div>
              </div>
            </RTLProvider>
          </div>

          <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
            <h4 class="mb-4 text-lg font-medium">Number and Date Handling</h4>
            <RTLProvider language="ar">
              <div class="space-y-4">
                <div class="grid gap-4 md:grid-cols-2">
                  <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                    <h5 class="mb-2 font-medium">أرقام ومبالغ</h5>
                    <div class="space-y-2 text-sm">
                      <div>السعر: <span dir="ltr">$99.99</span></div>
                      <div>الكمية: <span dir="ltr">123</span></div>
                      <div>النسبة: <span dir="ltr">85.5%</span></div>
                    </div>
                  </div>
                  
                  <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
                    <h5 class="mb-2 font-medium">تواريخ وأوقات</h5>
                    <div class="space-y-2 text-sm">
                      <div>التاريخ: <span dir="ltr">2024-01-15</span></div>
                      <div>الوقت: <span dir="ltr">14:30</span></div>
                      <div>المنطقة: <span dir="ltr">UTC+3</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </RTLProvider>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Browser Preference Detection</h3>
        <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
          <h4 class="mb-4 text-lg font-medium">Automatic Language Detection</h4>
          <div class="mb-4 rounded bg-neutral-50 p-3 dark:bg-neutral-800">
            <pre class="text-sm">
              <code>{`// Automatic detection based on browser settings
<RTLProvider useUserPreference={true}>
  <App />
</RTLProvider>

// This will automatically set RTL if the user's browser language is:
// - ar (Arabic) - includes ar-SA, ar-EG, ar-AE, etc.
// - fa (Persian) - includes fa-IR, fa-AF, etc.
// - he (Hebrew) - includes he-IL, etc.
// - ur (Urdu) - includes ur-PK, ur-IN, etc.

// Browser language examples:
// navigator.language = "ar-SA" → RTL direction
// navigator.language = "fa-IR" → RTL direction  
// navigator.language = "en-US" → LTR direction
// navigator.language = "fr-FR" → LTR direction`}</code>
            </pre>
          </div>

          <RTLProvider useUserPreference={true}>
            <div class="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900">
              <div class="mb-2 text-sm text-neutral-600 dark:text-neutral-400">
                Current browser language: <span class="font-mono">{typeof window !== 'undefined' ? window.navigator.language : 'N/A'}</span>
              </div>
              <div class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
                Auto-detected direction: <span class="font-mono" data-direction></span>
              </div>
              <p>
                This content automatically adapts to your browser's language preference. 
                If your browser is set to an RTL language, this text will be right-aligned.
              </p>
            </div>
          </RTLProvider>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-success-200 bg-success-50 p-6 dark:border-success-800 dark:bg-success-950">
        <h3 class="mb-2 text-lg font-medium text-success-900 dark:text-success-100">
          🎯 Implementation Tips
        </h3>
        <ul class="space-y-2 text-sm text-success-800 dark:text-success-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>Use <code>space-x-reverse</code> for RTL button groups and horizontal layouts</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>Wrap numbers, URLs, and code in <code>dir="ltr"</code> spans within RTL content</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>Test with actual RTL content and native speakers for best results</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>Connect RTLProvider to your i18n system for seamless language switching</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>Use <code>useUserPreference</code> for automatic browser language detection</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default RTLProviderExamples;