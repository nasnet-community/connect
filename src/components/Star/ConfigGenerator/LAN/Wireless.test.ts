import { describe, it } from 'vitest';
import { WirelessConfig } from './Wireless';
import type { Wireless } from '~/components/Star/StarContext/LANType';
import type { WANLink } from '~/components/Star/StarContext/WANType';

describe('Wireless Configuration Tests', () => {

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
}); 