import { component$ } from '@builder.io/qwik';
import { APIReferenceTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const tableProps = [
    {
      name: 'data',
      type: 'T[]',
      description: 'Array of data objects to render in the table (for data-driven mode).'
    },
    {
      name: 'columns',
      type: 'TableColumn<T>[]',
      description: 'Column definitions for data-driven mode.'
    },
    {
      name: 'caption',
      type: 'string',
      description: 'Table caption for accessibility.'
    },
    {
      name: 'responsive',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Makes the table responsive to container width.'
    },
    {
      name: 'variant',
      type: "'default' | 'bordered' | 'striped' | 'bordered-striped'",
      defaultValue: 'default',
      description: 'Visual style of the table.'
    },
    {
      name: 'size',
      type: "'sm' | 'md' | 'lg'",
      defaultValue: 'md',
      description: 'Controls the density and padding of table cells.'
    },
    {
      name: 'hoverable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Adds hover effects to table rows.'
    },
    {
      name: 'dense',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Makes the table more compact with reduced padding.'
    },
    {
      name: 'horizontalScroll',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Enables horizontal scrolling for tables that exceed container width.'
    },
    {
      name: 'stickyHeader',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Makes the table header stick to the top when scrolling.'
    },
    {
      name: 'height',
      type: 'string',
      description: 'Fixed height for the table with scrollable body.'
    },
    {
      name: 'sortState',
      type: 'Signal<SortState> | SortState',
      description: 'Current sort state with column and direction.'
    },
    {
      name: 'onSortChange$',
      type: 'QRL<(sortState: SortState) => void>',
      description: 'Handler called when sorting changes.'
    },
    {
      name: 'loading',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Shows a loading state for the table.'
    },
    {
      name: 'loadingContent',
      type: 'JSXChildren',
      description: 'Custom content to display when table is loading.'
    },
    {
      name: 'emptyContent',
      type: 'JSXChildren',
      description: 'Custom content to display when table has no data.'
    },
    {
      name: 'rowId',
      type: 'QRL<(row: T, index: number) => string>',
      description: 'Function to generate a unique ID for each row.'
    },
    {
      name: 'onRowClick$',
      type: 'QRL<(row: T, index: number, event: MouseEvent) => void>',
      description: 'Handler called when a row is clicked.'
    },
    {
      name: 'rowClass',
      type: 'QRL<(row: T, index: number) => string>',
      description: 'Function to generate CSS class names for rows.'
    },
    {
      name: 'getRowAriaLabel',
      type: 'QRL<(row: T, index: number) => string>',
      description: 'Function to generate ARIA labels for rows.'
    },
    {
      name: 'pagination',
      type: 'JSXChildren',
      description: 'Custom pagination component to display below the table.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes for the table wrapper.'
    },
    {
      name: 'tableClass',
      type: 'string',
      description: 'Additional CSS classes for the table element.'
    },
    {
      name: 'headerClass',
      type: 'string',
      description: 'Additional CSS classes for the table header.'
    },
    {
      name: 'bodyClass',
      type: 'string',
      description: 'Additional CSS classes for the table body.'
    },
    {
      name: 'id',
      type: 'string',
      description: 'The ID attribute for the table.'
    }
  ];

  const tableColumnProps = [
    {
      name: 'id',
      type: 'string',
      description: 'Unique identifier for the column.'
    },
    {
      name: 'header',
      type: 'string',
      description: 'Header text for the column.'
    },
    {
      name: 'description',
      type: 'string',
      description: 'Additional description for the column (often used for accessibility).'
    },
    {
      name: 'accessor',
      type: 'QRL<(row: T, index: number) => unknown>',
      description: 'Function to extract value from a row.'
    },
    {
      name: 'field',
      type: 'string',
      description: 'Object path to extract value (e.g., "user.profile.name").'
    },
    {
      name: 'renderCell',
      type: 'QRL<(value: unknown, row: T, index: number) => JSXChildren>',
      description: 'Custom renderer for cell content.'
    },
    {
      name: 'renderHeader',
      type: 'QRL<(column: TableColumn<T>) => JSXChildren>',
      description: 'Custom renderer for the column header.'
    },
    {
      name: 'width',
      type: 'string',
      description: 'CSS width value for the column.'
    },
    {
      name: 'minWidth',
      type: 'string',
      description: 'CSS min-width value for the column.'
    },
    {
      name: 'maxWidth',
      type: 'string',
      description: 'CSS max-width value for the column.'
    },
    {
      name: 'sortable',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether the column is sortable.'
    },
    {
      name: 'truncate',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to truncate overflowing text with an ellipsis.'
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right'",
      defaultValue: 'left',
      description: 'Text alignment for the column.'
    },
    {
      name: 'fixed',
      type: "'left' | 'right'",
      description: 'Makes the column stick to the left or right (for horizontal scrolling).'
    },
    {
      name: 'hideOn',
      type: '{ sm?: boolean; md?: boolean; lg?: boolean; }',
      description: 'Responsive hiding of the column based on breakpoints.'
    },
    {
      name: 'headerClass',
      type: 'string',
      description: 'Additional CSS classes for the column header.'
    },
    {
      name: 'cellClass',
      type: 'string',
      description: 'Additional CSS classes for cells in this column.'
    }
  ];

  const tableCellProps = [
    {
      name: 'children',
      type: 'JSXChildren',
      description: 'Content of the cell.'
    },
    {
      name: 'variant',
      type: "'td' | 'th'",
      defaultValue: 'td',
      description: 'Cell type (data or header).'
    },
    {
      name: 'align',
      type: "'left' | 'center' | 'right'",
      defaultValue: 'left',
      description: 'Text alignment for the cell.'
    },
    {
      name: 'colSpan',
      type: 'number',
      description: 'Number of columns the cell spans.'
    },
    {
      name: 'rowSpan',
      type: 'number',
      description: 'Number of rows the cell spans.'
    },
    {
      name: 'width',
      type: 'string',
      description: 'CSS width value for the cell.'
    },
    {
      name: 'truncate',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Whether to truncate overflowing text with an ellipsis.'
    },
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes for the cell.'
    },
    {
      name: 'scope',
      type: "'col' | 'row' | 'rowgroup' | 'colgroup'",
      description: 'Defines the cells that the header cell relates to (for accessibility).'
    }
  ];

  return (
    <APIReferenceTemplate props={tableProps}>
      <p>
        The Table component family consists of several subcomponents that work together
        to create flexible and accessible tables. The design allows for both manual 
        structure creation and data-driven rendering approaches.
      </p>
      
      <h3 class="text-lg font-semibold mt-8 mb-2">TableColumn Props</h3>
      <p class="mb-4">
        When using the data-driven approach, you need to define columns with these properties:
      </p>
      <APIReferenceTemplate props={tableColumnProps} />
      
      <h3 class="text-lg font-semibold mt-8 mb-2">TableCell Props</h3>
      <APIReferenceTemplate props={tableCellProps} />
      
      <h3 class="text-lg font-semibold mt-8 mb-2">Component Exports</h3>
      <p class="mb-2">The Table module exports the following components and utilities:</p>
      <ul class="list-disc list-inside ml-4 mb-4">
        <li><code>Table</code> - Main table component</li>
        <li><code>TableHead</code> - Container for table header rows</li>
        <li><code>TableBody</code> - Container for table body rows</li>
        <li><code>TableRow</code> - Table row component</li>
        <li><code>TableCell</code> - Table cell component (td or th)</li>
        <li><code>TableFooter</code> - Container for table footer rows</li>
        <li><code>useTable</code> - Hook for custom table implementations</li>
        <li><code>getCellValue</code> - Helper function to extract cell values</li>
        <li><code>getValueByPath</code> - Helper function to extract nested object values</li>
      </ul>
      
      <h3 class="text-lg font-semibold mt-8 mb-2">Type Definitions</h3>
      <p class="mb-2">Key type definitions exported by the Table module:</p>
      <ul class="list-disc list-inside ml-4 mb-4">
        <li><code>TableProps</code> - Props for the Table component</li>
        <li><code>TableColumn</code> - Column definition for data-driven tables</li>
        <li><code>TableSize</code> - Size options: 'sm' | 'md' | 'lg'</li>
        <li><code>TableVariant</code> - Style variants: 'default' | 'bordered' | 'striped' | 'bordered-striped'</li>
        <li><code>TableCellAlign</code> - Cell alignment options: 'left' | 'center' | 'right'</li>
        <li><code>SortDirection</code> - Sort direction: 'asc' | 'desc' | 'none'</li>
        <li><code>SortState</code> - Current sort state with column and direction</li>
      </ul>
    </APIReferenceTemplate>
  );
});
