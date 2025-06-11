import { describe, it, expect } from 'vitest';
import { 
  CertificateGenerator,
  generateVPNFirewallRules,
  generateVPNAddressLists,
  generateVPNInterfaceLists,
  generateVPNServerNetworkConfig,
  formatArrayValue,
  formatBooleanValue
} from './VPNServerUtil';
import type { 
  VPNFirewallRule,
  VPNAddressList,
  VPNInterfaceList
} from './VPNServerUtil';

describe('VPN Server Utility Functions Tests', () => {

  describe('Certificate Generator', () => {
    it('should generate certificate configuration', () => {
      testWithOutput(
        'CertificateGenerator',
        'Certificate generation',
        {},
        () => CertificateGenerator()
      );

      const result = CertificateGenerator();
      validateRouterConfig(result, ['/certificate']);
    });
  });

  describe('VPN Firewall Rules Generator', () => {
    it('should generate basic VPN firewall rules', () => {
      const vpnRules: VPNFirewallRule[] = [
        {
          port: 51820,
          protocol: 'udp',
          comment: 'WireGuard VPN',
          interfaceList: 'VPN'
        },
        {
          port: 1194,
          protocol: 'udp', 
          comment: 'OpenVPN'
        }
      ];

      testWithOutput(
        'generateVPNFirewallRules',
        'Basic VPN firewall rules',
        { vpnRules },
        () => generateVPNFirewallRules(vpnRules)
      );

      const result = generateVPNFirewallRules(vpnRules);
      validateRouterConfig(result, ['/ip firewall filter']);
    });
  });

  describe('VPN Address Lists Generator', () => {
    it('should generate VPN address lists', () => {
      const addressLists: VPNAddressList[] = [
        {
          address: '192.168.170.0/24',
          listName: 'VPN-NETWORKS'
        },
        {
          address: '10.8.0.0/24',
          listName: 'OVPN-CLIENTS'
        }
      ];

      testWithOutput(
        'generateVPNAddressLists',
        'VPN address lists',
        { addressLists },
        () => generateVPNAddressLists(addressLists)
      );

      const result = generateVPNAddressLists(addressLists);
      validateRouterConfig(result, ['/ip firewall address-list']);
    });
  });

  describe('VPN Interface Lists Generator', () => {
    it('should generate VPN interface lists', () => {
      const interfaceLists: VPNInterfaceList[] = [
        {
          interfaceName: 'wireguard-server',
          lists: ['VPN', 'LAN']
        },
        {
          interfaceName: 'ovpn-out1',
          lists: ['VPN']
        }
      ];

      testWithOutput(
        'generateVPNInterfaceLists',
        'VPN interface lists',
        { interfaceLists },
        () => generateVPNInterfaceLists(interfaceLists)
      );

      const result = generateVPNInterfaceLists(interfaceLists);
      validateRouterConfig(result, ['/interface list member']);
    });
  });

  describe('VPN Server Network Configuration', () => {
    it('should generate complete VPN server network configuration', () => {
      const firewallRules: VPNFirewallRule[] = [
        { port: 51820, protocol: 'udp', comment: 'WireGuard' }
      ];

      const addressLists: VPNAddressList[] = [
        { address: '192.168.170.0/24', listName: 'VPN-NETWORKS' }
      ];

      const interfaceLists: VPNInterfaceList[] = [
        { interfaceName: 'wireguard-server', lists: ['VPN'] }
      ];

      testWithOutput(
        'generateVPNServerNetworkConfig',
        'Complete VPN server network configuration',
        { firewallRules, addressLists, interfaceLists },
        () => generateVPNServerNetworkConfig(firewallRules, addressLists, interfaceLists)
      );

      const result = generateVPNServerNetworkConfig(firewallRules, addressLists, interfaceLists);
      validateRouterConfig(result);
    });
  });

  describe('Utility Functions', () => {
    it('should format array values correctly', () => {
      testWithGenericOutput(
        'formatArrayValue',
        'Format string array',
        { value: ['sha256', 'sha512'] },
        () => formatArrayValue(['sha256', 'sha512'])
      );

      const result = formatArrayValue(['sha256', 'sha512']);
      expect(result).toBe('sha256,sha512');
    });

    it('should format boolean values correctly', () => {
      testWithGenericOutput(
        'formatBooleanValue',
        'Format boolean to yes/no',
        { value: true },
        () => formatBooleanValue(true)
      );

      expect(formatBooleanValue(true)).toBe('yes');
      expect(formatBooleanValue(false)).toBe('no');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty firewall rules array', () => {
      const emptyRules: VPNFirewallRule[] = [];

      testWithOutput(
        'generateVPNFirewallRules',
        'Empty firewall rules array',
        { emptyRules },
        () => generateVPNFirewallRules(emptyRules)
      );

      const result = generateVPNFirewallRules(emptyRules);
      validateRouterConfig(result, ['/ip firewall filter']);
    });

    it('should handle empty address lists array', () => {
      const emptyLists: VPNAddressList[] = [];

      testWithOutput(
        'generateVPNAddressLists',
        'Empty address lists array',
        { emptyLists },
        () => generateVPNAddressLists(emptyLists)
      );

      const result = generateVPNAddressLists(emptyLists);
      validateRouterConfig(result, ['/ip firewall address-list']);
    });

    it('should handle empty interface lists array', () => {
      const emptyInterfaceLists: VPNInterfaceList[] = [];

      testWithOutput(
        'generateVPNInterfaceLists',
        'Empty interface lists array',
        { emptyInterfaceLists },
        () => generateVPNInterfaceLists(emptyInterfaceLists)
      );

      const result = generateVPNInterfaceLists(emptyInterfaceLists);
      validateRouterConfig(result, ['/interface list member']);
    });
  });
}); 