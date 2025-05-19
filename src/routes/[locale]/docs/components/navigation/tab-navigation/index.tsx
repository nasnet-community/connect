import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { ComponentPage } from '~/components/Docs/ComponentPage';
import { componentIntegration, customization } from '~/components/Core/Navigation/TabNavigation/docs';

export const useTabNavigationData = routeLoader$(async () => {
  return {
    title: 'TabNavigation',
    description: 'A component for organizing content into accessible, selectable tabs.',
    componentIntegration,
    customization
  };
});

export default component$(() => {
  const data = useTabNavigationData();

  return (
    <ComponentPage
      title={data.value.title}
      description={data.value.description}
      componentIntegration={data.value.componentIntegration}
      customization={data.value.customization}
    />
  );
});
