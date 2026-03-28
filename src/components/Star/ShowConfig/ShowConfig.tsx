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
import { showConfigNewsletterClass, showConfigStageClass } from "./theme";

export const ShowConfig = component$<StepProps>(() => {
  const ctx = useContext(StarContext);
  const configPreview = useSignal<string>("");
  const slaveRouterConfigs = useSignal<{ [key: number]: string }>({});
  const locale = useMessageLocale();
  const isEasyMode = ctx.state.Choose.Mode === "easy";

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

  const summaryNewsletterProps = {
    variant: "horizontal" as const,
    size: "sm" as const,
    title: semanticMessages.show_config_newsletter_title({}, { locale }),
    description: semanticMessages.show_config_newsletter_description(
      {},
      { locale },
    ),
    placeholder: semanticMessages.show_config_newsletter_placeholder(
      {},
      { locale },
    ),
    buttonText: semanticMessages.show_config_newsletter_button({}, { locale }),
    showLogo: true,
    themeColors: true,
    theme: "branded" as const,
    glassmorphism: false,
    animated: true,
    touchOptimized: false,
    surfaceElevation: "base" as const,
    compact: true,
    showPrivacyNotice: false,
    onSubscribe$: handleNewsletterSubscribe,
    class: showConfigNewsletterClass,
  };

  return (
    <div class={showConfigStageClass}>
      {!isEasyMode && (
        <div class="container mx-auto px-0 pb-3 pt-4 sm:px-0 md:px-0 lg:px-0 xl:px-0 2xl:px-0">
          <Newsletter {...summaryNewsletterProps} />
        </div>
      )}

      {!isEasyMode && (
        <Header
          variant={slaveRouters.length > 0 ? "master" : "preview"}
          title={
            slaveRouters.length > 0
              ? semanticMessages.show_config_master_title({}, { locale })
              : semanticMessages.show_config_preview_title({}, { locale })
          }
        />
      )}

      <div class="container mx-auto px-0 pb-10 sm:px-0 md:px-0 md:pb-12 lg:px-0 xl:px-0 2xl:px-0">
        <div class="mb-8 md:mb-10">
          {isEasyMode ? (
            <EasyModeDownloadCard onROSDownload$={handleROSDownload} />
          ) : (
            <Code
              configPreview={configPreview.value}
              onROSDownload$={handleROSDownload}
            />
          )}
        </div>

        {isEasyMode && (
          <div class="mb-8 md:mb-10">
            <Newsletter {...summaryNewsletterProps} />
          </div>
        )}

        {slaveRouters.length > 0 &&
          slaveRouters.map((slaveRouter, index) => (
            <div key={`${slaveRouter.Model}-${index}`} class="mb-8 md:mb-10">
              <div class="mb-5 md:mb-6">
                <Header
                  variant="slave"
                  title={semanticMessages.show_config_slave_title(
                    { model: slaveRouter.Model, index: index + 1 },
                    { locale },
                  )}
                />
              </div>
              <div>
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

        <div class="space-y-6 md:space-y-8">
          <ScriptGuide />
          <DocumentSection />
        </div>
      </div>
    </div>
  );
});
