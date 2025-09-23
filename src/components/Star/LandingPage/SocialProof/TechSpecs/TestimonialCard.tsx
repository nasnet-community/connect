import { component$ } from "@builder.io/qwik";
import { Card } from "~/components/Core";
import { LuStar } from "@qwikest/icons/lucide";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    company: string;
    text: string;
    rating: number;
  };
  index: number;
}

export const TestimonialCard = component$<TestimonialCardProps>(({ testimonial, index }) => {
  return (
    <Card
      class={`
        p-6 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20
        hover:border-white/40 transition-all duration-300 hover:transform hover:scale-105
        animate-fade-in-up
        ${index === 1 ? 'animation-delay-200' : ''}
        ${index === 2 ? 'animation-delay-500' : ''}
      `}
    >
      {/* Rating */}
      <div class="flex gap-1 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <LuStar key={i} class="h-4 w-4 text-yellow-400 fill-current" />
        ))}
      </div>

      {/* Testimonial Text */}
      <p class="text-gray-700 dark:text-gray-300 mb-4 italic">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div class="border-t border-white/20 pt-4">
        <div class="font-semibold text-gray-900 dark:text-white">
          {testimonial.name}
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          {testimonial.company}
        </div>
      </div>
    </Card>
  );
});