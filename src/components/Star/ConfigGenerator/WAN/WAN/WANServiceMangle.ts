import type { RouterConfig } from "~/components/Star/ConfigGenerator";
import type { WANLinkConfig } from "~/components/Star/StarContext";
import type { services } from "~/components/Star/StarContext/ExtraType";
import { GetWANInterface } from "./WANInterfaceUtils";

/**
 * Service name mapping for display in comments
 */
const serviceNameMap: Record<string, string> = {
  api: "API",
  apissl: "API-SSL",
  ftp: "FTP",
  ssh: "SSH",
  telnet: "Telnet",
  winbox: "Winbox",
  web: "Web",
  webssl: "Web-SSL",
};

/**
 * Protocol mapping for each service
 * FTP uses both TCP and UDP, others use TCP only
 */
const serviceProtocols: Record<string, string[]> = {
  api: ["tcp"],
  apissl: ["tcp"],
  ftp: ["tcp", "udp"],
  ssh: ["tcp"],
  telnet: ["tcp"],
  winbox: ["tcp"],
  web: ["tcp"],
  webssl: ["tcp"],
};

/**
 * Generate consolidated mangle rules for enabled services on Domestic WAN links
 * This ensures inbound service traffic routes replies back through the same interface
 * Consolidates all services per protocol (TCP/UDP) per link for efficiency
 * 
 * @param domesticWANConfigs - Array of Domestic WAN link configurations
 * @param services - Services configuration from ExtraConfig
 * @returns RouterConfig with firewall mangle rules
 */
export const ServiceMangle = (
  domesticWANConfigs: WANLinkConfig[],
  services: services | undefined,
): RouterConfig => {
  const config: RouterConfig = {
    "/ip firewall mangle": [],
  };

  // Return empty config if no services defined
  if (!services) {
    return config;
  }

  // Iterate through each Domestic WAN link
  domesticWANConfigs.forEach((wanConfig) => {
    const linkName = wanConfig.name;
    const interfaceName = GetWANInterface(wanConfig);
    const routingMark = `to-Domestic-${linkName}`;
    const connMark = `conn-services-${linkName}`;

    // Collect services by protocol
    const tcpServices: Array<{ name: string; port: number }> = [];
    const udpServices: Array<{ name: string; port: number }> = [];

    // Iterate through each service and collect enabled ones
    Object.entries(services).forEach(([serviceKey, serviceConfig]) => {
      // Only process services that are enabled and have a custom port
      if (serviceConfig.type !== "Enable" || !serviceConfig.port) {
        return;
      }

      const serviceName = serviceNameMap[serviceKey] || serviceKey;
      const port = serviceConfig.port;
      const protocols = serviceProtocols[serviceKey] ?? ["tcp"];

      // Add to appropriate protocol lists
      protocols.forEach((protocol) => {
        if (protocol === "tcp") {
          tcpServices.push({ name: serviceName, port });
        } else if (protocol === "udp") {
          udpServices.push({ name: serviceName, port });
        }
      });
    });

    // Generate TCP rules if any TCP services exist
    if (tcpServices.length > 0) {
      const tcpPorts = tcpServices.map((s) => s.port).join(",");
      const tcpServiceList = tcpServices.map((s) => `${s.name}:${s.port}`).join(", ");

      // Input chain: Mark inbound TCP connections
      const tcpInputRule = [
        `add chain=input in-interface="${interfaceName}"`,
        `protocol=tcp dst-port="${tcpPorts}"`,
        `connection-state=new`,
        `action=mark-connection new-connection-mark="${connMark}"`,
        `comment="Mark inbound services (${tcpServiceList}) on ${linkName}"`,
      ].join(" ");

      config["/ip firewall mangle"].push(tcpInputRule);
    }

    // Generate UDP rules if any UDP services exist
    if (udpServices.length > 0) {
      const udpPorts = udpServices.map((s) => s.port).join(",");
      const udpServiceList = udpServices.map((s) => `${s.name}:${s.port}`).join(", ");

      // Input chain: Mark inbound UDP connections
      const udpInputRule = [
        `add chain=input in-interface="${interfaceName}"`,
        `protocol=udp dst-port="${udpPorts}"`,
        `connection-state=new`,
        `action=mark-connection new-connection-mark="${connMark}"`,
        `comment="Mark inbound services (${udpServiceList}) on ${linkName}"`,
      ].join(" ");

      config["/ip firewall mangle"].push(udpInputRule);
    }

    // Generate single output rule if any services exist (TCP or UDP)
    if (tcpServices.length > 0 || udpServices.length > 0) {
      // Output chain: Route marked connections
      const outputRule = [
        `add chain=output connection-mark="${connMark}"`,
        `action=mark-routing new-routing-mark="${routingMark}"`,
        `passthrough=no`,
        `comment="Route service replies via Domestic-${linkName}"`,
      ].join(" ");

      config["/ip firewall mangle"].push(outputRule);
    }
  });

  return config;
};

