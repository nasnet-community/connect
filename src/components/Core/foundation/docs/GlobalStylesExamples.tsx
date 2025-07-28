import { component$ } from "@builder.io/qwik";

/**
 * Examples documentation for GlobalStyles component
 */
export const GlobalStylesExamples = component$(() => {
  return (
    <div class="space-y-8">
      <section>
        <h2 class="mb-6 text-2xl font-semibold">GlobalStyles Examples</h2>
        <p class="mb-6 text-base text-neutral-600 dark:text-neutral-400">
          Practical examples demonstrating the GlobalStyles component's features and benefits 
          in real-world scenarios.
        </p>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Focus State Demonstrations</h3>
        <p class="mb-4 text-sm text-neutral-600 dark:text-neutral-400">
          Use Tab key to navigate through these elements and observe the enhanced focus states:
        </p>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <button class="rounded-lg border border-neutral-200 p-3 text-left hover:bg-neutral-50 focus:outline-none dark:border-neutral-700 dark:hover:bg-neutral-800">
              <div class="font-medium">Standard Button</div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">Enhanced focus ring</div>
            </button>

            <a
              href="#"
              class="block rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50 focus:outline-none dark:border-neutral-700 dark:hover:bg-neutral-800"
            >
              <div class="font-medium">Link Element</div>
              <div class="text-sm text-neutral-600 dark:text-neutral-400">Focus with underline</div>
            </a>

            <input
              type="text"
              placeholder="Input field"
              class="w-full rounded-lg border border-neutral-200 p-3 focus:outline-none dark:border-neutral-700"
            />

            <select class="w-full rounded-lg border border-neutral-200 p-3 focus:outline-none dark:border-neutral-700">
              <option>Select option</option>
              <option>Option 1</option>
              <option>Option 2</option>
            </select>

            <textarea
              placeholder="Textarea field"
              rows={3}
              class="w-full rounded-lg border border-neutral-200 p-3 focus:outline-none dark:border-neutral-700"
            ></textarea>

            <div class="flex items-center space-x-2">
              <input type="checkbox" id="checkbox-focus" class="rounded focus:outline-none" />
              <label for="checkbox-focus" class="text-sm">
                Checkbox with enhanced focus
              </label>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// All interactive elements automatically receive enhanced focus states
// No additional classes needed - GlobalStyles handles it automatically

<button>Standard Button</button>  // Gets enhanced focus ring
<a href="#">Link Element</a>      // Gets focus ring + underline  
<input type="text" />             // Gets border + shadow focus
<select>...</select>              // Gets border + shadow focus`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Typography Hierarchy</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <div class="space-y-4">
            <h1>Heading 1 - Main Page Title</h1>
            <h2>Heading 2 - Section Title</h2>
            <h3>Heading 3 - Subsection Title</h3>
            <h4>Heading 4 - Component Title</h4>
            <h5>Heading 5 - Small Section</h5>
            <h6>Heading 6 - Minor Heading</h6>
            
            <p>
              This is a standard paragraph with proper line height and spacing. 
              Notice how the text flows naturally and maintains readability across 
              different screen sizes and themes.
            </p>
            
            <p class="text-sm">
              This is smaller text that maintains the same spacing principles 
              but at a reduced size for secondary information.
            </p>
            
            <div class="space-y-2">
              <div class="text-xs">Extra small text</div>
              <div class="text-sm">Small text</div>
              <div class="text-base">Base text</div>
              <div class="text-lg">Large text</div>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Semantic headings get automatic styling
<h1>Heading 1 - Main Page Title</h1>     // 2.25rem, bold, tight spacing
<h2>Heading 2 - Section Title</h2>       // 1.875rem, bold, tight spacing
<h3>Heading 3 - Subsection Title</h3>    // 1.5rem, bold
<h4>Heading 4 - Component Title</h4>     // 1.25rem, bold
<h5>Heading 5 - Small Section</h5>       // 1.125rem, bold
<h6>Heading 6 - Minor Heading</h6>       // 1rem, bold

// Paragraphs get proper spacing and line height
<p>Standard paragraph text...</p>         // 1rem, 1.5 line height`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Text Utility Examples</h3>
        <div class="mb-6 space-y-6">
          <div class="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
            <h4 class="mb-4 text-lg font-medium">Text Truncation</h4>
            <div class="space-y-4">
              <div class="w-48">
                <div class="truncate bg-neutral-100 p-2 dark:bg-neutral-800">
                  This is a very long text that will be truncated with an ellipsis when it exceeds the container width.
                </div>
                <div class="text-xs text-neutral-500 dark:text-neutral-400">Using .truncate class</div>
              </div>
              
              <div class="w-64">
                <div class="line-clamp-1 bg-neutral-100 p-2 dark:bg-neutral-800">
                  This is another very long text that demonstrates the line-clamp-1 utility for single line truncation.
                </div>
                <div class="text-xs text-neutral-500 dark:text-neutral-400">Using .line-clamp-1 class</div>
              </div>
              
              <div class="w-64">
                <div class="line-clamp-2 bg-neutral-100 p-2 dark:bg-neutral-800">
                  This is a longer text that will be clamped to exactly two lines. The text continues beyond what can fit in two lines but gets cut off with an ellipsis.
                </div>
                <div class="text-xs text-neutral-500 dark:text-neutral-400">Using .line-clamp-2 class</div>
              </div>
              
              <div class="w-64">
                <div class="line-clamp-3 bg-neutral-100 p-2 dark:bg-neutral-800">
                  This is an even longer text that demonstrates the line-clamp-3 utility. The text will be displayed across multiple lines but will be clamped at exactly three lines. Any additional content will be hidden with an ellipsis. This is useful for preview text or card descriptions.
                </div>
                <div class="text-xs text-neutral-500 dark:text-neutral-400">Using .line-clamp-3 class</div>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Text truncation utilities provided by GlobalStyles
<div class="truncate">Very long text...</div>           // Single line ellipsis
<div class="line-clamp-1">Long text...</div>            // Single line clamp
<div class="line-clamp-2">Longer text...</div>          // Two line clamp  
<div class="line-clamp-3">Even longer text...</div>     // Three line clamp`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Theme Transition Examples</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <h4 class="mb-4 text-lg font-medium">Smooth Theme Transitions</h4>
          <div class="space-y-4">
            <div class="transition-theme">
              <div class="space-y-4">
                <div class="fast-transition rounded-lg bg-primary-100 p-4 dark:bg-primary-900">
                  <div class="font-medium">Fast Transition (150ms)</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">Quick color changes</div>
                </div>
                
                <div class="medium-transition rounded-lg bg-secondary-100 p-4 dark:bg-secondary-900">
                  <div class="font-medium">Medium Transition (300ms)</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">Standard transition speed</div>
                </div>
                
                <div class="slow-transition rounded-lg bg-success-100 p-4 dark:bg-success-900">
                  <div class="font-medium">Slow Transition (500ms)</div>
                  <div class="text-sm text-neutral-600 dark:text-neutral-400">Smooth, deliberate changes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Enable smooth theme transitions
document.documentElement.classList.add('transition-theme');

// Apply different transition speeds
<div class="fast-transition">Quick changes (150ms)</div>
<div class="medium-transition">Standard changes (300ms)</div>  
<div class="slow-transition">Smooth changes (500ms)</div>

// Property-specific transitions  
<div class="transition-bg">Background only</div>
<div class="transition-colors">All colors</div>
<div class="transition-shadow">Shadow effects</div>`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Custom Scrollbar Demonstration</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <h4 class="mb-4 text-lg font-medium">Enhanced Scrollbars</h4>
          <div class="grid gap-4 md:grid-cols-2">
            <div>
              <div class="mb-2 text-sm font-medium">Vertical Scroll</div>
              <div class="h-32 overflow-y-auto rounded border border-neutral-200 p-3 dark:border-neutral-700">
                <div class="space-y-2">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} class="text-sm">
                      Scrollable content item {i + 1} - This content extends beyond the container height
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div class="mb-2 text-sm font-medium">Horizontal Scroll</div>
              <div class="w-full overflow-x-auto rounded border border-neutral-200 p-3 dark:border-neutral-700">
                <div class="flex w-max space-x-4">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} class="flex-shrink-0 rounded bg-neutral-100 p-3 dark:bg-neutral-800">
                      Item {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div class="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            Notice the styled scrollbars that adapt to light/dark themes automatically
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Custom scrollbars are applied automatically to all scrollable elements
// No additional classes needed

<div class="overflow-y-auto h-32">
  {/* Scrollable content */}
</div>

// Scrollbars automatically adapt to:
// - Light/dark themes
// - RTL languages  
// - WebKit and Firefox browsers`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">Form Element Consistency</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <h4 class="mb-4 text-lg font-medium">Cross-Browser Form Styling</h4>
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
            </div>
            
            <div class="space-y-4">
              <div>
                <label class="mb-1 block text-sm font-medium">Select Dropdown</label>
                <select class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700">
                  <option>Choose option</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              
              <div>
                <label class="mb-1 block text-sm font-medium">Textarea</label>
                <textarea
                  rows={3}
                  placeholder="Multi-line text input"
                  class="w-full rounded border border-neutral-200 p-2 dark:border-neutral-700"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="mt-4 text-xs text-neutral-500 dark:text-neutral-400">
            All form elements inherit consistent font, color, and letter-spacing properties
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// Form elements get automatic consistency improvements:
// - Font inheritance from parent
// - Color inheritance  
// - Letter-spacing inheritance
// - Hidden number input spinners
// - Enhanced autofill styling
// - Consistent focus states

<input type="text" />     // Gets enhanced styling automatically
<select>...</select>      // Consistent across browsers
<textarea>...</textarea>  // Proper font inheritance`}</code>
          </pre>
        </div>
      </section>

      <section>
        <h3 class="mb-4 text-xl font-semibold">RTL Language Support</h3>
        <div class="mb-6 rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900">
          <h4 class="mb-4 text-lg font-medium">Right-to-Left Layout</h4>
          <div class="space-y-4">
            <div dir="rtl" class="rounded border border-neutral-200 p-4 dark:border-neutral-700">
              <div class="mb-2 text-lg font-medium">النص العربي</div>
              <p class="text-sm">
                هذا مثال على النص العربي الذي يتم عرضه من اليمين إلى اليسار. 
                لاحظ كيف يتم محاذاة النص والتخطيط بشكل صحيح.
              </p>
              <div class="mt-3 flex space-x-2">
                <button class="rounded bg-primary-500 px-3 py-1 text-white">زر</button>
                <button class="rounded bg-secondary-500 px-3 py-1 text-white">آخر</button>
              </div>
            </div>
            
            <div dir="rtl" class="rounded border border-neutral-200 p-4 dark:border-neutral-700">
              <div class="mb-2 text-lg font-medium">متن فارسی</div>
              <p class="text-sm">
                این نمونه‌ای از متن فارسی است که از راست به چپ نمایش داده می‌شود. 
                توجه کنید که چگونه تنظیمات فاصله‌گذاری و چیدمان درست کار می‌کند.
              </p>
            </div>
            
            <div class="rounded border border-neutral-200 p-4 dark:border-neutral-700">
              <div class="mb-2 text-lg font-medium">Mixed Content</div>
              <p class="text-sm" dir="rtl">
                <span>هذا نص مختلط</span> with English text <span>و النص العربي</span> in the same paragraph.
              </p>
            </div>
          </div>
        </div>
        <div class="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
          <pre class="text-sm">
            <code>{`// RTL support is automatically applied when dir="rtl" is set
<div dir="rtl">
  <p>النص العربي</p>        // Right-aligned text
  <div class="flex space-x-2">   // Spacing adjusts for RTL
    <button>زر</button>
    <button>آخر</button>
  </div>
</div>

// Automatic RTL adjustments:
// - Text alignment (text-align: right)
// - Spacing utilities (space-x-* reverses)  
// - Margin auto adjustments (ml-auto, mr-auto)
// - Flexbox justify adjustments
// - Form input direction handling`}</code>
          </pre>
        </div>
      </section>

      <div class="mt-8 rounded-lg border border-success-200 bg-success-50 p-6 dark:border-success-800 dark:bg-success-950">
        <h3 class="mb-2 text-lg font-medium text-success-900 dark:text-success-100">
          🎯 Implementation Tips
        </h3>
        <ul class="space-y-2 text-sm text-success-800 dark:text-success-200">
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>Include GlobalStyles once in your root layout component</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>All styling enhancements work automatically - no additional classes needed</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>Use transition utility classes for custom animation timing</span>
          </li>
          <li class="flex items-start">
            <span class="mr-2 mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-success-500"></span>
            <span>Test keyboard navigation to see enhanced focus states in action</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default GlobalStylesExamples;