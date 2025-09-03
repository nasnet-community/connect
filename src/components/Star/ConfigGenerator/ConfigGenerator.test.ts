// import { describe, it, expect, beforeEach, vi } from 'vitest';
// import type { StarState } from '../StarContext/StarContext';
// import type { ChooseState } from '../StarContext/ChooseType';
// import type { WANState } from '../StarContext/WANType';
// import type { LANState } from '../StarContext/LANType';
// import type { ExtraConfigState } from '../StarContext/ExtraType';
// import type { RouterConfig } from './ConfigGenerator';

// import { ConfigGenerator } from './ConfigGenerator';

// // Mock the utility functions
// vi.mock('./utils/ConfigGeneratorUtil', () => ({
//   mergeMultipleConfigs: vi.fn((config, ...others) => {
//     const merged = { ...config };
//     others.forEach(other => {
//       Object.keys(other).forEach(key => {
//         if (merged[key]) {
//           merged[key] = [...merged[key], ...other[key]];
//         } else {
//           merged[key] = [...other[key]];
//         }
//       });
//     });
//     return merged;
//   }),
//   removeEmptyArrays: vi.fn((config: RouterConfig) => {
//     const filtered: RouterConfig = {};
//     Object.keys(config).forEach(key => {
//       if (config[key].length > 0) {
//         filtered[key] = config[key];
//       }
//     });
//     return filtered;
//   }),
//   formatConfig: vi.fn((config: RouterConfig) => {
//     let output = '';
//     Object.keys(config).forEach(section => {
//       output += `\n${section}\n`;
//       config[section].forEach((command: string) => {
//         output += `${command}\n`;
//       });
//     });
//     return output;
//   }),
//   removeEmptyLines: vi.fn((config: string) => {
//     return config.replace(/\n\s*\n/g, '\n').trim();
//   })
// }));

// // Mock the sub-generators
// vi.mock('./Choose/ChooseCG', () => ({
//   ChooseCG: vi.fn((domesticLink) => ({
//     '/routing table': domesticLink ?
//       ['add name=to-DOM fib', 'add name=to-FRN fib', 'add name=to-VPN fib'] :
//       ['add name=to-FRN fib', 'add name=to-VPN fib'],
//     '/ip firewall address-list': ['add address=192.168.0.0/16 list=LOCAL-IP']
//   }))
// }));

// vi.mock('./WAN/WANCG', () => ({
//   WANCG: vi.fn((wanState, domesticLink) => ({
//     '/interface ethernet': ['set [ find default-name=ether1 ] comment=ForeignWAN'],
//     '/ip dhcp-client': ['add interface=ether1 add-default-route=no'],
//     '/interface list member': ['add interface=ether1 list="WAN"']
//   }))
// }));

// vi.mock('./LAN/LANCG', () => ({
//   LANCG: vi.fn((state) => ({
//     '/interface bridge': ['add name=bridge'],
//     '/interface bridge port': ['add bridge=bridge interface=ether2'],
//     '/ip address': ['add address=192.168.1.1/24 interface=bridge'],
//     '/ip dhcp-server': ['add interface=bridge name=dhcp1']
//   }))
// }));

// vi.mock('./Extra/ExtraCG', () => ({
//   ExtraCG: vi.fn((extraConfig) => ({
//     '/system identity': extraConfig.RouterIdentityRomon ?
//       [`set name="${extraConfig.RouterIdentityRomon.RouterIdentity}"`] : [],
//     '/system clock': [`set date=${new Date().toLocaleDateString()}`],
//     '/system ntp client': ['set enabled=yes']
//   }))
// }));

// describe('ConfigGenerator', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   describe('ConfigGenerator Main Function', () => {
//     it('should generate complete router configuration with all modules', () => {
//       const mockState: StarState = {
//         Choose: {
//           Mode: 'advance',
//           Firmware: 'MikroTik',
//           WANLinkType: "both",
//           RouterMode: 'AP Mode',
//           RouterModels: [{
//             isMaster: true,
//             Model: 'hAP AX2',
//             Interfaces: {
//               ethernet: ['ether1', 'ether2', 'ether3', 'ether4'],
//               wireless: ['wifi2.4', 'wifi5']
//             }
//           }]
//         } as ChooseState,
//         WAN: {
//           WANLink: {
//             Foreign: {
//               InterfaceName: 'ether1',
//               WirelessCredentials: undefined
//             },
//             Domestic: {
//               InterfaceName: 'ether2',
//               WirelessCredentials: undefined
//             }
//           }
//         } as WANState,
//         LAN: {
//           Bridge: {
//             BridgeName: 'bridge',
//             BridgeInterfaces: ['ether3', 'ether4'],
//             BridgeAddress: '192.168.1.1/24'
//           }
//         } as LANState,
//         ExtraConfig: {
//           RouterIdentityRomon: {
//             RouterIdentity: 'TestRouter',
//             isRomon: true
//           },
//           services: {
//             api: 'Local',
//             apissl: 'Local',
//             ftp: 'Disable',
//             ssh: 'Local',
//             telnet: 'Disable',
//             winbox: 'Local',
//             web: 'Enable',
//             webssl: 'Local'
//           },
//           Timezone: 'Asia/Tehran'
//         } as ExtraConfigState,
//         ShowConfig: {}
//       };

//       const result = ConfigGenerator(mockState);

//       console.log('ConfigGenerator (complete) Output:');
//       console.log(result);
//       console.log('---');

//       expect(result).toBeDefined();
//       expect(typeof result).toBe('string');
//       expect(result.length).toBeGreaterThan(0);

//       // Should contain the reboot command at the end
//       expect(result).toContain(':delay 60');
//       expect(result).toContain('/system reboot');

//       // Should contain sections from all modules
//       expect(result).toContain('/routing table');
//       expect(result).toContain('/interface ethernet');
//       expect(result).toContain('/interface bridge');
//       expect(result).toContain('/system identity');
//     });

//     it('should generate configuration without domestic link', () => {
//       const mockState: StarState = {
//         Choose: {
//           Mode: 'easy',
//           Firmware: 'MikroTik',
//           WANLinkType: "foreign-only",
//           RouterMode: 'AP Mode',
//           RouterModels: [{
//             isMaster: true,
//             Model: 'hAP AX2',
//             Interfaces: {
//               ethernet: ['ether1', 'ether2']
//             }
//           }]
//         } as ChooseState,
//         WAN: {
//           WANLink: {
//             Foreign: {
//               InterfaceName: 'ether1',
//               WirelessCredentials: undefined
//             }
//           }
//         } as WANState,
//         LAN: {
//           Bridge: {
//             BridgeName: 'bridge',
//             BridgeInterfaces: ['ether2'],
//             BridgeAddress: '192.168.1.1/24'
//           }
//         } as LANState,
//         ExtraConfig: {
//           RouterIdentityRomon: {
//             RouterIdentity: 'SimpleRouter',
//             isRomon: false
//           }
//         } as ExtraConfigState,
//         ShowConfig: {}
//       };

//       const result = ConfigGenerator(mockState);

//       console.log('ConfigGenerator (no domestic) Output:');
//       console.log(result);
//       console.log('---');

//       expect(result).toBeDefined();
//       expect(typeof result).toBe('string');
//       expect(result.length).toBeGreaterThan(0);

//       // Should still contain the reboot command
//       expect(result).toContain(':delay 60');
//       expect(result).toContain('/system reboot');

//       // Should contain basic sections
//       expect(result).toContain('/routing table');
//       expect(result).toContain('/interface ethernet');
//       expect(result).toContain('/system identity');
//     });

//     it('should generate configuration with VPN client', () => {
//       const mockState: StarState = {
//         Choose: {
//           Mode: 'advance',
//           Firmware: 'MikroTik',
//           WANLinkType: "both",
//           RouterMode: 'AP Mode',
//           RouterModels: [{
//             isMaster: true,
//             Model: 'hAP AX3',
//             Interfaces: {
//               ethernet: ['ether1', 'ether2', 'ether3'],
//               wireless: ['wifi2.4', 'wifi5']
//             }
//           }]
//         } as ChooseState,
//         WAN: {
//           WANLink: {
//             Foreign: {
//               InterfaceName: 'ether1',
//               WirelessCredentials: undefined
//             }
//           },
//           VPNClient: {
//             Wireguard: {
//               InterfacePrivateKey: 'privatekey123',
//               InterfaceAddress: '10.0.0.2/24',
//               PeerPublicKey: 'publickey123',
//               PeerEndpointAddress: '1.2.3.4',
//               PeerEndpointPort: 51820,
//               PeerAllowedIPs: '0.0.0.0/0'
//             }
//           }
//         } as WANState,
//         LAN: {
//           Bridge: {
//             BridgeName: 'bridge',
//             BridgeInterfaces: ['ether2', 'ether3'],
//             BridgeAddress: '192.168.1.1/24'
//           }
//         } as LANState,
//         ExtraConfig: {
//           Games: [
//             {
//               name: 'Steam',
//               link: 'foreign',
//               ports: {
//                 tcp: ['27015'],
//                 udp: ['27015']
//               }
//             }
//           ]
//         } as ExtraConfigState,
//         ShowConfig: {}
//       };

//       const result = ConfigGenerator(mockState);

//       console.log('ConfigGenerator (with VPN) Output:');
//       console.log(result);
//       console.log('---');

//       expect(result).toBeDefined();
//       expect(typeof result).toBe('string');
//       expect(result.length).toBeGreaterThan(0);

//       // Should contain VPN-related sections
//       expect(result).toContain('/interface ethernet');
//       expect(result).toContain('/routing table');
//     });

//     it('should generate minimal configuration', () => {
//       const mockState: StarState = {
//         Choose: {
//           Mode: 'easy',
//           Firmware: 'MikroTik',
//           WANLinkType: "foreign-only",
//           RouterMode: 'Trunk Mode',
//           RouterModels: [{
//             isMaster: true,
//             Model: 'RB5009',
//             Interfaces: {
//               ethernet: ['ether1']
//             }
//           }]
//         } as ChooseState,
//         WAN: {
//           WANLink: {
//             Foreign: {
//               InterfaceName: 'ether1',
//               WirelessCredentials: undefined
//             }
//           }
//         } as WANState,
//         LAN: {} as LANState,
//         ExtraConfig: {} as ExtraConfigState,
//         ShowConfig: {}
//       };

//       const result = ConfigGenerator(mockState);

//       console.log('ConfigGenerator (minimal) Output:');
//       console.log(result);
//       console.log('---');

//       expect(result).toBeDefined();
//       expect(typeof result).toBe('string');
//       expect(result.length).toBeGreaterThan(0);

//       // Should still have basic structure and reboot
//       expect(result).toContain(':delay 60');
//       expect(result).toContain('/system reboot');
//     });

//     it('should generate configuration with wireless WAN', () => {
//       const mockState: StarState = {
//         Choose: {
//           Mode: 'easy',
//           Firmware: 'MikroTik',
//           WANLinkType: "foreign-only",
//           RouterMode: 'AP Mode',
//           RouterModels: [{
//             isMaster: true,
//             Model: 'hAP AX3',
//             Interfaces: {
//               ethernet: ['ether1', 'ether2'],
//               wireless: ['wifi2.4', 'wifi5']
//             }
//           }]
//         } as ChooseState,
//         WAN: {
//           WANLink: {
//             Foreign: {
//               InterfaceName: 'wifi2.4',
//               WirelessCredentials: {
//                 SSID: 'PublicWiFi',
//                 Password: 'publicpass123'
//               }
//             }
//           }
//         } as WANState,
//         LAN: {
//           Wireless: {
//             Networks: [
//               {
//                 SSID: 'MyHomeNetwork',
//                 Password: 'homepass456',
//                 Interface: 'wifi5',
//                 Band: '5GHz',
//                 Security: 'WPA2'
//               }
//             ]
//           }
//         } as LANState,
//         ExtraConfig: {
//           RouterIdentityRomon: {
//             RouterIdentity: 'WirelessRouter',
//             isRomon: true
//           },
//           isCertificate: true,
//           isNTP: true,
//           isDDNS: true
//         } as ExtraConfigState,
//         ShowConfig: {}
//       };

//       const result = ConfigGenerator(mockState);

//       console.log('ConfigGenerator (wireless) Output:');
//       console.log(result);
//       console.log('---');

//       expect(result).toBeDefined();
//       expect(typeof result).toBe('string');
//       expect(result.length).toBeGreaterThan(0);

//       // Should contain wireless-related configurations
//       expect(result).toContain('/interface ethernet');
//       expect(result).toContain('/system identity');
//     });

//     it('should handle configuration generation errors gracefully', () => {
//       // Mock an error in one of the sub-generators
//       const { ChooseCG } = require('./Choose/ChooseCG');
//       ChooseCG.mockImplementation(() => {
//         throw new Error('Test error in ChooseCG');
//       });

//       const mockState: StarState = {
//         Choose: {
//           Mode: 'advance',
//           Firmware: 'MikroTik',
//           WANLinkType: "both",
//           RouterMode: 'AP Mode',
//           RouterModels: [{
//             isMaster: true,
//             Model: 'hAP AX3',
//             Interfaces: {
//               ethernet: ['ether1']
//             }
//           }]
//         } as ChooseState,
//         WAN: {
//           WANLink: {
//             Foreign: {
//               InterfaceName: 'ether1',
//               WirelessCredentials: undefined
//             }
//           }
//         } as WANState,
//         LAN: {} as LANState,
//         ExtraConfig: {} as ExtraConfigState,
//         ShowConfig: {}
//       };

//       const result = ConfigGenerator(mockState);

//       console.log('ConfigGenerator (error handling) Output:');
//       console.log(result);
//       console.log('---');

//       // Should return empty string on error
//       expect(result).toBe('');
//     });

//     it('should properly format and clean configuration output', () => {
//       const mockState: StarState = {
//         Choose: {
//           Mode: 'advance',
//           Firmware: 'MikroTik',
//           WANLinkType: "both",
//           RouterMode: 'AP Mode',
//           RouterModels: [{
//             isMaster: true,
//             Model: 'RB5009',
//             Interfaces: {
//               ethernet: ['ether1', 'ether2', 'ether3', 'ether4', 'ether5'],
//               sfp: ['sfp-sfpplus1']
//             }
//           }]
//         } as ChooseState,
//         WAN: {
//           WANLink: {
//             Foreign: {
//               InterfaceName: 'ether1',
//               WirelessCredentials: undefined
//             },
//             Domestic: {
//               InterfaceName: 'ether2',
//               WirelessCredentials: undefined
//             }
//           }
//         } as WANState,
//         LAN: {
//           Bridge: {
//             BridgeName: 'bridge',
//             BridgeInterfaces: ['ether3', 'ether4', 'ether5'],
//             BridgeAddress: '192.168.1.1/24'
//           }
//         } as LANState,
//         ExtraConfig: {
//           RouterIdentityRomon: {
//             RouterIdentity: 'AdvancedRouter',
//             isRomon: true
//           },
//           services: {
//             api: 'Local',
//             apissl: 'Local',
//             ftp: 'Disable',
//             ssh: 'Local',
//             telnet: 'Disable',
//             winbox: 'Local',
//             web: 'Local',
//             webssl: 'Local'
//           },
//           Timezone: 'Europe/London',
//           AutoReboot: {
//             isAutoReboot: true,
//             RebootTime: '04:00'
//           },
//           isCertificate: true,
//           isNTP: true,
//           isDDNS: true
//         } as ExtraConfigState,
//         ShowConfig: {}
//       };

//       const result = ConfigGenerator(mockState);

//       console.log('ConfigGenerator (formatted) Output:');
//       console.log(result);
//       console.log('---');

//       expect(result).toBeDefined();
//       expect(typeof result).toBe('string');
//       expect(result.length).toBeGreaterThan(0);

//       // Should end with reboot sequence
//       expect(result).toMatch(/:delay 60\s*\/system reboot$/);

//       // Should not have excessive empty lines
//       expect(result).not.toMatch(/\n\s*\n\s*\n/);

//       // Should contain properly formatted sections
//       expect(result).toContain('/routing table');
//       expect(result).toContain('/interface ethernet');
//       expect(result).toContain('/system identity');
//     });

//     it('should call all sub-generators with correct parameters', () => {
//       const { ChooseCG } = require('./Choose/ChooseCG');
//       const { WANCG } = require('./WAN/WANCG');
//       const { LANCG } = require('./LAN/LANCG');
//       const { ExtraCG } = require('./Extra/ExtraCG');

//       const mockState: StarState = {
//         Choose: {
//           Mode: 'advance',
//           Firmware: 'MikroTik',
//           WANLinkType: "both",
//           RouterMode: 'AP Mode',
//           RouterModels: [{
//             isMaster: true,
//             Model: 'hAP AX3',
//             Interfaces: {
//               ethernet: ['ether1']
//             }
//           }]
//         } as ChooseState,
//         WAN: {
//           WANLink: {
//             Foreign: {
//               InterfaceName: 'ether1',
//               WirelessCredentials: undefined
//             }
//           }
//         } as WANState,
//         LAN: {} as LANState,
//         ExtraConfig: {} as ExtraConfigState,
//         ShowConfig: {}
//       };

//       ConfigGenerator(mockState);

//       console.log('ConfigGenerator (sub-generator calls) - verifying function calls');

//       // Verify all sub-generators were called with correct parameters
//       expect(ChooseCG).toHaveBeenCalledWith(true); // DomesticLink
//       expect(WANCG).toHaveBeenCalledWith(mockState.WAN, true); // WAN state and DomesticLink
//       expect(LANCG).toHaveBeenCalledWith(mockState); // Full state
//       expect(ExtraCG).toHaveBeenCalledWith(mockState.ExtraConfig); // ExtraConfig state
//     });
//   });
// });
// sssas
