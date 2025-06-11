import { component$, $, type QRL } from "@builder.io/qwik";
import type { VPNType } from "~/components/Star/StarContext/CommonType";

interface PromoL2TPBannerProps {
  onVPNTypeChange$: QRL<(type: VPNType) => void>;
}

export const PromoL2TPBanner = component$<PromoL2TPBannerProps>(({ onVPNTypeChange$ }) => {
  const handleCTAClick = $(() => {
    onVPNTypeChange$("L2TP");
  });

  return (
    <div class="mb-6 relative overflow-hidden rounded-xl shadow-lg">
      {/* Modern background with gradient and pattern */}
      <div class="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 z-0">
        {/* Subtle geometric patterns */}
        <div class="absolute inset-0 opacity-10">
          <div class="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl opacity-20 -mr-20 -mt-20"></div>
          <div class="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-blue-300 blur-3xl opacity-20 -ml-20 -mb-20"></div>
        </div>
        
        {/* Decorative elements */}
        <div class="absolute top-0 left-0 w-full h-full overflow-hidden">
          <svg class="absolute right-0 top-0 h-24 w-24 md:h-40 md:w-40 text-white opacity-10 transform translate-x-1/3 -translate-y-1/4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13.5 1.5L15 0h7.5L24 1.5V9l-1.5 1.5H15L13.5 9z"></path>
            <path d="M0 15L1.5 13.5H9L10.5 15v7.5L9 24H1.5L0 22.5z"></path>
          </svg>
          <svg class="absolute left-0 bottom-0 h-32 w-32 text-white opacity-10 transform -translate-x-1/3 translate-y-1/4" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <div class="absolute right-1/4 bottom-1/3 h-8 w-8 bg-yellow-400 opacity-25 rounded-full"></div>
          <div class="absolute left-1/3 top-1/4 h-6 w-6 border-2 border-white opacity-20 rounded-full"></div>
          <div class="absolute right-1/3 top-1/2 h-4 w-4 bg-blue-300 opacity-20 rounded-sm transform rotate-45"></div>
        </div>
      </div>
      
      {/* Content container with two-column layout */}
      <div class="relative px-6 py-6 md:py-8 flex flex-col md:flex-row md:items-center md:justify-between z-10 backdrop-blur-sm backdrop-filter">
        {/* Left content */}
        <div class="md:max-w-md lg:max-w-lg">
          {/* Hot Deal Badge */}
          <div class="mb-2">
            <span class="bg-yellow-400 text-black px-3 py-1 rounded-full font-bold text-xs shadow-sm">
              HOT DEAL
            </span>
            <span class="ml-2 text-white text-sm font-medium">Limited Time Offer</span>
          </div>
          
          {/* Main Heading */}
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 tracking-tight">
          FREE Hyper Speed VPN Until February 2026! Powered by Nasnet Connect
          </h2>
          
          {/* Description */}
          <p class="text-blue-50 text-sm md:text-base leading-relaxed">
            Optimized for Starlink & Built for NasNet Connect Users
          </p>
        </div>
        
        {/* Right content - Button */}
        <div class="mt-4 md:mt-0 flex-shrink-0">
          <button
            onClick$={handleCTAClick}
            class="bg-white hover:bg-blue-50 text-indigo-700 font-semibold py-3 px-6 rounded-full 
                 transition-all duration-300 text-base md:text-lg min-w-[200px] shadow-lg
                 hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
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
}); 