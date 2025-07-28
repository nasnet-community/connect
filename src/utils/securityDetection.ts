/**
 * Security Detection and Environment Analysis
 *
 * Detects suspicious environments, automation, headless browsers, and VMs
 */

// Environment variables
const SECURITY_RISK_THRESHOLD = parseInt(
  import.meta.env.VITE_SECURITY_RISK_THRESHOLD || "50",
  10,
);
const ENABLE_VM_DETECTION =
  import.meta.env.VITE_ENABLE_VM_DETECTION !== "false";
const ENABLE_HEADLESS_DETECTION =
  import.meta.env.VITE_ENABLE_HEADLESS_DETECTION !== "false";
const ENABLE_AUTOMATION_DETECTION =
  import.meta.env.VITE_ENABLE_AUTOMATION_DETECTION !== "false";
const DETECTION_TIMEOUT = parseInt(
  import.meta.env.VITE_DETECTION_TIMEOUT || "1000",
  10,
);
const SECURITY_DEBUG_MODE = import.meta.env.VITE_SECURITY_DEBUG_MODE === "true";

// TODO: Implement remaining environment variable usage in future updates
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _SECURITY_RISK_THRESHOLD = SECURITY_RISK_THRESHOLD; // For future risk scoring
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ENABLE_VM_DETECTION = ENABLE_VM_DETECTION; // For future VM detection toggle
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _ENABLE_AUTOMATION_DETECTION = ENABLE_AUTOMATION_DETECTION; // For future automation detection toggle
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const _DETECTION_TIMEOUT = DETECTION_TIMEOUT; // For future detection timeouts

// Enhanced detection for headless browsers, virtual machines, and automation
export function detectSuspiciousEnvironment(): {
  isHeadless: boolean;
  isVirtualMachine: boolean;
  isAutomation: boolean;
  suspiciousFlags: string[];
  riskScore: number;
} {
  const suspiciousFlags: string[] = [];
  let riskScore = 0;

  try {
    if (SECURITY_DEBUG_MODE) {
      console.log("Starting security environment detection...");
    }

    // === HEADLESS BROWSER DETECTION ===
    const headlessFlags = ENABLE_HEADLESS_DETECTION
      ? [
          // Direct headless indicators
          navigator.userAgent.includes("HeadlessChrome"),
          navigator.userAgent.includes("PhantomJS"),
          navigator.userAgent.includes("SlimerJS"),
          document.documentElement.getAttribute("webdriver") === "true",
          "webdriver" in navigator && navigator.webdriver,

          // Missing browser features (present in real browsers)
          !window.outerHeight || window.outerHeight === 0,
          !window.outerWidth || window.outerWidth === 0,
          navigator.plugins.length === 0,
          !navigator.mimeTypes || navigator.mimeTypes.length === 0,

          // Chrome headless specific
          (window as any).chrome && !(window as any).chrome.runtime,
          navigator.userAgent.includes("Chrome") &&
            !navigator.userAgent.includes("Safari"),
        ]
      : [];

    const headlessCount = headlessFlags.filter(Boolean).length;
    const isHeadless = headlessCount >= 2; // Need multiple indicators

    if (isHeadless) {
      suspiciousFlags.push("headless_browser");
      riskScore += 40;
    }

    // === VIRTUAL MACHINE DETECTION ===
    const vmFlags = [
      // Common VM screen resolutions
      screen.width === 1024 && screen.height === 768,
      screen.width === 1280 && screen.height === 720,
      screen.width === 1366 && screen.height === 768,

      // VM-specific user agents or platform info
      navigator.userAgent.includes("VirtualBox"),
      navigator.userAgent.includes("VMware"),
      navigator.userAgent.includes("QEMU"),
      navigator.platform.includes("Linux") &&
        screen.width === 1024 &&
        screen.height === 768,

      // Hardware inconsistencies (common in VMs)
      "hardwareConcurrency" in navigator && navigator.hardwareConcurrency === 1,
      "deviceMemory" in navigator && (navigator as any).deviceMemory <= 2,

      // Missing hardware features
      navigator.maxTouchPoints === 0 && navigator.userAgent.includes("Mobile"),
    ];

    const vmCount = vmFlags.filter(Boolean).length;
    const isVirtualMachine = vmCount >= 2;

    if (isVirtualMachine) {
      suspiciousFlags.push("virtual_machine");
      riskScore += 25;
    }

    // === AUTOMATION DETECTION ===
    const automationFlags = [
      // Explicit automation markers
      "webdriver" in window,
      "callPhantom" in window,
      "_phantom" in window,
      "phantom" in window,
      "__nightmare" in window,
      "__selenium_unwrapped" in window,
      "__webdriver_script_fn" in document,

      // Selenium specific
      navigator.userAgent.includes("Selenium"),
      (window as any).$cdc_asdjflasutopfhvcZLmcfl_,
      document.getElementsByTagName("html")[0].getAttribute("webdriver"),

      // Browser automation frameworks
      (window as any).spawn,
      (window as any).emit,
      (window as any).send,
      (window as any).puppeteer,

      // Chrome DevTools Protocol
      (window as any).chrome?.runtime?.onConnect,
      (window as any).chrome?.runtime &&
        (window as any).chrome.runtime.onConnect?.hasListeners?.(),
    ];

    const automationCount = automationFlags.filter(Boolean).length;
    const isAutomation = automationCount >= 2;

    if (isAutomation) {
      suspiciousFlags.push("automation_detected");
      riskScore += 35;
    }

    // === ADDITIONAL SUSPICIOUS PATTERNS ===

    // Unusual browser behavior
    if (
      navigator.plugins.length === 0 &&
      !navigator.userAgent.includes("Mobile")
    ) {
      suspiciousFlags.push("no_plugins");
      riskScore += 10;
    }

    // Missing expected properties
    if (!window.history || window.history.length <= 1) {
      suspiciousFlags.push("minimal_history");
      riskScore += 5;
    }

    // Suspicious timing patterns
    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      Math.random();
    }
    const endTime = performance.now();

    if (endTime - startTime < 0.1) {
      suspiciousFlags.push("unrealistic_performance");
      riskScore += 15;
    }

    // Language/timezone mismatches (common in automation)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language;

    if (timezone.includes("UTC") && !language.includes("en")) {
      suspiciousFlags.push("timezone_language_mismatch");
      riskScore += 10;
    }

    // Screen inconsistencies
    if (screen.width < 100 || screen.height < 100) {
      suspiciousFlags.push("invalid_screen_dimensions");
      riskScore += 20;
    }

    return {
      isHeadless,
      isVirtualMachine,
      isAutomation,
      suspiciousFlags,
      riskScore,
    };
  } catch (error) {
    return {
      isHeadless: false,
      isVirtualMachine: false,
      isAutomation: false,
      suspiciousFlags: ["detection_error"],
      riskScore: 5,
    };
  }
}

export function verifyApplicationEnvironment(): {
  isLegitimate: boolean;
  origin: string;
  issues: string[];
  environmentDetails: {
    isHeadless: boolean;
    isVirtualMachine: boolean;
    isAutomation: boolean;
    riskScore: number;
    suspiciousFlags: string[];
  };
} {
  if (typeof window === "undefined") {
    return {
      isLegitimate: true,
      origin: "server-side",
      issues: [],
      environmentDetails: {
        isHeadless: false,
        isVirtualMachine: false,
        isAutomation: false,
        riskScore: 0,
        suspiciousFlags: [],
      },
    };
  }

  const issues: string[] = [];
  const origin = window.location.origin;

  // Get enhanced environment detection
  const environmentCheck = detectSuspiciousEnvironment();

  // Check for automation/bot indicators
  if (environmentCheck.isHeadless) {
    issues.push("Headless browser detected");
  }

  if (environmentCheck.isVirtualMachine) {
    issues.push("Virtual machine environment detected");
  }

  if (environmentCheck.isAutomation) {
    issues.push("Browser automation detected");
  }

  if (environmentCheck.riskScore > 75) {
    issues.push("High risk environment");
  }

  // Check basic browser capabilities
  if (!window.crypto) {
    issues.push("Missing crypto API");
  }

  if (!localStorage) {
    issues.push("Missing localStorage");
  }

  // Additional environmental checks
  if (navigator.webdriver) {
    issues.push("WebDriver property detected");
  }

  return {
    isLegitimate: issues.length === 0 && environmentCheck.riskScore < 50,
    origin,
    issues,
    environmentDetails: {
      isHeadless: environmentCheck.isHeadless,
      isVirtualMachine: environmentCheck.isVirtualMachine,
      isAutomation: environmentCheck.isAutomation,
      riskScore: environmentCheck.riskScore,
      suspiciousFlags: environmentCheck.suspiciousFlags,
    },
  };
}
