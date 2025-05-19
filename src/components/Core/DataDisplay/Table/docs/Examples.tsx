import { component$ } from '@builder.io/qwik';
import { ExamplesTemplate } from '~/components/Docs/templates';

// Import examples
import { BasicTable } from '../Examples/BasicTable';
import { TableVariants } from '../Examples/TableVariants';
import { TableSizesAndSorting } from '../Examples/TableSizesAndSorting';
import DataDrivenTable from '../Examples/DataDrivenTable';
import ResponsiveAndStickyTable from '../Examples/ResponsiveAndStickyTable';
import AccessibleTable from '../Examples/AccessibleTable';

export default component$(() => {
  const examples = [
    {
      title: 'Basic Table',
      description: 'A simple table structure with headers, body, and footer.',
      component: <BasicTable />
    },
    {
      title: 'Table Variants',
      description: 'Different visual styles for tables: default, bordered, striped, and bordered-striped.',
      component: <TableVariants />
    },
    {
      title: 'Table Sizes and Sorting',
      description: 'Tables with different sizes (sm, md, lg) and interactive sorting capability.',
      component: <TableSizesAndSorting />
    },
    {
      title: 'Data-Driven Table',
      description: 'Rendering tables from data objects and column definitions with custom cell rendering.',
      component: <DataDrivenTable />
    },
    {
      title: 'Responsive and Sticky Tables',
      description: 'Tables with horizontal scrolling for responsive layouts and sticky headers for large datasets.',
      component: <ResponsiveAndStickyTable />
    },
    {
      title: 'Accessible Table',
      description: 'Table implementing best practices for accessibility with proper ARIA attributes.',
      component: <AccessibleTable />
    }
  ];

  return (
    <ExamplesTemplate examples={examples}>
      <p>
        The Table component provides a flexible system for displaying tabular data. It supports both
        manual table structure creation and data-driven rendering. These examples showcase the various
        features and configurations available to tailor tables to your specific needs.
      </p>
    </ExamplesTemplate>
  );
});
