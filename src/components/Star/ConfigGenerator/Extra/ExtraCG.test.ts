import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { 
  services, 
  RouterIdentityRomon, 
  AutoReboot, 
  Update, 
  GameConfig, 
  ExtraConfigState 
} from '../../StarContext/ExtraType';
import { testWithOutput, validateRouterConfig } from '../../../../test-utils/test-helpers';

import {
  IdentityRomon,
  AccessServices,
  Timezone,
  AReboot,
  AUpdate,
  Game,
  // Certificate,
  Clock,
  NTP,
  Graph,
  update,
  UPNP,
  NATPMP,
  Firewall,
  DDNS,
  ExtraCG
} from './ExtraCG';

describe('ExtraCG Module', () => {
  beforeEach(() => {
    // Mock the current date for consistent testing
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-03-15T10:00:00Z'));
  });

  describe('IdentityRomon', () => {
    it('should generate router identity and romon configuration', () => {
      const config: RouterIdentityRomon = {
        RouterIdentity: 'TestRouter',
        isRomon: true
      };

      const result = testWithOutput(
        'IdentityRomon',
        'Generate router identity and romon configuration',
        { config },
        () => IdentityRomon(config)
      );
      
      validateRouterConfig(result, ['/system identity', '/tool romon']);
      expect(result['/system identity']).toContain('set name="TestRouter"');
      expect(result['/tool romon']).toContain('set enabled=yes');
    });

    it('should handle missing identity', () => {
      const config: RouterIdentityRomon = {
        RouterIdentity: '',
        isRomon: false
      };

      const result = testWithOutput(
        'IdentityRomon',
        'Handle missing identity configuration',
        { config },
        () => IdentityRomon(config)
      );
      
      validateRouterConfig(result, ['/system identity', '/tool romon']);
      expect(result['/system identity']).toHaveLength(0);
      expect(result['/tool romon']).toHaveLength(0);
    });
  });

  describe('AccessServices', () => {
    it('should configure access services correctly', () => {
      const services: services = {
        api: 'Disable',
        apissl: 'Local',
        ftp: 'Enable',
        ssh: 'Local',
        telnet: 'Disable',
        winbox: 'Local',
        web: 'Enable',
        webssl: 'Local'
      };

      const result = testWithOutput(
        'AccessServices',
        'Configure access services with mixed settings',
        { services },
        () => AccessServices(services)
      );
      
      validateRouterConfig(result, ['/ip service']);
      expect(result).toHaveProperty('/ip service');
      expect(result['/ip service']).toContain('set api disabled=yes');
      expect(result['/ip service']).toContain('set api-ssl address=192.168.0.0/16,172.16.0.0/12,10.0.0.0/8');
      expect(result['/ip service']).toContain('set ssh address=192.168.0.0/16,172.16.0.0/12,10.0.0.0/8');
      expect(result['/ip service']).toContain('set telnet disabled=yes');
      expect(result['/ip service']).toContain('set winbox address=192.168.0.0/16,172.16.0.0/12,10.0.0.0/8');
      expect(result['/ip service']).toContain('set www-ssl address=192.168.0.0/16,172.16.0.0/12,10.0.0.0/8');
    });
  });

  describe('Timezone', () => {
    it('should set timezone configuration', () => {
      const timezone = 'Asia/Tehran';
      
      const result = testWithOutput(
        'Timezone',
        'Set timezone configuration to Asia/Tehran',
        { timezone },
        () => Timezone(timezone)
      );
      
      validateRouterConfig(result, ['/system clock']);
      expect(result).toHaveProperty('/system clock');
      expect(result['/system clock']).toContain('set time-zone-autodetect=no time-zone-name=Asia/Tehran');
    });
  });

  describe('AReboot', () => {
    it('should configure auto-reboot scheduler', () => {
      const autoReboot: AutoReboot = {
        isAutoReboot: true,
        RebootTime: '03:00'
      };

      const result = testWithOutput(
        'AReboot',
        'Configure auto-reboot scheduler for 03:00',
        { autoReboot },
        () => AReboot(autoReboot)
      );
      
      validateRouterConfig(result, ['/system scheduler']);
      expect(result).toHaveProperty('/system scheduler');
      expect(result['/system scheduler'][0]).toContain('name=reboot-03:00');
      expect(result['/system scheduler'][0]).toContain('start-time=03:00:00');
      expect(result['/system scheduler'][0]).toContain('/system reboot');
    });
  });

  describe('AUpdate', () => {
    it('should configure auto-update scheduler - daily', () => {
      const update: Update = {
        isAutoReboot: true,
        UpdateTime: '02:00',
        UpdateInterval: 'Daily'
      };

      const result = testWithOutput(
        'AUpdate',
        'Configure auto-update scheduler for daily interval',
        { update },
        () => AUpdate(update)
      );
      
      validateRouterConfig(result, ['/system scheduler']);
      expect(result['/system scheduler'][0]).toContain('interval=1d');
      expect(result['/system scheduler'][0]).toContain('start-time=02:00:00');
      expect(result['/system scheduler'][0]).toContain('check-for-updates');
    });

    it('should configure auto-update scheduler - weekly', () => {
      const update: Update = {
        isAutoReboot: true,
        UpdateTime: '01:30',
        UpdateInterval: 'Weekly'
      };

      const result = testWithOutput(
        'AUpdate',
        'Configure auto-update scheduler for weekly interval',
        { update },
        () => AUpdate(update)
      );
      
      validateRouterConfig(result, ['/system scheduler']);
      expect(result['/system scheduler'][0]).toContain('interval=1w');
    });

    it('should configure auto-update scheduler - monthly', () => {
      const update: Update = {
        isAutoReboot: true,
        UpdateTime: '04:00',
        UpdateInterval: 'Monthly'
      };

      const result = testWithOutput(
        'AUpdate',
        'Configure auto-update scheduler for monthly interval',
        { update },
        () => AUpdate(update)
      );
      
      validateRouterConfig(result, ['/system scheduler']);
      expect(result['/system scheduler'][0]).toContain('interval=30d');
    });
  });

  describe('Game', () => {
    it('should configure game traffic splitting with DomesticLink enabled', () => {
      const games: GameConfig[] = [
        {
          name: 'Steam',
          link: 'foreign',
          ports: {
            tcp: ['27015', '27036'],
            udp: ['27015']
          }
        },
        {
          name: 'Fortnite',
          link: 'vpn',
          ports: {
            tcp: ['443', '80'],
            udp: ['3478-3479']
          }
        },
        {
          name: 'PUBG',
          link: 'domestic',
          ports: {
            tcp: ['5222'],
            udp: ['12070-12460']
          }
        }
      ];

      const result = testWithOutput(
        'Game',
        'Configure game traffic splitting with Steam, Fortnite and PUBG with DomesticLink enabled',
        { games, DomesticLink: true },
        () => Game(games, true)
      );
      
      validateRouterConfig(result, ['/ip firewall raw', '/ip firewall mangle']);
      
      // Check for mangle rules including DOM traffic when DomesticLink is true
      expect(result['/ip firewall mangle']).toContain(
        expect.stringContaining('Split-Game-FRN')
      );
      expect(result['/ip firewall mangle']).toContain(
        expect.stringContaining('Split-Game-DOM')
      );
      expect(result['/ip firewall mangle']).toContain(
        expect.stringContaining('Split-Game-VPN')
      );
      
      // Check for Steam foreign traffic
      expect(result['/ip firewall raw']).toContain(
        'add action=add-dst-to-address-list address-list="FRN-IP-Games" address-list-timeout=1d chain=prerouting comment="Steam" dst-address-list=!LOCAL-IP dst-port=27015,27036 protocol=tcp'
      );
      
      // Check for Fortnite VPN traffic
      expect(result['/ip firewall raw']).toContain(
        'add action=add-dst-to-address-list address-list="VPN-IP-Games" address-list-timeout=1d chain=prerouting comment="Fortnite" dst-address-list=!LOCAL-IP dst-port=443,80 protocol=tcp'
      );

      // Check for PUBG domestic traffic
      expect(result['/ip firewall raw']).toContain(
        'add action=add-dst-to-address-list address-list="DOM-IP-Games" address-list-timeout=1d chain=prerouting comment="PUBG" dst-address-list=!LOCAL-IP dst-port=5222 protocol=tcp'
      );
    });

    it('should configure game traffic splitting with DomesticLink disabled', () => {
      const games: GameConfig[] = [
        {
          name: 'Steam',
          link: 'foreign',
          ports: {
            tcp: ['27015', '27036'],
            udp: ['27015']
          }
        },
        {
          name: 'Fortnite',
          link: 'vpn',
          ports: {
            tcp: ['443', '80'],
            udp: ['3478-3479']
          }
        }
      ];

      const result = testWithOutput(
        'Game',
        'Configure game traffic splitting with Steam and Fortnite with DomesticLink disabled',
        { games, DomesticLink: false },
        () => Game(games, false)
      );
      
      validateRouterConfig(result, ['/ip firewall raw', '/ip firewall mangle']);
      
      // Check for mangle rules excluding DOM traffic when DomesticLink is false
      expect(result['/ip firewall mangle']).toContain(
        expect.stringContaining('Split-Game-FRN')
      );
      expect(result['/ip firewall mangle']).not.toContain(
        expect.stringContaining('Split-Game-DOM')
      );
      expect(result['/ip firewall mangle']).toContain(
        expect.stringContaining('Split-Game-VPN')
      );
      
      // Check for Steam foreign traffic
      expect(result['/ip firewall raw']).toContain(
        'add action=add-dst-to-address-list address-list="FRN-IP-Games" address-list-timeout=1d chain=prerouting comment="Steam" dst-address-list=!LOCAL-IP dst-port=27015,27036 protocol=tcp'
      );
      
      // Check for Fortnite VPN traffic
      expect(result['/ip firewall raw']).toContain(
        'add action=add-dst-to-address-list address-list="VPN-IP-Games" address-list-timeout=1d chain=prerouting comment="Fortnite" dst-address-list=!LOCAL-IP dst-port=443,80 protocol=tcp'
      );
    });

    it('should handle empty games array', () => {
      const games: GameConfig[] = [];

      const result = testWithOutput(
        'Game',
        'Handle empty games array with DomesticLink enabled',
        { games, DomesticLink: true },
        () => Game(games, true)
      );
      
      validateRouterConfig(result);
      expect(result['/ip firewall raw']).toHaveLength(0);
      expect(result['/ip firewall mangle']).toHaveLength(0);
    });

    it('should handle empty ports', () => {
      const games: GameConfig[] = [
        {
          name: 'TestGame',
          link: 'domestic',
          ports: {
            tcp: [''],
            udp: []
          }
        }
      ];

      const result = testWithOutput(
        'Game',
        'Handle games with empty ports configuration',
        { games, DomesticLink: true },
        () => Game(games, true)
      );
      
      validateRouterConfig(result);
      expect(result['/ip firewall raw']).toHaveLength(0);
    });
  });

  describe('Certificate', () => {
    // it('should configure certificate download when enabled', () => {
    //   const result = testWithOutput(
    //     'Certificate',
    //     'Configure certificate download when enabled',
    //     { enabled: true },
    //     () => Certificate(true)
    //   );
      
    //   validateRouterConfig(result, ['/system script', '/system scheduler']);
    //   expect(result['/system script']).toHaveLength(1);
    //   expect(result['/system scheduler']).toHaveLength(1);
    //   expect(result['/system script'][0]).toContain('Certificate-Script');
    //   expect(result['/system script'][0]).toContain('DigiCertGlobalRootCA.crt.pem');
    // });

    // it('should return empty config when disabled', () => {
    //   const result = testWithOutput(
    //     'Certificate',
    //     'Return empty config when certificate download disabled',
    //     { enabled: false },
    //     () => Certificate(false)
    //   );
      
    //   validateRouterConfig(result);
    //   expect(result['/system script']).toHaveLength(0);
    //   expect(result['/system scheduler']).toHaveLength(0);
    // });
  });

  describe('Clock', () => {
    it('should set current date', () => {
      const result = testWithOutput(
        'Clock',
        'Set current system date',
        {},
        () => Clock()
      );
      
      validateRouterConfig(result, ['/system clock']);
      expect(result['/system clock']).toHaveLength(1);
      expect(result['/system clock'][0]).toContain('set date=');
    });
  });

  describe('NTP', () => {
    it('should configure NTP client and server', () => {
      const result = testWithOutput(
        'NTP',
        'Configure NTP client and server settings',
        {},
        () => NTP()
      );
      
      validateRouterConfig(result, ['/system ntp client', '/system ntp server', '/system ntp client servers']);
      expect(result['/system ntp client']).toContain('set enabled=yes');
      expect(result['/system ntp server']).toContain('set broadcast=yes enabled=yes manycast=yes multicast=yes');
      expect(result['/system ntp client servers']).toContain('add address=ir.pool.ntp.org');
    });
  });

  describe('Graph', () => {
    it('should configure graphing tools', () => {
      const result = testWithOutput(
        'Graph',
        'Configure graphing tools for monitoring',
        {},
        () => Graph()
      );
      
      validateRouterConfig(result, ['/tool graphing interface', '/tool graphing queue', '/tool graphing resource']);
      expect(result['/tool graphing interface']).toContain('add');
      expect(result['/tool graphing queue']).toContain('add');
      expect(result['/tool graphing resource']).toContain('add');
    });
  });

  describe('update', () => {
    it('should configure update settings', () => {
      const result = testWithOutput(
        'update',
        'Configure system update settings',
        {},
        () => update()
      );
      
      validateRouterConfig(result, ['/system package update', '/system routerboard settings']);
      expect(result['/system package update']).toContain('set channel=stable');
      expect(result['/system routerboard settings']).toContain('set auto-upgrade=yes');
    });
  });

  describe('UPNP', () => {
    it('should enable UPNP', () => {
      const result = testWithOutput(
        'UPNP',
        'Enable UPnP service',
        {},
        () => UPNP()
      );
      
      validateRouterConfig(result, ['/ip upnp']);
      expect(result['/ip upnp']).toContain('set enabled=yes');
    });
  });

  describe('NATPMP', () => {
    it('should enable NAT-PMP', () => {
      const result = testWithOutput(
        'NATPMP',
        'Enable NAT-PMP service',
        {},
        () => NATPMP()
      );
      
      validateRouterConfig(result, ['/ip nat-pmp']);
      expect(result['/ip nat-pmp']).toContain('set enabled=yes');
    });
  });

  describe('Firewall', () => {
    it('should configure DNS blocking firewall rules', () => {
      const result = testWithOutput(
        'Firewall',
        'Configure DNS blocking firewall rules',
        {},
        () => Firewall()
      );
      
      validateRouterConfig(result, ['/ip firewall filter']);
      expect(result['/ip firewall filter']).toContain(
        'add action=drop chain=input dst-port=53 in-interface-list=WAN protocol=udp'
      );
      expect(result['/ip firewall filter']).toContain(
        'add action=drop chain=input dst-port=53 in-interface-list=WAN protocol=tcp'
      );
    });
  });

  describe('DDNS', () => {
    it('should configure dynamic DNS', () => {
      const result = testWithOutput(
        'DDNS',
        'Configure dynamic DNS service',
        {},
        () => DDNS()
      );
      
      validateRouterConfig(result, ['/ip cloud']);
      expect(result['/ip cloud']).toContain('set ddns-enabled=yes ddns-update-interval=1m');
    });
  });

  describe('ExtraCG', () => {
    it('should merge all extra configurations with DomesticLink enabled', () => {
      const extraConfigState: ExtraConfigState = {
        RouterIdentityRomon: {
          RouterIdentity: 'MainRouter',
          isRomon: true
        },
        services: {
          api: 'Local',
          apissl: 'Local',
          ftp: 'Disable',
          ssh: 'Local',
          telnet: 'Disable',
          winbox: 'Local',
          web: 'Enable',
          webssl: 'Local'
        },
        Timezone: 'Asia/Tehran',
        AutoReboot: {
          isAutoReboot: true,
          RebootTime: '03:00'
        },
        Update: {
          isAutoReboot: true,
          UpdateTime: '02:00',
          UpdateInterval: 'Weekly'
        },
        Games: [
          {
            name: 'CS2',
            link: 'foreign',
            ports: {
              tcp: ['27015'],
              udp: ['27015']
            }
          }
        ],
        isCertificate: true
      };

      const result = testWithOutput(
        'ExtraCG',
        'Merge all extra configurations into complete config with DomesticLink enabled',
        { extraConfigState, DomesticLink: true },
        () => ExtraCG(extraConfigState, true)
      );
      
      // Verify it contains configurations from all modules
      validateRouterConfig(result, [
        '/system identity',
        '/ip service', 
        '/system clock',
        '/system scheduler',
        '/ip firewall raw',
        '/system script',
        '/system ntp client',
        '/tool graphing interface',
        '/ip cloud'
      ]);
      
      // Verify specific values
      expect(result['/system identity']).toContain('set name="MainRouter"');
      expect(result['/system clock']).toContain('time-zone-name=Asia/Tehran');
    });

    it('should merge all extra configurations with DomesticLink disabled', () => {
      const extraConfigState: ExtraConfigState = {
        RouterIdentityRomon: {
          RouterIdentity: 'TestRouter',
          isRomon: false
        },
        Games: [
          {
            name: 'Steam',
            link: 'foreign',
            ports: {
              tcp: ['27015'],
              udp: ['27015']
            }
          }
        ],
        isCertificate: false
      };

      const result = testWithOutput(
        'ExtraCG',
        'Merge extra configurations with DomesticLink disabled',
        { extraConfigState, DomesticLink: false },
        () => ExtraCG(extraConfigState, false)
      );
      
      // Verify it contains base configurations and game config without DOM traffic
      validateRouterConfig(result, [
        '/system identity',
        '/system clock',
        '/system ntp client',
        '/tool graphing interface',
        '/ip firewall raw',
        '/ip firewall mangle'
      ]);
      
      // Verify specific values
      expect(result['/system identity']).toContain('set name="TestRouter"');
      
      // Verify DOM traffic rules are not present when DomesticLink is false
      if (result['/ip firewall mangle']) {
        expect(result['/ip firewall mangle']).not.toContain(
          expect.stringContaining('Split-Game-DOM')
        );
      }
    });

    it('should handle empty configuration with DomesticLink enabled', () => {
      const extraConfigState: ExtraConfigState = {};

      const result = testWithOutput(
        'ExtraCG',
        'Handle empty extra configuration with base settings only and DomesticLink enabled',
        { extraConfigState, DomesticLink: true },
        () => ExtraCG(extraConfigState, true)
      );
      
      // Should still have base configurations (Clock, NTP, Graph, etc.)
      validateRouterConfig(result, ['/system clock', '/system ntp client', '/tool graphing interface']);
    });

    it('should handle empty configuration with DomesticLink disabled', () => {
      const extraConfigState: ExtraConfigState = {};

      const result = testWithOutput(
        'ExtraCG',
        'Handle empty extra configuration with base settings only and DomesticLink disabled',
        { extraConfigState, DomesticLink: false },
        () => ExtraCG(extraConfigState, false)
      );
      
      // Should still have base configurations (Clock, NTP, Graph, etc.)
      validateRouterConfig(result, ['/system clock', '/system ntp client', '/tool graphing interface']);
    });
  });
}); 