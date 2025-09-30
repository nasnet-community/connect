import { component$ } from "@builder.io/qwik";
import { Card, CardHeader, CardBody, Button } from "~/components/Core";
import { LuBookOpen, LuHelpCircle, LuExternalLink, LuYoutube, LuFileText, LuGlobe } from "@qwikest/icons/lucide";

interface DocumentationItem {
  title: string;
  description: string;
  href: string;
  icon: any;
  badge?: string;
}

const documentationItems: DocumentationItem[] = [
  {
    title: $localize`Our Documentation`,
    description: $localize`Comprehensive guides and tutorials for router configuration and troubleshooting`,
    href: "https://www.starlink4iran.com/faqs/mcg/",
    icon: LuBookOpen,
    badge: $localize`Official`,
  },
  {
    title: $localize`Quick Setup Guide`,
    description: $localize`Step-by-step guide to get your router configured and running quickly`,
    href: "https://wiki.mikrotik.com/wiki/Manual:Quickstart",
    icon: LuFileText,
  },
  {
    title: $localize`Video Tutorials`,
    description: $localize`Visual learning resources and video guides for router configuration`,
    href: "https://www.youtube.com/c/MikroTikVideos",
    icon: LuYoutube,
    badge: $localize`Video`,
  },
  {
    title: $localize`Telegram Group`,
    description: $localize`Join our Telegram community for support and discussions`,
    href: "https://t.me/joinNASNETGroup",
    icon: LuGlobe,
  },
];

const faqItems = [
  {
    question: $localize`How do I backup my current configuration before applying the new one?`,
    answer: $localize`Use the command '/system backup save dont-encrypt=yes name="backup-filename"' in the terminal or through Winbox before applying any new configuration.`,
  },
  {
    question: $localize`What should I do if the configuration doesn't work?`,
    answer: $localize`If you experience issues, you can restore your backup using '/system backup load name="backup-filename"' or perform a factory reset if needed.`,
  },
  {
    question: $localize`Can I apply this configuration to multiple routers?`,
    answer: $localize`Yes, but ensure the router models are compatible and adjust interface names if they differ between devices.`,
  },
  {
    question: $localize`How often should I update my router firmware?`,
    answer: $localize`Check for updates monthly and apply stable releases. Always backup before updating and test in a non-production environment first.`,
  },
  {
    question: $localize`What's the difference between .rsc and .py files?`,
    answer: $localize`.rsc files are native RouterOS scripts that run directly on the router. .py files are Python scripts that connect to the router via API for remote configuration.`,
  },
];

export const DocumentSection = component$(() => {
  return (
    <div class="mt-12 space-y-8">
      {/* Documentation Resources Section */}
      <div>
        <div class="mb-6">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <LuBookOpen class="w-7 h-7 text-primary-500" />
            {$localize`Documentation & Resources`}
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            {$localize`Everything you need to master your router configuration`}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
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
                    <div class="w-10 h-10 rounded-lg bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/20 dark:group-hover:bg-primary-500/30 transition-colors">
                      <item.icon class="w-5 h-5 text-primary-500 dark:text-primary-400" />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {item.title}
                        {item.badge && (
                          <span class="px-2 py-0.5 text-xs rounded-full bg-primary-500/10 text-primary-600 dark:bg-primary-500/20 dark:text-primary-400">
                            {item.badge}
                          </span>
                        )}
                      </h3>
                    </div>
                  </div>
                  <LuExternalLink class="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
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
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <LuHelpCircle class="w-7 h-7 text-secondary-500" />
            {$localize`Frequently Asked Questions`}
          </h2>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            {$localize`Common questions and answers about router configuration`}
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
                  <summary class="flex items-start gap-3 cursor-pointer list-none select-none">
                    <div class="w-6 h-6 rounded-full bg-secondary-500/10 dark:bg-secondary-500/20 flex items-center justify-center mt-0.5 shrink-0">
                      <span class="text-xs font-semibold text-secondary-600 dark:text-secondary-400">
                        {index + 1}
                      </span>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-medium text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {item.question}
                      </h3>
                      <div class="mt-3 text-sm text-gray-600 dark:text-gray-400 hidden group-open:block animate-fadeIn">
                        <p class="pl-9">{item.answer}</p>
                      </div>
                    </div>
                    <svg
                      class="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180 shrink-0 mt-0.5"
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
        class="bg-gradient-to-br from-primary-500/5 to-secondary-500/5 dark:from-primary-500/10 dark:to-secondary-500/10 border border-primary-200/50 dark:border-primary-800/50"
      >
        <CardBody class="text-center py-8">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {$localize`Need More Help?`}
          </h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            {$localize`If you can't find what you're looking for in our documentation or FAQ, our support team is here to help you with your router configuration.`}
          </p>
          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              size="md"
              onClick$={() => window.open("https://t.me/joinNASNETGroup", "_blank")}
            >
              <LuGlobe class="w-4 h-4 mr-2" />
              {$localize`Visit Telegram Group`}
            </Button>
            <Button
              variant="secondary"
              size="md"
              onClick$={() => window.open("https://www.starlink4iran.com/faqs/mcg/", "_blank")}
            >
              <LuBookOpen class="w-4 h-4 mr-2" />
              {$localize`Browse Docs`}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
});