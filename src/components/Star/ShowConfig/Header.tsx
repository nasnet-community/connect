import { component$ } from "@builder.io/qwik";
import { useMessageLocale, semanticMessages } from "~/i18n/semantic";
import { LuRouter, LuSettings } from "@qwikest/icons/lucide";

interface HeaderProps {
  title?: string;
  variant?: "preview" | "master" | "slave";
}

export const Header = component$<HeaderProps>(
  ({ title, variant = "preview" }) => {
    const locale = useMessageLocale();
    const isSlaveRouter = variant === "slave";
    const isMasterRouter = variant === "master";
    const resolvedTitle =
      title ||
      (isSlaveRouter
        ? semanticMessages.show_config_slave_title(
            { model: "", index: 1 },
            { locale },
          )
        : isMasterRouter
          ? semanticMessages.show_config_master_title({}, { locale })
          : semanticMessages.show_config_preview_title({}, { locale }));

    return (
      <div class="relative mb-12 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-yellow-500/5 dark:to-blue-500/5" />
        <div class="absolute inset-0 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div class="container relative mx-auto px-4 py-16">
          <div class="mx-auto max-w-4xl text-center">
            <div class="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 backdrop-blur-xl transition-all duration-300 hover:scale-110 dark:bg-slate-800/50 dark:from-yellow-500/20 dark:to-blue-500/20 dark:shadow-2xl dark:hover:shadow-yellow-500/20">
              {isSlaveRouter ? (
                <LuSettings class="h-10 w-10 text-secondary-500 dark:text-blue-400" />
              ) : (
                <LuRouter class="h-10 w-10 text-primary-500 dark:text-yellow-400" />
              )}
            </div>

            <h1 class="mb-6 bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-4xl font-bold text-transparent dark:from-yellow-400 dark:to-blue-400 md:text-5xl lg:text-6xl">
              {resolvedTitle}
            </h1>

            <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-slate-300 md:text-xl">
              {isSlaveRouter
                ? semanticMessages.show_config_slave_description({}, { locale })
                : isMasterRouter
                  ? semanticMessages.show_config_master_description(
                      {},
                      { locale },
                    )
                  : semanticMessages.show_config_preview_description(
                      {},
                      { locale },
                    )}
            </p>
          </div>
        </div>
      </div>
    );
  },
);
