import { component$ } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';

export const CustomStylePromoBanner = component$(() => {
  return (
    <PromoBanner
      title="Limited Time Offer: SurfShark VPN"
      description="Get unlimited device connections and advanced security features. Special discount for new subscribers!"
      provider="SurfShark"
      bgColorClass="bg-gradient-to-r from-blue-500/20 to-teal-500/20"
      class="border border-blue-300 dark:border-blue-700"
    />
  );
}); 