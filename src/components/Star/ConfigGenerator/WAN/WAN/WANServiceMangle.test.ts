// import { describe, it, expect } from "vitest";
// import {
//     testWithOutput,
//     validateRouterConfig,
// } from "~/test-utils/test-helpers";
// import { ServiceMangle } from "./WANServiceMangle";
// import type { WANLinkConfig } from "~/components/Star/StarContext";
// import type { services } from "~/components/Star/StarContext/ExtraType";

// describe("ServiceMangle Module", () => {
//     describe("ServiceMangle", () => {
//         it("should generate mangle rules for single Domestic link with Winbox enabled", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Fiber1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                     },
//                     ConnectionConfig: {
//                         pppoe: {
//                             username: "user",
//                             password: "pass",
//                         },
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Disable" },
//                 apissl: { type: "Disable" },
//                 ftp: { type: "Disable" },
//                 ssh: { type: "Disable" },
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Enable", port: 8291 },
//                 web: { type: "Disable" },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "Single Domestic link with Winbox enabled (custom port)",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             validateRouterConfig(result, ["/ip firewall mangle"]);
//             expect(result["/ip firewall mangle"].length).toBe(2); // input + output rules
//             expect(result["/ip firewall mangle"][0]).toContain("chain=input");
//             expect(result["/ip firewall mangle"][0]).toContain("in-interface=pppoe-client-Fiber1");
//             expect(result["/ip firewall mangle"][0]).toContain("protocol=tcp");
//             expect(result["/ip firewall mangle"][0]).toContain("dst-port=8291");
//             expect(result["/ip firewall mangle"][0]).toContain("connection-state=new");
//             expect(result["/ip firewall mangle"][0]).toContain("action=mark-connection");
//             expect(result["/ip firewall mangle"][0]).toContain("new-connection-mark=conn-Winbox-Fiber1");
//             expect(result["/ip firewall mangle"][0]).toContain("Mark inbound Winbox on Fiber1");

//             expect(result["/ip firewall mangle"][1]).toContain("chain=output");
//             expect(result["/ip firewall mangle"][1]).toContain("connection-mark=conn-Winbox-Fiber1");
//             expect(result["/ip firewall mangle"][1]).toContain("action=mark-routing");
//             expect(result["/ip firewall mangle"][1]).toContain("new-routing-mark=to-Domestic-Fiber1");
//             expect(result["/ip firewall mangle"][1]).toContain("passthrough=no");
//             expect(result["/ip firewall mangle"][1]).toContain("Route Winbox replies via Domestic-Fiber1");
//         });

//         it("should generate mangle rules for multiple Domestic links with multiple services", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Fiber1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                     },
//                     ConnectionConfig: {
//                         pppoe: {
//                             username: "user1",
//                             password: "pass1",
//                         },
//                     },
//                 },
//                 {
//                     name: "Fiber2",
//                     InterfaceConfig: {
//                         InterfaceName: "ether2",
//                     },
//                     ConnectionConfig: {
//                         isDHCP: true,
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Disable" },
//                 apissl: { type: "Disable" },
//                 ftp: { type: "Disable" },
//                 ssh: { type: "Enable", port: 2222 },
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Enable", port: 8291 },
//                 web: { type: "Enable", port: 8080 },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "Multiple Domestic links with multiple services",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             validateRouterConfig(result, ["/ip firewall mangle"]);
//             // 2 links * 3 services * 2 rules per service = 12 rules
//             expect(result["/ip firewall mangle"].length).toBe(12);

//             // Check that rules exist for both links
//             const fiber1Rules = result["/ip firewall mangle"].filter((rule) =>
//                 rule.includes("Fiber1"),
//             );
//             const fiber2Rules = result["/ip firewall mangle"].filter((rule) =>
//                 rule.includes("Fiber2"),
//             );
//             expect(fiber1Rules.length).toBe(6); // 3 services * 2 rules
//             expect(fiber2Rules.length).toBe(6); // 3 services * 2 rules

//             // Check SSH rules
//             const sshInputRule = result["/ip firewall mangle"].find(
//                 (rule) => rule.includes("dst-port=2222") && rule.includes("Fiber1"),
//             );
//             expect(sshInputRule).toContain("protocol=tcp");
//             expect(sshInputRule).toContain("Mark inbound SSH on Fiber1");

//             // Check Winbox rules
//             const winboxOutputRule = result["/ip firewall mangle"].find(
//                 (rule) =>
//                     rule.includes("conn-Winbox-Fiber2") && rule.includes("chain=output"),
//             );
//             expect(winboxOutputRule).toContain("to-Domestic-Fiber2");

//             // Check Web rules
//             const webInputRule = result["/ip firewall mangle"].find(
//                 (rule) => rule.includes("dst-port=8080") && rule.includes("ether2"),
//             );
//             expect(webInputRule).toContain("protocol=tcp");
//         });

//         it("should generate both TCP and UDP rules for FTP service", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Fiber1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                     },
//                     ConnectionConfig: {
//                         pppoe: {
//                             username: "user",
//                             password: "pass",
//                         },
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Disable" },
//                 apissl: { type: "Disable" },
//                 ftp: { type: "Enable", port: 2121 },
//                 ssh: { type: "Disable" },
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Disable" },
//                 web: { type: "Disable" },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "FTP service (should generate both TCP and UDP rules)",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             validateRouterConfig(result, ["/ip firewall mangle"]);
//             // FTP: 2 protocols * 2 rules per protocol = 4 rules
//             expect(result["/ip firewall mangle"].length).toBe(4);

//             // Check TCP rules
//             const tcpInputRule = result["/ip firewall mangle"].find(
//                 (rule) => rule.includes("protocol=tcp") && rule.includes("chain=input"),
//             );
//             expect(tcpInputRule).toBeDefined();
//             expect(tcpInputRule).toContain("dst-port=2121");
//             expect(tcpInputRule).toContain("Mark inbound FTP on Fiber1");

//             // Check UDP rules
//             const udpInputRule = result["/ip firewall mangle"].find(
//                 (rule) => rule.includes("protocol=udp") && rule.includes("chain=input"),
//             );
//             expect(udpInputRule).toBeDefined();
//             expect(udpInputRule).toContain("dst-port=2121");
//             expect(udpInputRule).toContain("Mark inbound FTP on Fiber1");

//             // Check output rules for both protocols
//             const tcpOutputRule = result["/ip firewall mangle"].find(
//                 (rule) =>
//                     rule.includes("conn-FTP-Fiber1") &&
//                     rule.includes("chain=output") &&
//                     !rule.includes("protocol"),
//             );
//             expect(tcpOutputRule).toBeDefined();
//         });

//         it("should skip services with type Local", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Fiber1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Local", port: 8728 },
//                 apissl: { type: "Disable" },
//                 ftp: { type: "Disable" },
//                 ssh: { type: "Local", port: 22 },
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Disable" },
//                 web: { type: "Disable" },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "Services with type Local (should be skipped)",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             expect(result["/ip firewall mangle"]).toBeDefined();
//             expect(result["/ip firewall mangle"].length).toBe(0);
//         });

//         it("should skip services with type Disable", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Fiber1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Disable" },
//                 apissl: { type: "Disable" },
//                 ftp: { type: "Disable" },
//                 ssh: { type: "Disable" },
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Disable" },
//                 web: { type: "Disable" },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "All services disabled (should generate no rules)",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             expect(result["/ip firewall mangle"]).toBeDefined();
//             expect(result["/ip firewall mangle"].length).toBe(0);
//         });

//         it("should skip services without explicit custom ports", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Fiber1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Enable" }, // No port specified
//                 apissl: { type: "Enable" }, // No port specified
//                 ftp: { type: "Disable" },
//                 ssh: { type: "Enable", port: 2222 }, // Has port
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Disable" },
//                 web: { type: "Disable" },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "Services without explicit custom ports (should be skipped)",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             validateRouterConfig(result, ["/ip firewall mangle"]);
//             // Only SSH should have rules
//             expect(result["/ip firewall mangle"].length).toBe(2);
//             expect(result["/ip firewall mangle"][0]).toContain("dst-port=2222");
//             expect(result["/ip firewall mangle"][0]).toContain("SSH");
//         });

//         it("should return empty config for undefined services", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Fiber1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                     },
//                 },
//             ];

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "Undefined services object",
//                 { domesticWANConfigs, services: undefined },
//                 () => ServiceMangle(domesticWANConfigs, undefined),
//             );

//             expect(result["/ip firewall mangle"]).toBeDefined();
//             expect(result["/ip firewall mangle"].length).toBe(0);
//         });

//         it("should return empty config for empty WANConfigs array", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [];

//             const testServices: services = {
//                 api: { type: "Disable" },
//                 apissl: { type: "Disable" },
//                 ftp: { type: "Disable" },
//                 ssh: { type: "Disable" },
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Enable", port: 8291 },
//                 web: { type: "Disable" },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "Empty WANConfigs array",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             expect(result["/ip firewall mangle"]).toBeDefined();
//             expect(result["/ip firewall mangle"].length).toBe(0);
//         });

//         it("should handle all services enabled with different ports", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Fiber1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                     },
//                     ConnectionConfig: {
//                         pppoe: {
//                             username: "user",
//                             password: "pass",
//                         },
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Enable", port: 8728 },
//                 apissl: { type: "Enable", port: 8729 },
//                 ftp: { type: "Enable", port: 21 },
//                 ssh: { type: "Enable", port: 22 },
//                 telnet: { type: "Enable", port: 23 },
//                 winbox: { type: "Enable", port: 8291 },
//                 web: { type: "Enable", port: 80 },
//                 webssl: { type: "Enable", port: 443 },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "All services enabled with different ports",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             validateRouterConfig(result, ["/ip firewall mangle"]);
//             // 8 services, but FTP has 2 protocols = (7 * 2) + (1 * 4) = 18 rules
//             expect(result["/ip firewall mangle"].length).toBe(18);

//             // Verify all service names appear in rules
//             const allRules = result["/ip firewall mangle"].join(" ");
//             expect(allRules).toContain("API");
//             expect(allRules).toContain("API-SSL");
//             expect(allRules).toContain("FTP");
//             expect(allRules).toContain("SSH");
//             expect(allRules).toContain("Telnet");
//             expect(allRules).toContain("Winbox");
//             expect(allRules).toContain("Web");
//             expect(allRules).toContain("Web-SSL");
//         });

//         it("should handle DHCP interface without PPPoE", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "Cable1",
//                     InterfaceConfig: {
//                         InterfaceName: "ether2",
//                     },
//                     ConnectionConfig: {
//                         isDHCP: true,
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Disable" },
//                 apissl: { type: "Disable" },
//                 ftp: { type: "Disable" },
//                 ssh: { type: "Enable", port: 2222 },
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Disable" },
//                 web: { type: "Disable" },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "DHCP interface (ether2) with SSH service",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             validateRouterConfig(result, ["/ip firewall mangle"]);
//             expect(result["/ip firewall mangle"].length).toBe(2);
//             expect(result["/ip firewall mangle"][0]).toContain("in-interface=ether2");
//             expect(result["/ip firewall mangle"][0]).toContain("dst-port=2222");
//             expect(result["/ip firewall mangle"][1]).toContain("to-Domestic-Cable1");
//         });

//         it("should handle VLAN interface with service", () => {
//             const domesticWANConfigs: WANLinkConfig[] = [
//                 {
//                     name: "VLAN100",
//                     InterfaceConfig: {
//                         InterfaceName: "ether1",
//                         VLANID: "100",
//                     },
//                     ConnectionConfig: {
//                         pppoe: {
//                             username: "user",
//                             password: "pass",
//                         },
//                     },
//                 },
//             ];

//             const testServices: services = {
//                 api: { type: "Disable" },
//                 apissl: { type: "Disable" },
//                 ftp: { type: "Disable" },
//                 ssh: { type: "Disable" },
//                 telnet: { type: "Disable" },
//                 winbox: { type: "Enable", port: 8291 },
//                 web: { type: "Disable" },
//                 webssl: { type: "Disable" },
//             };

//             const result = testWithOutput(
//                 "ServiceMangle",
//                 "VLAN interface with Winbox service",
//                 { domesticWANConfigs, services: testServices },
//                 () => ServiceMangle(domesticWANConfigs, testServices),
//             );

//             validateRouterConfig(result, ["/ip firewall mangle"]);
//             expect(result["/ip firewall mangle"].length).toBe(2);
//             expect(result["/ip firewall mangle"][0]).toContain("in-interface=pppoe-client-VLAN100");
//             expect(result["/ip firewall mangle"][1]).toContain("to-Domestic-VLAN100");
//         });
//     });
// });

