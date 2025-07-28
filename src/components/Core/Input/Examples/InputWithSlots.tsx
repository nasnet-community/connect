import { component$, useSignal, $ } from "@builder.io/qwik";
import { Input } from "~/components/Core/Input";

export const InputWithSlots = component$(() => {
  const searchTerm = useSignal("");
  const amount = useSignal("");
  const website = useSignal("");
  const password = useSignal("");
  const showPassword = useSignal(false);

  const handleSearchChange$ = $((_: any, value: string) => {
    searchTerm.value = value;
  });

  const handleAmountChange$ = $((_: any, value: string) => {
    amount.value = value;
  });

  const handleWebsiteChange$ = $((_: any, value: string) => {
    website.value = value;
  });

  const handlePasswordChange$ = $((_: any, value: string) => {
    password.value = value;
  });

  const togglePasswordVisibility$ = $(() => {
    showPassword.value = !showPassword.value;
  });

  const clearSearch$ = $(() => {
    searchTerm.value = "";
  });

  return (
    <div class="space-y-6 p-6">
      <div class="mb-4">
        <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
          Prefix and Suffix Slots
        </h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Enhance inputs with icons, buttons, and additional content using prefix and suffix slots.
        </p>
      </div>

      <div class="space-y-6">
        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Search with Clear Button
          </h4>
          <Input
            label="Search Products"
            placeholder="Search for products..."
            hasPrefixSlot
            hasSuffixSlot
            value={searchTerm.value}
            onChange$={handleSearchChange$}
          >
            <div q:slot="prefix" class="text-gray-500 dark:text-gray-400">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              q:slot="suffix"
              type="button"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick$={clearSearch$}
            >
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Input>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Currency Input
          </h4>
          <Input
            label="Amount"
            type="number"
            placeholder="0.00"
            hasPrefixSlot
            hasSuffixSlot
            value={amount.value}
            onChange$={handleAmountChange$}
          >
            <span q:slot="prefix" class="text-gray-700 dark:text-gray-300">$</span>
            <span q:slot="suffix" class="text-sm text-gray-500 dark:text-gray-400">USD</span>
          </Input>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Website URL
          </h4>
          <Input
            label="Website"
            type="url"
            placeholder="example.com"
            hasPrefixSlot
            hasSuffixSlot
            value={website.value}
            onChange$={handleWebsiteChange$}
          >
            <span q:slot="prefix" class="text-sm text-gray-500 dark:text-gray-400">https://</span>
            <button
              q:slot="suffix"
              type="button"
              class="rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
            >
              Visit
            </button>
          </Input>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password with Toggle
          </h4>
          <Input
            label="Password"
            type={showPassword.value ? "text" : "password"}
            placeholder="Enter your password"
            hasPrefixSlot
            hasSuffixSlot
            value={password.value}
            onChange$={handlePasswordChange$}
          >
            <div q:slot="prefix" class="text-gray-500 dark:text-gray-400">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <button
              q:slot="suffix"
              type="button"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick$={togglePasswordVisibility$}
            >
              {showPassword.value ? (
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                </svg>
              ) : (
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.543 7-1.275 4.057-5.065 7-9.543 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </Input>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Multiple Prefix Icons
          </h4>
          <Input
            label="User Account"
            placeholder="Enter username or email"
            hasPrefixSlot
          >
            <div q:slot="prefix" class="flex items-center space-x-1">
              <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span class="text-gray-400">|</span>
              <svg class="h-4 w-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </Input>
        </div>

        <div>
          <h4 class="mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Badge in Suffix
          </h4>
          <Input
            label="API Key"
            value="sk-1234567890abcdef"
            readonly
            hasSuffixSlot
          >
            <span q:slot="suffix" class="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
              Active
            </span>
          </Input>
        </div>
      </div>

      <div class="mt-8 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
        <h4 class="mb-2 font-medium text-gray-900 dark:text-white">Slot Usage:</h4>
        <pre class="text-sm text-gray-600 dark:text-gray-400">
{`<Input hasPrefixSlot hasSuffixSlot>
  <IconComponent q:slot="prefix" />
  <ButtonComponent q:slot="suffix" />
</Input>`}
        </pre>
      </div>

      <div class="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
        <h4 class="mb-2 font-medium text-blue-900 dark:text-blue-100">
          💡 Slot Best Practices
        </h4>
        <ul class="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• Use prefix slots for icons, labels, or input indicators</li>
          <li>• Use suffix slots for action buttons, units, or status badges</li>
          <li>• Keep slot content compact to maintain input usability</li>
          <li>• Ensure slot content has proper color contrast</li>
          <li>• Make interactive elements in slots keyboard accessible</li>
        </ul>
      </div>
    </div>
  );
});