import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { ComponentPage } from '~/components/Docs/ComponentPage';
import { componentIntegration, customization } from '~/components/Core/Navigation/TopNavigation/docs';

export const useTopNavigationData = routeLoader$(async () => {
  return {
    title: 'TopNavigation',
    description: 'A horizontal navigation bar typically positioned at the top of a website or application.',
    componentIntegration,
    customization
  };
});

export default component$(() => {
  const data = useTopNavigationData();

  return (
    <ComponentPage
      title={data.value.title}
      description={data.value.description}
      componentIntegration={data.value.componentIntegration}
      customization={data.value.customization}
    />
  );
});
