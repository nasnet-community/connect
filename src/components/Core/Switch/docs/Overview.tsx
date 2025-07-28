import { component$ } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="space-y-4">
      <p>
        The <code>Switch</code> component provides a modern, accessible toggle control 
        that allows users to switch between two states: on and off. Built with a 
        mobile-first approach, it features responsive design optimized for all devices, 
        enhanced accessibility with proper ARIA attributes, and seamless integration 
        with Tailwind's theme system. Perfect for settings, preferences, and feature toggles.
      </p>

      <h2 class="mt-4 text-xl font-semibold">Key Features</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          <strong>Mobile-First Responsive Design:</strong> Optimized for mobile, 
          tablet, and desktop with touch-friendly interaction targets (minimum 44px)
        </li>
        <li>
          <strong>Tailwind Theme Integration:</strong> Uses Tailwind config colors 
          properly with full dark mode support
        </li>
        <li>
          <strong>Enhanced Accessibility:</strong> WCAG AA compliant with proper 
          ARIA attributes, role="switch", and screen reader support
        </li>
        <li>
          <strong>Custom Styling Capabilities:</strong> Support for custom track 
          and thumb styling via trackClass and thumbClass props
        </li>
        <li>
          <strong>Touch Optimization:</strong> Touch-friendly design with proper 
          focus states and hover effects
        </li>
        <li>
          <strong>Keyboard Navigation:</strong> Fully accessible via keyboard
          with Space/Enter keys and visible focus indicators
        </li>
        <li>
          <strong>Form Integration:</strong> Works seamlessly within forms with 
          proper validation and state management
        </li>
        <li>
          <strong>Size Variants:</strong> Three responsive sizes (sm, md, lg) 
          that adapt to different screen sizes
        </li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">When to Use</h2>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          <strong>Immediate toggles:</strong> For binary choices that take immediate 
          effect without requiring form submission
        </li>
        <li>
          <strong>Feature enablement:</strong> When users need to enable or disable 
          specific features or functionality
        </li>
        <li>
          <strong>User preferences:</strong> For settings that can be changed with 
          a single action (notifications, privacy settings, etc.)
        </li>
        <li>
          <strong>Mobile interfaces:</strong> When you need touch-friendly controls 
          optimized for mobile devices
        </li>
        <li>
          <strong>Configuration panels:</strong> In settings panels, dashboards, 
          admin interfaces, and router configuration tools
        </li>
        <li>
          <strong>Space-constrained layouts:</strong> When you need a compact, 
          visually clear control that saves space
        </li>
        <li>
          <strong>Accessibility-critical applications:</strong> When proper ARIA 
          support and keyboard navigation are essential
        </li>
      </ul>

      <h2 class="mt-4 text-xl font-semibold">Accessibility</h2>
      <p>The Switch component is WCAG AA compliant and follows accessibility best practices:</p>
      <ul class="list-disc space-y-2 pl-6">
        <li>
          <strong>Semantic HTML:</strong> Uses <code>role="switch"</code> with 
          <code>aria-checked</code> to properly communicate state to screen readers
        </li>
        <li>
          <strong>Comprehensive labeling:</strong> Supports multiple labeling methods 
          via <code>aria-label</code>, <code>aria-labelledby</code>, and 
          <code>aria-describedby</code>
        </li>
        <li>
          <strong>Keyboard navigation:</strong> Full keyboard support with Space/Enter 
          to toggle and visible focus indicators
        </li>
        <li>
          <strong>Touch accessibility:</strong> Minimum 44px touch targets on mobile 
          devices for easy interaction
        </li>
        <li>
          <strong>Visual accessibility:</strong> Sufficient color contrast ratios 
          in both light and dark modes using theme-aware colors
        </li>
        <li>
          <strong>Screen reader support:</strong> Includes hidden text for context 
          and proper state announcements
        </li>
        <li>
          <strong>Focus management:</strong> Clear focus rings and proper focus 
          states for keyboard navigation
        </li>
        <li>
          <strong>Disabled state handling:</strong> Proper <code>aria-disabled</code> 
          attributes and visual feedback for disabled switches
        </li>
      </ul>
    </div>
  );
});
