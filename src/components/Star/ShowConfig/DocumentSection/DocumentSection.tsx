import { component$ } from "@builder.io/qwik";
import { Card, CardHeader, CardBody, Button } from "~/components/Core";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";
import {
  LuBookOpen,
  LuHelpCircle,
  LuExternalLink,
  LuYoutube,
  LuFileText,
  LuGlobe,
} from "@qwikest/icons/lucide";

interface DocumentationItem {
  title: string;
  description: string;
  href: string;
  icon: any;
  badge?: string;
}

export const DocumentSection = component$(() => {
  const locale = useMessageLocale();
  const documentationItems: DocumentationItem[] = [
    {
      title: semanticMessages.show_config_documentation_item_docs_title(
        {},
        { locale },
      ),
      description:
        semanticMessages.show_config_documentation_item_docs_description(
          {},
          { locale },
        ),
      href: "https://www.starlink4iran.com/faqs/mcg/",
      icon: LuBookOpen,
      badge: semanticMessages.show_config_documentation_item_docs_badge(
        {},
        { locale },
      ),
    },
    {
      title: semanticMessages.show_config_documentation_item_quick_setup_title(
        {},
        { locale },
      ),
      description:
        semanticMessages.show_config_documentation_item_quick_setup_description(
          {},
          { locale },
        ),
      href: "https://wiki.mikrotik.com/wiki/Manual:Quickstart",
      icon: LuFileText,
    },
    {
      title: semanticMessages.show_config_documentation_item_video_title(
        {},
        { locale },
      ),
      description:
        semanticMessages.show_config_documentation_item_video_description(
          {},
          { locale },
        ),
      href: "https://www.youtube.com/c/MikroTikVideos",
      icon: LuYoutube,
      badge: semanticMessages.show_config_documentation_item_video_badge(
        {},
        { locale },
      ),
    },
    {
      title: semanticMessages.show_config_documentation_item_telegram_title(
        {},
        { locale },
      ),
      description:
        semanticMessages.show_config_documentation_item_telegram_description(
          {},
          { locale },
        ),
      href: "https://t.me/joinNASNETGroup",
      icon: LuGlobe,
    },
  ];
  const faqItems = [
    {
      question: semanticMessages.show_config_documentation_faq_question_backup(
        {},
        { locale },
      ),
      answer: semanticMessages.show_config_documentation_faq_answer_backup(
        {},
        { locale },
      ),
    },
    {
      question:
        semanticMessages.show_config_documentation_faq_question_not_working(
          {},
          { locale },
        ),
      answer: semanticMessages.show_config_documentation_faq_answer_not_working(
        {},
        { locale },
      ),
    },
    {
      question:
        semanticMessages.show_config_documentation_faq_question_multiple(
          {},
          { locale },
        ),
      answer: semanticMessages.show_config_documentation_faq_answer_multiple(
        {},
        { locale },
      ),
    },
    {
      question:
        semanticMessages.show_config_documentation_faq_question_firmware(
          {},
          { locale },
        ),
      answer: semanticMessages.show_config_documentation_faq_answer_firmware(
        {},
        { locale },
      ),
    },
  ];

  return (
    <div class="mt-12 space-y-8">
      {/* Documentation Resources Section */}
      <div>
        <div class="mb-6">
          <h2 class="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <LuBookOpen class="h-7 w-7 text-primary-500" />
            {semanticMessages.show_config_documentation_title({}, { locale })}
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            {semanticMessages.show_config_documentation_description(
              {},
              { locale },
            )}
          </p>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          {documentationItems.map((item, index) => (
            <Card
              key={index}
              variant="outlined"
              elevation="sm"
              radius="lg"
              interactive={true}
              hoverEffect="raise"
              href={item.href}
              target="_blank"
              class="group"
            >
              <CardHeader class="pb-3">
                <div class="flex items-start justify-between">
                  <div class="flex items-center gap-3">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500/10 transition-colors group-hover:bg-primary-500/20 dark:bg-primary-500/20 dark:group-hover:bg-primary-500/30">
                      <item.icon class="h-5 w-5 text-primary-500 dark:text-primary-400" />
                    </div>
                    <div class="flex-1">
                      <h3 class="flex items-center gap-2 font-semibold text-gray-900 dark:text-white">
                        {item.title}
                        {item.badge && (
                          <span class="rounded-full bg-primary-500/10 px-2 py-0.5 text-xs text-primary-600 dark:bg-primary-500/20 dark:text-primary-400">
                            {item.badge}
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>
                  <LuExternalLink class="h-4 w-4 text-gray-400 transition-colors group-hover:text-primary-500" />
                </div>
              </CardHeader>
              <CardBody class="pt-0">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <div class="mb-6">
          <h2 class="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
            <LuHelpCircle class="h-7 w-7 text-secondary-500" />
            {semanticMessages.show_config_documentation_faq_title(
              {},
              { locale },
            )}
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            {semanticMessages.show_config_documentation_faq_description(
              {},
              { locale },
            )}
          </p>
        </div>

        <div class="space-y-4">
          {faqItems.map((item, index) => (
            <Card
              key={index}
              variant="default"
              elevation="xs"
              radius="lg"
              class="overflow-hidden"
            >
              <CardBody>
                <details class="group">
                  <summary class="flex cursor-pointer select-none list-none items-start gap-3">
                    <div class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary-500/10 dark:bg-secondary-500/20">
                      <span class="text-xs font-semibold text-secondary-600 dark:text-secondary-400">
                        {index + 1}
                      </span>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-medium text-gray-900 transition-colors group-hover:text-primary-500 dark:text-white">
                        {item.question}
                      </h3>
                      <div class="animate-fadeIn mt-3 hidden text-sm text-gray-600 group-open:block dark:text-gray-400">
                        <p class="pl-9">{item.answer}</p>
                      </div>
                    </div>
                    <svg
                      class="mt-0.5 h-5 w-5 shrink-0 text-gray-400 transition-transform group-open:rotate-180"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </summary>
                </details>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Additional Help Card */}
      <Card
        variant="filled"
        elevation="md"
        radius="xl"
        class="border border-primary-200/50 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:border-primary-800/50 dark:from-primary-500/10 dark:to-secondary-500/10"
      >
        <CardBody class="py-8 text-center">
          <h3 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
            {semanticMessages.show_config_documentation_help_title(
              {},
              { locale },
            )}
          </h3>
          <p class="mx-auto mb-6 max-w-2xl text-gray-600 dark:text-gray-400">
            {semanticMessages.show_config_documentation_help_description(
              {},
              { locale },
            )}
          </p>
          <div class="flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              variant="primary"
              size="md"
              onClick$={() =>
                window.open("https://t.me/joinNASNETGroup", "_blank")
              }
            >
              <LuGlobe class="mr-2 h-4 w-4" />
              {semanticMessages.show_config_documentation_visit_telegram(
                {},
                { locale },
              )}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick$={() =>
                window.open("https://www.starlink4iran.com/faqs/mcg/", "_blank")
              }
            >
              <LuBookOpen class="mr-2 h-4 w-4" />
              {semanticMessages.show_config_documentation_help_browse_docs(
                {},
                { locale },
              )}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
});
