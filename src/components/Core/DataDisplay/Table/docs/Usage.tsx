import { component$ } from "@builder.io/qwik";
import { UsageTemplate } from "~/components/Docs/templates";

export default component$(() => {
  const doSection = [
    {
      title: "Use semantic table structures",
      description: `Use proper table elements (TableHead, TableBody, TableFooter) to ensure your tables are semantically correct. This improves accessibility and makes the content more understandable for screen readers.`,
      code: `<!-- Good: Using semantic table structure -->
<SimpleTable>
  <SimpleTableHead>
    <SimpleTableRow>
      <SimpleTableCell isHeader={true}>Name</TableCell>
      <SimpleTableCell isHeader={true}>Role</TableCell>
    </TableRow>
  </TableHead>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell>John Doe</TableCell>
      <SimpleTableCell>Developer</TableCell>
    </TableRow>
  </TableBody>
</SimpleTable>`,
    },
    {
      title: "Include proper ARIA attributes",
      description:
        "Add appropriate ARIA attributes, especially for complex tables. For data tables, use caption, scope attributes for header cells, and ensure good labeling.",
      code: `<!-- Good: Using proper ARIA attributes -->
<SimpleTable caption="Employee Directory">
  <caption>Employee Directory - Q2 2025</caption>
  <SimpleTableHead>
    <SimpleTableRow>
      <SimpleTableCell isHeader={true} scope="col">Name</TableCell>
      <SimpleTableCell isHeader={true} scope="col">Department</TableCell>
    </TableRow>
  </TableHead>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell isHeader={true} scope="row">John Doe</TableCell>
      <SimpleTableCell>Engineering</TableCell>
    </TableRow>
  </TableBody>
</SimpleTable>`,
    },
    {
      title: "Use data-driven tables for dynamic data",
      description:
        "For data that comes from an API or is otherwise dynamic, use the data-driven approach with columns configuration.",
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

<SimpleTable 
  data={data}
  columns={columns}
  sortState={sortState}
  onSortChange$={(newState) => sortState.value = newState}
/>`,
    },
    {
      title: "Use responsive tables for mobile experiences",
      description:
        "Enable horizontal scroll or use responsive techniques for tables that need to display a lot of columns on smaller screens.",
      code: `<!-- Good: Making tables responsive -->
<SimpleTable horizontalScroll responsive>
  <!-- Table content here -->
</SimpleTable>`,
    },
  ];

  const dontSection = [
    {
      title: "Don't nest tables unnecessarily",
      description:
        "Avoid nesting tables within tables. This makes the markup more complex and can lead to accessibility issues.",
      code: `<!-- Bad: Nesting tables unnecessarily -->
<SimpleTable>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell>
        <!-- Avoid nesting tables -->
        <SimpleTable>
          <SimpleTableBody>
            <SimpleTableRow>
              <SimpleTableCell>Nested content</TableCell>
            </TableRow>
          </TableBody>
        </SimpleTable>
      </TableCell>
    </TableRow>
  </TableBody>
</SimpleTable>`,
    },
    {
      title: "Don't use tables for layout purposes",
      description:
        "Tables should only be used for tabular data, not for layout purposes. Use CSS grid, flexbox, or other layout techniques instead.",
      code: `<!-- Bad: Using tables for layout -->
<SimpleTable>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell>
        <Button>Submit</Button>
      </TableCell>
      <SimpleTableCell>
        <Button variant="secondary">Cancel</Button>
      </TableCell>
    </TableRow>
  </TableBody>
</SimpleTable>

<!-- Good: Using flexbox for layout -->
<div class="flex gap-4">
  <Button>Submit</Button>
  <Button variant="secondary">Cancel</Button>
</div>`,
    },
    {
      title: "Don't skip table headers",
      description:
        "Always include headers in your tables to provide context for each column. This is important for accessibility and usability.",
      code: `<!-- Bad: Table without headers -->
<SimpleTable>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell>John Doe</TableCell>
      <SimpleTableCell>Developer</TableCell>
    </TableRow>
    <SimpleTableRow>
      <SimpleTableCell>Jane Smith</TableCell>
      <SimpleTableCell>Designer</TableCell>
    </TableRow>
  </TableBody>
</SimpleTable>

<!-- Good: Table with proper headers -->
<SimpleTable>
  <SimpleTableHead>
    <SimpleTableRow>
      <SimpleTableCell isHeader={true}>Name</TableCell>
      <SimpleTableCell isHeader={true}>Role</TableCell>
    </TableRow>
  </TableHead>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell>John Doe</TableCell>
      <SimpleTableCell>Developer</TableCell>
    </TableRow>
    <SimpleTableRow>
      <SimpleTableCell>Jane Smith</TableCell>
      <SimpleTableCell>Designer</TableCell>
    </TableRow>
  </TableBody>
</SimpleTable>`,
    },
    {
      title: "Don't mix text alignment inconsistently",
      description:
        "Be consistent with text alignment in columns. Generally, align text left, and numbers right.",
      code: `<!-- Bad: Inconsistent alignment -->
<SimpleTable>
  <SimpleTableHead>
    <SimpleTableRow>
      <SimpleTableCell isHeader={true}>Product</TableCell>
      <SimpleTableCell isHeader={true} align="left">Price</TableCell>
      <SimpleTableCell isHeader={true} align="center">Quantity</TableCell>
    </TableRow>
  </TableHead>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell>Laptop</TableCell>
      <SimpleTableCell align="center">$1,299</TableCell>
      <SimpleTableCell align="right">5</TableCell>
    </TableRow>
  </TableBody>
</SimpleTable>

<!-- Good: Consistent alignment -->
<SimpleTable>
  <SimpleTableHead>
    <SimpleTableRow>
      <SimpleTableCell isHeader={true}>Product</TableCell>
      <SimpleTableCell isHeader={true} align="right">Price</TableCell>
      <SimpleTableCell isHeader={true} align="right">Quantity</TableCell>
    </TableRow>
  </TableHead>
  <SimpleTableBody>
    <SimpleTableRow>
      <SimpleTableCell>Laptop</TableCell>
      <SimpleTableCell align="right">$1,299</TableCell>
      <SimpleTableCell align="right">5</TableCell>
    </TableRow>
  </TableBody>
</SimpleTable>`,
    },
  ];

  return (
    <UsageTemplate
      guidelines={[
        ...doSection.map((item) => ({ ...item, type: "do" as const })),
        ...dontSection.map((item) => ({ ...item, type: "dont" as const })),
      ]}
      accessibilityTips={[
        {
          title: "Use proper table semantics",
          description:
            "Use proper table semantics with TableHead, TableBody, and TableFooter components.",
        },
        {
          title: "Include captions",
          description:
            "Include a caption element for complex tables to explain the table content.",
        },
        {
          title: "Use header attributes",
          description:
            'Use isHeader={true} with appropriate scope attributes ("col" for column headers, "row" for row headers).',
        },
        {
          title: "Ensure color contrast",
          description:
            "Ensure sufficient color contrast for all text in the table.",
        },
        {
          title: "Don't rely on color alone",
          description:
            "Avoid using color alone to convey information in the table.",
        },
        {
          title: "Focus indicators",
          description:
            "For row selection, ensure there's a visible focus indicator and proper keyboard navigation.",
        },
        {
          title: "Sorted state announcements",
          description:
            "Ensure sorted tables announce their sorted state to screen readers.",
        },
        {
          title: "Sticky headers",
          description:
            "For tables with many columns, consider using stickyHeader to improve usability.",
        },
      ]}
    >
      <h3 class="mb-2 mt-6 text-lg font-medium">Table Best Practices</h3>
      <ul class="mb-4 ml-6 list-disc space-y-2">
        <li>
          <strong>Choose the right variant:</strong> Use the appropriate table
          variant based on your data density and visual needs. For dense data,
          consider using the "bordered" or "bordered-striped" variant to help
          users track rows.
        </li>
        <li>
          <strong>Responsive considerations:</strong> For tables with many
          columns, use the horizontalScroll prop and consider which columns to
          hide on smaller screens using the column's hideOn property.
        </li>
        <li>
          <strong>Sorting implementation:</strong> When implementing sorting,
          maintain the current sort state in your component state and pass it to
          the Table component. This allows you to persist sorting across renders
          and integrate with server-side sorting if needed.
        </li>
        <li>
          <strong>Empty states:</strong> Always provide meaningful emptyContent
          to guide users when no data is available.
        </li>
        <li>
          <strong>Loading states:</strong> Use the loading prop with appropriate
          loadingContent to provide feedback during data fetching.
        </li>
      </ul>

      <h3 class="mb-2 mt-6 text-lg font-medium">Common Table Patterns</h3>
      <ol class="mb-4 ml-6 list-decimal space-y-4">
        <li>
          <strong>Data presentation table:</strong> Focus on readability with
          appropriate column widths and text alignment.
        </li>
        <li>
          <strong>Interactive data table:</strong> Include sorting, row
          selection, and possibly inline actions.
        </li>
        <li>
          <strong>Master-detail table:</strong> Allow users to expand rows to
          see additional details.
        </li>
        <li>
          <strong>Dashboard tables:</strong> Keep these compact with the "dense"
          prop and focus on key metrics.
        </li>
        <li>
          <strong>Configuration tables:</strong> Include form elements within
          cells to allow inline editing of settings.
        </li>
      </ol>
    </UsageTemplate>
  );
});
