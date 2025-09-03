import {
  $,
  component$,
  useContext,
  useSignal,
  type PropFunction,
} from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { LuGlobe, LuGlobe2, LuSettings } from "@qwikest/icons/lucide";
import { StarContext } from "../../StarContext/StarContext";
import { OptionCard } from "./OptionCard";
import { NetworkTopologyGraph } from "./NetworkTopologyGraph";
import {
  domesticOnlyNetworkNodes,
  domesticOnlyNetworkConnections,
  foreignNetworkNodes,
  foreignNetworkConnections,
  bothLinksNetworkNodes,
  bothLinksNetworkConnections,
} from "./networkData";
import type { WANLinkType } from "../../StarContext/ChooseType";

interface DomesticProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const DomesticWAN = component$((props: DomesticProps) => {
  const starContext = useContext(StarContext);
  const wanLinkType = starContext.state.Choose.WANLinkType;
  const hasUserSelected = useSignal(false);

  const handleWANLinkSelect = $((linkType: WANLinkType) => {
    // Track WAN link selection
    track("wan_link_selected", {
      link_type: linkType,
      configuration_type: linkType,
      step: "choose",
    });

    starContext.updateChoose$({
      WANLinkType: linkType,
    });
    hasUserSelected.value = true;
    props.onComplete$?.();
  });

  const options = [
    {
      value: "domestic-only" as WANLinkType,
      icon: <LuGlobe class="h-8 w-8" />,
      title: $localize`I only have Domestic Link`,
      description: $localize`Connect using only domestic internet connection`,
      features: [
        $localize`Uses only domestic internet connection`,
        $localize`Optimized for local content and services`,
        $localize`Lower latency for domestic websites`,
        $localize`May have limited access to some foreign content`,
      ],
      trafficGraph: (
        <div class="domestic-only-option mt-6">
          <NetworkTopologyGraph
            nodes={domesticOnlyNetworkNodes}
            connections={domesticOnlyNetworkConnections}
            title={$localize`Domestic Only Network`}
          />
        </div>
      ),
    },
    {
      value: "foreign-only" as WANLinkType,
      icon: <LuGlobe2 class="h-8 w-8" />,
      title: $localize`I only have Foreign Link`,
      description: $localize`Connect using only foreign internet connection`,
      features: [
        $localize`Uses only foreign internet connection`,
        $localize`Access to both domestic and international content`,
        $localize`May have slower access to local services`,
        $localize`Suitable for international connectivity`,
      ],
      trafficGraph: (
        <div class="foreign-only-option mt-6">
          <NetworkTopologyGraph
            nodes={foreignNetworkNodes}
            connections={foreignNetworkConnections}
            title={$localize`Foreign Only Network`}
            showDomesticLegend={false}
          />
        </div>
      ),
    },
    {
      value: "both" as WANLinkType,
      icon: <LuSettings class="h-8 w-8" />,
      title: $localize`I have both`,
      description: $localize`Optimal routing with both domestic and foreign connections`,
      features: [
        $localize`Intelligent traffic routing based on destination`,
        $localize`Best performance for both local and international content`,
        $localize`Automatic failover between connections`,
        $localize`Maximum reliability and flexibility`,
      ],
      trafficGraph: (
        <div class="both-links-option mt-6">
          <NetworkTopologyGraph
            nodes={bothLinksNetworkNodes}
            connections={bothLinksNetworkConnections}
            title={$localize`Dual-WAN Network Topology`}
          />
        </div>
      ),
      isFullWidth: true,
    },
  ];

  return (
    <div class="space-y-8">
      {/* Header section with title and description */}
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`WAN Link Configuration`}
        </h2>
        <p class="text-text-secondary/90 dark:text-text-dark-secondary/95 mx-auto mt-3 max-w-2xl">
          {$localize`Choose your internet connection setup for optimal routing`}
        </p>
      </div>

      <div class="mx-auto max-w-5xl space-y-6">
        {/* First row - Two vertical cards side by side */}
        <div class="grid gap-6 md:grid-cols-2">
          {options.slice(0, 2).map((option) => (
            <OptionCard
              key={String(option.value)}
              value={option.value}
              isSelected={hasUserSelected.value && wanLinkType === option.value}
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
              isSelected={hasUserSelected.value && wanLinkType === option.value}
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
    </div>
  );
});
