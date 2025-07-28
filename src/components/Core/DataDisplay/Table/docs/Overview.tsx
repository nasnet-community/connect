import { component$ } from "@builder.io/qwik";
import { OverviewTemplate } from "~/components/Docs/templates";
import {
  SimpleTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "../index";

export default component$(() => {
  // Sample data for the demo table
  const sampleData = [
    {
      id: 1,
      name: "Jane Cooper",
      email: "jane@example.com",
      role: "Developer",
      status: "Active",
    },
    {
      id: 2,
      name: "Michael Scott",
      email: "michael@example.com",
      role: "Manager",
      status: "Active",
    },
    {
      id: 3,
      name: "Ada Lovelace",
      email: "ada@example.com",
      role: "Engineer",
      status: "On Leave",
    },
  ];

  return (
    <OverviewTemplate
      title="Table"
      description="A component for displaying and organizing data in rows and columns."
      importStatement="import { Table, TableHead, TableBody, TableRow, TableCell, TableFooter } from '~/components/Core/DataDisplay/Table';"
      features={[
        "Multiple style variants (default, bordered, striped, bordered-striped)",
        "Support for manual table structure or data-driven rendering",
        "Sorting capabilities for columns",
        "Responsive tables with horizontal scrolling",
        "Sticky headers for better usability with large datasets",
        "Customizable cell alignment and column widths",
        "Support for pagination integration",
        "Loading and empty states",
        "Accessible with proper ARIA attributes",
      ]}
    >
      <div class="overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-700">
        <SimpleTable hoverable>
          <TableHead>
            <TableRow>
              <TableCell isHeader={true} align="left">
                Name
              </TableCell>
              <TableCell isHeader={true} align="left">
                Email
              </TableCell>
              <TableCell isHeader={true} align="left">
                Role
              </TableCell>
              <TableCell isHeader={true} align="center">
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.name}</TableCell>
                <TableCell>{person.email}</TableCell>
                <TableCell>{person.role}</TableCell>
                <TableCell align="center">
                  <span
                    class={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      person.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                    }`}
                  >
                    {person.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>
                <div class="flex items-center justify-between px-2 py-1">
                  <span class="text-sm text-neutral-500 dark:text-neutral-400">
                    Showing 3 of 3 entries
                  </span>
                  <div class="flex items-center gap-2">
                    <button
                      class="rounded-md bg-neutral-100 px-3 py-1 text-sm disabled:opacity-50 dark:bg-neutral-800"
                      disabled
                    >
                      Previous
                    </button>
                    <button
                      class="rounded-md bg-neutral-100 px-3 py-1 text-sm disabled:opacity-50 dark:bg-neutral-800"
                      disabled
                    >
                      Next
                    </button>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </SimpleTable>
      </div>
    </OverviewTemplate>
  );
});
