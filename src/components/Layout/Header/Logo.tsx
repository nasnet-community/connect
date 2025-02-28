import { component$ } from "@builder.io/qwik";
import logo from "../../../../public/images/logo.jpg";

export const Logo = component$(() => (
  <div class="flex items-center gap-3">
    <div class="group relative">
      <div class="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 opacity-75 blur transition duration-300 group-hover:opacity-100"></div>
      <div class="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white dark:border-gray-800">
        <img
          src={logo}
          alt={$localize`NASNET Connect Logo`}
          width={40}
          height={40}
          class="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
    <a
      href="/"
      class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-xl font-medium tracking-wider text-transparent transition-opacity hover:opacity-80"
    >
      {$localize`NASNET Connect`}
    </a>
  </div>
));
