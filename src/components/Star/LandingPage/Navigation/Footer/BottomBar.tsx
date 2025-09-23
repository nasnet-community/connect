import { component$ } from "@builder.io/qwik";

export const BottomBar = component$(() => {
  return (
    <div class="border-t border-white/20 bg-black/20 backdrop-blur-sm">
      <div class="max-w-7xl mx-auto px-4 py-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <div class="text-gray-400 text-sm">
            © 2024 MikroConnect. {$localize`All rights reserved.`}
          </div>
          <div class="flex items-center gap-6">
            <a href="/privacy" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              {$localize`Privacy Policy`}
            </a>
            <a href="/terms" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              {$localize`Terms of Service`}
            </a>
            <a href="/cookies" class="text-gray-400 hover:text-white text-sm transition-colors duration-200">
              {$localize`Cookie Policy`}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});