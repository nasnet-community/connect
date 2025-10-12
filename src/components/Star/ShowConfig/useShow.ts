import { $ } from "@builder.io/qwik";
import { ConfigGenerator } from "~/components/Star/ConfigGenerator/ConfigGenerator";
import { SlaveCG } from "~/components/Star/ConfigGenerator/Trunk/Slave";
import { removeEmptyArrays, formatConfig, removeEmptyLines } from "~/components/Star/ConfigGenerator/utils";
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

  /**
   * Generate slave router configuration using SlaveCG
   */
  const generateSlaveRouterScript = $((_slaveRouter: RouterModels, _index: number) => {
    try {
      // Generate configuration using SlaveCG
      const routerConfig = SlaveCG(
        _slaveRouter,
        state.LAN.Subnets,
        state.LAN.Wireless,
        state.ExtraConfig
      );

      // Format the configuration using the same utilities as main ConfigGenerator
      const removedEmptyArrays = removeEmptyArrays(routerConfig);
      const formattedConfig = formatConfig(removedEmptyArrays);
      const finalConfig = removeEmptyLines(formattedConfig);

      // Add reboot command at the end
      return `${finalConfig}\n\n:delay 60\n\n/system reboot`;
    } catch (error) {
      console.error(`Error generating slave router configuration for ${_slaveRouter.Model}:`, error);
      
      // Return error message as comment in script
      return `# Error generating configuration for ${_slaveRouter.Model}
# Error: ${error instanceof Error ? error.message : String(error)}
# Please check your configuration and try again.`;
    }
  });

  const generateSlaveRouterConfigPreview = $(async (slaveRouter: RouterModels, index: number) => {
    return generateSlaveRouterScript(slaveRouter, index);
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
