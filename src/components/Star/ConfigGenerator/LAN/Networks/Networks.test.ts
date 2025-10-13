// import { describe, it } from "vitest";
// import {
//     NetworkBaseGenerator,
//     DomesticBase,
//     ForeignBase,
//     VPNBase,
//     SplitBase,
//     addNetwork,
//     addNetworks,
//     Networks,
//     TunnelNetworkBaseGenerator,
// } from "./Networks";
// import { testWithOutput, validateRouterConfig, } from "~/test-utils/test-helpers";
// import type { Subnets, WANLinks, VPNClient } from "~/components/Star/StarContext";

// describe("Networks Module Tests", () => {

//     describe("NetworkBaseGenerator Function", () => {
//         it("should generate base network configuration for Split network", () => {
//             testWithOutput(
//                 "NetworkBaseGenerator",
//                 "Generate Split network configuration",
//                 { NetworkName: "Split", Subnet: "192.168.10.0/24" },
//                 () => NetworkBaseGenerator("Split", "192.168.10.0/24"),
//             );

//             const result = NetworkBaseGenerator("Split", "192.168.10.0/24");
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip route",
//             ]);
//         });

//         it("should generate base network configuration for Domestic network", () => {
//             testWithOutput(
//                 "NetworkBaseGenerator",
//                 "Generate Domestic network configuration",
//                 { NetworkName: "Domestic", Subnet: "192.168.20.0/24" },
//                 () => NetworkBaseGenerator("Domestic", "192.168.20.0/24"),
//             );

//             const result = NetworkBaseGenerator("Domestic", "192.168.20.0/24");
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip route",
//             ]);
//         });

//         it("should generate base network configuration for Foreign network", () => {
//             testWithOutput(
//                 "NetworkBaseGenerator",
//                 "Generate Foreign network configuration",
//                 { NetworkName: "Foreign", Subnet: "192.168.30.0/24" },
//                 () => NetworkBaseGenerator("Foreign", "192.168.30.0/24"),
//             );

//             const result = NetworkBaseGenerator("Foreign", "192.168.30.0/24");
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip route",
//             ]);
//         });

//         it("should generate base network configuration for VPN network", () => {
//             testWithOutput(
//                 "NetworkBaseGenerator",
//                 "Generate VPN network configuration",
//                 { NetworkName: "VPN", Subnet: "192.168.40.0/24" },
//                 () => NetworkBaseGenerator("VPN", "192.168.40.0/24"),
//             );

//             const result = NetworkBaseGenerator("VPN", "192.168.40.0/24");
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip route",
//             ]);
//         });

//         it("should generate configuration for custom network names", () => {
//             testWithOutput(
//                 "NetworkBaseGenerator",
//                 "Generate configuration with custom network name",
//                 { NetworkType: "Foreign", NetworkName: "CustomNetwork", Subnet: "172.16.0.0/16" },
//                 () => NetworkBaseGenerator("Foreign", "172.16.0.0/16", "CustomNetwork"),
//             );

//             const result = NetworkBaseGenerator("Foreign", "172.16.0.0/16", "CustomNetwork");
//             validateRouterConfig(result);
//         });

//         it("should handle different subnet sizes", () => {
//             const testCases = [
//                 { name: "Large", subnet: "10.0.0.0/8" },
//                 { name: "Medium", subnet: "172.16.0.0/12" },
//                 { name: "Small", subnet: "192.168.1.0/24" },
//             ];

//             testCases.forEach((testCase) => {
//                 testWithOutput(
//                     "NetworkBaseGenerator",
//                     `Generate configuration for ${testCase.name} network`,
//                     { NetworkType: "Foreign", NetworkName: testCase.name, Subnet: testCase.subnet },
//                     () => NetworkBaseGenerator("Foreign", testCase.subnet, testCase.name),
//                 );

//                 const result = NetworkBaseGenerator("Foreign", testCase.subnet, testCase.name);
//                 validateRouterConfig(result);
//             });
//         });
//     });

//     describe("Base Network Functions", () => {
//         it("should generate DomesticBase configuration with mangle rules", () => {
//             testWithOutput(
//                 "DomesticBase",
//                 "Generate domestic base configuration with mangle rules",
//                 { NetworkName: "Domestic", Subnet: "192.168.20.0/24", skipMangle: false },
//                 () => DomesticBase("Domestic", "192.168.20.0/24", false),
//             );

//             const result = DomesticBase("Domestic", "192.168.20.0/24", false);
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//                 "/ip route",
//             ]);
//         });

//         it("should generate DomesticBase configuration without mangle rules when skipMangle=true", () => {
//             testWithOutput(
//                 "DomesticBase",
//                 "Generate domestic base configuration without mangle rules",
//                 { NetworkName: "Domestic", Subnet: "192.168.20.0/24", skipMangle: true },
//                 () => DomesticBase("Domestic", "192.168.20.0/24", true),
//             );

//             const result = DomesticBase("Domestic", "192.168.20.0/24", true);
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip route",
//             ]);
//         });

//         it("should generate ForeignBase configuration with mangle rules", () => {
//             testWithOutput(
//                 "ForeignBase",
//                 "Generate foreign base configuration with mangle rules",
//                 { NetworkName: "Foreign", Subnet: "192.168.30.0/24", skipMangle: false },
//                 () => ForeignBase("Foreign", "192.168.30.0/24", false),
//             );

//             const result = ForeignBase("Foreign", "192.168.30.0/24", false);
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//                 "/ip route",
//             ]);
//         });

//         it("should generate ForeignBase configuration without mangle rules when skipMangle=true", () => {
//             testWithOutput(
//                 "ForeignBase",
//                 "Generate foreign base configuration without mangle rules",
//                 { NetworkName: "Foreign", Subnet: "192.168.30.0/24", skipMangle: true },
//                 () => ForeignBase("Foreign", "192.168.30.0/24", true),
//             );

//             const result = ForeignBase("Foreign", "192.168.30.0/24", true);
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip route",
//             ]);
//         });

//         it("should generate VPNBase configuration with mangle rules", () => {
//             testWithOutput(
//                 "VPNBase",
//                 "Generate VPN base configuration with mangle rules",
//                 { NetworkName: "VPN", Subnet: "192.168.40.0/24", skipMangle: false },
//                 () => VPNBase("VPN", "192.168.40.0/24", false),
//             );

//             const result = VPNBase("VPN", "192.168.40.0/24", false);
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//                 "/ip route",
//             ]);
//         });

//         it("should generate VPNBase configuration without mangle rules when skipMangle=true", () => {
//             testWithOutput(
//                 "VPNBase",
//                 "Generate VPN base configuration without mangle rules",
//                 { NetworkName: "VPN", Subnet: "192.168.40.0/24", skipMangle: true },
//                 () => VPNBase("VPN", "192.168.40.0/24", true),
//             );

//             const result = VPNBase("VPN", "192.168.40.0/24", true);
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip route",
//             ]);
//         });

//         it("should generate SplitBase configuration with routing marks", () => {
//             testWithOutput(
//                 "SplitBase",
//                 "Generate split base configuration with firewall mangle rules",
//                 { NetworkName: "Split", Subnet: "192.168.10.0/24" },
//                 () => SplitBase("Split", "192.168.10.0/24"),
//             );

//             const result = SplitBase("Split", "192.168.10.0/24");
//             validateRouterConfig(result, [
//                 "/interface bridge",
//                 "/interface list",
//                 "/ip pool",
//                 "/ip dhcp-server",
//                 "/ip dhcp-server network",
//                 "/ip address",
//                 "/routing table",
//                 "/interface list member",
//                 "/ip firewall address-list",
//                 "/ip firewall mangle",
//                 "/ip route",
//             ]);
//         });
//     });

//     describe("Helper Functions", () => {
//         describe("addNetwork", () => {
//             it("should generate network configuration using DomesticBase generator", () => {
//                 const network = { name: "MyDomestic", subnet: "192.168.100.0/24" };

//                 testWithOutput(
//                     "addNetwork",
//                     "Generate network with DomesticBase generator",
//                     { network, defaultName: "Domestic", generator: "DomesticBase", skipMangle: false },
//                     () => addNetwork(network, "Domestic", DomesticBase, false),
//                 );

//                 const result = addNetwork(network, "Domestic", DomesticBase, false);
//                 validateRouterConfig(result, [
//                     "/interface bridge",
//                     "/interface list",
//                     "/ip pool",
//                     "/ip dhcp-server",
//                     "/ip dhcp-server network",
//                     "/ip address",
//                     "/routing table",
//                     "/interface list member",
//                     "/ip firewall address-list",
//                     "/ip firewall mangle",
//                     "/ip route",
//                 ]);
//             });

//             it("should use default name when network name is empty", () => {
//                 const network = { name: "", subnet: "192.168.50.0/24" };

//                 testWithOutput(
//                     "addNetwork",
//                     "Use default name for network without name",
//                     { network, defaultName: "DefaultNetwork" },
//                     () => addNetwork(network, "DefaultNetwork", TunnelNetworkBaseGenerator),
//                 );

//                 const result = addNetwork(network, "DefaultNetwork", TunnelNetworkBaseGenerator);
//                 validateRouterConfig(result);
//             });

//             it("should return empty config when subnet is empty", () => {
//                 const network = { name: "TestNet", subnet: "" };

//                 testWithOutput(
//                     "addNetwork",
//                     "Return empty config for network without subnet",
//                     { network, defaultName: "Test" },
//                     () => addNetwork(network, "Test", TunnelNetworkBaseGenerator),
//                 );

//                 const result = addNetwork(network, "Test", TunnelNetworkBaseGenerator);
//                 validateRouterConfig(result);
//             });

//             it("should work with different generator functions", () => {
//                 const network = { name: "TestSplit", subnet: "10.0.0.0/24" };

//                 testWithOutput(
//                     "addNetwork",
//                     "Generate split network configuration",
//                     { network, defaultName: "Split", generator: "SplitBase" },
//                     () => addNetwork(network, "Split", SplitBase),
//                 );

//                 const result = addNetwork(network, "Split", SplitBase);
//                 validateRouterConfig(result, ["/ip firewall mangle"]);
//             });

//             it("should work with VPNBase generator", () => {
//                 const network = { name: "VPN-Main", subnet: "10.10.0.0/24" };

//                 testWithOutput(
//                     "addNetwork",
//                     "Generate VPN network configuration",
//                     { network, defaultName: "VPN", generator: "VPNBase", skipMangle: false },
//                     () => addNetwork(network, "VPN", VPNBase, false),
//                 );

//                 const result = addNetwork(network, "VPN", VPNBase, false);
//                 validateRouterConfig(result, ["/ip firewall mangle"]);
//             });

//             it("should work with ForeignBase generator", () => {
//                 const network = { name: "Foreign-Office", subnet: "192.168.200.0/24" };

//                 testWithOutput(
//                     "addNetwork",
//                     "Generate foreign network configuration",
//                     { network, defaultName: "Foreign", generator: "ForeignBase", skipMangle: false },
//                     () => addNetwork(network, "Foreign", ForeignBase, false),
//                 );

//                 const result = addNetwork(network, "Foreign", ForeignBase, false);
//                 validateRouterConfig(result, ["/ip firewall mangle"]);
//             });

//             it("should skip mangle rules when skipMangle=true", () => {
//                 const network = { name: "Foreign-Office", subnet: "192.168.200.0/24" };

//                 testWithOutput(
//                     "addNetwork",
//                     "Generate foreign network configuration without mangle rules",
//                     { network, defaultName: "Foreign", generator: "ForeignBase", skipMangle: true },
//                     () => addNetwork(network, "Foreign", ForeignBase, true),
//                 );

//                 const result = addNetwork(network, "Foreign", ForeignBase, true);
//                 validateRouterConfig(result);
//             });
//         });

//         describe("addNetworks", () => {
//             it("should generate configurations for multiple networks", () => {
//                 const networks = [
//                     { name: "Net1", subnet: "192.168.1.0/24" },
//                     { name: "Net2", subnet: "192.168.2.0/24" },
//                     { name: "Net3", subnet: "192.168.3.0/24" },
//                 ];

//                 testWithOutput(
//                     "addNetworks",
//                     "Generate multiple network configurations",
//                     { networks, namePrefix: "TestNet", networkType: "Foreign" },
//                     () => addNetworks(networks, "TestNet", "Foreign"),
//                 );

//                 const result = addNetworks(networks, "TestNet", "Foreign");
//                 validateRouterConfig(result);
//             });

//             it("should auto-name networks without names", () => {
//                 const networks = [
//                     { name: "", subnet: "10.0.1.0/24" },
//                     { name: "", subnet: "10.0.2.0/24" },
//                     { name: "", subnet: "10.0.3.0/24" },
//                 ];

//                 testWithOutput(
//                     "addNetworks",
//                     "Auto-name networks using prefix and index",
//                     { networks, namePrefix: "Auto", networkType: "Domestic" },
//                     () => addNetworks(networks, "Auto", "Domestic"),
//                 );

//                 const result = addNetworks(networks, "Auto", "Domestic");
//                 validateRouterConfig(result);
//             });

//             it("should filter out networks with empty subnets", () => {
//                 const networks = [
//                     { name: "Valid1", subnet: "10.1.0.0/24" },
//                     { name: "Invalid", subnet: "" },
//                     { name: "Valid2", subnet: "10.2.0.0/24" },
//                 ];

//                 testWithOutput(
//                     "addNetworks",
//                     "Filter networks with empty subnets",
//                     { networks, namePrefix: "Mixed", networkType: "VPN" },
//                     () => addNetworks(networks, "Mixed", "VPN"),
//                 );

//                 const result = addNetworks(networks, "Mixed", "VPN");
//                 validateRouterConfig(result);
//             });

//             it("should return empty config for empty array", () => {
//                 const networks: { name: string; subnet: string }[] = [];

//                 testWithOutput(
//                     "addNetworks",
//                     "Return empty config for empty network array",
//                     { networks, namePrefix: "Empty", networkType: "Foreign" },
//                     () => addNetworks(networks, "Empty", "Foreign"),
//                 );

//                 const result = addNetworks(networks, "Empty", "Foreign");
//                 validateRouterConfig(result);
//             });

//             it("should handle mix of named and unnamed networks", () => {
//                 const networks = [
//                     { name: "Custom-1", subnet: "172.16.1.0/24" },
//                     { name: "", subnet: "172.16.2.0/24" },
//                     { name: "Custom-3", subnet: "172.16.3.0/24" },
//                     { name: "", subnet: "172.16.4.0/24" },
//                 ];

//                 testWithOutput(
//                     "addNetworks",
//                     "Handle mix of custom and auto-named networks",
//                     { networks, namePrefix: "Mixed", networkType: "Split" },
//                     () => addNetworks(networks, "Mixed", "Split"),
//                 );

//                 const result = addNetworks(networks, "Mixed", "Split");
//                 validateRouterConfig(result);
//             });

//             it("should generate correct sequential names", () => {
//                 const networks = [
//                     { name: "", subnet: "10.50.1.0/24" },
//                     { name: "", subnet: "10.50.2.0/24" },
//                     { name: "", subnet: "10.50.3.0/24" },
//                     { name: "", subnet: "10.50.4.0/24" },
//                     { name: "", subnet: "10.50.5.0/24" },
//                 ];

//                 testWithOutput(
//                     "addNetworks",
//                     "Generate sequential network names",
//                     { networks, namePrefix: "Seq", networkType: "Domestic" },
//                     () => addNetworks(networks, "Seq", "Domestic"),
//                 );

//                 const result = addNetworks(networks, "Seq", "Domestic");
//                 validateRouterConfig(result);
//             });
//         });
//     });

//     describe("Networks Main Function", () => {
//         it("should generate configuration for basic networks", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                     Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
//                     VPN: { name: "VPN", subnet: "192.168.40.0/24" },
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Generate configuration for all basic network types",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should generate configuration for only Split network", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Generate configuration for Split network only",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result, ["/ip firewall mangle"]);
//         });

//         it("should generate configuration for additional Foreign networks", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 ForeignNetworks: [
//                     { name: "Foreign-Office", subnet: "192.168.31.0/24" },
//                     { name: "Foreign-Guest", subnet: "192.168.32.0/24" },
//                     { name: "Foreign-IoT", subnet: "192.168.33.0/24" },
//                 ],
//             };

//             testWithOutput(
//                 "Networks",
//                 "Generate configuration for multiple Foreign networks",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should generate configuration for additional Domestic networks", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 DomesticNetworks: [
//                     { name: "Domestic-Main", subnet: "192.168.21.0/24" },
//                     { name: "Domestic-Secondary", subnet: "192.168.22.0/24" },
//                 ],
//             };

//             testWithOutput(
//                 "Networks",
//                 "Generate configuration for multiple Domestic networks",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should generate configuration for VPN Client networks", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 VPNClientNetworks: {
//                     Wireguard: [
//                         { name: "VPN-US", subnet: "10.10.10.0/24" },
//                         { name: "VPN-EU", subnet: "10.10.20.0/24" },
//                         { name: "", subnet: "10.10.30.0/24" }, // Test auto-naming
//                     ],
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Generate configuration for VPN Client networks",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should skip mangle rules when Foreign WAN uses PCC load balancing", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                     Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
//                 },
//             };

//             const wanLinks: WANLinks = {
//                 Foreign: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "PCC",
//                         Links: [],
//                     },
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Skip mangle rules with PCC load balancing on Foreign WAN",
//                 { Subnets: subnets, WANLinks: wanLinks },
//                 () => Networks(subnets, wanLinks),
//             );

//             const result = Networks(subnets, wanLinks);
//             validateRouterConfig(result);
//         });

//         it("should skip mangle rules when Domestic WAN uses NTH load balancing", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                 },
//             };

//             const wanLinks: WANLinks = {
//                 Domestic: {
//                     MultiLinkConfig: {
//                         loadBalanceMethod: "NTH",
//                         Links: [],
//                     },
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Skip mangle rules with NTH load balancing on Domestic WAN",
//                 { Subnets: subnets, WANLinks: wanLinks },
//                 () => Networks(subnets, wanLinks),
//             );

//             const result = Networks(subnets, wanLinks);
//             validateRouterConfig(result);
//         });

//         it("should skip mangle rules when VPN Client uses PCC load balancing", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     VPN: { name: "VPN", subnet: "192.168.40.0/24" },
//                 },
//             };

//             const vpnClient: VPNClient = {
//                 MultiLinkConfig: {
//                     loadBalanceMethod: "PCC",
//                     Links: [],
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Skip mangle rules with PCC load balancing on VPN Client",
//                 { Subnets: subnets, VPNClient: vpnClient },
//                 () => Networks(subnets, undefined, vpnClient),
//             );

//             const result = Networks(subnets, undefined, vpnClient);
//             validateRouterConfig(result);
//         });

//         it("should generate complex multi-network configuration", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                     Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
//                     VPN: { name: "VPN", subnet: "192.168.40.0/24" },
//                 },
//                 ForeignNetworks: [
//                     { name: "Foreign-Office", subnet: "192.168.31.0/24" },
//                     { name: "Foreign-Guest", subnet: "192.168.32.0/24" },
//                 ],
//                 DomesticNetworks: [
//                     { name: "Domestic-IoT", subnet: "192.168.21.0/24" },
//                 ],
//                 VPNClientNetworks: {
//                     Wireguard: [
//                         { name: "VPN-US", subnet: "10.10.10.0/24" },
//                         { name: "VPN-EU", subnet: "10.10.20.0/24" },
//                     ],
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Generate complex multi-network configuration",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle empty configuration gracefully", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {},
//             };

//             testWithOutput(
//                 "Networks",
//                 "Handle empty configuration",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle networks with missing subnets", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "" }, // Empty subnet
//                     Foreign: { name: "", subnet: "192.168.30.0/24" }, // Empty name
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Handle networks with missing or empty subnets",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle auto-naming for networks without names", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 ForeignNetworks: [
//                     { name: "", subnet: "192.168.31.0/24" },
//                     { name: "", subnet: "192.168.32.0/24" },
//                     { name: "", subnet: "192.168.33.0/24" },
//                 ],
//                 DomesticNetworks: [
//                     { name: "", subnet: "192.168.21.0/24" },
//                     { name: "", subnet: "192.168.22.0/24" },
//                 ],
//                 VPNClientNetworks: {
//                     Wireguard: [
//                         { name: "", subnet: "10.10.10.0/24" },
//                         { name: "", subnet: "10.10.20.0/24" },
//                     ],
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Generate auto-named networks for all types",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle mixed configuration scenarios", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "CustomSplit", subnet: "10.0.10.0/24" },
//                     VPN: { name: "", subnet: "10.0.40.0/24" }, // Auto-named
//                 },
//                 ForeignNetworks: [
//                     { name: "External", subnet: "172.20.0.0/16" },
//                 ],
//             };

//             testWithOutput(
//                 "Networks",
//                 "Mixed configuration with custom names and empty values",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });
//     });

//     describe("Edge Cases and Error Scenarios", () => {
//         it("should handle undefined optional arrays gracefully", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                 },
//                 ForeignNetworks: undefined,
//                 DomesticNetworks: undefined,
//                 VPNClientNetworks: undefined,
//             };

//             testWithOutput(
//                 "Networks",
//                 "Handle undefined optional network arrays",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle empty arrays in network configurations", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {},
//                 ForeignNetworks: [],
//                 DomesticNetworks: [],
//                 VPNClientNetworks: {
//                     Wireguard: [],
//                     OpenVPN: [],
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Handle empty arrays in all network types",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle special characters in network names", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split_Network-01", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic.Main", subnet: "192.168.20.0/24" },
//                 },
//                 ForeignNetworks: [
//                     { name: "Foreign@Office", subnet: "192.168.31.0/24" },
//                     { name: "Foreign#Guest", subnet: "192.168.32.0/24" },
//                 ],
//             };

//             testWithOutput(
//                 "Networks",
//                 "Handle special characters in network names",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle very large subnet configurations", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "10.0.0.0/8" },
//                     Domestic: { name: "Domestic", subnet: "172.16.0.0/12" },
//                     Foreign: { name: "Foreign", subnet: "192.168.0.0/16" },
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Handle very large subnet masks",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle very small subnet configurations", () => {
//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "TinyNet", subnet: "10.10.10.0/30" },
//                 },
//                 ForeignNetworks: [
//                     { name: "MicroNet", subnet: "172.16.1.0/29" },
//                 ],
//             };

//             testWithOutput(
//                 "Networks",
//                 "Handle very small subnet masks (/29, /30)",
//                 { Subnets: subnets },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });

//         it("should handle maximum number of networks", () => {
//             // Generate many networks to test scalability
//             const foreignNetworks = Array.from({ length: 10 }, (_, i) => ({
//                 name: `Foreign-${i + 1}`,
//                 subnet: `192.168.${100 + i}.0/24`,
//             }));

//             const domesticNetworks = Array.from({ length: 10 }, (_, i) => ({
//                 name: `Domestic-${i + 1}`,
//                 subnet: `172.16.${i}.0/24`,
//             }));

//             const vpnClientNetworks = Array.from({ length: 10 }, (_, i) => ({
//                 name: `VPNClient-${i + 1}`,
//                 subnet: `10.10.${i}.0/24`,
//             }));

//             const subnets: Subnets = {
//                 BaseNetworks: {
//                     Split: { name: "Split", subnet: "192.168.10.0/24" },
//                     Domestic: { name: "Domestic", subnet: "192.168.20.0/24" },
//                     Foreign: { name: "Foreign", subnet: "192.168.30.0/24" },
//                     VPN: { name: "VPN", subnet: "192.168.40.0/24" },
//                 },
//                 ForeignNetworks: foreignNetworks,
//                 DomesticNetworks: domesticNetworks,
//                 VPNClientNetworks: {
//                     Wireguard: vpnClientNetworks,
//                 },
//             };

//             testWithOutput(
//                 "Networks",
//                 "Handle maximum number of networks (stress test)",
//                 {
//                     Subnets: {
//                         BaseNetworks: subnets.BaseNetworks,
//                         ForeignNetworks: `Array of ${foreignNetworks.length} networks`,
//                         DomesticNetworks: `Array of ${domesticNetworks.length} networks`,
//                         VPNClientNetworks: `Wireguard: Array of ${vpnClientNetworks.length} networks`,
//                     }
//                 },
//                 () => Networks(subnets),
//             );

//             const result = Networks(subnets);
//             validateRouterConfig(result);
//         });
//     });
// });
