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
    <div class="mb-6 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-800 shadow-lg">
      {/* Background patterns */}
      <div class="absolute top-0 right-0 w-64 h-64 opacity-30">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M37.8,-65.3C48.3,-58.6,55.9,-47.8,62.2,-36.1C68.5,-24.5,73.4,-12.2,73.6,0.1C73.8,12.5,69.2,25,61.7,35.3C54.3,45.7,44,53.8,32.5,59.1C21,64.3,8.2,66.6,-5.4,68.2C-19.1,69.8,-38.1,70.6,-53.8,63.4C-69.5,56.2,-81.9,41,-86.5,24.5C-91.1,7.9,-88,
          -10.2,-80.9,-25.1C-73.9,-40,-62.8,-51.8,-49.9,-59.2C-37,-66.6,-22.3,-69.6,-8.5,-68.5C5.3,-67.5,27.3,-71.9,37.8,-65.3Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div class="relative px-6 py-8 md:py-6 flex flex-col md:flex-row items-center justify-between z-10">
        {/* Star icon */}
        <div class="hidden md:block absolute -left-3 top-1/2 transform -translate-y-1/2">
          <div class="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center transform rotate-12 shadow-glow">
            <span class="text-3xl font-bold text-red-600 transform -rotate-12">6</span>
          </div>
        </div>
        
        {/* Content */}
        <div class="text-center md:text-left md:ml-10 mb-4 md:mb-0">
          <div class="inline-block md:hidden mb-2">
            <div class="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center transform rotate-12 shadow-glow mx-auto">
              <span class="text-2xl font-bold text-red-600 transform -rotate-12">6</span>
            </div>
          </div>
          <h3 class="text-xl md:text-2xl font-bold text-white">
            6 Months <span class="text-yellow-300">FREE</span> L2TP VPN!
          </h3>
          <p class="text-blue-100 text-sm md:text-base max-w-xl">
            Secure your connection with our high-speed L2TP VPN. No credit card required, 
            instant setup, and automatic configuration.
          </p>
        </div>
        
        {/* CTA Button */}
        <button
          onClick$={handleCTAClick}
          class="relative overflow-hidden bg-white text-blue-700 px-6 py-3 rounded-full font-bold 
                 transition-all duration-300 transform hover:scale-105 hover:shadow-xl
                 group animate-pulse hover:animate-none"
        >
          <span class="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 
                       group-hover:opacity-20 transition-opacity duration-300"></span>
          <span class="relative flex items-center">
            Get It Now
            <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" 
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>
      </div>
      
      {/* Bottom banner */}
      <div class="bg-indigo-900 text-xs text-center py-1 px-4 text-white font-medium">
        Limited time offer: Auto-configures your OpenWRT router with our secure L2TP service.
      </div>
    </div>
  );
}); 