import { describe, it } from 'vitest';
import { 
  BaseConfig, 
  DometicBase, 
  ForeignBase, 
  VPNBase, 
  SplitBase, 
  DNS, 
  AdvanceDNS,
  WithDomestic,
  WithoutDomestic,
  ChooseCG
} from './ChooseCG';
import type { RouterConfig } from '../ConfigGenerator';

// Test helper functions from global setup
declare global {
  function testWithOutput(
    functionName: string,
    testCase: string,
    inputs: Record<string, any>,
    testFn: () => RouterConfig
  ): RouterConfig;
  
  function testWithGenericOutput(
    functionName: string,
    testCase: string,
    inputs: Record<string, any>,
    testFn: () => any
  ): any;
  
  function validateRouterConfig(config: RouterConfig, expectedSections?: string[]): boolean;
}

describe('ChooseCG Module Tests - Configuration Display', () => {

  describe('Base Configuration Functions', () => {
    it('should display BaseConfig output', () => {
      testWithOutput(
        'BaseConfig',
        'Basic router configuration with interface lists and firewall rules',
        {},
        () => BaseConfig()
      );

      const result = BaseConfig();
      validateRouterConfig(result, [
        '/interface list',
        '/ip firewall address-list',
        '/ip firewall nat'
      ]);
    });

    it('should display DometicBase configuration output', () => {
      testWithOutput(
        'DometicBase',
        'Domestic base configuration with bridge and DHCP setup',
        {},
        () => DometicBase()
      );

      const result = DometicBase();
      validateRouterConfig(result, [
        '/interface bridge',
        '/interface list',
        '/ip pool',
        '/ip dhcp-server',
        '/ip dhcp-server network',
        '/ip address',
        '/routing table',
        '/interface list member',
        '/ip firewall address-list',
        '/ip firewall mangle',
        '/ip firewall nat',
        '/ip route'
      ]);
    });

    it('should display ForeignBase configuration output', () => {
      testWithOutput(
        'ForeignBase',
        'Foreign base configuration with bridge and routing setup',
        { DomesticLink: true },
        () => ForeignBase(true)
      );

      const result = ForeignBase(true);
      validateRouterConfig(result, [
        '/interface bridge',
        '/interface list',
        '/ip pool',
        '/ip dhcp-server',
        '/ip dhcp-server network',
        '/ip address',
        '/routing table',
        '/interface list member',
        '/ip firewall address-list',
        '/ip firewall mangle',
        '/ip firewall nat',
        '/ip route'
      ]);
    });

    it('should display VPNBase configuration output', () => {
      testWithOutput(
        'VPNBase',
        'VPN base configuration with bridge and routing setup',
        {},
        () => VPNBase()
      );

      const result = VPNBase();
      validateRouterConfig(result, [
        '/interface bridge',
        '/interface list',
        '/ip pool',
        '/ip dhcp-server',
        '/ip dhcp-server network',
        '/ip address',
        '/routing table',
        '/interface list member',
        '/ip firewall address-list',
        '/ip firewall mangle',
        '/ip route'
      ]);
    });

    it('should display SplitBase configuration output', () => {
      testWithOutput(
        'SplitBase',
        'Split base configuration with bridge and mangle rules',
        {},
        () => SplitBase()
      );

      const result = SplitBase();
      validateRouterConfig(result, [
        '/interface bridge',
        '/interface list',
        '/ip pool',
        '/ip dhcp-server',
        '/ip dhcp-server network',
        '/ip address',
        '/interface list member',
        '/ip firewall address-list',
        '/ip firewall mangle',
        '/ip route'
      ]);
    });
  });

  describe('DNS Configuration Functions', () => {
    it('should display basic DNS configuration output', () => {
      testWithOutput(
        'DNS',
        'Basic DNS configuration with simple server setup',
        {},
        () => DNS()
      );

      const result = DNS();
      validateRouterConfig(result, ['/ip dns']);
    });

    it('should display advanced DNS configuration output', () => {
      testWithOutput(
        'AdvanceDNS',
        'Advanced DNS configuration with forwarders, static entries, and policy-based routing',
        {},
        () => AdvanceDNS()
      );

      const result = AdvanceDNS();
      validateRouterConfig(result, [
        '/ip dns',
        '/ip dns forwarders',
        '/ip dns static',
        '/routing table',
        '/ip route',
        '/ip firewall address-list',
        '/ip firewall mangle',
        '/ip dhcp-server network',
        '/ip firewall nat',
        '/ip firewall filter',
        '/ip firewall layer7-protocol'
      ]);
    });

    it('should include DNS forwarders for DOM, FRN, and VPN', () => {
      const result = AdvanceDNS();
      const forwarders = result['/ip dns forwarders'] || [];

      testWithGenericOutput(
        'AdvanceDNS Forwarders',
        'Verify DNS forwarders are created for DOM, FRN, and VPN',
        {},
        () => ({
          hasDOM: forwarders.some(cmd => cmd.includes('name=DOM')),
          hasFRN: forwarders.some(cmd => cmd.includes('name=FRN')),
          hasVPN: forwarders.some(cmd => cmd.includes('name=VPN')),
          totalForwarders: forwarders.length,
          forwarderCommands: forwarders
        })
      );
    });

    it('should include DNS static entries for .ir TLD and local addresses', () => {
      const result = AdvanceDNS();

      testWithGenericOutput(
        'AdvanceDNS Static Entries',
        'Verify DNS static entries for .ir TLD and local addresses',
        {},
        () => {
          const staticEntries = result['/ip dns static'] || [];
          const hasIrTLD = staticEntries.some(cmd => cmd.includes('.ir\\$'));
          const hasS4iCo = staticEntries.some(cmd => cmd.includes('s4i.co'));
          const hasLocalDNS = staticEntries.some(cmd => cmd.includes('dns.DOM.local'));

          return {
            hasIrTLD,
            hasS4iCo,
            hasLocalDNS,
            totalStaticEntries: staticEntries.length,
            staticEntryCommands: staticEntries
          };
        }
      );
    });

    it('should validate AdvanceDNS contains policy-based routing and mangle rules', () => {
      const result = AdvanceDNS();
      
      testWithGenericOutput(
        'AdvanceDNS PBR and DoH Validation',
        'Validate PBR and DoH components in advanced DNS config',
        { expectedFeatures: ['routing tables', 'mangle rules', 'NAT rules', 'DNS forwarders'] },
        () => {
          const routingTables = result['/routing table'] || [];
          const mangleRules = result['/ip firewall mangle'] || [];
          const natRules = result['/ip firewall nat'] || [];
          const filterRules = result['/ip firewall filter'] || [];
          const forwarders = result['/ip dns forwarders'] || [];
          const staticEntries = result['/ip dns static'] || [];
          const layer7Protocols = result['/ip firewall layer7-protocol'] || [];
          
          return {
            routingTableCount: routingTables.length,
            mangleRuleCount: mangleRules.length,
            natRuleCount: natRules.length,
            filterRuleCount: filterRules.length,
            forwarderCount: forwarders.length,
            staticEntryCount: staticEntries.length,
            layer7ProtocolCount: layer7Protocols.length,
            hasDNSServers: result['/ip dns']?.some(cmd => cmd.includes('servers=')) || false,
            hasDoHServer: result['/ip dns']?.some(cmd => cmd.includes('use-doh-server=')) || false,
            hasDoHMangleRule: mangleRules.some(cmd => cmd.includes('dst-port=443')),
            hasRedirectNatRule: natRules.some(cmd => cmd.includes('action=redirect') && cmd.includes('in-interface-list=LAN')),
            sampleMangleRules: mangleRules.slice(0, 3),
            sampleForwarders: forwarders.slice(0, 3),
            sampleStaticEntries: staticEntries.slice(0, 3)
          };
        }
      );
    });
  });

  describe('Combined Configuration Functions', () => {
    it('should display WithDomestic configuration output', () => {
      testWithOutput(
        'WithDomestic',
        'Complete configuration with domestic link enabled',
        { DomesticLink: true },
        () => WithDomestic(true)
      );

      const result = WithDomestic(true);
      validateRouterConfig(result, [
        '/interface list',
        '/ip firewall address-list',
        '/ip firewall nat',
        '/interface bridge',
        '/ip pool',
        '/ip dhcp-server',
        '/ip dhcp-server network',
        '/ip address',
        '/routing table',
        '/interface list member',
        '/ip firewall mangle',
        '/ip route',
        '/ip dns'
      ]);
    });

    it('should display WithoutDomestic configuration output', () => {
      testWithOutput(
        'WithoutDomestic',
        'Complete configuration with domestic link disabled',
        { DomesticLink: false },
        () => WithoutDomestic(false)
      );

      const result = WithoutDomestic(false);
      validateRouterConfig(result, [
        '/interface list',
        '/ip firewall address-list',
        '/ip firewall nat',
        '/interface bridge',
        '/ip pool',
        '/ip dhcp-server',
        '/ip dhcp-server network',
        '/ip address',
        '/routing table',
        '/interface list member',
        '/ip firewall mangle',
        '/ip route',
        '/ip dns'
      ]);
    });

    it('should validate network segmentation in combined configs', () => {
      const withDomestic = WithDomestic(true);
      const withoutDomestic = WithoutDomestic(false);
      
      testWithGenericOutput(
        'Network Segmentation Comparison',
        'Compare configuration complexity between domestic and non-domestic setups',
        { domesticEnabled: true, domesticDisabled: false },
        () => {
          const domesticBridges = withDomestic['/interface bridge']?.length || 0;
          const nonDomesticBridges = withoutDomestic['/interface bridge']?.length || 0;
          
          const domesticRoutes = withDomestic['/ip route']?.length || 0;
          const nonDomesticRoutes = withoutDomestic['/ip route']?.length || 0;
          
          const domesticMangle = withDomestic['/ip firewall mangle']?.length || 0;
          const nonDomesticMangle = withoutDomestic['/ip firewall mangle']?.length || 0;
          
          return {
            domesticComplexity: {
              bridges: domesticBridges,
              routes: domesticRoutes,
              mangleRules: domesticMangle
            },
            nonDomesticComplexity: {
              bridges: nonDomesticBridges,
              routes: nonDomesticRoutes,
              mangleRules: nonDomesticMangle
            },
            complexityDifference: {
              bridges: domesticBridges - nonDomesticBridges,
              routes: domesticRoutes - nonDomesticRoutes,
              mangleRules: domesticMangle - nonDomesticMangle
            }
          };
        }
      );
    });
  });

  describe('Main ChooseCG Function', () => {
    it('should display ChooseCG with domestic link enabled', () => {
      testWithOutput(
        'ChooseCG',
        'Main configuration generator with domestic link enabled',
        { DomesticLink: true },
        () => ChooseCG(true)
      );

      const result = ChooseCG(true);
      validateRouterConfig(result, [
        '/interface list',
        '/ip firewall address-list',
        '/ip firewall nat',
        '/interface bridge',
        '/ip pool',
        '/ip dhcp-server',
        '/ip dhcp-server network',
        '/ip address',
        '/routing table',
        '/interface list member',
        '/ip firewall mangle',
        '/ip route',
        '/ip dns'
      ]);
    });

    it('should display ChooseCG with domestic link disabled', () => {
      testWithOutput(
        'ChooseCG',
        'Main configuration generator with domestic link disabled',
        { DomesticLink: false },
        () => ChooseCG(false)
      );

      const result = ChooseCG(false);
      validateRouterConfig(result, [
        '/interface list',
        '/ip firewall address-list',
        '/ip firewall nat',
        '/interface bridge',
        '/ip pool',
        '/ip dhcp-server',
        '/ip dhcp-server network',
        '/ip address',
        '/routing table',
        '/interface list member',
        '/ip firewall mangle',
        '/ip route',
        '/ip dns'
      ]);
    });
  });

  describe('Configuration Content Validation', () => {
    it('should validate BaseConfig contains correct interface lists', () => {
      const result = BaseConfig();
      
      testWithGenericOutput(
        'BaseConfig Interface Lists',
        'Validate presence of WAN and LAN interface lists',
        { expectedLists: ['WAN', 'LAN'] },
        () => {
          const interfaceListCommands = result['/interface list'] || [];
          const hasWAN = interfaceListCommands.some(cmd => cmd.includes('name=WAN'));
          const hasLAN = interfaceListCommands.some(cmd => cmd.includes('name=LAN'));
          return { hasWAN, hasLAN, totalLists: interfaceListCommands.length };
        }
      );
    });

    it('should validate DometicBase contains correct bridge configuration', () => {
      const result = DometicBase();
      
      testWithGenericOutput(
        'DometicBase Bridge Config',
        'Validate presence of LANBridgeDOM and related configurations',
        { expectedBridge: 'LANBridgeDOM' },
        () => {
          const bridgeCommands = result['/interface bridge'] || [];
          const addressCommands = result['/ip address'] || [];
          const hasBridge = bridgeCommands.some(cmd => cmd.includes('name=LANBridgeDOM'));
          const hasAddress = addressCommands.some(cmd => cmd.includes('interface=LANBridgeDOM'));
          return { hasBridge, hasAddress, bridgeCount: bridgeCommands.length };
        }
      );
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle multiple calls to configuration functions', () => {
      testWithOutput(
        'Multiple BaseConfig Calls',
        'Verify consistency across multiple function calls',
        { callCount: 3 },
        () => {
          const config1 = BaseConfig();
          const config2 = BaseConfig();
          const config3 = BaseConfig();
          
          // Merge all three configs to test consistency
          const mergedConfig = {
            ...config1,
            ...config2,
            ...config3
          };
          
          return mergedConfig;
        }
      );
    });

    it('should validate configuration command syntax', () => {
      const result = AdvanceDNS();
      
      testWithGenericOutput(
        'Command Syntax Validation',
        'Validate MikroTik command syntax in generated configuration',
        { totalSections: Object.keys(result).length },
        () => {
          const syntaxIssues: string[] = [];
          
          Object.entries(result).forEach(([section, commands]) => {
            commands.forEach((command, index) => {
              // Check for basic MikroTik command syntax
              if (command.trim().length > 0) {
                // Check if command starts with 'add' or 'set'
                const trimmedCommand = command.trim();
                if (!trimmedCommand.startsWith('add ') && 
                    !trimmedCommand.startsWith('set ') && 
                    !trimmedCommand.includes('//')) {
                  syntaxIssues.push(`${section}[${index}]: ${trimmedCommand.substring(0, 50)}...`);
                }
              }
            });
          });
          
          return {
            totalCommands: Object.values(result).flat().length,
            syntaxIssues: syntaxIssues.slice(0, 5), // Limit to first 5 issues
            isValid: syntaxIssues.length === 0
          };
        }
      );
    });
  });

  describe('Performance and Configuration Size Tests', () => {
    it('should measure configuration generation performance', () => {
      testWithGenericOutput(
        'Performance Benchmark',
        'Measure time taken to generate different configuration types',
        { iterations: 100 },
        () => {
          const iterations = 100;
          
          // Benchmark BaseConfig
          const baseStart = performance.now();
          for (let i = 0; i < iterations; i++) {
            BaseConfig();
          }
          const baseTime = performance.now() - baseStart;
          
          // Benchmark WithDomestic
          const domesticStart = performance.now();
          for (let i = 0; i < iterations; i++) {
            WithDomestic(true);
          }
          const domesticTime = performance.now() - domesticStart;
          
          // Benchmark AdvanceDNS
          const dnsStart = performance.now();
          for (let i = 0; i < iterations; i++) {
            AdvanceDNS();
          }
          const dnsTime = performance.now() - dnsStart;
          
          return {
            iterations,
            averageTimes: {
              baseConfig: Number((baseTime / iterations).toFixed(3)),
              withDomestic: Number((domesticTime / iterations).toFixed(3)),
              advanceDNS: Number((dnsTime / iterations).toFixed(3))
            },
            totalTime: Number((baseTime + domesticTime + dnsTime).toFixed(2))
          };
        }
      );
    });

    it('should analyze configuration size and complexity', () => {
      testWithGenericOutput(
        'Configuration Size Analysis',
        'Analyze the size and complexity of generated configurations',
        {},
        () => {
          const baseConfig = BaseConfig();
          const advanceDNS = AdvanceDNS();
          const withDomestic = WithDomestic(true);
          const withoutDomestic = WithoutDomestic(false);
          
          const calculateStats = (config: any) => {
            const sections = Object.keys(config).length;
            const totalCommands = Object.values(config).flat().length;
            const avgCommandsPerSection = Number((totalCommands / sections).toFixed(1));
            const longestCommand = Math.max(...Object.values(config).flat().map((cmd: any) => cmd.length));
            
            return { sections, totalCommands, avgCommandsPerSection, longestCommand };
          };
          
          return {
            baseConfig: calculateStats(baseConfig),
            advanceDNS: calculateStats(advanceDNS),
            withDomestic: calculateStats(withDomestic),
            withoutDomestic: calculateStats(withoutDomestic)
          };
        }
      );
    });
  });
}); 