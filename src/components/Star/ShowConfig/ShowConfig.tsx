import {
  component$,
  useSignal,
  useContext,
  useTask$,
  $,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import type { StepProps } from "~/types/step";
import { StarContext } from "../StarContext/StarContext";
import { Header } from "./Header";
import { Code } from "./Code";
// import { PythonGuide } from './PythonGuide';
import { ScriptGuide } from "./ScriptGuide";
// import { TutorialCard } from './TutorialCard';
import { useConfigGenerator } from "./useShow";
// import { MikrotikApplyConfig } from "./MikrotikApplyConfig";

export const ShowConfig = component$<StepProps>(() => {
  // const activeTutorial = useSignal<'python' | 'mikrotik' | null>(null);
  const ctx = useContext(StarContext);
  const configPreview = useSignal<string>("");
  const apConfigPreview = useSignal<string>("");

  const {
    downloadFile,
    generatePythonScript,
    generateROSScript,
    generateConfigPreview,
    generateAPScript,
    generateAPConfigPreview,
  } = useConfigGenerator(ctx.state);

  useTask$(async () => {
    configPreview.value = await generateConfigPreview();

    // Generate AP config if in Trunk Mode
    if (ctx.state.Choose.RouterMode === "Trunk Mode") {
      apConfigPreview.value = await generateAPConfigPreview();
    }
  });

  const handlePythonDownload = $(async () => {
    // Track Python script download
    track("config_downloaded", {
      file_type: "python",
      format: "py",
      step: "show_config",
    });

    const content = await generatePythonScript();
    await downloadFile(content, "py");
  });

  const handleROSDownload = $(async () => {
    // Track ROS script download
    track("config_downloaded", {
      file_type: "mikrotik_ros",
      format: "rsc",
      step: "show_config",
    });

    const content = await generateROSScript();
    await downloadFile(content, "rsc");
  });

  const handleAPDownload = $(async () => {
    // Track AP script download
    track("config_downloaded", {
      file_type: "mikrotik_ap",
      format: "rsc",
      step: "show_config",
    });

    const content = await generateAPScript();
    await downloadFile(content, "rsc");
  });

  return (
    <div class="container mx-auto px-4 py-8">
      <Header />

      <div class="mb-12">
        <Code
          // configPreview={generateConfigPreview()}
          configPreview={configPreview.value} // Use the signal value instead
          onPythonDownload$={handlePythonDownload}
          onROSDownload$={handleROSDownload}
        />
      </div>

      {ctx.state.Choose.RouterMode === "Trunk Mode" && (
        <>
          <Header title={$localize`AP Router Configuration`} />
          <div class="mb-12">
            <Code
              configPreview={apConfigPreview.value}
              onPythonDownload$={handlePythonDownload}
              onROSDownload$={handleAPDownload}
            />
          </div>
        </>
      )}

      {/* <MikrotikApplyConfig /> */}

      <ScriptGuide />

      {/* <div class="grid md:grid-cols-2 gap-6 w-full">
        <TutorialCard
          title={$localize`Python Code`}
          description={$localize`Learn how to apply this configuration using our Python library.`}
          icon={
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
          onClick$={() => activeTutorial.value = activeTutorial.value === 'python' ? null : 'python'}
          iconColor="text-primary-500"
        />
        {activeTutorial.value === 'python' && <PythonGuide />}

        <TutorialCard
          title={$localize`MikroTik Script`}
          description={$localize`Learn how to apply this configuration directly in RouterOS.`}
          icon={
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
          }
          onClick$={() => activeTutorial.value = activeTutorial.value === 'mikrotik' ? null : 'mikrotik'}
          iconColor="text-secondary-500"
        />
        {activeTutorial.value === 'mikrotik' && <ScriptGuide />}
      </div> */}
    </div>
  );
});
