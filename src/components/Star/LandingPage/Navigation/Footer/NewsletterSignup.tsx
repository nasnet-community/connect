import { component$ } from "@builder.io/qwik";
import { Button } from "~/components/Core";

export const NewsletterSignup = component$(() => {
  return (
    <div class="mt-12 pt-8 border-t border-white/20">
      <div class="max-w-md mx-auto text-center lg:text-left lg:mx-0">
        <h3 class="text-lg font-semibold mb-2">
          {$localize`Stay Updated`}
        </h3>
        <p class="text-gray-300 mb-4">
          {$localize`Get the latest features, tutorials, and network optimization tips.`}
        </p>
        <div class="flex gap-2">
          <input
            type="email"
            placeholder={$localize`Enter your email`}
            class="flex-1 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-gray-400"
          />
          <Button
            variant="primary"
            class="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6"
          >
            {$localize`Subscribe`}
          </Button>
        </div>
      </div>
    </div>
  );
});