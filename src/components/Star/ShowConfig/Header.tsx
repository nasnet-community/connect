import { component$ } from "@builder.io/qwik";
import { useMessageLocale, semanticMessages } from "~/i18n/semantic";
import { LuSettings } from "@qwikest/icons/lucide";

interface HeaderProps {
  title?: string;
}

export const Header = component$<HeaderProps>(({ title }) => {
  const locale = useMessageLocale();
  const resolvedTitle =
    title ||
    semanticMessages.show_config_slave_title(
      { model: "", index: 1 },
      { locale },
    );

  return (
    <div class="mb-8 text-center md:mb-10">
      <div class="mx-auto max-w-4xl">
        <div class="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-500/10 text-secondary-500 dark:bg-secondary-500/15 dark:text-secondary-400 md:mb-5 md:h-20 md:w-20">
          <LuSettings class="h-8 w-8" />
        </div>

        <h1 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-3xl font-bold text-transparent md:text-4xl lg:text-5xl">
          {resolvedTitle}
        </h1>

        <p class="text-text-secondary dark:text-text-dark-secondary mx-auto mt-3 max-w-2xl text-base leading-7 md:text-lg">
          {semanticMessages.show_config_slave_description({}, { locale })}
        </p>
      </div>
    </div>
  );
});
