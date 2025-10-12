import { $ } from "@builder.io/qwik";
import type { StarContextType } from "~/components/Star/StarContext/StarContext";
import type { ServiceType } from "~/components/Star/StarContext/ExtraType";

/**
 * Hook to apply sensible defaults for easy mode configuration.
 * These defaults are applied in ShowConfig before generating the configuration,
 * since ExtraConfig step is skipped in easy mode.
 */
export const useEasyModeDefaults = () => {
  /**
   * Applies all easy-mode defaults to the StarContext
   * This should be called in ShowConfig before generating the configuration
   */
  const applyEasyModeDefaults = $((ctx: StarContextType) => {
    const state = ctx.state;

    // Only apply if not already set (don't override user changes)

    // 1. RouterIdentityRomon: Use wireless SSID or default name, enable Romon
    if (!state.ExtraConfig.RouterIdentityRomon) {
      const wirelessSSID = state.LAN.Wireless?.[0]?.SSID || "MyRouter";
      ctx.updateExtraConfig$({
        RouterIdentityRomon: {
          RouterIdentity: wirelessSSID,
          isRomon: true,
        },
      });
    }

    // 2. Services: All set to "Local" with default ports in easy mode
    if (!state.ExtraConfig.services) {
      ctx.updateExtraConfig$({
        services: {
          api: { type: "Local" as ServiceType, port: 8728 },
          apissl: { type: "Local" as ServiceType, port: 8729 },
          ftp: { type: "Local" as ServiceType, port: 21 },
          ssh: { type: "Local" as ServiceType, port: 22 },
          telnet: { type: "Local" as ServiceType, port: 23 },
          winbox: { type: "Local" as ServiceType, port: 8291 },
          web: { type: "Local" as ServiceType, port: 80 },
          webssl: { type: "Local" as ServiceType, port: 443 },
        },
      });
    }

    // 3. RUI: Set Tehran timezone and IPAddressUpdate schedule
    const currentRUI = state.ExtraConfig.RUI;
    if (currentRUI.Timezone === "UTC") {
      ctx.updateExtraConfig$({
        RUI: {
          ...currentRUI,
          Timezone: "Asia/Tehran",
        },
      });
    }

    // 4. UsefulServices: Enable NTP with good defaults and graphing
    if (!state.ExtraConfig.usefulServices) {
      ctx.updateExtraConfig$({
        usefulServices: {
          ntp: {
            servers: ["pool.ntp.org", "time.cloudflare.com", "time.google.com"]
          },
          graphing: {
            Interface: true,
            Queue: true,
            Resources: true
          },
          certificate: {
            SelfSigned: true,
            LetsEncrypt: true,
          },
        },
      });
    }
  });

  return {
    applyEasyModeDefaults,
  };
};
