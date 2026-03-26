import { component$ } from "@builder.io/qwik";
import type { PropFunction } from "@builder.io/qwik";
import { CodeBlock, Button } from "~/components/Core";
import { LuTerminal, LuDownload } from "@qwikest/icons/lucide";

interface CodeProps {
  configPreview: string;
  onPythonDownload$: PropFunction<() => void>;
  onROSDownload$: PropFunction<() => void>;
}

export const Code = component$<CodeProps>(
  ({ configPreview, onROSDownload$ }) => {
    return (
      <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white dark:border-slate-700/50 dark:bg-slate-900/90 dark:shadow-2xl">
        {/* Header Section */}
        <div class="dark:to-slate-850 border-b border-gray-200 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 px-6 py-4 dark:border-slate-700/50 dark:bg-gradient-to-r dark:from-slate-800">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:border dark:border-emerald-500/30 dark:bg-emerald-500/10">
                <LuTerminal class="h-5 w-5 text-primary-500 dark:text-emerald-400" />
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-900 dark:text-slate-100">
                  {$localize`RouterOS Configuration`}
                </h2>
                <p class="text-sm text-gray-600 dark:text-slate-400">
                  {$localize`Generated MikroTik RouterOS script ready for deployment`}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              {/* Commented out Python download for now
              <Button
                variant="secondary"
                size="sm"
                onClick$={onPythonDownload$}
                class="min-w-[140px]"
              >
                <LuDownload class="w-4 h-4 mr-2" />
                {$localize`Download .py`}
              </Button> */}
              <Button
                data-testid="advanced-download-rsc"
                variant="primary"
                size="sm"
                onClick$={onROSDownload$}
                class="min-w-[140px]"
              >
                <LuDownload class="mr-2 h-4 w-4" />
                {$localize`Download .rsc`}
              </Button>
            </div>
          </div>
        </div>

        {/* Code Content */}
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
