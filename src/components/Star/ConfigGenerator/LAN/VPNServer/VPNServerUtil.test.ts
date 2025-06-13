import { describe, it, expect } from 'vitest';
import { 
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

    it('should handle empty arrays in formatArrayValue', () => {
      testWithGenericOutput(
        'formatArrayValue',
        'Format empty array',
        { value: [] },
        () => formatArrayValue([])
      );

      const result = formatArrayValue([]);
      expect(result).toBe('');
    });

    it('should handle single item arrays in formatArrayValue', () => {
      testWithGenericOutput(
        'formatArrayValue',
        'Format single item array',
        { value: ['sha256'] },
        () => formatArrayValue(['sha256'])
      );

      const result = formatArrayValue(['sha256']);
      expect(result).toBe('sha256');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null and undefined values in formatArrayValue', () => {
      testWithGenericOutput(
        'formatArrayValue',
        'Format null value',
        { value: null },
        () => formatArrayValue(null)
      );

      const nullResult = formatArrayValue(null);
      expect(nullResult).toBe('');

      testWithGenericOutput(
        'formatArrayValue',
        'Format undefined value',
        { value: undefined },
        () => formatArrayValue(undefined)
      );

      const undefinedResult = formatArrayValue(undefined);
      expect(undefinedResult).toBe('');
    });

    it('should handle mixed data types in arrays', () => {
      testWithGenericOutput(
        'formatArrayValue',
        'Format mixed type array',
        { value: ['string', 123, true] },
        () => formatArrayValue(['string', 123, true])
      );

      const result = formatArrayValue(['string', 123, true]);
      expect(result).toBe('string,123,true');
    });

    it('should handle complex firewall rule configurations', () => {
      const complexRules: VPNFirewallRule[] = [
        {
          port: '1194,1195',
          protocol: 'tcp,udp',
          comment: 'OpenVPN Multi-Port',
          interfaceList: 'WAN'
        },
        {
          port: 443,
          protocol: 'tcp',
          comment: 'SSTP over HTTPS'
        }
      ];

      testWithOutput(
        'generateVPNFirewallRules',
        'Complex firewall rules',
        { complexRules },
        () => generateVPNFirewallRules(complexRules)
      );

      const result = generateVPNFirewallRules(complexRules);
      validateRouterConfig(result, ['/ip firewall filter']);

      const filterCommands = result['/ip firewall filter'] || [];
      expect(filterCommands.some((cmd: string) => cmd.includes('dst-port=1194,1195'))).toBe(true);
      expect(filterCommands.some((cmd: string) => cmd.includes('protocol=tcp,udp'))).toBe(true);
    });

    it('should handle address lists with special characters', () => {
      const specialAddressLists: VPNAddressList[] = [
        {
          address: '192.168.1.0/24',
          listName: 'VPN-CLIENTS_2024'
        },
        {
          address: '10.0.0.0/8',
          listName: 'PRIVATE-NETWORKS'
        }
      ];

      testWithOutput(
        'generateVPNAddressLists',
        'Address lists with special characters',
        { specialAddressLists },
        () => generateVPNAddressLists(specialAddressLists)
      );

      const result = generateVPNAddressLists(specialAddressLists);
      validateRouterConfig(result, ['/ip firewall address-list']);

      const addressCommands = result['/ip firewall address-list'] || [];
      expect(addressCommands.some((cmd: string) => cmd.includes('list=VPN-CLIENTS_2024'))).toBe(true);
      expect(addressCommands.some((cmd: string) => cmd.includes('list=PRIVATE-NETWORKS'))).toBe(true);
    });
  });
}); 