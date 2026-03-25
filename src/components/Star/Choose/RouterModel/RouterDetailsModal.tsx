import {
  $,
  component$,
  useSignal,
  useVisibleTask$,
  type Signal,
  type QRL,
} from "@builder.io/qwik";
import {
  LuChevronLeft,
  LuChevronRight,
  LuInfo,
  LuCpu,
  LuImage,
  LuUsb,
  LuNetwork,
  LuContainer,
  LuSatellite,
  LuSignal,
  LuCheckCircle,
  LuXCircle,
  LuExpand,
  LuX,
} from "@qwikest/icons/lucide";
import {
  type RouterData,
  hasUSBPort,
  has25GigPort,
  isDockerCapable,
  isStarlinkMiniCompatible,
  isDomesticLinkAlternative,
} from "./Constants";

interface RouterDetailsModalProps {
  router: RouterData | null;
  isOpen: Signal<boolean>;
  onClose$: QRL<() => void>;
}

export const RouterDetailsModal = component$<RouterDetailsModalProps>(
  (props) => {
    const { router, isOpen, onClose$ } = props;
    const currentImageIndex = useSignal(0);
    const activeTab = useSignal("overview");
    const isImageFullscreen = useSignal(false);

    const handlePrevImage = $(() => {
      if (router && router.images && router.images.length > 1) {
        currentImageIndex.value =
          currentImageIndex.value === 0
            ? router.images.length - 1
            : currentImageIndex.value - 1;
      }
    });

    const handleNextImage = $(() => {
      if (router && router.images && router.images.length > 1) {
        currentImageIndex.value =
          currentImageIndex.value === router.images.length - 1
            ? 0
            : currentImageIndex.value + 1;
      }
    });

    const handleFullscreenToggle = $(() => {
      isImageFullscreen.value = !isImageFullscreen.value;
    });

    const handleFullscreenClose = $(() => {
      isImageFullscreen.value = false;
    });

    // Keyboard support for fullscreen image viewer
    useVisibleTask$(({ cleanup }) => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (isImageFullscreen.value) {
          switch (e.key) {
            case "Escape":
              isImageFullscreen.value = false;
              break;
            case "ArrowLeft":
              handlePrevImage();
              break;
            case "ArrowRight":
              handleNextImage();
              break;
          }
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      cleanup(() => document.removeEventListener("keydown", handleKeyDown));
    });

    if (!isOpen.value) {
      return null;
    }

    const tabs = [
      {
        id: "overview",
        label: $localize`Overview`,
        icon: <LuInfo class="h-4 w-4" />,
      },
      {
        id: "specs",
        label: $localize`Specifications`,
        icon: <LuCpu class="h-4 w-4" />,
      },
    ];

    return (
      <div class="fixed inset-0 z-[9999]">
        {/* Backdrop */}
        <div
          class="fixed inset-0 bg-black/60 backdrop-blur-md transition-all duration-300"
          onClick$={onClose$}
        ></div>

        {/* Modal Container - Perfectly centered */}
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <div class="relative flex h-[75vh] w-full max-w-6xl transform animate-fade-in-up flex-col rounded-2xl border border-gray-200/20 bg-white text-left shadow-2xl transition-all dark:border-gray-700/30 dark:bg-gray-900">
            {/* Header with gradient */}
            <div class="relative flex items-center justify-between rounded-t-2xl border-b border-gray-200/20 bg-gradient-to-r from-primary-500/10 via-secondary-500/10 to-primary-500/10 px-6 py-4 dark:border-gray-700/30">
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500">
                  <LuInfo class="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                    {router?.title || "Router Details"}
                  </h2>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {router?.description}
                  </p>
                </div>
              </div>
              <button
                onClick$={onClose$}
                class="inline-flex items-center justify-center rounded-xl p-2 text-gray-400 transition-all duration-200 hover:bg-gray-100/50 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 dark:hover:bg-gray-800/50 dark:hover:text-gray-300"
                aria-label="Close modal"
                type="button"
              >
                <svg
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Tab Navigation */}
            <div class="flex border-b border-gray-200/20 bg-gray-50/50 dark:border-gray-700/30 dark:bg-gray-800/50">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick$={() => (activeTab.value = tab.id)}
                  class={`
                  flex items-center gap-2 border-b-2 px-6 py-3 text-sm font-medium transition-all 
                  duration-200 hover:bg-white/50 dark:hover:bg-gray-700/50
                  ${
                    activeTab.value === tab.id
                      ? "border-primary-500 bg-white text-primary-600 dark:bg-gray-800 dark:text-primary-400"
                      : "border-transparent text-gray-600 dark:text-gray-400"
                  }
                `}
                  type="button"
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div class="flex-1 overflow-hidden">
              {router ? (
                <>
                  {/* Overview Tab */}
                  {activeTab.value === "overview" && (
                    <div class="h-full p-6">
                      <div class="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Left Column - Image + Key Info */}
                        <div class="space-y-6">
                          {/* Router Image - Compact with controls */}
                          <div class="relative h-[220px] rounded-xl bg-gray-100/50 p-3 dark:bg-gray-800/50">
                            {router.images && router.images.length > 0 ? (
                              <div class="relative flex h-full w-full items-center justify-center">
                                <img
                                  src={router.images[currentImageIndex.value]}
                                  alt={router.title}
                                  width="640"
                                  height="440"
                                  class="max-h-full max-w-full rounded-lg object-contain"
                                  loading="lazy"
                                />

                                {/* Navigation Controls */}
                                {router.images.length > 1 && (
                                  <>
                                    <button
                                      class="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
                                      onClick$={handlePrevImage}
                                      type="button"
                                      aria-label="Previous image"
                                    >
                                      <LuChevronLeft class="h-3 w-3" />
                                    </button>
                                    <button
                                      class="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
                                      onClick$={handleNextImage}
                                      type="button"
                                      aria-label="Next image"
                                    >
                                      <LuChevronRight class="h-3 w-3" />
                                    </button>
                                  </>
                                )}

                                {/* Expand Button */}
                                <button
                                  class="absolute right-2 top-2 rounded-full bg-black/60 p-1.5 text-white transition-colors hover:bg-black/80"
                                  onClick$={handleFullscreenToggle}
                                  type="button"
                                  aria-label="View full size"
                                >
                                  <LuExpand class="h-3 w-3" />
                                </button>

                                {/* Image indicators */}
                                {router.images.length > 1 && (
                                  <div class="absolute bottom-2 left-1/2 flex -translate-x-1/2 transform gap-1">
                                    {router.images.map((_, index) => (
                                      <button
                                        key={index}
                                        onClick$={() =>
                                          (currentImageIndex.value = index)
                                        }
                                        class={`h-1.5 w-1.5 rounded-full transition-all ${
                                          currentImageIndex.value === index
                                            ? "bg-primary-500"
                                            : "bg-gray-300 dark:bg-gray-600"
                                        }`}
                                        type="button"
                                      />
                                    ))}
                                  </div>
                                )}

                                {/* Image counter */}
                                {router.images.length > 1 && (
                                  <div class="absolute left-2 top-2 rounded bg-black/60 px-2 py-1 text-xs text-white">
                                    {currentImageIndex.value + 1} /{" "}
                                    {router.images.length}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div class="flex h-full flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                                <LuImage class="mx-auto mb-1 h-8 w-8" />
                                <p class="text-xs">No images available</p>
                              </div>
                            )}
                          </div>

                          {/* Key Features */}
                          <div class="rounded-xl bg-gradient-to-br from-primary-50 to-secondary-50 p-6 dark:from-primary-950/50 dark:to-secondary-950/50">
                            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                              Key Features
                            </h3>
                            <div class="grid gap-3">
                              {router.features.slice(0, 4).map((feature) => (
                                <div
                                  key={feature}
                                  class="flex items-center gap-3"
                                >
                                  <div class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/20">
                                    <svg
                                      class="h-3 w-3 text-primary-600 dark:text-primary-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width={2}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                  <span class="text-sm text-gray-700 dark:text-gray-300">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Quick Specs */}
                          <div class="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-6 dark:from-blue-950/50 dark:to-purple-950/50">
                            <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                              Quick Specs
                            </h3>
                            <div class="grid grid-cols-2 gap-4">
                              <div>
                                <div class="text-xs text-gray-600 dark:text-gray-400">
                                  CPU
                                </div>
                                <div class="text-sm font-semibold text-gray-900 dark:text-white">
                                  {router.specs.CPU}
                                </div>
                              </div>
                              <div>
                                <div class="text-xs text-gray-600 dark:text-gray-400">
                                  RAM
                                </div>
                                <div class="text-sm font-semibold text-gray-900 dark:text-white">
                                  {router.specs.RAM}
                                </div>
                              </div>
                              <div>
                                <div class="text-xs text-gray-600 dark:text-gray-400">
                                  Ports
                                </div>
                                <div class="text-sm font-semibold text-gray-900 dark:text-white">
                                  {router.specs.Ports}
                                </div>
                              </div>
                              <div>
                                <div class="text-xs text-gray-600 dark:text-gray-400">
                                  Wi-Fi
                                </div>
                                <div class="text-sm font-semibold text-gray-900 dark:text-white">
                                  {router.specs["Wi-Fi"]}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Special Capabilities */}
                        <div class="h-full rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-6 dark:from-emerald-950/50 dark:to-teal-950/50">
                          <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                            Special Capabilities
                          </h3>
                          <div class="grid gap-4">
                            {/* Starlink Mini Compatibility */}
                            <div class="flex items-center gap-3">
                              <div
                                class={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                  isStarlinkMiniCompatible(router)
                                    ? "bg-gradient-to-br from-orange-400 to-red-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              >
                                <LuSatellite class="h-4 w-4 text-white" />
                              </div>
                              <div class="flex-1">
                                <div class="flex items-center gap-2">
                                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                    Starlink Mini Dish
                                  </span>
                                  {isStarlinkMiniCompatible(router) ? (
                                    <LuCheckCircle class="h-4 w-4 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <LuXCircle class="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                  {isStarlinkMiniCompatible(router)
                                    ? "Perfect for Starlink Mini dish with LTE connectivity"
                                    : "Requires LTE capability for Starlink Mini compatibility"}
                                </p>
                              </div>
                            </div>

                            {/* No Domestic Link Alternative */}
                            <div class="flex items-center gap-3">
                              <div
                                class={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                  isDomesticLinkAlternative(router)
                                    ? "bg-gradient-to-br from-emerald-400 to-green-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              >
                                <LuSignal class="h-4 w-4 text-white" />
                              </div>
                              <div class="flex-1">
                                <div class="flex items-center gap-2">
                                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                    No Domestic Link
                                  </span>
                                  {isDomesticLinkAlternative(router) ? (
                                    <LuCheckCircle class="h-4 w-4 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <LuXCircle class="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                  {isDomesticLinkAlternative(router)
                                    ? "Great for areas without domestic DSL/cable with mobile connectivity"
                                    : "Requires mobile connectivity for areas without domestic links"}
                                </p>
                              </div>
                            </div>

                            {/* Docker Support */}
                            <div class="flex items-center gap-3">
                              <div
                                class={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                  isDockerCapable(router)
                                    ? "bg-gradient-to-br from-indigo-400 to-purple-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              >
                                <LuContainer class="h-4 w-4 text-white" />
                              </div>
                              <div class="flex-1">
                                <div class="flex items-center gap-2">
                                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                    Docker Ready
                                  </span>
                                  {isDockerCapable(router) ? (
                                    <LuCheckCircle class="h-4 w-4 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <LuXCircle class="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                  {isDockerCapable(router)
                                    ? "Sufficient CPU and RAM for running Docker containers and applications"
                                    : "Requires 1GB+ RAM and quad-core CPU for reliable Docker operation"}
                                </p>
                              </div>
                            </div>

                            {/* USB Port */}
                            <div class="flex items-center gap-3">
                              <div
                                class={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                  hasUSBPort(router)
                                    ? "bg-gradient-to-br from-purple-400 to-violet-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              >
                                <LuUsb class="h-4 w-4 text-white" />
                              </div>
                              <div class="flex-1">
                                <div class="flex items-center gap-2">
                                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                    USB Port
                                  </span>
                                  {hasUSBPort(router) ? (
                                    <LuCheckCircle class="h-4 w-4 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <LuXCircle class="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                  {hasUSBPort(router)
                                    ? "USB port available for external storage, 3G/4G modems, or other devices"
                                    : "No USB port available for external devices"}
                                </p>
                              </div>
                            </div>

                            {/* 2.5G Port */}
                            <div class="flex items-center gap-3">
                              <div
                                class={`flex h-8 w-8 items-center justify-center rounded-lg ${
                                  has25GigPort(router)
                                    ? "bg-gradient-to-br from-cyan-400 to-blue-500"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              >
                                <LuNetwork class="h-4 w-4 text-white" />
                              </div>
                              <div class="flex-1">
                                <div class="flex items-center gap-2">
                                  <span class="text-sm font-semibold text-gray-900 dark:text-white">
                                    2.5G Ethernet
                                  </span>
                                  {has25GigPort(router) ? (
                                    <LuCheckCircle class="h-4 w-4 text-green-600 dark:text-green-400" />
                                  ) : (
                                    <LuXCircle class="h-4 w-4 text-gray-400" />
                                  )}
                                </div>
                                <p class="text-xs text-gray-600 dark:text-gray-400">
                                  {has25GigPort(router)
                                    ? "2.5 Gigabit Ethernet port for high-speed wired connections and future-proofing"
                                    : "Standard Gigabit Ethernet ports only"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Specifications Tab */}
                  {activeTab.value === "specs" && (
                    <div class="h-full p-6">
                      <div class="h-full rounded-xl border border-gray-200/50 bg-white dark:border-gray-700/50 dark:bg-gray-800">
                        <div class="p-6">
                          <h3 class="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                            Technical Specifications
                          </h3>
                          <div class="grid gap-4">
                            {Object.entries(router.specs).map(
                              ([key, value]) => (
                                <div
                                  key={key}
                                  class="flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3 dark:bg-gray-900/50"
                                >
                                  <span class="font-medium text-gray-700 dark:text-gray-300">
                                    {key}
                                  </span>
                                  <span class="font-semibold text-gray-900 dark:text-white">
                                    {value}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div class="flex h-full items-center justify-center">
                  <p class="text-gray-500 dark:text-gray-400">
                    No router selected
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Fullscreen Image Overlay */}
        {isImageFullscreen.value &&
          router &&
          router.images &&
          router.images.length > 0 && (
            <div class="fixed inset-0 z-[10000] flex items-center justify-center bg-black/95 backdrop-blur-sm">
              {/* Close button */}
              <button
                class="absolute right-4 top-4 z-[10001] rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/80"
                onClick$={handleFullscreenClose}
                type="button"
                aria-label="Close fullscreen"
              >
                <LuX class="h-5 w-5" />
              </button>

              {/* Navigation Controls */}
              {router.images.length > 1 && (
                <>
                  <button
                    class="absolute left-4 top-1/2 z-[10001] -translate-y-1/2 transform rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/80"
                    onClick$={handlePrevImage}
                    type="button"
                    aria-label="Previous image"
                  >
                    <LuChevronLeft class="h-6 w-6" />
                  </button>
                  <button
                    class="absolute right-4 top-1/2 z-[10001] -translate-y-1/2 transform rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/80"
                    onClick$={handleNextImage}
                    type="button"
                    aria-label="Next image"
                  >
                    <LuChevronRight class="h-6 w-6" />
                  </button>
                </>
              )}

              {/* Fullscreen Image */}
              <div class="relative flex max-h-[95vh] max-w-[95vw] items-center justify-center">
                <img
                  src={router.images[currentImageIndex.value]}
                  alt={router.title}
                  width="1280"
                  height="960"
                  class="max-h-full max-w-full object-contain"
                  loading="lazy"
                />

                {/* Image counter */}
                {router.images.length > 1 && (
                  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-black/60 px-4 py-2 text-white">
                    <span class="text-sm font-medium">
                      {currentImageIndex.value + 1} / {router.images.length}
                    </span>
                  </div>
                )}

                {/* Image indicators */}
                {router.images.length > 1 && (
                  <div class="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform gap-2">
                    {router.images.map((_, index) => (
                      <button
                        key={index}
                        onClick$={() => (currentImageIndex.value = index)}
                        class={`h-3 w-3 rounded-full transition-all ${
                          currentImageIndex.value === index
                            ? "bg-white"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                        type="button"
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Instructions */}
              <div class="absolute bottom-4 right-4 text-sm text-white/70">
                <div class="space-y-1 text-right">
                  <div>ESC to close</div>
                  {router.images.length > 1 && <div>← → to navigate</div>}
                </div>
              </div>
            </div>
          )}
      </div>
    );
  },
);
