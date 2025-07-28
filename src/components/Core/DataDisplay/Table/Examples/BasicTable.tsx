import { component$ } from "@builder.io/qwik";
import {
  SimpleTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
} from "~/components/Core/DataDisplay/Table";

export const BasicTable = component$(() => {
  return (
    <SimpleTable>
      <TableHead>
        <TableRow>
          <TableCell isHeader={true}>Name</TableCell>
          <TableCell isHeader={true}>Role</TableCell>
          <TableCell isHeader={true}>Department</TableCell>
          <TableCell isHeader={true}>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>Software Engineer</TableCell>
          <TableCell>Engineering</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>Product Manager</TableCell>
          <TableCell>Product</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Mike Johnson</TableCell>
          <TableCell>Designer</TableCell>
          <TableCell>Design</TableCell>
          <TableCell>On Leave</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Sarah Williams</TableCell>
          <TableCell>Marketing Specialist</TableCell>
          <TableCell>Marketing</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>
            <div class="flex items-center justify-between">
              <div>4 employees</div>
              <div>Page 1 of 1</div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </SimpleTable>
  );
});
