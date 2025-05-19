import { component$ } from '@builder.io/qwik';
import { UsageTemplate } from '~/components/Docs/templates';

export default component$(() => {
  const doSection = [
    {
      title: 'Use semantic table structures',
      description: `Use proper table elements (TableHead, TableBody, TableFooter) to ensure your tables are semantically correct. This improves accessibility and makes the content more understandable for screen readers.`,
      code: `<!-- Good: Using semantic table structure -->
<Table>
  <TableHead>
    <TableRow>
      <TableCell variant="th">Name</TableCell>
      <TableCell variant="th">Role</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Developer</TableCell>
    </TableRow>
  </TableBody>
</Table>`
    },
    {
      title: 'Include proper ARIA attributes',
      description: 'Add appropriate ARIA attributes, especially for complex tables. For data tables, use caption, scope attributes for header cells, and ensure good labeling.',
      code: `<!-- Good: Using proper ARIA attributes -->
<Table caption="Employee Directory">
  <caption>Employee Directory - Q2 2025</caption>
  <TableHead>
    <TableRow>
      <TableCell variant="th" scope="col">Name</TableCell>
      <TableCell variant="th" scope="col">Department</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell variant="th" scope="row">John Doe</TableCell>
      <TableCell>Engineering</TableCell>
    </TableRow>
  </TableBody>
</Table>`
    },
    {
      title: 'Use data-driven tables for dynamic data',
      description: 'For data that comes from an API or is otherwise dynamic, use the data-driven approach with columns configuration.',
      code: `// Good: Using data-driven approach for dynamic data
const columns = [
  {
    id: 'name',
    header: 'Name',
    field: 'name',
    sortable: true
  },
  {
    id: 'role',
    header: 'Role',
    field: 'role'
  }
];

const data = [
  { id: 1, name: 'John Doe', role: 'Developer' },
  { id: 2, name: 'Jane Smith', role: 'Designer' }
];

<Table 
  data={data}
  columns={columns}
  sortState={sortState}
  onSortChange$={(newState) => sortState.value = newState}
/>`
    },
    {
      title: 'Use responsive tables for mobile experiences',
      description: 'Enable horizontal scroll or use responsive techniques for tables that need to display a lot of columns on smaller screens.',
      code: `<!-- Good: Making tables responsive -->
<Table horizontalScroll responsive>
  <!-- Table content here -->
</Table>`
    }
  ];

  const dontSection = [
    {
      title: "Don't nest tables unnecessarily",
      description: 'Avoid nesting tables within tables. This makes the markup more complex and can lead to accessibility issues.',
      code: `<!-- Bad: Nesting tables unnecessarily -->
<Table>
  <TableBody>
    <TableRow>
      <TableCell>
        <!-- Avoid nesting tables -->
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Nested content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>`
    },
    {
      title: "Don't use tables for layout purposes",
      description: 'Tables should only be used for tabular data, not for layout purposes. Use CSS grid, flexbox, or other layout techniques instead.',
      code: `<!-- Bad: Using tables for layout -->
<Table>
  <TableBody>
    <TableRow>
      <TableCell>
        <Button>Submit</Button>
      </TableCell>
      <TableCell>
        <Button variant="secondary">Cancel</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</Table>

<!-- Good: Using flexbox for layout -->
<div class="flex gap-4">
  <Button>Submit</Button>
  <Button variant="secondary">Cancel</Button>
</div>`
    },
    {
      title: "Don't skip table headers",
      description: 'Always include headers in your tables to provide context for each column. This is important for accessibility and usability.',
      code: `<!-- Bad: Table without headers -->
<Table>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Developer</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Jane Smith</TableCell>
      <TableCell>Designer</TableCell>
    </TableRow>
  </TableBody>
</Table>

<!-- Good: Table with proper headers -->
<Table>
  <TableHead>
    <TableRow>
      <TableCell variant="th">Name</TableCell>
      <TableCell variant="th">Role</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>John Doe</TableCell>
      <TableCell>Developer</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>Jane Smith</TableCell>
      <TableCell>Designer</TableCell>
    </TableRow>
  </TableBody>
</Table>`
    },
    {
      title: "Don't mix text alignment inconsistently",
      description: 'Be consistent with text alignment in columns. Generally, align text left, and numbers right.',
      code: `<!-- Bad: Inconsistent alignment -->
<Table>
  <TableHead>
    <TableRow>
      <TableCell variant="th">Product</TableCell>
      <TableCell variant="th" align="left">Price</TableCell>
      <TableCell variant="th" align="center">Quantity</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Laptop</TableCell>
      <TableCell align="center">$1,299</TableCell>
      <TableCell align="right">5</TableCell>
    </TableRow>
  </TableBody>
</Table>

<!-- Good: Consistent alignment -->
<Table>
  <TableHead>
    <TableRow>
      <TableCell variant="th">Product</TableCell>
      <TableCell variant="th" align="right">Price</TableCell>
      <TableCell variant="th" align="right">Quantity</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Laptop</TableCell>
      <TableCell align="right">$1,299</TableCell>
      <TableCell align="right">5</TableCell>
    </TableRow>
  </TableBody>
</Table>`
    }
  ];

  return (
    <UsageTemplate
      mainDescription="The Table component provides a powerful way to display tabular data with various styling options and features. Follow these guidelines to use it effectively and ensure your tables are accessible, responsive, and user-friendly."
      doSection={doSection}
      dontSection={dontSection}
      accessibilityDetails={[
        'Use proper table semantics with TableHead, TableBody, and TableFooter components.',
        'Include a caption element for complex tables to explain the table content.',
        'Use variant="th" with appropriate scope attributes ("col" for column headers, "row" for row headers).',
        'Ensure sufficient color contrast for all text in the table.',
        'Avoid using color alone to convey information in the table.',
        'For row selection, ensure there\'s a visible focus indicator and proper keyboard navigation.',
        'Ensure sorted tables announce their sorted state to screen readers.',
        'For tables with many columns, consider using stickyHeader to improve usability.'
      ]}
    >
      <h3 class="text-lg font-medium mt-6 mb-2">Table Best Practices</h3>
      <ul class="list-disc ml-6 mb-4 space-y-2">
        <li>
          <strong>Choose the right variant:</strong> Use the appropriate table variant based on your data density and visual needs. 
          For dense data, consider using the "bordered" or "bordered-striped" variant to help users track rows.
        </li>
        <li>
          <strong>Responsive considerations:</strong> For tables with many columns, use the horizontalScroll prop and consider 
          which columns to hide on smaller screens using the column's hideOn property.
        </li>
        <li>
          <strong>Sorting implementation:</strong> When implementing sorting, maintain the current sort state in your 
          component state and pass it to the Table component. This allows you to persist sorting across renders and 
          integrate with server-side sorting if needed.
        </li>
        <li>
          <strong>Empty states:</strong> Always provide meaningful emptyContent to guide users when no data is available.
        </li>
        <li>
          <strong>Loading states:</strong> Use the loading prop with appropriate loadingContent to provide feedback during data fetching.
        </li>
      </ul>
      
      <h3 class="text-lg font-medium mt-6 mb-2">Common Table Patterns</h3>
      <ol class="list-decimal ml-6 mb-4 space-y-4">
        <li>
          <strong>Data presentation table:</strong> Focus on readability with appropriate column widths and text alignment.
        </li>
        <li>
          <strong>Interactive data table:</strong> Include sorting, row selection, and possibly inline actions.
        </li>
        <li>
          <strong>Master-detail table:</strong> Allow users to expand rows to see additional details.
        </li>
        <li>
          <strong>Dashboard tables:</strong> Keep these compact with the "dense" prop and focus on key metrics.
        </li>
        <li>
          <strong>Configuration tables:</strong> Include form elements within cells to allow inline editing of settings.
        </li>
      </ol>
    </UsageTemplate>
  );
});
