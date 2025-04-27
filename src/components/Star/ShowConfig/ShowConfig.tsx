import { component$, useSignal, useContext, useTask$ } from "@builder.io/qwik";
import type { StepProps } from "~/types/step";
import { StarContext } from "../StarContext/StarContext";
import { Header } from "./Header";
import { Code } from "./Code";
// import { PythonGuide } from './PythonGuide';
import { ScriptGuide } from "./ScriptGuide";
// import { TutorialCard } from './TutorialCard';
import { useConfigGenerator } from "./useShow";

export const ShowConfig = component$<StepProps>(() => {
  // const activeTutorial = useSignal<'python' | 'mikrotik' | null>(null);
  const ctx = useContext(StarContext);
  const configPreview = useSignal<string>("");

  const {
    downloadFile,
    generatePythonScript,
    generateROSScript,
    generateConfigPreview,
  } = useConfigGenerator(ctx.state);

  useTask$(async () => {
    configPreview.value = await generateConfigPreview();
  });

  return (
    <div class="container mx-auto px-4 py-8">
      <Header />

      <div class="mb-12">
        <Code
          // configPreview={generateConfigPreview()}
          configPreview={configPreview.value} // Use the signal value instead
          onPythonDownload$={async () => {
            const content = await generatePythonScript();
            await downloadFile(content, "py");
          }}
          onROSDownload$={async () => {
            const content = await generateROSScript();
            await downloadFile(content, "rsc");
          }}
        />
      </div>

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
