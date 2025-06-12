import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { RouterConfig } from '../ConfigGenerator';
import type { 
  services, 
  RouterIdentityRomon, 
  AutoReboot, 
  Update, 
  GameConfig, 
  ExtraConfigState 
} from '../../StarContext/ExtraType';

import {
  IdentityRomon,
  AccessServices,
  Timezone,
  AReboot,
  AUpdate,
  Game,
  Certificate,
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

      const result = IdentityRomon(config);
      
      console.log('IdentityRomon Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/system identity');
      expect(result).toHaveProperty('/tool romon');
      expect(result['/system identity']).toContain('set name="TestRouter"');
      expect(result['/tool romon']).toContain('set enabled=yes');
    });

    it('should handle missing identity', () => {
      const config: RouterIdentityRomon = {
        RouterIdentity: '',
        isRomon: false
      };

      const result = IdentityRomon(config);
      
      console.log('IdentityRomon (no identity) Output:', JSON.stringify(result, null, 2));
      
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

      const result = AccessServices(services);
      
      console.log('AccessServices Output:', JSON.stringify(result, null, 2));
      
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
      
      const result = Timezone(timezone);
      
      console.log('Timezone Output:', JSON.stringify(result, null, 2));
      
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

      const result = AReboot(autoReboot);
      
      console.log('AReboot Output:', JSON.stringify(result, null, 2));
      
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

      const result = AUpdate(update);
      
      console.log('AUpdate (Daily) Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/system scheduler');
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

      const result = AUpdate(update);
      
      console.log('AUpdate (Weekly) Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/system scheduler');
      expect(result['/system scheduler'][0]).toContain('interval=1w');
    });

    it('should configure auto-update scheduler - monthly', () => {
      const update: Update = {
        isAutoReboot: true,
        UpdateTime: '04:00',
        UpdateInterval: 'Monthly'
      };

      const result = AUpdate(update);
      
      console.log('AUpdate (Monthly) Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/system scheduler');
      expect(result['/system scheduler'][0]).toContain('interval=30d');
    });
  });

  describe('Game', () => {
    it('should configure game traffic splitting', () => {
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

      const result = Game(games);
      
      console.log('Game Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/ip firewall raw');
      expect(result).toHaveProperty('/ip firewall mangle');
      
      // Check for Steam foreign traffic
      expect(result['/ip firewall raw']).toContain(
        'add action=add-dst-to-address-list address-list="FRN-IP-Games" address-list-timeout=1d chain=prerouting comment="Steam" dst-address-list=!LOCAL-IP dst-port=27015,27036 protocol=tcp'
      );
      
      // Check for Fortnite VPN traffic
      expect(result['/ip firewall raw']).toContain(
        'add action=add-dst-to-address-list address-list="VPN-IP-Games" address-list-timeout=1d chain=prerouting comment="Fortnite" dst-address-list=!LOCAL-IP dst-port=443,80 protocol=tcp'
      );
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

      const result = Game(games);
      
      console.log('Game (empty ports) Output:', JSON.stringify(result, null, 2));
      
      expect(result['/ip firewall raw']).toHaveLength(0);
    });
  });

  describe('Certificate', () => {
    it('should configure certificate download when enabled', () => {
      const result = Certificate(true);
      
      console.log('Certificate (enabled) Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/system script');
      expect(result).toHaveProperty('/system scheduler');
      expect(result['/system script']).toHaveLength(1);
      expect(result['/system scheduler']).toHaveLength(1);
      expect(result['/system script'][0]).toContain('Certificate-Script');
      expect(result['/system script'][0]).toContain('DigiCertGlobalRootCA.crt.pem');
    });

    it('should return empty config when disabled', () => {
      const result = Certificate(false);
      
      console.log('Certificate (disabled) Output:', JSON.stringify(result, null, 2));
      
      expect(result['/system script']).toHaveLength(0);
      expect(result['/system scheduler']).toHaveLength(0);
    });
  });

  describe('Clock', () => {
    it('should set current date', () => {
      const result = Clock();
      
      console.log('Clock Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/system clock');
      expect(result['/system clock']).toHaveLength(1);
      expect(result['/system clock'][0]).toContain('set date=');
    });
  });

  describe('NTP', () => {
    it('should configure NTP client and server', () => {
      const result = NTP();
      
      console.log('NTP Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/system ntp client');
      expect(result).toHaveProperty('/system ntp server');
      expect(result).toHaveProperty('/system ntp client servers');
      expect(result['/system ntp client']).toContain('set enabled=yes');
      expect(result['/system ntp server']).toContain('set broadcast=yes enabled=yes manycast=yes multicast=yes');
      expect(result['/system ntp client servers']).toContain('add address=ir.pool.ntp.org');
    });
  });

  describe('Graph', () => {
    it('should configure graphing tools', () => {
      const result = Graph();
      
      console.log('Graph Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/tool graphing interface');
      expect(result).toHaveProperty('/tool graphing queue');
      expect(result).toHaveProperty('/tool graphing resource');
      expect(result['/tool graphing interface']).toContain('add');
      expect(result['/tool graphing queue']).toContain('add');
      expect(result['/tool graphing resource']).toContain('add');
    });
  });

  describe('update', () => {
    it('should configure update settings', () => {
      const result = update();
      
      console.log('update Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/system package update');
      expect(result).toHaveProperty('/system routerboard settings');
      expect(result['/system package update']).toContain('set channel=stable');
      expect(result['/system routerboard settings']).toContain('set auto-upgrade=yes');
    });
  });

  describe('UPNP', () => {
    it('should enable UPNP', () => {
      const result = UPNP();
      
      console.log('UPNP Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/ip upnp');
      expect(result['/ip upnp']).toContain('set enabled=yes');
    });
  });

  describe('NATPMP', () => {
    it('should enable NAT-PMP', () => {
      const result = NATPMP();
      
      console.log('NATPMP Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/ip nat-pmp');
      expect(result['/ip nat-pmp']).toContain('set enabled=yes');
    });
  });

  describe('Firewall', () => {
    it('should configure DNS blocking firewall rules', () => {
      const result = Firewall();
      
      console.log('Firewall Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/ip firewall filter');
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
      const result = DDNS();
      
      console.log('DDNS Output:', JSON.stringify(result, null, 2));
      
      expect(result).toHaveProperty('/ip cloud');
      expect(result['/ip cloud']).toContain('set ddns-enabled=yes ddns-update-interval=1m');
    });
  });

  describe('ExtraCG', () => {
    it('should merge all extra configurations', () => {
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

      const result = ExtraCG(extraConfigState);
      
      console.log('ExtraCG (full config) Output:', JSON.stringify(result, null, 2));
      
      // Verify it contains configurations from all modules
      expect(result).toHaveProperty('/system identity');
      expect(result).toHaveProperty('/ip service');
      expect(result).toHaveProperty('/system clock');
      expect(result).toHaveProperty('/system scheduler');
      expect(result).toHaveProperty('/ip firewall raw');
      expect(result).toHaveProperty('/system script');
      expect(result).toHaveProperty('/system ntp client');
      expect(result).toHaveProperty('/tool graphing interface');
      expect(result).toHaveProperty('/ip cloud');
      
      // Verify specific values
      expect(result['/system identity']).toContain('set name="MainRouter"');
      expect(result['/system clock']).toContain('time-zone-name=Asia/Tehran');
    });

    it('should handle empty configuration', () => {
      const extraConfigState: ExtraConfigState = {};

      const result = ExtraCG(extraConfigState);
      
      console.log('ExtraCG (empty config) Output:', JSON.stringify(result, null, 2));
      
      // Should still have base configurations (Clock, NTP, Graph, etc.)
      expect(result).toHaveProperty('/system clock');
      expect(result).toHaveProperty('/system ntp client');
      expect(result).toHaveProperty('/tool graphing interface');
    });
  });
}); 