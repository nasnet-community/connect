import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { NumberInput } from "../NumberInput";

/**
 * Currency Formatting Example
 * 
 * Demonstrates how to implement custom formatting for currency inputs
 * with proper parsing, validation, and international support.
 */

export default component$(() => {
  // State for different currency examples
  const priceUSD = useSignal(299.99);
  const priceEUR = useSignal(249.99);
  const salaryUSD = useSignal(75000);
  const budgetUSD = useSignal(1250.50);

  const formData = useStore({
    productPrice: 0,
    shippingCost: 0,
    tax: 0,
    total: 0,
  });

  // Currency formatters for different locales
  const formatUSD = $((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  });

  const formatEUR = $((value: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  });

  const formatSalary = $((value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  });

  // Currency parsers
  const parseCurrency = $((value: string) => {
    // Remove all non-numeric characters except decimal point and minus
    const cleaned = value.replace(/[^0-9.-]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  });

  // Calculate total
  const calculateTotal = $(() => {
    const subtotal = formData.productPrice + formData.shippingCost;
    const total = subtotal + (subtotal * formData.tax / 100);
    formData.total = Math.round(total * 100) / 100; // Round to 2 decimal places
  });

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="mb-2 text-2xl font-bold text-text-default dark:text-text-dark-default">
          Currency Formatting Examples
        </h2>
        <p class="text-text-secondary dark:text-text-dark-secondary">
          Advanced currency input handling with custom formatting, parsing, and validation.
        </p>
      </div>

      {/* Basic Currency Inputs */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Basic Currency Inputs
          </h3>
          <div class="grid gap-4 md:grid-cols-2">
            <NumberInput
              label="Product Price (USD)"
              value={priceUSD.value}
              min={0}
              max={99999}
              step={0.01}
              precision={2}
              formatValue$={formatUSD}
              parseValue$={parseCurrency}
              onValueChange$={(value) => {
                if (value !== undefined) priceUSD.value = value;
              }}
              placeholder="$0.00"
              helperText="Price in US Dollars"
              size="lg"
            />

            <NumberInput
              label="Product Price (EUR)"
              value={priceEUR.value}
              min={0}
              max={99999}
              step={0.01}
              precision={2}
              formatValue$={formatEUR}
              parseValue$={parseCurrency}
              onValueChange$={(value) => {
                if (value !== undefined) priceEUR.value = value;
              }}
              placeholder="€0,00"
              helperText="Price in Euros"
              size="lg"
            />
          </div>
        </div>

        <div class="rounded-md bg-info-50 dark:bg-info-950 border border-info-200 dark:border-info-800 p-3">
          <p class="text-sm text-info-800 dark:text-info-200">
            <strong>Current Values:</strong> USD: {formatUSD(priceUSD.value)}, EUR: {formatEUR(priceEUR.value)}
          </p>
        </div>
      </div>

      {/* Salary Input (No Decimals) */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Salary Input (Whole Numbers)
          </h3>
          <div class="max-w-md">
            <NumberInput
              label="Annual Salary"
              value={salaryUSD.value}
              min={0}
              max={1000000}
              step={1000}
              precision={0}
              formatValue$={formatSalary}
              parseValue$={parseCurrency}
              onValueChange$={(value) => {
                if (value !== undefined) salaryUSD.value = value;
              }}
              placeholder="$0"
              helperText="Salary without cents"
              size="lg"
            />
          </div>
          <div class="mt-2 text-sm text-text-secondary dark:text-text-dark-secondary">
            Raw value: {salaryUSD.value} • Formatted: {formatSalary(salaryUSD.value)}
          </div>
        </div>
      </div>

      {/* Order Calculator Form */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Order Calculator
          </h3>
          <p class="mb-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            Real-world example with automatic total calculation.
          </p>
        </div>

        <div class="rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
          <div class="grid gap-4 md:grid-cols-2">
            <NumberInput
              label="Product Price"
              value={formData.productPrice}
              min={0}
              max={9999}
              step={0.01}
              precision={2}
              formatValue$={formatUSD}
              parseValue$={parseCurrency}
              onValueChange$={(value) => {
                if (value !== undefined) {
                  formData.productPrice = value;
                  calculateTotal();
                }
              }}
              placeholder="$0.00"
              required={true}
            />

            <NumberInput
              label="Shipping Cost"
              value={formData.shippingCost}
              min={0}
              max={999}
              step={0.01}
              precision={2}
              formatValue$={formatUSD}
              parseValue$={parseCurrency}
              onValueChange$={(value) => {
                if (value !== undefined) {
                  formData.shippingCost = value;
                  calculateTotal();
                }
              }}
              placeholder="$0.00"
            />

            <NumberInput
              label="Tax Rate (%)"
              value={formData.tax}
              min={0}
              max={50}
              step={0.1}
              precision={1}
              formatValue$={(value) => `${value.toFixed(1)}%`}
              parseValue$={(value) => parseFloat(value.replace('%', '')) || 0}
              onValueChange$={(value) => {
                if (value !== undefined) {
                  formData.tax = value;
                  calculateTotal();
                }
              }}
              placeholder="0.0%"
              helperText="Enter tax percentage"
            />

            <div class="flex items-end">
              <div class="rounded-md bg-surface-light-tertiary dark:bg-surface-dark-tertiary p-4 w-full">
                <label class="block text-sm font-medium text-text-default dark:text-text-dark-default mb-1">
                  Total Amount
                </label>
                <div class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatUSD(formData.total)}
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4 text-sm text-text-secondary dark:text-text-dark-secondary">
            <p>Calculation: ({formatUSD(formData.productPrice)} + {formatUSD(formData.shippingCost)}) × (1 + {formData.tax}%) = {formatUSD(formData.total)}</p>
          </div>
        </div>
      </div>

      {/* Budget Tracker */}
      <div class="space-y-4">
        <div>
          <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
            Budget Input with Validation
          </h3>
        </div>

        <div class="max-w-md">
          <NumberInput
            label="Monthly Budget"
            value={budgetUSD.value}
            min={0}
            max={50000}
            step={25}
            precision={2}
            formatValue$={formatUSD}
            parseValue$={parseCurrency}
            onValueChange$={(value) => {
              if (value !== undefined) budgetUSD.value = value;
            }}
            placeholder="$0.00"
            helperText="Recommended: $1,000 - $5,000"
            error={
              budgetUSD.value > 0 && budgetUSD.value < 100 
                ? "Budget seems too low for most households" 
                : budgetUSD.value > 10000 
                  ? "Consider breaking down into categories" 
                  : ""
            }
            size="lg"
          />
        </div>

        {budgetUSD.value > 0 && (
          <div class="rounded-md bg-success-50 dark:bg-success-950 border border-success-200 dark:border-success-800 p-3">
            <div class="text-sm text-success-800 dark:text-success-200">
              <strong>Budget Analysis:</strong>
              <ul class="mt-1 space-y-1">
                <li>• Weekly allowance: {formatUSD(budgetUSD.value / 4.33)}</li>
                <li>• Daily allowance: {formatUSD(budgetUSD.value / 30)}</li>
                <li>• Annual projection: {formatUSD(budgetUSD.value * 12)}</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Implementation Guide */}
      <div class="mt-8 rounded-lg border border-border dark:border-border-dark bg-surface-light-secondary dark:bg-surface-dark-secondary p-6">
        <h3 class="mb-4 text-lg font-medium text-text-default dark:text-text-dark-default">
          Implementation Guide
        </h3>
        <div class="space-y-4 text-sm text-text-secondary dark:text-text-dark-secondary">
          <div>
            <h4 class="font-medium text-text-default dark:text-text-dark-default mb-2">
              Currency Formatting Best Practices:
            </h4>
            <ul class="space-y-1 ml-4">
              <li>• Use Intl.NumberFormat for locale-specific formatting</li>
              <li>• Set appropriate min/max values based on use case</li>
              <li>• Use step=0.01 for most currency inputs</li>
              <li>• Consider precision=0 for salary/large amount inputs</li>
              <li>• Implement robust parsing to handle various input formats</li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-medium text-text-default dark:text-text-dark-default mb-2">
              Mobile Considerations:
            </h4>
            <ul class="space-y-1 ml-4">
              <li>• Use size="lg" for better touch targets</li>
              <li>• Show numeric keyboard on mobile devices</li>
              <li>• Provide clear visual feedback for validation</li>
              <li>• Consider haptic feedback for stepper interactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});