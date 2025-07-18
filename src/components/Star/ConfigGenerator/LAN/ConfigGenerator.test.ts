// import { describe, it, expect } from 'vitest';
// import { IPv6, EthernetBridgePorts, LANCG } from './LANCG';
// import { VPNServerWrapper } from './VPNServer/VPNServerCG';
// import { WireguardServer, OVPNServer } from './VPNServer/VPNServerInterfaces';
// import { TunnelWrapper, IPIPInterface, VxlanInterface } from './TunnelCG';
// import { WirelessConfig } from './Wireless';
// import type { StarState } from '~/components/Star/StarContext/StarContext';
// import type { EthernetInterfaceConfig } from '~/components/Star/StarContext/LANType';
// import type { WireguardInterfaceConfig, OpenVpnServerConfig, OvpnAuthMethod, OvpnCipher } from '~/components/Star/StarContext/Utils/VPNServerType';
// import type { VxlanInterfaceConfig, IpipTunnelConfig } from '~/components/Star/StarContext/Utils/TunnelType';
// import type { LayerMode, NetworkProtocol } from '~/components/Star/StarContext/CommonType';
// import type { RouterConfig } from '../ConfigGenerator';

// // Test helper functions
// function testWithOutput(
//   functionName: string,
//   testDescription: string,
//   parameters: any,
//   testFunction: () => RouterConfig
// ): void {
//   console.log(`\n=== ${functionName} - ${testDescription} ===`);
//   console.log('Parameters:', JSON.stringify(parameters, null, 2));
//   const result = testFunction();
//   console.log('Result:', JSON.stringify(result, null, 2));
// }

// function validateRouterConfig(
//   config: RouterConfig,
//   expectedSections?: string[]
// ): void {
//   expect(config).toBeDefined();
//   expect(typeof config).toBe('object');
  
//   if (expectedSections) {
//     for (const section of expectedSections) {
//       expect(config).toHaveProperty(section);
//       expect(Array.isArray(config[section])).toBe(true);
//     }
//   }
// }

// describe('ConfigGenerator LAN Module Tests - Output Display', () => {

//   describe('LANCG Module Functions', () => {
//     it('should display IPv6 configuration output', () => {
//       testWithOutput(
//         'IPv6',
//         'IPv6 disable configuration and firewall rules',
//         {},
//         () => IPv6()
//       );

//       const result = IPv6();
//       validateRouterConfig(result, ['/ipv6 settings', '/ipv6 firewall filter']);
//     });

//     it('should display EthernetBridgePorts configuration output', () => {
//       const etherConfigs: EthernetInterfaceConfig[] = [
//         { name: 'ether2', bridge: 'VPN' },
//         { name: 'ether3', bridge: 'Domestic' },
//         { name: 'ether4', bridge: 'Foreign' }
//       ];

//       testWithOutput(
//         'EthernetBridgePorts',
//         'Multiple ethernet bridge port configurations',
//         { etherConfigs },
//         () => EthernetBridgePorts(etherConfigs)
//       );

//       const result = EthernetBridgePorts(etherConfigs);
//       validateRouterConfig(result, ['/interface bridge port']);
//     });

//     it('should display complete LANCG configuration output', () => {
//       const testState: StarState = {
//         Choose: {
//           Mode: 'advance',
//           Firmware: 'MikroTik',
//           DomesticLink: true,
//           RouterMode: 'AP Mode',
//           RouterModels: []
//         },
//         WAN: {
//           WANLink: {
//             Foreign: { InterfaceName: 'ether1' }
//           },
//           VPNClient: {}
//         },
//         LAN: {
//           Wireless: {
//             SingleMode: {
//               SSID: 'TestNetwork',
//               Password: 'password123',
//               isHide: false,
//               isDisabled: false,
//               SplitBand: true
//             }
//           },
//           Interface: [
//             { name: 'ether2', bridge: 'VPN' },
//             { name: 'ether3', bridge: 'Domestic' }
//           ]
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithOutput(
//         'LANCG',
//         'Complete LAN configuration with wireless and ethernet',
//         { state: testState },
//         () => LANCG(testState)
//       );

//       const result = LANCG(testState);
//       validateRouterConfig(result);
//     });
//   });

//   describe('VPN Server Configuration Functions', () => {
//     it('should display WireGuard server configuration output', () => {
//       const wireguardConfig: WireguardInterfaceConfig = {
//         Name: 'wireguard-server',
//         PrivateKey: 'privatekey123456789',
//         InterfaceAddress: '192.168.170.1/24',
//         ListenPort: 13231,
//         Mtu: 1420
//       };

//       testWithOutput(
//         'WireguardServer',
//         'WireGuard server interface configuration',
//         { config: wireguardConfig },
//         () => WireguardServer(wireguardConfig)
//       );

//       const result = WireguardServer(wireguardConfig);
//       validateRouterConfig(result, ['/interface wireguard', '/ip address', '/interface list member']);
//     });

//     it('should display OpenVPN server configuration output', () => {
//       const ovpnConfig: OpenVpnServerConfig = {
//         name: 'openvpn-server',
//         enabled: true,
//         Port: 1194,
//         Protocol: 'udp' as NetworkProtocol,
//         Mode: 'ip' as LayerMode,
//         DefaultProfile: 'ovpn-profile',
//         Encryption: {
//           Auth: ['sha256'] as OvpnAuthMethod[],
//           Cipher: ['aes256-cbc'] as OvpnCipher[],
//           UserAuthMethod: 'mschap2'
//         },
//         IPV6: {
//           EnableTunIPv6: false
//         },
//         Certificate: {
//           Certificate: 'server-cert',
//           RequireClientCertificate: true
//         },
//         Address: {
//           AddressPool: 'ovpn-pool',
//           MaxMtu: 1500
//         }
//       };

//       testWithOutput(
//         'OVPNServer',
//         'OpenVPN server configuration',
//         { config: ovpnConfig },
//         () => OVPNServer(ovpnConfig)
//       );

//       const result = OVPNServer(ovpnConfig);
//       validateRouterConfig(result, ['/ip pool', '/ppp profile', '/interface ovpn-server server']);
//     });

//     it('should display complete VPN server wrapper output', () => {
//       const testState: StarState = {
//         Choose: {
//           Mode: 'advance',
//           Firmware: 'MikroTik',
//           DomesticLink: true,
//           RouterMode: 'AP Mode',
//           RouterModels: []
//         },
//         WAN: {
//           WANLink: {
//             Foreign: { InterfaceName: 'ether1' }
//           },
//           VPNClient: {}
//         },
//         LAN: {
//           VPNServer: {
//             Users: [
//               { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] },
//               { Username: 'user2', Password: 'pass2', VPNType: ['OpenVPN'] }
//             ],
//             WireguardServers: [{
//               Interface: {
//                 Name: 'wireguard-main',
//                 PrivateKey: 'wgprivatekey456',
//                 InterfaceAddress: '192.168.170.1/24',
//                 ListenPort: 51820
//               },
//               Peers: []
//             }],
//             OpenVpnServer: {
//               name: 'openvpn-main',
//               enabled: true,
//               Port: 1194,
//               Protocol: 'udp' as NetworkProtocol,
//               Mode: 'ip' as LayerMode,
//               Encryption: {
//                 Auth: ['sha256'] as OvpnAuthMethod[],
//                 Cipher: ['aes256-cbc'] as OvpnCipher[]
//               },
//               IPV6: {},
//               Certificate: {
//                 Certificate: 'server-cert'
//               },
//               Address: {
//                 AddressPool: 'ovpn-pool'
//               }
//             }
//           }
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithOutput(
//         'VPNServerWrapper',
//         'Complete VPN server configuration with WireGuard and OpenVPN',
//         { state: testState },
//         () => VPNServerWrapper(testState, true)
//       );

//       const result = VPNServerWrapper(testState, true);
//       validateRouterConfig(result);
//     });
//   });

//   describe('Tunnel Configuration Functions', () => {
//     it('should display IPIP tunnel configuration output', () => {
//       const ipipConfig: IpipTunnelConfig = {
//         name: 'ipip-hq',
//         type: 'ipip',
//         localAddress: '192.168.1.1',
//         remoteAddress: '203.0.113.1',
//         ipsecSecret: 'secretkey123',
//         mtu: 1476,
//         keepalive: '10,5',
//         comment: 'Secure IPIP tunnel to headquarters'
//       };

//       testWithOutput(
//         'IPIPInterface',
//         'IPIP tunnel with IPsec configuration',
//         { config: ipipConfig },
//         () => IPIPInterface(ipipConfig)
//       );

//       const result = IPIPInterface(ipipConfig);
//       validateRouterConfig(result, ['/interface ipip']);
//     });

//     it('should display VXLAN tunnel configuration output', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-datacenter',
//         type: 'vxlan',
//         vni: 1000,
//         localAddress: '10.0.1.1',
//         remoteAddress: '10.0.1.2',
//         bumMode: 'unicast',
//         port: 4789,
//         vteps: [
//           { remoteAddress: '10.0.1.2', comment: 'Datacenter 1' },
//           { remoteAddress: '10.0.1.3', comment: 'Datacenter 2' },
//           { remoteAddress: '10.0.1.4', comment: 'Datacenter 3' }
//         ],
//         fdb: [
//           { remoteAddress: '10.0.1.2', comment: 'Static FDB entry 1' },
//           { remoteAddress: '10.0.1.3', comment: 'Static FDB entry 2' }
//         ],
//         learning: true,
//         hw: true,
//         comment: 'VXLAN overlay network for datacenter connectivity'
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'VXLAN tunnel with VTEP peers and FDB entries',
//         { config: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
//       validateRouterConfig(result, ['/interface vxlan', '/interface vxlan vteps']);
//     });

//     it('should display complete tunnel wrapper output', () => {
//       const tunnels = [
//         {
//           IPIP: [{
//             name: 'ipip-site1',
//             type: 'ipip' as const,
//             localAddress: '192.168.1.1',
//             remoteAddress: '203.0.113.1',
//             comment: 'Site 1 connection'
//           }],
//           Vxlan: [{
//             name: 'vxlan-overlay',
//             type: 'vxlan' as const,
//             vni: 100,
//             localAddress: '10.0.1.1',
//             remoteAddress: '10.0.1.2',
//             bumMode: 'multicast' as const,
//             group: '239.1.1.100',
//             multicastInterface: 'ether1',
//             comment: 'Multicast VXLAN overlay'
//           }]
//         },
//         {
//           Eoip: [{
//             name: 'eoip-branch',
//             type: 'eoip' as const,
//             localAddress: '192.168.2.1',
//             remoteAddress: '203.0.113.10',
//             tunnelId: 100,
//             comment: 'EoIP bridge to branch office'
//           }]
//         }
//       ];

//       testWithOutput(
//         'TunnelWrapper',
//         'Multiple tunnel configurations with various types',
//         { tunnels },
//         () => TunnelWrapper(tunnels)
//       );

//       const result = TunnelWrapper(tunnels);
//       validateRouterConfig(result);
//     });
//   });

//   describe('Wireless Configuration Functions', () => {
//     it('should display single mode wireless output', () => {
//       const wirelessConfig = {
//         SingleMode: {
//           SSID: 'TestNetwork-Single',
//           Password: 'singlemode123',
//           isHide: false,
//           isDisabled: false,
//           SplitBand: true
//         }
//       };

//       const wanLink = {
//         Foreign: { InterfaceName: 'ether1' as const }
//       };

//       testWithOutput(
//         'WirelessConfig',
//         'Single mode wireless with split band',
//         { config: wirelessConfig, wanLink, domesticLink: false },
//         () => WirelessConfig(wirelessConfig, wanLink, false)
//       );

//       const result = WirelessConfig(wirelessConfig, wanLink, false);
//       validateRouterConfig(result);
//     });

//     it('should display multi mode wireless output', () => {
//       const wirelessConfig = {
//         MultiMode: {
//           Foreign: {
//             SSID: 'Corporate-WiFi',
//             Password: 'corporate123',
//             isHide: false,
//             isDisabled: false,
//             SplitBand: true
//           },
//           Domestic: {
//             SSID: 'Internal-WiFi',
//             Password: 'internal123',
//             isHide: true,
//             isDisabled: false,
//             SplitBand: false
//           },
//           VPN: {
//             SSID: 'VPN-WiFi',
//             Password: 'vpnaccess123',
//             isHide: true,
//             isDisabled: false,
//             SplitBand: true
//           }
//         }
//       };

//       const wanLink = {
//         Foreign: { InterfaceName: 'ether1' as const },
//         Domestic: { InterfaceName: 'ether2' as const }
//       };

//       testWithOutput(
//         'WirelessConfig',
//         'Multi mode wireless with all network types',
//         { config: wirelessConfig, wanLink, domesticLink: true },
//         () => WirelessConfig(wirelessConfig, wanLink, true)
//       );

//       const result = WirelessConfig(wirelessConfig, wanLink, true);
//       validateRouterConfig(result);
//     });
//   });

//   describe('Integration Tests - Combined Configurations', () => {
//     it('should display complete LAN configuration with all components', () => {
//       const testState: StarState = {
//         Choose: {
//           Mode: 'advance',
//           Firmware: 'MikroTik',
//           DomesticLink: true,
//           RouterMode: 'AP Mode',
//           RouterModels: []
//         },
//         WAN: {
//           WANLink: {
//             Foreign: { InterfaceName: 'ether1' },
//             Domestic: { InterfaceName: 'ether2' }
//           },
//           VPNClient: {}
//         },
//         LAN: {
//           Wireless: {
//             MultiMode: {
//               Foreign: {
//                 SSID: 'Enterprise-Main',
//                 Password: 'enterprise2024',
//                 isHide: false,
//                 isDisabled: false,
//                 SplitBand: true
//               },
//               VPN: {
//                 SSID: 'Enterprise-VPN',
//                 Password: 'vpnenterprise2024',
//                 isHide: true,
//                 isDisabled: false,
//                 SplitBand: true
//               }
//             }
//           },
//           VPNServer: {
//             Users: [
//               { Username: 'admin', Password: 'adminpass', VPNType: ['Wireguard', 'OpenVPN'] },
//               { Username: 'user1', Password: 'userpass1', VPNType: ['Wireguard'] },
//               { Username: 'user2', Password: 'userpass2', VPNType: ['OpenVPN'] }
//             ],
//             WireguardServers: [{
//               Interface: {
//                 Name: 'wireguard-enterprise',
//                 PrivateKey: 'enterprisewgkey789',
//                 InterfaceAddress: '192.168.170.1/24',
//                 ListenPort: 51820
//               },
//               Peers: []
//             }],
//             OpenVpnServer: {
//               name: 'openvpn-enterprise',
//               enabled: true,
//               Port: 1194,
//               Protocol: 'udp' as NetworkProtocol,
//               Mode: 'ip' as LayerMode,
//               Encryption: {
//                 Auth: ['sha256', 'sha512'] as OvpnAuthMethod[],
//                 Cipher: ['aes256-cbc', 'aes256-gcm'] as OvpnCipher[]
//               },
//               IPV6: {},
//               Certificate: {
//                 Certificate: 'enterprise-cert'
//               },
//               Address: {
//                 AddressPool: 'enterprise-ovpn-pool'
//               }
//             }
//           },
//           Interface: [
//             { name: 'ether3', bridge: 'VPN' },
//             { name: 'ether4', bridge: 'Domestic' },
//             { name: 'ether5', bridge: 'Foreign' }
//           ]
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithOutput(
//         'LANCG',
//         'Enterprise LAN configuration with VPN, wireless, and ethernet',
//         { state: testState },
//         () => LANCG(testState)
//       );

//       const result = LANCG(testState);
//       validateRouterConfig(result);
//     });

//     it('should display configuration comparison between simple and complex setups', () => {
//       // Simple setup
//       const simpleState: StarState = {
//         Choose: { Mode: 'easy', Firmware: 'MikroTik', DomesticLink: false, RouterMode: 'AP Mode', RouterModels: [] },
//         WAN: { WANLink: { Foreign: { InterfaceName: 'ether1' } }, VPNClient: {} },
//         LAN: {
//           Wireless: {
//             SingleMode: {
//               SSID: 'SimpleNetwork',
//               Password: 'simple123',
//               isHide: false,
//               isDisabled: false,
//               SplitBand: false
//             }
//           }
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       // Complex setup
//       const complexState: StarState = {
//         Choose: { Mode: 'advance', Firmware: 'MikroTik', DomesticLink: true, RouterMode: 'AP Mode', RouterModels: [] },
//         WAN: { WANLink: { Foreign: { InterfaceName: 'ether1' }, Domestic: { InterfaceName: 'ether2' } }, VPNClient: {} },
//         LAN: {
//           Wireless: {
//             MultiMode: {
//               Foreign: { SSID: 'Corp-Main', Password: 'corp123', isHide: false, isDisabled: false, SplitBand: true },
//               Domestic: { SSID: 'Corp-Internal', Password: 'internal123', isHide: true, isDisabled: false, SplitBand: true },
//               VPN: { SSID: 'Corp-VPN', Password: 'vpn123', isHide: true, isDisabled: false, SplitBand: false }
//             }
//           },
//           VPNServer: {
//             Users: [{ Username: 'corp_user', Password: 'corppass', VPNType: ['Wireguard'] }],
//             WireguardServers: [{
//               Interface: { Name: 'wg-corp', PrivateKey: 'corpkey', InterfaceAddress: '192.168.170.1/24', ListenPort: 51820 },
//               Peers: []
//             }]
//           },
//           Interface: [{ name: 'ether3', bridge: 'VPN' }, { name: 'ether4', bridge: 'Domestic' }]
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithOutput(
//         'LANCG',
//         'Simple LAN configuration',
//         { state: simpleState },
//         () => LANCG(simpleState)
//       );

//       testWithOutput(
//         'LANCG',
//         'Complex LAN configuration',
//         { state: complexState },
//         () => LANCG(complexState)
//       );

//       const simpleResult = LANCG(simpleState);
//       const complexResult = LANCG(complexState);
      
//       validateRouterConfig(simpleResult);
//       validateRouterConfig(complexResult);

//       // Display configuration size comparison
//       testWithGenericOutput(
//         'Configuration Comparison',
//         'Simple vs Complex configuration line counts',
//         {
//           simple: Object.values(simpleResult).flat().length,
//           complex: Object.values(complexResult).flat().length
//         },
//         () => ({
//           simpleLines: Object.values(simpleResult).flat().length,
//           complexLines: Object.values(complexResult).flat().length,
//           difference: Object.values(complexResult).flat().length - Object.values(simpleResult).flat().length
//         })
//       );
//     });
//   });
// }); 