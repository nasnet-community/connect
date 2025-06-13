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


describe('VPN Server Users Tests', () => {

  const testUsers: Credentials[] = [
    { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard', 'OpenVPN'] },
    { Username: 'user2', Password: 'pass2', VPNType: ['PPTP', 'L2TP'] },
    { Username: 'user3', Password: 'pass3', VPNType: ['SSTP', 'IKeV2'] },
    { Username: 'multiuser', Password: 'passMulti', VPNType: ['Wireguard', 'OpenVPN', 'PPTP', 'L2TP', 'SSTP'] }
  ];

  describe('VPNServerCertificate', () => {
    it('should generate certificate configuration for VPN servers requiring certificates', () => {
      const vpnServer: VPNServer = {
        Users: testUsers,
        SstpServer: {
          enabled: true,
          Certificate: 'server-cert'
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
        }
      };

      testWithOutput(
        'VPNServerCertificate',
        'Generate certificates for SSTP and OpenVPN servers',
        { vpnServer },
        () => VPNServerCertificate(vpnServer)
      );

      const result = VPNServerCertificate(vpnServer);
      validateRouterConfig(result);

      // Check that certificate-related sections are included
      const comments = result[""] || [];
      expect(comments.some((c: string) => c.includes('Certificate configuration for VPN servers'))).toBe(true);
      expect(comments.some((c: string) => c.includes('SSTP Server requires certificates'))).toBe(true);
      expect(comments.some((c: string) => c.includes('OpenVPN Server requires certificates'))).toBe(true);
    });

    it('should return appropriate message when no certificate-requiring VPN servers are configured', () => {
      const vpnServer: VPNServer = {
        Users: testUsers,
        PptpServer: {
          enabled: true
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

      const comments = result[""] || [];
      expect(comments.some((c: string) => c.includes('No VPN servers requiring certificates are configured'))).toBe(true);
    });
  });

  describe('WireguardPeerAddress', () => {
    it('should generate WireGuard peer address update script', () => {
      testWithOutput(
        'WireguardPeerAddress',
        'Generate peer address update script',
        { interfaceName: 'wireguard-server', scriptName: 'WG-Update', startTime: 'startup' },
        () => WireguardPeerAddress('wireguard-server', 'WG-Update', 'startup')
      );

      const result = WireguardPeerAddress('wireguard-server', 'WG-Update', 'startup');
      validateRouterConfig(result, ['/system script', '/system scheduler']);

      // Check script creation
      const scriptCommands = result['/system script'] || [];
      expect(scriptCommands.length).toBeGreaterThan(0);
      expect(scriptCommands.some((cmd: string) => cmd.includes('name=WG-Update'))).toBe(true);
    });

    it('should generate script with default parameters', () => {
      testWithOutput(
        'WireguardPeerAddress',
        'Generate script with defaults',
        { interfaceName: 'wg-default' },
        () => WireguardPeerAddress('wg-default')
      );

      const result = WireguardPeerAddress('wg-default');
      validateRouterConfig(result, ['/system script', '/system scheduler']);

      const scriptCommands = result['/system script'] || [];
      expect(scriptCommands.some((cmd: string) => cmd.includes('WireGuard-Peer-Update'))).toBe(true);
    });
  });

  describe('VPNServerBinding', () => {
    it('should generate static interface bindings for supported VPN types', () => {
      testWithOutput(
        'VPNServerBinding',
        'Generate VPN server bindings',
        { credentials: testUsers },
        () => VPNServerBinding(testUsers)
      );

      const result = VPNServerBinding(testUsers);
      validateRouterConfig(result, [
        '/interface l2tp-server',
        '/interface pptp-server',
        '/interface sstp-server',
        '/interface ovpn-server'
      ]);

      // Check that bindings are created for each VPN type
      const l2tpCommands = result['/interface l2tp-server'] || [];
      const pptpCommands = result['/interface pptp-server'] || [];
      const sstpCommands = result['/interface sstp-server'] || [];
      const ovpnCommands = result['/interface ovpn-server'] || [];

      expect(l2tpCommands.some((cmd: string) => cmd.includes('user="user2"'))).toBe(true);
      expect(pptpCommands.some((cmd: string) => cmd.includes('user="user2"'))).toBe(true);
      expect(sstpCommands.some((cmd: string) => cmd.includes('user="user3"'))).toBe(true);
      expect(ovpnCommands.some((cmd: string) => cmd.includes('user="user1"'))).toBe(true);
    });

    it('should handle empty credentials array', () => {
      testWithOutput(
        'VPNServerBinding',
        'Handle empty credentials',
        { credentials: [] },
        () => VPNServerBinding([])
      );

      const result = VPNServerBinding([]);
      validateRouterConfig(result, [""]);

      const comments = result[""] || [];
      expect(comments.some((c: string) => c.includes('No credentials provided'))).toBe(true);
    });

    it('should handle users with unsupported VPN types', () => {
      const wireguardOnlyUsers: Credentials[] = [
        { Username: 'wguser', Password: 'pass', VPNType: ['Wireguard'] }
      ];

      testWithOutput(
        'VPNServerBinding',
        'Handle unsupported VPN types',
        { credentials: wireguardOnlyUsers },
        () => VPNServerBinding(wireguardOnlyUsers)
      );

      const result = VPNServerBinding(wireguardOnlyUsers);
      validateRouterConfig(result, [""]);

      const comments = result[""] || [];
      expect(comments.some((c: string) => c.includes('No users configured for supported VPN binding types'))).toBe(true);
    });
  });

  describe('WireguardServerUsers', () => {
    it('should generate WireGuard peers for users', () => {
      const serverConfig: WireguardInterfaceConfig = {
        Name: 'wireguard-server',
        PrivateKey: 'test-key',
        InterfaceAddress: '192.168.170.1/24',
        ListenPort: 13231
      };

      testWithOutput(
        'WireguardServerUsers',
        'Generate WireGuard users',
        { serverConfig, users: testUsers },
        () => WireguardServerUsers(serverConfig, testUsers)
      );

      const result = WireguardServerUsers(serverConfig, testUsers);
      validateRouterConfig(result, ['/interface wireguard peers']);

      const peerCommands = result['/interface wireguard peers'] || [];
      expect(peerCommands.some((cmd: string) => cmd.includes('name="user1"'))).toBe(true);
      expect(peerCommands.some((cmd: string) => cmd.includes('name="multiuser"'))).toBe(true);
    });

    it('should handle server without interface address', () => {
      const serverConfig: WireguardInterfaceConfig = {
        Name: 'wireguard-server',
        PrivateKey: 'test-key',
        InterfaceAddress: ''
      };

      testWithOutput(
        'WireguardServerUsers',
        'Handle server without interface address',
        { serverConfig, users: testUsers },
        () => WireguardServerUsers(serverConfig, testUsers)
      );

      const result = WireguardServerUsers(serverConfig, testUsers);
      const peerCommands = result['/interface wireguard peers'] || [];
      expect(peerCommands.some((cmd: string) => cmd.includes('Server interface address is required'))).toBe(true);
    });
  });

  describe('OVPNServerUsers', () => {
    it('should generate OpenVPN users', () => {
      testWithOutput(
        'OVPNServerUsers',
        'Generate OpenVPN users',
        { users: testUsers },
        () => OVPNServerUsers(testUsers)
      );

      const result = OVPNServerUsers(testUsers);
      validateRouterConfig(result, ['/ppp secret']);

      const secretCommands = result['/ppp secret'] || [];
      expect(secretCommands.some((cmd: string) => cmd.includes('name="user1"') && cmd.includes('service=ovpn'))).toBe(true);
      expect(secretCommands.some((cmd: string) => cmd.includes('name="multiuser"') && cmd.includes('service=ovpn'))).toBe(true);
    });

    it('should handle no OpenVPN users', () => {
      const nonOvpnUsers: Credentials[] = [
        { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] }
      ];

      testWithOutput(
        'OVPNServerUsers',
        'Handle no OpenVPN users',
        { users: nonOvpnUsers },
        () => OVPNServerUsers(nonOvpnUsers)
      );

      const result = OVPNServerUsers(nonOvpnUsers);
      const secretCommands = result['/ppp secret'] || [];
      expect(secretCommands.some((cmd: string) => cmd.includes('No users configured for OpenVPN'))).toBe(true);
    });
  });

  describe('PptpServerUsers', () => {
    it('should generate PPTP users', () => {
      testWithOutput(
        'PptpServerUsers',
        'Generate PPTP users',
        { users: testUsers },
        () => PptpServerUsers(testUsers)
      );

      const result = PptpServerUsers(testUsers);
      validateRouterConfig(result, ['/ppp secret']);

      const secretCommands = result['/ppp secret'] || [];
      expect(secretCommands.some((cmd: string) => cmd.includes('name="user2"') && cmd.includes('service=pptp'))).toBe(true);
      expect(secretCommands.some((cmd: string) => cmd.includes('name="multiuser"') && cmd.includes('service=pptp'))).toBe(true);
    });
  });

  describe('L2tpServerUsers', () => {
    it('should generate L2TP users', () => {
      testWithOutput(
        'L2tpServerUsers',
        'Generate L2TP users',
        { users: testUsers },
        () => L2tpServerUsers(testUsers)
      );

      const result = L2tpServerUsers(testUsers);
      validateRouterConfig(result, ['/ppp secret']);

      const secretCommands = result['/ppp secret'] || [];
      expect(secretCommands.some((cmd: string) => cmd.includes('name="user2"') && cmd.includes('service=l2tp'))).toBe(true);
      expect(secretCommands.some((cmd: string) => cmd.includes('name="multiuser"') && cmd.includes('service=l2tp'))).toBe(true);
    });
  });

  describe('SstpServerUsers', () => {
    it('should generate SSTP users', () => {
      testWithOutput(
        'SstpServerUsers',
        'Generate SSTP users',
        { users: testUsers },
        () => SstpServerUsers(testUsers)
      );

      const result = SstpServerUsers(testUsers);
      validateRouterConfig(result, ['/ppp secret']);

      const secretCommands = result['/ppp secret'] || [];
      expect(secretCommands.some((cmd: string) => cmd.includes('name="user3"') && cmd.includes('service=sstp'))).toBe(true);
      expect(secretCommands.some((cmd: string) => cmd.includes('name="multiuser"') && cmd.includes('service=sstp'))).toBe(true);
    });
  });

  describe('Ikev2ServerUsers', () => {
    it('should generate IKEv2 users info', () => {
      testWithOutput(
        'Ikev2ServerUsers',
        'Generate IKEv2 users info',
        { users: testUsers },
        () => Ikev2ServerUsers(testUsers)
      );

      const result = Ikev2ServerUsers(testUsers);
      validateRouterConfig(result, [""]);

      const comments = result[""] || [];
      expect(comments.some((c: string) => c.includes('IKEv2 users are managed through IPsec identities'))).toBe(true);
      expect(comments.some((c: string) => c.includes('1 users configured for IKEv2'))).toBe(true);
    });
  });

  describe('VPNServerUsersWrapper', () => {
    it('should generate complete VPN users configuration', () => {
      const vpnServer: VPNServer = {
        Users: testUsers,
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
          Certificate: { Certificate: 'cert' },
          Address: {}
        },
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
        'VPNServerUsersWrapper',
        'Complete VPN users configuration',
        { credentials: testUsers, vpnServer },
        () => VPNServerUsersWrapper(testUsers, vpnServer)
      );

      const result = VPNServerUsersWrapper(testUsers, vpnServer);
      validateRouterConfig(result);

      // Should include multiple VPN user configurations
      const comments = result[""] || [];
      expect(comments.some((c: string) => c.includes('VPN Server Users Configuration Summary'))).toBe(true);
      expect(comments.some((c: string) => c.includes('Total users: 4'))).toBe(true);
    });

    it('should handle empty users array', () => {
      const vpnServer: VPNServer = {
        Users: []
      };

      testWithOutput(
        'VPNServerUsersWrapper',
        'Handle empty users',
        { credentials: [], vpnServer },
        () => VPNServerUsersWrapper([], vpnServer)
      );

      const result = VPNServerUsersWrapper([], vpnServer);
      validateRouterConfig(result, [""]);

      const comments = result[""] || [];
      expect(comments.some((c: string) => c.includes('No VPN types found in user credentials'))).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle mixed VPN type filtering correctly', () => {
      const mixedUsers: Credentials[] = [
        { Username: 'wg-only', Password: 'pass', VPNType: ['Wireguard'] },
        { Username: 'pptp-only', Password: 'pass', VPNType: ['PPTP'] },
        { Username: 'multi-vpn', Password: 'pass', VPNType: ['Wireguard', 'PPTP', 'L2TP'] }
      ];

      const pptpResult = PptpServerUsers(mixedUsers);
      const pptpCommands = pptpResult['/ppp secret'] || [];
      
      // Should include pptp-only and multi-vpn users
      expect(pptpCommands.filter((cmd: string) => cmd.includes('add')).length).toBe(2);
      expect(pptpCommands.some((cmd: string) => cmd.includes('name="pptp-only"'))).toBe(true);
      expect(pptpCommands.some((cmd: string) => cmd.includes('name="multi-vpn"'))).toBe(true);
    });

    it('should handle users with empty VPNType arrays', () => {
      const emptyVpnUsers: Credentials[] = [
        { Username: 'no-vpn', Password: 'pass', VPNType: [] }
      ];

      const result = OVPNServerUsers(emptyVpnUsers);
      const secretCommands = result['/ppp secret'] || [];
      expect(secretCommands.some((cmd: string) => cmd.includes('No users configured for OpenVPN'))).toBe(true);
    });
  });
}); 