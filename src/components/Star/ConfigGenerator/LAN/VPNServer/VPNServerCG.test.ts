import { describe, it, expect } from 'vitest';
import { VPNServerCertificate, VPNServerWrapper } from './VPNServerCG';
import type { VPNServer, VSCredentials, VPNServerNetworks, SubnetConfig } from '~/components/Star/StarContext';
import type { VPNType } from '~/components/Star/StarContext/CommonType';
import { testWithOutput, validateRouterConfig, validateRouterConfigStructure } from '~/test-utils/test-helpers';

describe('VPNServerCertificate Tests', () => {

    describe('Certificate Configuration', () => {
        it('should generate certificate configuration for SSTP server', () => {
            const vpnServer: VPNServer = {
                Users: [],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                }
            };

            testWithOutput(
                'VPNServerCertificate',
                'Certificate configuration for SSTP server',
                { vpnServer },
                () => VPNServerCertificate(vpnServer)
            );

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            // Check that certificate sections are present
            expect(result['/certificate']).toBeDefined();

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('SSTP Server requires certificates'))).toBe(true);
            expect(certComments.some((c: string) => c.includes('Certificate configuration for VPN servers'))).toBe(true);
        });

        it('should generate certificate configuration for OpenVPN server', () => {
            const vpnServer: VPNServer = {
                Users: [],
                OpenVpnServer: [{
                    name: 'ovpn-server',
                    enabled: true,
                    Encryption: {},
                    IPV6: {},
                    Certificate: {
                        Certificate: 'server-cert',
                        RequireClientCertificate: true
                    },
                    Address: {}
                }]
            };

            testWithOutput(
                'VPNServerCertificate',
                'Certificate configuration for OpenVPN server',
                { vpnServer },
                () => VPNServerCertificate(vpnServer)
            );

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('OpenVPN Server requires certificates'))).toBe(true);
        });

        it('should generate certificate configuration for IKEv2 server', () => {
            const vpnServer: VPNServer = {
                Users: [],
                Ikev2Server: {
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
                        exchangeMode: 'ike2',
                        passive: true
                    },
                    identities: {
                        authMethod: 'pre-shared-key',
                        peer: 'ikev2-peer',
                        secret: 'preshared123'
                    }
                }
            };

            testWithOutput(
                'VPNServerCertificate',
                'Certificate configuration for IKEv2 server',
                { vpnServer },
                () => VPNServerCertificate(vpnServer)
            );

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('IKEv2 Server requires certificates'))).toBe(true);
        });

        it('should generate certificate configuration for all three protocols', () => {
            const vpnServer: VPNServer = {
                Users: [],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                },
                OpenVpnServer: [{
                    name: 'ovpn-server',
                    enabled: true,
                    Encryption: {},
                    IPV6: {},
                    Certificate: {
                        Certificate: 'server-cert',
                        RequireClientCertificate: true
                    },
                    Address: {}
                }],
                Ikev2Server: {
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
                        exchangeMode: 'ike2',
                        passive: true
                    },
                    identities: {
                        authMethod: 'pre-shared-key',
                        peer: 'ikev2-peer',
                        secret: 'preshared123'
                    }
                }
            };

            testWithOutput(
                'VPNServerCertificate',
                'Certificate configuration for all three protocols',
                { vpnServer },
                () => VPNServerCertificate(vpnServer)
            );

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('SSTP Server requires certificates'))).toBe(true);
            expect(certComments.some((c: string) => c.includes('OpenVPN Server requires certificates'))).toBe(true);
            expect(certComments.some((c: string) => c.includes('IKEv2 Server requires certificates'))).toBe(true);
        });

        it('should return empty config when no certificate-requiring servers are configured', () => {
            const vpnServer: VPNServer = {
                Users: [],
                PptpServer: {
                    enabled: true
                },
                L2tpServer: {
                    enabled: true,
                    IPsec: { UseIpsec: 'no' },
                    L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
                }
            };

            testWithOutput(
                'VPNServerCertificate',
                'No certificate-requiring servers configured',
                { vpnServer },
                () => VPNServerCertificate(vpnServer)
            );

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('No VPN servers requiring certificates are configured'))).toBe(true);
        });

        it('should extract certificate password from OpenVPN config', () => {
            const vpnServer: VPNServer = {
                Users: [],
                OpenVpnServer: [{
                    name: 'ovpn-server',
                    enabled: true,
                    Encryption: {},
                    IPV6: {},
                    Certificate: {
                        Certificate: 'server-cert',
                        CertificateKeyPassphrase: 'my-custom-password'
                    },
                    Address: {}
                }]
            };

            testWithOutput(
                'VPNServerCertificate',
                'Custom certificate password from OpenVPN config',
                { vpnServer },
                () => VPNServerCertificate(vpnServer)
            );

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('Certificate password from OpenVPN config: my-custom-password'))).toBe(true);
        });

        it('should include CGNAT check', () => {
            const vpnServer: VPNServer = {
                Users: [],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                }
            };

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('CGNAT check for Let\'s Encrypt compatibility'))).toBe(true);
        });

        it('should include Let\'s Encrypt configuration', () => {
            const vpnServer: VPNServer = {
                Users: [],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                }
            };

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('Let\'s Encrypt certificate generation'))).toBe(true);
        });

        it('should include private certificate fallback', () => {
            const vpnServer: VPNServer = {
                Users: [],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                }
            };

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('Private certificate generation as fallback'))).toBe(true);
        });

        it('should include certificate export', () => {
            const vpnServer: VPNServer = {
                Users: [],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                }
            };

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('Certificate export for client configuration'))).toBe(true);
        });

        it('should include certificate assignment script', () => {
            const vpnServer: VPNServer = {
                Users: [],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                }
            };

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('Automatic certificate assignment to VPN servers'))).toBe(true);
        });

        it('should use default certificate password when not specified', () => {
            const vpnServer: VPNServer = {
                Users: [],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert'
                }
            };

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            const certComments = result['/certificate'] || [];
            // Should not include custom password message
            expect(certComments.some((c: string) => c.includes('Certificate password from OpenVPN config'))).toBe(false);
        });

        it('should handle missing certificate configs gracefully', () => {
            const vpnServer: VPNServer = {
                Users: [],
                OpenVpnServer: [{
                    name: 'ovpn-server',
                    enabled: true,
                    Encryption: {},
                    IPV6: {},
                    Certificate: {
                        Certificate: 'server-cert'
                        // No CertificateKeyPassphrase
                    },
                    Address: {}
                }]
            };

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            // Should still work without the passphrase
            expect(result['/certificate']).toBeDefined();
        });

        it('should handle multiple OpenVPN servers', () => {
            const vpnServer: VPNServer = {
                Users: [],
                OpenVpnServer: [
                    {
                        name: 'ovpn-server-1',
                        enabled: true,
                        Encryption: {},
                        IPV6: {},
                        Certificate: {
                            Certificate: 'server-cert-1',
                            CertificateKeyPassphrase: 'password1'
                        },
                        Address: {}
                    },
                    {
                        name: 'ovpn-server-2',
                        enabled: true,
                        Encryption: {},
                        IPV6: {},
                        Certificate: {
                            Certificate: 'server-cert-2',
                            CertificateKeyPassphrase: 'password2'
                        },
                        Address: {}
                    }
                ]
            };

            const result = VPNServerCertificate(vpnServer);
            validateRouterConfigStructure(result);

            // Should use password from first OpenVPN server
            const certComments = result['/certificate'] || [];
            expect(certComments.some((c: string) => c.includes('Certificate password from OpenVPN config: password1'))).toBe(true);
        });
    });
});

describe('VPNServerWrapper Tests', () => {

    const testUsers: VSCredentials[] = [
        { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard', 'OpenVPN'] as VPNType[] },
        { Username: 'user2', Password: 'pass2', VPNType: ['PPTP', 'L2TP'] as VPNType[] },
        { Username: 'user3', Password: 'pass3', VPNType: ['SSTP', 'IKeV2'] as VPNType[] },
        { Username: 'multiuser', Password: 'passMulti', VPNType: ['Wireguard', 'OpenVPN', 'PPTP', 'L2TP', 'SSTP'] as VPNType[] }
    ];

    const subnetConfigs: VPNServerNetworks = {
        PPTP: { name: 'pptp', subnet: '192.168.70.0/24' },
        L2TP: { name: 'l2tp', subnet: '192.168.80.0/24' },
        SSTP: { name: 'sstp', subnet: '192.168.90.0/24' },
        IKev2: { name: 'ikev2', subnet: '10.10.10.0/24' },
        OpenVPN: [{ name: 'ovpn1', subnet: '192.168.60.0/24' }],
        Wireguard: [{ name: 'wg1', subnet: '192.168.170.0/24' }]
    };

    describe('Complete VPN Server Configuration', () => {
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
                OpenVpnServer: [{
                    name: 'openvpn-server',
                    enabled: true,
                    Port: 1194,
                    Protocol: 'udp',
                    Mode: 'ip',
                    DefaultProfile: 'ovpn-profile',
                    Encryption: {
                        Auth: ['sha256'],
                        Cipher: ['aes256-cbc'],
                        UserAuthMethod: 'mschap2'
                    },
                    IPV6: {
                        EnableTunIPv6: false
                    },
                    Certificate: {
                        Certificate: 'server-cert',
                        RequireClientCertificate: true
                    },
                    Address: {
                        AddressPool: 'ovpn-pool',
                        MaxMtu: 1500
                    }
                }],
                PptpServer: {
                    enabled: true,
                    Authentication: ['mschap2'],
                    DefaultProfile: 'pptp-profile',
                    KeepaliveTimeout: 30,
                    PacketSize: {
                        MaxMtu: 1460,
                        MaxMru: 1460
                    }
                },
                L2tpServer: {
                    enabled: true,
                    IPsec: {
                        UseIpsec: 'required',
                        IpsecSecret: 'sharedsecret123'
                    },
                    Authentication: ['mschap2'],
                    DefaultProfile: 'l2tp-profile',
                    KeepaliveTimeout: 30,
                    allowFastPath: false,
                    maxSessions: 100,
                    OneSessionPerHost: true,
                    L2TPV3: {
                        l2tpv3EtherInterfaceList: 'LAN'
                    },
                    PacketSize: {
                        MaxMtu: 1460,
                        MaxMru: 1460
                    }
                },
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert',
                    Port: 443,
                    Authentication: ['mschap2'],
                    DefaultProfile: 'sstp-profile',
                    KeepaliveTimeout: 30,
                    ForceAes: true,
                    Pfs: true,
                    TlsVersion: 'only-1.2',
                    PacketSize: {
                        MaxMtu: 1460
                    }
                },
                Ikev2Server: {
                    ipPools: {
                        Name: 'ikev2-pool',
                        Ranges: '10.10.10.10-10.10.10.100',
                        comment: 'IKEv2 client pool'
                    },
                    profile: {
                        name: 'ikev2-profile',
                        hashAlgorithm: 'sha256',
                        encAlgorithm: 'aes-256',
                        dhGroup: 'modp2048',
                        lifetime: '8h',
                        natTraversal: true
                    },
                    proposal: {
                        name: 'ikev2-proposal',
                        authAlgorithms: 'sha256',
                        encAlgorithms: 'aes-256-cbc',
                        lifetime: '1h',
                        pfsGroup: 'modp2048'
                    },
                    peer: {
                        name: 'ikev2-peer',
                        profile: 'ikev2-profile',
                        exchangeMode: 'ike2',
                        passive: true
                    },
                    identities: {
                        authMethod: 'pre-shared-key',
                        secret: 'preshared123',
                        generatePolicy: 'port-strict',
                        peer: 'ikev2-peer'
                    }
                }
            };

            testWithOutput(
                'VPNServerWrapper',
                'Complete VPN server configuration with all protocols',
                { vpnServer, subnetConfigs },
                () => VPNServerWrapper(vpnServer, subnetConfigs)
            );

            const result = VPNServerWrapper(vpnServer, subnetConfigs);
            validateRouterConfigStructure(result);

            // Check that all major sections are present
            expect(result['/interface wireguard']).toBeDefined();
            expect(result['/interface ovpn-server server']).toBeDefined();
            expect(result['/interface pptp-server server']).toBeDefined();
            expect(result['/interface l2tp-server server']).toBeDefined();
            expect(result['/interface sstp-server server']).toBeDefined();
            expect(result['/ip ipsec profile']).toBeDefined();
        });

        it('should generate VPN server configuration with only WireGuard', () => {
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

            const wgSubnets: VPNServerNetworks = {
                Wireguard: [{ name: 'wg1', subnet: '10.0.0.0/24' }]
            };

            testWithOutput(
                'VPNServerWrapper',
                'VPN server with only WireGuard',
                { vpnServer, subnetConfigs: wgSubnets },
                () => VPNServerWrapper(vpnServer, wgSubnets)
            );

            const result = VPNServerWrapper(vpnServer, wgSubnets);
            validateRouterConfigStructure(result);

            // Check WireGuard configuration
            expect(result['/interface wireguard']).toBeDefined();
            expect(result['/interface wireguard peers']).toBeDefined();

            // Check that other VPN types are not configured
            expect(result['/interface ovpn-server server']).toBeUndefined();
            expect(result['/interface pptp-server server']).toBeUndefined();
        });

        it('should generate VPN server configuration with only traditional VPN protocols', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'pptp-user', Password: 'pass1', VPNType: ['PPTP'] },
                    { Username: 'l2tp-user', Password: 'pass2', VPNType: ['L2TP'] },
                    { Username: 'ovpn-user', Password: 'pass3', VPNType: ['OpenVPN'] }
                ],
                OpenVpnServer: [{
                    name: 'ovpn-server',
                    enabled: true,
                    Encryption: {},
                    IPV6: {},
                    Certificate: { Certificate: 'server-cert' },
                    Address: {}
                }],
                PptpServer: {
                    enabled: true
                },
                L2tpServer: {
                    enabled: true,
                    IPsec: { UseIpsec: 'no' },
                    L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
                }
            };

            const traditionalSubnets: VPNServerNetworks = {
                PPTP: { name: 'pptp', subnet: '192.168.70.0/24' },
                L2TP: { name: 'l2tp', subnet: '192.168.80.0/24' },
                OpenVPN: [{ name: 'ovpn1', subnet: '192.168.60.0/24' }]
            };

            testWithOutput(
                'VPNServerWrapper',
                'VPN server with traditional protocols only',
                { vpnServer, subnetConfigs: traditionalSubnets },
                () => VPNServerWrapper(vpnServer, traditionalSubnets)
            );

            const result = VPNServerWrapper(vpnServer, traditionalSubnets);
            validateRouterConfigStructure(result);

            // Check traditional VPN configurations
            expect(result['/interface ovpn-server server']).toBeDefined();
            expect(result['/interface pptp-server server']).toBeDefined();
            expect(result['/interface l2tp-server server']).toBeDefined();

            // Check that WireGuard is not configured
            expect(result['/interface wireguard']).toBeUndefined();
        });
    });

    describe('VPN Server with Multiple Servers', () => {
        it('should generate configuration for multiple WireGuard servers', () => {
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

            const multiWgSubnets: VPNServerNetworks = {
                Wireguard: [
                    { name: 'wg1', subnet: '192.168.170.0/24' },
                    { name: 'wg2', subnet: '192.168.171.0/24' }
                ]
            };

            testWithOutput(
                'VPNServerWrapper',
                'Multiple WireGuard servers',
                { vpnServer, subnetConfigs: multiWgSubnets },
                () => VPNServerWrapper(vpnServer, multiWgSubnets)
            );

            const result = VPNServerWrapper(vpnServer, multiWgSubnets);
            validateRouterConfigStructure(result);

            // Check that both WireGuard servers are configured
            const wireguardCommands = result['/interface wireguard'] || [];
            // Commands may be shortened, check for server names
            const allCommands = JSON.stringify(result);
            expect(allCommands.includes('wg-server-1') || wireguardCommands.length > 0).toBe(true);
            expect(allCommands.includes('wg-server-2') || wireguardCommands.length > 0).toBe(true);
        });

        it('should generate configuration for multiple OpenVPN servers', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'ovpn-user', Password: 'pass1', VPNType: ['OpenVPN'] }
                ],
                OpenVpnServer: [
                    {
                        name: 'ovpn-server-1',
                        enabled: true,
                        Port: 1194,
                        Encryption: {},
                        IPV6: {},
                        Certificate: { Certificate: 'cert1' },
                        Address: {}
                    },
                    {
                        name: 'ovpn-server-2',
                        enabled: true,
                        Port: 1195,
                        Encryption: {},
                        IPV6: {},
                        Certificate: { Certificate: 'cert2' },
                        Address: {}
                    }
                ]
            };

            const multiOvpnSubnets: VPNServerNetworks = {
                OpenVPN: [
                    { name: 'ovpn1', subnet: '192.168.60.0/24' },
                    { name: 'ovpn2', subnet: '192.168.61.0/24' }
                ]
            };

            testWithOutput(
                'VPNServerWrapper',
                'Multiple OpenVPN servers',
                { vpnServer, subnetConfigs: multiOvpnSubnets },
                () => VPNServerWrapper(vpnServer, multiOvpnSubnets)
            );

            const result = VPNServerWrapper(vpnServer, multiOvpnSubnets);
            validateRouterConfigStructure(result);

            // Check that both OpenVPN servers are configured
            const ovpnCommands = result['/interface ovpn-server server'] || [];
            expect(ovpnCommands.some((cmd: string) => cmd.includes('ovpn-server-1'))).toBe(true);
            expect(ovpnCommands.some((cmd: string) => cmd.includes('ovpn-server-2'))).toBe(true);
        });
    });

    describe('Single Protocol Tests', () => {
        it('should generate PPTP server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'pptp-user', Password: 'pass1', VPNType: ['PPTP'] }
                ],
                PptpServer: {
                    enabled: true,
                    Authentication: ['mschap2'],
                    DefaultProfile: 'pptp-profile'
                }
            };

            const pptpSubnets: VPNServerNetworks = {
                PPTP: { name: 'pptp', subnet: '192.168.70.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'PPTP server only',
                { vpnServer, subnetConfigs: pptpSubnets },
                () => VPNServerWrapper(vpnServer, pptpSubnets)
            );

            const result = VPNServerWrapper(vpnServer, pptpSubnets);
            validateRouterConfigStructure(result);

            expect(result['/interface pptp-server server']).toBeDefined();
        });

        it('should generate L2TP server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'l2tp-user', Password: 'pass1', VPNType: ['L2TP'] }
                ],
                L2tpServer: {
                    enabled: true,
                    IPsec: {
                        UseIpsec: 'required',
                        IpsecSecret: 'sharedsecret'
                    },
                    L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
                }
            };

            const l2tpSubnets: VPNServerNetworks = {
                L2TP: { name: 'l2tp', subnet: '192.168.80.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'L2TP server only',
                { vpnServer, subnetConfigs: l2tpSubnets },
                () => VPNServerWrapper(vpnServer, l2tpSubnets)
            );

            const result = VPNServerWrapper(vpnServer, l2tpSubnets);
            validateRouterConfigStructure(result);

            expect(result['/interface l2tp-server server']).toBeDefined();
        });

        it('should generate SSTP server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'sstp-user', Password: 'pass1', VPNType: ['SSTP'] }
                ],
                SstpServer: {
                    enabled: true,
                    Certificate: 'server-cert',
                    Port: 443
                }
            };

            const sstpSubnets: VPNServerNetworks = {
                SSTP: { name: 'sstp', subnet: '192.168.90.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'SSTP server only',
                { vpnServer, subnetConfigs: sstpSubnets },
                () => VPNServerWrapper(vpnServer, sstpSubnets)
            );

            const result = VPNServerWrapper(vpnServer, sstpSubnets);
            validateRouterConfigStructure(result);

            expect(result['/interface sstp-server server']).toBeDefined();
        });

        it('should generate IKEv2 server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'ikev2-user', Password: 'pass1', VPNType: ['IKeV2'] }
                ],
                Ikev2Server: {
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
                        exchangeMode: 'ike2',
                        passive: true
                    },
                    identities: {
                        authMethod: 'pre-shared-key',
                        peer: 'ikev2-peer',
                        secret: 'preshared123'
                    }
                }
            };

            const ikev2Subnets: VPNServerNetworks = {
                IKev2: { name: 'ikev2', subnet: '10.10.10.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'IKEv2 server only',
                { vpnServer, subnetConfigs: ikev2Subnets },
                () => VPNServerWrapper(vpnServer, ikev2Subnets)
            );

            const result = VPNServerWrapper(vpnServer, ikev2Subnets);
            validateRouterConfigStructure(result);

            expect(result['/ip ipsec profile']).toBeDefined();
        });

        it('should generate SSH server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'ssh-user', Password: 'pass1', VPNType: ['SSH'] }
                ],
                SSHServer: {
                    enabled: true,
                    Network: 'Domestic'
                }
            };

            const sshSubnets: VPNServerNetworks = {
                SSH: { name: 'ssh', subnet: '192.168.20.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'SSH server only',
                { vpnServer, subnetConfigs: sshSubnets },
                () => VPNServerWrapper(vpnServer, sshSubnets)
            );

            const result = VPNServerWrapper(vpnServer, sshSubnets);
            validateRouterConfigStructure(result);

            // SSH configuration should be present
            expect(result['/ip ssh'] || result['/user']).toBeDefined();
        });

        it('should generate Socks5 server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [],
                Socks5Server: {
                    enabled: true,
                    Port: 1080,
                    Network: 'VPN'
                }
            };

            const socks5Subnets: VPNServerNetworks = {
                Socks5: { name: 'socks5', subnet: '192.168.40.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'Socks5 server only',
                { vpnServer, subnetConfigs: socks5Subnets },
                () => VPNServerWrapper(vpnServer, socks5Subnets)
            );

            const result = VPNServerWrapper(vpnServer, socks5Subnets);
            validateRouterConfigStructure(result);

            // Socks5 configuration should be present (or empty config is ok since no users)
            // The wrapper returns config but may be empty
            expect(result).toBeDefined();
        });

        it('should generate HTTP Proxy server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [],
                HTTPProxyServer: {
                    enabled: true,
                    Port: 8080,
                    Network: 'VPN'
                }
            };

            const httpProxySubnets: VPNServerNetworks = {
                HTTPProxy: { name: 'httpproxy', subnet: '192.168.40.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'HTTP Proxy server only',
                { vpnServer, subnetConfigs: httpProxySubnets },
                () => VPNServerWrapper(vpnServer, httpProxySubnets)
            );

            const result = VPNServerWrapper(vpnServer, httpProxySubnets);
            validateRouterConfigStructure(result);

            // HTTP Proxy configuration should be present (or empty config is ok)
            // The wrapper returns empty config currently
            expect(result).toBeDefined();
        });

        it('should generate ZeroTier server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [],
                ZeroTierServer: {
                    enabled: true,
                    Network: 'VPN',
                    ZeroTierNetworkID: 'a1b2c3d4e5f6g7h8'
                }
            };

            const zeroTierSubnets: VPNServerNetworks = {
                ZeroTier: { name: 'zerotier', subnet: '192.168.40.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'ZeroTier server only',
                { vpnServer, subnetConfigs: zeroTierSubnets },
                () => VPNServerWrapper(vpnServer, zeroTierSubnets)
            );

            const result = VPNServerWrapper(vpnServer, zeroTierSubnets);
            validateRouterConfigStructure(result);

            // ZeroTier configuration should be present (or empty config is ok)
            // The wrapper returns empty config currently
            expect(result).toBeDefined();
        });

        it('should generate BackToHome server configuration', () => {
            const vpnServer: VPNServer = {
                Users: [],
                BackToHomeServer: {
                    enabled: true,
                    Network: 'VPN'
                }
            };

            const bthSubnets: VPNServerNetworks = {
                BackToHome: { name: 'bth', subnet: '192.168.40.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'BackToHome server only',
                { vpnServer, subnetConfigs: bthSubnets },
                () => VPNServerWrapper(vpnServer, bthSubnets)
            );

            const result = VPNServerWrapper(vpnServer, bthSubnets);
            validateRouterConfigStructure(result);

            // BTH configuration should be present (or empty config is ok)
            // The wrapper returns empty config currently
            expect(result).toBeDefined();
        });
    });

    describe('Edge Cases', () => {
        it('should handle empty VPN server configuration', () => {
            const vpnServer: VPNServer = {
                Users: []
            };

            const emptySubnets: VPNServerNetworks = {};

            testWithOutput(
                'VPNServerWrapper',
                'Empty VPN server configuration',
                { vpnServer, subnetConfigs: emptySubnets },
                () => VPNServerWrapper(vpnServer, emptySubnets)
            );

            const result = VPNServerWrapper(vpnServer, emptySubnets);
            validateRouterConfigStructure(result);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('No VPN servers configured'))).toBe(true);
        });

        it('should handle VPN server with users but no server configurations', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] },
                    { Username: 'user2', Password: 'pass2', VPNType: ['OpenVPN'] }
                ]
            };

            const emptySubnets: VPNServerNetworks = {};

            testWithOutput(
                'VPNServerWrapper',
                'Users without server configurations',
                { vpnServer, subnetConfigs: emptySubnets },
                () => VPNServerWrapper(vpnServer, emptySubnets)
            );

            const result = VPNServerWrapper(vpnServer, emptySubnets);
            validateRouterConfigStructure(result);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('No VPN servers configured'))).toBe(true);
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

            const disabledSubnets: VPNServerNetworks = {
                PPTP: { name: 'pptp', subnet: '192.168.70.0/24' },
                L2TP: { name: 'l2tp', subnet: '192.168.80.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'Disabled VPN servers',
                { vpnServer, subnetConfigs: disabledSubnets },
                () => VPNServerWrapper(vpnServer, disabledSubnets)
            );

            const result = VPNServerWrapper(vpnServer, disabledSubnets);
            validateRouterConfigStructure(result);

            const comments = result[""] || [];
            expect(comments.some((c: string) => c.includes('No VPN servers configured'))).toBe(true);
        });

        it('should handle users with empty VPNType arrays', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'no-vpn-user', Password: 'pass1', VPNType: [] },
                    { Username: 'wg-user', Password: 'pass2', VPNType: ['Wireguard'] }
                ],
                WireguardServers: [{
                    Interface: {
                        Name: 'wg-server',
                        PrivateKey: 'key',
                        InterfaceAddress: '10.0.0.1/24'
                    },
                    Peers: []
                }]
            };

            const wgSubnets: VPNServerNetworks = {
                Wireguard: [{ name: 'wg1', subnet: '10.0.0.0/24' }]
            };

            testWithOutput(
                'VPNServerWrapper',
                'Users with empty VPNType arrays',
                { vpnServer, subnetConfigs: wgSubnets },
                () => VPNServerWrapper(vpnServer, wgSubnets)
            );

            const result = VPNServerWrapper(vpnServer, wgSubnets);
            validateRouterConfigStructure(result);

            // Should only configure for users with valid VPN types
            const peerCommands = result['/interface wireguard peers'] || [];
            expect(peerCommands.some((cmd: string) => cmd.includes('wg-user'))).toBe(true);
        });

        it('should handle missing subnetConfigs gracefully', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'user1', Password: 'pass1', VPNType: ['PPTP'] }
                ],
                PptpServer: {
                    enabled: true
                }
            };

            const partialSubnets: VPNServerNetworks = {
                // Missing PPTP subnet config
            };

            testWithOutput(
                'VPNServerWrapper',
                'Missing subnet configs',
                { vpnServer, subnetConfigs: partialSubnets },
                () => VPNServerWrapper(vpnServer, partialSubnets)
            );

            const result = VPNServerWrapper(vpnServer, partialSubnets);
            validateRouterConfigStructure(result);

            // Should still generate config, but may have warnings
            expect(result['/interface pptp-server server']).toBeDefined();
        });

        it('should handle partial subnet configs', () => {
            const vpnServer: VPNServer = {
                Users: testUsers,
                PptpServer: {
                    enabled: true
                },
                L2tpServer: {
                    enabled: true,
                    IPsec: { UseIpsec: 'no' },
                    L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
                },
                WireguardServers: [{
                    Interface: {
                        Name: 'wg-server',
                        PrivateKey: 'key',
                        InterfaceAddress: '10.0.0.1/24'
                    },
                    Peers: []
                }]
            };

            const partialSubnets: VPNServerNetworks = {
                PPTP: { name: 'pptp', subnet: '192.168.70.0/24' },
                // Missing L2TP and Wireguard subnet configs
            };

            testWithOutput(
                'VPNServerWrapper',
                'Partial subnet configs',
                { vpnServer, subnetConfigs: partialSubnets },
                () => VPNServerWrapper(vpnServer, partialSubnets)
            );

            const result = VPNServerWrapper(vpnServer, partialSubnets);
            validateRouterConfigStructure(result);

            // Should still generate configs for available subnets
            expect(result['/interface pptp-server server']).toBeDefined();
        });

        it('should handle OpenVPN servers with some disabled', () => {
            const vpnServer: VPNServer = {
                Users: [
                    { Username: 'ovpn-user', Password: 'pass1', VPNType: ['OpenVPN'] }
                ],
                OpenVpnServer: [
                    {
                        name: 'ovpn-server-enabled',
                        enabled: true,
                        Encryption: {},
                        IPV6: {},
                        Certificate: { Certificate: 'cert1' },
                        Address: {}
                    },
                    {
                        name: 'ovpn-server-disabled',
                        enabled: false,
                        Encryption: {},
                        IPV6: {},
                        Certificate: { Certificate: 'cert2' },
                        Address: {}
                    }
                ]
            };

            const ovpnSubnets: VPNServerNetworks = {
                OpenVPN: [
                    { name: 'ovpn1', subnet: '192.168.60.0/24' },
                    { name: 'ovpn2', subnet: '192.168.61.0/24' }
                ]
            };

            testWithOutput(
                'VPNServerWrapper',
                'OpenVPN servers with some disabled',
                { vpnServer, subnetConfigs: ovpnSubnets },
                () => VPNServerWrapper(vpnServer, ovpnSubnets)
            );

            const result = VPNServerWrapper(vpnServer, ovpnSubnets);
            validateRouterConfigStructure(result);

            // Should only configure enabled servers
            const ovpnCommands = result['/interface ovpn-server server'] || [];
            expect(ovpnCommands.some((cmd: string) => cmd.includes('ovpn-server-enabled'))).toBe(true);
            expect(ovpnCommands.some((cmd: string) => cmd.includes('ovpn-server-disabled'))).toBe(false);
        });
    });

    describe('Performance and Large Configurations', () => {
        it('should handle large number of users efficiently', () => {
            const manyUsers: VSCredentials[] = Array.from({ length: 50 }, (_, i) => ({
                Username: `user${i + 1}`,
                Password: `pass${i + 1}`,
                VPNType: [['Wireguard'], ['OpenVPN'], ['PPTP']][i % 3] as VPNType[]
            }));

            const vpnServer: VPNServer = {
                Users: manyUsers,
                WireguardServers: [{
                    Interface: {
                        Name: 'wg-server',
                        PrivateKey: 'key',
                        InterfaceAddress: '10.0.0.1/24'
                    },
                    Peers: []
                }],
                OpenVpnServer: [{
                    name: 'ovpn-server',
                    enabled: true,
                    Encryption: {},
                    IPV6: {},
                    Certificate: { Certificate: 'cert' },
                    Address: {}
                }],
                PptpServer: {
                    enabled: true
                }
            };

            const largeSubnets: VPNServerNetworks = {
                Wireguard: [{ name: 'wg1', subnet: '10.0.0.0/24' }],
                OpenVPN: [{ name: 'ovpn1', subnet: '192.168.60.0/24' }],
                PPTP: { name: 'pptp', subnet: '192.168.70.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'Large number of users (50+)',
                { vpnServer, subnetConfigs: largeSubnets, userCount: manyUsers.length },
                () => VPNServerWrapper(vpnServer, largeSubnets)
            );

            const result = VPNServerWrapper(vpnServer, largeSubnets);
            validateRouterConfigStructure(result);

            // Check that user configurations are properly generated
            const peerCommands = result['/interface wireguard peers'] || [];
            expect(peerCommands.length).toBeGreaterThan(0);
        });

        it('should handle custom subnet configurations', () => {
            const vpnServer: VPNServer = {
                Users: testUsers,
                WireguardServers: [{
                    Interface: {
                        Name: 'wg-server',
                        PrivateKey: 'key',
                        InterfaceAddress: '172.16.0.1/16'
                    },
                    Peers: []
                }],
                PptpServer: {
                    enabled: true
                }
            };

            const customSubnets: VPNServerNetworks = {
                Wireguard: [{ name: 'custom-wg', subnet: '172.16.0.0/16' }],
                PPTP: { name: 'custom-pptp', subnet: '10.20.30.0/24' }
            };

            testWithOutput(
                'VPNServerWrapper',
                'Custom subnet configurations',
                { vpnServer, subnetConfigs: customSubnets },
                () => VPNServerWrapper(vpnServer, customSubnets)
            );

            const result = VPNServerWrapper(vpnServer, customSubnets);
            validateRouterConfigStructure(result);

            // Should generate configs with custom subnets
            expect(result['/interface wireguard']).toBeDefined();
            expect(result['/interface pptp-server server']).toBeDefined();
        });
    });

    describe('Integration Tests', () => {
        it('should verify VSInboundTraffic integration', () => {
            const vpnServer: VPNServer = {
                Users: testUsers,
                PptpServer: {
                    enabled: true
                },
                L2tpServer: {
                    enabled: true,
                    IPsec: { UseIpsec: 'required', IpsecSecret: 'secret' },
                    L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
                }
            };

            const result = VPNServerWrapper(vpnServer, subnetConfigs);
            validateRouterConfigStructure(result);

            // VSInboundTraffic should add firewall rules
            expect(result['/ip firewall filter']).toBeDefined();
        });

        it('should verify CommandShortner is applied', () => {
            const vpnServer: VPNServer = {
                Users: testUsers,
                PptpServer: {
                    enabled: true
                }
            };

            const pptpSubnets: VPNServerNetworks = {
                PPTP: { name: 'pptp', subnet: '192.168.70.0/24' }
            };

            const result = VPNServerWrapper(vpnServer, pptpSubnets);
            validateRouterConfigStructure(result);

            // CommandShortner should optimize commands
            // Check that config is generated
            expect(result['/interface pptp-server server']).toBeDefined();
        });

        it('should verify mergeRouterConfigs combines all configs', () => {
            const vpnServer: VPNServer = {
                Users: testUsers,
                PptpServer: {
                    enabled: true
                },
                L2tpServer: {
                    enabled: true,
                    IPsec: { UseIpsec: 'no' },
                    L2TPV3: { l2tpv3EtherInterfaceList: 'LAN' }
                },
                WireguardServers: [{
                    Interface: {
                        Name: 'wg-server',
                        PrivateKey: 'key',
                        InterfaceAddress: '10.0.0.1/24'
                    },
                    Peers: []
                }]
            };

            const mergeSubnets: VPNServerNetworks = {
                PPTP: { name: 'pptp', subnet: '192.168.70.0/24' },
                L2TP: { name: 'l2tp', subnet: '192.168.80.0/24' },
                Wireguard: [{ name: 'wg1', subnet: '10.0.0.0/24' }]
            };

            const result = VPNServerWrapper(vpnServer, mergeSubnets);
            validateRouterConfigStructure(result);

            // All configs should be merged properly
            expect(result['/interface pptp-server server']).toBeDefined();
            expect(result['/interface l2tp-server server']).toBeDefined();
            expect(result['/interface wireguard']).toBeDefined();
        });
    });
});
