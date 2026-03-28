import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { CodeBlock, Button } from "~/components/Core";
import { LuTerminal, LuDownload } from "@qwikest/icons/lucide";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
import { showConfigPanelClass } from "./theme";

interface CodeProps {
  configPreview: string;
  onROSDownload$: PropFunction<() => void>;
}

export const Code = component$<CodeProps>(
  ({ configPreview, onROSDownload$ }) => {
    const locale = useMessageLocale();

    return (
      <div class={showConfigPanelClass}>
        <div class="dark:bg-surface-dark-secondary/60 border-b border-gray-200 bg-surface/50 px-6 py-4 dark:border-gray-700">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 text-primary-500 dark:bg-primary-500/15 dark:text-primary-400">
                <LuTerminal class="h-5 w-5" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
                  {semanticMessages.show_config_advanced_title({}, { locale })}
                </h2>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {semanticMessages.show_config_advanced_subtitle(
                    {},
                    { locale },
                  )}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <Button
                data-testid="advanced-download-rsc"
                variant="primary"
                size="sm"
                onClick$={onROSDownload$}
                class="min-w-[140px]"
              >
                <LuDownload class="mr-2 h-4 w-4" />
                {semanticMessages.show_config_advanced_download_button(
                  {},
                  { locale },
                )}
              </Button>
            </div>
          </div>
        </div>

        <div class="p-6">
          <CodeBlock
            code={configPreview}
            language="bash"
            showLineNumbers={true}
            copyButton={true}
            theme="auto"
            wrap={true}
            maxHeight="500px"
            borderRadius="lg"
          />
        </div>
      </div>
    );
  },
);
