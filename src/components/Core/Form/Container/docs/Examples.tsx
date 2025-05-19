import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate, type Example } from '~/components/Docs/templates';
import BasicContainer from '../Examples/BasicContainer';
import ContainerVariants from '../Examples/ContainerVariants';
import ContainerWithSlots from '../Examples/ContainerWithSlots';
import NestedContainers from '../Examples/NestedContainers';
import AccessibleContainer from '../Examples/AccessibleContainer';

/**
 * Container component examples documentation using the standard template
 */
export default component$(() => {
  const examples: Example[] = [
    {
      title: "Basic Container",
      description: "Basic usage of the Container component with and without title and description.",
      component: <BasicContainer />
    },
    {
      title: "Container Variants",
      description: "Different visual variants of the Container component including bordered and borderless styles.",
      component: <ContainerVariants />
    },
    {
      title: "Container with Slots",
      description: "Examples of using the default and footer slots to organize content and actions.",
      component: <ContainerWithSlots />
    },
    {
      title: "Nested Containers",
      description: "Creating organized hierarchical layouts using nested Container components.",
      component: <NestedContainers />
    },
    {
      title: "Accessible Container Usage",
      description: "Best practices for making Container components accessible to all users.",
      component: <AccessibleContainer />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Container component is a versatile way to organize form sections and provide
        visual structure to your forms. These examples demonstrate the different ways you
        can use and customize the Container component.
      </p>
      <p class="mt-2">
        From basic usage to complex nested layouts, the Container component adapts to a
        variety of form organization needs. The component's slots provide flexibility in
        structuring content and action areas.
      </p>
    </ExamplesTemplate>
  );
}); 