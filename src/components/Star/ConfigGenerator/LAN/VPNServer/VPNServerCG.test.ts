// import { describe, it, expect } from 'vitest';
// import { VPNServerWrapper } from './VPNServerCG';
// import {
//   getConfiguredVPNProtocols,
//   isVPNProtocolConfigured,
//   getVPNUsersForProtocol
// } from './VPNServerUtil';
// import {
//   WireguardServer,
//   OVPNServer,
//   PptpServer,
//   L2tpServer,
//   SstpServer,
//   Ikev2Server
// } from './VPNServerInterfaces';
// import {
//   WireguardServerUsers,
//   OVPNServerUsers,
//   PptpServerUsers,
//   L2tpServerUsers,
//   SstpServerUsers,
//   Ikev2ServerUsers
// } from './VPNServerUsers';
// import type { 
//   WireguardInterfaceConfig,
//   OpenVpnServerConfig,
//   PptpServerConfig,
//   L2tpServerConfig,
//   SstpServerConfig,
//   Ikev2ServerConfig,
//   Credentials
// } from '~/components/Star/StarContext/Utils/VPNServerType';
// import type { NetworkProtocol } from '~/components/Star/StarContext/CommonType';
// import type { StarState } from '~/components/Star/StarContext/StarContext';
// import type { RouterConfig } from '../../ConfigGenerator';

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

// describe('VPN Server Configuration Generator Tests', () => {

//   describe('WireGuard Server Configuration', () => {
//     it('should generate WireGuard server interface', () => {
//       const wireguardConfig: WireguardInterfaceConfig = {
//         Name: 'wireguard-server',
//         PrivateKey: 'privatekey123',
//         InterfaceAddress: '192.168.170.1/24',
//         ListenPort: 13231,
//         Mtu: 1420
//       };

//       testWithOutput(
//         'WireguardServer',
//         'Basic WireGuard server configuration',
//         { wireguardConfig },
//         () => WireguardServer(wireguardConfig)
//       );

//       const result = WireguardServer(wireguardConfig);
//       validateRouterConfig(result, ['/interface wireguard', '/ip address', '/interface list member']);
//     });

//     it('should generate WireGuard server users/peers', () => {
//       const serverConfig: WireguardInterfaceConfig = {
//         Name: 'wireguard-server',
//         PrivateKey: 'privatekey123',
//         InterfaceAddress: '192.168.170.1/24',
//         ListenPort: 13231
//       };

//       const users: Credentials[] = [
//         { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] },
//         { Username: 'user2', Password: 'pass2', VPNType: ['Wireguard', 'OpenVPN'] },
//         { Username: 'user3', Password: 'pass3', VPNType: ['OpenVPN'] }
//       ];

//       testWithOutput(
//         'WireguardServerUsers',
//         'WireGuard server peers generation',
//         { serverConfig, users },
//         () => WireguardServerUsers(serverConfig, users)
//       );

//       const result = WireguardServerUsers(serverConfig, users);
//       validateRouterConfig(result, ['/interface wireguard peers']);
//     });
//   });

//   describe('OpenVPN Server Configuration', () => {
//     it('should generate OpenVPN server configuration', () => {
//       const ovpnConfig: OpenVpnServerConfig = {
//         name: 'openvpn-server',
//         enabled: true,
//         Port: 1194,
//         Protocol: 'udp' as NetworkProtocol,
//         Mode: 'ip',
//         DefaultProfile: 'ovpn-profile',
//         Encryption: {
//           Auth: ['sha256'],
//           Cipher: ['aes256-cbc'],
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

//     it('should generate OpenVPN server users', () => {
//       const users: Credentials[] = [
//         { Username: 'ovpnuser1', Password: 'pass1', VPNType: ['OpenVPN'] },
//         { Username: 'ovpnuser2', Password: 'pass2', VPNType: ['OpenVPN', 'L2TP'] },
//         { Username: 'user3', Password: 'pass3', VPNType: ['Wireguard'] }
//       ];

//       testWithOutput(
//         'OVPNServerUsers',
//         'OpenVPN server users configuration',
//         { users },
//         () => OVPNServerUsers(users)
//       );

//       const result = OVPNServerUsers(users);
//       validateRouterConfig(result, ['/ppp secret']);
//     });
//   });

//   describe('PPTP Server Configuration', () => {
//     it('should generate PPTP server configuration', () => {
//       const pptpConfig: PptpServerConfig = {
//         enabled: true,
//         Authentication: ['mschap2'],
//         DefaultProfile: 'pptp-profile',
//         KeepaliveTimeout: 30,
//         PacketSize: {
//           MaxMtu: 1460,
//           MaxMru: 1460
//         }
//       };

//       testWithOutput(
//         'PptpServer',
//         'PPTP server configuration',
//         { config: pptpConfig },
//         () => PptpServer(pptpConfig)
//       );

//       const result = PptpServer(pptpConfig);
//       validateRouterConfig(result, ['/interface pptp-server server']);
//     });

//     it('should generate PPTP server users', () => {
//       const users: Credentials[] = [
//         { Username: 'pptpuser1', Password: 'pass1', VPNType: ['PPTP'] },
//         { Username: 'pptpuser2', Password: 'pass2', VPNType: ['PPTP', 'L2TP'] }
//       ];

//       testWithOutput(
//         'PptpServerUsers',
//         'PPTP server users configuration',
//         { users },
//         () => PptpServerUsers(users)
//       );

//       const result = PptpServerUsers(users);
//       validateRouterConfig(result, ['/ppp secret']);
//     });
//   });

//   describe('L2TP Server Configuration', () => {
//     it('should generate L2TP server configuration', () => {
//       const l2tpConfig: L2tpServerConfig = {
//         enabled: true,
//         IPsec: {
//           UseIpsec: 'required',
//           IpsecSecret: 'sharedsecret123'
//         },
//         Authentication: ['mschap2'],
//         DefaultProfile: 'l2tp-profile',
//         KeepaliveTimeout: 30,
//         allowFastPath: false,
//         maxSessions: 100,
//         OneSessionPerHost: true,
//         L2TPV3: {
//           l2tpv3EtherInterfaceList: 'LAN'
//         },
//         PacketSize: {
//           MaxMtu: 1460,
//           MaxMru: 1460
//         }
//       };

//       testWithOutput(
//         'L2tpServer',
//         'L2TP server configuration with IPsec',
//         { config: l2tpConfig },
//         () => L2tpServer(l2tpConfig)
//       );

//       const result = L2tpServer(l2tpConfig);
//       validateRouterConfig(result, ['/interface l2tp-server server']);
//     });

//     it('should generate L2TP server users', () => {
//       const users: Credentials[] = [
//         { Username: 'l2tpuser1', Password: 'pass1', VPNType: ['L2TP'] },
//         { Username: 'l2tpuser2', Password: 'pass2', VPNType: ['L2TP', 'SSTP'] }
//       ];

//       testWithOutput(
//         'L2tpServerUsers',
//         'L2TP server users configuration',
//         { users },
//         () => L2tpServerUsers(users)
//       );

//       const result = L2tpServerUsers(users);
//       validateRouterConfig(result, ['/ppp secret']);
//     });
//   });

//   describe('SSTP Server Configuration', () => {
//     it('should generate SSTP server configuration', () => {
//       const sstpConfig: SstpServerConfig = {
//         enabled: true,
//         Certificate: 'server-cert',
//         Port: 443,
//         Authentication: ['mschap2'],
//         DefaultProfile: 'sstp-profile',
//         KeepaliveTimeout: 30,
//         ForceAes: true,
//         Pfs: true,
//         TlsVersion: 'only-1.2',
//         PacketSize: {
//           MaxMtu: 1460
//         }
//       };

//       testWithOutput(
//         'SstpServer',
//         'SSTP server configuration',
//         { config: sstpConfig },
//         () => SstpServer(sstpConfig)
//       );

//       const result = SstpServer(sstpConfig);
//       validateRouterConfig(result, ['/interface sstp-server server', '/ip firewall filter']);
//     });

//     it('should generate SSTP server users', () => {
//       const users: Credentials[] = [
//         { Username: 'sstpuser1', Password: 'pass1', VPNType: ['SSTP'] },
//         { Username: 'sstpuser2', Password: 'pass2', VPNType: ['SSTP', 'IKeV2'] }
//       ];

//       testWithOutput(
//         'SstpServerUsers',
//         'SSTP server users configuration',
//         { users },
//         () => SstpServerUsers(users)
//       );

//       const result = SstpServerUsers(users);
//       validateRouterConfig(result, ['/ppp secret']);
//     });
//   });

//   describe('IKEv2 Server Configuration', () => {
//     it('should generate IKEv2 server configuration', () => {
//       const ikev2Config: Ikev2ServerConfig = {
//         ipPools: {
//           Name: 'ikev2-pool',
//           Ranges: '192.168.77.10-192.168.77.100',
//           comment: 'IKEv2 client pool'
//         },
//         profile: {
//           name: 'ikev2-profile',
//           hashAlgorithm: 'sha256',
//           encAlgorithm: 'aes-256',
//           dhGroup: 'modp2048',
//           lifetime: '8h',
//           natTraversal: true
//         },
//         proposal: {
//           name: 'ikev2-proposal',
//           authAlgorithms: 'sha256',
//           encAlgorithms: 'aes-256-cbc',
//           lifetime: '1h',
//           pfsGroup: 'modp2048'
//         },
//         peer: {
//           name: 'ikev2-peer',
//           profile: 'ikev2-profile',
//           exchangeMode: 'ike2',
//           passive: true
//         },
//         identities: {
//           authMethod: 'pre-shared-key',
//           secret: 'preshared123',
//           generatePolicy: 'port-strict',
//           peer: 'ikev2-peer'
//         }
//       };

//       testWithOutput(
//         'Ikev2Server',
//         'IKEv2 server configuration',
//         { config: ikev2Config },
//         () => Ikev2Server(ikev2Config)
//       );

//       const result = Ikev2Server(ikev2Config);
//       validateRouterConfig(result, [
//         '/ip pool',
//         '/ip ipsec profile',
//         '/ip ipsec proposal',
//         '/ip ipsec peer',
//         '/ip ipsec identity',
//         '/ip firewall filter'
//       ]);
//     });

//     it('should generate IKEv2 server users info', () => {
//       const users: Credentials[] = [
//         { Username: 'ikev2user1', Password: 'pass1', VPNType: ['IKeV2'] },
//         { Username: 'ikev2user2', Password: 'pass2', VPNType: ['IKeV2', 'OpenVPN'] }
//       ];

//       testWithOutput(
//         'Ikev2ServerUsers',
//         'IKEv2 server users information',
//         { users },
//         () => Ikev2ServerUsers(users)
//       );

//       const result = Ikev2ServerUsers(users);
//       validateRouterConfig(result, ['']);
//     });
//   });

//   describe('VPN Server Wrapper Function', () => {
//     it('should generate complete VPN server configuration', () => {
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
//               { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard', 'OpenVPN'] },
//               { Username: 'user2', Password: 'pass2', VPNType: ['PPTP', 'L2TP'] },
//               { Username: 'user3', Password: 'pass3', VPNType: ['SSTP', 'IKeV2'] }
//             ],
//             WireguardServers: [{
//               Interface: {
//                 Name: 'wireguard-server',
//                 PrivateKey: 'privatekey123',
//                 InterfaceAddress: '192.168.170.1/24',
//                 ListenPort: 13231
//               },
//               Peers: []
//             }],
//             OpenVpnServer: {
//               enabled: true,
//               Certificate: 'cert'
//             }
//           }
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithOutput(
//         'VPNServerWrapper',
//         'Complete VPN server configuration with multiple protocols',
//         { state: testState },
//         () => VPNServerWrapper(testState)
//       );

//       const result = VPNServerWrapper(testState);
//       validateRouterConfig(result);
//     });

//     it('should handle missing VPN server configuration', () => {
//       const testState: StarState = {
//         Choose: { Mode: 'easy', Firmware: 'MikroTik', DomesticLink: false, RouterMode: 'AP Mode', RouterModels: [] },
//         WAN: { WANLink: { Foreign: { InterfaceName: 'ether1' } }, VPNClient: {} },
//         LAN: {},
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithOutput(
//         'VPNServerWrapper',
//         'No VPN server configuration',
//         { state: testState },
//         () => VPNServerWrapper(testState)
//       );

//       const result = VPNServerWrapper(testState);
//       validateRouterConfig(result, ['']);
//     });
//   });

//   describe('Utility Functions', () => {
//     it('should get configured VPN protocols', () => {
//       const testState: StarState = {
//         Choose: { Mode: 'easy', Firmware: 'MikroTik', DomesticLink: false, RouterMode: 'AP Mode', RouterModels: [] },
//         WAN: { WANLink: { Foreign: { InterfaceName: 'ether1' } }, VPNClient: {} },
//         LAN: {
//           VPNServer: {
//             Users: [],
//             WireguardServers: [{ Interface: { Name: 'wg', PrivateKey: 'key', InterfaceAddress: '192.168.1.1/24' }, Peers: [] }],
//             OpenVpnServer: {
//               name: 'ovpn',
//               enabled: true,
//               Encryption: {},
//               IPV6: {},
//               Certificate: 'cert',
//               Address: {}
//             }
//           }
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithGenericOutput(
//         'getConfiguredVPNProtocols',
//         'Get list of configured VPN protocols',
//         { state: testState },
//         () => getConfiguredVPNProtocols(testState)
//       );

//       const protocols = getConfiguredVPNProtocols(testState);
//       expect(protocols).toContain('Wireguard');
//       expect(protocols).toContain('OpenVPN');
//     });

//     it('should check if specific VPN protocol is configured', () => {
//       const testState: StarState = {
//         Choose: { Mode: 'easy', Firmware: 'MikroTik', DomesticLink: false, RouterMode: 'AP Mode', RouterModels: [] },
//         WAN: { WANLink: { Foreign: { InterfaceName: 'ether1' } }, VPNClient: {} },
//         LAN: {
//           VPNServer: {
//             Users: [],
//             WireguardServers: [{ Interface: { Name: 'wg', PrivateKey: 'key', InterfaceAddress: '192.168.1.1/24' }, Peers: [] }]
//           }
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithGenericOutput(
//         'isVPNProtocolConfigured',
//         'Check WireGuard configuration',
//         { state: testState, protocol: 'wireguard' },
//         () => isVPNProtocolConfigured(testState, 'wireguard')
//       );

//       expect(isVPNProtocolConfigured(testState, 'wireguard')).toBe(true);
//       expect(isVPNProtocolConfigured(testState, 'openvpn')).toBe(false);
//     });

//     it('should get VPN users for specific protocol', () => {
//       const testState: StarState = {
//         Choose: { Mode: 'easy', Firmware: 'MikroTik', DomesticLink: false, RouterMode: 'AP Mode', RouterModels: [] },
//         WAN: { WANLink: { Foreign: { InterfaceName: 'ether1' } }, VPNClient: {} },
//         LAN: {
//           VPNServer: {
//             Users: [
//               { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard', 'OpenVPN'] },
//               { Username: 'user2', Password: 'pass2', VPNType: ['OpenVPN'] },
//               { Username: 'user3', Password: 'pass3', VPNType: ['PPTP'] }
//             ]
//           }
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithGenericOutput(
//         'getVPNUsersForProtocol',
//         'Get OpenVPN users',
//         { state: testState, protocol: 'OpenVPN' },
//         () => getVPNUsersForProtocol(testState, 'OpenVPN')
//       );

//       const openVpnUsers = getVPNUsersForProtocol(testState, 'OpenVPN');
//       expect(openVpnUsers).toHaveLength(2);
//       expect(openVpnUsers[0].Username).toBe('user1');
//       expect(openVpnUsers[1].Username).toBe('user2');
//     });
//   });

//   describe('Edge Cases and Error Handling', () => {
//     it('should handle VPN server configuration without users', () => {
//       const testState: StarState = {
//         Choose: { Mode: 'easy', Firmware: 'MikroTik', DomesticLink: false, RouterMode: 'AP Mode', RouterModels: [] },
//         WAN: { WANLink: { Foreign: { InterfaceName: 'ether1' } }, VPNClient: {} },
//         LAN: {
//           VPNServer: {
//             Users: [],
//             WireguardServers: [{ Interface: { Name: 'wg', PrivateKey: 'key', InterfaceAddress: '192.168.1.1/24' }, Peers: [] }]
//           }
//         },
//         ExtraConfig: {},
//         ShowConfig: {}
//       };

//       testWithOutput(
//         'VPNServerWrapper',
//         'VPN server without users',
//         { state: testState },
//         () => VPNServerWrapper(testState)
//       );

//       const result = VPNServerWrapper(testState);
//       validateRouterConfig(result);
//     });

//     it('should handle WireGuard users without server interface address', () => {
//       const serverConfig: WireguardInterfaceConfig = {
//         Name: 'wireguard-server',
//         PrivateKey: 'privatekey123',
//         InterfaceAddress: '192.168.170.1/24',
//         ListenPort: 13231
//       };

//       const users: Credentials[] = [
//         { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] }
//       ];

//       testWithOutput(
//         'WireguardServerUsers',
//         'WireGuard users without server interface address',
//         { serverConfig, users },
//         () => WireguardServerUsers(serverConfig, users)
//       );

//       const result = WireguardServerUsers(serverConfig, users);
//       validateRouterConfig(result, ['/interface wireguard peers']);
//     });
//   });
// }); 