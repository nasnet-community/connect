import { component$, $, type QRL } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import type { VPNType } from "~/components/Star/StarContext/CommonType";

interface PromoL2TPBannerProps {
  onVPNTypeChange$: QRL<(type: VPNType) => void>;
}

export const PromoL2TPBanner = component$<PromoL2TPBannerProps>(
  ({ onVPNTypeChange$ }) => {
    const handleCTAClick = $(() => {
      // Track promo banner click
      track("promo_l2tp_banner_clicked", {
        action: "claim_free_vpn",
        vpn_type: "L2TP",
        step: "wan_config",
      });

      onVPNTypeChange$("L2TP");
    });

    return (
      <div class="relative mb-6 overflow-hidden rounded-xl shadow-lg">
        {/* Modern background with gradient and pattern */}
        <div class="absolute inset-0 z-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
          {/* Subtle geometric patterns */}
          <div class="absolute inset-0 opacity-10">
            <div class="absolute right-0 top-0 -mr-20 -mt-20 h-96 w-96 rounded-full bg-white opacity-20 blur-3xl"></div>
            <div class="absolute bottom-0 left-0 -mb-20 -ml-20 h-80 w-80 rounded-full bg-blue-300 opacity-20 blur-3xl"></div>
          </div>

          {/* Decorative elements */}
          <div class="absolute left-0 top-0 h-full w-full overflow-hidden">
            <svg
              class="absolute right-0 top-0 h-24 w-24 -translate-y-1/4 translate-x-1/3 transform text-white opacity-10 md:h-40 md:w-40"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M13.5 1.5L15 0h7.5L24 1.5V9l-1.5 1.5H15L13.5 9z"></path>
              <path d="M0 15L1.5 13.5H9L10.5 15v7.5L9 24H1.5L0 22.5z"></path>
            </svg>
            <svg
              class="absolute bottom-0 left-0 h-32 w-32 -translate-x-1/3 translate-y-1/4 transform text-white opacity-10"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <div class="absolute bottom-1/3 right-1/4 h-8 w-8 rounded-full bg-yellow-400 opacity-25"></div>
            <div class="absolute left-1/3 top-1/4 h-6 w-6 rounded-full border-2 border-white opacity-20"></div>
            <div class="absolute right-1/3 top-1/2 h-4 w-4 rotate-45 transform rounded-sm bg-blue-300 opacity-20"></div>
          </div>
        </div>

        {/* Content container with two-column layout */}
        <div class="relative z-10 flex flex-col px-6 py-6 backdrop-blur-sm backdrop-filter md:flex-row md:items-center md:justify-between md:py-8">
          {/* Left content */}
          <div class="md:max-w-md lg:max-w-lg">
            {/* Hot Deal Badge */}
            <div class="mb-2">
              <span class="rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow-sm">
                HOT DEAL
              </span>
              <span class="ml-2 text-sm font-medium text-white">
                Limited Time Offer
              </span>
            </div>

            {/* Main Heading */}
            <h2 class="mb-2 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
              FREE Hyper Speed VPN Until February 2026! Powered by Nasnet
              Connect
            </h2>

            {/* Description */}
            <p class="text-sm leading-relaxed text-blue-50 md:text-base">
              Optimized for Starlink & Built for NasNet Connect Users
            </p>
          </div>

          {/* Right content - Button */}
          <div class="mt-4 flex-shrink-0 md:mt-0">
            <button
              onClick$={handleCTAClick}
              class="min-w-[200px] transform rounded-full bg-white px-6 py-3 text-base 
                 font-semibold text-indigo-700 shadow-lg transition-all duration-300 hover:-translate-y-1
                 hover:scale-105 hover:bg-blue-50 hover:shadow-xl md:text-lg"
            >
              Claim Your Free VPN
            </button>
          </div>
        </div>

        {/* Modern bottom strip */}
        {/* <div class="relative bg-black bg-opacity-30 backdrop-blur-md py-1.5 px-4 text-blue-100 text-xs text-center font-medium z-10">
        Premium security features included • No credit card required • One-click setup
      </div> */}
      </div>
    );
  },
);
