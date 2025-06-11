import { describe, it, expect } from 'vitest';
import { 
  VPNServerCertificate,
  WireguardPeerAddress,
  VPNServerBinding,
  WireguardServerUsers,
  OVPNServerUsers,
  PptpServerUsers,
  L2tpServerUsers,
  SstpServerUsers,
  Ikev2ServerUsers,
  VPNServerUsersWrapper
} from './VPNServerUsers';
import type { 
  Credentials,
  WireguardInterfaceConfig,
  VPNServer
} from '~/components/Star/StarContext/Utils/VPNServerType';
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

describe('VPN Server Users Tests', () => {

  const sampleCredentials: Credentials[] = [
    { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard', 'OpenVPN'] },
    { Username: 'user2', Password: 'pass2', VPNType: ['PPTP', 'L2TP'] },
    { Username: 'user3', Password: 'pass3', VPNType: ['SSTP', 'IKeV2'] },
    { Username: 'user4', Password: 'pass4', VPNType: ['OpenVPN'] },
    { Username: 'user5', Password: 'pass5', VPNType: ['Wireguard'] }
  ];

  describe('VPN Server Certificate Configuration', () => {
    it('should generate certificate configuration for certificate-requiring VPN servers', () => {
      const vpnServer: VPNServer = {
        Users: [],
        SstpServer: {
          enabled: true,
          Certificate: 'server-cert',
          Authentication: ['mschap2']
        },
        OpenVpnServer: {
          name: 'ovpn-server',
          enabled: true,
          Encryption: {},
          IPV6: {},
          Certificate: {
            Certificate: 'server-cert'
          },
          Address: {}
        },
        Ikev2Server: {
          profile: { name: 'ikev2-profile' },
          proposal: { name: 'ikev2-proposal' },
          peer: { name: 'ikev2-peer', profile: 'ikev2-profile' },
          identities: { authMethod: 'pre-shared-key', peer: 'ikev2-peer' }
        }
      };

      testWithOutput(
        'VPNServerCertificate',
        'Certificate configuration for SSTP, OpenVPN, and IKEv2',
        { vpnServer },
        () => VPNServerCertificate(vpnServer)
      );

      const result = VPNServerCertificate(vpnServer);
      validateRouterConfig(result);
      
      // Check for informational comments
      const comments = result[""] || [];
      const hasCertInfo = comments.some(comment => 
        comment.includes('Certificate configuration for VPN servers')
      );
      expect(hasCertInfo).toBe(true);
    });

    it('should handle VPN server with no certificate-requiring protocols', () => {
      const vpnServer: VPNServer = {
        Users: [],
        WireguardServers: [{
          Interface: {
            Name: 'wireguard-server',
            PrivateKey: 'test-key',
            InterfaceAddress: '192.168.170.1/24'
          },
          Peers: []
        }],
        PptpServer: {
          enabled: true,
          Authentication: ['mschap2']
        }
      };

      testWithOutput(
        'VPNServerCertificate',
        'No certificate-requiring VPN servers',
        { vpnServer },
        () => VPNServerCertificate(vpnServer)
      );

      const result = VPNServerCertificate(vpnServer);
      validateRouterConfig(result, [""]);
      
      // Check for appropriate message
      const comments = result[""] || [];
      const hasMessage = comments.some(comment => 
        comment.includes('No VPN servers requiring certificates are configured')
      );
      expect(hasMessage).toBe(true);
    });
  });

  describe('WireGuard Peer Address Update Script', () => {
    it('should generate WireGuard peer address update script', () => {
      testWithOutput(
        'WireguardPeerAddress',
        'WireGuard peer address update script',
        { interfaceName: 'wireguard-server' },
        () => WireguardPeerAddress('wireguard-server')
      );

      const result = WireguardPeerAddress('wireguard-server');
      validateRouterConfig(result, ['/system script', '/system scheduler']);
    });

    it('should generate custom WireGuard peer address script', () => {
      testWithOutput(
        'WireguardPeerAddress',
        'Custom WireGuard peer address script',
        { 
          interfaceName: 'wg-custom',
          scriptName: 'Custom-WG-Script',
          startTime: '03:00:00'
        },
        () => WireguardPeerAddress('wg-custom', 'Custom-WG-Script', '03:00:00')
      );

      const result = WireguardPeerAddress('wg-custom', 'Custom-WG-Script', '03:00:00');
      validateRouterConfig(result, ['/system script', '/system scheduler']);
    });
  });

  describe('VPN Server Binding Configuration', () => {
    it('should generate VPN server binding for supported protocols', () => {
      const supportedCredentials: Credentials[] = [
        { Username: 'l2tp-user', Password: 'pass1', VPNType: ['L2TP'] },
        { Username: 'pptp-user', Password: 'pass2', VPNType: ['PPTP'] },
        { Username: 'sstp-user', Password: 'pass3', VPNType: ['SSTP'] },
        { Username: 'ovpn-user', Password: 'pass4', VPNType: ['OpenVPN'] }
      ];

      testWithOutput(
        'VPNServerBinding',
        'VPN server binding for supported protocols',
        { credentials: supportedCredentials },
        () => VPNServerBinding(supportedCredentials)
      );

      const result = VPNServerBinding(supportedCredentials);
      validateRouterConfig(result, [
        '/interface l2tp-server',
        '/interface pptp-server',
        '/interface sstp-server',
        '/interface ovpn-server'
      ]);
    });

    it('should handle empty credentials array', () => {
      testWithOutput(
        'VPNServerBinding',
        'Empty credentials array',
        { credentials: [] },
        () => VPNServerBinding([])
      );

      const result = VPNServerBinding([]);
      validateRouterConfig(result, [""]);
      
      // Check for appropriate message
      const comments = result[""] || [];
      const hasMessage = comments.some(comment => 
        comment.includes('No credentials provided for VPN server binding')
      );
      expect(hasMessage).toBe(true);
    });

    it('should handle credentials with unsupported VPN types only', () => {
      const unsupportedCredentials: Credentials[] = [
        { Username: 'wg-user', Password: 'pass1', VPNType: ['Wireguard'] },
        { Username: 'ikev2-user', Password: 'pass2', VPNType: ['IKeV2'] }
      ];

      testWithOutput(
        'VPNServerBinding',
        'Credentials with unsupported VPN types only',
        { credentials: unsupportedCredentials },
        () => VPNServerBinding(unsupportedCredentials)
      );

      const result = VPNServerBinding(unsupportedCredentials);
      validateRouterConfig(result, [""]);
      
      // Check for appropriate message
      const comments = result[""] || [];
      const hasMessage = comments.some(comment => 
        comment.includes('No users configured for supported VPN binding types')
      );
      expect(hasMessage).toBe(true);
    });
  });

  describe('WireGuard Server Users', () => {
    it('should generate WireGuard server users configuration', () => {
      const serverConfig: WireguardInterfaceConfig = {
        Name: 'wireguard-server',
        PrivateKey: 'test-private-key',
        InterfaceAddress: '192.168.170.1/24',
        ListenPort: 13231
      };

      testWithOutput(
        'WireguardServerUsers',
        'WireGuard server users configuration',
        { serverConfig, users: sampleCredentials },
        () => WireguardServerUsers(serverConfig, sampleCredentials)
      );

      const result = WireguardServerUsers(serverConfig, sampleCredentials);
      validateRouterConfig(result, ['/interface wireguard peers']);
    });

    it('should handle WireGuard server without interface address', () => {
      const serverConfig: WireguardInterfaceConfig = {
        Name: 'wireguard-server',
        PrivateKey: 'test-private-key',
        InterfaceAddress: ''
      };

      testWithOutput(
        'WireguardServerUsers',
        'WireGuard server without interface address',
        { serverConfig, users: sampleCredentials },
        () => WireguardServerUsers(serverConfig, sampleCredentials)
      );

      const result = WireguardServerUsers(serverConfig, sampleCredentials);
      validateRouterConfig(result, ['/interface wireguard peers']);
      
      // Check for error message
      const peerCommands = result['/interface wireguard peers'] || [];
      const hasError = peerCommands.some(cmd => 
        cmd.includes('Error: Server interface address is required')
      );
      expect(hasError).toBe(true);
    });

    it('should handle users with no WireGuard VPN type', () => {
      const nonWireguardUsers: Credentials[] = [
        { Username: 'user1', Password: 'pass1', VPNType: ['OpenVPN'] },
        { Username: 'user2', Password: 'pass2', VPNType: ['PPTP'] }
      ];

      const serverConfig: WireguardInterfaceConfig = {
        Name: 'wireguard-server',
        PrivateKey: 'test-private-key',
        InterfaceAddress: '192.168.170.1/24'
      };

      testWithOutput(
        'WireguardServerUsers',
        'Users with no WireGuard VPN type',
        { serverConfig, users: nonWireguardUsers },
        () => WireguardServerUsers(serverConfig, nonWireguardUsers)
      );

      const result = WireguardServerUsers(serverConfig, nonWireguardUsers);
      validateRouterConfig(result, ['/interface wireguard peers']);
      
      // Check for no users message
      const peerCommands = result['/interface wireguard peers'] || [];
      const hasMessage = peerCommands.some(cmd => 
        cmd.includes('No users configured for WireGuard VPN')
      );
      expect(hasMessage).toBe(true);
    });
  });

  describe('OpenVPN Server Users', () => {
    it('should generate OpenVPN server users configuration', () => {
      testWithOutput(
        'OVPNServerUsers',
        'OpenVPN server users configuration',
        { users: sampleCredentials },
        () => OVPNServerUsers(sampleCredentials)
      );

      const result = OVPNServerUsers(sampleCredentials);
      validateRouterConfig(result, ['/ppp secret']);
    });

    it('should handle users with no OpenVPN VPN type', () => {
      const nonOpenVpnUsers: Credentials[] = [
        { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] },
        { Username: 'user2', Password: 'pass2', VPNType: ['PPTP'] }
      ];

      testWithOutput(
        'OVPNServerUsers',
        'Users with no OpenVPN VPN type',
        { users: nonOpenVpnUsers },
        () => OVPNServerUsers(nonOpenVpnUsers)
      );

      const result = OVPNServerUsers(nonOpenVpnUsers);
      validateRouterConfig(result, ['/ppp secret']);
      
      // Check for no users message
      const secretCommands = result['/ppp secret'] || [];
      const hasMessage = secretCommands.some(cmd => 
        cmd.includes('No users configured for OpenVPN')
      );
      expect(hasMessage).toBe(true);
    });
  });

  describe('PPTP Server Users', () => {
    it('should generate PPTP server users configuration', () => {
      testWithOutput(
        'PptpServerUsers',
        'PPTP server users configuration',
        { users: sampleCredentials },
        () => PptpServerUsers(sampleCredentials)
      );

      const result = PptpServerUsers(sampleCredentials);
      validateRouterConfig(result, ['/ppp secret']);
    });
  });

  describe('L2TP Server Users', () => {
    it('should generate L2TP server users configuration', () => {
      testWithOutput(
        'L2tpServerUsers',
        'L2TP server users configuration',
        { users: sampleCredentials },
        () => L2tpServerUsers(sampleCredentials)
      );

      const result = L2tpServerUsers(sampleCredentials);
      validateRouterConfig(result, ['/ppp secret']);
    });
  });

  describe('SSTP Server Users', () => {
    it('should generate SSTP server users configuration', () => {
      testWithOutput(
        'SstpServerUsers',
        'SSTP server users configuration',
        { users: sampleCredentials },
        () => SstpServerUsers(sampleCredentials)
      );

      const result = SstpServerUsers(sampleCredentials);
      validateRouterConfig(result, ['/ppp secret']);
    });
  });

  describe('IKEv2 Server Users', () => {
    it('should generate IKEv2 server users information', () => {
      testWithOutput(
        'Ikev2ServerUsers',
        'IKEv2 server users information',
        { users: sampleCredentials },
        () => Ikev2ServerUsers(sampleCredentials)
      );

      const result = Ikev2ServerUsers(sampleCredentials);
      validateRouterConfig(result, [""]);
      
      // Check for informational comments
      const comments = result[""] || [];
      const hasInfo = comments.some(comment => 
        comment.includes('IKEv2 users are managed through IPsec identities')
      );
      expect(hasInfo).toBe(true);
    });
  });

  describe('VPN Server Users Wrapper', () => {
    it('should generate complete VPN server users configuration', () => {
      const vpnServer: VPNServer = {
        Users: sampleCredentials,
        WireguardServers: [{
          Interface: {
            Name: 'wireguard-server',
            PrivateKey: 'test-key',
            InterfaceAddress: '192.168.170.1/24'
          },
          Peers: []
        }],
        OpenVpnServer: {
          name: 'ovpn-server',
          enabled: true,
          Encryption: {},
          IPV6: {},
          Certificate: {
            Certificate: 'server-cert'
          },
          Address: {}
        },
        SstpServer: {
          enabled: true,
          Certificate: 'server-cert',
          Authentication: ['mschap2']
        }
      };

      testWithOutput(
        'VPNServerUsersWrapper',
        'Complete VPN server users configuration',
        { credentials: sampleCredentials, vpnServer },
        () => VPNServerUsersWrapper(sampleCredentials, vpnServer)
      );

      const result = VPNServerUsersWrapper(sampleCredentials, vpnServer);
      validateRouterConfig(result);
      
      // Check for summary comments
      const comments = result[""] || [];
      const hasSummary = comments.some(comment => 
        comment.includes('VPN Server Users Configuration Summary')
      );
      expect(hasSummary).toBe(true);
    });

    it('should handle empty credentials array', () => {
      const vpnServer: VPNServer = {
        Users: [],
        OpenVpnServer: {
          name: 'ovpn-server',
          enabled: true,
          Encryption: {},
          IPV6: {},
          Certificate: {
            Certificate: 'server-cert'
          },
          Address: {}
        }
      };

      testWithOutput(
        'VPNServerUsersWrapper',
        'Empty credentials array',
        { credentials: [], vpnServer },
        () => VPNServerUsersWrapper([], vpnServer)
      );

      const result = VPNServerUsersWrapper([], vpnServer);
      validateRouterConfig(result, [""]);
      
      // Check for appropriate message
      const comments = result[""] || [];
      const hasMessage = comments.some(comment => 
        comment.includes('No VPN types found in user credentials')
      );
      expect(hasMessage).toBe(true);
    });

    it('should handle VPN server with only certificate-requiring protocols', () => {
      const vpnServer: VPNServer = {
        Users: [],
        SstpServer: {
          enabled: true,
          Certificate: 'server-cert',
          Authentication: ['mschap2']
        },
        Ikev2Server: {
          profile: { name: 'ikev2-profile' },
          proposal: { name: 'ikev2-proposal' },
          peer: { name: 'ikev2-peer', profile: 'ikev2-profile' },
          identities: { authMethod: 'pre-shared-key', peer: 'ikev2-peer' }
        }
      };

      const certificateUsers: Credentials[] = [
        { Username: 'sstp-user', Password: 'pass1', VPNType: ['SSTP'] },
        { Username: 'ikev2-user', Password: 'pass2', VPNType: ['IKeV2'] }
      ];

      testWithOutput(
        'VPNServerUsersWrapper',
        'Certificate-requiring protocols only',
        { credentials: certificateUsers, vpnServer },
        () => VPNServerUsersWrapper(certificateUsers, vpnServer)
      );

      const result = VPNServerUsersWrapper(certificateUsers, vpnServer);
      validateRouterConfig(result);
      
      // Should include certificate configuration
      const comments = result[""] || [];
      const hasCertConfig = comments.some(comment => 
        comment.includes('Certificate configuration for VPN servers')
      );
      expect(hasCertConfig).toBe(true);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle malformed credentials', () => {
      const malformedCredentials: Credentials[] = [
        { Username: '', Password: 'pass1', VPNType: ['OpenVPN'] },
        { Username: 'user2', Password: '', VPNType: ['PPTP'] }
      ];

      testWithOutput(
        'OVPNServerUsers',
        'Malformed credentials',
        { users: malformedCredentials },
        () => OVPNServerUsers(malformedCredentials)
      );

      const result = OVPNServerUsers(malformedCredentials);
      validateRouterConfig(result, ['/ppp secret']);
    });

    it('should handle users with multiple VPN types', () => {
      const multiVpnUsers: Credentials[] = [
        { Username: 'multi-user', Password: 'pass1', VPNType: ['OpenVPN', 'PPTP', 'L2TP', 'SSTP'] }
      ];

      testWithOutput(
        'VPNServerUsersWrapper',
        'Users with multiple VPN types',
        { credentials: multiVpnUsers, vpnServer: { Users: [] } },
        () => VPNServerUsersWrapper(multiVpnUsers, { Users: [] })
      );

      const result = VPNServerUsersWrapper(multiVpnUsers, { Users: [] });
      validateRouterConfig(result);
      
      // Should include all VPN types in summary
      const comments = result[""] || [];
      const hasMultipleTypes = comments.some(comment => 
        comment.includes('OpenVPN') && 
        comment.includes('PPTP') && 
        comment.includes('L2TP') && 
        comment.includes('SSTP')
      );
      expect(hasMultipleTypes).toBe(true);
    });

    it('should handle WireGuard server without interface configuration', () => {
      const vpnServer: VPNServer = {
        Users: [],
        WireguardServers: [{
          Peers: []
        } as any]
      };

      const wireguardUsers: Credentials[] = [
        { Username: 'wg-user', Password: 'pass1', VPNType: ['Wireguard'] }
      ];

      testWithOutput(
        'VPNServerUsersWrapper',
        'WireGuard server without interface configuration',
        { credentials: wireguardUsers, vpnServer },
        () => VPNServerUsersWrapper(wireguardUsers, vpnServer)
      );

      const result = VPNServerUsersWrapper(wireguardUsers, vpnServer);
      validateRouterConfig(result);
    });
  });
}); 