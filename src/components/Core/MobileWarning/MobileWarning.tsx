import { component$, useSignal, useVisibleTask$, $ } from '@builder.io/qwik';

export const MobileWarning = component$(() => {
  const showWarning = useSignal(false);
  const isChecked = useSignal(false);

  // Check if device is mobile/tablet
  useVisibleTask$(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/.test(userAgent);
      const isTablet = /ipad|android(?!.*mobile)|kindle|silk|tablet/.test(userAgent);
      const isSmallScreen = window.innerWidth < 1024; // lg breakpoint in Tailwind
      
      if ((isMobile || isTablet || isSmallScreen) && !isChecked.value) {
        showWarning.value = true;
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  });

  const handleContinue = $(() => {
    showWarning.value = false;
    isChecked.value = true;
    // Store in localStorage to remember user choice
    localStorage.setItem('mobile-warning-dismissed', 'true');
  });

  const handleClose = $(() => {
    showWarning.value = false;
    isChecked.value = true;
    localStorage.setItem('mobile-warning-dismissed', 'true');
  });

  // Check localStorage on mount
  useVisibleTask$(() => {
    const dismissed = localStorage.getItem('mobile-warning-dismissed');
    if (dismissed === 'true') {
      isChecked.value = true;
    }
  });

  if (!showWarning.value) {
    return null;
  }

  return (
    <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button 
          onClick$={handleClose}
          class="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="p-8">
          {/* Icon */}
          <div class="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-6">
            <svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>

          {/* Title */}
          <h2 class="text-2xl font-bold text-white mb-4">
            Desktop Experience Recommended
          </h2>

          {/* Description */}
          <p class="text-slate-300 mb-6 leading-relaxed">
            This application is optimized for desktop devices. For the best experience, please access NASNET Connect from a computer or laptop.
          </p>

          {/* Additional info */}
          <p class="text-slate-400 text-sm mb-8">
            You can continue on mobile, but some features may not work as expected.
          </p>

          {/* Continue button */}
          <button 
            onClick$={handleContinue}
            class="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Continue Anyway
          </button>
        </div>
      </div>
    </div>
  );
}); 