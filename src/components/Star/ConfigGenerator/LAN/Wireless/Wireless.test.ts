import { describe, it, expect } from 'vitest';
import { 
  WirelessConfig,
  SingleSSID,
  MultiSSID
} from './Wireless';
import { 
  GetNetworks,
  SSIDListGenerator,
  Passphrase,
  StationMode,
  CheckWireless
} from './WirelessUtil';
import type { Wireless, MultiMode, WirelessConfig as WirelessConfigType } from '~/components/Star/StarContext/LANType';
import type { WANLink, WANConfig } from '~/components/Star/StarContext/WANType';

import { testWithOutput, testWithGenericOutput, validateRouterConfig } from '~/test-utils/test-helpers';



describe('Wireless Configuration Tests', () => {

  describe('SingleSSID Function Tests', () => {
    it('should generate single SSID configuration with split band enabled', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'HomeNetwork',
        Password: 'homepass123',
        isHide: false,
        isDisabled: false,
        SplitBand: true
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'SingleSSID',
        'Generate single SSID with split band and domestic link disabled',
        { singleMode, wanLink, domesticLink: false },
        () => SingleSSID(singleMode, wanLink, false)
      );

      const result = SingleSSID(singleMode, wanLink, false);
      validateRouterConfig(result, ['/interface wifi']);
      
      // Should generate interfaces for VPN network (since domesticLink is false)
      const commands = result['/interface wifi'];
      expect(commands.some(cmd => cmd.includes('VPNLAN'))).toBe(true);
      expect(commands.some(cmd => cmd.includes('HomeNetwork 2.4'))).toBe(true);
      expect(commands.some(cmd => cmd.includes('HomeNetwork 5'))).toBe(true);
    });

    it('should generate single SSID configuration with domestic link enabled', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'OfficeNetwork',
        Password: 'office123',
        isHide: true,
        isDisabled: false,
        SplitBand: false
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'SingleSSID',
        'Generate single SSID with domestic link enabled',
        { singleMode, wanLink, domesticLink: true },
        () => SingleSSID(singleMode, wanLink, true)
      );

      const result = SingleSSID(singleMode, wanLink, true);
      validateRouterConfig(result, ['/interface wifi']);
      
      // Should generate interfaces for Split network (since domesticLink is true)
      const commands = result['/interface wifi'];
      expect(commands.some(cmd => cmd.includes('SplitLAN'))).toBe(true);
      expect(commands.some(cmd => cmd.includes('OfficeNetwork'))).toBe(true);
      expect(commands.some(cmd => cmd.includes('configuration.hide-ssid=yes'))).toBe(true);
    });

    it('should handle wifi WAN interfaces correctly in single SSID mode', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'TestWiFi',
        Password: 'testwifi123',
        isHide: false,
        isDisabled: false,
        SplitBand: true
      };

      const wanLink: WANLink = {
        Foreign: { 
          InterfaceName: 'wifi2.4',
          WirelessCredentials: { SSID: 'ExternalAP', Password: 'extpass' }
        }
      };

      testWithOutput(
        'SingleSSID',
        'Handle WiFi WAN interface in single SSID configuration',
        { singleMode, wanLink, domesticLink: false },
        () => SingleSSID(singleMode, wanLink, false)
      );

      const result = SingleSSID(singleMode, wanLink, false);
      validateRouterConfig(result, ['/interface wifi']);
      
      // When wifi2.4 is used as WAN, should create slave interfaces
      const commands = result['/interface wifi'];
      expect(commands.some(cmd => cmd.includes('master-interface'))).toBe(true);
    });

    it('should handle both wifi bands as WAN interfaces', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'DualWiFiTest',
        Password: 'dualtest123',
        isHide: false,
        isDisabled: false,
        SplitBand: false
      };

      const wanLink: WANLink = {
        Foreign: { 
          InterfaceName: 'wifi2.4',
          WirelessCredentials: { SSID: 'AP1', Password: 'pass1' }
        },
        Domestic: { 
          InterfaceName: 'wifi5',
          WirelessCredentials: { SSID: 'AP2', Password: 'pass2' }
        }
      };

      testWithOutput(
        'SingleSSID',
        'Handle both WiFi bands as WAN interfaces',
        { singleMode, wanLink, domesticLink: true },
        () => SingleSSID(singleMode, wanLink, true)
      );

      const result = SingleSSID(singleMode, wanLink, true);
      validateRouterConfig(result, ['/interface wifi']);
      
      // Both bands should create slave interfaces
      const commands = result['/interface wifi'];
      expect(commands.filter(cmd => cmd.includes('master-interface')).length).toBe(2);
    });
  });

  describe('MultiSSID Function Tests', () => {
    it('should generate multi SSID configuration with all network types', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'Foreign-Net',
          Password: 'foreign123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        },
        Domestic: {
          SSID: 'Domestic-Net',
          Password: 'domestic123',
          isHide: true,
          isDisabled: false,
          SplitBand: false
        },
        VPN: {
          SSID: 'VPN-Net',
          Password: 'vpn123',
          isHide: true,
          isDisabled: false,
          SplitBand: true
        },
        Split: {
          SSID: 'Split-Net',
          Password: 'split123',
          isHide: false,
          isDisabled: false,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'MultiSSID',
        'Generate complete multi SSID configuration',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi']);
      
      const commands = result['/interface wifi'].join(' ');
      expect(commands).toContain('Foreign-Net');
      expect(commands).toContain('Domestic-Net');
      expect(commands).toContain('VPN-Net');
      expect(commands).toContain('Split-Net');
      expect(commands).toContain('ForeignLAN');
      expect(commands).toContain('DomesticLAN');
      expect(commands).toContain('VPNLAN');
      expect(commands).toContain('SplitLAN');
    });

    it('should generate multi SSID with partial configuration', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'Corp-WiFi',
          Password: 'corporate123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        },
        VPN: {
          SSID: 'Secure-WiFi',
          Password: 'secure123',
          isHide: true,
          isDisabled: false,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'MultiSSID',
        'Generate multi SSID with only Foreign and VPN networks',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi']);
      
      const commands = result['/interface wifi'].join(' ');
      expect(commands).toContain('Corp-WiFi');
      expect(commands).toContain('Secure-WiFi');
      expect(commands).not.toContain('DomesticLAN');
      expect(commands).not.toContain('SplitLAN');
    });

    it('should handle multi SSID with wifi WAN interfaces', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'Public-WiFi',
          Password: 'public123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        },
        Domestic: {
          SSID: 'Private-WiFi',
          Password: 'private123',
          isHide: true,
          isDisabled: false,
          SplitBand: true
        }
      };

      const wanLink: WANLink = {
        Foreign: { 
          InterfaceName: 'wifi5',
          WirelessCredentials: { SSID: 'UpstreamAP', Password: 'upstream123' }
        },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'MultiSSID',
        'Generate multi SSID with wifi5 as WAN interface',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi']);
      
      // wifi5 is used as WAN, so 5GHz band should use slave interfaces
      const commands = result['/interface wifi'];
      const fiveGHzCommands = commands.filter(cmd => cmd.includes('wifi5-'));
      expect(fiveGHzCommands.some(cmd => cmd.includes('master-interface'))).toBe(true);
    });

    it('should skip disabled network configurations', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'Active-Network',
          Password: 'active123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        },
        Domestic: {
          SSID: 'Disabled-Network',
          Password: 'disabled123',
          isHide: false,
          isDisabled: true,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'MultiSSID',
        'Handle disabled networks in multi SSID mode',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi']);
      
      const commands = result['/interface wifi'].join(' ');
      expect(commands).toContain('Active-Network');
      expect(commands).toContain('Disabled-Network'); // Still configured but marked as disabled
      expect(commands).toContain('disabled=no'); // Active network
    });

    it('should handle empty multi mode configuration', () => {
      const multiMode: MultiMode = {};

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'MultiSSID',
        'Handle empty multi mode configuration',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      // Don't validate sections since empty config is expected
      
      // Should return empty wifi interface array
      expect(result['/interface wifi']).toEqual([]);
      expect(result['/interface bridge port']).toEqual([]);
    });
  });

  describe('Additional SingleSSID Function Tests', () => {
    it('should handle disabled single SSID configuration', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'DisabledNetwork',
        Password: 'disabled123',
        isHide: false,
        isDisabled: true,
        SplitBand: true
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'SingleSSID',
        'Generate single SSID configuration with disabled flag',
        { singleMode, wanLink, domesticLink: false },
        () => SingleSSID(singleMode, wanLink, false)
      );

      const result = SingleSSID(singleMode, wanLink, false);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port', '/interface list member']);
      
      const commands = result['/interface wifi'].join(' ');
      expect(commands).toContain('DisabledNetwork 2.4');
      expect(commands).toContain('DisabledNetwork 5');
      expect(commands).toContain('VPNLAN');
      // Should include bridge ports and interface list members
      expect(result['/interface bridge port']).not.toEqual([]);
      expect(result['/interface list member']).not.toEqual([]);
    });

    it('should generate proper bridge ports and interface list for domestic link', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'BridgeTest',
        Password: 'bridge123',
        isHide: false,
        isDisabled: false,
        SplitBand: false
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'SingleSSID',
        'Verify bridge ports and interface list generation for domestic link',
        { singleMode, wanLink, domesticLink: true },
        () => SingleSSID(singleMode, wanLink, true)
      );

      const result = SingleSSID(singleMode, wanLink, true);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port', '/interface list member']);
      
      // Verify bridge port configuration
      const bridgePorts = result['/interface bridge port'];
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi2.4-SplitLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi5-SplitLAN');
      
      // Verify interface list configuration
      const interfaceList = result['/interface list member'];
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi2.4-SplitLAN') && cmd.includes('Split-LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi5-SplitLAN') && cmd.includes('Split-LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi2.4-SplitLAN') && cmd.includes('LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi5-SplitLAN') && cmd.includes('LAN'))).toBe(true);
    });

    it('should generate proper bridge ports and interface list for non-domestic link', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'VPNTest',
        Password: 'vpn123',
        isHide: true,
        isDisabled: false,
        SplitBand: true
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'SingleSSID',
        'Verify bridge ports and interface list generation for non-domestic link',
        { singleMode, wanLink, domesticLink: false },
        () => SingleSSID(singleMode, wanLink, false)
      );

      const result = SingleSSID(singleMode, wanLink, false);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port', '/interface list member']);
      
      // Verify bridge port configuration for VPN
      const bridgePorts = result['/interface bridge port'];
      expect(bridgePorts).toContain('add bridge=LANBridgeVPN interface=wifi2.4-VPNLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeVPN interface=wifi5-VPNLAN');
      
      // Verify interface list configuration for VPN
      const interfaceList = result['/interface list member'];
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi2.4-VPNLAN') && cmd.includes('VPN-LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi5-VPNLAN') && cmd.includes('VPN-LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi2.4-VPNLAN') && cmd.includes('LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi5-VPNLAN') && cmd.includes('LAN'))).toBe(true);
    });

    it('should handle single SSID with complex password and special characters', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'Complex@SSID_2024!',
        Password: 'C0mpl3x#P@ssw0rd$2024%^&*()',
        isHide: false,
        isDisabled: false,
        SplitBand: true
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'SingleSSID',
        'Handle single SSID with complex password and special characters',
        { singleMode, wanLink, domesticLink: false },
        () => SingleSSID(singleMode, wanLink, false)
      );

      const result = SingleSSID(singleMode, wanLink, false);
      validateRouterConfig(result, ['/interface wifi']);
      
      const commands = result['/interface wifi'].join(' ');
      expect(commands).toContain('.ssid="Complex@SSID_2024! 2.4"');
      expect(commands).toContain('.ssid="Complex@SSID_2024! 5"');
      expect(commands).toContain('.passphrase="C0mpl3x#P@ssw0rd$2024%^&*()"');
    });

    it('should properly configure slave interfaces when wifi WAN is in use', () => {
      const singleMode: WirelessConfigType = {
        SSID: 'SlaveTest',
        Password: 'slave123',
        isHide: false,
        isDisabled: false,
        SplitBand: false
      };

      const wanLink: WANLink = {
        Foreign: { 
          InterfaceName: 'wifi5',
          WirelessCredentials: { SSID: 'UpstreamAP', Password: 'upstream123' }
        }
      };

      testWithOutput(
        'SingleSSID',
        'Configure slave interfaces when wifi5 is used as WAN',
        { singleMode, wanLink, domesticLink: false },
        () => SingleSSID(singleMode, wanLink, false)
      );

      const result = SingleSSID(singleMode, wanLink, false);
      validateRouterConfig(result, ['/interface wifi']);
      
      const commands = result['/interface wifi'];
      // wifi5 is WAN, so 5GHz should be slave interface
      const fiveGHzCommands = commands.filter(cmd => cmd.includes('wifi5-VPNLAN'));
      expect(fiveGHzCommands.some(cmd => cmd.includes('master-interface=[ find default-name=wifi1 ]'))).toBe(true);
      
      // wifi2.4 should be master (not used as WAN)
      const twoFourGHzCommands = commands.filter(cmd => cmd.includes('wifi2.4-VPNLAN'));
      expect(twoFourGHzCommands.some(cmd => cmd.includes('set [ find default-name=wifi2 ]'))).toBe(true);
    });
  });

  describe('Additional MultiSSID Function Tests', () => {
    it('should handle multi SSID with mixed split band configurations', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'Corp-Main',
          Password: 'corp123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        },
        Domestic: {
          SSID: 'Internal-Net',
          Password: 'internal123',
          isHide: true,
          isDisabled: false,
          SplitBand: false
        },
        VPN: {
          SSID: 'Secure-Access',
          Password: 'secure123',
          isHide: true,
          isDisabled: false,
          SplitBand: true
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'MultiSSID',
        'Generate multi SSID with mixed split band configurations',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port', '/interface list member']);
      
      const commands = result['/interface wifi'].join(' ');
      // Split band networks should have band suffixes
      expect(commands).toContain('Corp-Main 2.4');
      expect(commands).toContain('Corp-Main 5');
      expect(commands).toContain('Secure-Access 2.4');
      expect(commands).toContain('Secure-Access 5');
      // Non-split band should not have suffixes
      expect(commands).toContain('Internal-Net');
      expect(commands).not.toContain('Internal-Net 2.4');
      expect(commands).not.toContain('Internal-Net 5');
    });

    it('should generate proper bridge ports for all networks in multi mode', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'Foreign-WiFi',
          Password: 'foreign123',
          isHide: false,
          isDisabled: false,
          SplitBand: false
        },
        Domestic: {
          SSID: 'Domestic-WiFi',
          Password: 'domestic123',
          isHide: false,
          isDisabled: false,
          SplitBand: false
        },
        VPN: {
          SSID: 'VPN-WiFi',
          Password: 'vpn123',
          isHide: false,
          isDisabled: false,
          SplitBand: false
        },
        Split: {
          SSID: 'Split-WiFi',
          Password: 'split123',
          isHide: false,
          isDisabled: false,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'MultiSSID',
        'Verify bridge ports generation for all networks in multi mode',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port', '/interface list member']);
      
      // Verify bridge port configuration for all networks
      const bridgePorts = result['/interface bridge port'];
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi2.4-FRNLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi5-FRNLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi2.4-DOMLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi5-DOMLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi2.4-VPNLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi5-VPNLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi2.4-SplitLAN');
      expect(bridgePorts).toContain('add bridge=LANBridgeSplit interface=wifi5-SplitLAN');
      
      // Should have 8 bridge port commands (4 networks × 2 bands)
      expect(bridgePorts).toHaveLength(8);
    });

    it('should generate proper interface list members for all networks in multi mode', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'Multi-Foreign',
          Password: 'foreign123',
          isHide: false,
          isDisabled: false,
          SplitBand: false
        },
        VPN: {
          SSID: 'Multi-VPN',
          Password: 'vpn123',
          isHide: true,
          isDisabled: false,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'MultiSSID',
        'Verify interface list members generation for multi mode networks',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port', '/interface list member']);
      
      // Verify interface list configuration
      const interfaceList = result['/interface list member'];
      
      // Foreign network interfaces
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi2.4-FRNLAN') && cmd.includes('FRN-LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi5-FRNLAN') && cmd.includes('FRN-LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi2.4-FRNLAN') && cmd.includes('LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi5-FRNLAN') && cmd.includes('LAN'))).toBe(true);
      
      // VPN network interfaces
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi2.4-VPNLAN') && cmd.includes('VPN-LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi5-VPNLAN') && cmd.includes('VPN-LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi2.4-VPNLAN') && cmd.includes('LAN'))).toBe(true);
      expect(interfaceList.some((cmd: string) => cmd.includes('wifi5-VPNLAN') && cmd.includes('LAN'))).toBe(true);
    });

    it('should handle multi SSID with disabled networks correctly', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'Active-Foreign',
          Password: 'foreign123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        },
        Domestic: {
          SSID: 'Disabled-Domestic',
          Password: 'domestic123',
          isHide: false,
          isDisabled: true,
          SplitBand: false
        },
        VPN: {
          SSID: 'Active-VPN',
          Password: 'vpn123',
          isHide: true,
          isDisabled: false,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'MultiSSID',
        'Handle multi SSID with mix of enabled and disabled networks',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port', '/interface list member']);
      
      const commands = result['/interface wifi'].join(' ');
      // All networks should be configured (including disabled ones)
      expect(commands).toContain('Active-Foreign 2.4');
      expect(commands).toContain('Active-Foreign 5');
      expect(commands).toContain('Disabled-Domestic');
      expect(commands).toContain('Active-VPN');
      
      // Should have bridge ports and interface lists for all networks (including disabled)
      const bridgePorts = result['/interface bridge port'];
      expect(bridgePorts.some((cmd: string) => cmd.includes('FRNLAN'))).toBe(true);
      expect(bridgePorts.some((cmd: string) => cmd.includes('DOMLAN'))).toBe(true);
      expect(bridgePorts.some((cmd: string) => cmd.includes('VPNLAN'))).toBe(true);
    });

    it('should handle multi SSID with complex WiFi WAN scenarios', () => {
      const multiMode: MultiMode = {
        Foreign: {
          SSID: 'WAN-Test-Foreign',
          Password: 'foreign123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        },
        Domestic: {
          SSID: 'WAN-Test-Domestic',
          Password: 'domestic123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        }
      };

      const wanLink: WANLink = {
        Foreign: { 
          InterfaceName: 'wifi2.4',
          WirelessCredentials: { SSID: 'ExternalAP', Password: 'external123' }
        },
        Domestic: { 
          InterfaceName: 'wifi5',
          WirelessCredentials: { SSID: 'InternalAP', Password: 'internal123' }
        }
      };

      testWithOutput(
        'MultiSSID',
        'Handle multi SSID with both WiFi bands used as WAN interfaces',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi']);
      
      const commands = result['/interface wifi'];
      // Both bands are used as WAN, so all LAN interfaces should be slave interfaces
      const slaveCommands = commands.filter(cmd => cmd.includes('master-interface'));
      
      // Should have slave interfaces for both networks and both bands (4 total)
      expect(slaveCommands).toHaveLength(4);
      
      // Verify master interface references
      const wifi24Slaves = slaveCommands.filter(cmd => cmd.includes('wifi2.4-'));
      const wifi5Slaves = slaveCommands.filter(cmd => cmd.includes('wifi5-'));
      
      wifi24Slaves.forEach(cmd => {
        expect(cmd).toContain('master-interface=[ find default-name=wifi2 ]');
      });
      
      wifi5Slaves.forEach(cmd => {
        expect(cmd).toContain('master-interface=[ find default-name=wifi1 ]');
      });
    });

    it('should handle single network in multi mode configuration', () => {
      const multiMode: MultiMode = {
        Split: {
          SSID: 'Only-Split',
          Password: 'split123',
          isHide: false,
          isDisabled: false,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'MultiSSID',
        'Handle single network configuration in multi mode',
        { multiMode, wanLink },
        () => MultiSSID(multiMode, wanLink)
      );

      const result = MultiSSID(multiMode, wanLink);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port', '/interface list member']);
      
      const commands = result['/interface wifi'].join(' ');
      expect(commands).toContain('Only-Split');
      expect(commands).toContain('SplitLAN');
      
      // Should only have configurations for Split network
      expect(commands).not.toContain('FRNLAN');
      expect(commands).not.toContain('DOMLAN');
      expect(commands).not.toContain('VPNLAN');
      
      // Bridge ports should only include Split network
      const bridgePorts = result['/interface bridge port'];
      expect(bridgePorts).toHaveLength(2); // Only 2.4GHz and 5GHz for Split
      expect(bridgePorts.every((cmd: string) => cmd.includes('SplitLAN'))).toBe(true);
    });
  });

  describe('Enhanced WirelessConfig Function Tests', () => {
    it('should return DisableInterfaces when wireless configuration is empty', () => {
      const wireless: Wireless = {};
      const wanLink: WANLink = { Foreign: { InterfaceName: 'ether1' } };

      testWithOutput(
        'WirelessConfig',
        'Handle empty wireless configuration by disabling interfaces',
        { wireless, wanLink, domesticLink: false },
        () => WirelessConfig(wireless, wanLink, false)
      );

      const result = WirelessConfig(wireless, wanLink, false);
      validateRouterConfig(result, ['/interface wifi']);
      
      // Should disable both wifi interfaces
      expect(result['/interface wifi']).toContain('set [ find default-name=wifi1 ] disabled=yes');
      expect(result['/interface wifi']).toContain('set [ find default-name=wifi2 ] disabled=yes');
    });

    it('should handle SingleMode configuration with bridge ports', () => {
      const wireless: Wireless = {
        SingleMode: {
          SSID: 'TestSSID',
          Password: 'testpass123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'WirelessConfig',
        'Handle SingleMode with bridge port configuration',
        { wireless, wanLink, domesticLink: true },
        () => WirelessConfig(wireless, wanLink, true)
      );

      const result = WirelessConfig(wireless, wanLink, true);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port']);
      
      // Should have both wifi interfaces and bridge ports
      expect(result['/interface wifi']).not.toEqual([]);
      expect(result['/interface bridge port']).not.toEqual([]);
      expect(result['/interface bridge port'].some(cmd => cmd.includes('LANBridgeSplit'))).toBe(true);
    });

    it('should handle MultiMode configuration with bridge ports', () => {
      const wireless: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'MultiTest-Foreign',
            Password: 'foreign123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          },
          VPN: {
            SSID: 'MultiTest-VPN',
            Password: 'vpn123',
            isHide: true,
            isDisabled: false,
            SplitBand: false
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Handle MultiMode with bridge port configuration',
        { wireless, wanLink, domesticLink: false },
        () => WirelessConfig(wireless, wanLink, false)
      );

      const result = WirelessConfig(wireless, wanLink, false);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port']);
      
      // Should have multi-mode interfaces and bridge ports
      expect(result['/interface wifi']).not.toEqual([]);
      expect(result['/interface bridge port']).not.toEqual([]);
      expect(result['/interface bridge port'].some(cmd => cmd.includes('FRNLAN'))).toBe(true);
      expect(result['/interface bridge port'].some(cmd => cmd.includes('VPNLAN'))).toBe(true);
    });

    it('should handle complex wireless configuration with wifi WAN', () => {
      const wireless: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'Complex-Foreign',
            Password: 'complex123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          },
          Split: {
            SSID: 'Complex-Split',
            Password: 'split123',
            isHide: true,
            isDisabled: false,
            SplitBand: false
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { 
          InterfaceName: 'wifi2.4',
          WirelessCredentials: { SSID: 'UpstreamWiFi', Password: 'upstream123' }
        }
      };

      testWithOutput(
        'WirelessConfig',
        'Handle complex configuration with WiFi WAN interface',
        { wireless, wanLink, domesticLink: false },
        () => WirelessConfig(wireless, wanLink, false)
      );

      const result = WirelessConfig(wireless, wanLink, false);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port']);
      
      // Should handle both AP mode and WAN mode configurations
      const wifiCommands = result['/interface wifi'].join(' ');
      expect(wifiCommands).toContain('Complex-Foreign');
      expect(wifiCommands).toContain('Complex-Split');
      
      // Should have bridge port configurations
      const bridgeCommands = result['/interface bridge port'].join(' ');
      expect(bridgeCommands).toContain('LANBridgeSplit');
    });

    it('should prioritize SingleMode over MultiMode when both are present', () => {
      const wireless: Wireless = {
        SingleMode: {
          SSID: 'SinglePriority',
          Password: 'single123',
          isHide: false,
          isDisabled: false,
          SplitBand: false
        },
        MultiMode: {
          Foreign: {
            SSID: 'MultiIgnored',
            Password: 'multi123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Prioritize SingleMode when both SingleMode and MultiMode are present',
        { wireless, wanLink, domesticLink: false },
        () => WirelessConfig(wireless, wanLink, false)
      );

      const result = WirelessConfig(wireless, wanLink, false);
      validateRouterConfig(result, ['/interface wifi', '/interface bridge port']);
      
      // Should only configure SingleMode
      const wifiCommands = result['/interface wifi'].join(' ');
      expect(wifiCommands).toContain('SinglePriority');
      expect(wifiCommands).not.toContain('MultiIgnored');
    });
  });

  describe('Single Mode Wireless Configuration', () => {
    it('should generate single mode wireless configuration', () => {
      const wirelessConfig: Wireless = {
        SingleMode: {
          SSID: 'TestNetwork',
          Password: 'password123',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Single mode wireless with split band',
        { wirelessConfig, wanLink, domesticLink: false },
        () => WirelessConfig(wirelessConfig, wanLink, false)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, false);
      validateRouterConfig(result);
    });

    it('should generate single mode wireless without split band', () => {
      const wirelessConfig: Wireless = {
        SingleMode: {
          SSID: 'SingleBandNetwork',
          Password: 'singlepass123',
          isHide: true,
          isDisabled: false,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Single mode wireless without split band (hidden)',
        { wirelessConfig, wanLink, domesticLink: false },
        () => WirelessConfig(wirelessConfig, wanLink, false)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, false);
      validateRouterConfig(result);
    });

    it('should handle disabled single mode wireless', () => {
      const wirelessConfig: Wireless = {
        SingleMode: {
          SSID: 'DisabledNetwork',
          Password: 'disabled123',
          isHide: false,
          isDisabled: true,
          SplitBand: true
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Disabled single mode wireless',
        { wirelessConfig, wanLink, domesticLink: false },
        () => WirelessConfig(wirelessConfig, wanLink, false)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, false);
      validateRouterConfig(result);
    });
  });

  describe('Multi Mode Wireless Configuration', () => {
    it('should generate multi mode wireless with all networks', () => {
      const wirelessConfig: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'Foreign-WiFi',
            Password: 'foreign123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          },
          Domestic: {
            SSID: 'Domestic-WiFi',
            Password: 'domestic123',
            isHide: true,
            isDisabled: false,
            SplitBand: false
          },
          VPN: {
            SSID: 'VPN-WiFi',
            Password: 'vpn123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'WirelessConfig',
        'Multi mode wireless with all network types',
        { wirelessConfig, wanLink, domesticLink: true },
        () => WirelessConfig(wirelessConfig, wanLink, true)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, true);
      validateRouterConfig(result);
    });

    it('should generate multi mode wireless with only foreign network', () => {
      const wirelessConfig: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'ForeignOnly-WiFi',
            Password: 'foreignonly123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Multi mode wireless with only foreign network',
        { wirelessConfig, wanLink, domesticLink: false },
        () => WirelessConfig(wirelessConfig, wanLink, false)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, false);
      validateRouterConfig(result);
    });

    it('should generate multi mode wireless with partial disabled networks', () => {
      const wirelessConfig: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'Foreign-Active',
            Password: 'foreign123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          },
          Domestic: {
            SSID: 'Domestic-Disabled',
            Password: 'domestic123',
            isHide: false,
            isDisabled: true,
            SplitBand: false
          },
          VPN: {
            SSID: 'VPN-Hidden',
            Password: 'vpn123',
            isHide: true,
            isDisabled: false,
            SplitBand: true
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'WirelessConfig',
        'Multi mode wireless with mixed enabled/disabled networks',
        { wirelessConfig, wanLink, domesticLink: true },
        () => WirelessConfig(wirelessConfig, wanLink, true)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, true);
      validateRouterConfig(result);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle wireless config with domestic link but no domestic interface', () => {
      const wirelessConfig: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'ForeignWithDomesticFlag',
            Password: 'test123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
        // No Domestic interface defined
      };

      testWithOutput(
        'WirelessConfig',
        'Wireless with domestic link flag but no domestic interface',
        { wirelessConfig, wanLink, domesticLink: true },
        () => WirelessConfig(wirelessConfig, wanLink, true)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, true);
      validateRouterConfig(result);
    });

    it('should handle empty wireless configuration', () => {
      const wirelessConfig: Wireless = {};

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Empty wireless configuration',
        { wirelessConfig, wanLink, domesticLink: false },
        () => WirelessConfig(wirelessConfig, wanLink, false)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, false);
      validateRouterConfig(result);
    });

    it('should handle wireless config with special characters in SSID and password', () => {
      const wirelessConfig: Wireless = {
        SingleMode: {
          SSID: 'Test-Network_2.4GHz@Home!',
          Password: 'P@ssw0rd#123$%^&*()',
          isHide: false,
          isDisabled: false,
          SplitBand: true
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Wireless configuration with special characters',
        { wirelessConfig, wanLink, domesticLink: false },
        () => WirelessConfig(wirelessConfig, wanLink, false)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, false);
      validateRouterConfig(result);
    });

    it('should handle wireless config with very long SSID and password', () => {
      const wirelessConfig: Wireless = {
        SingleMode: {
          SSID: 'VeryLongSSIDNameForTestingPurposesOnly',
          Password: 'VeryLongPasswordForTestingComplexConfigurationHandling123456789',
          isHide: true,
          isDisabled: false,
          SplitBand: false
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Wireless configuration with long SSID and password',
        { wirelessConfig, wanLink, domesticLink: false },
        () => WirelessConfig(wirelessConfig, wanLink, false)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, false);
      validateRouterConfig(result);
    });

    it('should handle multi mode with all networks disabled', () => {
      const wirelessConfig: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'Disabled-Foreign',
            Password: 'disabled123',
            isHide: false,
            isDisabled: true,
            SplitBand: true
          },
          Domestic: {
            SSID: 'Disabled-Domestic',
            Password: 'disabled123',
            isHide: false,
            isDisabled: true,
            SplitBand: false
          },
          VPN: {
            SSID: 'Disabled-VPN',
            Password: 'disabled123',
            isHide: false,
            isDisabled: true,
            SplitBand: true
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'WirelessConfig',
        'Multi mode wireless with all networks disabled',
        { wirelessConfig, wanLink, domesticLink: true },
        () => WirelessConfig(wirelessConfig, wanLink, true)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, true);
      validateRouterConfig(result);
    });
  });

  describe('Advanced Wireless Configuration Scenarios', () => {
    it('should handle complex split band scenarios', () => {
      const wirelessConfig: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'Corp-WiFi',
            Password: 'corporate123',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          },
          VPN: {
            SSID: 'Secure-WiFi',
            Password: 'secure123',
            isHide: true,
            isDisabled: false,
            SplitBand: true
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' }
      };

      testWithOutput(
        'WirelessConfig',
        'Complex wireless configuration with split networks',
        { wirelessConfig, wanLink, domesticLink: false },
        () => WirelessConfig(wirelessConfig, wanLink, false)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, false);
      validateRouterConfig(result);
    });

    it('should generate wireless configuration for enterprise environment', () => {
      const wirelessConfig: Wireless = {
        MultiMode: {
          Foreign: {
            SSID: 'Enterprise-Main',
            Password: 'EnterpriseMain2024!',
            isHide: false,
            isDisabled: false,
            SplitBand: true
          },
          Domestic: {
            SSID: 'Enterprise-Internal',
            Password: 'InternalNet2024!',
            isHide: true,
            isDisabled: false,
            SplitBand: true
          },
          VPN: {
            SSID: 'Enterprise-VPN',
            Password: 'VPNAccess2024!',
            isHide: true,
            isDisabled: false,
            SplitBand: false
          }
        }
      };

      const wanLink: WANLink = {
        Foreign: { InterfaceName: 'ether1' },
        Domestic: { InterfaceName: 'ether2' }
      };

      testWithOutput(
        'WirelessConfig',
        'Enterprise wireless environment configuration',
        { wirelessConfig, wanLink, domesticLink: true },
        () => WirelessConfig(wirelessConfig, wanLink, true)
      );

      const result = WirelessConfig(wirelessConfig, wanLink, true);
      validateRouterConfig(result);
    });
  });

  describe('Additional Comprehensive Function Tests', () => {
    describe('SSIDListGenerator', () => {
      it('should generate same SSID for both bands when SplitBand is false', () => {
        testWithGenericOutput(
          'SSIDListGenerator',
          'Generate identical SSIDs for both bands when split band disabled',
          { SSID: 'TestNetwork', SplitBand: false },
          () => SSIDListGenerator('TestNetwork', false)
        );

        const result = SSIDListGenerator('TestNetwork', false);
        expect(result).toEqual({ '2.4': 'TestNetwork', '5': 'TestNetwork' });
      });

      it('should generate different SSIDs for bands when SplitBand is true', () => {
        testWithGenericOutput(
          'SSIDListGenerator',
          'Generate band-specific SSIDs when split band enabled',
          { SSID: 'MyWiFi', SplitBand: true },
          () => SSIDListGenerator('MyWiFi', true)
        );

        const result = SSIDListGenerator('MyWiFi', true);
        expect(result).toEqual({ '2.4': 'MyWiFi 2.4', '5': 'MyWiFi 5' });
      });

      it('should handle special characters in SSID', () => {
        testWithGenericOutput(
          'SSIDListGenerator',
          'Handle special characters in SSID names',
          { SSID: 'Test-Network_2024@Home!', SplitBand: true },
          () => SSIDListGenerator('Test-Network_2024@Home!', true)
        );

        const result = SSIDListGenerator('Test-Network_2024@Home!', true);
        expect(result).toEqual({ 
          '2.4': 'Test-Network_2024@Home! 2.4', 
          '5': 'Test-Network_2024@Home! 5' 
        });
      });
    });

    describe('Passphrase', () => {
      it('should append WPA2/WPA3 security settings to command', () => {
        testWithGenericOutput(
          'Passphrase',
          'Add WPA2/WPA3 security configuration to command',
          { passphrase: 'MyPassword123', command: 'add configuration.mode=ap' },
          () => Passphrase('MyPassword123', 'add configuration.mode=ap')
        );

        const result = Passphrase('MyPassword123', 'add configuration.mode=ap');
        expect(result).toBe('add configuration.mode=ap security.authentication-types=wpa2-psk,wpa3-psk .passphrase="MyPassword123" disabled=no');
      });

      it('should handle complex passwords with special characters', () => {
        const complexPassword = 'P@ssw0rd#123$%^&*()';
        testWithGenericOutput(
          'Passphrase',
          'Handle complex passwords with special characters',
          { passphrase: complexPassword, command: 'base command' },
          () => Passphrase(complexPassword, 'base command')
        );

        const result = Passphrase(complexPassword, 'base command');
        expect(result).toContain(`.passphrase="${complexPassword}"`);
      });
    });

    describe('StationMode', () => {
      it('should generate proper station mode configuration', () => {
        const wanConfig: WANConfig = {
          InterfaceName: 'wifi2.4',
          WirelessCredentials: { SSID: 'ExternalAP', Password: 'ExternalPass' }
        };

        testWithOutput(
          'StationMode',
          'Generate station mode configuration for connecting to external AP',
          { wanConfig, Link: 'Foreign' },
          () => StationMode(wanConfig, 'Foreign')
        );

        const result = StationMode(wanConfig, 'Foreign');
        const commands = result['/interface wifi'];
        
        expect(commands).toHaveLength(1);
        expect(commands[0]).toContain('comment=ForeignWAN');
        expect(commands[0]).toContain('configuration.mode=station');
        expect(commands[0]).toContain('.ssid="ExternalAP"');
        expect(commands[0]).toContain('security.passphrase="ExternalPass"');
        validateRouterConfig(result, ['/interface wifi']);
      });

      it('should handle domestic link station mode', () => {
        const wanConfig: WANConfig = {
          InterfaceName: 'wifi5',
          WirelessCredentials: { SSID: 'DomesticAP', Password: 'DomesticPass' }
        };

        testWithOutput(
          'StationMode',
          'Generate station mode configuration for domestic link',
          { wanConfig, Link: 'Domestic' },
          () => StationMode(wanConfig, 'Domestic')
        );

        const result = StationMode(wanConfig, 'Domestic');
        const commands = result['/interface wifi'];
        
              expect(commands).toHaveLength(1);
      expect(commands[0]).toContain('[ find default-name=wifi1 ] comment=DomesticWAN');
      expect(commands[0]).toContain('configuration.mode=station');
      expect(commands[0]).toContain('.ssid="DomesticAP"');
      expect(commands[0]).toContain('security.passphrase="DomesticPass"');
      validateRouterConfig(result, ['/interface wifi']);
      });

      it('should return empty config when no wireless credentials provided', () => {
        const wanConfig: WANConfig = { InterfaceName: 'wifi2.4' };

        testWithOutput(
          'StationMode',
          'Handle missing wireless credentials gracefully',
          { wanConfig, Link: 'Foreign' },
          () => StationMode(wanConfig, 'Foreign')
        );

        const result = StationMode(wanConfig, 'Foreign');
        expect(result['/interface wifi']).toEqual([]);
        validateRouterConfig(result);
      });
    });

    describe('GetNetworks', () => {
      it('should return all networks when all are configured', () => {
        const multiMode: MultiMode = {
          Split: { SSID: 'Split', Password: 'pass', isHide: false, isDisabled: false, SplitBand: false },
          Foreign: { SSID: 'Foreign', Password: 'pass', isHide: false, isDisabled: false, SplitBand: false },
          Domestic: { SSID: 'Domestic', Password: 'pass', isHide: false, isDisabled: false, SplitBand: false },
          VPN: { SSID: 'VPN', Password: 'pass', isHide: false, isDisabled: false, SplitBand: false },
        };

        testWithGenericOutput(
          'GetNetworks',
          'Extract all configured network types from MultiMode',
          { multiMode },
          () => GetNetworks(multiMode)
        );

        const result = GetNetworks(multiMode);
        expect(result).toEqual(['Split', 'Foreign', 'Domestic', 'VPN']);
      });

      it('should return subset of networks when only some are configured', () => {
        const multiMode: MultiMode = {
          Foreign: { SSID: 'Foreign', Password: 'pass', isHide: false, isDisabled: false, SplitBand: false },
          VPN: { SSID: 'VPN', Password: 'pass', isHide: false, isDisabled: false, SplitBand: false },
        };

        testWithGenericOutput(
          'GetNetworks',
          'Extract only configured network types from partial MultiMode',
          { multiMode },
          () => GetNetworks(multiMode)
        );

        const result = GetNetworks(multiMode);
        expect(result).toEqual(['Foreign', 'VPN']);
      });

      it('should return empty array for empty multimode', () => {
        const multiMode: MultiMode = {};

        testWithGenericOutput(
          'GetNetworks',
          'Handle empty MultiMode configuration',
          { multiMode },
          () => GetNetworks(multiMode)
        );

        const result = GetNetworks(multiMode);
        expect(result).toEqual([]);
      });
    });

    describe('CheckWireless', () => {
      it('should return true when SingleMode is configured', () => {
        const wireless: Wireless = {
          SingleMode: { SSID: 'Test', Password: 'pass', isHide: false, isDisabled: false, SplitBand: false }
        };

        testWithGenericOutput(
          'CheckWireless',
          'Validate wireless configuration with SingleMode',
          { wireless },
          () => CheckWireless(wireless)
        );

        const result = CheckWireless(wireless);
        expect(result).toBe(true);
      });

      it('should return true when MultiMode is configured', () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: { SSID: 'Test', Password: 'pass', isHide: false, isDisabled: false, SplitBand: false }
          }
        };

        testWithGenericOutput(
          'CheckWireless',
          'Validate wireless configuration with MultiMode',
          { wireless },
          () => CheckWireless(wireless)
        );

        const result = CheckWireless(wireless);
        expect(result).toBe(true);
      });

      it('should return false for empty or undefined wireless config', () => {
        testWithGenericOutput(
          'CheckWireless',
          'Handle empty wireless configuration',
          { wireless: {} },
          () => CheckWireless({})
        );

        expect(CheckWireless({})).toBe(false);
        expect(CheckWireless(undefined as any)).toBe(false);
      });
    });

    describe('WirelessConfig - Comprehensive Integration Tests', () => {
      it('should disable interfaces when no wireless configuration provided', () => {
        const wireless: Wireless = {};
        const wanLink: WANLink = { Foreign: { InterfaceName: 'ether1' } };

        testWithOutput(
          'WirelessConfig',
          'Disable wireless interfaces when no configuration provided',
          { wireless, wanLink, domesticLink: false },
          () => WirelessConfig(wireless, wanLink, false)
        );

        const result = WirelessConfig(wireless, wanLink, false);
        expect(result['/interface wifi']).toContain('set [ find default-name=wifi1 ] disabled=yes');
        expect(result['/interface wifi']).toContain('set [ find default-name=wifi2 ] disabled=yes');
      });

      it('should handle wireless configuration with wifi WAN interfaces', () => {
        const wireless: Wireless = {
          SingleMode: { SSID: 'TestAP', Password: 'testpass', isHide: false, isDisabled: false, SplitBand: true }
        };
        const wanLink: WANLink = { 
          Foreign: { 
            InterfaceName: 'wifi2.4',
            WirelessCredentials: { SSID: 'ExternalAP', Password: 'extpass' }
          } 
        };

        testWithOutput(
          'WirelessConfig',
          'Configure wireless with wifi WAN interface in use',
          { wireless, wanLink, domesticLink: false },
          () => WirelessConfig(wireless, wanLink, false)
        );

        const result = WirelessConfig(wireless, wanLink, false);
        validateRouterConfig(result, ['/interface wifi']);
      });

      it('should handle complex multi-mode configuration with all network types', () => {
        const wireless: Wireless = {
          MultiMode: {
            Foreign: { SSID: 'Corp-WiFi', Password: 'corp123', isHide: false, isDisabled: false, SplitBand: true },
            Domestic: { SSID: 'Internal-WiFi', Password: 'int123', isHide: true, isDisabled: false, SplitBand: false },
            VPN: { SSID: 'Secure-WiFi', Password: 'sec123', isHide: true, isDisabled: false, SplitBand: true },
            Split: { SSID: 'Guest-WiFi', Password: 'guest123', isHide: false, isDisabled: false, SplitBand: false }
          }
        };
        const wanLink: WANLink = { 
          Foreign: { InterfaceName: 'ether1' },
          Domestic: { InterfaceName: 'ether2' }
        };

        testWithOutput(
          'WirelessConfig',
          'Complex multi-mode wireless configuration with all network types',
          { wireless, wanLink, domesticLink: true },
          () => WirelessConfig(wireless, wanLink, true)
        );

        const result = WirelessConfig(wireless, wanLink, true);
        validateRouterConfig(result, ['/interface wifi', '/interface bridge port']);
        
        // Verify all networks are configured
        const wifiCommands = result['/interface wifi'].join(' ');
        expect(wifiCommands).toContain('Corp-WiFi');
        expect(wifiCommands).toContain('Internal-WiFi');
        expect(wifiCommands).toContain('Secure-WiFi');
        expect(wifiCommands).toContain('Guest-WiFi');
      });
    });
  });
});


