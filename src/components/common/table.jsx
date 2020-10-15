import React from "react";
import TableBody from "./tableBody";
import TableHeader from "./tableHeader";
import { StyledTable } from "../styled-components/styledTable";

const Table = ({ columns, sortColumn, data, onSort }) => {
  return (
    <StyledTable>
      <TableHeader columns={columns} onSort={onSort} sortColumn={sortColumn} />
      <TableBody data={data} columns={columns} />
    </StyledTable>
  );
};

export default Table;
