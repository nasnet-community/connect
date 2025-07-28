import { component$ } from "@builder.io/qwik";
import { Spinner } from "../Spinner";
import { ProgressBar } from "../ProgressBar";

export const DarkModeProgressExample = component$(() => {
  return (
    <div class="space-y-8 p-8">
      {/* Light mode section */}
      <div class="bg-surface-light rounded-lg p-6" data-theme="light">
        <h2 class="mb-4 text-lg font-semibold text-gray-900">Light Mode</h2>

        <div class="space-y-4">
          <div>
            <h3 class="mb-2 text-sm font-medium text-gray-700">Spinners</h3>
            <div class="flex flex-wrap gap-4">
              <Spinner color="primary" showLabel label="Primary" />
              <Spinner color="secondary" showLabel label="Secondary" />
              <Spinner color="success" showLabel label="Success" />
              <Spinner color="warning" showLabel label="Warning" />
              <Spinner color="error" showLabel label="Error" />
              <Spinner color="info" showLabel label="Info" />
            </div>
          </div>

          <div>
            <h3 class="mb-2 text-sm font-medium text-gray-700">
              Progress Bars
            </h3>
            <div class="space-y-2">
              <ProgressBar value={70} color="primary" showValue />
              <ProgressBar value={60} color="secondary" showValue />
              <ProgressBar value={50} color="success" showValue />
              <ProgressBar value={40} color="warning" showValue />
              <ProgressBar value={30} color="error" showValue />
              <ProgressBar value={20} color="info" showValue />
            </div>
          </div>
        </div>
      </div>

      {/* Dark mode section */}
      <div class="rounded-lg bg-surface-dark p-6" data-theme="dark">
        <h2 class="mb-4 text-lg font-semibold text-gray-100">Dark Mode</h2>

        <div class="space-y-4">
          <div>
            <h3 class="mb-2 text-sm font-medium text-gray-300">Spinners</h3>
            <div class="flex flex-wrap gap-4">
              <Spinner color="primary" showLabel label="Primary" />
              <Spinner color="secondary" showLabel label="Secondary" />
              <Spinner color="success" showLabel label="Success" />
              <Spinner color="warning" showLabel label="Warning" />
              <Spinner color="error" showLabel label="Error" />
              <Spinner color="info" showLabel label="Info" />
            </div>
          </div>

          <div>
            <h3 class="mb-2 text-sm font-medium text-gray-300">
              Progress Bars
            </h3>
            <div class="space-y-2">
              <ProgressBar value={70} color="primary" showValue />
              <ProgressBar value={60} color="secondary" showValue />
              <ProgressBar value={50} color="success" showValue />
              <ProgressBar value={40} color="warning" showValue />
              <ProgressBar value={30} color="error" showValue />
              <ProgressBar value={20} color="info" showValue />
            </div>
          </div>
        </div>
      </div>

      {/* Dim mode section */}
      <div class="bg-surface-dim rounded-lg p-6" data-theme="dim">
        <h2 class="mb-4 text-lg font-semibold text-gray-200">Dim Mode</h2>

        <div class="space-y-4">
          <div>
            <h3 class="mb-2 text-sm font-medium text-gray-400">Spinners</h3>
            <div class="flex flex-wrap gap-4">
              <Spinner color="primary" showLabel label="Primary" />
              <Spinner color="secondary" showLabel label="Secondary" />
              <Spinner color="success" showLabel label="Success" />
              <Spinner color="warning" showLabel label="Warning" />
              <Spinner color="error" showLabel label="Error" />
              <Spinner color="info" showLabel label="Info" />
            </div>
          </div>

          <div>
            <h3 class="mb-2 text-sm font-medium text-gray-400">
              Progress Bars
            </h3>
            <div class="space-y-2">
              <ProgressBar value={70} color="primary" showValue />
              <ProgressBar value={60} color="secondary" showValue />
              <ProgressBar value={50} color="success" showValue />
              <ProgressBar value={40} color="warning" showValue />
              <ProgressBar value={30} color="error" showValue />
              <ProgressBar value={20} color="info" showValue />
            </div>
          </div>
        </div>
      </div>

      {/* Different spinner variants */}
      <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div class="bg-surface-light-secondary dark:bg-surface-dark-secondary dim:bg-surface-dim-secondary rounded-lg p-6">
          <h3 class="mb-4 text-sm font-medium text-gray-700 dim:text-gray-400 dark:text-gray-300">
            Spinner Variants
          </h3>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Spinner variant="border" color="primary" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Border
              </span>
            </div>
            <div class="flex items-center gap-3">
              <Spinner variant="grow" color="secondary" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Grow</span>
            </div>
            <div class="flex items-center gap-3">
              <Spinner variant="dots" color="success" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Dots</span>
            </div>
            <div class="flex items-center gap-3">
              <Spinner variant="bars" color="warning" />
              <span class="text-sm text-gray-600 dark:text-gray-400">Bars</span>
            </div>
            <div class="flex items-center gap-3">
              <Spinner variant="circle" color="error" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Circle
              </span>
            </div>
          </div>
        </div>

        <div class="bg-surface-light-tertiary dark:bg-surface-dark-tertiary dim:bg-surface-dim-tertiary rounded-lg p-6">
          <h3 class="mb-4 text-sm font-medium text-gray-700 dim:text-gray-400 dark:text-gray-300">
            Progress Bar Variants
          </h3>
          <div class="space-y-4">
            <ProgressBar
              value={80}
              color="primary"
              variant="solid"
              showValue
              valuePosition="center"
            />
            <ProgressBar
              value={70}
              color="secondary"
              variant="gradient"
              showValue
              valuePosition="inside"
            />
            <ProgressBar value={60} color="success" buffer={80} showValue />
            <ProgressBar
              value={50}
              color="warning"
              animation="striped"
              showValue
            />
            <ProgressBar
              value={40}
              color="error"
              animation="striped-animated"
              showValue
            />
            <ProgressBar indeterminate color="info" />
          </div>
        </div>

        <div class="bg-surface-light-quaternary dark:bg-surface-dark-quaternary dim:bg-surface-dim-quaternary rounded-lg p-6">
          <h3 class="mb-4 text-sm font-medium text-gray-700 dim:text-gray-400 dark:text-gray-300">
            Sizes
          </h3>
          <div class="space-y-4">
            <div class="flex items-center gap-3">
              <Spinner size="xs" color="primary" />
              <span class="text-xs text-gray-600 dark:text-gray-400">
                Extra Small
              </span>
            </div>
            <div class="flex items-center gap-3">
              <Spinner size="sm" color="primary" />
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Small
              </span>
            </div>
            <div class="flex items-center gap-3">
              <Spinner size="md" color="primary" />
              <span class="text-base text-gray-600 dark:text-gray-400">
                Medium
              </span>
            </div>
            <div class="flex items-center gap-3">
              <Spinner size="lg" color="primary" />
              <span class="text-lg text-gray-600 dark:text-gray-400">
                Large
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
