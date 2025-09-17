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
      <div class="rounded-2xl border border-gray-200 bg-white overflow-hidden dark:border-slate-700/50 dark:bg-slate-900/90 dark:shadow-2xl">
        {/* Header Section */}
        <div class="px-6 py-4 border-b border-gray-200 dark:border-slate-700/50 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-850">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 dark:bg-emerald-500/10 dark:border dark:border-emerald-500/30 flex items-center justify-center">
                <LuTerminal class="w-5 h-5 text-primary-500 dark:text-emerald-400" />
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
                variant="primary"
                size="sm"
                onClick$={onROSDownload$}
                class="min-w-[140px]"
              >
                <LuDownload class="w-4 h-4 mr-2" />
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
