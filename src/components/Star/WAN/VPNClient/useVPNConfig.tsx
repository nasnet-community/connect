import { $, useSignal } from "@builder.io/qwik";
import type { VPNType, WireguardConfig } from "~/components/Star/StarContext/StarContext";

export const useVPNConfig = () => {
  const config = useSignal("");
  const isValid = useSignal(false);
  const vpnType = useSignal<VPNType>("");
  const errorMessage = useSignal("");

  const validateRequiredFields = $(async (config: WireguardConfig) => {
    const requiredFields = [
      "PrivateKey",
      "PublicKey",
      "AllowedIPs",
      "ServerAddress",
      "Address",
      "ServerPort",
    ];
    const emptyFields = requiredFields.filter((field) => {
      const value = config[field as keyof WireguardConfig];
      return !value || value.trim() === "";
    });

    return {
      isValid: emptyFields.length === 0,
      emptyFields,
    };
  });

  const parseWireguardConfig = $(
    (configText: string): WireguardConfig | null => {
      try {
        const sections: { [key: string]: { [key: string]: string } } = {};
        let currentSection = "";

        configText.split("\n").forEach((line) => {
          line = line.trim();
          if (!line || line.startsWith("#")) return;

          if (line.startsWith("[") && line.endsWith("]")) {
            currentSection = line.slice(1, -1);
            sections[currentSection] = {};
            return;
          }

          if (currentSection) {
            const [key, value] = line.split(" = ").map((s) => s.trim());
            if (key && value) {
              sections[currentSection][key] = value;
            }
          }
        });

        const endpoint = sections["Peer"]?.Endpoint || "";
        const [serverAddress, serverPort] = endpoint.split(":");

        // Handle Address field - filter out IPv6
        const addresses = sections["Interface"]?.Address?.split(",") || [];
        const ipv4Address = addresses.find((addr) => !addr.includes(":")) || "";

        const config: WireguardConfig = {
          PrivateKey: sections["Interface"]?.PrivateKey || "",
          PublicKey: sections["Peer"]?.PublicKey || "",
          AllowedIPs: sections["Peer"]?.AllowedIPs || "",
          ServerAddress: serverAddress || "",
          ServerPort: serverPort || "",
          Address: ipv4Address,
          ListeningPort: sections["Interface"]?.ListenPort || "13231",
          DNS: sections["Interface"]?.DNS || "",
          MTU: sections["Interface"]?.MTU || "1420",
          PreSharedKey: sections["Peer"]?.PresharedKey || "",
          PersistentKeepalive: sections["Peer"]?.PersistentKeepalive || "25s",
        };

        const requiredFields = [
          "PrivateKey",
          "PublicKey",
          "AllowedIPs",
          "ServerAddress",
          "Address",
          "ServerPort",
        ];
        const isValid = requiredFields.every((field) => {
          const value = config[field as keyof WireguardConfig];
          return value !== undefined && value !== "";
        });

        return isValid ? config : null;
      } catch (error) {
        console.error("Error parsing WireGuard config:", error);
        return null;
      }
    },
  );

  return {
    config,
    isValid,
    vpnType,
    errorMessage,
    validateRequiredFields,
    parseWireguardConfig,
  };
};
