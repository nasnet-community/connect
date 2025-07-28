import { component$ } from "@builder.io/qwik";
import { BasicPromoBanner } from "../Examples";

export default component$(() => {
  return (
    <div class="space-y-6">
      <section class="space-y-3">
        <p>
          The PromoBanner component is designed to display promotional content
          for VPN services, with options for images, custom styling, and
          interactive features like retrieving VPN credentials.
        </p>

        <div class="mt-4 rounded-lg border bg-white p-6 dark:bg-gray-800">
          <BasicPromoBanner />
        </div>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">Key Features</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <strong>Visual Promotions:</strong> Display promotional content with
            title, description, and optional image
          </li>
          <li>
            <strong>VPN Integration:</strong> Specialized for VPN service
            promotions with provider information
          </li>
          <li>
            <strong>Credential Retrieval:</strong> Built-in functionality to
            request and display VPN access credentials
          </li>
          <li>
            <strong>Customizable Styling:</strong> Customize background colors
            and add additional CSS classes
          </li>
          <li>
            <strong>Responsive Design:</strong> Adapts layout between mobile and
            desktop viewports
          </li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">When to Use</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>When promoting VPN services within your application</li>
          <li>To offer special promotions or free trials to users</li>
          <li>
            For displaying time-limited offers with call-to-action elements
          </li>
          <li>To provide users with a way to quickly access VPN credentials</li>
        </ul>
      </section>

      <section class="space-y-3">
        <h2 class="text-xl font-semibold">Composition</h2>
        <p>The PromoBanner is a standalone component that consists of:</p>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <strong>Title:</strong> Main promotional heading
          </li>
          <li>
            <strong>Description:</strong> Secondary text explaining the
            promotion
          </li>
          <li>
            <strong>Image:</strong> Optional visual element related to the VPN
            service
          </li>
          <li>
            <strong>Action Button:</strong> Optional button to retrieve VPN
            credentials
          </li>
          <li>
            <strong>Success Message:</strong> Confirmation when credentials are
            successfully delivered
          </li>
        </ul>
      </section>
    </div>
  );
});
