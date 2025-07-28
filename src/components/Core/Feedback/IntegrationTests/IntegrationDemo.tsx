import { component$, useSignal, useStore, $ } from "@builder.io/qwik";
import { MultiModalTest } from "./MultiModalTest";
import { LayeredComponentsTest } from "./LayeredComponentsTest";
import { ThemeSwitchingTest } from "./ThemeSwitchingTest";
import { MobileResponsiveTest } from "./MobileResponsiveTest";
import { ErrorHandlingTest } from "./ErrorHandlingTest";
import { GestureConflictsTest } from "./GestureConflictsTest";
import { Button } from "../../button";

/**
 * IntegrationDemo - Comprehensive integration demo page
 * 
 * This component provides a comprehensive demonstration of all feedback component
 * integration tests. It serves as both a testing platform and documentation
 * for how components work together in real-world scenarios.
 */
export const IntegrationDemo = component$(() => {
  const activeTest = useSignal<string>("overview");
  const isDarkMode = useSignal(false);

  const testStats = useStore({
    multiModal: { score: 9, status: "excellent" },
    layeredComponents: { score: 7, status: "good" },
    themeSwitching: { score: 10, status: "excellent" },
    mobileResponsive: { score: 8, status: "good" },
    errorHandling: { score: 9, status: "excellent" },
    gestureConflicts: { score: 6, status: "needs-attention" },
  });

  const toggleTheme = $(() => {
    isDarkMode.value = !isDarkMode.value;
    if (typeof document !== 'undefined') {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200";
      case "good": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200";
      case "needs-attention": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return "text-green-600 dark:text-green-400";
    if (score >= 7) return "text-blue-600 dark:text-blue-400";
    if (score >= 5) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const averageScore = Math.round(
    Object.values(testStats).reduce((sum, test) => sum + test.score, 0) / 
    Object.values(testStats).length * 10
  ) / 10;

  const renderTestContent = () => {
    switch (activeTest.value) {
      case "multi-modal":
        return <MultiModalTest />;
      case "layered-components":
        return <LayeredComponentsTest />;
      case "theme-switching":
        return <ThemeSwitchingTest />;
      case "mobile-responsive":
        return <MobileResponsiveTest />;
      case "error-handling":
        return <ErrorHandlingTest />;
      case "gesture-conflicts":
        return <GestureConflictsTest />;
      default:
        return (
          <div class="space-y-8">
            {/* Integration Overview */}
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8">
              <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Feedback Components Integration Suite
                </h1>
                <p class="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                  A comprehensive testing platform for validating feedback component interactions,
                  theme consistency, responsive behavior, and accessibility across all integration scenarios.
                </p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="text-center">
                  <div class={`text-4xl font-bold mb-2 ${getScoreColor(averageScore)}`}>
                    {averageScore}/10
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Overall Integration Score
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    6
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Test Scenarios
                  </div>
                </div>
                <div class="text-center">
                  <div class="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    7
                  </div>
                  <div class="text-sm text-gray-600 dark:text-gray-400">
                    Components Tested
                  </div>
                </div>
              </div>

              <div class="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <h3 class="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  Quick Start Guide
                </h3>
                <ol class="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                  <li>1. Select a test scenario from the navigation panel</li>
                  <li>2. Follow the interactive testing instructions</li>
                  <li>3. Observe component interactions and behaviors</li>
                  <li>4. Check the integration findings documentation</li>
                  <li>5. Test on different devices and screen sizes</li>
                </ol>
              </div>
            </div>

            {/* Test Scenarios Grid */}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div 
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick$={() => activeTest.value = "multi-modal"}
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Multi-Modal Test
                  </h3>
                  <span class={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testStats.multiModal.status)}`}>
                    {testStats.multiModal.status}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Tests Dialog with Toast notifications and Alert messages. Validates z-index layering and focus management.
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Integration Score:</span>
                  <span class={`font-semibold ${getScoreColor(testStats.multiModal.score)}`}>
                    {testStats.multiModal.score}/10
                  </span>
                </div>
              </div>

              <div 
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick$={() => activeTest.value = "layered-components"}
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Layered Components
                  </h3>
                  <span class={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testStats.layeredComponents.status)}`}>
                    {testStats.layeredComponents.status}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Tests Popover triggered from within Drawer. Validates complex nesting and focus trap behavior.
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Integration Score:</span>
                  <span class={`font-semibold ${getScoreColor(testStats.layeredComponents.score)}`}>
                    {testStats.layeredComponents.score}/10
                  </span>
                </div>
              </div>

              <div 
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick$={() => activeTest.value = "theme-switching"}
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Theme Switching
                  </h3>
                  <span class={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testStats.themeSwitching.status)}`}>
                    {testStats.themeSwitching.status}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Tests real-time theme changes across all components. Validates color consistency and transitions.
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Integration Score:</span>
                  <span class={`font-semibold ${getScoreColor(testStats.themeSwitching.score)}`}>
                    {testStats.themeSwitching.score}/10
                  </span>
                </div>
              </div>

              <div 
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick$={() => activeTest.value = "mobile-responsive"}
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Mobile Responsive
                  </h3>
                  <span class={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testStats.mobileResponsive.status)}`}>
                    {testStats.mobileResponsive.status}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Tests responsive behavior across different screen sizes. Validates touch interactions and mobile UX.
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Integration Score:</span>
                  <span class={`font-semibold ${getScoreColor(testStats.mobileResponsive.score)}`}>
                    {testStats.mobileResponsive.score}/10
                  </span>
                </div>
              </div>

              <div 
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick$={() => activeTest.value = "error-handling"}
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Error Handling
                  </h3>
                  <span class={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testStats.errorHandling.status)}`}>
                    {testStats.errorHandling.status}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Tests ErrorMessage integration with other feedback components. Validates error state management.
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Integration Score:</span>
                  <span class={`font-semibold ${getScoreColor(testStats.errorHandling.score)}`}>
                    {testStats.errorHandling.score}/10
                  </span>
                </div>
              </div>

              <div 
                class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick$={() => activeTest.value = "gesture-conflicts"}
              >
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Gesture Conflicts
                  </h3>
                  <span class={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(testStats.gestureConflicts.status)}`}>
                    {testStats.gestureConflicts.status}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Tests swipe gesture conflicts between Toast and Drawer components. Identifies touch interaction issues.
                </p>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Integration Score:</span>
                  <span class={`font-semibold ${getScoreColor(testStats.gestureConflicts.score)}`}>
                    {testStats.gestureConflicts.score}/10
                  </span>
                </div>
              </div>
            </div>

            {/* Key Findings Summary */}
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h2 class="text-xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
                Key Integration Findings
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 class="font-semibold text-green-700 dark:text-green-300 mb-3">
                    ✅ Strengths
                  </h3>
                  <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Excellent theme consistency across all components</li>
                    <li>• Strong component interoperability</li>
                    <li>• Good mobile responsive behavior</li>
                    <li>• Effective error state management</li>
                    <li>• Proper accessibility implementation</li>
                    <li>• Independent state management</li>
                  </ul>
                </div>

                <div>
                  <h3 class="font-semibold text-yellow-700 dark:text-yellow-300 mb-3">
                    ⚠️ Areas for Improvement
                  </h3>
                  <ul class="text-sm space-y-2 text-gray-600 dark:text-gray-400">
                    <li>• Z-index management needs centralization</li>
                    <li>• Gesture conflicts between swipeable components</li>
                    <li>• Focus management in complex nested scenarios</li>
                    <li>• Touch event propagation improvements needed</li>
                    <li>• Performance optimization for multiple components</li>
                    <li>• Enhanced ARIA live region support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technical Recommendations */}
            <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
              <h2 class="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
                Recommended Improvements
              </h2>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 class="font-medium text-red-700 dark:text-red-300 mb-2">High Priority</h4>
                  <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Centralized z-index system</li>
                    <li>• Gesture conflict resolution</li>
                    <li>• Enhanced focus management</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="font-medium text-yellow-700 dark:text-yellow-300 mb-2">Medium Priority</h4>
                  <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Performance optimizations</li>
                    <li>• Gesture priority system</li>
                    <li>• Error categorization</li>
                  </ul>
                </div>
                
                <div>
                  <h4 class="font-medium text-green-700 dark:text-green-300 mb-2">Low Priority</h4>
                  <ul class="text-sm space-y-1 text-gray-600 dark:text-gray-400">
                    <li>• Animation consistency</li>
                    <li>• Enhanced customization</li>
                    <li>• Reduced motion support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div class={`min-h-screen transition-colors duration-300 ${
      isDarkMode.value 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header class={`sticky top-0 z-50 border-b transition-colors ${
        isDarkMode.value 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center gap-4">
              <h1 class="text-xl font-semibold">
                Feedback Integration Tests
              </h1>
              {activeTest.value !== "overview" && (
                <Button
                  onClick$={() => activeTest.value = "overview"}
                  class="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                >
                  ← Back to Overview
                </Button>
              )}
            </div>
            
            <Button
              onClick$={toggleTheme}
              class={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isDarkMode.value
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
                  : 'bg-gray-800 hover:bg-gray-900 text-white'
              }`}
            >
              {isDarkMode.value ? '☀️ Light' : '🌙 Dark'}
            </Button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      {activeTest.value === "overview" && (
        <nav class={`border-b ${
          isDarkMode.value ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div class="max-w-7xl mx-auto px-4 sm:px-6">
            <div class="flex gap-1 py-3 overflow-x-auto">
              {[
                { id: "multi-modal", label: "Multi-Modal", icon: "🔄" },
                { id: "layered-components", label: "Layered", icon: "📚" },
                { id: "theme-switching", label: "Themes", icon: "🎨" },
                { id: "mobile-responsive", label: "Mobile", icon: "📱" },
                { id: "error-handling", label: "Errors", icon: "⚠️" },
                { id: "gesture-conflicts", label: "Gestures", icon: "👆" },
              ].map((test) => (
                <Button
                  key={test.id}
                  onClick$={() => activeTest.value = test.id}
                  class={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTest.value === test.id
                      ? 'bg-blue-600 text-white'
                      : isDarkMode.value
                      ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {test.icon} {test.label}
                </Button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main class="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {renderTestContent()}
      </main>

      {/* Footer */}
      <footer class={`border-t mt-12 ${
        isDarkMode.value ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
      }`}>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div class="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              Feedback Components Integration Test Suite • 
              Overall Score: <span class={`font-semibold ${getScoreColor(averageScore)}`}>
                {averageScore}/10
              </span>
            </p>
            <p class="mt-1">
              Test on different devices and screen sizes for comprehensive validation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
});