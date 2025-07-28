import { component$ } from "@builder.io/qwik";
import {
  SimpleTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "~/components/Core/DataDisplay/Table";

export default component$(() => {
  return (
    <div>
      <h3 class="mb-2 text-sm font-medium">
        Accessible Table with Caption and ARIA attributes
      </h3>
      <SimpleTable
        caption="Quarterly Sales Report by Region"
        id="quarterly-sales"
      >
        <caption class="mb-2 text-left text-sm font-medium">
          Quarterly Sales Report by Region (2025 Q1)
        </caption>
        <TableHead>
          <TableRow>
            <TableCell isHeader={true} scope="col">
              Region
            </TableCell>
            <TableCell isHeader={true} scope="col" align="right">
              January
            </TableCell>
            <TableCell isHeader={true} scope="col" align="right">
              February
            </TableCell>
            <TableCell isHeader={true} scope="col" align="right">
              March
            </TableCell>
            <TableCell isHeader={true} scope="col" align="right">
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell isHeader={true} scope="row">
              North America
            </TableCell>
            <TableCell align="right">$42,500</TableCell>
            <TableCell align="right">$50,200</TableCell>
            <TableCell align="right">$61,500</TableCell>
            <TableCell align="right">$154,200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader={true} scope="row">
              Europe
            </TableCell>
            <TableCell align="right">$38,200</TableCell>
            <TableCell align="right">$42,800</TableCell>
            <TableCell align="right">$48,300</TableCell>
            <TableCell align="right">$129,300</TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader={true} scope="row">
              Asia Pacific
            </TableCell>
            <TableCell align="right">$31,400</TableCell>
            <TableCell align="right">$35,600</TableCell>
            <TableCell align="right">$42,700</TableCell>
            <TableCell align="right">$109,700</TableCell>
          </TableRow>
          <TableRow>
            <TableCell isHeader={true} scope="row">
              Latin America
            </TableCell>
            <TableCell align="right">$18,600</TableCell>
            <TableCell align="right">$22,500</TableCell>
            <TableCell align="right">$25,900</TableCell>
            <TableCell align="right">$67,000</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell isHeader={true} scope="row">
              Total
            </TableCell>
            <TableCell align="right">$130,700</TableCell>
            <TableCell align="right">$151,100</TableCell>
            <TableCell align="right">$178,400</TableCell>
            <TableCell align="right">$460,200</TableCell>
          </TableRow>
        </TableFooter>
      </SimpleTable>

      <div class="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <strong>Accessibility features:</strong>
        </p>
        <ul class="ml-4 list-inside list-disc space-y-1">
          <li>Descriptive caption element for screen readers</li>
          <li>Proper table header cells with scope attributes</li>
          <li>Row headers for each data row with scope="row"</li>
          <li>Consistent text alignment (right-aligned for numbers)</li>
          <li>
            Semantic table structure with thead, tbody, and tfoot elements
          </li>
          <li>Sufficient color contrast between text and background</li>
        </ul>
      </div>
    </div>
  );
});
