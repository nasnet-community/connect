import { describe, it, expect } from 'vitest';
import {
    VPNServerWrapper,
    WireguardServerWrapper,
    OVPNServerWrapper,
    PptpServerWrapper,
    L2tpServerWrapper,
    SstpServerWrapper,
    Ikev2ServerWrapper
} from './VPNServerWrapper';
import type {
    VPNServer,
    WireguardInterfaceConfig,
    OpenVpnServerConfig,
    PptpServerConfig,
    L2tpServerConfig,
    SstpServerConfig,
    Ikev2ServerConfig,
    Credentials
} from '~/components/Star/StarContext/Utils/VPNServerType';
import type { NetworkProtocol } from '~/components/Star/StarContext/CommonType';
import { testWithOutput } from "../../../../../test-utils/test-helpers";

// Helper function to validate RouterConfig structure
function validateRouterConfig(result: any, expectedSections?: string[]) {
    expect(result).toBeDefined();
    expect(typeof result).toBe('object');
    
    if (expectedSections) {
        expectedSections.forEach(section => {
            expect(result[section]).toBeDefined();
        });
    }
}

describe('VPN Server Wrapper Tests', () => {

    const testUsers: Credentials[] = [
        { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard', 'OpenVPN'] },
        { Username: 'user2', Password: 'pass2', VPNType: ['PPTP', 'L2TP'] },
        { Username: 'user3', Password: 'pass3', VPNType: ['SSTP', 'IKeV2'] }
    ];

    describe('VPNServerWrapper - Main Function', () => {
        it('should generate complete VPN server configuration with all protocols', () => {
            const vpnServer: VPNServer = {
                Users: testUsers,
                WireguardServers: [{
                    Interface: {
                        Name: 'wireguard-server',
                        PrivateKey: 'privatekey123',
                        InterfaceAddress: '192.168.170.1/24',
                        ListenPort: 13231,
                        Mtu: 1420
                    },
                    Peers: []
                }],
                OpenVpnServer: {
                    name: 'openvpn-server',
                    enabled: true,
                    Port: 1194,
                    Protocol: 'udp' as NetworkProtocol,
                    Mode: 'ip',
                    DefaultProfile: 'ovpn-profile',
                    Encryption: {
                        Auth: ['sha256'],
                        Cipher: ['aes256-cbc']
                    },
                    IPV6: {},
                    Certificate: {
                        Certificate: 'server-cert'
                    },
                    Address: {
                        AddressPool: 'ovpn-pool'
                    }
                },
                PptpServer: {
                    enabled: true,
                    Authentication: ['mschap2'],
                    DefaultProfile: 'pptp-profile'
                },
                L2tpServer: {
                    enabled: true,
                    IPsec: {
                        UseIpsec: 'required',
                        IpsecSecret: 'sharedsecret123'
                    },
                    L2TPV3: {
                        l2tpv3EtherInterfaceList: 'LAN'
                    }
                },
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                },
                Ikev2Server: {
                    ipPools: {
                        Name: 'ikev2-pool',
                        Ranges: '192.168.77.10-192.168.77.100'
                    },
                    profile: {
                        name: 'ikev2-profile',
                        hashAlgorithm: 'sha256',
                        encAlgorithm: 'aes-256',
                        dhGroup: 'modp2048'
                    },
                    proposal: {
                        name: 'ikev2-proposal',
                        authAlgorithms: 'sha256',
                        encAlgorithms: 'aes-256-cbc'
                    },
                    peer: {
                        name: 'ikev2-peer',
                        profile: 'ikev2-profile',
                        passive: true
                    },
                    identities: {
                        authMethod: 'pre-shared-key',
                        secret: 'preshared123',
                        peer: 'ikev2-peer'
                    }
                }
            };

            const result = testWithOutput(
                'VPNServerWrapper',
                'Complete VPN server configuration with all protocols',
                { vpnServer },
                () => VPNServerWrapper(vpnServer)
            );

            validateRouterConfig(result);

            // Check summary comments
            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('VPN Server Complete Configuration'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Total VPN Users: 3'))).toBe(true);
            expect(comments.some((c: string) => c.includes('WireGuard, OpenVPN, PPTP, L2TP, SSTP, IKEv2'))).toBe(true);
        });

        it('should handle VPN server with only WireGuard configured', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'wguser1', Password: 'pass1', VPNType: ['Wireguard'] },
                    { Username: 'wguser2', Password: 'pass2', VPNType: ['Wireguard'] }
                ],
                WireguardServers: [{
                    Interface: {
                        Name: 'wg-server',
                        PrivateKey: 'wgprivatekey',
                        InterfaceAddress: '10.0.0.1/24',
                        ListenPort: 51820
                    },
                    Peers: []
                }]
            };

            const result = testWithOutput(
                'VPNServerWrapper',
                'VPN server with only WireGuard',
                { vpnServer },
                () => VPNServerWrapper(vpnServer)
            );

            validateRouterConfig(result);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('WireGuard: 2 users'))).toBe(true);
        });

        it('should handle empty VPN server configuration', () => {
            const vpnServer: VPNServer = {
                Users: []
            };

            const result = testWithOutput(
                'VPNServerWrapper',
                'Empty VPN server configuration',
                { vpnServer },
                () => VPNServerWrapper(vpnServer)
            );

            validateRouterConfig(result, [""]);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('No VPN users configured'))).toBe(true);
        });

        it('should handle VPN server with users but no server configurations', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] },
                    { Username: 'user2', Password: 'pass2', VPNType: ['OpenVPN'] }
                ]
            };

            const result = testWithOutput(
                'VPNServerWrapper',
                'Users without server configurations',
                { vpnServer },
                () => VPNServerWrapper(vpnServer)
            );

            validateRouterConfig(result);

            // When no server configurations exist, only users are defined, 
            // no certificates are needed so minimal config is generated
            const comments = result[""] || [];
            // Check that it shows 0 protocols configured when no servers are defined
            expect(comments.some((c: string) => c.includes('Configured Protocols:'))).toBe(true);
            // Verify the total is still tracked
            expect(comments.some((c: string) => c.includes('Total VPN Users: 2'))).toBe(true);
        });
    });

    describe('WireguardServerWrapper', () => {
        it('should generate complete WireGuard server configuration with users', () => {
            const interfaceConfig: WireguardInterfaceConfig = {
                Name: 'wireguard-server',
                PrivateKey: 'test-private-key-123',
                InterfaceAddress: '192.168.170.1/24',
                ListenPort: 13231,
                Mtu: 1420
            };

            const result = testWithOutput(
                'WireguardServerWrapper',
                'Complete WireGuard configuration with users',
                { interfaceConfig, users: testUsers },
                () => WireguardServerWrapper(interfaceConfig, testUsers)
            );

            validateRouterConfig(result, [
                '/interface wireguard',
                '/ip address',
                '/interface list member',
                '/ip firewall address-list',
                '/ip firewall filter'
            ]);

            // Check summary comments
            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('WireGuard Server Configuration Summary'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Users: 1'))).toBe(true); // Only 1 user has Wireguard VPNType
        });

        it('should generate WireGuard server configuration without users', () => {
            const interfaceConfig: WireguardInterfaceConfig = {
                Name: 'wireguard-server',
                PrivateKey: 'test-private-key-123',
                InterfaceAddress: '192.168.170.1/24'
            };

            const result = testWithOutput(
                'WireguardServerWrapper',
                'WireGuard configuration without users',
                { interfaceConfig, users: [] },
                () => WireguardServerWrapper(interfaceConfig, [])
            );

            validateRouterConfig(result, ['/interface wireguard']);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('Users: 0'))).toBe(true);
        });
    });

    describe('OVPNServerWrapper', () => {
        it('should generate complete OpenVPN server configuration with users', () => {
            const serverConfig: OpenVpnServerConfig = {
                name: 'openvpn-server',
                enabled: true,
                Port: 1194,
                Protocol: 'udp' as NetworkProtocol,
                Mode: 'ip',
                DefaultProfile: 'ovpn-profile',
                Encryption: {
                    Auth: ['sha256'],
                    Cipher: ['aes256-cbc']
                },
                IPV6: {},
                Certificate: {
                    Certificate: 'server-cert'
                },
                Address: {
                    AddressPool: 'ovpn-pool'
                }
            };

            const result = testWithOutput(
                'OVPNServerWrapper',
                'Complete OpenVPN configuration with users',
                { serverConfig, users: testUsers },
                () => OVPNServerWrapper(serverConfig, testUsers)
            );

            validateRouterConfig(result, [
                '/ip pool',
                '/ppp profile',
                '/interface ovpn-server server',
                '/ip firewall filter',
                '/ppp secret'
            ]);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('OpenVPN Server Configuration Summary'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Users: 1'))).toBe(true); // Only 1 user has OpenVPN VPNType
        });
    });

    describe('PptpServerWrapper', () => {
        it('should generate complete PPTP server configuration with users', () => {
            const serverConfig: PptpServerConfig = {
                enabled: true,
                Authentication: ['mschap2'],
                DefaultProfile: 'pptp-profile',
                KeepaliveTimeout: 30,
                PacketSize: {
                    MaxMtu: 1460,
                    MaxMru: 1460
                }
            };

            const result = testWithOutput(
                'PptpServerWrapper',
                'Complete PPTP configuration with users',
                { serverConfig, users: testUsers },
                () => PptpServerWrapper(serverConfig, testUsers)
            );

            validateRouterConfig(result, [
                '/interface pptp-server server',
                '/ppp secret'
            ]);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('PPTP Server Configuration Summary'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Users: 1'))).toBe(true); // Only 1 user has PPTP VPNType
        });
    });

    describe('L2tpServerWrapper', () => {
        it('should generate complete L2TP server configuration with users', () => {
            const serverConfig: L2tpServerConfig = {
                enabled: true,
                IPsec: {
                    UseIpsec: 'required',
                    IpsecSecret: 'sharedsecret123'
                },
                Authentication: ['mschap2'],
                DefaultProfile: 'l2tp-profile',
                KeepaliveTimeout: 30,
                PacketSize: {
                    MaxMtu: 1460
                },
                L2TPV3: {
                    l2tpv3EtherInterfaceList: 'LAN'
                }
            };

            const result = testWithOutput(
                'L2tpServerWrapper',
                'Complete L2TP configuration with users',
                { serverConfig, users: testUsers },
                () => L2tpServerWrapper(serverConfig, testUsers)
            );

            validateRouterConfig(result, [
                '/interface l2tp-server server',
                '/ppp secret'
            ]);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('L2TP Server Configuration Summary'))).toBe(true);
            expect(comments.some((c: string) => c.includes('IPsec: required'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Users: 1'))).toBe(true); // Only 1 user has L2TP VPNType
        });
    });

    describe('SstpServerWrapper', () => {
        it('should generate complete SSTP server configuration with users', () => {
            const serverConfig: SstpServerConfig = {
                enabled: true,
                Certificate: 'server-cert',
                Port: 443,
                Authentication: ['mschap2'],
                DefaultProfile: 'sstp-profile',
                KeepaliveTimeout: 30,
                PacketSize: {
                    MaxMtu: 1460
                }
            };

            const result = testWithOutput(
                'SstpServerWrapper',
                'Complete SSTP configuration with users',
                { serverConfig, users: testUsers },
                () => SstpServerWrapper(serverConfig, testUsers)
            );

            validateRouterConfig(result, [
                '/interface sstp-server server',
                '/ip firewall filter',
                '/ppp secret'
            ]);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('SSTP Server Configuration Summary'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Certificate: server-cert'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Users: 1'))).toBe(true); // Only 1 user has SSTP VPNType
        });
    });

    describe('Ikev2ServerWrapper', () => {
        it('should generate complete IKEv2 server configuration with users', () => {
            const serverConfig: Ikev2ServerConfig = {
                ipPools: {
                    Name: 'ikev2-pool',
                    Ranges: '192.168.77.10-192.168.77.100'
                },
                profile: {
                    name: 'ikev2-profile',
                    hashAlgorithm: 'sha256',
                    encAlgorithm: 'aes-256',
                    dhGroup: 'modp2048'
                },
                proposal: {
                    name: 'ikev2-proposal',
                    authAlgorithms: 'sha256',
                    encAlgorithms: 'aes-256-cbc'
                },
                peer: {
                    name: 'ikev2-peer',
                    profile: 'ikev2-profile',
                    passive: true
                },
                identities: {
                    authMethod: 'pre-shared-key',
                    secret: 'preshared123',
                    peer: 'ikev2-peer'
                }
            };

            const result = testWithOutput(
                'Ikev2ServerWrapper',
                'Complete IKEv2 configuration with users',
                { serverConfig, users: testUsers },
                () => Ikev2ServerWrapper(serverConfig, testUsers)
            );

            validateRouterConfig(result, [
                '/ip pool',
                '/ip ipsec profile',
                '/ip ipsec proposal',
                '/ip ipsec peer',
                '/ip ipsec identity',
                '/ip firewall filter'
            ]);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('IKEv2 Server Configuration Summary'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Auth Method: pre-shared-key'))).toBe(true);
            expect(comments.some((c: string) => c.includes('Users: 1'))).toBe(true); // Only 1 user has IKeV2 VPNType
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('should handle null VPN server', () => {
            const result = testWithOutput(
                'VPNServerWrapper',
                'Null VPN server',
                { vpnServer: null },
                () => VPNServerWrapper(null as any)
            );

            validateRouterConfig(result, [""]);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('No VPN Server configuration provided'))).toBe(true);
        });

        it('should handle empty user arrays for all VPN types', () => {
            const wireguardConfig: WireguardInterfaceConfig = {
                Name: 'wg-test',
                PrivateKey: 'key',
                InterfaceAddress: '192.168.1.1/24'
            };

            const result = WireguardServerWrapper(wireguardConfig, []);
            validateRouterConfig(result);
            
            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('Users: 0'))).toBe(true);
        });

        it('should filter users correctly by VPN type', () => {
            const mixedUsers: Credentials[] = [
                { Username: 'wg-user', Password: 'pass', VPNType: ['Wireguard'] },
                { Username: 'ovpn-user', Password: 'pass', VPNType: ['OpenVPN'] },
                { Username: 'multi-user', Password: 'pass', VPNType: ['Wireguard', 'OpenVPN', 'PPTP'] }
            ];

            const wireguardConfig: WireguardInterfaceConfig = {
                Name: 'wg-test',
                PrivateKey: 'key',
                InterfaceAddress: '192.168.1.1/24'
            };

            const result = WireguardServerWrapper(wireguardConfig, mixedUsers);
            
            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('Users: 2'))).toBe(true); // wg-user and multi-user
        });

        it('should handle VPN server with multiple WireGuard servers', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'wg1-user', Password: 'pass1', VPNType: ['Wireguard'] },
                    { Username: 'wg2-user', Password: 'pass2', VPNType: ['Wireguard'] }
                ],
                WireguardServers: [
                    {
                        Interface: {
                            Name: 'wg-server-1',
                            PrivateKey: 'key1',
                            InterfaceAddress: '192.168.170.1/24',
                            ListenPort: 51820
                        },
                        Peers: []
                    },
                    {
                        Interface: {
                            Name: 'wg-server-2',
                            PrivateKey: 'key2',
                            InterfaceAddress: '192.168.171.1/24',
                            ListenPort: 51821
                        },
                        Peers: []
                    }
                ]
            };

            const result = testWithOutput(
                'VPNServerWrapper',
                'Multiple WireGuard servers',
                { vpnServer },
                () => VPNServerWrapper(vpnServer)
            );

            validateRouterConfig(result);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('WireGuard: 2 users'))).toBe(true);
        });

        it('should handle disabled VPN servers', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'user1', Password: 'pass1', VPNType: ['PPTP', 'L2TP'] }
                ],
                PptpServer: {
                    enabled: false
                },
                L2tpServer: {
                    enabled: false,
                    IPsec: { UseIpsec: 'no' },
                    L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
                }
            };

            const result = testWithOutput(
                'VPNServerWrapper',
                'Disabled VPN servers',
                { vpnServer },
                () => VPNServerWrapper(vpnServer)
            );

            validateRouterConfig(result);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('PPTP: 1 users'))).toBe(true);
            expect(comments.some((c: string) => c.includes('L2TP: 1 users'))).toBe(true);
        });
    });

    describe('Network Configuration', () => {
        it('should verify network assignments in summary', () => {
            const vpnServer: VPNServer = {
                Users: testUsers,
                WireguardServers: [{
                    Interface: {
                        Name: 'wg-server',
                        PrivateKey: 'key',
                        InterfaceAddress: '192.168.170.1/24'
                    },
                    Peers: []
                }],
                OpenVpnServer: {
                    name: 'ovpn-server',
                    enabled: true,
                    Encryption: {},
                    IPV6: {},
                    Certificate: { Certificate: 'cert' },
                    Address: {}
                }
            };

            const result = testWithOutput(
                'VPNServerWrapper',
                'Network assignments verification',
                { vpnServer },
                () => VPNServerWrapper(vpnServer)
            );

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('WireGuard: 192.168.170.0/24'))).toBe(true);
            expect(comments.some((c: string) => c.includes('OpenVPN: 192.168.60.0/24'))).toBe(true);
        });

        it('should include certificate management in comprehensive configuration', () => {
            const vpnServer: VPNServer = {
                Users: [{ Username: 'user1', Password: 'pass1', VPNType: ['SSTP'] }],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                }
            };

            const result = testWithOutput(
                'VPNServerWrapper',
                'Certificate management inclusion',
                { vpnServer },
                () => VPNServerWrapper(vpnServer)
            );

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('Certificate management (Let\'s Encrypt + Private certificates)'))).toBe(true);
        });
    });
}); 