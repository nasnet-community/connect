import { component$, useSignal, $ } from "@builder.io/qwik";
import { Card } from "../Card";
import { Button } from "../../button/Button";

/**
 * InteractiveCardExample - Cards with click handlers and interactive actions
 *
 * This example demonstrates:
 * - Click handlers on cards
 * - Interactive buttons in action slots
 * - State management with user interactions
 * - Hover effects and transitions
 */
export const InteractiveCardExample = component$(() => {
  const selectedCard = useSignal<string | null>(null);
  const likedCards = useSignal<Set<string>>(new Set());
  const expandedCard = useSignal<string | null>(null);

  const handleCardClick = $((cardId: string) => {
    selectedCard.value = selectedCard.value === cardId ? null : cardId;
  });

  const handleLike = $((cardId: string, event: Event) => {
    event.stopPropagation();
    const newLikedCards = new Set(likedCards.value);
    if (newLikedCards.has(cardId)) {
      newLikedCards.delete(cardId);
    } else {
      newLikedCards.add(cardId);
    }
    likedCards.value = newLikedCards;
  });

  const toggleExpand = $((cardId: string, event: Event) => {
    event.stopPropagation();
    expandedCard.value = expandedCard.value === cardId ? null : cardId;
  });

  const products = [
    {
      id: "1",
      name: "Premium Headphones",
      price: "$299",
      description:
        "Noise-cancelling wireless headphones with premium sound quality.",
      image: "🎧",
      rating: 4.5,
    },
    {
      id: "2",
      name: "Smart Watch",
      price: "$399",
      description: "Advanced fitness tracking and health monitoring features.",
      image: "⌚",
      rating: 4.8,
    },
    {
      id: "3",
      name: "Wireless Keyboard",
      price: "$149",
      description:
        "Mechanical keyboard with RGB lighting and bluetooth connectivity.",
      image: "⌨️",
      rating: 4.2,
    },
  ];

  return (
    <div class="space-y-6 p-4">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
        Interactive Card Examples
      </h2>
      <p class="text-gray-600 dark:text-gray-400">
        Click on cards to select them and interact with the action buttons.
      </p>

      {/* Clickable Product Cards */}
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        {products.map((product) => (
          <div 
            key={product.id} 
            class="relative"
            onClick$={() => handleCardClick(product.id)}
          >
            <Card
              variant={selectedCard.value === product.id ? "info" : "elevated"}
              hasFooter
              hasActions
              class={`cursor-pointer transition-all duration-200 ${
                selectedCard.value === product.id
                  ? "ring-2 ring-info-500 ring-offset-2"
                  : "hover:scale-[1.02]"
              }`}
              aria-label={`Product card for ${product.name}`}
            >
              {/* Selected Badge */}
              {selectedCard.value === product.id && (
                <div class="absolute -right-2 -top-2 rounded-full bg-info-500 px-2 py-1 text-xs text-white">
                  Selected
                </div>
              )}

              <div class="mb-4 text-center">
                <div class="mb-2 text-4xl">{product.image}</div>
                <h3 class="text-lg font-semibold">{product.name}</h3>
                <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {product.price}
                </p>
              </div>

              <p class="text-sm text-gray-600 dark:text-gray-400">
                {product.description}
              </p>

              {/* Rating */}
              <div class="mt-3 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    class={`text-sm ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-500"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  >
                    ★
                  </span>
                ))}
                <span class="ml-1 text-sm text-gray-600 dark:text-gray-400">
                  ({product.rating})
                </span>
              </div>

              <div q:slot="footer">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  Free shipping available
                </span>
              </div>

              <div q:slot="actions" class="flex gap-2">
                <button
                  onClick$={(e) => handleLike(product.id, e)}
                  class={`rounded p-2 transition-colors ${
                    likedCards.value.has(product.id)
                      ? "bg-red-50 text-red-500 dark:bg-red-900/20"
                      : "text-gray-500 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
                  }`}
                  aria-label={
                    likedCards.value.has(product.id) ? "Unlike" : "Like"
                  }
                >
                  <svg
                    class="h-5 w-5"
                    fill={
                      likedCards.value.has(product.id) ? "currentColor" : "none"
                    }
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
                <div
                  onClick$={(e: Event) => {
                    e.stopPropagation();
                  }}
                >
                  <Button
                    size="sm"
                    variant="primary"
                    onClick$={() => {
                      console.log(`Add to cart: ${product.name}`);
                    }}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Expandable Content Cards */}
      <div class="mt-12">
        <h3 class="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
          Expandable Cards
        </h3>

        <div class="space-y-4">
          {[
            {
              id: "faq1",
              question: "What is the return policy?",
              answer:
                "We offer a 30-day return policy for all products. Items must be in original condition with all packaging and accessories included. Refunds are processed within 5-7 business days after we receive the returned item.",
            },
            {
              id: "faq2",
              question: "How do I track my order?",
              answer:
                "Once your order ships, you'll receive an email with tracking information. You can also log into your account and view tracking details in the 'My Orders' section. Most orders arrive within 3-5 business days.",
            },
            {
              id: "faq3",
              question: "Do you offer international shipping?",
              answer:
                "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by destination. You can see available options and costs at checkout.",
            },
          ].map((faq) => (
            <div
              key={faq.id}
              onClick$={(e: Event) => toggleExpand(faq.id, e)}
              class="cursor-pointer"
            >
              <Card
                variant="bordered"
                hasHeader
                hasActions
              >
              <div q:slot="header" class="flex items-center justify-between">
                <h4 class="font-medium">{faq.question}</h4>
                <svg
                  class={`h-5 w-5 transition-transform duration-200 ${
                    expandedCard.value === faq.id ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>

              {expandedCard.value === faq.id && (
                <p class="text-gray-600 dark:text-gray-400">{faq.answer}</p>
              )}

              <div q:slot="actions">
                <button
                  onClick$={(e) => {
                    e.stopPropagation();
                    console.log(`Helpful: ${faq.id}`);
                  }}
                  class="text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  Was this helpful?
                </button>
              </div>
            </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive State Summary */}
      <Card variant="info" hasHeader>
        <div q:slot="header">
          <h3 class="font-semibold">Current Interaction State</h3>
        </div>

        <div class="space-y-2">
          <p>
            <strong>Selected Card:</strong>{" "}
            {selectedCard.value
              ? products.find((p) => p.id === selectedCard.value)?.name
              : "None"}
          </p>
          <p>
            <strong>Liked Products:</strong>{" "}
            {likedCards.value.size > 0
              ? Array.from(likedCards.value)
                  .map((id) => products.find((p) => p.id === id)?.name)
                  .join(", ")
              : "None"}
          </p>
          <p>
            <strong>Expanded FAQ:</strong>{" "}
            {expandedCard.value
              ? `Question ${expandedCard.value.slice(-1)}`
              : "None"}
          </p>
        </div>
      </Card>
    </div>
  );
});
