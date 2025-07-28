import { component$ } from "@builder.io/qwik";
import {
  BasicKbd,
  KbdCombinations,
  OsSpecificKbd,
  KbdInContext,
} from "./Examples";

export const KbdShowcase = component$(() => {
  return (
    <div class="container mx-auto p-6">
      <h1 class="mb-8 text-3xl font-bold">Kbd Component Showcase</h1>

      <div class="space-y-12">
        <section>
          <h2 class="mb-6 text-2xl font-semibold">Basic Usage</h2>
          <BasicKbd />
        </section>

        <section>
          <h2 class="mb-6 text-2xl font-semibold">Key Combinations</h2>
          <KbdCombinations />
        </section>

        <section>
          <h2 class="mb-6 text-2xl font-semibold">OS-Specific Keys</h2>
          <OsSpecificKbd />
        </section>

        <section>
          <h2 class="mb-6 text-2xl font-semibold">Keys in Context</h2>
          <KbdInContext />
        </section>
      </div>
    </div>
  );
});
