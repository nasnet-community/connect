import { component$, useSignal, useStore } from "@builder.io/qwik";
import { Rating } from "../Rating";

/**
 * CustomIconRating Example
 * 
 * Demonstrates how to use custom icons with the Rating component:
 * - Heart icons for love/appreciation ratings
 * - Thumbs up/down for approval ratings
 * - Different star styles with custom SVGs
 * - Emoji icons for fun ratings
 * - Custom icon components with filled/empty states
 */
export const CustomIconRatingExample = component$(() => {
  const heartRating = useSignal(3);
  const thumbsRating = useSignal(2);
  const starStyleRating = useSignal(4);
  const emojiRating = useSignal(0);
  const customStyleRating = useSignal(3);

  return (
    <div class="space-y-8 p-6">
      <div class="mb-6">
        <h2 class="text-2xl font-bold">Custom Icon Rating Examples</h2>
        <p class="text-gray-600">
          Explore different icon types and styles for various rating contexts.
        </p>
      </div>

      {/* Heart Icons - Love/Appreciation Rating */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Heart Icons - Love Rating</h3>
        <p class="text-sm text-gray-600">
          Perfect for rating favorite items, appreciation, or emotional responses.
        </p>
        
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-3">
            <Rating
              value={heartRating.value}
              onValueChange$={(value) => {
                heartRating.value = value || 0;
              }}
              icon={<HeartIcon filled={true} />}
              emptyIcon={<HeartIcon filled={false} />}
              label="How much do you love this?"
              class="text-red-500"
              size="lg"
              labels={["Hate", "Dislike", "Neutral", "Like", "Love"]}
              showValue
            />
          </div>
          
          <div class="space-y-3">
            <Rating
              value={4.5}
              precision={0.5}
              readOnly
              icon={<HeartIcon filled={true} />}
              emptyIcon={<HeartIcon filled={false} />}
              label="Average user love rating"
              class="text-pink-500"
              size="md"
              showValue
            />
          </div>
        </div>
      </div>

      {/* Thumbs Up/Down - Approval Rating */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Thumbs Icons - Approval Rating</h3>
        <p class="text-sm text-gray-600">
          Great for like/dislike, approval, or recommendation ratings.
        </p>
        
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-3">
            <Rating
              value={thumbsRating.value}
              onValueChange$={(value) => {
                thumbsRating.value = value || 0;
              }}
              icon={<ThumbsUpIcon filled={true} />}
              emptyIcon={<ThumbsUpIcon filled={false} />}
              label="Do you recommend this?"
              class="text-blue-600"
              size="lg"
              labels={["Strongly No", "No", "Maybe", "Yes", "Strongly Yes"]}
              allowClear
            />
          </div>
          
          <div class="space-y-3">
            <Rating
              value={5}
              readOnly
              icon={<ThumbsUpIcon filled={true} />}
              emptyIcon={<ThumbsUpIcon filled={false} />}
              label="Expert recommendation"
              class="text-green-600"
              size="md"
              successMessage="Highly recommended by experts!"
            />
          </div>
        </div>
      </div>

      {/* Custom Star Styles */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom Star Styles</h3>
        <p class="text-sm text-gray-600">
          Different star designs and styling approaches for unique visual appeal.
        </p>
        
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-3">
            <Rating
              value={starStyleRating.value}
              onValueChange$={(value) => {
                starStyleRating.value = value || 0;
              }}
              icon={<GlowStarIcon filled={true} />}
              emptyIcon={<GlowStarIcon filled={false} />}
              label="Premium star rating"
              class="text-yellow-400 drop-shadow-lg"
              size="lg"
              precision={0.5}
            />
          </div>
          
          <div class="space-y-3">
            <Rating
              value={3.5}
              precision={0.5}
              readOnly
              icon={<OutlineStarIcon filled={true} />}
              emptyIcon={<OutlineStarIcon filled={false} />}
              label="Outline star style"
              class="text-purple-600"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Emoji Icons - Fun Rating */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Emoji Icons - Mood Rating</h3>
        <p class="text-sm text-gray-600">
          Using emojis for fun, accessible, and universally understood ratings.
        </p>
        
        <div class="grid gap-6 md:grid-cols-2">
          <div class="space-y-3">
            <Rating
              value={emojiRating.value}
              onValueChange$={(value) => {
                emojiRating.value = value || 0;
              }}
              icon={(props: { index?: number }) => <EmojiIcon index={props.index || 0} filled={true} />}
              emptyIcon={(props: { index?: number }) => <EmojiIcon index={props.index || 0} filled={false} />}
              label="How was your experience?"
              size="lg"
              labels={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
              class="text-2xl"
            />
          </div>
          
          <div class="space-y-3">
            <Rating
              value={4}
              readOnly
              icon={(props: { index?: number }) => <EmojiIcon index={props.index || 0} filled={true} />}
              emptyIcon={(props: { index?: number }) => <EmojiIcon index={props.index || 0} filled={false} />}
              label="Average mood rating"
              size="md"
              class="text-xl"
              showValue
            />
          </div>
        </div>
      </div>

      {/* Advanced Custom Styling */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Advanced Custom Styling</h3>
        <p class="text-sm text-gray-600">
          Complex styling examples with gradients, animations, and multi-color effects.
        </p>
        
        <div class="space-y-6">
          <Rating
            value={customStyleRating.value}
            onValueChange$={(value) => {
              customStyleRating.value = value || 0;
            }}
            icon={<GradientStarIcon filled={true} />}
            emptyIcon={<GradientStarIcon filled={false} />}
            label="Gradient animated stars"
            size="lg"
            precision={0.5}
            class="hover:scale-105 transition-transform duration-200"
          />
          
          <Rating
            value={5}
            readOnly
            icon={<AnimatedStarIcon filled={true} />}
            emptyIcon={<AnimatedStarIcon filled={false} />}
            label="Animated sparkle effect"
            size="md"
            class="animate-pulse"
          />
        </div>
      </div>

      {/* Icon Usage Guidelines */}
      <div class="mt-8 rounded-lg bg-blue-50 p-6 dark:bg-blue-900/20">
        <h3 class="mb-4 text-lg font-semibold text-blue-800 dark:text-blue-200">
          Custom Icon Guidelines
        </h3>
        <div class="space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <p>
            <strong>Icon Component Pattern:</strong> Create components that accept
            a <code class="bg-blue-100 px-1 dark:bg-blue-800">filled</code> prop
            to handle filled/empty states.
          </p>
          <p>
            <strong>Accessibility:</strong> Use <code class="bg-blue-100 px-1 dark:bg-blue-800">aria-hidden="true"</code>
            on icon elements since the Rating component handles ARIA labeling.
          </p>
          <p>
            <strong>Responsive Design:</strong> Icons automatically scale with the
            <code class="bg-blue-100 px-1 dark:bg-blue-800">size</code> prop
            (sm/md/lg).
          </p>
          <p>
            <strong>Color Customization:</strong> Use the{" "}
            <code class="bg-blue-100 px-1 dark:bg-blue-800">class</code> prop
            to apply custom colors and effects.
          </p>
        </div>
      </div>

      {/* Interactive Demo */}
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Interactive Icon Demo</h3>
        <CustomIconDemo />
      </div>
    </div>
  );
});

/* ===============================
   CUSTOM ICON COMPONENTS
   =============================== */

/**
 * Heart Icon Component
 * Perfect for love, favorite, or appreciation ratings
 */
const HeartIcon = component$<{ filled: boolean }>(({ filled }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      stroke-width="2"
      class="h-full w-full transition-all duration-200"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
});

/**
 * Thumbs Up Icon Component
 * Great for like/dislike or approval ratings
 */
const ThumbsUpIcon = component$<{ filled: boolean }>(({ filled }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      stroke-width="2"
      class="h-full w-full transition-all duration-200"
      aria-hidden="true"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
});

/**
 * Glowing Star Icon Component
 * Enhanced star with glow effect
 */
const GlowStarIcon = component$<{ filled: boolean }>(({ filled }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      stroke-width="1"
      class="h-full w-full transition-all duration-200"
      style={filled ? "filter: drop-shadow(0 0 6px currentColor)" : ""}
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
});

/**
 * Outline Star Icon Component
 * Star with thicker outline for modern look
 */
const OutlineStarIcon = component$<{ filled: boolean }>(({ filled }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "transparent"}
      stroke="currentColor"
      stroke-width="2.5"
      class="h-full w-full transition-all duration-200"
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
});

/**
 * Emoji Icon Component
 * Different emoji for each rating level
 */
const EmojiIcon = component$<{ index: number; filled: boolean }>(({ index, filled }) => {
  const emojis = ["😡", "😞", "😐", "😊", "🤩"];
  const emoji = emojis[index] || emojis[0];
  
  return (
    <span
      class={`block transition-all duration-200 ${
        filled ? "scale-110 brightness-110" : "grayscale opacity-30"
      }`}
      aria-hidden="true"
    >
      {emoji}
    </span>
  );
});

/**
 * Gradient Star Icon Component
 * Star with gradient fill effect
 */
const GradientStarIcon = component$<{ filled: boolean }>(({ filled }) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <svg
      viewBox="0 0 24 24"
      class="h-full w-full transition-all duration-200"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#fbbf24" />
          <stop offset="50%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#d97706" />
        </linearGradient>
      </defs>
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={filled ? `url(#${gradientId})` : "none"}
        stroke="currentColor"
        stroke-width="1"
      />
    </svg>
  );
});

/**
 * Animated Star Icon Component
 * Star with subtle animation effects
 */
const AnimatedStarIcon = component$<{ filled: boolean }>(({ filled }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      stroke-width="1"
      class={`h-full w-full transition-all duration-300 ${
        filled ? "animate-bounce" : ""
      }`}
      aria-hidden="true"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      {filled && (
        <>
          <circle cx="12" cy="12" r="1" fill="white" opacity="0.8">
            <animate attributeName="r" values="0;2;0" dur="2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </svg>
  );
});

/* ===============================
   INTERACTIVE DEMO COMPONENT
   =============================== */

const CustomIconDemo = component$(() => {
  const demoRating = useSignal(0);
  const selectedIconType = useSignal("heart");
  
  const iconTypes = useStore({
    heart: { icon: HeartIcon, color: "text-red-500", label: "Hearts" },
    thumbs: { icon: ThumbsUpIcon, color: "text-blue-600", label: "Thumbs Up" },
    glow: { icon: GlowStarIcon, color: "text-yellow-400", label: "Glow Stars" },
    outline: { icon: OutlineStarIcon, color: "text-purple-600", label: "Outline Stars" },
  });

  const currentIconType = iconTypes[selectedIconType.value as keyof typeof iconTypes];

  return (
    <div class="rounded-lg border border-gray-200 p-6 dark:border-gray-700">
      <h4 class="mb-4 font-semibold">Try Different Icon Types</h4>
      
      {/* Icon Type Selector */}
      <div class="mb-6">
        <label class="mb-2 block text-sm font-medium">Icon Type:</label>
        <div class="flex flex-wrap gap-2">
          {Object.entries(iconTypes).map(([key, config]) => (
            <button
              key={key}
              onClick$={() => {
                selectedIconType.value = key;
                demoRating.value = 0; // Reset rating when changing icon type
              }}
              class={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                selectedIconType.value === key
                  ? "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                  : "border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              }`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Rating */}
      <div class="space-y-4">
        <Rating
          value={demoRating.value}
          onValueChange$={(value) => {
            demoRating.value = value || 0;
          }}
          icon={<currentIconType.icon filled={true} />}
          emptyIcon={<currentIconType.icon filled={false} />}
          label={`Rate with ${currentIconType.label.toLowerCase()}`}
          class={currentIconType.color}
          size="lg"
          allowClear
          showValue
        />
        
        <p class="text-sm text-gray-600">
          Current rating: {demoRating.value}/5 using {currentIconType.label.toLowerCase()}
        </p>
      </div>
    </div>
  );
});