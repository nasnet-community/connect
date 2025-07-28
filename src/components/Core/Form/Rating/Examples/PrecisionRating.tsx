import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { Rating } from "../Rating";

/**
 * PrecisionRating Example
 * 
 * Demonstrates different precision modes and advanced rating interactions:
 * - Half-star precision (0.5)
 * - Full-star precision (1.0)
 * - Quarter-star precision simulation
 * - Decimal precision display
 * - Advanced hover and selection behaviors
 * - Precision-based validation and feedback
 */
export const PrecisionRatingExample = component$(() => {
  const halfStarRating = useSignal(3.5);
  const fullStarRating = useSignal(4);
  const quarterStarRating = useSignal(3.25);
  const decimalRating = useSignal(4.2);
  const preciseRating = useSignal(0);

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Precision Rating Examples</h2>
        <p class="text-gray-600">
          Explore different precision modes and advanced rating interactions 
          for fine-grained user feedback.
        </p>
      </div>

      {/* Basic Precision Comparison */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Precision Mode Comparison</h3>
        <p class="text-sm text-gray-600">
          Compare how different precision settings affect user interaction and display.
        </p>
        
        <div class="grid gap-6 lg:grid-cols-2">
          {/* Full Star Precision */}
          <div class="space-y-3">
            <h4 class="font-medium">Full Star Precision (1.0)</h4>
            <Rating
              value={fullStarRating.value}
              precision={1}
              onValueChange$={(value) => {
                fullStarRating.value = value || 0;
              }}
              label="Rate with full stars only"
              size="lg"
              showValue
              helperText="Click anywhere on a star to select it"
            />
            <div class="text-sm text-gray-600">
              <strong>Use case:</strong> Simple ratings where precision isn't critical
            </div>
          </div>

          {/* Half Star Precision */}
          <div class="space-y-3">
            <h4 class="font-medium">Half Star Precision (0.5)</h4>
            <Rating
              value={halfStarRating.value}
              precision={0.5}
              onValueChange$={(value) => {
                halfStarRating.value = value || 0;
              }}
              label="Rate with half stars"
              size="lg"
              showValue
              helperText="Click left/right half of star for precise selection"
            />
            <div class="text-sm text-gray-600">
              <strong>Use case:</strong> Product reviews, detailed feedback systems
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Precision Demo */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Advanced Precision Controls</h3>
        <p class="text-sm text-gray-600">
          Interactive demo showing different precision behaviors and feedback.
        </p>
        
        <AdvancedPrecisionDemo />
      </div>

      {/* Quarter Star Simulation */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Quarter Star Precision Simulation</h3>
        <p class="text-sm text-gray-600">
          Simulating quarter-star precision using custom logic and visual feedback.
        </p>
        
        <QuarterStarDemo value={quarterStarRating} />
      </div>

      {/* Decimal Rating Display */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Decimal Rating Display</h3>
        <p class="text-sm text-gray-600">
          Showing how to display and work with precise decimal ratings.
        </p>
        
        <div class="grid gap-6 lg:grid-cols-2">
          <div class="space-y-3">
            <h4 class="font-medium">User Rating (Half-Star Input)</h4>
            <Rating
              value={decimalRating.value}
              precision={0.5}
              onValueChange$={(value) => {
                decimalRating.value = value || 0;
              }}
              label="Your rating"
              size="lg"
              showValue
            />
          </div>
          
          <div class="space-y-3">
            <h4 class="font-medium">Average Rating (Decimal Display)</h4>
            <DecimalRatingDisplay 
              value={4.267} 
              totalRatings={1247}
              label="Community average"
            />
          </div>
        </div>
      </div>

      {/* Precision-Based Validation */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Precision-Based Validation</h3>
        <p class="text-sm text-gray-600">
          Validation and feedback that adapts to the selected precision level.
        </p>
        
        <PrecisionValidationDemo value={preciseRating} />
      </div>

      {/* Hover Behavior Analysis */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Hover Behavior Analysis</h3>
        <p class="text-sm text-gray-600">
          Detailed analysis of hover interactions for different precision modes.
        </p>
        
        <HoverBehaviorDemo />
      </div>

      {/* Performance Considerations */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Performance & UX Considerations</h3>
        <PerformanceDemo />
      </div>

      {/* Best Practices Guide */}
      <div class="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h3 class="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-200">
          Precision Best Practices
        </h3>
        <div class="space-y-3 text-sm text-blue-700 dark:text-blue-300">
          <div>
            <strong>Full Stars (1.0):</strong> Use for simple, quick ratings where 
            precision isn't important (e.g., quick polls, basic satisfaction).
          </div>
          <div>
            <strong>Half Stars (0.5):</strong> Ideal for detailed reviews, product 
            ratings, or when users need more nuanced expression.
          </div>
          <div>
            <strong>Touch vs Mouse:</strong> Consider reducing precision on touch 
            devices where precise selection is more difficult.
          </div>
          <div>
            <strong>Visual Feedback:</strong> Always provide clear visual feedback 
            for the current hover/selection state, especially with higher precision.
          </div>
          <div>
            <strong>Display Format:</strong> Match display precision to input precision 
            - don't show decimal places users can't input.
          </div>
        </div>
      </div>

      {/* Interactive Precision Tester */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive Precision Tester</h3>
        <PrecisionTester />
      </div>
    </div>
  );
});

/* ===============================
   PRECISION DEMO COMPONENTS
   =============================== */

/**
 * Advanced Precision Demo Component
 * Interactive controls for testing different precision behaviors
 */
const AdvancedPrecisionDemo = component$(() => {
  const config = useStore({
    value: 3.5,
    precision: 0.5 as 0.5 | 1,
    showHoverFeedback: true,
    showClickFeedback: true,
    allowClear: true,
  });
  
  const hoverValue = useSignal<number | null>(null);
  const lastClickInfo = useSignal<string>("");

  const handleValueChange$ = $((value: number | null) => {
    config.value = value || 0;
    lastClickInfo.value = `Selected: ${value || 0} stars at ${new Date().toLocaleTimeString()}`;
  });

  const handleHoverChange$ = $((value: number | null) => {
    hoverValue.value = value;
  });

  return (
    <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
      <div class="grid gap-6 lg:grid-cols-2">
        {/* Controls */}
        <div class="space-y-4">
          <h4 class="font-medium">Configuration</h4>
          
          <div>
            <label class="mb-2 block text-sm font-medium">Precision</label>
            <div class="flex gap-2">
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="precision"
                  value="1"
                  checked={config.precision === 1}
                  onChange$={() => { config.precision = 1; }}
                />
                Full Stars (1.0)
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="precision"
                  value="0.5"
                  checked={config.precision === 0.5}
                  onChange$={() => { config.precision = 0.5; }}
                />
                Half Stars (0.5)
              </label>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">
              Current Value: {config.value}
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step={config.precision}
              value={config.value}
              onInput$={(e) => {
                config.value = parseFloat((e.target as HTMLInputElement).value);
              }}
              class="w-full"
            />
          </div>

          <div class="space-y-2">
            <label class="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={config.allowClear}
                onChange$={(e) => {
                  config.allowClear = (e.target as HTMLInputElement).checked;
                }}
              />
              Allow Clear
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={config.showHoverFeedback}
                onChange$={(e) => {
                  config.showHoverFeedback = (e.target as HTMLInputElement).checked;
                }}
              />
              Show Hover Feedback
            </label>
            <label class="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={config.showClickFeedback}
                onChange$={(e) => {
                  config.showClickFeedback = (e.target as HTMLInputElement).checked;
                }}
              />
              Show Click Feedback
            </label>
          </div>
        </div>

        {/* Rating Display */}
        <div class="space-y-4">
          <h4 class="font-medium">Interactive Rating</h4>
          
          <Rating
            value={config.value}
            precision={config.precision}
            onValueChange$={handleValueChange$}
            onHoverChange$={handleHoverChange$}
            allowClear={config.allowClear}
            label="Test precision rating"
            size="lg"
            showValue
          />

          {/* Feedback Display */}
          {config.showHoverFeedback && (
            <div class="text-sm text-gray-600">
              Hover Value: {hoverValue.value !== null ? hoverValue.value : "None"}
            </div>
          )}
          
          {config.showClickFeedback && lastClickInfo.value && (
            <div class="text-sm text-green-600">
              {lastClickInfo.value}
            </div>
          )}

          {/* Precision Info */}
          <div class="rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
            <div><strong>Precision:</strong> {config.precision}</div>
            <div><strong>Possible Values:</strong> {
              Array.from({ length: Math.floor(5 / config.precision) + 1 }, (_, i) => i * config.precision)
                .map(v => v.toFixed(config.precision === 0.5 ? 1 : 0))
                .join(", ")
            }</div>
            <div><strong>Current:</strong> {config.value.toFixed(config.precision === 0.5 ? 1 : 0)}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Quarter Star Demo Component
 * Simulates quarter-star precision using custom logic
 */
const QuarterStarDemo = component$<{ value: any }>(({ value }) => {
  const quarterValue = useSignal(3.25);
  const hoverQuarterValue = useSignal<number | null>(null);

  // Simulate quarter-star selection
  const handleQuarterClick$ = $(async (starIndex: number, quarterPosition: number) => {
    const baseValue = starIndex;
    const quarterIncrement = quarterPosition * 0.25; // 0, 0.25, 0.5, 0.75
    quarterValue.value = baseValue + quarterIncrement;
    value.value = quarterValue.value;
  });

  const getQuarterFill = (starIndex: number, currentValue: number): number => {
    const starValue = starIndex + 1;
    if (currentValue >= starValue) return 1; // Fully filled
    if (currentValue < starIndex) return 0; // Empty
    
    // Partially filled
    return (currentValue - starIndex);
  };

  return (
    <div class="space-y-4">
      <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        <h4 class="mb-4 font-medium">Quarter-Star Rating Simulation</h4>
        
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            {Array.from({ length: 5 }, (_, starIndex) => {
              const fillAmount = getQuarterFill(starIndex, quarterValue.value);
              const hoverFillAmount = hoverQuarterValue.value !== null 
                ? getQuarterFill(starIndex, hoverQuarterValue.value)
                : fillAmount;
              
              return (
                <div 
                  key={starIndex}
                  class="relative text-3xl cursor-pointer transition-all duration-150 hover:scale-110"
                  onMouseLeave$={() => { hoverQuarterValue.value = null; }}
                >
                  {/* Four clickable quarters */}
                  {Array.from({ length: 4 }, (_, quarterIndex) => (
                    <div
                      key={quarterIndex}
                      class="absolute inset-0"
                      style={`
                        left: ${quarterIndex * 25}%;
                        width: 25%;
                        z-index: 10;
                      `}
                      onMouseEnter$={() => {
                        hoverQuarterValue.value = starIndex + (quarterIndex + 1) * 0.25;
                      }}
                      onClick$={() => handleQuarterClick$(starIndex, quarterIndex + 1)}
                    />
                  ))}
                  
                  {/* Visual star with gradient fill */}
                  <svg viewBox="0 0 24 24" class="h-8 w-8">
                    <defs>
                      <linearGradient id={`quarter-gradient-${starIndex}`}>
                        <stop 
                          offset={`${Math.min(hoverFillAmount * 100, 100)}%`} 
                          stop-color="currentColor" 
                        />
                        <stop 
                          offset={`${Math.min(hoverFillAmount * 100, 100)}%`} 
                          stop-color="transparent" 
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                      fill={`url(#quarter-gradient-${starIndex})`}
                      stroke="currentColor"
                      stroke-width="1"
                      class="text-yellow-500"
                    />
                  </svg>
                </div>
              );
            })}
            
            <span class="ml-4 text-lg font-mono">
              {quarterValue.value.toFixed(2)}/5.00
            </span>
          </div>
          
          <div class="text-sm text-gray-600">
            Click on different parts of each star for quarter-precision selection.
            Current hover: {hoverQuarterValue.value?.toFixed(2) || "None"}
          </div>
          
          <div class="grid grid-cols-4 gap-1 text-xs text-center">
            <div class="bg-yellow-100 p-1 dark:bg-yellow-900/30">25%</div>
            <div class="bg-yellow-200 p-1 dark:bg-yellow-800/30">50%</div>
            <div class="bg-yellow-300 p-1 dark:bg-yellow-700/30">75%</div>
            <div class="bg-yellow-400 p-1 dark:bg-yellow-600/30">100%</div>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Decimal Rating Display Component
 * Shows precise decimal ratings with visual representation
 */
const DecimalRatingDisplay = component$<{
  value: number;
  totalRatings: number;
  label: string;
}>(({ value, totalRatings, label }) => {
  // Calculate star fills for precise decimal display
  const getStarFillPercentage = (starIndex: number, rating: number): number => {
    const starStart = starIndex;
    const starEnd = starIndex + 1;
    
    if (rating >= starEnd) return 100;
    if (rating <= starStart) return 0;
    
    return ((rating - starStart) / (starEnd - starStart)) * 100;
  };

  return (
    <div class="space-y-3">
      <label class="block text-sm font-medium">{label}</label>
      
      <div class="flex items-center gap-2">
        {Array.from({ length: 5 }, (_, starIndex) => {
          const fillPercentage = getStarFillPercentage(starIndex, value);
          
          return (
            <div key={starIndex} class="relative text-2xl">
              <svg viewBox="0 0 24 24" class="h-6 w-6">
                <defs>
                  <linearGradient id={`decimal-gradient-${starIndex}`}>
                    <stop 
                      offset={`${fillPercentage}%`} 
                      stop-color="currentColor" 
                    />
                    <stop 
                      offset={`${fillPercentage}%`} 
                      stop-color="transparent" 
                    />
                  </linearGradient>
                </defs>
                <path
                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                  fill={`url(#decimal-gradient-${starIndex})`}
                  stroke="currentColor"
                  stroke-width="1"
                  class="text-yellow-500"
                />
              </svg>
            </div>
          );
        })}
        
        <div class="ml-2 text-sm">
          <span class="font-semibold">{value.toFixed(2)}</span>
          <span class="text-gray-600"> out of 5</span>
        </div>
      </div>
      
      <div class="text-xs text-gray-500">
        Based on {totalRatings.toLocaleString()} ratings
      </div>
      
      {/* Precision breakdown */}
      <div class="text-xs text-gray-600">
        Precise value: {value} • Rounded: {Math.round(value * 2) / 2} (half-star) • {Math.round(value)} (full-star)
      </div>
    </div>
  );
});

/**
 * Precision Validation Demo Component
 * Shows validation that adapts to precision level
 */
const PrecisionValidationDemo = component$<{ value: any }>(({ value }) => {
  const rating = useSignal(0);
  const precision = useSignal<0.5 | 1>(0.5);
  const validationMode = useSignal<"strict" | "flexible">("flexible");

  const getValidationMessage = (): string | undefined => {
    if (rating.value === 0) return "Please provide a rating";
    
    if (validationMode.value === "strict") {
      if (precision.value === 0.5 && rating.value < 2.5) {
        return "Rating must be at least 2.5 stars for submission";
      }
      if (precision.value === 1 && rating.value < 3) {
        return "Rating must be at least 3 stars for submission";
      }
    }
    
    return undefined;
  };

  const getSuccessMessage = (): string | undefined => {
    if (rating.value >= 4) return "Thank you for the positive feedback!";
    if (rating.value >= 3) return "Thanks for your honest rating";
    return undefined;
  };

  const getWarningMessage = (): string | undefined => {
    if (rating.value > 0 && rating.value < 2) {
      return "We're sorry about your experience. Would you like to provide feedback?";
    }
    return undefined;
  };

  return (
    <div class="space-y-4">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="space-y-4">
          <h4 class="font-medium">Validation Configuration</h4>
          
          <div>
            <label class="mb-2 block text-sm font-medium">Precision Mode</label>
            <div class="flex gap-2">
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="val-precision"
                  checked={precision.value === 1}
                  onChange$={() => { 
                    precision.value = 1;
                    rating.value = Math.round(rating.value);
                  }}
                />
                Full Stars
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="val-precision"
                  checked={precision.value === 0.5}
                  onChange$={() => { precision.value = 0.5; }}
                />
                Half Stars
              </label>
            </div>
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium">Validation Mode</label>
            <div class="flex gap-2">
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="val-mode"
                  checked={validationMode.value === "flexible"}
                  onChange$={() => { validationMode.value = "flexible"; }}
                />
                Flexible
              </label>
              <label class="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="val-mode"
                  checked={validationMode.value === "strict"}
                  onChange$={() => { validationMode.value = "strict"; }}
                />
                Strict
              </label>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <h4 class="font-medium">Validated Rating</h4>
          
          <Rating
            value={rating.value}
            precision={precision.value}
            onValueChange$={(val) => {
              rating.value = val || 0;
              value.value = val || 0;
            }}
            label="Rate our service"
            required
            error={getValidationMessage()}
            successMessage={getSuccessMessage()}
            warningMessage={getWarningMessage()}
            size="lg"
            showValue
          />

          <div class="text-sm">
            <div><strong>Current:</strong> {rating.value}/{precision.value === 0.5 ? "5.0" : "5"}</div>
            <div><strong>Valid:</strong> {getValidationMessage() ? "❌ No" : "✅ Yes"}</div>
            <div><strong>Precision:</strong> {precision.value} increments</div>
          </div>
        </div>
      </div>
    </div>
  );
});

/**
 * Hover Behavior Demo Component
 * Analyzes hover interactions for different precision modes
 */
const HoverBehaviorDemo = component$(() => {
  const hoverLog = useSignal<string[]>([]);
  const currentPrecision = useSignal<0.5 | 1>(0.5);
  
  const logHover$ = $((value: number | null) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `${timestamp}: Hover ${value !== null ? value : "cleared"}`;
    hoverLog.value = [logEntry, ...hoverLog.value.slice(0, 9)]; // Keep last 10 entries
  });

  return (
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-4">
        <h4 class="font-medium">Hover Test Rating</h4>
        
        <div class="flex gap-4">
          <label class="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="hover-precision"
              checked={currentPrecision.value === 1}
              onChange$={() => { 
                currentPrecision.value = 1;
                hoverLog.value = []; // Clear log when switching
              }}
            />
            Full Stars
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="hover-precision"
              checked={currentPrecision.value === 0.5}
              onChange$={() => { 
                currentPrecision.value = 0.5;
                hoverLog.value = []; // Clear log when switching
              }}
            />
            Half Stars
          </label>
        </div>
        
        <Rating
          value={0}
          precision={currentPrecision.value}
          onHoverChange$={logHover$}
          label={`Hover test (${currentPrecision.value} precision)`}
          size="lg"
          helperText="Move your mouse over the stars to see hover behavior"
        />
      </div>

      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="font-medium">Hover Log</h4>
          <button
            onClick$={() => { hoverLog.value = []; }}
            class="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear Log
          </button>
        </div>
        
        <div class="max-h-48 overflow-y-auto rounded border border-gray-200 bg-gray-50 p-3 text-xs font-mono dark:border-gray-700 dark:bg-gray-800">
          {hoverLog.value.length === 0 ? (
            <div class="text-gray-500">Hover over the stars to see interaction log...</div>
          ) : (
            hoverLog.value.map((entry, index) => (
              <div key={index} class="py-1">{entry}</div>
            ))
          )}
        </div>
        
        <div class="text-xs text-gray-600">
          <strong>Analysis:</strong> Half-star precision shows more granular hover events
          as the mouse moves across star halves, while full-star precision shows
          fewer, more discrete hover states.
        </div>
      </div>
    </div>
  );
});

/**
 * Performance Demo Component
 * Shows performance considerations for different precision modes
 */
const PerformanceDemo = component$(() => {
  const renderCount = useSignal(0);
  const interactionCount = useSignal(0);
  
  // eslint-disable-next-line qwik/no-use-visible-task
  // useVisibleTask$(() => {
  //   renderCount.value++;
  // });

  return (
    <div class="space-y-4">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 font-medium">Performance Metrics</h4>
          <div class="space-y-2 text-sm">
            <div>Render Count: <span class="font-mono">{renderCount.value}</span></div>
            <div>Interactions: <span class="font-mono">{interactionCount.value}</span></div>
            <div>Precision Impact: <span class="text-green-600">Minimal</span></div>
          </div>
        </div>

        <div class="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <h4 class="mb-3 font-medium">UX Considerations</h4>
          <div class="space-y-2 text-sm">
            <div>🎯 <strong>Precision vs Usability:</strong> Higher precision requires more careful interaction</div>
            <div>📱 <strong>Mobile:</strong> Consider reducing precision on touch devices</div>
            <div>⚡ <strong>Performance:</strong> Both modes have similar performance characteristics</div>
          </div>
        </div>
      </div>
      
      <Rating
        value={3}
        precision={0.5}
        onValueChange$={() => { interactionCount.value++; }}
        onHoverChange$={() => { interactionCount.value++; }}
        label="Performance test rating"
        helperText="Interact to increase counter"
      />
    </div>
  );
});

/**
 * Interactive Precision Tester Component
 * Comprehensive testing tool for precision modes
 */
const PrecisionTester = component$(() => {
  const testResults = useStore<Record<string, any>>({});
  const currentTest = useSignal("precision-comparison");
  
  const tests = {
    "precision-comparison": "Precision Mode Comparison",
    "touch-simulation": "Touch Device Simulation", 
    "accessibility-test": "Accessibility Testing",
    "performance-test": "Performance Testing",
  };

  return (
    <div class="space-y-4">
      <div class="flex flex-wrap gap-2">
        {Object.entries(tests).map(([key, name]) => (
          <button
            key={key}
            onClick$={() => { currentTest.value = key; }}
            class={`rounded px-3 py-1 text-sm transition-colors ${
              currentTest.value === key
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      
      <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
        {currentTest.value === "precision-comparison" && (
          <PrecisionComparisonTest results={testResults} />
        )}
        {currentTest.value === "touch-simulation" && (
          <TouchSimulationTest results={testResults} />
        )}
        {currentTest.value === "accessibility-test" && (
          <AccessibilityTest results={testResults} />
        )}
        {currentTest.value === "performance-test" && (
          <PerformanceTest results={testResults} />
        )}
      </div>
    </div>
  );
});

// Test components for the precision tester
const PrecisionComparisonTest = component$<{ results: any }>(({ results: _results }) => {
  const fullStarTime = useSignal<number | null>(null);
  const halfStarTime = useSignal<number | null>(null);
  
  return (
    <div class="space-y-4">
      <h4 class="font-medium">Precision Mode Speed Test</h4>
      <p class="text-sm text-gray-600">
        Rate each system as quickly as possible to compare interaction speed.
      </p>
      
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-2">
          <h5 class="text-sm font-medium">Full Star Mode</h5>
          <Rating
            value={0}
            precision={1}
            onValueChange$={() => {
              if (fullStarTime.value === null) {
                fullStarTime.value = Date.now();
              }
            }}
            label="Rate quickly (full stars)"
            size="md"
          />
          {fullStarTime.value && (
            <div class="text-xs text-green-600">
              Completed in {((Date.now() - fullStarTime.value) / 1000).toFixed(1)}s
            </div>
          )}
        </div>
        
        <div class="space-y-2">
          <h5 class="text-sm font-medium">Half Star Mode</h5>
          <Rating
            value={0}
            precision={0.5}
            onValueChange$={() => {
              if (halfStarTime.value === null) {
                halfStarTime.value = Date.now();
              }
            }}
            label="Rate quickly (half stars)"
            size="md"
          />
          {halfStarTime.value && (
            <div class="text-xs text-green-600">
              Completed in {((Date.now() - halfStarTime.value) / 1000).toFixed(1)}s
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

const TouchSimulationTest = component$<{ results: any }>(({ results: _results }) => {
  return (
    <div class="space-y-4">
      <h4 class="font-medium">Touch Device Simulation</h4>
      <p class="text-sm text-gray-600">
        Testing how precision modes work on simulated touch devices.
      </p>
      
      <div class="space-y-4">
        <div class="touch-simulation rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h5 class="mb-2 text-sm font-medium">Simulated Mobile (larger targets)</h5>
          <Rating
            value={0}
            precision={1}
            label="Mobile-optimized rating"
            size="lg"
            class="text-4xl"
          />
        </div>
        
        <div class="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
          <h5 class="mb-2 text-sm font-medium">Simulated Tablet (medium targets)</h5>
          <Rating
            value={0}
            precision={0.5}
            label="Tablet-optimized rating"
            size="md"
            class="text-2xl"
          />
        </div>
      </div>
    </div>
  );
});

const AccessibilityTest = component$<{ results: any }>(({ results: _results }) => {
  return (
    <div class="space-y-4">
      <h4 class="font-medium">Accessibility Testing</h4>
      <p class="text-sm text-gray-600">
        Test keyboard navigation and screen reader compatibility.
      </p>
      
      <div class="space-y-4">
        <Rating
          value={0}
          precision={0.5}
          label="Keyboard navigation test"
          helperText="Use arrow keys, numbers 0-5, Home/End, Delete to test"
          size="lg"
        />
        
        <div class="text-xs text-gray-600">
          <div><strong>Keyboard Shortcuts:</strong></div>
          <div>• Arrow keys: Navigate between values</div>
          <div>• Number keys (0-5): Jump to specific rating</div>
          <div>• Home/End: Jump to first/last rating</div>
          <div>• Delete/Backspace: Clear rating</div>
        </div>
      </div>
    </div>
  );
});

const PerformanceTest = component$<{ results: any }>(({ results: _results }) => {
  const interactions = useSignal(0);
  
  return (
    <div class="space-y-4">
      <h4 class="font-medium">Performance Testing</h4>
      <p class="text-sm text-gray-600">
        Measure interaction performance with rapid rating changes.
      </p>
      
      <div class="space-y-4">
        <Rating
          value={0}
          precision={0.5}
          onValueChange$={() => { interactions.value++; }}
          onHoverChange$={() => { interactions.value++; }}
          label="Rapid interaction test"
          helperText="Hover and click rapidly to test performance"
          size="lg"
        />
        
        <div class="text-sm">
          <div>Total Interactions: <span class="font-mono">{interactions.value}</span></div>
          <div>Performance: <span class="text-green-600">Smooth</span></div>
        </div>
        
        <button
          onClick$={() => { interactions.value = 0; }}
          class="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Reset Counter
        </button>
      </div>
    </div>
  );
});