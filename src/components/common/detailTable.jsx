import React from "react";
import { StyledBadge } from "../styled-components/containers";
import { StyledTable } from "../styled-components/styledTable";

const DetailTable = ({ data, rows }) => {
  return (
    <StyledTable normal>
      <tbody>
        {rows.map((row) => (
          <tr key={row.cell}>
            <td>{row.label}</td>
            <td>
              {typeof data[row.cell] === "boolean" ? (
                data[row.cell] === true ? (
                  <StyledBadge approved>Active</StyledBadge>
                ) : (
                  <StyledBadge inactive>Inactive</StyledBadge>
                )
              ) : (
                data[row.cell]
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default DetailTable;
