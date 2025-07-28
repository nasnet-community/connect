import { component$ } from "@builder.io/qwik";

/**
 * API Reference documentation for RTLProvider component
 */
export const RTLProviderAPIReference = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">RTLProvider API Reference</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          The RTLProvider component provides comprehensive RTL (Right-to-Left) text direction support 
          for languages like Arabic, Persian/Farsi, Hebrew, and Urdu. It handles document-level 
          direction changes and integrates with GlobalStyles for proper layout adjustments.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Component Interface</h3>
        <div class="rounded-lg border border-neutral-200 p-6 dark:border-neutral-700">
          <h4 class="mb-3 text-lg font-medium">Props</h4>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-neutral-200 dark:border-neutral-700">
                  <th class="pb-3 pr-6 text-left font-medium">Prop</th>
                  <th class="pb-3 pr-6 text-left font-medium">Type</th>
                  <th class="pb-3 pr-6 text-left font-medium">Default</th>
                  <th class="pb-3 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody class="text-sm">
                <tr class="border-b border-neutral-100 dark:border-neutral-800">
                  <td class="py-3 pr-6 font-mono">direction</td>
                  <td class="py-3 pr-6 font-mono">RTLDirection?</td>
                  <td class="py-3 pr-6 font-mono">"ltr"</td>
                  <td class="py-3">Explicit text direction. Either 'rtl' or 'ltr'.</td>
                </tr>
                <tr class="border-b border-neutral-100 dark:border-neutral-800">
                  <td class="py-3 pr-6 font-mono">language</td>
                  <td class="py-3 pr-6 font-mono">RTLLanguage?</td>
                  <td class="py-3 pr-6 font-mono">"auto"</td>
                  <td class="py-3">Language code for automatic direction detection. Supports 'ar', 'fa', 'he', 'ur', 'auto'.</td>
                </tr>
                <tr class="border-b border-neutral-100 dark:border-neutral-800">
                  <td class="py-3 pr-6 font-mono">useUserPreference</td>
                  <td class="py-3 pr-6 font-mono">boolean?</td>
                  <td class="py-3 pr-6 font-mono">false</td>
                  <td class="py-3">When true, detects direction from browser language settings.</td>
                </tr>
                <tr class="border-b border-neutral-100 dark:border-neutral-800">
                  <td class="py-3 pr-6 font-mono">children</td>
                  <td class="py-3 pr-6 font-mono">Slot</td>
                  <td class="py-3 pr-6">-</td>
                  <td class="py-3">Child components that will inherit RTL context.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Type Definitions</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">RTLDirection</h4>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`type RTLDirection = "rtl" | "ltr";

// "rtl" - Right-to-left text direction for Arabic, Persian, Hebrew, etc.
// "ltr" - Left-to-right text direction for English, most European languages`}</code>
              </pre>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">RTLLanguage</h4>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`type RTLLanguage = "ar" | "fa" | "he" | "ur" | "auto";

// "ar"   - Arabic (العربية)
// "fa"   - Persian/Farsi (فارسی) 
// "he"   - Hebrew (עברית)
// "ur"   - Urdu (اردو)
// "auto" - No automatic language detection, use direction prop`}</code>
              </pre>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">RTLProviderProps</h4>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <pre class="text-sm">
                <code>{`interface RTLProviderProps {
  direction?: RTLDirection;
  language?: RTLLanguage;
  useUserPreference?: boolean;
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Component Behavior</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Direction Resolution Priority</h4>
            <div class="space-y-3">
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">1. User Preference (Highest Priority)</div>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  When <code>useUserPreference={true}</code>, direction is determined from <code>navigator.language</code>
                </p>
              </div>
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">2. Language Code</div>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  When <code>language</code> is set to a specific language code, direction is auto-detected
                </p>
              </div>
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">3. Explicit Direction (Fallback)</div>
                <p class="text-sm text-neutral-600 dark:text-neutral-400">
                  Uses the <code>direction</code> prop value when no automatic detection is configured
                </p>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">DOM Modifications</h4>
            <div class="space-y-3">
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">HTML Attributes</div>
                <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• Sets <code>dir</code> attribute on <code>document.documentElement</code></li>
                  <li>• Sets <code>lang</code> attribute when language is specified</li>
                  <li>• Adds data attributes for component identification</li>
                </ul>
              </div>
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">CSS Classes</div>
                <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• Adds <code>.rtl</code> class for RTL direction</li>
                  <li>• Adds <code>.ltr</code> class for LTR direction</li>
                  <li>• Properly removes opposite direction classes</li>
                </ul>
              </div>
              <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
                <div class="mb-2 text-sm font-medium">Cleanup Behavior</div>
                <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                  <li>• Automatically resets to LTR when component unmounts</li>
                  <li>• Checks for parent RTL providers to avoid conflicts</li>
                  <li>• Ensures proper cleanup in single-page applications</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Language Support</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Supported RTL Languages</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="font-mono">ar</span>
                <span class="text-neutral-600 dark:text-neutral-400">Arabic (العربية)</span>
              </div>
              <div class="flex justify-between">
                <span class="font-mono">fa</span>
                <span class="text-neutral-600 dark:text-neutral-400">Persian (فارسی)</span>
              </div>
              <div class="flex justify-between">
                <span class="font-mono">he</span>
                <span class="text-neutral-600 dark:text-neutral-400">Hebrew (עברית)</span>
              </div>
              <div class="flex justify-between">
                <span class="font-mono">ur</span>
                <span class="text-neutral-600 dark:text-neutral-400">Urdu (اردو)</span>
              </div>
            </div>
          </div>
          
          <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
            <h4 class="mb-3 text-lg font-medium">Language Detection</h4>
            <div class="space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
              <div>• Supports language variants (e.g., ar-SA, fa-IR)</div>
              <div>• Uses <code>startsWith()</code> matching for flexibility</div>
              <div>• Falls back to LTR for unrecognized languages</div>
              <div>• Respects browser language preferences</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Integration with GlobalStyles</h3>
        <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
          <h4 class="mb-3 text-lg font-medium">Automatic Layout Adjustments</h4>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <div class="mb-2 text-sm font-medium">CSS Features</div>
              <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Text alignment (text-align: right)</li>
                <li>• Spacing utilities direction reversal</li>
                <li>• Margin auto adjustments</li>
                <li>• Flexbox justify content adjustments</li>
              </ul>
            </div>
            <div>
              <div class="mb-2 text-sm font-medium">Form Elements</div>
              <ul class="space-y-1 text-sm text-neutral-600 dark:text-neutral-400">
                <li>• Input direction handling</li>
                <li>• Select dropdown positioning</li>
                <li>• Label alignment adjustments</li>
                <li>• Icon positioning in inputs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Methods and Events</h3>
        <div class="rounded-lg border border-neutral-200 p-4 dark:border-neutral-700">
          <h4 class="mb-3 text-lg font-medium">Internal Methods</h4>
          <div class="space-y-3">
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <div class="mb-2 text-sm font-medium">checkIsRTL(lang: string): boolean</div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Internal method that determines if a language code corresponds to an RTL language.
                Wrapped with <code>$()</code> for serialization in Qwik tasks.
              </p>
            </div>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <div class="mb-2 text-sm font-medium">useTask$ - Direction Resolution</div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Reactive task that recalculates direction when props change. Handles user preference 
                detection and language-based direction determination.
              </p>
            </div>
            <div class="rounded bg-neutral-50 p-3 dark:bg-neutral-800">
              <div class="mb-2 text-sm font-medium">useVisibleTask$ - DOM Updates</div>
              <p class="text-sm text-neutral-600 dark:text-neutral-400">
                Client-side task that applies direction changes to the DOM. Includes cleanup 
                function for proper unmounting behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Usage Patterns</h3>
        <div class="space-y-4">
          <div class="rounded-lg border border-success-200 bg-success-50 p-4 dark:border-success-800 dark:bg-success-950">
            <h4 class="mb-2 text-lg font-medium text-success-900 dark:text-success-100">
              ✅ Recommended Patterns
            </h4>
            <div class="space-y-2 text-sm text-success-800 dark:text-success-200">
              <div>• Use at the root level of your application</div>
              <div>• Combine with GlobalStyles for comprehensive RTL support</div>
              <div>• Set language prop based on your i18n system</div>
              <div>• Use useUserPreference for automatic detection</div>
            </div>
          </div>

          <div class="rounded-lg border border-error-200 bg-error-50 p-4 dark:border-error-800 dark:bg-error-950">
            <h4 class="mb-2 text-lg font-medium text-error-900 dark:text-error-100">
              ❌ Anti-patterns
            </h4>
            <div class="space-y-2 text-sm text-error-800 dark:text-error-200">
              <div>• Nesting multiple RTLProvider components</div>
              <div>• Using without GlobalStyles for full RTL support</div>
              <div>• Manually setting dir attributes elsewhere</div>
              <div>• Ignoring cleanup in single-page applications</div>
            </div>
          </div>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-warning-200 bg-warning-50 p-6 dark:border-warning-800 dark:bg-warning-950">
        <h3 class="mb-2 text-lg font-medium text-warning-900 dark:text-warning-100">
          ⚠️ Important Notes
        </h3>
        <ul class="space-y-2 text-sm text-warning-800 dark:text-warning-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Document-Level Changes:</strong> RTLProvider modifies document.documentElement attributes</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Client-Side Only:</strong> DOM modifications only occur in browser environment</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>GlobalStyles Integration:</strong> Requires GlobalStyles for complete RTL layout support</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-warning-500"></span>
            <span><strong>Single Instance:</strong> Use only one RTLProvider per application to avoid conflicts</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default RTLProviderAPIReference;