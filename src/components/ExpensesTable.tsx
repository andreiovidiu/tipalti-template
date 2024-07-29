import { ExpensesState } from "./ExpensesState";
import TableHead from "@mui/material/TableHead/TableHead";
import Table from "@mui/material/Table/Table";
import TableRow from "@mui/material/TableRow/TableRow";
import TableCell from "@mui/material/TableCell/TableCell";
import TableBody from "@mui/material/TableBody/TableBody";
import { observer } from "mobx-react";
import { ExpensesInfo } from "./ExpensesInfo";

export const ExpensesTable = observer(({ state }: { state: ExpensesState }) => {
  if (!state || state.isLoading) {
    return <p>Fetching data...</p>;
  }

  if (state.tableData.length == 0) {
    return <p>Could not find any data to display :/</p>;
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Merchant</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Category</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state.tableData.map((tableRow: ExpensesInfo) => (
          <TableRow key={tableRow.id}>
            <TableCell>
              {tableRow.date.getMonth()} {tableRow.date.getDay()}
            </TableCell>
            <TableCell>{tableRow.merchant}</TableCell>
            <TableCell>{tableRow.amount}</TableCell>
            <TableCell>{tableRow.category}</TableCell>
            <TableCell>{tableRow.description}</TableCell>
            <TableCell>{tableRow.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});
