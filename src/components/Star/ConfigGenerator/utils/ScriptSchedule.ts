import type { RouterConfig } from "../ConfigGenerator";
import { mergeRouterConfigs } from "./ConfigGeneratorUtil";

export interface SchedulerGenerator {
    Name: string;
    content: RouterConfig;
    interval?: string;
    startTime: string | "startup";
}

export interface ScriptGenerator {
    ScriptContent: RouterConfig,
    scriptName: string,
}

export interface ScriptGeneratorWithScheduler {
    ScriptContent: RouterConfig,
    Name: string,
    interval?: string,
    startTime?: string
}

export interface OneTimeScript {
    ScriptContent: RouterConfig,
    name: string,
    interval?: string,
    startTime?: string
}


export const formatRouterConfig = (
    routerConfig: RouterConfig, 
    options: {
        escapeForScript?: boolean;
        commandLineContinuation?: boolean;
    } = {}
): string => {
    const { 
        escapeForScript = false, 
        commandLineContinuation = true 
    } = options;

    // Helper: Parse command respecting quoted strings
    const parseCommandElements = (command: string): string[] => {
        const elements: string[] = [];
        let current = '';
        let inQuote = false;
        let quoteChar = '';
        
        for (let i = 0; i < command.length; i++) {
            const char = command[i];
            
            if (!inQuote && (char === '"' || char === "'")) {
                inQuote = true;
                quoteChar = char;
                current += char;
            } else if (inQuote && char === quoteChar) {
                inQuote = false;
                current += char;
                quoteChar = '';
            } else if (!inQuote && char === ' ') {
                if (current.trim()) {
                    elements.push(current.trim());
                    current = '';
                }
            } else {
                current += char;
            }
        }
        
        if (current.trim()) {
            elements.push(current.trim());
        }
        
        return elements;
    };

    // Helper: Format individual commands with line continuation that works in MikroTik
    const formatCommand = (command: string): string => {
        const trimmedCommand = command.trim();
        if (!trimmedCommand) return '';
        
        // Comments are returned as-is
        if (trimmedCommand.startsWith('#')) {
            return trimmedCommand;
        }
        
        if (!commandLineContinuation) {
            return trimmedCommand;
        }
        
        const elements = parseCommandElements(trimmedCommand);
        
        if (elements.length <= 4) {
            // Keep shorter commands on one line
            return trimmedCommand;
        } else {
            // Split longer commands with MikroTik-compatible line continuation
            const lines: string[] = [];
            lines.push(elements.slice(0, 4).join(' ') + ' \\');
            
            for (let i = 4; i < elements.length; i += 4) {
                const chunk = elements.slice(i, i + 4);
                const isLastChunk = i + 4 >= elements.length;
                const line = '    ' + chunk.join(' ') + (isLastChunk ? '' : ' \\');
                lines.push(line);
            }
            
            return lines.join('\n');
        }
    };

    // Helper: Escape special characters for MikroTik script content
    const escapeSpecialChars = (content: string): string => {
        return content
            .replace(/\\/g, '\\\\')     // Escape backslashes first
            .replace(/"/g, '\\"')       // Escape double quotes
            .replace(/\$/g, '\\$')      // Escape dollar signs (for variables)
            .replace(/\r\n/g, '\\r\\n') // Handle Windows line breaks
            .replace(/\n/g, '\\r\\n');  // Handle Unix line breaks
    };

    // Main formatting logic - single format that works for both web and MikroTik
    const scriptLines: string[] = [];
    
    Object.entries(routerConfig).forEach(([section, commands]) => {
        if (commands.length === 0) return;
        
        // Add section header
        if (section.trim()) {
            scriptLines.push(section);
        }
        
        // Process commands
        commands.forEach(command => {
            if (command.trim()) {
                // Format the command with proper continuation
                const formattedCommand = formatCommand(command);
                
                if (formattedCommand) {
                    scriptLines.push(formattedCommand);
                }
            }
        });
        
        // Add empty line after each section for readability
        scriptLines.push('');
    });
    
    // Join and clean up
    let result = scriptLines.join('\n').replace(/\n\s*\n\s*$/, '\n').trim();
    
    // Apply escaping if needed for script content
    if (escapeForScript) {
        result = escapeSpecialChars(result);
    }
    
    return result;
};



// Scheduler/Script Generator

export const SchedulerGenerator = (params: SchedulerGenerator): RouterConfig => {
    const config: RouterConfig = {
        "/system scheduler": []
    };

    const { Name, content, interval, startTime } = params;

    // Format and escape the script content for embedding in scheduler on-event parameter
    const escapedScriptContent = formatRouterConfig(content, { escapeForScript: true });

    const resolvedStartTime = startTime === "startup" ? "startup" : startTime;
    
    const scheduleInterval = interval || "00:00:00";

    const schedulerCommand = `add interval=${scheduleInterval} name=${Name} ` +
        `on-event="${escapedScriptContent}" ` +
        `policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon ` +
        `start-time=${resolvedStartTime}`;

    config["/system scheduler"].push(schedulerCommand);

    return config;
};

export const ScriptGenerator = (ScriptGenerator: ScriptGenerator): RouterConfig => {
    const config: RouterConfig = {
        "/system script": []
    };

    const { ScriptContent, scriptName } = ScriptGenerator;

    // Format and escape the script content for embedding in RouterOS script command
    const escapedScriptContent = formatRouterConfig(ScriptContent, { escapeForScript: true });

    config["/system script"].push(
        `add dont-require-permissions=no name=${scriptName} owner=admin ` +
        `policy=ftp,reboot,read,write,policy,test,password,sniff,sensitive,romon ` +
        `source="${escapedScriptContent}"`
    );

    return config;
};

export const ScriptAndScheduler = (config: ScriptGeneratorWithScheduler): RouterConfig => {
    const { ScriptContent, Name, interval = "00:00:00", startTime = "startup" } = config;

    const scriptConfig = ScriptGenerator({
        ScriptContent,
        scriptName: Name
    });

    const schedulerConfig = SchedulerGenerator({
        Name,
        content: {
            "/system script": [`run ${Name}`]
        },
        interval,
        startTime
    });

    const finalConfig = mergeRouterConfigs(scriptConfig, schedulerConfig);

    return finalConfig;
}

export const OneTimeScript = (config: OneTimeScript): RouterConfig => {
    const { ScriptContent, name, interval = "00:00:00", startTime = "startup" } = config;
    const scriptName = name;
    const schedulerName = name; // Use the same name for both script and scheduler

    // Add scheduler removal command to the script content
    const enhancedScriptContent: RouterConfig = { ...ScriptContent };
    
    // Add the scheduler removal command at the end
    if (!enhancedScriptContent["/system scheduler"]) {
        enhancedScriptContent["/system scheduler"] = [];
    }
    enhancedScriptContent["/system scheduler"].push(`remove [find name=${schedulerName}]`);

    // Generate script with enhanced content (including scheduler removal)
    const scriptConfig = ScriptGenerator({
        ScriptContent: enhancedScriptContent, 
        scriptName
    });

    // Generate scheduler that runs the script
    const schedulerConfig = SchedulerGenerator({
        Name: schedulerName,
        content: {
            "/system script": [`run ${scriptName}`]
        },
        interval,
        startTime
    });

    // Merge configurations
    const finalConfig = mergeRouterConfigs(scriptConfig, schedulerConfig);

    // Add overall comments
    if (!finalConfig[""]) {
        finalConfig[""] = [];
    }

    finalConfig[""].unshift(
        `# One-Time Script Setup for '${name}':`,
        `# - Script named '${scriptName}' contains user content + scheduler cleanup`,
        `# - Scheduler named '${schedulerName}' runs at ${startTime} with interval ${interval}`,
        `# - Self-cleaning: Script will remove scheduler '${schedulerName}' after execution`,
        ""
    );

    return finalConfig;
};







