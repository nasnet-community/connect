import { component$, useServerData } from "@builder.io/qwik";
import { LOCALE_METADATA } from "~/i18n/config";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const NASNET_PANEL_URL =
  "https://www.joinnasnet.com/fa/products/nasnet-panel/";

// Plain inline script so the notice opens and links are blocked before Qwik
// loads. Listening on window in the capture phase runs ahead of qwikloader's
// document listeners, which is what stops <Link> SPA navigation too.
// Links marked data-sunset-allow (social profiles) keep working.
const SUNSET_SCRIPT = `
(function () {
  var dialog = document.getElementById("sunset-modal");
  if (!dialog || typeof dialog.showModal !== "function") return;
  function open() { if (!dialog.open) dialog.showModal(); }
  if (!window.__sunsetInit) {
    window.__sunsetInit = true;
    var block = function (e) {
      var target = e.target;
      if (!target || !target.closest) return;
      var link = target.closest("a[href]");
      if (!link) return;
      var modal = document.getElementById("sunset-modal");
      if (modal && modal.contains(link)) return;
      if (link.closest("[data-sunset-allow]")) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (modal && !modal.open) modal.showModal();
    };
    window.addEventListener("click", block, true);
    window.addEventListener("auxclick", block, true);
    document.addEventListener("click", function (e) {
      var modal = document.getElementById("sunset-modal");
      if (!modal) return;
      if (e.target === modal || (e.target.closest && e.target.closest("[data-sunset-close]"))) {
        modal.close();
      }
    });
  }
  open();
})();
`;

export const SunsetModal = component$(() => {
  const locale = useMessageLocale();
  const nonce = useServerData<string | undefined>("nonce");
  const dir = LOCALE_METADATA[locale].dir;

  return (
    <>
      <dialog
        id="sunset-modal"
        dir={dir}
        aria-labelledby="sunset-modal-title"
        class="w-[calc(100%-2rem)] max-w-xl rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <div class="flex flex-col gap-5 p-6 sm:p-8">
          <span class="inline-flex w-fit items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 dark:bg-red-900/40 dark:text-red-300">
            {semanticMessages.sunset_badge({}, { locale })}
          </span>
          <h2
            id="sunset-modal-title"
            class="text-2xl font-bold leading-tight sm:text-3xl"
          >
            {semanticMessages.sunset_title({}, { locale })}
          </h2>
          <p class="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {semanticMessages.sunset_body({}, { locale })}
          </p>
          <p class="text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {semanticMessages.sunset_next({}, { locale })}
          </p>
          <div class="flex flex-col gap-3 sm:flex-row">
            <a
              href={NASNET_PANEL_URL}
              target="_blank"
              rel="noopener"
              class="inline-flex flex-1 items-center justify-center rounded-xl bg-primary-500 px-5 py-3 text-base font-semibold text-gray-900 transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              {semanticMessages.sunset_cta({}, { locale })}
            </a>
            <button
              type="button"
              data-sunset-close
              class="inline-flex items-center justify-center rounded-xl border border-gray-300 px-5 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {semanticMessages.sunset_close({}, { locale })}
            </button>
          </div>
        </div>
      </dialog>
      <script nonce={nonce} dangerouslySetInnerHTML={SUNSET_SCRIPT} />
    </>
  );
});
