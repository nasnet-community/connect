import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";
import {
  BasicPromoBanner,
  ImagePromoBanner,
  CustomStylePromoBanner,
  InteractivePromoBanner,
} from "../Examples";

export default component$(() => {
  return (
    <div class="space-y-10">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic PromoBanner</h2>
        <p>
          The basic PromoBanner displays promotional content with a title,
          description, and provider name. This is the simplest usage of the
          component.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <BasicPromoBanner />
        </div>
        <CodeBlock
          code={`
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
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">PromoBanner with Image</h2>
        <p>
          Adding an image to the PromoBanner makes it more visually appealing
          and helps users recognize the VPN service provider.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <ImagePromoBanner />
        </div>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';

export const ImagePromoBanner = component$(() => {
  return (
    <PromoBanner
      title="Try Premium Nord VPN"
      description="Get access to secure, high-speed VPN services with servers in over 60 countries. Protect your online privacy today!"
      provider="NordVPN"
      imageUrl="/images/vpn/nord-logo.png"
    />
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Custom Styled PromoBanner</h2>
        <p>
          The PromoBanner component can be customized with different background
          colors and additional CSS classes to match your application's design.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <CustomStylePromoBanner />
        </div>
        <CodeBlock
          code={`
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
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Interactive PromoBanner</h2>
        <p>
          The PromoBanner can include interactive elements like a button to
          retrieve VPN credentials. This example demonstrates how to handle the
          credential callback.
        </p>
        <div class="rounded-lg border bg-white p-4 dark:bg-gray-800">
          <InteractivePromoBanner />
        </div>
        <CodeBlock
          code={`
import { component$, $, useSignal } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';
import type { VPNCredentials } from '~/components/Core/Feedback/PromoBanner';

export const InteractivePromoBanner = component$(() => {
  const receivedCredentials = useSignal<VPNCredentials | null>(null);
  
  const handleCredentials = $((credentials: VPNCredentials) => {
    receivedCredentials.value = credentials;
  });
  
  return (
    <div class="space-y-4">
      <PromoBanner
        title="Get Free Wireguard VPN Access"
        description="Click the button below to receive your free VPN credentials. This special offer is available for a limited time!"
        provider="WireGuard"
        imageUrl="/images/vpn/wireguard-logo.png"
        onCredentialsReceived$={handleCredentials}
      />
      
      {receivedCredentials.value && (
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 class="font-medium text-lg mb-2">Your VPN Credentials:</h4>
          <div class="space-y-1 text-sm">
            <p><strong>Server:</strong> {receivedCredentials.value.server}</p>
            <p><strong>Username:</strong> {receivedCredentials.value.username}</p>
            <p><strong>Password:</strong> {receivedCredentials.value.password}</p>
          </div>
        </div>
      )}
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>
    </div>
  );
});
