import { component$ } from "@builder.io/qwik";

export const BottomBar = component$(() => {
  return (
    <div class="border-t border-white/20 bg-black/20 backdrop-blur-sm">
      <div class="mx-auto max-w-7xl px-4 py-4">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="text-sm text-gray-400">
            © 2024 MikroConnect. {$localize`All rights reserved.`}
          </div>
          <div class="flex items-center gap-6">
            <a
              href="/privacy"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {$localize`Privacy Policy`}
            </a>
            <a
              href="/terms"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {$localize`Terms of Service`}
            </a>
            <a
              href="/cookies"
              class="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              {$localize`Cookie Policy`}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});
