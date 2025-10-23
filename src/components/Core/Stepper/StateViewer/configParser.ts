/**
 * Extracts and parses the state JSON from MikroTik configuration files
 * The state is embedded in the /system note section
 */

export interface ParseResult {
  state?: any;
  error?: string;
}

/**
 * Extracts state from a MikroTik configuration file
 * @param configContent - The full content of the .rsc configuration file
 * @returns ParseResult with either the parsed state or an error message
 */
export function extractStateFromConfig(configContent: string): ParseResult {
  if (!configContent || configContent.trim().length === 0) {
    return { error: "File is empty or not a valid configuration" };
  }

  // Find the /system note section - MikroTik uses backslash for line continuation
  // So we need to match across multiple lines and handle the backslash continuation
  const noteMatch = configContent.match(/\/system note\s+set[^"]*note="([\s\S]*?)"\s*(?:\r?\n|$)/m);
  
  if (!noteMatch) {
    return { error: "No /system note section found in configuration file" };
  }

  // Extract the note content (which may span multiple lines with backslash continuation)
  let noteContent = noteMatch[1];
  
  // Remove backslash line continuations (backslash followed by newline and spaces)
  noteContent = noteContent.replace(/\\\s*\r?\n\s*/g, '');

  // Handle escaped characters in the note
  noteContent = noteContent
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\');

  // Look for the state: { pattern
  const stateStartMatch = noteContent.match(/state:\s*{/);
  
  if (!stateStartMatch) {
    return { error: "No state data found in /system note section" };
  }

  // Find the start position of the state JSON
  const stateStart = noteContent.indexOf(stateStartMatch[0]) + stateStartMatch[0].length - 1;

  // Extract the JSON by matching braces
  let braceCount = 0;
  let stateEnd = stateStart;
  let inString = false;
  let escapeNext = false;

  for (let i = stateStart; i < noteContent.length; i++) {
    const char = noteContent[i];

    if (escapeNext) {
      escapeNext = false;
      continue;
    }

    if (char === '\\') {
      escapeNext = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === '{') {
        braceCount++;
      } else if (char === '}') {
        braceCount--;
        if (braceCount === 0) {
          stateEnd = i + 1;
          break;
        }
      }
    }
  }

  if (braceCount !== 0) {
    return { error: "Invalid state JSON format in configuration (unmatched braces)" };
  }

  // Extract the state JSON string
  const stateJson = noteContent.substring(stateStart, stateEnd);

  // Try to parse the JSON
  try {
    const state = JSON.parse(stateJson);
    
    // Validate that it's an object with some content
    if (!state || typeof state !== 'object' || Object.keys(state).length === 0) {
      return { error: "State data is empty or invalid" };
    }

    return { state };
  } catch (error) {
    return { 
      error: `Invalid state JSON format in configuration: ${error instanceof Error ? error.message : 'Parse error'}` 
    };
  }
}

