import { component$, useSignal, $, useTask$ } from '@builder.io/qwik';
import { Slider } from '../';

/**
 * Example demonstrating slider integration with form and other components
 */
export default component$(() => {
  const priceRange = useSignal<[number, number]>([200, 800]);
  const quantity = useSignal(1);
  const discount = useSignal(0);
  const total = useSignal(0);
  
  // Calculate total whenever dependencies change
  useTask$(({ track }) => {
    // Track all relevant values
    const [min, max] = track(() => priceRange.value);
    const qty = track(() => quantity.value);
    const disc = track(() => discount.value);
    
    // Calculate average price from range
    const avgPrice = (min + max) / 2;
    
    // Apply discount
    const discountMultiplier = (100 - disc) / 100;
    
    // Calculate total
    total.value = Math.round(avgPrice * qty * discountMultiplier);
  });

  return (
    <div class="space-y-6 p-4 border border-border dark:border-border-dark rounded-md max-w-xl">
      <h3 class="text-lg font-medium">Product Configuration</h3>
      
      <form
        preventdefault:submit
        onSubmit$={() => {
          alert(`Order submitted: Price Range: $${priceRange.value[0]}-$${priceRange.value[1]}, Quantity: ${quantity.value}, Discount: ${discount.value}%, Total: $${total.value}`);
        }}
        class="space-y-6"
      >
        <div>
          <Slider
            type="range"
            label="Price Range ($)"
            value={priceRange.value}
            onChange$={$((newRange) => {
              priceRange.value = newRange;
            })}
            min={0}
            max={1000}
            step={10}
            showValue={true}
            name="price-range"
          />
        </div>
        
        <div>
          <Slider
            label="Quantity"
            value={quantity.value}
            onChange$={$((newValue) => {
              quantity.value = newValue;
            })}
            min={1}
            max={10}
            step={1}
            showValue={true}
            name="quantity"
          />
        </div>
        
        <div>
          <Slider
            label="Discount (%)"
            value={discount.value}
            onChange$={$((newValue) => {
              discount.value = newValue;
            })}
            min={0}
            max={50}
            step={5}
            showValue={true}
            name="discount"
          />
        </div>
        
        <div class="bg-surface-secondary dark:bg-surface-dark-secondary p-4 rounded-md">
          <div class="flex justify-between items-center">
            <span class="font-medium">Estimated Total:</span>
            <span class="text-xl font-bold">${total.value}</span>
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            class="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
}); 