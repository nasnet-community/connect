import { $ } from "@builder.io/qwik";
import { ConfigGenerator } from "~/components/Star/ConfigGenerator/ConfigGenerator";
import type { StarState } from "~/components/Star/StarContext/StarContext";

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

  return {
    downloadFile,
    generatePythonScript,
    generateROSScript,
    generateConfigPreview,
  };
};
