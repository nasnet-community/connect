import { component$, useServerData } from "@builder.io/qwik";
import { LOCALE_METADATA } from "~/i18n/config";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const NASNET_PANEL_URL =
  "https://www.joinnasnet.com/fa/products/nasnet-panel/";

// Runs in <head> (see root.tsx), before any link is parsed, so no link can be
// followed while the page is still loading. Listening on window in the capture
// phase runs ahead of qwikloader's document listeners, which also stops <Link>
// SPA navigation. Links marked data-sunset-allow (social profiles) still work.
export const SUNSET_GUARD_SCRIPT = `
(function () {
  if (window.__sunsetInit) return;
  window.__sunsetInit = true;
  function modal() { return document.getElementById("sunset-modal"); }
  function block(e) {
    var target = e.target;
    if (!target || !target.closest) return;
    var link = target.closest("a[href]");
    if (!link || link.closest("[data-sunset-allow]")) return;
    var dialog = modal();
    if (dialog && dialog.contains(link)) return;
    if (!dialog && document.readyState !== "loading") return;
    e.preventDefault();
    e.stopImmediatePropagation();
    if (dialog && !dialog.open) dialog.showModal();
  }
  window.addEventListener("click", block, true);
  window.addEventListener("auxclick", block, true);
  var pressedOnBackdrop = false;
  document.addEventListener("pointerdown", function (e) {
    pressedOnBackdrop = e.target === modal();
  });
  document.addEventListener("click", function (e) {
    var dialog = modal();
    if (!dialog) return;
    var onBackdrop = e.target === dialog && pressedOnBackdrop;
    pressedOnBackdrop = false;
    if (onBackdrop || (e.target.closest && e.target.closest("[data-sunset-close]"))) {
      dialog.close();
    }
  });
})();
`;

// Runs right after the dialog markup to open it on page load.
const SUNSET_OPEN_SCRIPT = `
(function () {
  var dialog = document.getElementById("sunset-modal");
  if (dialog && typeof dialog.showModal === "function" && !dialog.open) {
    dialog.showModal();
  }
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
      <script nonce={nonce} dangerouslySetInnerHTML={SUNSET_OPEN_SCRIPT} />
    </>
  );
});
