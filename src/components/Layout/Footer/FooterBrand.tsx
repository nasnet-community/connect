import { component$ } from "@builder.io/qwik";
import logo from "~/../public/images/logo.jpg";

export const FooterBrand = component$(() => (
  <div class="flex flex-col items-center space-y-6 text-center">
    <div class="flex items-center gap-3">
      <div class="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-gray-800">
        <img
          src={logo}
          alt={$localize`Stellar Logo`}
          width={40}
          height={40}
          class="h-full w-full object-cover"
        />
      </div>
      <span class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-xl font-medium tracking-wider text-transparent">
        {$localize`NASNET Connect`}
      </span>
    </div>
    <p class="mx-auto max-w-md text-sm text-text-secondary dark:text-text-dark-secondary">
      {$localize`Empowering the future through innovative solutions and cutting-edge technology.`}
    </p>
  </div>
));
