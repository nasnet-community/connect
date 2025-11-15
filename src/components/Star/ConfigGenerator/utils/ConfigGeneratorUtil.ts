import type { RouterConfig } from "../ConfigGenerator";

export function mergeRouterConfigs(...configs: RouterConfig[]): RouterConfig {
    const merged: RouterConfig = {};

    configs.forEach((config) => {
        Object.entries(config).forEach(([key, value]) => {
            if (merged[key]) {
                merged[key] = [...merged[key], ...value];
            } else {
                merged[key] = [...value];
            }
        });
    });

    return merged;
}

export const mergeMultipleConfigs = (
    ...configs: RouterConfig[]
): RouterConfig => {
    // return configs.reduce((acc, curr) => mergeConfigurations(acc, curr));
    return configs.reduce((acc, curr) => mergeConfigurations(acc, curr), {});
};

export const mergeConfigurations = (
    baseConfig: RouterConfig,
    newConfig: RouterConfig,
): RouterConfig => {
    const mergedConfig = { ...baseConfig };

    Object.entries(newConfig).forEach(([key, value]) => {
        if (mergedConfig[key]) {
            mergedConfig[key] = [...mergedConfig[key], ...value];
        } else {
            mergedConfig[key] = value;
        }
    });

    return mergedConfig;
};

export const removeEmptyArrays = (config: RouterConfig): RouterConfig => {
    const filteredConfig: RouterConfig = {};

    Object.entries(config).forEach(([key, value]) => {
        if (value && value.length > 0) {
            filteredConfig[key] = value;
        }
    });

    return filteredConfig;
};

export const removeEmptyLines = (str: string): string => {
    return str
        .split("\n")
        .filter((line) => line.trim().length > 0)
        .join("\n");
};

export const formatConfig = (config: RouterConfig): string => {
    return Object.entries(config)
        .map(([key, values]) => {
            const cleanValues = values.filter((v) => v.trim());
            return `${key}\n${cleanValues.join("\n")}`;
        })
        .filter(Boolean)
        .join("\n")
        .trim()
        .replace(/\n+$/, "");
    // .replace(/#/g, "");
};

export const SConfigGenerator = (config: RouterConfig): string => {
    const removedEmptyArrays = removeEmptyArrays(config);
    const ELConfig = formatConfig(removedEmptyArrays);
    const formattedConfigEL = removeEmptyLines(ELConfig);
    return formattedConfigEL;
};

export const CommandShortner = (config: RouterConfig): RouterConfig => {
    const shortenedConfig: RouterConfig = {};

    Object.entries(config).forEach(([section, commands]) => {
        shortenedConfig[section] = commands.map((command) => {
            // Skip comments - don't modify lines starting with #
            if (command.trim().startsWith("#")) {
                return command;
            }

            // Split by spaces but keep quoted strings and bracketed expressions together
            const parts = [];
            let current = "";
            let inQuotes = false;
            let quoteChar = "";
            let bracketDepth = 0;

            for (let i = 0; i < command.length; i++) {
                const char = command[i];

                if (char === " " && !inQuotes && bracketDepth === 0) {
                    if (current.trim()) {
                        parts.push(current.trim());
                    }
                    current = "";
                    continue;
                }

                current += char;

                if (inQuotes) {
                    if (char === quoteChar) {
                        inQuotes = false;
                    }
                } else {
                    if (char === '"' || char === "'") {
                        inQuotes = true;
                        quoteChar = char;
                    } else if (char === "[") {
                        bracketDepth++;
                    } else if (char === "]") {
                        bracketDepth = Math.max(0, bracketDepth - 1);
                    }
                }
            }

            if (current.trim()) {
                parts.push(current.trim());
            }

            // If 4 or fewer parts, return as is
            if (parts.length <= 4) {
                return command;
            }

            // Break the command into multiple lines
            const lines: string[] = [];
            let remainingParts = [...parts];
            let isFirstLine = true;

            while (remainingParts.length > (isFirstLine ? 4 : 3)) {
                // Take first 4 parts for first line, then 3 parts for subsequent lines
                const elementsToTake = isFirstLine ? 4 : 3;
                const currentLineParts = remainingParts.slice(
                    0,
                    elementsToTake,
                );
                lines.push(currentLineParts.join(" ") + " \\");

                // Remove the processed parts
                remainingParts = remainingParts.slice(elementsToTake);
                isFirstLine = false;
            }

            // Add the remaining parts as the last line
            if (remainingParts.length > 0) {
                lines.push(remainingParts.join(" "));
            }

            // Add indentation to continuation lines (all lines except the first)
            const formattedLines = lines.map((line, index) => {
                if (index === 0) {
                    return line;
                } else {
                    return "    " + line; // Add 4 spaces indentation
                }
            });

            return formattedLines.join("\n");
        });
    });

    return shortenedConfig;
};
