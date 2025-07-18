import { describe, it, expect } from 'vitest';
import { 
  VPNServerCertificate,
  VPNServerBinding,
  WireguardServerUsers,
  OVPNServerUsers,
  PptpServerUsers,
  L2tpServerUsers,
  SstpServerUsers,
  Ikev2ServerUsers,
  VPNServerUsersWrapper
} from './VPNServerUsers';
import { WireguardPeerAddress } from './VPNServerUtil';
import type { 
  Credentials,
  WireguardInterfaceConfig,
  VPNServer
} from '~/components/Star/StarContext/Utils/VPNServerType';
import { testWithOutput, validateRouterConfig, testWithGenericOutput } from '../../../../../test-utils/test-helpers';


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
        OpenVpnServer: [{
          name: 'ovpn-server',
          enabled: true,
          Encryption: {},
          IPV6: {},
          Certificate: {
            Certificate: 'server-cert'
          },
          Address: {}
        }]
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

  describe('VPNServerBinding - Comprehensive Tests', () => {
    it('should generate static interface bindings for all supported VPN types', () => {
      // Testing: VPNServerBinding
      // Test Case: Generate VPN server bindings for all supported types
      // Function: VPNServerBinding

      testWithOutput(
        'VPNServerBinding',
        'Generate VPN server bindings for all supported types',
        { credentials: testUsers },
        () => VPNServerBinding(testUsers)
      );

      const result = VPNServerBinding(testUsers);
      validateRouterConfig(result, [
        '/interface l2tp-server',
        '/interface pptp-server', 
        '/interface sstp-server',
        '/interface ovpn-server',
        '/interface list member'
      ]);

      testWithGenericOutput(
        'VPNServerBinding Detailed Analysis',
        'Analyze the generated configuration in detail',
        { credentials: testUsers },
        () => {
          const l2tpCommands = result['/interface l2tp-server'] || [];
          const pptpCommands = result['/interface pptp-server'] || [];
          const sstpCommands = result['/interface sstp-server'] || [];
          const ovpnCommands = result['/interface ovpn-server'] || [];
          const listMemberCommands = result['/interface list member'] || [];
          const comments = result[''] || [];

          return {
            totalSections: Object.keys(result).length,
            l2tpBindings: l2tpCommands.length,
            pptpBindings: pptpCommands.length,
            sstpBindings: sstpCommands.length,
            ovpnBindings: ovpnCommands.length,
            listMemberships: listMemberCommands.length,
            commentLines: comments.length,
            hasL2TPUser2: l2tpCommands.some(cmd => cmd.includes('user="user2"')),
            hasPPTPUser2: pptpCommands.some(cmd => cmd.includes('user="user2"')),
            hasSSTPUser3: sstpCommands.some(cmd => cmd.includes('user="user3"')),
            hasOVPNUser1: ovpnCommands.some(cmd => cmd.includes('user="user1"')),
            hasMultiUserBindings: [
              pptpCommands.some(cmd => cmd.includes('user="multiuser"')),
              l2tpCommands.some(cmd => cmd.includes('user="multiuser"')),
              sstpCommands.some(cmd => cmd.includes('user="multiuser"')),
              ovpnCommands.some(cmd => cmd.includes('user="multiuser"'))
            ]
          };
        }
      );

      // Verify specific bindings are created correctly
      const l2tpCommands = result['/interface l2tp-server'] || [];
      const pptpCommands = result['/interface pptp-server'] || [];
      const sstpCommands = result['/interface sstp-server'] || [];
      const ovpnCommands = result['/interface ovpn-server'] || [];

      // Check that each user type has the correct bindings
      expect(l2tpCommands.some(cmd => cmd.includes('user="user2"'))).toBe(true);
      expect(l2tpCommands.some(cmd => cmd.includes('user="multiuser"'))).toBe(true);
      expect(pptpCommands.some(cmd => cmd.includes('user="user2"'))).toBe(true);
      expect(pptpCommands.some(cmd => cmd.includes('user="multiuser"'))).toBe(true);
      expect(sstpCommands.some(cmd => cmd.includes('user="user3"'))).toBe(true);
      expect(sstpCommands.some(cmd => cmd.includes('user="multiuser"'))).toBe(true);
      expect(ovpnCommands.some(cmd => cmd.includes('user="user1"'))).toBe(true);
      expect(ovpnCommands.some(cmd => cmd.includes('user="multiuser"'))).toBe(true);
    });

    it('should handle empty credentials array correctly', () => {
      // Testing: VPNServerBinding
      // Test Case: Handle empty credentials array
      // Function: VPNServerBinding

      testWithOutput(
        'VPNServerBinding',
        'Handle empty credentials array',
        { credentials: [] },
        () => VPNServerBinding([])
      );

      const result = VPNServerBinding([]);
      validateRouterConfig(result, [""]);

      const comments = result[""] || [];
      expect(comments.some(c => c.includes('No credentials provided'))).toBe(true);
      
      // Should not have any interface configurations
      expect(result['/interface l2tp-server']?.length || 0).toBe(0);
      expect(result['/interface pptp-server']?.length || 0).toBe(0);
      expect(result['/interface sstp-server']?.length || 0).toBe(0);
      expect(result['/interface ovpn-server']?.length || 0).toBe(0);
    });

    it('should handle users with only unsupported VPN types', () => {
      // Testing: VPNServerBinding
      // Test Case: Handle users with unsupported VPN types
      // Function: VPNServerBinding

      const wireguardOnlyUsers: Credentials[] = [
        { Username: 'wguser', Password: 'pass', VPNType: ['Wireguard'] },
        { Username: 'ikev2user', Password: 'pass', VPNType: ['IKeV2'] }
      ];

      testWithOutput(
        'VPNServerBinding',
        'Handle users with unsupported VPN types (Wireguard, IKeV2)',
        { credentials: wireguardOnlyUsers },
        () => VPNServerBinding(wireguardOnlyUsers)
      );

      const result = VPNServerBinding(wireguardOnlyUsers);
      validateRouterConfig(result, [""]);

      const comments = result[""] || [];
      expect(comments.some(c => c.includes('No users configured for supported VPN binding types'))).toBe(true);
    });

    it('should create interface list memberships for all created interfaces', () => {
      // Testing: VPNServerBinding
      // Test Case: Verify interface list memberships
      // Function: VPNServerBinding

      const mixedUsers: Credentials[] = [
        { Username: 'l2tpuser', Password: 'pass', VPNType: ['L2TP'] },
        { Username: 'pptpuser', Password: 'pass', VPNType: ['PPTP'] }
      ];

      testWithOutput(
        'VPNServerBinding',
        'Create interface list memberships',
        { credentials: mixedUsers },
        () => VPNServerBinding(mixedUsers)
      );

      const result = VPNServerBinding(mixedUsers);
      validateRouterConfig(result, ['/interface list member']);

      const listMemberCommands = result['/interface list member'] || [];
      
      testWithGenericOutput(
        'Interface List Membership Analysis',
        'Analyze interface list memberships',
        { mixedUsers, expectedInterfaces: 2, expectedMemberships: 4 },
        () => {
          const lanListEntries = listMemberCommands.filter(cmd => cmd.includes('list="LAN"'));
          const vpnLanListEntries = listMemberCommands.filter(cmd => cmd.includes('list="VPN-LAN"'));
          const l2tpInterface = listMemberCommands.filter(cmd => cmd.includes('interface="l2tp-l2tpuser"'));
          const pptpInterface = listMemberCommands.filter(cmd => cmd.includes('interface="pptp-pptpuser"'));

          return {
            totalMemberships: listMemberCommands.length,
            lanListMemberships: lanListEntries.length,
            vpnLanListMemberships: vpnLanListEntries.length,
            l2tpInterfaceMemberships: l2tpInterface.length,
            pptpInterfaceMemberships: pptpInterface.length,
            isCorrect: listMemberCommands.length === 4 && lanListEntries.length === 2 && vpnLanListEntries.length === 2
          };
        }
      );

      // Each user should have 2 interface list memberships (LAN and VPN-LAN)
      expect(listMemberCommands.length).toBe(4); // 2 users * 2 lists each
      expect(listMemberCommands.some(cmd => cmd.includes('interface="l2tp-l2tpuser"') && cmd.includes('list="LAN"'))).toBe(true);
      expect(listMemberCommands.some(cmd => cmd.includes('interface="l2tp-l2tpuser"') && cmd.includes('list="VPN-LAN"'))).toBe(true);
      expect(listMemberCommands.some(cmd => cmd.includes('interface="pptp-pptpuser"') && cmd.includes('list="LAN"'))).toBe(true);
      expect(listMemberCommands.some(cmd => cmd.includes('interface="pptp-pptpuser"') && cmd.includes('list="VPN-LAN"'))).toBe(true);
    });

    it('should generate proper static interface naming conventions', () => {
      // Testing: VPNServerBinding
      // Test Case: Verify static interface naming conventions
      // Function: VPNServerBinding

      const singleUserPerType: Credentials[] = [
        { Username: 'testL2TP', Password: 'pass', VPNType: ['L2TP'] },
        { Username: 'testPPTP', Password: 'pass', VPNType: ['PPTP'] },
        { Username: 'testSSTP', Password: 'pass', VPNType: ['SSTP'] },
        { Username: 'testOVPN', Password: 'pass', VPNType: ['OpenVPN'] }
      ];

      testWithOutput(
        'VPNServerBinding',
        'Verify static interface naming conventions',
        { credentials: singleUserPerType },
        () => VPNServerBinding(singleUserPerType)
      );

      const result = VPNServerBinding(singleUserPerType);

      testWithGenericOutput(
        'Interface Naming Analysis',
        'Analyze generated interface names',
        { singleUserPerType },
        () => {
          const l2tpCommands = result['/interface l2tp-server'] || [];
          const pptpCommands = result['/interface pptp-server'] || [];
          const sstpCommands = result['/interface sstp-server'] || [];
          const ovpnCommands = result['/interface ovpn-server'] || [];

          return {
            l2tpInterfaceName: l2tpCommands[0] || 'none',
            pptpInterfaceName: pptpCommands[0] || 'none',
            sstpInterfaceName: sstpCommands[0] || 'none',
            ovpnInterfaceName: ovpnCommands[0] || 'none',
            hasExpectedNaming: [
              l2tpCommands.some(cmd => cmd.includes('name="l2tp-testL2TP"')),
              pptpCommands.some(cmd => cmd.includes('name="pptp-testPPTP"')),
              sstpCommands.some(cmd => cmd.includes('name="sstp-testSSTP"')),
              ovpnCommands.some(cmd => cmd.includes('name="ovpn-testOVPN"'))
            ]
          };
        }
      );

      // Verify proper naming conventions
      const l2tpCommands = result['/interface l2tp-server'] || [];
      const pptpCommands = result['/interface pptp-server'] || [];
      const sstpCommands = result['/interface sstp-server'] || [];
      const ovpnCommands = result['/interface ovpn-server'] || [];

      expect(l2tpCommands.some(cmd => cmd.includes('name="l2tp-testL2TP"'))).toBe(true);
      expect(pptpCommands.some(cmd => cmd.includes('name="pptp-testPPTP"'))).toBe(true);
      expect(sstpCommands.some(cmd => cmd.includes('name="sstp-testSSTP"'))).toBe(true);
      expect(ovpnCommands.some(cmd => cmd.includes('name="ovpn-testOVPN"'))).toBe(true);
    });

    it('should include comprehensive documentation and summaries', () => {
      // Testing: VPNServerBinding
      // Test Case: Verify documentation and summaries are included
      // Function: VPNServerBinding

      testWithOutput(
        'VPNServerBinding',
        'Verify comprehensive documentation',
        { credentials: testUsers },
        () => VPNServerBinding(testUsers)
      );

      const result = VPNServerBinding(testUsers);
      const comments = result[""] || [];

      testWithGenericOutput(
        'Documentation Analysis',
        'Analyze generated documentation and comments',
        { testUsers },
        () => {
          const hasMainHeader = comments.some(c => c.includes('VPN Server Binding Configuration'));
          const hasTotalUsers = comments.some(c => c.includes('Total users:'));
          const hasSupportedTypes = comments.some(c => c.includes('Supported VPN types:'));
          const hasBenefits = comments.some(c => c.includes('Static Interface Binding Benefits:'));
          const hasSummary = comments.some(c => c.includes('VPN Server Binding Summary:'));
          const hasInterfaceInfo = comments.some(c => c.includes('Interface List Memberships:'));

          return {
            totalCommentLines: comments.length,
            hasMainHeader,
            hasTotalUsers,
            hasSupportedTypes,
            hasBenefits,
            hasSummary,
            hasInterfaceInfo,
            documentationComplete: hasMainHeader && hasTotalUsers && hasSupportedTypes && hasBenefits && hasSummary
          };
        }
      );

      // Verify documentation sections are present
      expect(comments.some(c => c.includes('VPN Server Binding Configuration'))).toBe(true);
      expect(comments.some(c => c.includes('Total users:'))).toBe(true);
      expect(comments.some(c => c.includes('Supported VPN types:'))).toBe(true);
      expect(comments.some(c => c.includes('Static Interface Binding Benefits:'))).toBe(true);
      expect(comments.some(c => c.includes('VPN Server Binding Summary:'))).toBe(true);
      expect(comments.some(c => c.includes('Interface List Memberships:'))).toBe(true);
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

describe('VPNServerUsers Module Tests - Real Context Data', () => {

  // User's exact context data
  const userCredentials: Credentials[] = [
    {
      Username: "sssssssssss",
      Password: "sssssssssss",
      VPNType: ["Wireguard", "OpenVPN", "PPTP", "L2TP", "SSTP", "IKeV2"]
    }
  ];

  const userVPNServer: VPNServer = {
    Users: userCredentials,
    PptpServer: {
      enabled: true,
      DefaultProfile: "pptp-profile",
      Authentication: ["mschap2"],
      PacketSize: {
        MaxMtu: 1450,
        MaxMru: 1450
      },
      KeepaliveTimeout: 30
    },
    L2tpServer: {
      enabled: true,
      DefaultProfile: "l2tp-profile",
      Authentication: ["mschap2"],
      PacketSize: {
        MaxMtu: 1450,
        MaxMru: 1450
      },
      KeepaliveTimeout: 30,
      IPsec: {
        UseIpsec: "yes",
        IpsecSecret: ""
      },
      allowFastPath: false,
      maxSessions: "unlimited",
      OneSessionPerHost: false,
      L2TPV3: {
        l2tpv3CircuitId: "",
        l2tpv3CookieLength: 0,
        l2tpv3DigestHash: "md5",
        l2tpv3EtherInterfaceList: ""
      },
      acceptProtoVersion: "all",
      callerIdType: "ip-address"
    },
    SstpServer: {
      enabled: true,
      Certificate: "default",
      DefaultProfile: "sstp-profile",
      Authentication: ["mschap2"],
      PacketSize: {
        MaxMtu: 1450,
        MaxMru: 1450
      },
      KeepaliveTimeout: 30,
      Port: 4443,
      ForceAes: false,
      Pfs: false,
      Ciphers: "aes256-sha",
      VerifyClientCertificate: false,
      TlsVersion: "any"
    },
    OpenVpnServer: [
      {
        name: "openvpn-udp",
        enabled: true,
        Port: 1194,
        Protocol: "udp",
        Mode: "ip",
        DefaultProfile: "ovpn-profile",
        Authentication: ["mschap2"],
        PacketSize: {
          MaxMtu: 1450,
          MaxMru: 1450
        },
        KeepaliveTimeout: 30,
        VRF: "",
        RedirectGetway: "def1",
        PushRoutes: "",
        RenegSec: 3600,
        Encryption: {
          Auth: ["sha256"],
          UserAuthMethod: "mschap2",
          Cipher: ["aes256-cbc"],
          TlsVersion: "any"
        },
        IPV6: {
          EnableTunIPv6: false,
          IPv6PrefixLength: 64,
          TunServerIPv6: ""
        },
        Certificate: {
          Certificate: "server-cert",
          RequireClientCertificate: false,
          CertificateKeyPassphrase: "sssssssssssss"
        },
        Address: {
          Netmask: 24,
          MacAddress: "",
          MaxMtu: 1450,
          AddressPool: "ovpn-pool"
        }
      }
    ],
    Ikev2Server: {
      ipPools: {
        Name: "ike2-pool",
        Ranges: "192.168.77.2-192.168.77.254"
      },
      profile: {
        name: "ike2",
        hashAlgorithm: "sha1",
        encAlgorithm: "aes-128",
        dhGroup: "modp1024"
      },
      proposal: {
        name: "ike2",
        authAlgorithms: "sha1",
        encAlgorithms: "aes-256-cbc",
        pfsGroup: "none"
      },
      policyGroup: {
        name: "ike2-policies"
      },
      policyTemplates: {
        group: "ike2-policies",
        proposal: "ike2",
        srcAddress: "0.0.0.0/0",
        dstAddress: "192.168.77.0/24"
      },
      peer: {
        name: "ike2",
        exchangeMode: "ike2",
        passive: true,
        profile: "ike2"
      },
      identities: {
        authMethod: "digital-signature",
        peer: "ike2",
        generatePolicy: "port-strict",
        policyTemplateGroup: "ike2-policies"
      },
      modeConfigs: {
        name: "ike2-conf",
        addressPool: "ike2-pool",
        addressPrefixLength: 32,
        responder: true
      }
    },
    WireguardServers: [
      {
        Interface: {
          Name: "wg-server",
          PrivateKey: "",
          PublicKey: "",
          InterfaceAddress: "192.168.110.1/24",
          ListenPort: 51820,
          Mtu: 1420
        },
        Peers: []
      }
    ]
  };

  describe('VPNServerBinding with User Context', () => {
    it('should generate VPN server bindings for the user context', () => {
      const result = testWithOutput(
        'VPNServerBinding',
        'Generate static interface bindings for user with multiple VPN types',
        { 
          credentials: userCredentials,
          vpnTypes: userCredentials[0].VPNType,
          username: userCredentials[0].Username
        },
        () => VPNServerBinding(userCredentials)
      );

      validateRouterConfig(result, [
        '/interface l2tp-server',
        '/interface pptp-server', 
        '/interface sstp-server',
        '/interface ovpn-server',
        '/interface list member'
      ]);

      // Verify the bindings were created
      console.log('🔍 Detailed Binding Analysis:');
      
      const l2tpBindings = result['/interface l2tp-server'] || [];
      const pptpBindings = result['/interface pptp-server'] || [];
      const sstpBindings = result['/interface sstp-server'] || [];
      const ovpnBindings = result['/interface ovpn-server'] || [];
      const interfaceMembers = result['/interface list member'] || [];
      
      console.log(`  L2TP bindings: ${l2tpBindings.length}`);
      console.log(`  PPTP bindings: ${pptpBindings.length}`);
      console.log(`  SSTP bindings: ${sstpBindings.length}`);
      console.log(`  OpenVPN bindings: ${ovpnBindings.length}`);
      console.log(`  Interface list members: ${interfaceMembers.length}`);
      
      // Expected: 1 binding for each supported VPN type (L2TP, PPTP, SSTP, OpenVPN)
      // Expected: 8 interface list members (4 bindings × 2 lists each = 8)
      
      const expectedBindingNames = [
        'l2tp-sssssssssss',
        'pptp-sssssssssss', 
        'sstp-sssssssssss',
        'ovpn-sssssssssss'
      ];
      
      console.log(`  Expected binding names: ${expectedBindingNames.join(', ')}`);
      
      return result;
    });

    it('should handle empty credentials gracefully', () => {
      const result = testWithOutput(
        'VPNServerBinding',
        'Handle empty credentials array',
        { credentials: [] },
        () => VPNServerBinding([])
      );

      validateRouterConfig(result);
      
      console.log('🔍 Empty Credentials Check:');
      const comments = result[''] || [];
      const hasNoCredentialsComment = comments.some((comment: string) => 
        comment.includes('No credentials provided')
      );
      console.log(`  Has "no credentials" comment: ${hasNoCredentialsComment}`);
      
      return result;
    });

    it('should filter users correctly by supported VPN types', () => {
      // Test with a user that has only unsupported VPN types
      const unsupportedUser: Credentials[] = [
        {
          Username: "test-user",
          Password: "test-pass", 
          VPNType: ["Wireguard", "IKeV2"] // Only unsupported types for binding
        }
      ];

      const result = testWithOutput(
        'VPNServerBinding',
        'Filter users with only unsupported VPN types for binding',
        { 
          credentials: unsupportedUser,
          supportedTypes: ['L2TP', 'PPTP', 'SSTP', 'OpenVPN'],
          userTypes: unsupportedUser[0].VPNType
        },
        () => VPNServerBinding(unsupportedUser)
      );

      validateRouterConfig(result);
      
      console.log('🔍 Unsupported Types Check:');
      const comments = result[''] || [];
      const hasUnsupportedComment = comments.some((comment: string) => 
        comment.includes('No users configured for supported VPN binding types')
      );
      console.log(`  Has "unsupported types" comment: ${hasUnsupportedComment}`);
      
      return result;
    });
  });

  describe('VPNServerUsersWrapper with User Context', () => {
    it('should generate complete VPN server configuration for user context', () => {
      const result = testWithOutput(
        'VPNServerUsersWrapper',
        'Complete VPN server configuration with certificates, bindings, and users',
        { 
          credentials: userCredentials,
          vpnServer: userVPNServer,
          enabledServers: {
            pptp: userVPNServer.PptpServer?.enabled,
            l2tp: userVPNServer.L2tpServer?.enabled,
            sstp: userVPNServer.SstpServer?.enabled,
            openvpn: userVPNServer.OpenVpnServer?.length,
            ikev2: !!userVPNServer.Ikev2Server,
            wireguard: userVPNServer.WireguardServers?.length
          }
        },
        () => VPNServerUsersWrapper(userCredentials, userVPNServer)
      );

      validateRouterConfig(result, [
        '/certificate',
        '/interface l2tp-server',
        '/interface pptp-server',
        '/interface sstp-server', 
        '/interface ovpn-server',
        '/interface list member',
        '/ppp secret',
        '/ip ipsec identity',
        '/interface wireguard peers'
      ]);

      console.log('🔍 Complete Configuration Analysis:');
      const sections = Object.keys(result);
      console.log(`  Total configuration sections: ${sections.length}`);
      sections.forEach(section => {
        const commands = result[section];
        if (Array.isArray(commands)) {
          console.log(`  ${section}: ${commands.length} commands`);
        }
      });
      
      return result;
    });
  });

  describe('Known VPN Server Binding Issues', () => {
    it('should document known MikroTik VPN binding limitations', () => {
      testWithOutput(
        'VPNServerBinding Documentation',
        'Document known issues and solutions for VPN server bindings',
        { 
          knownIssues: [
            'Binding reliability problems',
            'Connection re-association issues',
            'Only-one profile setting needed'
          ]
        },
        () => {
          return {
            knownIssues: [
              "VPN server bindings sometimes don't work reliably in MikroTik RouterOS",
              "Connections may not use the binding interface after reconnection",
              "Set 'only-one=yes' in PPP profiles to prevent multiple connections",
              "Use binding for advanced firewall/queue rules, not just routing",
              "Static bindings provide predictable interface names for management"
            ],
            solutions: [
              "Configure 'only-one=yes' in PPP profiles",
              "Use bindings primarily for firewall and queue management",
              "Monitor connections to ensure they use correct bindings",
              "Consider using scripts to detect and fix binding issues"
            ],
            benefits: [
              "Predictable interface names for firewall rules",
              "Per-user queue management capabilities", 
              "Individual user traffic monitoring",
              "User-specific interface list assignments",
              "Proper network segmentation through interface lists"
            ]
          };
        }
      );
    });
  });
}); 