import {
  component$,
  useSignal,
  $,
  useContext,
  useTask$,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { Frimware } from "./Frimware/Frimware";
import { RouterMode } from "./RouterMode/RouterMode";
import { RouterModel } from "./RouterModel/RouterModel";
import { SlaveRouterModel } from "./RouterModel/SlaveRouterModel";
import { WANLinkType } from "./WANLinkType/WANLinkType";
import { OWRT } from "./OWRT/OWRT";
import { OWRTInstall } from "./OWRT/Install";
import { OWRTPackage } from "./OWRT/Package";
import { TrunkInterface } from "./TrunkInterface/TrunkInterface";
import { InterfaceType } from "./InterfaceType/InterfaceType";
import { SetupMode } from "./SetupMode/SetupMode";
import { VStepper } from "~/components/Core/Stepper/VStepper/VStepper";
import type { StepItem } from "~/components/Core/Stepper/VStepper/types";
import type { StepProps } from "~/types/step";
import { StarContext } from "../StarContext/StarContext";
import { Newsletter } from "~/components/Core";
import type { NewsletterSubscription } from "~/components/Core/Feedback/Newsletter/Newsletter.types";

// Define step components outside the main component to avoid serialization issues
const FirmwareStep = component$((props: StepProps) => (
  <Frimware isComplete={props.isComplete} onComplete$={props.onComplete$} />
));

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

const OWRTInstallStep = component$((props: StepProps) => (
  <OWRTInstall isComplete={props.isComplete} onComplete$={props.onComplete$} />
));

const OWRTPackageStep = component$(() => (
  <OWRTPackage />
));

// Create OWRT configuration component for OpenWRT steps
// Note: This will use the OWRT component directly with minimal props to avoid serialization issues
const OWRTConfigStep = component$((props: StepProps) => (
  <OWRT
    isComplete={props.isComplete}
    onComplete$={props.onComplete$}
  />
));


export const Choose = component$((props: StepProps) => {
  const starContext = useContext(StarContext);
  const openWRTOption = useSignal<"stock" | "already-installed" | undefined>(
    undefined,
  );

  // Handle OpenWRT option selection
  const _handleOpenWRTOptionSelect = $(
    (option: "stock" | "already-installed") => {
      openWRTOption.value = option;
    },
  );

  // Handle newsletter subscription for router configuration tips
  const handleNewsletterSubscription$ = $(async (subscription: NewsletterSubscription) => {
    try {
      // Validate subscription object
      if (!subscription || !subscription.email) {
        console.error("Invalid subscription object:", subscription);
        throw new Error("Invalid subscription: email is required");
      }

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

      console.log("Router configuration newsletter subscription:", subscription);

      // Call the SendGrid API to add email to newsletter
      const { subscribeToNewsletterSendGrid } = await import('~/utils/newsletterAPI');
      const result = await subscribeToNewsletterSendGrid(subscription.email, {
        source: subscription.source || 'router-configuration',
      });

      if (result.success) {
        console.log("SendGrid subscription successful! Job ID:", result.jobId);
      } else {
        console.error("SendGrid subscription failed:", result.error);
        throw new Error(result.error || "Failed to subscribe to newsletter");
      }
      // Example: await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     ...subscription,
      //     source: 'router-configuration',
      //     interests: ['mikrotik', 'router-setup', 'network-security']
      //   })
      // });

    } catch (error) {
      console.error("Failed to subscribe to newsletter:", error);
      throw new Error($localize`Failed to subscribe. Please try again.`);
    }
  });

  // Create step building functions to avoid serialization issues
  const createMikroTikSteps = $((routerModeComplete: boolean = false) => {
    const baseSteps: StepItem[] = [
      {
        id: 2,
        title: $localize`Setup Mode`,
        component: SetupModeStep,
        isComplete: false,
      },
      {
        id: 3,
        title: $localize`WAN Link Type`,
        component: WANLinkStep,
        isComplete: false,
      },
      {
        id: 4,
        title: $localize`Router Model`,
        component: RouterModelStep,
        isComplete: false,
      },
    ];

    let nextId = 5;

    // Only add Router Mode step if user selected Advance mode
    if (starContext.state.Choose.Mode === "advance") {
      baseSteps.push({
        id: nextId,
        title: $localize`Router Mode`,
        component: RouterModeStep,
        isComplete: routerModeComplete,
      });
      nextId++;
    }

    // Add Slave Router Model step if Trunk Mode is selected (only in advance mode)
    if (starContext.state.Choose.Mode === "advance" && starContext.state.Choose.RouterMode === "Trunk Mode") {
      baseSteps.push({
        id: nextId,
        title: $localize`Slave Router`,
        component: SlaveRouterModelStep,
        isComplete: false,
      });
      nextId++;

      // Add Interface Type step first
      baseSteps.push({
        id: nextId,
        title: $localize`Interface Type`,
        component: InterfaceTypeStep,
        isComplete: false,
      });
      nextId++;

      // Add Trunk Interface step after interface type selection
      baseSteps.push({
        id: nextId,
        title: $localize`Router + Access Point Interface`,
        component: TrunkInterfaceStep,
        isComplete: false,
      });
      nextId++;
    }

    return baseSteps;
  });

  const createOpenWRTSteps = $(() => {
    const baseSteps = [
      {
        id: 2,
        title: $localize`Setup Mode`,
        component: SetupModeStep,
        isComplete: false,
      },
      {
        id: 3,
        title: $localize`Configuration`,
        component: OWRTConfigStep,
        isComplete: false,
      },
    ];

    // Only add Install step if user selected stock firmware
    if (openWRTOption.value === "stock") {
      baseSteps.push({
        id: 4,
        title: $localize`Install OpenWrt`,
        component: OWRTInstallStep,
        isComplete: false,
      });
    }

    // Always add Package step (with different ID based on whether Install step exists)
    baseSteps.push({
      id: openWRTOption.value === "stock" ? 5 : 4,
      title: $localize`Install Package`,
      component: OWRTPackageStep,
      isComplete: false,
    });

    return baseSteps;
  });

  // Initialize with default MikroTik steps (same as before)
  const steps = useSignal<StepItem[]>([
    {
      id: 1,
      title: $localize`Firmware`,
      component: FirmwareStep,
      isComplete: false,
    },
    {
      id: 2,
      title: $localize`Setup Mode`,
      component: SetupModeStep,
      isComplete: false,
    },
    {
      id: 3,
      title: $localize`WAN Link Type`,
      component: WANLinkStep,
      isComplete: false,
    },
    {
      id: 4,
      title: $localize`Router Model`,
      component: RouterModelStep,
      isComplete: false,
    },
  ]);

  const activeStep = useSignal(0);
  const stepperKey = useSignal(0); // Force re-render when this changes

  const handleStepComplete = $((id: number) => {
    const stepIndex = steps.value.findIndex((step) => step.id === id);
    if (stepIndex > -1) {
      // Update the step completion status
      steps.value = steps.value.map((step, index) =>
        index === stepIndex ? { ...step, isComplete: true } : step,
      );

      // Don't manually advance the step - VStepper handles this automatically
      // Check if all steps are complete
      if (steps.value.every((step) => step.isComplete)) {
        props.onComplete$();
      }
    }
  });

  // Handle firmware and router mode changes
  useTask$(async ({ track }) => {
    const selectedFirmware = track(() => starContext.state.Choose.Firmware);
    const selectedMode = track(() => starContext.state.Choose.Mode);
    const selectedRouterMode = track(() => starContext.state.Choose.RouterMode);

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

    // Only proceed if we have a valid firmware selection
    if (!selectedFirmware) {
      // console.log('No firmware selected yet'); // Debug log
      return;
    }

    // Preserve step completion statuses
    const firmwareStepComplete =
      steps.value.find((step) => step.id === 1)?.isComplete || false;
    const routerModeStepComplete =
      steps.value.find((step) => step.title === $localize`Router Mode`)
        ?.isComplete || false;

    if (selectedFirmware === "OpenWRT") {
      // Remove MikroTik-specific steps and add OpenWRT steps
      const owrtSteps = await createOpenWRTSteps();
      // console.log('Adding OpenWRT steps:', owrtSteps); // Debug log

      // Create new array with firmware and all OpenWRT steps
      const newSteps = [
        {
          id: 1,
          title: $localize`Firmware`,
          component: FirmwareStep,
          isComplete: firmwareStepComplete, // Preserve completion status
        },
        ...owrtSteps,
      ];

      // Only update if structure changes
      const hasStructureChanged =
        steps.value.length !== newSteps.length ||
        steps.value.some((s, i) => s.title !== newSteps[i]?.title);

      if (hasStructureChanged) {
        steps.value = newSteps;
        stepperKey.value++; // Force re-render when structure changes
      } else {
        steps.value = newSteps; // keep reference update for isComplete flags
      }

      // Reset active step to firmware if we're beyond the new step count
      if (activeStep.value >= newSteps.length) {
        activeStep.value = 0;
      }

      // console.log('Steps after OpenWRT selection:', steps.value.length, 'steps'); // Debug log
      // console.log('Step titles:', steps.value.map(s => s.title)); // Debug log
    } else if (selectedFirmware === "MikroTik") {
      // Preserve additional step completion statuses
      const setupModeStepComplete =
        steps.value.find((step) => step.title === $localize`Setup Mode`)
          ?.isComplete || false;
      const wanLinkStepComplete =
        steps.value.find((step) => step.title === $localize`WAN Link Type`)
          ?.isComplete || false;
      const routerModelStepComplete =
        steps.value.find((step) => step.title === $localize`Router Model`)
          ?.isComplete || false;

      // If RouterMode exists in context, it should be considered complete
      const routerModeComplete = routerModeStepComplete || Boolean(selectedRouterMode);
      
      // Restore MikroTik steps if user switches back from OpenWRT
      const mikrotikSteps = await createMikroTikSteps(routerModeComplete);
      // console.log('Adding MikroTik steps:', mikrotikSteps); // Debug log

      // Update completion statuses for preserved steps
      const setupModeStep = mikrotikSteps.find(
        (step) => step.title === $localize`Setup Mode`,
      );
      if (setupModeStep) {
        setupModeStep.isComplete = setupModeStepComplete;
      }
      
      const wanLinkStep = mikrotikSteps.find(
        (step) => step.title === $localize`WAN Link Type`,
      );
      if (wanLinkStep) {
        wanLinkStep.isComplete = wanLinkStepComplete;
      }
      
      const routerModelStep = mikrotikSteps.find(
        (step) => step.title === $localize`Router Model`,
      );
      if (routerModelStep) {
        routerModelStep.isComplete = routerModelStepComplete;
      }

      // Update RouterMode step completion status
      const routerModeStep = mikrotikSteps.find(
        (step) => step.title === $localize`Router Mode`,
      );
      if (routerModeStep) {
        routerModeStep.isComplete = routerModeComplete;
      }

      // Create new array with firmware and MikroTik steps
      const newSteps = [
        {
          id: 1,
          title: $localize`Firmware`,
          component: FirmwareStep,
          isComplete: firmwareStepComplete, // Preserve completion status
        },
        ...mikrotikSteps,
      ];

      // Only update if structure changes
      const mikrotikStructureChanged =
        steps.value.length !== newSteps.length ||
        steps.value.some((s, i) => s.title !== newSteps[i]?.title);

      if (mikrotikStructureChanged) {
        steps.value = newSteps;
        stepperKey.value++; // Force re-render when changed
      } else {
        steps.value = newSteps;
      }

      // If RouterMode is complete with Trunk Mode, navigate to Slave Router step (only in advance mode)
      const routerModeJustCompleted = !routerModeStepComplete && Boolean(selectedRouterMode);
      if (selectedMode === "advance" && routerModeJustCompleted && selectedRouterMode === "Trunk Mode") {
        const slaveRouterIndex = newSteps.findIndex(
          (step) => step.title === $localize`Slave Router`,
        );
        if (slaveRouterIndex !== -1) {
          activeStep.value = slaveRouterIndex;
        }
      } else if (activeStep.value >= newSteps.length) {
        // Reset active step if we're beyond the new step count
        activeStep.value = 0;
      }

      // console.log('Steps after MikroTik selection:', steps.value.length, 'steps'); // Debug log
      // console.log('Step titles:', steps.value.map(s => s.title)); // Debug log
    }
  });

  // Watch for OpenWRT option changes and rebuild steps
  useTask$(async ({ track }) => {
    const selectedFirmware = starContext.state.Choose.Firmware;
    const currentOpenWRTOption = track(() => openWRTOption.value);

    // Only rebuild steps if firmware is OpenWRT and option has changed
    if (selectedFirmware === "OpenWRT" && currentOpenWRTOption) {
      // console.log('=== OPENWRT OPTION CHANGE DETECTED ==='); // Debug log
      // console.log('OpenWRT option changed to:', currentOpenWRTOption); // Debug log

      // Preserve the firmware step completion status
      const firmwareStepComplete =
        steps.value.find((step) => step.id === 1)?.isComplete || false;

      const owrtSteps = await createOpenWRTSteps();
      // console.log('Rebuilding OpenWRT steps:', owrtSteps); // Debug log

      // Create new array with firmware and updated OpenWRT steps
      const newSteps = [
        {
          id: 1,
          title: $localize`Firmware`,
          component: FirmwareStep,
          isComplete: firmwareStepComplete, // Preserve completion status
        },
        ...owrtSteps,
      ];

      // Determine if the step structure actually changes
      const hasStructureChanged =
        steps.value.length !== newSteps.length ||
        steps.value.some((s, i) => s.title !== newSteps[i]?.title);

      if (hasStructureChanged) {
        steps.value = newSteps;
        stepperKey.value++; // Force re-render only when structure changes
      } else {
        // Just update completion statuses without full re-render
        steps.value = steps.value.map((step) => {
          const match = newSteps.find((ns) => ns.id === step.id);
          return match ? { ...step, isComplete: match.isComplete } : step;
        });
      }

      // console.log('Steps after OpenWRT option change:', steps.value.length, 'steps'); // Debug log
      // console.log('Step titles:', steps.value.map(s => s.title)); // Debug log
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
        key={`stepper-${stepperKey.value}-${steps.value.length}-${steps.value.map((s) => s.id).join("-")}`}
        steps={steps.value}
        activeStep={activeStep.value}
        onStepComplete$={handleStepComplete}
        onStepChange$={(id: number) => {
          const stepIndex = steps.value.findIndex((step) => step.id === id);
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
