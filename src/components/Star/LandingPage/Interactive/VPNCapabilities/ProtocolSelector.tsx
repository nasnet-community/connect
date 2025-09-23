import { component$, Signal } from "@builder.io/qwik";
import { Card, Badge } from "~/components/Core";
import { getIcon, type IconName } from "../../utils/iconMapper";

interface Protocol {
  id: string;
  name: string;
  icon: IconName;
  description: string;
  features: string[];
  color: string;
}

interface ProtocolSelectorProps {
  protocols: Protocol[];
  activeProtocol: Signal<string>;
}

export const ProtocolSelector = component$<ProtocolSelectorProps>(({ protocols, activeProtocol }) => {
  return (
    <div class="space-y-4">
      {protocols.map((protocol, index) => {
        const IconComponent = getIcon(protocol.icon);
        const protocolId = protocol.id;
        const protocolName = protocol.name;
        const protocolDescription = protocol.description;
        const protocolFeatures = protocol.features;
        const protocolColor = protocol.color;

        return (
          <Card
            key={protocolId}
            class={`
              group cursor-pointer transition-all duration-300 p-6
              ${activeProtocol.value === protocolId
                ? `bg-gradient-to-r ${protocolColor} bg-opacity-10 border-2 border-opacity-50`
                : 'bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 hover:border-white/40'
              }
              animate-fade-in-up
              ${index === 1 ? 'animation-delay-200' : ''}
              ${index === 2 ? 'animation-delay-500' : ''}
              ${index >= 3 ? 'animation-delay-1000' : ''}
            `}
            onClick$={() => activeProtocol.value = protocolId}
          >
            <div class="flex items-center gap-4">
              <div class={`w-12 h-12 rounded-xl bg-gradient-to-br ${protocolColor} flex items-center justify-center shadow-lg`}>
                <IconComponent class="h-6 w-6 text-white" />
              </div>

              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="text-lg font-bold text-gray-900 dark:text-white">
                    {protocolName}
                  </h3>
                  {activeProtocol.value === protocolId && (
                    <Badge color="success" size="sm" variant="solid">
                      {$localize`Active`}
                    </Badge>
                  )}
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {protocolDescription}
                </p>
                <div class="flex gap-2">
                  {protocolFeatures.map((feature, idx) => (
                    <span
                      key={idx}
                      class="px-2 py-1 text-xs font-medium bg-white/10 dark:bg-black/10 rounded-full border border-white/20 text-gray-700 dark:text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
});