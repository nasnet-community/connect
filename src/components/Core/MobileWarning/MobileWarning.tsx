import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";

export const MobileWarning = component$(() => {
  const showWarning = useSignal(false);
  const isChecked = useSignal(false);

  // Check if device is mobile/tablet
  useVisibleTask$(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(
          userAgent,
        );
      const isTablet = /ipad|android(?!.*mobile)|kindle|silk|tablet/.test(
        userAgent,
      );
      const isSmallScreen = window.innerWidth < 1024; // lg breakpoint in Tailwind

      if ((isMobile || isTablet || isSmallScreen) && !isChecked.value) {
        showWarning.value = true;
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  });

  const handleContinue = $(() => {
    showWarning.value = false;
    isChecked.value = true;
    // Store in localStorage to remember user choice
    localStorage.setItem("mobile-warning-dismissed", "true");
  });

  const handleClose = $(() => {
    showWarning.value = false;
    isChecked.value = true;
    localStorage.setItem("mobile-warning-dismissed", "true");
  });

  // Check localStorage on mount
  useVisibleTask$(() => {
    const dismissed = localStorage.getItem("mobile-warning-dismissed");
    if (dismissed === "true") {
      isChecked.value = true;
    }
  });

  if (!showWarning.value) {
    return null;
  }

  return (
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div class="relative mx-4 w-full max-w-md rounded-2xl bg-slate-800 shadow-2xl">
        {/* Close button */}
        <button
          onClick$={handleClose}
          class="absolute right-4 top-4 text-slate-400 transition-colors hover:text-white"
          aria-label={$localize`Close`}
        >
          <svg
            class="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div class="p-8">
          {/* Icon */}
          <div class="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-500/20">
            <svg
              class="h-6 w-6 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 class="mb-4 text-2xl font-bold text-white">
            {$localize`Desktop Experience Recommended`}
          </h2>

          {/* Description */}
          <p class="mb-6 leading-relaxed text-slate-300">
            {$localize`This application is optimized for desktop devices. For the best experience, please access NASNET Connect from a computer or laptop.`}
          </p>

          {/* Additional info */}
          <p class="mb-8 text-sm text-slate-400">
            {$localize`You can continue on mobile, but some features may not work as expected.`}
          </p>

          {/* Continue button */}
          <button
            onClick$={handleContinue}
            class="w-full rounded-xl bg-yellow-500 px-6 py-3 font-semibold text-black transition-colors hover:bg-yellow-600"
          >
            {$localize`Continue Anyway`}
          </button>
        </div>
      </div>
    </div>
  );
});
