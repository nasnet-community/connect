import {
  component$,
  useSignal,
  $,
  useContext,
  useTask$,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { RouterMode } from "./RouterMode/RouterMode";
import { RouterModel } from "./RouterModel/RouterModel";
import { SlaveRouterModel } from "./RouterModel/SlaveRouterModel";
import { WANLinkType } from "./WANLinkType/WANLinkType";
import { TrunkInterface } from "./TrunkInterface/TrunkInterface";
import { InterfaceType } from "./InterfaceType/InterfaceType";
import { SetupMode } from "./SetupMode/SetupMode";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { StepProps } from "~/types/step";
import { StarContext } from "../StarContext/StarContext";
import { Newsletter } from "~/components/Core";
import type { NewsletterSubscription } from "~/components/Core/Feedback/Newsletter/Newsletter.types";
import { subscribeToNewsletter } from "~/utils/newsletterAPI";
import { generateUserUUID } from "~/utils/fingerprinting";

const RouterModeStep = component$((props: StepProps) => (
  <RouterMode isComplete={props.isComplete} onComplete$={props.onComplete$} />
));

const RouterModelStep = component$((props: StepProps) => (
  <RouterModel isComplete={props.isComplete} onComplete$={props.onComplete$} />
));

const SlaveRouterModelStep = component$((props: StepProps) => (
  <SlaveRouterModel isComplete={props.isComplete} onComplete$={props.onComplete$} />
));

const WANLinkStep = component$((props: StepProps) => (
  <WANLinkType isComplete={props.isComplete} onComplete$={props.onComplete$} />
));

const InterfaceTypeStep = component$((props: StepProps) => (
  <InterfaceType
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
  />
));

const TrunkInterfaceStep = component$((props: StepProps) => (
  <TrunkInterface
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
  />
));

const SetupModeStep = component$((props: StepProps) => (
  <SetupMode isComplete={props.isComplete} onComplete$={props.onComplete$} />
));


export const Choose = component$((props: StepProps) => {
  const starContext = useContext(StarContext);
  const stepTitles = {
    setupMode: $localize`Setup Mode`,
    wanLinkType: $localize`WAN Link Type`,
    routerModel: $localize`Router Model`,
    routerMode: $localize`Router Mode`,
    slaveRouter: $localize`Slave Router`,
    interfaceType: $localize`Interface Type`,
    trunkInterface: $localize`Router + Access Point Interface`,
  };

  // Handle newsletter subscription for router configuration tips
  const handleNewsletterSubscription$ = $(async (subscription: NewsletterSubscription) => {
    try {
      // Validate subscription object
      if (!subscription || !subscription.email) {
        console.error("Invalid subscription object:", subscription);
        throw new Error("Invalid subscription: email is required");
      }

      // Generate userUUID using hardware fingerprinting
      const userUUID = await generateUserUUID();

      // Call the Supabase Edge Function
      const result = await subscribeToNewsletter(subscription.email, userUUID);

      if (!result.success) {
        console.error("Newsletter subscription failed:", result.error);
        throw new Error(result.error_detail || result.error || "Failed to subscribe to newsletter");
      }

      console.log("Newsletter subscription successful:", subscription.email);

      // Track newsletter signup from router configuration flow
      if (typeof track !== 'undefined') {
        track("newsletter_subscription", {
          source: "router-configuration",
          step: "choose",
          email_domain: subscription.email.split('@')[1] || 'unknown',
          firmware: starContext.state.Choose.Firmware || 'not-selected',
          mode: starContext.state.Choose.Mode || 'not-selected',
        });
      }

    } catch (error) {
      console.error("Failed to subscribe to newsletter:", error);
      throw new Error($localize`Failed to subscribe. Please try again.`);
    }
  });

  // Create step building functions to avoid serialization issues
  const createMikroTikSteps = $(() => {
    const baseSteps: StepItem[] = [
      {
        id: 1,
        title: stepTitles.setupMode,
        component: SetupModeStep,
        isComplete: false,
      },
      {
        id: 2,
        title: stepTitles.wanLinkType,
        component: WANLinkStep,
        isComplete: false,
      },
      {
        id: 3,
        title: stepTitles.routerModel,
        component: RouterModelStep,
        isComplete: false,
      },
    ];

    let nextId = 4;

    // Only add Router Mode step if user selected Advance mode
    if (starContext.state.Choose.Mode === "advance") {
      baseSteps.push({
        id: nextId,
        title: stepTitles.routerMode,
        component: RouterModeStep,
        isComplete: false,
      });
      nextId++;
    }

    // Add Slave Router Model step if Trunk Mode is selected (only in advance mode)
    if (starContext.state.Choose.Mode === "advance" && starContext.state.Choose.RouterMode === "Trunk Mode") {
      baseSteps.push({
        id: nextId,
        title: stepTitles.slaveRouter,
        component: SlaveRouterModelStep,
        isComplete: false,
      });
      nextId++;

      // Add Interface Type step first
      baseSteps.push({
        id: nextId,
        title: stepTitles.interfaceType,
        component: InterfaceTypeStep,
        isComplete: false,
      });
      nextId++;

      // Add Trunk Interface step after interface type selection
      baseSteps.push({
        id: nextId,
        title: stepTitles.trunkInterface,
        component: TrunkInterfaceStep,
        isComplete: false,
      });
      nextId++;
    }

    return baseSteps;
  });

  // Initialize with default MikroTik steps (same as before)
  const steps = useSignal<StepItem[]>([
    {
      id: 1,
      title: stepTitles.setupMode,
      component: SetupModeStep,
      isComplete: false,
    },
    {
      id: 2,
      title: stepTitles.wanLinkType,
      component: WANLinkStep,
      isComplete: false,
    },
    {
      id: 3,
      title: stepTitles.routerModel,
      component: RouterModelStep,
      isComplete: false,
    },
  ]);

  const activeStep = useSignal(0);
  const stepperKey = useSignal(0); // Force re-render when this changes

  const handleStepComplete = $((id: number) => {
    const stepIndex = steps.value.findIndex((step: StepItem) => step.id === id);
    if (stepIndex > -1) {
      // Update the step completion status
      steps.value = steps.value.map((step: StepItem, index: number) =>
        index === stepIndex ? { ...step, isComplete: true } : step,
      );

      // Don't manually advance the step - VStepper handles this automatically
      // Check if all steps are complete
      if (steps.value.every((step: StepItem) => step.isComplete)) {
        props.onComplete$();
      }
    }
  });

  // Handle router configuration step changes for the MikroTik flow
  useTask$(async ({ track }) => {
    const selectedMode = track(() => starContext.state.Choose.Mode);
    const selectedWANLinkType = track(() => starContext.state.Choose.WANLinkType);
    const selectedRouterMode = track(() => starContext.state.Choose.RouterMode);
    const selectedTrunkInterfaceType = track(() => starContext.state.Choose.TrunkInterfaceType);
    const routerModels = track(() => starContext.state.Choose.RouterModels);

    // console.log('=== FIRMWARE/ROUTER MODE CHANGE DETECTED ==='); // Debug log
    // console.log('Previous steps count:', steps.value.length); // Debug log
    // console.log('Firmware:', selectedFirmware, 'RouterMode:', selectedRouterMode); // Debug log

    // Set default RouterMode to "AP Mode" when in Easy mode
    if (selectedMode === "easy" && !starContext.state.Choose.RouterMode) {
      starContext.updateChoose$({ RouterMode: "AP Mode" });
    }

    // Clear MasterSlaveInterface when switching from Trunk Mode to AP Mode
    if (
      selectedRouterMode === "AP Mode" &&
      starContext.state.Choose.RouterModels.some(rm => rm.MasterSlaveInterface)
    ) {
      // Clear MasterSlaveInterface from all router models
      const updatedModels = starContext.state.Choose.RouterModels.map(rm => ({
        ...rm,
        MasterSlaveInterface: undefined
      }));
      starContext.updateChoose$({ RouterModels: updatedModels });
    }

    const getCurrentStepCompletion = (title: string) => {
      return steps.value.find((step: StepItem) => step.title === title)?.isComplete || false;
    };

    const setStepCompletion = (targetSteps: StepItem[], title: string, isComplete: boolean) => {
      const step = targetSteps.find((existingStep) => existingStep.title === title);
      if (step) {
        step.isComplete = isComplete;
      }
    };

    const previousRouterModeStepComplete = getCurrentStepCompletion(stepTitles.routerMode);
    const hasMasterRouter = routerModels.some((routerModel) => routerModel.isMaster);
    const hasSlaveRouter = routerModels.some((routerModel) => !routerModel.isMaster);
    const masterRouterInterfaceConfigured = routerModels.some(
      (routerModel) => routerModel.isMaster && Boolean(routerModel.MasterSlaveInterface),
    );
    const slaveRouterInterfaceConfigured = routerModels.some(
      (routerModel) => !routerModel.isMaster && Boolean(routerModel.MasterSlaveInterface),
    );
    const isTrunkMode = selectedMode === "advance" && selectedRouterMode === "Trunk Mode";
    const completionState = {
      setupMode: Boolean(selectedMode),
      wanLinkType: Boolean(selectedWANLinkType),
      routerModel: hasMasterRouter,
      routerMode: selectedMode === "advance" ? Boolean(selectedRouterMode) : false,
      slaveRouter: isTrunkMode ? hasSlaveRouter : false,
      interfaceType: isTrunkMode ? Boolean(selectedTrunkInterfaceType) : false,
      trunkInterface:
        isTrunkMode && masterRouterInterfaceConfigured && slaveRouterInterfaceConfigured,
    };

    const mikrotikSteps = await createMikroTikSteps();
    setStepCompletion(mikrotikSteps, stepTitles.setupMode, completionState.setupMode);
    setStepCompletion(mikrotikSteps, stepTitles.wanLinkType, completionState.wanLinkType);
    setStepCompletion(mikrotikSteps, stepTitles.routerModel, completionState.routerModel);
    setStepCompletion(mikrotikSteps, stepTitles.routerMode, completionState.routerMode);
    setStepCompletion(mikrotikSteps, stepTitles.slaveRouter, completionState.slaveRouter);
    setStepCompletion(mikrotikSteps, stepTitles.interfaceType, completionState.interfaceType);
    setStepCompletion(mikrotikSteps, stepTitles.trunkInterface, completionState.trunkInterface);

    const newSteps = [
      ...mikrotikSteps,
    ];

    const structureChanged =
      steps.value.length !== newSteps.length ||
      steps.value.some((step: StepItem, index: number) => step.title !== newSteps[index]?.title);

    if (structureChanged) {
      steps.value = newSteps;
      stepperKey.value++;
    } else {
      steps.value = newSteps;
    }

    // If RouterMode is complete with Trunk Mode, navigate to Slave Router step (only in advance mode)
    const routerModeJustCompleted = !previousRouterModeStepComplete && completionState.routerMode;
    if (selectedMode === "advance" && routerModeJustCompleted && selectedRouterMode === "Trunk Mode") {
      const slaveRouterIndex = newSteps.findIndex(
        (step) => step.title === stepTitles.slaveRouter,
      );
      if (slaveRouterIndex !== -1) {
        activeStep.value = slaveRouterIndex;
      }
    } else if (activeStep.value >= newSteps.length) {
      activeStep.value = 0;
    }
  });

  return (
    <div class="container mx-auto w-full px-4">
      {/* Newsletter Section - Router Configuration Tips */}
      <div class="mb-12">
        <Newsletter
          variant="horizontal"
          size="md"
          title={$localize`Stay Updated with NASNET Connect`}
          description={$localize`Get the latest product updates, new features, and important announcements delivered directly to your inbox.`}
          placeholder={$localize`your.email@example.com`}
          buttonText={$localize`Subscribe Now`}
          showLogo={true}
          themeColors={true}
          theme="branded"
          glassmorphism={false}
          animated={true}
          touchOptimized={true}
          surfaceElevation="elevated"
          onSubscribe$={handleNewsletterSubscription$}
          class="max-w-6xl mx-auto backdrop-blur-sm bg-gradient-to-br from-primary-50/80 to-secondary-50/80 dark:from-primary-dark-950/80 dark:to-secondary-dark-950/80 border border-primary-200/50 dark:border-primary-dark-700/50 shadow-lg hover:shadow-xl transition-all duration-300"
        />
      </div>

      {/* Add a key to force re-render when steps change */}
      <VStepper
        key={`stepper-${stepperKey.value}-${steps.value.length}-${steps.value.map((step: StepItem) => step.id).join("-")}`}
        steps={steps.value}
        activeStep={activeStep.value}
        onStepComplete$={handleStepComplete}
        onStepChange$={(id: number) => {
          const stepIndex = steps.value.findIndex((step: StepItem) => step.id === id);
          if (stepIndex > -1) {
            activeStep.value = stepIndex;
          }
        }}
        isComplete={props.isComplete}
      />

      {/* Completion Newsletter - Shown when all steps are completed */}
      {/* {steps.value.every((step) => step.isComplete) && (
        <div class="mt-16 mb-8">
          <Newsletter
            variant="horizontal"
            size="md"
            title={$localize`Don't Miss Future Updates`}
            description={$localize`Thank you for using NASNET Connect! Subscribe to receive product updates, new features, and exclusive offers.`}
            placeholder={$localize`your.email@example.com`}
            buttonText={$localize`Stay Connected`}
            showLogo={false}
            themeColors={true}
            theme="glass"
            glassmorphism={true}
            animated={true}
            compact={true}
            touchOptimized={true}
            surfaceElevation="base"
            onSubscribe$={handleNewsletterSubscription$}
            class="max-w-5xl mx-auto bg-gradient-to-r from-success-50/60 to-primary-50/60 dark:from-success-dark-950/60 dark:to-primary-dark-950/60 border border-success-200/30 dark:border-success-dark-700/30"
            privacyNoticeText={$localize`Join thousands of users. Unsubscribe anytime.`}
          />
        </div>
      )} */}
    </div>
  );
});
