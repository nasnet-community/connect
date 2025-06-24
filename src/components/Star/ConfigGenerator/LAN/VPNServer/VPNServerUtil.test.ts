import { describe, it, expect } from 'vitest';
import { testWithOutput, validateRouterConfig, testWithGenericOutput } from '../../../../../test-utils/test-helpers';
import { 
  generateVPNFirewallRules,
  generateVPNAddressLists,
  generateVPNInterfaceLists,
  generateVPNServerNetworkConfig,
  formatArrayValue,
  formatBooleanValue,
  ExportOpenVPN,
  ExportWireGuard,
  WireguardPeerAddress
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

  describe('OpenVPN Export Script', () => {
    it('should generate simplified OpenVPN client configuration export script', () => {
      testWithOutput(
        'ExportOpenVPN',
        'Generate simplified OpenVPN export script',
        {},
        () => ExportOpenVPN()
      );

      const result = ExportOpenVPN();
      validateRouterConfig(result, ['/system script', '/system scheduler']);

      // Verify the script contains essential OpenVPN export functionality
      const scriptCommands = result['/system script'] || [];
      expect(scriptCommands.length).toBeGreaterThan(0);
      
      // Check that the script content includes key OpenVPN export features
      const scriptContent = scriptCommands.join(' ');
      expect(scriptContent).toContain('export-client-configuration');
      expect(scriptContent).toContain('ddns-enabled=yes');
      expect(scriptContent).toContain('ca_certificate.crt');
      expect(scriptContent).toContain('client_bundle.crt');
      expect(scriptContent).toContain('client_bundle.key');

      // Verify scheduler is configured
      const schedulerCommands = result['/system scheduler'] || [];
      expect(schedulerCommands.length).toBeGreaterThan(0);
      
      const schedulerContent = schedulerCommands.join(' ');
      expect(schedulerContent).toContain('Export-OpenVPN-Config');
      expect(schedulerContent).toContain('startup');
    });

    it('should create a properly structured script with error handling', () => {
      const result = ExportOpenVPN();
      
      // Verify RouterConfig structure
      validateRouterConfig(result);
      
      // Check script contains error handling
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');
      
      expect(scriptContent).toContain(':do {');
      expect(scriptContent).toContain('} on-error={');
      expect(scriptContent).toContain(':log');
      
      // Verify it contains the main steps mentioned in the documentation
      expect(scriptContent).toContain('OpenVPN server found');
      expect(scriptContent).toContain('Cloud DDNS');
      expect(scriptContent).toContain('Certificate files');
      expect(scriptContent).toContain('Export Status');
    });

    it('should include proper troubleshooting instructions', () => {
      const result = ExportOpenVPN();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');
      
      // Verify troubleshooting guidance is included
      expect(scriptContent).toContain('Troubleshooting:');
      expect(scriptContent).toContain('/interface ovpn-server server set disabled=no');
      expect(scriptContent).toContain('Run ExportCert function');
      expect(scriptContent).toContain('/interface ovpn-server server print detail');
      expect(scriptContent).toContain('/certificate print detail');
    });

    it('should be compatible with RouterOS 7.17+ and older versions', () => {
      const result = ExportOpenVPN();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');
      
      // Verify it includes both new and legacy export syntax
      expect(scriptContent).toContain('server=$serverName server-address=');
      expect(scriptContent).toContain('Fallback for older RouterOS versions');
    });
  });

  describe('WireGuard Peer Address Update Script', () => {
    it('should generate WireGuard peer address update script with default parameters', () => {
      testWithOutput(
        'WireguardPeerAddress',
        'Generate peer address update script with defaults',
        { interfaceName: 'wireguard-server' },
        () => WireguardPeerAddress('wireguard-server')
      );

      const result = WireguardPeerAddress('wireguard-server');
      validateRouterConfig(result, ['/system script', '/system scheduler']);

      // Check that script and scheduler sections are created
      const scriptCommands = result['/system script'] || [];
      const schedulerCommands = result['/system scheduler'] || [];
      
      expect(scriptCommands.length).toBeGreaterThan(0);
      expect(schedulerCommands.length).toBeGreaterThan(0);

      // Verify default script name and scheduler name
      const scriptContent = scriptCommands.join(' ');
      const schedulerContent = schedulerCommands.join(' ');
      
      expect(scriptContent).toContain('name=WireGuard-Peer-Update');
      expect(schedulerContent).toContain('name=Run-WireGuard-Peer-Update');
      expect(schedulerContent).toContain('start-time=startup');
    });

    it('should generate script with custom parameters', () => {
      testWithOutput(
        'WireguardPeerAddress',
        'Generate script with custom parameters',
        { 
          interfaceName: 'wg-custom', 
          scriptName: 'Custom-WG-Script',
          startTime: '02:30:00'
        },
        () => WireguardPeerAddress('wg-custom', 'Custom-WG-Script', '02:30:00')
      );

      const result = WireguardPeerAddress('wg-custom', 'Custom-WG-Script', '02:30:00');
      validateRouterConfig(result, ['/system script', '/system scheduler']);

      const scriptContent = result['/system script']?.join(' ') || '';
      const schedulerContent = result['/system scheduler']?.join(' ') || '';
      
      expect(scriptContent).toContain('name=Custom-WG-Script');
      expect(schedulerContent).toContain('name=Run-Custom-WG-Script');
      expect(schedulerContent).toContain('start-time=02:30:00');
    });

    it('should include proper WireGuard functionality in peer address script', () => {
      const result = WireguardPeerAddress('wg-test');
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify script contains essential WireGuard peer functionality
      expect(scriptContent).toContain('wireguard-server');
      expect(scriptContent).toContain('peers');
      expect(scriptContent).toContain('endpoint');
      expect(scriptContent).toContain('ddns-enabled=yes');
      expect(scriptContent).toContain('/ip cloud');
    });

    it('should include DDNS and cloud functionality', () => {
      const result = WireguardPeerAddress('wg-test');
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify DDNS and cloud functionality
      expect(scriptContent).toContain('/ip cloud');
      expect(scriptContent).toContain('ddns-enabled');
      expect(scriptContent).toContain('dns-name');
      expect(scriptContent).toContain('update-time');
    });

    it('should include error handling and logging', () => {
      const result = WireguardPeerAddress('wg-test');
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify error handling and logging
      expect(scriptContent).toContain(':do {');
      expect(scriptContent).toContain('} on-error={');
      expect(scriptContent).toContain(':log');
      expect(scriptContent).toContain('error');
      expect(scriptContent).toContain('info');
    });

    it('should configure scheduler properly with interval', () => {
      const result = WireguardPeerAddress('wg-test', 'test-script', 'startup');
      const schedulerCommands = result['/system scheduler'] || [];
      const schedulerContent = schedulerCommands.join(' ');

      // Verify scheduler configuration
      expect(schedulerContent).toContain('name=Run-test-script');
      expect(schedulerContent).toContain('start-time=startup');
      expect(schedulerContent).toContain('interval=30m');
      expect(schedulerContent).toContain('on-event=test-script');
      expect(schedulerContent).toContain('comment=');
    });
  });

  describe('WireGuard Export Script', () => {
    it('should generate comprehensive WireGuard client configuration export script', () => {
      testWithOutput(
        'ExportWireGuard',
        'Generate comprehensive WireGuard export script',
        {},
        () => ExportWireGuard()
      );

      const result = ExportWireGuard();
      validateRouterConfig(result, ['/system script', '/system scheduler']);

      // Verify script structure
      expect(result['/system script']).toBeDefined();
      expect(result['/system scheduler']).toBeDefined();

      // Extract script content for detailed validation
      const scriptCommands = result['/system script'] || [];
      expect(scriptCommands.length).toBeGreaterThan(0);
      
      const scriptContent = scriptCommands.join(' ');
      expect(scriptContent).toContain('Export-WireGuard-Clients');

      // Check scheduler configuration
      const schedulerCommands = result['/system scheduler'] || [];
      expect(schedulerCommands.length).toBeGreaterThan(0);
      
      const schedulerContent = schedulerCommands.join(' ');
      expect(schedulerContent).toContain('Run-Export-WireGuard-Clients');
      expect(schedulerContent).toContain('start-time=startup');
      expect(schedulerContent).toContain('interval=0');
    });

    it('should include proper WireGuard functionality in script', () => {
      const result = ExportWireGuard();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify script contains essential WireGuard export functionality
      expect(scriptContent).toContain('wireguard');
      expect(scriptContent).toContain('show-client-config');
      expect(scriptContent).toContain('.conf');
      expect(scriptContent).toContain('server');
      expect(scriptContent).toContain('peers');
    });

    it('should include DDNS configuration and management', () => {
      const result = ExportWireGuard();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify DDNS functionality
      expect(scriptContent).toContain('/ip cloud');
      expect(scriptContent).toContain('ddns-enabled');
      expect(scriptContent).toContain('dns-name');
      expect(scriptContent).toContain('client-endpoint');
    });

    it('should include proper error handling and logging', () => {
      const result = ExportWireGuard();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify error handling and logging
      expect(scriptContent).toContain(':do {');
      expect(scriptContent).toContain('} on-error={');
      expect(scriptContent).toContain(':log error');
      expect(scriptContent).toContain(':log info');
      expect(scriptContent).toContain(':log warning');
    });

    it('should include file naming and cleanup logic', () => {
      const result = ExportWireGuard();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify file naming logic
      expect(scriptContent).toContain('fileName');
      expect(scriptContent).toContain('peerName');
      expect(scriptContent).toContain('peerComment');
      expect(scriptContent).toContain('publicKey');
      expect(scriptContent).toContain('Replace spaces with underscores');
    });

    it('should filter peers by server interface names', () => {
      const result = ExportWireGuard();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify server interface filtering
      expect(scriptContent).toContain('name~"server"');
      expect(scriptContent).toContain('Processing WireGuard server interface');
      expect(scriptContent).toContain('interface=$interfaceName');
    });

    it('should include comprehensive status reporting', () => {
      const result = ExportWireGuard();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify status reporting
      expect(scriptContent).toContain('WireGuard Export Summary');
      expect(scriptContent).toContain('Server Address:');
      expect(scriptContent).toContain('DDNS Status:');
      expect(scriptContent).toContain('Export Status:');
      expect(scriptContent).toContain('Server Peers Exported:');
      expect(scriptContent).toContain('Download the .conf files');
    });

    it('should provide troubleshooting guidance', () => {
      const result = ExportWireGuard();
      const scriptCommands = result['/system script'] || [];
      const scriptContent = scriptCommands.join(' ');

      // Verify troubleshooting instructions
      expect(scriptContent).toContain('Troubleshooting:');
      expect(scriptContent).toContain('/ip cloud set ddns-enabled=yes');
      expect(scriptContent).toContain('No WireGuard server interfaces found');
      expect(scriptContent).toContain('interfaces must contain');
    });
  });
}); 