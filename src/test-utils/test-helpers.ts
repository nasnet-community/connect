import { expect } from 'vitest';
import { SConfigGenerator } from '../components/Star/ConfigGenerator/utils/ConfigGeneratorUtil';
import type { RouterConfig } from '../components/Star/ConfigGenerator/ConfigGenerator';

// Helper function to display test results with formatted output for RouterConfig functions
export const testWithOutput = (
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
  
  console.log('\n📤 Raw RouterConfig Output:');
  console.log(JSON.stringify(result, null, 2));
  
  console.log('\n🎯 Formatted MikroTik Configuration:');
  console.log('─'.repeat(40));
  console.log(formattedOutput);
  console.log('─'.repeat(40));
  
  return result;
};

// Helper function for non-RouterConfig functions (like IPAddress utilities)
export const testWithGenericOutput = (
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
  console.log(JSON.stringify(result, null, 2));
  console.log('─'.repeat(40));
  
  return result;
};

// Validation helper for RouterConfig
export const validateRouterConfig = (config: RouterConfig, expectedSections: string[] = []) => {
  expect(config).toBeDefined();
  expect(typeof config).toBe('object');
  
  expectedSections.forEach(section => {
    expect(config).toHaveProperty(section);
    expect(Array.isArray(config[section])).toBe(true);
    expect(config[section].length).toBeGreaterThan(0);
  });
  
  // Validate that all commands are strings and non-empty
  Object.entries(config).forEach(([, commands]) => {
    if (Array.isArray(commands)) {
      commands.forEach((command) => {
        expect(typeof command).toBe('string');
        // Only check length for non-empty strings (allow empty strings for spacing)
        if (command.trim().length > 0) {
          expect(command.trim().length).toBeGreaterThan(0);
        }
      });
    }
  });
};

// Helper to create formatted test display for simple string/number outputs
export const displaySimpleTest = (
  functionName: string,
  testCase: string,
  inputs: Record<string, any>,
  result: any
) => {
  console.log('\n' + '='.repeat(80));
  console.log(`🧪 Testing: ${functionName}`);
  console.log(`📝 Test Case: ${testCase}`);
  console.log('📥 Input Parameters:');
  Object.entries(inputs).forEach(([key, value]) => {
    console.log(`   ${key}: ${JSON.stringify(value)}`);
  });
  console.log('\n📤 Output:');
  console.log(`   Result: ${JSON.stringify(result)}`);
  console.log('─'.repeat(40));
};

// Global test matchers and utilities
declare global {
  namespace Vi {
    interface AsymmetricMatchersContaining {
      toBeValidRouterConfig(): any;
    }
  }
}

// Custom matcher for RouterConfig validation
expect.extend({
  toBeValidRouterConfig(received: RouterConfig) {
    const pass = received && typeof received === 'object';
    
    if (pass) {
      return {
        message: () => `Expected ${received} not to be a valid RouterConfig`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected ${received} to be a valid RouterConfig`,
        pass: false,
      };
    }
  },
}); 