import { beforeEach } from "vitest";
import * as testHelpers from "./test-helpers";

// Assign helpers to global scope
(globalThis as any).testWithOutput = testHelpers.testWithOutput;
(globalThis as any).testWithGenericOutput = testHelpers.testWithGenericOutput;
(globalThis as any).validateRouterConfig = testHelpers.validateRouterConfig;
(globalThis as any).displaySimpleTest = testHelpers.displaySimpleTest;

// Optional: Add any global setup logic here
beforeEach(() => {
  // Add any setup that should run before each test
  // For example: reset global state, clear mocks, etc.
});
