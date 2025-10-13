// import type { RouterConfig } from "~/components/Star/ConfigGenerator";
// import type { DNSConfig } from "~/components/Star/StarContext";

// /**
//  * Generate DNS configuration for MikroTik RouterOS
//  * @param dnsConfig - DNS configuration object
//  * @param domesticLink - Whether domestic link is enabled
//  * @returns RouterConfig with DNS settings
//  */
// export const DNSCG = (
//     dnsConfig: DNSConfig,
//     domesticLink: boolean,
// ): RouterConfig => {
//     const config: RouterConfig = {
//         "/ip dns": [],
//         "/ip dns static": [],
//         "/ip firewall mangle": [],
//         "/ip route": [],
//     };

//     // Basic DNS settings
//     const dnsServers: string[] = [];

//     // Always add Foreign and VPN DNS
//     if (dnsConfig.ForeignDNS) {
//         dnsServers.push(dnsConfig.ForeignDNS);
//     }
//     if (dnsConfig.VPNDNS) {
//         dnsServers.push(dnsConfig.VPNDNS);
//     }

//     // Add Domestic and Split DNS if domestic link is enabled
//     if (domesticLink) {
//         if (dnsConfig.DomesticDNS) {
//             dnsServers.push(dnsConfig.DomesticDNS);
//         }
//         if (dnsConfig.SplitDNS) {
//             dnsServers.push(dnsConfig.SplitDNS);
//         }
//     }

//     // Configure main DNS settings
//     if (dnsServers.length > 0) {
//         config["/ip dns"].push(
//             `set servers=${dnsServers.join(",")} allow-remote-requests=yes cache-size=4096KiB cache-max-ttl=1d use-doh-server="" verify-doh-cert=no`,
//         );
//     }

//     // Network-specific DNS routing rules
//     if (dnsConfig.ForeignDNS) {
//         // Route DNS queries from Foreign network (192.168.10.0/24) to Foreign DNS
//         config["/ip firewall mangle"].push(
//             `add action=mark-routing chain=prerouting comment="DNS-Foreign-Network" disabled=no dst-address=${dnsConfig.ForeignDNS}/32 new-routing-mark=to-FRN passthrough=no src-address=192.168.10.0/24`,
//         );
//     }

//     if (dnsConfig.VPNDNS) {
//         // Route DNS queries from VPN network (192.168.40.0/24) to VPN DNS
//         config["/ip firewall mangle"].push(
//             `add action=mark-routing chain=prerouting comment="DNS-VPN-Network" disabled=no dst-address=${dnsConfig.VPNDNS}/32 new-routing-mark=to-FRN passthrough=no src-address=192.168.40.0/24`,
//         );
//     }

//     if (domesticLink) {
//         if (dnsConfig.DomesticDNS) {
//             // Route DNS queries from Domestic network (192.168.20.0/24) to Domestic DNS
//             config["/ip firewall mangle"].push(
//                 `add action=mark-routing chain=prerouting comment="DNS-Domestic-Network" disabled=no dst-address=${dnsConfig.DomesticDNS}/32 new-routing-mark=to-DOM passthrough=no src-address=192.168.20.0/24`,
//             );
//         }

//         if (dnsConfig.SplitDNS) {
//             // Route DNS queries from Split network (192.168.30.0/24) to Split DNS
//             config["/ip firewall mangle"].push(
//                 `add action=mark-routing chain=prerouting comment="DNS-Split-Network" disabled=no dst-address=${dnsConfig.SplitDNS}/32 new-routing-mark=to-DOM passthrough=no src-address=192.168.30.0/24`,
//             );
//         }

//         // DNS over HTTPS (DOH) configuration for Domestic network
//         if (dnsConfig.DOH?.domain) {
//             const dohDomain = dnsConfig.DOH.domain;
//             const bindingIP = dnsConfig.DOH.bindingIP || "192.168.20.1";

//             // Update main DNS configuration to enable DOH
//             config["/ip dns"] = [
//                 `set servers=${dnsServers.join(",")} allow-remote-requests=yes cache-size=4096KiB cache-max-ttl=1d use-doh-server="https://${dohDomain}/dns-query" verify-doh-cert=yes`,
//             ];

//             // Add static DNS entry for DOH domain to prevent circular dependency
//             config["/ip dns static"].push(
//                 `add address=${bindingIP} name="${dohDomain}" comment="DOH-Domain-Static-Entry"`,
//             );

//             // Route DOH traffic through domestic link
//             config["/ip firewall mangle"].push(
//                 `add action=mark-routing chain=prerouting comment="DOH-Traffic-Domestic" disabled=no dst-address=${bindingIP}/32 new-routing-mark=to-DOM passthrough=no protocol=tcp dst-port=443`,
//             );
//         }
//     }

//     // Add DNS forwarding rules for better performance
//     config["/ip dns static"].push(
//         'add address=192.168.10.1 name="router.local" comment="Local-Router-Access"',
//         'add address=192.168.10.1 name="mikrotik.local" comment="Local-Router-Access"',
//     );

//     return config;
// };

// /**
//  * Generate DNS configuration test output for validation
//  * @param dnsConfig - DNS configuration object
//  * @param domesticLink - Whether domestic link is enabled
//  * @returns Formatted test output
//  */
// export const DNSCGTest = (
//     dnsConfig: DNSConfig,
//     domesticLink: boolean,
// ): string => {
//     const config = DNSCG(dnsConfig, domesticLink);

//     let output = "=== DNS Configuration Test Output ===\n\n";

//     // DNS Servers
//     output += "DNS Servers Configured:\n";
//     output += `- Foreign DNS: ${dnsConfig.ForeignDNS || "Not set"}\n`;
//     output += `- VPN DNS: ${dnsConfig.VPNDNS || "Not set"}\n`;

//     if (domesticLink) {
//         output += `- Domestic DNS: ${dnsConfig.DomesticDNS || "Not set"}\n`;
//         output += `- Split DNS: ${dnsConfig.SplitDNS || "Not set"}\n`;

//         if (dnsConfig.DOH?.domain) {
//             output += `- DOH Domain: ${dnsConfig.DOH.domain}\n`;
//             output += `- DOH Binding IP: ${dnsConfig.DOH.bindingIP || "192.168.20.1"}\n`;
//         }
//     }

//     output += "\n=== Generated MikroTik Commands ===\n\n";

//     // Output all commands
//     Object.entries(config).forEach(([section, commands]) => {
//         if (commands.length > 0) {
//             output += `${section}\n`;
//             commands.forEach((cmd) => {
//                 output += `  ${cmd}\n`;
//             });
//             output += "\n";
//         }
//     });

//     return output;
// };
