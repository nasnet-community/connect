import { component$ } from "@builder.io/qwik";
import { HiArrowPathOutline } from "@qwikest/icons/heroicons";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const RebootHeader = component$(() => {
  const locale = useMessageLocale();

  return (
    <div class="bg-primary-500 px-6 py-8 dark:bg-primary-600">
      <div class="flex items-center space-x-5">
        <div class="rounded-xl border border-white/20 bg-white/10 p-3.5 backdrop-blur-sm">
          <HiArrowPathOutline class="h-7 w-7 text-white" />
        </div>
        <div class="space-y-1">
          <h2 class="text-2xl font-bold text-white">
            {semanticMessages.reboot_header_title({}, { locale })}
          </h2>
          <p class="text-sm font-medium text-primary-50">
            {semanticMessages.reboot_header_description({}, { locale })}
          </p>
        </div>
      </div>
    </div>
  );
});
