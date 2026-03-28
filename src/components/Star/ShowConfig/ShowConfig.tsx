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
import { ScriptGuide } from "./ScriptGuide";
import { useConfigGenerator } from "./useShow";
import { useEasyModeDefaults } from "./useEasyModeDefaults";
import { Newsletter } from "~/components/Core";
import { subscribeToNewsletter } from "~/utils/newsletterAPI";
import { generateUserUUID } from "~/utils/fingerprinting";
import { DocumentSection } from "./DocumentSection/DocumentSection";
import { EasyModeDownloadCard } from "./EasyModeDownloadCard";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

export const ShowConfig = component$<StepProps>(() => {
  const ctx = useContext(StarContext);
  const configPreview = useSignal<string>("");
  const slaveRouterConfigs = useSignal<{ [key: number]: string }>({});
  const locale = useMessageLocale();

  // Get slave routers from context
  const slaveRouters = ctx.state.Choose.RouterModels.filter(
    (rm) => !rm.isMaster,
  );

  // Get easy mode defaults hook
  const { applyEasyModeDefaults } = useEasyModeDefaults();

  const {
    downloadFile,
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
        slaveConfigs[i] = await generateSlaveRouterConfigPreview(
          slaveRouters[i],
          i,
        );
      }
      slaveRouterConfigs.value = slaveConfigs;
    }
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

  const handleSlaveRouterDownload = $(
    async (slaveRouter: (typeof slaveRouters)[0], index: number) => {
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
    },
  );

  const handleNewsletterSubscribe = $(
    async (subscription: {
      email: string;
      timestamp: string;
      source?: string;
    }) => {
      try {
        // Validate subscription object
        if (!subscription.email) {
          console.error("Invalid subscription object:", subscription);
          throw new Error("Invalid subscription: email is required");
        }

        // Generate userUUID using hardware fingerprinting
        const userUUID = await generateUserUUID();

        // Call the Supabase Edge Function
        const result = await subscribeToNewsletter(
          subscription.email,
          userUUID,
        );

        if (!result.success) {
          console.error("Newsletter subscription failed:", result.error);
          throw new Error(
            result.error_detail ||
              result.error ||
              "Failed to subscribe to newsletter",
          );
        }

        console.log(
          `Newsletter subscription successful: ${subscription.email} at ${subscription.timestamp}`,
        );

        // Track newsletter subscription
        track("newsletter_subscribed", {
          location: "show_config",
          email_domain: subscription.email.split("@")[1],
          source: subscription.source || "show_config",
        });
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        throw error;
      }
    },
  );

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950">
      {/* Newsletter Section - Moved to Top */}
      <div class="container mx-auto px-4 pb-4 pt-8">
        <Newsletter
          variant="horizontal"
          size="lg"
          title={semanticMessages.show_config_newsletter_title({}, { locale })}
          description={semanticMessages.show_config_newsletter_description(
            {},
            { locale },
          )}
          placeholder={semanticMessages.show_config_newsletter_placeholder(
            {},
            { locale },
          )}
          buttonText={semanticMessages.show_config_newsletter_button(
            {},
            { locale },
          )}
          onSubscribe$={handleNewsletterSubscribe}
          showLogo={true}
          glassmorphism={true}
          themeColors={true}
          theme="branded"
          animated={true}
          fullWidth={true}
        />
      </div>

      <Header
        variant={slaveRouters.length > 0 ? "master" : "preview"}
        title={
          slaveRouters.length > 0
            ? semanticMessages.show_config_master_title({}, { locale })
            : semanticMessages.show_config_preview_title({}, { locale })
        }
      />

      <div class="container mx-auto px-4 pb-16">
        {/* Configuration Display - Conditional based on mode */}
        <div class="mb-12">
          {ctx.state.Choose.Mode === "easy" ? (
            <EasyModeDownloadCard onROSDownload$={handleROSDownload} />
          ) : (
            <Code
              configPreview={configPreview.value}
              onROSDownload$={handleROSDownload}
            />
          )}
        </div>

        {/* Display Slave Router Configurations */}
        {slaveRouters.length > 0 &&
          slaveRouters.map((slaveRouter, index) => (
            <div key={`${slaveRouter.Model}-${index}`} class="mb-12">
              <div class="mb-8">
                <Header
                  variant="slave"
                  title={semanticMessages.show_config_slave_title(
                    { model: slaveRouter.Model, index: index + 1 },
                    { locale },
                  )}
                />
              </div>
              <div class="mb-12">
                {ctx.state.Choose.Mode === "easy" ? (
                  <EasyModeDownloadCard
                    onROSDownload$={$(() =>
                      handleSlaveRouterDownload(slaveRouter, index),
                    )}
                  />
                ) : (
                  <Code
                    configPreview={
                      slaveRouterConfigs.value[index] ||
                      semanticMessages.show_config_generating({}, { locale })
                    }
                    onROSDownload$={$(() =>
                      handleSlaveRouterDownload(slaveRouter, index),
                    )}
                  />
                )}
              </div>
            </div>
          ))}

        <ScriptGuide />

        {/* Documentation & FAQ Section */}
        <DocumentSection />
      </div>
    </div>
  );
});
