import { component$, useSignal } from "@builder.io/qwik";

/**
 * Interactive playground for testing GlobalStyles features
 */
export const GlobalStylesPlayground = component$(() => {
  const selectedDemo = useSignal("focus");
  const themeTransition = useSignal(false);
  const rtlMode = useSignal(false);
  const motionSafe = useSignal(true);

  const demos = [
    { id: "focus", label: "Focus States", icon: "🎯" },
    { id: "typography", label: "Typography", icon: "📝" },
    { id: "transitions", label: "Transitions", icon: "⚡" },
    { id: "scrollbars", label: "Scrollbars", icon: "📜" },
    { id: "forms", label: "Form Elements", icon: "📋" },
    { id: "rtl", label: "RTL Support", icon: "🌍" },
  ];

  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">GlobalStyles Interactive Playground</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Experiment with different GlobalStyles features in real-time. Toggle settings and 
          interact with elements to see how GlobalStyles enhances the user experience.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Playground Controls</h3>
        <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <label class="mb-2 block text-sm font-medium">Demo Mode</label>
              <select 
                class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                onChange$={(e) => selectedDemo.value = (e.target as HTMLSelectElement).value}
              >
                {demos.map((demo) => (
                  <option key={demo.id} value={demo.id}>
                    {`${demo.icon} ${demo.label}`}
                  </option>
                ))}
              </select>
            </div>

            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="theme-transition"
                class="rounded"
                checked={themeTransition.value}
                onChange$={(e) => {
                  themeTransition.value = (e.target as HTMLInputElement).checked;
                  if (themeTransition.value) {
                    document.documentElement.classList.add('transition-theme');
                  } else {
                    document.documentElement.classList.remove('transition-theme');
                  }
                }}
              />
              <label for="theme-transition" class="text-sm font-medium">
                Theme Transitions
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="rtl-mode"
                class="rounded"
                checked={rtlMode.value}
                onChange$={(e) => {
                  rtlMode.value = (e.target as HTMLInputElement).checked;
                  document.documentElement.dir = rtlMode.value ? 'rtl' : 'ltr';
                }}
              />
              <label for="rtl-mode" class="text-sm font-medium">
                RTL Mode
              </label>
            </div>

            <div class="flex items-center space-x-2">
              <input
                type="checkbox"
                id="motion-safe"
                class="rounded"
                checked={motionSafe.value}
                onChange$={(e) => {
                  motionSafe.value = (e.target as HTMLInputElement).checked;
                  // Note: This is just for demo - real motion preferences come from OS
                }}
              />
              <label for="motion-safe" class="text-sm font-medium">
                Motion Safe
              </label>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Interactive Demo</h3>
        <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          {selectedDemo.value === "focus" && (
            <div class="space-y-6">
              <h4 class="text-lg font-medium">Focus State Testing</h4>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Use Tab key to navigate through these elements and observe the enhanced focus states:
              </p>
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <button class="rounded-lg border border-neutral-200 p-3 text-left hover:bg-neutral-50 focus:outline-none dark:border-neutral-700 dark:hover:bg-neutral-800">
                  <div class="font-medium">Button Element</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">Standard button focus</div>
                </button>

                <a
                  href="#"
                  class="block rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50 focus:outline-none dark:border-neutral-700 dark:hover:bg-neutral-800"
                >
                  <div class="font-medium">Link Element</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">Link with focus ring</div>
                </a>

                <input
                  type="text"
                  placeholder="Text input"
                  class="w-full rounded-lg border border-neutral-200 p-3 focus:outline-none dark:border-neutral-700"
                />

                <select class="w-full rounded-lg border border-neutral-200 p-3 focus:outline-none dark:border-neutral-700">
                  <option>Select option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>

                <textarea
                  placeholder="Textarea"
                  rows={3}
                  class="w-full rounded-lg border border-neutral-200 p-3 focus:outline-none dark:border-neutral-700"
                ></textarea>

                <div class="flex items-center space-x-2">
                  <input type="checkbox" id="demo-checkbox" class="rounded focus:outline-none" />
                  <label for="demo-checkbox" class="text-sm">Checkbox focus</label>
                </div>
              </div>
            </div>
          )}

          {selectedDemo.value === "typography" && (
            <div class="space-y-6">
              <h4 class="text-lg font-medium">Typography Hierarchy</h4>
              <div class="space-y-4">
                <h1>Heading 1 - Main Title (2.25rem)</h1>
                <h2>Heading 2 - Section Title (1.875rem)</h2>
                <h3>Heading 3 - Subsection Title (1.5rem)</h3>
                <h4>Heading 4 - Component Title (1.25rem)</h4>
                <h5>Heading 5 - Small Section (1.125rem)</h5>
                <h6>Heading 6 - Minor Heading (1rem)</h6>
                
                <p>
                  This is a standard paragraph with proper line height and spacing. 
                  GlobalStyles provides consistent typography across all themes and ensures 
                  proper readability.
                </p>
                
                <div class="space-y-2">
                  <div class="text-xs">Extra small text (0.75rem)</div>
                  <div class="text-sm">Small text (0.875rem)</div>
                  <div class="text-base">Base text (1rem)</div>
                  <div class="text-lg">Large text (1.125rem)</div>
                </div>

                <div class="space-y-2">
                  <div class="w-64 truncate bg-neutral-100 p-2 dark:bg-neutral-800">
                    This is a very long text that will be truncated with an ellipsis
                  </div>
                  <div class="w-64 line-clamp-2 bg-neutral-100 p-2 dark:bg-neutral-800">
                    This is a longer text that will be clamped to exactly two lines and show an ellipsis
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedDemo.value === "transitions" && (
            <div class="space-y-6">
              <h4 class="text-lg font-medium">Transition Speed Testing</h4>
              <div class="grid gap-4 md:grid-cols-3">
                <div class="fast-transition rounded-lg bg-primary-100 p-4 hover:bg-primary-200 dark:bg-primary-900 dark:hover:bg-primary-800">
                  <div class="font-medium">Fast Transition</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">150ms duration</div>
                </div>
                
                <div class="medium-transition rounded-lg bg-secondary-100 p-4 hover:bg-secondary-200 dark:bg-secondary-900 dark:hover:bg-secondary-800">
                  <div class="font-medium">Medium Transition</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">300ms duration</div>
                </div>
                
                <div class="slow-transition rounded-lg bg-success-100 p-4 hover:bg-success-200 dark:bg-success-900 dark:hover:bg-success-800">
                  <div class="font-medium">Slow Transition</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">500ms duration</div>
                </div>
              </div>

              <div class="space-y-4">
                <h5 class="font-medium">Property-Specific Transitions</h5>
                <div class="grid gap-4 md:grid-cols-2">
                  <div class="transition-bg rounded-lg bg-warning-100 p-3 hover:bg-warning-200 dark:bg-warning-900 dark:hover:bg-warning-800">
                    Background Only
                  </div>
                  <div class="transition-colors rounded-lg border-2 border-info-300 bg-info-100 p-3 text-info-800 hover:border-info-500 hover:bg-info-200 hover:text-info-900 dark:border-info-700 dark:bg-info-900 dark:text-info-200">
                    All Colors
                  </div>
                  <div class="transition-shadow rounded-lg bg-neutral-100 p-3 shadow-sm hover:shadow-lg dark:bg-neutral-800">
                    Shadow Effect
                  </div>
                  <div class="transition-transform rounded-lg bg-error-100 p-3 hover:scale-105 dark:bg-error-900">
                    Transform Scale
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedDemo.value === "scrollbars" && (
            <div class="space-y-6">
              <h4 class="text-lg font-medium">Custom Scrollbar Testing</h4>
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <div class="mb-2 text-sm font-medium">Vertical Scroll</div>
                  <div class="h-40 overflow-y-auto rounded border border-neutral-200 p-3 dark:border-neutral-700">
                    <div class="space-y-2">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} class="text-sm">
                          Scrollable content item {i + 1} - Demonstrating custom scrollbar styling
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <div class="mb-2 text-sm font-medium">Horizontal Scroll</div>
                  <div class="overflow-x-auto rounded border border-neutral-200 p-3 dark:border-neutral-700">
                    <div class="flex w-max space-x-4">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} class="flex-shrink-0 rounded bg-neutral-100 p-3 dark:bg-neutral-800">
                          Item {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-xs text-neutral-500 dark:text-neutral-400">
                Notice how the scrollbars automatically adapt to the current theme and match the design system.
              </div>
            </div>
          )}

          {selectedDemo.value === "forms" && (
            <div class="space-y-6">
              <h4 class="text-lg font-medium">Form Element Consistency</h4>
              <div class="grid gap-4 md:grid-cols-2">
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-sm font-medium">Text Input</label>
                    <input
                      type="text"
                      placeholder="Consistent styling"
                      class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                    />
                  </div>
                  
                  <div>
                    <label class="mb-1 block text-sm font-medium">Email Input</label>
                    <input
                      type="email"
                      placeholder="email@example.com"
                      class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                    />
                  </div>
                  
                  <div>
                    <label class="mb-1 block text-sm font-medium">Number Input</label>
                    <input
                      type="number"
                      placeholder="123"
                      class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                    />
                  </div>

                  <div>
                    <label class="mb-1 block text-sm font-medium">Password Input</label>
                    <input
                      type="password"
                      placeholder="Password"
                      class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                    />
                  </div>
                </div>
                
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-sm font-medium">Select Dropdown</label>
                    <select class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700">
                      <option>Choose option</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                  
                  <div>
                    <label class="mb-1 block text-sm font-medium">Textarea</label>
                    <textarea
                      rows={4}
                      placeholder="Multi-line text input"
                      class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                    ></textarea>
                  </div>

                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" id="demo-check1" class="rounded" />
                      <label for="demo-check1" class="text-sm">Checkbox option 1</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input type="checkbox" id="demo-check2" class="rounded" />
                      <label for="demo-check2" class="text-sm">Checkbox option 2</label>
                    </div>
                  </div>

                  <div class="space-y-2">
                    <div class="flex items-center space-x-2">
                      <input type="radio" id="demo-radio1" name="demo-radio" class="rounded-full" />
                      <label for="demo-radio1" class="text-sm">Radio option 1</label>
                    </div>
                    <div class="flex items-center space-x-2">
                      <input type="radio" id="demo-radio2" name="demo-radio" class="rounded-full" />
                      <label for="demo-radio2" class="text-sm">Radio option 2</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedDemo.value === "rtl" && (
            <div class="space-y-6">
              <h4 class="text-lg font-medium">RTL Language Support</h4>
              <div class="space-y-6">
                <div dir="rtl" class="rounded border border-neutral-200 p-4 dark:border-neutral-700">
                  <div class="mb-2 text-lg font-medium">النص العربي</div>
                  <p class="text-sm">
                    هذا مثال على النص العربي الذي يتم عرضه من اليمين إلى اليسار. 
                    لاحظ كيف يتم محاذاة النص والتخطيط بشكل صحيح مع GlobalStyles.
                  </p>
                  <div class="mt-3 flex space-x-2 space-x-reverse">
                    <button class="rounded bg-primary-500 px-3 py-1 text-white">زر أول</button>
                    <button class="rounded bg-secondary-500 px-3 py-1 text-white">زر ثاني</button>
                    <button class="rounded bg-success-500 px-3 py-1 text-white">زر ثالث</button>
                  </div>
                </div>
                
                <div dir="rtl" class="rounded border border-neutral-200 p-4 dark:border-neutral-700">
                  <div class="mb-2 text-lg font-medium">متن فارسی</div>
                  <p class="text-sm">
                    این نمونه‌ای از متن فارسی است که از راست به چپ نمایش داده می‌شود. 
                    توجه کنید که چگونه فاصله‌گذاری و چیدمان به درستی تنظیم شده است.
                  </p>
                  <div class="mt-3 grid grid-cols-3 gap-2">
                    <input type="text" placeholder="نام" class="rounded border border-neutral-200 p-2 dark:border-neutral-700" />
                    <input type="email" placeholder="ایمیل" class="rounded border border-neutral-200 p-2 dark:border-neutral-700" />
                    <select class="rounded border border-neutral-200 p-2 dark:border-neutral-700">
                      <option>انتخاب کنید</option>
                      <option>گزینه اول</option>
                      <option>گزینه دوم</option>
                    </select>
                  </div>
                </div>

                <div class="rounded border border-neutral-200 p-4 dark:border-neutral-700">
                  <div class="mb-2 text-lg font-medium">Mixed Content</div>
                  <p class="text-sm" dir="rtl">
                    <span>هذا نص مختلط يحتوي على</span> English text <span>و النص العربي</span> in the same paragraph.
                    Notice how the direction is properly handled for mixed content.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Generated Code</h3>
        <div class="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800">
          <div class="mb-2 text-sm font-medium">Current Configuration</div>
          <pre class="text-sm">
            <code>{`// GlobalStyles configuration based on your settings:
import { GlobalStyles } from "~/components/Core/foundation";

export default component$(() => {
  return (
    <html${rtlMode.value ? ' dir="rtl"' : ''} lang="${rtlMode.value ? 'ar' : 'en'}">
      <head>
        <GlobalStyles />
      </head>
      <body${themeTransition.value ? ' class="transition-theme"' : ''}>
        {/* Your app content */}
      </body>
    </html>
  );
});

// Current settings:
// - Theme Transitions: ${themeTransition.value ? 'Enabled' : 'Disabled'}
// - RTL Mode: ${rtlMode.value ? 'Enabled' : 'Disabled'}  
// - Motion Safe: ${motionSafe.value ? 'Enabled' : 'Disabled'}
// - Active Demo: ${demos.find(d => d.id === selectedDemo.value)?.label || 'Unknown'}`}</code>
          </pre>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-primary-200 bg-primary-50 p-6 dark:border-primary-800 dark:bg-primary-950">
        <h3 class="mb-2 text-lg font-medium text-primary-900 dark:text-primary-100">
          🎮 Playground Tips
        </h3>
        <ul class="space-y-2 text-sm text-primary-800 dark:text-primary-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
            <span>Use Tab key to test focus states and keyboard navigation</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
            <span>Toggle theme transitions to see smooth color changes</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
            <span>Enable RTL mode to test right-to-left language support</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
            <span>Hover over elements to see transition effects in action</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500"></span>
            <span>Test form inputs and scrollable areas to see enhanced styling</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default GlobalStylesPlayground;