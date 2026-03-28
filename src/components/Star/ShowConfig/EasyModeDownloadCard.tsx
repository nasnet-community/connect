import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { Card, CardBody, Button } from "~/components/Core";
import { LuDownload, LuCheckCircle, LuRouter } from "@qwikest/icons/lucide";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
import { showConfigHighlightPanelClass } from "./theme";

interface EasyModeDownloadCardProps {
  onROSDownload$: PropFunction<() => void>;
}

export const EasyModeDownloadCard = component$<EasyModeDownloadCardProps>(
  ({ onROSDownload$ }) => {
    const locale = useMessageLocale();
    const steps = [
      {
        title: semanticMessages.show_config_easy_step_backup_title(
          {},
          { locale },
        ),
        description: semanticMessages.show_config_easy_step_backup_description(
          {},
          { locale },
        ),
      },
      {
        title: semanticMessages.show_config_easy_step_upload_title(
          {},
          { locale },
        ),
        description: semanticMessages.show_config_easy_step_upload_description(
          {},
          { locale },
        ),
      },
      {
        title: semanticMessages.show_config_easy_step_apply_title(
          {},
          { locale },
        ),
        description: semanticMessages.show_config_easy_step_apply_description(
          {},
          { locale },
        ),
      },
    ];

    return (
      <Card
        variant="filled"
        elevation="lg"
        radius="xl"
        class={showConfigHighlightPanelClass}
      >
        <CardBody class="p-8 text-center md:p-10">
          <div class="h-18 w-18 mx-auto mb-4 flex items-center justify-center rounded-full bg-primary-500/10 text-primary-500 dark:bg-primary-500/15 dark:text-primary-400 md:h-20 md:w-20">
            <LuRouter class="h-9 w-9 md:h-10 md:w-10" />
          </div>

          <h2 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            {semanticMessages.show_config_easy_title({}, { locale })}
          </h2>

          <div class="mb-3 flex items-center justify-center gap-2">
            <LuCheckCircle class="h-5 w-5 text-green-500" />
            <p class="text-base text-gray-700 dark:text-gray-300 md:text-lg">
              {semanticMessages.show_config_easy_success({}, { locale })}
            </p>
          </div>

          <p class="mx-auto mb-6 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 md:text-base">
            {semanticMessages.show_config_easy_description({}, { locale })}
          </p>

          <Button
            data-testid="easy-download-configuration"
            variant="primary"
            size="lg"
            onClick$={onROSDownload$}
            class="min-w-[220px] bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-3 text-base font-semibold shadow-lg transition-all duration-200 hover:from-primary-600 hover:to-primary-700 hover:shadow-xl"
          >
            <LuDownload class="mr-3 h-5 w-5" />
            {semanticMessages.show_config_easy_download_button({}, { locale })}
          </Button>

          <div class="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
            <h3 class="mb-3 text-base font-semibold text-gray-900 dark:text-white md:text-lg">
              {semanticMessages.show_config_easy_steps_title({}, { locale })}
            </h3>
            <div class="mx-auto grid max-w-3xl gap-3 text-left md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} class="flex gap-3">
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/10 dark:bg-primary-500/20">
                    <span class="text-sm font-bold text-primary-600 dark:text-primary-400">
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">
                      {step.title}
                    </p>
                    <p class="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  },
);
