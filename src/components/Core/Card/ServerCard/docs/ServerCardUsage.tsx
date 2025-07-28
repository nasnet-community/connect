import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates/UsageTemplate";
import type {
  BestPractice,
  AccessibilityTip,
  UsageGuideline,
} from "~/components/Docs/templates/UsageTemplate";

export default component$(() => {
  const guidelines: UsageGuideline[] = [
    {
      title: "Use consistent server naming",
      description:
        "Use clear, descriptive titles that identify the server protocol or service",
      type: "do",
      code: `<ServerCard title="WireGuard VPN Server">
<ServerCard title="OpenVPN Server">
<ServerCard title="DNS Server">`,
    },
    {
      title: "Provide proper toggle functionality",
      description:
        "Always implement both enabled state and onToggle$ handler together",
      type: "do",
      code: `const serverEnabled = useSignal(false);

<ServerCard
  title="L2TP Server"
  enabled={serverEnabled.value}
  onToggle$={$((enabled: boolean) => {
    serverEnabled.value = enabled;
    // Additional server configuration logic
  })}
>`,
    },
    {
      title: "Use appropriate protocol icons",
      description:
        "Match icons to the server protocol for better visual recognition",
      type: "do",
      code: `<ServerCard 
  title="WireGuard VPN"
  icon={$(WireguardIcon)}
/>
<ServerCard 
  title="OpenVPN Server" 
  icon={$(OpenVPNIcon)}
/>`,
    },
    {
      title: "Vague or generic server names",
      description:
        "Avoid ambiguous titles that don't clearly identify the server type",
      type: "dont",
      code: `<ServerCard title="Server"> // Too generic
<ServerCard title="Service 1"> // Not descriptive
<ServerCard title="VPN"> // Which VPN protocol?`,
    },
    {
      title: "Incomplete toggle implementation",
      description:
        "Don't provide only enabled prop without onToggle$ or vice versa",
      type: "dont",
      code: `// Missing onToggle$ handler
<ServerCard title="DNS Server" enabled={true} />

// Missing enabled state
<ServerCard title="DNS Server" onToggle$={$(() => {})} />`,
    },
    {
      title: "Mismatched icons and protocols",
      description: "Don't use inappropriate icons that confuse the server type",
      type: "dont",
      code: `// Wrong icon for protocol
<ServerCard title="WireGuard VPN" icon={$(OpenVPNIcon)} />
<ServerCard title="Web Server" icon={$(WireguardIcon)} />`,
    },
  ];

  const bestPractices: BestPractice[] = [
    {
      title: "Consistent server state management",
      description:
        "Use a consistent pattern for managing server state across your application. Consider using a centralized state management solution for complex server configurations.",
    },
    {
      title: "Error handling in toggle operations",
      description:
        "Implement proper error handling in onToggle$ callbacks to gracefully handle server configuration failures and provide user feedback.",
    },
    {
      title: "Loading states for server operations",
      description:
        "Show loading indicators during server start/stop operations to provide feedback for potentially slow server configuration changes.",
    },
    {
      title: "Group related server configurations",
      description:
        "Organize multiple ServerCard components logically, grouping related protocols or services together for better user experience.",
    },
    {
      title: "Validate server configurations before enabling",
      description:
        "Ensure required configuration parameters are set before allowing users to enable server services. Provide clear validation feedback.",
    },
  ];

  const accessibilityTips: AccessibilityTip[] = [
    {
      title: "Provide meaningful toggle labels",
      description:
        "The toggle switch automatically includes the server name in its label, making it clear to screen readers what service is being controlled.",
    },
    {
      title: "Use appropriate heading hierarchy",
      description:
        "The server title uses h3 by default. Ensure this fits your page's heading structure, or consider using titleClass to adjust semantics if needed.",
    },
    {
      title: "Include server status information",
      description:
        "Provide additional context about server status (running, stopped, error) within the card content for users who may not see visual indicators.",
    },
    {
      title: "Keyboard navigation support",
      description:
        "The toggle switch is fully keyboard accessible. Ensure any additional interactive elements within the card content also support keyboard navigation.",
    },
    {
      title: "Color contrast for status indicators",
      description:
        "When showing server status with colors, ensure sufficient contrast and provide alternative indicators (text, icons) for colorblind users.",
    },
  ];

  const performanceTips = [
    "Use serialized icons (with $() wrapper) for better SSR performance when the same icon is used across multiple server cards.",
    "Debounce toggle operations if server configuration changes are expensive to prevent rapid state changes.",
    "Consider lazy loading server configuration details if cards contain complex forms or large datasets.",
    "Implement optimistic UI updates for toggle operations to improve perceived performance.",
  ];

  return (
    <UsageTemplate
      guidelines={guidelines}
      bestPractices={bestPractices}
      accessibilityTips={accessibilityTips}
      performanceTips={performanceTips}
    >
      <p>
        ServerCard is designed specifically for server and VPN configuration
        interfaces where users need to enable/disable services and configure
        related settings. It provides a consistent, accessible pattern for
        server management interfaces.
      </p>
      <p class="mt-3">
        This guide covers best practices for implementing server configuration
        cards in your router management interface, with emphasis on clear
        naming, proper state management, and accessibility considerations.
      </p>
    </UsageTemplate>
  );
});
