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
import { useEasyModeDefaults } from "./useEasyModeDefaults";
// import { MikrotikApplyConfig } from "./MikrotikApplyConfig";
import { Newsletter } from "~/components/Core";
import { DocumentSection } from "./DocumentSection/DocumentSection";
import { EasyModeDownloadCard } from "./EasyModeDownloadCard";

export const ShowConfig = component$<StepProps>(() => {
  // const activeTutorial = useSignal<'python' | 'mikrotik' | null>(null);
  const ctx = useContext(StarContext);
  const configPreview = useSignal<string>("");
  const slaveRouterConfigs = useSignal<{ [key: number]: string }>({});

  // Get slave routers from context
  const slaveRouters = ctx.state.Choose.RouterModels.filter(rm => !rm.isMaster);

  // Get easy mode defaults hook
  const { applyEasyModeDefaults } = useEasyModeDefaults();

  const {
    downloadFile,
    generatePythonScript,
    generateROSScript,
    generateConfigPreview,
    generateSlaveRouterScript,
    generateSlaveRouterConfigPreview,
    downloadSlaveRouterFile,
  } = useConfigGenerator(ctx.state);

  useTask$(async () => {
    // Apply easy-mode defaults before generating config
    const isEasyMode = ctx.state.Choose.Mode === "easy";
    if (isEasyMode) {
      await applyEasyModeDefaults(ctx);
    }

    configPreview.value = await generateConfigPreview();

    // Generate slave router configurations
    if (slaveRouters.length > 0) {
      const slaveConfigs: { [key: number]: string } = {};
      for (let i = 0; i < slaveRouters.length; i++) {
        slaveConfigs[i] = await generateSlaveRouterConfigPreview(slaveRouters[i], i);
      }
      slaveRouterConfigs.value = slaveConfigs;
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


  const handleSlaveRouterDownload = $(async (slaveRouter: typeof slaveRouters[0], index: number) => {
    // Track slave router script download
    track("config_downloaded", {
      file_type: "mikrotik_slave",
      format: "rsc",
      step: "show_config",
      router_model: slaveRouter.Model,
      router_index: index,
    });

    const content = await generateSlaveRouterScript(slaveRouter, index);
    await downloadSlaveRouterFile(content, slaveRouter, index, "rsc");
  });

  const handleSlaveRouterPythonDownload = $(async (slaveRouter: typeof slaveRouters[0], index: number) => {
    // Track slave router Python script download
    track("config_downloaded", {
      file_type: "python_slave",
      format: "py",
      step: "show_config",
      router_model: slaveRouter.Model,
      router_index: index,
    });

    // For now, use a placeholder Python script
    const content = `# Python configuration for ${slaveRouter.Model} (Slave Router ${index + 1})
import routeros_api

def configure_slave_router(host, username, password):
    # TODO: Implement slave router Python configuration
    pass`;

    await downloadSlaveRouterFile(content, slaveRouter, index, "py");
  });

  const handleNewsletterSubscribe = $(async (subscription: { email: string; timestamp: string; source?: string }) => {
    // Track newsletter subscription
    track("newsletter_subscribed", {
      location: "show_config",
      email_domain: subscription.email.split('@')[1],
      source: subscription.source || "show_config",
    });

    // Here you would typically call your newsletter API
    // For now, we'll simulate a successful subscription
    console.log(`Newsletter subscription for: ${subscription.email} at ${subscription.timestamp}`);

    // Return a promise to handle the subscription
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Newsletter Section - Moved to Top */}
      <div class="container mx-auto px-4 pt-8 pb-4">
        <Newsletter
          variant="horizontal"
          size="lg"
          title={$localize`Stay Updated with Router Configurations`}
          description={$localize`Get the latest MikroTik tips, security updates, and configuration best practices delivered to your inbox.`}
          placeholder={$localize`Enter your email address`}
          buttonText={$localize`Subscribe Now`}
          onSubscribe$={handleNewsletterSubscribe}
          showLogo={true}
          glassmorphism={true}
          themeColors={true}
          theme="branded"
          animated={true}
          fullWidth={true}
        />
      </div>

      <Header title={
        slaveRouters.length > 0
          ? $localize`Master Router Configuration`
          : $localize`Configuration Preview`
      } />

      <div class="container mx-auto px-4 pb-16">
        {/* Configuration Display - Conditional based on mode */}
        <div class="mb-12">
          {ctx.state.Choose.Mode === "easy" ? (
            <EasyModeDownloadCard onROSDownload$={handleROSDownload} />
          ) : (
            <Code
              configPreview={configPreview.value}
              onPythonDownload$={handlePythonDownload}
              onROSDownload$={handleROSDownload}
            />
          )}
        </div>


        {/* Display Slave Router Configurations */}
        {slaveRouters.length > 0 && slaveRouters.map((slaveRouter, index) => (
          <div key={`${slaveRouter.Model}-${index}`} class="mb-12">
            <div class="mb-8">
              <Header
                title={$localize`${slaveRouter.Model} - Slave Router ${index + 1} Configuration`}
              />
            </div>
            <div class="mb-12">
              {ctx.state.Choose.Mode === "easy" ? (
                <EasyModeDownloadCard onROSDownload$={$(() => handleSlaveRouterDownload(slaveRouter, index))} />
              ) : (
                <Code
                  configPreview={slaveRouterConfigs.value[index] || $localize`Generating configuration...`}
                  onPythonDownload$={$(() => handleSlaveRouterPythonDownload(slaveRouter, index))}
                  onROSDownload$={$(() => handleSlaveRouterDownload(slaveRouter, index))}
                />
              )}
            </div>
          </div>
        ))}

        {/* <MikrotikApplyConfig /> */}

        <ScriptGuide />

        {/* Documentation & FAQ Section */}
        <DocumentSection />
      </div>

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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
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
