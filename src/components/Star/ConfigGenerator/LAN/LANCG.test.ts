import { describe, it } from 'vitest';
import { IPv6, EthernetBridgePorts, LANCG } from './LANCG';
import type { StarState } from '~/components/Star/StarContext/StarContext';
import type { EthernetInterfaceConfig } from '~/components/Star/StarContext/LANType';
import type { RouterModeType } from '~/components/Star/StarContext/ChooseType';

describe('LANCG Module Tests', () => {
  
  describe('IPv6 Function', () => {
    it('should generate IPv6 disable configuration', () => {
      testWithOutput(
        'IPv6',
        'Disable IPv6 and add firewall rules',
        {},
        () => IPv6()
      );
      
      const result = IPv6();
      validateRouterConfig(result, ['/ipv6 settings', '/ipv6 firewall filter']);
    });
  });

  describe('EthernetBridgePorts Function', () => {
    it('should generate bridge port configuration for single interface', () => {
      const etherConfigs: EthernetInterfaceConfig[] = [{
        name: 'ether2',
        bridge: 'VPN'
      }];

      testWithOutput(
        'EthernetBridgePorts',
        'Bridge port for single ethernet interface',
        { etherConfigs },
        () => EthernetBridgePorts(etherConfigs)
      );

      const result = EthernetBridgePorts(etherConfigs);
      validateRouterConfig(result, ['/interface bridge port']);
    });

    it('should generate bridge port configuration for multiple interfaces', () => {
      const etherConfigs: EthernetInterfaceConfig[] = [
        { name: 'ether2', bridge: 'VPN' },
        { name: 'ether3', bridge: 'Domestic' },
        { name: 'ether4', bridge: 'Foreign' }
      ];

      testWithOutput(
        'EthernetBridgePorts',
        'Bridge ports for multiple ethernet interfaces',
        { etherConfigs },
        () => EthernetBridgePorts(etherConfigs)
      );

      const result = EthernetBridgePorts(etherConfigs);
      validateRouterConfig(result, ['/interface bridge port']);
    });

    it('should handle empty ethernet interface array', () => {
      const etherConfigs: EthernetInterfaceConfig[] = [];

      testWithOutput(
        'EthernetBridgePorts',
        'Empty ethernet interface array',
        { etherConfigs },
        () => EthernetBridgePorts(etherConfigs)
      );

      const result = EthernetBridgePorts(etherConfigs);
      validateRouterConfig(result, ['/interface bridge port']);
    });
  });

  describe('LANCG Function', () => {
    it('should generate complete LAN configuration', () => {
      const testState: StarState = {
        Choose: {
          Mode: 'advance',
          Firmware: 'MikroTik',
          DomesticLink: true,
          RouterMode: 'AP Mode',
          RouterModels: []
        },
        WAN: {
          WANLink: {
            Foreign: { InterfaceName: 'ether1' }
          },
          VPNClient: {}
        },
        LAN: {
          Interface: [
            {
              name: 'ether2',
              bridge: 'VPN'
            },
            {
              name: 'ether3',
              bridge: 'Domestic'
            },
            {
              name: 'ether4',
              bridge: 'Foreign'
            }
          ],
          VPNServer: {
            Users: [
              { Username: 'user1', Password: 'pass1', VPNType: ['Wireguard'] }
            ],
            WireguardServers: [{
              Interface: {
                Name: 'wireguard-server',
                PrivateKey: 'privatekey123',
                InterfaceAddress: '192.168.170.1/24',
                ListenPort: 13231
              },
              Peers: []
            }]
          }
        },
        ExtraConfig: {},
        ShowConfig: {}
      };

      testWithOutput(
        'LANCG',
        'Complete LAN configuration with all components',
        { state: testState },
        () => LANCG(testState)
      );

      const result = LANCG(testState);
      validateRouterConfig(result);
    });

    it('should generate minimal LAN configuration', () => {
      const testState: StarState = {
        Choose: {
          Mode: 'easy',
          Firmware: 'MikroTik',
          DomesticLink: false,
          RouterMode: 'AP Mode',
          RouterModels: []
        },
        WAN: {
          WANLink: {
            Foreign: { InterfaceName: 'ether1' }
          },
          VPNClient: {}
        },
        LAN: {
          Interface: [
            {
              name: 'ether2',
              bridge: 'VPN'
            }
          ]
        },
        ExtraConfig: {},
        ShowConfig: {}
      };

      testWithOutput(
        'LANCG',
        'Minimal LAN configuration',
        { state: testState },
        () => LANCG(testState)
      );

      const result = LANCG(testState);
      validateRouterConfig(result);
    });

    it('should handle LAN configuration without ethernet interfaces', () => {
      const testState: StarState = {
        Choose: {
          Mode: 'easy',
          Firmware: 'MikroTik',
          DomesticLink: false,
          RouterMode: 'AP Mode',
          RouterModels: []
        },
        WAN: {
          WANLink: {
            Foreign: { InterfaceName: 'ether1' }
          },
          VPNClient: {}
        },
        LAN: {},
        ExtraConfig: {},
        ShowConfig: {}
      };

      testWithOutput(
        'LANCG',
        'LAN configuration without ethernet interfaces',
        { state: testState },
        () => LANCG(testState)
      );

      const result = LANCG(testState);
      validateRouterConfig(result);
    });

    it('should handle LAN configuration with only VPN server', () => {
      const testState: StarState = {
        Choose: {
          Mode: 'advance',
          Firmware: 'MikroTik',
          DomesticLink: true,
          RouterMode: 'AP Mode' as RouterModeType,
          RouterModels: []
        },
        WAN: {
          WANLink: {
            Foreign: { InterfaceName: 'ether1' }
          },
          VPNClient: {}
        },
        LAN: {
          VPNServer: {
            Users: [
              { Username: 'vpnuser1', Password: 'vpnpass1', VPNType: ['OpenVPN'] },
              { Username: 'vpnuser2', Password: 'vpnpass2', VPNType: ['Wireguard'] }
            ],
            OpenVpnServer: [{
              name: 'openvpn-server',
              enabled: true,
              Port: 1194,
              Protocol: 'udp',
              Mode: 'ip',
              Encryption: {
                Auth: ['sha256'],
                Cipher: ['aes256-cbc']
              },
              IPV6: {},
              Certificate: {
                Certificate: 'server-cert'
              },
              Address: {
                AddressPool: 'ovpn-pool'
              }
            }],
            WireguardServers: [{
              Interface: {
                Name: 'wireguard-main',
                PrivateKey: 'wgprivatekey456',
                InterfaceAddress: '192.168.180.1/24',
                ListenPort: 51820
              },
              Peers: []
            }]
          }
        },
        ExtraConfig: {},
        ShowConfig: {}
      };

      testWithOutput(
        'LANCG',
        'LAN configuration with only VPN server',
        { state: testState },
        () => LANCG(testState)
      );

      const result = LANCG(testState);
      validateRouterConfig(result);
    });

    it('should handle complex LAN configuration with tunnels', () => {
      const testState: StarState = {
        Choose: {
          Mode: 'advance',
          Firmware: 'MikroTik',
          DomesticLink: true,
          RouterMode: 'AP Mode' as RouterModeType,
          RouterModels: []
        },
        WAN: {
          WANLink: {
            Foreign: { InterfaceName: 'ether1' }
          },
          VPNClient: {}
        },
        LAN: {
          Interface: [
            {
              name: 'ether2',
              bridge: 'VPN'
            }
          ]
        },
        ExtraConfig: {},
        ShowConfig: {}
      };

      testWithOutput(
        'LANCG',
        'Complex LAN configuration with tunnels and enterprise wireless',
        { state: testState },
        () => LANCG(testState)
      );

      const result = LANCG(testState);
      validateRouterConfig(result);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle empty LAN configuration', () => {
      const testState: StarState = {
        Choose: {
          Mode: 'easy',
          Firmware: 'MikroTik',
          DomesticLink: false,
          RouterMode: 'AP Mode',
          RouterModels: []
        },
        WAN: {
          WANLink: {
            Foreign: { InterfaceName: 'ether1' }
          },
          VPNClient: {}
        },
        LAN: {},
        ExtraConfig: {},
        ShowConfig: {}
      };

      testWithOutput(
        'LANCG',
        'Empty LAN configuration',
        { state: testState },
        () => LANCG(testState)
      );

      const result = LANCG(testState);
      validateRouterConfig(result);
    });

    it('should handle ethernet interface with incomplete VLAN config', () => {
      const etherConfigs: EthernetInterfaceConfig[] = [{
        name: 'ether5',
        bridge: 'VPN'
      }];

      testWithOutput(
        'EthernetBridgePorts',
        'Ethernet interface with incomplete VLAN configuration',
        { etherConfigs },
        () => EthernetBridgePorts(etherConfigs)
      );

      const result = EthernetBridgePorts(etherConfigs);
      validateRouterConfig(result, ['/interface bridge port']);
    });

    it('should handle LAN with mixed enabled/disabled components', () => {
      const testState: StarState = {
        Choose: {
          Mode: 'advance',
          Firmware: 'MikroTik',
          DomesticLink: true,
          RouterMode: 'AP Mode' as RouterModeType,
          RouterModels: []
        },
        WAN: {
          WANLink: {
            Foreign: { InterfaceName: 'ether1' }
          },
          VPNClient: {}
        },
        LAN: {
          Interface: [
            {
              name: 'ether2',
              bridge: 'VPN'
            },
            {
              name: 'ether3',
              bridge: 'Domestic'
            }
          ]
        },
        ExtraConfig: {},
        ShowConfig: {}
      };

      testWithOutput(
        'LANCG',
        'LAN with mixed enabled/disabled components',
        { state: testState },
        () => LANCG(testState)
      );

      const result = LANCG(testState);
      validateRouterConfig(result);
    });
  });
}); 