import { describe, it, expect } from 'vitest';
import {
  CheckCGNAT,
  InitLetsEncrypt,
  RenewalLetsEncrypt,
  LetsEncrypt,
  PrivateCert,
  ExportCert,
  PublicCert
} from './Certificate';
import { SConfigGenerator } from './ConfigGeneratorUtil';
import type { RouterConfig } from '../ConfigGenerator';

// Helper function to display test results with formatted output
const testWithOutput = (
  functionName: string,
  testCase: string,
  inputs: Record<string, any>,
  testFn: () => RouterConfig
) => {
  console.log('\n' + '='.repeat(80));
  console.log(`🧪 Testing: ${functionName}`);
  console.log(`📝 Test Case: ${testCase}`);
  console.log('📥 Input Parameters:');
  Object.entries(inputs).forEach(([key, value]) => {
    console.log(`   ${key}: ${JSON.stringify(value)}`);
  });
  
  const result = testFn();
  const formattedOutput = SConfigGenerator(result);
  
  console.log('\n📤 Function Output:');
  console.log('Raw RouterConfig:', JSON.stringify(result, null, 2));
  
  console.log('\n🎯 Formatted MikroTik Configuration:');
  console.log('─'.repeat(40));
  console.log(formattedOutput);
  console.log('─'.repeat(40));
  
  return result;
};

// Validation helper
const validateRouterConfig = (config: RouterConfig, expectedSections: string[] = []) => {
  expect(config).toBeDefined();
  expect(typeof config).toBe('object');
  
  expectedSections.forEach(section => {
    expect(config).toHaveProperty(section);
    expect(Array.isArray(config[section])).toBe(true);
    expect(config[section].length).toBeGreaterThan(0);
  });
  
  // Validate that all commands are strings
  Object.entries(config).forEach(([, commands]) => {
    if (Array.isArray(commands)) {
      commands.forEach((command) => {
        expect(typeof command).toBe('string');
        expect(command.trim().length).toBeGreaterThan(0);
      });
    }
  });
};

describe('Certificate Functions', () => {
  
  describe('CheckCGNAT', () => {
    it('should generate CGNAT detection script with default interface', () => {
      const inputs = { wanInterfaceName: 'ether1' };
      const result = testWithOutput(
        'CheckCGNAT',
        'Default WAN Interface (ether1)',
        inputs,
        () => CheckCGNAT()
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain('ether1');
      expect(SConfigGenerator(result)).toContain('CGNAT-Check');
    });

    it('should generate CGNAT detection script with custom interface', () => {
      const customInterface = 'pppoe-out1';
      const inputs = { wanInterfaceName: customInterface };
      const result = testWithOutput(
        'CheckCGNAT',
        'Custom WAN Interface (pppoe-out1)',
        inputs,
        () => CheckCGNAT(customInterface)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain(customInterface);
    });
  });

  describe('InitLetsEncrypt', () => {
    it('should generate Let\'s Encrypt initialization script', () => {
      const inputs = {};
      const result = testWithOutput(
        'InitLetsEncrypt',
        'Default initialization script',
        inputs,
        () => InitLetsEncrypt()
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain('Init-LetsEncrypt');
      expect(SConfigGenerator(result)).toContain('Let\'s Encrypt');
    });
  });

  describe('RenewalLetsEncrypt', () => {
    it('should generate Let\'s Encrypt renewal script with default parameters', () => {
      const inputs = {};
      const result = testWithOutput(
        'RenewalLetsEncrypt',
        'Default renewal parameters',
        inputs,
        () => RenewalLetsEncrypt()
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain('Renewal-LetsEncrypt');
      expect(SConfigGenerator(result)).toContain('MikroTik-LE-Cert');
    });

    it('should generate Let\'s Encrypt renewal script with custom parameters', () => {
      const certName = 'CustomCert';
      const daysBeforeExpiry = 15;
      const inputs = { certNameToRenew: certName, daysBeforeExpiryToRenew: daysBeforeExpiry };
      const result = testWithOutput(
        'RenewalLetsEncrypt',
        'Custom certificate name and expiry days',
        inputs,
        () => RenewalLetsEncrypt(certName, daysBeforeExpiry)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain(certName);
      expect(SConfigGenerator(result)).toContain('15');
    });
  });

  describe('LetsEncrypt', () => {
    it('should generate complete Let\'s Encrypt setup with default parameters', () => {
      const inputs = {};
      const result = testWithOutput(
        'LetsEncrypt',
        'Complete Let\'s Encrypt setup (default parameters)',
        inputs,
        () => LetsEncrypt()
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain('Init-LetsEncrypt');
      expect(SConfigGenerator(result)).toContain('Renewal-LetsEncrypt');
      expect(SConfigGenerator(result)).toContain('Complete Let\'s Encrypt');
    });

    it('should generate complete Let\'s Encrypt setup with custom parameters', () => {
      const certName = 'MyCompanyCert';
      const daysBeforeExpiry = 7;
      const renewalStartTime = '01:00:00';
      const inputs = { certNameToRenew: certName, daysBeforeExpiryToRenew: daysBeforeExpiry, renewalStartTime };
      const result = testWithOutput(
        'LetsEncrypt',
        'Custom Let\'s Encrypt configuration',
        inputs,
        () => LetsEncrypt(certName, daysBeforeExpiry, renewalStartTime)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain(certName);
      expect(SConfigGenerator(result)).toContain('Certificate Name: ' + certName);
      expect(SConfigGenerator(result)).toContain('Renewal Threshold: ' + daysBeforeExpiry);
    });
  });

  describe('PrivateCert', () => {
    it('should generate private certificate setup with default parameters', () => {
      const inputs = {};
      const result = testWithOutput(
        'PrivateCert',
        'Default private certificate setup',
        inputs,
        () => PrivateCert()
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain('Private-Cert-Setup');
      expect(SConfigGenerator(result)).toContain('US');
      expect(SConfigGenerator(result)).toContain('2048');
    });

    it('should generate private certificate setup with custom parameters', () => {
      const country = 'CA';
      const state = 'Ontario';
      const locality = 'Toronto';
      const organization = 'TestCorp';
      const organizationalUnit = 'Security';
      const keySize = 4096;
      const daysValid = 7300;
      const inputs = { country, state, locality, organization, organizationalUnit, keySize, daysValid };
      const result = testWithOutput(
        'PrivateCert',
        'Custom private certificate setup',
        inputs,
        () => PrivateCert(country, state, locality, organization, organizationalUnit, keySize, daysValid)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain(country);
      expect(SConfigGenerator(result)).toContain(state);
      expect(SConfigGenerator(result)).toContain(locality);
      expect(SConfigGenerator(result)).toContain(organization);
      expect(SConfigGenerator(result)).toContain(keySize.toString());
      expect(SConfigGenerator(result)).toContain(daysValid.toString());
    });
  });

  describe('ExportCert', () => {
    it('should generate certificate export script with default password', () => {
      const username = 'testuser';
      const inputs = { username };
      const result = testWithOutput(
        'ExportCert',
        'Default user certificate export',
        inputs,
        () => ExportCert(username)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain(username);
      expect(SConfigGenerator(result)).toContain('defaultpassword');
      expect(SConfigGenerator(result)).toContain('Export-Certs');
    });

    it('should generate certificate export script with custom password', () => {
      const username = 'john.doe';
      const userPassword = 'SecurePass123';
      const inputs = { username, userPassword };
      const result = testWithOutput(
        'ExportCert',
        'Custom user certificate export',
        inputs,
        () => ExportCert(username, userPassword)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain(username);
      expect(SConfigGenerator(result)).toContain(userPassword);
    });
  });

  describe('PublicCert', () => {
    it('should generate public certificate update script with default parameters', () => {
      const inputs = {};
      const result = testWithOutput(
        'PublicCert',
        'Default public certificate update',
        inputs,
        () => PublicCert()
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain('Public-Cert-Update');
      expect(SConfigGenerator(result)).toContain('cacert.pem');
      expect(SConfigGenerator(result)).toContain('roots-goog.pem');
      expect(SConfigGenerator(result)).toContain('checkServerCert "no"');
    });

    it('should generate public certificate update script with server certificate validation enabled', () => {
      const checkServerCert = true;
      const inputs = { checkServerCert };
      const result = testWithOutput(
        'PublicCert',
        'Public certificate update with server validation',
        inputs,
        () => PublicCert(checkServerCert)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain('Public-Cert-Update');
      expect(SConfigGenerator(result)).toContain('checkServerCert "yes"');
    });
  });

  describe('Certificate Integration Tests', () => {
    it('should test multiple certificate functions working together', () => {
      // const inputs = { scenario: 'Combined certificate setup' };
      
      console.log('\n' + '='.repeat(80));
      console.log('🧪 Testing: Certificate Integration');
      console.log('📝 Test Case: Multiple certificate functions');
      
      // Test InitLetsEncrypt
      const initResult = InitLetsEncrypt();
      console.log('\n📤 Function Output: InitLetsEncrypt');
      console.log('Contains Init-LetsEncrypt script:', SConfigGenerator(initResult).includes('Init-LetsEncrypt'));
      
      // Test RenewalLetsEncrypt
      const renewalResult = RenewalLetsEncrypt('TestCert', 30);
      console.log('\n📤 Function Output: RenewalLetsEncrypt');
      console.log('Contains Renewal-LetsEncrypt script:', SConfigGenerator(renewalResult).includes('Renewal-LetsEncrypt'));
      
      // Test complete LetsEncrypt setup
      const completeResult = LetsEncrypt('TestCert', 30, '02:00:00');
      console.log('\n📤 Function Output: LetsEncrypt (Complete Setup)');
      console.log('Contains both Init and Renewal:', 
        SConfigGenerator(completeResult).includes('Init-LetsEncrypt') && 
        SConfigGenerator(completeResult).includes('Renewal-LetsEncrypt'));
      
      // Test PrivateCert
      const privateResult = PrivateCert('US', 'CA', 'SF', 'TestOrg');
      console.log('\n📤 Function Output: PrivateCert');
      console.log('Contains Private-Cert-Setup:', SConfigGenerator(privateResult).includes('Private-Cert-Setup'));
      
      // Test PublicCert
      const publicResult = PublicCert(false);
      console.log('\n📤 Function Output: PublicCert');
      console.log('Contains Public-Cert-Update:', SConfigGenerator(publicResult).includes('Public-Cert-Update'));
      
      // Validate all results
      validateRouterConfig(initResult, ['/system script', '/system scheduler']);
      validateRouterConfig(renewalResult, ['/system script', '/system scheduler']);
      validateRouterConfig(completeResult, ['/system script', '/system scheduler']);
      validateRouterConfig(privateResult, ['/system script', '/system scheduler']);
      validateRouterConfig(publicResult, ['/system script', '/system scheduler']);
      
      expect(initResult).toBeDefined();
      expect(renewalResult).toBeDefined();
      expect(completeResult).toBeDefined();
      expect(privateResult).toBeDefined();
      expect(publicResult).toBeDefined();
    });
  });
}); 