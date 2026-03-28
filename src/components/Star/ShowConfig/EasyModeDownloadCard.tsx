import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { Card, CardBody, Button } from "~/components/Core";
import { LuDownload, LuCheckCircle, LuRouter } from "@qwikest/icons/lucide";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface EasyModeDownloadCardProps {
  onROSDownload$: PropFunction<() => void>;
}

export const EasyModeDownloadCard = component$<EasyModeDownloadCardProps>(
  ({ onROSDownload$ }) => {
    const locale = useMessageLocale();

    return (
      <Card
        variant="filled"
        elevation="lg"
        radius="xl"
        class="border-2 border-primary-200 bg-gradient-to-br from-primary-500/5 via-white to-secondary-500/5 dark:border-primary-800 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800"
      >
        <CardBody class="p-12 text-center">
          {/* Icon */}
          <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 dark:from-primary-500/30 dark:to-secondary-500/30">
            <LuRouter class="h-12 w-12 text-primary-600 dark:text-primary-400" />
          </div>

          {/* Title */}
          <h2 class="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
            {semanticMessages.show_config_easy_title({}, { locale })}
          </h2>

          {/* Success Message */}
          <div class="mb-4 flex items-center justify-center gap-2">
            <LuCheckCircle class="h-5 w-5 text-green-500" />
            <p class="text-lg text-gray-700 dark:text-gray-300">
              {semanticMessages.show_config_easy_success({}, { locale })}
            </p>
          </div>

          {/* Description */}
          <p class="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-400">
            {semanticMessages.show_config_easy_description({}, { locale })}
          </p>

          {/* Download Button */}
          <Button
            data-testid="easy-download-configuration"
            variant="primary"
            size="lg"
            onClick$={onROSDownload$}
            class="min-w-[250px] bg-gradient-to-r from-primary-500 to-primary-600 py-4 text-lg font-semibold shadow-lg transition-all duration-200 hover:from-primary-600 hover:to-primary-700 hover:shadow-xl"
          >
            <LuDownload class="mr-3 h-6 w-6" />
            {semanticMessages.show_config_easy_download_button({}, { locale })}
          </Button>

          {/* File Info */}
          <div class="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 dark:bg-slate-800">
            <svg
              class="h-4 w-4 text-gray-500 dark:text-gray-400"
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
              {semanticMessages.show_config_easy_file_type({}, { locale })}
            </span>
          </div>

          {/* Quick Tips */}
          <div class="mt-10 border-t border-gray-200 pt-8 dark:border-gray-700">
            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {semanticMessages.show_config_easy_steps_title({}, { locale })}
            </h3>
            <div class="mx-auto grid max-w-3xl gap-4 text-left md:grid-cols-3">
              <div class="flex gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/10 dark:bg-primary-500/20">
                  <span class="text-sm font-bold text-primary-600 dark:text-primary-400">
                    1
                  </span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {semanticMessages.show_config_easy_step_backup_title(
                      {},
                      { locale },
                    )}
                  </p>
                  <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {semanticMessages.show_config_easy_step_backup_description(
                      {},
                      { locale },
                    )}
                  </p>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/10 dark:bg-primary-500/20">
                  <span class="text-sm font-bold text-primary-600 dark:text-primary-400">
                    2
                  </span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {semanticMessages.show_config_easy_step_upload_title(
                      {},
                      { locale },
                    )}
                  </p>
                  <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {semanticMessages.show_config_easy_step_upload_description(
                      {},
                      { locale },
                    )}
                  </p>
                </div>
              </div>
              <div class="flex gap-3">
                <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/10 dark:bg-primary-500/20">
                  <span class="text-sm font-bold text-primary-600 dark:text-primary-400">
                    3
                  </span>
                </div>
                <div>
                  <p class="text-sm font-medium text-gray-900 dark:text-white">
                    {semanticMessages.show_config_easy_step_apply_title(
                      {},
                      { locale },
                    )}
                  </p>
                  <p class="mt-1 text-xs text-gray-600 dark:text-gray-400">
                    {semanticMessages.show_config_easy_step_apply_description(
                      {},
                      { locale },
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  },
);
