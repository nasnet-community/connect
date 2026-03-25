import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Core";

export const NewsletterSignup = component$(() => {
  return (
    <div class="mt-12 border-t border-white/20 pt-8">
      <div class="mx-auto max-w-md text-center lg:mx-0 lg:text-left">
        <h3 class="mb-2 text-lg font-semibold">{$localize`Stay Updated`}</h3>
        <p class="mb-4 text-gray-300">
          {$localize`Get the latest features, tutorials, and network optimization tips.`}
        </p>
        <div class="flex gap-2">
          <input
            type="email"
            placeholder={$localize`Enter your email`}
            class="flex-1 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder-gray-400 backdrop-blur-sm focus:border-purple-500 focus:outline-none"
          />
          <Button
            variant="primary"
            class="bg-gradient-to-r from-purple-500 to-blue-500 px-6 hover:from-purple-600 hover:to-blue-600"
          >
            {$localize`Subscribe`}
          </Button>
        </div>
      </div>
    </div>
  );
});
