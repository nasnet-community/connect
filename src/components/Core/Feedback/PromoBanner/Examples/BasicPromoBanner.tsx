import { component$ } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';

export const BasicPromoBanner = component$(() => {
  return (
    <PromoBanner
      title="Get 30 days free VPN!"
      description="Sign up today to receive a month of premium VPN service at no cost."
      provider="ExpressVPN"
    />
  );
}); 