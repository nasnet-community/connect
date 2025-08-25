// import { describe, it, expect } from 'vitest';
// import { VPNServerWrapper } from './VPNServerCG';
// import type { VPNServer, Credentials } from '~/components/Star/StarContext/Utils/VPNServerType';
// import type { VPNType } from '~/components/Star/StarContext/CommonType';

// describe('VPNServerWrapper Tests', () => {

//     const testUsers: Credentials[] = [
//         { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard', 'OpenVPN'] as VPNType[] },
//         { Username: 'user2', Password: 'pass2', VPNType: ['PPTP', 'L2TP'] as VPNType[] },
//         { Username: 'user3', Password: 'pass3', VPNType: ['SSTP', 'IKeV2'] as VPNType[] },
//         { Username: 'multiuser', Password: 'passMulti', VPNType: ['Wireguard', 'OpenVPN', 'PPTP', 'L2TP', 'SSTP'] as VPNType[] }
//     ];

//     describe('Complete VPN Server Configuration', () => {
//         it('should generate complete VPN server configuration with all protocols', () => {
//             const vpnServer: VPNServer = {
//                 Users: testUsers,
//                 WireguardServers: [{
//                     Interface: {
//                         Name: 'wireguard-server',
//                         PrivateKey: 'privatekey123',
//                         InterfaceAddress: '192.168.170.1/24',
//                         ListenPort: 13231,
//                         Mtu: 1420
//                     },
//                     Peers: []
//                 }],
//                 OpenVpnServer: {
//                     name: 'openvpn-server',
//                     enabled: true,
//                     Port: 1194,
//                     Protocol: 'udp',
//                     Mode: 'ip',
//                     DefaultProfile: 'ovpn-profile',
//                     Encryption: {
//                         Auth: ['sha256'],
//                         Cipher: ['aes256-cbc'],
//                         UserAuthMethod: 'mschap2'
//                     },
//                     IPV6: {
//                         EnableTunIPv6: false
//                     },
//                     Certificate: {
//                         Certificate: 'server-cert',
//                         RequireClientCertificate: true
//                     },
//                     Address: {
//                         AddressPool: 'ovpn-pool',
//                         MaxMtu: 1500
//                     }
//                 },
//                 PptpServer: {
//                     enabled: true,
//                     Authentication: ['mschap2'],
//                     DefaultProfile: 'pptp-profile',
//                     KeepaliveTimeout: 30,
//                     PacketSize: {
//                         MaxMtu: 1460,
//                         MaxMru: 1460
//                     }
//                 },
//                 L2tpServer: {
//                     enabled: true,
//                     IPsec: {
//                         UseIpsec: 'required',
//                         IpsecSecret: 'sharedsecret123'
//                     },
//                     Authentication: ['mschap2'],
//                     DefaultProfile: 'l2tp-profile',
//                     KeepaliveTimeout: 30,
//                     allowFastPath: false,
//                     maxSessions: 100,
//                     OneSessionPerHost: true,
//                     L2TPV3: {
//                         l2tpv3EtherInterfaceList: 'LAN'
//                     },
//                     PacketSize: {
//                         MaxMtu: 1460,
//                         MaxMru: 1460
//                     }
//                 },
//                 SstpServer: {
//                     enabled: true,
//                     Certificate: 'server-cert',
//                     Port: 443,
//                     Authentication: ['mschap2'],
//                     DefaultProfile: 'sstp-profile',
//                     KeepaliveTimeout: 30,
//                     ForceAes: true,
//                     Pfs: true,
//                     TlsVersion: 'only-1.2',
//                     PacketSize: {
//                         MaxMtu: 1460
//                     }
//                 },
//                 Ikev2Server: {
//                     ipPools: {
//                         Name: 'ikev2-pool',
//                         Ranges: '192.168.77.10-192.168.77.100',
//                         comment: 'IKEv2 client pool'
//                     },
//                     profile: {
//                         name: 'ikev2-profile',
//                         hashAlgorithm: 'sha256',
//                         encAlgorithm: 'aes-256',
//                         dhGroup: 'modp2048',
//                         lifetime: '8h',
//                         natTraversal: true
//                     },
//                     proposal: {
//                         name: 'ikev2-proposal',
//                         authAlgorithms: 'sha256',
//                         encAlgorithms: 'aes-256-cbc',
//                         lifetime: '1h',
//                         pfsGroup: 'modp2048'
//                     },
//                     peer: {
//                         name: 'ikev2-peer',
//                         profile: 'ikev2-profile',
//                         exchangeMode: 'ike2',
//                         passive: true
//                     },
//                     identities: {
//                         authMethod: 'pre-shared-key',
//                         secret: 'preshared123',
//                         generatePolicy: 'port-strict',
//                         peer: 'ikev2-peer'
//                     }
//                 }
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'Complete VPN server configuration with all protocols',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             // Check that all major sections are present
//             expect(result['/interface wireguard']).toBeDefined();
//             expect(result['/interface ovpn-server server']).toBeDefined();
//             expect(result['/interface pptp-server server']).toBeDefined();
//             expect(result['/interface l2tp-server server']).toBeDefined();
//             expect(result['/interface sstp-server server']).toBeDefined();
//             expect(result['/ip ipsec profile']).toBeDefined();
//             expect(result['/ppp secret']).toBeDefined();
//             expect(result['/interface wireguard peers']).toBeDefined();

//             // Check summary comments
//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('VPN Server Configuration Summary'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('Total users: 4'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('WireGuard: 1 server(s)'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('OpenVPN: Enabled'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('PPTP: Enabled'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('L2TP: Enabled'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('SSTP: Enabled'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('IKEv2: Enabled'))).toBe(true);
//         });

//         it('should generate VPN server configuration with only WireGuard', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'wguser1', Password: 'pass1', VPNType: ['Wireguard'] },
//                     { Username: 'wguser2', Password: 'pass2', VPNType: ['Wireguard'] }
//                 ],
//                 WireguardServers: [{
//                     Interface: {
//                         Name: 'wg-server',
//                         PrivateKey: 'wgprivatekey',
//                         InterfaceAddress: '10.0.0.1/24',
//                         ListenPort: 51820
//                     },
//                     Peers: []
//                 }]
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'VPN server with only WireGuard',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             // Check WireGuard configuration
//             expect(result['/interface wireguard']).toBeDefined();
//             expect(result['/interface wireguard peers']).toBeDefined();

//             // Check that other VPN types are not configured
//             expect(result['/interface ovpn-server server']).toBeUndefined();
//             expect(result['/interface pptp-server server']).toBeUndefined();

//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('WireGuard: 1 server(s)'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('OpenVPN: Not configured'))).toBe(true);
//         });

//         it('should generate VPN server configuration with only traditional VPN protocols', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'pptp-user', Password: 'pass1', VPNType: ['PPTP'] },
//                     { Username: 'l2tp-user', Password: 'pass2', VPNType: ['L2TP'] },
//                     { Username: 'ovpn-user', Password: 'pass3', VPNType: ['OpenVPN'] }
//                 ],
//                 OpenVpnServer: {
//                     name: 'ovpn-server',
//                     enabled: true,
//                     Encryption: {},
//                     IPV6: {},
//                     Certificate: { Certificate: 'server-cert' },
//                     Address: {}
//                 },
//                 PptpServer: {
//                     enabled: true
//                 },
//                 L2tpServer: {
//                     enabled: true,
//                     IPsec: { UseIpsec: 'no' },
//                     L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
//                 }
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'VPN server with traditional protocols only',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             // Check traditional VPN configurations
//             expect(result['/interface ovpn-server server']).toBeDefined();
//             expect(result['/interface pptp-server server']).toBeDefined();
//             expect(result['/interface l2tp-server server']).toBeDefined();
//             expect(result['/ppp secret']).toBeDefined();

//             // Check that WireGuard is not configured
//             expect(result['/interface wireguard']).toBeUndefined();

//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('WireGuard: Not configured'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('OpenVPN: Enabled'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('PPTP: Enabled'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('L2TP: Enabled'))).toBe(true);
//         });
//     });

//     describe('VPN Server with Multiple WireGuard Servers', () => {
//         it('should generate configuration for multiple WireGuard servers', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'wg1-user', Password: 'pass1', VPNType: ['Wireguard'] },
//                     { Username: 'wg2-user', Password: 'pass2', VPNType: ['Wireguard'] }
//                 ],
//                 WireguardServers: [
//                     {
//                         Interface: {
//                             Name: 'wg-server-1',
//                             PrivateKey: 'key1',
//                             InterfaceAddress: '192.168.170.1/24',
//                             ListenPort: 51820
//                         },
//                         Peers: []
//                     },
//                     {
//                         Interface: {
//                             Name: 'wg-server-2',
//                             PrivateKey: 'key2',
//                             InterfaceAddress: '192.168.171.1/24',
//                             ListenPort: 51821
//                         },
//                         Peers: []
//                     }
//                 ]
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'Multiple WireGuard servers',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             // Check that both WireGuard servers are configured
//             const wireguardCommands = result['/interface wireguard'] || [];
//             expect(wireguardCommands.some((cmd: string) => cmd.includes('name=wg-server-1'))).toBe(true);
//             expect(wireguardCommands.some((cmd: string) => cmd.includes('name=wg-server-2'))).toBe(true);
//             expect(wireguardCommands.some((cmd: string) => cmd.includes('listen-port=51820'))).toBe(true);
//             expect(wireguardCommands.some((cmd: string) => cmd.includes('listen-port=51821'))).toBe(true);

//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('WireGuard: 2 server(s)'))).toBe(true);
//         });
//     });

//     describe('VPN Server with Certificates', () => {
//         it('should generate certificate configuration for SSTP and OpenVPN', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'ovpn-user', Password: 'pass1', VPNType: ['OpenVPN'] },
//                     { Username: 'sstp-user', Password: 'pass2', VPNType: ['SSTP'] }
//                 ],
//                 OpenVpnServer: {
//                     name: 'ovpn-server',
//                     enabled: true,
//                     Certificate: {
//                         Certificate: 'server-cert',
//                         RequireClientCertificate: true
//                     },
//                     Encryption: {},
//                     IPV6: {},
//                     Address: {}
//                 },
//                 SstpServer: {
//                     enabled: true,
//                     Certificate: 'server-cert'
//                 }
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'VPN server with certificates',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             // Check certificate configuration
//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('Certificate configuration for VPN servers'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('SSTP Server requires certificates'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('OpenVPN Server requires certificates'))).toBe(true);
//         });
//     });

//     describe('VPN Server with Binding Configuration', () => {
//         it('should generate static interface bindings for supported VPN types', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'pptp-user', Password: 'pass1', VPNType: ['PPTP'] },
//                     { Username: 'l2tp-user', Password: 'pass2', VPNType: ['L2TP'] },
//                     { Username: 'sstp-user', Password: 'pass3', VPNType: ['SSTP'] },
//                     { Username: 'ovpn-user', Password: 'pass4', VPNType: ['OpenVPN'] }
//                 ],
//                 OpenVpnServer: {
//                     name: 'ovpn-server',
//                     enabled: true,
//                     Encryption: {},
//                     IPV6: {},
//                     Certificate: { Certificate: 'cert' },
//                     Address: {}
//                 },
//                 PptpServer: { enabled: true },
//                 L2tpServer: {
//                     enabled: true,
//                     IPsec: { UseIpsec: 'no' },
//                     L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
//                 },
//                 SstpServer: {
//                     enabled: true,
//                     Certificate: 'cert'
//                 }
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'VPN server with binding configuration',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             // Check that binding interfaces are created
//             expect(result['/interface l2tp-server']).toBeDefined();
//             expect(result['/interface pptp-server']).toBeDefined();
//             expect(result['/interface sstp-server']).toBeDefined();
//             expect(result['/interface ovpn-server']).toBeDefined();

//             const l2tpCommands = result['/interface l2tp-server'] || [];
//             const pptpCommands = result['/interface pptp-server'] || [];
//             const sstpCommands = result['/interface sstp-server'] || [];
//             const ovpnCommands = result['/interface ovpn-server'] || [];

//             expect(l2tpCommands.some((cmd: string) => cmd.includes('user="l2tp-user"'))).toBe(true);
//             expect(pptpCommands.some((cmd: string) => cmd.includes('user="pptp-user"'))).toBe(true);
//             expect(sstpCommands.some((cmd: string) => cmd.includes('user="sstp-user"'))).toBe(true);
//             expect(ovpnCommands.some((cmd: string) => cmd.includes('user="ovpn-user"'))).toBe(true);
//         });
//     });

//     describe('Edge Cases', () => {
//         it('should handle empty VPN server configuration', () => {
//             const vpnServer: VPNServer = {
//                 Users: []
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'Empty VPN server configuration',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result, [""]);

//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('No VPN server interfaces configured'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('No VPN types found in user credentials'))).toBe(true);
//         });

//         it('should handle VPN server with users but no server configurations', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] },
//                     { Username: 'user2', Password: 'pass2', VPNType: ['OpenVPN'] }
//                 ]
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'Users without server configurations',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result, [""]);

//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('No VPN server interfaces configured'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('Total users: 2'))).toBe(true);
//         });

//         it('should handle disabled VPN servers', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'user1', Password: 'pass1', VPNType: ['PPTP', 'L2TP'] }
//                 ],
//                 PptpServer: {
//                     enabled: false
//                 },
//                 L2tpServer: {
//                     enabled: false,
//                     IPsec: { UseIpsec: 'no' },
//                     L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
//                 }
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'Disabled VPN servers',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             // Check that servers are configured but disabled
//             const pptpCommands = result['/interface pptp-server server'] || [];
//             const l2tpCommands = result['/interface l2tp-server server'] || [];

//             expect(pptpCommands.some((cmd: string) => cmd.includes('enabled=no'))).toBe(true);
//             expect(l2tpCommands.some((cmd: string) => cmd.includes('enabled=no'))).toBe(true);

//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('PPTP: Disabled'))).toBe(true);
//             expect(comments.some((c: string) => c.includes('L2TP: Disabled'))).toBe(true);
//         });

//         it('should handle users with empty VPNType arrays', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'no-vpn-user', Password: 'pass1', VPNType: [] },
//                     { Username: 'wg-user', Password: 'pass2', VPNType: ['Wireguard'] }
//                 ],
//                 WireguardServers: [{
//                     Interface: {
//                         Name: 'wg-server',
//                         PrivateKey: 'key',
//                         InterfaceAddress: '10.0.0.1/24'
//                     },
//                     Peers: []
//                 }]
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'Users with empty VPNType arrays',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             // Should only configure for users with valid VPN types
//             const peerCommands = result['/interface wireguard peers'] || [];
//             expect(peerCommands.some((cmd: string) => cmd.includes('name="wg-user"'))).toBe(true);
//             expect(peerCommands.some((cmd: string) => cmd.includes('name="no-vpn-user"'))).toBe(false);
//         });

//         it('should handle WireGuard server without interface address', () => {
//             const vpnServer: VPNServer = {
//                 Users: [
//                     { Username: 'wg-user', Password: 'pass1', VPNType: ['Wireguard'] }
//                 ],
//                 WireguardServers: [{
//                     Interface: {
//                         Name: 'wg-server',
//                         PrivateKey: 'key',
//                         InterfaceAddress: ''
//                     },
//                     Peers: []
//                 }]
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'WireGuard server without interface address',
//                 { vpnServer },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             const peerCommands = result['/interface wireguard peers'] || [];
//             expect(peerCommands.some((cmd: string) => cmd.includes('Server interface address is required'))).toBe(true);
//         });
//     });

//     describe('Performance and Large Configurations', () => {
//         it('should handle large number of users efficiently', () => {
//             const manyUsers = Array.from({ length: 50 }, (_, i) => ({
//                 Username: `user${i + 1}`,
//                 Password: `pass${i + 1}`,
//                 VPNType: ['Wireguard', 'OpenVPN', 'PPTP'][i % 3] as any
//             }));

//             const vpnServer: VPNServer = {
//                 Users: manyUsers,
//                 WireguardServers: [{
//                     Interface: {
//                         Name: 'wg-server',
//                         PrivateKey: 'key',
//                         InterfaceAddress: '10.0.0.1/24'
//                     },
//                     Peers: []
//                 }],
//                 OpenVpnServer: {
//                     name: 'ovpn-server',
//                     enabled: true,
//                     Encryption: {},
//                     IPV6: {},
//                     Certificate: { Certificate: 'cert' },
//                     Address: {}
//                 },
//                 PptpServer: {
//                     enabled: true
//                 }
//             };

//             testWithOutput(
//                 'VPNServerWrapper',
//                 'Large number of users',
//                 { vpnServer, userCount: manyUsers.length },
//                 () => VPNServerWrapper(vpnServer)
//             );

//             const result = VPNServerWrapper(vpnServer);
//             validateRouterConfig(result);

//             const comments = result[""] || [];
//             expect(comments.some((c: string) => c.includes('Total users: 50'))).toBe(true);

//             // Check that all user types are properly distributed
//             const peerCommands = result['/interface wireguard peers'] || [];
//             const secretCommands = result['/ppp secret'] || [];

//             // Should have appropriate number of WireGuard peers and PPP secrets
//             expect(peerCommands.filter((cmd: string) => cmd.includes('add')).length).toBeGreaterThan(10);
//             expect(secretCommands.filter((cmd: string) => cmd.includes('add')).length).toBeGreaterThan(20);
//         });
//     });
// });
