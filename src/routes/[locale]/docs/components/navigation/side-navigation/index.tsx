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
} from '~/components/Core/Navigation/SideNavigation/docs';

export default component$(() => {
  return (
    <ComponentPage
      name="SideNavigation"
      description="A vertical navigation component for creating responsive sidebar menus with support for nested items, collapsible sections, and mobile adaptability."
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
