import { component$ } from '@builder.io/qwik';
import { 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableCell,
  TableFooter
} from '~/components/Core/DataDisplay/Table';

export default component$(() => {
  return (
    <div>
      <h3 class="text-sm font-medium mb-2">Accessible Table with Caption and ARIA attributes</h3>
      <Table
        caption="Quarterly Sales Report by Region"
        id="quarterly-sales"
      >
        <caption class="text-sm font-medium text-left mb-2">
          Quarterly Sales Report by Region (2025 Q1)
        </caption>
        <TableHead>
          <TableRow>
            <TableCell variant="th" scope="col">Region</TableCell>
            <TableCell variant="th" scope="col" align="right">January</TableCell>
            <TableCell variant="th" scope="col" align="right">February</TableCell>
            <TableCell variant="th" scope="col" align="right">March</TableCell>
            <TableCell variant="th" scope="col" align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell variant="th" scope="row">North America</TableCell>
            <TableCell align="right">$42,500</TableCell>
            <TableCell align="right">$50,200</TableCell>
            <TableCell align="right">$61,500</TableCell>
            <TableCell align="right">$154,200</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="th" scope="row">Europe</TableCell>
            <TableCell align="right">$38,200</TableCell>
            <TableCell align="right">$42,800</TableCell>
            <TableCell align="right">$48,300</TableCell>
            <TableCell align="right">$129,300</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="th" scope="row">Asia Pacific</TableCell>
            <TableCell align="right">$31,400</TableCell>
            <TableCell align="right">$35,600</TableCell>
            <TableCell align="right">$42,700</TableCell>
            <TableCell align="right">$109,700</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="th" scope="row">Latin America</TableCell>
            <TableCell align="right">$18,600</TableCell>
            <TableCell align="right">$22,500</TableCell>
            <TableCell align="right">$25,900</TableCell>
            <TableCell align="right">$67,000</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell variant="th" scope="row">Total</TableCell>
            <TableCell align="right">$130,700</TableCell>
            <TableCell align="right">$151,100</TableCell>
            <TableCell align="right">$178,400</TableCell>
            <TableCell align="right">$460,200</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      
      <div class="mt-4 text-sm space-y-2 text-gray-600 dark:text-gray-400">
        <p>
          <strong>Accessibility features:</strong>
        </p>
        <ul class="list-disc list-inside ml-4 space-y-1">
          <li>Descriptive caption element for screen readers</li>
          <li>Proper table header cells with scope attributes</li>
          <li>Row headers for each data row with scope="row"</li>
          <li>Consistent text alignment (right-aligned for numbers)</li>
          <li>Semantic table structure with thead, tbody, and tfoot elements</li>
          <li>Sufficient color contrast between text and background</li>
        </ul>
      </div>
    </div>
  );
});
