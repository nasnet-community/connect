import { component$, useServerData } from "@builder.io/qwik";
import { LOCALE_METADATA } from "~/i18n/config";
import { useMessageLocale } from "~/i18n/semantic";

export const NASNET_PANEL_URL =
  "https://www.joinnasnet.com/fa/products/nasnet-panel/";

// Runs in <head> (see root.tsx), before any link is parsed, so no link can be
// followed while the page is still loading. Listening on window in the capture
// phase runs ahead of qwikloader's document listeners, which also stops <Link>
// SPA navigation. Links marked data-sunset-allow (social profiles) still work.
export const SUNSET_GUARD_SCRIPT = `
(function () {
  // Without native <dialog> support the notice can't open, so leave links
  // working rather than swallowing clicks.
  if (
    window.__sunsetInit ||
    typeof HTMLDialogElement !== "function" ||
    typeof HTMLDialogElement.prototype.showModal !== "function"
  ) return;
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

type NoticeLang = "en" | "fa";

// Shown in both languages at once, so the copy lives here rather than in
// messages/*.json.
const NOTICE: Record<
  NoticeLang,
  { title: string; paragraphs: string[]; cta: string; close: string }
> = {
  en: {
    title: "NasNet Connect Has Been Discontinued",
    paragraphs: [
      "NasNet Connect has been officially discontinued and is no longer maintained. It will no longer receive updates, bug fixes, security patches, or technical support.",
      "If you are currently using NasNet Connect, we strongly recommend migrating to NasNet Panel as soon as possible to ensure continued access to improvements, security updates, and support.",
      "Introducing NasNet Panel — the next generation of NasNet Connect, actively developed to deliver a more secure, reliable, and improved experience for managing your MikroTik routers.",
      "Please migrate to NasNet Panel using the link below.",
    ],
    cta: "Go to NasNet Panel",
    close: "Close",
  },
  fa: {
    title: "پایان پشتیبانی از نس نت کانکت",
    paragraphs: [
      "پروژه نس نت کانکت به‌صورت رسمی متوقف شده و دیگه توسعه داده نمی‌شه. از این به بعد هیچ آپدیت، رفع مشکل، به‌روزرسانی امنیتی یا پشتیبانی فنی برای این برنامه ارائه نمی‌شه.",
      "اگه هنوز از نس نت کانکت استفاده می‌کنید، پیشنهاد می‌کنیم هرچه زودتر به نس نت پنل مهاجرت کنید تا همچنان از آپدیت‌های امنیتی، امکانات جدید و پشتیبانی بهره‌مند بشید.",
      "معرفی نس نت پنل — نسل جدید نس نت کانکت که به‌صورت فعال در حال توسعه‌ست و با امنیت بیشتر، پایداری بهتر و امکانات جدید، تجربه راحت‌تر و مطمئن‌تری برای مدیریت روترهاتون فراهم می‌کنه.",
      "برای استفاده از نس نت پنل، از لینک زیر وارد بشید.",
    ],
    cta: "ورود به نس نت پنل",
    close: "بستن",
  },
};

export const SunsetModal = component$(() => {
  const locale = useMessageLocale();
  const nonce = useServerData<string | undefined>("nonce");
  // The page's own language first, then the other one.
  const order: NoticeLang[] = locale === "fa" ? ["fa", "en"] : ["en", "fa"];
  const first = order[0];

  return (
    <>
      <dialog
        id="sunset-modal"
        aria-labelledby={`sunset-modal-title-${first}`}
        class="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
      >
        <div class="flex flex-col gap-6 p-6 sm:p-8">
          {order.map((lang, i) => (
            <section
              key={lang}
              lang={lang}
              dir={LOCALE_METADATA[lang].dir}
              class={[
                "flex flex-col gap-3",
                i > 0 && "border-t border-gray-200 pt-6 dark:border-gray-700",
              ]}
            >
              <h2
                id={`sunset-modal-title-${lang}`}
                class="text-xl font-bold leading-tight sm:text-2xl"
              >
                {NOTICE[lang].title}
              </h2>
              {NOTICE[lang].paragraphs.map((text) => (
                <p
                  key={text}
                  class="text-sm leading-relaxed text-gray-700 dark:text-gray-300 sm:text-base"
                >
                  {text}
                </p>
              ))}
            </section>
          ))}
          <div class="flex flex-col gap-3 sm:flex-row">
            <a
              href={NASNET_PANEL_URL}
              target="_blank"
              rel="noopener"
              class="inline-flex flex-1 flex-col items-center justify-center rounded-xl bg-primary-500 px-5 py-3 text-base font-semibold text-gray-900 transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
            >
              {order.map((lang) => (
                <span key={lang} lang={lang} dir={LOCALE_METADATA[lang].dir}>
                  {NOTICE[lang].cta}
                </span>
              ))}
            </a>
            <button
              type="button"
              data-sunset-close
              class="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {order.map((lang) => NOTICE[lang].close).join(" / ")}
            </button>
          </div>
        </div>
      </dialog>
      <script nonce={nonce} dangerouslySetInnerHTML={SUNSET_OPEN_SCRIPT} />
    </>
  );
});
