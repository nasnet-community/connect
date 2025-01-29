import { component$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";

export const Credentials = component$<StepProps>(({ onComplete$ }) => {
  return (
    <div class="mx-auto w-full max-w-5xl p-4">
      <div class="overflow-hidden rounded-2xl border border-border/50 bg-surface shadow-lg dark:border-border-dark dark:bg-surface-dark">
        {/* Header */}
        <div class="bg-gradient-to-br from-primary-400 via-primary-500 to-primary-600 p-6 dark:from-primary-600 dark:via-primary-500 dark:to-primary-700">
          <div class="flex items-center space-x-4">
            <div class="rounded-xl bg-white/20 p-2.5 backdrop-blur-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white">
                RouterOS Credentials
              </h2>
              <p class="mt-1 text-sm text-primary-50">
                Securely manage your device authentication
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div class="space-y-6 p-6">
          <div class="grid gap-6 md:grid-cols-2">
            {/* Current Credentials */}
            <div class="group relative">
              <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-500 to-secondary-500 opacity-30 blur transition duration-200 group-hover:opacity-40"></div>
              <div class="relative rounded-xl bg-surface p-6 dark:bg-surface-dark-secondary">
                <div class="mb-6 flex items-center space-x-3">
                  <div class="rounded-lg bg-primary-100 p-2 dark:bg-primary-900/30">
                    <svg
                      class="h-5 w-5 text-primary-600 dark:text-primary-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  <h3 class="text-lg font-semibold text-text dark:text-text-dark-default">
                    Current Credentials
                  </h3>
                </div>
                <div class="space-y-4">
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                      Username
                    </label>
                    <input
                      type="text"
                      class="focus:ring-primary-500/50 w-full rounded-lg border border-border bg-white px-4 py-2.5 transition-all
                      focus:border-primary-500 focus:ring-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder="Enter current username"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <label class="block text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                      Password
                    </label>
                    <input
                      type="password"
                      class="focus:ring-primary-500/50 w-full rounded-lg border border-border bg-white px-4 py-2.5 transition-all
                      focus:border-primary-500 focus:ring-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder="Enter current password"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* New Credentials */}
            <div class="group relative">
              <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-secondary-500 to-primary-500 opacity-30 blur transition duration-200 group-hover:opacity-40"></div>
              <div class="relative rounded-xl bg-surface p-6 dark:bg-surface-dark-secondary">
                <div class="mb-6 flex items-center justify-between">
                  <div class="flex items-center space-x-3">
                    <div class="rounded-lg bg-secondary-100 p-2 dark:bg-secondary-900/30">
                      <svg
                        class="h-5 w-5 text-secondary-600 dark:text-secondary-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 class="text-lg font-semibold text-text dark:text-text-dark-default">
                      New Credentials
                    </h3>
                  </div>
                  <span class="inline-flex items-center rounded-full bg-secondary-100 px-3 py-1 text-xs font-medium text-secondary-700 dark:bg-secondary-900/30 dark:text-secondary-400">
                    Optional
                  </span>
                </div>
                <div class="space-y-4">
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between">
                      <label class="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                        Username
                      </label>
                      <span class="text-xs text-text-muted dark:text-text-dark-muted">
                        Optional
                      </span>
                    </div>
                    <input
                      type="text"
                      class="focus:ring-secondary-500/50 w-full rounded-lg border border-border bg-white px-4 py-2.5 transition-all
                      focus:border-secondary-500 focus:ring-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder="Enter new username"
                    />
                  </div>
                  <div class="space-y-1.5">
                    <div class="flex items-center justify-between">
                      <label class="text-sm font-medium text-text-secondary dark:text-text-dark-secondary">
                        Password
                      </label>
                      <span class="text-xs text-text-muted dark:text-text-dark-muted">
                        Optional
                      </span>
                    </div>
                    <input
                      type="password"
                      class="focus:ring-secondary-500/50 w-full rounded-lg border border-border bg-white px-4 py-2.5 transition-all
                      focus:border-secondary-500 focus:ring-2 dark:border-border-dark dark:bg-surface-dark dark:text-text-dark-default"
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div class="flex justify-end pt-4">
            <button
              onClick$={onComplete$}
              class="focus:ring-primary-500/50 rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-2.5
              font-medium text-white shadow-sm shadow-primary-500/25 transition-all
              duration-200 hover:from-primary-600 hover:to-primary-700 focus:ring-2 focus:ring-offset-2 
              active:scale-[0.98] dark:focus:ring-offset-surface-dark"
            >
              Update Credentials
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});
