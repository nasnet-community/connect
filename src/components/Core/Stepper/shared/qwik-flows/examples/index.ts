// Qwik-compatible step flow examples
// These demonstrate different approaches to conditional step management
// that work with Qwik's serialization requirements

export { BasicConditionalSteps } from "./BasicConditionalSteps";
export { MultiFlowExample } from "./MultiFlowExample";
export { BooleanStepsExample } from "./BooleanStepsExample";

/**
 * Example Usage Guide:
 * 
 * 1. BasicConditionalSteps - Simple field-based conditions
 *    Perfect for: Basic show/hide logic with string operators
 *    
 * 2. MultiFlowExample - Complex multi-flow system  
 *    Perfect for: Different user paths like Choose.tsx (MikroTik vs OpenWRT)
 *    
 * 3. BooleanStepsExample - Simple boolean-based steps
 *    Perfect for: Basic toggle-based step visibility
 * 
 * All examples demonstrate proper Qwik serialization compliance
 * using string-based conditions instead of functions.
 */