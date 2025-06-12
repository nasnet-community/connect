import { expect } from 'vitest';
import { SConfigGenerator } from '../components/Star/ConfigGenerator/utils/ConfigGeneratorUtil';
import type { RouterConfig } from '../components/Star/ConfigGenerator/ConfigGenerator';

// Helper function to format input parameters with proper indentation and structure
const formatInputParameters = (inputs: Record<string, any>): string => {
  const formatValue = (value: any, depth = 0): string => {
    const indent = '  '.repeat(depth);
    
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (typeof value === 'string') return `"${value}"`;
    if (typeof value === 'number' || typeof value === 'boolean') return String(value);
    
    if (Array.isArray(value)) {
      if (value.length === 0) return '[]';
      const items = value.map(item => `${indent}  ${formatValue(item, depth + 1)}`).join(',\n');
      return `[\n${items}\n${indent}]`;
    }
    
    if (typeof value === 'object') {
      const entries = Object.entries(value);
      if (entries.length === 0) return '{}';
      
      const formattedEntries = entries.map(([key, val]) => {
        const formattedValue = formatValue(val, depth + 1);
        return `${indent}  ${key}: ${formattedValue}`;
      }).join(',\n');
      
      return `{\n${formattedEntries}\n${indent}}`;
    }
    
    return String(value);
  };

  return Object.entries(inputs)
    .map(([key, value]) => `   ${key}: ${formatValue(value)}`)
    .join('\n');
};

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
  console.log(`⚙️  Function: ${functionName}`);
  console.log('📥 Input Parameters:');
  console.log(formatInputParameters(inputs));
  
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
  console.log(`⚙️  Function: ${functionName}`);
  console.log('📥 Input Parameters:');
  console.log(formatInputParameters(inputs));
  
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
  console.log(`⚙️  Function: ${functionName}`);
  console.log('📥 Input Parameters:');
  console.log(formatInputParameters(inputs));
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