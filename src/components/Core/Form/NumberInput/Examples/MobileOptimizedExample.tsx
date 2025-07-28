import { component$, useSignal, useStore, useVisibleTask$, $ } from "@builder.io/qwik";
import { NumberInput } from "../NumberInput";

/**
 * Mobile Optimized Example
 * 
 * Demonstrates mobile-first design patterns for NumberInput with touch-friendly
 * interfaces, responsive behavior, and mobile-specific optimizations.
 */

export default component$(() => {
  const isMobile = useSignal(false);
  const screenWidth = useSignal(1024);
  
  // Mobile-optimized state
  const mobileData = useStore({
    cartQuantity: 1,
    shippingZone: 1,
    tipPercentage: 18,
    productRating: 4.5,
    orderTotal: 299.99,
  });

  // Detect mobile viewport
  useVisibleTask$(({ cleanup }) => {
    const updateScreenSize = () => {
      screenWidth.value = window.innerWidth;
      isMobile.value = window.innerWidth < 768;
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    
    cleanup(() => {
      window.removeEventListener('resize', updateScreenSize);
    });
  });

  // Mobile-specific formatters
  const formatCurrency = $((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  });

  const formatPercentage = $((value: number) => {
    return `${value.toFixed(0)}%`;
  });

  const formatRating = $((value: number) => {
    return `${value.toFixed(1)} ⭐`;
  });

  // Mobile-specific step calculations
  const getMobileStep = (type: string) => {
    if (!isMobile.value) return type === 'currency' ? 0.01 : 1;
    
    // Larger steps for easier mobile interaction
    switch (type) {
      case 'currency': return 0.25; // Quarter increments
      case 'percentage': return 5;  // 5% increments
      case 'rating': return 0.5;    // Half-star increments
      default: return 1;
    }
  };

  // Calculate responsive sizing
  const getResponsiveSize = () => {
    return isMobile.value ? "lg" : "md";
  };

  // Haptic feedback for mobile
  const triggerHapticFeedback = $(() => {
    if ('vibrate' in navigator && isMobile.value) {
      navigator.vibrate(50);
    }
  });

  return (
    <div class="space-y-8 p-4 md:p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Mobile-Optimized NumberInput
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Touch-friendly interfaces with responsive behavior and mobile-specific optimizations.
        </p>
        <div class="mt-2 text-sm text-info-600 dark:text-info-400">
          Current viewport: {screenWidth.value}px {isMobile.value ? "(Mobile)" : "(Desktop)"}
        </div>
      </div>

      {/* Mobile Shopping Cart Example */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4 md:p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Mobile Shopping Cart
        </h3>
        <p class="mb-6 text-sm text-text-secondary dark:text-text-dark-secondary">
          Touch-optimized quantity selector with large tap targets and haptic feedback.
        </p>

        <div class="space-y-6">
          {/* Product Quantity */}
          <div class="flex items-center space-x-4">
            <div class="h-16 w-16 rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary flex items-center justify-center">
              <span class="text-sm text-text-secondary dark:text-text-dark-secondary">IMG</span>
            </div>
            <div class="flex-1">
              <h4 class="font-medium text-text-default dark:text-text-dark-default">
                Wireless Headphones
              </h4>
              <p class="text-sm text-text-secondary dark:text-text-dark-secondary">
                Premium Noise Canceling
              </p>
            </div>
            <div class="w-32">
              <NumberInput
                label="Qty"
                value={mobileData.cartQuantity}
                min={1}
                max={10}
                step={1}
                size={getResponsiveSize()}
                onValueChange$={(value) => {
                  if (value !== undefined) {
                    mobileData.cartQuantity = value;
                    triggerHapticFeedback();
                  }
                }}
                class={[
                  "touch-manipulation",
                  isMobile.value && "mobile:min-h-[56px]" // Extra height for mobile
                ].filter(Boolean).join(" ")}
                stepperDelay={isMobile.value ? 150 : 50} // Slower repeat for mobile
              />
            </div>
          </div>

          {/* Mobile-specific stepper layout */}
          {isMobile.value && (
            <div class="rounded-lg bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4">
              <h5 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
                Quick Quantity Select
              </h5>
              <div class="grid grid-cols-5 gap-2">
                {[1, 2, 3, 5, 10].map((qty) => (
                  <button
                    key={qty}
                    type="button"
                    onClick$={() => {
                      mobileData.cartQuantity = qty;
                      triggerHapticFeedback();
                    }}
                    class={[
                      "h-12 rounded-md border text-sm font-medium transition-colors touch-manipulation",
                      mobileData.cartQuantity === qty
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-border bg-surface-light-DEFAULT text-text-default dark:border-border-dark dark:bg-surface-dark-DEFAULT dark:text-text-dark-default"
                    ]}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Payment Form */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4 md:p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Mobile Payment Form
        </h3>
        <p class="mb-6 text-sm text-text-secondary dark:text-text-dark-secondary">
          Large touch targets and simplified interaction patterns for mobile payments.
        </p>

        <div class="space-y-6">
          {/* Tip Percentage */}
          <div>
            <NumberInput
              label="Tip Percentage"
              value={mobileData.tipPercentage}
              min={0}
              max={30}
              step={getMobileStep('percentage')}
              precision={0}
              size={getResponsiveSize()}
              formatValue$={formatPercentage}
              parseValue$={(value) => parseInt(value.replace('%', '')) || 0}
              onValueChange$={(value) => {
                if (value !== undefined) {
                  mobileData.tipPercentage = value;
                  triggerHapticFeedback();
                }
              }}
              placeholder="18%"
              helperText="Suggested: 18-22%"
              class={[
                "touch-manipulation",
                isMobile.value && "mobile:text-lg" // Larger text on mobile
              ].filter(Boolean).join(" ")}
            />

            {/* Quick tip buttons for mobile */}
            {isMobile.value && (
              <div class="mt-3 grid grid-cols-4 gap-2">
                {[15, 18, 20, 25].map((tip) => (
                  <button
                    key={tip}
                    type="button"
                    onClick$={() => {
                      mobileData.tipPercentage = tip;
                      triggerHapticFeedback();
                    }}
                    class={[
                      "h-10 rounded-md border text-sm font-medium transition-colors touch-manipulation",
                      mobileData.tipPercentage === tip
                        ? "border-primary-500 bg-primary-500 text-white"
                        : "border-border bg-surface-light-DEFAULT text-text-default dark:border-border-dark dark:bg-surface-dark-DEFAULT dark:text-text-dark-default"
                    ]}
                  >
                    {tip}%
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Order Total with Mobile-Optimized Currency Input */}
          <div>
            <NumberInput
              label="Custom Amount"
              value={mobileData.orderTotal}
              min={0}
              max={9999}
              step={getMobileStep('currency')}
              precision={2}
              size={getResponsiveSize()}
              formatValue$={formatCurrency}
              parseValue$={(value) => {
                const cleaned = value.replace(/[^0-9.-]/g, '');
                return parseFloat(cleaned) || 0;
              }}
              onValueChange$={(value) => {
                if (value !== undefined) {
                  mobileData.orderTotal = value;
                  triggerHapticFeedback();
                }
              }}
              placeholder="$0.00"
              helperText="Enter custom payment amount"
              class={[
                "touch-manipulation",
                isMobile.value && "mobile:text-lg mobile:min-h-[60px]"
              ].filter(Boolean).join(" ")}
            />
          </div>
        </div>
      </div>

      {/* Mobile Rating and Review */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4 md:p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Mobile Rating Interface
        </h3>
        <p class="mb-6 text-sm text-text-secondary dark:text-text-dark-secondary">
          Touch-friendly rating input with visual feedback and haptic response.
        </p>

        <div class="space-y-6">
          <NumberInput
            label="Product Rating"
            value={mobileData.productRating}
            min={0}
            max={5}
            step={getMobileStep('rating')}
            precision={1}
            size={getResponsiveSize()}
            formatValue$={formatRating}
            parseValue$={(value) => {
              const cleaned = value.replace(/[⭐]/g, '').trim();
              return parseFloat(cleaned) || 0;
            }}
            onValueChange$={(value) => {
              if (value !== undefined) {
                mobileData.productRating = value;
                triggerHapticFeedback();
              }
            }}
            placeholder="0.0 ⭐"
            helperText="Rate from 0 to 5 stars"
            class={[
              "touch-manipulation",
              isMobile.value && "mobile:text-lg"
            ].filter(Boolean).join(" ")}
          />

          {/* Star rating buttons for mobile */}
          {isMobile.value && (
            <div class="space-y-3">
              <h5 class="text-sm font-medium text-text-default dark:text-text-dark-default">
                Quick Star Rating
              </h5>
              <div class="flex justify-between">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick$={() => {
                      mobileData.productRating = star;
                      triggerHapticFeedback();
                    }}
                    class="touch-manipulation p-2 transition-transform active:scale-110"
                  >
                    <div
                      class={[
                        "text-3xl transition-colors",
                        star <= mobileData.productRating
                          ? "text-warning-500"
                          : "text-surface-light-quaternary dark:text-surface-dark-quaternary"
                      ]}
                    >
                      ⭐
                    </div>
                  </button>
                ))}
              </div>
              <div class="text-center text-sm text-text-secondary dark:text-text-dark-secondary">
                Current rating: {mobileData.productRating} star{mobileData.productRating !== 1 ? 's' : ''}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Responsive Comparison */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-4 md:p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Responsive Size Comparison
        </h3>
        <p class="mb-6 text-sm text-text-secondary dark:text-text-dark-secondary">
          Different sizing strategies for mobile vs desktop viewports.
        </p>

        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Mobile-First Approach
            </h4>
            <div class="space-y-4">
              <NumberInput
                label="Large Touch Target"
                value={10}
                min={1}
                max={20}
                size="lg"
                onValueChange$={triggerHapticFeedback}
                placeholder="Easy to tap"
                helperText="56px minimum height"
                class="mobile:min-h-[56px] touch-manipulation"
              />
              <NumberInput
                label="Quick Increment"
                value={5}
                min={0}
                max={50}
                step={5}
                size="lg"
                onValueChange$={triggerHapticFeedback}
                placeholder="Large steps"
                helperText="5-unit increments"
                class="mobile:min-h-[56px] touch-manipulation"
              />
            </div>
          </div>

          <div>
            <h4 class="mb-3 text-sm font-medium text-text-default dark:text-text-dark-default">
              Desktop Optimized
            </h4>
            <div class="space-y-4">
              <NumberInput
                label="Precise Control"
                value={10.5}
                min={0}
                max={20}
                step={0.1}
                precision={1}
                size="md"
                onValueChange$={() => {}}
                placeholder="Fine control"
                helperText="0.1 increments"
              />
              <NumberInput
                label="Compact Layout"
                value={25}
                min={0}
                max={100}
                step={1}
                size="sm"
                onValueChange$={() => {}}
                placeholder="Space efficient"
                helperText="Standard sizing"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Best Practices */}
      <div class="rounded-lg border border-info-200 dark:border-info-800 bg-info-50 dark:bg-info-950 p-6">
        <h3 class="mb-4 text-lg font-medium text-info-800 dark:text-info-200">
          Mobile Optimization Guidelines
        </h3>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <h4 class="mb-3 text-sm font-medium text-info-800 dark:text-info-200">
              Touch Interface:
            </h4>
            <ul class="space-y-2 text-sm text-info-700 dark:text-info-300">
              <li>• Minimum 44px touch targets (preferably 56px)</li>
              <li>• Add touch-manipulation CSS class</li>
              <li>• Use larger step increments for easier adjustment</li>
              <li>• Implement haptic feedback for stepper interactions</li>
              <li>• Provide alternative quick-select buttons</li>
            </ul>
          </div>
          <div>
            <h4 class="mb-3 text-sm font-medium text-info-800 dark:text-info-200">
              Performance:
            </h4>
            <ul class="space-y-2 text-sm text-info-700 dark:text-info-300">
              <li>• Use slower stepper delays (150ms vs 50ms)</li>
              <li>• Debounce value changes for expensive operations</li>
              <li>• Optimize for virtual keyboard display</li>
              <li>• Handle orientation changes gracefully</li>
              <li>• Test on actual mobile devices</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Code Example */}
      <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Mobile Implementation Example
        </h3>
        <div class="rounded-md bg-gray-900 p-4">
          <pre class="text-sm text-gray-100 overflow-x-auto">
            <code>{`// Mobile-optimized NumberInput configuration
const isMobile = useSignal(window.innerWidth < 768);

const triggerHapticFeedback = $(() => {
  if ('vibrate' in navigator && isMobile.value) {
    navigator.vibrate(50);
  }
});

<NumberInput
  label="Quantity"
  value={quantity.value}
  min={1}
  max={99}
  step={isMobile.value ? 1 : 0.1}  // Larger steps on mobile
  size={isMobile.value ? "lg" : "md"}  // Larger size on mobile
  stepperDelay={isMobile.value ? 150 : 50}  // Slower repeat
  onValueChange$={(value) => {
    quantity.value = value;
    triggerHapticFeedback();  // Haptic feedback
  }}
  class={[
    "touch-manipulation",  // Better touch handling
    isMobile.value && "mobile:min-h-[56px]"  // Minimum touch target
  ]}
  helperText="Use +/- buttons for easy adjustment"
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
});