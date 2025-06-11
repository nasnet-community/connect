import { describe, it, expect } from 'vitest';
import { 
  WireguardServer,
  OVPNServer,
  PptpServer,
  L2tpServer,
  SstpServer,
  Ikev2Server,
  VPNServerInterfaceWrapper
} from './VPNServerInterfaces';
import type { 
  WireguardInterfaceConfig,
  OpenVpnServerConfig,
  PptpServerConfig,
  L2tpServerConfig,
  SstpServerConfig,
  Ikev2ServerConfig,
  VPNServer
} from '~/components/Star/StarContext/Utils/VPNServerType';
import type { NetworkProtocol } from '~/components/Star/StarContext/CommonType';
import type { RouterConfig } from '~/components/Star/ConfigGenerator/ConfigGenerator';

// Test helper functions
function testWithOutput(
  functionName: string,
  testDescription: string,
  parameters: any,
  testFunction: () => RouterConfig
): void {
  console.log(`\n=== ${functionName} - ${testDescription} ===`);
  console.log('Parameters:', JSON.stringify(parameters, null, 2));
  const result = testFunction();
  console.log('Result:', JSON.stringify(result, null, 2));
}

function validateRouterConfig(
  config: RouterConfig,
  expectedSections?: string[]
): void {
  expect(config).toBeDefined();
  expect(typeof config).toBe('object');
  
  if (expectedSections) {
    for (const section of expectedSections) {
      expect(config).toHaveProperty(section);
      expect(Array.isArray(config[section])).toBe(true);
    }
  }
}

describe('VPN Server Interfaces Tests', () => {

  describe('WireGuard Server Interface', () => {
    it('should generate WireGuard server interface configuration', () => {
      const wireguardConfig: WireguardInterfaceConfig = {
        Name: 'wireguard-server',
        PrivateKey: 'test-private-key-123',
        InterfaceAddress: '192.168.170.1/24',
        ListenPort: 13231,
        Mtu: 1420
      };

      testWithOutput(
        'WireguardServer',
        'Basic WireGuard server interface',
        { wireguardConfig },
        () => WireguardServer(wireguardConfig)
      );

      const result = WireguardServer(wireguardConfig);
      validateRouterConfig(result, [
        '/interface wireguard',
        '/ip address',
        '/interface list member',
        '/ip firewall address-list',
        '/ip firewall filter'
      ]);
    });

    it('should handle WireGuard without private key', () => {
      const wireguardConfig: WireguardInterfaceConfig = {
        Name: 'wireguard-server',
        PrivateKey: '',
        InterfaceAddress: '192.168.170.1/24',
        ListenPort: 13231
      };

      testWithOutput(
        'WireguardServer',
        'WireGuard without private key',
        { wireguardConfig },
        () => WireguardServer(wireguardConfig)
      );

      const result = WireguardServer(wireguardConfig);
      validateRouterConfig(result, ['/interface wireguard']);
    });

    it('should handle WireGuard without interface address', () => {
      const wireguardConfig: WireguardInterfaceConfig = {
        Name: 'wireguard-server',
        PrivateKey: 'test-private-key-123',
        InterfaceAddress: '',
        ListenPort: 13231
      };

      testWithOutput(
        'WireguardServer',
        'WireGuard without interface address',
        { wireguardConfig },
        () => WireguardServer(wireguardConfig)
      );

      const result = WireguardServer(wireguardConfig);
      validateRouterConfig(result, ['/interface wireguard']);
    });
  });

  describe('OpenVPN Server Interface', () => {
    it('should generate OpenVPN server interface configuration', () => {
      const ovpnConfig: OpenVpnServerConfig = {
        name: 'openvpn-server',
        enabled: true,
        Port: 1194,
        Protocol: 'udp' as NetworkProtocol,
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
      };

      testWithOutput(
        'OVPNServer',
        'Complete OpenVPN server configuration',
        { config: ovpnConfig },
        () => OVPNServer(ovpnConfig)
      );

      const result = OVPNServer(ovpnConfig);
      validateRouterConfig(result, [
        '/ip pool',
        '/ppp profile',
        '/interface ovpn-server server',
        '/ip firewall filter',
        '/ip firewall address-list'
      ]);
    });

    it('should generate minimal OpenVPN server configuration', () => {
      const ovpnConfig: OpenVpnServerConfig = {
        name: 'openvpn-minimal',
        enabled: true,
        Encryption: {},
        IPV6: {},
        Certificate: {
          Certificate: 'server-cert'
        },
        Address: {}
      };

      testWithOutput(
        'OVPNServer',
        'Minimal OpenVPN server configuration',
        { config: ovpnConfig },
        () => OVPNServer(ovpnConfig)
      );

      const result = OVPNServer(ovpnConfig);
      validateRouterConfig(result, ['/interface ovpn-server server']);
    });
  });

  describe('PPTP Server Interface', () => {
    it('should generate PPTP server interface configuration', () => {
      const pptpConfig: PptpServerConfig = {
        enabled: true,
        Authentication: ['mschap2'],
        DefaultProfile: 'pptp-profile',
        KeepaliveTimeout: 30,
        PacketSize: {
          MaxMtu: 1460,
          MaxMru: 1460
        }
      };

      testWithOutput(
        'PptpServer',
        'Complete PPTP server configuration',
        { config: pptpConfig },
        () => PptpServer(pptpConfig)
      );

      const result = PptpServer(pptpConfig);
      validateRouterConfig(result, ['/interface pptp-server server']);
    });
  });

  describe('L2TP Server Interface', () => {
    it('should generate L2TP server with IPsec configuration', () => {
      const l2tpConfig: L2tpServerConfig = {
        enabled: true,
        IPsec: {
          UseIpsec: 'required',
          IpsecSecret: 'sharedsecret123'
        },
        Authentication: ['mschap2'],
        DefaultProfile: 'l2tp-profile',
        KeepaliveTimeout: 30,
        PacketSize: {
          MaxMtu: 1460,
          MaxMru: 1460
        },
        L2TPV3: {
          l2tpv3EtherInterfaceList: 'LAN'
        }
      };

      testWithOutput(
        'L2tpServer',
        'L2TP server with IPsec',
        { config: l2tpConfig },
        () => L2tpServer(l2tpConfig)
      );

      const result = L2tpServer(l2tpConfig);
      validateRouterConfig(result, ['/interface l2tp-server server']);
    });

    it('should generate L2TP server without IPsec', () => {
      const l2tpConfig: L2tpServerConfig = {
        enabled: true,
        IPsec: {
          UseIpsec: 'no'
        },
        Authentication: ['pap'],
        DefaultProfile: 'l2tp-profile',
        L2TPV3: {
          l2tpv3EtherInterfaceList: 'LAN'
        }
      };

      testWithOutput(
        'L2tpServer',
        'L2TP server without IPsec',
        { config: l2tpConfig },
        () => L2tpServer(l2tpConfig)
      );

      const result = L2tpServer(l2tpConfig);
      validateRouterConfig(result, ['/interface l2tp-server server']);
    });
  });

  describe('SSTP Server Interface', () => {
    it('should generate SSTP server interface configuration', () => {
      const sstpConfig: SstpServerConfig = {
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

      testWithOutput(
        'SstpServer',
        'Complete SSTP server configuration',
        { config: sstpConfig },
        () => SstpServer(sstpConfig)
      );

      const result = SstpServer(sstpConfig);
      validateRouterConfig(result, [
        '/interface sstp-server server',
        '/ip firewall filter'
      ]);
    });

    it('should generate SSTP server with certificate=none warning', () => {
      const sstpConfig: SstpServerConfig = {
        enabled: true,
        Certificate: 'none',
        Port: 443,
        Authentication: ['mschap2']
      };

      testWithOutput(
        'SstpServer',
        'SSTP server with certificate=none',
        { config: sstpConfig },
        () => SstpServer(sstpConfig)
      );

      const result = SstpServer(sstpConfig);
      validateRouterConfig(result, ['/interface sstp-server server']);
      
      // Check for warning comment
      const serverCommands = result['/interface sstp-server server'] || [];
      const hasWarning = serverCommands.some(cmd => 
        cmd.includes('WARNING') && cmd.includes('certificate=none')
      );
      expect(hasWarning).toBe(true);
    });
  });

  describe('IKEv2 Server Interface', () => {
    it('should generate minimal IKEv2 server configuration', () => {
      const ikev2Config: Ikev2ServerConfig = {
        profile: {
          name: 'ikev2-profile'
        },
        proposal: {
          name: 'ikev2-proposal'
        },
        peer: {
          name: 'ikev2-peer',
          profile: 'ikev2-profile'
        },
        identities: {
          authMethod: 'pre-shared-key',
          peer: 'ikev2-peer'
        }
      };

      testWithOutput(
        'Ikev2Server',
        'Minimal IKEv2 server configuration',
        { config: ikev2Config },
        () => Ikev2Server(ikev2Config)
      );

      const result = Ikev2Server(ikev2Config);
      validateRouterConfig(result, [
        '/ip ipsec profile',
        '/ip ipsec proposal',
        '/ip ipsec peer',
        '/ip ipsec identity'
      ]);
    });
  });

  describe('VPN Server Interface Wrapper', () => {
    it('should generate configurations for all VPN protocols', () => {
      const vpnServer: VPNServer = {
        Users: [],
        WireguardServers: [{
          Interface: {
            Name: 'wireguard-server',
            PrivateKey: 'test-key',
            InterfaceAddress: '192.168.170.1/24',
            ListenPort: 13231
          },
          Peers: []
        }],
        OpenVpnServer: {
          name: 'openvpn-server',
          enabled: true,
          Encryption: {},
          IPV6: {},
          Certificate: {
            Certificate: 'server-cert'
          },
          Address: {}
        },
        PptpServer: {
          enabled: true,
          Authentication: ['mschap2']
        },
        L2tpServer: {
          enabled: true,
          IPsec: {
            UseIpsec: 'required',
            IpsecSecret: 'secret'
          },
          Authentication: ['mschap2'],
          L2TPV3: {
            l2tpv3EtherInterfaceList: 'LAN'
          }
        },
        SstpServer: {
          enabled: true,
          Certificate: 'server-cert',
          Authentication: ['mschap2']
        },
        Ikev2Server: {
          profile: {
            name: 'ikev2-profile'
          },
          proposal: {
            name: 'ikev2-proposal'
          },
          peer: {
            name: 'ikev2-peer',
            profile: 'ikev2-profile'
          },
          identities: {
            authMethod: 'pre-shared-key',
            peer: 'ikev2-peer'
          }
        }
      };

      testWithOutput(
        'VPNServerInterfaceWrapper',
        'All VPN protocols configuration',
        { vpnServer },
        () => VPNServerInterfaceWrapper(vpnServer)
      );

      const result = VPNServerInterfaceWrapper(vpnServer);
      validateRouterConfig(result);
      
      // Check that summary comments are included
      const comments = result[""] || [];
      const hasSummary = comments.some(comment => 
        comment.includes('VPN Server Interface Configuration Summary')
      );
      expect(hasSummary).toBe(true);
    });

    it('should handle VPN server with no configured protocols', () => {
      const vpnServer: VPNServer = {
        Users: []
      };

      testWithOutput(
        'VPNServerInterfaceWrapper',
        'No VPN protocols configured',
        { vpnServer },
        () => VPNServerInterfaceWrapper(vpnServer)
      );

      const result = VPNServerInterfaceWrapper(vpnServer);
      validateRouterConfig(result, [""]);
      
      // Check for appropriate message
      const comments = result[""] || [];
      const hasMessage = comments.some(comment => 
        comment.includes('No VPN server protocols are configured')
      );
      expect(hasMessage).toBe(true);
    });

    it('should handle VPN server with only WireGuard', () => {
      const vpnServer: VPNServer = {
        Users: [],
        WireguardServers: [{
          Interface: {
            Name: 'wireguard-only',
            PrivateKey: 'test-key',
            InterfaceAddress: '192.168.170.1/24'
          },
          Peers: []
        }]
      };

      testWithOutput(
        'VPNServerInterfaceWrapper',
        'Only WireGuard configured',
        { vpnServer },
        () => VPNServerInterfaceWrapper(vpnServer)
      );

      const result = VPNServerInterfaceWrapper(vpnServer);
      validateRouterConfig(result);
      
      // Check that only Wireguard is mentioned in summary
      const comments = result[""] || [];
      const hasWireguardOnly = comments.some(comment => 
        comment.includes('Configured protocols: Wireguard') && 
        !comment.includes('OpenVPN') &&
        !comment.includes('PPTP')
      );
      expect(hasWireguardOnly).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty WireGuard servers array', () => {
      const vpnServer: VPNServer = {
        Users: [],
        WireguardServers: []
      };

      testWithOutput(
        'VPNServerInterfaceWrapper',
        'Empty WireGuard servers array',
        { vpnServer },
        () => VPNServerInterfaceWrapper(vpnServer)
      );

      const result = VPNServerInterfaceWrapper(vpnServer);
      validateRouterConfig(result, [""]);
    });

    it('should handle WireGuard server without interface', () => {
      const vpnServer: VPNServer = {
        Users: [],
        WireguardServers: [{
          Peers: []
        } as any]
      };

      testWithOutput(
        'VPNServerInterfaceWrapper',
        'WireGuard server without interface',
        { vpnServer },
        () => VPNServerInterfaceWrapper(vpnServer)
      );

      const result = VPNServerInterfaceWrapper(vpnServer);
      validateRouterConfig(result, [""]);
    });
  });
}); 