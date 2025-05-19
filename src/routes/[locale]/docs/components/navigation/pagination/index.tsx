import { component$ } from '@builder.io/qwik';
import { ComponentPage } from "~/components/Docs/ComponentPage";
import { 
  Overview, 
  Examples, 
  APIReference, 
  Usage, 
  Playground,
  componentIntegration,
  customization
} from '~/components/Core/Navigation/Pagination/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="Pagination"
      description="A component for navigating through pages of content or large datasets, providing users with intuitive controls to move between pages."
      Overview={Overview}
      Examples={Examples}
      APIReference={APIReference}
      Usage={Usage}
      Playground={Playground}
      ComponentIntegration={componentIntegration}
      Customization={customization}
      defaultTab="overview"
    />
  );
});
