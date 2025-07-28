import type { RouterConfig } from "../components/Star/ConfigGenerator/ConfigGenerator";

declare global {
  /**
   * Helper function to display test results with formatted output for RouterConfig functions
   */
  function testWithOutput(
    functionName: string,
    testCase: string,
    inputs: Record<string, any>,
    testFn: () => RouterConfig,
  ): RouterConfig;

  /**
   * Helper function for non-RouterConfig functions (like IPAddress utilities)
   */
  function testWithGenericOutput(
    functionName: string,
    testCase: string,
    inputs: Record<string, any>,
    testFn: () => any,
  ): any;

  /**
   * Validation helper for RouterConfig
   */
  function validateRouterConfig(
    config: RouterConfig,
    expectedSections?: string[],
  ): void;

  /**
   * Helper to create formatted test display for simple string/number outputs
   */
  function displaySimpleTest(
    functionName: string,
    testCase: string,
    inputs: Record<string, any>,
    result: any,
  ): void;
}

export {};
