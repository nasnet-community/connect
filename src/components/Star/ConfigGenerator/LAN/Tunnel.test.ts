// import { describe, it, expect } from 'vitest';
// import { 
//   IPIPInterface, 
//   EoipInterface, 
//   GreInterface, 
//   VxlanInterface,
//   TunnelWrapper,
//   generateIPAddress,
//   generateInterfaceList,
//   generateAddressList
// } from './TunnelCG';
// import type { 
//   IpipTunnelConfig, 
//   EoipTunnelConfig, 
//   GreTunnelConfig, 
//   VxlanInterfaceConfig,
//   Tunnel
// } from '~/components/Star/StarContext/Utils/TunnelType';
// import type { RouterConfig } from '../ConfigGenerator';

// // Test helper functions
// function testWithOutput(
//   functionName: string,
//   testDescription: string,
//   parameters: any,
//   testFunction: () => RouterConfig
// ): void {
//   console.log(`\n=== ${functionName} - ${testDescription} ===`);
//   console.log('Parameters:', JSON.stringify(parameters, null, 2));
//   const result = testFunction();
//   console.log('Result:', JSON.stringify(result, null, 2));
// }

// function validateRouterConfig(
//   config: RouterConfig,
//   expectedSections?: string[]
// ): void {
//   expect(config).toBeDefined();
//   expect(typeof config).toBe('object');
  
//   if (expectedSections) {
//     for (const section of expectedSections) {
//       expect(config).toHaveProperty(section);
//       expect(Array.isArray(config[section])).toBe(true);
//     }
//   }
// }

// describe('Tunnel Module Tests', () => {
  
//   describe('Utility Functions', () => {
//     it('should generate IP address configuration', () => {
//       testWithOutput(
//         'generateIPAddress',
//         'Basic IP address assignment',
//         { address: '192.168.1.1/24', interfaceName: 'tunnel1', comment: 'Test IP' },
//         () => generateIPAddress('192.168.1.1/24', 'tunnel1', 'Test IP')
//       );

//       const result = generateIPAddress('192.168.1.1/24', 'tunnel1', 'Test IP');
//       validateRouterConfig(result, ['/ip address']);
//     });

//     it('should generate interface list memberships', () => {
//       testWithOutput(
//         'generateInterfaceList',
//         'Multiple interface list memberships',
//         { interfaceName: 'tunnel1', lists: ['LAN', 'TUNNEL', 'VPN'] },
//         () => generateInterfaceList('tunnel1', ['LAN', 'TUNNEL', 'VPN'])
//       );

//       const result = generateInterfaceList('tunnel1', ['LAN', 'TUNNEL', 'VPN']);
//       validateRouterConfig(result, ['/interface list member']);
//     });

//     it('should generate address list entries', () => {
//       testWithOutput(
//         'generateAddressList',
//         'Address list with comment',
//         { address: '192.168.0.0/24', listName: 'LOCAL-NETWORKS', comment: 'Local subnet' },
//         () => generateAddressList('192.168.0.0/24', 'LOCAL-NETWORKS', 'Local subnet')
//       );

//       const result = generateAddressList('192.168.0.0/24', 'LOCAL-NETWORKS', 'Local subnet');
//       validateRouterConfig(result, ['/ip firewall address-list']);
//     });
//   });

//   describe('IPIP Tunnel Configuration', () => {
//     it('should generate basic IPIP tunnel', () => {
//       const ipipConfig: IpipTunnelConfig = {
//         name: 'ipip-tunnel1',
//         type: 'ipip',
//         localAddress: '192.168.1.1',
//         remoteAddress: '203.0.113.1',
//         mtu: 1476,
//         comment: 'IPIP tunnel to HQ'
//       };

//       testWithOutput(
//         'IPIPInterface',
//         'Basic IPIP tunnel configuration',
//         { ipip: ipipConfig },
//         () => IPIPInterface(ipipConfig)
//       );

//       const result = IPIPInterface(ipipConfig);
//       validateRouterConfig(result, ['/interface ipip']);
//     });

//     it('should generate IPIP tunnel with IPsec', () => {
//       const ipipConfig: IpipTunnelConfig = {
//         name: 'ipip-secure',
//         type: 'ipip',
//         localAddress: '192.168.1.1',
//         remoteAddress: '203.0.113.1',
//         ipsecSecret: 'mySecretKey123',
//         keepalive: '10,5',
//         clampTcpMss: true,
//         dscp: 'inherit'
//       };

//       testWithOutput(
//         'IPIPInterface',
//         'IPIP tunnel with IPsec and advanced options',
//         { ipip: ipipConfig },
//         () => IPIPInterface(ipipConfig)
//       );

//       const result = IPIPInterface(ipipConfig);
//       validateRouterConfig(result, ['/interface ipip']);
//     });
//   });

//   describe('EoIP Tunnel Configuration', () => {
//     it('should generate basic EoIP tunnel', () => {
//       const eoipConfig: EoipTunnelConfig = {
//         name: 'eoip-tunnel1',
//         type: 'eoip',
//         localAddress: '192.168.1.1',
//         remoteAddress: '203.0.113.1',
//         tunnelId: 100,
//         comment: 'EoIP L2 extension'
//       };

//       testWithOutput(
//         'EoipInterface',
//         'Basic EoIP tunnel configuration',
//         { eoip: eoipConfig },
//         () => EoipInterface(eoipConfig)
//       );

//       const result = EoipInterface(eoipConfig);
//       validateRouterConfig(result, ['/interface eoip']);
//     });

//     it('should generate EoIP tunnel with advanced options', () => {
//       const eoipConfig: EoipTunnelConfig = {
//         name: 'eoip-advanced',
//         type: 'eoip',
//         localAddress: '192.168.1.1',
//         remoteAddress: '203.0.113.1',
//         tunnelId: 200,
//         macAddress: '02:00:00:00:00:01',
//         arp: 'enabled',
//         loopProtect: 'on',
//         allowFastPath: false,
//         mtu: 1500
//       };

//       testWithOutput(
//         'EoipInterface',
//         'EoIP tunnel with advanced configuration',
//         { eoip: eoipConfig },
//         () => EoipInterface(eoipConfig)
//       );

//       const result = EoipInterface(eoipConfig);
//       validateRouterConfig(result, ['/interface eoip']);
//     });
//   });

//   describe('GRE Tunnel Configuration', () => {
//     it('should generate basic GRE tunnel', () => {
//       const greConfig: GreTunnelConfig = {
//         name: 'gre-tunnel1',
//         type: 'gre',
//         localAddress: '192.168.1.1',
//         remoteAddress: '203.0.113.1',
//         allowFastPath: true,
//         comment: 'GRE tunnel for routing'
//       };

//       testWithOutput(
//         'GreInterface',
//         'Basic GRE tunnel configuration',
//         { gre: greConfig },
//         () => GreInterface(greConfig)
//       );

//       const result = GreInterface(greConfig);
//       validateRouterConfig(result, ['/interface gre']);
//     });

//     it('should generate GRE tunnel with IPsec', () => {
//       const greConfig: GreTunnelConfig = {
//         name: 'gre-secure',
//         type: 'gre',
//         localAddress: '192.168.1.1',
//         remoteAddress: '203.0.113.1',
//         ipsecSecret: 'secureKey456',
//         allowFastPath: true,
//         keepalive: '15,3',
//         clampTcpMss: true
//       };

//       testWithOutput(
//         'GreInterface',
//         'GRE tunnel with IPsec',
//         { gre: greConfig },
//         () => GreInterface(greConfig)
//       );

//       const result = GreInterface(greConfig);
//       validateRouterConfig(result, ['/interface gre']);
//     });
//   });

//   describe('VXLAN Tunnel Configuration', () => {
//     it('should generate VXLAN with unicast BUM mode and explicit VTEPs', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-datacenter',
//         type: 'vxlan',
//         vni: 100,
//         localAddress: '10.0.1.1',
//         remoteAddress: '10.0.1.2',
//         bumMode: 'unicast',
//         port: 4789,
//         vteps: [
//           { remoteAddress: '10.0.1.2', comment: 'Peer datacenter 1' },
//           { remoteAddress: '10.0.1.3', comment: 'Peer datacenter 2' }
//         ],
//         comment: 'VXLAN overlay network'
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'VXLAN with unicast BUM and explicit VTEP peers',
//         { vxlan: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
//       validateRouterConfig(result, ['/interface vxlan', '/interface vxlan vteps']);
//     });

//     it('should automatically create VTEP from remoteAddress when no VTEPs are specified', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-auto-vtep',
//         type: 'vxlan',
//         vni: 200,
//         localAddress: '10.0.1.1',
//         remoteAddress: '10.0.1.2',
//         bumMode: 'unicast',
//         comment: 'VXLAN with automatic VTEP creation'
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'VXLAN with automatic VTEP creation from remoteAddress',
//         { vxlan: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
//       validateRouterConfig(result, ['/interface vxlan', '/interface vxlan vteps']);
      
//       // Verify that a VTEP was automatically created
//       const vtepCommands = result['/interface vxlan vteps'];
//       expect(vtepCommands).toHaveLength(1);
//       expect(vtepCommands[0]).toContain('remote-ip=10.0.1.2');
//       expect(vtepCommands[0]).toContain('comment="Default VTEP for vxlan-auto-vtep"');
//     });

//     it('should throw error for unicast mode without VTEPs or remoteAddress', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-no-vtep',
//         type: 'vxlan',
//         vni: 300,
//         localAddress: '10.0.1.1',
//         remoteAddress: '',
//         bumMode: 'unicast'
//       };

//       expect(() => VxlanInterface(vxlanConfig)).toThrow(
//         'VXLAN vxlan-no-vtep in unicast mode requires at least one VTEP configuration'
//       );
//     });

//     it('should generate VXLAN with multicast BUM mode', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-multicast',
//         type: 'vxlan',
//         vni: 200,
//         localAddress: '10.0.1.1',
//         remoteAddress: '10.0.1.2',
//         bumMode: 'multicast',
//         group: '239.1.1.1',
//         multicastInterface: 'ether1',
//         port: 4789,
//         learning: true,
//         hw: true
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'VXLAN with multicast BUM mode',
//         { vxlan: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
//       validateRouterConfig(result, ['/interface vxlan']);
//     });
//   });

//   describe('Tunnel Processing Functions', () => {
//     it('should process complete tunnel configuration', () => {
//       const tunnel: Tunnel = {
//         IPIP: [{
//           name: 'ipip-test',
//           type: 'ipip',
//           localAddress: '192.168.1.1',
//           remoteAddress: '203.0.113.1'
//         }],
//         Eoip: [{
//           name: 'eoip-test',
//           type: 'eoip',
//           localAddress: '192.168.2.1',
//           remoteAddress: '203.0.113.2',
//           tunnelId: 100
//         }],
//         Gre: [{
//           name: 'gre-test',
//           type: 'gre',
//           localAddress: '192.168.3.1',
//           remoteAddress: '203.0.113.3'
//         }],
//         Vxlan: [{
//           name: 'vxlan-test',
//           type: 'vxlan',
//           vni: 100,
//           localAddress: '10.0.1.1',
//           remoteAddress: '10.0.1.2',
//           bumMode: 'unicast'
//         }]
//       };

//       testWithOutput(
//         'processSingleTunnel',
//         'Complete tunnel configuration with all types',
//         { tunnel: tunnel },
//         () => processSingleTunnel(tunnel)
//       );

//       const result = processSingleTunnel(tunnel);
//       validateRouterConfig(result);
//     });

//     it('should process array of tunnel configurations', () => {
//       const tunnels: Tunnel[] = [
//         {
//           IPIP: [{
//             name: 'ipip-site1',
//             type: 'ipip',
//             localAddress: '192.168.1.1',
//             remoteAddress: '203.0.113.1'
//           }]
//         },
//         {
//           Vxlan: [{
//             name: 'vxlan-overlay1',
//             type: 'vxlan',
//             vni: 100,
//             localAddress: '10.0.1.1',
//             remoteAddress: '10.0.1.2',
//             bumMode: 'unicast',
//             vteps: [
//               { remoteAddress: '10.0.1.2' },
//               { remoteAddress: '10.0.1.3' }
//             ]
//           }]
//         }
//       ];

//       testWithOutput(
//         'TunnelWrapper',
//         'Multiple tunnel objects processing',
//         { tunnels: tunnels },
//         () => TunnelWrapper(tunnels)
//       );

//       const result = TunnelWrapper(tunnels);
//       validateRouterConfig(result);
//     });
//   });
// });

// describe('Tunnel Configuration Tests - RouterOS Compliance', () => {

//   describe('VXLAN Interface Configuration', () => {
//     it('should generate basic VXLAN interface configuration', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-datacenter',
//         type: 'vxlan',
//         vni: 1000,
//         localAddress: '10.0.1.1',
//         remoteAddress: '10.0.1.2', // Not used in interface config
//         bumMode: 'unicast'
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'Basic VXLAN configuration with VNI and local address',
//         { config: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
//       validateRouterConfig(result, ['/interface vxlan', '/interface vxlan vteps']);
//     });

//     it('should generate VXLAN with multicast BUM mode', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-multicast',
//         type: 'vxlan',
//         vni: 2000,
//         localAddress: '192.168.1.10',
//         remoteAddress: '', // Not used
//         bumMode: 'multicast',
//         group: '239.1.1.100',
//         multicastInterface: 'ether1',
//         port: 4789,
//         hw: true,
//         learning: true,
//         comment: 'Multicast VXLAN for datacenter'
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'VXLAN with multicast BUM mode configuration',
//         { config: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
//       validateRouterConfig(result, ['/interface vxlan']);
      
//       // Verify multicast parameters are included
//       const vxlanCommands = result['/interface vxlan'];
//       const command = vxlanCommands[0];
//       console.log('Generated VXLAN command:', command);
      
//       // Should include group and interface parameters for multicast mode
//       expect(command).toContain('group=239.1.1.100');
//       expect(command).toContain('interface=ether1');
//     });

//     it('should generate VXLAN with VTEP peers for unicast mode', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-unicast',
//         type: 'vxlan',
//         vni: 3000,
//         localAddress: '10.10.10.1',
//         remoteAddress: '', // Not used in main interface
//         bumMode: 'unicast',
//         vteps: [
//           { remoteAddress: '10.10.10.2', comment: 'Site A VTEP' },
//           { remoteAddress: '10.10.10.3', comment: 'Site B VTEP' },
//           { remoteAddress: '10.10.10.4', comment: 'Site C VTEP' }
//         ],
//         bridge: 'bridge-overlay',
//         bridgePVID: 100,
//         vtepsIpVersion: 'ipv4'
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'VXLAN with multiple VTEP peers for unicast mode',
//         { config: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
//       validateRouterConfig(result, ['/interface vxlan', '/interface vxlan vteps']);
      
//       // Verify VTEP configuration
//       const vtepCommands = result['/interface vxlan vteps'];
//       expect(vtepCommands).toHaveLength(3);
//       expect(vtepCommands[0]).toContain('interface=vxlan-unicast');
//       expect(vtepCommands[0]).toContain('remote-ip=10.10.10.2');
//       expect(vtepCommands[0]).toContain('comment="Site A VTEP"');
//     });

//     it('should generate advanced VXLAN configuration with all parameters', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-advanced',
//         type: 'vxlan',
//         vni: 4095,
//         localAddress: '172.16.1.1',
//         remoteAddress: '', // Not used
//         bumMode: 'unicast',
//         port: 8472, // Custom port
//         mtu: 1450,
//         disabled: false,
//         comment: 'Advanced VXLAN with custom settings',
//         hw: false, // Disable hardware offloading
//         learning: false, // Disable MAC learning
//         allowFastPath: false,
//         arp: 'enabled',
//         arpTimeout: 300,
//         bridge: 'br-overlay',
//         bridgePVID: 200,
//         checkSum: true,
//         dontFragment: 'enabled',
//         macAddress: '02:00:00:00:10:01',
//         maxFdbSize: 8192,
//         ttl: 64,
//         vrf: 'overlay-vrf',
//         vtepsIpVersion: 'ipv4',
//         vteps: [
//           { remoteAddress: '172.16.1.2', comment: 'Primary VTEP' }
//         ]
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'Advanced VXLAN configuration with all parameters',
//         { config: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
//       validateRouterConfig(result, ['/interface vxlan', '/interface vxlan vteps']);
      
//       // Verify advanced parameters
//       const vxlanCommand = result['/interface vxlan'][0];
//       console.log('Advanced VXLAN command:', vxlanCommand);
      
//       expect(vxlanCommand).toContain('name=vxlan-advanced');
//       expect(vxlanCommand).toContain('vni=4095');
//       expect(vxlanCommand).toContain('local-address=172.16.1.1');
//       expect(vxlanCommand).toContain('port=8472');
//       expect(vxlanCommand).toContain('hw=no');
//       expect(vxlanCommand).toContain('learning=no');
//       expect(vxlanCommand).toContain('bridge=br-overlay');
//       expect(vxlanCommand).toContain('checksum=yes');
//       expect(vxlanCommand).toContain('dont-fragment=enabled');
//       expect(vxlanCommand).toContain('vrf=overlay-vrf');
//     });

//     it('should handle IPv6 VXLAN configuration', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-ipv6',
//         type: 'vxlan',
//         vni: 6000,
//         localAddress: '2001:db8::1',
//         remoteAddress: '', // Not used
//         bumMode: 'unicast',
//         vtepsIpVersion: 'ipv6',
//         vteps: [
//           { remoteAddress: '2001:db8::2', comment: 'IPv6 VTEP peer' }
//         ],
//         comment: 'IPv6 VXLAN overlay network'
//       };

//       testWithOutput(
//         'VxlanInterface',
//         'IPv6 VXLAN configuration',
//         { config: vxlanConfig },
//         () => VxlanInterface(vxlanConfig)
//       );

//       const result = VxlanInterface(vxlanConfig);
      
//       const vxlanCommand = result['/interface vxlan'][0];
//       expect(vxlanCommand).toContain('local-address=2001:db8::1');
//       expect(vxlanCommand).toContain('vteps-ip-version=ipv6');
      
//       const vtepCommand = result['/interface vxlan vteps'][0];
//       expect(vtepCommand).toContain('remote-ip=2001:db8::2');
//     });
//   });

//   describe('Other Tunnel Types', () => {
//     it('should generate IPIP tunnel configuration', () => {
//       const ipipConfig: IpipTunnelConfig = {
//         name: 'ipip-hq',
//         type: 'ipip',
//         localAddress: '192.168.1.1',
//         remoteAddress: '203.0.113.1',
//         ipsecSecret: 'secretkey123',
//         mtu: 1476,
//         keepalive: '10,5',
//         comment: 'Secure IPIP tunnel to headquarters'
//       };

//       testWithOutput(
//         'IPIPInterface',
//         'IPIP tunnel with IPsec configuration',
//         { config: ipipConfig },
//         () => IPIPInterface(ipipConfig)
//       );

//       const result = IPIPInterface(ipipConfig);
//       validateRouterConfig(result, ['/interface ipip']);
      
//       const command = result['/interface ipip'][0];
//       expect(command).toContain('name=ipip-hq');
//       expect(command).toContain('local-address=192.168.1.1');
//       expect(command).toContain('remote-address=203.0.113.1');
//       expect(command).toContain('ipsec-secret="secretkey123"');
//       expect(command).toContain('allow-fast-path=no'); // Should be disabled when IPsec is used
//     });

//     it('should generate EoIP tunnel configuration', () => {
//       const eoipConfig: EoipTunnelConfig = {
//         name: 'eoip-branch',
//         type: 'eoip',
//         localAddress: '192.168.2.1',
//         remoteAddress: '203.0.113.10',
//         tunnelId: 100,
//         comment: 'EoIP bridge to branch office',
//         mtu: 1500,
//         macAddress: '02:00:00:00:01:00'
//       };

//       testWithOutput(
//         'EoipInterface',
//         'EoIP tunnel configuration',
//         { config: eoipConfig },
//         () => EoipInterface(eoipConfig)
//       );

//       const result = EoipInterface(eoipConfig);
//       validateRouterConfig(result, ['/interface eoip']);
      
//       const command = result['/interface eoip'][0];
//       expect(command).toContain('tunnel-id=100');
//       expect(command).toContain('mac-address=02:00:00:00:01:00');
//     });

//     it('should generate GRE tunnel configuration', () => {
//       const greConfig: GreTunnelConfig = {
//         name: 'gre-site1',
//         type: 'gre',
//         localAddress: '10.1.1.1',
//         remoteAddress: '10.2.2.2',
//         comment: 'GRE tunnel for routing',
//         keepalive: '30,3',
//         clampTcpMss: true
//       };

//       testWithOutput(
//         'GreInterface',
//         'GRE tunnel configuration',
//         { config: greConfig },
//         () => GreInterface(greConfig)
//       );

//       const result = GreInterface(greConfig);
//       validateRouterConfig(result, ['/interface gre']);
      
//       const command = result['/interface gre'][0];
//       expect(command).toContain('name=gre-site1');
//       expect(command).toContain('clamp-tcp-mss=yes');
//     });
//   });

//   describe('Complete Tunnel Wrapper', () => {
//     it('should generate multiple tunnel types in one configuration', () => {
//       const tunnels = [
//         {
//           IPIP: [{
//             name: 'ipip-site1',
//             type: 'ipip' as const,
//             localAddress: '192.168.1.1',
//             remoteAddress: '203.0.113.1',
//             comment: 'Site 1 connection'
//           }],
//           Vxlan: [{
//             name: 'vxlan-overlay',
//             type: 'vxlan' as const,
//             vni: 100,
//             localAddress: '10.0.1.1',
//             remoteAddress: '10.0.1.2',
//             bumMode: 'multicast' as const,
//             group: '239.1.1.100',
//             multicastInterface: 'ether1',
//             comment: 'Multicast VXLAN overlay'
//           }]
//         },
//         {
//           Eoip: [{
//             name: 'eoip-branch',
//             type: 'eoip' as const,
//             localAddress: '192.168.2.1',
//             remoteAddress: '203.0.113.10',
//             tunnelId: 100,
//             comment: 'EoIP bridge to branch office'
//           }]
//         }
//       ];

//       testWithOutput(
//         'TunnelWrapper',
//         'Multiple tunnel types configuration',
//         { tunnels },
//         () => TunnelWrapper(tunnels)
//       );

//       const result = TunnelWrapper(tunnels);
//       validateRouterConfig(result);
      
//       // Should contain configurations for all tunnel types
//       expect(result['/interface ipip']).toBeDefined();
//       expect(result['/interface vxlan']).toBeDefined();
//       expect(result['/interface eoip']).toBeDefined();
//     });
//   });

//   describe('RouterOS Syntax Validation', () => {
//     it('should properly escape parameters with special characters', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-test',
//         type: 'vxlan',
//         vni: 1,
//         localAddress: '10.0.0.1',
//         remoteAddress: '',
//         bumMode: 'unicast',
//         comment: 'Test VXLAN with "quotes" and special chars',
//         vteps: [
//           { 
//             remoteAddress: '10.0.0.2', 
//             comment: 'VTEP with "special" characters & symbols' 
//           }
//         ]
//       };

//       const result = VxlanInterface(vxlanConfig);
      
//       // Comments should be properly quoted
//       const vxlanCommand = result['/interface vxlan'][0];
//       expect(vxlanCommand).toContain('comment="Test VXLAN with "quotes" and special chars"');
      
//       const vtepCommand = result['/interface vxlan vteps'][0];
//       expect(vtepCommand).toContain('comment="VTEP with "special" characters & symbols"');
//     });

//     it('should generate valid RouterOS boolean parameters', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-bool-test',
//         type: 'vxlan',
//         vni: 1,
//         localAddress: '10.0.0.1',
//         remoteAddress: '',
//         bumMode: 'unicast',
//         disabled: false,
//         hw: true,
//         learning: false,
//         allowFastPath: true,
//         checkSum: false
//       };

//       const result = VxlanInterface(vxlanConfig);
//       const command = result['/interface vxlan'][0];
      
//       // All boolean values should be 'yes' or 'no'
//       expect(command).toContain('disabled=no');
//       expect(command).toContain('hw=yes');
//       expect(command).toContain('learning=no');
//       expect(command).toContain('allow-fast-path=yes');
//       expect(command).toContain('checksum=no');
//     });
//   });
// });

// describe('VXLAN RouterOS Documentation Compliance Tests', () => {

//   describe('Basic VXLAN Interface Configuration', () => {
//     it('should generate basic VXLAN with VNI and local address', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan1',
//         type: 'vxlan',
//         vni: 10,
//         localAddress: '192.168.1.1',
//         remoteAddress: '192.168.1.2', // Will be used to create automatic VTEP
//         bumMode: 'unicast'
//       };

//       const result = VxlanInterface(vxlanConfig);
      
//       expect(result).toHaveProperty('/interface vxlan');
//       expect(result).toHaveProperty('/interface vxlan vteps');
//       expect(result).not.toHaveProperty('/interface vxlan fdb');
      
//       const vxlanCommand = result['/interface vxlan'][0];
//       expect(vxlanCommand).toContain('name=vxlan1');
//       expect(vxlanCommand).toContain('vni=10');
//       expect(vxlanCommand).toContain('local-address=192.168.1.1');
//       expect(vxlanCommand).not.toContain('remote-address');
      
//       // Verify automatic VTEP creation
//       const vtepCommands = result['/interface vxlan vteps'];
//       expect(vtepCommands).toHaveLength(1);
//       expect(vtepCommands[0]).toContain('remote-ip=192.168.1.2');
//     });

//     it('should generate VXLAN with multicast BUM mode', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-multicast',
//         type: 'vxlan',
//         vni: 100,
//         localAddress: '10.0.1.1',
//         remoteAddress: '',
//         bumMode: 'multicast',
//         group: '239.1.1.1',
//         multicastInterface: 'ether1',
//         port: 4789,
//         learning: true,
//         hw: true
//       };

//       const result = VxlanInterface(vxlanConfig);
      
//       const vxlanCommand = result['/interface vxlan'][0];
//       expect(vxlanCommand).toContain('group=239.1.1.1');
//       expect(vxlanCommand).toContain('interface=ether1');
//       expect(vxlanCommand).toContain('port=4789');
//       expect(vxlanCommand).toContain('learning=yes');
//       expect(vxlanCommand).toContain('hw=yes');
//     });

//     it('should configure VTEP peers correctly', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-datacenter',
//         type: 'vxlan',
//         vni: 1000,
//         localAddress: '192.168.1.1',
//         remoteAddress: '',
//         bumMode: 'unicast',
//         vteps: [
//           { remoteAddress: '192.168.1.2', comment: 'Datacenter 2' },
//           { remoteAddress: '192.168.1.3', comment: 'Datacenter 3' }
//         ]
//       };

//       const result = VxlanInterface(vxlanConfig);
      
//       expect(result['/interface vxlan vteps']).toHaveLength(2);
//       expect(result['/interface vxlan vteps'][0]).toContain('interface=vxlan-datacenter');
//       expect(result['/interface vxlan vteps'][0]).toContain('remote-ip=192.168.1.2');
//       expect(result['/interface vxlan vteps'][0]).toContain('comment="Datacenter 2"');
//       expect(result['/interface vxlan vteps'][1]).toContain('remote-ip=192.168.1.3');
//     });

//     it('should handle advanced VXLAN configuration', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-advanced',
//         type: 'vxlan',
//         vni: 2000,
//         localAddress: '2001:db8::1',
//         remoteAddress: '',
//         bumMode: 'unicast',
//         bridge: 'bridge1',
//         bridgePVID: 10,
//         checkSum: true,
//         dontFragment: 'enabled',
//         macAddress: '02:00:00:00:00:01',
//         maxFdbSize: 8192,
//         ttl: 64,
//         vrf: 'management',
//         vtepsIpVersion: 'ipv6',
//         allowFastPath: false,
//         disabled: false,
//         comment: 'Advanced VXLAN configuration'
//       };

//       const result = VxlanInterface(vxlanConfig);
      
//       const vxlanCommand = result['/interface vxlan'][0];
//       expect(vxlanCommand).toContain('bridge=bridge1');
//       expect(vxlanCommand).toContain('bridge-pvid=10');
//       expect(vxlanCommand).toContain('checksum=yes');
//       expect(vxlanCommand).toContain('dont-fragment=enabled');
//       expect(vxlanCommand).toContain('mac-address=02:00:00:00:00:01');
//       expect(vxlanCommand).toContain('max-fdb-size=8192');
//       expect(vxlanCommand).toContain('ttl=64');
//       expect(vxlanCommand).toContain('vrf=management');
//       expect(vxlanCommand).toContain('vteps-ip-version=ipv6');
//       expect(vxlanCommand).toContain('allow-fast-path=no');
//       expect(vxlanCommand).toContain('disabled=no');
//       expect(vxlanCommand).toContain('comment="Advanced VXLAN configuration"');
//     });

//     it('should support IPv6 VXLAN configuration', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-ipv6',
//         type: 'vxlan',
//         vni: 3000,
//         localAddress: '2001:db8:1::1',
//         remoteAddress: '',
//         bumMode: 'unicast',
//         vtepsIpVersion: 'ipv6',
//         vteps: [
//           { remoteAddress: '2001:db8:1::2', comment: 'IPv6 peer 1' },
//           { remoteAddress: '2001:db8:1::3', comment: 'IPv6 peer 2' }
//         ]
//       };

//       const result = VxlanInterface(vxlanConfig);
      
//       const vxlanCommand = result['/interface vxlan'][0];
//       expect(vxlanCommand).toContain('local-address=2001:db8:1::1');
//       expect(vxlanCommand).toContain('vteps-ip-version=ipv6');
      
//       expect(result['/interface vxlan vteps'][0]).toContain('remote-ip=2001:db8:1::2');
//       expect(result['/interface vxlan vteps'][1]).toContain('remote-ip=2001:db8:1::3');
//     });

//     it('should not generate FDB commands', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-no-fdb',
//         type: 'vxlan',
//         vni: 4000,
//         localAddress: '10.0.1.1',
//         remoteAddress: '10.0.1.2', // Provide remoteAddress to auto-create VTEP
//         bumMode: 'unicast',
//         fdb: [
//           { interface: 'vxlan-no-fdb', remoteAddress: '10.0.1.2', comment: 'Should not generate commands' }
//         ]
//       };

//       const result = VxlanInterface(vxlanConfig);
      
//       // FDB should not be present in the result as it's read-only in RouterOS
//       expect(result).not.toHaveProperty('/interface vxlan fdb');
      
//       // But VTEPs should be present
//       expect(result).toHaveProperty('/interface vxlan vteps');
//     });

//     it('should validate RouterOS boolean syntax', () => {
//       const vxlanConfig: VxlanInterfaceConfig = {
//         name: 'vxlan-booleans',
//         type: 'vxlan',
//         vni: 5000,
//         localAddress: '10.0.1.1',
//         remoteAddress: '10.0.1.2', // Provide remoteAddress to auto-create VTEP
//         bumMode: 'unicast',
//         disabled: true,
//         hw: false,
//         learning: true,
//         allowFastPath: false,
//         checkSum: true
//       };

//       const result = VxlanInterface(vxlanConfig);
      
//       const vxlanCommand = result['/interface vxlan'][0];
//       expect(vxlanCommand).toContain('disabled=yes');
//       expect(vxlanCommand).toContain('hw=no');
//       expect(vxlanCommand).toContain('learning=yes');
//       expect(vxlanCommand).toContain('allow-fast-path=no');
//       expect(vxlanCommand).toContain('checksum=yes');
//     });
//   });

//   describe('VXLAN vs Other Tunnel Types', () => {
//     it('should generate different tunnel types correctly', () => {
//       const tunnel: Tunnel = {
//         IPIP: [{
//           name: 'ipip-test',
//           type: 'ipip',
//           localAddress: '192.168.1.1',
//           remoteAddress: '203.0.113.1'
//         }],
//         Eoip: [{
//           name: 'eoip-test',
//           type: 'eoip',
//           localAddress: '192.168.2.1',
//           remoteAddress: '203.0.113.2',
//           tunnelId: 100
//         }],
//         Gre: [{
//           name: 'gre-test',
//           type: 'gre',
//           localAddress: '192.168.3.1',
//           remoteAddress: '203.0.113.3'
//         }],
//         Vxlan: [{
//           name: 'vxlan-test',
//           type: 'vxlan',
//           vni: 100,
//           localAddress: '10.0.1.1',
//           remoteAddress: '',
//           bumMode: 'unicast'
//         }]
//       };

//       const result = processSingleTunnel(tunnel);
      
//       expect(result).toHaveProperty('/interface ipip');
//       expect(result).toHaveProperty('/interface eoip');
//       expect(result).toHaveProperty('/interface gre');
//       expect(result).toHaveProperty('/interface vxlan');
//       expect(result).toHaveProperty('/interface vxlan vteps');
      
//       // Verify VXLAN doesn't include remote-address in interface config
//       const vxlanCommands = result['/interface vxlan'];
//       expect(vxlanCommands.some(cmd => cmd.includes('remote-address'))).toBe(false);
//     });
//   });
// }); 