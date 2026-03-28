import { $, component$, useContext, type PropFunction } from "@builder.io/qwik";
import { LuCable, LuWifi, LuAlertCircle } from "@qwikest/icons/lucide";
import { track } from "@vercel/analytics";
import { StarContext } from "../../StarContext/StarContext";
import type { TrunkInterfaceType } from "../../StarContext/ChooseType";
import { routers } from "../RouterModel/Constants";
import { SelectionCard } from "../shared/SelectionCard";
import { SelectionStepSection } from "../shared/SelectionStepSection";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface InterfaceTypeProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const InterfaceType = component$((props: InterfaceTypeProps) => {
  const locale = useMessageLocale();
  const starContext = useContext(StarContext);

  // Check wireless capability for all selected routers
  const checkWirelessCapability = () => {
    const allRouters = starContext.state.Choose.RouterModels;
    const routersWithoutWifi = allRouters.filter((routerModel) => {
      const routerData = routers.find((r) => r.model === routerModel.Model);
      return (
        !routerData ||
        !routerData.isWireless ||
        !routerData.interfaces.Interfaces.wireless?.length
      );
    });
    return {
      hasWirelessCapability: routersWithoutWifi.length === 0,
      routersWithoutWifi: routersWithoutWifi,
    };
  };

  const wirelessCheck = checkWirelessCapability();

  const handleInterfaceTypeSelect = $((interfaceType: TrunkInterfaceType) => {
    // Prevent wireless selection if routers don't have wireless capability
    if (interfaceType === "wireless" && !wirelessCheck.hasWirelessCapability) {
      return;
    }

    // Track trunk interface type selection
    track("trunk_interface_type_selected", {
      interface_type: interfaceType,
      configuration: "trunk_mode",
      step: "choose",
    });

    // Store the interface type selection in context
    starContext.updateChoose$({
      TrunkInterfaceType: interfaceType,
    });

    // Complete the step to proceed to trunk interface configuration
    props.onComplete$?.();
  });

  const interfaceOptions = [
    {
      type: "wired" as TrunkInterfaceType,
      icon: <LuCable class="h-8 w-8" />,
      title: semanticMessages.star_interface_type_wired_title({}, { locale }),
      description: semanticMessages.star_interface_type_wired_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_interface_type_feature_performance(
          {},
          { locale },
        ),
        semanticMessages.star_interface_type_feature_latency({}, { locale }),
        semanticMessages.star_interface_type_feature_reliability(
          {},
          { locale },
        ),
        semanticMessages.star_interface_type_feature_wired_backbone(
          {},
          { locale },
        ),
      ],
      badge: semanticMessages.star_interface_type_wired_badge({}, { locale }),
      badgeClass:
        "bg-primary-500/15 text-primary-500 dark:bg-primary-500/25 dark:text-primary-400",
    },
    {
      type: "wireless" as TrunkInterfaceType,
      icon: <LuWifi class="h-8 w-8" />,
      title: semanticMessages.star_interface_type_wireless_title(
        {},
        { locale },
      ),
      description: semanticMessages.star_interface_type_wireless_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_interface_type_feature_cabling({}, { locale }),
        semanticMessages.star_interface_type_feature_deployment({}, { locale }),
        semanticMessages.star_interface_type_feature_support({}, { locale }),
        semanticMessages.star_interface_type_feature_bridging({}, { locale }),
      ],
    },
  ];

  return (
    <SelectionStepSection
      title={semanticMessages.star_interface_type_section_title({}, { locale })}
      description={semanticMessages.star_interface_type_section_description(
        {},
        { locale },
      )}
    >
      {/* Options grid */}
      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {interfaceOptions.map((option) => {
          const isWirelessDisabled =
            option.type === "wireless" && !wirelessCheck.hasWirelessCapability;
          const isSelected =
            starContext.state.Choose.TrunkInterfaceType === option.type;
          const badge = isWirelessDisabled ? (
            <div class="flex items-center gap-1 rounded-full bg-orange-500/15 px-3 py-1 dark:bg-orange-500/25">
              <LuAlertCircle class="h-3 w-3 text-orange-600 dark:text-orange-400" />
              <span class="text-xs font-medium text-orange-600 dark:text-orange-400">
                {semanticMessages.star_interface_type_no_wifi({}, { locale })}
              </span>
            </div>
          ) : option.badge && !isSelected ? (
            <div class={`rounded-full px-3 py-1 ${option.badgeClass}`}>
              <span class="text-xs font-medium">{option.badge}</span>
            </div>
          ) : undefined;

          return (
            <SelectionCard
              key={option.type}
              value={option.type}
              isSelected={isSelected && !isWirelessDisabled}
              testId={`trunk-interface-type-${option.type}`}
              icon={option.icon}
              title={option.title}
              description={option.description}
              features={option.features}
              onSelect$={handleInterfaceTypeSelect}
              disabled={isWirelessDisabled}
              badge={badge}
              bodyClass="p-6"
              headingClass="text-xl"
              featureTextClass="text-sm"
              class={
                isWirelessDisabled
                  ? "bg-gray-100 dark:bg-gray-800"
                  : "bg-surface/50 dark:bg-surface-dark/50"
              }
            />
          );
        })}
      </div>

      {/* Wireless capability warning */}
      {!wirelessCheck.hasWirelessCapability && (
        <div class="mx-auto mt-6 max-w-3xl rounded-xl border border-orange-200 bg-orange-50 p-4 dark:border-orange-900/30 dark:bg-orange-950/20">
          <div class="flex items-start gap-3">
            <LuAlertCircle class="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-600 dark:text-orange-400" />
            <div>
              <h4 class="mb-1 text-sm font-semibold text-orange-800 dark:text-orange-200">
                {semanticMessages.star_interface_type_warning_title(
                  {},
                  { locale },
                )}
              </h4>
              <p class="mb-2 text-sm text-orange-700 dark:text-orange-300">
                {semanticMessages.star_interface_type_warning_description(
                  {},
                  { locale },
                )}
              </p>
              <ul class="list-inside list-disc space-y-1 text-sm text-orange-700 dark:text-orange-300">
                {wirelessCheck.routersWithoutWifi.map((router) => (
                  <li key={router.Model}>{router.Model}</li>
                ))}
              </ul>
              <p class="mt-2 text-xs text-orange-600 dark:text-orange-400">
                {semanticMessages.star_interface_type_warning_fallback(
                  {},
                  { locale },
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </SelectionStepSection>
  );
});
