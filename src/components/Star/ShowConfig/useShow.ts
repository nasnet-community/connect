import { $ } from "@builder.io/qwik";
import { ConfigGenerator } from "~/components/Star/ConfigGenerator/ConfigGenerator";
import type { StarState } from "~/components/Star/StarContext/StarContext";
import type { RouterModels } from "~/components/Star/StarContext/ChooseType";

export const useConfigGenerator = (state: StarState) => {
  const getTimestamp = $(() => {
    const now = new Date();
    return now.toISOString().replace(/[:.]/g, "-").slice(0, 19);
  });

  const downloadFile = $(async (content: string, fileType: "py" | "rsc") => {
    const timestamp = await getTimestamp();
    const filename = `router_config_${timestamp}.${fileType}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  });

  const generatePythonScript = $(() => {
    return `import routeros_api\n\ndef configure_router(host, username, password):\n...`;
  });

  const generateROSScript = $(() => ConfigGenerator(state));
  const generateConfigPreview = $(() => ConfigGenerator(state));

  // Placeholder functions for slave router configuration generation
  // TODO: Implement actual slave router configuration generation logic
  const generateSlaveRouterScript = $(async (slaveRouter: RouterModels, index: number) => {
    // Placeholder implementation - will be replaced with actual logic later
    return `# Slave Router Configuration for ${slaveRouter.Model}
# Router Index: ${index}
# Interface: ${slaveRouter.MasterSlaveInterface || 'Not specified'}

# TODO: Implement slave router configuration generation
# This is a placeholder configuration

/system identity
set name="${slaveRouter.Model.replace(/\s+/g, '-')}-Slave-${index + 1}"

# Basic slave router setup
# Add slave-specific configuration here...

# End of placeholder configuration`;
  });

  const generateSlaveRouterConfigPreview = $(async (slaveRouter: RouterModels, index: number) => {
    return await generateSlaveRouterScript(slaveRouter, index);
  });

  const downloadSlaveRouterFile = $(async (content: string, slaveRouter: RouterModels, index: number, fileType: "py" | "rsc") => {
    const timestamp = await getTimestamp();
    const routerName = slaveRouter.Model.replace(/\s+/g, '-');
    const filename = `slave_router_${routerName}_${index + 1}_config_${timestamp}.${fileType}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  });

  return {
    downloadFile,
    generatePythonScript,
    generateROSScript,
    generateConfigPreview,
    generateSlaveRouterScript,
    generateSlaveRouterConfigPreview,
    downloadSlaveRouterFile,
  };
};
