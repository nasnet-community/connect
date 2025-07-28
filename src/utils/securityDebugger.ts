/**
 * Security System Debugger
 *
 * This utility helps test and debug the enhanced security system.
 * Use in development to understand how the fingerprinting and validation works.
 */

// Environment variables
const DEBUG_MODE =
  import.meta.env.VITE_DEBUG_MODE === "true" ||
  import.meta.env.NODE_ENV === "development";
const DEBUG_ITERATIONS = parseInt(
  import.meta.env.VITE_DEBUG_ITERATIONS || "5",
  10,
);
const DEBUG_SAMPLES = parseInt(import.meta.env.VITE_DEBUG_SAMPLES || "3", 10);
const EXPOSE_TO_WINDOW =
  import.meta.env.VITE_EXPOSE_DEBUGGER === "true" && DEBUG_MODE;
const DEBUG_LOGGING = import.meta.env.VITE_DEBUG_LOGGING === "true";

import {
  generateUserUUID,
  getSecurityInfo,
  clearStoredUUID,
  forceRegenerateUUID,
} from "./api";

import { verifyApplicationEnvironment } from "./securityDetection";

export interface SecurityTestResults {
  uuid: string;
  fingerprint: string;
  isConsistent: boolean;
  entropy: number;
  timestamp: number;
  suspiciousFlags: string[];
  riskScore: number;
  recommendations: string[];
  origin: string;
  isAuthorizedOrigin: boolean;
  environmentPrefix: string | null;
}

export interface FingerprintAnalysis {
  totalComponents: number;
  componentTypes: { [key: string]: number };
  uniquenessScore: number;
  stabilityScore: number;
  analysis: string[];
}

// Test the UUID generation consistency
export async function testUUIDConsistency(
  iterations: number = DEBUG_ITERATIONS,
): Promise<{
  uuids: string[];
  isConsistent: boolean;
  analysis: string;
}> {
  if (DEBUG_LOGGING) {
    console.log(`🧪 Testing UUID consistency over ${iterations} iterations...`);
  }

  const uuids: string[] = [];

  // Clear stored UUID first
  clearStoredUUID();

  for (let i = 0; i < iterations; i++) {
    if (i > 0) {
      // Clear localStorage to simulate new browser session
      localStorage.removeItem("connect_hardware_uuid");
    }

    const uuid = await generateUserUUID();
    uuids.push(uuid);
    console.log(`Iteration ${i + 1}: ${uuid}`);

    // Small delay to avoid timing conflicts
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  const uniqueUUIDs = new Set(uuids);
  const isConsistent = uniqueUUIDs.size === 1;

  const analysis = isConsistent
    ? `✅ UUID generation is consistent. Same UUID (${uuids[0]}) generated across all iterations.`
    : `❌ UUID generation is inconsistent. Generated ${uniqueUUIDs.size} different UUIDs: ${Array.from(uniqueUUIDs).join(", ")}`;

  console.log(analysis);

  return {
    uuids,
    isConsistent,
    analysis,
  };
}

// Analyze device fingerprint stability
export async function analyzeFingerprintStability(
  samples: number = DEBUG_SAMPLES,
): Promise<FingerprintAnalysis> {
  if (DEBUG_LOGGING) {
    console.log(
      `🔍 Analyzing fingerprint stability over ${samples} samples...`,
    );
  }

  const fingerprints: string[] = [];

  for (let i = 0; i < samples; i++) {
    // Generate a fresh UUID to trigger fingerprinting
    await forceRegenerateUUID();
    const securityInfo = await getSecurityInfo();
    const fp = securityInfo.currentFingerprint || "fingerprint-test";
    fingerprints.push(fp);

    // Small delay between samples
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  const componentCounts: { [key: string]: number } = {};
  let totalComponents = 0;

  fingerprints.forEach((fp) => {
    const components = fp.split("|");
    totalComponents = components.length;

    components.forEach((component) => {
      const [type] = component.split(":");
      componentCounts[type] = (componentCounts[type] || 0) + 1;
    });
  });

  // Calculate uniqueness (how many different fingerprints we got)
  const uniqueFingerprints = new Set(fingerprints);
  const uniquenessScore =
    uniqueFingerprints.size === 1
      ? 100
      : Math.max(0, 100 - (uniqueFingerprints.size - 1) * 20);

  // Calculate stability (how consistent components are)
  const stableComponents = Object.values(componentCounts).filter(
    (count) => count === samples,
  ).length;
  const stabilityScore = Math.round(
    (stableComponents / Object.keys(componentCounts).length) * 100,
  );

  const analysis: string[] = [];

  if (uniquenessScore === 100) {
    analysis.push("✅ Fingerprint is perfectly stable across samples");
  } else {
    analysis.push(
      `⚠️ Fingerprint varies across samples (${uniqueFingerprints.size} unique fingerprints)`,
    );
  }

  if (stabilityScore > 90) {
    analysis.push("✅ Component stability is excellent");
  } else if (stabilityScore > 70) {
    analysis.push("⚠️ Component stability is good but could be improved");
  } else {
    analysis.push(
      "❌ Component stability is poor - fingerprinting may be unreliable",
    );
  }

  if (totalComponents < 15) {
    analysis.push(
      "⚠️ Fingerprint has fewer components than recommended for security",
    );
  } else if (totalComponents > 25) {
    analysis.push("✅ Fingerprint has excellent component diversity");
  }

  return {
    totalComponents,
    componentTypes: componentCounts,
    uniquenessScore,
    stabilityScore,
    analysis,
  };
}

// Test for suspicious environment detection
export async function testSuspiciousEnvironmentDetection(): Promise<{
  isSuspicious: boolean;
  indicators: { [key: string]: boolean };
  recommendations: string[];
}> {
  console.log("🕵️ Testing suspicious environment detection...");

  const indicators = {
    webdriver: navigator.webdriver === true,
    zeroOuterDimensions: window.outerHeight === 0 || window.outerWidth === 0,
    noPlugins: navigator.plugins.length === 0,
    webdriverProperty: "webdriver" in window,
    phantomProperty: "phantom" in window,
    callPhantomProperty: "callPhantom" in window,
    commonVMResolution:
      navigator.platform.includes("Linux") &&
      screen.width === 1024 &&
      screen.height === 768,
  };

  const suspiciousCount = Object.values(indicators).filter(Boolean).length;
  const isSuspicious = suspiciousCount > 0;

  const recommendations: string[] = [];

  if (indicators.webdriver) {
    recommendations.push(
      "WebDriver property detected - likely automated browser",
    );
  }
  if (indicators.zeroOuterDimensions) {
    recommendations.push(
      "Zero outer window dimensions detected - likely headless browser",
    );
  }
  if (indicators.noPlugins) {
    recommendations.push(
      "No browser plugins detected - may indicate automation",
    );
  }
  if (indicators.phantomProperty || indicators.callPhantomProperty) {
    recommendations.push("PhantomJS properties detected - automated browser");
  }
  if (indicators.commonVMResolution) {
    recommendations.push("Common VM screen resolution detected");
  }

  if (!isSuspicious) {
    recommendations.push(
      "✅ Environment appears normal - no suspicious indicators detected",
    );
  }

  console.log(`Suspicious indicators found: ${suspiciousCount}`, indicators);

  return {
    isSuspicious,
    indicators,
    recommendations,
  };
}

// Run comprehensive security tests
export async function runSecurityTests(): Promise<SecurityTestResults> {
  console.log("🚀 Running comprehensive security tests...");

  // Test UUID consistency
  const uuidTest = await testUUIDConsistency(3);

  // Analyze fingerprint
  const fingerprintTest = await analyzeFingerprintStability(3);

  // Test suspicious environment
  const suspiciousTest = await testSuspiciousEnvironmentDetection();

  // Get current security info
  const securityInfo = await getSecurityInfo();

  // Verify application environment
  const appEnvironment = verifyApplicationEnvironment();

  // Calculate overall risk score
  let riskScore = 0;
  const suspiciousFlags: string[] = [];
  const recommendations: string[] = [];

  // UUID consistency check
  if (!uuidTest.isConsistent) {
    riskScore += 30;
    suspiciousFlags.push("inconsistent_uuid");
    recommendations.push(
      "UUID generation is inconsistent - check fingerprinting stability",
    );
  }

  // Fingerprint stability check
  if (fingerprintTest.stabilityScore < 70) {
    riskScore += 25;
    suspiciousFlags.push("unstable_fingerprint");
    recommendations.push("Fingerprint is unstable - may cause false positives");
  }

  if (fingerprintTest.totalComponents < 15) {
    riskScore += 15;
    suspiciousFlags.push("insufficient_fingerprint_data");
    recommendations.push("Increase fingerprint components for better security");
  }

  // Suspicious environment check
  if (suspiciousTest.isSuspicious) {
    riskScore += 40;
    suspiciousFlags.push("suspicious_environment");
    recommendations.push(...suspiciousTest.recommendations);
  }

  // Check stored UUID flags
  if (securityInfo.isSuspicious) {
    riskScore += 35;
    suspiciousFlags.push("flagged_as_suspicious");
    recommendations.push("System has flagged this environment as suspicious");
  }

  if (securityInfo.isFallback) {
    riskScore += 20;
    suspiciousFlags.push("fallback_uuid");
    recommendations.push(
      "Using fallback UUID generation - security may be reduced",
    );
  }

  // Check application environment
  if (!appEnvironment.isLegitimate) {
    riskScore += 45;
    suspiciousFlags.push("unauthorized_environment");
    recommendations.push(...appEnvironment.issues);
  }

  // Generate overall recommendations
  if (riskScore === 0) {
    recommendations.push("✅ Security system is working optimally");
  } else if (riskScore < 30) {
    recommendations.push(
      "⚠️ Minor security concerns detected - system should work well",
    );
  } else if (riskScore < 60) {
    recommendations.push(
      "⚠️ Moderate security concerns - may experience some restrictions",
    );
  } else {
    recommendations.push("❌ High security risk - requests may be blocked");
  }

  const results: SecurityTestResults = {
    uuid: securityInfo.uuid || "none",
    fingerprint: securityInfo.currentFingerprint || "none",
    isConsistent: uuidTest.isConsistent,
    entropy: Math.floor(Math.random() * 1000000), // Simulate entropy
    timestamp: Date.now(),
    suspiciousFlags,
    riskScore,
    recommendations,
    origin: securityInfo.origin || "unknown",
    isAuthorizedOrigin: securityInfo.isAuthorizedOrigin || false,
    environmentPrefix: securityInfo.environmentPrefix || null,
  };

  console.log("🎯 Security test results:", results);

  return results;
}

// Simulate different user scenarios
export async function simulateUserScenarios(): Promise<{
  normalUser: SecurityTestResults;
  browserSwitcher: SecurityTestResults;
  suspiciousUser: SecurityTestResults;
}> {
  console.log("🎭 Simulating different user scenarios...");

  // Normal user - consistent UUID
  console.log("Scenario 1: Normal User");
  const normalUser = await runSecurityTests();

  // Browser switcher - clear and regenerate
  console.log("Scenario 2: Browser Switcher");
  clearStoredUUID();
  const browserSwitcher = await runSecurityTests();

  // Suspicious user - manipulate environment (simulation)
  console.log("Scenario 3: Suspicious User (simulated)");
  clearStoredUUID();

  // Note: Browser properties are read-only, so we can't actually modify them
  // This is just to demonstrate the concept - in real scenarios,
  // suspicious environments would be detected naturally
  const suspiciousUser = await runSecurityTests();

  return {
    normalUser,
    browserSwitcher,
    suspiciousUser,
  };
}

// Generate security report
export async function generateSecurityReport(): Promise<string> {
  const report = await runSecurityTests();
  const suspiciousTest = await testSuspiciousEnvironmentDetection();
  const fingerprintAnalysis = await analyzeFingerprintStability();
  const appEnvironment = verifyApplicationEnvironment();
  const securityInfo = await getSecurityInfo();

  const reportText = `
# Security System Report
Generated at: ${new Date().toISOString()}

## UUID Information
- Current UUID: ${report.uuid}
- UUID Format: ${report.uuid.includes("-") && report.uuid.length === 36 ? "Valid UUID v4" : "Invalid/Legacy Format"}
- Consistency: ${report.isConsistent ? "✅ Consistent" : "❌ Inconsistent"}
- Environment Type: ${report.environmentPrefix || "Unknown"}

## Application Environment
- Origin: ${report.origin}
- Authorized Origin: ${report.isAuthorizedOrigin ? "✅ Yes" : "❌ No"}
- Environment Legitimate: ${appEnvironment.isLegitimate ? "✅ Yes" : "❌ No"}
- Environment Issues: ${appEnvironment.issues.join(", ") || "None"}

## Device Fingerprint
- Total Components: ${fingerprintAnalysis.totalComponents}
- Uniqueness Score: ${fingerprintAnalysis.uniquenessScore}%
- Stability Score: ${fingerprintAnalysis.stabilityScore}%
- Fingerprint Hash: ${securityInfo.fingerprintHash || "Not available"}

## Risk Assessment
- Overall Risk Score: ${report.riskScore}/100
- Suspicious Flags: ${report.suspiciousFlags.join(", ") || "None"}

## Environment Analysis
- Suspicious Environment: ${suspiciousTest.isSuspicious ? "❌ Yes" : "✅ No"}
- Active Indicators: ${
    Object.entries(suspiciousTest.indicators)
      .filter(([, value]) => value)
      .map(([key]) => key)
      .join(", ") || "None"
  }

## Hash Components (from UUID)
- Primary Hash: ${securityInfo.hashComponents.primary || "Not available"}
- Secondary Hash: ${securityInfo.hashComponents.secondary || "Not available"}
- Tertiary Hash: ${securityInfo.hashComponents.tertiary || "Not available"}
- Composite Hash: ${securityInfo.hashComponents.composite || "Not available"}

## Recommendations
${report.recommendations.map((rec) => `- ${rec}`).join("\n")}

## Component Analysis
${Object.entries(fingerprintAnalysis.componentTypes)
  .map(([type, count]) => `- ${type}: ${count} samples`)
  .join("\n")}

## Storage Information
- Timestamp: ${securityInfo.timestamp ? new Date(parseInt(securityInfo.timestamp)).toISOString() : "Not available"}
- Is Fallback: ${securityInfo.isFallback ? "⚠️ Yes" : "✅ No"}
- Fingerprint Components: ${securityInfo.fingerprintComponents}
  `;

  console.log(reportText);
  return reportText;
}

// Export utility functions for manual testing
export const securityDebugger = {
  testUUIDConsistency,
  analyzeFingerprintStability,
  testSuspiciousEnvironmentDetection,
  runSecurityTests,
  simulateUserScenarios,
  generateSecurityReport,

  // Quick test functions
  quickTest: () => runSecurityTests(),
  clearAndRegenerate: () => forceRegenerateUUID(),
  getCurrentInfo: () => getSecurityInfo(),

  // Utility for adding to window object in development
  exposeToWindow: () => {
    if (typeof window !== "undefined" && EXPOSE_TO_WINDOW) {
      (window as any).securityDebugger = securityDebugger;
      if (DEBUG_LOGGING) {
        console.log("🔧 Security debugger exposed to window.securityDebugger");
        console.log("Available methods:", Object.keys(securityDebugger));
      }
    }
  },
};

export default securityDebugger;
