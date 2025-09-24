import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { Card, CardBody, Button } from "~/components/Core";
import { LuDownload, LuCheckCircle, LuRouter } from "@qwikest/icons/lucide";

interface EasyModeDownloadCardProps {
  onROSDownload$: PropFunction<() => void>;
}

export const EasyModeDownloadCard = component$<EasyModeDownloadCardProps>(
  ({ onROSDownload$ }) => {
    return (
      <Card
        variant="filled"
        elevation="lg"
        radius="xl"
        class="bg-gradient-to-br from-primary-500/5 via-white to-secondary-500/5 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border-2 border-primary-200 dark:border-primary-800"
      >
        <CardBody class="p-12 text-center">
          {/* Icon */}
          <div class="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 dark:from-primary-500/30 dark:to-secondary-500/30 flex items-center justify-center mb-6">
            <LuRouter class="w-12 h-12 text-primary-600 dark:text-primary-400" />
          </div>

          {/* Title */}
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            {$localize`Configuration Ready!`}
          </h2>

          {/* Success Message */}
          <div class="flex items-center justify-center gap-2 mb-4">
            <LuCheckCircle class="w-5 h-5 text-green-500" />
            <p class="text-lg text-gray-700 dark:text-gray-300">
              {$localize`Your router configuration has been generated successfully`}
            </p>
          </div>

          {/* Description */}
          <p class="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {$localize`Download the configuration file and apply it to your MikroTik router using the instructions below. Make sure to backup your current settings before proceeding.`}
          </p>

          {/* Download Button */}
          <Button
            variant="primary"
            size="lg"
            onClick$={onROSDownload$}
            class="min-w-[250px] py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
          >
            <LuDownload class="w-6 h-6 mr-3" />
            {$localize`Download Configuration`}
          </Button>

          {/* File Info */}
          <div class="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {$localize`RouterOS Script (.rsc)`}
            </span>
          </div>

          {/* Quick Tips */}
          <div class="mt-10 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {$localize`Quick Setup Steps`}
            </h3>
            <div class="grid md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center shrink-0">
                  <span class="text-sm font-bold text-primary-600 dark:text-primary-400">1</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">
                    {$localize`Backup Current`}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {$localize`Save your existing configuration`}
                  </p>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center shrink-0">
                  <span class="text-sm font-bold text-primary-600 dark:text-primary-400">2</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">
                    {$localize`Upload File`}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {$localize`Transfer .rsc file to router`}
                  </p>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="w-8 h-8 rounded-full bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center shrink-0">
                  <span class="text-sm font-bold text-primary-600 dark:text-primary-400">3</span>
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">
                    {$localize`Apply Config`}
                  </p>
                  <p class="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {$localize`Run the script on your router`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
);