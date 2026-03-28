import { $, component$, useContext, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { LuGlobe, LuGlobe2, LuSettings } from "@qwikest/icons/lucide";
import { StarContext } from "../../StarContext/StarContext";
import { OptionCard } from "./OptionCard";
import { NetworkTopologyGraph } from "./NetworkTopologyGraph";
import { SelectionStepSection } from "../shared/SelectionStepSection";
import {
  domesticOnlyNetworkNodes,
  domesticOnlyNetworkConnections,
  foreignNetworkNodes,
  foreignNetworkConnections,
  bothLinksNetworkNodes,
  bothLinksNetworkConnections,
} from "./networkData";
import type { WANLinkType as WANLinkTypeEnum } from "../../StarContext/ChooseType";
import { semanticMessages, useMessageLocale } from "~/i18n/semantic";

interface WANLinkTypeProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const WANLinkType = component$((props: WANLinkTypeProps) => {
  const locale = useMessageLocale();
  const starContext = useContext(StarContext);
  const wanLinkType = starContext.state.Choose.WANLinkType;

  const handleWANLinkSelect = $((linkType: WANLinkTypeEnum) => {
    // Track WAN link selection
    track("wan_link_selected", {
      link_type: linkType,
      configuration_type: linkType,
      step: "choose",
    });

    starContext.updateChoose$({
      WANLinkType: linkType,
    });
    props.onComplete$?.();
  });

  const options = [
    {
      value: "domestic" as WANLinkTypeEnum,
      icon: <LuGlobe class="h-8 w-8" />,
      title: semanticMessages.star_wan_link_domestic_title({}, { locale }),
      description: semanticMessages.star_wan_link_domestic_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_wan_link_domestic_feature_uses_only(
          {},
          { locale },
        ),
        semanticMessages.star_wan_link_domestic_feature_optimized(
          {},
          { locale },
        ),
        semanticMessages.star_wan_link_domestic_feature_latency({}, { locale }),
        semanticMessages.star_wan_link_domestic_feature_limited({}, { locale }),
      ],
      trafficGraph: (
        <div class="domestic-only-option">
          <NetworkTopologyGraph
            nodes={domesticOnlyNetworkNodes}
            connections={domesticOnlyNetworkConnections}
            title={semanticMessages.star_wan_link_domestic_topology_title(
              {},
              { locale },
            )}
          />
        </div>
      ),
    },
    {
      value: "foreign" as WANLinkTypeEnum,
      icon: <LuGlobe2 class="h-8 w-8" />,
      title: semanticMessages.star_wan_link_foreign_title({}, { locale }),
      description: semanticMessages.star_wan_link_foreign_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_wan_link_foreign_feature_uses_only(
          {},
          { locale },
        ),
        semanticMessages.star_wan_link_foreign_feature_access({}, { locale }),
        semanticMessages.star_wan_link_foreign_feature_local_services(
          {},
          { locale },
        ),
        semanticMessages.star_wan_link_foreign_feature_connectivity(
          {},
          { locale },
        ),
      ],
      trafficGraph: (
        <div class="foreign-only-option">
          <NetworkTopologyGraph
            nodes={foreignNetworkNodes}
            connections={foreignNetworkConnections}
            title={semanticMessages.star_wan_link_foreign_topology_title(
              {},
              { locale },
            )}
            showDomesticLegend={false}
          />
        </div>
      ),
    },
    {
      value: "both" as WANLinkTypeEnum,
      icon: <LuSettings class="h-8 w-8" />,
      title: semanticMessages.star_wan_link_both_title({}, { locale }),
      description: semanticMessages.star_wan_link_both_description(
        {},
        { locale },
      ),
      features: [
        semanticMessages.star_wan_link_both_feature_routing({}, { locale }),
        semanticMessages.star_wan_link_both_feature_performance({}, { locale }),
        semanticMessages.star_wan_link_both_feature_failover({}, { locale }),
        semanticMessages.star_wan_link_both_feature_reliability({}, { locale }),
      ],
      trafficGraph: (
        <div class="both-links-option mt-6">
          <NetworkTopologyGraph
            nodes={bothLinksNetworkNodes}
            connections={bothLinksNetworkConnections}
            title={semanticMessages.star_wan_link_both_topology_title(
              {},
              { locale },
            )}
          />
        </div>
      ),
      isFullWidth: true,
    },
  ];

  return (
    <SelectionStepSection
      title={semanticMessages.star_wan_link_section_title({}, { locale })}
      description={semanticMessages.star_wan_link_section_description(
        {},
        { locale },
      )}
    >
      <div class="mx-auto max-w-5xl space-y-6">
        {/* First row - Two vertical cards side by side */}
        <div class="grid gap-6 md:grid-cols-2">
          {options.slice(0, 2).map((option) => (
            <OptionCard
              key={String(option.value)}
              value={option.value}
              isSelected={wanLinkType === option.value}
              testId={`wan-link-${option.value}`}
              icon={option.icon}
              title={option.title}
              description={option.description}
              features={option.features}
              graph={option.trafficGraph}
              onSelect$={handleWANLinkSelect}
            />
          ))}
        </div>

        {/* Second row - Full width card for "both" option */}
        <div class="grid gap-6">
          {options.slice(2).map((option) => (
            <OptionCard
              key={String(option.value)}
              value={option.value}
              isSelected={wanLinkType === option.value}
              testId={`wan-link-${option.value}`}
              icon={option.icon}
              title={option.title}
              description={option.description}
              features={option.features}
              graph={option.trafficGraph}
              onSelect$={handleWANLinkSelect}
              isHorizontal={true}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS for network graph interactions */}
      <style
        dangerouslySetInnerHTML={`
        /* Enhanced z-index management for topology graphs */
        .domestic-only-option,
        .foreign-only-option,
        .both-links-option {
          position: relative;
          z-index: 1;
        }

        .selection-card:has(.topology-container.overlay-open),
        .selection-card:has(.topology-container.overlay-open) .selection-card-media,
        .domestic-only-option:has(.topology-container.overlay-open),
        .foreign-only-option:has(.topology-container.overlay-open),
        .both-links-option:has(.topology-container.overlay-open) {
          position: relative;
          z-index: 9500 !important;
          isolation: isolate;
        }

        .selection-card:has(.topology-container.overlay-open) {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          transform: none !important;
        }

        body:has(.topology-container.overlay-open) .selection-card:not(:has(.topology-container.overlay-open)) {
          z-index: 0;
        }
        
        /* Hide other graphs when one is being hovered */
        body:has(.domestic-only-option .topology-container:hover) .foreign-only-option .network-graph,
        body:has(.domestic-only-option .topology-container:hover) .both-links-option .network-graph {
          opacity: 0.3 !important;
          transition: opacity 0.3s ease;
        }
        
        body:has(.foreign-only-option .topology-container:hover) .domestic-only-option .network-graph,
        body:has(.foreign-only-option .topology-container:hover) .both-links-option .network-graph {
          opacity: 0.3 !important;
          transition: opacity 0.3s ease;
        }
        
        body:has(.both-links-option .topology-container:hover) .domestic-only-option .network-graph,
        body:has(.both-links-option .topology-container:hover) .foreign-only-option .network-graph {
          opacity: 0.3 !important;
          transition: opacity 0.3s ease;
        }
      `}
      />
    </SelectionStepSection>
  );
});
