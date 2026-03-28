import { component$, Slot } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { Footer } from "~/components/Layout/Footer/Footer";
import { Header } from "~/components/Layout/Header/Header";
import { normalizeLocale } from "~/i18n/config";

export const onRequest: RequestHandler = ({ locale, params }) => {
  locale(normalizeLocale(params.locale));
};

export const head: DocumentHead = {
  title: "NASNET Connect",
  meta: [
    {
      name: "description",
      content: "Help you connect with the world",
    },
  ],
};

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col">
      <Header />
      <main class="flex-grow pt-20">
        <Slot />
      </main>
      <Footer />
    </div>
  );
});
