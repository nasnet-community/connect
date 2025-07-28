import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates/OverviewTemplate";

export default component$(() => {
  const keyFeatures = [
    "Server-Specific Layout: Pre-configured card layout optimized for server and VPN configuration interfaces",
    "Built-in Toggle Switch: Integrated enable/disable toggle with state management for server configurations",
    "Icon Integration: Supports custom icons with serialized QRL functions for proper SSR compatibility",
    "Server Status Display: Clear visual indication of server enabled/disabled states",
    "Dark Mode Support: Seamlessly transitions between light and dark themes with server-appropriate styling",
    "Consistent Styling: Follows design system patterns specifically tailored for server management interfaces",
    "Accessibility Ready: Built-in ARIA attributes and keyboard navigation support for server controls",
  ];

  const whenToUse = [
    "Configure VPN server protocols (WireGuard, OpenVPN, L2TP, PPTP, SSTP, IKeV2)",
    "Display server configuration panels with enable/disable functionality",
    "Create consistent server management interfaces across different protocols",
    "Present server status and configuration options in a unified layout",
    "Build router configuration wizards with server components",
    "Organize network service configurations with visual consistency",
  ];

  const whenNotToUse = [
    "For general content display that doesn't involve server/service configuration",
    "When you need complex multi-section layouts (use regular Card component instead)",
    "For static information display without interactive elements",
    "When server enable/disable functionality is not needed",
    "For content that requires multiple slots or complex layout structures",
    "When custom card styling is more appropriate than server-specific patterns",
  ];

  return (
    <OverviewTemplate
      keyFeatures={keyFeatures}
      whenToUse={whenToUse}
      whenNotToUse={whenNotToUse}
    >
      <p>
        The ServerCard component is a specialized card designed specifically for
        server and VPN configuration interfaces. It provides a consistent layout
        with built-in toggle functionality for enabling/disabling server
        services.
      </p>
      <p class="mt-2">
        Built on top of the core Card component, ServerCard includes
        server-specific features like integrated toggle switches, icon support
        for different protocols, and standardized styling for router
        configuration management interfaces.
      </p>
      <p class="mt-2">
        This component is particularly useful in network configuration wizards
        where users need to configure multiple server protocols with consistent
        enable/disable controls and visual feedback.
      </p>
    </OverviewTemplate>
  );
});
