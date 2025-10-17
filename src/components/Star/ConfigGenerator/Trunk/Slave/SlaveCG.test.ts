// /**
//  * SlaveCG Integration Tests
//  *
//  * This file contains integration tests for the main SlaveCG function,
//  * focusing on end-to-end configuration generation and complex scenarios.
//  *
//  * For detailed unit tests of individual utility functions, see:
//  * @see SlaveUtils.test.ts - Unit tests for utility functions like:
//  *   - createBridgesForNetworks
//  *   - commentTrunkInterface
//  *   - createVLANsOnTrunkInterface
//  *   - addVLANsToBridges
//  *   - createDHCPClientsOnBridges
//  *   - SlaveExtraCG
//  *   - addSlaveInterfacesToBridge
//  *   - configureSlaveWireless
//  */
// import { describe, it, expect } from "vitest";
// import { SlaveCG } from "./Slave";
// import { testWithOutput, validateRouterConfig } from "~/test-utils/test-helpers";
// import type {
//     RouterModels,
//     WirelessConfig,
//     Subnets,
//     ExtraConfigState
// } from "~/components/Star/StarContext";

// describe("SlaveCG - Slave Router Configuration Generator (Integration Tests)", () => {
//     // ============================================================================
//     // Helper Functions
//     // ============================================================================

//     /**
//      * Creates a base slave router configuration
//      */
//     const createSlaveRouter = (overrides?: Partial<RouterModels>): RouterModels => ({
//         isMaster: false,
//         Model: "hAP ax3",
//         MasterSlaveInterface: "ether1",
//         Interfaces: {
//             Interfaces: {
//                 ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
//                 wireless: ["wifi5", "wifi2.4"],
//             },
//             OccupiedInterfaces: [],
//         },
//         ...overrides,
//     });

//     /**
//      * Creates base subnets configuration with actual subnet addresses
//      */
//     const createBaseSubnets = (): Subnets => ({
//         BaseNetworks: {
//             Split: { name: "Split", subnet: "192.168.10.0/24" },
//             Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//             Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
//             VPN: { name: "VPN", subnet: "192.168.40.0/24" },
//         },
//     });

//     /**
//      * Creates a minimal ExtraConfig state
//      */
//     const _createBaseExtraConfig = (): ExtraConfigState => ({
//         RUI: {
//             Timezone: "Asia/Tehran",
//             IPAddressUpdate: {
//                 interval: "",
//                 time: "",
//             },
//         },
//     });

//     /**
//      * Creates a wireless config for testing
//      */
//     const createWirelessConfig = (overrides?: Partial<WirelessConfig>): WirelessConfig => ({
//         SSID: "TestNetwork",
//         Password: "TestPassword123",
//         isHide: false,
//         isDisabled: false,
//         SplitBand: false,
//         WifiTarget: "Split",
//         NetworkName: "",
//         ...overrides,
//     });

//     // ============================================================================
//     // Validation Tests
//     // ============================================================================

//     describe("Validation", () => {
//         it("should throw error when router is master (isMaster === true)", () => {
//             const masterRouter = createSlaveRouter({ isMaster: true });

//             expect(() => SlaveCG(masterRouter)).toThrow(
//                 "SlaveCG can only generate configuration for slave routers (isMaster must be false)"
//             );
//         });

//         it("should return empty config when slave has no trunk interface", () => {
//             const slaveRouter = createSlaveRouter({ MasterSlaveInterface: undefined });

//             const result = SlaveCG(slaveRouter);
//             expect(Object.keys(result).length).toBe(0);
//         });

//         it("should generate config when valid slave router with trunk interface", () => {
//             const slaveRouter = createSlaveRouter();
//             const subnets = createBaseSubnets();

//             const result = SlaveCG(slaveRouter, subnets);

//             // Should have at least basic configuration
//             expect(Object.keys(result).length).toBeGreaterThan(0);
//         });
//     });

//     // ============================================================================
//     // Complex Scenario Tests
//     // ============================================================================

//     describe("Complex Scenarios", () => {
//         it("should generate complete configuration with all network types", () => {
//             const slaveRouter = createSlaveRouter();
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                 },
//                 ForeignNetworks: [
//                     { name: "Gaming", subnet: "192.168.31.0/24" },
//                 ],
//                 VPNClientNetworks: {
//                     Wireguard: [
//                         { name: "WG-US", subnet: "192.168.50.0/24" },
//                     ],
//                 },
//             };
//             const wirelessConfigs = [createWirelessConfig({ WifiTarget: "Split" })];

//             testWithOutput(
//                 "SlaveCG",
//                 "Complete configuration with mixed network types and wireless",
//                 {
//                     BaseNetworks: ["Split", "Domestic"],
//                     ForeignNetworks: ["Gaming"],
//                     VPNClientNetworks: ["Wireguard WG-US"],
//                     Wireless: "1 SSID",
//                 },
//                 () => SlaveCG(slaveRouter, subnets, wirelessConfigs)
//             );

//             const result = SlaveCG(slaveRouter, subnets, wirelessConfigs);

//             // Validate all major sections
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface vlan",
//                 "/interface bridge port",
//                 "/ip dhcp-client",
//             ]);

//             // 2 base + 1 foreign + 1 VPN = 4 bridges
//             expect(result["/interface bridge"].length).toBe(4);
//             // 2 base + 1 foreign + 1 VPN = 4 VLANs
//             expect(result["/interface vlan"].length).toBe(4);
//         });

//         it("should handle maximum configuration complexity", () => {
//             const slaveRouter = createSlaveRouter({
//                 Interfaces: {
//                     Interfaces: {
//                         ethernet: ["ether1", "ether2", "ether3", "ether4", "ether5"],
//                         wireless: ["wifi5", "wifi2.4"],
//                         sfp: ["sfp1", "sfp2"],
//                     },
//                     OccupiedInterfaces: [],
//                 },
//             });
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                     Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
//                     VPN: { name: "VPN", subnet: "192.168.40.0/24" },
//                 },
//                 ForeignNetworks: [
//                     { name: "Gaming", subnet: "192.168.31.0/24" },
//                     { name: "Streaming", subnet: "192.168.32.0/24" },
//                 ],
//                 DomesticNetworks: [
//                     { name: "Office", subnet: "192.168.21.0/24" },
//                 ],
//                 VPNClientNetworks: {
//                     Wireguard: [{ name: "WG1", subnet: "192.168.50.0/24" }],
//                     OpenVPN: [{ name: "OVPN1", subnet: "192.168.60.0/24" }],
//                 },
//             };
//             const wirelessConfigs = [
//                 createWirelessConfig({ SSID: "Network1", WifiTarget: "Split" }),
//                 createWirelessConfig({ SSID: "Network2", WifiTarget: "Split" }),
//             ];
//             const extraConfig: ExtraConfigState = {
//                 RouterIdentityRomon: {
//                     RouterIdentity: "SlaveRouter",
//                     isRomon: true,
//                 },
//                 services: {
//                     api: { type: "Disable" },
//                     apissl: { type: "Disable" },
//                     ftp: { type: "Disable" },
//                     ssh: { type: "Enable", port: 22 },
//                     telnet: { type: "Disable" },
//                     winbox: { type: "Enable", port: 8291 },
//                     web: { type: "Local", port: 80 },
//                     webssl: { type: "Enable", port: 443 },
//                 },
//                 RUI: {
//                     Timezone: "Asia/Tehran",
//                     Reboot: {
//                         interval: "Weekly",
//                         time: "03:00:00",
//                     },
//                     Update: {
//                         interval: "Weekly",
//                         time: "04:00:00",
//                     },
//                     IPAddressUpdate: { interval: "", time: "" },
//                 },
//             };

//             testWithOutput(
//                 "SlaveCG",
//                 "Maximum complexity: All features enabled",
//                 {
//                     BaseNetworks: 4,
//                     ForeignNetworks: 2,
//                     DomesticNetworks: 1,
//                     VPNClientNetworks: 2,
//                     WirelessSSIDs: 2,
//                     EthernetPorts: 4,
//                     SFPPorts: 2,
//                     ExtraServices: "All configured",
//                 },
//                 () => SlaveCG(slaveRouter, subnets, wirelessConfigs, extraConfig)
//             );

//             const result = SlaveCG(slaveRouter, subnets, wirelessConfigs, extraConfig);

//             // Validate comprehensive configuration
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface vlan",
//                 "/interface bridge port",
//                 "/ip dhcp-client",
//                 "/system identity",
//                 "/tool romon",
//             ]);

//             // 4 base + 2 foreign + 1 domestic + 2 VPN = 9 bridges
//             expect(result["/interface bridge"].length).toBe(9);
//             // Same for VLANs
//             expect(result["/interface vlan"].length).toBe(9);
//         });

//         it("should handle minimal configuration (only Split network)", () => {
//             const slaveRouter = createSlaveRouter();
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                 },
//             };

//             const result = SlaveCG(slaveRouter, subnets);

//             // Minimal but complete configuration
//             expect(result["/interface bridge"].length).toBe(1);
//             expect(result["/interface vlan"].length).toBe(1);
//             expect(result["/ip dhcp-client"].length).toBe(1);
//         });

//         it("should handle configuration with no subnets", () => {
//             const slaveRouter = createSlaveRouter();

//             const result = SlaveCG(slaveRouter);

//             // Should only have trunk interface comment
//             expect(result["/interface ethernet"]).toBeDefined();
//             expect(result["/interface ethernet"]).toContain('comment="Trunk Interface"');

//             // But no network-specific configuration
//             expect(result["/interface bridge"]).toBeUndefined();
//             expect(result["/interface vlan"]).toBeUndefined();
//         });
//     });
// });
