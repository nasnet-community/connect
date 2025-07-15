import { $, component$, useContext, useSignal, type PropFunction } from "@builder.io/qwik";
import { track } from "@vercel/analytics";
import { LuGlobe, LuGlobe2 } from "@qwikest/icons/lucide";
import { StarContext } from "../../StarContext/StarContext";
import { OptionCard } from "./OptionCard";
import { NetworkTopologyGraph } from "./NetworkTopologyGraph";
import {
  domesticNetworkNodes,
  domesticNetworkConnections,
  foreignNetworkNodes,
  foreignNetworkConnections,
} from "./networkData";

interface DomesticProps {
  isComplete?: boolean;
  onComplete$?: PropFunction<() => void>;
}

export const DomesticWAN = component$((props: DomesticProps) => {
  const starContext = useContext(StarContext);
  const hasDomesticLink = starContext.state.Choose.DomesticLink;
  const hasUserSelected = useSignal(false);

  const handleDomesticSelect = $((hasDomestic: boolean) => {
    // Track domestic WAN selection
    track("domestic_wan_selected", {
      has_domestic_link: hasDomestic,
      configuration_type: hasDomestic ? "with_domestic" : "without_domestic",
      step: "choose"
    });

    starContext.updateChoose$({
      DomesticLink: hasDomestic,
    });
    hasUserSelected.value = true;
    props.onComplete$?.();
  });

  const options = [
    {
      value: true,
      icon: <LuGlobe class="h-8 w-8" />,
      title: $localize`With Domestic Link`,
      description: $localize`Optimized routing with domestic link separation`,
      features: [
        $localize`Separate domestic and international traffic`,
        $localize`Optimized routing for local content`,
        $localize`Faster access to domestic services`,
        $localize`Better overall connection stability`,
      ],
      trafficGraph: (
        <div class="domestic-option mt-6">
          <NetworkTopologyGraph 
            nodes={domesticNetworkNodes}
            connections={domesticNetworkConnections}
            title={$localize`Domestic Network Topology`}
          />
        </div>
      ),
    },
    {
      value: false,
      icon: <LuGlobe2 class="h-8 w-8" />,
      title: $localize`Without Domestic Link`,
      description: $localize`Standard routing for all traffic through a single WAN`,
      features: [
        $localize`All traffic routed through foreign WAN`,
        $localize`Simplified configuration with single connection`,
        $localize`Both domestic and international sites accessible`,
        $localize`Suitable for general use cases`,
      ],
      trafficGraph: (
        <div class="foreign-option">
          <NetworkTopologyGraph 
            nodes={foreignNetworkNodes}
            connections={foreignNetworkConnections}
            title={$localize`Foreign Network Topology`}
            showDomesticLegend={false}
          />
        </div>
      ),
    },
  ];

  return (
    <div class="space-y-8">
      {/* Header section with title and description */}
      <div class="text-center">
        <h2 class="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
          {$localize`Domestic Link Configuration`}
        </h2>
        <p class="mx-auto mt-3 max-w-2xl text-text-secondary/90 dark:text-text-dark-secondary/95">
          {$localize`Choose whether you want to use domestic link separation for optimized routing`}
        </p>
      </div>

      {/* Options grid - displays the two network configuration choices */}
      <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
        {options.map((option) => (
          <OptionCard
            key={String(option.value)}
            value={option.value}
            isSelected={hasUserSelected.value && hasDomesticLink === option.value}
            icon={option.icon}
            title={option.title}
            description={option.description}
            features={option.features}
            graph={option.trafficGraph}
            onSelect$={handleDomesticSelect}
          />
        ))}
      </div>
      
      {/* Custom CSS for stacking z-indexes */}
      <style dangerouslySetInnerHTML={`
        /* Hide the foreign graph when domestic graph is expanded */
        body:has(.domestic-option .topology-container:hover) .foreign-option .network-graph {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        
        /* Add base z-index for all options in normal state */
        .domestic-option {
          z-index: 2;
        }
        
        .foreign-option {
          z-index: 1;
        }
      `} />
    </div>
  );
});
