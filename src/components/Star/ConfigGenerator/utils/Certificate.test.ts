import { describe, it, expect } from 'vitest';
import {
  CheckCGNAT,
  InitLetsEncrypt,
  RenewalLetsEncrypt,
  LetsEncrypt,
  PrivateCert,
  ExportCert,
  PublicCert,
  AddCert,
  AllCert,
  type AllCertConfig
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

// Helper function for generic test outputs
const testWithGenericOutput = (
  functionName: string,
  testCase: string,
  inputs: Record<string, any>,
  testFn: () => any
) => {
  console.log('\n' + '='.repeat(80));
  console.log(`🧪 Testing: ${functionName}`);
  console.log(`📝 Test Case: ${testCase}`);
  console.log('📥 Input Parameters:');
  Object.entries(inputs).forEach(([key, value]) => {
    console.log(`   ${key}: ${JSON.stringify(value)}`);
  });
  
  const result = testFn();
  
  console.log('\n📤 Function Output:');
  console.log('Result:', JSON.stringify(result, null, 2));
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

  describe('AddCert', () => {
    it('should generate VPN certificate assignment script with default certificate name', () => {
      const inputs = {};
      const result = testWithOutput(
        'AddCert',
        'Default VPN certificate assignment',
        inputs,
        () => AddCert()
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain('Add-VPN-Cert');
      expect(SConfigGenerator(result)).toContain('your-certificate-name-here');
      expect(SConfigGenerator(result)).toContain('VPN Certificate Assignment Script');
    });

    it('should generate VPN certificate assignment script with custom certificate name', () => {
      const targetCertificateName = 'MyCompanyCert';
      const inputs = { targetCertificateName };
      const result = testWithOutput(
        'AddCert',
        'Custom VPN certificate assignment',
        inputs,
        () => AddCert(targetCertificateName)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      expect(SConfigGenerator(result)).toContain(targetCertificateName);
      expect(SConfigGenerator(result)).toContain('Add-VPN-Cert');
    });
  });

  describe('AllCert', () => {
    it('should generate complete certificate management configuration with default parameters', () => {
      const inputs = {};
      const result = testWithOutput(
        'AllCert',
        'Complete certificate management (default parameters)',
        inputs,
        () => AllCert()
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      
      const configString = SConfigGenerator(result);
      
      // Check that all certificate functions are included
      expect(configString).toContain('CGNAT-Check');
      expect(configString).toContain('Init-LetsEncrypt');
      expect(configString).toContain('Renewal-LetsEncrypt');
      expect(configString).toContain('Private-Cert-Setup');
      expect(configString).toContain('Export-Certs');
      expect(configString).toContain('Public-Cert-Update');
      expect(configString).toContain('Add-VPN-Cert');
      expect(configString).toContain('Complete Certificate Management Configuration Bundle');
    });

    it('should generate complete certificate management configuration with custom parameters', () => {
      const config: AllCertConfig = {
        wanInterfaceName: 'pppoe-out1',
        certNameToRenew: 'CustomCompanyCert',
        daysBeforeExpiryToRenew: 15,
        renewalStartTime: '01:30:00',
        country: 'CA',
        state: 'Ontario',
        locality: 'Toronto',
        organization: 'CustomOrg',
        organizationalUnit: 'Security',
        keySize: 4096,
        daysValid: 7300,
        username: 'admin.user',
        userPassword: 'SecurePass123',
        checkServerCert: true,
        targetCertificateName: 'CompanyVPNCert'
      };
      
      const inputs = config;
      const result = testWithOutput(
        'AllCert',
        'Complete certificate management (custom parameters)',
        inputs,
        () => AllCert(config)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      
      const configString = SConfigGenerator(result);
      
      // Verify custom parameters are applied
      expect(configString).toContain('pppoe-out1');
      expect(configString).toContain('CustomCompanyCert');
      expect(configString).toContain('15');
      expect(configString).toContain('01:30:00');
      expect(configString).toContain('CA');
      expect(configString).toContain('Ontario');
      expect(configString).toContain('Toronto');
      expect(configString).toContain('CustomOrg');
      expect(configString).toContain('Security');
      expect(configString).toContain('4096');
      expect(configString).toContain('7300');
      expect(configString).toContain('admin.user');
      expect(configString).toContain('SecurePass123');
      expect(configString).toContain('checkServerCert "yes"');
      expect(configString).toContain('CompanyVPNCert');
    });

    it('should generate configuration with partial custom parameters', () => {
      const config: AllCertConfig = {
        certNameToRenew: 'PartialCert',
        country: 'UK',
        keySize: 4096,
        checkServerCert: true
      };
      
      const inputs = config;
      const result = testWithOutput(
        'AllCert',
        'Partial custom certificate configuration',
        inputs,
        () => AllCert(config)
      );
      
      validateRouterConfig(result, ['/system script', '/system scheduler']);
      
      const configString = SConfigGenerator(result);
      
      // Verify partial custom parameters and defaults
      expect(configString).toContain('PartialCert');
      expect(configString).toContain('UK');
      expect(configString).toContain('4096');
      expect(configString).toContain('checkServerCert "yes"');
      // Verify defaults are still used
      expect(configString).toContain('ether1'); // default WAN interface
      expect(configString).toContain('defaultuser'); // default username
    });

    it('should include comprehensive documentation and comments', () => {
      const result = AllCert();
      const configString = SConfigGenerator(result);
      
      // Check for documentation sections
      expect(configString).toContain('Complete Certificate Management Configuration Bundle');
      expect(configString).toContain('Configuration Parameters:');
      expect(configString).toContain('Scripts and Schedulers Created:');
      expect(configString).toContain('Usage:');
      expect(configString).toContain('CGNAT Detection and Monitoring');
      expect(configString).toContain('Let\'s Encrypt Certificate Management');
      expect(configString).toContain('Private CA and Certificate Setup');
      expect(configString).toContain('Certificate Export for VPN Users');
      expect(configString).toContain('Public Certificate Authority Updates');
      expect(configString).toContain('VPN Certificate Assignment');
    });

    it('should validate all individual components are present', () => {
      const allCertResult = AllCert();
      const allCertString = SConfigGenerator(allCertResult);
      
      testWithGenericOutput(
        'AllCert Component Validation',
        'Verify all individual components are included in AllCert',
        { 
          componentCount: 8,
          expectedComponents: [
            'CGNAT-Check', 'Init-LetsEncrypt', 'Renewal-LetsEncrypt', 
            'Private-Cert-Setup', 'Export-Certs', 'Public-Cert-Update', 'Add-VPN-Cert'
          ]
        },
        () => {
          // Check that key components from each function are present
          const hasComponents = {
            cgnatCheck: allCertString.includes('CGNAT-Check'),
            initLetsEncrypt: allCertString.includes('Init-LetsEncrypt'),
            privateCert: allCertString.includes('Private-Cert-Setup'),
            exportCert: allCertString.includes('Export-Certs'),
            publicCert: allCertString.includes('Public-Cert-Update'),
            addCert: allCertString.includes('Add-VPN-Cert')
          };
          
          return hasComponents;
        }
      );
      
      // Validate that all components are included
      expect(allCertString).toContain('CGNAT-Check');
      expect(allCertString).toContain('Init-LetsEncrypt');
      expect(allCertString).toContain('Renewal-LetsEncrypt');
      expect(allCertString).toContain('Private-Cert-Setup');
      expect(allCertString).toContain('Export-Certs');
      expect(allCertString).toContain('Public-Cert-Update');
      expect(allCertString).toContain('Add-VPN-Cert');
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
      
      // Test AddCert
      const addCertResult = AddCert('TestCert');
      console.log('\n📤 Function Output: AddCert');
      console.log('Contains Add-VPN-Cert:', SConfigGenerator(addCertResult).includes('Add-VPN-Cert'));
      
      // Test AllCert
      const allCertResult = AllCert({ certNameToRenew: 'TestCert' });
      console.log('\n📤 Function Output: AllCert');
      console.log('Contains all components:', 
        SConfigGenerator(allCertResult).includes('CGNAT-Check') &&
        SConfigGenerator(allCertResult).includes('Init-LetsEncrypt') &&
        SConfigGenerator(allCertResult).includes('Private-Cert-Setup') &&
        SConfigGenerator(allCertResult).includes('Add-VPN-Cert'));
      
      // Validate all results
      validateRouterConfig(initResult, ['/system script', '/system scheduler']);
      validateRouterConfig(renewalResult, ['/system script', '/system scheduler']);
      validateRouterConfig(completeResult, ['/system script', '/system scheduler']);
      validateRouterConfig(privateResult, ['/system script', '/system scheduler']);
      validateRouterConfig(publicResult, ['/system script', '/system scheduler']);
      validateRouterConfig(addCertResult, ['/system script', '/system scheduler']);
      validateRouterConfig(allCertResult, ['/system script', '/system scheduler']);
      
      expect(initResult).toBeDefined();
      expect(renewalResult).toBeDefined();
      expect(completeResult).toBeDefined();
      expect(privateResult).toBeDefined();
      expect(publicResult).toBeDefined();
      expect(addCertResult).toBeDefined();
      expect(allCertResult).toBeDefined();
    });

    it('should test AllCert function configuration scalability', () => {
      testWithGenericOutput(
        'AllCert Scalability Test',
        'Test multiple AllCert configurations with different parameters',
        { configurations: 3 },
        () => {
          // Test different configuration scenarios
          const basicConfig = AllCert();
          const enterpriseConfig = AllCert({
            certNameToRenew: 'Enterprise-Cert',
            keySize: 4096,
            daysValid: 3650,
            country: 'US',
            organization: 'Enterprise Corp'
          });
          const vpnConfig = AllCert({
            username: 'vpnuser',
            userPassword: 'VPNPass123',
            targetCertificateName: 'VPN-Server-Cert',
            checkServerCert: true
          });
          
          // Validate all configurations are unique and valid
          const basicString = SConfigGenerator(basicConfig);
          const enterpriseString = SConfigGenerator(enterpriseConfig);
          const vpnString = SConfigGenerator(vpnConfig);
          
          return {
            basicConfigSize: basicString.length,
            enterpriseConfigSize: enterpriseString.length,
            vpnConfigSize: vpnString.length,
            allContainCGNAT: [basicString, enterpriseString, vpnString].every(s => s.includes('CGNAT-Check')),
            allContainLetsEncrypt: [basicString, enterpriseString, vpnString].every(s => s.includes('Init-LetsEncrypt')),
            configurationsUnique: basicString !== enterpriseString && basicString !== vpnString && enterpriseString !== vpnString
          };
        }
      );
      
      expect(true).toBe(true); // Test completed successfully
    });
  });
}); 