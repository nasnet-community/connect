import { component$ } from "@builder.io/qwik";
import { CodeBlock } from "~/components/Core/Typography/CodeDisplay";

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Basic Usage</h2>
        <p>
          The PromoBanner component is used to display promotional content
          related to VPN services. Here's a basic example:
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';

export default component$(() => {
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
        <h2 class="text-xl font-semibold">Adding an Image</h2>
        <p>
          You can make the PromoBanner more visually appealing by adding an
          image:
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';

export default component$(() => {
  return (
    <PromoBanner
      title="Try Premium Nord VPN"
      description="Get access to secure, high-speed VPN services with servers in over 60 countries."
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
        <h2 class="text-xl font-semibold">Custom Styling</h2>
        <p>
          Customize the PromoBanner appearance with background colors and
          additional CSS classes:
        </p>
        <CodeBlock
          code={`
import { component$ } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';

export default component$(() => {
  return (
    <PromoBanner
      title="Limited Time Offer: SurfShark VPN"
      description="Get unlimited device connections and advanced security features."
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
        <h2 class="text-xl font-semibold">Interactive Credentials</h2>
        <p>
          Enable users to retrieve VPN credentials by adding a callback
          function:
        </p>
        <CodeBlock
          code={`
import { component$, $, useSignal } from '@builder.io/qwik';
import { PromoBanner } from '~/components/Core/Feedback/PromoBanner';
import type { VPNCredentials } from '~/components/Core/Feedback/PromoBanner';

export default component$(() => {
  const credentials = useSignal<VPNCredentials | null>(null);
  
  const handleCredentialsReceived = $((creds: VPNCredentials) => {
    credentials.value = creds;
    // You can also save the credentials to local storage or send them to a backend
  });
  
  return (
    <div>
      <PromoBanner
        title="Get Free VPN Access"
        description="Click the button below to receive your credentials."
        provider="WireGuard"
        onCredentialsReceived$={handleCredentialsReceived}
      />
      
      {credentials.value && (
        <div class="mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <h4 class="font-medium">Your VPN Credentials:</h4>
          <p><strong>Server:</strong> {credentials.value.server}</p>
          <p><strong>Username:</strong> {credentials.value.username}</p>
          <p><strong>Password:</strong> {credentials.value.password}</p>
        </div>
      )}
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Using the usePromoBanner Hook</h2>
        <p>
          For more advanced usage, you can directly use the usePromoBanner hook:
        </p>
        <CodeBlock
          code={`
import { component$, $ } from '@builder.io/qwik';
import { usePromoBanner } from '~/components/Core/Feedback/PromoBanner/usePromoBanner';
import type { VPNCredentials } from '~/components/Core/Feedback/PromoBanner';

export default component$(() => {
  const handleCredentials = $((creds: VPNCredentials) => {
    console.log('Credentials received:', creds);
  });
  
  const { loading, success, error, getCredentials$ } = usePromoBanner({
    onCredentialsReceived$: handleCredentials
  });
  
  return (
    <div class="p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h3 class="text-lg font-bold">Get Free VPN Access</h3>
      <p class="mt-2">Click the button below to receive your credentials.</p>
      
      {!success.value && (
        <button
          onClick$={getCredentials$}
          class="mt-4 px-4 py-2 bg-primary-500 text-white rounded-lg 
            hover:bg-primary-600 transition-colors"
          disabled={loading.value}
        >
          {loading.value ? 'Loading...' : 'Get Free Access'}
        </button>
      )}
      
      {success.value && (
        <div class="mt-4 px-4 py-2 bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 rounded-lg">
          Credentials sent! Check your account.
        </div>
      )}
      
      {error.value && (
        <div class="mt-4 px-4 py-2 bg-error-100 text-error-800 dark:bg-error-900/30 dark:text-error-300 rounded-lg">
          Error: {error.value}
        </div>
      )}
    </div>
  );
});
          `}
          language="tsx"
        />
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Best Practices</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <strong>Clear Messaging:</strong> Use concise and clear language for
            the promotion title and description.
          </li>
          <li>
            <strong>Visual Appeal:</strong> Include relevant images when
            possible to make the promotion more engaging.
          </li>
          <li>
            <strong>Strategic Placement:</strong> Place PromoBanners in
            locations where they won't disrupt the main user flow but are still
            visible.
          </li>
          <li>
            <strong>Temporary Display:</strong> Consider using state management
            to display PromoBanners only for a limited time or until dismissed.
          </li>
          <li>
            <strong>Response Handling:</strong> Always handle loading, success,
            and error states for credential retrieval.
          </li>
          <li>
            <strong>Dark Mode Support:</strong> Ensure your custom styling works
            well in both light and dark modes.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 class="text-xl font-semibold">Accessibility Considerations</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            Ensure promotional images have appropriate alt text for screen
            readers.
          </li>
          <li>
            Use sufficient color contrast for text content to maintain
            readability.
          </li>
          <li>
            Add ARIA attributes to interactive elements when necessary for
            better screen reader support.
          </li>
          <li>
            Ensure buttons have descriptive text that explains their purpose.
          </li>
          <li>
            Provide visual feedback (such as loading states and success
            messages) for user interactions.
          </li>
        </ul>
      </section>
    </div>
  );
});
